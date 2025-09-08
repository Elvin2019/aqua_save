import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Paper,
  Chip,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  WaterDrop as WaterDropIcon,
  Insights as InsightsIcon,
  NotificationsActive as NotificationsIcon,
  TrendingUp as TrendingUpIcon,
  Router as RouterIcon,
  Cloud as CloudIcon,
  Dashboard as DashboardIcon,
  Warning as WarningIcon,
  Speed as SpeedIcon,
  AccountBalance as GovIcon,
  Psychology as PsychologyIcon,
  Timeline as TimelineIcon,
  TipsAndUpdates as TipsIcon,
  Water as WaterIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

// Mock data for the device mockup panels
const mockChartData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  usage: Math.random() * 10 + 2,
}));

const devicePanels = [
  {
    id: 'chart',
    title: 'Daily Usage (24h)',
    content: (
      <Box sx={{ p: 2, height: '100%' }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Water Flow Rate (L/min)
        </Typography>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={mockChartData}>
            <XAxis dataKey="time" hide />
            <YAxis hide />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="usage" 
              stroke="#1976d2" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    ),
  },
  {
    id: 'alert',
    title: 'Leak Alert',
    content: (
      <Box sx={{ p: 2, height: '100%', bgcolor: 'error.light', borderRadius: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <WarningIcon sx={{ color: 'error.main' }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Leak Detected
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Persistent low flow detected - likely leak in bathroom area
        </Typography>
        <Chip label="High Priority" color="error" size="small" />
      </Box>
    ),
  },
  {
    id: 'nudge',
    title: 'Water Saving Nudge',
    content: (
      <Box sx={{ p: 2, height: '100%', bgcolor: 'success.light', borderRadius: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'success.dark' }}>
          💡 Save Water Tip
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Reduce shower time by 1 minute
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          Estimated impact: 45L saved per week
        </Typography>
        <Chip label="15% Monthly Savings" color="success" size="small" />
      </Box>
    ),
  },
];

const Landing: React.FC = () => {
  const { t } = useTranslation();
  const [currentPanel, setCurrentPanel] = useState(0);
  const [counters, setCounters] = useState({
    reduction: 0,
    saved: 0,
    detection: 0,
  });

  // Device panels with translations
  const devicePanels = [
    {
      id: 'chart',
      title: t('landing.deviceMockup.dailyUsage'),
      content: (
        <Box sx={{ p: 2, height: '100%' }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            {t('landing.deviceMockup.waterFlowRate')}
          </Typography>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={mockChartData}>
              <XAxis dataKey="time" hide />
              <YAxis hide />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="usage" 
                stroke="#1976d2" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      ),
    },
    {
      id: 'alert',
      title: t('landing.deviceMockup.leakDetected'),
      content: (
        <Box sx={{ p: 2, height: '100%', bgcolor: 'error.light', borderRadius: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <WarningIcon sx={{ color: 'error.main' }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {t('landing.deviceMockup.leakDetected')}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {t('landing.deviceMockup.leakMessage')}
          </Typography>
          <Chip label={t('landing.deviceMockup.highPriority')} color="error" size="small" />
        </Box>
      ),
    },
    {
      id: 'nudge',
      title: t('landing.deviceMockup.savingTip'),
      content: (
        <Box sx={{ p: 2, height: '100%', bgcolor: 'success.light', borderRadius: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'success.dark' }}>
            {t('landing.deviceMockup.savingTip')}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {t('landing.deviceMockup.reduceBehavior')}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
            {t('landing.deviceMockup.estimatedImpact')}
          </Typography>
          <Chip label={t('landing.deviceMockup.monthlySavings')} color="success" size="small" />
        </Box>
      ),
    },
  ];

  // Auto-cycle through device mockup panels
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPanel((prev) => (prev + 1) % devicePanels.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [devicePanels.length]);

  // Animated counters
  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      const targets = { reduction: 6, saved: 300, detection: 24 };
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setCounters({
          reduction: Math.round(targets.reduction * progress),
          saved: Math.round(targets.saved * progress),
          detection: Math.round(targets.detection * progress),
        });
        
        if (step >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    };

    // Start animation after component mounts
    const timeout = setTimeout(animateCounters, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const benefits = [
    {
      icon: <WaterDropIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: t('landing.benefits.realTimeMonitoring.title'),
      description: t('landing.benefits.realTimeMonitoring.description'),
    },
    {
      icon: <InsightsIcon sx={{ fontSize: 48, color: 'secondary.main' }} />,
      title: t('landing.benefits.aiDetection.title'),
      description: t('landing.benefits.aiDetection.description'),
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 48, color: 'success.main' }} />,
      title: t('landing.benefits.forecasts.title'),
      description: t('landing.benefits.forecasts.description'),
    },
    {
      icon: <NotificationsIcon sx={{ fontSize: 48, color: 'warning.main' }} />,
      title: t('landing.benefits.notifications.title'),
      description: t('landing.benefits.notifications.description'),
    },
  ];

  const steps = [
    {
      icon: <RouterIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: t('landing.howItWorks.meterNetwork.title'),
      description: t('landing.howItWorks.meterNetwork.description'),
    },
    {
      icon: <CloudIcon sx={{ fontSize: 40, color: 'info.main' }} />,
      title: t('landing.howItWorks.cloudProcessing.title'),
      description: t('landing.howItWorks.cloudProcessing.description'),
    },
    {
      icon: <DashboardIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      title: t('landing.howItWorks.myGovIntegration.title'),
      description: t('landing.howItWorks.myGovIntegration.description'),
    },
  ];

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDashboard = () => {
    const element = document.querySelector('[ref="dashboardRef"]') || 
                   document.getElementById('dashboard') ||
                   document.querySelector('section'); // fallback to first section
    if (element) {
      const headerHeight = 64;
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 700,
                    mb: 3,
                    lineHeight: 1.2,
                  }}
                >
                  {t('landing.hero.title')}
                </Typography>
                
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '2rem', md: '2.75rem' },
                    fontWeight: 800,
                    mb: 4,
                    lineHeight: 1.1,
                    background: 'linear-gradient(45deg, #4caf50 30%, #81c784 90%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: 0,
                      width: '100%',
                      height: 3,
                      background: 'linear-gradient(90deg, #4caf50, #81c784)',
                      borderRadius: 2,
                      opacity: 0.7,
                    }
                  }}
                >
                  {t('landing.hero.titleHighlight')}
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    opacity: 0.9,
                    lineHeight: 1.6,
                    fontWeight: 400,
                  }}
                >
                  {t('landing.hero.subtitle')}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={scrollToDashboard}
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      '&:hover': {
                        bgcolor: 'grey.100',
                      },
                      px: 3,
                      py: 1.5,
                      fontSize: '1.1rem',
                    }}
                  >
                    {t('landing.hero.openDashboard')}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={scrollToHowItWorks}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                      },
                      px: 3,
                      py: 1.5,
                      fontSize: '1.1rem',
                    }}
                  >
                    {t('landing.hero.howItWorks')}
                  </Button>
                </Box>
              </motion.div>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  {/* Device Mockup */}
                  <Box
                    sx={{
                      width: 300,
                      height: 600,
                      borderRadius: 6,
                      bgcolor: 'white',
                      p: 2,
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                      position: 'relative',
                    }}
                  >
                    {/* Phone Frame */}
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 4,
                        bgcolor: '#f8fafc',
                        border: '8px solid #334155',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {/* myGov Header */}
                      <Box
                        sx={{
                          bgcolor: 'primary.main',
                          color: 'white',
                          p: 2,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <GovIcon />
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          myGov Azerbaijan
                        </Typography>
                      </Box>

                      {/* Animated Content Panels */}
                      <Box sx={{ height: 'calc(100% - 80px)', position: 'relative' }}>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentPanel}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            style={{ height: '100%' }}
                          >
                            {devicePanels[currentPanel].content}
                          </motion.div>
                        </AnimatePresence>
                      </Box>

                      {/* Panel Indicators */}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 20,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          display: 'flex',
                          gap: 1,
                        }}
                      >
                        {devicePanels.map((_, index) => (
                          <Box
                            key={index}
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              bgcolor: index === currentPanel ? 'primary.main' : 'grey.300',
                              transition: 'background-color 0.3s ease',
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Core Benefits Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            {t('landing.benefits.title')}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              mb: 6,
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            {t('landing.benefits.subtitle')}
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {benefits.map((benefit, index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ mb: 3 }}>{benefit.icon}</Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {benefit.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box id="how-it-works" sx={{ bgcolor: 'grey.50', py: 10 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                mb: 8,
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              {t('landing.howItWorks.title')}
            </Typography>
          </motion.div>

          <Grid container spacing={6} justifyContent="center">
            {steps.map((step, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Paper
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        boxShadow: 3,
                      }}
                    >
                      {step.icon}
                    </Paper>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {step.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* AI Explainer Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            {t('landing.ai.title')}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              mb: 8,
              color: 'text.secondary',
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            {t('landing.ai.subtitle')}
          </Typography>
        </motion.div>

        {/* Animated AI Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 8,
              flexWrap: 'wrap',
              gap: { xs: 2, md: 4 },
            }}
          >
            {/* Meter */}
            <Box sx={{ textAlign: 'center' }}>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Paper
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    bgcolor: 'primary.main',
                    color: 'white',
                    boxShadow: 3,
                  }}
                >
                  <RouterIcon sx={{ fontSize: 40 }} />
                </Paper>
              </motion.div>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {t('landing.ai.diagram.meter')}
              </Typography>
            </Box>

            {/* Arrow 1 */}
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowForwardIcon sx={{ fontSize: 30, color: 'primary.main' }} />
            </motion.div>

            {/* Cloud */}
            <Box sx={{ textAlign: 'center' }}>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Paper
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    bgcolor: 'info.main',
                    color: 'white',
                    boxShadow: 3,
                  }}
                >
                  <CloudIcon sx={{ fontSize: 40 }} />
                </Paper>
              </motion.div>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {t('landing.ai.diagram.cloud')}
              </Typography>
            </Box>

            {/* Arrow 2 */}
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            >
              <ArrowForwardIcon sx={{ fontSize: 30, color: 'info.main' }} />
            </motion.div>

            {/* AI Engine */}
            <Box sx={{ textAlign: 'center' }}>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Paper
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    bgcolor: 'secondary.main',
                    color: 'white',
                    boxShadow: 3,
                  }}
                >
                  <PsychologyIcon sx={{ fontSize: 40 }} />
                </Paper>
              </motion.div>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {t('landing.ai.diagram.aiEngine')}
              </Typography>
            </Box>

            {/* Arrow 3 */}
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            >
              <ArrowForwardIcon sx={{ fontSize: 30, color: 'secondary.main' }} />
            </motion.div>

            {/* myGov */}
            <Box sx={{ textAlign: 'center' }}>
              <motion.div
                   animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Paper
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    bgcolor: 'success.main',
                    color: 'white',
                    boxShadow: 3,
                  }}
                >
                  <GovIcon sx={{ fontSize: 40 }} />
                </Paper>
              </motion.div>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {t('landing.ai.diagram.myGov')}
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* AI Cards */}
        <Grid container spacing={4}>
          {/* Leak Detection Card */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                  background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
                  border: '2px solid transparent',
                  '&:hover': {
                    borderColor: 'error.main',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <WaterIcon sx={{ fontSize: 32, color: 'error.main', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {t('landing.ai.cards.leakDetection.title')}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                    {t('landing.ai.cards.leakDetection.description')}
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: 'error.main',
                      color: 'white',
                      p: 2,
                      borderRadius: 2,
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {t('landing.ai.cards.leakDetection.detail')}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Usage Prediction Card */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                  background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                  border: '2px solid transparent',
                  '&:hover': {
                    borderColor: 'info.main',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TimelineIcon sx={{ fontSize: 32, color: 'info.main', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {t('landing.ai.cards.usagePrediction.title')}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                    {t('landing.ai.cards.usagePrediction.description')}
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: 'info.main',
                      color: 'white',
                      p: 2,
                      borderRadius: 2,
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {t('landing.ai.cards.usagePrediction.detail')}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Forecasting Card */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                  background: 'linear-gradient(135deg, #fff3e0 0%, #ffcc02 100%)',
                  border: '2px solid transparent',
                  '&:hover': {
                    borderColor: 'warning.main',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TrendingUpIcon sx={{ fontSize: 32, color: 'warning.main', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {t('landing.ai.cards.forecasting.title')}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                    {t('landing.ai.cards.forecasting.description')}
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: 'warning.main',
                      color: 'white',
                      p: 2,
                      borderRadius: 2,
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {t('landing.ai.cards.forecasting.detail')}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Nudges Card */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                  background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
                  border: '2px solid transparent',
                  '&:hover': {
                    borderColor: 'success.main',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TipsIcon sx={{ fontSize: 32, color: 'success.main', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {t('landing.ai.cards.nudges.title')}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                    {t('landing.ai.cards.nudges.description')}
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: 'success.main',
                      color: 'white',
                      p: 2,
                      borderRadius: 2,
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {t('landing.ai.cards.nudges.detail')}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Proof of Usefulness Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            {t('landing.proof.title')}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              mb: 8,
              color: 'text.secondary',
            }}
          >
            {t('landing.proof.subtitle')}
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card sx={{ textAlign: 'center', p: 4 }}>
                <SpeedIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  {counters.reduction}%
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {t('landing.proof.reduction.description')}
                </Typography>
              </Card>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card sx={{ textAlign: 'center', p: 4 }}>
                <WaterDropIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                  {counters.saved}+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {t('landing.proof.saved.description')}
                </Typography>
              </Card>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card sx={{ textAlign: 'center', p: 4 }}>
                <InsightsIcon sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                  {counters.detection}h
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {t('landing.proof.detection.description')}
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Developer Callout */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Paper
            sx={{
              mt: 6,
              p: 4,
              bgcolor: 'grey.900',
              color: 'white',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: 'success.light' }}>
              {t('landing.proof.developer.title')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'grey.300' }}>
              {t('landing.proof.developer.subtitle')}
            </Typography>
            <Box
              component="pre"
              sx={{
                bgcolor: 'grey.800',
                p: 2,
                borderRadius: 1,
                overflow: 'auto',
                fontSize: '0.85rem',
                fontFamily: 'monospace',
              }}
            >
{`{
  "meter_id": "AZ-BAKU-001234",
  "timestamp": "2025-09-07T23:45:00Z",
  "flow_rate": 2.3,
  "daily_total": 127.5,
  "ai_confidence": 0.95,
  "alerts": [
    {
      "type": "conservation_nudge",
      "message": "Peak usage detected",
      "action": "reduce_shower_time"
    }
  ]
}`}
            </Box>
          </Paper>
        </motion.div> */}
      </Container>
    </Box>
  );
};

export default Landing;
