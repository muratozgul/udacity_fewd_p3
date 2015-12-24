/**
 * Returns a random integer between min (included) and max (included)
 * @param {Number} min - Lower bound, inclusive
 * @param {Number} max - Upper bound, inclusive
 * @returns {Number} - A random integer
 */
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Enemies our player must avoid
 * @class
 * @extends - Unit
 */
var Enemy = function() {
  Unit.call(this, 'images/enemy-bug.png', {
    left: 2,
    right: 99,
    top: 75,
    bottom: 145
  });
  this.speed = getRandomIntInclusive(5, 10); // Horizontal speed of enemy
};

Enemy.prototype = Object.create(Unit.prototype);
Enemy.prototype.constructor = Enemy;

/**
 * Update the enemy's position
 * @param {Number} dt - A time delta between ticks (in milliseconds)
 * @override
 */
Enemy.prototype.update = function(dt) {
  this.drawPosition.x += this.speed * dt;
};