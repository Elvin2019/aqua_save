import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
  onNavigate: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { key: 'home', label: t('nav.home') },
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'tips', label: t('nav.tips') },
    { key: 'calculator', label: t('nav.calculator') },
    { key: 'statistics', label: t('nav.statistics') },
    { key: 'contact', label: t('nav.contact') },
  ];

  const handleNavigation = (section: string) => {
    onNavigate(section);
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            key={item.key} 
            component="button"
            onClick={() => handleNavigation(item.key)}
            sx={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              }
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2 }}>
        <LanguageSelector />
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={2}
        sx={{
          top: 0,
          left: 0,
          right: 0,
          zIndex: theme.zIndex.appBar + 1000,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(25, 118, 210, 0.95)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(33, 150, 243, 0.1) 100%)',
            zIndex: -1,
          }
        }}
      >
        <Toolbar sx={{ px: { xs: 1, sm: 2, md: 3, lg: 4 }, minHeight: { xs: 56, sm: 64 } }}>
          <WaterDropIcon sx={{ mr: 2, color: 'white' }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              flexGrow: 1, 
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
            onClick={() => handleNavigation('home')}
          >
            AquaSave
          </Typography>
          
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.key}
                    color="inherit"
                    onClick={() => handleNavigation(item.key)}
                    sx={{ 
                      textTransform: 'none',
                      fontWeight: 500,
                      px: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
              <LanguageSelector />
            </Box>
          )}

          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
