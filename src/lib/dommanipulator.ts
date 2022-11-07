import formHandler from "./formhandler";
import weatherGetter from "./weathergetter";

const domManipulator = (() => {
  const content = document.querySelector('#content');

  const buildHeader = () => {
    const header = document.querySelector('header')
    const title = document.createElement('h1');
    title.textContent = 'Weather App';
    header.appendChild(title);
  }

  const clearContent = () => {
    content.innerHTML = '';
  }

  const buildStarterForm = () => {
    buildHeader();
    content.setAttribute('id', 'content');
    const form = document.createElement('form');
    form.setAttribute('id', 'starter-form');
    form.addEventListener('submit', (e) => formHandler.handleStarterForm(e));
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'cityname');
    input.setAttribute('placeholder', 'Enter city name');
    const submit = document.createElement('button');
    submit.setAttribute('type', 'submit');
    submit.textContent = 'Display weather';
    const currentLocationButton = document.createElement('button');
    currentLocationButton.setAttribute('type', 'button');
    currentLocationButton.textContent = 'Use current location';
    currentLocationButton.addEventListener('click', () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = [position.coords.latitude, position.coords.longitude];
        weatherGetter.getWeatherDataFromCoords(coords).then((data) => {
          displayWeather(data);
        }, (error) => console.log(error));
        })
      });
    form.appendChild(input);
    form.appendChild(submit);
    content.appendChild(form);
    content.appendChild(currentLocationButton);
  }

  const buildCityChoiceForm = (cities: Cities[] ) => {
    console.log(cities);
    clearContent();
    const heading = document.createElement('h2');
    heading.textContent = 'Choose a city';
    const form = document.createElement('form');
    form.setAttribute('id', 'city-choice-form');
    const radioContainer = document.createElement('div');
    radioContainer.setAttribute('id', 'radio-container');
    cities.forEach((city: Cities) => {
      const input = document.createElement('input');
      input.setAttribute('required', 'true');
      input.setAttribute('type', 'radio');
      input.setAttribute('name', 'city');
      input.setAttribute('value', city.lat.toString());
      input.setAttribute('id', city.lat.toString());
      const label = document.createElement('label');
      label.setAttribute('for', city.lat.toString());
      label.textContent = city.name + ', ' + city.country;
      radioContainer.appendChild(input);
      radioContainer.appendChild(label);
      label.addEventListener('click', () => {console.log('clicked')});
    });
    const submit = document.createElement('button');
    submit.setAttribute('type', 'submit');
    submit.textContent = 'Choose city';
    form.addEventListener('submit', (e) => {formHandler.cityChoiceFormHandler(e, cities)});
    form.appendChild(radioContainer);
    form.appendChild(submit);
    content.appendChild(heading);
    content.appendChild(form);
    }

  const createResetButton = () => {
    const resetButton = document.createElement('button');
    resetButton.setAttribute('type', 'button');
    resetButton.textContent = 'Select another city';
    resetButton.addEventListener('click', () => {
      clearContent();
      buildStarterForm();
    });
    return resetButton;
  }
  
  const displayWeather = (data: TransformedWeatherData) => {
    clearContent();
    const weatherHeading = document.createElement('h2');
    weatherHeading.textContent = `Current weather in ${data.location}, ${data.country}`;
    const weatherDiv = document.createElement('div');
    weatherDiv.classList.add('weather');
    const weatherIcon:HTMLDivElement = document.createElement('div');
    weatherIcon.classList.add('weather-icon');
    const weatherInfoDiv:HTMLDivElement = document.createElement('div');
    weatherInfoDiv.classList.add('weather-info');
    weatherInfoDiv.innerHTML = `<p>Weather: ${data.weather}</p><p>Temp: ${data.temp}&#176;C</p><p>Feels like: ${data.realTemp}&#176;C</p>`;
    weatherIcon.innerHTML = `<img alt="Weather" src="https://openweathermap.org/img/wn/${data.icon}@2x.png" />`;
    content.appendChild(weatherHeading);
    weatherDiv.appendChild(weatherIcon);
    weatherDiv.appendChild(weatherInfoDiv);
    content.appendChild(weatherDiv);
    content.appendChild(createResetButton());
  }
  return {displayWeather, buildStarterForm, buildCityChoiceForm};
})();

export default domManipulator;