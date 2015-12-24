/**
 * Player class
 * @class
 * @extends - Unit
 */
var Player = function() {
  Unit.call(this, 'images/char-boy.png', {
    left: 16,
    right: 85,
    top: 85,
    bottom: 140
  }, 100, 100);
  this.status = {
    action: 'idle',
    direction: 0,
    startTime: Date.now(),
    distanceLeft: 0
  };
  this.speed = 200; //jump speed
};

Player.prototype = Object.create(Unit.prototype);
Player.prototype.constructor = Player;

Player.prototype.directions = {
  NONE: 0,
  UP: 1,
  RIGHT: 2,
  DOWN: 3,
  LEFT: 4
};

/**
 * Update the player's position
 * @param {Number} dt - A time delta between ticks (in milliseconds)
 * @override
 */
Player.prototype.update = function(dt) {

  if(this.status.action === 'jumping') {
    // calculate distance covered
    var distanceCovered = Math.min(dt * this.speed, this.status.distanceLeft);
    
    // update distance left
    this.status.distanceLeft -= distanceCovered;

    // update according to jump direction
    if(this.status.direction === this.directions.UP) {
      this.drawPosition.y -= distanceCovered;
    } else if(this.status.direction === this.directions.RIGHT) {
      this.drawPosition.x += distanceCovered;
    } else if(this.status.direction === this.directions.DOWN) {
      this.drawPosition.y += distanceCovered;
    } else if(this.status.direction === this.directions.LEFT) {
      this.drawPosition.x -= distanceCovered;
    }
    
    if(this.status.distanceLeft <= 0) {
      this.status.action = 'idle';
    }
  }

  var isCollision = allEnemies.some(function(currentEnemy, index, array){
    return this.checkCollisionWith(currentEnemy);
  }, this);

  if(isCollision) {
    
  }
};

/**
 * Handle keyboard input to move the player
 * @param {String} direction - Player move direction ("left", "right", "up", "down")
 */
Player.prototype.handleInput = function(direction) {
  if(this.status.action === 'idle') {
    this.jump(direction);  
  }
};

/**
 * Start jump animation
 * @param {String} direction - Player move direction ("left", "right", "up", "down")
 */
Player.prototype.jump = function(direction) {

  this.status.action = 'jumping';
  this.status.startTime = Date.now() / 1000.0;

  if(direction === 'up') {
    this.status.direction = this.directions.UP;
    this.status.distanceLeft = level.tileData.surfaceHeight;
  } else if(direction === 'right') {
    this.status.direction = this.directions.RIGHT;
    this.status.distanceLeft = level.tileData.width;
  } else if(direction === 'down') {
    this.status.direction = this.directions.DOWN;
    this.status.distanceLeft = level.tileData.surfaceHeight;
  } else if(direction === 'left') {
    this.status.direction = this.directions.LEFT;
    this.status.distanceLeft = level.tileData.width;
  }
};



