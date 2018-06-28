var game = new Phaser.Game(800,600, Phaser.AUTO, 'gameContainer', {
  preload: preload,
  create: create,
  update: update,
  render: render
})

var bird, ground,sky, pipes;

function preload() {

  game.load.image('sky', 'asset/images/sprites/background-night.png');
  game.load.image('ground', 'asset/images/sprites/base.png');
  game.load.image('pipe', 'asset/images/sprites/pipe-green.png')
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

  pipes = game.add.physicsGroup();

  game.time.events.loop(1500, addPipe, this);
}

function update() {
  game.physics.arcade.collide(bird,ground);
}


function render() {

}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function addPipe() {
  var offset = 200 + Math.floor(Math.random() * 200);
  var pipeUp = game.add.sprite(800, offset + 100, 'pipe');
  game.physics.arcade.enable(pipeUp);
  pipeUp.body.allowGravity = false;
  pipeUp.body.velocity.x = -200;

  var pipeDown = game.add.sprite(850, offset - 100, 'pipe');
  pipeDown.angle += 180;
  game.physics.arcade.enable(pipeDown);
  pipeDown.body.allowGravity = false;
  pipeDown.body.velocity.x = -200;

  pipes.add(pipeUp);
  pipes.add(pipeDown);
}

function jump() {
  bird.body.velocity.y = -400;
  bird.animations.play('flap');
}
