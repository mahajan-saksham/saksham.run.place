import { motion } from 'framer-motion';

const NeonButton = ({ children, onClick, className = '' }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`
        px-6 py-2 
        bg-cyber-black
        text-cyber-blue 
        border border-cyber-blue 
        shadow-neon
        font-tech
        rounded-lg
        hover:bg-cyber-blue/10
        hover:shadow-neon-pink
        transition-all duration-300
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