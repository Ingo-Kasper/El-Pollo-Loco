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

  applyGravity() {
    // Schwergraft
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 45);
  }

  isAboveGround() {
    if (this instanceof ThrowbaleObject) {
      return true;
    } else {
      return this.y < 230;
    }
  }

  // character.isColliding(chicken)
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
      console.log(this.energy);
    }
  }

  hitBoss() {
    this.bossEnergy -= 20;
    if (this.bossEnergy < 0) {
      this.bossEnergy = 0;
    } else {
      this.lastHit = new Date().getTime();
      console.log(this.bossEnergy);
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit / 1000; // Difference in seconds
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  isMovingHorizontal() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
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
   * Die länge der Animation wird an den Bilder aus gelegt
   * wird für animate() Methode benutzt
   * @param {Die bilder der IMAGE} images 
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
}
