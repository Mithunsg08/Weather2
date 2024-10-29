const apiKey = '790a61d86eda5c3d39845601911cec42';
const currentWeatherEl = document.getElementById('currentWeather');
const forecastCardsEl = document.getElementById('forecastCards');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('windSpeed');
const pressureEl = document.getElementById('pressure');

// Function to fetch weather data
async function fetchWeatherData(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`);
    const data = await response.json();
    updateCurrentWeather(data);
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`);
    const forecastData = await forecastResponse.json();
    updateForecast(forecastData);
}

// Update current weather
function updateCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const weather = data.weather[0].main;
    const emoji = getWeatherEmoji(weather);
    const location = data.name;
    
    currentWeatherEl.innerHTML = `<h1>${temp}°F ${emoji}</h1><p>${weather}</p><p>Location: ${location}</p>`;
    humidityEl.innerText = `${data.main.humidity}%`;
    windSpeedEl.innerText = `${data.wind.speed} mph`;
    pressureEl.innerText = `${data.main.pressure} in`;
}

// Update forecast
function updateForecast(data) {
    forecastCardsEl.innerHTML = '';
    data.list.slice(0, 5).forEach(day => {
        const tempDay = Math.round(day.main.temp);
        const tempNight = Math.round(day.main.temp_min);
        const weather = day.weather[0].main;
        const emoji = getWeatherEmoji(weather);

        const dayCard = document.createElement('div');
        dayCard.classList.add('day-card');
        dayCard.innerHTML = `<p>${new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                             <img src="${emoji.icon}" alt="${weather}">
                             <p>${tempDay}°F / ${tempNight}°F</p>`;
        forecastCardsEl.appendChild(dayCard);
    });
}

// Get weather emoji
function getWeatherEmoji(weather) {
    const emojis = {
        Clear: { icon: 'https://example.com/sunny-icon.png', emoji: '☀️' },
        Rain: { icon: 'https://example.com/rain-icon.png', emoji: '🌧️' },
        Snow: { icon: 'https://example.com/snow-icon.png', emoji: '❄️' },
        Clouds: { icon: 'https://example.com/cloudy-icon.png', emoji: '☁️' },
        // Add more weather conditions as needed
    };
    return emojis[weather] || { icon: 'https://example.com/default-icon.png', emoji: '🌈' }; // Default icon
}

// Get user's location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude);
        }, () => {
            alert("Unable to retrieve your location. Please check your browser settings to allow location access.");
            // Optionally, you could set a default location here
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Call the function to get location on page load
document.addEventListener("DOMContentLoaded", getLocation);
