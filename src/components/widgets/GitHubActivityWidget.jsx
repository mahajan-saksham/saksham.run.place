import React, { useState, useEffect } from 'react';
import { Github, GitBranch, Star, GitCommit } from 'lucide-react';
import WidgetCard from './WidgetCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const GitHubActivityWidget = ({ onRemove }) => {
  const [loading, setLoading] = useState(true);
  const [contributions, setContributions] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [recentCommits, setRecentCommits] = useState([]);
  const [stats, setStats] = useState({
    totalCommits: 0,
    totalStars: 0,
    totalRepos: 0
  });

  // Mock data - replace with actual GitHub API calls
  const mockLanguages = [
    { name: 'JavaScript', value: 45, color: '#f1e05a' },
    { name: 'TypeScript', value: 30, color: '#2b7489' },
    { name: 'CSS', value: 15, color: '#563d7c' },
    { name: 'HTML', value: 10, color: '#e34c26' }
  ];

  const mockContributions = [
    { day: 'Mon', commits: 3 },
    { day: 'Tue', commits: 5 },
    { day: 'Wed', commits: 2 },
    { day: 'Thu', commits: 7 },
    { day: 'Fri', commits: 4 },
    { day: 'Sat', commits: 1 },
    { day: 'Sun', commits: 2 }
  ];

  const mockCommits = [
    { id: 1, message: 'feat: Add new widget system', repo: 'portfolio', time: '2 hours ago' },
    { id: 2, message: 'fix: Resolve responsive issues', repo: 'ui-library', time: '5 hours ago' },
    { id: 3, message: 'docs: Update README', repo: 'portfolio', time: '1 day ago' }
  ];

  useEffect(() => {
    // TODO: Implement GitHub API integration
    // const fetchGitHubData = async () => {
    //   const token = import.meta.env.VITE_GITHUB_TOKEN;
    //   const username = import.meta.env.VITE_GITHUB_USERNAME;
    //   
    //   if (!token) {
    //     console.warn('GitHub token not found');
    //     setLoading(false);
    //     return;
    //   }    //
    //   // Fetch data using GitHub GraphQL API
    //   // ... implementation
    // };
    // fetchGitHubData();

    // Use mock data for now
    setLanguages(mockLanguages);
    setContributions(mockContributions);
    setRecentCommits(mockCommits);
    setStats({
      totalCommits: 234,
      totalStars: 45,
      totalRepos: 12
    });
    setLoading(false);
  }, []);

  return (
    <WidgetCard 
      title="GitHub Activity" 
      icon={<Github className="w-5 h-5" />}
      onRemove={onRemove}
      className="github-activity-widget"
    >
      <div className="space-y-4">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 text-center">
            <GitCommit className="w-4 h-4 text-white/60 mx-auto mb-1" />
            <p className="text-lg font-semibold">{stats.totalCommits}</p>
            <p className="text-xs text-white/60">Commits</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 text-center">
            <Star className="w-4 h-4 text-white/60 mx-auto mb-1" />
            <p className="text-lg font-semibold">{stats.totalStars}</p>
            <p className="text-xs text-white/60">Stars</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 text-center">
            <GitBranch className="w-4 h-4 text-white/60 mx-auto mb-1" />
            <p className="text-lg font-semibold">{stats.totalRepos}</p>
            <p className="text-xs text-white/60">Repos</p>
          </div>
        </div>

        {/* Contribution Graph */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <h3 className="text-sm font-medium text-white/60 mb-3">This Week's Activity</h3>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contributions}>                <XAxis dataKey="day" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(17, 24, 39, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="commits" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Language Distribution */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <h3 className="text-sm font-medium text-white/60 mb-3">Languages</h3>
          <div className="flex items-center gap-4">
            <div className="h-24 w-24">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={languages}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={35}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {languages.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-1">
              {languages.map((lang) => (
                <div key={lang.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="text-white/70">{lang.name}</span>
                  </div>
                  <span className="text-white/50">{lang.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Recent Commits */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <h3 className="text-sm font-medium text-white/60 mb-3">Recent Commits</h3>
          <div className="space-y-2">
            {recentCommits.map((commit) => (
              <div key={commit.id} className="py-2 border-b border-white/5 last:border-0">
                <p className="text-sm text-white font-mono">{commit.message}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-white/50">
                  <span>{commit.repo}</span>
                  <span>•</span>
                  <span>{commit.time}</span>
                </div>
              </div>
            ))}
          </div>
          
          {loading && (
            <div className="text-center py-4">
              <p className="text-sm text-white/60">Connect GitHub token to see real data</p>
            </div>
          )}
        </div>
      </div>
    </WidgetCard>
  );
};

export default GitHubActivityWidget;