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
  renderResearch(2);
  renderPapers(2);
  renderTalks();
  renderProjects(2);
  renderArticles(2);
  renderSkills();
  renderTimeline();
  renderNews();          /* modal list */
  renderNewsSection(4);  /* in-page section */
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

function openNewsModal() {
  newsModal.classList.add("is-open");
  newsFab.classList.add("hidden");
  document.body.style.overflow = "hidden";
}

function closeNewsModal() {
  newsModal.classList.remove("is-open");
  newsFab.classList.remove("hidden");
  document.body.style.overflow = "";
}

newsFab.addEventListener("click", openNewsModal);
newsModalClose.addEventListener("click", closeNewsModal);
newsModalBackdrop.addEventListener("click", closeNewsModal);
document.addEventListener("keydown", e => { if (e.key === "Escape") closeNewsModal(); });

/* =========================================================
   Init
   ========================================================= */
initTheme();
renderWipBanner();
renderAll();
setPubTab("papers");
