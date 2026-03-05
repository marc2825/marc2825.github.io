const DEFAULT_PANEL = "about";
const DEFAULT_LANG = "ja";
const SUPPORTED_LANGS = ["ja", "en"];

const tabButtons = [...document.querySelectorAll(".tab-button")];
const panels = [...document.querySelectorAll(".panel")];
const langButtons = [...document.querySelectorAll(".lang-button")];
const textNodes = [...document.querySelectorAll("[data-i18n]")];
const contentNodes = [...document.querySelectorAll("[data-i18n-content]")];
const ariaLabelNodes = [...document.querySelectorAll("[data-i18n-aria-label]")];
const placeholderNodes = [...document.querySelectorAll("[data-i18n-placeholder]")];

const translations = {
  ja: {
    "page.title": "ポートフォリオテンプレート",
    "page.description": "GitHub Pages向けのポートフォリオ雛形テンプレート",
    "language.aria": "言語切り替え",
    "nav.aria": "セクション切り替え",
    "nav.about": "自己紹介",
    "nav.skills": "スキル",
    "nav.projects": "プロジェクト",
    "nav.articles": "記事",
    "nav.news": "お知らせ",
    "nav.publications": "出版・発表",
    "nav.contact": "連絡先",
    "section.about.title": "自己紹介",
    "section.about.intro.title": "自己紹介",
    "section.about.history.title": "経歴",
    "section.about.affiliation.title": "所属",
    "section.skills.title": "スキル",
    "section.skills.certifications.title": "資格",
    "section.skills.languages.title": "扱える言語",
    "section.skills.tools.title": "ツール",
    "section.skills.frameworks.title": "フレームワーク",
    "section.projects.title": "プロジェクト",
    "section.articles.title": "記事",
    "section.publications.title": "出版・発表",
    "section.publications.papers.title": "論文リスト",
    "section.publications.talks.title": "登壇履歴",
    "section.news.title": "お知らせ",
    "section.contact.title": "連絡先",
    "section.contact.email.title": "メール",
    "section.contact.sns.title": "SNS",
    "placeholder.about.intro": "ここに自己紹介を入力",
    "placeholder.about.history": "ここに経歴を入力",
    "placeholder.about.affiliation": "ここに所属を入力",
    "placeholder.skills.certifications": "資格を箇条書きで入力",
    "placeholder.skills.languages": "例: JavaScript / Python",
    "placeholder.skills.tools": "例: Git / Docker / Figma",
    "placeholder.skills.frameworks": "例: React / Next.js",
    "placeholder.projects.screenshot": "スクリーンショット",
    "placeholder.projects.name": "プロジェクト名",
    "placeholder.projects.summary": "プロジェクトの概要",
    "placeholder.projects.repo": "リポジトリURL",
    "placeholder.projects.tech": "使用技術",
    "placeholder.articles.list": "記事タイトルやURLを追加",
    "placeholder.publications.papers": "論文タイトルやDOIを追加",
    "placeholder.publications.talks": "イベント名や発表タイトルを追加",
    "placeholder.news.date": "年/月",
    "placeholder.news.event": "出来事",
    "placeholder.contact.email": "メールアドレス",
    "placeholder.contact.sns": "SNS名とURLを追加",
  },
  en: {
    "page.title": "Portfolio Template",
    "page.description": "Portfolio starter template for GitHub Pages",
    "language.aria": "Language switch",
    "nav.aria": "Section navigation",
    "nav.about": "About Me",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.articles": "Articles",
    "nav.news": "News",
    "nav.publications": "Publications",
    "nav.contact": "Contact",
    "section.about.title": "About Me",
    "section.about.intro.title": "Introduction",
    "section.about.history.title": "Career",
    "section.about.affiliation.title": "Affiliation",
    "section.skills.title": "Skills",
    "section.skills.certifications.title": "Certifications",
    "section.skills.languages.title": "Languages",
    "section.skills.tools.title": "Tools",
    "section.skills.frameworks.title": "Frameworks",
    "section.projects.title": "Projects",
    "section.articles.title": "Articles",
    "section.publications.title": "Publications",
    "section.publications.papers.title": "Papers",
    "section.publications.talks.title": "Talks",
    "section.news.title": "News",
    "section.contact.title": "Contact",
    "section.contact.email.title": "Email",
    "section.contact.sns.title": "Social",
    "placeholder.about.intro": "Write your introduction here",
    "placeholder.about.history": "Write your career history here",
    "placeholder.about.affiliation": "Write your affiliation here",
    "placeholder.skills.certifications": "List your certifications",
    "placeholder.skills.languages": "Example: JavaScript / Python",
    "placeholder.skills.tools": "Example: Git / Docker / Figma",
    "placeholder.skills.frameworks": "Example: React / Next.js",
    "placeholder.projects.screenshot": "Screenshot",
    "placeholder.projects.name": "Project name",
    "placeholder.projects.summary": "Project summary",
    "placeholder.projects.repo": "Repository URL",
    "placeholder.projects.tech": "Tech stack",
    "placeholder.articles.list": "Add article titles or URLs",
    "placeholder.publications.papers": "Add paper titles or DOI",
    "placeholder.publications.talks": "Add event names or talk titles",
    "placeholder.news.date": "YYYY/MM",
    "placeholder.news.event": "Event",
    "placeholder.contact.email": "Email address",
    "placeholder.contact.sns": "Add platform name and URL",
  },
};

function getTranslation(lang, key) {
  return translations[lang]?.[key] ?? translations[DEFAULT_LANG]?.[key] ?? null;
}

function applyLanguage(lang) {
  const targetLang = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
  document.documentElement.lang = targetLang;

  textNodes.forEach((node) => {
    const key = node.dataset.i18n;
    if (!key) return;
    const translated = getTranslation(targetLang, key);
    if (translated !== null) {
      node.textContent = translated;
    }
  });

  contentNodes.forEach((node) => {
    const key = node.dataset.i18nContent;
    if (!key) return;
    const translated = getTranslation(targetLang, key);
    if (translated !== null) {
      node.setAttribute("content", translated);
    }
  });

  ariaLabelNodes.forEach((node) => {
    const key = node.dataset.i18nAriaLabel;
    if (!key) return;
    const translated = getTranslation(targetLang, key);
    if (translated !== null) {
      node.setAttribute("aria-label", translated);
    }
  });

  placeholderNodes.forEach((node) => {
    const key = node.dataset.i18nPlaceholder;
    if (!key) return;
    const translated = getTranslation(targetLang, key);
    if (translated !== null) {
      node.dataset.placeholder = translated;
    }
  });

  langButtons.forEach((button) => {
    const isActive = button.dataset.lang === targetLang;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function setActivePanel(panelKey) {
  const hasMatch = panels.some((panel) => panel.dataset.panel === panelKey);
  const target = hasMatch ? panelKey : DEFAULT_PANEL;

  tabButtons.forEach((button) => {
    const isActive = button.dataset.panel === target;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });

  panels.forEach((panel) => {
    const isActive = panel.dataset.panel === target;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.panel;
    if (!key) return;

    setActivePanel(key);
    history.replaceState(null, "", `#${key}`);
  });
});

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextLanguage = button.dataset.lang;
    if (!nextLanguage) return;
    applyLanguage(nextLanguage);
  });
});

window.addEventListener("hashchange", () => {
  const panelFromHash = window.location.hash.replace("#", "");
  setActivePanel(panelFromHash);
});

setActivePanel(window.location.hash.replace("#", ""));
applyLanguage(DEFAULT_LANG);
