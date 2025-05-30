import { motion } from 'framer-motion';

const DesktopIcon = ({ icon, label, onClick, isActive }) => {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 p-3 rounded-lg cursor-pointer select-none"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className={`
        w-16 h-16 rounded-lg glass
        flex items-center justify-center text-3xl
        transition-all duration-200
        ${isActive ? 'ring-2 ring-accent-cyan' : ''}
        hover:bg-white/10
      `}>
        {icon}
      </div>
      <span className="text-xs font-body text-white/80 text-center max-w-[80px]">
        {label}
      </span>
    </motion.div>
  );
};

export default DesktopIcon;