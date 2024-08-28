class MovableObject {
  x = 50;
  y = 340;
  img;
  height = 100;
  width = 100;
  speed = 0.15;
  imageCache = {};
  currentImage = 0;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
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

  moveRight() {}

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 120);
  }
}
