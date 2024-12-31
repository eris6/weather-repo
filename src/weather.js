import "./styles.css";
import "./client.js";

async function hitWeather(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=72ZFQ8EDL9USBRH5HJCPMU9DT&contentType=json`,
    );
    const weatherData = await response.json();
    return weatherData;
  } catch {
    console.log(`Trouble retrieving ${location}'s data!`);
  }
}

export async function processWeather(location) {
  const weather = await hitWeather(location);
  const processedDays = [];

  if (weather) {
    let weatherDays = weather.days.slice(0, 7);
    weatherDays.forEach((day) => {
      const singleDay = {};
      singleDay.location = weather.resolvedAddress;
      singleDay.dateTime = day.datetime;
      singleDay.conditions = day.conditions;
      singleDay.description = day.description;
      singleDay.temp = day.temp;
      singleDay.icon = day.icon;
      processedDays.push(singleDay);
    });
    return processedDays;
  }
}
