class SmallChicken extends MovableObject {
  y = 375;
  width = 60;
  height = 60;
  isDead = false

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
  ];
  IMAGE_DEAD = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";

  constructor(x) {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = x + Math.random() * 1000;
    this.speed = 0.1 + Math.random() * 0.25;
    this.animate();
    this.moveLeft();
  }

  animate() {
    this.moveInterval = setInterval(() => {
      this.moveLeft();
    }, 1000 / 110);

    this.moveAnimtionInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 1000 / 10);
  }

  playDeathAnimation() {
    clearInterval(this.moveInterval);
    clearInterval(this.moveAnimtionInterval);
    this.loadImage("img/3_enemies_chicken/chicken_small/2_dead/dead.png");
    this.y = 425;
    if (this.isMuteOn()) {
      allSounds[2].play();
    }
  }
}
