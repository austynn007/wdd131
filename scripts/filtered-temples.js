// DOM Elements
const menuButton = document.getElementById('menu-button');
const mainNav = document.getElementById('main-nav');
const currentYear = document.getElementById('current-year');
const lastModified = document.getElementById('last-modified');
const templesContainer = document.getElementById('temples-container');
const navLinks = document.querySelectorAll('nav a');

// Temple data array with optimized images
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 40000,
    imageUrl: "images/rome-italy-temple.jpg" 
  },
  {
    templeName: "San Diego California",
    location: "San Diego, California, United States",
    dedicated: "1993, April, 25",
    area: 72000,
    imageUrl: "images/san-diego-temple.jpg"
  },
  {
    templeName: "Hong Kong China",
    location: "Hong Kong, China",
    dedicated: "1996, May, 26",
    area: 4840,
    imageUrl: "images/hong-kong-temple.jpg"
  }
];

// Initialize the page
function init() {
    currentYear.textContent = new Date().getFullYear();
    lastModified.textContent = document.lastModified;
    menuButton.addEventListener('click', toggleMenu);
    setupNavigation();
    displayTemples(temples);
}

function toggleMenu() {
    mainNav.classList.toggle('open');
    menuButton.textContent = mainNav.classList.contains('open') ? '✕' : '☰';
}

function displayTemples(templesArray) {
    templesContainer.innerHTML = '';
    
    templesArray.forEach(temple => {
        const templeCard = document.createElement('article');
        templeCard.className = 'temple-card';
        const year = parseInt(temple.dedicated.split(',')[0]);
        
        templeCard.innerHTML = `
            <img src="${temple.imageUrl}" 
                 alt="${temple.templeName}" 
                 width="400"
                 height="250"
                 loading="lazy"
                 data-year="${year}"
                 data-area="${temple.area}">
            <div class="temple-info">
                <h2>${temple.templeName}</h2>
                <p><strong>Location:</strong> ${temple.location}</p>
                <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
                <p><strong>Size:</strong> ${temple.area.toLocaleString()} sq ft</p>
            </div>
        `;
        
        templesContainer.appendChild(templeCard);
    });
}

function filterTemples(criteria) {
    let filtered = [];
    switch(criteria) {
        case 'old': filtered = temples.filter(t => parseInt(t.dedicated.split(',')[0]) < 1900); break;
        case 'new': filtered = temples.filter(t => parseInt(t.dedicated.split(',')[0]) > 2000); break;
        case 'large': filtered = temples.filter(t => t.area > 90000); break;
        case 'small': filtered = temples.filter(t => t.area < 10000); break;
        default: filtered = temples;
    }
    displayTemples(filtered);
    navLinks.forEach(link => link.classList.toggle('active', link.dataset.filter === criteria));
}

function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            filterTemples(link.dataset.filter);
        });
    });
}

document.addEventListener('DOMContentLoaded', init);