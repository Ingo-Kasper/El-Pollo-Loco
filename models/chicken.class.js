class Chicken extends MovableObject {
  y = 350;
  width = 80;
  height = 80;
  isDead = false;

  offset = {
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
  };

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];
  chicken_Hit_sound = new Audio(
    "../audio/el-Pollo-Koco-Classig/chickenHit.mp3"
  );

  constructor(x) {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = x + Math.random() * 1000;
    this.speed = 0.1 + Math.random() * 0.25;
    this.animate();
    this.moveLeft();
  }

  /**
   * Starts the chicken's movement by initiating an interval to move it left.
   * This function sets the movement speed and interval.
   * 
   * @private
   */
  startMoving() {
    this.moveInterval = setInterval(() => this.moveLeft(), 1000 / 110);
  }

  /**
   * Starts the walking animation of the chicken by initiating an interval to cycle through the walking images.
   * 
   * @private
   */
  startWalkingAnimation() {
    this.moveAnimtionInterval = setInterval(() => this.playAnimation(this.IMAGES_WALKING), 1000 / 10);
  }

  /**
   * Plays the death animation and handles the necessary state changes for the chicken when it dies.
   * Stops the movement intervals and plays the death sound.
   * 
   * @public
   */
  playDeathAnimation() {
    this.stopMovement();
    this.loadImage("img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
    this.y = 400;
    if (this.isMuteOn()) allSounds[2].play();
  }

  /**
   * Stops the movement and animation intervals to halt the chicken's movement when it dies.
   * 
   * @private
   */
  stopMovement() {
    clearInterval(this.moveInterval);
    clearInterval(this.moveAnimtionInterval);
  }

  /**
   * Starts the animation and movement process when the chicken is initialized.
   * 
   * @private
   */
  animate() {
    this.startMoving();
    this.startWalkingAnimation();
  }
}
