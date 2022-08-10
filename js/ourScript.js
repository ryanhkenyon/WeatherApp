function search() {
  
  let searchButton = document.getElementById("button");

  searchButton.addEventListener("click", function() {
    let zipCode = document.getElementById("input");
    console.log("test");

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
    }
  });
    
   
}
