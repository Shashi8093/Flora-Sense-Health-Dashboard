
import React from 'react';
import { Activity, Heart, Zap, Droplets, Brain, Key } from 'lucide-react';
import HealthMetrics from './HealthMetrics';
import DeviceConnection from './DeviceConnection';
import HealthInsights from './HealthInsights';

const Dashboard = () => {
  return (
    <div className="py-6 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Hello, John</h1>
        <p className="text-gray-600 mb-6">Here's your health overview for today</p>
        
        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <QuickStat
            icon={<Heart className="h-5 w-5 text-red-500" />}
            title="Heart Rate"
            value="72 bpm"
            trend="+3%"
            positive={false}
          />
          <QuickStat
            icon={<Activity className="h-5 w-5 text-blue-500" />}
            title="Blood Pressure"
            value="120/80"
            trend="-5%"
            positive={true}
          />
          <QuickStat
            icon={<Zap className="h-5 w-5 text-yellow-500" />}
            title="Energy"
            value="85%"
            trend="+12%"
            positive={true}
          />
          <QuickStat
            icon={<Droplets className="h-5 w-5 text-blue-400" />}
            title="Hydration"
            value="65%"
            trend="-8%"
            positive={false}
          />
          <QuickStat
            icon={<Brain className="h-5 w-5 text-purple-500" />}
            title="Cognitive"
            value="92%"
            trend="+4%"
            positive={true}
          />
          <QuickStat
            icon={<Key className="h-5 w-5 text-emerald-500" />}
            title="Data Security"
            value="Secure"
            trend="100%"
            positive={true}
          />
        </div>
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Health metrics chart */}
          <div className="lg:col-span-2 flora-card">
            <HealthMetrics />
          </div>
          
          {/* Health insights */}
          <div className="flora-card h-full">
            <HealthInsights />
          </div>
          
          {/* Device connection */}
          <div className="lg:col-span-3 flora-card">
            <DeviceConnection />
          </div>
        </div>
      </div>
    </div>
  );
};

interface QuickStatProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: string;
  positive: boolean;
}

const QuickStat = ({ icon, title, value, trend, positive }: QuickStatProps) => {
  return (
    <div className="flora-card">
      <div className="flex items-center justify-between mb-2">
        <div className="bg-gray-50 p-2 rounded-lg">{icon}</div>
        <span className={`text-xs font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </span>
      </div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
};

export default Dashboard;
