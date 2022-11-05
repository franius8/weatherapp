import weatherGetter from "./lib/weathergetter";
import domManipulator from "./lib/dommanipulator";

weatherGetter.getWeatherData('London').then((data) => {
  domManipulator(data);
});