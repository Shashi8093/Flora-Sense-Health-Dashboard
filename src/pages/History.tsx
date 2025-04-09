
import React, { useState } from 'react';
import { Calendar, ChevronDown, Filter, Download } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const healthData = [
  {
    date: '2024-04-01',
    heartRate: 72,
    bloodPressure: 120,
    sleep: 7.5,
    stress: 35,
    hydration: 75
  },
  {
    date: '2024-04-02',
    heartRate: 68,
    bloodPressure: 118,
    sleep: 8.2,
    stress: 30,
    hydration: 80
  },
  {
    date: '2024-04-03',
    heartRate: 74,
    bloodPressure: 122,
    sleep: 6.5,
    stress: 45,
    hydration: 65
  },
  {
    date: '2024-04-04',
    heartRate: 71,
    bloodPressure: 119,
    sleep: 7.8,
    stress: 28,
    hydration: 85
  },
  {
    date: '2024-04-05',
    heartRate: 76,
    bloodPressure: 125,
    sleep: 6.2,
    stress: 50,
    hydration: 60
  },
  {
    date: '2024-04-06',
    heartRate: 70,
    bloodPressure: 117,
    sleep: 8.5,
    stress: 25,
    hydration: 90
  },
  {
    date: '2024-04-07',
    heartRate: 69,
    bloodPressure: 116,
    sleep: 7.9,
    stress: 32,
    hydration: 82
  }
];

const monthlyData = [
  { month: 'Jan', heartRate: 72, bloodPressure: 120, sleep: 7.2, stress: 42, hydration: 68 },
  { month: 'Feb', heartRate: 70, bloodPressure: 118, sleep: 7.4, stress: 38, hydration: 72 },
  { month: 'Mar', heartRate: 71, bloodPressure: 119, sleep: 7.3, stress: 35, hydration: 75 },
  { month: 'Apr', heartRate: 69, bloodPressure: 117, sleep: 7.5, stress: 32, hydration: 78 },
  { month: 'May', heartRate: 68, bloodPressure: 116, sleep: 7.7, stress: 30, hydration: 82 },
  { month: 'Jun', heartRate: 67, bloodPressure: 115, sleep: 7.9, stress: 28, hydration: 85 },
  { month: 'Jul', heartRate: 69, bloodPressure: 117, sleep: 7.6, stress: 33, hydration: 80 },
  { month: 'Aug', heartRate: 70, bloodPressure: 118, sleep: 7.4, stress: 36, hydration: 76 },
  { month: 'Sep', heartRate: 71, bloodPressure: 119, sleep: 7.2, stress: 40, hydration: 72 },
  { month: 'Oct', heartRate: 72, bloodPressure: 120, sleep: 7.0, stress: 44, hydration: 68 },
  { month: 'Nov', heartRate: 73, bloodPressure: 121, sleep: 6.8, stress: 48, hydration: 64 },
  { month: 'Dec', heartRate: 74, bloodPressure: 122, sleep: 6.6, stress: 52, hydration: 60 }
];

const History = () => {
  const [timeFrame, setTimeFrame] = useState('week');
  const [dataType, setDataType] = useState('heartRate');
  
  const dataMapping = {
    heartRate: { name: 'Heart Rate', color: '#ef4444', unit: 'bpm' },
    bloodPressure: { name: 'Blood Pressure', color: '#3b82f6', unit: 'mmHg' },
    sleep: { name: 'Sleep', color: '#8b5cf6', unit: 'hours' },
    stress: { name: 'Stress', color: '#f59e0b', unit: '%' },
    hydration: { name: 'Hydration', color: '#06b6d4', unit: '%' }
  };
  
  // Choose the dataset based on the selected timeframe
  const displayData = timeFrame === 'week' ? healthData : monthlyData;
  const xAxisKey = timeFrame === 'week' ? 'date' : 'month';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Health History</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Select Date Range
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Data</DropdownMenuItem>
                <DropdownMenuItem>Workouts Only</DropdownMenuItem>
                <DropdownMenuItem>Sleep Only</DropdownMenuItem>
                <DropdownMenuItem>Heart Rate Only</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Heart Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">72 bpm</div>
              <p className="text-xs text-muted-foreground">+2% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Sleep</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.4 hours</div>
              <p className="text-xs text-muted-foreground">+0.3 hours from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Stress Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">35%</div>
              <p className="text-xs text-muted-foreground">-5% from last month</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 space-y-4 md:space-y-0">
            <h2 className="text-lg font-semibold">Health Metrics Over Time</h2>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <Tabs defaultValue="week" onValueChange={(value) => setTimeFrame(value)} className="w-full md:w-auto">
                <TabsList>
                  <TabsTrigger value="week">Weekly</TabsTrigger>
                  <TabsTrigger value="month">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
              <Select value={dataType} onValueChange={setDataType}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="heartRate">Heart Rate</SelectItem>
                  <SelectItem value="bloodPressure">Blood Pressure</SelectItem>
                  <SelectItem value="sleep">Sleep</SelectItem>
                  <SelectItem value="stress">Stress</SelectItem>
                  <SelectItem value="hydration">Hydration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={displayData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xAxisKey} />
                <YAxis />
                <Tooltip formatter={(value) => `${value} ${dataMapping[dataType as keyof typeof dataMapping].unit}`} />
                <Legend />
                <Line type="monotone" dataKey={dataType} stroke={dataMapping[dataType as keyof typeof dataMapping].color} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-6">Detailed Health Records</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heart Rate</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Pressure</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sleep</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stress</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hydration</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {healthData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.heartRate} bpm</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.bloodPressure} mmHg</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.sleep} hours</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.stress}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.hydration}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
