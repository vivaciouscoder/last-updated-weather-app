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

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["mon", "tue", "wed", "thu", "fri", "sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
       <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAm9JREFUaN7tmcFthDAQRbcESqAEl0ADkSiBY46UQAmUQAl0EErwdW+kA3fgjKNhNXJsGNvYyyqL9A/ZQPKf/Wc8JDet9e2V9dLm3wCXBAi57ve7AA2WxC3jdQoAGpcg7ZHMBZIMAMa6HeO2uksBgKEmwPwmcSUAGQGwXAIAc68jNYFW6zPz9QiqSgEMCQB7UqDWa/j7U5wFMGYC2NQ6zPeg7lUAFI2TWXmQBtXJAOYHY451ZvVovgJJ0JpcA5h9VcC83HYAjE+4+lM0AK66LGB8i49A8y2a13b+QwFKmX+c2CbvIEUA6iiAjC3TpZkUriTm16hzAKOjCplfSe4HYt6Zfy5AV3D1t9w3lnln/rkApeIzkJapHAD1lQEWkvvZYX6NnoUKACiS+95h/hcAa8KtJwM01qgQqkMAkdH8aI0KoeYl9xxYcowKJPdT5OoLLkCTIfe1Y1QIUX/aXyVyXTtwyynvxB9f9wrUhBqDZwSoZgC4oqXomRANAAYGkEZVTOMGWOEzIwNAHZ3IUQBm9Yh5zd0FuG8izywH5l1tdT7lpd78cmJk5eyAgbSg+wOA0RGdKhkAfnFrGWmZqy/JM5IRH/tcaKNGCUeGV18MzKqCZlDn+JwdOXyRoebH6Flop3A17STWzsyewjWaGKvfW3NQlQzgKNxhZ2dmT+EqTr1YE+n+bgUAzL7C9e0M9nt24ZK56DGoHd4fCdAyd0aEFK51+vLuDwDoEKIPaan4/dHAMAG201ecCuBpjVEtlXH69uz7E0aJ3ZYaaV7QQS03QONrqQkAg+/lPdcO/Cnc0ldqDTTcSfRpAO//1L8B/hnAD9B4AcpTDEFdAAAAAElFTkSuQmCC"
          alt="rain"
        />
        <div class="weather-forecast-temp">
          <span class="weather-forecast-temp-max"> 21° </span>
          <span class="weather-forecast-temp-min"> 18° </span>
        </div>
      </div>`;
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
