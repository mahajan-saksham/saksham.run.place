import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MenuBar = ({ activeWindow, hackerMode }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isWifiConnected, setIsWifiConnected] = useState(true);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get battery level (if available)
  useEffect(() => {
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        setBatteryLevel(Math.round(battery.level * 100));
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
      });
    }
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-7 z-[9999] glass border-b border-white/10"
      initial={{ y: -30 }}
      animate={{ y: 0 }}      transition={{ type: 'spring', damping: 20 }}
    >
      <div className="h-full flex items-center justify-between px-4 text-sm">
        {/* Left Section - Logo and App Name */}
        <div className="flex items-center gap-4">
          {/* Logo/Apple Icon */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`text-lg font-bold ${
              hackerMode ? 'text-accent-teal' : 'text-accent-pink'
            }`}
          >
            SM
          </motion.button>

          {/* Active App Name */}
          <span className={`font-medium ${
            hackerMode ? 'text-accent-teal' : 'text-white'
          }`}>
            {activeWindow || 'Portfolio OS'}
          </span>
        </div>

        {/* Right Section - System Tray */}
        <div className="flex items-center gap-4">
          {/* WiFi Icon */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="cursor-pointer"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              {isWifiConnected ? (
                <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
              ) : (
                <path d="M3.707 2.293a1 1 0 00-1.414 1.414l6.921 6.922c.05.062.105.118.168.167l6.91 6.911a1 1 0 001.415-1.414l-.675-.675a9.001 9.001 0 00-.668-11.982A1 1 0 1016 5.05a7.002 7.002 0 01.657 9.143l-1.435-1.435a5.002 5.002 0 00-.596-6.342 1 1 0 00-1.39 1.437 3.002 3.002 0 01.473 3.704L10 7.848 7.293 5.141a7.002 7.002 0 012.124-1.117 1 1 0 10-.504-1.936 9.001 9.001 0 00-2.922 1.608L3.707 2.293z" />
              )}
            </svg>
          </motion.div>

          {/* Battery Icon */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-1 cursor-pointer"
          >
            <div className="relative">
              <div className="w-6 h-3 border border-current rounded-sm">
                <div 
                  className={`h-full rounded-sm transition-all ${
                    batteryLevel > 20                       ? hackerMode ? 'bg-accent-teal' : 'bg-accent-cyan' 
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${batteryLevel}%` }}
                />
              </div>
              <div className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-current rounded-r-full" />
            </div>
            <span className="text-xs">{batteryLevel}%</span>
          </motion.div>

          {/* Date & Time */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span>{formatDate(currentTime)}</span>
            <span className="font-medium">{formatTime(currentTime)}</span>
          </motion.button>

          {/* Search/Spotlight Icon */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`p-1 rounded hover:bg-white/10 transition-colors ${
              hackerMode ? 'text-accent-teal' : 'text-accent-cyan'
            }`}
            title="Spotlight Search (Cmd+Space)"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuBar;