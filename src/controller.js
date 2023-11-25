export default class Controller {
  constructor(game, view, audioManager) {
    this.game = game;
    this.view = view;
    this.audioManager = audioManager;
    this.isPlaying = false;
    this.intervalId = null;

    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));
    this.view.renderStartScreen();
    this.volumeSlider = document.getElementById('volumeSlider');
  }

  update() {
    this.game.movePieceDown();
    this.updateView();
  }

  play() {
    this.isPlaying = true;
    this.updateView();
    this.startTimer();
    this.audioManager.play();

  }

  pause() {
    this.isPlaying = false;
    this.stopTimer();
    this.updateView();
  }

  reset() {
    this.game.reset();
    this.stopTimer();
    this.audioManager.setGameOverSoundPlaying(false);
  }

  updateView() {
    const state = this.game.getState();
    if (state.isGameOver) {
      this.audioManager.stop();
      this.view.renderEndScreen(state);
      this.audioManager.playGameOver(this.volumeSlider.value);
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

  handleKeyDown(event) {
    const state = this.game.getState();
    switch (event.keyCode) {
      case 13: //ENTER
        if (state.isGameOver) {
          this.reset();
          this.startTimer();
          this.audioManager.play();
        } else if (this.isPlaying) {
          this.pause();
          this.audioManager.pause();
        } else {
          this.play();
          this.startTimer();
          this.audioManager.resume();
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
