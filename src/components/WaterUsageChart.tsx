import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { ChartDataPoint } from './dashboard/waterUsageDataService';

interface WaterUsageChartProps {
  dateRange: string;
  selectedMeter: string;
  isLeakSimulation: boolean;
  chartData: ChartDataPoint[];
}

const WaterUsageChart: React.FC<WaterUsageChartProps> = ({
  dateRange,
  selectedMeter,
  isLeakSimulation,
  chartData,
}) => {
  const { t } = useTranslation();

  const getChartTitle = () => {
    const meterName = selectedMeter === 'main-meter' ? t('dashboard.meters.main') : 
                     selectedMeter === 'kitchen-meter' ? t('dashboard.meters.kitchen') : 
                     t('dashboard.meters.bathroom');
    
    const timeFrame = dateRange === '24h' ? t('dashboard.chart.title.hourly') :
                     dateRange === '7d' ? t('dashboard.chart.title.daily') :
                     t('dashboard.chart.title.weekly');
    
    return `${timeFrame} - ${meterName}`;
  };

  const getYAxisLabel = () => {
    return dateRange === '24h' ? t('dashboard.chart.yAxis.hourly') :
           dateRange === '7d' ? t('dashboard.chart.yAxis.daily') :
           t('dashboard.chart.yAxis.weekly');
  };

  const getTooltipLabel = () => {
    return dateRange === '24h' ? t('dashboard.chart.tooltip.time') :
           dateRange === '7d' ? t('dashboard.chart.tooltip.date') :
           t('dashboard.chart.tooltip.period');
  };

  const getChartType = () => {
    if (dateRange === '24h') {
      return (
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis label={{ value: getYAxisLabel(), angle: -90, position: 'insideLeft' }} />
          <Tooltip 
            formatter={(value: number) => [`${value} L`, t('dashboard.chart.tooltip.usage')]}
            labelFormatter={(label) => `${getTooltipLabel()}: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="usage"
            stroke={isLeakSimulation ? "#f44336" : "#1976d2"}
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      );
    } else if (dateRange === '7d') {
      return (
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis label={{ value: getYAxisLabel(), angle: -90, position: 'insideLeft' }} />
          <Tooltip 
            formatter={(value: number) => [`${value} L`, t('dashboard.chart.tooltip.usage')]}
            labelFormatter={(label) => `${getTooltipLabel()}: ${label}`}
          />
          <Area
            type="monotone"
            dataKey="usage"
            stroke={isLeakSimulation ? "#f44336" : "#2e7d32"}
            fill={isLeakSimulation ? "rgba(244, 67, 54, 0.3)" : "rgba(46, 125, 50, 0.3)"}
            strokeWidth={2}
          />
        </AreaChart>
      );
    } else {
      return (
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis label={{ value: getYAxisLabel(), angle: -90, position: 'insideLeft' }} />
          <Tooltip 
            formatter={(value: number) => [`${value} L`, t('dashboard.chart.tooltip.usage')]}
            labelFormatter={(label) => `${getTooltipLabel()}: ${label}`}
          />
          <Bar 
            dataKey="usage" 
            fill={isLeakSimulation ? "#f44336" : "#1976d2"} 
          />
        </BarChart>
      );
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          {getChartTitle()}
        </Typography>
        <Box sx={{ width: '100%', height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            {getChartType()}
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WaterUsageChart;
