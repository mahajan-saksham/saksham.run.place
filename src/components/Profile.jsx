import { useState } from 'react';
import { motion } from 'framer-motion';
import NeonButton from './NeonButton';

const Profile = ({ profile, onImport }) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    if (!username.trim()) return;
    setLoading(true);
    try {
      await onImport(username);
      setUsername('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-6">
      {profile ? (
        <div className="flex flex-col items-center space-y-6">
          <motion.img
            src={profile.avatar}
            alt={profile.name}
            className="w-32 h-32 rounded-full border-4 border-cyber-blue shadow-neon"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="text-center space-y-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-orbitron text-cyber-yellow">{profile.name}</h2>
            <p className="text-cyber-blue">{profile.bio}</p>
          </motion.div>
          
          <motion.div
            className="flex flex-col items-center space-y-4 w-full max-w-md"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-full flex items-center space-x-4 bg-cyber-black/30 p-4 rounded-lg border border-cyber-blue/30">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Import another GitHub profile..."
                className="flex-1 bg-transparent border-b border-cyber-blue/30 px-2 py-1 focus:border-cyber-blue outline-none text-cyber-green placeholder-cyber-blue/50"
              />
              <NeonButton
                onClick={handleImport}
                disabled={loading || !username.trim()}
                className="min-w-[120px]"
              >
                {loading ? 'Importing...' : 'Import'}
              </NeonButton>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-2xl mt-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <StatCard label="Repositories" value={profile.repos} />
            <StatCard label="Followers" value={profile.followers} />
            <StatCard label="Following" value={profile.following} />
          </motion.div>
        </div>
      ) : (
        <motion.div
          className="flex-1 flex flex-col items-center justify-center space-y-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="w-full max-w-md space-y-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-orbitron text-cyber-yellow mb-2">GitHub Profile</h2>
              <p className="text-cyber-blue/70">Enter your GitHub username to import your profile</p>
            </div>
            <div className="flex items-center space-x-4 bg-cyber-black/30 p-4 rounded-lg border border-cyber-blue/30">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="GitHub username"
                className="flex-1 bg-transparent border-b border-cyber-blue/30 px-2 py-1 focus:border-cyber-blue outline-none text-cyber-green placeholder-cyber-blue/50"
              />
              <NeonButton
                onClick={handleImport}
                disabled={loading || !username.trim()}
                className="min-w-[120px]"
              >
                {loading ? 'Importing...' : 'Import'}
              </NeonButton>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <motion.div
    className="bg-cyber-black/30 p-4 rounded-lg border border-cyber-blue/30"
    whileHover={{ scale: 1.05 }}
  >
    <div className="text-center">
      <div className="text-2xl font-orbitron text-cyber-yellow mb-1">{value}</div>
      <div className="text-sm text-cyber-blue/70">{label}</div>
    </div>
  </motion.div>
);

export default Profile; 