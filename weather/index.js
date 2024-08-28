lucide.createIcons();

const weatherForm = document.querySelector("#weather-form");
const cityInput = document.querySelector("#input-city");

const card = document.querySelector(".card");

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
    const apiKey = await getApiKey();
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
    const imgDisplay = document.createElement("img");
    imgDisplay.id = "img-display";
    imgDisplay.classList.add("img-display");
    imgDisplay.src = getWeatherImg(id);
    card.appendChild(imgDisplay);
    createCardElement("span", "description-display", description);
    createCardElement("span", "humidity-display", `humidity: ${humidity}%`);
}

function getWeatherImg(weatherId) {

    switch (true) {
        case (weatherId >= 200 && weatherId < 300): // thunderstorm
            return "images/thunderstorm.png";
        case (weatherId >= 300 && weatherId < 400): // drizzle
            return "images/drizzle.png";
        case (weatherId >= 500 && weatherId < 600): // rain
            return "images/rain.png";
        case (weatherId >= 600 && weatherId < 700): // snow
            return "images/snow.png";
        case (weatherId >= 700 && weatherId < 800): // haze/fog
            return "images/clouds.png";
        case (weatherId === 800): // clear sky
            return "images/sunny.png";
        case (weatherId > 800): // cloudy
            return "images/clouds.png";
        default:
            "images/";
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

async function getApiKey() {
    try {
        const data = await fetch("apikey");
        if (!data.ok) {
            throw new Error("Cound not fetch apikey");
        }
        return await data.text();
    }
    catch (error) {
        console.error(error);
        displayError(error);
    }
}