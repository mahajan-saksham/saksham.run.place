import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, Globe, TrendingUp } from 'lucide-react';
import WidgetCard from './WidgetCard';

const VisitorStatsWidget = ({ onClose, onMinimize }) => {
  const [stats, setStats] = useState({
    totalViews: 0,
    uniqueVisitors: 0,
    currentVisitors: 0,
    todayViews: 0,
    locations: []
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    // In production, this would fetch from an analytics API
    const loadStats = () => {
      setIsLoading(true);
      
      // Mock data - replace with real API call
      setTimeout(() => {
        setStats({
          totalViews: Math.floor(Math.random() * 10000) + 5000,
          uniqueVisitors: Math.floor(Math.random() * 5000) + 2000,
          currentVisitors: Math.floor(Math.random() * 50) + 1,
          todayViews: Math.floor(Math.random() * 500) + 100,
          locations: [
            { country: 'India', visitors: 45, flag: '🇮🇳' },
            { country: 'USA', visitors: 32, flag: '🇺🇸' },
            { country: 'UK', visitors: 18, flag: '🇬🇧' },
            { country: 'Canada', visitors: 12, flag: '🇨🇦' },
            { country: 'Germany', visitors: 8, flag: '🇩🇪' }
          ]
        });
        setIsLoading(false);
      }, 1000);
    };

    loadStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(loadStats, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ icon, label, value, color }) => (
    <motion.div
      className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color} text-white`}>
          {icon}
        </div>
        <div>
          <p className="text-xs text-gray-400">{label}</p>
          <p className="text-xl font-bold text-white">
            {value.toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <WidgetCard
      id="visitor-stats"
      title="Visitor Stats"
      icon={<Users size={18} />}
      onClose={onClose}
      onMinimize={onMinimize}
      className="h-full"
    >
      <div className="p-4 space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-pulse text-accent-cyan">Loading stats...</div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                icon={<Eye size={20} />}
                label="Total Views"
                value={stats.totalViews}
                color="bg-gradient-to-r from-accent-pink to-accent-cyan"
              />
              <StatCard
                icon={<Users size={20} />}
                label="Unique Visitors"
                value={stats.uniqueVisitors}
                color="bg-gradient-to-r from-accent-cyan to-accent-teal"
              />
              <StatCard
                icon={<TrendingUp size={20} />}
                label="Today's Views"
                value={stats.todayViews}
                color="bg-gradient-to-r from-green-500 to-emerald-500"
              />
              <StatCard
                icon={<Globe size={20} />}
                label="Live Visitors"
                value={stats.currentVisitors}
                color="bg-gradient-to-r from-red-500 to-pink-500"
              />
            </div>
            {/* Location Breakdown */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Top Locations</h4>
              <div className="space-y-2">
                {stats.locations.map((location, index) => (
                  <motion.div
                    key={location.country}
                    className="flex items-center justify-between p-2 rounded-lg bg-gray-800/30"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{location.flag}</span>
                      <span className="text-sm text-gray-300">{location.country}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-accent-cyan to-accent-pink"
                          initial={{ width: 0 }}
                          animate={{ width: `${(location.visitors / stats.locations[0].visitors) * 100}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 w-8 text-right">
                        {location.visitors}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Live indicator */}
            <div className="flex items-center justify-center mt-4">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Live data updates every 30 seconds</span>
              </div>
            </div>
          </>
        )}
      </div>
    </WidgetCard>
  );
};

export default VisitorStatsWidget;