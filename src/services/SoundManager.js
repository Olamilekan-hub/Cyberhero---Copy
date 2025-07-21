/**
 * Fixes: Memory leaks, mobile performance, resource management
 */
class SoundManager {
  constructor() {
    this.audioContext = null;
    this.sounds = new Map();
    this.isEnabled = true;
    this.volume = 0.7;
    this.isInitialized = false;
    this.pendingSounds = new Set();
    this.audioBuffers = new Map();
    this.maxInstances = 5; 
    
    this.handleUserInteraction = this.handleUserInteraction.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    
    this.setupEventListeners();
  }

  /**
   * Initialize audio context on first user interaction
   */
  async initializeAudio() {
    if (this.isInitialized) return;
    
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) {
        console.warn('Web Audio API not supported, falling back to HTML5 Audio');
        this.useHTML5Fallback = true;
        return;
      }

      this.audioContext = new AudioContext();
      
      // Resume context if suspended (mobile requirement)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      
      this.isInitialized = true;
      console.log('🎵 SoundManager initialized with Web Audio API');
      
      // Preload critical sounds
      this.preloadCriticalSounds();
      
    } catch (error) {
      console.warn('Failed to initialize Web Audio API:', error);
      this.useHTML5Fallback = true;
    }
  }

  /**
   * Setup event listeners for mobile and performance optimization
   */
  setupEventListeners() {
    const interactionEvents = ['click', 'touchstart', 'keydown'];
    interactionEvents.forEach(event => {
      document.addEventListener(event, this.handleUserInteraction, { once: true });
    });

    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  /**
   * Handle first user interaction to initialize audio
   */
  async handleUserInteraction() {
    await this.initializeAudio();
  }

  /**
   * Handle page visibility changes for performance
   */
  handleVisibilityChange() {
    if (!this.audioContext) return;
    
    if (document.hidden) {
      // Suspend audio context when page hidden (saves battery)
      if (this.audioContext.state === 'running') {
        this.audioContext.suspend();
      }
    } else {
      // Resume audio context when page visible
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
    }
  }

  /**
   * Preload critical sounds (only essential ones)
   */
  preloadCriticalSounds() {
    const criticalSounds = {
      click: '/src/assets/sound/click-game-menu-147356.mp3',
      success: '/src/assets/sound/challenge-success-video-game-6346.mp3',
      fail: '/src/assets/sound/wrong-answer-129254.mp3'
    };

    Object.entries(criticalSounds).forEach(([key, src]) => {
      this.preloadSound(key, src);
    });
  }

  /**
   * Lazy load sound when needed
   */
  async preloadSound(soundKey, src) {
    if (this.audioBuffers.has(soundKey)) return;
    
    try {
      if (this.useHTML5Fallback) {
        const audio = new Audio(src);
        audio.preload = 'metadata'; // More efficient than 'auto'
        audio.volume = this.volume;
        this.sounds.set(soundKey, [audio]);
        return;
      }

      if (!this.audioContext) {
        await this.initializeAudio();
      }

      const response = await fetch(src);
      if (!response.ok) throw new Error(`Failed to load ${src}`);
      
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      
      this.audioBuffers.set(soundKey, audioBuffer);
      console.log(`🎵 Loaded sound: ${soundKey}`);
      
    } catch (error) {
      console.warn(`Failed to preload sound ${soundKey}:`, error);
      // Fallback to HTML5 Audio for this sound
      const audio = new Audio(src);
      audio.preload = 'metadata';
      audio.volume = this.volume;
      this.sounds.set(soundKey, [audio]);
    }
  }

  /**
   * Play sound with proper resource management
   */
  async play(soundKey, options = {}) {
    if (!this.isEnabled) return;

    try {
      // Lazy load if not already loaded
      if (!this.audioBuffers.has(soundKey) && !this.sounds.has(soundKey)) {
        const soundSrc = this.getSoundSrc(soundKey);
        if (soundSrc) {
          await this.preloadSound(soundKey, soundSrc);
        } else {
          console.warn(`Sound not found: ${soundKey}`);
          return;
        }
      }

      if (this.useHTML5Fallback || !this.audioContext) {
        this.playHTML5(soundKey);
        return;
      }

      this.playWebAudio(soundKey, options);
      
    } catch (error) {
      console.warn(`Failed to play sound ${soundKey}:`, error);
    }
  }

  /**
   * Play using Web Audio API (preferred method)
   */
  playWebAudio(soundKey, options = {}) {
    const audioBuffer = this.audioBuffers.get(soundKey);
    if (!audioBuffer) return;

    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();
    
    source.buffer = audioBuffer;
    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    // Apply volume
    gainNode.gain.value = this.volume * (options.volume || 1);
    
    // Start playback
    source.start(0);
    
    // Clean up when finished
    source.onended = () => {
      source.disconnect();
      gainNode.disconnect();
    };
  }

  /**
   * HTML5 Audio fallback
   */
  playHTML5(soundKey) {
    const audioInstances = this.sounds.get(soundKey);
    if (!audioInstances || audioInstances.length === 0) return;
    
    // Find available audio instance or create new one
    let audio = audioInstances.find(a => a.ended || a.paused);
    
    if (!audio && audioInstances.length < this.maxInstances) {
      audio = audioInstances[0].cloneNode();
      audio.volume = this.volume;
      audioInstances.push(audio);
    } else if (!audio) {
      audio = audioInstances[0]; // Use first instance if max reached
    }
    
    audio.currentTime = 0;
    audio.play().catch(error => {
      console.warn(`Failed to play sound: ${soundKey}`, error);
    });
  }

  /**
   * Get sound source URL
   */
  getSoundSrc(soundKey) {
    const soundFiles = {
      click: '/src/assets/sound/click-game-menu-147356.mp3',
      xp: '/src/assets/sound/collect-XP.mp3',
      success: '/src/assets/sound/challenge-success-video-game-6346.mp3',
      fail: '/src/assets/sound/wrong-answer-129254.mp3',
      coin: '/src/assets/sound/game-level-complete-143022.mp3'
    };
    
    return soundFiles[soundKey];
  }

  /**
   * Set master volume
   */
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    
    // Update HTML5 audio instances
    this.sounds.forEach(audioInstances => {
      audioInstances.forEach(audio => {
        audio.volume = this.volume;
      });
    });
  }

  /**
   * Mute all sounds
   */
  mute() {
    this.isEnabled = false;
  }

  /**
   * Unmute all sounds
   */
  unmute() {
    this.isEnabled = true;
  }

  /**
   * Toggle mute state
   */
  toggle() {
    this.isEnabled = !this.isEnabled;
  }

  /**
   * Cleanup resources (call on app unmount)
   */
  destroy() {
    // Clean up event listeners
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    
    // Close audio context
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
    }
    
    // Clear all sounds
    this.sounds.clear();
    this.audioBuffers.clear();
  }
}

// Export singleton instance
export default new SoundManager();