import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const DockIcon = ({ app, onClick, isOpen, isMobile }) => {
  const ref = useRef(null);
  const distance = useMotionValue(150);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    distance.set(150);
  }, [distance]);

  const handleMouseMove = (e) => {
    if (!isMobile && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const dist = Math.abs(centerX - e.clientX);
      distance.set(dist);
    }
  };

  const springConfig = { damping: 15, stiffness: 400, mass: 0.3 };
  const distanceSpring = useSpring(distance, springConfig);
  
  const scale = useTransform(distanceSpring, [0, 100], [1.4, 1]);
  const translateY = useTransform(distanceSpring, [0, 100], [-15, 0]);

  // Mobile size (smaller icons)
  const iconSize = isMobile ? 'w-10 h-10' : 'w-12 h-12';

  return (
    <motion.div
      ref={ref}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseLeave={() => {
        if (!isMobile) {
          distance.set(150);
          setIsHovered(false);
        }
      }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      className="relative"
    >
      
      <motion.div
        style={{
          scale: isMobile ? 1 : scale,
          y: isMobile ? 0 : translateY,
        }}
        whileTap={{ scale: 0.9 }}
        className="relative cursor-pointer"
        initial={{ scale: 1, y: 0 }}
        onClick={onClick}
      >
        {/* Tooltip - properly centered */}
        {isHovered && !isMobile && (
          <div className="absolute bottom-full left-0 right-0 flex justify-center mb-2 pointer-events-none z-50">
            <motion.div
              className="bg-gray-800/95 backdrop-blur-xl text-white text-xs 
                         px-3 py-2 rounded-lg whitespace-nowrap
                         shadow-2xl border border-gray-700/50"
              initial={{ opacity: 0, y: 5, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {app.label}
            </motion.div>
          </div>
        )}
        {/* Icon container - Windows 11 style with better colors */}
        <div className={`
          ${iconSize} rounded-xl flex items-center justify-center
          transition-all duration-300 relative overflow-hidden
          ${isOpen 
            ? 'bg-white/20 backdrop-blur-2xl shadow-2xl' 
            : 'bg-gray-800/40 backdrop-blur-xl shadow-lg hover:bg-gray-700/50'
          }
        `}>
          {/* Selected state gradient effect */}
          {isOpen && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-accent-cyan/30 via-accent-pink/20 to-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
          
          {/* Glass effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/0 to-white/5 opacity-50" />
          
          {/* Icon with Windows 11 style */}
          <div className={`
            relative z-10 transition-all duration-200
            ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'}
            ${isMobile ? 'scale-90' : ''}
          `}>
            {app.icon}
          </div>

          {/* Hover glow effect (desktop only) */}
          {isHovered && !isOpen && !isMobile && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}

          {/* Selected state ring animation */}
          {isOpen && (
            <motion.div
              className="absolute inset-0 rounded-xl"
              initial={{ boxShadow: '0 0 0 0 rgba(15, 241, 206, 0.4)' }}
              animate={{ 
                boxShadow: [
                  '0 0 0 0 rgba(15, 241, 206, 0.4)',
                  '0 0 0 6px rgba(15, 241, 206, 0)',
                  '0 0 0 0 rgba(15, 241, 206, 0)'
                ]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          )}
        </div>        
        {/* Active indicator - Windows 11 style */}
        {isOpen && (
          <motion.div
            className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isMobile ? 16 : 24, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          >
            <div className="h-0.5 bg-gradient-to-r from-accent-cyan to-accent-pink rounded-full shadow-glow" />
          </motion.div>
        )}
      </motion.div>

      {/* Mobile label */}
      {isMobile && (
        <p className="text-[10px] text-gray-400 mt-1 text-center truncate max-w-[60px]">
          {app.label}
        </p>
      )}
    </motion.div>
  );
};

const Dock = ({ apps, openWindows, onAppClick }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={`fixed ${
      isMobile 
        ? 'bottom-0 left-0 right-0 px-4 pb-4 pt-2' 
        : 'bottom-8 left-1/2 transform -translate-x-1/2'
    } z-50`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`
          flex items-center ${isMobile ? 'justify-around' : 'gap-1.5'} 
          ${isMobile ? 'px-4' : 'px-3'} py-2 
          bg-gray-900/60 backdrop-blur-3xl
          border border-gray-700/30
          ${isMobile ? 'rounded-t-2xl' : 'rounded-2xl'} shadow-2xl
          relative
        `}
      >
        {/* Windows 11 style background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/20 to-gray-900/20 rounded-2xl pointer-events-none" />
        
        {/* Subtle inner glow */}
        <div className="absolute inset-[1px] bg-gradient-to-b from-white/5 to-transparent rounded-2xl pointer-events-none opacity-50" />
        
        {/* Dock icons */}
        {apps.map((app) => (
          <DockIcon
            key={app.id}
            app={app}
            onClick={() => onAppClick(app)}
            isOpen={openWindows.some(w => w.id === app.id)}
            isMobile={isMobile}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Dock;