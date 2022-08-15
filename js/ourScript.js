let button = document.getElementById('button');

button.addEventListener("click", function search() {
    
    let zipCode = document.getElementById("input");
    
    if (zipCode.value > 9999 && zipCode.value < 100000) {
        //Grab elements
        let weatherIcon = document.getElementById("weatherIcon");
        let selectedDate = document.getElementById("selectedDate");
        let cityName = document.getElementById("cityName");
        let currentTemp = document.getElementById("currentTemp");
        let lowHighTemp = document.getElementById("lowHighTemperature");
        let weatherMessage = document.getElementById("weatherMessage");
        let days = document.getElementById("days").getElementsByTagName("div");
        let humidity = document.getElementById("humidity");
        // let windSpeed = document.getElementById("windSpeed");
        // let feelsLike = document.getElementById("feelsLike");
        let weekInfo = [];

        fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode.value}&appid=7df71b8a7701d4f29648eebc701ed349`)
            .then((locationApiData) => {
                return locationApiData.json();
            })
            .then((zipCode) => {
                if (zipCode.lat !== undefined && zipCode.lon !== undefined) {
                    cityName.textContent = zipCode.name;
                    return zipCode;
                } 
            })
            .then((zipCodeData) => {
                fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${zipCodeData.lat}&lon=${zipCodeData.lon}&units=imperial&exclude=current,minutely&hourly&appid=7df71b8a7701d4f29648eebc701ed349`)
                .then((weatherApiData) => {
                    return weatherApiData.json();
                })
                .then((weatherData) => {
                    for (let x = 0; x < 7; x++) {
                        weekInfo.push(weatherData.daily[x]);
                    }
                    return weekInfo;
                })
                .then((weekInfo) => {
                    for (let x = 0; x < days.length; x++) {
                        let unix_timestamp = weekInfo[x].dt;
                        // Create a new JavaScript Date object based on the timestamp
                        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
                        let date = new Date(unix_timestamp * 1000);
                        let month = date.getMonth() + 1;
                        let day = date.getDate();
                        let dayOfWeek = date.getDay();
                        let year = date.getFullYear();
                        let dayHTML;

                        if (x === 0) {
                            selectedDate.innerText = `${month}/${day}/${year}`;
                            currentTemp.innerText = `${weekInfo[x].temp.day.toFixed(0)}\u00B0F`;
                            lowHighTemp.innerText = `Low: ${weekInfo[x].temp.min.toFixed(0)}\u00B0F / High: ${weekInfo[x].temp.max.toFixed(0)}\u00B0F`;
                            weatherMessage.innerText = weekInfo[x].weather[0].description;
                            humidity.innerText = `Humidity: ${weekInfo[x].humidity}%`
                            weatherIcon.src = `http://openweathermap.org/img/wn/${weekInfo[x].weather[0].icon}@2x.png`;
                        }

                        if (dayOfWeek === 0) {
                            dayHTML = `<strong>Sunday</strong>`;
                        } else if (dayOfWeek === 1) {
                            dayHTML = `<strong>Monday</strong>`;
                        } else if (dayOfWeek === 2) {
                            dayHTML = `<strong>Tuesday</strong>`;
                        } else if (dayOfWeek === 3) {
                            dayHTML = `<strong>Wednesday</strong>`;
                        } else if (dayOfWeek === 4) {
                            dayHTML = `<strong>Thursday</strong>`;
                        } else if (dayOfWeek === 5) {
                            dayHTML = `<strong>Friday</strong>`;
                        } else if (dayOfWeek === 6) {
                            dayHTML = `<strong>Saturday</strong>`;
                        }
                        
                        days[x].innerHTML = `<p>${dayHTML}<br>${month}/${day}/${year}<br>L: ${weekInfo[x].temp.min.toFixed(0)}\u00B0F / H: ${weekInfo[x].temp.max.toFixed(0)}\u00B0F</p>`;
                    }
                })
                .catch((error) => {
                    console.log(`WeatherDataAPI Catch ${error}`);
                });
            })
        .catch((error) => {
            console.log(`Location API Data error: ${error}`);
        });
    }            
});