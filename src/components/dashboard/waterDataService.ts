// Single data source that ensures all metrics relate to each other
export interface WaterUsageData {
  // Current day breakdown (hourly data)
  todayHourlyUsage: { hour: string; usage: number; time: Date }[];
  
  // Historical daily data for trends
  dailyHistory: { date: string; usage: number; dateObj: Date }[];
  
  // Current month metrics
  monthToDate: {
    totalUsage: number;
    daysElapsed: number;
    dailyAverage: number;
  };
  
  // Calculations and projections
  projections: {
    endOfMonthForecast: number;
    targetForMonth: number;
    comparedToLastMonth: number;
    savingsPercentage: number;
  };
  
  // Meter and simulation settings
  settings: {
    selectedMeter: string;
    isLeakDetected: boolean;
    isAggressiveSaving: boolean;
  };
}

export class WaterDataService {
  static generateUnifiedData(
    selectedMeter: string,
    isLeakSimulation: boolean,
    isAggressiveSaving: boolean,
    monthlyTarget: number = 3000
  ): WaterUsageData {
    
    // Base multipliers for different meters
    const getMeterMultiplier = () => {
      switch (selectedMeter) {
        case 'kitchen-meter': return 0.35;
        case 'bathroom-meter': return 0.55;
        default: return 1.0; // main-meter
      }
    };

    const meterMultiplier = getMeterMultiplier();
    
    // Generate today's hourly data (realistic consumption patterns)
    const generateTodayHourlyData = () => {
      const data = [];
      const today = new Date();
      
      for (let hour = 0; hour < 24; hour++) {
        const time = new Date(today);
        time.setHours(hour, 0, 0, 0);
        
        // Realistic hourly usage patterns
        let baseUsage = 2; // Night time base
        if (hour >= 6 && hour <= 9) baseUsage = 15; // Morning peak
        else if (hour >= 11 && hour <= 13) baseUsage = 8; // Lunch
        else if (hour >= 17 && hour <= 22) baseUsage = 12; // Evening peak
        else if (hour >= 10 && hour <= 16) baseUsage = 5; // Daytime
        
        // Apply modifiers
        let usage = baseUsage * meterMultiplier;
        if (isLeakSimulation) usage += Math.random() * 20 + 15; // Leak adds 15-35L/hour
        if (isAggressiveSaving) usage *= 0.75;
        
        // Add some natural variation
        usage += (Math.random() - 0.5) * 4;
        
        data.push({
          hour: time.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false 
          }),
          usage: Math.max(0, Math.round(usage * 10) / 10),
          time
        });
      }
      
      return data;
    };

    // Generate daily history (last 30 days)
    const generateDailyHistory = () => {
      const data = [];
      const today = new Date();
      
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        let baseUsage = isWeekend ? 140 : 110; // Higher weekend usage
        
        // Apply modifiers
        baseUsage *= meterMultiplier;
        if (isLeakSimulation && i <= 7) baseUsage += 80; // Leak last 7 days
        if (isAggressiveSaving && i <= 14) baseUsage *= 0.8; // Saving last 14 days
        
        // Add natural daily variation
        baseUsage += (Math.random() - 0.5) * 30;
        
        data.push({
          date: date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          }),
          usage: Math.max(20, Math.round(baseUsage)),
          dateObj: date
        });
      }
      
      return data;
    };

    const todayHourlyUsage = generateTodayHourlyData();
    const dailyHistory = generateDailyHistory();

    // Calculate month-to-date metrics
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyData = dailyHistory.filter(day => {
      const dayMonth = day.dateObj.getMonth();
      const dayYear = day.dateObj.getFullYear();
      return dayMonth === currentMonth && dayYear === currentYear;
    });

    const monthToDate = {
      totalUsage: monthlyData.reduce((sum, day) => sum + day.usage, 0),
      daysElapsed: monthlyData.length,
      dailyAverage: monthlyData.length > 0 
        ? monthlyData.reduce((sum, day) => sum + day.usage, 0) / monthlyData.length 
        : 0
    };

    // Add today's partial usage (only completed hours)
    const currentHour = new Date().getHours();
    const todayPartialUsage = todayHourlyUsage
      .slice(0, currentHour + 1)
      .reduce((sum, hour) => sum + hour.usage, 0);

    monthToDate.totalUsage += todayPartialUsage;

    // Calculate projections
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const remainingDays = daysInMonth - monthToDate.daysElapsed;
    
    const endOfMonthForecast = monthToDate.totalUsage + 
      (monthToDate.dailyAverage * remainingDays);

    // Last month comparison
    const lastMonthData = dailyHistory.filter(day => {
      const dayMonth = day.dateObj.getMonth();
      const dayYear = day.dateObj.getFullYear();
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      return dayMonth === lastMonth && dayYear === lastYear;
    });

    const lastMonthTotal = lastMonthData.reduce((sum, day) => sum + day.usage, 0);
    const savingsPercentage = lastMonthTotal > 0 
      ? ((lastMonthTotal - endOfMonthForecast) / lastMonthTotal) * 100 
      : 0;

    return {
      todayHourlyUsage,
      dailyHistory,
      monthToDate,
      projections: {
        endOfMonthForecast: Math.round(endOfMonthForecast),
        targetForMonth: Math.round(monthlyTarget * meterMultiplier),
        comparedToLastMonth: Math.round(lastMonthTotal),
        savingsPercentage: Math.round(savingsPercentage * 10) / 10
      },
      settings: {
        selectedMeter,
        isLeakDetected: isLeakSimulation,
        isAggressiveSaving
      }
    };
  }

  // Calculate today's total usage
  static getTodaysUsage(data: WaterUsageData): number {
    return Math.round(data.todayHourlyUsage.reduce((sum, hour) => sum + hour.usage, 0));
  }

  // Get progress percentage towards monthly goal
  static getMonthlyProgress(data: WaterUsageData): number {
    return (data.monthToDate.totalUsage / data.projections.targetForMonth) * 100;
  }
}
