import { test as base, expect } from "@playwright/test";

const test = base.extend({
  page: async ({ page }, use) => {
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.route(/^https:\/\//, route => route.abort());
    await use(page);
    expect(errors, "Pages should work without JavaScript exceptions").toEqual([]);
  },
});

const pages = [
  { path: "/", item: "#heroName", ja: "ポートフォリオ", en: "Portfolio" },
  { path: "/pages/research.html", item: ".research-card", ja: "研究", en: "Research" },
  { path: "/pages/publications.html", item: ".pub-item", ja: "論文", en: "Publications" },
  { path: "/pages/projects.html", item: ".project-card", ja: "プロジェクト", en: "Projects" },
  { path: "/pages/articles.html", item: ".coming-soon", ja: "記事", en: "Articles" },
  { path: "/pages/news.html", item: ".news-item", ja: "お知らせ", en: "News" },
];

for (const entry of pages) {
  test(`content and page title survive language changes: ${entry.path}`, async ({ page }) => {
    await page.goto(entry.path);
    const items = page.locator(entry.item);
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
    for (const [lang, title] of [["ja", entry.ja], ["en", entry.en], ["ja", entry.ja]]) {
      await page.locator(`.lang-btn[data-lang="${lang}"]`).click();
      await expect(page).toHaveTitle(new RegExp(title));
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      await expect(items).toHaveCount(count);
      // Playwright visibility alone does not detect opacity: 0.
      for (const item of await items.all()) {
        await item.scrollIntoViewIfNeeded();
        await expect.poll(() => item.evaluate(el => Number(getComputedStyle(el).opacity))).toBeGreaterThanOrEqual(0.7);
      }
    }
  });
}

test("hidden links, empty profile facts, and unpublished paper controls stay hidden", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    DATA.links.items = DATA.links.items.filter(item => item.type !== "github" && item.type !== "atcoder");
    DATA.about.profile = [];
    DATA.preview.papers = -1;
    renderAll();
    setPubTab("papers");
  });
  for (const selector of ["#heroGithubLink", "#heroAtcoderLink", "#aboutFacts", "#pubFilters"]) {
    await expect(page.locator(selector)).toBeHidden();
    await expect(page.locator(selector)).toHaveCSS("display", "none");
  }
  await page.evaluate(() => {
    DATA.preview.papers = 10;
    renderAll();
  });
  await expect(page.locator("#pubFilters")).toBeVisible();
});

test("publication filters remain usable after switching languages", async ({ page }) => {
  await page.goto("/pages/publications.html?filter=all&firstAuthor=0");
  await expect(page.locator(".pub-item")).toHaveCount(5);
  await page.locator('[data-filter="poster"]').click();
  await expect(page.locator(".pub-item")).toHaveCount(1);
  await page.locator('[data-lang="en"]').click();
  await expect(page.locator('[data-filter="poster"]')).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#firstAuthorToggle")).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator(".pub-item")).toHaveCount(1);
  await page.locator('[data-filter="demo"]').click();
  await expect(page.locator(".pub-item")).toHaveCount(2);
});

test("the news dialog contains keyboard focus and restores it on every close path", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => { document.body.style.overflow = "clip"; });
  const fab = page.locator("#newsFab");
  const dialog = page.getByRole("dialog", { name: "お知らせ" });
  for (const close of ["escape", "button", "backdrop"]) {
    await fab.click();
    await expect(dialog).toBeVisible();
    await expect(page.locator("#newsModalClose")).toBeFocused();
    for (const key of ["Shift+Tab", "Tab", "Tab", "Shift+Tab"]) {
      await page.keyboard.press(key);
      await expect.poll(() => dialog.evaluate(el => el.contains(document.activeElement))).toBe(true);
    }
    if (close === "escape") await page.keyboard.press("Escape");
    if (close === "button") await page.locator("#newsModalClose").click();
    if (close === "backdrop") await page.locator("#newsModalBackdrop").click({ position: { x: 5, y: 5 } });
    await expect(dialog).toBeHidden();
    await expect(fab).toBeFocused();
    await expect(page.locator("body")).toHaveCSS("overflow", "clip");
  }
});

