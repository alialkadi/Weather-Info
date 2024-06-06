let todayName = document.getElementById("today_name");
let todayNumber = document.getElementById("today_number");
let todayMonth = document.getElementById("today_month")
let todayLocation = document.getElementById("today_location")
let todayTemp = document.getElementById("today_temp")
let todayConditionImg = document.getElementById("today_condition_img")
let todayConditionText = document.getElementById("today_condition_text")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("wind_direction") 
// next data 
let nextDay = document.getElementsByClassName("next_day_name")
let nextMaxTemp = document.getElementsByClassName("next_max_temp")
let nextMinTemp = document.getElementsByClassName("next_min_temp")
let nextConditionImg = document.getElementsByClassName("next_condition_img")
let nextConditionText = document.getElementsByClassName("next_condition_text")

// search input 
let searchInput = document.getElementById("search")


async function getWeatherData(name) {
    let weather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${name}&days=3`);
    let weatherData = weather.json()
    return weatherData;
}

function displayTodayData(data) {
    let todayDate = new Date();
    todayName.innerHTML = todayDate.toLocaleDateString("en-us", { weekday: "long" });
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-us", { month: "long" });
    todayNumber.innerHTML = todayDate.getDate();
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayConditionImg.setAttribute("src", data.current.condition.icon);
    todayConditionText.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity + '%';
    wind.innerHTML = data.current.wind_kph + 'km/h';
    windDirection.innerHTML = data.current.wind_dir;

}

function displayNextData(data) {
    let forecastData = data.forecast.forecastday;
    for (let i = 0; i < 2; i++){
        let dayDate = new Date(forecastData[i + 1].date);
        nextDay[i].innerHTML = dayDate.toLocaleDateString("en-us", { weekday: "long" });
        nextMaxTemp[i].innerHTML = forecastData[i + 1].day.maxtemp_c;
        nextMinTemp[i].innerHTML = forecastData[i + 1].day.mintemp_c;
        nextConditionImg[i].setAttribute("src", forecastData[i + 1].day.condition.icon);
        nextConditionText[i].innerHTML= forecastData[i+1].day.condition.text
    }
}






async function startApp(city="london")
{
    let weatherData = await getWeatherData(city)
    if(!weatherData.error)
    {
        displayTodayData(weatherData)
        displayNextData(weatherData)
    } else {
        console.log("nothinggggg");
    }
}

startApp()

searchInput.addEventListener("input", function () {
    startApp(searchInput.value)
})