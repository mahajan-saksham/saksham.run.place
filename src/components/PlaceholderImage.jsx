import { useState } from 'react';
import { Image } from 'lucide-react';

const PlaceholderImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholderText = 'Image coming soon',
  ...props 
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  if (imageError || !src) {
    return (
      <div className={`bg-gray-800/50 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center ${className}`}>
        <Image className="w-12 h-12 text-gray-500 mb-2" />
        <p className="text-sm text-gray-500">{placeholderText}</p>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className={`bg-gray-800/50 backdrop-blur-sm rounded-lg animate-pulse ${className}`} />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'hidden' : ''}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        {...props}
      />
    </>
  );
};

export default PlaceholderImage;