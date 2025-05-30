import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Profile = ({ hackerMode }) => {
  const { profile, stats } = portfolioData;
  
  return (
    <div className="h-full flex flex-col p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-accent-cyan scrollbar-track-transparent">
      <div className="flex flex-col items-center space-y-6 max-w-2xl mx-auto w-full">
        {/* Avatar */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`w-32 h-32 rounded-full border-4 overflow-hidden ${
            hackerMode ? 'border-accent-teal' : 'border-accent-cyan'
          } ${hackerMode ? 'bg-[#001100]' : 'bg-deep-blue/20'}`}>
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `
                  <span class="text-4xl font-heading flex items-center justify-center w-full h-full">SM</span>
                `;
              }}
            />
          </div>
        </motion.div>
        
        {/* Name and Title */}
        <motion.div
          className="text-center space-y-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className={`text-2xl font-heading font-bold ${
            hackerMode ? 'text-accent-teal' : 'gradient-text'
          }`}>{profile.name}</h2>
          <p className={`text-lg font-body ${
            hackerMode ? 'text-accent-teal/80' : 'text-accent-cyan'
          }`}>{profile.title}</p>
          <p className={`text-sm font-body ${
            hackerMode ? 'text-accent-teal/60' : 'text-gray-400'
          }`}>{profile.location}</p>
        </motion.div>
        
        {/* Bio */}
        <motion.div
          className="text-center max-w-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className={`text-sm leading-relaxed font-body ${
            hackerMode ? 'text-accent-teal/80' : 'text-gray-300'
          }`}>
            {profile.bio}
          </p>
        </motion.div>
        
        {/* Stats */}
        <motion.div
          className={`grid grid-cols-3 gap-4 w-full max-w-md p-4 rounded-lg glass ${
            hackerMode ? 'bg-accent-teal/10' : ''
          }`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center">
            <div className={`text-2xl font-heading font-bold ${
              hackerMode ? 'text-accent-teal' : 'gradient-text'
            }`}>{stats.projects}</div>
            <div className="text-sm opacity-80 font-body">Projects</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-heading font-bold ${
              hackerMode ? 'text-accent-teal' : 'gradient-text'
            }`}>{stats.experience}</div>
            <div className="text-sm opacity-80 font-body">Experience</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-heading font-bold ${
              hackerMode ? 'text-accent-teal' : 'gradient-text'
            }`}>{stats.companies}</div>
            <div className="text-sm opacity-80 font-body">Companies</div>
          </div>
        </motion.div>
        
        {/* Contact Info */}
        <motion.div
          className="w-full max-w-md space-y-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className={`text-sm font-heading font-semibold mb-2 ${
            hackerMode ? 'text-accent-teal' : 'text-accent-pink'
          }`}>CONTACT</h3>
          
          <a 
            href={`mailto:${profile.email}`}
            className={`flex items-center gap-2 text-sm font-body transition-colors ${
              hackerMode 
                ? 'text-accent-teal/80 hover:text-accent-teal' 
                : 'text-gray-300 hover:text-accent-cyan'
            }`}
          >
            <span>📧</span> {profile.email}
          </a>
          
          <a 
            href={`tel:${profile.phone}`}
            className={`flex items-center gap-2 text-sm font-body transition-colors ${
              hackerMode 
                ? 'text-accent-teal/80 hover:text-accent-teal' 
                : 'text-gray-300 hover:text-accent-cyan'
            }`}
          >
            <span>📱</span> {profile.phone}
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="w-full max-w-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className={`text-sm font-heading font-semibold mb-3 ${
            hackerMode ? 'text-accent-teal' : 'text-accent-pink'
          }`}>SOCIAL</h3>
          
          <div className="grid grid-cols-2 gap-2">
            {profile.social.linkedin && (
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 rounded-md text-sm text-center font-interactive transition-all ${
                  hackerMode 
                    ? 'bg-accent-teal/10 text-accent-teal hover:bg-accent-teal/20' 
                    : 'bg-gradient-to-r from-accent-pink/20 to-accent-cyan/20 text-white hover:from-accent-pink/30 hover:to-accent-cyan/30'
                }`}
              >
                LinkedIn
              </a>
            )}
            
            {profile.social.dribbble && (
              <a
                href={profile.social.dribbble}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 rounded-md text-sm text-center font-interactive transition-all ${
                  hackerMode 
                    ? 'bg-accent-teal/10 text-accent-teal hover:bg-accent-teal/20' 
                    : 'bg-gradient-to-r from-accent-cyan/20 to-accent-teal/20 text-white hover:from-accent-cyan/30 hover:to-accent-teal/30'
                }`}
              >
                Dribbble
              </a>
            )}
            
            {profile.social.behance && (
              <a
                href={profile.social.behance}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 rounded-md text-sm text-center font-interactive transition-all ${
                  hackerMode 
                    ? 'bg-accent-teal/10 text-accent-teal hover:bg-accent-teal/20' 
                    : 'bg-gradient-to-r from-accent-pink/20 to-accent-teal/20 text-white hover:from-accent-pink/30 hover:to-accent-teal/30'
                }`}
              >
                Behance
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;