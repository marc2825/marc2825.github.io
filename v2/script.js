/* =========================================================
   script.js — Portfolio logic & rendering
   Content lives in data.js (DATA, I18N).
   ========================================================= */

/* =========================================================
   State
   ========================================================= */
let currentLang  = "ja";
let currentTheme = localStorage.getItem("theme") || "dark";
let activePubTab    = "papers";
let activePubFilter = "all";

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

function d(enVal, jaVal) {
  return currentLang === "ja" ? jaVal : enVal;
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
   Render helpers
   ========================================================= */
function renderHero() {
  document.getElementById("heroName").textContent        = DATA.name;
  document.getElementById("heroAffiliation").textContent = d(DATA.affiliation, DATA.affiliationJa);
  document.getElementById("heroBio").textContent         = d(DATA.bio, DATA.bioJa);
}

function renderAbout() {
  document.getElementById("aboutIntro").textContent       = d(DATA.about.intro, DATA.about.introJa);
  document.getElementById("aboutHistory").textContent     = d(DATA.about.history, DATA.about.historyJa);
  document.getElementById("aboutAffiliation").textContent = d(DATA.about.affiliation, DATA.about.affiliationJa);

  document.getElementById("aboutLinks").innerHTML = `
    <a href="${DATA.links.cv}" class="icon-link">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 10v6m0 0-3-3m3 3 3-3M3 15v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4M3 15l2-8h14l2 8"/></svg>
      CV
    </a>
    <a href="${DATA.links.scholar}" class="icon-link">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 1 9l4 2.18V17h2v-4.82L12 14l9-5-9-6zM5 13.18V17c0 2.21 3.13 4 7 4s7-1.79 7-4v-3.82L12 16l-7-2.82z"/></svg>
      Scholar
    </a>
    <a href="${DATA.links.github}" class="icon-link">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.021C22 6.484 17.522 2 12 2z"/></svg>
      GitHub
    </a>
    <a href="${DATA.links.twitter}" class="icon-link">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      Twitter
    </a>
  `;
}

function renderResearch() {
  document.getElementById("researchLead").textContent = d(DATA.researchLead, DATA.researchLeadJa);
  document.getElementById("researchGrid").innerHTML = DATA.research.map(r => `
    <article class="research-card reveal">
      <div class="research-icon">${r.icon}</div>
      <h3>${d(r.title, r.titleJa)}</h3>
      <p>${d(r.desc, r.descJa)}</p>
      <div class="research-tags">${r.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
    </article>
  `).join("");
}

function renderPapers() {
  const papers = DATA.papers;
  document.getElementById("pubList").innerHTML = papers.map((p, i) => {
    const num       = papers.length - i;
    const badgeMap  = { journal: "J", conference: "C", preprint: "P" };
    const classMap  = { journal: "badge-journal", conference: "badge-conference", preprint: "badge-preprint" };
    const linksHtml = p.links.map(l => `<a href="${l.href}" class="pub-link">${l.label}</a>`).join("");
    return `
      <li class="pub-item reveal" data-type="${p.type}">
        <span class="pub-num">${num}</span>
        <div class="pub-body">
          <p class="pub-title">${d(p.title, p.titleJa)}<span class="pub-badge ${classMap[p.type]}">${badgeMap[p.type]}</span></p>
          <p class="pub-authors">${p.authors}</p>
          <p class="pub-venue">${d(p.venue, p.venueJa)}</p>
          <div class="pub-links">${linksHtml}</div>
        </div>
      </li>
    `;
  }).join("");
  applyPubFilter();
}

function renderTalks() {
  document.getElementById("talksList").innerHTML = DATA.talks.map(tk => `
    <li class="talk-item reveal">
      <span class="talk-year">${tk.year}</span>
      <div class="talk-body">
        <p class="talk-title">${d(tk.title, tk.titleJa)}</p>
        <p class="talk-venue">${d(tk.venue, tk.venueJa)}</p>
      </div>
    </li>
  `).join("");
}

function renderProjects() {
  document.getElementById("projectsGrid").innerHTML = DATA.projects.map(p => `
    <article class="project-card reveal">
      <div class="project-header">
        <h3 class="project-title">${d(p.title, p.titleJa)}</h3>
        <a href="${p.href}" class="project-ext" title="View project">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg>
        </a>
      </div>
      <div class="project-body">
        <p class="project-desc">${d(p.desc, p.descJa)}</p>
        <div class="project-stack">${p.stack.map(s => `<span class="stack-tag">${s}</span>`).join("")}</div>
      </div>
    </article>
  `).join("");
}

function renderArticles() {
  document.getElementById("articlesList").innerHTML = DATA.articles.map(a => `
    <li class="article-item reveal">
      <span class="article-date">${d(a.date, a.dateJa)}</span>
      <a href="${a.href}" class="article-title">${d(a.title, a.titleJa)}</a>
      <span class="article-source">${a.source}</span>
    </li>
  `).join("");
}

function renderSkills() {
  document.getElementById("skillsGrid").innerHTML = DATA.skills.map(group => `
    <div class="skill-group reveal">
      <p class="skill-group-title">${d(group.category, group.categoryJa)}</p>
      <div class="skill-items">
        ${group.items.map(item => `
          <div class="skill-item">
            <span class="skill-label">${item.name}</span>
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
  document.getElementById("timeline").innerHTML = DATA.timeline.map(item => `
    <div class="timeline-item reveal">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <p class="timeline-period">${d(item.period, item.periodJa)}</p>
        <p class="timeline-title">${d(item.title, item.titleJa)}</p>
        <p class="timeline-sub">${d(item.sub, item.subJa)}</p>
        <p class="timeline-desc">${d(item.desc, item.descJa)}</p>
      </div>
    </div>
  `).join("");
}

function renderNews() {
  document.getElementById("newsList").innerHTML = DATA.news.map(n => `
    <li class="news-item reveal">
      <span class="news-date">${d(n.date, n.dateJa)}</span>
      <span class="news-text">${d(n.text, n.textJa)}</span>
    </li>
  `).join("");
}

function renderContact() {
  document.getElementById("contactText").textContent = d(DATA.contactText, DATA.contactTextJa);

  const emailEl = document.getElementById("contactEmail");
  emailEl.textContent = DATA.links.email;
  emailEl.href = `mailto:${DATA.links.email}`;

  document.getElementById("contactSocial").innerHTML = [
    { label: "GitHub",         href: DATA.links.github   },
    { label: "Google Scholar", href: DATA.links.scholar  },
    { label: "Twitter",        href: DATA.links.twitter  },
    { label: "LinkedIn",       href: DATA.links.linkedin },
  ].map(s => `<a href="${s.href}" class="social-pill">${s.label}</a>`).join("");
}

function renderFooter() {
  document.getElementById("footerName").textContent = DATA.name;
  document.getElementById("footerYear").textContent = new Date().getFullYear();
}

/* =========================================================
   Render all dynamic content
   ========================================================= */
function renderAll() {
  renderHero();
  renderAbout();
  renderResearch();
  renderPapers();
  renderTalks();
  renderProjects();
  renderArticles();
  renderSkills();
  renderTimeline();
  renderNews();
  renderContact();
  renderFooter();
  applyI18n();
  reobserve();
}

/* =========================================================
   Publication tabs & filters
   ========================================================= */
function applyPubFilter() {
  document.querySelectorAll(".pub-item").forEach(el => {
    el.classList.toggle("hidden", activePubFilter !== "all" && el.dataset.type !== activePubFilter);
  });
}

function setPubTab(tab) {
  activePubTab = tab;
  document.getElementById("pubList").hidden   = tab !== "papers";
  document.getElementById("talksList").hidden = tab !== "talks";
  document.getElementById("pubFilters").hidden = tab !== "papers";
  document.querySelectorAll(".pub-tab").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });
}

