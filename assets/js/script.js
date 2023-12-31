var defaultCity = "birmingham, gb";
var openW_ApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${defaultCity}&units=metric&cnt=1&appid=166a433c57516f51dfab1f7edaed8413`;
var oneCallApiUrl;
var weatherData; 
var coordinates;
var lat; 
var lon; 


//Date & time
$("#today").text(moment().format("DD/MM/YYYY HH:mm:ss"));

function currentTime() {
  $("#today").text(moment().format("DD/MM/YYYY HH:mm:ss"));
}
setInterval(currentTime, 1000);


//Search city coordinates
function searchCoord() {
  fetch(openW_ApiUrl)
    .then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else {
        throw response;
      }
    })
    .then(function (data) {
     coordinates = data;
      lat =coordinates.city.coord.lat;
      lon =coordinates.city.coord.lon;
      oneCallApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=166a433c57516f51dfab1f7edaed8413`;
    })
    
    .then(searchWeather)
    .then(() => $("body"));    
}

//Store searches
if (localStorage.getItem("history") == null) {
  localStorage.setItem("history", "[]");
}


//Search weather function
function searchWeather() {
  fetch(oneCallApiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      weatherData = data;
    })
    .then(renderCurrentWeather)
    .then(renderForecast)
   
}
searchCoord();



//User city search 
function searchforCity(e) {
  e.preventDefault();
  if ($("#cityInput").val() === "") {
    return;
  }
  defaultCity = $("#cityInput").val();
  openW_ApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${defaultCity}&units=metric&appid=166a433c57516f51dfab1f7edaed8413`;
  $("body");
  searchCoord();
  history();
  addSearch();
  $("#cityInput").val("");
}

$("#searchButton").click(searchforCity);



//Render current weather
function renderCurrentWeather() {
  
  var currentWeather = weatherData.current;
  $("#defaultCity").text(`${coordinates.city.name}, ${coordinates.city.country} - `);
  $("#todaysDate").text(
    moment
      .unix(currentWeather.dt + weatherData.timezone_offset)
      .format("DD/MM/YYYY")
  );
  $("#weatherIcon").attr(
    "src",
    `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`,
    
  );
  $("#temp").text(`Temp: ${currentWeather.temp} °C`);
  $("#wind").text(`Wind: ${currentWeather.wind_speed} mph`);
  $("#humidity").text(`Humidity: ${currentWeather.humidity} %`);
  }



//Render 5 day forecast
var forecastFive = $(".weatherCard");
function renderForecast() {
  for (var i = 1; i < forecastFive.length; i++) {
    var nextDay = weatherData.daily[i];
    var fiveDforecast = $(forecastFive[i]);
    fiveDforecast.empty()
    fiveDforecast.append(
      $(`<p><strong><span>${moment
          .unix(nextDay.dt + weatherData.timezone_offset)
          .format("DD/MM/YYYY")}</strong></span>`
      )      
    );
    

    fiveDforecast.append(
      $(`<img>`, {
        src: `https://openweathermap.org/img/wn/${nextDay.weather[0].icon}.png`,
        alt: "daily weather icon",
      })
    );

    fiveDforecast.append($(`<p><span> Temp: ${nextDay.temp.day} °C </span>`));
    fiveDforecast.append(
      $(`<p><span>Wind: ${nextDay.wind_speed} mph </span>`)
    );
    fiveDforecast.append(
      $(`<p><span>Humidity: ${nextDay.humidity} % </span>`)
    );
  }
}






















// Weather icons - URL is https://openweathermap.org/img/wn/10d@2x.png
// https://openweathermap.org/weather-conditions



// Current weather data:
// https://openweathermap.org/current
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={...}


// 5 day weather forecast:
// https://openweathermap.org/forecast5
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={...}





