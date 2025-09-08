import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import PublicIcon from '@mui/icons-material/Public';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import PeopleIcon from '@mui/icons-material/People';

const Statistics: React.FC = () => {
  const { t } = useTranslation();

  const statistics = [
    {
      id: 'globalCrisis',
      value: '2.2B',
      icon: <PublicIcon sx={{ fontSize: 48 }} />,
      color: '#f44336',
    },
    {
      id: 'dailyUsageTitle',
      value: '300-380',
      icon: <WaterDropIcon sx={{ fontSize: 48 }} />,
      color: '#2196f3',
    },
    {
      id: 'conservationTitle',
      value: '30%',
      icon: <TrendingUpIcon sx={{ fontSize: 48 }} />,
      color: '#4caf50',
    },
    {
      id: 'householdImpact',
      value: '10,000+',
      icon: <PeopleIcon sx={{ fontSize: 48 }} />,
      color: '#ff9800',
    },
  ];

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
            {t('statistics.title')}
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}
          >
            {t('statistics.subtitle')}
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: 3 
        }}>
          {statistics.map((stat) => (
            <Card
              key={stat.id}
              sx={{
                textAlign: 'center',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: stat.color,
                    color: 'white',
                    mx: 'auto',
                    mb: 3,
                  }}
                >
                  {stat.icon}
                </Box>
                
                <Typography
                  variant="h3"
                  component="h3"
                  sx={{ mb: 1, fontWeight: 'bold', color: stat.color }}
                >
                  {stat.value}
                </Typography>
                
                <Typography
                  variant="h6"
                  component="h4"
                  sx={{ mb: 2, fontWeight: 'bold' }}
                >
                  {t(`statistics.${stat.id}`)}
                </Typography>
                
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                >
                  {t(`statistics.${stat.id.replace('Title', 'Description')}`)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Additional Information Section */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography
            variant="h4"
            component="h3"
            sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}
          >
            {t('statistics.everyDrop')}
          </Typography>
          <Typography
            variant="body1"
            sx={{ 
              maxWidth: 800, 
              mx: 'auto', 
              lineHeight: 1.8,
              color: 'text.secondary',
              fontSize: '1.1rem'
            }}
          >
            {t('statistics.everyDropDescription')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Statistics;
