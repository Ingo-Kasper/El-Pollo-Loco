let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;

let allSounds = [
  new Audio("audio/el-Pollo-Koco-Classig/bottleBreak.mp3"),
  new Audio("audio/el-Pollo-Koco-Classig/bottleThrowing.mp3"),
  new Audio("audio/el-Pollo-Koco-Classig/chickenHit.mp3"),
  new Audio("audio/el-Pollo-Koco-Classig/collectCoin.mp3"),
  new Audio("audio/el-Pollo-Koco-Classig/jump.mp3"),
  new Audio("audio/el-Pollo-Koco-Classig/running.mp3"),
  new Audio("audio/el-Pollo-Koco-Classig/win.mp3"),
  new Audio("audio/el-Pollo-Koco-Classig/male-hurt.mp3"),
  new Audio("audio/el-Pollo-Koco-Classig/Background_Musik(Desert-City).mp3"),
];

/**
 * This method is called when the page is loaded.
 */
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
    document.getElementById("overlayObject").classList.toggle("overlayObjectFullscreenStart");
    document.getElementById("overlayObject").classList.toggle("overlayObjectFullscreen");
    document.getElementById("impressum").classList.add("d-none");
    inetLevel();
    initGame();
  } else {
    document.getElementById("startPage").classList.add("d-none");
    document.getElementById("canvas").classList.remove("d-none");
    document.getElementById("overlayObject").classList.remove("overlayObject");
    document.getElementById("overlayObject").classList.add("overlayObjectPlay");
    document.getElementById("impressum").classList.add("d-none");
    document.getElementById("mobile-Touch-Button").classList.add("mobile-Touch-Button");
    document.getElementById("mobile-Touch-Button").classList.remove("d-none");
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
  document.getElementById("overlayObject").classList.remove("overlayObjectPlay");
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
  document.getElementById("impressum").classList.remove("d-none");
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
 * Enters fullscreen mode for the given element and handles start page visibility.
 *
 * @param {HTMLElement} element - The DOM element to display in fullscreen mode.
 */
function enterFullscreen(element) {
  requestFullscreen(element);
  toggleFullscreenState(true);
}

/**
 * Exits fullscreen mode and handles start page visibility.
 */
function exitFullscreen() {
  requestExitFullscreen();
  toggleFullscreenState(false);
}

/**
 * Requests fullscreen for the given element using vendor-prefixed methods.
 *
 * @param {HTMLElement} element - The DOM element to display in fullscreen mode.
 */
function requestFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode using vendor-prefixed methods.
 */
function requestExitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * Toggles fullscreen state and updates start page or canvas state.
 *
 * @param {boolean} isEntering - `true` if entering fullscreen, `false` if exiting fullscreen.
 */
function toggleFullscreenState(isEntering) {
  if (!startPage.classList.contains("d-none")) {
    if (isEntering) {
      this.enterFullscreenStartPage();
    } else {
      this.disableFullscreenStartPage();
    }
  } else {
    if (isEntering) {
      enterFullscreenCanvas();
    } else {
      this.disableFullscreenCanvias();
    }
  }
}

/**
 * This method is used for touch when performed on mobile.
 */
function toutchControl() {
  document.getElementById("touchLeft").addEventListener("touchstart", (e) => {e.preventDefault(); keyboard.LEFT = true;});
  document.getElementById("touchLeft-helpBox").addEventListener("touchstart", (e) => {e.preventDefault(); keyboard.LEFT = true;});
  document.getElementById("touchLeft").addEventListener("touchend", (e) => {e.preventDefault();keyboard.LEFT = false;});
  document.getElementById("touchLeft-helpBox").addEventListener("touchend", (e) => {e.preventDefault();keyboard.LEFT = false;});
  document.getElementById("touchRight").addEventListener("touchstart", (e) => {e.preventDefault();keyboard.RIGHT = true;});
  document.getElementById("touchRight-helpBox").addEventListener("touchstart", (e) => {e.preventDefault();keyboard.RIGHT = true;});
  document.getElementById("touchRight").addEventListener("touchend", (e) => {e.preventDefault();keyboard.RIGHT = false;});
  document.getElementById("touchRight-helpBox").addEventListener("touchend", (e) => {e.preventDefault();keyboard.RIGHT = false;});
  document.getElementById("touchJump").addEventListener("touchstart", (e) => {e.preventDefault();keyboard.UP = true;});
  document.getElementById("touchJump-helpBox").addEventListener("touchstart", (e) => {e.preventDefault();keyboard.UP = true;});
  document.getElementById("touchJump").addEventListener("touchend", (e) => {e.preventDefault();keyboard.UP = false;});
  document.getElementById("touchJump-helpBox").addEventListener("touchend", (e) => {e.preventDefault();keyboard.UP = false;});
  document.getElementById("touchThrow").addEventListener("touchstart", (e) => {e.preventDefault();keyboard.SPACE = true;});
  document.getElementById("touchThrow-helpBox").addEventListener("touchstart", (e) => {e.preventDefault();keyboard.SPACE = true;});
  document.getElementById("touchThrow").addEventListener("touchend", (e) => {e.preventDefault();keyboard.SPACE = false;});
  document.getElementById("touchThrow-helpBox").addEventListener("touchend", (e) => {e.preventDefault();keyboard.SPACE = false;});
}

window.addEventListener("keydown", (e) => {
  if (e.code === "ArrowRight" || e.keyCode === 68) {keyboard.RIGHT = true;}
  if (e.code === "ArrowLeft" || e.keyCode === 65) {keyboard.LEFT = true;}
  if (e.code === "ArrowUp" || e.keyCode === 87) {keyboard.UP = true;}
  if (e.code === "Space") {keyboard.SPACE = true;}
});

window.addEventListener("keyup", (e) => {
  if (e.code === "ArrowRight" || e.keyCode === 68) {keyboard.RIGHT = false;}
  if (e.code === "ArrowLeft" || e.keyCode === 65) {keyboard.LEFT = false;}
  if (e.code === "ArrowUp" || e.keyCode === 87) {keyboard.UP = false;}
  if (e.code === "Space") {keyboard.SPACE = false;}
});

/**
 * Switches the `startPage` to fullscreen mode for the start page view.
 * Adjusts the associated CSS classes to enable fullscreen layout and styling.
 */
function enterFullscreenStartPage() {
  document.getElementById("startPage").classList.remove("startPage");
  document.getElementById("startPage").classList.add("startPageFullScreen");
  document.getElementById("overlayObject").classList.add("overlayObjectFullscreenStart");
  document.getElementById("overlayObject").classList.remove("overlayObject");
  document.getElementById("canvas").classList.remove("canvas-Responsive");
}

/**
 * Switches the `startPage` and `canvas` to fullscreen mode for gameplay.
 * Updates various elements' classes to reflect fullscreen game state.
 */
function enterFullscreenCanvas() {
  document.getElementById("startPage").classList.remove("startPage");
  document.getElementById("overlayObject").classList.add("overlayObjectFullscreen");
  document.getElementById("startPage").classList.add("startPageFullScreen");
  document.getElementById("overlayObject").classList.remove("overlayObjectPlay");
  document.getElementById("canvas").classList.add("canvasFullscreen");
  document.getElementById("mobile-Touch-Button").classList.remove("mobile-Touch-Button");
  document.getElementById("mobile-Touch-Button").classList.add("mobile-Touch-Button-Fullscreen");
  document.getElementById("canvas").classList.remove("canvas-Responsive");
}

/**
 * Reverts the `startPage` from fullscreen mode back to its default layout.
 * Adjusts CSS classes to restore the initial styles of the elements.
 */
function disableFullscreenStartPage() {
  document.getElementById("startPage").classList.add("startPage");
  document.getElementById("startPage").classList.remove("startPageFullScreen");
  document.getElementById("overlayObject").classList.remove("overlayObjectFullscreenStart");
  document.getElementById("overlayObject").classList.add("overlayObject");
  document.getElementById("canvas").classList.add("canvas-Responsive");
}

/**
 * Reverts the `startPage` and `canvas` from fullscreen gameplay mode.
 * Restores the default layout and associated CSS classes of the elements.
 */
function disableFullscreenCanvias() {
  document.getElementById("startPage").classList.add("startPage");
  document.getElementById("overlayObject").classList.remove("overlayObjectFullscreen");
  document.getElementById("startPage").classList.remove("startPageFullScreen");
  document.getElementById("overlayObject").classList.add("overlayObjectPlay");
  document.getElementById("overlayObject").classList.remove("overlayObjectFullscreenStart");
  document.getElementById("canvas").classList.remove("canvasFullscreen");
  document.getElementById("mobile-Touch-Button").classList.add("mobile-Touch-Button");
  document.getElementById("mobile-Touch-Button").classList.remove("mobile-Touch-Button-Fullscreen");
  document.getElementById("canvas").classList.add("canvas-Responsive");
}
