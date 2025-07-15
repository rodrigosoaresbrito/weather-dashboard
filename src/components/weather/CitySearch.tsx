import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';

interface CityOption {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

interface CitySearchProps {
  onCitySelect: (city: CityOption) => void;
}

export const CitySearch = ({ onCitySelect }: CitySearchProps) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly CityOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (inputValue.length < 3) {
      setOptions([]);
      return undefined;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        const response = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct`,
          {
            params: {
              q: inputValue,
              limit: 5,
              appid: API_KEY,
            },
          },
        );
        setOptions(response.data as CityOption[]);
      } catch (error) {
        console.error('Erro ao buscar cidades:', error);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);

  return (
    <Autocomplete
      id="city-search-autocomplete"
      sx={{ width: 300, mb: 2, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 1 }}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionLabel={(option) => `${option.name}, ${option.state || ''} ${option.country}`}
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
    />
  );
};