import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { formatDay, getWeatherIcon } from '@/lib/utils';
import { motion } from 'framer-motion';

interface DailyForecastProps {
  data: any[];
  timezoneOffset: number;
}

export const DailyForecast = ({ data, timezoneOffset }: DailyForecastProps) => {

  const next7Days = data.slice(1, 8);

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {next7Days.map((day, index) => (
        <Grid item xs={12 / 7} key={day.dt}>
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 1.5,
                textAlign: 'center',
                backgroundColor: 'rgba(0,0,50,0.3)',
                color: 'white',
                borderRadius: 4,
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold">
                {formatDay(day.dt)}
              </Typography>
              <Box my={1}>
                {getWeatherIcon(day.weather[0].icon)}
              </Box>
              <Typography variant="body2" fontWeight="bold">
                {Math.round(day.temp.max)}°
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {Math.round(day.temp.min)}°
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};