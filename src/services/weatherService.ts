import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_WEATHERAPI_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

const adaptWeatherData = (data: any) => {
  return {
    timezone_offset: data.location.tz_id,
    current: {
      dt: data.location.localtime_epoch,
      temp: data.current.temp_c,
      pressure: data.current.pressure_mb,
      sunrise: data.forecast.forecastday[0].astro.sunrise,
      sunset: data.forecast.forecastday[0].astro.sunset,
      weather: [
        {
          description: data.current.condition.text,
          icon: data.current.condition.icon,
        },
      ],
    },
    daily: data.forecast.forecastday.map((day: any) => ({
      dt: day.date_epoch,
      temp: {
        min: day.day.mintemp_c,
        max: day.day.maxtemp_c,
      },
      weather: [
        {
          description: day.day.condition.text,
          icon: day.day.condition.icon,
        },
      ],
    })),
  };
};

export const getWeatherData = async (lat: number, lon: number) => {

  const locationQuery = `${lat},${lon}`;
  console.log(`Fetching weather data for coordinates: ${locationQuery}`);
  console.log(`Using API key: ${API_KEY}`);

  const { data } = await axios.get(`${BASE_URL}/forecast.json`, {
    params: {
      key: API_KEY,
      q: locationQuery,
      days: 8, 
      aqi: 'no',
      alerts: 'no',
      lang: 'pt',
    },
  });
  return adaptWeatherData(data);
};