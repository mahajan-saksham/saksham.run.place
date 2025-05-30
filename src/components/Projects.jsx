import { useState } from 'react';
import { motion } from 'framer-motion';
import NeonButton from './NeonButton';
import { portfolioData } from '../data/portfolioData';

const ProjectCard = ({ project, hackerMode, onClick }) => (
  <motion.div 
    className={`p-4 glass border rounded-lg transition-all cursor-pointer overflow-hidden ${
      hackerMode 
        ? 'border-accent-teal hover:shadow-lg' 
        : 'border-accent-cyan/30 hover:shadow-lg'
    }`}
    whileHover={{ scale: 1.02 }}
    onClick={onClick}
  >
    {/* Project Thumbnail */}
    <div className="aspect-video mb-4 rounded overflow-hidden bg-gradient-to-br from-accent-pink/10 to-accent-cyan/10">
      <img 
        src={project.thumbnail} 
        alt={project.title}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.parentElement.innerHTML = `
            <div class="w-full h-full flex items-center justify-center text-accent-cyan/50">
              <span class="text-4xl">🎨</span>
            </div>
          `;
        }}
      />
    </div>

    {/* Project Info */}
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <h3 className={`text-lg font-heading font-semibold ${
          hackerMode ? 'text-accent-teal' : 'text-white'
        }`}>
          {project.title}
        </h3>
        {project.featured && (
          <span className={`text-xs px-2 py-1 rounded ${
            hackerMode ? 'bg-accent-teal/20 text-accent-teal' : 'bg-gradient-to-r from-accent-pink/20 to-accent-cyan/20 text-white'
          }`}>
            Featured
          </span>
        )}
      </div>
      
      <p className="text-sm opacity-80 line-clamp-2 font-body">{project.description}</p>
      
      <div className="flex flex-wrap gap-2 mt-3">
        {project.tags.slice(0, 3).map((tag, i) => (
          <span 
            key={i}
            className={`px-2 py-1 rounded text-xs font-interactive ${
              hackerMode 
                ? 'bg-accent-teal/10 text-accent-teal border border-accent-teal/30'
                : 'bg-white/10 text-gray-300 border border-white/20'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const ProjectDetails = ({ project, hackerMode, onClose }) => (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <motion.div 
      className={`w-full max-w-4xl glass rounded-lg border ${
        hackerMode ? 'border-accent-teal' : 'border-accent-pink/30'
      } max-h-[90vh] overflow-hidden`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex justify-between items-start">
          <div>
            <h2 className={`text-3xl font-heading font-bold mb-2 ${
              hackerMode ? 'text-accent-teal' : 'gradient-text'
            }`}>
              {project.title}
            </h2>
            <p className={`text-sm font-body ${
              hackerMode ? 'text-accent-teal/70' : 'text-accent-cyan'
            }`}>
              {project.category}
            </p>
          </div>
          <button 
            onClick={onClose}
            className={`text-3xl ${
              hackerMode ? 'text-accent-teal' : 'text-white'
            } hover:opacity-80 transition-opacity`}
          >
            ×
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
        {/* Images Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="p-6 border-b border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((img, i) => (
                <div key={i} className="aspect-video rounded overflow-hidden bg-gradient-to-br from-accent-pink/10 to-accent-cyan/10">
                  <img 
                    src={img} 
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center text-accent-cyan/50">
                          <span class="text-4xl">🖼️</span>
                        </div>
                      `;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="p-6">
          <h3 className={`text-lg font-heading font-semibold mb-3 ${
            hackerMode ? 'text-accent-teal' : 'text-accent-pink'
          }`}>About this project</h3>
          <p className="font-body text-gray-300 leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, i) => (
              <span 
                key={i}
                className={`px-3 py-1 rounded text-sm font-interactive ${
                  hackerMode 
                    ? 'bg-accent-teal/10 text-accent-teal border border-accent-teal/30'
                    : 'bg-gradient-to-r from-accent-pink/10 to-accent-cyan/10 text-white border border-white/20'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            {project.link && (
              <NeonButton onClick={() => window.open(project.link, '_blank')}>
                View on Dribbble
              </NeonButton>
            )}
            <NeonButton onClick={onClose}>
              Close
            </NeonButton>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

const Projects = ({ hackerMode }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  
  const { projects } = portfolioData;
  
  const categories = ['all', ...new Set(projects.map(p => p.category))];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="h-full flex flex-col">
      {/* Filter Tabs */}
      <div className="p-4 border-b border-white/10">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-md text-sm font-interactive transition-all ${
                filter === cat
                  ? hackerMode 
                    ? 'bg-accent-teal text-black' 
                    : 'bg-gradient-to-r from-accent-pink to-accent-cyan text-white'
                  : hackerMode
                    ? 'bg-accent-teal/10 text-accent-teal hover:bg-accent-teal/20'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              hackerMode={hackerMode}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Project Modal */}
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