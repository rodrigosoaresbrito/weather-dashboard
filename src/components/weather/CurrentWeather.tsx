import React from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import { WbSunny, NightsStay, Compress } from '@mui/icons-material';
import { formatTime, getWeatherIcon } from '@/lib/utils';

interface CurrentWeatherProps {
  data: any;
  cityName: string;
}

export const CurrentWeather = ({ data, cityName }: CurrentWeatherProps) => {
  const { current, timezone_offset } = data;
  const currentDate = new Date((current.dt + timezone_offset) * 1000);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        backgroundColor: 'rgba(0,0,50,0.3)',
        color: 'white',
        borderRadius: 4,
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            {cityName}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            {getWeatherIcon(current.weather[0].icon)}
            <Typography variant="h2" component="p" sx={{ ml: 2, fontWeight: 'bold' }}>
              {Math.round(current.temp)}°C
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ textTransform: 'capitalize', mt: 1 }}>
            {current.weather[0].description}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} container spacing={1} justifyContent="center">
          <Grid item xs={6} sm={4}>
            <Box textAlign="center">
              <WbSunny sx={{ fontSize: 30 }} />
              <Typography>Nascer do Sol</Typography>
              <Typography fontWeight="bold">
                {current.sunrise}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Box textAlign="center">
              <NightsStay sx={{ fontSize: 30 }} />
              <Typography>Pôr do Sol</Typography>
              <Typography fontWeight="bold">
                {current.sunset}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Box textAlign="center">
              <Compress sx={{ fontSize: 30 }} />
              <Typography>Pressão</Typography>
              <Typography fontWeight="bold">{current.pressure} hPa</Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};