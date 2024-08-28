class Cloud extends MovableObject {
  y = 50;
  width = 450;
  height = 300;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/2.png");

    this.x = -100 + Math.random() * 500;
    this.annimate();
  }

  annimate() {
    setInterval(() => {
      this.x -= 0.05;
    }, 1000 / 120);
  }
}
