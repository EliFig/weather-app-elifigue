let now = new Date();
let currentdate = document.querySelector("#currentdate");
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednsday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getUTCDay()];
currentdate.innerHTML = `${day} ${hour}:${minutes}`;

function displayWeather(response) {
  celciusTemperature = response.data.main.temp;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    celciusTemperature
  )}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity} %`;
  document.querySelector("#windspeed").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "e0ba7ecac5a4ca8a73006071d6ba34be";
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeather);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  celcius.classList.add("active");
  fahrenheit.classList.remove("active");

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemperature);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", displayCelciusTemperature);

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

let button = document.querySelector("#search-button");
button.addEventListener("click", searchCity);
