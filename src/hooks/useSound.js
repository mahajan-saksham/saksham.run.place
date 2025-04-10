import { useCallback } from 'react';

const sounds = {
  click: new Audio('/sounds/click.mp3'),
  hover: new Audio('/sounds/hover.mp3'),
  open: new Audio('/sounds/open.mp3'),
  close: new Audio('/sounds/close.mp3'),
  error: new Audio('/sounds/error.mp3'),
  success: new Audio('/sounds/success.mp3'),
  typing: new Audio('/sounds/typing.mp3'),
};

// Preload all sounds
Object.values(sounds).forEach(sound => {
  sound.load();
});

export const useSound = () => {
  const playSound = useCallback((soundName, volume = 0.3) => {
    const sound = sounds[soundName];
    if (sound) {
      sound.volume = volume;
      sound.currentTime = 0;
      sound.play().catch(() => {
        // Ignore errors from browsers blocking autoplay
      });
    }
  }, []);

  return { playSound };
}; 