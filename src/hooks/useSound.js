import { useEffect, useCallback } from 'react';
import { soundManager } from '../services/SoundManager';

export const useSound = (soundName, soundSrc) => {
  useEffect(() => {
    if (soundSrc) {
      soundManager.preloadSound(soundName, soundSrc);
    }
  }, [soundName, soundSrc]);

  const playSound = useCallback(() => {
    soundManager.play(soundName);
  }, [soundName]);

  return playSound;
};