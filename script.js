// Mobile Navigation Toggle
const navToggle = document.querySelector(".mobile-nav-toggle");
const nav = document.querySelector(".primary-navigation");

navToggle.addEventListener("click", () => {
  if (nav.getAttribute("data-visible") === "false") {
    nav.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true);
  } else {
    nav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
});

// Navigation Active Indicator

// Tab List Functionality
const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');
let tabFocus = 0;
function changeTabFocus(e) {
  const keydownLeft = 37;
  const keydownRight = 39;
  if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
    tabs[tabFocus].setAttribute("tabindex", -1);

    if (e.keyCode === keydownLeft) {
      tabFocus--;
      if (tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    } else if (e.keyCode === keydownRight) {
      tabFocus++;
      if (tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    }
    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
  }
}

function hideContent(parent, content) {
  for (let item of parent.querySelectorAll(content)) {
    item.setAttribute("hidden", true);
  }
}
function showContent(parent, content) {
  parent.querySelector(content).removeAttribute("hidden");
}
function changeTabPanel(e) {
  const targetTab = e.target;
  const targetPanel = targetTab.getAttribute("aria-controls");
  const targetPicture = targetTab.getAttribute("data-picture");
  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;

  tabContainer
    .querySelector('[aria-selected="true"]')
    .setAttribute("aria-selected", "false");
  targetTab.setAttribute("aria-selected", "true");

  hideContent(mainContainer, '[role="tabpanel"]');
  hideContent(mainContainer, "picture");

  showContent(mainContainer, [`#${targetPanel}`]);
  showContent(mainContainer, [`#${targetPicture}`]);
}

tabList.addEventListener("keydown", changeTabFocus);
tabs.forEach((tab) => {
  tab.addEventListener("click", changeTabPanel);
});
