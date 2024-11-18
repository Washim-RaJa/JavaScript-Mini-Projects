const apiKey = 'ad33aca8925fc788317d4a03ded790e7'
const city = "delhi"
const searchBox = document.querySelector(".search input");
const searchBTn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`);
        const data = await response.json();
        
        if (!response.ok) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".error").textContent = data.message;
        }
        else{
            document.querySelector('.temp').textContent = Math.round(data.main.temp) + "°c";
            document.querySelector('.city').textContent = data.name;
            document.querySelector('.description').textContent = data.weather[0].description;
            document.querySelector('.humidity').textContent = data.main.humidity + " %";
            document.querySelector('.wind').textContent = data.wind.speed + " Km/h";

            if (data.weather[0].main == "Clear") {
                weatherIcon.src = './assets/clear.png'
            }
            else if (data.weather[0].main == "Clouds") {
                weatherIcon.src = './assets/clouds.png'
            }
            else if (data.weather[0].main == "Rain") {
                weatherIcon.src = './assets/rain.png'
            }
            else if (data.weather[0].main == "Drizzle") {
                weatherIcon.src = './assets/drizzle.png'
            }
            else if (data.weather[0].main == "Mist") {
                weatherIcon.src = './assets/mist.png'
            }
            document.querySelector(".error").style.display = "none"
            document.querySelector(".weather").style.display = "block"
        }
    } catch (error) {
        console.log(error.message);
    }
    
}

searchBTn.addEventListener("click", ()=> {
    checkWeather(searchBox.value)
})