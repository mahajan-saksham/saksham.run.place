import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShirtIcon, ChevronLeft, ChevronRight, TrendingUp, Package, DollarSign } from 'lucide-react';
import WidgetCard from './WidgetCard';

const TShirtCollectionWidget = ({ onClose, onMinimize }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock T-shirt collection data - replace with real data
  const [collection] = useState([
    {
      id: 1,
      name: 'React Developer',
      brand: 'Dev Threads',
      price: 29.99,
      purchaseDate: '2024-01-15',
      image: '/images/tshirts/react-dev.jpg',
      color: '#61DAFB',
      size: 'L',
      tags: ['Tech', 'React', 'Developer']
    },
    {
      id: 2,
      name: 'Cyberpunk 2077',
      brand: 'Gaming Gear',
      price: 34.99,
      purchaseDate: '2024-02-20',
      image: '/images/tshirts/cyberpunk.jpg',
      color: '#FCE803',
      size: 'XL',
      tags: ['Gaming', 'Cyberpunk']
    },
    {
      id: 3,
      name: 'Minimalist Code',
      brand: 'Clean Designs',
      price: 24.99,
      purchaseDate: '2024-03-10',
      image: '/images/tshirts/minimalist.jpg',
      color: '#000000',
      size: 'L',
      tags: ['Minimal', 'Code', 'Black']
    },
    {
      id: 4,
      name: 'NASA Logo',
      brand: 'Space Store',
      price: 39.99,
      purchaseDate: '2024-04-05',
      image: '/images/tshirts/nasa.jpg',
      color: '#FC3D21',
      size: 'L',
      tags: ['Space', 'NASA', 'Science']
    }
  ]);

  const [stats, setStats] = useState({
    totalSpent: 0,
    averagePrice: 0,
    monthlyBudget: 100,
    thisMonthSpent: 0
  });
  useEffect(() => {
    // Calculate stats
    const total = collection.reduce((sum, item) => sum + item.price, 0);
    const avg = total / collection.length;
    
    // Calculate this month's spending
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonth = collection.filter(item => {
      const purchaseDate = new Date(item.purchaseDate);
      return purchaseDate.getMonth() === currentMonth && 
             purchaseDate.getFullYear() === currentYear;
    }).reduce((sum, item) => sum + item.price, 0);
    
    setStats({
      totalSpent: total,
      averagePrice: avg,
      monthlyBudget: 100,
      thisMonthSpent: thisMonth
    });
    
    setTimeout(() => setIsLoading(false), 500);
  }, [collection]);

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % collection.length);
  };

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + collection.length) % collection.length);
  };

  const currentItem = collection[currentIndex];
  const budgetPercentage = (stats.thisMonthSpent / stats.monthlyBudget) * 100;

  return (
    <WidgetCard
      id="tshirt-collection"
      title="T-Shirt Collection"
      icon={<ShirtIcon size={18} />}
      onClose={onClose}
      onMinimize={onMinimize}
      className="h-full"
    >
      <div className="p-4 space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse text-accent-cyan">Loading collection...</div>
          </div>
        ) : (
          <>
            {/* Carousel */}
            <div className="relative bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={prevItem}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div 
                      className="w-32 h-32 rounded-lg mb-3 flex items-center justify-center"
                      style={{ backgroundColor: currentItem.color + '20' }}
                    >
                      <ShirtIcon size={64} style={{ color: currentItem.color }} />
                    </div>
                    <h4 className="text-lg font-semibold text-white">{currentItem.name}</h4>
                    <p className="text-sm text-gray-400">{currentItem.brand}</p>
                    <p className="text-xl font-bold text-accent-cyan mt-2">${currentItem.price}</p>
                    <div className="flex gap-2 mt-2">
                      {currentItem.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 bg-gray-700/50 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                <button
                  onClick={nextItem}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              
              {/* Carousel indicators */}
              <div className="flex justify-center gap-1">
                {collection.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex 
                        ? 'bg-accent-cyan w-6' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                className="bg-gray-800/50 rounded-lg p-3"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                  <Package size={14} />
                  Collection Size
                </div>
                <p className="text-2xl font-bold text-white">{collection.length}</p>
              </motion.div>
              
              <motion.div
                className="bg-gray-800/50 rounded-lg p-3"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                  <DollarSign size={14} />
                  Total Spent
                </div>
                <p className="text-2xl font-bold text-white">${stats.totalSpent.toFixed(2)}</p>
              </motion.div>
            </div>
            
            {/* Budget Tracker */}
            <div className="bg-gray-800/50 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Monthly Budget</span>
                <span className="text-sm font-semibold">
                  ${stats.thisMonthSpent.toFixed(2)} / ${stats.monthlyBudget}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  className={`h-full ${
                    budgetPercentage > 80 
                      ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              {budgetPercentage > 80 && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <TrendingUp size={12} />
                  Budget alert: {budgetPercentage.toFixed(0)}% used
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </WidgetCard>
  );
};

export default TShirtCollectionWidget;