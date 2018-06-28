var game = new Phaser.Game(800,600, Phaser.AUTO, 'gameContainer', {
  preload: preload,
  create: create,
  update: update,
  render: render
})

var bird, ground,sky;

function preload() {

  game.load.image('sky', 'asset/images/sprites/background-night.png');
  game.load.image('ground', 'asset/images/sprites/base.png');
  game.load.spritesheet('bird', 'asset/images/sprites/bird.png',34,24);


  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.gravity.y = 100;

  sky = game.add.group();
  sky.create(0,0,'sky');
  sky.create(288,0,'sky');
  sky.create(576,0,'sky');

  ground = game.add.physicsGroup();
  ground.create(0,512,'ground');
  ground.create(300,512,'ground');
  ground.create(600,512,'ground');
  ground.setAll('body.allowGravity', false);
  ground.setAll('body.immovable', true);


  bird = game.add.sprite(30, 300,'bird');
  game.physics.arcade.enable(bird);
  bird.body.gravity.y = 1000;

  bird.animations.add('flap',null, 10, false, true);
  bird.body.collideWorldBounds = true;
  bird.frame=2;

  game.input.mouse.capture = true;
  game.input.onTap.add(jump, this);
}

function update() {
  game.physics.arcade.collide(bird,ground);

}

function jump() {
  bird.body.velocity.y = -400;
  bird.animations.play('flap');
}

function render() {

}
