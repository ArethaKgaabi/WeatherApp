//funcation for updating temperature
function updateTemperature(response) {
  let tempElement = document.querySelector("#temp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#currentCity");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let emojiElement = document.querySelector("#temp-emoji");

  emojiElement.innerHTML = `<img
  src="${response.data.condition.icon_url}"
  class="image"
/>`;
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  tempElement.innerHTML = `${Math.round(temperature)}°C`;

  //we are calling it to get the forcast after displaying the current
  getWeatherForecast(response.data.city);
}

//function to format the date
function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day}, ${hours}:${minutes < 10 ? "0" + minutes : minutes} `;
}

// function for Adding API for current temperature
function searchCity(currentCity) {
  let apikey = "btad2798317eea8fb2a646fa879ofa05";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${currentCity}&key=${apikey}`;
  axios.get(apiUrl).then(updateTemperature);
}

//FORM FUNCTION(INPUT )
function inputSearch(event) {
  event.preventDefault();
  let inputElement = document.querySelector("#city-Name");

  searchCity(inputElement.value);
}

//
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

//function get weather forecast
function getWeatherForecast(city) {
  let apikey = "btad2798317eea8fb2a646fa879ofa05";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}`;
  axios.get(apiUrl).then(displayForecast);
}

//Weather forecast for next 5 days
function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weekdays-forecast">
        <div class="day-of-week">${formatDay(day.time)}</div>
          <div >
          <img src="${day.condition.icon_url}" class="icon"/>
          </div>
          <div class="forecast-temp">
          <div class="temperature-forecast"><strong>${Math.round(
            day.temperature.maximum
          )}°</strong></div>
           <div class="temperature-forecast">${Math.round(
             day.temperature.minimum
           )}°</div>
          </div>
        </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let formElement = document.querySelector("#search-City");
formElement.addEventListener("submit", inputSearch);
searchCity("Pretoria");
