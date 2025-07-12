// Corrected JavaScript code with all fixes
const radiusOutput = document.getElementById('radius');
const areaOutput = document.getElementById('area'); // Fixed selector

let area = 0;
const PI = 3.14159; // Fixed double equals

let radius = 10; // Changed from const to let
area = PI * radius * radius;
radiusOutput.textContent = radius; // Added textContent
areaOutput.textContent = area.toFixed(2); // Added formatting

radius = 20; // Now works because radius is let
area = PI * radius * radius;
radiusOutput.textContent += `, ${radius}`; // Combined output
areaOutput.textContent += `, ${area.toFixed(2)}`;