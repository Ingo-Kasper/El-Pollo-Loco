class Endboss extends MovableObject {
  height = 350;
  width = 350;
  y = 100;

  alerted = false;
  angry = false;
  bossHurt = false

  offset = {
    top: 80,
    left: 70,
    right: 50,
    bottom: 10,
  };

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_WAIT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
  ];
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G120.png",
  ];
  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor(x) {
    super();
    this.loadImage(this.IMAGES_WAIT[0]);
    this.loadImages(this.IMAGES_WAIT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);

    this.x = x; // die Startposition des Endbossesa 

    this.boasAnimation();
    this.hurtAnimationPlaying = false;
  }

  boasAnimation() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 100);

    setInterval(() => {
      this.wichBossAnimation();
    }, 1000 / 10);
  }

  wichBossAnimation() {
    if (this.isBossDead()) {
      if (this.isMuteOn()) {
        allSounds[2].play();
        allSounds[6].play();
      }
      this.speed = 0;
      this.playAnimation(this.IMAGES_DEAD);
      setTimeout(() => {
        clearAllIntervals();
        document.getElementById("victory").classList.remove("d-none");
        document.getElementById("victory").classList.add("victoryPage");
      }, 400);
    } else if (this.isBossHurt()) {
        if (this.isMuteOn()) {
        allSounds[2].play();
      }
      this.playAnimation(this.IMAGES_HURT);
      setTimeout(() => {
        this.bossHurt = false;
      }, 1000);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * This moves the endboss to the left closer to the character and plays images accordingly
   */
  // endbossWalk() {
  //   setInterval(() => {
  //     this.moveLeft();
  //   }, 1000 / 100);

  //   this.movingAnimations = setInterval(() => {
  //     this.playAnimation(this.IMAGES_WALKING);
  //   }, 1000 / 7);
  // }

  // endbossHurt() {
  //   // Überprüfen, ob das Intervall bereits läuft
  //   if (!this.hurtAnimationPlaying) {
  //     if (this.isMuteOn()) {
  //       allSounds[2].play();
  //     }
  //     this.hurtAnimationPlaying = true;
  //     this.hurtAnimationInterval = setInterval(() => {
  //       this.playAnimation(this.IMAGES_HURT);
  //     }, 1000 / 7);

  //     setTimeout(() => {
  //       clearInterval(this.hurtAnimationInterval);
  //       this.hurtAnimationPlaying = false;
  //     }, 1000);
  //   }
  // }

  // /**
  //  * This method runs when endboss is angry, shows differnet images and increase the speed of the endboss
  //  */
  // endbossAngry() {
  //   if (!this.alertAnimationPlaying) {
  //     if (this.isMuteOn()) {
  //       allSounds[2].play();
  //     }
  //     this.alertAnimationPlaying = true;
  //     this.alertAnimationPlaying = setInterval(() => {
  //       this.playAnimation(this.IMAGES_ALERT);
  //     }, 1000 / 6);

  //     setTimeout(() => {
  //       clearInterval(this.alertAnimationPlaying);
  //       this.alertAnimationPlaying = false;
  //       this.angry = true;
  //       this.speed = 2;
  //     }, 700);
  //   }
  // }

  // endbossDead() {
  //   if (this.isMuteOn()) {
  //     allSounds[2].play();
  //     allSounds[6].play();
  //   }
  //   this.speed = 0;
  //   this.deadAnimation = setInterval(() => {
  //     this.playAnimation(this.IMAGES_DEAD);
  //   }, 1000 / 3);

  //   setTimeout(() => {
  //     clearAllIntervals();
  //     document.getElementById("victory").classList.remove("d-none");
  //     document.getElementById("victory").classList.add("victoryPage");
  //   }, 10000);
  // }
}
