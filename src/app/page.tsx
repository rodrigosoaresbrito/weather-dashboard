'use client';

import { useGeolocation } from '@/hooks/useGeolocation';
import { useWeather } from '@/hooks/useWeather';
import { WeatherDashboard } from '@/components/weather/WeatherDashboard';
import { CircularProgress, Typography, Box } from '@mui/material';

export default function HomePage() {
  const { location, error: locationError } = useGeolocation();
  const { data, isLoading, error: weatherError } = useWeather(
    location?.latitude,
    location?.longitude
  );

  if (locationError) {
    return <Typography color="error">{locationError}</Typography>;
  }

  if (isLoading || !location) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (weatherError) {
    return <Typography color="error">Erro ao buscar dados do clima.</Typography>;
  }

  return <WeatherDashboard weatherData={data} />;
}