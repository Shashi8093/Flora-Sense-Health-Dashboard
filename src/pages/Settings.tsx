
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Bell, 
  Shield, 
  User, 
  Smartphone, 
  Settings as SettingsIcon,
  Save,
  Bot
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [profileSettings, setProfileSettings] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '(555) 123-4567'
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    healthAlerts: true,
    weeklyReport: true,
    goalAchievements: true
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    shareDataWithPartners: false,
    anonymousAnalytics: true,
    allowLocationTracking: false
  });
  
  const [deviceSettings, setDeviceSettings] = useState({
    autoSync: true,
    backgroundSync: true,
    lowPowerMode: false
  });
  
  const [aiSettings, setAiSettings] = useState({
    enableAiAssistant: true,
    personalizedRecommendations: true,
    voiceInteractions: false
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileSettings({
      ...profileSettings,
      [e.target.name]: e.target.value
    });
  };
  
  const toggleSetting = (
    settingGroup: 'notification' | 'privacy' | 'device' | 'ai',
    setting: string
  ) => {
    switch (settingGroup) {
      case 'notification':
        setNotificationSettings({
          ...notificationSettings,
          [setting]: !notificationSettings[setting as keyof typeof notificationSettings]
        });
        break;
      case 'privacy':
        setPrivacySettings({
          ...privacySettings,
          [setting]: !privacySettings[setting as keyof typeof privacySettings]
        });
        break;
      case 'device':
        setDeviceSettings({
          ...deviceSettings,
          [setting]: !deviceSettings[setting as keyof typeof deviceSettings]
        });
        break;
      case 'ai':
        setAiSettings({
          ...aiSettings,
          [setting]: !aiSettings[setting as keyof typeof aiSettings]
        });
        break;
    }
  };
  
  const saveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully."
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>
        
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="ai">AI Assistant</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-flora-green" />
                  Profile Settings
                </CardTitle>
                <CardDescription>
                  Manage your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={profileSettings.name}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={profileSettings.email}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={profileSettings.phone}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="pt-4 flex justify-end">
                  <Button onClick={saveSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-flora-green" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Control how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Email Notifications</h4>
                    <p className="text-xs text-gray-500">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => toggleSetting('notification', 'emailNotifications')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Push Notifications</h4>
                    <p className="text-xs text-gray-500">Receive alerts on your device</p>
                  </div>
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={() => toggleSetting('notification', 'pushNotifications')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Health Alerts</h4>
                    <p className="text-xs text-gray-500">Get notified about critical health changes</p>
                  </div>
                  <Switch
                    checked={notificationSettings.healthAlerts}
                    onCheckedChange={() => toggleSetting('notification', 'healthAlerts')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Weekly Reports</h4>
                    <p className="text-xs text-gray-500">Receive weekly health summaries</p>
                  </div>
                  <Switch
                    checked={notificationSettings.weeklyReport}
                    onCheckedChange={() => toggleSetting('notification', 'weeklyReport')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Goal Achievements</h4>
                    <p className="text-xs text-gray-500">Get notified when you reach your goals</p>
                  </div>
                  <Switch
                    checked={notificationSettings.goalAchievements}
                    onCheckedChange={() => toggleSetting('notification', 'goalAchievements')}
                  />
                </div>
                <div className="pt-4 flex justify-end">
                  <Button onClick={saveSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-flora-green" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>
                  Control how your data is used and shared
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Share Data with Partners</h4>
                    <p className="text-xs text-gray-500">Allow us to share your health data with trusted partners</p>
                  </div>
                  <Switch
                    checked={privacySettings.shareDataWithPartners}
                    onCheckedChange={() => toggleSetting('privacy', 'shareDataWithPartners')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Anonymous Analytics</h4>
                    <p className="text-xs text-gray-500">Help improve our service with anonymous usage data</p>
                  </div>
                  <Switch
                    checked={privacySettings.anonymousAnalytics}
                    onCheckedChange={() => toggleSetting('privacy', 'anonymousAnalytics')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Location Tracking</h4>
                    <p className="text-xs text-gray-500">Allow us to track your location for activity insights</p>
                  </div>
                  <Switch
                    checked={privacySettings.allowLocationTracking}
                    onCheckedChange={() => toggleSetting('privacy', 'allowLocationTracking')}
                  />
                </div>
                <div className="pt-4 flex justify-end">
                  <Button onClick={saveSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="devices">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="h-5 w-5 mr-2 text-flora-green" />
                  Device Settings
                </CardTitle>
                <CardDescription>
                  Manage connected devices and sync preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Auto Sync</h4>
                    <p className="text-xs text-gray-500">Automatically sync data when device is connected</p>
                  </div>
                  <Switch
                    checked={deviceSettings.autoSync}
                    onCheckedChange={() => toggleSetting('device', 'autoSync')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Background Sync</h4>
                    <p className="text-xs text-gray-500">Sync data in the background</p>
                  </div>
                  <Switch
                    checked={deviceSettings.backgroundSync}
                    onCheckedChange={() => toggleSetting('device', 'backgroundSync')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Low Power Mode</h4>
                    <p className="text-xs text-gray-500">Reduce sync frequency to save battery</p>
                  </div>
                  <Switch
                    checked={deviceSettings.lowPowerMode}
                    onCheckedChange={() => toggleSetting('device', 'lowPowerMode')}
                  />
                </div>
                <div className="pt-4 flex justify-end">
                  <Button onClick={saveSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="h-5 w-5 mr-2 text-flora-green" />
                  AI Assistant Settings
                </CardTitle>
                <CardDescription>
                  Configure your AI health assistant
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Enable AI Assistant</h4>
                    <p className="text-xs text-gray-500">Use AI to analyze your health data and provide insights</p>
                  </div>
                  <Switch
                    checked={aiSettings.enableAiAssistant}
                    onCheckedChange={() => toggleSetting('ai', 'enableAiAssistant')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Personalized Recommendations</h4>
                    <p className="text-xs text-gray-500">Receive custom health recommendations based on your data</p>
                  </div>
                  <Switch
                    checked={aiSettings.personalizedRecommendations}
                    onCheckedChange={() => toggleSetting('ai', 'personalizedRecommendations')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Voice Interactions</h4>
                    <p className="text-xs text-gray-500">Enable voice commands for the AI assistant</p>
                  </div>
                  <Switch
                    checked={aiSettings.voiceInteractions}
                    onCheckedChange={() => toggleSetting('ai', 'voiceInteractions')}
                  />
                </div>
                <div className="pt-4 flex justify-end">
                  <Button onClick={saveSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
