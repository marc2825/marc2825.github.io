import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const owner = "marc2825";
const begin = "<!-- BEGIN AUTO:PUBLIC_REPOSITORIES -->";
const end = "<!-- END AUTO:PUBLIC_REPOSITORIES -->";

// Curate the short summaries here. New repositories use their GitHub metadata.
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
    title: "Blender・画像制作",
    topics: ["blender", "blender-addon", "image-editor", "image-processing"],
    summaries: {
      blender_smartclip: "Blenderの移動・スナップ操作支援",
      bodyocclusionculler: "衣装に隠れた身体メッシュの検出・除去",
      "sumire-image-editor": "画像のモザイク・ぼかし・一括整理",
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
    title: "Web・ユーティリティ",
    topics: ["github-pages", "portfolio", "utility"],
    summaries: {
      emailaddresschecker: "メールアドレスの形式・DNS検査CLI",
      "marc2825.github.io": "研究・制作のポートフォリオサイト",
    },
  },
];
const other = { title: "その他" };

export async function fetchPublicRepos(request = fetch) {
  const repos = [];
  const perPage = 100;
  for (let page = 1; ; page++) {
    const url = new URL(`https://api.github.com/users/${owner}/repos`);
    url.search = new URLSearchParams({ type: "owner", sort: "full_name", per_page: perPage, page });
    const response = await request(url, {
      headers: { Accept: "application/vnd.github+json" },
      signal: AbortSignal.timeout(15000),
    });
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

function renderRepos(repos) {
  const groups = new Map([...categories, other].map(category => [category, []]));
  const publicRepos = repos.filter(repo =>
    repo.visibility === "public" && repo.private === false && repo.owner?.login?.toLowerCase() === owner
  );
  publicRepos.sort((a, b) => a.name.localeCompare(b.name, "en"));
  for (const repo of publicRepos) {
    const name = repo.name.toLowerCase();
    const curated = categories.find(category => Object.hasOwn(category.summaries, name));
    const group = curated ?? categories.find(category => category.topics.some(topic => repo.topics?.includes(topic))) ?? other;
    const description = curated?.summaries[name] ?? (repo.description?.trim() || "概要未設定");
    const badges = [repo.fork && "フォーク", repo.archived && "アーカイブ"].filter(Boolean);
    const status = badges.length ? `（${badges.join("・")}）` : "";
    groups.get(group).push(`- [${markdownText(repo.name)}](https://github.com/${owner}/${encodeURIComponent(repo.name)})${status} — ${markdownText(description)}`);
  }
  return [...groups].filter(([, lines]) => lines.length)
    .map(([group, lines]) => [`### ${group.title}`, "", ...lines].join("\n"))
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
  const previousList = previous.match(/^\n最終更新：[^\n]+ JST\n\n([\s\S]*?)\n$/)?.[1];
  const list = renderRepos(repos);
  if (previousList === list) return readme;

  const updated = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Tokyo", dateStyle: "short", timeStyle: "short",
  }).format(now);
  const eol = readme.includes("\r\n") ? "\r\n" : "\n";
  const block = `\n最終更新：${updated} JST\n\n${list}\n`.replaceAll("\n", eol);
  return readme.slice(0, blockStart) + block + readme.slice(stop);
}

async function main() {
  const file = new URL("../README.md", import.meta.url);
  const repos = await fetchPublicRepos();
  const readme = await readFile(file, "utf8");
  const next = updateReadme(readme, repos);
  if (next !== readme) await writeFile(file, next);
  console.log(next === readme ? "Public repositories list is up to date." : "Updated the public repositories list.");
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
