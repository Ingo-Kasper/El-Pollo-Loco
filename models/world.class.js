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
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
    this.run()
  }

  setWorld() {
    this.character.world = this;
  }

  // Abfrage der Collison mit den Feind
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowableObjects();
    }, 200);
  }

  checkCollisions() {
    /**
     * 1. Check collision with enemies
     * 2. with hit the character will lose energy
     */
    this.level.enemies.forEach((enemy) => {
      if (this.isCharacterCollidingWith(enemy)) {
        this.character.hit();
        this.healBar.setHealthBar(this.character.energy);
      }
    });
  
    /**
     * 1. Check collision with coins
     * 2. with collect Coin the coin counter will increase
     */
    this.level.coins.forEach((coin, index) => {
      if (this.isCharacterCollidingWith(coin)) {
        this.level.coins.splice(index, 1); 
        this.coinBar.collectCoin();
      }
    });
  
    /**
     * 1. Check collision with salsa bottles
     * 2. with collect Bottle the bottle counter will increase
     */
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
   */
  checkThrowableObjects() {
    if (this.isThrown() && this.isThroingThere()) {
      let bottle = new ThrowbaleObject(this.character.x + 100, this.character.y + 100);
      this.bottleBar.throwPullOff();
      this.throwableObjects.push(bottle);
    }
  }

  isThrown() {
    return this.keyboard.SPACE;
  }

  isThroingThere() {
    return this.bottleBar.isBottleBar() > 0
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
