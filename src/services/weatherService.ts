import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
export const getWeatherData = async (lat: number, lon: number) => {
  const { data } = await axios.get(`${BASE_URL}/onecall`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric',
      exclude: 'minutely,alerts',
      lang: 'pt_br',
    },
  });
  return data;
};