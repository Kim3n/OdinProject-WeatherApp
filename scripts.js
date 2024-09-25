document.getElementById("form").addEventListener("submit", function (e) {
  const search = document.getElementById("search").value;
  e.preventDefault();
  getWeather(search);
  const main = document.querySelector("main");
  const targetElement = document.querySelector("#screen-6");
  main.scrollTo({
    top: targetElement.offsetTop - main.offsetTop,
    behavior: "smooth",
  });
});

//weather search

function getWeather(search) {
  //var today = new Date();
  //var nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  //console.log(today, nextWeek);
  //https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search}?unitGroup=us&include=current%2Chours&key=QR6XEZDE7JKTW4BGXTBP48AFB&contentType=json
  showLoader();
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search}?unitGroup=metric&include=current%2Chours&key=QR6XEZDE7JKTW4BGXTBP48AFB&contentType=json`,
    { mode: "cors" }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      hideLoader();
      console.log(response);
      updatedSection(search, response);
    })
    .catch(function (error) {
      hideLoader();
      console.error("Fetch error:", error); // Log the error in console
      alert(
        "An error occurred while fetching the weather data. Please try again later."
      );
    });
}

const weatherIcons = {
  snow: "imgs/icons/snow.png",
  "snow-showers-day": "imgs/icons/snow-showers-day.png",
  "snow-showers-night": "imgs/icons/snow-showers-night.png",
  "thunder-rain": "imgs/icons/thunder-rain.png",
  "thunder-showers-day": "imgs/icons/thunder-showers-day.png",
  "thunder-showers-night": "imgs/icons/thunder-showers-night.png",
  "thunder-showers-night": "imgs/icons/thunder-showers-day.png",
  rain: "imgs/icons/rain.png",
  "showers-day": "imgs/icons/showers-day.png",
  "showers-night": "imgs/icons/showers-night.png",
  fog: "imgs/icons/fog.png",
  wind: "imgs/icons/wind.png",
  cloudy: "imgs/icons/cloudy.png",
  "partly-cloudy-day": "imgs/icons/partly-cloudy-day.png",
  "partly-cloudy-night": "imgs/icons/partly-cloudy-night.png",
  "clear-day": "imgs/icons/clear-day.png",
  "clear-night": "imgs/icons/clear-night.png",
};

function getWeatherIcon(weather) {
  return weatherIcons[weather] || "icons/default.png";
}

function updatedSection(location, weather) {
  let sectionId;
  if (location === "Verdal") {
    sectionId = "screen-1";
  } else if (location === "Brasília") {
    sectionId = "screen-2";
  } else if (location === "Tokyo") {
    sectionId = "screen-3";
  } else if (location === "London") {
    sectionId = "screen-4";
  } else if (location === "Madrid") {
    sectionId = "screen-5";
  } else {
    sectionId = "screen-6";
  }

  if (sectionId) {
    const section = document.getElementById(sectionId);
    const contentDiv = section.querySelector(".content");

    contentDiv.innerHTML = null;

    var locationTitle = document.createElement("h1");
    locationTitle.innerHTML = weather.resolvedAddress;
    contentDiv.appendChild(locationTitle);

    var infoContainer = document.createElement("div");

    var currentWeather = document.createElement("div");
    var currentWeatherText = document.createElement("h3");
    currentWeatherText.innerHTML =
      weather.currentConditions.conditions +
      ", " +
      weather.currentConditions.temp +
      " °C   ";
    currentWeather.classList.add("currentWeather");
    currentWeather.appendChild(currentWeatherText);
    infoContainer.appendChild(currentWeather);

    var currentFeelsLike = document.createElement("h3");
    currentFeelsLike.innerHTML =
      "Feels like: " + weather.currentConditions.feelslike + " °C";
    infoContainer.appendChild(currentFeelsLike);

    var currentWind = document.createElement("h3");
    currentWind.innerHTML =
      "Wind: " + weather.currentConditions.windspeed + "m/s";
    infoContainer.appendChild(currentWind);

    var currentHumidity = document.createElement("h3");
    currentHumidity.innerHTML =
      "Humidity: " + weather.currentConditions.humidity + "%";
    infoContainer.appendChild(currentHumidity);

    var currentPrecip = document.createElement("h3");

    if (weather.currentConditions.precip == null) {
      currentHumidity.innerHTML = "Precipitation: " + "0";
    } else {
      currentHumidity.innerHTML =
        "Precipitation: " + weather.currentConditions.precip;
    }

    infoContainer.appendChild(currentPrecip);

    //append all info
    contentDiv.appendChild(infoContainer);

    //weather icon

    var weatherIcon = document.createElement("img");
    weatherIcon.classList.add("turn-icon-neon-green");
    weatherIcon.classList.add("mask");
    weatherIcon.src = getWeatherIcon(weather.currentConditions.icon);
    currentWeather.appendChild(weatherIcon);
  }
}

//Go to section

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    const main = document.querySelector("main");

    console.log(targetId, targetElement);

    if (targetElement) {
      main.scrollTo({
        top: targetElement.offsetTop - main.offsetTop,
        behavior: "smooth",
      });
    }
  });
});

const getLoader = () => {
  return document.getElementById("loader");
};

const showLoader = () => {
  const loader = getLoader();
  return (loader.style.display = "flex");
};

const hideLoader = () => {
  const loader = getLoader();
  return (loader.style.display = "none");
};

getWeather("Verdal");
getWeather("Brasília");
getWeather("Tokyo");
getWeather("London");
getWeather("Madrid");
