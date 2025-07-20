// DOM Elements
const currentYearElement = document.getElementById('current-year');
const lastModifiedElement = document.getElementById('last-modified');
const tempElement = document.getElementById('temp');
const windSpeedElement = document.getElementById('wind-speed');
const windChillElement = document.getElementById('wind-chill');

// Static weather data for Nigeria (in metric units)
const temperature = 32; // °C
const windSpeed = 12; // km/h

// Calculate wind chill factor in metric units
function calculateWindChill(temp, speed) {
    // Formula: 13.12 + 0.6215T - 11.37(V^0.16) + 0.3965T(V^0.16)
    return (13.12 + (0.6215 * temp) - (11.37 * Math.pow(speed, 0.16)) + (0.3965 * temp * Math.pow(speed, 0.16))).toFixed(1);
}

// Update weather information
function updateWeather() {
    tempElement.textContent = temperature;
    windSpeedElement.textContent = windSpeed;
    
    // Only calculate wind chill if conditions are met (metric: <=10°C and >4.8km/h)
    if (temperature <= 10 && windSpeed > 4.8) {
        const windChill = calculateWindChill(temperature, windSpeed);
        windChillElement.textContent = `${windChill}°C`;
    } else {
        windChillElement.textContent = "N/A";
    }
}

// Initialize page
function init() {
    // Set current year
    currentYearElement.textContent = new Date().getFullYear();
    
    // Set last modified date
    lastModifiedElement.textContent = document.lastModified;
    
    // Update weather
    updateWeather();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);