import Game from "./src/game.js";
import View from "./src/view.js";
import Controller from "./src/controller.js";
import AudioManager from "./src/audiomanager.js";

const root = document.querySelector("#root");

const audioManager = new AudioManager();
const game = new Game(audioManager);
const view = new View(root, 560, 560, 20, 10);
const controller = new Controller(game, view, audioManager);
audioManager.initializeButtons();

window.game = game;
window.view = view;
window.controller = controller;