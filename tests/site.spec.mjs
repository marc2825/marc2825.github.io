import { test as base, expect } from "@playwright/test";

const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    const errors = [];
    const renderErrors = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => {
      if (message.type() === "error" && message.text().startsWith("Failed to render ")) renderErrors.push(message.text());
    });
    // Only fonts are optional remote assets; do not suppress arbitrary HTTPS requests.
    await page.route(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\//, route => route.abort());
    await use(page);
    expect(errors, "Pages should work without JavaScript exceptions").toEqual([]);
    const expected = testInfo.annotations.filter(item => item.type === "expected-render-error").map(item => item.description);
    expect(renderErrors.filter(report => !expected.some(name => report.startsWith(`Failed to render ${name}:`))),
      "Unexpected section failures should not be hidden by exception isolation").toEqual([]);
    for (const name of expected) expect(renderErrors.some(report => report.startsWith(`Failed to render ${name}:`))).toBe(true);
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

async function beforeMainScript(page, setup) {
  await page.route("**/js/script.js", async route => {
    const response = await route.fetch();
    await route.fulfill({ response, body: `${setup}\n${await response.text()}` });
  });
}

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

test("simpified trims hobbies and education, hides news, and leaves the default intact", async ({ page }) => {
  await page.route("**/database/atcoder.json", route => route.abort());
  const sectionContent = () => page.locator("section[id]").evaluateAll(sections =>
    sections.map(section => ({ id: section.id, text: section.textContent, hidden: section.hidden })));
  await page.goto("/");
  const original = await sectionContent();
  await expect(page.locator("html")).toHaveAttribute("data-view", "default");
  await page.goto("/?view=simpified");
  await expect(page.locator("html")).toHaveAttribute("data-view", "simpified");
  const hobbies = page.locator(".about-fact").filter({
    has: page.locator(".about-fact-label").filter({ hasText: /^(趣味|Hobbies)$/ }),
  });
  const timeline = page.locator("#timeline");
  for (const lang of ["ja", "en"]) {
    await page.locator(`[data-lang="${lang}"]`).click();
    await expect(hobbies).toContainText(lang === "ja" ? "競技プログラミング" : "Competitive Programming");
    await expect(hobbies.locator(".about-fact-item-desc")).toHaveCount(0);
    await expect(timeline).toContainText("GPA: 3.84/4.30");
    await expect(timeline).toContainText(lang === "ja" ? "開成中学校・高等学校" : "Kaisei Junior and Senior High School");
    await expect(timeline).not.toContainText(/Entrance Exam|391\.6|2014|遊んでばかり|I spent much of my time/);
    for (const selector of ["#news", '#navLinks a[href="#news"]', "#newsFab", "#newsModal"]) {
      await expect(page.locator(selector)).toBeHidden();
    }
    await expect(page.locator(".news-item")).toHaveCount(0);
  }
  for (const path of ["/", "/?view=unknown", "/?view=__proto__", "/?view=constructor"]) {
    await page.goto(path);
    await expect(page.locator("html")).toHaveAttribute("data-view", "default");
    expect(await sectionContent()).toEqual(original);
    await expect(page.locator('#research .section-more-link')).toHaveAttribute("href", "pages/research.html");
  }
});

test("view survives all detail-page round trips and keeps existing publication filters", async ({ page }) => {
  await page.goto("/?view=simpified");
  const publicationHref = await page.locator("#publications .section-more-link").getAttribute("href");
  const publicationUrl = new URL(publicationHref, page.url());
  expect(publicationUrl.searchParams.get("view")).toBe("simpified");
  expect(publicationUrl.searchParams.get("filter")).toBe("all");
  expect(publicationUrl.searchParams.get("firstAuthor")).toBe("0");
  for (const section of ["research", "publications", "projects", "news"]) {
    const link = page.locator(`#${section} .section-more-link`);
    expect(new URL(await link.getAttribute("href"), page.url()).searchParams.get("view")).toBe("simpified");
  }
  for (const entry of pages.slice(1)) {
    await page.goto(`${entry.path}?view=simpified${entry.path.includes("publications") ? "&filter=all&firstAuthor=0" : ""}`);
    await expect(page.locator("html")).toHaveAttribute("data-view", "simpified");
    await page.locator('[data-lang="en"]').click();
    await expect(page.locator("html")).toHaveAttribute("data-view", "simpified");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    if (entry.path.includes("publications")) {
      await expect(page.locator('[data-filter="all"]')).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator("#firstAuthorToggle")).toHaveAttribute("aria-pressed", "false");
    }
    if (entry.path.includes("news")) {
      await expect(page.locator(".subpage-section")).toBeHidden();
      await expect(page.locator(".news-item")).toHaveCount(0);
    }
    await page.locator(".nav-back").click();
    expect(new URL(page.url()).searchParams.get("view")).toBe("simpified");
    await expect(page.locator("html")).toHaveAttribute("data-view", "simpified");
    await expect(page.locator("#heroName")).not.toBeEmpty();
  }
});

