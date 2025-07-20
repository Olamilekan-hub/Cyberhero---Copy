// src/services/SoundManager.js
class SoundManager {
  constructor() {
    this.sounds = new Map();
    this.isEnabled = true;
    this.volume = 0.7;
    this.preloadSounds();
  }

  preloadSounds() {
    const soundFiles = {
      click: '/src/assets/sound/click-game-menu-147356.mp3',
      xp: '/src/assets/sound/collect-XP.mp3',
      success: '/src/assets/sound/challenge-success-video-game-6346.mp3',
      fail: '/src/assets/sound/wrong-answer-129254.mp3',
      coin: '/src/assets/sound/game-level-complete-143022.mp3'
    };

    Object.entries(soundFiles).forEach(([key, src]) => {
      const audio = new Audio(src);
      audio.preload = 'auto';
      audio.volume = this.volume;
      this.sounds.set(key, audio);
    });
  }

  play(soundKey) {
    if (!this.isEnabled) return;
    
    const audio = this.sounds.get(soundKey);
    if (audio) {
      // Reset to beginning and play
      audio.currentTime = 0;
      audio.play().catch(error => {
        console.warn(`Failed to play sound: ${soundKey}`, error);
      });
    }
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.sounds.forEach(audio => {
      audio.volume = this.volume;
    });
  }

  mute() {
    this.isEnabled = false;
  }

  unmute() {
    this.isEnabled = true;
  }

  toggle() {
    this.isEnabled = !this.isEnabled;
  }
}

// Export singleton instance
export default new SoundManager();