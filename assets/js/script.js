// var openW_Url = "https://api.openweathermap.org/data/2.5/";
// var apiKey = "de3c367e509f63f28b967e73b8cc9437";

var openW_ApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${defaultCity}&units=metric&cnt=1&appid=de3c367e509f63f28b967e73b8cc9437`;
var oneCallApiUrl;
var defaultCity = "birmingham, gb";
var weatherData; //
var coordData;//
var lat; //
var lon; //



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
      coordData = data;
      lat = coordData.city.coord.lat;
      lon = coordData.city.coord.lon;
      oneCallApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=de3c367e509f63f28b967e73b8cc9437`;
    })
    
    .then(searchWeather)
    .then(() => $("body"));    
}

//Store searches
if (localStorage.getItem("history") == null) {
  localStorage.setItem("history", "[]");
}































// Cards
//date
//temp/icon/wind/humidity





// https://home.openweathermap.org/users/sign_in

// Current weather data:
// https://openweathermap.org/current
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}




// 5 day weather forecast:
// https://openweathermap.org/forecast5
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={de3c367e509f63f28b967e73b8cc9437}





