import { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { motion } from 'framer-motion';

const Window = ({ 
  id,
  title, 
  icon = '📄',
  children, 
  defaultPosition = { x: 0, y: 0 }, 
  defaultSize = { width: 400, height: 300 },
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

  // On mobile, windows are always fullscreen
  if (isMobile) {
    return (
      <motion.div
        className="fixed inset-0 z-50"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
      >
        <div className="w-full h-full glass flex flex-col">
          {/* Mobile Header */}
          <div className={`flex items-center justify-between p-4 border-b border-white/10`}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{icon}</span>
              <h3 className={`font-heading font-semibold text-lg ${
                hackerMode ? 'text-accent-teal' : 'text-white'
              }`}>{title}</h3>
            </div>
            <motion.button              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
          
          {/* Mobile Content */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </div>
      </motion.div>
    );
  }

  // Desktop Window
  return (
    <Rnd
      default={{
        x: defaultPosition.x,
        y: defaultPosition.y,
        width: isMaximized ? window.innerWidth : defaultSize.width,
        height: isMaximized ? window.innerHeight - 48 : defaultSize.height,
      }}
      minWidth={300}
      minHeight={200}
      dragHandleClassName="window-handle"
      bounds="parent"
      className={`${isMinimized ? 'hidden' : ''} group`}
      style={{ zIndex }}
      onMouseDown={onFocus}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
    >
      <motion.div 
        className={`w-full h-full glass rounded-lg border ${
          isActive
            ? 'border-white/20'
            : 'border-white/10'
        } overflow-hidden flex flex-col transition-all duration-300`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Window Header */}
        <div className={`window-handle flex items-center justify-between p-2 border-b border-white/10 cursor-move flex-shrink-0 ${          hackerMode 
            ? 'bg-[#001100]/50' 
            : 'bg-gradient-to-r from-accent-pink/20 to-accent-cyan/20'
        }`}>
          <div className="flex items-center gap-2">
            <span className="text-lg">{icon}</span>
            <h3 className={`font-heading font-semibold text-sm select-none ${
              hackerMode ? 'text-accent-teal' : 'text-white'
            }`}>{title}</h3>
          </div>
          <div className="flex gap-1">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
            />
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
            />
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
            />
          </div>
        </div>
        
        {/* Window Content - Scrollable */}
        <div className="flex-1 overflow-auto font-body">
          {children}
        </div>
      </motion.div>
    </Rnd>
  );
};

export default Window;