// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

/** @global */
var engine, level, player, allEnemies, hud, menu;

var appState = 'menu';


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  if(appState !== 'menu') {
    player.handleInput(allowedKeys[e.keyCode]);
  }
});

document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    39: 'right',
    13: 'enter'
  };

  if(appState === 'menu') {
    menu.handleInput(allowedKeys[e.keyCode]);
  }
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
    'images/char-boy.png',
    'images/carousel-arrow-right.png',
    'images/carousel-arrow-left.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
  ]);

  // When resources are ready, start the game
  Resources.onReady(function(){
    engine = new Engine(GLOBAL);

    level = levelFactory();

    menu = new Menu();

    hud = new HUD();

    player = new Player();
    player.placeOnTile(5, 2);

    allEnemies = [];
    allEnemies.push(new Enemy(1));
    allEnemies.push(new Enemy(2));
    allEnemies.push(new Enemy(3));

    engine.init();
  });
  
});
