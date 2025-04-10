import { useState } from 'react';
import { motion } from 'framer-motion';
import NeonButton from './NeonButton';

const ProjectCard = ({ project, hackerMode, onClick }) => (
  <motion.div 
    className={`p-4 border rounded-lg transition-shadow cursor-pointer ${
      hackerMode 
        ? 'border-[#00ff00] hover:shadow-[0_0_10px_#00ff00]' 
        : 'border-cyber-blue hover:shadow-neon'
    }`}
    whileHover={{ scale: 1.02 }}
    onClick={onClick}
  >
    <div className="flex justify-between items-start">
      <h3 className={`text-lg font-orbitron mb-2 ${
        hackerMode ? 'text-[#00ff00]' : 'text-cyber-yellow'
      }`}>
        {project.name}
      </h3>
      <div className="flex items-center space-x-2">
        <span className="text-sm">⭐</span>
        <span className="text-sm">{project.stars}</span>
      </div>
    </div>
    <p className="text-sm opacity-80 mb-3">{project.description}</p>
    <div className="flex flex-wrap gap-2">
      {project.languages.map((lang, i) => (
        <span 
          key={i}
          className="px-2 py-1 rounded text-xs"
          style={{ 
            backgroundColor: `${lang.color}20`, 
            color: lang.color,
            border: `1px solid ${lang.color}40`
          }}
        >
          {lang.name}
        </span>
      ))}
    </div>
  </motion.div>
);

const ProjectDetails = ({ project, hackerMode, onClose }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <motion.div 
      className={`w-full max-w-2xl p-6 rounded-lg ${
        hackerMode ? 'bg-[#001100]' : 'bg-cyber-black'
      } border ${
        hackerMode ? 'border-[#00ff00]' : 'border-cyber-blue'
      }`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className={`text-2xl font-orbitron ${
          hackerMode ? 'text-[#00ff00]' : 'text-cyber-blue'
        }`}>
          {project.name}
        </h2>
        <button 
          onClick={onClose}
          className={`text-2xl ${
            hackerMode ? 'text-[#00ff00]' : 'text-cyber-blue'
          } hover:opacity-80`}
        >
          ×
        </button>
      </div>

      <div className="space-y-4">
        <p className="opacity-80">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.languages.map((lang, i) => (
            <span 
              key={i}
              className="px-3 py-1 rounded"
              style={{ 
                backgroundColor: `${lang.color}20`, 
                color: lang.color,
                border: `1px solid ${lang.color}40`
              }}
            >
              {lang.name}
            </span>
          ))}
        </div>

        <div className={`p-4 rounded ${
          hackerMode ? 'bg-[#002200]' : 'bg-cyber-blue/10'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="opacity-80">Stars</span>
            <span className="font-orbitron">⭐ {project.stars}</span>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <NeonButton onClick={() => window.open(project.url, '_blank')}>
            View on GitHub
          </NeonButton>
          <NeonButton onClick={onClose}>
            Close
          </NeonButton>
        </div>
      </div>
    </motion.div>
  </div>
);

const Projects = ({ projects, hackerMode }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [zIndex, setZIndex] = useState(10);

  const bringToFront = () => {
    setZIndex(prev => Math.max(prev, 10) + 1);
  };

  if (!projects?.length) {
    return (
      <div className="h-full flex items-center justify-center opacity-60">
        Import your GitHub profile to see your projects
      </div>
    );
  }

  return (
    <div 
      className="h-full flex flex-col bg-cyber-black relative"
      style={{ zIndex }}
      onClick={bringToFront}
    >
      {/* Fixed Topbar */}
      <div className="window-handle flex items-center justify-between p-2 bg-cyber-black border-b border-cyber-blue">
        <h3 className="text-cyber-blue font-tech text-sm select-none">Projects.exe</h3>
        <div className="flex gap-2">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-3 h-3 rounded-full bg-cyber-yellow hover:shadow-neon transition-shadow duration-200"
          />
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-3 h-3 rounded-full bg-cyber-pink hover:shadow-neon-pink transition-shadow duration-200"
          />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-cyber-blue scrollbar-track-transparent">
        <div className="p-4 space-y-4">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              hackerMode={hackerMode}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          hackerMode={hackerMode}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default Projects; 