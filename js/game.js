let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = true;

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
}

/**
 * this Mute Audio
 */
function toggleMute() {
  const audioMute = document.getElementById("muteValume");
  if (!audio) {
    audio = true;
    audioMute.src = "img/img/sound.png";
    document.getElementById("volumeOff").classList.add("d-none");
    document.getElementById("volumeOn").classList.remove("d-none");
  } else {
    audio = false;
    audioMute.src = "img/no-sound.png";
    document.getElementById("volumeOff").classList.remove("d-none");
    document.getElementById("volumeOn").classList.add("d-none");
  }
}

/**
 * Save Sounds in an Array and then stop them.
 */
function handleMute() {
  allSounds.forEach((sound) => {
    sound.muted = isMuted;
    // sound.pause();
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
  if (e.code === "ArrowDown" || e.keyCode === 83) {
    keyboard.DOWN = true;
  }
  if (e.code === "Space") {
    keyboard.SPACE = true;
  }
  if (e.code === "KeyR") {
    keyboard.R = true;
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
  if (e.code === "ArrowDown" || e.keyCode === 83) {
    keyboard.DOWN = false;
  }
  if (e.code === "Space") {
    keyboard.SPACE = false;
  }
  if (e.code === "KeyR") {
    keyboard.R = false;
  }
});
