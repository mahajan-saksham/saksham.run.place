import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Circle, Coffee, Code, Gamepad2 } from 'lucide-react';
import WidgetCard from './WidgetCard';

const BioStatusWidget = ({ onRemove, isDropdown = false }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [status, setStatus] = useState('available');
  const [activity, setActivity] = useState('designing');
  const [typingText, setTypingText] = useState('');
  
  const fullText = "UI/UX Designer crafting digital experiences...";
  const timezone = 'Asia/Kolkata';
  
  const statuses = {
    available: { color: 'bg-green-500', text: 'Available' },
    busy: { color: 'bg-yellow-500', text: 'Busy' },
    away: { color: 'bg-gray-500', text: 'Away' }
  };
  
  const activities = {
    designing: { icon: <Code className="w-4 h-4" />, text: 'Designing interfaces' },
    coffee: { icon: <Coffee className="w-4 h-4" />, text: 'Coffee break' },
    gaming: { icon: <Gamepad2 className="w-4 h-4" />, text: 'Gaming session' }
  };

  // Typing animation effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypingText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, []);

  // Update clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  const content = (
    <div className="p-4">
      {/* Profile Section */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-accent-cyan to-accent-pink rounded-full flex items-center justify-center text-lg font-bold">
          SM
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-white">Saksham Mahajan</h4>
          <p className="text-xs text-gray-400 h-4">{typingText}<span className="animate-pulse">|</span></p>
        </div>
      </div>

      {/* Status Section */}
      <div className="flex items-center justify-between mb-4 p-3 bg-gray-800/30 rounded-lg">
        <div className="flex items-center gap-2">
          <Circle className={`w-3 h-3 ${statuses[status].color} fill-current`} />
          <span className="text-sm text-white">{statuses[status].text}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          {activities[activity].icon}
          <span className="text-xs">{activities[activity].text}</span>
        </div>
      </div>

      {/* Location & Time */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <MapPin className="w-4 h-4" />
          <span>Bengaluru, India</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <span>{currentTime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            timeZone: timezone 
          })} IST</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 flex gap-2">
        <button 
          onClick={() => setStatus(status === 'available' ? 'busy' : 'available')}
          className="flex-1 px-3 py-2 text-xs bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
        >          Toggle Status
        </button>
        <button 
          onClick={() => {
            const activities = ['designing', 'coffee', 'gaming'];
            const currentIndex = activities.indexOf(activity);
            setActivity(activities[(currentIndex + 1) % activities.length]);
          }}
          className="flex-1 px-3 py-2 text-xs bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
        >
          Change Activity
        </button>
      </div>
    </div>
  );

  // If in dropdown mode, return content without WidgetCard wrapper
  if (isDropdown) {
    return content;
  }

  // Otherwise, return with WidgetCard wrapper
  return (
    <WidgetCard
      id="bio-status"
      title="Bio & Status"
      icon="👤"
      onRemove={onRemove}
      className="h-full"
    >
      {content}
    </WidgetCard>
  );
};

export default BioStatusWidget;