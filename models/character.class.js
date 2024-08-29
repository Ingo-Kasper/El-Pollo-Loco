class Character extends MovableObject {
  y = 30;
  width = 100;
  height = 200;
  speed = 10;
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ]
  IMAGE_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ]
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];
  world;
  walking_sound = new Audio("../audio/el-Pollo-Koco-Classig/running.mp3");

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGE_HURT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.animate();
    this.applyGravity();
  }

  animate() {
    setInterval(() => {
      this.walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.walking_sound.play();
      }

      if (this.world.keyboard.LEFT && this.x > -500) {
        this.moveLeft();
        this.walking_sound.play();
        this.otherDirection = true;
      }
      this.world.camera_x = -this.x + 100; // Horizontal camera wor

      if (this.world.keyboard.UP && !this.isAboveGround()) {
        this.jump();
      }
    }, 1000 / 25);

    setInterval(() => {
      // Die Animation werden geändert
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD); // Dead animation
      } else if (this.isHurt()){
        this.playAnimation(this.IMAGE_HURT); // Hurt animation
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING); // Jumpung animation
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING); // Walking animation
        }
      }
    }, 110);
  }

  jump() {
    this.speedY = 30;
  }
}
