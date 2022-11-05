import geoCoder from './lib/geocoder';

async function getWeatherData(location:string) {
  const coordinates = await geoCoder.getCoordinates(location);
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&APPID=7e80142b9823ee5dd2cb673abe21ffd3`);
  const data = await response.json();
  return data;
}

async function transformWeatherData(location = 'London') {
  const data = await getWeatherData(location);
  const weather:string = data.weather[0].main;
  const temp:number = convertTemp(data.main.temp);
  const realTemp:number = convertTemp(data.main.feels_like);
  const icon:string = data.weather[0].icon;
  displayWeather(location, weather, temp, realTemp, icon);
}

function displayWeather(location: string, weather:string, temp:number, realTemp:number, icon:string) {
  const content = document.querySelector('#content');
  const weatherHeading = document.createElement('h2');
  weatherHeading.textContent = `Current weather in ${location}`;
  const weatherDiv = document.createElement('div');
  weatherDiv.classList.add('weather');
  const weatherIcon:HTMLDivElement = document.createElement('div');
  weatherIcon.classList.add('weather-icon');
  const weatherInfoDiv:HTMLDivElement = document.createElement('div');
  weatherInfoDiv.classList.add('weather-info');
  weatherInfoDiv.innerHTML = `<p>Weather: ${weather}</p><p>Temp: ${temp}&#176;C</p><p>Feels like: ${realTemp}&#176;C</p>`;
  weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" />`;
  content.appendChild(weatherHeading);
  weatherDiv.appendChild(weatherIcon);
  weatherDiv.appendChild(weatherInfoDiv);
  content.appendChild(weatherDiv);
}

function convertTemp(temp:number) {
  return Math.round(temp - 273.15);
}

transformWeatherData();