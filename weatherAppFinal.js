function formatDate(timestamp){
let date = new Date(timestamp);
let hours = date.getHours();
let minutes = date.getMinutes();
if (minutes < 10){
    minutes = `0${minutes}`
}
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday", "Saturday"];
let day = days[date.getDay()];
return `${day} ${hours}: ${minutes}`;

}

function displayForecast(){
    
let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;
let days = ["Mon","Tues","Weds","Thurs "]
days.forEach(function (day){
forecastHTML = forecastHTML + `
<div class="col-2">
<div class="weather-forecast-date">${day}</div>
    <img src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png" alt="" width="42" />

<div class="weather-forecast-temperatures">

    <span class="weather-forecast-temperature-max">18°</span>
    <span class="weather-forecast-temperature-min">12°</span> 

</div>
</div>`
})
    forecastHTML = forecastHTML + `</div>`;

    forecastElement.innerHTML = forecastHTML;

}

function getForecast(coordinates){
    console.log(coordinates);
    let apiKey = "7f522d55ef52977a1d7501da2d2bc07c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
    console.log(apiUrl)
}

function displayTemperature(response){
    console.log(response.data)
    let temeperatureElement = document.querySelector("#temperature")
    celsiusTemperature = response.data.main.temp
    temeperatureElement.innerHTML = Math.round(celsiusTemperature)
    let cityElement = document.querySelector("#city")
    cityElement.innerHTML = response.data.name
    let descriptionElement = document.querySelector("#description")
    description.innerHTML = response.data.weather[0].description
    let humidityElement = document.querySelector("#humid")
    humidityElement.innerHTML = response.data.main.humidity
    
    let windElement = document.querySelector("#wind")
    windElement.innerHTML = Math.round(response.data.wind.speed)

    let dateElement = document.querySelector("#date")
    dateElement.innerHTML = formatDate(response.data.dt * 1000)

    let iconElement = document.querySelector("#icon")
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`) 

    iconElement.setAttribute("alt", response.data.weather[0].icon)

    ;

    getForecast(response.data.coord);
}

function search(city){
    
    let apiKey = "7f522d55ef52977a1d7501da2d2bc07c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log(apiUrl)

    axios.get(apiUrl).then(displayTemperature);
}


function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function showFahrTemp(event){
 event.preventDefault();
 let fahrTemp = (celsiusTemperature * 9)/5 + 32;
 let temeperatureElement = document.querySelector("#temperature")
 temeperatureElement.innerHTML = Math.round(fahrTemp)
 celsLink.classList.remove("active");
 fahrLink.classList.add("active");
}

function showCelsTemp(event){
    event.preventDefault();
     
 let temeperatureElement = document.querySelector("#temperature")
 temeperatureElement.innerHTML = Math.round(celsiusTemperature)
 celsLink.classList.add("active");
 fahrLink.classList.remove("active");
 
}



let celsiusTemperature = null;


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


let fahrLink = document.querySelector("#fahr-link");
fahrLink.addEventListener("click", showFahrTemp);

let celsLink = document.querySelector("#cels-link");
celsLink.addEventListener("click", showCelsTemp);

console.log(displayForecast());

search("New York");
