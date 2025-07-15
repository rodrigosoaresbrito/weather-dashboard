import React from 'react';

export const getWeatherIcon = (iconUrl: string): React.ReactElement => {
  return <img src={`https:${iconUrl}`} alt="weather icon" width={50} height={50} />;
};

export const formatTime = (timestamp: number): string => {
  // O epoch da WeatherAPI já está em segundos, então multiplicamos por 1000 para obter milissegundos
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDay = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('pt-BR', { weekday: 'short' }).toUpperCase();
}