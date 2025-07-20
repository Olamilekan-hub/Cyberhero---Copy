import React from 'react';
import SoundManager from '../../services/SoundManager';

const SoundControls = () => {
  const [isEnabled, setIsEnabled] = React.useState(SoundManager.isEnabled);
  const [volume, setVolume] = React.useState(SoundManager.volume);

  const toggleSound = () => {
    SoundManager.toggle();
    setIsEnabled(SoundManager.isEnabled);
  };

  const handleVolumeChange = (newVolume) => {
    SoundManager.setVolume(newVolume);
    setVolume(newVolume);
  };

  return (
    <div>
      <button onClick={toggleSound}>
        {isEnabled ? '🔊 Sound On' : '🔇 Sound Off'}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
      />
    </div>
  );
};

export default SoundControls;