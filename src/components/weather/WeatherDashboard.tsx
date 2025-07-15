import React from 'react';
import { Box, Container, Stack } from '@mui/material';
import { CurrentWeather } from './CurrentWeather';
import { DailyForecast } from './DailyForecast';
import { CitySearch } from './CitySearch';
import { UnitSwitcher } from './UnitSwitcher';

interface WeatherDashboardProps {
  weatherData: any;
  cityName: string;
  unit: 'metric' | 'imperial';
  onUnitChange: (newUnit: 'metric' | 'imperial') => void;
  onCitySelect: (city: { name: string; lat: number; lon: number }) => void;
}

export const WeatherDashboard = ({
  weatherData,
  cityName,
  unit,
  onUnitChange,
  onCitySelect,
}: WeatherDashboardProps) => {
  if (!weatherData) return null;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 4,
        background: 'linear-gradient(to top, #09203f 0%, #537895 100%)',
        color: 'white',
      }}
    >
      <Container maxWidth="md">
        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
          <CitySearch onCitySelect={onCitySelect} />
          <UnitSwitcher unit={unit} onUnitChange={onUnitChange} />
        </Stack>

        <CurrentWeather data={weatherData} cityName={cityName} />
        
        <DailyForecast
          data={weatherData.daily}
          timezoneOffset={weatherData.timezone_offset}
        />
      </Container>
    </Box>
  );
};