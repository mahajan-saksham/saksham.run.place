import { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';

const Window = ({ 
  id,
  title, 
  icon,
  children, 
  defaultPosition = { x: 0, y: 0 }, 
  defaultSize = { width: 600, height: 600 },
  onClose,
  onFocus,
  zIndex,
  isActive,
  hackerMode 
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate centered position for desktop
  const getCenteredPosition = () => {
    if (typeof window === 'undefined') return defaultPosition;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const windowWidth = defaultSize.width;
    const windowHeight = defaultSize.height;
    
    return {
      x: Math.max(0, (screenWidth - windowWidth) / 2),
      y: Math.max(0, (screenHeight - windowHeight) / 2 - 50)
    };
  };

  const [position] = useState(() => getCenteredPosition());

  // On mobile, windows are always fullscreen
  if (isMobile) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 500 }}
        >          <div className="w-full h-full glass flex flex-col">
            {/* Mobile Header */}
            <div className={`flex items-center justify-between p-4 border-b ${
              hackerMode ? 'border-accent-teal/20' : 'border-white/10'
            }`}>
              <div className="flex items-center gap-3">
                <div className="text-2xl">{icon}</div>
                <h3 className={`font-heading font-semibold text-lg ${
                  hackerMode ? 'text-accent-teal' : 'text-white'
                }`}>{title}</h3>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  hackerMode 
                    ? 'hover:bg-accent-teal/20 text-accent-teal' 
                    : 'hover:bg-white/10 text-white'
                }`}
              >
                <X size={20} />
              </motion.button>
            </div>
            
            {/* Mobile Content */}
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Desktop implementation
  if (isMinimized) return null;

  return (
    <Rnd
      default={{
        ...position,
        ...defaultSize
      }}
      minWidth={400}
      minHeight={300}
      bounds="window"
      style={{ zIndex }}
      onMouseDown={onFocus}
      enableResizing={!isMaximized}
      disableDragging={isMaximized}
      size={isMaximized ? { width: '100vw', height: 'calc(100vh - 100px)' } : undefined}
      position={isMaximized ? { x: 0, y: 0 } : undefined}
    >      <motion.div
        className={`w-full h-full glass rounded-lg shadow-2xl flex flex-col overflow-hidden ${
          isActive 
            ? hackerMode 
              ? 'ring-2 ring-accent-teal/50' 
              : 'ring-2 ring-accent-cyan/30'
            : ''
        }`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Window Header */}
        <div className={`flex items-center justify-between p-3 select-none cursor-move border-b ${
          hackerMode ? 'border-accent-teal/20 bg-black/30' : 'border-white/10 bg-white/5'
        }`}>
          <div className="flex items-center gap-2">
            <div className="text-lg">{icon}</div>
            <h3 className={`font-heading font-semibold text-sm ${
              hackerMode ? 'text-accent-teal' : 'text-white'
            }`}>{title}</h3>
          </div>
          
          {/* Window Controls */}
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setIsMinimized(true)}
              className={`p-1.5 rounded transition-colors ${
                hackerMode ? 'hover:bg-accent-teal/20' : 'hover:bg-white/10'
              }`}
            >
              <Minus size={14} />
            </button>
            <button 
              onClick={() => setIsMaximized(!isMaximized)}
              className={`p-1.5 rounded transition-colors ${
                hackerMode ? 'hover:bg-accent-teal/20' : 'hover:bg-white/10'
              }`}
            >
              {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            <button 
              onClick={onClose}
              className={`p-1.5 rounded transition-colors ${
                hackerMode ? 'hover:bg-red-500/20 text-red-400' : 'hover:bg-red-500/20 text-red-400'
              }`}
            >
              <X size={14} />
            </button>
          </div>
        </div>
        
        {/* Window Content */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </motion.div>
    </Rnd>
  );
};

export default Window;