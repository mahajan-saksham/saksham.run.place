import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CV = ({ username }) => {
  const [readme, setReadme] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zIndex, setZIndex] = useState(10);

  const bringToFront = () => {
    setZIndex(prev => Math.max(prev, 10) + 1);
  };

  useEffect(() => {
    const fetchReadme = async () => {
      if (!username) {
        setError('Please import a GitHub profile first');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Thử lấy README từ GitHub profile repository
        const response = await fetch(`https://raw.githubusercontent.com/${username}/${username}/master/README.md`);
        
        if (!response.ok) {
          // Nếu không có, thử lấy từ .github/profile/README.md
          const profileResponse = await fetch(`https://raw.githubusercontent.com/${username}/.github/master/profile/README.md`);
          
          if (!profileResponse.ok) {
            throw new Error('Could not fetch README');
          }
          
          const content = await profileResponse.text();
          setReadme(content);
          setError(null);
          return;
        }

        const content = await response.text();
        setReadme(content);
        setError(null);
      } catch (err) {
        console.error('Error fetching README:', err);
        setError('Could not load README.md from GitHub profile');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchReadme();
    }
  }, [username]);

  return (
    <div 
      className="h-full flex flex-col bg-cyber-black relative"
      style={{ zIndex }}
      onClick={bringToFront}
    >
      {/* Fixed Topbar */}
      <div className="window-handle flex items-center justify-between p-2 bg-cyber-black border-b border-cyber-blue">
        <h3 className="text-cyber-blue font-tech text-sm select-none">CV.exe</h3>
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
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-cyber-blue animate-pulse">Loading CV...</div>
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-cyber-pink">{error}</div>
          </div>
        ) : (
          <motion.div
            className="p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="prose prose-invert max-w-none prose-headings:text-cyber-yellow prose-a:text-cyber-blue hover:prose-a:text-cyber-blue/80">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={atomDark}
                        language={match[1]}
                        PreTag="div"
                        className="!bg-cyber-black/30 !border !border-cyber-blue/30 !rounded-lg"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className="bg-cyber-black/30 px-1 rounded" {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {readme}
              </ReactMarkdown>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CV; 