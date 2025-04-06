const apiKey = "20da423906ccf27bec8c2d81c8f4a2eb";

const weatherDataEle = document.querySelector(".weather-data");
const cityNameEle = document.querySelector("#city-name");
const formEle = document.querySelector("form");
const imgIcon = document.querySelector(".icon");

formEle.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityValue = cityNameEle.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
            throw new Error("Network response is not ok!");
        }

        const data = await response.json();

        // Weather data
        const temprature = Math.floor(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        // Additional data
        const feelsLike = Math.floor(data.main.feels_like);
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        // Sunrise and Sunset times
        const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();

        // Location info (city and country)
        const locationInfo = `${data.name}, ${data.sys.country}`;

        // Air Quality (for this example, we assume it's not part of the weather API, but you could use another API to fetch this)
        const airQuality = "Good";  // Placeholder for actual air quality data

        // Additional new data
        const windDirection = data.wind.deg; // Wind direction in degrees
        const pressure = data.main.pressure; // Atmospheric pressure in hPa
        const visibility = data.visibility / 1000; // Visibility in kilometers
        const cloudCoverage = data.clouds.all; // Cloud coverage in percentage

        // Update the UI
        weatherDataEle.querySelector(".temp").textContent = `${temprature}°C`;
        weatherDataEle.querySelector(".desc").textContent = description;
        weatherDataEle.querySelector(".details").innerHTML = `
            <div>Feels Like: ${feelsLike}°C</div>
            <div>Humidity: ${humidity}%</div>
            <div>Wind Speed: ${windSpeed} m/s</div>
        `;
        imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`;

        // Update additional info
        weatherDataEle.querySelector(".location").textContent = `Location: ${locationInfo}`;
        weatherDataEle.querySelector(".sunrise").textContent = `Sunrise: ${sunriseTime}`;
        weatherDataEle.querySelector(".sunset").textContent = `Sunset: ${sunsetTime}`;
        weatherDataEle.querySelector(".air-quality").textContent = `Air Quality: ${airQuality}`;

        // Update new sections
        weatherDataEle.querySelector(".wind-direction").textContent = `Wind Direction: ${windDirection}°`;
        weatherDataEle.querySelector(".pressure").textContent = `Pressure: ${pressure} hPa`;
        weatherDataEle.querySelector(".visibility").textContent = `Visibility: ${visibility} km`;
        weatherDataEle.querySelector(".cloud-coverage").textContent = `Cloud Coverage: ${cloudCoverage}%`;
        
    } catch (err) {
        weatherDataEle.querySelector(".temp").textContent = "";
        imgIcon.innerHTML = "";
        weatherDataEle.querySelector(".desc").textContent = "City not found! Please try again.";
    }
}
