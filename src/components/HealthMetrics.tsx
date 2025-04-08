
import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data
const weeklyData = [
  { name: 'Mon', heartRate: 72, bloodPressure: 120, sleep: 7.5, stress: 43 },
  { name: 'Tue', heartRate: 75, bloodPressure: 118, sleep: 6.8, stress: 55 },
  { name: 'Wed', heartRate: 71, bloodPressure: 122, sleep: 8.0, stress: 38 },
  { name: 'Thu', heartRate: 73, bloodPressure: 119, sleep: 7.2, stress: 42 },
  { name: 'Fri', heartRate: 78, bloodPressure: 125, sleep: 6.5, stress: 60 },
  { name: 'Sat', heartRate: 70, bloodPressure: 117, sleep: 8.5, stress: 35 },
  { name: 'Sun', heartRate: 69, bloodPressure: 116, sleep: 8.8, stress: 30 },
];

const monthlyData = [
  { name: 'W1', heartRate: 72, bloodPressure: 120, sleep: 7.2, stress: 45 },
  { name: 'W2', heartRate: 73, bloodPressure: 119, sleep: 7.4, stress: 42 },
  { name: 'W3', heartRate: 74, bloodPressure: 121, sleep: 7.1, stress: 48 },
  { name: 'W4', heartRate: 71, bloodPressure: 118, sleep: 7.6, stress: 40 },
];

const HealthMetrics = () => {
  const [selectedMetric, setSelectedMetric] = useState('heartRate');
  const [timeFrame, setTimeFrame] = useState('weekly');
  
  const data = timeFrame === 'weekly' ? weeklyData : monthlyData;
  
  const metrics = [
    { id: 'heartRate', name: 'Heart Rate', color: '#F44336', unit: 'bpm' },
    { id: 'bloodPressure', name: 'Blood Pressure', color: '#03A9F4', unit: 'mmHg' },
    { id: 'sleep', name: 'Sleep', color: '#9C27B0', unit: 'hours' },
    { id: 'stress', name: 'Stress', color: '#FF9800', unit: '%' },
  ];
  
  const selectedMetricData = metrics.find(metric => metric.id === selectedMetric);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Health Metrics</h2>
        <Tabs defaultValue="weekly" className="w-[200px]" onValueChange={setTimeFrame}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {metrics.map((metric) => (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                selectedMetric === metric.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {metric.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`${value} ${selectedMetricData?.unit}`, selectedMetricData?.name]}
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #f0f0f0' }} 
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={selectedMetric}
              stroke={selectedMetricData?.color}
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name={selectedMetricData?.name}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HealthMetrics;
