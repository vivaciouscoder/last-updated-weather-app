function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function getForecast(coordinates) {
  let apiKey = "91t8a4380fe47251638a138b7fbod1f7";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  console.log(response);

  celciousTemp = response.data.temperature.current;

  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = Math.round(celciousTemp);
  document.querySelector("#city").innerHTML = response.data.city;

  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.temperature.humidity
  );

  document.querySelector("#feels_like").innerHTML = Math.round(
    response.data.temperature.feels_like
  );

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  let updatedDate = document.querySelector("#date");
  updatedDate.innerHTML = formatDate(response.data.time * 1000.0004);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "91t8a4380fe47251638a138b7fbod1f7";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#inputCity");
  search(cityInputElement.value);
}

function displayFahrenheit(event) {
  event.preventDefault();

  let fahrenheitTemp = (celciousTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector(".temperature");

  fahrenheitLink.classList.add("active");
  celciousLink.classList.remove("active");

  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelcious(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(celciousTemp);

  celciousLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["sun", "mon", "tue", "Wed", "Thu", "fri", "sat"];
  let day = days[date.getDay()];

  return day;
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
       <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          alt="rain"
        />
        <div class="weather-forecast-temp">
          <span class="weather-forecast-temp-max"> ${Math.round(
            forecastDay.temperature.maximum
          )}° </span>
          <span class="weather-forecast-temp-min"> ${Math.round(
            forecastDay.temperature.minimum
          )}° </span>
        </div>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastHTML.innerHTML = forecastHTML;

  forecastElement.innerHTML = forecastHTML;
}

let celciousTemp = null;

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celciousLink = document.querySelector("#celcious-link");
celciousLink.addEventListener("click", displayCelcious);

search("Istanbul");
