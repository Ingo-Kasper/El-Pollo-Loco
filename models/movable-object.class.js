class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  lastHit = 0;

  offset = {
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  };

  constructor() {
    super();
  }

  /**
   * Reguliert die Schwerkraft
   * @param {The speed} speedY
   * @param {The acceleration} acceleration
   * @param {The y position} y
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 45);
  }

  /**
   *
   * @returns {boolean} - True if the character is above ground, otherwise false.
   */
  isAboveGround() {
    if (this instanceof ThrowbaleObject) {
      return true;
    } else {
      return this.y < 230;
    }
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * A query whether the character has more than 0 lives
   * @param {new Date().getTime()} Asks if currentTime has expired to avoid multiple hits in a row
   */
  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * A query whether the character has more than 0 lives
   * @param {new Date().getTime()} Asks if currentTime has expired to avoid multiple hits in a row
   */
  hitBoss() {
    this.bossEnergy -= 20;
    if (this.bossEnergy < 0) {
      this.bossEnergy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   *
   * @returns {boolean} - True if the character has been hit in the last second, otherwise false
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isBossHurt() {
    return this.bossHurt == true;
  }

  isDead() {
    return this.energy == 0;
  }

  isBossDead() {
    return this.bossEnergy == 0;
  }

  isMovingHorizontal() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  isBossEscape() {
    return this.x <= -740;
  }

  isJumping() {
    return this.speedY > 0;
  }

  isLanding() {
    return this.y === 230;
  }

  isSleepTime() {
    this.sleepTime === 0;
  }

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = false;
  }

  /**
   * The length of the animation is set to the images
   * is used for animate() method
   * @param {The images of the IMAGE} images
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  jump() {
    this.speedY = 30;
  }

  isCharacterCollidingWith(Item) {
    return this.character.isColliding(Item);
  }
}
