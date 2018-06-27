var game = new Phaser.Game(288,600, Phaser.AUTO, 'gameContainer', {
  preload: preload,
  create: create,
  update: update,
  render: render
})

var bird, ground;

function preload() {

  game.load.image('sky', 'asset/images/sprites/background-night.png');
  game.load.image('ground', 'asset/images/sprites/base.png');
  game.load.spritesheet('bird', 'asset/images/sprites/bird.png',34,24);


  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.gravity.y = 600;

  game.add.sprite(0,0,'sky');
  ground = game.add.sprite(0,512,'ground');
  bird = game.add.sprite(30, 300,'bird');
  game.physics.arcade.enable([ground, bird]);


  ground.body.allowGravity = false;
  ground.body.immovable = true;

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
  bird.body.velocity.y = -300;
  bird.animations.play('flap');
}

function render() {

}
