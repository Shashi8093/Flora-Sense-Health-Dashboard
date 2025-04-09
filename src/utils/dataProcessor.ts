/**
 * Utility for processing health data from uploaded files
 */

/**
 * Process the health data from uploaded files
 * This simulates backend ML/AI processing on the frontend
 */
export const processHealthData = (files: File[]) => {
  // Simulate processing time for larger files
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  console.log(`Processing ${files.length} files with total size: ${formatSize(totalSize)}`);
  
  // Extract file metadata and types
  const fileTypes = files.map(file => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    return { name: file.name, type: extension, size: file.size };
  });
  
  // Generate personalized insights based on filename patterns
  const generatedInsights = generateInsightsFromFiles(files);
  
  // Create mock processed data with some randomization for demonstration
  const mockProcessedData = {
    heartRate: {
      average: 65 + Math.floor(Math.random() * 15),
      min: 50 + Math.floor(Math.random() * 10),
      max: 100 + Math.floor(Math.random() * 30),
      resting: 60 + Math.floor(Math.random() * 10),
      measurements: generateMockHeartRateData(),
      anomalies: detectHeartRateAnomalies()
    },
    sleep: {
      averageDuration: 6.5 + Math.random() * 1.5,
      averageDeep: 1.8 + Math.random() * 0.6,
      averageLight: 3.8 + Math.random() * 0.9,
      averageREM: 1.2 + Math.random() * 0.4,
      efficiency: 80 + Math.floor(Math.random() * 15),
      data: generateMockSleepData(),
      patterns: analyzeSleepPatterns()
    },
    activity: {
      averageSteps: 8000 + Math.floor(Math.random() * 3000),
      totalSteps: 56000 + Math.floor(Math.random() * 20000),
      averageActiveMinutes: 60 + Math.floor(Math.random() * 30),
      caloriesBurned: 1900 + Math.floor(Math.random() * 500),
      data: generateMockActivityData(),
      recommendations: generateActivityRecommendations()
    },
    bloodPressure: {
      averageSystolic: 115 + Math.floor(Math.random() * 15),
      averageDiastolic: 75 + Math.floor(Math.random() * 8),
      data: generateMockBloodPressureData(),
      risk: assessBloodPressureRisk()
    },
    insights: generatedInsights,
    metadata: {
      processingDate: new Date().toISOString(),
      fileInfo: fileTypes,
      dataPoints: 1240 + Math.floor(Math.random() * 800),
      confidenceScore: 85 + Math.floor(Math.random() * 10)
    }
  };
  
  // Store dynamic insights in localStorage for other components to use
  saveInsightsToLocalStorage(generatedInsights);
  
  // Log what files were processed
  console.log(`Processed ${files.length} files:`, files.map(f => f.name));
  
  return mockProcessedData;
};

function saveInsightsToLocalStorage(insights: any[]) {
  const dynamicInsights = insights.map((insight, index) => ({
    id: Date.now() + index,
    title: insight.title,
    description: insight.description,
    type: insight.severity || 'neutral',
    time: 'Just now'
  }));
  
  localStorage.setItem('dynamicInsights', JSON.stringify(dynamicInsights));
}

function generateInsightsFromFiles(files: File[]) {
  const insights = [];
  
  // Check file patterns and generate insights
  for (const file of files) {
    const fileName = file.name.toLowerCase();
    
    if (fileName.includes('sleep') || fileName.includes('slp')) {
      insights.push({
        title: 'Sleep Pattern Analysis',
        description: 'Your sleep data shows irregular sleep times. Try to maintain a consistent sleep schedule.',
        severity: Math.random() > 0.5 ? 'warning' : 'negative',
        confidence: 0.87
      });
    }
    
    if (fileName.includes('heart') || fileName.includes('hr') || fileName.includes('ecg')) {
      insights.push({
        title: 'Heart Rate Variability',
        description: 'Your heart rate variability shows good recovery patterns after exercise.',
        severity: 'positive',
        confidence: 0.92
      });
    }
    
    if (fileName.includes('step') || fileName.includes('activity')) {
      insights.push({
        title: 'Activity Level Assessment',
        description: 'Your activity levels are below recommended guidelines. Try to increase daily steps.',
        severity: Math.random() > 0.7 ? 'warning' : 'negative',
        confidence: 0.84
      });
    }
    
    if (fileName.includes('bp') || fileName.includes('blood')) {
      insights.push({
        title: 'Blood Pressure Analysis',
        description: 'Your blood pressure readings are within normal range with occasional spikes.',
        severity: Math.random() > 0.6 ? 'neutral' : 'positive',
        confidence: 0.89
      });
    }
  }
  
  // Add some general insights regardless of file names
  insights.push({
    title: 'Hydration Assessment',
    description: 'Based on your activity levels, you may need to increase your daily water intake.',
    severity: 'warning',
    confidence: 0.82
  });
  
  insights.push({
    title: 'Stress Level Estimation',
    description: 'Your physiological markers suggest moderate stress levels during weekdays.',
    severity: Math.random() > 0.5 ? 'warning' : 'neutral',
    confidence: 0.78
  });
  
  // Return a subset of insights to avoid overwhelming the user
  return insights.slice(0, 4 + Math.floor(Math.random() * 3));
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else return (bytes / 1048576).toFixed(1) + ' MB';
}

