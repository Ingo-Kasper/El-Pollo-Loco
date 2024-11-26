class BottleBar extends DrawableObject {
  bottleBar = 0;

  IMAGES_BOTTLE = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  bottle_Break_sound = new Audio(
    "../audio/el-Pollo-Koco-Classig/bottleBreak.mp3"
  );
  bottle_Throwing_sound = new Audio(
    "../audio/el-Pollo-Koco-Classig/bottleThrowing.mp3"
  );

  constructor() {
    super();
    this.loadImages(this.IMAGES_BOTTLE);
    this.setBottleBar(0);
    this.height = 50;
    this.width = 200;
    this.x = 0;
    this.y = 60;
  }

  /**
   * Updates the bottle bar value and selects the appropriate image.
   * @param {number} bottleBar - The current bottle level (0-100).
   */
  setBottleBar(bottleBar) {
    this.bottleBar = bottleBar;
    let path = this.IMAGES_BOTTLE[this.resolveBarIndex()];
    this.img = this.imageCache[path];
  }

  isPointsBar() {
    return this.bottleBar;
  }

  collectBottle() {
    if (this.bottleBar < 100) {
      this.bottleBar += 20;
      this.setBottleBar(this.bottleBar);
      if (this.isMuteOn()) {
        allSounds[0].play();
      }
    }
  }

  throwPullOff() {
    if (this.bottleBar >= 20) {
      this.bottleBar -= 20;
      this.setBottleBar(this.bottleBar);
      if (this.isMuteOn()) {
        allSounds[1].play();
      }
    } else {
      this.bottleBar = 0;
      this.setBottleBar(this.bottleBar);
      if (this.isMuteOn()) {
        allSounds[1].play();
      }
    }
  }
}
