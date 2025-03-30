// script.js

// API Key and base URL for the weather API (You can use OpenWeatherMap or similar APIs)
const API_KEY = 'b01d3d9a0750f64ef075b5817cff5d8f'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Selectors
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const cityName = document.querySelector('.city-name');
const tempValue = document.getElementById('tempValue');
const weatherDescription = document.getElementById('weatherDescription');
const weatherIcon = document.getElementById('weatherIcon');
const humidityValue = document.getElementById('humidityValue');
const windSpeedValue = document.getElementById('windSpeedValue');

// Event Listener for the search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

// Fetch Weather Data from API
async function getWeatherData(city) {
    try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        if (data.cod === '404') {
            alert('City not found!');
            return;
        }

        updateWeatherInfo(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Update the UI with the fetched data
function updateWeatherInfo(data) {
    cityName.textContent = data.name;
    tempValue.textContent = Math.round(data.main.temp);
    weatherDescription.textContent = data.weather[0].description;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    humidityValue.textContent = data.main.humidity;
    windSpeedValue.textContent = Math.round(data.wind.speed);
}

// Optionally: Add functionality for geolocation-based weather
window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherDataByCoordinates(lat, lon);
        });
    }
});

async function getWeatherDataByCoordinates(lat, lon) {
    try {
        const response = await fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        updateWeatherInfo(data);
    } catch (error) {
        console.error('Error fetching weather data by coordinates:', error);
    }
}
