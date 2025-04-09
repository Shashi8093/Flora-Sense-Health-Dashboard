import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HealthInsights from '@/components/HealthInsights';
import HealthDataReport from '@/components/HealthDataReport';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Heart, Activity, AlertTriangle, BarChart, TrendingUp, TrendingDown, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface HealthReport {
  reportId: string;
  data: any;
  fileName: string;
  uploadDate: string;
}

const Insights = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentReport, setCurrentReport] = useState<HealthReport | null>(null);
  const { toast } = useToast();

  const recommendationData = [
    {
      id: 1,
      title: 'Improve Sleep Quality',
      description: 'Based on your recent sleep patterns, try to maintain a consistent sleep schedule and avoid screens 1 hour before bedtime.',
      impact: 'high',
      category: 'sleep'
    },
    {
      id: 2,
      title: 'Hydration Reminder',
      description: 'Your hydration levels have been consistently below target. Aim for at least 2 liters of water daily.',
      impact: 'medium',
      category: 'nutrition'
    },
    {
      id: 3,
      title: 'Stress Management',
      description: 'Your stress levels peak during work hours. Consider implementing 5-minute mindfulness breaks every 2 hours.',
      impact: 'high',
      category: 'mental'
    },
    {
      id: 4,
      title: 'Increase Physical Activity',
      description: 'Your daily step count is below your weekly average. Try a 15-minute walk during your lunch break.',
      impact: 'medium',
      category: 'fitness'
    }
  ];

  const healthTrends = [
    {
      id: 1,
      title: 'Resting Heart Rate',
      current: '68 bpm',
      previous: '72 bpm',
      change: -5.6,
      interpretation: 'Improved cardiovascular fitness',
      timeFrame: '30 days'
    },
    {
      id: 2,
      title: 'Sleep Quality',
      current: '87%',
      previous: '76%',
      change: 14.5,
      interpretation: 'Better sleep consistency and duration',
      timeFrame: '14 days'
    },
    {
      id: 3,
      title: 'Stress Score',
      current: '42/100',
      previous: '65/100',
      change: -35.4,
      interpretation: 'Reduced stress levels',
      timeFrame: '7 days'
    }
  ];

  useEffect(() => {
    const reportData = localStorage.getItem('currentReport');
    if (reportData) {
      try {
        const report = JSON.parse(reportData);
        setCurrentReport(report);
        setActiveTab('report');
        localStorage.removeItem('currentReport');
      } catch (error) {
        console.error('Error parsing report data:', error);
        toast({
          title: "Error Loading Report",
          description: "There was a problem loading the report data.",
          variant: "destructive",
        });
      }
    }
    
    const latestReport = localStorage.getItem('latestReport');
    if (latestReport) {
      try {
        setCurrentReport(JSON.parse(latestReport));
      } catch (error) {
        console.error('Error parsing latest report data:', error);
      }
    }
  }, [toast]);

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'high':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">High Impact</span>;
      case 'medium':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Medium Impact</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Low Impact</span>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'sleep':
        return <div className="bg-indigo-100 p-2 rounded-full"><Brain className="h-5 w-5 text-indigo-600" /></div>;
      case 'nutrition':
        return <div className="bg-green-100 p-2 rounded-full"><Activity className="h-5 w-5 text-green-600" /></div>;
      case 'mental':
        return <div className="bg-purple-100 p-2 rounded-full"><Brain className="h-5 w-5 text-purple-600" /></div>;
      case 'fitness':
        return <div className="bg-blue-100 p-2 rounded-full"><Activity className="h-5 w-5 text-blue-600" /></div>;
      default:
        return <div className="bg-gray-100 p-2 rounded-full"><Heart className="h-5 w-5 text-gray-600" /></div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Health Insights</h1>
        <p className="text-gray-600 mb-6">AI-powered analysis and recommendations based on your health data</p>
        
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full max-w-3xl grid-cols-5">
            <TabsTrigger value="all">All Insights</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="report" className="relative">
              Report
              {currentReport && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-flora-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-flora-green"></span>
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="mr-2 h-5 w-5 text-flora-green" />
                      Health Recommendations
                    </CardTitle>
                    <CardDescription>
                      Personalized suggestions to improve your health
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {recommendationData.map((rec) => (
                        <div key={rec.id} className="flex">
                          {getCategoryIcon(rec.category)}
                          <div className="ml-4">
                            <div className="flex items-center mb-1">
                              <h3 className="text-md font-medium mr-2">{rec.title}</h3>
                              {getImpactBadge(rec.impact)}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart className="mr-2 h-5 w-5 text-flora-blue" />
                      Health Trends
                    </CardTitle>
                    <CardDescription>
                      Changes in your key health metrics over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {healthTrends.map((trend) => (
                        <div key={trend.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-md font-medium">{trend.title}</h3>
                            <div className="flex items-center">
                              {trend.change < 0 ? (
                                <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                              ) : (
                                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                              )}
                              <span className={`text-sm font-medium ${
                                (trend.title === 'Stress Score' && trend.change < 0) || 
                                (trend.title !== 'Stress Score' && trend.change > 0) 
                                  ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {trend.change > 0 ? '+' : ''}{trend.change}%
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-500">Current: <span className="font-medium text-gray-800">{trend.current}</span></span>
                            <span className="text-gray-500">Previous: <span className="font-medium text-gray-600">{trend.previous}</span></span>
                          </div>
                          <div className="text-sm text-gray-600 flex justify-between">
                            <span>{trend.interpretation}</span>
                            <span className="text-xs text-gray-500">Last {trend.timeFrame}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="mr-2 h-5 w-5 text-indigo-600" />
                      AI Insights
                    </CardTitle>
                    <CardDescription>
                      Real-time insights from your health data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <HealthInsights />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="recommendations" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
                <CardDescription>
                  Health suggestions based on your data and activity patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recommendationData.map((rec) => (
                    <div key={rec.id} className="border p-4 rounded-lg">
                      <div className="flex">
                        {getCategoryIcon(rec.category)}
                        <div className="ml-4">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-md font-medium">{rec.title}</h3>
                            {getImpactBadge(rec.impact)}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                          <div className="flex justify-end mt-4">
                            <Button variant="outline" size="sm" className="mr-2">Dismiss</Button>
                            <Button size="sm" className="bg-flora-green hover:bg-flora-green/90 text-white">Apply</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Health Trends</CardTitle>
                <CardDescription>
                  View changes in your key health metrics over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {healthTrends.map((trend) => (
                    <div key={trend.id} className="border p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium">{trend.title}</h3>
                        <div className="flex items-center">
                          {trend.change < 0 ? (
                            <TrendingDown className="h-5 w-5 text-green-500 mr-1" />
                          ) : (
                            <TrendingUp className="h-5 w-5 text-green-500 mr-1" />
                          )}
                          <span className={`text-sm font-medium ${
                            (trend.title === 'Stress Score' && trend.change < 0) || 
                            (trend.title !== 'Stress Score' && trend.change > 0) 
                              ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {trend.change > 0 ? '+' : ''}{trend.change}%
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <span className="text-sm text-gray-500">Current</span>
                          <p className="text-xl font-semibold">{trend.current}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <span className="text-sm text-gray-500">Previous</span>
                          <p className="text-xl font-semibold text-gray-600">{trend.previous}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-700">
                        <p><strong>Interpretation:</strong> {trend.interpretation}</p>
                        <p className="mt-1 text-gray-500">Measured over the last {trend.timeFrame}</p>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm">View Full History</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="alerts" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
                  Health Alerts
                </CardTitle>
                <CardDescription>
                  Important notifications about your health metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">All Clear</h3>
                  <p className="text-gray-600">
                    No health alerts detected at this time. Keep up the good work!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="report" className="mt-6">
            {currentReport ? (
              <HealthDataReport 
                reportData={currentReport.data} 
                fileName={currentReport.fileName}
                uploadDate={currentReport.uploadDate}
              />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-gray-500" />
                    Health Data Report
                  </CardTitle>
                  <CardDescription>
                    View detailed analysis from your uploaded health data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Reports Available</h3>
                    <p className="text-gray-600 max-w-md mx-auto mb-4">
                      Upload health data files to generate detailed AI-powered analysis and insights.
                    </p>
                    <Button 
                      className="bg-flora-green hover:bg-flora-green/90 text-white"
                      onClick={() => window.location.href = '/upload'}
                    >
                      Upload Health Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Insights;
