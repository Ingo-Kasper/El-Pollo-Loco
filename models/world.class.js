class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  healBar = new HealBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  bossBar = new BossBar();
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  // Abfrage der Collison mit den Feind
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowableObjects();
    }, 50);
  }

  checkCollisions() {
    this.collidingWihtEnemy();
    this.collidingWihtCion();
    this.collidingWihtBottle();
  }

  collidingWihtEnemy() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.isCharacterCollidingWith(enemy, index)) {
        if (this.isCharacterLandingOnEnemy(enemy, index)) {
          enemy.playDeathAnimation();

          setTimeout(() => {
            this.level.enemies = this.level.enemies.filter(e => e !== enemy);
          }, 400);
        } else {
          this.character.hit();
          this.healBar.setHealthBar(this.character.energy);
        }
      }
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
    if (this.isThrown() && this.isThroingThere()) {
      let bottle = new ThrowbaleObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.bottleBar.throwPullOff();
      this.throwableObjects.push(bottle);
    }

    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy, enemyIndex) => {
        if (bottle.isColliding(enemy)) {
          console.log("Treffer erkannt zwischen Flasche und Feind:", enemy);
          bottle.throwHits();
          setTimeout(() => {
            this.level.enemies.splice(enemyIndex, 1);
            this.throwableObjects.splice(bottleIndex, 1);
          }, 400);
          console.log(`Flasche Position: x=${bottle.x}, y=${bottle.y}`);
          console.log(`Feind Position: x=${enemy.x}, y=${enemy.y}`);
        }
      });
    });
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
