'use client';

import { useState, useEffect } from 'react';
import { useWeather } from '@/hooks/useWeather';
import { WeatherDashboard } from '@/components/weather/WeatherDashboard';
import { CircularProgress, Typography, Box, CssBaseline } from '@mui/material';

// Define a estrutura para nosso estado de localização
interface LocationState {
  lat: number;
  lon: number;
  name: string;
}

export default function HomePage() {
  // Estado para a localização selecionada
  const [location, setLocation] = useState<LocationState | null>(null);
  
  // Estado para a unidade de temperatura ('metric' para Celsius, 'imperial' para Fahrenheit)
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  // Efeito para pegar a localização inicial do usuário na primeira vez que a página carrega
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          name: 'Sua Localização', // Nome temporário
        });
      },
      () => {
        // Usa uma localização padrão caso o usuário negue a permissão
        console.error("Permissão de localização negada. Usando localização padrão.");
        setLocation({ lat: -24.0054, lon: -46.4025, name: 'Praia Grande' });
      }
    );
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  // O hook useWeather busca os dados sempre que 'location' ou 'unit' mudar
  const { data: weatherData, isLoading, error } = useWeather(
    location?.lat,
    location?.lon,
    unit
  );

  // Esta é a função que o CitySearch irá chamar
  const handleCitySelect = (city: { name: string; lat: number; lon: number }) => {
    setLocation({
      lat: city.lat,
      lon: city.lon,
      name: city.name,
    });
  };

  // Enquanto espera a localização inicial ou os dados do clima
  if (!location || isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // Se houver um erro ao buscar o clima
  if (error) {
    return <Typography color="error">Erro ao buscar dados do clima.</Typography>;
  }

  return (
    <>
      <CssBaseline />
      <WeatherDashboard
        weatherData={weatherData}
        cityName={location.name}
        unit={unit}
        onUnitChange={setUnit} // Passa a função para atualizar a unidade
        onCitySelect={handleCitySelect} // <-- Passa a função de seleção de cidade
      />
    </>
  );
}