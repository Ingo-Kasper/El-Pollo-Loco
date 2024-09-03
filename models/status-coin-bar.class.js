class CoinBar extends DrawableObject {
  coinBar = 0;

  IMAGES_COIN = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES_COIN);
    this.setCoinBar(0);
    this.height = 50;
    this.width = 200;
    this.x = 20;
    this.y = 30;
  }

  setCoinBar(coin) {
    this.coinBar = coin;
    let path = this.IMAGES_COIN[this.resolveBarIndex()];
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
