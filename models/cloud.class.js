class Cloud extends MovableObject {
  y = 50;
  width = 450;
  height = 300;
  speed = 0.03;

  constructor() {
    super();
    this.loadImage("img/5_background/layers/4_clouds/2.png")

    this.x = -100 + Math.random() * 500;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.x -= 0.12;
    }, 1000 / 60);
    this.moveLeft();
  }
}
