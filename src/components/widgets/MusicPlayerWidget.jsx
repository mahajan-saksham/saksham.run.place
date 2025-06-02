import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import WidgetCard from './WidgetCard';

const MusicPlayerWidget = ({ onRemove, isDropdown = false, setIsMusicPlaying }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showVisualizer, setShowVisualizer] = useState(true);
  const iframeRef = useRef(null);

  // SoundCloud playlist/tracks - replace with your actual SoundCloud tracks
  const playlist = [
    {
      id: 1,
      title: "Chill Vibes Mix",
      artist: "Various Artists",
      soundcloudUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1234567890",
      embedId: "1234567890" // Replace with actual track ID
    },
    {
      id: 2,
      title: "Focus Flow",
      artist: "Ambient Works",
      soundcloudUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/0987654321",
      embedId: "0987654321" // Replace with actual track ID
    },
    {
      id: 3,
      title: "Creative Energy",
      artist: "Electronic Dreams",
      soundcloudUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1122334455",
      embedId: "1122334455" // Replace with actual track ID
    }
  ];

  // Audio visualizer bars
  const [bars, setBars] = useState(Array(12).fill(0));

  // Update parent component's music playing state
  useEffect(() => {
    if (setIsMusicPlaying) {
      setIsMusicPlaying(isPlaying);
    }
  }, [isPlaying, setIsMusicPlaying]);

  useEffect(() => {
    if (isPlaying && showVisualizer) {
      const interval = setInterval(() => {
        setBars(bars.map(() => Math.random() * 100));      }, 150);
      return () => clearInterval(interval);
    } else {
      setBars(Array(12).fill(0));
    }
  }, [isPlaying, showVisualizer]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const content = (
    <div className="p-4">
      {/* Current Track Info */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-white">{playlist[currentTrack].title}</h4>
        <p className="text-xs text-gray-400">{playlist[currentTrack].artist}</p>
      </div>

      {/* Audio Visualizer */}
      {showVisualizer && (
        <div className="mb-4 h-20 flex items-end justify-center gap-1">
          {bars.map((height, index) => (
            <div
              key={index}
              className={`w-2 bg-gradient-to-t from-accent-cyan to-accent-pink rounded-t transition-all duration-150 ${
                isDropdown ? 'max-w-[6px]' : ''
              }`}
              style={{ height: `${isPlaying ? height : 20}%` }}
            />
          ))}
        </div>
      )}

      {/* Player Controls */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={handlePrevious}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >          <SkipBack size={20} />
        </button>
        <button
          onClick={handlePlayPause}
          className="p-3 bg-accent-cyan rounded-full hover:bg-accent-cyan/80 transition-colors"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={handleNext}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <SkipForward size={20} />
        </button>
      </div>

      {/* Track Progress */}
      <div className="mb-4">
        <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-accent-cyan to-accent-pink transition-all duration-300"
            style={{ width: isPlaying ? '60%' : '0%' }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-400">
          <span>1:24</span>
          <span>3:45</span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-2">
        <Volume2 size={16} className="text-gray-400" />
        <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full w-3/4 bg-gray-400" />
        </div>
      </div>

      {/* SoundCloud Embed (hidden) */}
      <div className="hidden">
        <iframe
          ref={iframeRef}
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={`${playlist[currentTrack].soundcloudUrl}&color=%23ff5500&auto_play=${isPlaying}&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`}        />
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
      id="music-player"
      title="Music Player"
      icon="🎵"
      onRemove={onRemove}
      hasSettings={true}
      onSettings={() => setShowVisualizer(!showVisualizer)}
      className="h-full"
    >
      {content}
    </WidgetCard>
  );
};

export default MusicPlayerWidget;