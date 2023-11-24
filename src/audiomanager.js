export default class AudioManager {
    constructor() {
      this.audioContext = new (window.AudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.onTrackEnded = this.onTrackEnded.bind(this);
      this.tracks = [];
  
      this.addTrack('Track 1', './sounds/A-Ha - Take On Me (Instrumental Version).mp3');
      this.addTrack('Track 2', './sounds/src_sounds_tetrisMain.mp3');
      
      this.currentTrackIndex = 0;

      this.soundGameOver = new Howl({
        src: ['./sounds/src_sounds_gameover.mp3'],
        volume: 0.8,
        loop: false
      });

      this.soundClearLine = new Howl({
        src: ['./sounds/src_sounds_clear.mp3'],
        volume: 0.8,
        loop: false
      });

    }
  
    addTrack(name, src) {
      const audioElement = new Audio();
      audioElement.src = src;
      audioElement.crossOrigin = 'anonymous';
  
      const source = this.audioContext.createMediaElementSource(audioElement);
      source.connect(this.gainNode);
  
      const track = { name, src, audioElement, source };
      this.tracks.push(track);
      audioElement.addEventListener('ended', this.onTrackEnded);
    }

    onTrackEnded() {
      this.nextTrack();
    }
  
    loadCurrentTrack() {
    const currentTrack = this.tracks[this.currentTrackIndex];
    if (currentTrack) {
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume().then(() => {
          currentTrack.audioElement.currentTime = 0;
          currentTrack.audioElement.play();
        });
      } else {
        currentTrack.audioElement.currentTime = 0;
        currentTrack.audioElement.play();
      }
    }
  }

  getGameOverSoundPlaying() {
    return this.gameOverSoundPlaying;
  }

  setGameOverSoundPlaying(value) {
    this.gameOverSoundPlaying = value;
  }

  
  playGameOver() {
    if (!this.gameOverSoundPlaying) {
      this.gameOverSoundPlaying = true;
      this.soundGameOver.play();
    }
  }

  playClearLine() {
    if (!this.clearSoundPlaying) {
      this.clearSoundPlaying = true;
      this.soundClearLine.play();
    }
    this.clearSoundPlaying = false;
  }
  
    play() {
      this.loadCurrentTrack();
    }
  
    pause() {
      const currentTrack = this.tracks[this.currentTrackIndex];
      if (currentTrack) {
        currentTrack.audioElement.pause();
        this.pausedTime = currentTrack.audioElement.currentTime;
      }
    }
  
    resume() {
      const currentTrack = this.tracks[this.currentTrackIndex];
      if (currentTrack) {
        if (this.audioContext.state === 'suspended') {
          this.audioContext.resume().then(() => {
            currentTrack.audioElement.currentTime = this.pausedTime || 0;
            currentTrack.audioElement.play();
          });
        } else {
          currentTrack.audioElement.currentTime = this.pausedTime || 0;
          currentTrack.audioElement.play();
        }
      }
    }
  

    stop() {
      const currentTrack = this.tracks[this.currentTrackIndex];
      if (currentTrack) {
        currentTrack.audioElement.pause();
        currentTrack.audioElement.currentTime = 0;
      }
    }
  
    nextTrack() {
      const currentTrack = this.tracks[this.currentTrackIndex];
      if (currentTrack) {
        currentTrack.audioElement.pause();
        currentTrack.audioElement.currentTime = 0;
      }
      this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
      this.loadCurrentTrack();
    }

    previousTrack() {
      const currentTrack = this.tracks[this.currentTrackIndex];
      if (currentTrack) {
        currentTrack.audioElement.pause();
      }
      this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
      this.loadCurrentTrack();
      if (currentTrack) {
        currentTrack.audioElement.currentTime = 0;
      }
    }
  
    setVolume(volume) {
      this.gainNode.gain.value = volume;
    }
  
    getCurrentTrackName() {
      const currentTrack = this.tracks[this.currentTrackIndex];
      return currentTrack ? currentTrack.name : '';
    }

    initializeButtons() {
      const toggleButton = document.getElementById('toggleButton');
      const volumeSlider = document.getElementById('volumeSlider');
      const nextTrack = document.getElementById('nextTrack');
      const prevTrack = document.getElementById('prevTrack');
  
      toggleButton.addEventListener('click', () => {
        if (this.gainNode.gain.value>0){
          this.savedVolume = this.gainNode.gain.value;
          this.savedSliderPosition = volumeSlider.value;
          volumeSlider.value = 0;
          this.setVolume(0);
        } else {
          const targetVolume = this.savedVolume || 0.7; 
          this.setVolume(targetVolume);
          volumeSlider.value = this.savedSliderPosition;
        }
      });

      nextTrack.addEventListener('click', () => {
        this.nextTrack();
      });
      prevTrack.addEventListener('click', () => {
        this.previousTrack();
      });
  
      volumeSlider.addEventListener('input', (event) => {
        const volume = parseFloat(event.target.value);
        this.setVolume(volume);
      });
    }
  }

  