test("view propagation leaves assets, other projects, external URLs and fragment links intact", async ({ page }) => {
  await page.goto("/?view=simpified");
  const hrefs = ["assets/MasahiroKono_CV.pdf", "#research", "/GapFill/", "/ScrapReCover/",
    "https://github.com/marc2825", "mailto:me@example.org", "/?view=default"];
  expect(await page.evaluate(hrefs => hrefs.map(withCurrentView), hrefs)).toEqual(hrefs);
  const preserved = await page.evaluate(() => withCurrentView("pages/projects.html?filter=all#project"));
  const url = new URL(preserved, page.url());
  expect(url.pathname).toBe("/pages/projects.html");
  expect(url.searchParams.get("filter")).toBe("all");
  expect(url.searchParams.get("view")).toBe("simpified");
  expect(url.hash).toBe("#project");
});

test("view overrides and hidden sections stay scoped to the selected URL", async ({ page }) => {
  await page.route("**/database/atcoder.json", route => route.abort());
  await page.goto("/");
  const original = await page.evaluate(() => ({
    bio: DATA.bioJP,
    researchLimit: DATA.preview.research,
    skillGroups: DATA.skills.length,
  }));
  await page.route("**/database/data.js", async route => {
    const response = await route.fetch();
    await route.fulfill({ response, body: `${await response.text()}\n
      DATA.views.simpified.hiddenSections = ["projects", "news"];
      DATA.views.simpified.overrides = {
        bio: "View-only introduction", bioJP: "表示モード専用の紹介文",
        preview: { papers: 1 }, skills: [],
      };` });
  });
  await page.goto("/?view=simpified");
  await expect(page.locator("#heroBio")).toHaveText("表示モード専用の紹介文");
  await expect(page.locator(".pub-item")).toHaveCount(1);
  expect(await page.evaluate(() => DATA.preview.research)).toBe(original.researchLimit);
  expect(await page.evaluate(() => DATA.skills.length)).toBe(0);
  for (const selector of ["#projects", "#news", '#navLinks a[href="#projects"]', '#navLinks a[href="#news"]', "#newsFab"]) {
    await expect(page.locator(selector)).toBeHidden();
  }
  await page.locator('[data-lang="en"]').click();
  await expect(page.locator("#heroBio")).toHaveText("View-only introduction");
  await expect(page.locator("#projects")).toBeHidden();
  await page.goto("/pages/projects.html?view=simpified");
  await expect(page.locator(".subpage-section")).toBeHidden();
  await expect(page.locator(".nav-back")).toBeVisible();
  await page.goto("/");
  expect(await page.evaluate(() => DATA.bioJP)).toBe(original.bio);
  expect(await page.evaluate(() => DATA.skills.length)).toBe(original.skillGroups);
  await expect(page.locator("#projects")).toBeVisible();
  await expect(page.locator("#newsFab")).toBeVisible();
});

test("hidden links, empty profile facts, and unpublished paper controls stay hidden", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    DATA.links.items = DATA.links.items.filter(item => item.type !== "github" && item.type !== "atcoder");
    DATA.about.profile = [];
    DATA.preview.papers = -1;
    renderAll();
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

for (const path of ["/", "/pages/projects.html"]) {
  test(`projects without stack metadata still render: ${path}`, async ({ page }) => {
    await page.route("**/database/data.js", async route => {
      const response = await route.fetch();
      await route.fulfill({ response, body: `${await response.text()}\nDATA.projects.forEach(project => { delete project.stack; });` });
    });
    await page.goto(path);
    const count = await page.evaluate(() => DATA.projects.length);
    await expect(page.locator(".project-card")).toHaveCount(count);
    await expect(page.locator("#footerName")).not.toBeEmpty();
    await page.locator('[data-lang="en"]').click();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator(".project-card")).toHaveCount(count);
    if (path === "/") await expect(page.locator("#skillsGrid")).toContainText("Codeforces");
  });
}

