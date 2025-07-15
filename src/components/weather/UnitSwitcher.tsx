import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

interface UnitSwitcherProps {
  unit: 'metric' | 'imperial';
  onUnitChange: (newUnit: 'metric' | 'imperial') => void;
}

export const UnitSwitcher = ({ unit, onUnitChange }: UnitSwitcherProps) => {
  const handleUnitChange = (
    event: React.MouseEvent<HTMLElement>,
    newUnit: 'metric' | 'imperial' | null,
  ) => {
    if (newUnit !== null) {
      onUnitChange(newUnit);
    }
  };

  return (
    <ToggleButtonGroup
      value={unit}
      exclusive
      onChange={handleUnitChange}
      aria-label="unidade de temperatura"
      sx={{ 
        mb: 2, 
        backgroundColor: 'rgba(255,255,255,0.2)',
      }}
    >
    </ToggleButtonGroup>
  );
};