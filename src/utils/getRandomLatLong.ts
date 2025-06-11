export const getRandomLatLong = (): [number, number] => {
  const lat = (Math.random() * 180 - 90).toFixed(6);
  const long = (Math.random() * 360 - 180).toFixed(6);
  return [parseFloat(lat), parseFloat(long)];
};
