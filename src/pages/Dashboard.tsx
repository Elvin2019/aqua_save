import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  Snackbar,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Import our custom components
import KPICards from '../components/KPICards';
import DashboardControls from '../components/DashboardControls';
import WaterUsageChart from '../components/WaterUsageChart';
import AlertsTable from '../components/AlertsTable';
import { waterUsageDataService } from '../components/dashboard/waterUsageDataService';

interface Alert {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  started_at: string;
  status: 'active' | 'acknowledged' | 'resolved';
}

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  
  // State management
  const [dateRange, setDateRange] = useState('7d');
  const [selectedMeter, setSelectedMeter] = useState('main-meter');
  const [isLeakSimulation, setIsLeakSimulation] = useState(false);
  const [isAggressiveSaving, setIsAggressiveSaving] = useState(false);
  const [showCriticalAlert, setShowCriticalAlert] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  // Generate unified data using the single data source
  const { chartData, metrics } = useMemo(() => {
    return waterUsageDataService.generateUsageData(
      selectedMeter,
      dateRange,
      isLeakSimulation,
      isAggressiveSaving
    );
  }, [selectedMeter, dateRange, isLeakSimulation, isAggressiveSaving]);

  // Mock alerts data - will be updated when language changes
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Initialize alerts with translations
  useEffect(() => {
    const initialAlerts: Alert[] = [
      {
        id: '1',
        type: t('dashboard.alerts.types.leak'),
        severity: 'high',
        message: t('dashboard.alerts.messages.unusualFlow'),
        started_at: '2025-09-07 14:30',
        status: 'active',
      },
      {
        id: '2',
        type: t('dashboard.alerts.types.usage'),
        severity: 'medium',
        message: t('dashboard.alerts.messages.monthlyApproaching'),
        started_at: '2025-09-07 09:15',
        status: 'active',
      },
      {
        id: '3',
        type: t('dashboard.alerts.types.maintenance'),
        severity: 'low',
        message: t('dashboard.alerts.messages.meterCalibration'),
        started_at: '2025-09-06 16:45',
        status: 'acknowledged',
      },
    ];
    
    // Only update if alerts are empty or if leak simulation is off
    if (!isLeakSimulation) {
      setAlerts(initialAlerts);
    } else {
      // Update existing alerts with new translations, but keep critical leak
      setAlerts(prev => {
        const criticalLeak = prev.find(alert => alert.id === 'critical-leak');
        if (criticalLeak) {
          return [criticalLeak, ...initialAlerts];
        }
        return initialAlerts;
      });
    }
  }, [t, isLeakSimulation]); // Re-run when translations or leak simulation changes

  // Handle leak simulation alerts
  useEffect(() => {
    if (isLeakSimulation) {
      const criticalAlert: Alert = {
        id: 'critical-leak',
        type: t('dashboard.alerts.types.criticalLeak'),
        severity: 'critical',
        message: t('dashboard.alerts.messages.majorLeak'),
        started_at: new Date().toISOString().slice(0, 16).replace('T', ' '),
        status: 'active',
      };
      
      setAlerts(prev => [criticalAlert, ...prev]);
      setShowCriticalAlert(true);
    } else {
      setAlerts(prev => prev.filter(alert => alert.id !== 'critical-leak'));
      setShowCriticalAlert(false);
    }
  }, [isLeakSimulation, t]);

  // Handle alert acknowledgment
  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === alertId ? { ...alert, status: 'acknowledged' as const } : alert
      )
    );
    setAlertDialogOpen(false);
    setSelectedAlert(null);
  };

  const handleAlertClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setAlertDialogOpen(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box 
        component="section"
        sx={{ 
          py: 8,
          bgcolor: 'grey.50',
          minHeight: '100vh'
        }}
      >
        <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
            {t('dashboard.title')}
          </Typography>

          {/* Controls Component */}
          <DashboardControls
            dateRange={dateRange}
            setDateRange={setDateRange}
            selectedMeter={selectedMeter}
            setSelectedMeter={setSelectedMeter}
            isLeakSimulation={isLeakSimulation}
            setIsLeakSimulation={setIsLeakSimulation}
            isAggressiveSaving={isAggressiveSaving}
            setIsAggressiveSaving={setIsAggressiveSaving}
          />
        </Box>

        {/* KPI Cards Component - Using unified data source */}
        <KPICards
          metrics={metrics}
          isAggressiveSaving={isAggressiveSaving}
        />

        {/* Single Chart Component - Using unified data source */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={12}>
            <WaterUsageChart
              dateRange={dateRange}
              selectedMeter={selectedMeter}
              isLeakSimulation={isLeakSimulation}
              chartData={chartData}
            />
          </Grid>
        </Grid>

        {/* Alerts Table Component */}
        <Grid container spacing={3}>
          <Grid size={12}>
            <AlertsTable
              alerts={alerts}
              onAlertClick={handleAlertClick}
            />
          </Grid>
        </Grid>

        {/* Alert Dialog */}
        <Dialog open={alertDialogOpen} onClose={() => setAlertDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{t('dashboard.alerts.details')}</DialogTitle>
          <DialogContent>
            {selectedAlert && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  {selectedAlert.type}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedAlert.message}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('dashboard.alerts.startedLabel')}: {selectedAlert.started_at}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('dashboard.alerts.severityLabel')}: {t(`dashboard.alerts.severities.${selectedAlert.severity}`)}
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAlertDialogOpen(false)}>
              {t('dashboard.alerts.close')}
            </Button>
            {selectedAlert?.status === 'active' && (
              <Button
                onClick={() => handleAcknowledgeAlert(selectedAlert.id)}
                variant="contained"
                color="primary"
              >
                {t('dashboard.alerts.acknowledge')}
              </Button>
            )}
          </DialogActions>
        </Dialog>

        {/* Critical Alert Snackbar */}
        <Snackbar
          open={showCriticalAlert}
          autoHideDuration={6000}
          onClose={() => setShowCriticalAlert(false)}
        >
          <Alert severity="error" onClose={() => setShowCriticalAlert(false)}>
            {t('dashboard.alerts.criticalLeak')}
          </Alert>
        </Snackbar>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};

export default Dashboard;
