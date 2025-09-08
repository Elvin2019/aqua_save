import { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { theme } from './theme/theme';
import './i18n/i18n';
import Header from './components/Header';
import Hero from './components/Hero';
import Landing from './components/Landing';
import WaterSavingTips from './components/WaterSavingTips';
import Calculator from './components/Calculator';
import Statistics from './components/Statistics';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const statisticsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const handleNavigation = (section: string) => {
    const refs = {
      home: heroRef,
      dashboard: dashboardRef,
      tips: tipsRef,
      calculator: calculatorRef,
      statistics: statisticsRef,
      contact: contactRef,
    };

    const targetRef = refs[section as keyof typeof refs];
    if (targetRef?.current) {
      const headerHeight = 64; // Height of the fixed header
      const targetPosition = targetRef.current.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Home page component
  const HomePage = () => (
    <Box 
      component="main" 
      sx={{ 
        flexGrow: 1,
        width: '100%',
        maxWidth: '100%',
        overflowX: 'hidden',
        margin: 0,
        padding: 0,
        paddingTop: { xs: '56px', sm: '64px' }, // Add top padding to account for fixed header
      }}
    >
      <div ref={heroRef}>
        <Hero />
      </div>
      <Landing />

      <div ref={dashboardRef}>
        <Dashboard />
      </div>
      <div ref={tipsRef}>
        <WaterSavingTips />
      </div>
      <div ref={calculatorRef}>
        <Calculator />
      </div>
      <div ref={statisticsRef}>
        <Statistics />
      </div>
      <div ref={contactRef}>
        <ContactForm />
      </div>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          width: '100%',
          maxWidth: '100%',
          overflow: 'hidden',
          margin: 0,
          padding: 0
        }}>
          <Header onNavigate={handleNavigation} />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
