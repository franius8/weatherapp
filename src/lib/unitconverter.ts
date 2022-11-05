const unitConverter = (() => {
  const convertTempKtoC = (tempK: number) => {
    return Math.round(tempK - 273.15);
  }
  return { convertTempKtoC };
})();

export default unitConverter;