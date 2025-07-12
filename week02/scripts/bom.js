// DOM Elements
const input = document.querySelector('#favchap');
const button = document.querySelector('#addBtn');
const list = document.querySelector('#list');
const errorMsg = document.querySelector('.error-msg');
const counter = document.querySelector('.counter');

// Load saved chapters on startup
document.addEventListener('DOMContentLoaded', loadChapters);

// Add Chapter Function
function addChapter(chapter) {
  const li = document.createElement('li');
  const deleteButton = document.createElement('button');
  
  li.textContent = chapter;
  deleteButton.textContent = '❌';
  deleteButton.className = 'delete';
  deleteButton.setAttribute('aria-label', `Remove ${chapter}`);
  
  li.append(deleteButton);
  list.append(li);
  
  // Delete functionality
  deleteButton.addEventListener('click', () => {
    li.remove();
    saveChapters();
    updateCounter();
    input.focus();
  });
  
  // Clear input and save
  input.value = '';
  saveChapters();
  updateCounter();
  input.focus();
}

// Save chapters to localStorage
function saveChapters() {
  const chapters = Array.from(list.children).map(li => 
    li.textContent.replace('❌', '').trim()
  );
  localStorage.setItem('bomChapters', JSON.stringify(chapters));
}

// Load chapters from localStorage
function loadChapters() {
  const saved = JSON.parse(localStorage.getItem('bomChapters')) || [];
  saved.forEach(chapter => addChapter(chapter));
  updateCounter();
}

// Update chapter counter
function updateCounter() {
  const count = list.children.length;
  counter.textContent = `${count}/10 chapters ${count >= 10 ? '✅' : ''}`;
  
  // Optional: Disable input when reaching limit
  if (count >= 10) {
    input.placeholder = 'List full!';
    input.disabled = true;
    button.disabled = true;
  } else {
    input.placeholder = 'Alma 5';
    input.disabled = false;
    button.disabled = false;
  }
}

// Event Listeners
button.addEventListener('click', () => {
  const chapter = input.value.trim();
  
  if (!chapter) {
    errorMsg.textContent = '⛔ Please enter a chapter first!';
    input.focus();
    return;
  }
  
  if (Array.from(list.children).some(li => 
    li.textContent.replace('❌', '').trim() === chapter
  )) {
    errorMsg.textContent = '⚠️ This chapter already exists!';
    return;
  }
  
  errorMsg.textContent = '';
  addChapter(chapter);
});

// Support Enter key
input.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    button.click();
  }
});