function formatDate() {
  let date = new Date();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${hours}`;
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
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
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

  document.querySelector("#date").innerHTML = formatDate();
}

let apiKey = "91t8a4380fe47251638a138b7fbod1f7";
let city = "istanbul";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemp);
