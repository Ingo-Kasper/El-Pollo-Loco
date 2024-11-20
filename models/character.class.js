class Character extends MovableObject {
  world;
  y = 240;
  width = 100;
  height = 200;
  speed = 10;
  sleepTime = 0;

  offset = {
    top: 100,
    left: 25,
    right: 30,
    bottom: 20,
  };

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGE_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING_UP = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
  ];

  IMAGES_JUMPING_DOWN = [
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-37.png",
  ];

  IMAGES_LANDING = [
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_WAIT = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  
  IMAGES_LONG_WAIT = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGE_HURT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING_UP);
    this.loadImages(this.IMAGES_JUMPING_DOWN);
    this.loadImages(this.IMAGES_LANDING);
    this.loadImages(this.IMAGES_WAIT);
    this.loadImages(this.IMAGES_LONG_WAIT);
    this.animate();
    this.applyGravity();
  }

  animate() {
    setInterval(() => {
      allSounds[5].pause();
      if (this.world.keyboard.RIGHT 
        && this.x < this.world.level.level_end_x) {
        this.moveRight();
        if (this.isMuteOn()) {
          allSounds[5].play();
        }
      }

      if (this.world.keyboard.LEFT && this.x > -500) {
        this.moveLeft();
        this.otherDirection = true;
        if (this.isMuteOn()) {
          allSounds[5].play();
        }
      }

      this.world.camera_x = -this.x + 100; // Horizontal camera wor

      if (this.world.keyboard.UP && !this.isAboveGround()) {
        this.jump();
      }
    }, 1000 / 40);

    setInterval(() => {
      this.whichAnimaton();
    }, 1000 / 10);
  }

  whichAnimaton() {
    const currentTime = new Date().getTime();
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD); // Dead animation
      clearAllIntervals();
      document.getElementById("lost").classList.remove("d-none");
      document.getElementById("lost").classList.add("lostPage");
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGE_HURT);
      this.sleepTime = currentTime;
    } else if (this.isAboveGround()) {
      if (this.isJumping()) {
        this.playAnimation(this.IMAGES_JUMPING_UP);
        this.sleepTime = currentTime;
      } else {
        this.playAnimation(this.IMAGES_JUMPING_DOWN);
      }
    } else if (this.isLanding()) {
      this.playAnimation(this.IMAGES_LANDING);
      this.sleepTime = currentTime;
    } else if (this.isMovingHorizontal()) {
      this.playAnimation(this.IMAGES_WALKING);
      this.sleepTime = currentTime;
    } else if (this.isSleepTime()) {
      this.playAnimation(this.IMAGES_WAIT);
      this.sleepTime = currentTime;
    } else if (currentTime - this.sleepTime >= 6000) {
      this.playAnimation(this.IMAGES_LONG_WAIT);
    } else {
      this.playAnimation(this.IMAGES_WAIT);
    }
  }

  jump() {
    this.speedY = 25;
    if (this.isMuteOn()) {
      allSounds[4].play();
    }
  }
}
