import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Speed as SpeedIcon,
  WaterDrop as WaterDropIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Savings as SavingsIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import type { WaterUsageMetrics } from './dashboard/waterUsageDataService';

interface KPICardsProps {
  metrics: WaterUsageMetrics;
  isAggressiveSaving: boolean;
}

const KPICards: React.FC<KPICardsProps> = ({
  metrics,
  isAggressiveSaving,
}) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <SpeedIcon sx={{ color: 'primary.main', fontSize: 40 }} />
              <Chip
                label={isAggressiveSaving ? '-12%' : '+8%'}
                color={isAggressiveSaving ? 'success' : 'warning'}
                size="small"
              />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {metrics.todayUsage}L
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('dashboard.kpis.todayUsage')}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <WaterDropIcon sx={{ color: 'info.main', fontSize: 40 }} />
              <Chip
                label={`${metrics.progressPercentage.toFixed(0)}%`}
                color={metrics.progressPercentage > 90 ? 'error' : 'success'}
                size="small"
              />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {metrics.monthlyUsage}L
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('dashboard.kpis.monthlyUsage')}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <TrendingUpIcon sx={{ color: 'warning.main', fontSize: 40 }} />
              <Tooltip title={t('dashboard.explanations.forecastEom')}>
                <InfoIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
              </Tooltip>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {metrics.monthlyForecast}L
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('dashboard.kpis.monthlyForecast')}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <SavingsIcon sx={{ color: 'success.main', fontSize: 40 }} />
              {metrics.savingsPercentage > 10 ? (
                <TrendingDownIcon sx={{ color: 'success.main' }} />
              ) : (
                <TrendingUpIcon sx={{ color: 'error.main' }} />
              )}
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {metrics.savingsPercentage}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('dashboard.kpis.savingsVsLastMonth')}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default KPICards;
