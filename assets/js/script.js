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



// function for getting weather at coordinates and call render functions
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

















///


// https://home.openweathermap.org/users/sign_in

// Current weather data:
// https://openweathermap.org/current
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={...}


// 5 day weather forecast:
// https://openweathermap.org/forecast5
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={...}





