class Cloud extends MovableObject {
    width = 450;
    height = 300

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/2.png");

    this.x = -100 + Math.random() * 500;
    this.y = 50;
  }
}
