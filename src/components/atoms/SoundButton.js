import React from 'react';
import SoundManager from '../../services/SoundManager';

const SoundButton = ({ children, soundKey = 'click' }) => {
  const playClickSound = () => {
    SoundManager.play(soundKey);
  };
  
  return <div onClick={playClickSound}>{children}</div>;
};

export default SoundButton;