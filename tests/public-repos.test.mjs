import assert from "node:assert/strict";
import { test } from "node:test";
import { fetchPublicRepos, updateReadme } from "../scripts/update-public-repos.mjs";

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
  assert.match(first, /### Blender・画像制作\n\n- \[new-blender-addon\].*Viewport tool/);
  assert.doesNotMatch(first, /private|not-mine/);

  const later = new Date("2026-11-25T00:23:00Z");
  assert.equal(updateReadme(first, repositories.toReversed(), later), first);
  const automaticLabel = first.replace("最終更新：", "最終更新（自動）：");
  assert.equal(updateReadme(automaticLabel, repositories, later), automaticLabel);
  assert.match(updateReadme(automaticLabel, [repo("GapFill")], later), /最終更新（自動）：2026-11-25 09:23 JST/);
  const second = updateReadme(first, [repo("new-project", { description: "Image [sorter]" })], later);
  assert.match(second, /最終更新：2026-11-25 09:23 JST/);
  assert.match(second, /### その他\n\n- \[new-project\].*Image \\\[sorter\\\]/);
  assert.doesNotMatch(second, /GapFill|new-blender-addon/);
  assert.throws(() => updateReadme("# Missing markers", repositories), /exactly one pair/);
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
