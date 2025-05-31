import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Circle, Coffee, Code, Gamepad2 } from 'lucide-react';
import WidgetCard from './WidgetCard';

const BioStatusWidget = ({ onRemove }) => {
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

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: timezone
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      timeZone: timezone
    });
  };

  return (
    <WidgetCard 
      title="Bio & Status" 
      icon={<Circle className="w-5 h-5" />}
      onRemove={onRemove}
      className="bio-status-widget"
    >
      <div className="space-y-4">
        {/* Status Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-white/60">Current Status</h3>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${statuses[status].color} animate-pulse`}></div>
              <span className="text-sm font-medium">{statuses[status].text}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-white/80">
            {activities[activity].icon}
            <span>{activities[activity].text}</span>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <p className="text-white/90 font-mono text-sm leading-relaxed min-h-[3rem]">
            {typingText}
            <span className="animate-pulse">|</span>
          </p>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-3 text-sm text-white/70">
              <MapPin className="w-4 h-4" />
              <span>Bengaluru, India</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-white/70">
              <Clock className="w-4 h-4" />
              <div>
                <div className="font-medium">{formatTime(currentTime)}</div>
                <div className="text-xs text-white/50">{formatDate(currentTime)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setStatus('available')}
            className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
              status === 'available' 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
            }`}
          >
            Available
          </button>
          <button
            onClick={() => setStatus('busy')}
            className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
              status === 'busy' 
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
            }`}
          >
            Busy
          </button>
          <button
            onClick={() => setStatus('away')}
            className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
              status === 'away' 
                ? 'bg-gray-500/20 text-gray-400 border border-gray-500/30' 
                : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
            }`}
          >
            Away
          </button>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <a 
            href="https://linkedin.com/in/mahajansaksham" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors"
          >
            <span className="text-xs">LinkedIn</span>
          </a>
          <a 
            href="https://github.com/mahajansaksham" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors"
          >
            <span className="text-xs">GitHub</span>
          </a>
          <a 
            href="mailto:sakshammahajan1997@gmail.com"
            className="text-white/60 hover:text-white transition-colors"
          >
            <span className="text-xs">Email</span>
          </a>
        </div>
      </div>
    </WidgetCard>
  );
};

export default BioStatusWidget;