import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";

export function collectExternalLinks(data, htmlPages = []) {
  const links = new Set();
  function add(href) {
    if (!/^https?:\/\//i.test(href)) return;
    const url = new URL(href.replaceAll("&amp;", "&").replaceAll("&#38;", "&"));
    url.hash = "";
    links.add(url.href);
  }
  function anchors(html) {
    for (const match of html.replace(/<!--[\s\S]*?-->/g, "").matchAll(/<a\b[^>]*\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) {
      add(match[1] ?? match[2]);
    }
  }
  function visit(value) {
    if (typeof value === "string") anchors(value);
    else if (value && typeof value === "object" && !value.disabled) {
      for (const [key, item] of Object.entries(value)) {
        if (typeof item === "string" && /^(?:href|.*Href)$/.test(key)) add(item);
        visit(item);
      }
    }
  }
  visit(data);
  htmlPages.forEach(anchors);
  return [...links].sort();
}

export async function checkExternalLink(url, { request = fetch, timeoutMs = 10000 } = {}) {
  try {
    for (const method of ["HEAD", "GET"]) {
      const response = await request(url, {
        method,
        redirect: "follow",
        signal: AbortSignal.timeout(timeoutMs),
      });
      const status = response.status;
      // Avoid downloading linked PDFs or other large bodies during GET fallback.
      await response.body?.cancel();
      if (method === "HEAD" && [403, 404, 405, 410, 501].includes(status)) continue;
      const state = status >= 200 && status < 400 ? "ok"
        : [404, 410].includes(status) ? "broken" : "unverified";
      return { url, state, status };
    }
  } catch (error) {
    return { url, state: "unverified", reason: error.cause?.code || error.message };
  }
}

async function main() {
  const root = new URL("../", import.meta.url);
  const dataSource = await readFile(new URL("database/data.js", root), "utf8");
  const data = runInNewContext(`${dataSource}\nDATA;`, {}, { timeout: 1000 });
  const pageNames = (await readdir(new URL("pages/", root))).filter(name => name.endsWith(".html"));
  const htmlPages = await Promise.all(["index.html", ...pageNames.map(name => `pages/${name}`)]
    .map(path => readFile(new URL(path, root), "utf8")));
  const queue = collectExternalLinks(data, htmlPages);
  const total = queue.length;
  const counts = { ok: 0, broken: 0, unverified: 0 };
  await Promise.all(Array.from({ length: Math.min(4, total) }, async () => {
    while (queue.length) {
      const result = await checkExternalLink(queue.shift());
      counts[result.state]++;
      console.log(`${result.state.toUpperCase()} ${result.status ?? result.reason} ${result.url}`);
    }
  }));
  console.log(`${total} links: ${counts.ok} OK, ${counts.broken} broken, ${counts.unverified} unverified.`);
  // Access restrictions, rate limits, and network failures are not proof of a broken link.
  process.exitCode = counts.broken ? 1 : counts.unverified ? 2 : 0;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error); process.exitCode = 2; });
}
