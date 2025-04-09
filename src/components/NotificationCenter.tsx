
import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  MessageCircle, 
  Settings, 
  X, 
  ChevronRight,
  User,
  Bot
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'alert' | 'info' | 'success';
}

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Sleep Goal Achieved',
    message: 'You reached your sleep goal for 5 consecutive days!',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false,
    type: 'success'
  },
  {
    id: '2',
    title: 'High Heart Rate',
    message: 'Your heart rate was above normal range for 30 minutes today.',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    read: false,
    type: 'alert'
  },
  {
    id: '3',
    title: 'New Feature Available',
    message: 'Try our new stress tracking feature in the dashboard.',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    read: true,
    type: 'info'
  }
];

const predefinedResponses = [
  "Based on your health data, I recommend increasing your daily hydration.",
  "Your sleep patterns suggest you could benefit from a more consistent sleep schedule.",
  "I've analyzed your activity data and noticed you're most active on weekdays. Consider adding light exercises on weekends too.",
  "Your heart rate variability has improved over the past week, which is a positive sign of recovery.",
  "Would you like me to help you set up a personalized health goal based on your recent metrics?",
  "I notice your stress levels tend to peak in the afternoons. Have you considered short meditation breaks?",
  "Your blood pressure readings are within a healthy range. Keep up the good work!",
  "Is there anything specific about your health data you'd like me to explain?"
];

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    healthAlerts: true,
    weeklyReport: true,
    goalAchievements: true
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  useEffect(() => {
    // Auto-scroll to bottom of chat
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };
  
  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };
  
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    setChatMessages([...chatMessages, userMessage]);
    setInputMessage('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const randomResponse = predefinedResponses[Math.floor(Math.random() * predefinedResponses.length)];
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };
  
  const toggleSetting = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };
  
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <div className="bg-green-100 p-2 rounded-full"><User className="h-4 w-4 text-green-600" /></div>;
      case 'alert':
        return <div className="bg-red-100 p-2 rounded-full"><Bell className="h-4 w-4 text-red-600" /></div>;
      default:
        return <div className="bg-blue-100 p-2 rounded-full"><MessageCircle className="h-4 w-4 text-blue-600" /></div>;
    }
  };

  return (
    <div className="relative">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 text-[10px] font-bold flex items-center justify-center rounded-full bg-red-500 text-white">
                {unreadCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[350px] p-0" 
          align="end" 
          sideOffset={5}
        >
          <Tabs defaultValue="notifications" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="chatbot">Health Assistant</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="notifications" className="p-0">
              <div className="px-4 py-3 border-b flex justify-between items-center">
                <h3 className="font-medium">Notifications</h3>
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={markAllAsRead}
                    className="text-xs h-7"
                  >
                    Mark all as read
                  </Button>
                )}
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {notifications.length > 0 ? (
                  <div className="divide-y">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`p-3 flex items-start ${!notification.read ? 'bg-gray-50' : ''}`}
                      >
                        {getNotificationIcon(notification.type)}
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-medium">{notification.title}</h4>
                            <button 
                              onClick={() => removeNotification(notification.id)} 
                              className="text-gray-400 hover:text-gray-500"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                          <span className="text-xs text-gray-400 mt-1 block">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No notifications
                  </div>
                )}
              </div>
              <div className="p-3 border-t text-center">
                <Button variant="ghost" size="sm" className="text-xs" onClick={() => setIsOpen(false)}>
                  Close
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="chatbot" className="p-0">
              <div className="px-4 py-3 border-b flex items-center">
                <Bot className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="font-medium">Health Assistant AI</h3>
              </div>
              <div className="h-[350px] flex flex-col">
                <div className="flex-1 p-3 overflow-y-auto">
                  {chatMessages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-4">
                      <Bot className="h-10 w-10 text-purple-200 mb-3" />
                      <h4 className="text-sm font-medium">Health Assistant</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Ask me questions about your health data or for recommendations!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {chatMessages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.sender === 'user' 
                                ? 'bg-purple-600 text-white' 
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <span className="text-[10px] block mt-1 opacity-70">
                              {formatTimestamp(message.timestamp)}
                            </span>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>
                <div className="p-3 border-t">
                  <div className="flex">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask a question..."
                      className="text-sm"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      size="sm" 
                      className="ml-2" 
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="p-0">
              <div className="px-4 py-3 border-b">
                <h3 className="font-medium">Notification Settings</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Email Notifications</h4>
                    <p className="text-xs text-gray-500">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => toggleSetting('emailNotifications')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Push Notifications</h4>
                    <p className="text-xs text-gray-500">Receive alerts on your device</p>
                  </div>
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={() => toggleSetting('pushNotifications')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Health Alerts</h4>
                    <p className="text-xs text-gray-500">Get notified about critical health changes</p>
                  </div>
                  <Switch
                    checked={notificationSettings.healthAlerts}
                    onCheckedChange={() => toggleSetting('healthAlerts')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Weekly Reports</h4>
                    <p className="text-xs text-gray-500">Receive weekly health summaries</p>
                  </div>
                  <Switch
                    checked={notificationSettings.weeklyReport}
                    onCheckedChange={() => toggleSetting('weeklyReport')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Goal Achievements</h4>
                    <p className="text-xs text-gray-500">Get notified when you reach your goals</p>
                  </div>
                  <Switch
                    checked={notificationSettings.goalAchievements}
                    onCheckedChange={() => toggleSetting('goalAchievements')}
                  />
                </div>
              </div>
              <div className="p-3 border-t text-center">
                <Button size="sm">Save Settings</Button>
              </div>
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NotificationCenter;
