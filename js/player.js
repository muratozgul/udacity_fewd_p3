/**
 * Player class
 * @class
 * @extends - Unit
 */
var Player = function() {
  Unit.call(this, 'images/char-boy.png', {
    left: 16,
    right: 85,
    top: 63,
    bottom: 140
  }, 100, 100);
};

Player.prototype = Object.create(Unit.prototype);
Player.prototype.constructor = Player;

/**
 * Update the player's position
 * @param {Number} dt - A time delta between ticks (in milliseconds)
 * @override
 */
Player.prototype.update = function(dt) {
  
};

/**
 * Handle keyboard input to move the player
 * @param {String} direction - Player move direction ("left", "right", "up", "down")
 * @override
 */
Player.prototype.handleInput = function(direction) {
  console.log(direction);
};