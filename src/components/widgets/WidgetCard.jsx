import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Settings, Maximize2, Minimize2 } from 'lucide-react';

const WidgetCard = ({ 
  id,
  title, 
  icon, 
  children, 
  className = '',
  onClose,
  onMinimize,
  isMinimized = false,
  hasSettings = false,
  onSettings,
  canResize = true,
  headerActions
}) => {
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <motion.div 
      className={`
        widget-card relative overflow-hidden rounded-xl
        bg-gray-900/60 backdrop-blur-2xl
        border border-gray-700/30
        shadow-2xl
        ${isMaximized ? 'fixed inset-4 z-50' : ''}
        ${className}
      `}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glass morphism effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Widget Header */}
      <div className="widget-header flex items-center justify-between p-3 border-b border-gray-700/30 cursor-move">
        <div className="flex items-center gap-2">
          <div className="text-lg">{icon}</div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
        </div>
        
        <div className="flex items-center gap-1">
          {headerActions}
          
          {hasSettings && (
            <button
              onClick={onSettings}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              title="Settings"
            >
              <Settings size={14} />
            </button>
          )}
          
          {canResize && (
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              title={isMaximized ? "Restore" : "Maximize"}
            >
              {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
          )}
          
          {onMinimize && (
            <button
              onClick={onMinimize}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              title="Minimize"
            >
              <Minus size={14} />
            </button>
          )}
          
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
              title="Close"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>
      
      {/* Widget Content */}
      <div className={`widget-content ${isMinimized ? 'hidden' : ''}`}>
        {children}
      </div>
    </motion.div>
  );
};

export default WidgetCard;