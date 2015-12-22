// Hand coded by surajang.
// Global variables for API key and location info.
// Need to be user-editable... soon.
// Replace the string from "{" to "}" with your information.
var GLOBAL_API_KEY = "{ADD_YOUR_FORECAST.IO_API_KEY}";
var GLOBAL_LOCATION_LAT = "{ADD_YOUR_LATITUDE_OF_LOCATION}";
var GLOBAL_LOCATION_LONG = "{ADD_YOUR_LONGITUDE_OF_LOCATION}";

// Function getWeather - Request the weather information from forecast.io by XMLHttpRequest.
function getWeather() {
  var xhr = new XMLHttpRequest();
  var location = GLOBAL_LOCATION_LAT + "%2C" + GLOBAL_LOCATION_LONG;
  var API_KEY = GLOBAL_API_KEY;
  // API request URL includes option parameters for return data. Only "currently" section is used in this app.
  var url="https://api.forecast.io/forecast/" + API_KEY + "/" + location + "?units=si&exclude=minutely%2Chourly%2Cdaily%2Calerts%2Cflags";
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200) {
      var forecastResult = JSON.parse(xhr.responseText);
      displayWeather(forecastResult);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

// Function displayWeather - This guy process the weather data and display the weather values.
function displayWeather(arr) {
  var baseTime = new Date(arr.currently.time * 1000);
  var hours = baseTime.getHours();
  var minutes = "0" + baseTime.getMinutes();
  var formattedTime = hours + ':' + minutes.substr(-2);
  document.getElementById("announced").innerHTML = "Announced on " + formattedTime;
  document.getElementById("summary").innerHTML = arr.currently.summary;
  document.getElementById("temp").innerHTML = Math.round(arr.currently.temperature * 10) / 10 + "℃";
  document.getElementById("humidity").innerHTML = Math.round(arr.currently.humidity * 100) + "%";
  console.log(arr.currently.temperature + " " + arr.currently.apparentTemperature);
  // Displays the "Feel like" temperature info only when it is differ from observed temp.
  if(arr.currently.temperature == arr.currently.apparentTemperature) {
    document.getElementById("feellike").style.display = "none";
  } else {
    document.getElementById("feellike").style.display = "inline-block";
    document.getElementById("feellike").innerHTML = "Feel like<br>" + Math.round(arr.currently.apparentTemperature * 10) / 10 + "℃";  
  }
  
  // Determines the correct weather icon
  var iconValue = arr.currently.icon;
  var iconText;
  switch(iconValue) {
    case "clear-day":
      iconText = "☀";
      break;
    case "clear-night":
      iconText = "☽";
      break;
    case "rain":
      iconText = "☂";
      break;
    case "snow":
      iconText = "☃";
      break;
    case "sleet":
      iconText = "☔";
      break;
    case "wind":
      iconText = "⚑";
      break;
    case "fog":
      iconText = "☰";
      break;
    case "cloudy":
      iconText = "☁";
      break;
    case "partly-cloudy-day":
      iconText = "⛅";
      break;
    case "partly-cloudy-night":
      iconText = "⛅";
      break;
    default:
      iconText = iconValue;
  }
document.getElementById("icon").innerHTML = iconText;
}

// Function runWatch - Displays the clock
function runWatch() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedClock = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  document.getElementById("clock").innerHTML = formattedClock;
}
// Busy part when the script loaded - Call the getWeather() and update in every 5 minutes.
this.onload = function onLoad() {
  getWeather();
  var t = setInterval(function(){runWatch();},1000);
  var w = setInterval(function(){getWeather();},300000);

  // Experimental zone for Setting UI feature.
  document.getElementById("setting").onclick = function() {
    console.log("Setting button clicked!!!");
    document.getElementById("setupwindow").style.display = "block";
  };
  
  document.getElementById("setupwindow").onclick = function() {
    console.log("Window Closed.");
    document.getElementById("setupwindow").style.display = "none";
  };
  // Experimental variables
  var appWidth = window.innerWidth;
  var appHeight = window.innerHeight;
};

// Experimental function that detects the window resizing
this.onresize = function checkWindowSize() {
  console.log("window resized!!");
};
