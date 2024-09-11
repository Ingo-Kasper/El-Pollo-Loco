let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;

let allSounds = [
  new Audio("audio/el-Pollo-Koco-Classig/bottleBreak.mp3"), // Flasche zerbricht
  new Audio("audio/el-Pollo-Koco-Classig/bottleThrowing.mp3"), // Flaschen Wurf
  new Audio("audio/el-Pollo-Koco-Classig/chickenHit.mp3"), // Chicken Hit
  new Audio("audio/el-Pollo-Koco-Classig/collectCoin.mp3"), // Coin sammeln
  new Audio("audio/el-Pollo-Koco-Classig/jump.mp3"), // Jump
  new Audio("audio/el-Pollo-Koco-Classig/running.mp3"), // Running
  new Audio("audio/el-Pollo-Koco-Classig/win.mp3"), // Win
];

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
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  toutchControl();
}

/**
 * this Mute Audio
 */
function toggleMute() {
  const audioMute = document.getElementById("muteValume");
  if (!isMuted) {
    isMuted = true;
    document.getElementById("volumeOff").classList.add("d-none");
    document.getElementById("volumeOn").classList.remove("d-none");
  } else {
    isMuted = false;
    document.getElementById("volumeOff").classList.remove("d-none");
    document.getElementById("volumeOn").classList.add("d-none");
  }
}

function fullscreen() {
  let fullscreen = document.getElementById("fullscreen");
  enterFullscreen(fullscreen);
  exitFullscreen(fullscreen);
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    // iOS Safari
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function toutchControl() {
document.getElementById("touchLeft").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.LEFT = true;
  console.log("touchLeft");
});

document.getElementById("touchLeft").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.LEFT = false;
});

document.getElementById("touchRight").addEventListener("touchstart", (e) => {
  e.preventDefault();
  RIGHT = true;
});

document.getElementById("touchRight").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.RIGHT = false;
});

document.getElementById("touchJump").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.UP = true;
});

document.getElementById("touchJump").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.UP = false;
});

document.getElementById("touchThrow").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.SPACE = true;
});

document.getElementById("touchThrow").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.SPACE = false;
});
}

window.addEventListener("keydown", (e) => {
  if (e.code === "ArrowRight" || e.keyCode === 68) {
    keyboard.RIGHT = true;
  }
  if (e.code === "ArrowLeft" || e.keyCode === 65) {
    keyboard.LEFT = true;
  }
  if (e.code === "ArrowUp" || e.keyCode === 87) {
    keyboard.UP = true;
  }
  if (e.code === "Space") {
    keyboard.SPACE = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.code === "ArrowRight" || e.keyCode === 68) {
    keyboard.RIGHT = false;
  }
  if (e.code === "ArrowLeft" || e.keyCode === 65) {
    keyboard.LEFT = false;
  }
  if (e.code === "ArrowUp" || e.keyCode === 87) {
    keyboard.UP = false;
  }
  if (e.code === "Space") {
    keyboard.SPACE = false;
  }
});
