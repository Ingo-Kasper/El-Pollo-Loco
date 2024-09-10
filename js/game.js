let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Start the game
 */
function startGame() {
  document.getElementById("startPage").classList.add("d-none");
  document.getElementById("canvas").classList.remove("d-none");
  inetLevel();
  initGame();
}

/**
 * This method inits the game by creating a new World Onject and define the canvas.
 */
function initGame() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
}


window.addEventListener('keydown', (e) => {  
  if (e.code === 'ArrowRight' || e.keyCode === 68) {
    keyboard.RIGHT = true;
  }
  if (e.code === 'ArrowLeft' || e.keyCode === 65) {
    keyboard.LEFT = true;
  }
  if (e.code === 'ArrowUp' || e.keyCode === 87) {
    keyboard.UP = true;
  }
  if (e.code === 'ArrowDown' || e.keyCode === 83) {
    keyboard.DOWN = true;
  }
  if (e.code === 'Space') {
    keyboard.SPACE = true;
  }
  if (e.code === 'KeyR') {
    keyboard.R = true;
  }
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'ArrowRight' || e.keyCode === 68) {
    keyboard.RIGHT = false;
  }
  if (e.code === 'ArrowLeft' || e.keyCode === 65) {
    keyboard.LEFT = false;
  }
  if (e.code === 'ArrowUp' || e.keyCode === 87) {
    keyboard.UP = false;
  }
  if (e.code === 'ArrowDown' || e.keyCode === 83) {
    keyboard.DOWN = false;
  }
  if (e.code === 'Space') {
    keyboard.SPACE = false;
  }
  if (e.code === 'KeyR') {
    keyboard.R = false;
  }
});