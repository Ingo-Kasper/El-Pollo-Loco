class World {
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  character = new Character();
  healBar = new HealBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  bossBar = new BossBar();
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.run();
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  // Abfrage der Collison mit den Feind
  run() {
    setInterval(() => {
      this.checkCollisions();
    }, 1000 / 120);
  }

  checkCollisions() {
    this.collidingWihtEnemy();
    this.collidingWihtCion();
    this.collidingWihtBottle();
    this.checkThrowableObjects();
  }

  collidingWihtEnemy() {
    this.level.enemies = this.level.enemies.filter((enemy, index) => {
      if (this.isCharacterCollidingWith(enemy, index)) {
        if (this.isCharacterLandingOnEnemy(enemy, index)) {
          if (enemy instanceof SmallChicken || enemy instanceof Chicken) {
            setTimeout(() => {
              this.level.enemies = this.level.enemies.filter(
                (e) => e !== enemy
              );
            }, 400);
            enemy.playDeathAnimation();
          }
        } else {
          this.character.hit();
          this.healBar.setHealthBar(this.character.energy);
        }
      }
      return enemy.energy > 0;
    });
  }

  /**
   * Prüfe, ob der Charakter über dem Gegner steht und nach unten fällt
   */
  isCharacterLandingOnEnemy(enemy) {
    return (
      this.character.y + this.character.height <= enemy.y + enemy.height &&
      this.character.y + this.character.height >= enemy.y &&
      this.character.speedY < 0
    );
  }

  /**
   * 1. Check collision with coins
   * 2. with collect Coin the coin counter will increase
   */
  collidingWihtCion() {
    this.level.coins.forEach((coin, index) => {
      if (this.isCharacterCollidingWith(coin)) {
        this.level.coins.splice(index, 1);
        this.coinBar.collectCoin();
      }
    });
  }

  /**
   * 1. Check collision with salsa bottles
   * 2. with collect Bottle the bottle counter will increase
   */
  collidingWihtBottle() {
    this.level.salsaBottles.forEach((bottle, index) => {
      if (this.isCharacterCollidingWith(bottle)) {
        this.level.salsaBottles.splice(index, 1);
        this.bottleBar.collectBottle();
      }
    });
  }

  isCharacterCollidingWith(Item) {
    return this.character.isColliding(Item);
  }

  /**
   * Query the collision of the bottle throw
   * 1. this.isThrown() - throw button
   * 2. this.isThroingThere() - whether there are enough bottles
   * 3. bottle.isColliding(enemy) - check if the bottle hits the enemy
   * 4. bottle.throwHits() - bottle hit animation
   */
  checkThrowableObjects() {
    if (this.isThrown() && this.isThroingThere() && !this.isBottleThrown) {
      let bottle = new ThrowbaleObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.bottleBar.throwPullOff();
      this.throwableObjects.push(bottle);
      this.isBottleThrown = true;
    }
    if (!this.isThrown()) {
      this.isBottleThrown = false;
    }

    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy, index) => {
        if (this.isCollidingWith(bottle, enemy) && !bottle.hasHit) {
          if (enemy instanceof Endboss) {
            if (enemy.bossEnergy > 0 && enemy.angry == true) {
              enemy.bossEnergy -= 20;
              this.bossBar.setBosshBar(enemy.bossEnergy);
              enemy.endbossHurt();
            }
            if (enemy.angry == false) {
              enemy.endbossAngry();
            }
            if (enemy.bossEnergy <= 0) {
              bottle.throwHits();
              enemy.endbossDead();
              clearAllIntervals();
              document.getElementById("victory").classList.remove("d-none");
            }
          }
          if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
            if (enemy.energy > 0) {
              enemy.energy -= 100;
              if (enemy.energy <= 0) {
                bottle.throwHits();
                this.level.enemies.splice(index, 1);
                enemy.playDeathAnimation();
              }
            }
          }
        }
      });
    });
  }

  /**
   * Prüft die Kollision zwischen einem Wurfobjekt und einem Feind.
   * @param {ThrowbaleObject} bottle - Das Wurfobjekt.
   * @param {Enemy} enemy - Der Feind.
   * @returns {boolean} - True, wenn eine Kollision stattfindet, sonst false.
   */
  isCollidingWith(bottle, enemy) {
    return (
      bottle.x + bottle.width - bottle.offset.right >
        enemy.x + enemy.offset.left &&
      bottle.y + bottle.height - bottle.offset.bottom >
        enemy.y + enemy.offset.top &&
      bottle.x + bottle.offset.left <
        enemy.x + enemy.width - enemy.offset.right &&
      bottle.y + bottle.offset.top <
        enemy.y + enemy.height - enemy.offset.bottom
    );
  }

  isThrown() {
    return this.keyboard.SPACE;
  }

  isThroingThere() {
    return this.bottleBar.isBottleBar() > 0;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.salsaBottles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    // -- Space for fixed Objects --
    this.ctx.translate(-this.camera_x, 0); // Back
    this.addToMap(this.healBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.bossBar);
    this.ctx.translate(this.camera_x, 0); // Forward

    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);

    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    mo.drawFrame(this.ctx); // für deppug, Hitbox anzeigen
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
