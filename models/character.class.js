class Character extends MovableObject {
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");

    this.y = 250;
    this.width = 100;
    this.height = 200;
  }

  jump() {}
}
