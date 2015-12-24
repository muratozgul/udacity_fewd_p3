// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

/** @global */
var engine, level, player, allEnemies;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

var GLOBAL = this;

document.addEventListener("DOMContentLoaded", function(event) { 
  /* Go ahead and load all of the images we know we're going to need to
   * draw our game level. Then set init as the callback method, so that when
   * all of these images are properly loaded our game will start.
   */
  Resources.load([
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    'images/enemy-bug.png',
    'images/char-boy.png'
  ]);

  // When resources are ready, start the game
  Resources.onReady(function(){
    engine = new Engine(GLOBAL);

    level = levelFactory();

    player = new Player();
    player.placeOnTile(3, 2);

    allEnemies = [];
    allEnemies.push(new Enemy());

    allEnemies[0].placeOnTile(1,0);

    engine.init();
  });
  
});
