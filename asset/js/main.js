var gw = innerWidth * devicePixelRatio;
var gh = innerHeight * devicePixelRatio;
var ratio = devicePixelRatio;
var game = new Phaser.Game(gw, gh, Phaser.AUTO, 'gameContainer', {
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
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  sky = game.add.group();

  sky.create(0,0,'sky')
  //sky.create(288,0,'sky');
  //sky.create(576,0,'sky');
  sky.scale.setTo(ratio, ratio);

  ground = game.add.physicsGroup();
  ground.create(0,gh,'ground');
  ground.create(300,gh,'ground');
  ground.create(600,gh,'ground');
  ground.setAll('body.allowGravity', false);
  ground.setAll('body.immovable', true);
  ground.scale.setTo(ratio,ratio);

  bird = game.add.sprite(30, 300,'bird');
  bird.scale.setTo(ratio,ratio);
  game.physics.arcade.enable(bird);
  bird.body.gravity.y =  Math.floor(gh * 10);

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
  var offset = 200 * ratio + Math.floor(Math.random() * 200 * ratio);
  var pipeUp = game.add.sprite(gw, (gh - 320*ratio), 'pipeUp');
  var pipeDown = game.add.sprite(gw, 0 , 'pipeDown');
  pipeUp.scale.setTo(ratio, ratio);
  pipeDown.scale.setTo(ratio, ratio);
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
    bird.body.velocity.y = 0 - 2 * Math.floor(gh);
    bird.animations.play('flap');
  }
}
