import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, Globe, TrendingUp } from 'lucide-react';
import WidgetCard from './WidgetCard';

const VisitorStatsWidget = ({ onClose, onMinimize, isDropdown = false }) => {
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
    <motion.div      className={`bg-${color}-500/10 backdrop-blur-xl p-3 rounded-lg border border-${color}-500/20`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`text-${color}-400`}>{icon}</div>
          <span className="text-xs text-gray-400">{label}</span>
        </div>
        <motion.div 
          className="text-lg font-bold text-white"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {value.toLocaleString()}
        </motion.div>
      </div>
    </motion.div>
  );

  const content = (
    <div className="p-4">
      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <motion.div
            className="w-8 h-8 border-2 border-accent-cyan border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard 
              icon={<Eye size={16} />}
              label="Total Views"
              value={stats.totalViews}
              color="cyan"
            />
            <StatCard 
              icon={<Users size={16} />}
              label="Unique Visitors"
              value={stats.uniqueVisitors}
              color="pink"
            />            <StatCard 
              icon={<Globe size={16} />}
              label="Live Now"
              value={stats.currentVisitors}
              color="teal"
            />
            <StatCard 
              icon={<TrendingUp size={16} />}
              label="Today"
              value={stats.todayViews}
              color="purple"
            />
          </div>

          {/* Top Locations */}
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-3">Top Locations</h4>
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
                    <span className="text-sm text-white">{location.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-700 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-accent-cyan to-accent-pink"
                        initial={{ width: 0 }}
                        animate={{ width: `${(location.visitors / stats.locations[0].visitors) * 100}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-8 text-right">{location.visitors}</span>
                  </div>
                </motion.div>
              ))}            </div>
          </div>
        </div>
      )}
    </div>
  );

  // If in dropdown mode, return content without WidgetCard wrapper
  if (isDropdown) {
    return content;
  }

  // Otherwise, return with WidgetCard wrapper
  return (
    <WidgetCard
      id="visitor-stats"
      title="Visitor Stats"
      icon="📊"
      onClose={onClose}
      onMinimize={onMinimize}
      className="h-full"
    >
      {content}
    </WidgetCard>
  );
};

export default VisitorStatsWidget;