class HealBar extends DrawableObject {
  healthBar = 100;

  IMAGES_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.setHealthBar(this.energy);
    this.height = 50;
    this.width = 200;
    this.x = 40;
    this.y = 0;
  }

  /**
   * Updates the health bar value and selects the appropriate image.
   * @param {number} healthBar - The current health level (0-100).
   */
  setHealthBar(healthBar) {
    this.healthBar = healthBar;
    let path = this.IMAGES_HEALTH[this.resolveBarIndex()];
    this.img = this.imageCache[path];
  }
  
  isPointsBar() {
    return this.healthBar
  }
}
