const geoCoder = (() => {
  const getCoordinates = async (location: string) => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=7e80142b9823ee5dd2cb673abe21ffd3`);
    const data = await response.json();
    const coordinates = [data[0].lat, data[0].lon];
    return coordinates;
  }
  return { getCoordinates };
})();

export default geoCoder;