class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

/**
* Constructor for the background object
* @param {string} imagePath The path to the background object's image
* @param {number} x The x-position of the background object
*/
  constructor(imagePath, x) {
    super();
    this.loadImage(imagePath)

    this.x = x;
    this.y = 480 - this.height;
  }
}
