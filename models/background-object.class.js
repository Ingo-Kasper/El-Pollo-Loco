class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  constructor(imagePath) {
    super().loadImage(imagePath);

    this.x = 0;
    this.y = 480 - this.height;
  }
}
