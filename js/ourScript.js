

    let button = document.getElementById('button');
    
    button.addEventListener("click", function search() {
    
        console.log("Hello World!");
    
        let zipCode = document.getElementById("input");
        
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



