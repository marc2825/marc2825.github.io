/* =========================================================
   core.js — Shared state, helpers, and render functions
   Loaded before script.js (main page) and page.js (sub-pages).
   ========================================================= */

/* =========================================================
   State
   ========================================================= */
let currentLang     = "ja";
let currentTheme    = localStorage.getItem("theme") || "dark";
let activePubTab    = "papers";
let activePubFilter = "fullpaper";
let firstAuthorOnly = true;
let currentPapersLimit;

/* =========================================================
   WIP Banner
   ========================================================= */
function renderWipBanner() {
  const el = document.getElementById("wipBanner");
  document.documentElement.classList.toggle("has-wip-banner", !!DATA.wip);
  if (!el) return;
  el.hidden = !DATA.wip;
}

/* =========================================================
   Theme
   ========================================================= */
function initTheme() {
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon();
}

function toggleTheme() {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);
  localStorage.setItem("theme", currentTheme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  const isDark = currentTheme === "dark";
  btn.querySelector(".icon-moon").style.display = isDark  ? "block" : "none";
  btn.querySelector(".icon-sun").style.display  = !isDark ? "block" : "none";
  btn.setAttribute("aria-label", isDark ? "ライトモードに切り替え" : "ダークモードに切り替え");
}

/* =========================================================
   i18n helpers
   ========================================================= */
function t(key) {
  return I18N[currentLang]?.[key] ?? I18N.en[key] ?? key;
}

function d(enVal, jpVal) {
  return currentLang === "ja" ? jpVal : enVal;
}

function resolveUrl(href) {
  if (!href) return "";
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#|\/)/i.test(href)) return href;
  const prefix = window.location.pathname.includes("/pages/") ? "../" : "";
  return prefix + href.replace(/^\.\//, "");
}

function getLinkIcon(type) {
  switch (type) {
    case "github":
      return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.021C22 6.484 17.522 2 12 2z"/></svg>`;
    case "atcoder":
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 6h16M7 12h10M9 18h6"/><path d="M8.5 6 6 18M15.5 6 18 18"/></svg>`;
    case "scholar":
      return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 1 9l4 2.18V17h2v-4.82L12 14l9-5-9-6zM5 13.18V17c0 2.21 3.13 4 7 4s7-1.79 7-4v-3.82L12 16l-7-2.82z"/></svg>`;
    case "file":
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 10v6m0 0-3-3m3 3 3-3M3 15v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4M3 15l2-8h14l2 8"/></svg>`;
    default:
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg>`;
  }
}

function getProfileLinks(flagKey) {
  if (Array.isArray(DATA.links.items) && DATA.links.items.length) {
    return DATA.links.items.filter(item => (item.disabled || (item.href && item.href !== "#")) && item[flagKey] !== false);
  }

  return [
    DATA.links.cv       ? { type: "file",    label: "CV",              labelJP: "CV",              href: DATA.links.cv }       : null,
    DATA.links.scholar  ? { type: "scholar", label: "Scholar",         labelJP: "Scholar",         href: DATA.links.scholar }  : null,
    DATA.links.github   ? { type: "github",  label: "GitHub",          labelJP: "GitHub",          href: DATA.links.github }   : null,
    DATA.links.twitter  ? { type: "web",     label: "Twitter",         labelJP: "Twitter",         href: DATA.links.twitter }  : null,
    DATA.links.linkedin ? { type: "web",     label: "LinkedIn",        labelJP: "LinkedIn",        href: DATA.links.linkedin } : null,
  ].filter(Boolean);
}

function applyI18n() {
  document.documentElement.lang = currentLang;
  document.title = t("meta.title");

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const val = t(el.dataset.i18n);
    if (val) el.textContent = val;
  });

  document.querySelectorAll("[data-i18n-content]").forEach(el => {
    const val = t(el.dataset.i18nContent);
    if (val) el.setAttribute("content", val);
  });

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });
}

/* =========================================================
   Coming Soon helper
   ========================================================= */
function comingSoonHtml() {
  return `<p class="coming-soon">${d("Coming Soon...", "準備中")}</p>`;
}

/* =========================================================
   Render helpers  (null-guarded; accept optional limit)
   ========================================================= */
function renderHero() {
  const label       = document.getElementById("heroLabel");
  const name        = document.getElementById("heroName");
  const affiliation = document.getElementById("heroAffiliation");
  const bio         = document.getElementById("heroBio");
  if (label)       label.textContent       = d(DATA.heroLabel, DATA.heroLabelJP);
  if (name)        name.textContent        = d(DATA.name, DATA.nameJP);
  if (affiliation) affiliation.textContent = d(DATA.affiliation, DATA.affiliationJP);
  if (bio)         bio.innerHTML           = d(DATA.bio, DATA.bioJP);
}

function renderAbout() {
  const intro       = document.getElementById("aboutIntro");
  const history     = document.getElementById("aboutHistory");
  const affiliation = document.getElementById("aboutAffiliation");
  const facts       = document.getElementById("aboutFacts");
  const links       = document.getElementById("aboutLinks");
  if (intro)       intro.textContent       = d(DATA.about.intro, DATA.about.introJP);
  if (history)     history.textContent     = d(DATA.about.history, DATA.about.historyJP);
  if (affiliation) affiliation.textContent = d(DATA.about.affiliation, DATA.about.affiliationJP);
  if (facts) {
    const items = Array.isArray(DATA.about.profile) ? DATA.about.profile : [];
    facts.innerHTML = items.map(item => `
      <div class="about-fact">
        <p class="about-fact-label">${d(item.label, item.labelJP ?? item.label)}</p>
        ${Array.isArray(item.values) && item.values.length ? `
          <ul class="about-fact-list">
            ${item.values.map(entry => `
              <li class="about-fact-item">
                <span class="about-fact-item-title">${d(entry.title, entry.titleJP ?? entry.title)}</span>
                ${(entry.desc || entry.descJP) ? `<span class="about-fact-item-desc">${d(entry.desc ?? "", entry.descJP ?? entry.desc ?? "")}</span>` : ""}
              </li>
            `).join("")}
          </ul>
        ` : `<p class="about-fact-value">${d(item.value, item.valueJP ?? item.value)}</p>`}
      </div>
    `).join("");
    facts.hidden = !items.length;
  }
  if (links) {
    const profileLinks = getProfileLinks("showInAbout");
    links.innerHTML = profileLinks.map(item => `
      <${item.disabled ? "span" : "a"}${item.disabled ? "" : ` href="${resolveUrl(item.href)}"`} class="icon-link${item.disabled ? " is-disabled" : ""}"${item.disabled ? ` aria-disabled="true"` : ""}>
        ${getLinkIcon(item.type)}
        ${d(item.label, item.labelJP ?? item.label)}
      </${item.disabled ? "span" : "a"}>
    `).join("");
  }
}

function renderResearch(limit) {
  const lead = document.getElementById("researchLead");
  const grid = document.getElementById("researchGrid");
  if (lead) lead.textContent = d(DATA.researchLead, DATA.researchLeadJP);
  if (!grid) return;
  if (limit === -1) { grid.innerHTML = comingSoonHtml(); return; }
  const items = limit != null ? DATA.research.slice(0, limit) : DATA.research;
  if (!items.length) { grid.innerHTML = comingSoonHtml(); return; }
  grid.innerHTML = items.map(r => `
    <article class="research-card reveal"${r.anchorId ? ` id="${r.anchorId}"` : ""}>
      ${r.image ? `${r.imageHref ? `<a href="${resolveUrl(r.imageHref)}" class="research-media">` : `<div class="research-media">`}
        <img src="${resolveUrl(r.image)}" alt="${d(r.imageAlt || r.title, r.imageAltJP || r.imageAlt || r.titleJP)}" loading="lazy" />
      ${r.imageHref ? `</a>` : `</div>`}` : ""}
      ${(r.period || r.periodJP) ? `<p class="research-period">${d(r.period || "", r.periodJP || r.period || "")}</p>` : ""}
      <h3>${d(r.title, r.titleJP)}</h3>
      <p>${d(r.desc, r.descJP)}</p>
      ${Array.isArray(r.tags) && r.tags.length ? `<div class="research-tags">${r.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>` : ""}
      ${Array.isArray(r.links) && r.links.length ? `<div class="research-links">${r.links.map(link => `<a href="${resolveUrl(link.href)}" class="pub-link">${d(link.label, link.labelJP ?? link.label)}</a>`).join("")}</div>` : ""}
    </article>
  `).join("");
}

function getFilteredPapers() {
  return DATA.papers.filter(paper => {
    const typeMatch = activePubFilter === "all" || paper.type === activePubFilter;
    const authorMatch = !firstAuthorOnly || paper.firstAuthor === true;
    return typeMatch && authorMatch;
  });
}

function syncPublicationFilterControls() {
  document.querySelectorAll(".pub-filter").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === activePubFilter);
  });
  const faToggle = document.getElementById("firstAuthorToggle");
  if (faToggle) faToggle.classList.toggle("active", firstAuthorOnly);
}

function renderPapers(limit = currentPapersLimit) {
  const el = document.getElementById("pubList");
  if (!el) return;
  currentPapersLimit = limit;
  if (limit === -1) {
    el.innerHTML = `<li style="list-style:none">${comingSoonHtml()}</li>`;
    const pubFilters = document.getElementById("pubFilters");
    const pubTabs    = document.querySelector(".pub-tabs");
    if (pubFilters) pubFilters.hidden = true;
    if (pubTabs)    pubTabs.hidden    = true;
    return;
  }
  const filteredPapers = getFilteredPapers();
  const papers = limit != null ? filteredPapers.slice(0, limit) : filteredPapers;
  syncPublicationFilterControls();
  if (!papers.length) {
    el.innerHTML = `<li style="list-style:none">${comingSoonHtml()}</li>`;
    return;
  }
  el.innerHTML = papers.map((p, i) => {
    const num      = filteredPapers.length - i;
    const badgeMap = { fullpaper: "FULL", poster: "POSTER", demo: "DEMO" };
    const classMap = { fullpaper: "badge-fullpaper", poster: "badge-poster", demo: "badge-demo" };
    const linksHtml = (p.links || []).map(l => `<a href="${resolveUrl(l.href)}" class="pub-link">${d(l.label, l.labelJP ?? l.label)}</a>`).join("");
    return `
      <li class="pub-item reveal" data-type="${p.type}" data-first-author="${p.firstAuthor}">
        <span class="pub-num">${num}</span>
        <div class="pub-body">
          <p class="pub-title">${d(p.title, p.titleJP)}<span class="pub-badge ${classMap[p.type]}">${badgeMap[p.type]}</span></p>
          <p class="pub-authors">${p.authors}</p>
          <p class="pub-venue">${d(p.venue, p.venueJP)}</p>
          <div class="pub-links">${linksHtml}</div>
        </div>
      </li>
    `;
  }).join("");
}

function renderTalks() {
  const el = document.getElementById("talksList");
  if (!el) return;
  if (!DATA.talks.length) {
    el.innerHTML = `<li style="list-style:none">${comingSoonHtml()}</li>`;
    return;
  }
  el.innerHTML = DATA.talks.map(tk => `
    <li class="talk-item reveal">
      <span class="talk-year">${tk.year}</span>
      <div class="talk-body">
        <p class="talk-title">${d(tk.title, tk.titleJP)}</p>
        <p class="talk-venue">${d(tk.venue, tk.venueJP)}</p>
      </div>
    </li>
  `).join("");
}

function getProjectMediaItems(project) {
  if (Array.isArray(project.gallery) && project.gallery.length) {
    return project.gallery;
  }

  if (project.image) {
    return [{
      label: "Preview",
      labelJP: "プレビュー",
      src: project.image,
      alt: project.imageAlt || project.title,
      altJP: project.imageAltJP || project.imageAlt || project.titleJP || project.title,
    }];
  }

  return [];
}

function initProjectGalleries(root) {
  root.querySelectorAll("[data-project-gallery-card]").forEach(card => {
    const image = card.querySelector("[data-project-gallery-image]");
    const buttons = Array.from(card.querySelectorAll("[data-project-gallery-button]"));

    if (!image || buttons.length <= 1) return;

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        image.src = button.dataset.src || image.src;
        image.alt = d(button.dataset.altEn || "", button.dataset.altJP || button.dataset.altEn || "");
        buttons.forEach(item => item.classList.toggle("active", item === button));
      });
    });
  });
}

function renderProjects(limit) {
  const el = document.getElementById("projectsGrid");
  if (!el) return;
  if (limit === -1) { el.innerHTML = comingSoonHtml(); return; }
  const items = limit != null ? DATA.projects.slice(0, limit) : DATA.projects;
  if (!items.length) { el.innerHTML = comingSoonHtml(); return; }
  el.innerHTML = items.map(p => {
    const mediaItems = getProjectMediaItems(p);
    const primaryMedia = mediaItems[0];
    const detailHref = p.detailHref || p.href || "";

    return `
    <article class="project-card reveal" data-project-gallery-card>
      ${primaryMedia ? `<div class="project-media">
        <img
          src="${resolveUrl(primaryMedia.src)}"
          alt="${d(primaryMedia.alt || p.title, primaryMedia.altJP || primaryMedia.alt || p.titleJP)}"
          loading="lazy"
          data-project-gallery-image
        />
      </div>` : ""}
      ${mediaItems.length > 1 ? `<div class="project-gallery-controls">
        ${mediaItems.map((media, index) => `
          <button
            type="button"
            class="project-gallery-btn${index === 0 ? " active" : ""}"
            data-project-gallery-button
            data-src="${resolveUrl(media.src)}"
            data-alt-en="${media.alt || p.title}"
            data-alt-jp="${media.altJP || media.alt || p.titleJP || p.title}"
          >${d(media.label || `View ${index + 1}`, media.labelJP || media.label || `表示 ${index + 1}`)}</button>
        `).join("")}
      </div>` : ""}
      <div class="project-header">
        <div class="project-title-wrap">
          ${(p.period || p.periodJP) ? `<p class="project-period">${d(p.period || "", p.periodJP || p.period || "")}</p>` : ""}
          <h3 class="project-title">${d(p.title, p.titleJP)}</h3>
        </div>
        ${detailHref ? `<a href="${resolveUrl(detailHref)}" class="project-ext" title="${d("View details", "詳細を見る")}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg>
        </a>` : ""}
      </div>
      <div class="project-body">
        <p class="project-desc">${d(p.desc, p.descJP)}</p>
        <div class="project-stack">${p.stack.map(s => `<span class="stack-tag">${s}</span>`).join("")}</div>
        ${(p.detailHref || (Array.isArray(p.links) && p.links.length)) ? `<div class="project-actions">
          ${p.detailHref ? `<a href="${resolveUrl(p.detailHref)}" class="project-detail-link">${d(p.detailLabel || "Details", p.detailLabelJP || p.detailLabel || "詳細")}</a>` : ""}
          ${Array.isArray(p.links) && p.links.length ? `<div class="project-links">${p.links.map(link => `<a href="${resolveUrl(link.href)}" class="pub-link">${d(link.label, link.labelJP ?? link.label)}</a>`).join("")}</div>` : ""}
        </div>` : ""}
      </div>
    </article>
  `;
  }).join("");
  initProjectGalleries(el);
}

function renderArticles(limit) {
  const el = document.getElementById("articlesList");
  if (!el) return;
  if (limit === -1) { el.innerHTML = `<li>${comingSoonHtml()}</li>`; return; }
  const items = limit != null ? DATA.articles.slice(0, limit) : DATA.articles;
  if (!items.length) { el.innerHTML = `<li>${comingSoonHtml()}</li>`; return; }
  el.innerHTML = items.map(a => `
    <li class="article-item reveal">
      <span class="article-date">${d(a.date, a.dateJP)}</span>
      <a href="${resolveUrl(a.href)}" class="article-title">${d(a.title, a.titleJP)}</a>
      <span class="article-source">${a.source}</span>
    </li>
  `).join("");
}

function renderSkills() {
  const el = document.getElementById("skillsGrid");
  if (!el) return;
  el.innerHTML = DATA.skills.map(group => `
    <div class="skill-group reveal"${group.anchorId ? ` id="${group.anchorId}"` : ""}>
      <p class="skill-group-title">${d(group.category, group.categoryJP)}</p>
      <div class="skill-items">
        ${group.items.map(item => `
          <div class="skill-item"${item.anchorId ? ` id="${item.anchorId}"` : ""}${item.dynamicKey ? ` data-dynamic-skill="${item.dynamicKey}"` : ""}${item.tone ? ` data-skill-tone="${item.tone}"` : ""}>
            <span class="skill-label">${item.href ? `<a href="${resolveUrl(item.href)}" class="skill-link">${d(item.name, item.nameJP ?? item.name)}</a>` : d(item.name, item.nameJP ?? item.name)}</span>
            ${(!item.dynamicKey && (item.detail || item.detailJP)) ? `<span class="skill-detail">${d(item.detail ?? "", item.detailJP ?? item.detail ?? "")}</span>` : ""}
            <div class="skill-bar">
              <div class="skill-fill" data-level="${item.level}"></div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");
}

function renderTimeline() {
  const el = document.getElementById("timeline");
  if (!el) return;
  el.innerHTML = DATA.timeline.map(item => `
    <div class="timeline-item reveal">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <p class="timeline-period">${d(item.period, item.periodJP)}</p>
        <p class="timeline-title">${d(item.title, item.titleJP)}</p>
        <p class="timeline-sub">${d(item.sub, item.subJP)}</p>
        <p class="timeline-desc">${d(item.desc, item.descJP)}</p>
        ${item.link ? `<a href="${resolveUrl(item.link)}" class="timeline-link">${d(item.linkLabel || item.link, item.linkLabelJP || item.linkLabel || item.link)}</a>` : ""}
      </div>
    </div>
  `).join("");
}

function renderExperience() {
  const el = document.getElementById("experienceList");
  if (!el) return;
  if (!Array.isArray(DATA.experience) || !DATA.experience.length) {
    el.innerHTML = comingSoonHtml();
    return;
  }
  el.innerHTML = DATA.experience.map(item => `
    <article class="experience-item reveal">
      <p class="experience-period">${d(item.period, item.periodJP)}</p>
      <div class="experience-body">
        <p class="experience-title">${d(item.title, item.titleJP)}</p>
        <p class="experience-sub">${d(item.sub, item.subJP)}</p>
        <p class="experience-desc">${d(item.desc, item.descJP)}</p>
        ${item.link ? `<a href="${resolveUrl(item.link)}" class="timeline-link">${d(item.linkLabel || item.link, item.linkLabelJP || item.linkLabel || item.link)}</a>` : ""}
      </div>
    </article>
  `).join("");
}

/* renderNews — used for the modal list (#newsList) AND the news.html full page */
function renderNews() {
  const el = document.getElementById("newsList");
  if (!el) return;
  if (!DATA.news.length) {
    el.innerHTML = `<li>${comingSoonHtml()}</li>`;
    return;
  }
  el.innerHTML = DATA.news.map(n => `
    <li class="news-item reveal">
      <span class="news-date">${d(n.date, n.dateJP)}</span>
      <span class="news-text">${d(n.text, n.textJP)}</span>
    </li>
  `).join("");
}

/* renderNewsSection — limited preview for the in-page News section (#newsSectionList) */
function renderNewsSection(limit) {
  const el = document.getElementById("newsSectionList");
  if (!el) return;
  if (limit === -1) { el.innerHTML = `<li>${comingSoonHtml()}</li>`; return; }
  const items = limit != null ? DATA.news.slice(0, limit) : DATA.news;
  if (!items.length) { el.innerHTML = `<li>${comingSoonHtml()}</li>`; return; }
  el.innerHTML = items.map(n => `
    <li class="news-item reveal">
      <span class="news-date">${d(n.date, n.dateJP)}</span>
      <span class="news-text">${d(n.text, n.textJP)}</span>
    </li>
  `).join("");
}

function renderContact() {
  const textEl   = document.getElementById("contactText");
  const emailEl  = document.getElementById("contactEmail");
  const socialEl = document.getElementById("contactSocial");
  if (textEl)  textEl.textContent = d(DATA.contactText, DATA.contactTextJP);
  if (emailEl) {
    const contactInfo = emailEl.parentElement;
    const emails = Array.isArray(DATA.links.emails) && DATA.links.emails.length
      ? DATA.links.emails
      : (DATA.links.email ? [DATA.links.email] : []);

    if (contactInfo && emails.length) {
      contactInfo.innerHTML = emails.map((email, index) => `
        <a href="mailto:${email}" class="contact-email${index > 0 ? " contact-email-secondary" : ""}"${index === 0 ? ` id="contactEmail"` : ""}>${email}</a>
      `).join("");
    }
  }
  if (socialEl) {
    const socialLinks = getProfileLinks("showInContact");
    socialEl.innerHTML = socialLinks.map(item => `
      <a href="${resolveUrl(item.href)}" class="social-pill">${d(item.label, item.labelJP ?? item.label)}</a>
    `).join("");
  }
}

function renderFooter() {
  const nameEl = document.getElementById("footerName");
  const copyEl = document.querySelector("#footer .footer-copy");
  if (nameEl) nameEl.textContent = DATA.name;
  if (copyEl) copyEl.innerHTML = `&copy; ${new Date().getFullYear()} marc2825`;
}

function competitiveLevelFromRating(dynamicKey, rating) {
  if (!Number.isFinite(rating)) return 0;
  const scale = dynamicKey === "codeforces" ? 26 : 24;
  return Math.max(0, Math.min(100, Math.round(rating / scale)));
}

function competitiveToneFromRating(dynamicKey, rating) {
  if (!Number.isFinite(rating)) return "";

  if (dynamicKey === "codeforces") {
    if (rating < 1200) return "gray";
    if (rating < 1400) return "green";
    if (rating < 1600) return "cyan";
    if (rating < 1900) return "blue";
    if (rating < 2100) return "violet";
    if (rating < 2400) return "orange";
    return "red";
  }

  if (rating < 400) return "gray";
  if (rating < 800) return "brown";
  if (rating < 1200) return "green";
  if (rating < 1600) return "cyan";
  if (rating < 2000) return "blue";
  if (rating < 2400) return "yellow";
  if (rating < 2800) return "orange";
  return "red";
}

function updateCompetitiveSkill(dynamicKey, config) {
  const skill = DATA.skills
    .flatMap(group => group.items)
    .find(item => item.dynamicKey === dynamicKey);

  if (!skill || !config) return false;

  const currentRating   = Number.isFinite(config.currentRating) ? config.currentRating : null;
  const peakRating      = Number.isFinite(config.peakRating) ? config.peakRating : currentRating;
  const referenceRating = peakRating ?? currentRating;

  if (!Number.isFinite(referenceRating)) return false;

  skill.level    = competitiveLevelFromRating(dynamicKey, referenceRating);
  skill.name     = `${config.labelEn} ${referenceRating}`;
  skill.nameJP   = `${config.labelJP} ${referenceRating}`;
  skill.detail   = config.detailEn;
  skill.detailJP = config.detailJP;
  skill.tone     = competitiveToneFromRating(dynamicKey, referenceRating);

  return true;
}

function hydrateCompetitiveProfiles(payload) {
  const platforms = payload?.platforms;
  if (!platforms) return;

  const algoDate = typeof platforms.atcoderAlgorithm?.lastRatedContest === "string"
    ? platforms.atcoderAlgorithm.lastRatedContest.slice(0, 10)
    : "";
  const heuristicDate = typeof platforms.atcoderHeuristic?.lastRatedContest === "string"
    ? platforms.atcoderHeuristic.lastRatedContest.slice(0, 10)
    : "";
  const codeforcesDate = typeof platforms.codeforces?.lastRatedContestTime === "string"
    ? platforms.codeforces.lastRatedContestTime.slice(0, 10)
    : "";

  const updates = [
    updateCompetitiveSkill("atcoder_algorithm", {
      currentRating: platforms.atcoderAlgorithm?.currentRating,
      peakRating: platforms.atcoderAlgorithm?.highestRating,
      labelEn: "AtCoder Algorithm",
      labelJP: "AtCoder（アルゴ）",
      detailEn: `Auto-updated from official history JSON.${Number.isFinite(platforms.atcoderAlgorithm?.currentRating) ? ` Current rating: ${platforms.atcoderAlgorithm.currentRating}.` : ""}${algoDate ? ` Last rated contest: ${algoDate}` : ""}`,
      detailJP: `公式履歴JSONから自動更新。${Number.isFinite(platforms.atcoderAlgorithm?.currentRating) ? `現在レート: ${platforms.atcoderAlgorithm.currentRating}。` : ""}${algoDate ? `最終ratedコンテスト: ${algoDate}` : ""}`,
    }),
    updateCompetitiveSkill("atcoder_heuristic", {
      currentRating: platforms.atcoderHeuristic?.currentRating,
      peakRating: platforms.atcoderHeuristic?.highestRating,
      labelEn: "AtCoder Heuristic",
      labelJP: "AtCoder（ヒューリスティック）",
      detailEn: `Auto-updated from official history JSON.${Number.isFinite(platforms.atcoderHeuristic?.currentRating) ? ` Current rating: ${platforms.atcoderHeuristic.currentRating}.` : ""}${heuristicDate ? ` Last rated contest: ${heuristicDate}` : ""}`,
      detailJP: `公式履歴JSONから自動更新。${Number.isFinite(platforms.atcoderHeuristic?.currentRating) ? `現在レート: ${platforms.atcoderHeuristic.currentRating}。` : ""}${heuristicDate ? `最終ratedコンテスト: ${heuristicDate}` : ""}`,
    }),
    updateCompetitiveSkill("codeforces", {
      currentRating: platforms.codeforces?.currentRating,
      peakRating: platforms.codeforces?.highestRating,
      labelEn: "Codeforces",
      labelJP: "Codeforces",
      detailEn: `Auto-updated from official API.${Number.isFinite(platforms.codeforces?.currentRating) ? ` Current rating: ${platforms.codeforces.currentRating}.` : ""}${platforms.codeforces?.rank ? ` Rank: ${platforms.codeforces.rank}.` : ""}${codeforcesDate ? ` Last rated contest: ${codeforcesDate}` : ""}`,
      detailJP: `公式APIから自動更新。${Number.isFinite(platforms.codeforces?.currentRating) ? `現在レート: ${platforms.codeforces.currentRating}。` : ""}${platforms.codeforces?.rank ? `現在ランク: ${platforms.codeforces.rank}。` : ""}${codeforcesDate ? `最終ratedコンテスト: ${codeforcesDate}` : ""}`,
    }),
  ];

  const updated = updates.some(Boolean);

  if (updated && document.getElementById("skillsGrid")) {
    renderSkills();
    reobserve();
  }
}

async function loadDynamicData() {
  try {
    const res = await fetch(resolveUrl("database/atcoder.json"), { cache: "no-store" });
    if (!res.ok) return;
    const payload = await res.json();
    hydrateCompetitiveProfiles(payload);
  } catch (_) {
    /* Ignore dynamic data failures and keep the static fallback. */
  }
}

/* =========================================================
   Publication tabs & filters
   ========================================================= */
function applyPubFilter() {
  renderPapers();
  reobserve();
}

function setPubTab(tab) {
  activePubTab = tab;
  const pubList    = document.getElementById("pubList");
  const talksList  = document.getElementById("talksList");
  const pubFilters = document.getElementById("pubFilters");
  if (pubList)    pubList.hidden    = tab !== "papers";
  if (talksList)  talksList.hidden  = tab !== "talks";
  if (pubFilters) pubFilters.hidden = tab !== "papers";
  document.querySelectorAll(".pub-tab").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });
}

/* =========================================================
   Intersection Observer — reveal & skill bar animation
   ========================================================= */
let io;

function reobserve() {
  if (io) io.disconnect();

  io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      entry.target.querySelectorAll(".skill-fill").forEach(bar => {
        bar.style.width = bar.dataset.level + "%";
      });
      io.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}
