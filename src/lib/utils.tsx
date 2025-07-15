import React from 'react';
import {
  WbSunny,
  Thermostat,
  Cloud,
  NightsStay,
  Grain,
  FilterDrama,
  Thunderstorm,
  AcUnit,
  Umbrella,
} from '@mui/icons-material';

export const getWeatherIcon = (iconCode: string): React.ReactElement => {
  const iconStyle = { fontSize: '2.5rem' };
  switch (iconCode) {
    case '01d':
      return <WbSunny sx={iconStyle} htmlColor="#fdd835" />;
    case '01n':
      return <NightsStay sx={iconStyle} htmlColor="#bbdefb" />;
    case '02d':
    case '03d':
    case '04d':
      return <Cloud sx={iconStyle} htmlColor="#90a4ae" />;
    case '02n':
    case '03n':
    case '04n':
      return <Cloud sx={iconStyle} htmlColor="#90a4ae" />;
    case '09d':
    case '09n':
      return <Grain sx={iconStyle} htmlColor="#64b5f6" />;
    case '10d':
    case '10n':
      return <Umbrella sx={iconStyle} htmlColor="#42a5f5" />;
    case '11d':
    case '11n':
      return <Thunderstorm sx={iconStyle} htmlColor="#757575" />;
    case '13d':
    case '13n':
      return <AcUnit sx={iconStyle} htmlColor="#e3f2fd" />;
    case '50d':
    case '50n':
      return <FilterDrama sx={iconStyle} htmlColor="#b0bec5" />;
    default:
      return <Thermostat sx={iconStyle} />;
  }
};

// Formata o timestamp da API para um horário legível (ex: "06:38")
export const formatTime = (timestamp: number, timezoneOffset: number): string => {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });
};

// Formata o timestamp da API para um dia da semana (ex: "TER")
export const formatDay = (timestamp: number, timezoneOffset: number): string => {
    const date = new Date((timestamp + timezoneOffset) * 1000);
    return date.toLocaleDateString('pt-BR', { weekday: 'short', timeZone: 'UTC' }).toUpperCase();
}