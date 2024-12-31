import { processWeather } from "./weather.js";
import rainPath from "./images/rain.svg";
import partlyCloudyDay from "./images/partly-cloudy-day.svg";
import partlyCloudyNight from "./images/partly-cloudy-night.svg";
import cloudyPath from "./images/cloudy.svg";
import clearDayPath from "./images/clear-day.svg";
import clearNightPath from "./images/clear-night.svg";
import fogPath from "./images/fog.svg";
import hailPath from "./images/hail.svg";
import rainSnowShowersDayPath from "./images/rain-snow-showers-day.svg";
import rainSnowShowersNightPath from "./images/rain-snow-showers-night.svg";
import rainSnowPath from "./images/rain-snow.svg";
import showerDayPath from "./images/showers-day.svg";
import showerNightPath from "./images/showers-night.svg";
import sleetPath from "./images/sleet.svg";
import snowPath from "./images/snow.svg";
import thunderRainPath from "./images/thunder-rain.svg";
import thunderShowersDay from "./images/thunder-showers-day.svg";
import thunderShowersNight from "./images/thunder-showers-night.svg";
import thunderPath from "./images/thunder.svg";
import windPath from "./images/wind.svg";

const searchBar = document.getElementById(`fname`);
const searchBtn = document.getElementById(`search-button`);
const cityLocation = document.getElementById(`city-display`);
const currTemp = document.getElementById(`curr-temp`);
const changeTempHeader = document.getElementById(`change-temp`);
const changeTemp = document.getElementById(`change-temp-img`);
const weatherIcon = document.getElementById(`weather-icon`);
const weatherConditions = document.getElementById(`weather-conditions`);
let celsiusBool = true;

function changeIcon(condition) {
  const weatherImg = document.createElement(`img`);

  switch (condition) {
    case "rain":
      weatherImg.src = rainPath;
      break;
    case "partly-cloudy-day":
      weatherImg.src = partlyCloudyDay;
      break;
    case "partly-cloudy-night":
      weatherImg.src = partlyCloudyNight;
      break;
    case "cloudy":
      weatherImg.src = cloudyPath;
      break;
    case "clear-day":
      weatherImg.src = clearDayPath;
      break;
    case "clear-night":
      weatherImg.src = clearNightPath;
      break;
    case "fog":
      weatherImg.src = fogPath;
      break;
    case "hail":
      weatherImg.src = hailPath;
      break;
    case "rain-snow-showers-day":
      weatherImg.src = rainSnowShowersDayPath;
      break;
    case "rain-snow-showers-night":
      weatherImg.src = rainSnowShowersNightPath;
      break;
    case "rain-snow":
      weatherImg.src = rainSnowPath;
      break;
    case "showers-day":
      weatherImg.src = showerDayPath;
      break;
    case "showers-night":
      weatherImg.src = showerNightPath;
      break;
    case "sleet":
      weatherImg.src = sleetPath;
      break;
    case "snow":
      weatherImg.src = snowPath;
      break;
    case "thunder-rain":
      weatherImg.src = thunderRainPath;
      break;
    case "thunder-showers-day":
      weatherImg.src = thunderShowersDay;
      break;
    case "thunder-showers-night":
      weatherImg.src = thunderShowersNight;
      break;
    case "thunder":
      weatherImg.src = thunderPath;
      break;
    case "wind":
      weatherImg.src = windPath;
      break;
  }

  weatherImg.style.height = "10vh";
  weatherIcon.appendChild(weatherImg);
}

async function defaultWeather() {
  const processedData = await processWeather("edinburgh");
  cityLocation.innerHTML = processedData[0].location;
  currTemp.innerHTML = processedData[0].temp + `&#176;C`;
  weatherConditions.innerHTML = processedData[0].conditions;
  changeIcon(processedData[0].icon);
}

searchBtn.addEventListener("click", async () => {
  let weatherResults;

  if (searchBar.value) {
    weatherIcon.innerHTML = "";
    weatherResults = await processWeather(searchBar.value);
    if (weatherResults) {
      cityLocation.innerHTML = weatherResults[0].location;
      let currentWeather = weatherResults[0].temp;
      currTemp.innerHTML = currentWeather + `&#176;C`;
      changeTempHeader.appendChild(changeTemp);
      weatherConditions.innerHTML = weatherResults[0].conditions;
      changeIcon(weatherResults[0].icon);
    } else {
      cityLocation.innerHTML = `Trouble retrieving ${searchBar.value}'s value!`;
      currTemp.innerHTML = "";
      weatherConditions.innerHTML = "";
      changeTempHeader.innerHTML = "";
    }
  } else {
    weatherResults = await processWeather("edinburgh");
  }
});

changeTemp.addEventListener("click", async () => {
  let weatherResults;
  if (searchBar.value) {
    weatherResults = await processWeather(searchBar.value);
  } else {
    weatherResults = await processWeather(`edinburgh`);
  }

  let currentWeather = weatherResults[0].temp;
  let newTemp;

  if (celsiusBool) {
    newTemp = ((currentWeather * 9) / 5 + 32).toFixed(1);
    currTemp.innerHTML = newTemp + `&#176;F`;
  } else {
    currentWeather = (currentWeather * 9) / 5 + 32;
    newTemp = (((currentWeather - 32) * 5) / 9).toFixed(1);
    currTemp.innerHTML = newTemp + `&#176;C`;
  }
  celsiusBool = !celsiusBool;
});

defaultWeather();
