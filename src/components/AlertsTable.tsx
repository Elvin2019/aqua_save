import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  IconButton,
} from '@mui/material';
import {
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';

interface Alert {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  started_at: string;
  status: 'active' | 'acknowledged' | 'resolved';
}

interface AlertsTableProps {
  alerts: Alert[];
  onAlertClick: (alert: Alert) => void;
}

const AlertsTable: React.FC<AlertsTableProps> = ({ alerts, onAlertClick }) => {
  const { t } = useTranslation();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'error';
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <WarningIcon sx={{ color: 'error.main' }} />;
      case 'medium':
        return <WarningIcon sx={{ color: 'warning.main' }} />;
      case 'low':
        return <CheckCircleIcon sx={{ color: 'info.main' }} />;
      default:
        return <CheckCircleIcon sx={{ color: 'success.main' }} />;
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          {t('dashboard.alerts.title')}
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('dashboard.alerts.type')}</TableCell>
                <TableCell>{t('dashboard.alerts.severity')}</TableCell>
                <TableCell>{t('dashboard.alerts.startedAt')}</TableCell>
                <TableCell>{t('dashboard.alerts.status')}</TableCell>
                <TableCell>{t('dashboard.alerts.actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getSeverityIcon(alert.severity)}
                      {alert.type}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={t(`dashboard.alerts.severities.${alert.severity}`)}
                      color={getSeverityColor(alert.severity) as 'error' | 'warning' | 'info' | 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{alert.started_at}</TableCell>
                  <TableCell>
                    <Chip
                      label={t(`dashboard.alerts.statuses.${alert.status}`)}
                      color={alert.status === 'active' ? 'error' : 'success'}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => onAlertClick(alert)}
                      color="primary"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default AlertsTable;
