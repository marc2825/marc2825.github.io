const tabButtons = [...document.querySelectorAll(".tab-button")];
const panels = [...document.querySelectorAll(".panel")];

function setActivePanel(panelKey) {
  const hasMatch = panels.some((panel) => panel.dataset.panel === panelKey);
  const target = hasMatch ? panelKey : "about";

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

window.addEventListener("hashchange", () => {
  const panelFromHash = window.location.hash.replace("#", "");
  setActivePanel(panelFromHash);
});

setActivePanel(window.location.hash.replace("#", ""));
