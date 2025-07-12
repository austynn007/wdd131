// DOM Element References
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Add Chapter Functionality
button.addEventListener('click', () => {
    if (input.value.trim() !== '') { // Check for non-empty input
        // Create list item
        const li = document.createElement('li');
        
        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete');
        deleteButton.setAttribute('aria-label', `Remove ${input.value}`);
        
        // Set list item content
        li.textContent = input.value;
        li.append(deleteButton);
        
        // Add to list
        list.append(li);
        
        // Clear input
        input.value = '';
        input.focus();
        
        // Delete functionality
        deleteButton.addEventListener('click', () => {
            li.remove();
        });
    } else {
        // Optional: Alert user if input is empty
        input.focus();
    }
});

// Optional: Allow Enter key to submit
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        button.click();
    }
});