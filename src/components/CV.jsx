import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Eye, EyeOff } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import NeonButton from './NeonButton';

const CV = ({ hackerMode }) => {
  const [activeTab, setActiveTab] = useState('experience');
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const { experience, education, skills, certifications } = portfolioData;

  const tabs = [
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' }
  ];

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume/saksham-resume.pdf';
    link.download = 'Saksham_Mahajan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewPdf = () => {
    setShowPdfViewer(!showPdfViewer);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with Download Button */}
      <div className={`flex justify-between items-center p-4 border-b ${
        hackerMode ? 'border-accent-teal/30' : 'border-white/10'
      }`}>
        <div className="flex gap-2 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-interactive text-sm rounded-md transition-all ${
                activeTab === tab.id
                  ? hackerMode 
                    ? 'bg-accent-teal text-black'
                    : 'bg-gradient-to-r from-accent-pink to-accent-cyan text-white'
                  : hackerMode
                    ? 'text-accent-teal/60 hover:text-accent-teal hover:bg-accent-teal/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleViewPdf}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
              hackerMode
                ? 'bg-accent-teal/10 text-accent-teal hover:bg-accent-teal/20'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {showPdfViewer ? <EyeOff size={16} /> : <Eye size={16} />}
            {showPdfViewer ? 'Hide' : 'View'} PDF
          </button>
          <NeonButton onClick={handleDownloadResume}>
            <Download size={16} className="inline mr-2" />
            Download PDF
          </NeonButton>
        </div>
      </div>
      {/* PDF Viewer */}
      {showPdfViewer && (
        <div className="p-4 border-b border-white/10">
          {!pdfError ? (
            <iframe
              src="/resume/saksham-resume.pdf"
              className="w-full h-96 rounded-lg border border-white/10"
              title="Resume PDF"
              onError={() => setPdfError(true)}
            />
          ) : (
            <div className="w-full h-96 rounded-lg border border-white/10 bg-gray-800/50 flex flex-col items-center justify-center">
              <FileText className="w-16 h-16 text-gray-500 mb-4" />
              <p className="text-gray-400 mb-2">Resume PDF not found</p>
              <p className="text-sm text-gray-500">Please add your resume to:</p>
              <code className="text-xs bg-gray-700/50 px-2 py-1 rounded mt-1">/public/resume/saksham-resume.pdf</code>
            </div>
          )}
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass p-6 rounded-lg border ${
                  hackerMode ? 'border-accent-teal/30' : 'border-accent-cyan/30'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className={`text-xl font-heading font-semibold ${
                      hackerMode ? 'text-accent-teal' : 'gradient-text'
                    }`}>
                      {exp.position}
                    </h3>
                    <p className={`font-body ${
                      hackerMode ? 'text-accent-teal/80' : 'text-accent-pink'
                    }`}>
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-body opacity-80">{exp.duration}</p>
                    <p className="text-xs font-body opacity-60">{exp.location}</p>
                  </div>
                </div>                
                <p className="font-body text-gray-300 mb-4">{exp.description}</p>
                
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${
                        hackerMode ? 'bg-accent-teal' : 'bg-accent-cyan'
                      }`} />
                      <span className="text-sm font-body text-gray-300">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            {/* Design Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`glass p-6 rounded-lg border ${
                hackerMode ? 'border-accent-teal/30' : 'border-accent-cyan/30'
              }`}
            >
              <h3 className={`text-lg font-heading font-semibold mb-4 ${
                hackerMode ? 'text-accent-teal' : 'text-accent-pink'
              }`}>Design Skills</h3>
              <div className="space-y-3">
                {skills.design.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-body">{skill.name}</span>
                      <span className="text-sm font-body opacity-60">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={`h-full rounded-full ${
                          hackerMode 
                            ? 'bg-accent-teal' 
                            : 'bg-gradient-to-r from-accent-pink to-accent-cyan'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            {/* Research Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`glass p-6 rounded-lg border ${
                hackerMode ? 'border-accent-teal/30' : 'border-accent-cyan/30'
              }`}
            >
              <h3 className={`text-lg font-heading font-semibold mb-4 ${
                hackerMode ? 'text-accent-teal' : 'text-accent-pink'
              }`}>Research Skills</h3>
              <div className="space-y-3">
                {skills.research.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-body">{skill.name}</span>
                      <span className="text-sm font-body opacity-60">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={`h-full rounded-full ${
                          hackerMode 
                            ? 'bg-accent-teal' 
                            : 'bg-gradient-to-r from-accent-cyan to-accent-teal'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Technical Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`glass p-6 rounded-lg border ${
                hackerMode ? 'border-accent-teal/30' : 'border-accent-cyan/30'
              }`}
            >
              <h3 className={`text-lg font-heading font-semibold mb-4 ${
                hackerMode ? 'text-accent-teal' : 'text-accent-pink'
              }`}>Technical Skills</h3>              <div className="space-y-3">
                {skills.technical.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-body">{skill.name}</span>
                      <span className="text-sm font-body opacity-60">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={`h-full rounded-full ${
                          hackerMode 
                            ? 'bg-accent-teal' 
                            : 'bg-gradient-to-r from-accent-pink to-accent-teal'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass p-6 rounded-lg border ${
                  hackerMode ? 'border-accent-teal/30' : 'border-accent-cyan/30'
                }`}
              >
                <h3 className={`text-xl font-heading font-semibold ${
                  hackerMode ? 'text-accent-teal' : 'gradient-text'
                }`}>
                  {edu.degree}
                </h3>
                <p className={`font-body mb-2 ${
                  hackerMode ? 'text-accent-teal/80' : 'text-accent-pink'
                }`}>
                  {edu.field}
                </p>
                <p className="font-body text-gray-300">{edu.institution}</p>                <p className="text-sm font-body opacity-60 mt-2">
                  {edu.duration} • {edu.location}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`glass p-4 rounded-lg border ${
                  hackerMode ? 'border-accent-teal/30' : 'border-accent-cyan/30'
                }`}
              >
                <h4 className={`font-heading font-semibold ${
                  hackerMode ? 'text-accent-teal' : 'text-white'
                }`}>
                  {cert.name}
                </h4>
                <p className={`text-sm font-body mt-1 ${
                  hackerMode ? 'text-accent-teal/70' : 'text-accent-cyan'
                }`}>
                  {cert.issuer}
                </p>
                <p className="text-xs font-body opacity-60 mt-2">{cert.date}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CV;