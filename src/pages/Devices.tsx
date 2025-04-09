
import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Activity, 
  Watch, 
  Smartphone, 
  Heart, 
  Thermometer, 
  PlusCircle, 
  MoreVertical,
  Wifi,
  BatteryMedium,
  Info
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const Devices = () => {
  const connectedDevices = [
    {
      id: 1,
      name: 'FloraSense Wristband',
      type: 'wearable',
      status: 'connected',
      battery: 85,
      lastSync: '10 minutes ago',
      metrics: ['heart_rate', 'steps', 'sleep', 'temperature'],
      icon: Watch
    },
    {
      id: 2,
      name: 'Smart Blood Pressure Monitor',
      type: 'medical',
      status: 'connected',
      battery: 62,
      lastSync: '2 hours ago',
      metrics: ['blood_pressure', 'heart_rate'],
      icon: Heart
    },
    {
      id: 3,
      name: 'Health Tracker App',
      type: 'app',
      status: 'connected',
      battery: null,
      lastSync: '35 minutes ago',
      metrics: ['activity', 'steps', 'calories'],
      icon: Smartphone
    }
  ];

  const availableDevices = [
    {
      id: 4,
      name: 'Smart Scale',
      type: 'fitness',
      icon: Activity
    },
    {
      id: 5,
      name: 'Body Temperature Sensor',
      type: 'medical',
      icon: Thermometer
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Connected Devices</h1>
            <p className="text-gray-600">Manage your connected health tracking devices</p>
          </div>
          <Button className="flora-gradient border-0">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Device
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {connectedDevices.map((device) => (
            <Card key={device.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <device.icon className="h-6 w-6 text-flora-green" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{device.name}</CardTitle>
                      <CardDescription>
                        <Badge variant="outline" className="mt-1">
                          {device.type.charAt(0).toUpperCase() + device.type.slice(1)}
                        </Badge>
                      </CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Device Settings</DropdownMenuItem>
                      <DropdownMenuItem>Sync Data</DropdownMenuItem>
                      <DropdownMenuItem>View History</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Disconnect</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Wifi className="h-4 w-4 mr-2" />
                      <span>Status</span>
                    </div>
                    <Badge 
                      variant={device.status === 'connected' ? 'default' : 'secondary'}
                      className={device.status === 'connected' ? 'bg-green-500' : ''}
                    >
                      {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                    </Badge>
                  </div>
                  
                  {device.battery !== null && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <BatteryMedium className="h-4 w-4 mr-2" />
                        <span>Battery</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                          <div 
                            className={`h-full rounded-full ${
                              device.battery > 60 ? 'bg-green-500' : 
                              device.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'
                            }`} 
                            style={{ width: `${device.battery}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{device.battery}%</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Info className="h-4 w-4 mr-2" />
                      <span>Last Synced</span>
                    </div>
                    <span className="text-sm">{device.lastSync}</span>
                  </div>
                  
                  <div className="pt-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Tracked Metrics</h4>
                    <div className="flex flex-wrap gap-2">
                      {device.metrics.map((metric, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-50">
                          {metric.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="flex items-center text-sm">
                  <span className="mr-2">Auto-sync</span>
                  <Switch defaultChecked />
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Devices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableDevices.map((device) => (
              <Card key={device.id} className="overflow-hidden bg-gray-50 hover:bg-white hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="bg-white p-2 rounded-lg shadow-sm mr-3">
                      <device.icon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{device.name}</h3>
                      <p className="text-sm text-gray-500">
                        {device.type.charAt(0).toUpperCase() + device.type.slice(1)}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <div className="px-4 py-3 bg-white border-t">
                  <Button variant="outline" size="sm" className="w-full">
                    Connect
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devices;
