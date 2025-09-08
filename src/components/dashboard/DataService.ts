// Unified data source for the dashboard
// All metrics are calculated from the same base data to ensure consistency

export interface WaterUsageData {
  hourlyData: HourlyUsagePoint[];
  dailyData: DailyUsagePoint[];
  weeklyData: WeeklyUsagePoint[];
  currentMonth: MonthlyMetrics;
  alerts: Alert[];
}

export interface HourlyUsagePoint {
  hour: string;
  usage: number; // Liters per hour
  timestamp: Date;
}

export interface DailyUsagePoint {
  date: string;
  usage: number; // Liters per day
  target: number; // Daily target
  timestamp: Date;
}

export interface WeeklyUsagePoint {
  week: string;
  usage: number; // Liters per week
  timestamp: Date;
}

export interface MonthlyMetrics {
  currentUsage: number; // Total liters used this month so far
  daysElapsed: number; // Days into the current month
  dailyAverage: number; // Average daily usage this month
  projectedTotal: number; // Forecast (End of Month) - projected total for full month
  target: number; // Monthly target
  lastMonthTotal: number; // Last month's total for comparison
  savingsVsLastMonth: number; // Percentage savings vs last month
}

export interface Alert {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  started_at: string;
  status: 'active' | 'acknowledged' | 'resolved';
}

export interface DashboardSettings {
  selectedMeter: 'main-meter' | 'kitchen-meter' | 'bathroom-meter';
  dateRange: '24h' | '7d' | '30d';
  isLeakSimulation: boolean;
  isAggressiveSaving: boolean;
}

// Unified data generator that ensures all metrics are related
export class WaterDataService {
  private static getMeterMultiplier(meter: string): number {
    switch (meter) {
      case 'kitchen-meter': return 0.35; // Kitchen uses ~35% of total water
      case 'bathroom-meter': return 0.45; // Bathroom uses ~45% of total water
      default: return 1.0; // Main meter shows 100%
    }
  }

  private static getBaseUsagePattern(): { hourlyBase: number[], dailyBase: number } {
    // Realistic daily usage pattern (24 hours)
    const hourlyBase = [
      1, 1, 1, 1, 1, 2,     // 00:00-05:00 (night)
      5, 8, 12, 10, 6, 4,   // 06:00-11:00 (morning peak)
      4, 3, 3, 4, 5, 6,     // 12:00-17:00 (day usage)
      8, 10, 8, 6, 4, 2     // 18:00-23:00 (evening peak)
    ];
    
    const dailyBase = hourlyBase.reduce((sum, hour) => sum + hour, 0); // ~120L/day base
    
    return { hourlyBase, dailyBase };
  }

  static generateData(settings: DashboardSettings): WaterUsageData {
    const { selectedMeter, isLeakSimulation, isAggressiveSaving } = settings;
    const meterMultiplier = this.getMeterMultiplier(selectedMeter);
    const { hourlyBase, dailyBase } = this.getBaseUsagePattern();
    
    // Apply modifiers
    const leakMultiplier = isLeakSimulation ? 1.6 : 1.0; // Leak adds 60% more usage
    const savingMultiplier = isAggressiveSaving ? 0.75 : 1.0; // Aggressive saving reduces 25%
    
    const baseDailyUsage = dailyBase * meterMultiplier * leakMultiplier * savingMultiplier;
    
    // Generate hourly data (last 24 hours)
    const hourlyData: HourlyUsagePoint[] = [];
    const now = new Date();
    
    for (let i = 0; i < 24; i++) {
      const hour = new Date(now);
      hour.setHours(now.getHours() - (23 - i), 0, 0, 0);
      
      const baseHourlyUsage = hourlyBase[i] * meterMultiplier * leakMultiplier * savingMultiplier;
      const usage = Math.max(0, baseHourlyUsage + (Math.random() - 0.5) * 2); // Add small variance
      
      hourlyData.push({
        hour: hour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        usage: Math.round(usage * 10) / 10,
        timestamp: hour,
      });
    }
    
    // Generate daily data (last 7 days)
    const dailyData: DailyUsagePoint[] = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const weekendMultiplier = isWeekend ? 1.2 : 1.0; // 20% more usage on weekends
      
      const dailyUsage = baseDailyUsage * weekendMultiplier + (Math.random() - 0.5) * 20;
      const target = dailyBase * meterMultiplier * 0.85; // Target is 85% of base usage
      
      dailyData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        usage: Math.round(Math.max(0, dailyUsage)),
        target: Math.round(target),
        timestamp: date,
      });
    }
    
    // Generate weekly data (last 4 weeks)
    const weeklyData: WeeklyUsagePoint[] = [];
    
    for (let i = 3; i >= 0; i--) {
      const weekStart = new Date(today);
      weekStart.setDate(weekStart.getDate() - (i + 1) * 7);
      
      const weeklyUsage = baseDailyUsage * 7 + (Math.random() - 0.5) * 100;
      
      weeklyData.push({
        week: `Week ${4 - i}`,
        usage: Math.round(Math.max(0, weeklyUsage)),
        timestamp: weekStart,
      });
    }
    
    // Calculate monthly metrics (all related to the same base data)
    const daysElapsed = today.getDate();
    const currentUsage = Math.round(baseDailyUsage * daysElapsed);
    const dailyAverage = Math.round(currentUsage / daysElapsed);
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const projectedTotal = Math.round(dailyAverage * daysInMonth); // This is the "Forecast (EOM)"
    const target = Math.round(dailyBase * meterMultiplier * 0.85 * daysInMonth);
    const lastMonthTotal = Math.round(baseDailyUsage * 30 / savingMultiplier); // Without current savings
    const savingsVsLastMonth = Math.round(((lastMonthTotal - projectedTotal) / lastMonthTotal) * 100);
    
    const currentMonth: MonthlyMetrics = {
      currentUsage,
      daysElapsed,
      dailyAverage,
      projectedTotal,
      target,
      lastMonthTotal,
      savingsVsLastMonth: Math.max(0, savingsVsLastMonth),
    };
    
    // Generate alerts
    const alerts: Alert[] = [];
    
    if (isLeakSimulation) {
      alerts.push({
        id: 'critical-leak',
        type: 'Critical Leak',
        severity: 'critical',
        message: 'Major leak detected - immediate action required',
        started_at: new Date().toISOString().slice(0, 16).replace('T', ' '),
        status: 'active',
      });
    }
    
    alerts.push(
      {
        id: '1',
        type: 'Usage Monitoring',
        severity: projectedTotal > target ? 'medium' : 'low',
        message: projectedTotal > target 
          ? 'Monthly usage may exceed target - consider water-saving measures'
          : 'Water usage is within target range',
        started_at: '2025-09-07 09:15',
        status: 'active',
      },
      {
        id: '2',
        type: 'Maintenance',
        severity: 'low',
        message: 'Meter calibration due next week',
        started_at: '2025-09-06 16:45',
        status: 'acknowledged',
      }
    );
    
    return {
      hourlyData,
      dailyData,
      weeklyData,
      currentMonth,
      alerts,
    };
  }
}
