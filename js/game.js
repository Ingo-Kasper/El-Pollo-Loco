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
  new Audio("audio/el-Pollo-Koco-Classig/male-hurt.mp3"), // Hurt
  new Audio("audio/el-Pollo-Koco-Classig/Background_Musik(Desert-City).mp3"), // Background Musik
];

function backgrundMusik() {
  if (isMuted == true) {
    allSounds[8].play();
  } else {
    allSounds[8].pause();
  }
}

/**
 * Start the game
 */
function startGame() {
  if (document.fullscreenElement) {
    document.getElementById("startPage").classList.add("d-none");
    document.getElementById("canvas").classList.remove("d-none");
    document
      .getElementById("overlayObject")
      .classList.toggle("overlayObjectFullscreenStart");
    document
      .getElementById("overlayObject")
      .classList.toggle("overlayObjectFullscreen");
    inetLevel();
    initGame();
  } else {
    document.getElementById("startPage").classList.add("d-none");
    document.getElementById("canvas").classList.remove("d-none");
    document.getElementById("overlayObject").classList.remove("overlayObject");
    document.getElementById("overlayObject").classList.add("overlayObjectPlay");
    inetLevel();
    initGame();
  }
}

/**
 * Restart the game by victory
 */
function restartGameByVitctory() {
  document.getElementById("victory").classList.add("d-none");
  document.getElementById("victory").classList.remove("victoryPage");
  inetLevel();
  initGame();
}

/**
 * Restart the game by game over
 */
function restartGameByGameOver() {
  document.getElementById("lost").classList.add("d-none");
  document.getElementById("lost").classList.remove("lostPage");
  inetLevel();
  initGame();
}

/**
 * back to the start page
 */
function finishGameByVitctory() {
  document.getElementById("victory").classList.add("d-none");
  document.getElementById("victory").classList.remove("victoryPage");
  document.getElementById("startPage").classList.remove("d-none");
  document.getElementById("canvas").classList.add("d-none");
  document
    .getElementById("overlayObject")
    .classList.remove("overlayObjectPlay");
  document.getElementById("overlayObject").classList.add("overlayObject");
}

/**
 * back to the start page
 */
function finishGameByGameOver() {
  document.getElementById("lost").classList.add("d-none");
  document.getElementById("lost").classList.remove("lostPage");
  document.getElementById("startPage").classList.remove("d-none");
  document.getElementById("canvas").classList.add("d-none");
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
  this.backgrundMusik();
}

/**
 * Toggles the fullscreen mode for a specified element.
 * Checks if fullscreen is active and either enters or exits fullscreen mode accordingly.
 */
function fullscreen() {
  let fullscreenElement = document.fullscreenElement;
  let fullscreen = document.getElementById("fullscreen");

  if (!fullscreenElement) {
    enterFullscreen(fullscreen);
  } else {
    exitFullscreen();
  }
}

/**
 * Enters fullscreen mode for the given element.
 * Includes support for older browsers using vendor-prefixed methods.
 * 
 * @param {HTMLElement} element - The DOM element to display in fullscreen mode.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
    if (!startPage.classList.contains("d-none")) {
      this.enterFullscreenStartPage();
    } else {
      enterFullscreenCanvas();
    }
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen(); // For older versions of Internet Explorer
    if (!startPage.classList.contains("d-none")) {
      this.enterFullscreenStartPage();
    } else {
      enterFullscreenCanvas();
    }
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen(); // For Safari on iOS
    if (!startPage.classList.contains("d-none")) {
      this.enterFullscreenStartPage();
    } else {
      enterFullscreenCanvas();
    }
  }
}

/**
 * Exits fullscreen mode if it is currently active.
 * Includes support for older browsers using vendor-prefixed methods.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
    if (!startPage.classList.contains("d-none")) {
      this.disableFullscreenStartPage();
    } else {
      this.disableFullscreenCanvias();
    }
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen(); // For older versions of Internet Explorer
    if (!startPage.classList.contains("d-none")) {
      this.disableFullscreenStartPage();
    } else {
      this.disableFullscreenCanvias();
    }
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen(); // For Safari on iOS
    if (!startPage.classList.contains("d-none")) {
      this.disableFullscreenStartPage();
    } else {
      this.disableFullscreenCanvias();
    }
  }
}

function toutchControl() {
  document.getElementById("touchLeft").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });

  document.getElementById("touchLeft").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  document.getElementById("touchRight").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
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

function enterFullscreenStartPage() {
  document.getElementById("startPage").classList.remove("startPage");
  document.getElementById("startPage").classList.add("startPageFullScreen");
  document.getElementById("overlayObject").classList.add("overlayObjectFullscreenStart");
  document.getElementById("overlayObject").classList.remove("overlayObject");
  document.getElementById("canvas").classList.remove("canvas-Responsive");
}

function enterFullscreenCanvas() {
  document.getElementById("startPage").classList.remove("startPage");
  document.getElementById("overlayObject").classList.add("overlayObjectFullscreen");
  document.getElementById("startPage").classList.add("startPageFullScreen");
  document.getElementById("overlayObject").classList.remove("overlayObjectPlay");
  document.getElementById("canvas").classList.add("canvasFullscreen");
  document.getElementById("Mobile-Touch-Button").classList.remove("Mobile-Touch-Button");
  document.getElementById("Mobile-Touch-Button").classList.add("Mobile-Touch-Button-Fullscreen");
  document.getElementById("canvas").classList.remove("canvas-Responsive");
}

function disableFullscreenStartPage()  {
  document.getElementById("startPage").classList.add("startPage");
  document.getElementById("startPage").classList.remove("startPageFullScreen");
  document.getElementById("overlayObject").classList.remove("overlayObjectFullscreenStart");
  document.getElementById("overlayObject").classList.add("overlayObject");
  document.getElementById("canvas").classList.add("canvas-Responsive");
}

function disableFullscreenCanvias() {
  document.getElementById("startPage").classList.add("startPage");
  document.getElementById("overlayObject").classList.remove("overlayObjectFullscreen");
  document.getElementById("startPage").classList.remove("startPageFullScreen");
  document.getElementById("overlayObject").classList.add("overlayObjectPlay");
  document.getElementById("overlayObject").classList.remove("overlayObjectFullscreenStart");
  document.getElementById("canvas").classList.remove("canvasFullscreen");
  document.getElementById("Mobile-Touch-Button").classList.add("Mobile-Touch-Button");
  document.getElementById("Mobile-Touch-Button").classList.remove("Mobile-Touch-Button-Fullscreen");
  document.getElementById("canvas").classList.add("canvas-Responsive");
}
