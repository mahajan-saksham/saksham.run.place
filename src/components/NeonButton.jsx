import { motion } from 'framer-motion';

const NeonButton = ({ children, onClick, className = '' }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`
        px-4 py-2
        font-interactive font-medium
        text-white
        bg-gradient-to-r from-accent-pink to-accent-cyan
        rounded-md
        shadow-medium
        hover:brightness-110
        hover:shadow-lg
        transition-all duration-300
        active:scale-95
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.button>
  );
};

export default NeonButton;