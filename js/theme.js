/* Apply the saved theme before styles load, including when storage is blocked. */
(() => {
  let theme = "light";
  try {
    if (localStorage.getItem("theme") === "dark") theme = "dark";
  } catch (_) {
    /* Keep the default when browser storage is unavailable. */
  }
  document.documentElement.setAttribute("data-theme", theme);
})();
