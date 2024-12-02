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

  /**
   * Updates the boss bar value and selects the appropriate image.
   * @param {number} BossBar - The current boss level (0-100).
   */
  setBosshBar(BossBar) {
    this.BossBar = BossBar;
    let path = this.IMAGES_BossBar[this.resolveBarIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the index of the current image based on the boss bar value.
   * @returns {number} The index of the current image.
   */
  isPointsBar() {
    return this.BossBar;
  }
}
