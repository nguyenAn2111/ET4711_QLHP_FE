const menuItems = document.querySelectorAll(".menu-item[data-page]");
const pageSections = document.querySelectorAll(".page-section");

menuItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    menuItems.forEach((menu) => menu.classList.remove("active"));
    pageSections.forEach((page) => page.classList.remove("active"));

    item.classList.add("active");
    const targetPage = document.getElementById(item.dataset.page);
    if (targetPage) targetPage.classList.add("active");
  });
});