test("one failed renderer does not stop later sections, translations, or reveal", async ({ page }) => {
  test.info().annotations.push({ type: "expected-render-error", description: "renderProjects" });
  const reports = [];
  page.on("console", message => {
    if (message.type() === "error") reports.push(message.text());
  });
  await beforeMainScript(page, 'renderProjects = function renderProjects() { throw new Error("fixture render failure"); };');
  await page.goto("/");
  await page.locator('[data-lang="en"]').click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page).toHaveTitle(/Portfolio/);
  await expect(page.locator("#skillsGrid")).toContainText("Codeforces");
  await expect(page.locator("#newsSectionList .news-item").first()).toBeAttached();
  await expect(page.locator("#footerName")).not.toBeEmpty();
  const skill = page.locator(".skill-group").first();
  await skill.scrollIntoViewIfNeeded();
  await expect(skill).toHaveClass(/visible/);
  expect(reports.some(report => report.includes("Failed to render renderProjects:") && report.includes("fixture render failure"))).toBe(true);
});

test("a failed sub-page renderer still allows footer and language updates", async ({ page }) => {
  test.info().annotations.push({ type: "expected-render-error", description: "renderProjects" });
  await page.route("**/js/page.js", async route => {
    const response = await route.fetch();
    await route.fulfill({ response, body: `renderProjects = function renderProjects() { throw new Error("fixture render failure"); };\n${await response.text()}` });
  });
  await page.goto("/pages/projects.html");
  await page.locator('[data-lang="en"]').click();
  await expect(page).toHaveTitle(/Projects/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("#footerName")).not.toBeEmpty();
});

for (const id of ["firstAuthorToggle", "nav", "navToggle", "navLinks", "themeToggle", "newsFab", "newsModal", "newsModalClose", "newsModalBackdrop"]) {
  test(`initialization and events tolerate a missing #${id}`, async ({ page }) => {
    await beforeMainScript(page, `document.getElementById(${JSON.stringify(id)}).remove(); currentLang = "en";`);
    await page.goto("/");
    await expect(page.locator("#heroName")).not.toBeEmpty();
    await expect(page.locator("#skillsGrid")).toContainText("Codeforces");
    await expect(page.locator("#footerName")).not.toBeEmpty();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page).toHaveTitle(/Portfolio/);
    await page.evaluate(() => {
      window.dispatchEvent(new Event("scroll"));
      setMobileNavOpen(true);
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
      openNewsModal();
      closeNewsModal();
    });
    if (await page.locator('[data-lang="ja"]').count()) {
      await page.locator('[data-lang="ja"]').click();
      await expect(page.locator("html")).toHaveAttribute("lang", "ja");
    }
  });
}

test("bursts of scroll events read section positions once per animation frame", async ({ page }) => {
  await page.goto("/");
  const result = await page.evaluate(async () => {
    // Drain the initial navigation update before measuring a new burst.
    await new Promise(requestAnimationFrame);
    const sections = Array.from(document.querySelectorAll("section[id]"));
    let reads = 0;
    sections.forEach(section => {
      const top = section.offsetTop;
      Object.defineProperty(section, "offsetTop", { configurable: true, get() { reads++; return top; } });
    });
    for (let i = 0; i < 40; i++) window.dispatchEvent(new Event("scroll"));
    const synchronousReads = reads;
    await new Promise(requestAnimationFrame);
    sections.forEach(section => { delete section.offsetTop; });
    return { synchronousReads, reads, sectionCount: sections.length };
  });
  expect(result.synchronousReads).toBe(0);
  expect(result.reads).toBe(result.sectionCount);
});

test("publication order and numbering follow years even if source order changes", async ({ page }) => {
  await page.goto("/pages/publications.html?filter=all&firstAuthor=0");
  await page.evaluate(() => {
    DATA.papers = [
      { ...DATA.papers[0], title: "Old paper", titleJP: "Old paper", year: 2023 },
      { ...DATA.papers[0], title: "Newest paper A", titleJP: "Newest paper A", year: 2027 },
      { ...DATA.papers[0], title: "Middle paper", titleJP: "Middle paper", year: 2025 },
      { ...DATA.papers[0], title: "Newest paper B", titleJP: "Newest paper B", year: 2027 },
    ];
    renderSubPage("publications");
  });
  await expect(page.locator(".pub-title")).toHaveText([/Newest paper A/, /Newest paper B/, /Middle paper/, /Old paper/]);
  await expect(page.locator(".pub-num")).toHaveText(["4", "3", "2", "1"]);
  expect(await page.evaluate(() => DATA.papers[0].title)).toBe("Old paper");
  await page.locator('[data-lang="en"]').click();
  await expect(page.locator(".pub-title").first()).toContainText("Newest paper A");
});

