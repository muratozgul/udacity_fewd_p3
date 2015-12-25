/**
 * Collectible items our player can collect to gain score
 * @param {String} [spriteImage='images/star.png'] - Sprite to draw
 * @param {Number} [row=1] - Placed row of the collectible
 * @param {Number} [col=1] - Placed col of the collectible
 * @class
 * @extends - Unit
 */
var Collectible = function(spriteImage, row, col) {
  spriteImage = spriteImage || 'images/Star.png';

  Unit.call(this, spriteImage, {
    left: 2,
    right: 99,
    top: 75,
    bottom: 145
  });

  if(row) {
    this.row = row || 1;
    this.col = col || 1;
    this.placeOnTile(this.row, this.col);
  } else {
    this.reset();
  }
  
  this.isCollected = false;
};

Collectible.prototype = Object.create(Unit.prototype);
Collectible.prototype.constructor = Collectible;

/**
 * Animate collectible by moving up and down slightly
 * @param {Number} dt - A time delta between ticks (in milliseconds)
 * @override
 */
Collectible.prototype.update = function(dt) {
  if(!this.isCollected) {

  }
};

/**
 * Draw the unit on the screen, required method for game
 */
Collectible.prototype.render = function() {
  if(!this.isCollected) {
    ctx.drawImage(Resources.get(this.sprite.image), this.drawPosition.x, this.drawPosition.y);  
  }
};

/**
 * Reset the collectible's position
 */
Collectible.prototype.reset = function() {
  var newRow = getRandomIntInclusive(1, 3);
  var newCol = getRandomIntInclusive(0, 4);
  this.placeOnTile(newRow, newCol);
  this.isCollected = false;
  this.status = 'visible';
};

/**
 * Animate and hide when collected by the player
 */
Collectible.prototype.collected = function() {
  this.isCollected = true;
  player.score += 50;
};

/**
 * Checks collision with a given unit
 * @param {Object} unit - Any object that extends unit
 * @returns {Boolean} - True if there is collision, false otherwise
 */
Collectible.prototype.checkCollisionWith = function(unit) {
  if(this.isCollected) {
    return false;
  }

  var rect1 = this.getCollisionBox();
  var rect2 = unit.getCollisionBox();

  if( rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top)
  {
    return true;
  }
  return false;
};
