import React, { useState, useEffect } from 'react';
import { ShoppingBag, TrendingUp, Package, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import WidgetCard from './WidgetCard';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const TShirtCollectionWidget = ({ onRemove }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  
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
      dateAdded: "2025-05-15"
    },
    {
      id: 2,
      name: "Abstract Art Collection",
      image: "/tshirts/design2.jpg",
      price: 799,
      category: "Art",
      brand: "Qikink",
      qikinkUrl: "https://qikink.com/product/abstract-art",
      dateAdded: "2025-05-20"
    },
    {
      id: 3,
      name: "Tech Geek Special",
      image: "/tshirts/design3.jpg",
      price: 699,
      category: "Tech",
      brand: "Qikink",
      qikinkUrl: "https://qikink.com/product/tech-geek",
      dateAdded: "2025-05-22"
    },
    {
      id: 4,
      name: "Vintage Vibes",
      image: "/tshirts/design4.jpg",
      price: 899,
      category: "Vintage",
      brand: "Qikink",
      qikinkUrl: "https://qikink.com/product/vintage-vibes",
      dateAdded: "2025-05-25"
    }
  ];

  useEffect(() => {
    // Calculate total spent
    const total = tshirtCollection.reduce((sum, item) => sum + item.price, 0);
    setTotalSpent(total);
    // Calculate category distribution
    const categories = {};
    tshirtCollection.forEach(item => {
      categories[item.category] = (categories[item.category] || 0) + 1;
    });
    
    const data = Object.entries(categories).map(([name, value]) => ({
      name,
      value,
      color: name === 'Minimal' ? '#60A5FA' : 
             name === 'Art' ? '#F472B6' : 
             name === 'Tech' ? '#34D399' : '#FBBF24'
    }));
    
    setCategoryData(data);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % tshirtCollection.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + tshirtCollection.length) % tshirtCollection.length);
  };

  const currentItem = tshirtCollection[currentIndex];

  return (
    <WidgetCard 
      title="T-Shirt Collection" 
      icon={<ShoppingBag className="w-5 h-5" />}
      onRemove={onRemove}
      className="tshirt-collection-widget"
    >
      <div className="space-y-4">
        {/* Carousel Section */}
        <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={prevSlide}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="text-center flex-1">
              <div className="w-40 h-40 mx-auto bg-white/10 rounded-lg mb-3 flex items-center justify-center">
                <Package className="w-20 h-20 text-white/30" />
              </div>
              <h3 className="font-medium text-white">{currentItem.name}</h3>
              <p className="text-sm text-white/60 mt-1">₹{currentItem.price}</p>
            </div>
            
            <button
              onClick={nextSlide}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>          
          <div className="flex justify-center gap-2 mt-3">
            {tshirtCollection.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-accent-cyan' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          
          <a
            href={currentItem.qikinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-3 text-center text-sm text-accent-cyan hover:underline"
          >
            View on Qikink →
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
            <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
              <Package className="w-3 h-3" />
              <span>Total Items</span>
            </div>
            <p className="text-xl font-semibold">{tshirtCollection.length}</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
            <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
              <DollarSign className="w-3 h-3" />
              <span>Total Spent</span>
            </div>
            <p className="text-xl font-semibold">₹{totalSpent.toLocaleString()}</p>
          </div>
        </div>

        {/* Category Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <h3 className="text-sm font-medium text-white/60 mb-3">Category Distribution</h3>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={40}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex items-center justify-center gap-4 mt-3">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-xs text-white/70">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Tracker */}
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-3 border border-yellow-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-yellow-200">Monthly Budget</span>
            </div>
            <span className="text-sm font-medium text-yellow-100">₹2,500</span>
          </div>
          <div className="mt-2 bg-black/20 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-500"
              style={{ width: `${Math.min((totalSpent / 2500) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-yellow-200/80 mt-1">
            {totalSpent > 2500 ? 'Over budget' : `₹${2500 - totalSpent} remaining`}
          </p>
        </div>
      </div>
    </WidgetCard>
  );
};

export default TShirtCollectionWidget;