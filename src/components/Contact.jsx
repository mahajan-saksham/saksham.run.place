import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Contact = ({ hackerMode }) => {
  const { profile } = portfolioData;

  const contactMethods = [
    {
      icon: '📧',
      label: 'Email',
      value: profile.email,
      link: `mailto:${profile.email}`,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '📱',
      label: 'Phone',
      value: profile.phone,
      link: `tel:${profile.phone}`,
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      link: profile.social.linkedin,
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: '🎨',
      label: 'Dribbble',
      value: 'View my work',
      link: profile.social.dribbble,
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: '🎯',
      label: 'Behance',
      value: 'Creative portfolio',
      link: profile.social.behance,
      color: 'from-blue-500 to-indigo-600'
    }
  ];

  return (
    <div className="h-full p-6 overflow-y-auto">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className={`text-3xl font-heading font-bold mb-2 ${
            hackerMode ? 'text-accent-teal' : 'gradient-text'
          }`}>
            Let's Connect
          </h2>
          <p className="font-body text-gray-300">
            Feel free to reach out for collaborations or just a friendly hello!
          </p>
        </motion.div>

        {/* Contact Methods Grid */}
        <div className="grid gap-4">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.label}
              href={method.link}
              target={method.link.startsWith('http') ? '_blank' : undefined}
              rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                glass p-6 rounded-lg border transition-all
                ${hackerMode 
                  ? 'border-accent-teal/30 hover:border-accent-teal/50' 
                  : 'border-white/20 hover:border-white/30'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div className={`
                  w-12 h-12 rounded-lg bg-gradient-to-br ${method.color}
                  flex items-center justify-center text-2xl text-white
                `}>
                  {method.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`font-heading font-semibold ${
                    hackerMode ? 'text-accent-teal' : 'text-white'
                  }`}>
                    {method.label}
                  </h3>
                  <p className="font-body text-sm text-gray-300">
                    {method.value}
                  </p>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`
            glass p-6 rounded-lg border text-center
            ${hackerMode ? 'border-accent-teal/30' : 'border-white/20'}
          `}
        >
          <span className="text-2xl mb-2 block">📍</span>
          <p className={`font-heading font-semibold ${
            hackerMode ? 'text-accent-teal' : 'text-white'
          }`}>
            {profile.location}
          </p>
          <p className="font-body text-sm text-gray-300 mt-1">
            Available for remote opportunities worldwide
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;