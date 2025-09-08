import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ShowerIcon from '@mui/icons-material/Shower';
import KitchenIcon from '@mui/icons-material/Kitchen';
import YardIcon from '@mui/icons-material/Yard';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';

const WaterSavingTips: React.FC = () => {
  const { t } = useTranslation();

  const waterTips = [
    {
      id: 'fixLeaks',
      icon: <WaterDropIcon />,
      difficulty: 'easy',
    },
    {
      id: 'shorterShowers',
      icon: <ShowerIcon />,
      difficulty: 'easy',
    },
    {
      id: 'lowFlowFixtures',
      icon: <ShowerIcon />,
      difficulty: 'medium',
    },
    {
      id: 'dishwasher',
      icon: <KitchenIcon />,
      difficulty: 'easy',
    },
    {
      id: 'garden',
      icon: <YardIcon />,
      difficulty: 'medium',
    },
    {
      id: 'laundry',
      icon: <LocalLaundryServiceIcon />,
      difficulty: 'easy',
    },
  ];

  const getDifficultyColor = (difficulty: string): 'success' | 'warning' | 'error' | 'default' => {
    switch (difficulty) {
      case 'easy':
        return 'success';
      case 'medium':
        return 'warning';
      case 'advanced':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container 
        maxWidth="xl" 
        sx={{ 
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
          mx: 'auto',
          width: '100%'
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}
          >
            {t('tips.title')}
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}
          >
            {t('tips.subtitle')}
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
          gap: 4 
        }}>
          {waterTips.map((tip) => (
            <Card
              key={tip.id}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      backgroundColor: 'primary.light',
                      color: 'white',
                      mr: 2,
                    }}
                  >
                    {tip.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                      {t(`tips.${tip.id}.title`)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t(`tips.${tip.id}.category`)}
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="body1"
                  sx={{ mb: 3, lineHeight: 1.6, color: 'text.secondary' }}
                >
                  {t(`tips.${tip.id}.description`)}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip
                    label={t(`tips.difficulty.${tip.difficulty}`)}
                    size="small"
                    color={getDifficultyColor(tip.difficulty)}
                    sx={{ fontWeight: 'bold' }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 'bold', color: 'secondary.main' }}
                  >
                    {t('tips.save')} {t(`tips.${tip.id}.savings`)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default WaterSavingTips;
