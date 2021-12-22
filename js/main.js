var search = document.getElementById("search");
var find = document.getElementById("find");


let apiDay;
let apiDate;
let apiCurrentTemp;
let apiLocName;
let locat;
let dayRain;
let dayState;
let dayWind;
let dayWindDir;
let dir;



var today = new Date();
var time = today.getHours();
var day = today.getDate();
var month = today.getMonth();

var dateObj = new Date()
var weekday = dateObj.toLocaleString("default", { weekday: "long" })

function getMonthName(month) {
    const d = new Date();
    d.setMonth(month);
    const monthName = d.toLocaleString("default", { month: "long" });
    return monthName;
}


search.onkeyup = function () {
    let val = search.value;
    apiCall(val)
}


let response;

async function apiCall(loc) {
    var link = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=467b4593d6734ab9837224325211209&q=${loc}&days=3&aqi=no&alerts=no`);
    response = await link.json()
    apiLocName = response.location.name;
    apiCurrentTemp = response.forecast.forecastday[0].hour[time].temp_c;
    dayState = response.forecast.forecastday[0].hour[time].condition.text;
    dayRain = response.forecast.forecastday[0].hour[time].chance_of_rain;
    dayWind = response.forecast.forecastday[0].hour[time].wind_kph;
    dayWindDir = response.forecast.forecastday[0].hour[time].wind_dir;

    if (dayWindDir == "E") {
        dir = "East"
    }
    else if (dayWindDir == "N") {
        dir = "North"
    }
    else if (dayWindDir == "w") {
        dir = "Weast"
    }
    else {
        dir = "South"
    }

    fairstDay();
    secondDay();
    thirdDay();

}


async function currentLocation() {
    var link = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=467b4593d6734ab9837224325211209&q=cairo&days=3&aqi=no&alerts=no`);
    response = await link.json()
    apiLocName = response.location.name;
    dayState = response.forecast.forecastday[0].hour[time].condition.text;
    apiCurrentTemp = response.forecast.forecastday[0].hour[time].temp_c;
    dayRain = response.forecast.forecastday[0].hour[time].chance_of_rain;
    dayWind = response.forecast.forecastday[0].hour[time].wind_kph;
    dayWindDir = response.forecast.forecastday[0].hour[time].wind_dir;
    document.getElementById("todayState").src = `http:${response.forecast.forecastday[0].hour[time].condition.icon}`;

    if (dayWindDir == "E") {
        dir = "East"
    }
    else if (dayWindDir == "N") {
        dir = "North"
    }
    else if (dayWindDir == "w") {
        dir = "Weast"
    }
    else {
        dir = "South"
    }

    fairstDay();
    secondDay();
    thirdDay();

}

function fairstDay() {
    document.getElementById("place").innerHTML = apiLocName;
    document.getElementById("temp").innerHTML = apiCurrentTemp;
    document.getElementById("todayState").src = `http:${response.forecast.forecastday[0].hour[time].condition.icon}`;
    document.getElementById("day").innerHTML = weekday;
    document.getElementById("dayDate").innerHTML = day + " " + getMonthName(month);
    document.getElementById("dayState").innerHTML = dayState;
    document.getElementById("dayRain").innerHTML = dayRain + " %";
    document.getElementById("dayWind").innerHTML = dayWind + " km/h";
    document.getElementById("dayWindDir").innerHTML = dir;
    document.getElementById("thirdDayIcon")
}

function secondDay() {
    document.getElementById("secondDayTempHigh").innerHTML = response.forecast.forecastday[1].day.maxtemp_c + `<sup>o</sup>`;
    document.getElementById("secondDayTempLow").innerHTML = response.forecast.forecastday[1].day.mintemp_c + `<sup>o</sup>`;
    document.getElementById("secondDayState").innerHTML = response.forecast.forecastday[1].day.condition.text;
    document.getElementById("secondDayIcon").src = `http:${response.forecast.forecastday[1].day.condition.icon}`;
    var tomorrow = response.forecast.forecastday[1].date;
    var currentDay = moment(tomorrow, `YYYY / MM / DD`).format(`dddd`);
    document.getElementById("secondDay").innerHTML = currentDay;
}

function thirdDay() {
    var dayAfter = response.forecast.forecastday[2].date;
    var currentDay = moment(dayAfter, `YYYY / MM / DD`).format(`dddd`);
    document.getElementById("thirdDayTempHigh").innerHTML = response.forecast.forecastday[2].day.maxtemp_c + `<sup>o</sup>`;
    document.getElementById("thirdDayTempLow").innerHTML = response.forecast.forecastday[2].day.mintemp_c + `<sup>o</sup>`;
    document.getElementById("thirdDayState").innerHTML = response.forecast.forecastday[2].day.condition.text;
    document.getElementById("thirdDayIcon").src = `http:${response.forecast.forecastday[2].day.condition.icon}`;
    document.getElementById("thirdDay").innerHTML = currentDay;
}

