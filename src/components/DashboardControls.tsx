import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
} from '@mui/material';

interface DashboardControlsProps {
  dateRange: string;
  setDateRange: (value: string) => void;
  selectedMeter: string;
  setSelectedMeter: (value: string) => void;
  isLeakSimulation: boolean;
  setIsLeakSimulation: (value: boolean) => void;
  isAggressiveSaving: boolean;
  setIsAggressiveSaving: (value: boolean) => void;
}

const DashboardControls: React.FC<DashboardControlsProps> = ({
  dateRange,
  setDateRange,
  selectedMeter,
  setSelectedMeter,
  isLeakSimulation,
  setIsLeakSimulation,
  isAggressiveSaving,
  setIsAggressiveSaving,
}) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={3} alignItems="center" sx={{ mb: 4 }}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <FormControl fullWidth size="small">
          <InputLabel>{t('dashboard.timeRange')}</InputLabel>
          <Select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            label={t('dashboard.timeRange')}
          >
            <MenuItem value="24h">{t('dashboard.timeRanges.24h')}</MenuItem>
            <MenuItem value="7d">{t('dashboard.timeRanges.7d')}</MenuItem>
            <MenuItem value="30d">{t('dashboard.timeRanges.30d')}</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <FormControl fullWidth size="small">
          <InputLabel>{t('dashboard.waterMeter')}</InputLabel>
          <Select
            value={selectedMeter}
            onChange={(e) => setSelectedMeter(e.target.value)}
            label={t('dashboard.waterMeter')}
          >
            <MenuItem value="main-meter">{t('dashboard.meters.main')}</MenuItem>
            <MenuItem value="kitchen-meter">{t('dashboard.meters.kitchen')}</MenuItem>
            <MenuItem value="bathroom-meter">{t('dashboard.meters.bathroom')}</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={isLeakSimulation}
              onChange={(e) => setIsLeakSimulation(e.target.checked)}
              color="error"
            />
          }
          label={t('dashboard.simulateLeak')}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={isAggressiveSaving}
              onChange={(e) => setIsAggressiveSaving(e.target.checked)}
              color="success"
            />
          }
          label={t('dashboard.aggressiveSaving')}
        />
      </Grid>
    </Grid>
  );
};

export default DashboardControls;
