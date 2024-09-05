class Chicken extends MovableObject {
  y = 350;
  width = 80;
  height = 80;
  isDead = false; // Neue Variable, um den Zustand des Feindes zu verfolgen

  offset = {
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
  };

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
  ];
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png")
    this.loadImages(this.IMAGES_WALKING);
    this.x = 200 + Math.random() * 500;
    this.speed = 0.1 + Math.random() * 0.25;
    this.animate();
    this.moveLeft();
  }

  animate() {
    setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }

  playDeathAnimation() {
    if (!this.isDead) {
      this.isDead = true; // Setze isDead auf true, um sicherzustellen, dass die Animation nur einmal abgespielt wird
      this.speed = 0; // Feind hört auf sich zu bewegen
      this.y += 20; // Verschiebe den Feind nach unten
      this.playAnimation(this.IMAGES_DEAD); // Todesanimation abspielen
    }
  }
}