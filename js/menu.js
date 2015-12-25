/**
 * Menu class. Menu is displayed when the game is not running
 * @class
 */
var Menu = function() {
  this.CW = engine.canvas.width;
  this.CH = engine.canvas.height;
  this.TW = level.tileData.width;

  // create buttons for selecting/changing hero
  this.rightButton = new MenuItem({
    image: 'images/carousel-arrow-right.png',
    width: 100,
    height: 100
  }, this.CW/2-50+this.TW, this.CH/2-50);

  this.leftButton = new MenuItem({
    image: 'images/carousel-arrow-left.png',
    width: 100,
    height: 100
  }, this.CW/2-50-this.TW, this.CH/2-50);

  // possible heros to chose from
  this.playerCatalog = {
    boy: 'images/char-boy.png',
    catGirl: 'images/char-cat-girl.png',
    hornGirl: 'images/char-horn-girl.png',
    pinkGirl: 'images/char-pink-girl.png',
    princess: 'images/char-princess-girl.png'
  };

  // key of selected hero
  this.selectedPlayer = 'boy';

  // menu state, used for rendering and tracking game state
  this.state = 0;

  // possible menu states
  this.states = {
    SELECTION: 0,
    HIDDEN: 1,
    WIN: 2,
    LOSE: 3
  }
};

Menu.prototype.constructor = Menu;

/**
 * Update - for animating menu items
 * @param {Number} dt - A time delta between ticks (in milliseconds)
 */
Menu.prototype.update = function(dt) {
  this.rightButton.update(dt);
  this.leftButton.update(dt);
};

/**
 * Draw the menu on the screen, according to its state.
 * If menu state is HIDDEN, do not render
 */
Menu.prototype.render = function() {
  if(this.state === this.states.SELECTION){
    this.renderSelection();
  } else if(this.state === this.states.WIN) {
    this.renderWin();
  } else if(this.state === this.states.LOSE) {
    this.renderLose();
  }
};

/**
 * Draw hero selection menu.
 * Includes buttons, hero avatar and guide text
 */
Menu.prototype.renderSelection = function() {
  //draw buttons
  this.rightButton.render();
  this.leftButton.render();

  //draw guide texts
  this.drawTextWithBackground("Use keyboard arrow keys to select hero", this.CW/2, 200);
  this.drawTextWithBackground("Press enter to start", this.CW/2, 450);

  //draw player image
  ctx.drawImage(Resources.get(this.playerCatalog[this.selectedPlayer]), this.CW/2-this.TW/2, this.CH/2-100);
};

/**
 * Draw "you win" message
 */
Menu.prototype.renderWin = function() {
  this.drawTextWithBackground("YOU WIN! Press Enter to play again", this.CW/2, 450);
};

/**
 * Draw "you lose" message
 */
Menu.prototype.renderLose = function() {
  this.drawTextWithBackground("YOU LOSE :( Press Enter to play again", this.CW/2, 450);
};

/**
 * Handle keyboard input for interacting with the menu
 * @param {String} keyString - ("left", "right", "enter")
 */
Menu.prototype.handleInput = function(keyString) {
  var self = this;

  // list of all hero images
  var avatars = Object.keys(this.playerCatalog);
  var len = avatars.length;

  /**
   * Generic unit class
   * @param {Number} shifter - Iterates through avatars by this amount
   * @returns {string} sprite - Key of imageUrl in playerCatalog
   */
  function nextAvatar(shifter) {
    shifter = shifter || 1;
    var index = avatars.indexOf(self.selectedPlayer);
    // using complex mod for negative shifter compatibility
    var nextIndex = (((index+shifter)%len)+len)%len;
    return avatars[nextIndex];
  }

  // detect the key and take action accordingly
  if(keyString === 'left') {
    this.leftButton.clicked();  
    this.selectedPlayer = nextAvatar(-1);

  } else if(keyString === 'right') {
    this.rightButton.clicked();
    this.selectedPlayer = nextAvatar();

  } else if(keyString === 'enter') {
    if(this.state === this.states.SELECTION){
      player.setSpriteImage(this.playerCatalog[this.selectedPlayer]);
      engine.startTime = engine.lastTime;
      this.state = this.states.HIDDEN;

    } else if(this.state === this.states.WIN || this.state === this.states.LOSE) {
      engine.reset();
    }
  }
};

/**
 * Draws given text to the canvas
 * @param {string} text - Text to draw
 * @param {Number} x - X position
 * @param {Number} y - Y position
 */
Menu.prototype.drawText = function(text, x, y) {
  ctx.fillStyle = "black";
  ctx.strokeStyle = "#ddd";
  ctx.font = "18pt sans-serif";
  ctx.textAlign = "center";
  ctx.strokeText(text, x, y);
  ctx.fillText(text, x, y);
};

/**
 * Draws given text to the canvas with highlighted background
 * @param {string} text - Text to draw
 * @param {Number} x - X position
 * @param {Number} y - Y position
 */
Menu.prototype.drawTextWithBackground = function(text, x, y) {
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.fillRect(0, y-30, this.CW, 44);
  this.drawText(text, x, y);
};

