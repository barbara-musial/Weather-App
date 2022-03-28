import { convertTimestampToTime } from "./modules/convertTimestamp.js";
import {
  displayImg,
  displayData,
  displayCurrDateAndTime,
} from "./modules/display.js";
import { getDataFromAPI as getData } from "./modules/getDataFromAPI.js";

// Containers
const timeBackgroundImg = document.querySelector(".time-img");
const currTempCont = document.querySelector(".curr-temp");
const feelsLikeCont = document.querySelector(".feels-like-curr-temp");
const weatherIconCont = document.querySelector(".weather-icon");
const weatherDescCont = document.querySelector(".weather-desc");
const locationCont = document.querySelector(".location");
const currDayCont = document.querySelector(".curr-day");
const currTimeCont = document.querySelector(".curr-time");
const sunriseTimeCont = document.querySelector(".sunrise-time");
const sunsetTimeCont = document.querySelector(".sunset-time");
const minTempCont = document.querySelector(".min-temp");
const maxTempCont = document.querySelector(".max-temp");
const windSpeedCont = document.querySelector(".wind-speed");
const windDirectCont = document.querySelector(".wind-direction");
const humidityCont = document.querySelector(".humidity");
const pressureCont = document.querySelector(".pressure");
const hourlyForecastCont = document.querySelector(".hourly-forecast");
const dailyForecastCont = document.querySelector(".daily-forecast");

async function displayWeatherData(coords) {
  const [lat, lon] = coords;

  const location = (
    await getData(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=f52a5f9fe97247faaeb2a726f9ca5405`
    )
  ).features[0].properties.city;

  const weatherData = await getData(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=2036b1729952c5742fea723833b9919b`
  );

  const currTemp = `${weatherData.current.temp.toFixed(0)}°C`;
  const feelsLikeCurrTemp = `${weatherData.current.feels_like.toFixed(0)}°C`;
  const currWeatherIcon = weatherData.current.weather[0].icon;
  const currWeatherDescription = weatherData.current.weather[0].description;
  const timezoneOffset = weatherData.timezone_offset;
  const sunriseTime = convertTimestampToTime(
    weatherData.current.sunrise + timezoneOffset
  );
  const sunsetTime = convertTimestampToTime(
    weatherData.current.sunset + timezoneOffset
  );
  const minTemp = `${weatherData.daily[0].temp.min.toFixed(0)}°C`;
  const maxTemp = `${weatherData.daily[0].temp.max.toFixed(0)}°C`;
  const windSpeed = `${(weatherData.current.wind_speed * 3.6).toFixed(0)}km/h`;
  const windDegrees = weatherData.current.wind_deg;
  let windDirect;
  const humidity = `${weatherData.current.humidity}%`;
  const pressure = `${weatherData.current.pressure} hPa`;

  // Set wind direction
  if (windDegrees >= 349 || windDegrees <= 11) {
    windDirect = "N";
  } else if (windDegrees >= 12 && windDegrees <= 33) {
    windDirect = "NNE";
  } else if (windDegrees >= 34 && windDegrees <= 56) {
    windDirect = "NE";
  } else if (windDegrees >= 57 && windDegrees <= 78) {
    windDirect = "ENE";
  } else if (windDegrees >= 79 && windDegrees <= 101) {
    windDirect = "E";
  } else if (windDegrees >= 102 && windDegrees <= 123) {
    windDirect = "ESE";
  } else if (windDegrees >= 124 && windDegrees <= 146) {
    windDirect = "SE";
  } else if (windDegrees >= 147 && windDegrees <= 168) {
    windDirect = "SSE";
  } else if (windDegrees >= 169 && windDegrees <= 191) {
    windDirect = "S";
  } else if (windDegrees >= 192 && windDegrees <= 213) {
    windDirect = "SSW";
  } else if (windDegrees >= 214 && windDegrees <= 236) {
    windDirect = "SW";
  } else if (windDegrees >= 237 && windDegrees <= 258) {
    windDirect = "WSW";
  } else if (windDegrees >= 259 && windDegrees <= 281) {
    windDirect = "W";
  } else if (windDegrees >= 282 && windDegrees <= 303) {
    windDirect = "WNW";
  } else if (windDegrees >= 304 && windDegrees <= 326) {
    windDirect = "NW";
  } else if (windDegrees >= 327 && windDegrees <= 348) {
    windDirect = "NNW";
  }

  // Display background time img
  displayImg(
    currWeatherIcon.at(-1) === "n" ? "night" : "day",
    timeBackgroundImg,
    "jpg"
  );

  // Display weather Icon
  weatherIconCont.classList.add(
    `icon-${currWeatherIcon.at(-1) === "n" ? "night" : "day"}`
  );
  displayImg(currWeatherIcon, weatherIconCont, "png");

  // Display rest of data
  displayData(currTemp, currTempCont);
  displayData(feelsLikeCurrTemp, feelsLikeCont);
  displayData(currWeatherDescription, weatherDescCont);
  displayData(location, locationCont);
  displayData(sunriseTime, sunriseTimeCont);
  displayData(sunsetTime, sunsetTimeCont);
  displayData(minTemp, minTempCont);
  displayData(maxTemp, maxTempCont);
  displayData(windSpeed, windSpeedCont);
  displayData(windDirect, windDirectCont);
  displayData(humidity, humidityCont);
  displayData(pressure, pressureCont);

  displayCurrDateAndTime(currDayCont, currTimeCont);
}
displayWeatherData([52.71051, 16.38044]);
