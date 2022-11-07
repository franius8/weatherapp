const geoCoder = (() => {
  const getCitiesList = async (location: string) => {
    const longResponseRaw = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=7e80142b9823ee5dd2cb673abe21ffd3`);
    return await longResponseRaw.json();
  }

  const getCoordinates = async (location: string) => {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=7e80142b9823ee5dd2cb673abe21ffd3`);
    const data = await response.json();
    return [data[0].lat, data[0].lon];
  }
  const getUserPosition = async () => {
      navigator.geolocation.getCurrentPosition(
        (position: Position) => position,
        (error: never) => console.log(error));
    };

  return { getCitiesList, getCoordinates, getUserPosition };
})();

export default geoCoder;