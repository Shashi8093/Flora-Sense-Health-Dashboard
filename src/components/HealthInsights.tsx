
import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, Download, Share2, FileText, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface InsightProps {
  id: number;
  title: string;
  description: string;
  type: 'positive' | 'negative' | 'neutral' | 'warning';
  time: string;
  detail?: string;
}

// Default insights to show when no data is available
const defaultInsights: InsightProps[] = [
  {
    id: 1,
    title: 'Sleep quality improved',
    description: 'Your sleep duration and quality have improved by 15% this week.',
    type: 'positive',
    time: '2h ago',
    detail: 'Your deep sleep has increased from 1.2 to 1.8 hours per night, which is associated with better cognitive function and memory consolidation. Continue maintaining a consistent sleep schedule.'
  },
  {
    id: 2,
    title: 'Increased stress detected',
    description: 'Your stress levels have increased during work hours. Consider short breaks.',
    type: 'warning',
    time: '5h ago',
    detail: 'Heart rate variability analysis shows increased stress patterns between 2-4pm on workdays. Try implementing 5-minute mindfulness exercises or short walks during this period.'
  },
  {
    id: 3,
    title: 'Heart rate variability',
    description: "Your HRV indicates good recovery from yesterday's workout.",
    type: 'positive',
    time: '12h ago',
    detail: 'Your HRV has increased by 8ms compared to your baseline, indicating effective recovery. Your body is adapting well to your current training load.'
  },
  {
    id: 4,
    title: 'Hydration reminder',
    description: "You've consumed only 60% of your daily water goal.",
    type: 'negative',
    time: '1d ago',
    detail: 'Consistent under-hydration may impact cognitive performance and recovery. Try setting hourly reminders or use a marked water bottle to track intake throughout the day.'
  }
];

const HealthInsights = () => {
  const [insights, setInsights] = useState<InsightProps[]>(defaultInsights);
  const [userNote, setUserNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [expandedInsight, setExpandedInsight] = useState<number | null>(null);
  const { toast } = useToast();

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
      
      toast({
        title: "Note added",
        description: "Your health note has been added to your insights.",
      });
    }
  };
  
  const toggleInsightDetail = (id: number) => {
    if (expandedInsight === id) {
      setExpandedInsight(null);
    } else {
      setExpandedInsight(id);
    }
  };
  
  const handleShareInsight = (insight: InsightProps) => {
    toast({
      title: "Insight shared",
      description: "This insight has been shared with your healthcare provider.",
    });
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
          <div key={insight.id} className={`p-4 rounded-lg ${getBackgroundColor(insight.type)} transition-all duration-200`}>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(insight.type)}
              </div>
              <div className="ml-3 flex-grow">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">{insight.title}</h3>
                  {insight.detail && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => toggleInsightDetail(insight.id)}
                    >
                      <Info className="h-4 w-4 text-gray-500" />
                    </Button>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-600">{insight.description}</p>
                
                {expandedInsight === insight.id && insight.detail && (
                  <div className="mt-3 p-3 bg-white bg-opacity-50 rounded text-sm text-gray-700 animate-fade-in">
                    {insight.detail}
                    <div className="mt-2 flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs h-7"
                        onClick={() => handleShareInsight(insight)}
                      >
                        <Share2 className="h-3 w-3 mr-1" />
                        Share with Doctor
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500">{insight.time}</span>
                  {insight.type === 'warning' && (
                    <span className="text-xs text-orange-600 font-medium">Action recommended</span>
                  )}
                </div>
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
