import { motion } from 'framer-motion';
import { Monitor, Folder, Mail, Gamepad2 } from 'lucide-react';

const WelcomeMessage = ({ hackerMode }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-2xl w-full px-8 text-center pointer-events-auto"
      >
        <div className={`
          backdrop-blur-sm rounded-2xl p-8 
          ${hackerMode 
            ? 'bg-[#001100]/80 border border-[#00ff00]/30 shadow-[0_0_30px_rgba(0,255,0,0.3)]' 
            : 'bg-black/60 border border-gray-700/50 shadow-2xl'
          }
        `}>
          <motion.h1 
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              hackerMode ? 'text-[#00ff00] font-mono' : 'bg-gradient-to-r from-accent-pink to-accent-cyan bg-clip-text text-transparent'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {hackerMode ? '> SYSTEM INITIALIZED_' : 'Hi, I\'m Saksham'}
          </motion.h1>
          
          <motion.p 
            className={`text-lg md:text-xl mb-8 ${
              hackerMode ? 'text-[#00ff00]/90 font-mono' : 'text-gray-300'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {hackerMode 
              ? '// Welcome to my digital workspace. Access granted.'
              : 'Welcome to my portfolio OS! Feel free to explore my work and projects.'
            }
          </motion.p>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { icon: Monitor, label: 'About Me', color: hackerMode ? 'text-[#00ff00]' : 'text-accent-pink' },
              { icon: Folder, label: 'Projects', color: hackerMode ? 'text-[#00ff00]' : 'text-accent-cyan' },
              { icon: Mail, label: 'Contact', color: hackerMode ? 'text-[#00ff00]' : 'text-accent-yellow' },
              { icon: Gamepad2, label: 'Skills', color: hackerMode ? 'text-[#00ff00]' : 'text-accent-purple' }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className={`relative group flex flex-col items-center p-4 rounded-lg ${
                  hackerMode ? 'bg-[#00ff00]/10' : 'bg-white/5'
                } backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Hover tooltip */}
                <div className={`
                  absolute -top-8 left-1/2 transform -translate-x-1/2 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200
                  ${hackerMode ? 'bg-[#00ff00]/90 text-black' : 'bg-gray-800/95 text-white'}
                  text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none
                `}>
                  Open {item.label}
                </div>
                
                <item.icon className={`w-8 h-8 mb-2 ${item.color} transition-transform duration-300 group-hover:scale-110`} />
                <span className={`text-sm ${hackerMode ? 'text-[#00ff00]/80' : 'text-gray-300'}`}>
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className={`text-sm mt-6 ${hackerMode ? 'text-[#00ff00]/70' : 'text-gray-400'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {hackerMode ? '> Click icons in dock to execute programs_' : 'Click the icons in the dock below to start exploring!'}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeMessage;