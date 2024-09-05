class ThrowbaleObject extends MovableObject {
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  IMAGES_BOTTLE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  IMAGES_BOTTLE_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y) {
    super();
    this.loadImage("");
    this.loadImages(this.IMAGES_BOTTLE_ROTATION);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.x = x - 60;
    this.y = y;
    this.height = 60;
    this.width = 60;
    this.throw();
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 50);
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
    }, 100);
  }

  throwHits() {
    this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
    let i = 0;
    const images = this.IMAGES_BOTTLE_SPLASH;
    const interval = setInterval(() => {
        this.img = this.imageCache[images[i]];
        i++;
        if (i >= images.length) {
            clearInterval(interval);
        }
    }, 100);
}
}
