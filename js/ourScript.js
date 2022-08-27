let button = document.getElementById("button");

//Grab elements
let weatherIcon = document.getElementById("weatherIcon");
let selectedDate = document.getElementById("selectedDate");
let selectedDay = document.getElementById("selectedDay");
let cityName = document.getElementById("cityName");
let currentTemp = document.getElementById("currentTemp");
let lowHighTemp = document.getElementById("lowHighTemperature");
let weatherMessage = document.getElementById("weatherMessage");
let days = document.getElementById("days").getElementsByTagName("div");
let humidity = document.getElementById("humidity");

let weekInfo = [];

fetch(`https://weatherapp-ae256-default-rtdb.firebaseio.com/location.json`)
.then(res => {
  return res.json();
})
.then((zipCode) => {
  if (zipCode.lat !== undefined && zipCode.lon !== undefined) {
    cityName.innerHTML = `<strong>${zipCode.name}</strong>`;
    return zipCode;
  }
})
.then(zipCodeData => {
  findWeather(zipCodeData);
});

button.addEventListener("click", function search() {
  let zipCode = document.getElementById("input");

  if (zipCode.value > 9999 && zipCode.value < 100000) {
    fetch(
      `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode.value}&appid=7df71b8a7701d4f29648eebc701ed349`
    )
    .then((locationApiData) => {
      if (!locationApiData.ok) {
        throw Error (locationApiData.statusText);
      }
      return locationApiData.json();
    })
    .then((zipCode) => {
      if (zipCode.lat !== undefined && zipCode.lon !== undefined) {
        cityName.innerHTML = `<strong>${zipCode.name}</strong>`;
        return zipCode;
      }
    })
    .then((zipCodeData) => {
      findWeather(zipCodeData);
    })
    .catch((error) => {
      console.log(`Location API Data error: ${error}`);
      document.getElementById('hide').setAttribute('style', 'display:none');
      document.getElementById('error').removeAttribute('style');
      document.getElementById('errorMessage').innerHTML = `<strong>Sorry! Zip code not found!</strong>`; 
    }); 
  }
});

function findWeather(zipCodeData) {
  weekInfo = [];
  document.getElementById('error').setAttribute('style','display:none');
  fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${zipCodeData.lat}&lon=${zipCodeData.lon}&units=imperial&exclude=current,minutely&hourly&appid=7df71b8a7701d4f29648eebc701ed349`
  )
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

        if (x === 0) {
          selectedDate.innerText = `${month}/${day}/${year}`;
          selectedDay.innerHTML = dayHTML;
          currentTemp.innerText = `${weekInfo[x].temp.day.toFixed(0)}\u00B0F`;
          lowHighTemp.innerText = `Low: ${weekInfo[x].temp.min.toFixed(0)}\u00B0F / High: ${weekInfo[x].temp.max.toFixed(0)}\u00B0F`;
          weatherMessage.innerText = `Today's Weather: ${weekInfo[x].weather[0].description}`;
          humidity.innerText = `Humidity: ${weekInfo[x].humidity}%`;
          weatherIcon.src = `http://openweathermap.org/img/wn/${weekInfo[x].weather[0].icon}@2x.png`;
        }

        days[x].innerHTML = `<p>${dayHTML}<br>${month}/${day}/${year}<br>L: ${weekInfo[x].temp.min.toFixed(0)}\u00B0F / H: ${weekInfo[x].temp.max.toFixed(0)}\u00B0F</p>`;

        days[x].addEventListener('click', () => {
          selectedDate.innerText = `${month}/${day}/${year}`;
          selectedDay.innerHTML = dayHTML;
          currentTemp.innerText = `${weekInfo[x].temp.day.toFixed(0)}\u00B0F`;
          lowHighTemp.innerText = `Low: ${weekInfo[x].temp.min.toFixed(0)}\u00B0F / High: ${weekInfo[x].temp.max.toFixed(0)}\u00B0F`;
          weatherMessage.innerText = `Today's Weather: ${weekInfo[x].weather[0].description}`;
          humidity.innerText = `Humidity: ${weekInfo[x].humidity}%`;
          weatherIcon.src = `http://openweathermap.org/img/wn/${weekInfo[x].weather[0].icon}@2x.png`;
        });
      }

      document.getElementById('hide').removeAttribute('style');
      return weekInfo;
    });
}
