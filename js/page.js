/* =========================================================
   page.js — Sub-page initialization
   Requires: data.js, core.js  (both loaded first)
   ========================================================= */

function initSubPage(section) {
  initView();
  initAnalytics();
  initTheme();
  renderWipBanner();

  if (section === "publications") {
    const params = new URLSearchParams(window.location.search);
    const filter = params.get("filter");
    const firstAuthor = params.get("firstAuthor");

    if (["all", "fullpaper", "poster", "demo"].includes(filter)) {
      activePubFilter = filter;
    }
    if (firstAuthor != null) {
      firstAuthorOnly = !["0", "false", "off"].includes(firstAuthor.toLowerCase());
    }
  }

  /* Theme toggle */
  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  /* Language switch */
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.dataset.lang === currentLang) return;
      currentLang = btn.dataset.lang;
      renderSubPage(section);
      renderSafely(applyI18n);
      renderSafely(reobserve);
    });
  });

  /* Nav scroll shadow */
  const nav = document.getElementById("nav");
  if (nav) {
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 20);
    }, { passive: true });
  }

  /* Publication filters (publications page only) */
  if (section === "publications") {
    document.querySelectorAll(".pub-filter").forEach(btn => {
      btn.addEventListener("click", () => {
        activePubFilter = btn.dataset.filter;
        document.querySelectorAll(".pub-filter").forEach(b => b.classList.toggle("active", b === btn));
        applyPubFilter();
      });
    });
    const faToggle = document.getElementById("firstAuthorToggle");
    if (faToggle) {
      faToggle.addEventListener("click", () => {
        firstAuthorOnly = !firstAuthorOnly;
        faToggle.classList.toggle("active", firstAuthorOnly);
        applyPubFilter();
      });
    }
  }

  renderSubPage(section);
  renderSafely(applyI18n);
  renderSafely(reobserve);
  loadDynamicData();
}

function renderSubPage(section) {
  switch (section) {
    case "research":
      renderSafely(renderResearch);
      break;
    case "publications":
      renderSafely(renderPapers);
      renderSafely(renderReviewing);
      break;
    case "projects":
      renderSafely(renderProjects);
      break;
    case "articles":
      renderSafely(renderArticles);
      break;
    case "news":
      renderSafely(renderNews);
      break;
  }
  renderSafely(renderFooter);
  renderSafely(applyViewSettings, section);
}
