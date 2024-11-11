class Level {
  enemies;
  coins;
  salsaBottles;
  clouds;
  backgroundObjects;
  level_end_x = 2800;

  constructor(enemies, coins, salsaBottles, clouds, backgroundObjects) {
    this.enemies = enemies;
    this.coins = coins;
    this.salsaBottles = salsaBottles;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
