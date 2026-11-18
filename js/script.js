/* =========================================================
   script.js — Main-page event binding & initialization
   Requires: data.js, core.js  (both loaded first)
   ========================================================= */

/* =========================================================
   Render all dynamic content  (main page, preview limits)
   ========================================================= */
function renderAll() {
  const p = DATA.preview || {};
  renderSafely(renderHero);
  renderSafely(renderAbout);
  renderSafely(renderResearch, p.research || undefined);
  renderSafely(renderPapers, p.papers || undefined);
  renderSafely(renderReviewing);
  renderSafely(renderProjects, p.projects || undefined);
  renderSafely(renderArticles, p.articles || undefined);
  renderSafely(renderSkills);
  renderSafely(renderTimeline);
  renderSafely(renderExperience);
  renderSafely(renderNews);                              /* modal list — always all */
  renderSafely(renderNewsSection, p.news || undefined);   /* in-page section */
  renderSafely(renderContact);
  renderSafely(renderFooter);
  renderSafely(applyViewSettings);
  renderSafely(applyI18n);
  renderSafely(reobserve);
}

/* =========================================================
   Publication filters
   ========================================================= */
initPublicationFilters();

/* =========================================================
   Navigation — scroll & active-link highlight
   ========================================================= */
const nav = document.getElementById("nav");
const navSections = Array.from(document.querySelectorAll("section[id]"));
const sectionLinks = document.querySelectorAll(".nav-links a");
let navFramePending = false;

function updateNavigation() {
  navFramePending = false;
  const scrollY = window.scrollY;
  let current = "";
  navSections.forEach(sec => {
    if (!sec.hidden && scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  // Finish layout reads before writing classes, once per animation frame.
  nav?.classList.toggle("scrolled", scrollY > 20);
  sectionLinks.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
}

function scheduleNavigationUpdate() {
  if (navFramePending) return;
  navFramePending = true;
  requestAnimationFrame(updateNavigation);
}

window.addEventListener("scroll", scheduleNavigationUpdate, { passive: true });
window.addEventListener("resize", scheduleNavigationUpdate);

/* =========================================================
   Mobile nav toggle
   ========================================================= */
const navToggle = document.getElementById("navToggle");
const navLinks  = document.getElementById("navLinks");

function setMobileNavOpen(open) {
  if (!navLinks || !navToggle) return;
  navLinks.classList.toggle("open", open);
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  updateMenuToggle();
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => setMobileNavOpen(!navLinks.classList.contains("open")));

  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => setMobileNavOpen(false));
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && navLinks.classList.contains("open")) {
      setMobileNavOpen(false);
      navToggle.focus();
    }
  });
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
document.getElementById("themeToggle")?.addEventListener("click", toggleTheme);

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
  if (!newsModal || newsModal.open) return;
  newsModalPreviousFocus = document.activeElement;
  newsModalPreviousOverflow = document.body.style.overflow;
  newsModal.showModal();
  newsFab?.classList.add("hidden");
  document.body.style.overflow = "hidden";
}

function closeNewsModal() {
  if (newsModal?.open) newsModal.close();
}

newsModal?.addEventListener("keydown", event => {
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

newsModal?.addEventListener("close", () => {
  newsFab?.classList.remove("hidden");
  document.body.style.overflow = newsModalPreviousOverflow;
  if (newsModalPreviousFocus?.isConnected) newsModalPreviousFocus.focus();
});

newsFab?.addEventListener("click", openNewsModal);
newsModalClose?.addEventListener("click", closeNewsModal);
newsModalBackdrop?.addEventListener("click", closeNewsModal);

/* =========================================================
   Init
   ========================================================= */
initView();
initAnalytics();
initTheme();
renderWipBanner();
renderAll();
loadDynamicData();
scheduleNavigationUpdate();
