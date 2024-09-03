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
    this.loadImages(this.IMAGES_BOTTLE);
    this.setHealthBar(100);
    this.setCoinBar(0);
    this.setBottleBar(0);
    this.height = 50;
    this.width = 200;
    this.x = 20;
  }

  setHealthBar(health) {
    this.y = 10;
    this.healthBar = health;
    let path = this.IMAGES_HEALTH[this.resolveBarIndex(this.healthBar)];
    this.img = this.imageCache[path];
    
  }

  resulveHealthBar() {
    if (this.healthBar == 100) {
      return 5;
    }else if (this.healthBar == 80) {
      return 4;
    } else if (this.healthBar == 60) {
      return 3;
    } else if (this.healthBar == 40) {
      return 2;
    } else if (this.healthBar == 20) {
      this.healthBar = 1;
    } else {
      return 0;
    }
  }

  setCoinBar(coin) {
    this.coinBar = coin;
    this.y = 60;
    let path = this.IMAGES_COIN[this.resolveBarIndex(this.coinBar)];
    this.img = this.imageCache[path];
  }

  resulvCionBar() {
    if (this.coinBar == 100) {
      return 5;
    }else if (this.coinBar == 80) {
      this.coinBar = 4;
    } else if (this.coinBar == 60) {
      return 3;
    } else if (this.coinBar == 40) {
      return 2;
    } else if (this.coinBar == 20) {
      return 1;
    } else {
      return 0;
    }
  }

  setBottleBar(bottleBar) {
    this.y = 110;
    this.bottleBar = bottleBar;
    let path = this.IMAGES_BOTTLE[this.resolveBarIndex(this.bottleBar)];
    this.img = this.imageCache[path];
  }

  resolveBarIndex(statusBar) {
    if (this.statusBar == 100) {
      return 5;
    }else if (this.statusBar == 80) {
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
