import weatherGetter from "./weathergetter";
import geocoder from "./geocoder";
import domManipulator from "./dommanipulator";

const formHandler = (() => {
  const handleStarterForm = async (e:SubmitEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const location = data.cityname as string;
    const cities = await geocoder.getCitiesList(location);
    domManipulator.buildCityChoiceForm(cities);
    }
const cityChoiceFormHandler = async (e:SubmitEvent, cities: Cities[]) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const city = cities.find((city) => city.lat.toString() === data.city);
    const coords = [city.lat, city.lon];
    const weatherData = await weatherGetter.getWeatherDataFromCoords(coords);
    domManipulator.displayWeather(weatherData);
  }
  return { handleStarterForm, cityChoiceFormHandler };
})();

export default formHandler;