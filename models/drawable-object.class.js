class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 50;
  y = 340;
  height = 100;
  width = 100;
  energy = 100;
  bossEnergy = 100;
  bossKilled = false;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * In der Draw Methode wird das Bild auf den Canvas gezeichnet
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  // Um die Hitbox anzuzeigen
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof SmallChicken ||
      this instanceof Endboss ||
      this instanceof Coin ||
      this instanceof SalsaBottle ||
      this instanceof ThrowbaleObject
    ) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "transparent"; // Hitbox Farbe
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom
      );
      ctx.stroke();
    }
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

  isMuteOn() {
    return isMuted == true;
  }
}
