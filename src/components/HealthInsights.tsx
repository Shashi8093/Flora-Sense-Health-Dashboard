
import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface InsightProps {
  id: number;
  title: string;
  description: string;
  type: 'positive' | 'negative' | 'neutral' | 'warning';
  time: string;
}

// Default insights to show when no data is available
const defaultInsights: InsightProps[] = [
  {
    id: 1,
    title: 'Sleep quality improved',
    description: 'Your sleep duration and quality have improved by 15% this week.',
    type: 'positive',
    time: '2h ago'
  },
  {
    id: 2,
    title: 'Increased stress detected',
    description: 'Your stress levels have increased during work hours. Consider short breaks.',
    type: 'warning',
    time: '5h ago'
  },
  {
    id: 3,
    title: 'Heart rate variability',
    description: "Your HRV indicates good recovery from yesterday's workout.",
    type: 'positive',
    time: '12h ago'
  },
  {
    id: 4,
    title: 'Hydration reminder',
    description: "You've consumed only 60% of your daily water goal.",
    type: 'negative',
    time: '1d ago'
  }
];

const HealthInsights = () => {
  const [insights, setInsights] = useState<InsightProps[]>(defaultInsights);
  const [userNote, setUserNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  useEffect(() => {
    // Check for dynamic insights in localStorage
    const dynamicInsights = localStorage.getItem('dynamicInsights');
    if (dynamicInsights) {
      try {
        const parsedInsights = JSON.parse(dynamicInsights);
        setInsights(parsedInsights);
      } catch (error) {
        console.error("Error parsing dynamic insights", error);
      }
    }
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'negative':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      default:
        return <Brain className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'positive':
        return 'bg-green-50';
      case 'negative':
        return 'bg-red-50';
      case 'warning':
        return 'bg-orange-50';
      default:
        return 'bg-blue-50';
    }
  };

  const handleAddNote = () => {
    if (userNote.trim()) {
      const newInsight: InsightProps = {
        id: Date.now(),
        title: 'User Note',
        description: userNote,
        type: 'neutral',
        time: 'Just now'
      };
      
      const updatedInsights = [newInsight, ...insights];
      setInsights(updatedInsights);
      localStorage.setItem('dynamicInsights', JSON.stringify(updatedInsights));
      setUserNote('');
      setShowNoteInput(false);
    }
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">AI Health Insights</h2>
        <div className="flex items-center">
          <div className="bg-indigo-100 p-1 rounded-full">
            <Brain className="h-4 w-4 text-indigo-600" />
          </div>
          <span className="ml-1.5 text-xs font-medium text-indigo-600">AI Powered</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {insights.map((insight) => (
          <div key={insight.id} className={`p-4 rounded-lg ${getBackgroundColor(insight.type)}`}>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(insight.type)}
              </div>
              <div className="ml-3 flex-grow">
                <h3 className="text-sm font-medium">{insight.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{insight.description}</p>
                <div className="mt-2 text-xs text-gray-500">{insight.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {showNoteInput ? (
        <div className="mt-4 space-y-2">
          <Textarea 
            placeholder="Add your own health observation or note..." 
            value={userNote} 
            onChange={(e) => setUserNote(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="sm" onClick={() => setShowNoteInput(false)}>Cancel</Button>
            <Button size="sm" onClick={handleAddNote}>Add Note</Button>
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-2">
          <Button 
            className="w-full" 
            variant="outline" 
            onClick={() => window.location.href = '/insights'}
          >
            View All Insights
          </Button>
          <Button 
            className="w-full" 
            variant="ghost" 
            onClick={() => setShowNoteInput(true)}
          >
            Add Your Own Note
          </Button>
        </div>
      )}
    </div>
  );
};

export default HealthInsights;
