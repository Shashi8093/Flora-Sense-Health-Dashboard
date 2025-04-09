
/**
 * Utility for processing health data from uploaded files
 */

/**
 * Process the health data from uploaded files
 * This is a mock implementation that simulates parsing and processing CSV and JSON files
 */
export const processHealthData = (files: File[]) => {
  // This would be implemented with actual file parsing in a real application
  // For now we'll return mock processed data
  
  const mockProcessedData = {
    heartRate: {
      average: 72,
      min: 58,
      max: 110,
      resting: 68,
      measurements: generateMockHeartRateData()
    },
    sleep: {
      averageDuration: 7.2,
      averageDeep: 2.1,
      averageLight: 4.3,
      averageREM: 1.4,
      efficiency: 87,
      data: generateMockSleepData()
    },
    activity: {
      averageSteps: 9240,
      totalSteps: 64680,
      averageActiveMinutes: 72,
      caloriesBurned: 2150,
      data: generateMockActivityData()
    },
    bloodPressure: {
      averageSystolic: 120,
      averageDiastolic: 78,
      data: generateMockBloodPressureData()
    }
  };
  
  // Log what files were processed
  console.log(`Processed ${files.length} files:`, files.map(f => f.name));
  
  return mockProcessedData;
};

// Helper functions to generate mock data
function generateMockHeartRateData() {
  const data = [];
  // Generate data for a full day, at 15-minute intervals
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      // Base heart rate between 60-75
      let baseHR = 60 + Math.floor(Math.random() * 15);
      
      // Adjust based on time of day
      if (hour < 6) baseHR -= 5; // Lower during early morning
      if (hour >= 8 && hour < 20) baseHR += 10; // Higher during day
      if (hour >= 17 && hour < 19) baseHR += 15; // Highest during evening exercise time
      
      // Add some randomness
      const heartRate = baseHR + Math.floor(Math.random() * 10) - 5;
      
      // Format time and add to data
      const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      data.push({
        time: timeStr,
        value: heartRate
      });
    }
  }
  return data;
}

function generateMockSleepData() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => {
    // Random sleep duration components
    const deep = 1.5 + Math.random();
    const light = 3.5 + Math.random();
    const rem = 1.0 + Math.random() * 0.8;
    
    return {
      date: day,
      deep: parseFloat(deep.toFixed(1)),
      light: parseFloat(light.toFixed(1)),
      rem: parseFloat(rem.toFixed(1)),
      total: parseFloat((deep + light + rem).toFixed(1))
    };
  });
}

function generateMockActivityData() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => {
    // Random activity data
    const steps = 5000 + Math.floor(Math.random() * 8000);
    const active = 30 + Math.floor(Math.random() * 60);
    
    return {
      date: day,
      steps: steps,
      active: active,
      calories: Math.floor(steps * 0.04) + Math.floor(active * 5)
    };
  });
}

function generateMockBloodPressureData() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => {
    // Random blood pressure readings around normal range
    const systolic = 115 + Math.floor(Math.random() * 10);
    const diastolic = 75 + Math.floor(Math.random() * 5);
    
    return {
      date: day,
      systolic: systolic,
      diastolic: diastolic,
      time: `${8 + Math.floor(Math.random() * 12)}:${Math.floor(Math.random() * 6)}${Math.floor(Math.random() * 10)}`
    };
  });
}
