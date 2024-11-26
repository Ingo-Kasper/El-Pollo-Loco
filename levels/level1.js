let level1;

function inetLevel() {
  level1 = new Level(
    [
      new SmallChicken(500),
      new SmallChicken(1000),
      new SmallChicken(1300),
      new SmallChicken(1500),
      new SmallChicken(1700),
      new SmallChicken(1900),

      new Chicken(1200),
      new Chicken(1400),
      new Chicken(1600),
      new Chicken(1800),
      new Chicken(2200),

      new Endboss(2500),
    ],

    [
      new Coin(200, 340),
      new Coin(350, 300),
      new Coin(600, 280),
      new Coin(900, 260),
      new Coin(1050, 240),
      new Coin(1300, 220),
      new Coin(1500, 200),
      new Coin(1700, 180),
      new Coin(1900, 160),
      new Coin(2100, 140),
    ],

    [
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
    ],

    [
      new Cloud(0),
      new Cloud(300),
      new Cloud(600),
      new Cloud(900),
      new Cloud(1200),
      new Cloud(1500),
      new Cloud(1800),
      new Cloud(2100),
    ],

    [
      new BackgroundObject("img/5_background/layers/air.png", -719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/air.png", 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 2),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 2),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 2),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 3),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 3),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 3),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 4),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 4),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 4),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 4),
    ]
  );
}
