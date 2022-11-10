import formHandler from "./formhandler";
import weatherGetter from "./weathergetter";

const domManipulator = (() => {
  const content = document.querySelector('#content');

  const buildHeader = () => {
    const header = document.querySelector('header');
    const img = document.createElement('img');
    img.src = 'https://openweathermap.org/img/wn/02d@2x.png';
    img.alt = '';
    const title = document.createElement('h1');
    title.textContent = 'Weather App';
    header.appendChild(img);
    header.appendChild(title);
    header.addEventListener('click', () => {
      buildStarterForm()
    });
    }

  const clearContent = () => {
    content.innerHTML = '';
  }

  const buildStarterForm = () => {
    clearContent();
    const starterDiv = document.createElement('div');
    starterDiv.id = 'starter';
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
    starterDiv.appendChild(form);
    starterDiv.appendChild(currentLocationButton);
    content.appendChild(starterDiv);
  }

  const buildCityChoiceForm = (cities: Cities[] ) => {
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
    weatherInfoDiv.appendChild(displayWeatherDescription(data.weather));
    weatherInfoDiv.appendChild(displayTemperature(data.temp, data.realTemp));
    weatherInfoDiv.appendChild(displayPressure(data.pressure));
    weatherIcon.innerHTML = `<img alt="Weather" src="https://openweathermap.org/img/wn/${data.icon}@2x.png" />`;
    content.appendChild(weatherHeading);
    weatherDiv.appendChild(weatherIcon);
    weatherDiv.appendChild(weatherInfoDiv);
    content.appendChild(weatherDiv);
    content.appendChild(createResetButton());
  }

  const displayWeatherDescription = (description: string) => {
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('weather-description');
    descriptionDiv.innerHTML = `Weather: <br><span class="monospace">${description}</span>`;
    return descriptionDiv
  }

  const displayTemperature = (temperature: number, realTemperature: number) => {
    const outerTempDiv = document.createElement('div');
    outerTempDiv.classList.add('outer-temp-div');
    const tempDiv:HTMLDivElement = document.createElement('div');
    tempDiv.classList.add('temp');
    tempDiv.innerHTML = `Temp: <br><span class="monospace">${temperature}&#176;C</span>`;
    const realTempDiv:HTMLDivElement = document.createElement('div');
    realTempDiv.classList.add('real-temp');
    realTempDiv.innerHTML = `Feels like: <br><span class="monospace">${realTemperature}&#176;C</span>`;
    outerTempDiv.appendChild(tempDiv);
    outerTempDiv.appendChild(realTempDiv);
    return outerTempDiv;
  }

  const displayPressure = (pressure: number) => {
    const pressureDiv = document.createElement('div');
    pressureDiv.classList.add('pressure');
    pressureDiv.innerHTML = `Pressure: <br><span class="monospace">${pressure} hPa</span>`;
    return pressureDiv;
  }

  const buildHomePage = () => {
    buildHeader();
    buildStarterForm()
  }
  return {displayWeather, buildStarterForm, buildCityChoiceForm, buildHomePage};
})();

export default domManipulator;