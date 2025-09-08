/**
 * Water Usage Data Service
 * Single source of truth for all water usage data
 * All metrics are calculated from the same base data to ensure consistency
 */

export interface WaterUsageDataPoint {
  timestamp: Date;
  usage: number; // Liters
  category?: 'kitchen' | 'bathroom' | 'other' | 'leak';
}

export interface WaterUsageMetrics {
  todayUsage: number;
  monthlyUsage: number;
  monthlyForecast: number; // End of Month projection
  savingsPercentage: number;
  progressPercentage: number;
}

export interface ChartDataPoint {
  time: string;
  usage: number;
}

export class WaterUsageDataService {
  private baseConsumption = {
    main: 1500, // L/day (1000-2000L range)
    kitchen: 600, // L/day (40% of main)
    bathroom: 900, // L/day (60% of main)
  };

  /**
   * Generate water usage data based on parameters
   * This is our single source of truth
   */
  generateUsageData(
    selectedMeter: string,
    dateRange: string,
    isLeakSimulation: boolean,
    isAggressiveSaving: boolean
  ): {
    chartData: ChartDataPoint[];
    metrics: WaterUsageMetrics;
  } {
    const meterMultiplier = this.getMeterMultiplier(selectedMeter);
    const baseDaily = this.baseConsumption.main * meterMultiplier;
    
    // Generate chart data first
    const chartData = this.generateChartData(
      dateRange,
      baseDaily,
      isLeakSimulation,
      isAggressiveSaving
    );

    // Calculate metrics from the same base data
    const metrics = this.calculateMetrics(
      baseDaily,
      selectedMeter,
      isLeakSimulation,
      isAggressiveSaving
    );

    return { chartData, metrics };
  }

  private getMeterMultiplier(selectedMeter: string): number {
    switch (selectedMeter) {
      case 'kitchen-meter': return 0.4;
      case 'bathroom-meter': return 0.6;
      default: return 1.0;
    }
  }

  private generateChartData(
    dateRange: string,
    baseDailyUsage: number,
    isLeakSimulation: boolean,
    isAggressiveSaving: boolean
  ): ChartDataPoint[] {
    const data: ChartDataPoint[] = [];
    const now = new Date();

    if (dateRange === '24h') {
      // Hourly data for last 24 hours
      for (let i = 0; i < 24; i++) {
        const hour = new Date(now);
        hour.setHours(i, 0, 0, 0);
        
        // Realistic hourly patterns based on daily usage
        let hourlyUsage = this.getHourlyPattern(i, baseDailyUsage / 24);
        
        if (isLeakSimulation) hourlyUsage += Math.random() * 20 + 10; // 10-30L/hour leak (proportional)
        if (isAggressiveSaving) hourlyUsage *= 0.75;
        
        data.push({
          time: hour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          usage: Math.round(hourlyUsage * 10) / 10,
        });
      }
    } else if (dateRange === '7d') {
      // Daily data for last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        let dailyUsage = baseDailyUsage * (isWeekend ? 1.2 : 1.0); // 20% more on weekends
        
        if (isLeakSimulation) dailyUsage += 200; // 200L/day leak (proportional)
        if (isAggressiveSaving) dailyUsage *= 0.8;
        
        // Add some natural variation
        dailyUsage += (Math.random() - 0.5) * 100; // ±50L variation (proportional)
        
        data.push({
          time: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          usage: Math.round(dailyUsage),
        });
      }
    } else if (dateRange === '30d') {
      // Weekly data for last 4 weeks
      for (let i = 3; i >= 0; i--) {
        const startDate = new Date(now);
        startDate.setDate(startDate.getDate() - (i + 1) * 7);
        
        let weeklyUsage = baseDailyUsage * 7; // 7 days
        
        if (isLeakSimulation) weeklyUsage += 1400; // 1400L/week leak (200L/day * 7)
        if (isAggressiveSaving) weeklyUsage *= 0.82;
        
        // Add variation
        weeklyUsage += (Math.random() - 0.5) * 500; // ±250L variation (proportional)
        
        data.push({
          time: `Week ${4 - i}`,
          usage: Math.round(weeklyUsage),
        });
      }
    }

    return data;
  }

  private getHourlyPattern(hour: number, baseHourly: number): number {
    // Realistic hourly water usage patterns
    if (hour >= 6 && hour <= 9) return baseHourly * 3; // Morning peak
    if (hour >= 17 && hour <= 22) return baseHourly * 2; // Evening peak
    if (hour >= 10 && hour <= 16) return baseHourly * 1.2; // Day usage
    return baseHourly * 0.3; // Night usage
  }

  private calculateMetrics(
    baseDailyUsage: number,
    selectedMeter: string,
    isLeakSimulation: boolean,
    isAggressiveSaving: boolean
  ): WaterUsageMetrics {
    // Calculate consistent today's usage regardless of date range
    let todayUsage = baseDailyUsage;
    if (isLeakSimulation) todayUsage += 200; // 200L/day leak (proportional to higher usage)
    if (isAggressiveSaving) todayUsage *= 0.8; // 20% savings

    // Add realistic daily variation
    todayUsage += (Math.random() - 0.5) * 100; // ±50L variation (proportional to higher usage)

    // Get current date information for accurate monthly calculations
    const now = new Date();
    const currentDay = now.getDate();
    const daysInCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    // Monthly usage (actual usage from start of month to today)
    const monthlyUsage = todayUsage * currentDay;

    // Monthly forecast (End of Month projection based on current usage pattern)
    const dailyAverage = monthlyUsage / currentDay;
    const monthlyForecast = dailyAverage * daysInCurrentMonth;

    // Calculate savings percentage against baseline (without modifications)
    const baselineDaily = this.baseConsumption.main * this.getMeterMultiplier(selectedMeter);
    const baselineMonthly = baselineDaily * daysInCurrentMonth;
    
    // Savings = (baseline - projected) / baseline * 100
    const savingsPercentage = Math.round(
      ((baselineMonthly - monthlyForecast) / baselineMonthly) * 100
    );

    // Progress percentage against realistic target based on meter type
    const baseTarget = 45000; // Base monthly target for main meter (45,000L for 1500L/day)
    const meterMultiplier = this.getMeterMultiplier(selectedMeter);
    const monthlyTarget = baseTarget * meterMultiplier;
    const progressPercentage = (monthlyUsage / monthlyTarget) * 100;

    return {
      todayUsage: Math.round(todayUsage),
      monthlyUsage: Math.round(monthlyUsage),
      monthlyForecast: Math.round(monthlyForecast),
      savingsPercentage: Math.max(-50, Math.min(50, savingsPercentage)), // Cap between -50% and 50%
      progressPercentage: Math.round(progressPercentage),
    };
  }
}

export const waterUsageDataService = new WaterUsageDataService();
