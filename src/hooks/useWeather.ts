import { useQuery } from '@tanstack/react-query';
import { getWeatherData } from '@/services/weatherService';

export const useWeather = (lat?: number, lon?: number) => {
  return useQuery({
    queryKey: ['weather', lat, lon],
    queryFn: () => getWeatherData(lat!, lon!),
    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 10,
  });
};