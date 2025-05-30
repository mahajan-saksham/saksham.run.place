import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const SkillCategory = ({ title, skills, color, hackerMode, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className={`glass p-6 rounded-lg border ${
      hackerMode ? 'border-accent-teal/30' : 'border-white/20'
    }`}
  >
    <h3 className={`text-lg font-heading font-semibold mb-4 ${
      hackerMode ? 'text-accent-teal' : color
    }`}>{title}</h3>
    <div className="space-y-3">
      {skills.map((skill, i) => (
        <div key={i}>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-body">{skill.name}</span>
            <span className="text-sm font-body opacity-60">{skill.level}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: delay + (i * 0.1) }}
              className={`h-full rounded-full ${
                hackerMode 
                  ? 'bg-accent-teal' 
                  : `bg-gradient-to-r ${color === 'text-accent-pink' ? 'from-accent-pink to-accent-cyan' : 
                     color === 'text-accent-cyan' ? 'from-accent-cyan to-accent-teal' :
                     'from-accent-pink to-accent-teal'}`
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const Skills = ({ hackerMode }) => {
  const { skills } = portfolioData;

  return (
    <div className="h-full p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className={`text-3xl font-heading font-bold mb-2 ${
            hackerMode ? 'text-accent-teal' : 'gradient-text'
          }`}>
            Skills & Expertise
          </h2>
          <p className="font-body text-gray-300">
            A comprehensive overview of my design and technical capabilities
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          <SkillCategory
            title="Design Skills"
            skills={skills.design}
            color="text-accent-pink"
            hackerMode={hackerMode}
            delay={0}
          />
          <SkillCategory
            title="Research Skills"
            skills={skills.research}
            color="text-accent-cyan"
            hackerMode={hackerMode}
            delay={0.2}
          />
          <SkillCategory
            title="Technical Skills"
            skills={skills.technical}
            color="text-accent-teal"
            hackerMode={hackerMode}
            delay={0.4}
          />
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`glass p-6 rounded-lg border mt-6 ${
            hackerMode ? 'border-accent-teal/30' : 'border-white/20'
          }`}
        >
          <h3 className={`text-lg font-heading font-semibold mb-4 ${
            hackerMode ? 'text-accent-teal' : 'text-accent-pink'
          }`}>Additional Competencies</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['Design Systems', 'Agile/Scrum', 'Workshop Facilitation', 
              'Stakeholder Management', 'Cross-functional Collaboration', 'Remote Work'].map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + (i * 0.05) }}
                className={`p-3 rounded-lg text-center font-body text-sm ${
                  hackerMode 
                    ? 'bg-accent-teal/10 text-accent-teal border border-accent-teal/30' 
                    : 'bg-white/10 text-white border border-white/20'
                }`}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;