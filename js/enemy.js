/**
 * Enemies our player must avoid
 * @param {Number} [row=1] - Starting row of the enemy
 * @class
 * @extends - Unit
 */
var Enemy = function(row) {
  Unit.call(this, 'images/enemy-bug.png', {
    left: 2,
    right: 99,
    top: 75,
    bottom: 145
  });
  this.maxSpeed = 200;
  this.minSpeed = 40;
  this.speed = 15; // Horizontal speed of enemy
  this.row = row || 1;
  this.reset();
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

  if(this.drawPosition.x > level.tileData.width * level.numCols) {
    this.reset();
  }
};

/**
 * Reset the enemy's position and speed
 */
Enemy.prototype.reset = function() {
  this.placeOnTile(this.row, -1);
  this.speed = getRandomIntInclusive(this.minSpeed, this.maxSpeed); // Horizontal speed of enemy
};
