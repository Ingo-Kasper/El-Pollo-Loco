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
    this.x = x - 80;
    this.y = y + 80;
    this.height = 60;
    this.width = 60;
    this.throw();
  }

  /**
   * Starts the bottle throw animation and movement.
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();
    this.bottleThrowing = setInterval(() => {
      this.x += 13;
    }, 1000 / 25);
    this.bottleRotation = setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
    }, 1000 / 10);
  }

  /**
   * Stops the throw, plays splash animation, and clears intervals.
   */
  throwHits() {
    clearInterval(this.bottleThrowing);
    clearInterval(this.bottleRotation);
    this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
    this.bottleSplash = setTimeout(() => {}, 1000 / 10);
    clearInterval(this.bottleSplash);
  }
}
