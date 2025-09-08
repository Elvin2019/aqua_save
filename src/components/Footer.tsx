import React from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
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
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
          gap: 4,
          mb: 4
        }}>
          {/* Brand Section */}
          <Box sx={{ gridColumn: { xs: '1', md: '1 / 3' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <WaterDropIcon sx={{ mr: 2, fontSize: 32 }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                AquaSave
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9, lineHeight: 1.6 }}>
              {t('footer.description')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
                aria-label="Facebook"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
                aria-label="Twitter"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton 
                sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
                aria-label="Instagram"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              {t('footer.quickLinks')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['home', 'waterTips', 'calculator', 'statistics', 'aboutUs'].map((link) => (
                <Typography
                  key={link}
                  variant="body2"
                  sx={{
                    opacity: 0.9,
                    cursor: 'pointer',
                    '&:hover': { opacity: 1, textDecoration: 'underline' },
                  }}
                >
                  {t(`footer.links.${link}`)}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Resources */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              {t('footer.resources')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['conservationGuide', 'efficiencyPrograms', 'rebates', 'news', 'contactSupport'].map((resource) => (
                <Typography
                  key={resource}
                  variant="body2"
                  sx={{
                    opacity: 0.9,
                    cursor: 'pointer',
                    '&:hover': { opacity: 1, textDecoration: 'underline' },
                  }}
                >
                  {t(`footer.links.${resource}`)}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', mb: 3 }} />

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2
        }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {currentYear} {t('footer.copyright')}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3 }}>
            {['privacy', 'terms', 'cookies'].map((policy) => (
              <Typography
                key={policy}
                variant="body2"
                sx={{
                  opacity: 0.8,
                  cursor: 'pointer',
                  '&:hover': { opacity: 1, textDecoration: 'underline' },
                }}
              >
                {t(`footer.policies.${policy}`)}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Environmental Message */}
        <Box sx={{ textAlign: 'center', mt: 4, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Typography variant="body2" sx={{ opacity: 0.8, fontStyle: 'italic' }}>
            🌍 {t('footer.environmentalMessage')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
