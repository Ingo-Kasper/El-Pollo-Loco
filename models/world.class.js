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
   * Handles throwable objects' collisions and interactions with enemies.
   */
  checkThrowableObjects() {
    const currentTime = new Date().getTime();
    this.handleThrowAction(currentTime);
    this.handleResetThrow();
    this.processThrowableCollisions(currentTime);
  }

  /**
   * Handles the action of throwing a bottle.
   * @param {number} currentTime - The current timestamp.
   */
  handleThrowAction(currentTime) {
    if (this.isThrown() && this.isThroingThere() && !this.isBottleThrown) {
      this.createAndThrowBottle();
      this.lastThrowTime = currentTime;
    }
  }

  /**
   * Resets the throwing state to allow for another throw.
   */
  handleResetThrow() {
    if (!this.isThrown()) {
      this.isBottleThrown = false;
    }
  }

  /**
   * Processes collisions between throwable objects and enemies.
   * @param {number} currentTime - The current timestamp.
   */
  processThrowableCollisions(currentTime) {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy, index) => {
        if (this.isCollidingWith(bottle, enemy) && !bottle.hasHit) {
          this.handleEnemyCollision(bottle, enemy, currentTime);
        }
      });
    });
  }

  /**
   * Handles the creation and initialization of a thrown bottle.
   */
  createAndThrowBottle() {
    const bottle = new ThrowbaleObject(
      this.character.x + 100,
      this.character.y + 100
    );
    this.bottleBar.throwPullOff();
    this.throwableObjects.push(bottle);
    this.isBottleThrown = true;
  }

  /**
   * Handles collision behavior for different enemy types.
   * @param {Object} bottle - The throwable object.
   * @param {Object} enemy - The enemy object.
   * @param {number} currentTime - The current timestamp.
   */
  handleEnemyCollision(bottle, enemy, currentTime) {
    if (enemy instanceof Endboss) {
      this.handleEndbossCollision(bottle, enemy, currentTime);
    } else if (enemy instanceof SmallChicken || enemy instanceof Chicken) {
      this.handleSmallEnemyCollision(enemy);
    }
  }

  /**
   * Handles collision logic with the Endboss.
   * @param {Object} bottle - The throwable object.
   * @param {Object} enemy - The Endboss object.
   * @param {number} currentTime - The current timestamp.
   */
  handleEndbossCollision(bottle, enemy, currentTime) {
    if (
      enemy.bossEnergy > 0 &&
      enemy.angry &&
      currentTime - this.LastBossHitTime >= 1000
    ) {
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
   * Handles collision logic with SmallChicken or Chicken enemies.
   * @param {Object} enemy - The enemy object.
   */
  handleSmallEnemyCollision(enemy) {
    setTimeout(() => {
      this.level.enemies = this.level.enemies.filter((e) => e !== enemy);
    }, 400);
    enemy.playDeathAnimation();
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

  /**
   * Draws the game elements and updates the frame.
   */
  draw() {
    this.clearCanvas();
    this.translateCamera();
    this.drawMovableObjects();
    this.resetCameraTranslation();
    this.drawFixedObjects();
    this.translateCameraForCharacter();
    this.drawCharacter();
    this.resetCameraTranslation();
    this.requestNextFrame();
  }

  /**
   * Clears the canvas for the next frame.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Translates the canvas for the camera position.
   */
  translateCamera() {
    this.ctx.translate(this.camera_x, 0);
  }

  /**
   * Draws all movable objects in the game world.
   */
  drawMovableObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.salsaBottles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
  }

  /**
   * Resets the canvas translation to the initial position.
   */
  resetCameraTranslation() {
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Draws all fixed objects such as UI elements.
   */
  drawFixedObjects() {
    this.addToMap(this.healBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.bossBar);
  }

  /**
   * Translates the canvas for drawing the character.
   */
  translateCameraForCharacter() {
    this.ctx.translate(this.camera_x, 0);
  }

  /**
   * Draws the main character on the canvas.
   */
  drawCharacter() {
    this.addToMap(this.character);
  }

  /**
   * Requests the next animation frame.
   */
  requestNextFrame() {
    requestAnimationFrame(() => this.draw());
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a movable object to the canvas and handles its rendering.
   * @param {Object} mo - The movable object to add to the canvas.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    this.drawObject(mo);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Draws the object on the canvas, including its image and optional debug frame.
   * @param {Object} mo - The object to draw.
   */
  drawObject(mo) {
    mo.draw(this.ctx);
    this.drawImageOnCanvas(mo);
    mo.drawFrame(this.ctx); // For debugging, displays the hitbox
  }

  /**
   * Draws the object's image on the canvas.
   * @param {Object} mo - The object whose image is to be drawn.
   */
  drawImageOnCanvas(mo) {
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }

  /**
   * Flips the image horizontally by saving the canvas state, applying transformations, and adjusting the object's position.
   * @param {Object} mo - The object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the canvas state and reverts any transformations applied by flipImage.
   * @param {Object} mo - The object to restore.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
