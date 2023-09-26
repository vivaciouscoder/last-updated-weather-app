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

let celciousTemp = null;

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celciousLink = document.querySelector("#celcious-link");
celciousLink.addEventListener("click", displayCelcious);

search("Istanbul");
