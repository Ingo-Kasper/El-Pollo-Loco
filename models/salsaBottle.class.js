class SalsaBottle extends MovableObject {
  y = 350;
  width = 70;
  height = 70;

  offset = {
    top: 10,
    left: 20,
    right: 10,
    bottom: 0,
  };

  IMAGES_TURN = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.IMAGES_TURN);
    this.x = 500 + Math.random() * 2500;
    this.animate();
  }

  /**
   * Initializes the animation for the SalsaBottle.
   */
  animate() {
    this.startSalsaBottleAnimation();
  }

  /**
   * Starts the interval to play the turning animation for the SalsaBottle.
   * @private
   */
  startSalsaBottleAnimation() {
    this.salsaBottle = setInterval(() => {
      this.playTurnAnimation();
    }, 1000 / 3);
  }

  /**
   * Plays the turning animation for the SalsaBottle.
   * @private
   */
  playTurnAnimation() {
    this.playAnimation(this.IMAGES_TURN);
  }
}
