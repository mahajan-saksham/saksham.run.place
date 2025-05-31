import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, FileText, Mail, Code, Github, Layout } from 'lucide-react';
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
import { DesktopWidgets } from '../components/widgets';
import { useSound } from '../hooks/useSound';
import { useIsMobile } from '../hooks/useMobile';
import { portfolioData } from '../data/portfolioData';

function Home() {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [hackerMode, setHackerMode] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [windowZIndex, setWindowZIndex] = useState(100);
  const [showWidgets, setShowWidgets] = useState(false);

  const { playSound } = useSound();
  const isMobile = useIsMobile();

  // Handle Ctrl + H for Hacker Mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'h') {
        setHackerMode(prev => !prev);
        playSound('startup');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playSound]);
  // Desktop Apps configuration
  const desktopApps = [
    { 
      id: 'profile', 
      title: 'About Me', 
      icon: <User size={24} />, 
      label: 'Profile',
      component: () => <Profile hackerMode={hackerMode} />,
      defaultSize: { width: 600, height: 600 }
    },
    { 
      id: 'projects', 
      title: 'Projects', 
      icon: <Briefcase size={24} />, 
      label: 'Projects',
      component: () => <Projects hackerMode={hackerMode} />,
      defaultSize: { width: 900, height: 700 }
    },
    { 
      id: 'skills', 
      title: 'Skills', 
      icon: <Code size={24} />, 
      label: 'Skills',
      component: () => <Skills hackerMode={hackerMode} />,
      defaultSize: { width: 600, height: 500 }
    },
    { 
      id: 'cv', 
      title: 'Resume', 
      icon: <FileText size={24} />, 
      label: 'Resume',
      component: () => <CV hackerMode={hackerMode} />,
      defaultSize: { width: 700, height: 600 }
    },
    { 
      id: 'contact', 
      title: 'Contact', 
      icon: <Mail size={24} />, 
      label: 'Contact',
      component: () => <Contact hackerMode={hackerMode} />,
      defaultSize: { width: 500, height: 600 }
    },
    { 
      id: 'widgets', 
      title: 'Desktop', 
      icon: <Layout size={24} />, 
      label: 'Desktop',
      component: null,
      isDesktopToggle: true
    },
    { 
      id: 'github', 
      title: 'GitHub', 
      icon: <Github size={24} />, 
      label: 'GitHub',
      component: null,
      isExternal: true,
      url: portfolioData.profile.social.github || 'https://github.com'
    }
  ];
  const openWindow = (app) => {
    if (app.isExternal) {
      window.open(app.url, '_blank');
      return;
    }

    if (app.isDesktopToggle) {
      setShowWidgets(!showWidgets);
      setOpenWindows([]); // Close all windows when toggling desktop
      return;
    }

    // On mobile, close other windows when opening a new one
    if (isMobile) {
      setOpenWindows([]);
    }

    const isAlreadyOpen = openWindows.find(w => w.id === app.id);
    if (isAlreadyOpen) {
      focusWindow(app.id);
      return;
    }

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Calculate centered position for desktop
    const defaultPosition = isMobile ? { x: 0, y: 0 } : {
      x: Math.max(0, (screenWidth - app.defaultSize.width) / 2),
      y: Math.max(0, (screenHeight - app.defaultSize.height) / 2 - 50)
    };

    const newWindow = {
      ...app,
      defaultPosition,
      zIndex: windowZIndex
    };

    setOpenWindows(prev => [...prev, newWindow]);
    setActiveWindowId(app.id);
    setWindowZIndex(prev => prev + 1);
    playSound('open');
  };

  const closeWindow = (windowId) => {
    setOpenWindows(windows => windows.filter(w => w.id !== windowId));
    if (activeWindowId === windowId) {
      setActiveWindowId(null);
    }
    playSound('close');
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
      {/* MenuBar - macOS style top bar (desktop only) */}
      {!isMobile && <MenuBar activeWindow={activeWindowTitle} hackerMode={hackerMode} />}

      {/* Background */}
      <div className={`absolute inset-0 ${
        hackerMode ? 'bg-gradient-to-br from-[#003300]/10 to-[#00ff00]/5' : 
        'bg-gradient-to-br from-accent-pink/5 to-accent-cyan/5'
      }`} />

      {/* Main content area with padding for menubar and dock */}
      <div className={`relative h-screen ${!isMobile ? 'pt-7' : ''} ${isMobile ? 'pb-20' : 'pb-24'}`}>
        {/* Show either windows or widgets based on showWidgets state */}
        {showWidgets && !isMobile ? (
          <DesktopWidgets />
        ) : (
          <>
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
          </>
        )}
      </div>
      {/* Dock - Bottom bar */}
      <Dock 
        apps={desktopApps}
        openWindows={openWindows}
        onAppClick={openWindow}
      />

      {/* Start Menu (desktop only) */}
      {!isMobile && (
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
      )}
    </div>
  );
}

export default Home;