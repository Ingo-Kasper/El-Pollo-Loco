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

  /**
   * Updates the coin bar value and selects the appropriate image.
   * @param {number} coin - The current coin level (0-100).
   */
  setCoinBar(coin) {
    this.coinBar = coin;
    let path = this.IMAGES_COIN[this.resolveBarIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * 
   * @returns The coin bar value
   */
  isPointsBar() {
    return this.coinBar;
  }

  /**
   * Increases the coin bar by 20 when a coin is collected, up to a maximum of 100.
   * - Updates the `coinBar` property and ensures it does not exceed 100.
   * - Calls the `setCoinBar` method to update the coin bar display.
   * - Plays a sound effect if the mute option is off.
   */
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
