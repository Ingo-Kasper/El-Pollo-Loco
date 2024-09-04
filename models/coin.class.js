class Coin extends MovableObject {
  y = 350;
  width = 90;
  height = 90;

  offset = {
    top: 30,
    left: 30,
    right: 30,
    bottom: 30,
  };

  IMAGES_TURN = [
    "img/8_coin/coin_1.png",
    "img/8_coin/coin_2.png",
  ];

  constructor() {
    super();
    this.loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_TURN);
    this.x = 200 + Math.random() * 500;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_TURN);
    }, 380);
  }
}
