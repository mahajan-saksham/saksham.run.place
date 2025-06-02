import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WidgetDropdown = ({ widgetId, hackerMode, isMusicPlaying, setIsMusicPlaying }) => {
  // Import widget components dynamically
  const getWidgetComponent = () => {
    switch (widgetId) {
      case 'stats':
        return import('../widgets/VisitorStatsWidget');
      case 'social':
        return import('../widgets/SocialFeedWidget');
      case 'bio':
        return import('../widgets/BioStatusWidget');
      case 'music':
        return import('../widgets/MusicPlayerWidget');
      case 'github':
        return import('../widgets/GitHubActivityWidget');
      default:
        return null;
    }
  };

  const [WidgetComponent, setWidgetComponent] = useState(null);

  useEffect(() => {
    getWidgetComponent()?.then(module => {
      setWidgetComponent(() => module.default);
    });
  }, [widgetId]);

  // Get position of the widget icon
  const getDropdownPosition = () => {
    const button = document.querySelector(`[title="${getWidgetTitle(widgetId)}"]`);
    if (button) {
      const rect = button.getBoundingClientRect();
      return {
        top: rect.bottom + 12,
        right: window.innerWidth - rect.right
      };
    }
    return { top: 40, right: 20 };
  };

  const getWidgetTitle = (id) => {
    const titles = {
      stats: 'Visitor Stats',
      social: 'Social Feed',
      bio: 'Bio/Status',
      music: 'Music Player',
      github: 'GitHub Activity'
    };
    return titles[id] || '';
  };

  // Get widget accent color based on ID
  const getWidgetAccent = (id) => {
    const accents = {
      stats: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
      social: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
      bio: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
      music: 'from-orange-500/20 to-red-500/20 border-orange-500/30',
      github: 'from-gray-500/20 to-gray-600/20 border-gray-500/30'
    };
    return accents[id] || 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
  };

  const position = getDropdownPosition();
  const widgetAccent = getWidgetAccent(widgetId);

  return (
    <motion.div
      className="widget-dropdown fixed z-[9998]"
      style={{ top: position.top, right: position.right }}
      initial={{ opacity: 0, y: -15, scale: 0.9, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -10, scale: 0.95, filter: 'blur(5px)' }}
      transition={{ 
        duration: 0.25, 
        ease: [0.23, 1, 0.32, 1],
        opacity: { duration: 0.2 },
        scale: { duration: 0.3 }
      }}
    >
      {/* Backdrop blur effect */}
      <div className="absolute inset-0 -z-10 rounded-xl blur-2xl bg-gradient-to-br opacity-50"
           style={{ 
             background: hackerMode 
               ? 'radial-gradient(circle at top right, rgba(0, 255, 204, 0.3), transparent)' 
               : 'radial-gradient(circle at top right, rgba(255, 255, 255, 0.1), transparent)'
           }} 
      />
      
      <div className={`
        relative overflow-hidden rounded-xl
        ${hackerMode 
          ? 'bg-black/90 border border-accent-teal/20' 
          : `bg-gradient-to-br ${widgetAccent} backdrop-blur-2xl border`
        }
        shadow-2xl widget-dropdown-shadow
        max-w-sm min-w-[320px] max-h-[500px]
      `}>
        {/* Top gradient accent */}
        <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${
          hackerMode 
            ? 'from-transparent via-accent-teal to-transparent' 
            : 'from-transparent via-white/50 to-transparent'
        }`} />
        
        {/* Content wrapper with subtle inner shadow */}
        <div className="relative bg-black/40 backdrop-blur-sm">
          {WidgetComponent && (
            <motion.div 
              className="widget-dropdown-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <WidgetComponent 
                onRemove={() => {}} 
                isDropdown={true}
                hackerMode={hackerMode}
                isMusicPlaying={isMusicPlaying}
                setIsMusicPlaying={setIsMusicPlaying}
              />
            </motion.div>
          )}
        </div>
        
        {/* Bottom gradient accent */}
        <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${
          hackerMode 
            ? 'from-transparent via-accent-teal/50 to-transparent' 
            : 'from-transparent via-white/30 to-transparent'
        }`} />
      </div>
    </motion.div>
  );
};

export default WidgetDropdown;