import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, FileText, Mail, Code, Github } from 'lucide-react';
import Window from '../components/Window';
import MenuBar from '../components/MenuBar';
import Dock from '../components/Dock';
import DesktopIcon from '../components/DesktopIcon';
import StartMenu from '../components/StartMenu';
import Profile from '../components/Profile';
import Projects from '../components/Projects';
import CV from '../components/CV';
import Contact from '../components/Contact';
import Skills from '../components/Skills';
import { useSound } from '../hooks/useSound';
import { portfolioData } from '../data/portfolioData';

function Home() {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [hackerMode, setHackerMode] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [windowZIndex, setWindowZIndex] = useState(100);

  const { playSound } = useSound();

  // Handle Ctrl + H for Hacker Mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'h') {
        setHackerMode(prev => !prev);
        playSound('success');
      }
      // Close all windows on Escape
      if (e.key === 'Escape' && openWindows.length > 0) {
        setOpenWindows([]);
        playSound('close');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playSound, openWindows]);

  const desktopApps = [
    { id: 'profile', icon: <User size={24} />, label: 'About Me', component: Profile },
    { id: 'projects', icon: <Briefcase size={24} />, label: 'Projects', component: Projects },
    { id: 'cv', icon: <FileText size={24} />, label: 'Resume', component: CV },
    { id: 'contact', icon: <Mail size={24} />, label: 'Contact', component: Contact },
    { id: 'skills', icon: <Code size={24} />, label: 'Skills', component: Skills },
    { id: 'github', icon: <Github size={24} />, label: 'GitHub', component: null },
  ];  
  const openWindow = (app) => {
    if (app.id === 'github') {
      const githubUrl = portfolioData.profile.social.github || 'https://github.com';
      window.open(githubUrl, '_blank');
      playSound('open');
      return;
    }

    if (openWindows.find(w => w.id === app.id)) {
      focusWindow(app.id);
      return;
    }

    playSound('open');
    
    // Fixed window size for all windows
    const windowSize = { width: 600, height: 600 };
    
    // Center window on screen
    const centerX = Math.max(50, Math.floor((window.innerWidth - windowSize.width) / 2));
    const centerY = Math.max(50, Math.floor((window.innerHeight - windowSize.height) / 2));
    
    const newWindow = {
      id: app.id,
      title: app.label,
      icon: app.icon,
      component: app.component,
      zIndex: windowZIndex,
      defaultPosition: {  // Changed from 'position' to 'defaultPosition'
        x: centerX,
        y: centerY
      },
      defaultSize: windowSize  // Changed from 'size' to 'defaultSize'
    };

    setOpenWindows([...openWindows, newWindow]);
    setActiveWindowId(app.id);
    setWindowZIndex(prev => prev + 1);
  };

  const closeWindow = (windowId) => {
    playSound('close');
    setOpenWindows(openWindows.filter(w => w.id !== windowId));
    if (activeWindowId === windowId) {
      setActiveWindowId(null);
    }
  };
  const focusWindow = (windowId) => {
    setActiveWindowId(windowId);
    setOpenWindows(windows => 
      windows.map(w => ({
        ...w,
        zIndex: w.id === windowId ? windowZIndex : w.zIndex
      }))
    );
    setWindowZIndex(prev => prev + 1);
  };

  const minimizeWindow = (windowId) => {
    // For now, just close it. In future could add to dock
    closeWindow(windowId);
  };

  const updateWindowPosition = (windowId, position) => {
    setOpenWindows(windows =>
      windows.map(w =>
        w.id === windowId ? { ...w, defaultPosition: position } : w
      )
    );
  };

  const updateWindowSize = (windowId, size) => {
    setOpenWindows(windows =>
      windows.map(w =>
        w.id === windowId ? { ...w, defaultSize: size } : w
      )
    );
  };

  const activeWindowTitle = openWindows.find(w => w.id === activeWindowId)?.title || '';

  return (
    <div className={`h-screen overflow-hidden ${
      hackerMode ? 'bg-[#001100] text-[#00ff00]' : 'bg-black text-white'
    }`}>
      {/* MenuBar - macOS style top bar */}
      <MenuBar activeWindow={activeWindowTitle} hackerMode={hackerMode} />

      {/* Background */}
      <div className={`absolute inset-0 ${
        hackerMode ? 'bg-gradient-to-br from-[#003300]/10 to-[#00ff00]/5' : 
        'bg-gradient-to-br from-accent-pink/5 to-accent-cyan/5'
      }`} />

      {/* Main content area with padding for menubar and dock */}
      <div className="relative h-screen pt-7 pb-24">
        {/* Desktop Icons Removed - Clean desktop */}
        
        {/* Windows */}
        <AnimatePresence>
          {openWindows.map(window => (
            <Window
              key={window.id}
              id={window.id}
              title={window.title}
              icon={window.icon}
              defaultPosition={window.defaultPosition}
              defaultSize={window.defaultSize}
              onClose={() => closeWindow(window.id)}
              onFocus={() => focusWindow(window.id)}
              onMinimize={() => minimizeWindow(window.id)}
              onUpdatePosition={updateWindowPosition}
              onUpdateSize={updateWindowSize}
              zIndex={window.zIndex}
              isActive={window.id === activeWindowId}
              hackerMode={hackerMode}
            >
              {window.component && <window.component />}
            </Window>
          ))}
        </AnimatePresence>
      </div>

      {/* Dock - Bottom bar */}
      <Dock 
        apps={desktopApps}
        openWindows={openWindows}
        onAppClick={openWindow}
      />

      {/* Start Menu */}
      <AnimatePresence>
        {isStartMenuOpen && (
          <StartMenu 
            onClose={() => setIsStartMenuOpen(false)}
            onOpenApp={openWindow}
            apps={desktopApps}
            hackerMode={hackerMode}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;