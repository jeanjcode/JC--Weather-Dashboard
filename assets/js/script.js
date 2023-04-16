// var searchForm = $(".searchForm");
// var searchBtn = $("#searchBtn");
// var searchCity = $("#searchCity");
// var weatherContainer = $("weatherContainer");
// var currentWeatherContainer = $(".currentWeatherContainer");

var openW_Url = "https://api.openweathermap.org/data/2.5/";
var apiKey = "de3c367e509f63f28b967e73b8cc9437";



//DATE & TIME ABOVE HEADING
$("#today").text(moment().format("DD/MM/YYYY HH:mm:ss"));

function updateTime() {
  $("#today").text(moment().format("DD/MM/YYYY HH:mm:ss"));
}
setInterval(updateTime, 1000);





// Cards
//date
//temp/icon/wind/humidity











// https://home.openweathermap.org/users/sign_in

// Current weather data:
// https://openweathermap.org/current
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}




// 5 day weather forecast:
// https://openweathermap.org/forecast5
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}





