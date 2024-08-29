class MovableObject {
  x = 50;
  y = 340;
  img;
  height = 100;
  width = 100;
  speed = 0.15;
  imageCache = {};
  currentImage = 0;
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
    return this.y < 230;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
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
      // this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Difference in seconds
    return timepassed < 0,5;
  }

  isDead() {
    return this.energiy == 0;
  }

  /**
   *
   * @param {Array} arr - IMG/Image1.png ...
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
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