function detectHeartRateAnomalies() {
  return {
    highHeartRateEpisodes: Math.floor(Math.random() * 5),
    lowHeartRateEpisodes: Math.floor(Math.random() * 3),
    irregularRhythmDetected: Math.random() > 0.8,
    assessmentSummary: "Occasional elevated heart rate during rest periods detected. Monitor and consult healthcare provider if symptoms occur."
  };
}

function analyzeSleepPatterns() {
  return {
    sleepInterruptions: 1 + Math.floor(Math.random() * 3),
    averageBedtime: `${21 + Math.floor(Math.random() * 3)}:${Math.floor(Math.random() * 6)}${Math.floor(Math.random() * 10)}`,
    averageWakeTime: `${6 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 6)}${Math.floor(Math.random() * 10)}`,
    sleepQualityScore: 65 + Math.floor(Math.random() * 25),
    recommendation: "Your sleep cycle shows frequent interruptions. Consider limiting screen time 1 hour before bed."
  };
}

function generateActivityRecommendations() {
  const recommendations = [
    "Increase daily steps to 10,000+ for improved cardiovascular health",
    "Add 2-3 strength training sessions per week for muscle maintenance",
    "Consider more frequent short walks during work hours to reduce sedentary time",
    "Your weekend activity levels are significantly lower than weekdays"
  ];
  
  return {
    intensityDistribution: {
      sedentary: 50 + Math.floor(Math.random() * 20),
      light: 30 + Math.floor(Math.random() * 15),
      moderate: 10 + Math.floor(Math.random() * 10),
      vigorous: Math.floor(Math.random() * 5)
    },
    weekdayVsWeekend: {
      weekdayAvgSteps: 8500 + Math.floor(Math.random() * 2000),
      weekendAvgSteps: 6000 + Math.floor(Math.random() * 3000)
    },
    suggestions: recommendations.slice(0, 2 + Math.floor(Math.random() * 2))
  };
}

function assessBloodPressureRisk() {
  const riskLevel = Math.random();
  let risk = "low";
  let recommendation = "Continue maintaining healthy habits.";
  
  if (riskLevel > 0.8) {
    risk = "elevated";
    recommendation = "Consider dietary changes to reduce sodium intake.";
  } else if (riskLevel > 0.6) {
    risk = "moderate";
    recommendation = "Monitor regularly and consider lifestyle modifications.";
  }
  
  return {
    riskCategory: risk,
    variabilityScore: Math.floor(Math.random() * 100),
    recommendation: recommendation,
    followUpNeeded: riskLevel > 0.7
  };
}

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

// Function to generate a downloadable report in JSON format
export const generateDownloadableReport = (reportData: any, fileName: string) => {
  // Create a formatted report with metadata
  const report = {
    reportTitle: "FloraSense Health Analysis Report",
    generatedDate: new Date().toISOString(),
    sourceFile: fileName,
    data: reportData,
    disclaimer: "This report is generated for informational purposes only and should not be considered medical advice. Please consult with healthcare professionals for medical decisions."
  };
  
  // Convert to JSON string
  const jsonString = JSON.stringify(report, null, 2);
  
  // Create a blob with the data
  const blob = new Blob([jsonString], { type: 'application/json' });
  
  // Return an object URL for download
  return URL.createObjectURL(blob);
};

// Function to generate a PDF report
export const generatePdfReport = async (reportData: any, fileName: string) => {
  // In a real implementation, this would use a PDF generation library
  // For now, we'll return a simple blob with text content
  
  const content = `
FloraSense Health Analysis Report
================================
Generated: ${new Date().toLocaleString()}
Source File: ${fileName}

SUMMARY
-------
Heart Rate Average: ${reportData.heartRate.average} BPM
Sleep Duration: ${reportData.sleep.averageDuration.toFixed(1)} hours
Activity Level: ${reportData.activity.averageSteps} steps/day
Blood Pressure: ${reportData.bloodPressure.averageSystolic}/${reportData.bloodPressure.averageDiastolic} mmHg

KEY INSIGHTS
-----------
${reportData.insights.map((insight: any) => `• ${insight.title}: ${insight.description}`).join('\n')}

DISCLAIMER: This report is generated for informational purposes only and should not be considered medical advice.
`;
  
  // Create a blob with the text content
  const blob = new Blob([content], { type: 'text/plain' });
  
  // Return an object URL for download
  return URL.createObjectURL(blob);
};
