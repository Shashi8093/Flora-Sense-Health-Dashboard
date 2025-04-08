
import React, { useState } from 'react';
import { 
  Watch, 
  Smartphone, 
  Heart, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Bluetooth, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Device {
  id: string;
  name: string;
  type: 'watch' | 'smartphone' | 'monitor';
  status: 'connected' | 'disconnected';
  battery: number;
  lastSync: string;
}

const DeviceConnection = () => {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'Flora Watch Pro',
      type: 'watch',
      status: 'connected',
      battery: 78,
      lastSync: '2 mins ago'
    },
    {
      id: '2',
      name: 'Health Monitor X1',
      type: 'monitor',
      status: 'connected',
      battery: 92,
      lastSync: '5 mins ago'
    },
    {
      id: '3',
      name: 'Smartphone App',
      type: 'smartphone',
      status: 'disconnected',
      battery: 45,
      lastSync: '3 hours ago'
    }
  ]);
  
  const [isScanning, setIsScanning] = useState(false);
  
  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
  };
  
  const handleToggleConnection = (deviceId: string) => {
    setDevices(devices.map(device => {
      if (device.id === deviceId) {
        return {
          ...device,
          status: device.status === 'connected' ? 'disconnected' : 'connected',
          lastSync: device.status === 'disconnected' ? 'Just now' : device.lastSync
        };
      }
      return device;
    }));
  };
  
  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'watch':
        return <Watch className="h-5 w-5" />;
      case 'smartphone':
        return <Smartphone className="h-5 w-5" />;
      case 'monitor':
        return <Heart className="h-5 w-5" />;
      default:
        return <Bluetooth className="h-5 w-5" />;
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Connected Devices</h2>
        <Button 
          variant="outline" 
          onClick={handleScan}
          disabled={isScanning}
          className="flex items-center gap-2"
        >
          {isScanning ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Bluetooth className="h-4 w-4" />
              Scan for Devices
            </>
          )}
        </Button>
      </div>
      
      <div className="space-y-4">
        {devices.map((device) => (
          <div key={device.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="bg-white p-3 rounded-full mr-4 shadow-sm">
                {getDeviceIcon(device.type)}
              </div>
              <div>
                <h3 className="font-medium">{device.name}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  {device.status === 'connected' ? (
                    <>
                      <Wifi className="h-3 w-3 mr-1 text-flora-green" />
                      <span>Connected • Last sync: {device.lastSync}</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-3 w-3 mr-1 text-gray-400" />
                      <span>Disconnected • Last sync: {device.lastSync}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="w-24">
                <div className="flex justify-between text-xs mb-1">
                  <span>Battery</span>
                  <span className={`font-medium ${
                    device.battery < 20 ? 'text-flora-red' : 
                    device.battery < 50 ? 'text-flora-orange' : 
                    'text-flora-green'
                  }`}>
                    {device.battery}%
                  </span>
                </div>
                <Progress value={device.battery} 
                  className={`h-1.5 ${
                    device.battery < 20 ? 'bg-red-100' : 
                    device.battery < 50 ? 'bg-orange-100' : 
                    'bg-green-100'
                  }`}
                />
              </div>
              
              <Button
                variant={device.status === 'connected' ? "ghost" : "outline"} 
                size="sm"
                onClick={() => handleToggleConnection(device.id)}
                className={`${
                  device.status === 'connected' ? 'text-flora-red hover:text-flora-red hover:bg-red-50' : 'text-flora-green'
                }`}
              >
                {device.status === 'connected' ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Bluetooth className="h-5 w-5 text-flora-blue" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Secure Blockchain Connection</h3>
            <div className="mt-1 text-sm text-blue-700">
              <p>All your health data is encrypted and securely stored on the blockchain. Your privacy is guaranteed with decentralized storage technology.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceConnection;
