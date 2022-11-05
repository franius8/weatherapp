const domManipulator = (() => {
  const displayWeather = (data: TransformedWeatherData) => {
    const content = document.querySelector('#content');
    const weatherHeading = document.createElement('h2');
    weatherHeading.textContent = `Current weather in ${data.location}`;
    const weatherDiv = document.createElement('div');
    weatherDiv.classList.add('weather');
    const weatherIcon:HTMLDivElement = document.createElement('div');
    weatherIcon.classList.add('weather-icon');
    const weatherInfoDiv:HTMLDivElement = document.createElement('div');
    weatherInfoDiv.classList.add('weather-info');
    weatherInfoDiv.innerHTML = `<p>Weather: ${data.weather}</p><p>Temp: ${data.temp}&#176;C</p><p>Feels like: ${data.realTemp}&#176;C</p>`;
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.icon}@2x.png" />`;
    content.appendChild(weatherHeading);
    weatherDiv.appendChild(weatherIcon);
    weatherDiv.appendChild(weatherInfoDiv);
    content.appendChild(weatherDiv);
  }
  return displayWeather;
})();

export default domManipulator;