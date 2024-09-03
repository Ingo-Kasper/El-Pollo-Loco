class ThrowbaleObject extends MovableObject {
  constructor(x, y) {
    super();
    this.loadImage("img/6_salsa_bottle/salsa_bottle.png")
    this.x = x -60;
    this.y = y;
    this.height = 60;
    this.width = 60;
    this.throw();
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10
    }, 50);
  }
}