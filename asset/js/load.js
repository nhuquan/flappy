var loadState = {
  preload: function() {
    var loadingLabel = game.add.text(80,150, 'loading...',{
      font: '30px Courier', fill: '#fffff'
    });

    game.load.image('sky', 'asset/images/sprites/background-night.png');
    game.load.image('ground', 'asset/images/sprites/base.png');
    game.load.image('pipeUp', 'asset/images/sprites/pipe-up.png');
    game.load.image('pipeDown', 'asset/images/sprites/pipe-down.png');
    game.load.spritesheet('bird', 'asset/images/sprites/bird.png',34,24);
  },

  create: function() {
    game.state.start('menu');
  }
}
