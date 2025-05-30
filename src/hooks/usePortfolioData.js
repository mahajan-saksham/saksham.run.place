// Custom hook to use our portfolio data
import { portfolioData } from '../data/portfolioData';

export const usePortfolioData = () => {
  const getData = () => {
    return portfolioData;
  };

  const updateData = (newData) => {
    // In a real app, this would update a database
    console.log('Updating portfolio data:', newData);
  };

  return {
    data: portfolioData,
    getData,
    updateData
  };
};