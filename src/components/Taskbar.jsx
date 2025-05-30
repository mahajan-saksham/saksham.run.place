import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Taskbar = ({ openWindows, onWindowClick, onStartClick, isStartMenuOpen }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 h-12 glass border-t border-white/10 z-40"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <div className="h-full flex items-center justify-between px-2">
        {/* Start Button */}
        <motion.button
          className={`h-10 px-4 rounded-md font-interactive text-sm transition-all flex items-center gap-2 ${
            isStartMenuOpen 
              ? 'bg-white/20 text-white' 
              : 'bg-gradient-to-r from-accent-pink/20 to-accent-cyan/20 text-white hover:from-accent-pink/30 hover:to-accent-cyan/30'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartClick}
        >
          <span className="text-xl">🚀</span>
          <span>Start</span>
        </motion.button>

        {/* Open Windows */}
        <div className="flex-1 flex items-center gap-2 px-4 overflow-x-auto">
          {openWindows.map((window) => (
            <motion.button
              key={window.id}
              className="h-9 px-3 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm font-body transition-all flex items-center gap-2 min-w-[120px]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onWindowClick(window.id)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <span>{window.icon}</span>
              <span className="truncate">{window.title}</span>
            </motion.button>
          ))}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-3 px-3 text-sm font-body text-white/80">
          <div className="text-right">
            <div className="text-xs">{formatTime(currentTime)}</div>
            <div className="text-xs opacity-60">{formatDate(currentTime)}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Taskbar;