document.querySelectorAll(".pub-tab").forEach(btn => {
  btn.addEventListener("click", () => setPubTab(btn.dataset.tab));
});

document.querySelectorAll(".pub-filter").forEach(btn => {
  btn.addEventListener("click", () => {
    activePubFilter = btn.dataset.filter;
    document.querySelectorAll(".pub-filter").forEach(b => b.classList.toggle("active", b === btn));
    applyPubFilter();
  });
});

/* =========================================================
   Navigation — scroll & active-link highlight
   ========================================================= */
const nav = document.getElementById("nav");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);

  let current = "";
  document.querySelectorAll("section[id]").forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  document.querySelectorAll(".nav-links a").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
}, { passive: true });

/* =========================================================
   Mobile nav toggle
   ========================================================= */
const navToggle = document.getElementById("navToggle");
const navLinks  = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", open);
});

navLinks.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
  });
});

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

/* =========================================================
   Language switch
   ========================================================= */
document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.dataset.lang === currentLang) return;
    currentLang = btn.dataset.lang;
    renderAll();
  });
});

/* =========================================================
   Theme toggle
   ========================================================= */
document.getElementById("themeToggle").addEventListener("click", toggleTheme);

/* =========================================================
   Init
   ========================================================= */
initTheme();
renderAll();
setPubTab("papers");
