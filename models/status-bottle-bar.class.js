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

  constructor() {
    super();
    this.loadImages(this.IMAGES_BOTTLE);
    this.setBottleBar(0);
    this.height = 50;
    this.width = 200;
    this.x = 0;
    this.y = 60;
  }

  setBottleBar(bottleBar) {
    this.bottleBar = bottleBar;
    let path = this.IMAGES_BOTTLE[this.resolveBarIndex()];
    this.img = this.imageCache[path];
  }

  resolveBarIndex() {
    if (this.statusBar == 100) {
      return 5;
    } else if (this.statusBar == 80) {
      return 4;
    } else if (this.statusBar == 60) {
      return 3;
    } else if (this.statusBar == 40) {
      return 2;
    } else if (this.bottleBar == 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
