class BossBar extends DrawableObject {
  BossBar = 100;

  IMAGES_BossBar = [
    "img/7_statusbars/2_statusbar_endboss/green/green0.png",
    "img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "img/7_statusbars/2_statusbar_endboss/green/green100.png",
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES_BossBar);
    this.setBosshBar(this.bossEnergy);
    this.height = 50;
    this.width = 200;
    this.x = 500;
    this.y = 10;
  }

  setBosshBar(BossBar) {
    this.BossBar = BossBar;
    let path = this.IMAGES_BossBar[this.resolveBarIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the index of the image to display based on the boss's energy.
   * @returns {number} The index of the image corresponding to the current energy.
   */
  resolveBarIndex() {
    if (this.isBossBar() >= 100) {
      return 5;
    } else if (this.isBossBar() == 80) {
      return 4;
    } else if (this.isBossBar() == 60) {
      return 3;
    } else if (this.isBossBar() == 40) {
      return 2;
    } else if (this.isBossBar() == 20) {
      return 1;
    } else {
      return 0;
    }
  }

  isBossBar() {
    return this.BossBar;
  }
}
