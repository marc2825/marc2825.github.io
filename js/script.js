/* =========================================================
   script.js — Main-page event binding & initialization
   Requires: data.js, core.js  (both loaded first)
   ========================================================= */

/* =========================================================
   Render all dynamic content  (main page, preview limits)
   ========================================================= */
function renderAll() {
  renderHero();
  renderAbout();
  const p = DATA.preview;
  renderResearch(p.research  || undefined);
  renderPapers(p.papers      || undefined);
  renderTalks();
  renderReviewing();
  renderProjects(p.projects  || undefined);
  renderArticles(p.articles  || undefined);
  renderSkills();
  renderTimeline();
  renderExperience();
  renderNews();                              /* modal list — always all */
  renderNewsSection(p.news   || undefined);  /* in-page section */
  renderContact();
  renderFooter();
  applyI18n();
  reobserve();
}

/* =========================================================
   Publication tabs & filters
   ========================================================= */
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

document.getElementById("firstAuthorToggle").addEventListener("click", () => {
  firstAuthorOnly = !firstAuthorOnly;
  document.getElementById("firstAuthorToggle").classList.toggle("active", firstAuthorOnly);
  applyPubFilter();
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

function setMobileNavOpen(open) {
  navLinks.classList.toggle("open", open);
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  updateMenuToggle();
}

navToggle.addEventListener("click", () => setMobileNavOpen(!navLinks.classList.contains("open")));

navLinks.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    setMobileNavOpen(false);
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && navLinks.classList.contains("open")) {
    setMobileNavOpen(false);
    navToggle.focus();
  }
});

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
   News modal
   ========================================================= */
const newsFab           = document.getElementById("newsFab");
const newsModal         = document.getElementById("newsModal");
const newsModalClose    = document.getElementById("newsModalClose");
const newsModalBackdrop = document.getElementById("newsModalBackdrop");
let newsModalPreviousFocus;
let newsModalPreviousOverflow;

function openNewsModal() {
  if (newsModal.open) return;
  newsModalPreviousFocus = document.activeElement;
  newsModalPreviousOverflow = document.body.style.overflow;
  newsModal.showModal();
  newsFab.classList.add("hidden");
  document.body.style.overflow = "hidden";
}

function closeNewsModal() {
  if (newsModal.open) newsModal.close();
}

newsModal.addEventListener("keydown", event => {
  if (event.key !== "Tab") return;
  const controls = Array.from(newsModal.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'))
    .filter(el => el.getClientRects().length > 0);
  const first = controls[0];
  const last = controls.at(-1);
  if (!first) return;
  const index = controls.indexOf(document.activeElement);
  if (event.shiftKey && index <= 0) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && (index === -1 || document.activeElement === last)) {
    event.preventDefault();
    first.focus();
  }
});

newsModal.addEventListener("close", () => {
  newsFab.classList.remove("hidden");
  document.body.style.overflow = newsModalPreviousOverflow;
  if (newsModalPreviousFocus?.isConnected) newsModalPreviousFocus.focus();
});

newsFab.addEventListener("click", openNewsModal);
newsModalClose.addEventListener("click", closeNewsModal);
newsModalBackdrop.addEventListener("click", closeNewsModal);

/* =========================================================
   Init
   ========================================================= */
initAnalytics();
initTheme();
renderWipBanner();
renderAll();
loadDynamicData();
setPubTab("papers");
