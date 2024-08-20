const weatherForm = document.querySelector("#weather-form");
const cityInput = document.querySelector("#input-city");

const card = document.querySelector(".card");
const apiKey = "bd90e36423404676711c3e3f3ec3887b";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if (!city) {
        displayError("Enter a city");
        return;
    }

    try {
        const weatherData = await getWeatherData(city);
        displayWeatherInfo(weatherData);
    } 
    catch (error) {
        console.error(error);
        displayError(error);
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }
    return response.json();
}

function displayWeatherInfo(data) {
    const {
        name: city, 
        main: {temp, humidity}, 
        weather: [{description, id}]
    } = data;

    card.textContent = "";  // limpando conteudo do card
    card.style.display = "flex";

    createCardElement("h1", "city-display", city);
    createCardElement("span", "temperature-display", `${(temp - 273.15).toFixed(1)}°C`);
    createCardElement("span", "humidity-display", `Humidity: ${humidity}%`);
    createCardElement("span", "description-display", description);
    createCardElement("span", "emoji-display", getWeatherEmoji(id));
}

function getWeatherEmoji(weatherId) {

    switch (true) {
        case (weatherId >= 200 && weatherId < 300): // thunderstorm
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400): // drizzle
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600): // rain
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700): // snow
            return "❄️";
        case (weatherId >= 700 && weatherId < 800): // haze/fog
            return "🌫️";
        case (weatherId === 800): // clear sky
            return "☀️";
        case (weatherId > 800): // cloudy
            return "☁️";
        default:
            "❔";
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("span");
    errorDisplay.id = "error-display";
    errorDisplay.classList.add("error-display");
    errorDisplay.textContent = message;

    card.textContent = "";
    card.append(errorDisplay);
}

function createCardElement(type, id, textContent) {
    const cardElement = document.createElement(type);
    cardElement.id = id;
    cardElement.classList.add(id);
    cardElement.textContent = textContent;
    card.appendChild(cardElement);
}