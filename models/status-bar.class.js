class StatusBar extends DrawableObject {
  coinBar = 0;
  healthBar = 100;
  bottleBar = 0;

  IMAGES_COIN = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  IMAGES_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

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
    this.loadImages(this.IMAGES_COIN);
    this.loadImages(this.IMAGES_HEALTH);
    this.setHealthBar(100);
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = 20;
    this.y = 20;
    this.height = 50;
    this.width = 100;
  }

  setCoinBar(coinBar) {
    this.coinBar = coinBar;
    let path = this.IMAGES_COIN[this.resolveCoinImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveCoinImageIndex() {
    if (this.coinBar == 100) {
      return 1;
    } else if (this.coinBar > 80) {
      return 1;
    } else if (this.coinBar > 60) {
      return 2;
    } else if (this.coinBar > 40) {
      return 3;
    } else if (this.coinBar > 20) {
      return 4;
    } else {
      return 5;
    }
  }

  setHealthBar(healthBar) {
    this.healthBar = healthBar;
    let path = this.IMAGES_HEALTH[this.resolveHealthImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveHealthImageIndex() {
    if (this.healthBar == 100) {
      return 5;
    } else if (this.healthBar > 80) {
      return 4;
    } else if (this.healthBar > 60) {
      return 3;
    } else if (this.healthBar > 40) {
      return 2;
    } else if (this.healthBar > 20) {
      return 1;
    } else {
      return 0;
    }
  }

  setBottleBar(bottleBar) {
    this.bottleBar = bottleBar;
    let path = this.IMAGES_BOTTLE[this.resolveBottleImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveBottleImageIndex() {
    if (this.bottleBar == 100) {
      return 1;
    } else if (this.bottleBar > 80) {
      return 1;
    } else if (this.bottleBar > 60) {
      return 2;
    } else if (this.bottleBar > 40) {
      return 3;
    } else if (this.bottleBar > 20) {
      return 4;
    } else {
      return 5;
    }
  }
}
