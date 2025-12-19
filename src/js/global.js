// DOM elements
const menuToggle = document.getElementById("menu-toggle");
const menuItems = document.getElementById("menu-items");


//event listeners
menuToggle.addEventListener("click", () => {
    menuItems.classList.toggle("hidden");
});



