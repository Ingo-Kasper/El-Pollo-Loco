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

  isPointsBar() {
    return this.BossBar;
  }
}
