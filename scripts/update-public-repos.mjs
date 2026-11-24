import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const owner = "marc2825";
const begin = "<!-- BEGIN AUTO:PUBLIC_REPOSITORIES -->";
const end = "<!-- END AUTO:PUBLIC_REPOSITORIES -->";

// Curate the short Japanese summaries here; categories and their summaries appear in this order,
// followed by other repositories alphabetically. A repository without a summary is placed by its GitHub
// topics (or under 未分類) and shows its GitHub description only when that is already Japanese.
const categories = [
  {
    title: "研究",
    topics: ["research", "hci", "computational-fabrication"],
    summaries: {
      gapfill: "アニメ彩色の塗り残し補助",
      scraprecover: "端切れパッチワークの配置最適化",
    },
  },
  {
    title: "Blenderアドオン",
    topics: ["blender", "blender-addon", "blender-extension"],
    summaries: {
      bodyocclusionculler: "衣装に隠れた身体メッシュの検出・除去",
      snaxis: "スマートガイドによるBlenderの整列・スナップ支援",
    },
  },
  {
    title: "競技プログラミング",
    topics: ["competitive-programming", "atcoder", "yukicoder"],
    summaries: {
      cp_library: "競技プログラミング向けC++ライブラリ",
      my_cp_problems: "自作問題と解説のアーカイブ",
    },
  },
  {
    title: "Unityエディタ拡張",
    topics: ["unity", "unity-editor"],
    summaries: {
      kakudoll: "見る角度ごとにVRMアバターの形を描き分けるツール（開発中）",
    },
  },
  {
    title: "ブラウザ拡張機能",
    topics: ["chrome-extension", "edge-extension", "firefox-extension", "browser-extension"],
    summaries: {
      "pixiv-metatan": "pixivのプレビューとAI生成情報の読み取り（非公式）",
      "spellbinder-for-novelai": "NovelAIのプロンプトを部品化・比較するサイドパネル（非公式）",
    },
  },
  {
    title: "Webアプリ・サイト",
    topics: ["nextjs", "web-app", "github-pages", "personal-website"],
    summaries: {
      animeairtimetracker: "日本のテレビアニメの放送枠・編成データベース",
      aifude_novel_editor: "AIの提案を比較・取捨選択できる小説推敲エディタ",
      "marc2825.github.io": "研究・制作のポートフォリオサイト",
    },
  },
  {
    title: "デスクトップアプリ",
    topics: ["desktop-app", "pyside6", "windows"],
    summaries: {
      "sumire-image-editor": "画像のモザイク・ぼかし・一括整理",
    },
  },
  {
    title: "CLIツール",
    topics: ["cli"],
    summaries: {
      emailaddresschecker: "メールアドレスの形式・DNS検査CLI",
    },
  },
];
// Repositories that fit no category yet; curated summaries may still be listed here.
const uncategorized = {
  title: "未分類",
  summaries: {},
};
const curatedGroups = [...categories, uncategorized];
const missingSummary = "要約未登録";
const japaneseText = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u;

// Authenticating avoids the 60 requests/hour limit shared by unauthenticated runners.
export async function fetchPublicRepos(request = fetch, token = process.env.GITHUB_TOKEN) {
  const repos = [];
  const perPage = 100;
  const headers = { Accept: "application/vnd.github+json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  for (let page = 1; ; page++) {
    const url = new URL(`https://api.github.com/users/${owner}/repos`);
    url.search = new URLSearchParams({ type: "owner", sort: "full_name", per_page: perPage, page });
    const response = await request(url, { headers, signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new Error(`GitHub repository list returned HTTP ${response.status}`);
    const batch = await response.json();
    if (!Array.isArray(batch)) throw new Error("GitHub repository list was not an array");
    repos.push(...batch);
    if (batch.length < perPage) return repos;
  }
}

function markdownText(value) {
  return value.replace(/\s+/g, " ").trim()
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replace(/[\\`*_\[\]~]/g, "\\$&");
}

function ownedPublicRepos(repos) {
  return repos.filter(repo =>
    repo.visibility === "public" && repo.private === false && repo.owner?.login?.toLowerCase() === owner
  ).sort((a, b) => a.name.localeCompare(b.name, "en"));
}

function classify(repo) {
  const name = repo.name.toLowerCase();
  const curated = curatedGroups.find(group => Object.hasOwn(group.summaries, name));
  const description = repo.description?.trim() ?? "";
  return {
    group: curated ?? categories.find(category => category.topics.some(topic => repo.topics?.includes(topic))) ?? uncategorized,
    // The README is Japanese, so an English GitHub description waits for a curated summary.
    summary: curated?.summaries[name] ?? (japaneseText.test(description) ? description : undefined),
  };
}

export function findMissingSummaries(repos) {
  return ownedPublicRepos(repos).filter(repo => !classify(repo).summary).map(repo => repo.name);
}

function renderRepos(repos) {
  const groups = new Map(curatedGroups.map(group => [group, []]));
  for (const repo of ownedPublicRepos(repos)) {
    const { group, summary } = classify(repo);
    const badges = [repo.fork && "フォーク", repo.archived && "アーカイブ"].filter(Boolean);
    const status = badges.length ? `（${badges.join("・")}）` : "";
    const order = Object.keys(group.summaries).indexOf(repo.name.toLowerCase());
    groups.get(group).push({
      // Repositories are already alphabetical, so the stable sort keeps that order after curated ones.
      rank: order < 0 ? Infinity : order,
      text: `- [${markdownText(repo.name)}](https://github.com/${owner}/${encodeURIComponent(repo.name)})${status} — ${markdownText(summary ?? missingSummary)}`,
    });
  }
  return [...groups].filter(([, lines]) => lines.length)
    .map(([group, lines]) => [`### ${group.title}`, "", ...lines.sort((a, b) => a.rank - b.rank).map(line => line.text)].join("\n"))
    .join("\n\n") || "公開リポジトリはありません。";
}

export function updateReadme(readme, repos, now = new Date()) {
  const start = readme.indexOf(begin);
  const stop = readme.indexOf(end);
  if (start < 0 || stop < start + begin.length ||
      start !== readme.lastIndexOf(begin) || stop !== readme.lastIndexOf(end)) {
    throw new Error("README must contain exactly one pair of public repository markers");
  }
  const blockStart = start + begin.length;
  const previous = readme.slice(blockStart, stop).replaceAll("\r\n", "\n");
  const previousUpdate = previous.match(/^\n(最終更新(?:（自動）)?)：[^\n]+ JST\n\n([\s\S]*?)\n$/);
  const list = renderRepos(repos);
  if (previousUpdate?.[2] === list) return readme;

  const updated = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Tokyo", dateStyle: "short", timeStyle: "short",
  }).format(now);
  const eol = readme.includes("\r\n") ? "\r\n" : "\n";
  const label = previousUpdate?.[1] ?? "最終更新";
  const block = `\n${label}：${updated} JST\n\n${list}\n`.replaceAll("\n", eol);
  return readme.slice(0, blockStart) + block + readme.slice(stop);
}

async function main() {
  const file = new URL("../README.md", import.meta.url);
  const repos = await fetchPublicRepos();
  const readme = await readFile(file, "utf8");
  const next = updateReadme(readme, repos);
  if (next !== readme) await writeFile(file, next);
  console.log(next === readme ? "Public repositories list is up to date." : "Updated the public repositories list.");
  const prefix = process.env.GITHUB_ACTIONS ? "::warning::" : "Warning: ";
  for (const name of findMissingSummaries(repos)) {
    console.log(`${prefix}${name} has no Japanese summary; add one in scripts/update-public-repos.mjs.`);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
