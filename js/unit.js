/**
 * Generic unit class (any moving object inherits from Unit)
 * @param {string} sprite - Path to the image file to draw
 * @param {Number} [x=0] - X position in the canvas
 * @param {Number} [y=0] - Y position in the canvas
 * @class
 */
var Unit = function(sprite, x, y) {
  this.sprite = sprite; // The image/sprite to draw
  this.x = x || 0; // X position in the canvas
  this.y = y || 0; // Y position in the canvas
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
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};