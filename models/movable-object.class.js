class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection;
  otherDirectionEnemy = false;
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

  /**
   * Checks if the current object is colliding with another movable object.
   * Collision is determined by comparing the bounding boxes of both objects,
   * taking into account their offsets for precise collision detection.
   */
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
   * @returns {boolean} - True if the character has been hit in the last second, otherwise false
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * 
   * @returns {boolean} - True if the boss has been hit in the last second, otherwise false
   */
  isBossHurt() {
    return this.bossHurt == true;
  }

  /**
   * 
   * @returns {boolean} - True if the Charakter's life points are 0, otherwise false
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * 
   * @returns {boolean} - True if the boss's life points are 0, otherwise false
   */
  isBossDead() {
    return this.bossEnergy == 0;
  }

  /**
   * 
   * @returns {boolean} - is keyboard left or right
   */
  isMovingHorizontal() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  /**
   * 
   * @returns Has the boss run out of the playing field
   */
  isBossEscape() {
    return this.x <= -740;
  }

  /**
   * 
   * @returns If the character stands on the ground
   */
  isJumping() {
    return this.speedY > 0;
  }

  /**
   * 
   * @returns If the character has reached the maximum jump height
   */
  isLanding() {
    return this.y === 230;
  }

  /**
   * 
   * @returns The sleep timer 0
   */
  isSleepTime() {
    return this.sleepTime === 0;
  }

  /**
   * movement to the right
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  /**
   * movement to the left
   */
  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
  }

  /**
   * Enemy movement to the left
   */
  moveLeftEnemy() {
    this.x -= this.speed;
    this.otherDirectionEnemy = false;
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

  /**
   * jump speed
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Checks if the current object is colliding with another movable object.
   * Itme is the object that is checked for collision with the character.
   */
  isCharacterCollidingWith(Item) {
    return this.character.isColliding(Item);
  }
}
