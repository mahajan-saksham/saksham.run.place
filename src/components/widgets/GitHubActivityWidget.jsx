import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, GitCommit, Star, GitPullRequest, Code2 } from 'lucide-react';
import WidgetCard from './WidgetCard';

const GitHubActivityWidget = ({ onClose, onMinimize }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('contributions');
  
  // Mock GitHub data - replace with GitHub API
  const [githubData] = useState({
    username: 'mahajan-saksham',
    contributions: {
      total: 487,
      thisWeek: 23,
      longestStreak: 45,
      currentStreak: 7
    },
    languages: [
      { name: 'JavaScript', percentage: 45, color: '#f1e05a' },
      { name: 'TypeScript', percentage: 25, color: '#2b7489' },
      { name: 'React', percentage: 20, color: '#61dafb' },
      { name: 'CSS', percentage: 10, color: '#563d7c' }
    ],
    recentCommits: [
      {
        id: 1,
        message: 'feat: Add desktop widget system',
        repo: 'saksham-portfolio',
        time: '2 hours ago',
        additions: 245,
        deletions: 12
      },
      {
        id: 2,
        message: 'fix: Mobile responsive issues',
        repo: 'saksham-portfolio',
        time: '5 hours ago',
        additions: 34,
        deletions: 8
      },
      {
        id: 3,
        message: 'update: README documentation',
        repo: 'design-system',
        time: '1 day ago',
        additions: 56,
        deletions: 23
      }
    ],
    stats: {
      publicRepos: 24,
      followers: 156,
      following: 89,
      stars: 342
    }
  });

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);
  // Generate contribution graph data (mock)
  const generateContributionData = () => {
    const weeks = 52;
    const days = 7;
    const data = [];
    
    for (let week = 0; week < weeks; week++) {
      for (let day = 0; day < days; day++) {
        const intensity = Math.random();
        data.push({
          week,
          day,
          count: Math.floor(intensity * 10),
          intensity
        });
      }
    }
    return data;
  };

  const contributionData = generateContributionData();

  return (
    <WidgetCard
      id="github-activity"
      title="GitHub Activity"
      icon={<Github size={18} />}
      onClose={onClose}
      onMinimize={onMinimize}
      className="h-full"
    >
      <div className="flex flex-col h-full">
        {/* Tabs */}
        <div className="px-4 pt-3 pb-2 border-b border-gray-700/30">
          <div className="flex gap-2">
            {['contributions', 'languages', 'commits'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors capitalize ${
                  activeTab === tab
                    ? 'bg-accent-cyan/20 text-accent-cyan'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-pulse text-accent-cyan">Loading activity...</div>
            </div>
          ) : (
            <>
              {/* Contributions Tab */}
              {activeTab === 'contributions' && (
                <div className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-xs text-gray-400">Total Contributions</p>
                      <p className="text-2xl font-bold text-white">{githubData.contributions.total}</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-xs text-gray-400">This Week</p>
                      <p className="text-2xl font-bold text-accent-cyan">{githubData.contributions.thisWeek}</p>
                    </div>
                  </div>