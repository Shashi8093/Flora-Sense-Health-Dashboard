
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Button } from "@/components/ui/button";
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, ChevronDown, Download, Filter } from 'lucide-react';
import { format } from 'date-fns';

const History = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [metricFilter, setMetricFilter] = useState("all");
  
  // Sample data for the charts
  const heartRateData = [
    { time: '00:00', value: 62 },
    { time: '03:00', value: 58 },
    { time: '06:00', value: 65 },
    { time: '09:00', value: 72 },
    { time: '12:00', value: 78 },
    { time: '15:00', value: 82 },
    { time: '18:00', value: 76 },
    { time: '21:00', value: 70 },
  ];

  const sleepData = [
    { date: 'Mon', deep: 2.1, light: 4.2, rem: 1.5 },
    { date: 'Tue', deep: 1.8, light: 4.5, rem: 1.3 },
    { date: 'Wed', deep: 2.3, light: 3.8, rem: 1.7 },
    { date: 'Thu', deep: 1.9, light: 4.0, rem: 1.4 },
    { date: 'Fri', deep: 2.0, light: 4.3, rem: 1.6 },
    { date: 'Sat', deep: 2.5, light: 4.7, rem: 1.8 },
    { date: 'Sun', deep: 2.2, light: 4.1, rem: 1.5 },
  ];

  const activityData = [
    { date: 'Mon', steps: 8245, active: 68 },
    { date: 'Tue', steps: 9125, active: 72 },
    { date: 'Wed', steps: 7865, active: 65 },
    { date: 'Thu', steps: 10234, active: 78 },
    { date: 'Fri', steps: 8756, active: 70 },
    { date: 'Sat', steps: 12543, active: 85 },
    { date: 'Sun', steps: 6532, active: 55 },
  ];

  const bloodPressureData = [
    { date: 'Mon', systolic: 118, diastolic: 75 },
    { date: 'Tue', systolic: 120, diastolic: 76 },
    { date: 'Wed', systolic: 122, diastolic: 78 },
    { date: 'Thu', systolic: 119, diastolic: 75 },
    { date: 'Fri', systolic: 121, diastolic: 77 },
    { date: 'Sat', systolic: 117, diastolic: 74 },
    { date: 'Sun', systolic: 120, diastolic: 76 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Health History</h1>
            <p className="text-gray-600">View and analyze your historical health data</p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-4 md:mt-0">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center justify-between w-full sm:w-auto">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center justify-between w-full sm:w-auto">
                  <Filter className="mr-2 h-4 w-4" />
                  Metrics
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-0">
                <div className="p-2">
                  <div className="grid gap-1">
                    <Button 
                      variant={metricFilter === "all" ? "default" : "ghost"} 
                      className="justify-start font-normal" 
                      onClick={() => setMetricFilter("all")}
                    >
                      All Metrics
                    </Button>
                    <Button 
                      variant={metricFilter === "heart" ? "default" : "ghost"} 
                      className="justify-start font-normal"
                      onClick={() => setMetricFilter("heart")}
                    >
                      Heart Rate
                    </Button>
                    <Button 
                      variant={metricFilter === "sleep" ? "default" : "ghost"} 
                      className="justify-start font-normal"
                      onClick={() => setMetricFilter("sleep")}
                    >
                      Sleep
                    </Button>
                    <Button 
                      variant={metricFilter === "activity" ? "default" : "ghost"} 
                      className="justify-start font-normal"
                      onClick={() => setMetricFilter("activity")}
                    >
                      Activity
                    </Button>
                    <Button 
                      variant={metricFilter === "bp" ? "default" : "ghost"} 
                      className="justify-start font-normal"
                      onClick={() => setMetricFilter("bp")}
                    >
                      Blood Pressure
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button variant="outline" className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="daily" className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(metricFilter === "all" || metricFilter === "heart") && (
                <Card>
                  <CardHeader>
                    <CardTitle>Heart Rate</CardTitle>
                    <CardDescription>
                      Today's heart rate measurements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={heartRateData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="time" />
                          <YAxis domain={[50, 'auto']} />
                          <Tooltip />
                          <Area type="monotone" dataKey="value" stroke="#4CAF50" fill="#4CAF50" fillOpacity={0.2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between mt-4 text-sm">
                      <div>
                        <p className="text-gray-500">Average</p>
                        <p className="font-medium">70 bpm</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Min</p>
                        <p className="font-medium">58 bpm</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Max</p>
                        <p className="font-medium">82 bpm</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Resting</p>
                        <p className="font-medium">62 bpm</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {(metricFilter === "all" || metricFilter === "sleep") && (
                <Card>
                  <CardHeader>
                    <CardTitle>Sleep</CardTitle>
                    <CardDescription>
                      Last week's sleep patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={sleepData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          stackOffset="expand"
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="deep" stackId="sleep" name="Deep Sleep" fill="#1976D2" />
                          <Bar dataKey="light" stackId="sleep" name="Light Sleep" fill="#64B5F6" />
                          <Bar dataKey="rem" stackId="sleep" name="REM" fill="#0D47A1" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between mt-4 text-sm">
                      <div>
                        <p className="text-gray-500">Avg. Total</p>
                        <p className="font-medium">7.4 hrs</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Avg. Deep</p>
                        <p className="font-medium">2.1 hrs</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Avg. Light</p>
                        <p className="font-medium">4.2 hrs</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Avg. REM</p>
                        <p className="font-medium">1.5 hrs</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {(metricFilter === "all" || metricFilter === "activity") && (
                <Card>
                  <CardHeader>
                    <CardTitle>Activity</CardTitle>
                    <CardDescription>
                      Last week's physical activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={activityData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="date" />
                          <YAxis yAxisId="left" orientation="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Bar yAxisId="left" dataKey="steps" name="Steps" fill="#4CAF50" />
                          <Bar yAxisId="right" dataKey="active" name="Active Minutes" fill="#03A9F4" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between mt-4 text-sm">
                      <div>
                        <p className="text-gray-500">Avg. Steps</p>
                        <p className="font-medium">9,043</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Total Steps</p>
                        <p className="font-medium">63,300</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Avg. Active</p>
                        <p className="font-medium">70 min</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Total Active</p>
                        <p className="font-medium">493 min</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {(metricFilter === "all" || metricFilter === "bp") && (
                <Card>
                  <CardHeader>
                    <CardTitle>Blood Pressure</CardTitle>
                    <CardDescription>
                      Last week's blood pressure readings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={bloodPressureData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="date" />
                          <YAxis domain={[60, 140]} />
                          <Tooltip />
                          <Line type="monotone" dataKey="systolic" name="Systolic" stroke="#F44336" strokeWidth={2} />
                          <Line type="monotone" dataKey="diastolic" name="Diastolic" stroke="#9C27B0" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between mt-4 text-sm">
                      <div>
                        <p className="text-gray-500">Avg. Systolic</p>
                        <p className="font-medium">119.6 mmHg</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Avg. Diastolic</p>
                        <p className="font-medium">75.9 mmHg</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Avg. Reading</p>
                        <p className="font-medium">120/76</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Category</p>
                        <p className="font-medium text-green-600">Normal</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="weekly" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <p className="text-gray-500">Select specific metrics to view weekly trends</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="monthly" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <p className="text-gray-500">Select specific metrics to view monthly trends</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default History;
