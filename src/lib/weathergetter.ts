import geoCoder from "./geocoder";
import unitConverter from "./unitconverter";

const weatherGetter = (() => {
  const apiKey = '7e80142b9823ee5dd2cb673abe21ffd3';

  const fetchWeatherData = async (location:string) =>{
    const coordinates = await geoCoder.getCoordinates(location);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&APPID=${apiKey}`);
    const data = await response.json() as Data;
    return data;
  }
  
  const transformWeatherData = async (data:Data, location:string) => {
    const weather:string = data.weather[0].main;
    const temp:number = unitConverter.convertTempKtoC(data.main.temp);
    const realTemp:number = unitConverter.convertTempKtoC(data.main.feels_like);
    const icon:string = data.weather[0].icon;
    return {location:location, weather:weather, temp:temp, realTemp:realTemp, icon:icon};
  }

  const getWeatherData = async (location: string) => {
    const weatherData = await fetchWeatherData(location);
    const transformedWeatherData = await transformWeatherData(weatherData, location);
    return transformedWeatherData;
  }

  return { getWeatherData };
})();

export default weatherGetter;