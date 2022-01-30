// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

var submenuGrids = document.querySelectorAll(".submenu-header__block");
submenuGrids.forEach((grid) => {
  var submenuColumnCount = grid.querySelectorAll(".submenu-header__category").length;
  grid.style.gridTemplateColumns = `repeat(${submenuColumnCount}, 1fr)`;
});


document.addEventListener('click', documentActions);

function documentActions(e) {
  var  targetElement = e.target;
  if (targetElement.closest('[data-submenu-btn]')) {
    var submenuBtn = targetElement.closest('[data-submenu-btn]');
    var submenuId = submenuBtn.dataset.submenuBtn;
    var submenu = document.querySelector(`[data-submenu="${submenuId}"]`);
    if (submenu) {
      var activeSubmenu = document.querySelector('.submenu-header__block_active');
      var activeLink = document.querySelector('.menu-catalog__button_active');
      if (activeSubmenu && activeSubmenu !== submenu) {
        activeSubmenu.classList.remove('submenu-header__block_active');
        activeLink.classList.remove('menu-catalog__button_active');
      }

      submenu.classList.toggle('submenu-header__block_active');
      submenuBtn.classList.toggle('menu-catalog__button_active');
    }
  }
  if (targetElement.closest('.menu-top-header__item_catalog .menu-top-header__link')) {
    var catalogList = document.querySelector('.menu-catalog');
    catalogList.classList.add('menu-catalog_active');
  }
  if (targetElement.closest('.side-menu-back')) {
    var backButton = targetElement.closest('.side-menu-back');
    var currentSideMenu = backButton.parentElement;
    var activeClass = Array.from(currentSideMenu.classList).find((menuClass) => {
      if (menuClass.endsWith('_active')) {
        return menuClass;
      }
    });
    currentSideMenu.classList.remove(activeClass);
  }
}