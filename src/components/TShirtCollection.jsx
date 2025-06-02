import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, TrendingUp, Package, DollarSign, ChevronLeft, ChevronRight, ExternalLink, Filter, Search } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import PlaceholderImage from './PlaceholderImage';

const TShirtCollection = ({ hackerMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or carousel
  
  // Sample t-shirt collection data - replace with actual Qikink API data
  const tshirtCollection = [
    {
      id: 1,
      name: "Minimal Design Tee",
      image: "/tshirts/design1.jpg",
      price: 599,
      category: "Minimal",
      brand: "Qikink",
      qikinkUrl: "https://qikink.com/product/minimal-design-tee",
      dateAdded: "2025-05-15",
      description: "Clean and minimalist design for the modern aesthetic"
    },
    {
      id: 2,
      name: "Abstract Art Collection",
      image: "/tshirts/design2.jpg",
      price: 799,
      category: "Art",
      brand: "Qikink",
      qikinkUrl: "https://qikink.com/product/abstract-art",
      dateAdded: "2025-05-10",
      description: "Bold abstract patterns that make a statement"
    },
    {
      id: 3,
      name: "Tech Geek Special",
      image: "/tshirts/design3.jpg",
      price: 699,
      category: "Tech",
      brand: "Qikink",
      qikinkUrl: "https://qikink.com/product/tech-geek",
      dateAdded: "2025-05-05",
      description: "For the tech enthusiasts and code lovers"
    },
    {
      id: 4,
      name: "Vintage Retro Wave",
      image: "/tshirts/design4.jpg",
      price: 899,
      category: "Vintage",
      brand: "Qikink",
      qikinkUrl: "https://qikink.com/product/vintage-retro",
      dateAdded: "2025-04-30",
      description: "Nostalgic designs with a modern twist"
    },
    {
      id: 5,
      name: "Nature Inspired",
      image: "/tshirts/design5.jpg",
      price: 749,
      category: "Nature",
      brand: "Qikink",
      qikinkUrl: "https://qikink.com/product/nature-inspired",
      dateAdded: "2025-04-25",
      description: "Bringing the outdoors to your wardrobe"
    },
    {
      id: 6,
      name: "Geometric Patterns",
      image: "/tshirts/design6.jpg",
      price: 649,
      category: "Minimal",
      brand: "Qikink",
      qikinkUrl: "https://qikink.com/product/geometric",
      dateAdded: "2025-04-20",
      description: "Sharp lines and perfect symmetry"
    }
  ];

  // Filter t-shirts based on search and category
  const filteredTshirts = tshirtCollection.filter(tshirt => {
    const matchesSearch = tshirt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tshirt.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || tshirt.category === filter;
    return matchesSearch && matchesFilter;
  });

  // Calculate statistics
  useEffect(() => {
    const total = tshirtCollection.reduce((sum, tshirt) => sum + tshirt.price, 0);
    setTotalSpent(total);
    
    // Calculate category distribution
    const categoryCount = {};
    tshirtCollection.forEach(tshirt => {
      categoryCount[tshirt.category] = (categoryCount[tshirt.category] || 0) + 1;
    });
    
    const data = Object.entries(categoryCount).map(([category, count]) => ({
      name: category,
      value: count,
      percentage: Math.round((count / tshirtCollection.length) * 100)
    }));
    
    setCategoryData(data);
  }, []);

  const COLORS = hackerMode 
    ? ['#00ffcc', '#00ccaa', '#009988', '#006666', '#004444']
    : ['#FF006E', '#C13584', '#8A3FFC', '#4589FF', '#0F62FE'];

  const categories = ['all', ...new Set(tshirtCollection.map(t => t.category))];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTshirts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredTshirts.length) % filteredTshirts.length);
  };

  return (
    <div className="p-6 h-full overflow-y-auto scrollbar-thin">
      {/* Header */}
      <div className="mb-6">
        <h2 className={`text-2xl font-heading font-bold mb-2 ${
          hackerMode ? 'text-accent-teal' : 'text-white'
        }`}>
          T-Shirt Collection
        </h2>
        <p className="text-sm opacity-80">
          Curated designs from Qikink - Where creativity meets comfort
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <motion.div 
          className="glass border border-white/10 rounded-lg p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-60 mb-1">Total Collection</p>
              <p className={`text-xl font-bold ${
                hackerMode ? 'text-accent-teal' : 'text-accent-pink'
              }`}>{tshirtCollection.length}</p>
            </div>
            <Package className={hackerMode ? 'text-accent-teal/50' : 'text-accent-cyan/50'} size={24} />
          </div>
        </motion.div>

        <motion.div 
          className="glass border border-white/10 rounded-lg p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-60 mb-1">Total Value</p>
              <p className={`text-xl font-bold ${
                hackerMode ? 'text-accent-teal' : 'text-accent-pink'
              }`}>₹{totalSpent}</p>
            </div>
            <DollarSign className={hackerMode ? 'text-accent-teal/50' : 'text-accent-cyan/50'} size={24} />
          </div>
        </motion.div>

        <motion.div 
          className="glass border border-white/10 rounded-lg p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-60 mb-1">Categories</p>
              <p className={`text-xl font-bold ${
                hackerMode ? 'text-accent-teal' : 'text-accent-pink'
              }`}>{categoryData.length}</p>
            </div>
            <TrendingUp className={hackerMode ? 'text-accent-teal/50' : 'text-accent-cyan/50'} size={24} />
          </div>
        </motion.div>

        <motion.div 
          className="glass border border-white/10 rounded-lg p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-60 mb-1">Latest Addition</p>
              <p className={`text-sm font-semibold ${
                hackerMode ? 'text-accent-teal' : 'text-accent-pink'
              }`}>May 15, 2025</p>
            </div>
            <ShoppingBag className={hackerMode ? 'text-accent-teal/50' : 'text-accent-cyan/50'} size={24} />
          </div>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search designs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-cyan/50"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-cyan/50"
          >
            {categories.map(cat => (
              <option key={cat} value={cat} className="bg-gray-900">
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          
          <div className="flex rounded-lg overflow-hidden border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 ${viewMode === 'grid' ? 'bg-white/10' : 'bg-white/5'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('carousel')}
              className={`px-4 py-2 ${viewMode === 'carousel' ? 'bg-white/10' : 'bg-white/5'}`}
            >
              Carousel
            </button>
          </div>
        </div>
      </div>

      {/* Collection Display */}
      {filteredTshirts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No designs found matching your criteria</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTshirts.map((tshirt) => (
            <motion.div
              key={tshirt.id}
              className="glass border border-white/10 rounded-lg overflow-hidden"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="aspect-square bg-gradient-to-br from-accent-pink/10 to-accent-cyan/10">
                <PlaceholderImage
                  src={tshirt.image}
                  alt={tshirt.name}
                  className="w-full h-full object-cover"
                  placeholderText={tshirt.name}
                />
              </div>
              
              <div className="p-4">
                <h3 className={`font-semibold mb-1 ${
                  hackerMode ? 'text-accent-teal' : 'text-white'
                }`}>{tshirt.name}</h3>
                
                <p className="text-xs opacity-60 mb-2">{tshirt.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-lg font-bold ${
                    hackerMode ? 'text-accent-teal' : 'text-accent-pink'
                  }`}>₹{tshirt.price}</span>
                  <span className="text-xs px-2 py-1 bg-white/10 rounded">
                    {tshirt.category}
                  </span>
                </div>
                
                <a
                  href={tshirt.qikinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                    hackerMode
                      ? 'bg-accent-teal/20 hover:bg-accent-teal/30 text-accent-teal'
                      : 'bg-gradient-to-r from-accent-pink/20 to-accent-cyan/20 hover:from-accent-pink/30 hover:to-accent-cyan/30'
                  }`}
                >
                  <span className="text-sm">View on Qikink</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="relative">
          {/* Carousel View */}
          <div className="flex items-center justify-center">
            <button
              onClick={prevSlide}
              className={`p-2 rounded-full ${
                hackerMode ? 'bg-accent-teal/20 hover:bg-accent-teal/30' : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <ChevronLeft size={24} />
            </button>
            
            <motion.div
              key={currentIndex}
              className="mx-8 max-w-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="glass border border-white/10 rounded-lg overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-accent-pink/10 to-accent-cyan/10">
                  <PlaceholderImage
                    src={filteredTshirts[currentIndex].image}
                    alt={filteredTshirts[currentIndex].name}
                    className="w-full h-full object-cover"
                    placeholderText={filteredTshirts[currentIndex].name}
                  />
                </div>
                
                <div className="p-6">
                  <h3 className={`text-xl font-semibold mb-2 ${
                    hackerMode ? 'text-accent-teal' : 'text-white'
                  }`}>{filteredTshirts[currentIndex].name}</h3>
                  
                  <p className="text-sm opacity-80 mb-4">{filteredTshirts[currentIndex].description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-2xl font-bold ${
                      hackerMode ? 'text-accent-teal' : 'text-accent-pink'
                    }`}>₹{filteredTshirts[currentIndex].price}</span>
                    <span className="text-sm px-3 py-1 bg-white/10 rounded">
                      {filteredTshirts[currentIndex].category}
                    </span>
                  </div>
                  
                  <a
                    href={filteredTshirts[currentIndex].qikinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 py-3 px-6 rounded-lg transition-colors ${
                      hackerMode
                        ? 'bg-accent-teal/20 hover:bg-accent-teal/30 text-accent-teal'
                        : 'bg-gradient-to-r from-accent-pink/20 to-accent-cyan/20 hover:from-accent-pink/30 hover:to-accent-cyan/30'
                    }`}
                  >
                    <span>View on Qikink</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
            
            <button
              onClick={nextSlide}
              className={`p-2 rounded-full ${
                hackerMode ? 'bg-accent-teal/20 hover:bg-accent-teal/30' : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {filteredTshirts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? hackerMode
                      ? 'bg-accent-teal w-8'
                      : 'bg-accent-pink w-8'
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Category Distribution Chart */}
      <div className="mt-8 glass border border-white/10 rounded-lg p-6">
        <h3 className={`text-lg font-semibold mb-4 ${
          hackerMode ? 'text-accent-teal' : 'text-white'
        }`}>Collection Distribution</h3>
        
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/2 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full lg:w-1/2">
            {categoryData.map((category, index) => (
              <div key={category.name} className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <div>
                  <p className="text-sm font-medium">{category.name}</p>
                  <p className="text-xs opacity-60">{category.value} designs</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TShirtCollection;