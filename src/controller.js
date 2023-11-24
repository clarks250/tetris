export default class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
    this.isPlaying = false;
    this.intervalId = null;
    this.sound = new Howl({
      src: ['./src/A-Ha - Take On Me (Instrumental Version).mp3'],
      volume: 0.7,
      loop: true,
    });

    this.toggleButton = document.getElementById('toggleButton');
    this.volumeSlider = document.getElementById('volumeSlider');

    this.toggleButton.addEventListener('click', this.toggleMusic.bind(this));
    this.volumeSlider.addEventListener('input', this.changeVolume.bind(this));

    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));
    this.view.renderStartScreen();
  }

  update() {
    this.game.movePieceDown();
    this.updateView();
  }

  play() {
    this.isPlaying = true;
    this.updateView();
    this.startTimer();
    this.sound.play();
  }

  pause() {
    this.isPlaying = false;
    this.stopTimer();
    this.updateView();
    this.sound.pause();
  }

  reset() {
    this.game.reset();
    this.play();
    this.stopTimer();
  }

  updateView() {
    const state = this.game.getState();
    if (state.isGameOver) {
      this.sound.stop();
      this.view.renderEndScreen(state);
    } else if (!this.isPlaying) {
      this.view.renderPauseScreen();
    } else {
      this.view.renderMainScreen(state);
    }
  }

  startTimer() {
    const speed = 1000 - this.game.getState().level * 100;
    if (!this.intervalId) {
      this.intervalId = setInterval(
        () => {
          this.update();
        },
        speed > 0 ? speed : 100
      );
    }
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  toggleMusic() {
    if (this.isPlaying) {
      if (this.sound.playing()) {
        this.sound.pause();
      } else {
        this.sound.play();
      }
      this.updateView();
    }
  }

  changeVolume() {
    const volume = parseFloat(this.volumeSlider.value);
    this.sound.volume(volume);
  }

  handleKeyDown(event) {
    const state = this.game.getState();
    switch (event.keyCode) {
      case 13: //ENTER
        if (state.isGameOver) {
          this.reset();
          this.startTimer();
        } else if (this.isPlaying) {
          this.pause();
        } else {
          this.play();
          this.startTimer();
        }
        break;
      case 37: //LEFT ARROW
        game.movePieceLeft();
        this.updateView();
        break;
      case 32: //UP ARROW
        game.rotatePiece();
        this.updateView();
        break;
      case 39: //RIGHT ARROW
        game.movePieceRight();
        this.updateView();
        break;
      case 40: //DOWN ARROW
        this.stopTimer();
        game.movePieceDown();
        this.updateView();
        event.preventDefault();
        break;
    }
  }
  handleKeyUp(event) {
    switch (event.keyCode) {
      case 40: //DOWN ARROW
        this.startTimer();
        event.preventDefault();
        break;
    }
  }
}
