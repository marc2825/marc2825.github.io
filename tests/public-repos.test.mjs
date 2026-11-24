import assert from "node:assert/strict";
import { test } from "node:test";
import { fetchPublicRepos, findMissingSummaries, updateReadme } from "../scripts/update-public-repos.mjs";

const readme = [
  "# Portfolio", "", "## 公開リポジトリ", "",
  "<!-- BEGIN AUTO:PUBLIC_REPOSITORIES -->", "<!-- END AUTO:PUBLIC_REPOSITORIES -->",
  "", "Other README content", "",
].join("\n");

function repo(name, fields = {}) {
  return { name, owner: { login: "marc2825" }, visibility: "public", private: false, ...fields };
}

test("generates only the public catalog and advances the date only when the list changes", () => {
  const repositories = [
    repo("GapFill"),
    repo("new-blender-addon", { topics: ["blender"], description: "Viewport tool" }),
    repo("private", { private: true, visibility: "private" }),
    repo("not-mine", { owner: { login: "other-user" } }),
  ];
  const first = updateReadme(readme, repositories, new Date("2026-11-17T16:05:00Z"));
  assert.match(first, /^# Portfolio\n\n## 公開リポジトリ\n\n/);
  assert.ok(first.endsWith("\n\nOther README content\n"));
  assert.match(first, /最終更新：2026-11-18 01:05 JST/);
  assert.match(first, /### 研究\n\n- \[GapFill\]\(https:\/\/github\.com\/marc2825\/GapFill\) — アニメ彩色/);
  assert.match(first, /### Blenderアドオン\n\n- \[new-blender-addon\].* — 要約未登録$/m);
  assert.doesNotMatch(first, /private|not-mine|Viewport tool/);

  const later = new Date("2026-11-25T00:23:00Z");
  assert.equal(updateReadme(first, repositories.toReversed(), later), first);
  const automaticLabel = first.replace("最終更新：", "最終更新（自動）：");
  assert.equal(updateReadme(automaticLabel, repositories, later), automaticLabel);
  assert.match(updateReadme(automaticLabel, [repo("GapFill")], later), /最終更新（自動）：2026-11-25 09:23 JST/);
  const second = updateReadme(first, [repo("new-project", { description: "画像の[整理]ツール" })], later);
  assert.match(second, /最終更新：2026-11-25 09:23 JST/);
  assert.match(second, /### 未分類\n\n- \[new-project\].*画像の\\\[整理\\\]ツール/);
  assert.doesNotMatch(second, /GapFill|new-blender-addon/);
  assert.throws(() => updateReadme("# Missing markers", repositories), /exactly one pair/);
});

test("keeps README summaries Japanese and files hard-to-place repositories as uncategorized", () => {
  const repositories = [
    repo("AIfude_novel_editor", { description: "An AI-assisted novel editor" }),
    repo("english-only", { description: "A tool written up in English" }),
    repo("no-description"),
    repo("japanese-desc", { description: "日本語の説明" }),
  ];
  const list = updateReadme(readme, repositories, new Date("2026-11-19T00:00:00Z"));
  assert.match(list, /### Webアプリ・サイト\n\n- \[AIfude\\_novel\\_editor\].* — AIの提案を比較・取捨選択できる小説推敲エディタ\n/);
  assert.match(list, /### 未分類\n\n- \[english-only\]/);
  assert.match(list, /- \[english-only\].* — 要約未登録\n/);
  assert.match(list, /- \[no-description\].* — 要約未登録\n/);
  assert.match(list, /- \[japanese-desc\].* — 日本語の説明\n/);
  assert.doesNotMatch(list, /AI-assisted|written up in English|その他/);
  assert.deepEqual(findMissingSummaries(repositories), ["english-only", "no-description"]);
});

test("lists categories and curated repositories in their defined order", () => {
  const list = updateReadme(readme, [
    repo("marc2825.github.io"), repo("AIfude_novel_editor"), repo("AnimeAirtimeTracker"), repo("a-web-tool", { topics: ["nextjs"] }),
    repo("cp_library"), repo("Snaxis"), repo("EmailAddressChecker"), repo("Sumire-image-editor"),
  ], new Date("2026-11-25T00:00:00Z"));
  const order = [...list.matchAll(/^(?:### (.+)|- \[([^\]]+)\])/gm)].map(match => match[1] ?? match[2]);
  assert.deepEqual(order, [
    "Blenderアドオン", "Snaxis", "競技プログラミング", "cp\\_library",
    "Webアプリ・サイト", "AnimeAirtimeTracker", "AIfude\\_novel\\_editor", "marc2825.github.io", "a-web-tool",
    "デスクトップアプリ", "Sumire-image-editor", "CLIツール", "EmailAddressChecker",
  ]);
});

test("authenticates API requests only when a token is available", async () => {
  const seen = [];
  const request = async (_url, options) => {
    seen.push(options.headers.Authorization);
    return Response.json([]);
  };
  await fetchPublicRepos(request, "test-token");
  await fetchPublicRepos(request, "");
  assert.deepEqual(seen, ["Bearer test-token", undefined]);
});

test("fetches every page and fails without returning partial data on an API error", async () => {
  const requests = [];
  const firstPage = Array.from({ length: 100 }, (_, i) => repo(`project-${i}`));
  const result = await fetchPublicRepos(async url => {
    requests.push(url.searchParams.get("page"));
    assert.equal(url.pathname, "/users/marc2825/repos");
    assert.equal(url.searchParams.get("type"), "owner");
    return Response.json(requests.length === 1 ? firstPage : [repo("last-project")]);
  });
  assert.deepEqual(requests, ["1", "2"]);
  assert.equal(result.length, 101);
  assert.equal(result.at(-1).name, "last-project");
  await assert.rejects(fetchPublicRepos(async url => url.searchParams.get("page") === "1"
    ? Response.json(firstPage)
    : new Response(null, { status: 503 })), /HTTP 503/);
});
