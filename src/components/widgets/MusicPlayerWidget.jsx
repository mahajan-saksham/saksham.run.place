import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import WidgetCard from './WidgetCard';

const MusicPlayerWidget = ({ onRemove }) => {
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

  useEffect(() => {
    if (isPlaying && showVisualizer) {
      const interval = setInterval(() => {
        setBars(bars.map(() => Math.random() * 100));
      }, 150);
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
    setIsPlaying(false);
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(false);
  };

  const currentSong = playlist[currentTrack];

  return (
    <WidgetCard 
      title="Music Player" 
      icon={<Music className="w-5 h-5" />}
      onRemove={onRemove}
      className="music-player-widget"
    >
      <div className="space-y-4">
        {/* Current Track Info */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mb-4 flex items-center justify-center">
            <Music className="w-16 h-16 text-white/50" />
          </div>
          <h3 className="font-medium text-white text-lg">{currentSong.title}</h3>
          <p className="text-sm text-white/60 mt-1">{currentSong.artist}</p>
        </div>

        {/* Audio Visualizer */}
        {showVisualizer && (
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-end justify-center gap-1 h-20">
              {bars.map((height, index) => (
                <div
                  key={index}
                  className="w-2 bg-gradient-to-t from-accent-cyan to-purple-500 rounded-t transition-all duration-150"
                  style={{ 
                    height: `${isPlaying ? height : 10}%`,
                    opacity: isPlaying ? 1 : 0.3
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Player Controls */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={handlePrevious}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>            
            <button
              onClick={handlePlayPause}
              className="p-3 bg-accent-cyan rounded-full hover:bg-accent-cyan/80 transition-colors"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>
            
            <button
              onClick={handleNext}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="bg-white/10 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent-cyan to-purple-500 transition-all duration-300"
              style={{ width: isPlaying ? '45%' : '0%' }}
            />
          </div>
          
          <div className="flex items-center justify-between mt-2 text-xs text-white/60">
            <span>1:32</span>
            <span>3:45</span>
          </div>
        </div>

        {/* Playlist */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
          <h4 className="text-sm font-medium text-white/60 mb-2">Playlist</h4>
          <div className="space-y-2">
            {playlist.map((track, index) => (
              <button
                key={track.id}
                onClick={() => {
                  setCurrentTrack(index);
                  setIsPlaying(false);
                }}
                className={`w-full text-left p-2 rounded-lg transition-colors ${
                  index === currentTrack 
                    ? 'bg-accent-cyan/20 text-accent-cyan' 
                    : 'hover:bg-white/10 text-white/70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{track.title}</p>
                    <p className="text-xs opacity-60">{track.artist}</p>
                  </div>
                  {index === currentTrack && isPlaying && (
                    <Volume2 className="w-4 h-4" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
        {/* Toggle Visualizer */}
        <button
          onClick={() => setShowVisualizer(!showVisualizer)}
          className="w-full py-2 text-xs text-white/60 hover:text-white transition-colors"
        >
          {showVisualizer ? 'Hide' : 'Show'} Visualizer
        </button>
      </div>
    </WidgetCard>
  );
};

export default MusicPlayerWidget;