test("project icon links have accessible names in both languages", async ({ page }) => {
  await page.goto("/pages/projects.html");
  // Exercise the icon even if current content has no standalone details URL.
  await page.evaluate(() => {
    DATA.projects[0].detailHref = "#footer";
    renderSubPage("projects");
  });
  const icon = page.locator(".project-ext").first();
  await expect(icon).toHaveAccessibleName("詳細を見る");
  await expect(icon.locator("svg")).toHaveAttribute("aria-hidden", "true");
  await page.locator('[data-lang="en"]').click();
  await expect(icon).toHaveAccessibleName("View details");
});

test("publication filters remain usable after switching languages", async ({ page }) => {
  await page.goto("/pages/publications.html?filter=all&firstAuthor=0");
  // Keep this interaction test independent of additions to the publication list.
  const counts = await page.evaluate(() => ({
    all: DATA.papers.length,
    poster: DATA.papers.filter(paper => paper.type === "poster").length,
    demo: DATA.papers.filter(paper => paper.type === "demo").length,
  }));
  await expect(page.locator(".pub-item")).toHaveCount(counts.all);
  await page.locator('[data-filter="poster"]').click();
  await expect(page.locator(".pub-item")).toHaveCount(counts.poster);
  await page.locator('[data-lang="en"]').click();
  await expect(page.locator('[data-filter="poster"]')).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#firstAuthorToggle")).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator(".pub-item")).toHaveCount(counts.poster);
  await page.locator('[data-filter="demo"]').click();
  await expect(page.locator(".pub-item")).toHaveCount(counts.demo);
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

test("Codeforces keeps its red fallback and peak rating if rating data cannot load", async ({ page }) => {
  await page.route("**/database/atcoder.json", route => route.abort());
  await page.goto("/");
  const skill = page.locator('[data-dynamic-skill="codeforces"]');
  await expect(skill).toHaveAttribute("data-skill-tone", "red");
  await expect(skill.locator(".skill-label")).toHaveText("Codeforces 最高レート 2415");
  await expect(skill.locator(".skill-detail")).toHaveCount(0);
  await page.locator('[data-lang="en"]').click();
  await expect(skill.locator(".skill-label")).toHaveText("Codeforces Peak Rating 2415");
});

test("the real ratings JSON hydrates all competitive profiles", async ({ page }) => {
  const responseReady = page.waitForResponse("**/database/atcoder.json");
  await page.goto("/");
  const response = await responseReady;
  expect(response.ok()).toBe(true);
  const { platforms } = await response.json();
  for (const [key, data, label] of [
    ["atcoder_algorithm", platforms.atcoderAlgorithm, "AtCoder（アルゴ）"],
    ["atcoder_heuristic", platforms.atcoderHeuristic, "AtCoder（ヒューリスティック）"],
    ["codeforces", platforms.codeforces, "Codeforces"],
  ]) {
    await expect(page.locator(`[data-dynamic-skill="${key}"] .skill-label`)).toHaveText(`${label} 最高レート ${data.highestRating}`);
  }
});

test("a delayed successful JSON response replaces fallbacks and survives language switches", async ({ page }) => {
  let release;
  const ready = new Promise(resolve => { release = resolve; });
  await page.route("**/database/atcoder.json", async route => {
    await ready;
    await route.fulfill({ json: { platforms: {
      atcoderAlgorithm: { currentRating: 2501, highestRating: 2876 },
      atcoderHeuristic: { currentRating: 1503, highestRating: 1642 },
      codeforces: { currentRating: 1630, highestRating: 1934 },
    } } });
  });
  try {
    await page.goto("/");
    await expect(page.locator('[data-dynamic-skill="codeforces"] .skill-label')).toHaveText("Codeforces 最高レート 2415");
    await page.locator('[data-lang="en"]').click();
  } finally {
    release();
  }
  for (const [key, peak, tone, en, ja] of [
    ["atcoder_algorithm", 2876, "red", "AtCoder Algorithm", "AtCoder（アルゴ）"],
    ["atcoder_heuristic", 1642, "blue", "AtCoder Heuristic", "AtCoder（ヒューリスティック）"],
    ["codeforces", 1934, "violet", "Codeforces", "Codeforces"],
  ]) {
    const skill = page.locator(`[data-dynamic-skill="${key}"]`);
    await expect(skill).toHaveAttribute("data-skill-tone", tone);
    await expect(skill.locator(".skill-label")).toHaveText(`${en} Peak Rating ${peak}`);
    await page.locator('[data-lang="ja"]').click();
    await expect(skill.locator(".skill-label")).toHaveText(`${ja} 最高レート ${peak}`);
    await page.locator('[data-lang="en"]').click();
  }
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
