import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Hash, Heart, MessageCircle, RefreshCw } from 'lucide-react';
import WidgetCard from './WidgetCard';

const SocialFeedWidget = ({ onClose, onMinimize }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock social media posts - replace with real API integration
  const mockPosts = [
    {
      id: 1,
      platform: 'twitter',
      author: 'Saksham Mahajan',
      handle: '@saksham',
      content: 'Just launched my new portfolio website! Check out the interactive desktop experience 🚀 #webdev #react #portfolio',
      likes: 42,
      comments: 5,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      avatar: '/images/saksham-avatar.jpg'
    },
    {
      id: 2,
      platform: 'linkedin',
      author: 'Saksham Mahajan',
      handle: 'Senior Product Designer',
      content: 'Excited to share that Yubi Pools has crossed $10M in transactions! Proud of what our team has built.',
      likes: 128,
      comments: 23,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      avatar: '/images/saksham-avatar.jpg'
    },
    {
      id: 3,
      platform: 'dribbble',
      author: 'Saksham Mahajan',
      handle: '@sakshammahajan',
      content: 'New shot! Exploring cyberpunk aesthetics for modern web interfaces. What do you think?',
      likes: 89,
      comments: 12,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      avatar: '/images/saksham-avatar.jpg',
      image: '/images/projects/cyberpunk-ui.jpg'
    }
  ];

  useEffect(() => {
    // Simulate loading posts
    setTimeout(() => {
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1000);
  }, []);
  const refreshFeed = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPosts([...mockPosts].sort(() => Math.random() - 0.5));
      setIsLoading(false);
    }, 500);
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'twitter': return <Twitter size={16} className="text-blue-400" />;
      case 'linkedin': return <Linkedin size={16} className="text-blue-600" />;
      case 'dribbble': return <Hash size={16} className="text-pink-400" />;
      default: return null;
    }
  };

  const filteredPosts = activeFilter === 'all' 
    ? posts 
    : posts.filter(post => post.platform === activeFilter);

  return (
    <WidgetCard
      id="social-feed"
      title="Social Feed"
      icon={<MessageCircle size={18} />}
      onClose={onClose}
      onMinimize={onMinimize}
      className="h-full"
      headerActions={
        <button
          onClick={refreshFeed}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          title="Refresh"
        >
          <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
        </button>
      }
    >      <div className="flex flex-col h-full">
        {/* Filter Tabs */}
        <div className="px-4 pt-3 pb-2 border-b border-gray-700/30">
          <div className="flex gap-2">
            {['all', 'twitter', 'linkedin', 'dribbble'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-accent-cyan/20 text-accent-cyan'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-pulse text-accent-cyan">Loading posts...</div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              No posts found
            </div>
          ) : (
            filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 hover:bg-gray-800/70 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Post Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent-pink to-accent-cyan rounded-full flex items-center justify-center text-xs font-bold">
                      S
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-white">{post.author}</h4>
                        {getPlatformIcon(post.platform)}
                      </div>
                      <p className="text-xs text-gray-400">{post.handle} · {getTimeAgo(post.timestamp)}</p>
                    </div>
                  </div>
                </div>
                {/* Post Content */}
                <p className="text-sm text-gray-300 mb-3">{post.content}</p>
                
                {/* Post Image if exists */}
                {post.image && (
                  <div className="mb-3 rounded-lg overflow-hidden">
                    <img 
                      src={post.image} 
                      alt="Post content"
                      className="w-full h-40 object-cover"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                )}
                
                {/* Post Actions */}
                <div className="flex items-center gap-4 text-xs">
                  <button className="flex items-center gap-1 text-gray-400 hover:text-pink-400 transition-colors">
                    <Heart size={14} />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors">
                    <MessageCircle size={14} />
                    <span>{post.comments}</span>
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </WidgetCard>
  );
};

export default SocialFeedWidget;