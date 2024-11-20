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
  lastHitTime = 0;
  LastBossHitTime = 0;
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
    this.collidingWihtEndBoss();
    this.collidingWihtCion();
    this.collidingWihtBottle();
    this.checkThrowableObjects();
  }

  collidingWihtEnemy() {
    const currentTime = new Date().getTime();
    this.level.enemies = this.level.enemies.filter((enemy, index) => {
      if (this.isCharacterCollidingWith(enemy, index)) {
        this.handleCollisionWithEnemy(enemy, index, currentTime);
      }
      return enemy.energy > 0;
    });
  }

  handleCollisionWithEnemy(enemy, index, currentTime) {
    if (this.isCharacterLandingOnEnemy(enemy, index)) {
      this.handleEnemyDeath(enemy);
    } else if (currentTime - this.lastHitTime >= 1000) {
      this.handleCharacterHit();
      this.lastHitTime = currentTime;
    }
  }

  handleEnemyDeath(enemy) {
    if (enemy instanceof SmallChicken || enemy instanceof Chicken) {
      setTimeout(() => {
        this.level.enemies = this.level.enemies.filter((e) => e !== enemy);
      }, 400);
      enemy.playDeathAnimation();
    }
  }

  handleCharacterHit() {
    this.character.hit();
    this.healBar.setHealthBar(this.character.energy);
    allSounds[7].play();
  }
  /**
   * Checks collisions between the character and the end boss, and updates the enemy list.
   */
  collidingWihtEndBoss() {
    const currentTime = new Date().getTime();
    this.level.enemies = this.level.enemies.filter((enemy, index) => {
      if (this.isCharacterCollidingWith(enemy, index)) {
        this.handleCollisionWithEndBoss(enemy, index, currentTime);
      }
      return enemy.energy > 0;
    });
  }

  /**
   * Handles the logic for a collision with the end boss.
   *
   * @param {Object} enemy - The colliding end boss.
   * @param {number} index - The index of the enemy in the list.
   * @param {number} currentTime - The current timestamp in milliseconds.
   */
  handleCollisionWithEndBoss(enemy, index, currentTime) {
    if (this.isCharacterCollidingWithBoss(enemy, index)) {
      this.handleBossHit(currentTime);
    }
  }

  /**
   * Handles the logic when the character is hit by the end boss.
   *
   * @param {number} currentTime - The current timestamp in milliseconds.
   */
  handleBossHit(currentTime) {
    if (currentTime - this.lastHitTime >= 1000) {
      this.character.hit();
      this.healBar.setHealthBar(this.character.energy);
      allSounds[7].play();
      this.lastHitTime = currentTime;
    }
  }

  /**
   * Checks if the character is above the enemy and moving downward.
   *
   * @param {Object} enemy - The enemy object to check against.
   * @returns {boolean} - Returns `true` if the character is landing on the enemy, otherwise `false`.
   */
  isCharacterLandingOnEnemy(enemy) {
    return (
      this.character.y + this.character.height <= enemy.y + enemy.height &&
      this.character.y + this.character.height >= enemy.y &&
      this.character.speedY < 0
    );
  }

  /**
   * Checks if the character is colliding with the end boss.
   *
   * @param {Object} enemy - The enemy object representing the end boss.
   * @returns {boolean} - Returns `true` if the character is colliding with the boss, otherwise `false`.
   */
  isCharacterCollidingWithBoss(enemy) {
    return (
      this.character.x + this.character.width - this.character.offset.right >
        enemy.x + enemy.offset.left &&
      this.character.y + this.character.height - this.character.offset.bottom >
        enemy.y + enemy.offset.top &&
      this.character.x + this.character.offset.left <
        enemy.x + enemy.width - enemy.offset.right &&
      this.character.y + this.character.offset.top <
        enemy.y + enemy.height - enemy.offset.bottom
    );
  }

  /**
   * Checks for collisions with coins and increases the coin counter when a coin is collected.
   *
   * 1. Iterates over all coins in the level.
   * 2. If the character collides with a coin, the coin is removed from the level and the coin counter is updated.
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
   * Checks for collisions with salsa bottles and increases the bottle counter when a bottle is collected.
   *
   * 1. Iterates over all salsa bottles in the level.
   * 2. If the character collides with a bottle and the bottle bar is not full,
   *    the bottle is removed from the level, and the bottle counter is updated.
   */
  collidingWihtBottle() {
    this.level.salsaBottles.forEach((bottle, index) => {
      if (
        this.isCharacterCollidingWith(bottle) &&
        this.bottleBar.bottleBar < 100
      ) {
        this.level.salsaBottles.splice(index, 1);
        this.bottleBar.collectBottle();
      }
    });
  }

  isCharacterCollidingWith(Item) {
    return this.character.isColliding(Item);
  }

/**
 * Handles the logic for throwable objects (e.g., bottles) and their interactions with enemies.
 *
 * Steps:
 * 1. Checks if the throw action is triggered (`this.isThrown()`).
 * 2. Verifies if there are enough bottles available (`this.isThroingThere()`).
 * 3. Creates and adds a new throwable object if the cooldown period has passed.
 * 4. Prevents multiple throws at the same time until the cooldown expires.
 * 5. Processes collision between thrown bottles and enemies:
 *    - Reduces energy for the end boss if hit.
 *    - Triggers the boss's angry or hurt states based on energy levels.
 *    - Plays a death animation for small chickens or regular chickens when hit.
 * 6. Updates the state of the bottle bar and enemy objects accordingly.
 */
checkThrowableObjects() {
  const currentTime = new Date().getTime();

  // Handle throwing logic
  if (this.isThrown() && this.isThroingThere()) {
    if (currentTime - this.lastThrowTime >= 500) {
      const bottle = new ThrowbaleObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.bottleBar.throwPullOff();
      this.throwableObjects.push(bottle);
      this.lastThrowTime = currentTime; // Reset cooldown
    }
  }

  // Process collisions for thrown bottles
  this.throwableObjects.forEach((bottle) => {
    this.level.enemies.forEach((enemy) => {
      if (this.isCollidingWith(bottle, enemy) && !bottle.hasHit) {
        if (enemy instanceof Endboss) {
          this.handleBossCollision(enemy, bottle, currentTime);
        }
        if (enemy instanceof SmallChicken || enemy instanceof Chicken) {
          setTimeout(() => {
            this.level.enemies = this.level.enemies.filter((e) => e !== enemy);
          }, 400);
          enemy.playDeathAnimation();
        }
      }
    });
  });
}


/**
 * Handles collision logic when a thrown object hits the end boss.
 *
 * @param {Object} enemy - The end boss object.
 * @param {Object} bottle - The throwable object that hit the boss.
 * @param {number} currentTime - The current time to enforce hit cooldowns.
 */
handleBossCollision(enemy, bottle, currentTime) {
  if (enemy.bossEnergy > 0 && enemy.angry && currentTime - this.LastBossHitTime >= 1000) {
    enemy.bossEnergy -= 20;
    this.bossBar.setBosshBar(enemy.bossEnergy);
    enemy.isHurt();
    this.LastBossHitTime = currentTime;
    enemy.bossHurt = true;
  } else if (!enemy.angry && currentTime - this.LastBossHitTime >= 1000) {
    enemy.angry = true;
    enemy.bossHurt = true;
    this.LastBossHitTime = currentTime;
  }
  if (enemy.bossEnergy <= 0 && !enemy.bossKilled) {
    this.bossKilled = true;
    bottle.throwHits();
  }
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
