class BackgroundObject extends MovableObject {
  width = 720;
  height = 150;

  constructor(imagePath) {
    super().loadImage(imagePath);

    this.x = 0;
    this.y = 350;
  }
}
