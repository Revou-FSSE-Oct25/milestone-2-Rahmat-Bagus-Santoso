// Navbar menu
const menuToggle = document.getElementById('menu-toggle');
const menuItems = document.getElementById('menu-items');

if (menuToggle && menuItems) {
  menuToggle.addEventListener('click', () => {
    menuItems.classList.toggle('hidden');
  });
}

// USERNAME STORAGE
const USER_STORAGE_KEY = 'carbonsdale_username';

export function loadUsername() {
  return localStorage.getItem(USER_STORAGE_KEY) || 'Guest';
}

export function saveUsername(username) {
  localStorage.setItem(USER_STORAGE_KEY, username);
}
