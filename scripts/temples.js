// DOM Elements
const menuButton = document.getElementById('menu-button');
const mainNav = document.getElementById('main-nav');
const currentYear = document.getElementById('current-year');
const lastModified = document.getElementById('last-modified');

// Initialize the page
function init() {
    // Set current year
    currentYear.textContent = new Date().getFullYear();
    
    // Set last modified date
    lastModified.textContent = document.lastModified;
    
    // Set up event listeners
    menuButton.addEventListener('click', toggleMenu);
}

// Toggle mobile menu
function toggleMenu() {
    mainNav.classList.toggle('open');
    menuButton.textContent = mainNav.classList.contains('open') ? '✕' : '☰';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);