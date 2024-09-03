class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  energiy = 100;
  lastHit = 0;

  applyGravity() {
    // Schwergraft
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowbaleObject) {
      return true;
    } else {
      return this.y < 230;
    }
  }

  // character.isColliding(chicken)
  isColliding(om) {
    return (
      this.x + this.width > om.x &&
      this.y + this.height > om.y &&
      this.x < om.x + om.width &&
      this.y < om.y + om.height
    );
  }

  

  hit() {
    this.energiy -= 20;
    if (this.energiy < 0) {
      this.energiy = 0;
    } else {
      this.lastHit = new Date().getTime();
      console.log(this.energiy);
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Difference in seconds
    return timepassed < 1;
  }

  isDead() {
    return this.energiy == 0;
  }

  whichDirctionDoes() {
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
