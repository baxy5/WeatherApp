const notificationElement = document.querySelector(".notification");
const weatherIcon = document.querySelector(".weather-icon");
const tempValue = document.querySelector(".temperature-value p");
const tempDesc = document.querySelector(".temperature-description p");
const locationEl = document.querySelector(".location p");

// Weather object
const weather = {
    temp : {
        value : 20,
        unit : "celsius"
    },

    description : "few clouds",

    iconId : "01d",

    city : "Cegled",

    country : "HU"
};


const KELVIN = 273;
//api key
const key = "25a02f60842e95935a2ad510981fa4b3";

//if geo in nav
if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>Browser doesn't support Geolocation!</p>`
}
//setPostion func
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude,longitude);
}
//showError func
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`;
}
//getWeather func request and response
function getWeather(latitude,longitude){
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api).then(function(response){
        let data = response.json();
        return data;
    }).then(function(data){
        weather.temp.value = Math.floor(data.main.temp - KELVIN);
        weather.temp.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    }).then(function(){
        displayWeather();
    })
}

//Display weather
function displayWeather(){
weatherIcon.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
tempValue.innerHTML = `${weather.temp.value}°<span>C</span>`;
tempDesc.innerHTML = weather.description;
locationEl.innerHTML = `${weather.city}, ${weather.country}`;
}






//celsius to fahrenheit
function celsiusToFahr(temp){
    return (temp * 9/5) + 32;
}

//Temp. atvaltas
tempValue.addEventListener("click", function(){
    if(weather.temp.value === undefined) return;

    if(weather.temp.unit === "celsius"){
        let fahrenheit = celsiusToFahr(weather.temp.value);

        fahrenheit = Math.floor(fahrenheit);

        tempValue.innerHTML = `${fahrenheit}°<span>F</span>`;

        weather.temp.unit = "fahrenheit";
    } else {
        tempValue.innerHTML = `${weather.temp.value}°<span>C</span>`;

        weather.temp.unit = "celsius";
    }
})