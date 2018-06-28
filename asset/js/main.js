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
  game.load.image('pipeUp', 'asset/images/sprites/pipe-up.png');
  game.load.image('pipeDown', 'asset/images/sprites/pipe-down.png');
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

  timer = game.time.events.loop(2000, addPipe, this);
  score = 0;
  labelScore = game.add.text(20, 20, "0",
    { font: "30px Arial", fill: "#ffffff" });
}

function update() {
  game.physics.arcade.collide(bird, ground, null, null, this);
  game.physics.arcade.collide(bird, pipes, hitPipe, null, this);
  pipes.forEachAlive(function(pipe){
    if (!pipe.scored && pipe.x <= bird.x) {
      updateScore(pipe);
    }
  })
}


function render() {

}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function updateScore(pipe) {
  pipe.scored = true;
  score += 0.5;
  labelScore.text = score;
}
function hitPipe(bird, pipe) {
  // If the bird has already hit a pipe, do nothing
   // It means the bird is already falling off the screen
   if (bird.alive == false)
       return;

   // Set the alive property of the bird to false
   bird.alive = false;

   // Prevent new pipes from appearing
   game.time.events.remove(timer);

   // Go through all the pipes, and stop their movement
   pipes.forEach(function(p){
       p.body.velocity.x = 0;
   }, this);
}

function restartGame() {
  game.state.restart();
}

function addPipe() {
  var offset = 200 + Math.floor(Math.random() * 200);
  var pipeUp = game.add.sprite(800, offset + 100, 'pipeUp');
  var pipeDown = game.add.sprite(800, offset - 400, 'pipeDown');

  pipes.add(pipeUp);
  pipes.add(pipeDown);

  game.physics.arcade.enable(pipeUp);
  pipeUp.body.allowGravity = false;
  pipeUp.body.immovable = true;
  pipeUp.body.velocity.x = -200;
  pipeUp.checkWorldBounds = true;
  pipeUp.outOfBoundsKill = true;


  game.physics.arcade.enable(pipeDown);
  pipeDown.body.allowGravity = false;
  pipeDown.body.immovable = true;
  pipeDown.body.velocity.x = -200;
  pipeDown.checkWorldBounds = true;
  pipeDown.outOfBoundsKill = true;

}

function jump() {
  if (bird.alive) {
    bird.body.velocity.y = -400;
    bird.animations.play('flap');
  }
}
