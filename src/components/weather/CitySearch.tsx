import React, { useState, useEffect, useMemo } from 'react';
import { Autocomplete, TextField, CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import debounce from 'lodash.debounce';


interface CityOption {
  name: string;
  lat: number;
  lon: number;
  country: string;
  region: string;
}

interface CitySearchProps {
  onCitySelect: (city: CityOption) => void;
}

export const CitySearch = ({ onCitySelect }: CitySearchProps) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly CityOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Função que busca os dados na API
  const fetchCities = async (query: string) => {
    if (query.length < 3) {
      setOptions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const API_KEY = process.env.NEXT_PUBLIC_WEATHERAPI_KEY;
      const response = await axios.get(
        `https://api.weatherapi.com/v1/search.json`,
        {
          params: {
            key: API_KEY, 
            q: query,
          },
        },
      );
      setOptions(response.data as CityOption[]);
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
      setOptions([]); 
    }
    setLoading(false);
  };

  const debouncedFetch = useMemo(() => debounce(fetchCities, 500), []);

  useEffect(() => {
    debouncedFetch(inputValue);
  }, [inputValue, debouncedFetch]);

  return (
    <Autocomplete
      id="city-search-autocomplete"
      sx={{ width: 300, mb: 2 }}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionLabel={(option) => `${option.name}, ${option.region}`}
      options={options}
      loading={loading}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(event, value) => {
        if (value) {
          onCitySelect(value); 
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Buscar outra cidade..."
          variant="filled"
          sx={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: 1,
            '& .MuiFilledInput-root': {
                backgroundColor: 'transparent',
            },
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box component="li" {...props} key={`${option.lat}-${option.lon}`}>
          {option.name}, {option.region}, {option.country}
        </Box>
      )}
    />
  );
};