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

  isPointsBar() {
    return this.coinBar;
  }

  collectCoin() {
    if (this.coinBar < 100) {
      this.coinBar += 20;
      this.setCoinBar(this.coinBar);
    }
    if (this.isMuteOn()) {
      allSounds[3].play();
    }
  }
}