test("the mobile menu announces its state and closes with Escape or a link", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.locator("#navToggle");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.locator('#navLinks a[href="#about"]').click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await page.locator('[data-lang="en"]').click();
  await expect(toggle).toHaveAccessibleName("Open menu");
  await page.setViewportSize({ width: 320, height: 740 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("reduced motion keeps all content readable without scroll animations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const item of await page.locator(".reveal").all()) {
    await expect(item).toHaveCSS("opacity", "1");
    await expect(item).toHaveCSS("transform", "none");
  }
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
});

test("a saved light theme is applied before the main page scripts run", async ({ page }) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem("theme")) localStorage.setItem("theme", "light");
  });
  let releaseScript;
  const ready = new Promise(resolve => { releaseScript = resolve; });
  await page.route("**/js/core.js", async route => {
    await ready;
    await route.continue();
  });
  try {
    await page.goto("/", { waitUntil: "commit" });
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await expect(page.locator("#heroName")).toBeEmpty();
  } finally {
    releaseScript();
  }
  await page.waitForLoadState("load");
  await page.locator("#themeToggle").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("blocked browser storage does not break the page or theme toggle", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new DOMException("Blocked", "SecurityError"); } });
  });
  await page.goto("/");
  await expect(page.locator("#heroName")).not.toBeEmpty();
  await page.locator("#themeToggle").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("Codeforces keeps its red fallback and details if rating data cannot load", async ({ page }) => {
  await page.route("**/database/atcoder.json", route => route.abort());
  await page.goto("/");
  const skill = page.locator('[data-dynamic-skill="codeforces"]');
  await expect(skill).toHaveAttribute("data-skill-tone", "red");
  await expect(skill).toContainText("2415");
  await expect(skill.locator(".skill-detail")).toContainText("Grandmaster");
});

test("English skill descriptions and Japanese gallery captions stay in the selected language", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-lang="en"]').click();
  const details = await page.locator(".skill-detail").allTextContents();
  expect(details.join(" ")).not.toMatch(/[\u3040-\u30ff\u4e00-\u9fff]|COMING SOON/);
  await expect(page.locator("#skillsGrid")).not.toContainText("COMING SOON");
  await page.locator('[data-lang="ja"]').click();
  const avatar = page.locator(".project-card").filter({ hasText: "VRChat向け" });
  await avatar.getByRole("button", { name: "側面" }).click();
  await expect(avatar.locator("img")).toHaveAttribute("alt", "オリジナル3Dキャラクターモデル 側面");
});

test("optimized research and project images load, including every gallery view", async ({ page }) => {
  for (const path of ["/pages/research.html", "/pages/projects.html"]) {
    await page.goto(path);
    for (const image of await page.locator(".research-card img, .project-card img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveAttribute("src", /\.webp$/);
      await expect.poll(() => image.evaluate(el => el.naturalWidth)).toBeGreaterThan(0);
    }
    for (const button of await page.locator("[data-project-gallery-button]").all()) {
      await button.click();
      const image = button.locator("xpath=..").locator("xpath=..").locator("img");
      await expect.poll(() => image.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
    }
  }
});

test.describe("static metadata for link previews", () => {
  test.use({ javaScriptEnabled: false });
  test("all pages have specific titles, social cards, and a favicon without JavaScript", async ({ page }) => {
    for (const entry of pages) {
      await page.goto(entry.path);
      await expect(page).toHaveTitle(new RegExp(entry.ja));
      await expect(page).toHaveTitle(/河野将大/);
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", await page.title());
      await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", /河野将大/);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /assets\/og-image.png$/);
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
      const favicon = await page.locator('link[rel="icon"]').getAttribute("href");
      expect((await page.request.get(new URL(favicon, page.url()).href)).ok()).toBe(true);
    }
    expect((await page.request.get("/assets/og-image.png")).ok()).toBe(true);
  });
});
