import geoCoder from "./geocoder";
import unitConverter from "./unitconverter";

const weatherGetter = (() => {
  const apiKey = '7e80142b9823ee5dd2cb673abe21ffd3';

  const fetchWeatherData = async (location:string) =>{
    const coordinates = await geoCoder.getCoordinates(location);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&APPID=${apiKey}`);
    return await response.json() as Data;
  }
  
  const transformWeatherData = async (data:Data, location:string) => {
    const country:string = data.sys.country;
    const weather:string = data.weather[0].main;
    const temp:number = unitConverter.convertTempKtoC(data.main.temp);
    const realTemp:number = unitConverter.convertTempKtoC(data.main.feels_like);
    const icon:string = data.weather[0].icon;
    return {location:location, country:country, weather:weather, temp:temp, realTemp:realTemp, icon:icon};
  }

  const getWeatherData = async (location: string) => {
    const weatherData = await fetchWeatherData(location);
    return await transformWeatherData(weatherData, location);
  }

  const getWeatherDataFromCoords = async (coords: number[]) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&APPID=${apiKey}`);
    const data = await response.json() as Data;
    return await transformWeatherData(data, data.name);
  }

  return { getWeatherData, getWeatherDataFromCoords };
})();

export default weatherGetter;