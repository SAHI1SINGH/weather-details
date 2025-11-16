const API_KEY = "b25b115a53b2b0304316ed1ccce65944"; // 🔴 replace with your key
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const messageEl = document.getElementById("message");

const weatherCard = document.getElementById("weather-card");
const cityNameEl = document.getElementById("city-name");
const tempEl = document.getElementById("temperature");
const descEl = document.getElementById("description");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");

async function getWeather(city) {
  if (!city) {
    showMessage("Please enter a city name.");
    return;
  }

  showMessage("Please Wait...");

  try {
    const url = `${API_URL}?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric`;

    const res = await fetch(url);

    if (!res.ok) {
      if (res.status === 404) {
        showMessage("City not found. Try another name.");
      } else {
        showMessage("Something went wrong. Try again.");
      }
      weatherCard.classList.add("hidden");
      return;
    }

    const data = await res.json();
    updateWeatherUI(data);
    showMessage(""); // clear error
  } catch (err) {
    console.error(err);
    showMessage("Network error. Check your internet.");
    weatherCard.classList.add("hidden");
  }
}

function updateWeatherUI(data) {
  const cityName = `${data.name}, ${data.sys.country}`;
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  cityNameEl.textContent = cityName;
  tempEl.textContent = temp;
  descEl.textContent = description;
  humidityEl.textContent = `${humidity}%`;
  windEl.textContent =` ${windSpeed} m/s`;

  weatherCard.classList.remove("hidden");
}

function showMessage(msg) {
  messageEl.textContent = msg;
}

// 🔍 search button click
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  getWeather(city);
});

// 🔍 press Enter in input
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    getWeather(city);
  }
});