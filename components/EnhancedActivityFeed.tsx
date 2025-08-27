"use client";

import { AnimatedList } from '@/components/magicui/animated-list';
import { CheckCircle, AlertTriangle, Info, Clock, Play, Zap, Shield, Target } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Activity {
  id: string;
  type: 'success' | 'warning' | 'info' | 'pending';
  title: string;
  description: string;
  time: string;
  icon?: React.ReactNode;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'success',
    title: 'Deployment Complete',
    description: 'Production deployed',
    time: '2m',
  },
  {
    id: '2',
    type: 'success', 
    title: 'Auto-scaling',
    description: 'Added 3 instances',
    time: '5m',
  },
  {
    id: '3',
    type: 'warning',
    title: 'Memory Alert',
    description: 'DB at 87%',
    time: '12m',
  },
  {
    id: '4',
    type: 'info',
    title: 'Backup Done',
    description: 'Daily backup',
    time: '1h',
  },
];

const ActivityItem = ({ activity }: { activity: Activity }) => {
  const getIcon = () => {
    switch (activity.type) {
      case 'success': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'info': return <Info className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getColors = () => {
    switch (activity.type) {
      case 'success': return {
        bg: 'bg-green-500/10',
        border: 'border-green-500/20',
        icon: 'text-green-400',
        dot: 'bg-green-400'
      };
      case 'warning': return {
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/20',
        icon: 'text-yellow-400',
        dot: 'bg-yellow-400'
      };
      case 'info': return {
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        icon: 'text-blue-400',
        dot: 'bg-blue-400'
      };
      case 'pending': return {
        bg: 'bg-gray-500/10',
        border: 'border-gray-500/20',
        icon: 'text-gray-400',
        dot: 'bg-gray-400'
      };
      default: return {
        bg: 'bg-white/5',
        border: 'border-white/10',
        icon: 'text-white/60',
        dot: 'bg-white/60'
      };
    }
  };

  const colors = getColors();

  return (
    <div className="relative p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-white/10">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-white truncate">{activity.title}</h4>
            <span className="text-xs text-white/60">{activity.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const actionButtons = [
  { id: 1, icon: Play, text: 'Execute Optimization', delay: 4500 },
  { id: 2, icon: Zap, text: 'Auto-scale Resources', delay: 5200 },
];

export function EnhancedActivityFeed() {
  const [visibleActions, setVisibleActions] = useState<number[]>([]);
  const [showInsightText, setShowInsightText] = useState(false);
  
  useEffect(() => {
    // Show insight text first
    setTimeout(() => {
      setShowInsightText(true);
    }, 3800);
    
    // Show actions with staggered timing
    actionButtons.forEach((action) => {
      setTimeout(() => {
        setVisibleActions(prev => [...prev, action.id]);
      }, action.delay);
    });
  }, []);
  
  return (
    <div className="w-full">
      {/* Minimal AI Header */}
      <div className="mb-4 px-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-white">AI Monitoring</span>
        </div>
        <p className="text-xs text-white/70">Live infrastructure analysis</p>
      </div>
      
      <div className="relative">
        <AnimatedList delay={800}>
          {activities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </AnimatedList>
        
        {/* AI Insight Text */}
        {showInsightText && (
          <div className="mt-3 animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out">
            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                <span className="text-xs text-white/80">AI Analysis Complete</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Detected optimal deployment window with 94% success probability. 
                Infrastructure ready for automated scaling.
              </p>
            </div>
          </div>
        )}
        
        {/* Two Glassy Action Buttons */}
        <div className="mt-4 space-y-3">
          {actionButtons.map((action) => {
            const IconComponent = action.icon;
            return visibleActions.includes(action.id) ? (
              <div key={action.id} className="animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out">
                <button className="w-full p-3 bg-white/10 backdrop-blur-md hover:bg-white/15 rounded-xl border border-white/20 transition-all duration-500 ease-out group shadow-lg hover:shadow-xl hover:scale-[1.02]">
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                      <IconComponent className="w-3 h-3 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="text-sm font-medium text-white">{action.text}</span>
                  </div>
                </button>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}