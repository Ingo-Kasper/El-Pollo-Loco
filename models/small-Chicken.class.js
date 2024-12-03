class SmallChicken extends MovableObject {
  y = 375;
  width = 60;
  height = 60;
  isDead = false;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
  ];
  IMAGE_DEAD = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";

  constructor(x) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x = x + Math.random() * 1000;
    this.speed = 0.1 + Math.random() * 0.25;
    this.animate();
  }

  /**
   * Animates the movement and walking animation of the SmallChicken.
   */
  animate() {
    this.moveInterval = setInterval(() => {
      if (!this.isDead) {
        this.moveLeftEnemy();
      }
    }, 1000 / 110);

    this.animationInterval = setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000 / 10);
  }

  /**
   * Plays the death animation for the SmallChicken and stops its movement.
   */
  playDeathAnimation() {
    if (this.isDead) return; // Avoid multiple calls

    this.isDead = true;
    clearInterval(this.moveInterval);
    clearInterval(this.animationInterval);

    this.loadImage(this.IMAGE_DEAD);
    this.y = 425; // Adjust position for dead image

    if (this.isMuteOn()) {
      this.playDeathSound();
    }
  }

  /**
   * Plays the death sound effect.
   */
  playDeathSound() {
    allSounds[2]?.play(); // Play sound if it exists
  }
}
