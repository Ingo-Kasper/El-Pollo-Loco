const level1 = new Level(
  [ new SmallChicken(300),
    new SmallChicken(500),
    new SmallChicken(700),
    new SmallChicken(900),

    new Chicken(600),
    new Chicken(800),
    new Chicken(1000),

    new Endboss(1400),
  ],

  [ new Coin(100 , 340),
    new Coin(150 , 300),
    new Coin(200 , 280),
    new Coin(400 , 260),
    new Coin(450 , 240),
  ],

  [
    
    new SalsaBottle(0),
    new SalsaBottle(100),
    new SalsaBottle(200),
    new SalsaBottle(300),
    new SalsaBottle(400),
    new SalsaBottle(500),
    new SalsaBottle(600),
    new SalsaBottle(700),
    new SalsaBottle(800),
    new SalsaBottle(900),
    new SalsaBottle(1000),
  ],

  [ new Cloud()],
  
  [ new BackgroundObject("img/5_background/layers/air.png", -719),
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
  ]
);
