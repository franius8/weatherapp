const weatherIcon:HTMLDivElement = document.querySelector('#weathericon');
const weatherInfoDiv:HTMLDivElement = document.querySelector('#weatherinfo');

async function getWeatherData() {
  const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=London&APPID=7e80142b9823ee5dd2cb673abe21ffd3');
  const data = await response.json();
  return data;
}

async function transformWeatherData() {
  const data = await getWeatherData();
  const weather = data.weather[0].main;
  const temp = convertTemp(data.main.temp);
  const icon = data.weather[0].icon;
  weatherInfoDiv.innerHTML = `<p>Weather: ${weather}</p><p>Temp: ${temp}&#176;C</p>`;
  weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" />`;
}

function convertTemp(temp:number) {
  return Math.round(temp - 273.15);
}

transformWeatherData();