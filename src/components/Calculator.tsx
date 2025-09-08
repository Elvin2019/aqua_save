import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Alert,
  Slider,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import CalculateIcon from '@mui/icons-material/Calculate';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import SavingsIcon from '@mui/icons-material/Savings';

interface CalculationResult {
  dailyUsage: number;
  monthlyUsage: number;
  yearlyUsage: number;
  monthlyCost: number;
  yearlyCost: number;
  potentialSavings: number;
}

const Calculator: React.FC = () => {
  const { t } = useTranslation();
  const [householdSize, setHouseholdSize] = useState<number>(4);
  const [showerMinutes, setShowerMinutes] = useState<number>(8);
  const [dishwasherUses, setDishwasherUses] = useState<number>(5);
  const [laundryLoads, setLaundryLoads] = useState<number>(4);
  const [waterRate, setWaterRate] = useState<number>(1.0); // 1 AZN per ton (Bakı tarifi: 1 ton su üçün 1 AZN)
  const [hasLowFlowFixtures, setHasLowFlowFixtures] = useState<boolean>(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateWaterUsage = useCallback(() => {
    // Average water usage calculations (liters per day) - converted from gallons
    const showerUsage = householdSize * showerMinutes * (hasLowFlowFixtures ? 5.7 : 9.5); // liters per minute
    const dishwasherUsage = dishwasherUses * (hasLowFlowFixtures ? 15 : 23); // liters per load
    const laundryUsage = laundryLoads * (hasLowFlowFixtures ? 95 : 150); // liters per load
    const toiletUsage = householdSize * 6 * (hasLowFlowFixtures ? 4.9 : 6.1); // flushes per day
    const faucetUsage = householdSize * 10 * (hasLowFlowFixtures ? 5.7 : 8.3); // minutes per day
    const otherUsage = householdSize * 19; // cooking, drinking, etc. (liters)

    const dailyUsage = showerUsage + dishwasherUsage + laundryUsage + toiletUsage + faucetUsage + otherUsage;
    const monthlyUsage = dailyUsage * 30;
    const yearlyUsage = dailyUsage * 365;

    // Convert to tons for cost calculation (1 ton = 1000 liters)
    const monthlyUsageInTons = monthlyUsage / 1000;
    const yearlyUsageInTons = yearlyUsage / 1000;

    const monthlyCost = monthlyUsageInTons * waterRate;
    const yearlyCost = yearlyUsageInTons * waterRate;

    // Calculate potential savings with efficient fixtures
    const potentialSavings = hasLowFlowFixtures ? 0 : yearlyCost * 0.3;

    return {
      dailyUsage: Math.round(dailyUsage),
      monthlyUsage: Math.round(monthlyUsage),
      yearlyUsage: Math.round(yearlyUsage),
      monthlyCost: Math.round(monthlyCost * 100) / 100,
      yearlyCost: Math.round(yearlyCost * 100) / 100,
      potentialSavings: Math.round(potentialSavings * 100) / 100,
    };
  }, [householdSize, showerMinutes, dishwasherUses, laundryLoads, waterRate, hasLowFlowFixtures]);

  useEffect(() => {
    setResult(calculateWaterUsage());
  }, [calculateWaterUsage]);

  return (
    <Box sx={{ py: 8, backgroundColor: 'white' }}>
      <Container 
        maxWidth="xl" 
        sx={{ 
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
          mx: 'auto',
          width: '100%'
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <CalculateIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography
            variant="h2"
            component="h2"
            sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}
          >
            {t('calculator.title')}
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}
          >
            {t('calculator.subtitle')}
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
          gap: 4 
        }}>
          {/* Input Section */}
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                {t('calculator.householdInfo')}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>
                  {t('calculator.householdSize')}: {householdSize} {t('calculator.people')}
                </Typography>
                <Slider
                  value={householdSize}
                  onChange={(_, value) => setHouseholdSize(value as number)}
                  min={1}
                  max={8}
                  marks
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>
                  {t('calculator.showerTime')}: {showerMinutes} {t('calculator.minutes')}
                </Typography>
                <Slider
                  value={showerMinutes}
                  onChange={(_, value) => setShowerMinutes(value as number)}
                  min={3}
                  max={20}
                  marks
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>
                  {t('calculator.dishwasherUses')}: {dishwasherUses}
                </Typography>
                <Slider
                  value={dishwasherUses}
                  onChange={(_, value) => setDishwasherUses(value as number)}
                  min={0}
                  max={14}
                  marks
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>
                  {t('calculator.laundryLoads')}: {laundryLoads}
                </Typography>
                <Slider
                  value={laundryLoads}
                  onChange={(_, value) => setLaundryLoads(value as number)}
                  min={1}
                  max={14}
                  marks
                  valueLabelDisplay="auto"
                />
              </Box>

              <TextField
                fullWidth
                label={t('calculator.waterRate')}
                type="number"
                value={waterRate}
                onChange={(e) => setWaterRate(parseFloat(e.target.value) || 0)}
                sx={{ mb: 3 }}
                inputProps={{ step: 0.001, min: 0 }}
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={hasLowFlowFixtures}
                    onChange={(e) => setHasLowFlowFixtures(e.target.checked)}
                  />
                }
                label={t('calculator.hasEfficientFixtures')}
              />
            </CardContent>
          </Card>

          {/* Results Section */}
          {result && (
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                  {t('calculator.yourUsage')}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 2, 
                    backgroundColor: 'primary.light', 
                    borderRadius: 2,
                    color: 'white'
                  }}>
                    <WaterDropIcon sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="h6">{t('calculator.dailyUsage')}</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {result.dailyUsage} {t('calculator.liters')}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 2, 
                    backgroundColor: 'secondary.light', 
                    borderRadius: 2,
                    color: 'white'
                  }}>
                    <WaterDropIcon sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="h6">{t('calculator.monthlyUsage')}</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {result.monthlyUsage.toLocaleString()} {t('calculator.liters')}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        ({(result.monthlyUsage / 1000).toFixed(2)} {t('calculator.tons')})
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 2, 
                    backgroundColor: 'success.light', 
                    borderRadius: 2,
                    color: 'white'
                  }}>
                    <WaterDropIcon sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="h6">{t('calculator.yearlyUsage')}</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {result.yearlyUsage.toLocaleString()} {t('calculator.liters')}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        ({(result.yearlyUsage / 1000).toFixed(1)} {t('calculator.tons')})
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 2, 
                    backgroundColor: 'info.light', 
                    borderRadius: 2,
                    color: 'white'
                  }}>
                    <SavingsIcon sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="h6">{t('calculator.monthlyCost')}</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {result.monthlyCost} ₼
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 2, 
                    backgroundColor: 'warning.light', 
                    borderRadius: 2,
                    color: 'white'
                  }}>
                    <SavingsIcon sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="h6">{t('calculator.yearlyCost')}</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {result.yearlyCost} ₼
                      </Typography>
                    </Box>
                  </Box>

                  {result.potentialSavings > 0 && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {t('calculator.potentialSavings')}: {result.potentialSavings} ₼
                      </Typography>
                      <Typography variant="body2">
                        {t('calculator.savingsMessage')}
                      </Typography>
                    </Alert>
                  )}
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Calculator;
