/* Apply the saved theme before styles load, including when storage is blocked. */
(() => {
  let theme = "dark";
  try {
    if (localStorage.getItem("theme") === "light") theme = "light";
  } catch (_) {
    /* Keep the default when browser storage is unavailable. */
  }
  document.documentElement.setAttribute("data-theme", theme);
})();
