import { useState } from 'react';
import { Rnd } from 'react-rnd';
import { motion } from 'framer-motion';

const Window = ({ title, children, defaultPosition = { x: 0, y: 0 }, defaultSize = { width: 400, height: 300 } }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [zIndex, setZIndex] = useState(10);

  const bringToFront = () => {
    setZIndex(prev => Math.max(prev, 10) + 1);
  };

  return (
    <Rnd
      default={{
        x: defaultPosition.x,
        y: defaultPosition.y,
        width: defaultSize.width,
        height: defaultSize.height,
      }}
      minWidth={200}
      minHeight={200}
      dragHandleClassName="window-handle"
      bounds="parent"
      className={`${isMinimized ? 'hidden' : ''} group`}
      style={{ zIndex }}
      onMouseDown={bringToFront}
    >
      <motion.div 
        className="w-full h-full bg-cyber-black border border-cyber-blue shadow-neon rounded-lg overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="window-handle flex items-center justify-between p-2 bg-cyber-black border-b border-cyber-blue cursor-move">
          <h3 className="text-cyber-blue font-tech text-sm select-none">{title}</h3>
          <div className="flex gap-2">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-3 h-3 rounded-full bg-cyber-yellow hover:shadow-neon transition-shadow duration-200"
            />
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-3 h-3 rounded-full bg-cyber-pink hover:shadow-neon-pink transition-shadow duration-200"
            />
          </div>
        </div>
        <div className="p-4 text-cyber-blue font-tech overflow-auto">
          {children}
        </div>
      </motion.div>
    </Rnd>
  );
};

export default Window; 