import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const MenuItem = ({ icon, label, onClick, isActive }) => (
  <motion.div
    className={`flex items-center gap-3 px-4 py-2 cursor-pointer transition-colors ${
      isActive ? 'bg-accent-pink/20' : 'hover:bg-white/10'
    }`}
    whileHover={{ x: 10 }}
    onClick={onClick}
  >
    <span className="text-xl">{icon}</span>
    <span className="font-interactive text-lg">{label}</span>
  </motion.div>
);

const StartMenu = ({ isOpen, onClose, onOpenProfile, onOpenProjects, onOpenCV, onOpenChatbot }) => {
  const [activeItem, setActiveItem] = useState(null);

  const menuItems = [
    { icon: '👤', label: 'Profile', onClick: onOpenProfile },
    { icon: '🚀', label: 'Projects', onClick: onOpenProjects },
    { icon: '📄', label: 'CV', onClick: onOpenCV },
    { icon: '🤖', label: 'AI Assistant', onClick: onOpenChatbot },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Menu */}
          <motion.div
            className="fixed bottom-12 left-4 w-64 glass rounded-lg shadow-lg overflow-hidden z-50"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-accent-pink to-accent-cyan p-4 border-b border-white/10">
              <h2 className="font-heading font-bold text-xl text-white">SYSTEM.exe</h2>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <MenuItem
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  onClick={() => {
                    setActiveItem(item.label);
                    item.onClick();
                  }}
                  isActive={activeItem === item.label}
                />
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 p-2">
              <div className="flex items-center gap-2 text-white/50 font-body text-sm">
                <span className="animate-pulse-subtle">⚡</span>
                <span>System v2.0.77</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default StartMenu;