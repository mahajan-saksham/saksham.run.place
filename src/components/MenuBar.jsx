import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Share2, User, Music, Github, Battery, Search, Moon, Sun } from 'lucide-react';
import WidgetDropdown from './widget-system/WidgetDropdown';

const MenuBar = ({ activeWindow, hackerMode }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [activeWidget, setActiveWidget] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  // Widget icons configuration with enhanced styling
  const widgetIcons = [
    { id: 'stats', icon: <BarChart3 size={16} />, title: 'Visitor Stats', color: 'from-purple-400 to-pink-400' },
    { id: 'social', icon: <Share2 size={16} />, title: 'Social Feed', color: 'from-blue-400 to-cyan-400' },
    { id: 'bio', icon: <User size={16} />, title: 'Bio/Status', color: 'from-green-400 to-emerald-400' },
    { id: 'music', icon: <Music size={16} />, title: 'Music Player', dynamic: true, color: 'from-orange-400 to-red-400' },
    { id: 'github', icon: <Github size={16} />, title: 'GitHub Activity', color: 'from-gray-400 to-gray-600' }
  ];

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

  const handleWidgetClick = (widgetId) => {
    if (activeWidget === widgetId) {
      setActiveWidget(null);
    } else {
      setActiveWidget(widgetId);
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.widget-dropdown') && !event.target.closest('.widget-icon-button')) {
        setActiveWidget(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 right-0 h-10 z-[9999] backdrop-blur-2xl ${
          hackerMode 
            ? 'bg-black/40 border-b border-accent-teal/30' 
            : 'bg-black/30 border-b border-white/10'
        } shadow-2xl`}
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Gradient overlay for enhanced visual effect */}
        <div className={`absolute inset-0 ${
          hackerMode 
            ? 'bg-gradient-to-r from-transparent via-accent-teal/5 to-transparent' 
            : 'bg-gradient-to-r from-transparent via-white/5 to-transparent'
        } ${isHovering ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} />
        
        <div className="h-full flex items-center justify-between px-4 text-sm relative">
          {/* Left Section - Logo and App Name */}
          <div className="flex items-center gap-4">
            {/* Enhanced Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group cursor-pointer"
            >
              <div className={`absolute inset-0 ${
                hackerMode 
                  ? 'bg-accent-teal/20 blur-xl' 
                  : 'bg-gradient-to-r from-accent-pink/20 to-accent-cyan/20 blur-xl'
              } group-hover:blur-2xl transition-all duration-300`} />
              
              <motion.div
                className={`relative px-3 py-1.5 rounded-lg font-bold text-sm tracking-wide ${
                  hackerMode 
                    ? 'bg-gradient-to-r from-accent-teal/10 to-accent-teal/5 text-accent-teal border border-accent-teal/20' 
                    : 'bg-gradient-to-r from-accent-pink/10 to-accent-cyan/10 text-white border border-white/20'
                }`}
                whileHover={{
                  boxShadow: hackerMode 
                    ? '0 0 20px rgba(0, 255, 204, 0.3)' 
                    : '0 0 20px rgba(255, 255, 255, 0.2)'
                }}
              >
                saksham.run.place
              </motion.div>
            </motion.div>
            
            {/* Active App Name with enhanced styling */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              key={activeWindow}
              className="flex items-center gap-2"
            >
              {activeWindow && (
                <>
                  <span className="text-white/40">›</span>
                  <span className={`font-medium ${
                    hackerMode ? 'text-accent-teal/90' : 'text-white/90'
                  }`}>
                    {activeWindow}
                  </span>
                </>
              )}
            </motion.div>
          </div>

          {/* Right Section - System Tray */}
          <div className="flex items-center gap-3">
            {/* Widget Icons with enhanced design */}
            <div className="flex items-center gap-1.5 mr-3 px-3 py-0.5 rounded-full bg-white/5">
              {widgetIcons.map((widget, index) => (
                <motion.button
                  key={widget.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleWidgetClick(widget.id)}
                  className={`widget-icon-button p-1.5 rounded-lg transition-all duration-200 relative group ${
                    activeWidget === widget.id 
                      ? hackerMode ? 'bg-accent-teal/20' : 'bg-white/15' 
                      : 'hover:bg-white/10'
                  }`}
                  title={widget.title}
                >
                  {/* Icon glow effect */}
                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${widget.color} opacity-0 group-hover:opacity-30 blur transition-opacity duration-200`} />
                  
                  <span className={`relative block ${
                    activeWidget === widget.id 
                      ? hackerMode ? 'text-accent-teal' : 'text-white'
                      : 'text-white/70 group-hover:text-white'
                  } transition-colors`}>
                    {widget.id === 'music' && isMusicPlaying ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      >
                        {widget.icon}
                      </motion.div>
                    ) : widget.icon}
                  </span>
                  
                  {/* Active indicator */}
                  <AnimatePresence>
                    {activeWidget === widget.id && (
                      <motion.div
                        className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                          hackerMode ? 'bg-accent-teal' : 'bg-white'
                        } shadow-glow`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>

            {/* System Status Icons */}
            <div className="flex items-center gap-3 px-2">
              {/* Battery Icon with enhanced design */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
              >
                <div className="relative">
                  <Battery size={18} className={`${
                    batteryLevel > 20 ? 'text-white/70' : 'text-red-400'
                  }`} />
                  <div 
                    className={`absolute inset-[2px] rounded-[2px] transition-all ${
                      batteryLevel > 20 
                        ? hackerMode ? 'bg-accent-teal/60' : 'bg-green-400/60' 
                        : 'bg-red-400/60'
                    }`}
                    style={{ width: `${batteryLevel * 0.7}%` }}
                  />
                </div>
                <span className={`text-xs font-medium ${
                  batteryLevel > 20 ? 'text-white/70' : 'text-red-400'
                }`}>{batteryLevel}%</span>
              </motion.div>

              {/* Date & Time with enhanced styling */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
              >
                <span className="text-white/60 text-xs">{formatDate(currentTime)}</span>
                <span className="font-medium text-white/90">{formatTime(currentTime)}</span>
              </motion.button>

              {/* Search/Spotlight Icon with enhanced design */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`p-1.5 rounded-lg transition-all ${
                  hackerMode 
                    ? 'text-accent-teal/70 hover:text-accent-teal hover:bg-accent-teal/10' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                } group relative`}
                title="Spotlight Search (⌘+Space)"
              >
                <Search size={16} />
                <div className={`absolute inset-0 rounded-lg ${
                  hackerMode ? 'bg-accent-teal/20' : 'bg-white/20'
                } blur-xl opacity-0 group-hover:opacity-50 transition-opacity`} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Widget Dropdown Panels */}
      <AnimatePresence>
        {activeWidget && (
          <WidgetDropdown
            widgetId={activeWidget}
            hackerMode={hackerMode}
            isMusicPlaying={isMusicPlaying}
            setIsMusicPlaying={setIsMusicPlaying}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default MenuBar;