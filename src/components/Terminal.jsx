import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../hooks/useSound';

const Terminal = ({ hackerMode }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState(['Welcome to CyberOS v2.0.77']);
  const [zIndex, setZIndex] = useState(10);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const { playSound } = useSound();

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  const bringToFront = () => {
    setZIndex(prev => Math.max(prev, 10) + 1);
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(scrollToBottom);
    if (terminalRef.current) {
      resizeObserver.observe(terminalRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    playSound('typing');
    
    const result = handleCommand(input);
    setHistory(prev => [...prev, `> ${input}`, ...(result ? [result] : [])]);
    setInput('');
    scrollToBottom();
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    bringToFront();
  };

  const handleCommand = (cmd) => {
    const commands = {
      help: () => 'Available commands: help, clear, about, projects, github, skills',
      clear: () => {
        setHistory([]);
        return null;
      },
      about: () => 'I am a developer who loves creating cyberpunk-themed experiences.',
      projects: () => 'Type "projects --list" to see my projects',
      github: () => 'https://github.com/yourusername',
      skills: () => [
        'Frontend: React, Vue, TypeScript',
        'Backend: Node.js, Python, Go',
        'Other: UI/UX, Creative Coding'
      ].join('\n'),
    };

    const args = cmd.split(' ');
    const command = args[0].toLowerCase();

    if (commands[command]) {
      return commands[command]();
    }
    return `Command not found: ${command}. Type "help" for available commands.`;
  };

  return (
    <div 
      className="h-full flex flex-col bg-cyber-black relative overflow-hidden"
      style={{ zIndex }}
      onClick={handleTerminalClick}
    >
      {/* Fixed Topbar */}
      <div className="window-handle flex items-center justify-between p-2 bg-cyber-black border-b border-cyber-blue absolute top-0 left-0 right-0 z-50">
        <h3 className="text-cyber-blue font-tech text-sm select-none">Terminal.exe</h3>
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
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto pt-12 p-4 scrollbar-thin scrollbar-thumb-cyber-blue scrollbar-track-transparent text-cyber-green font-mono text-sm"
        style={{ height: 'calc(100% - 40px)' }}
      >
        {history.map((line, i) => (
          <div key={i} className="mb-1 whitespace-pre-wrap">
            {line}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <span className="mr-2">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none border-none text-cyber-green"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal; 