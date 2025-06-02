import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Hash, Heart, MessageCircle, RefreshCw } from 'lucide-react';
import WidgetCard from './WidgetCard';

const SocialFeedWidget = ({ onClose, onMinimize, isDropdown = false }) => {
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
      comments: 5,      time: '2h ago',
      image: null
    },
    {
      id: 2,
      platform: 'linkedin',
      author: 'Saksham Mahajan',
      handle: 'saksham-mahajan',
      content: 'Excited to share my journey as a UI/UX designer. From wireframes to prototypes, every project teaches something new.',
      likes: 89,
      comments: 12,
      time: '1d ago',
      image: null
    },
    {
      id: 3,
      platform: 'twitter',
      author: 'Saksham Mahajan',
      handle: '@saksham',
      content: 'Working on some amazing 3D animations for my next project. Three.js is incredible! 🎨',
      likes: 67,
      comments: 8,
      time: '3d ago',
      image: null
    }
  ];

  useEffect(() => {
    // Simulate loading posts
    setTimeout(() => {
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredPosts = activeFilter === 'all' 
    ? posts 
    : posts.filter(post => post.platform === activeFilter);

  const PostCard = ({ post, index }) => (
    <motion.div
      className="p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {post.platform === 'twitter' ? (
            <Twitter size={16} className="text-cyan-400" />
          ) : (            <Linkedin size={16} className="text-blue-500" />
          )}
          <div>
            <p className="text-xs font-medium text-white">{post.author}</p>
            <p className="text-xs text-gray-400">{post.handle} · {post.time}</p>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-300 mb-3">{post.content}</p>
      
      <div className="flex items-center gap-4 text-xs text-gray-400">
        <div className="flex items-center gap-1 hover:text-red-400 cursor-pointer">
          <Heart size={14} />
          <span>{post.likes}</span>
        </div>
        <div className="flex items-center gap-1 hover:text-cyan-400 cursor-pointer">
          <MessageCircle size={14} />
          <span>{post.comments}</span>
        </div>
      </div>
    </motion.div>
  );

  const content = (
    <div className={`${isDropdown ? 'p-4' : 'p-4'}`}>
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1 text-xs rounded-lg transition-colors ${
            activeFilter === 'all' 
              ? 'bg-accent-cyan text-white' 
              : 'bg-gray-800/50 hover:bg-gray-700/50'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveFilter('twitter')}
          className={`px-3 py-1 text-xs rounded-lg transition-colors ${
            activeFilter === 'twitter' 
              ? 'bg-cyan-500 text-white' 
              : 'bg-gray-800/50 hover:bg-gray-700/50'
          }`}
        >
          Twitter
        </button>        <button
          onClick={() => setActiveFilter('linkedin')}
          className={`px-3 py-1 text-xs rounded-lg transition-colors ${
            activeFilter === 'linkedin' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-800/50 hover:bg-gray-700/50'
          }`}
        >
          LinkedIn
        </button>
      </div>

      {/* Posts Feed */}
      <div className={`space-y-3 ${isDropdown ? 'max-h-[350px] overflow-y-auto' : ''}`}>
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <motion.div
              className="w-8 h-8 border-2 border-accent-cyan border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))
        ) : (
          <p className="text-center text-gray-400 py-8">No posts found</p>
        )}
      </div>
    </div>
  );

  // If in dropdown mode, return content without WidgetCard wrapper
  if (isDropdown) {
    return content;
  }

  // Otherwise, return with WidgetCard wrapper
  return (
    <WidgetCard
      id="social-feed"
      title="Social Feed"
      icon="📱"
      onClose={onClose}
      onMinimize={onMinimize}
      className="h-full"
    >
      {content}
    </WidgetCard>
  );
};

export default SocialFeedWidget;