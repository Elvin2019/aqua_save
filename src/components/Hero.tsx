import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  useTheme,
} from '@mui/material';
import { keyframes } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import SavingsIcon from '@mui/icons-material/Savings';

const dropAnimation = keyframes`
  0% { transform: translateY(-10px); opacity: 0.7; }
  50% { transform: translateY(0px); opacity: 1; }
  100% { transform: translateY(10px); opacity: 0.7; }
`;

const Hero: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        background: theme.custom.gradients.hero,
        color: 'white',
        py: { xs: 6, md: 10 },
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        margin: 0,
        padding: 0,
      }}
    >
      <Container 
        maxWidth="xl" 
        sx={{ 
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
          mx: 'auto',
          width: '100%'
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          alignItems: 'center', 
          gap: { xs: 4, md: 6 },
          textAlign: { xs: 'center', md: 'left' }
        }}>
          <Box sx={{ flex: 1, maxWidth: { xs: '100%', md: '600px' } }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                mb: 3,
                fontWeight: 'bold',
                lineHeight: 1.2,
              }}
            >
              {t('hero.title')}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                opacity: 0.95,
                lineHeight: 1.6,
                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                maxWidth: '600px',
                mx: { xs: 'auto', md: 0 }
              }}
            >
              {t('hero.subtitle')}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', md: 'flex-start' }
            }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: 'white',
                  color: theme.palette.primary.main,
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {t('hero.getStarted')}
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {t('hero.learnMore')}
              </Button>
            </Box>
          </Box>
          
          <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 3,
            maxWidth: { xs: '100%', md: '400px' }
          }}>
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 3,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                }
              }}
            >
              <WaterDropIcon
                sx={{
                  fontSize: 50,
                  color: 'white',
                  animation: `${dropAnimation} 2s ease-in-out infinite`,
                  mb: 1
                }}
              />
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                {t('hero.waterConservation')}
              </Typography>
            </Card>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Card
                sx={{
                  p: 2,
                  textAlign: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 3,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  }
                }}
              >
                <LocalFloristIcon sx={{ fontSize: 40, color: 'white' }} />
                <Typography variant="body2" sx={{ color: 'white', mt: 1, fontWeight: 500 }}>
                  {t('hero.ecoFriendly')}
                </Typography>
              </Card>
              
              <Card
                sx={{
                  p: 2,
                  textAlign: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 3,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  }
                }}
              >
                <SavingsIcon sx={{ fontSize: 40, color: 'white' }} />
                <Typography variant="body2" sx={{ color: 'white', mt: 1, fontWeight: 500 }}>
                  {t('hero.moneySaving')}
                </Typography>
              </Card>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
