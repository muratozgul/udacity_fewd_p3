/**
 * Generic unit class (any moving object inherits from Unit)
 * @param {string} sprite - Path to the image file to draw
 * @param {Object=} colOffset - Collision box offset values relative to the sprite position
 * @param {Number} [x=0] - X position in the canvas
 * @param {Number} [y=0] - Y position in the canvas
 * @class
 */
var Unit = function(spriteImage, colOffset, x, y) {
  this.sprite = {
    image: spriteImage, // The image/sprite to draw
    width: 101, // Width of the sprite in pixels
    height: 171 // Height of the sprite in pixels
  },
  this.drawPosition = {
    x: x || 0, // X position in the canvas
    y: y || 0 // Y position in the canvas
  },
  // Collision box offset relative to the sprite
  this.relCollisionBox = { 
    leftOffset: colOffset ? colOffset.left : 0,
    rightOffset: colOffset ? colOffset.right : 101,
    topOffset: colOffset ? colOffset.top : 51,
    bottomOffset: colOffset ? colOffset.bottom : 40
  }
};

/**
 * Update unit - subClasses must implement
 * @param {Number} dt - A time delta between ticks (in milliseconds)
 */
Unit.prototype.update = function(dt) {
  // Subclasses must override this function
};

/**
 * Draw the unit on the screen, required method for game
 */
Unit.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite.image), this.drawPosition.x, this.drawPosition.y);
  this.drawSpriteBox();
  this.drawCollisionBox();
};

/**
 * Draw the collision box as a red rectangle for debugging
 */
Unit.prototype.drawCollisionBox = function() {
  var box = this.getCollisionBox();

  ctx.beginPath();
  ctx.lineWidth = "2";
  ctx.strokeStyle = "red";
  ctx.rect(box.left, box.top, box.right-box.left, box.bottom-box.top); 
  ctx.stroke();
};

/**
 * Draw the sprite box as a green rectangle for debugging
 */
Unit.prototype.drawSpriteBox = function() {
  var dp = this.drawPosition;

  ctx.beginPath();
  ctx.lineWidth = "2";
  ctx.strokeStyle = "#af4";
  ctx.rect(dp.x, dp.y, this.sprite.width, this.sprite.height); 
  ctx.stroke();
};

/**
 * Returns collision box coordinates
 * @returns {Object} - An object that contains collision limits
 */
Unit.prototype.getCollisionBox = function() {
  var spritePos = this.drawPosition;
  var relBox = this.relCollisionBox;

  var collisionBox = {
    left: spritePos.x + relBox.leftOffset,
    right: spritePos.x + relBox.rightOffset,
    top: spritePos.y + relBox.topOffset,
    bottom: spritePos.y + relBox.bottomOffset 
  }

  return collisionBox;
};

/**
 * Positions the unit on a specific tile
 * @param {Number} tileRow - Row number of tile (0 indexed)
 * @param {Number} tileCol - Column number of tile (0 indexed)
 */
Unit.prototype.placeOnTile = function(tileRow, tileCol) {
  var td = level.tileData;
  var rcb = this.relCollisionBox;

  // Get tile position
  var tilePosition = td.getTileCenter(tileRow, tileCol);

  // Update draw position of the unit accordingly
  this.drawPosition.x = tilePosition.x - Math.floor(td.width/2);
  this.drawPosition.y = tilePosition.y - rcb.bottomOffset - 20;
};










