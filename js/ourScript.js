let button = document.getElementById('button');

button.addEventListener("click", function search() {
    
    let zipCode = document.getElementById("input");
    console.log(zipCode.value);
    
    if (zipCode.value > 9999 && zipCode.value < 100000) {
        //Grab elements
        let weatherIcon = document.getElementById("weatherIcon");
        let selectedDate = document.getElementById("selectedDate");
        let cityName = document.getElementById("cityName");
        let currentTemp = document.getElementById("currentTemp");
        let lowHighTemp = document.getElementById("lowHighTemperature");
        let chanceOfRain = document.getElementById("chanceOfRain");
        let weatherMessage = document.getElementById("weatherMessage");
        let days = document.getElementById("days").getElementsByTagName("div");
        // let humidity = document.getElementById("humidity");
        // let clouds = document.getElementById("clouds");
        // let windSpeed = document.getElementById("windSpeed");
        // let feelsLike = document.getElementById("feelsLike");
        let weekInfo = [];

        fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode.value}&appid=7df71b8a7701d4f29648eebc701ed349`)
            .then(locationApiData => {
                return locationApiData.json();
            })
            .then(data => {
                cityName.textContent = data.name;
                let lat = data.lat;
                let lon = data.lon;
                
                fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely&hourly&appid=7df71b8a7701d4f29648eebc701ed349`)
                .then(weatherApiData => {
                    // console.log(weatherApiData);
                    return weatherApiData.json();
                })
                .then(weatherData => {  
                    // console.log(weatherData.daily[0]);
                    for (let x = 0; x < 7; x++) {
                        // days[x].innerHTML = `<p><strong>Day ${x}</strong> L: ${weatherData.daily[x].temp.min} / H: ${weatherData.daily[x].temp.max}</p>`;
                        // lowHighTemp.innerText = `Low ${weatherData.daily[0].temp.min} / High ${weatherData.daily[0].temp.max}`;
                        weekInfo.push(weatherData.daily[x]);

                        // let unix_timestamp = 1660582800;
                        // // Create a new JavaScript Date object based on the timestamp
                        // // multiplied by 1000 so that the argument is in milliseconds, not seconds.
                        // var date = new Date(unix_timestamp * 1000);
                        // // Hours part from the timestamp
                        // var hours = date.getHours();
                        // // Minutes part from the timestamp
                        // var minutes = "0" + date.getMinutes();
                        // // Seconds part from the timestamp
                        // var seconds = "0" + date.getSeconds();
                        // console.log(date.getDate());
                        // console.log(date.getMonth() + 1);
                        // console.log(date.getDay());
                    }
                    // currentTemp.innerText = weatherData.daily[0].temp.day;
                    // feelsLike.innerText = ${weatherData.daily[0].feels_like.day};
                    // humidity.innerText = weatherData.daily[0].humidity;
                    // clouds.innerText = weatherData.daily[0].clouds;
                    // windSpeed.innerText = weatherData.daily[0].wind_speed;
                    
                    
                })
                //catching something unknown but code runs
                .catch(console.log("WeatherDataAPI Catch"));
            })
            .catch(console.log("Catch occured!"));

    }            
});



