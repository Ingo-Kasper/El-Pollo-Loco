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

  /**
   * Loads an image from the specified path and sets it to the `img` property.
   *
   * @param {string} path - The path to the image file to be loaded.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the image of the object on the canvas using the provided context.
   * The image is drawn at the position `(x, y)` with the given `width` and `height`.
   *
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas where the image will be drawn.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws the hitbox of the object on the canvas, if the object is of a specific type.
   * The hitbox is drawn based on the object's `x`, `y`, `width`, and `height` properties, adjusted by the `offset` values.
   *
   * This method is used to visualize the collision area of objects.
   *
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas where the hitbox will be drawn.
   */
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
   * Loads an array of images into the `imageCache`. Each image is created and stored by its path.
   *
   * @param {Array<string>} arr - An array of image paths to be loaded, e.g., ["IMG/Image1.png", "IMG/Image2.png"].
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Checks whether the mute setting is active.
   *
   * @returns {boolean} - `true` if mute is enabled, `false` otherwise.
   */
  isMuteOn() {
    return isMuted == true;
  }

  /**
   * Calculates the index of the image to display based on the level.
   * @returns {number} The index of the image corresponding to the level.
   */
  resolveBarIndex() {
    if (this.isPointsBar() == 100) {
      return 5;
    } else if (this.isPointsBar() == 80) {
      return 4;
    } else if (this.isPointsBar() == 60) {
      return 3;
    } else if (this.isPointsBar() == 40) {
      return 2;
    } else if (this.isPointsBar() == 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
