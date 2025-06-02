import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronRight, MousePointer2, Command, Sparkles } from 'lucide-react';

const WelcomeOverlay = ({ hackerMode }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-3xl mx-auto px-8 text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.h1 
            className={`text-6xl md:text-8xl font-bold mb-6 ${
              hackerMode ? 'text-[#00ff00]' : 'bg-gradient-to-r from-accent-pink to-accent-cyan bg-clip-text text-transparent'
            }`}
            animate={{ 
              backgroundPosition: hackerMode ? '0% 50%' : ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: '200% 200%' }}
          >
            Hi, I'm Saksham
          </motion.h1>

          <motion.p 
            className={`text-xl md:text-2xl mb-8 ${
              hackerMode ? 'text-[#00ff00]/80' : 'text-white/80'
            }`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Welcome to my Portfolio OS
          </motion.p>

          {showContent && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className={`space-y-4 ${hackerMode ? 'text-[#00ff00]/60' : 'text-white/60'}`}
            >
              <p className="text-lg">
                This isn't just a portfolio—it's an interactive operating system where you can:
              </p>
              
              <div className="flex flex-col items-center space-y-3 mt-6">
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <MousePointer2 size={20} />
                  <span>Click on dock apps to explore my work</span>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.7 }}
                >
                  <Command size={20} />
                  <span>Press Ctrl+H for hacker mode</span>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.9 }}
                >
                  <Sparkles size={20} />
                  <span>Drag windows, check widgets, and discover more</span>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                className="mt-8"
              >
                <p className="text-sm italic">
                  Senior Product Designer • 6+ Years Experience • FinTech & Digital Products
                </p>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeOverlay;
