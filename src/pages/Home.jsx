import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CyberTerminal from '../components/Terminal';
import Window from '../components/Window';
import NeonButton from '../components/NeonButton';
import StartMenu from '../components/StartMenu';
import { useSound } from '../hooks/useSound';
import { useGitHub } from '../hooks/useGitHub';
import '../styles/effects.css';
import Projects from '../components/Projects';

function Home() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showCV, setShowCV] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [hackerMode, setHackerMode] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [showCRT, setShowCRT] = useState(true);
  const [githubUsername, setGithubUsername] = useState('');
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { playSound } = useSound();
  const { fetchGitHubData, generatePortfolio } = useGitHub();

  // Handle Ctrl + H for Hacker Mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'h') {
        setHackerMode(prev => !prev);
        playSound('success');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleGitHubImport = async () => {
    if (!githubUsername) {
      playSound('error');
      setError('Please enter a GitHub username');
      return;
    }

    try {
      setLoading(true);
      playSound('click');
      
      const data = await fetchGitHubData(githubUsername);
      if (data) {
        const portfolio = generatePortfolio(data);
        setPortfolioData(portfolio);
        setError(null);
        playSound('success');
        setShowProjects(true); // Automatically open Projects window
      }
    } catch (err) {
      setError(err.message);
      playSound('error');
    } finally {
      setLoading(false);
    }
  };

  const toggleWindow = (setter) => {
    playSound('click');
    setter(prev => !prev);
  };

  return (
    <div className={`min-h-screen p-4 relative overflow-hidden transition-colors duration-500 ${
      hackerMode ? 'bg-[#001100] text-[#00ff00]' : 'bg-cyber-black text-white'
    }`}>
      {/* Effects */}
      <div className={`absolute inset-0 ${
        hackerMode ? 'bg-gradient-to-br from-[#003300]/10 to-[#00ff00]/5' :
        'bg-gradient-to-br from-cyber-blue/5 to-cyber-pink/5'
      }`} />
      <div className="absolute inset-0 bg-[url('/grid.png')] opacity-10" />
      {showCRT && (
        <>
          <div className="scanline" />
          <div className="crt" />
        </>
      )}

      <div className="relative max-w-7xl mx-auto">
        <motion.header 
          className="flex justify-between items-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl font-orbitron glitch"
            data-text="Cyberpunk Portfolio"
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => playSound('hover')}
          >
            Cyberpunk Portfolio
          </motion.h1>
          <div className="flex gap-4">
            <NeonButton 
              onClick={() => {
                playSound('click');
                setIsStartMenuOpen(!isStartMenuOpen);
              }}
            >
              {isStartMenuOpen ? 'Close Menu' : 'Start Menu'}
            </NeonButton>
            <NeonButton 
              onClick={() => {
                playSound('click');
                setShowCRT(!showCRT);
              }}
            >
              {showCRT ? 'Disable CRT' : 'Enable CRT'}
            </NeonButton>
          </div>
        </motion.header>

        <main className="relative min-h-[80vh]">
          <StartMenu
            isOpen={isStartMenuOpen}
            onClose={() => {
              playSound('close');
              setIsStartMenuOpen(false);
            }}
            onOpenTerminal={() => toggleWindow(setShowTerminal)}
            onOpenProfile={() => toggleWindow(setShowAbout)}
            onOpenProjects={() => toggleWindow(setShowProjects)}
            onOpenCV={() => toggleWindow(setShowCV)}
            onOpenChatbot={() => toggleWindow(setShowChatbot)}
          />

          {showTerminal && (
            <Window 
              title="Terminal" 
              defaultPosition={{ x: 50, y: 50 }}
              hackerMode={hackerMode}
              onClose={() => {
                playSound('close');
                setShowTerminal(false);
              }}
            >
              <CyberTerminal hackerMode={hackerMode} />
            </Window>
          )}

          {showAbout && (
            <Window 
              title="Profile.exe" 
              defaultPosition={{ x: 200, y: 100 }}
              defaultSize={{ width: 500, height: 400 }}
              hackerMode={hackerMode}
              onClose={() => {
                playSound('close');
                setShowAbout(false);
              }}
            >
              <div className="space-y-4 p-4">
                {portfolioData ? (
                  <>
                    <div className="flex items-center space-x-4">
                      <img 
                        src={portfolioData.profile.avatar} 
                        alt="Profile" 
                        className={`w-24 h-24 rounded-full border-2 ${
                          hackerMode ? 'border-[#00ff00]' : 'border-cyber-blue'
                        }`}
                      />
                      <div>
                        <h2 className={`text-xl font-orbitron ${
                          hackerMode ? 'text-[#00ff00]' : 'text-cyber-blue'
                        }`}>
                          {portfolioData.profile.name}
                        </h2>
                        <p className="opacity-80">{portfolioData.profile.bio}</p>
                      </div>
                    </div>
                    <div className={`grid grid-cols-3 gap-4 text-center p-4 rounded-lg ${
                      hackerMode ? 'bg-[#002200]' : 'bg-cyber-blue/10'
                    }`}>
                      <div>
                        <div className="text-2xl font-orbitron">{portfolioData.stats.repositories}</div>
                        <div className="text-sm opacity-80">Repositories</div>
                      </div>
                      <div>
                        <div className="text-2xl font-orbitron">{portfolioData.stats.commits}</div>
                        <div className="text-sm opacity-80">Commits</div>
                      </div>
                      <div>
                        <div className="text-2xl font-orbitron">{portfolioData.stats.pullRequests}</div>
                        <div className="text-sm opacity-80">Pull Requests</div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <NeonButton 
                        onClick={() => window.open(portfolioData.profile.githubUrl, '_blank')}
                      >
                        View on GitHub
                      </NeonButton>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${
                      hackerMode ? 'bg-[#002200]' : 'bg-cyber-blue/10'
                    }`}>
                      <h3 className={`text-lg font-orbitron mb-2 ${
                        hackerMode ? 'text-[#00ff00]' : 'text-cyber-blue'
                      }`}>
                        Import GitHub Profile
                      </h3>
                      <p className="mb-4 opacity-80">
                        Enter your GitHub username to automatically import your profile data and projects.
                      </p>
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Enter GitHub username"
                          className={`w-full bg-transparent border rounded p-2 focus:outline-none ${
                            hackerMode 
                              ? 'border-[#00ff00]/50 focus:border-[#00ff00]' 
                              : 'border-cyber-blue/50 focus:border-cyber-blue'
                          }`}
                          value={githubUsername}
                          onChange={(e) => setGithubUsername(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleGitHubImport();
                            }
                          }}
                        />
                        <div className="flex justify-between items-center">
                          <div>
                            {loading && (
                              <span className="text-sm opacity-80">
                                Importing profile data...
                              </span>
                            )}
                            {error && (
                              <span className={`text-sm ${
                                hackerMode ? 'text-red-400' : 'text-red-500'
                              }`}>
                                {error}
                              </span>
                            )}
                          </div>
                          <NeonButton 
                            onClick={handleGitHubImport}
                            disabled={loading}
                          >
                            {loading ? 'Loading...' : 'Import Profile'}
                          </NeonButton>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Window>
          )}

          {showProjects && (
            <Window 
              title="Projects.exe" 
              defaultPosition={{ x: 400, y: 150 }}
              defaultSize={{ width: 600, height: 500 }}
              hackerMode={hackerMode}
              onClose={() => {
                playSound('close');
                setShowProjects(false);
              }}
            >
              <Projects 
                projects={portfolioData?.projects} 
                hackerMode={hackerMode} 
              />
            </Window>
          )}

          {showCV && (
            <Window
              title="CV.exe"
              defaultPosition={{ x: 300, y: 100 }}
              defaultSize={{ width: 500, height: 600 }}
              hackerMode={hackerMode}
              onClose={() => {
                playSound('close');
                setShowCV(false);
              }}
            >
              <div className="space-y-4">
                <h2 className={`text-2xl font-orbitron ${
                  hackerMode ? 'text-[#00ff00]' : 'text-cyber-blue'
                }`}>
                  Digital Identity File
                </h2>
                <div className="border-t border-cyber-blue/30 pt-4">
                  <h3 className="text-lg font-vt323 mb-2">Experience</h3>
                  {/* Add your experience here */}
                </div>
                <div className="border-t border-cyber-blue/30 pt-4">
                  <h3 className="text-lg font-vt323 mb-2">Education</h3>
                  {/* Add your education here */}
                </div>
                <motion.button
                  className={`w-full p-2 mt-4 border rounded ${
                    hackerMode ? 'border-[#00ff00] hover:bg-[#00ff00]/10' :
                    'border-cyber-pink hover:bg-cyber-pink/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {/* Add download functionality */}}
                >
                  Download Memory Chip
                </motion.button>
              </div>
            </Window>
          )}

          {showChatbot && (
            <Window
              title="AI.exe"
              defaultPosition={{ x: 500, y: 150 }}
              defaultSize={{ width: 400, height: 500 }}
              hackerMode={hackerMode}
              onClose={() => {
                playSound('close');
                setShowChatbot(false);
              }}
            >
              <div className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Add chatbot messages here */}
                  <div className={`p-2 rounded-lg ${
                    hackerMode ? 'bg-[#003300]' : 'bg-cyber-blue/10'
                  }`}>
                    Hello, human. How can I assist you today?
                  </div>
                </div>
                <div className="p-4 border-t border-cyber-blue/30">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full bg-transparent border border-cyber-blue/50 rounded p-2 focus:outline-none focus:border-cyber-blue"
                  />
                </div>
              </div>
            </Window>
          )}
        </main>
      </div>
    </div>
  );
}

export default Home; 