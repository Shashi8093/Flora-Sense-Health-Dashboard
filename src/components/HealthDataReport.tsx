
import React from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Brain, Heart, Activity, Clock, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface HealthDataReportProps {
  reportData: any;
  fileName: string;
  uploadDate: string;
}

const HealthDataReport: React.FC<HealthDataReportProps> = ({ reportData, fileName, uploadDate }) => {
  const formattedDate = new Date(uploadDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // AI Analysis section - extract insights from the data
  const generateInsights = (data: any) => {
    const insights = [];
    
    // Heart rate insights
    if (data.heartRate) {
      const { average, min, max, resting } = data.heartRate;
      
      if (average > 80) {
        insights.push({
          title: 'Elevated Heart Rate',
          description: `Your average heart rate of ${average} BPM is above the typical resting range. Consider regular cardiovascular exercise and stress management.`,
          type: 'warning',
          icon: <Heart className="h-5 w-5 text-red-500" />
        });
      } else if (average < 60) {
        insights.push({
          title: 'Low Heart Rate',
          description: `Your average heart rate of ${average} BPM is below typical. This could indicate good cardiovascular fitness or potentially require medical attention.`,
          type: 'info',
          icon: <Heart className="h-5 w-5 text-blue-500" />
        });
      } else {
        insights.push({
          title: 'Healthy Heart Rate',
          description: `Your average heart rate of ${average} BPM is within the healthy range.`,
          type: 'positive',
          icon: <Heart className="h-5 w-5 text-green-500" />
        });
      }
    }
    
    // Sleep insights
    if (data.sleep) {
      const { averageDuration, efficiency } = data.sleep;
      
      if (averageDuration < 7) {
        insights.push({
          title: 'Insufficient Sleep',
          description: `Your average sleep duration of ${averageDuration} hours is below the recommended 7-9 hours for adults. Consider adjusting your sleep schedule.`,
          type: 'warning',
          icon: <Brain className="h-5 w-5 text-orange-500" />
        });
      } else {
        insights.push({
          title: 'Healthy Sleep Duration',
          description: `Your average sleep duration of ${averageDuration} hours meets the recommended guidelines for adults.`,
          type: 'positive',
          icon: <Brain className="h-5 w-5 text-green-500" />
        });
      }
      
      if (efficiency < 85) {
        insights.push({
          title: 'Sleep Efficiency Concerns',
          description: `Your sleep efficiency of ${efficiency}% is below optimal. Consider limiting screen time before bed and maintaining a consistent sleep schedule.`,
          type: 'warning',
          icon: <Brain className="h-5 w-5 text-orange-500" />
        });
      }
    }
    
    // Activity insights
    if (data.activity) {
      const { averageSteps, averageActiveMinutes } = data.activity;
      
      if (averageSteps < 7500) {
        insights.push({
          title: 'Increase Daily Steps',
          description: `Your average of ${averageSteps} steps per day is below the recommended 10,000 steps. Try to incorporate more walking into your daily routine.`,
          type: 'warning',
          icon: <Activity className="h-5 w-5 text-orange-500" />
        });
      } else {
        insights.push({
          title: 'Good Activity Level',
          description: `Your average of ${averageSteps} steps per day shows you're maintaining an active lifestyle.`,
          type: 'positive',
          icon: <Activity className="h-5 w-5 text-green-500" />
        });
      }
      
      if (averageActiveMinutes < 30) {
        insights.push({
          title: 'Increase Active Minutes',
          description: `Your average of ${averageActiveMinutes} active minutes per day is below the recommended 30 minutes of moderate activity.`,
          type: 'warning',
          icon: <Activity className="h-5 w-5 text-orange-500" />
        });
      }
    }
    
    // Blood pressure insights
    if (data.bloodPressure) {
      const { averageSystolic, averageDiastolic } = data.bloodPressure;
      
      if (averageSystolic > 130 || averageDiastolic > 80) {
        insights.push({
          title: 'Elevated Blood Pressure',
          description: `Your average blood pressure of ${averageSystolic}/${averageDiastolic} mmHg is above the normal range. Consider diet modifications and regular exercise.`,
          type: 'warning',
          icon: <AlertTriangle className="h-5 w-5 text-red-500" />
        });
      } else {
        insights.push({
          title: 'Healthy Blood Pressure',
          description: `Your average blood pressure of ${averageSystolic}/${averageDiastolic} mmHg is within the normal range.`,
          type: 'positive',
          icon: <TrendingUp className="h-5 w-5 text-green-500" />
        });
      }
    }
    
    return insights;
  };

  const insights = generateInsights(reportData);

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Health Data Report</h2>
            <div className="flex items-center mt-1">
              <div className="flex items-center mr-4">
                <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                <span className="text-sm text-gray-500">{formattedDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gray-400 mr-1" />
                <span className="text-sm text-gray-500">File: {fileName}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-indigo-100 p-2 rounded-full">
              <Brain className="h-5 w-5 text-indigo-600" />
            </div>
            <span className="ml-2 text-sm font-medium text-indigo-600">AI Analysis</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="heart">Heart Rate</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="bp">Blood Pressure</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-indigo-600" />
                  AI Health Insights
                </CardTitle>
                <CardDescription>
                  Personalized analysis based on your uploaded data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {insights.map((insight, index) => (
                    <div key={index} className={`p-4 rounded-lg ${
                      insight.type === 'positive' ? 'bg-green-50' :
                      insight.type === 'warning' ? 'bg-orange-50' :
                      'bg-blue-50'
                    }`}>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          {insight.icon}
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium">{insight.title}</h3>
                          <p className="mt-1 text-sm text-gray-600">{insight.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Metrics Summary</CardTitle>
                <CardDescription>
                  Overview of your key health indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportData.heartRate && (
                    <div className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-red-100">
                          <Heart className="h-5 w-5 text-red-600" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium">Average Heart Rate</h3>
                          <p className="text-xs text-gray-500">Resting: {reportData.heartRate.resting} BPM</p>
                        </div>
                      </div>
                      <div className="text-xl font-semibold">{reportData.heartRate.average} BPM</div>
                    </div>
                  )}

                  {reportData.sleep && (
                    <div className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-purple-100">
                          <Brain className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium">Average Sleep</h3>
                          <p className="text-xs text-gray-500">Efficiency: {reportData.sleep.efficiency}%</p>
                        </div>
                      </div>
                      <div className="text-xl font-semibold">{reportData.sleep.averageDuration} hrs</div>
                    </div>
                  )}

                  {reportData.activity && (
                    <div className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-green-100">
                          <Activity className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium">Daily Steps</h3>
                          <p className="text-xs text-gray-500">Active: {reportData.activity.averageActiveMinutes} mins</p>
                        </div>
                      </div>
                      <div className="text-xl font-semibold">{reportData.activity.averageSteps}</div>
                    </div>
                  )}

                  {reportData.bloodPressure && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-blue-100">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium">Blood Pressure</h3>
                          <p className="text-xs text-gray-500">Average readings</p>
                        </div>
                      </div>
                      <div className="text-xl font-semibold">
                        {reportData.bloodPressure.averageSystolic}/{reportData.bloodPressure.averageDiastolic}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="heart" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="mr-2 h-5 w-5 text-red-600" />
                Heart Rate Analysis
              </CardTitle>
              <CardDescription>
                Detailed view of your heart rate metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reportData.heartRate && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">Average</p>
                      <p className="text-2xl font-bold text-gray-900">{reportData.heartRate.average} BPM</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">Resting</p>
                      <p className="text-2xl font-bold text-gray-900">{reportData.heartRate.resting} BPM</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">Range</p>
                      <p className="text-2xl font-bold text-gray-900">{reportData.heartRate.min} - {reportData.heartRate.max}</p>
                    </div>
                  </div>

                  <div className="h-[300px] mt-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={reportData.heartRate.measurements}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#ef4444" name="Heart Rate (BPM)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sleep" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5 text-purple-600" />
                Sleep Analysis
              </CardTitle>
              <CardDescription>
                Patterns and quality of your sleep
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reportData.sleep && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">Average Duration</p>
                      <p className="text-2xl font-bold text-gray-900">{reportData.sleep.averageDuration} hrs</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">Deep Sleep</p>
                      <p className="text-2xl font-bold text-gray-900">{reportData.sleep.averageDeep} hrs</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">REM Sleep</p>
                      <p className="text-2xl font-bold text-gray-900">{reportData.sleep.averageREM} hrs</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">Efficiency</p>
                      <p className="text-2xl font-bold text-gray-900">{reportData.sleep.efficiency}%</p>
                    </div>
                  </div>

                  <div className="h-[300px] mt-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={reportData.sleep.data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="deep" stackId="a" fill="#8884d8" name="Deep Sleep" />
                        <Bar dataKey="rem" stackId="a" fill="#82ca9d" name="REM Sleep" />
                        <Bar dataKey="light" stackId="a" fill="#ffc658" name="Light Sleep" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5 text-green-600" />
                Activity Analysis
              </CardTitle>
              <CardDescription>
                Your physical activity metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reportData.activity && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">Average Steps</p>
                      <p className="text-2xl font-bold text-gray-900">{reportData.activity.averageSteps}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">Active Minutes</p>
                      <p className="text-2xl font-bold text-gray-900">{reportData.activity.averageActiveMinutes}/day</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">Calories Burned</p>
                      <p className="text-2xl font-bold text-gray-900">{reportData.activity.caloriesBurned}</p>
                    </div>
                  </div>

                  <div className="h-[300px] mt-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={reportData.activity.data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="steps" fill="#8884d8" name="Steps" />
                        <Bar yAxisId="right" dataKey="active" fill="#82ca9d" name="Active Minutes" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bp" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
                Blood Pressure Analysis
              </CardTitle>
              <CardDescription>
                Your blood pressure readings over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reportData.bloodPressure && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">Average Systolic</p>
                      <p className="text-2xl font-bold text-gray-900">{reportData.bloodPressure.averageSystolic} mmHg</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">Average Diastolic</p>
                      <p className="text-2xl font-bold text-gray-900">{reportData.bloodPressure.averageDiastolic} mmHg</p>
                    </div>
                  </div>

                  <div className="h-[300px] mt-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={reportData.bloodPressure.data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[60, 160]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="systolic" stroke="#ef4444" name="Systolic" strokeWidth={2} />
                        <Line type="monotone" dataKey="diastolic" stroke="#3b82f6" name="Diastolic" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-6">
        <Button variant="outline" className="mr-2">Download Report PDF</Button>
        <Button className="bg-flora-green hover:bg-flora-green/90 text-white">Share with Healthcare Provider</Button>
      </div>
    </div>
  );
};

export default HealthDataReport;
