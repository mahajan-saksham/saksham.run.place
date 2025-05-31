import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, List } from 'lucide-react';
import WidgetCard from './WidgetCard';

const MusicPlayerWidget = ({ onClose, onMinimize }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(70);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef(null);

  // Mock playlist - replace with Spotify/YouTube API
  const playlist = [
    {
      id: 1,
      title: 'Synthwave Dreams',
      artist: 'Neon Nights',
      album: 'Cyberpunk Collection',
      duration: 234,
      cover: '/images/music/synthwave.jpg',
      color: '#FF6EC7'
    },
    {
      id: 2,
      title: 'Code Flow',
      artist: 'Dev Beats',
      album: 'Programming Vibes',
      duration: 189,
      cover: '/images/music/codeflow.jpg',
      color: '#0FF1CE'
    },
    {
      id: 3,
      title: 'Digital Rain',
      artist: 'Matrix Sound',
      album: 'Tech House',
      duration: 256,
      cover: '/images/music/digital.jpg',
      color: '#39FF14'
    },
    {
      id: 4,
      title: 'Pixel Perfect',
      artist: '8-Bit Orchestra',
      album: 'Retro Gaming',
      duration: 178,
      cover: '/images/music/pixel.jpg',
      color: '#FFD700'
    }
  ];

  const current = playlist[currentTrack];

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + (100 / current.duration);
        });
      }, 1000);
    } else {
      clearInterval(progressInterval.current);
    }

    return () => clearInterval(progressInterval.current);
  }, [isPlaying, current.duration]);
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    setProgress(0);
  };

  const handleTrackSelect = (index) => {
    setCurrentTrack(index);
    setProgress(0);
    setIsPlaying(true);
    setShowPlaylist(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Audio visualizer bars
  const bars = Array(8).fill(0);

  return (
    <WidgetCard
      id="music-player"
      title="Music Player"
      icon={<Music size={18} />}
      onClose={onClose}
      onMinimize={onMinimize}
      className="h-full"
      headerActions={
        <button
          onClick={() => setShowPlaylist(!showPlaylist)}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          title="Playlist"
        >
          <List size={14} />
        </button>
      }
    >
      <div className="p-4">
        {/* Album Cover */}
        <motion.div
          className="relative mx-auto w-48 h-48 rounded-lg overflow-hidden mb-4"
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 20, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
        >
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: current.color + '20' }}
          >
            <Music size={64} style={{ color: current.color }} />
          </div>
          
          {/* Visualizer Overlay */}
          {isPlaying && (
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1 p-4">
              {bars.map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-white/80 rounded-full"
                  animate={{
                    height: [
                      Math.random() * 40 + 10,
                      Math.random() * 40 + 10,
                      Math.random() * 40 + 10
                    ]
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
        {/* Track Info */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-white">{current.title}</h3>
          <p className="text-sm text-gray-400">{current.artist}</p>
          <p className="text-xs text-gray-500">{current.album}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{formatTime((progress / 100) * current.duration)}</span>
            <span>{formatTime(current.duration)}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-pink to-accent-cyan"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <SkipBack size={20} />
          </button>
          
          <button
            onClick={handlePlayPause}
            className="p-3 rounded-full bg-gradient-to-r from-accent-pink to-accent-cyan hover:scale-110 transition-transform"
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

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <Volume2 size={16} className="text-gray-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="flex-1 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #FF6EC7 0%, #0FF1CE ${volume}%, #374151 ${volume}%)`
            }}
          />
        </div>

        {/* Playlist */}
        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              className="absolute inset-0 bg-gray-900/95 backdrop-blur-xl p-4 overflow-y-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <h3 className="text-lg font-semibold mb-3">Playlist</h3>
              <div className="space-y-2">
                {playlist.map((track, index) => (
                  <motion.button
                    key={track.id}
                    onClick={() => handleTrackSelect(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      index === currentTrack
                        ? 'bg-gradient-to-r from-accent-pink/20 to-accent-cyan/20'
                        : 'hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded flex items-center justify-center"
                        style={{ backgroundColor: track.color + '20' }}
                      >
                        <Music size={20} style={{ color: track.color }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{track.title}</p>
                        <p className="text-xs text-gray-400">{track.artist}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatTime(track.duration)}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </WidgetCard>
  );
};

export default MusicPlayerWidget;