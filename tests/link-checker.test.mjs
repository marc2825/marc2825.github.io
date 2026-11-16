import assert from "node:assert/strict";
import { test } from "node:test";
import { collectExternalLinks, checkExternalLink } from "../scripts/check-external-links.mjs";

test("collects bilingual and embedded anchors, deduplicates URLs, and skips disabled or local links", () => {
  assert.deepEqual(collectExternalLinks({
    links: [
      { href: "https://example.org/paper#abstract" },
      { href: "https://example.org/disabled", disabled: true },
      { href: "assets/local.pdf" },
      { href: "mailto:me@example.org" },
    ],
    venueHref: "https://example.org/paper",
    desc: '<a href="https://example.org/en?a=1&amp;b=2">English</a>',
    descJP: "<a href='https://example.org/ja'>日本語</a>",
  }, ['<a href="https://example.org/html">HTML</a><!-- <a href="https://example.org/unused"> -->']), [
    "https://example.org/en?a=1&b=2",
    "https://example.org/html",
    "https://example.org/ja",
    "https://example.org/paper",
  ]);
});

test("HEAD rejection falls back to GET and checks the final status", async () => {
  const methods = [];
  const result = await checkExternalLink("https://example.org/", {
    request: async (_, { method }) => {
      methods.push(method);
      return new Response(null, { status: method === "HEAD" ? 405 : 200 });
    },
  });
  assert.equal(result.state, "ok");
  assert.deepEqual(methods, ["HEAD", "GET"]);
});

test("a HEAD 404 is confirmed with GET before declaring a broken link", async () => {
  const result = await checkExternalLink("https://example.org/", {
    request: async (_, { method }) => new Response(null, { status: method === "HEAD" ? 404 : 200 }),
  });
  assert.equal(result.state, "ok");
  assert.equal(result.status, 200);
});

for (const [status, state] of [[200, "ok"], [404, "broken"], [410, "broken"], [403, "unverified"], [429, "unverified"], [503, "unverified"]]) {
  test(`classifies HTTP ${status} as ${state}`, async () => {
    const result = await checkExternalLink("https://example.org/", {
      request: async () => new Response(null, { status }),
    });
    assert.equal(result.state, state);
    assert.equal(result.status, status);
  });
}

test("timeouts and DNS failures remain unverified rather than passing", async () => {
  const result = await checkExternalLink("https://example.org/", {
    request: async () => { throw new Error("request timed out"); },
  });
  assert.equal(result.state, "unverified");
  assert.equal(result.reason, "request timed out");
});
