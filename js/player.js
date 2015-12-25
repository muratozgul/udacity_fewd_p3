/**
 * Player class
 * @param {string} [spriteImage='images/char-boy.png'] - image resource of sprite
 * @class
 * @extends - Unit
 */
var Player = function(spriteImage) {
  spriteImage = spriteImage || 'images/char-boy.png';

  // call super
  Unit.call(this, spriteImage, {
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
  
  // jump speed (between tiles)
  this.speed = 200; 

  this.score = 0;
};

Player.prototype = Object.create(Unit.prototype);
Player.prototype.constructor = Player;

/**
 * Enum for player move directions
 */
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
    
    // update distance left (in animation)
    this.status.distanceLeft -= distanceCovered;

    // update position according to jump direction
    if(this.status.direction === this.directions.UP) {
      this.drawPosition.y -= distanceCovered;
    } else if(this.status.direction === this.directions.RIGHT) {
      this.drawPosition.x += distanceCovered;
    } else if(this.status.direction === this.directions.DOWN) {
      this.drawPosition.y += distanceCovered;
    } else if(this.status.direction === this.directions.LEFT) {
      this.drawPosition.x -= distanceCovered;
    }
    
    // check if animation is complete
    if(this.status.distanceLeft <= 0) {
      this.status.action = 'idle';
      // check if player reached the water (win condition)
      if(this.getTile().row === 0){
        player.score += 100;
        menu.state = menu.states.WIN;
      }
    }
  }

  // check collisions with enemies
  var isCollision = allEnemies.some(function(currentEnemy, index, array){
    return this.checkCollisionWith(currentEnemy);
  }, this);

  // check collisions with collectible items
  allCollectibles.forEach(function(currentCollectible, index, array){
    if(!currentCollectible.isCollected && this.checkCollisionWith(currentCollectible)) {
      // mark as collected
      currentCollectible.collected();
    }
  }, this);

  // if there is enemy collision, game ends, score resets
  if(isCollision) {
    this.score = 0;
    menu.state = menu.states.LOSE;
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

  // player's current tile (row, col)
  var tile = this.getTile();

  // start jump animation
  if(direction === 'up' && tile.row > 0) {
    this.status.direction = this.directions.UP;
    this.status.distanceLeft = level.tileData.surfaceHeight;

  } else if(direction === 'right' && tile.col < level.numCols-1) {
    this.status.direction = this.directions.RIGHT;
    this.status.distanceLeft = level.tileData.width;

  } else if(direction === 'down' && tile.row < level.numRows-1) {
    this.status.direction = this.directions.DOWN;
    this.status.distanceLeft = level.tileData.surfaceHeight;
    
  } else if(direction === 'left' && tile.col > 0) {
    this.status.direction = this.directions.LEFT;
    this.status.distanceLeft = level.tileData.width;
  }
};

/**
 * Set the hero image to new resource
 * @param {String} imageUrl - Image resource url for sprite
 */
Player.prototype.setSpriteImage = function(imageUrl) {
  this.sprite.image = imageUrl;
};

/**
 * Current tile coordinates of the player
 * @returns {Object} - Tile row and column index of the player
 */
Unit.prototype.getTile = function() {
  var rcb = this.relCollisionBox;
  var td = level.tileData;

  var row = Math.floor((this.drawPosition.y + rcb.bottomOffset - td.surfaceTopOffset) / td.surfaceHeight);
  var col = Math.floor((this.drawPosition.x + rcb.leftOffset) / level.tileData.width);
  
  return {row: row, col: col};
};

/**
 * Reset player state when game restarts
 */
Player.prototype.reset = function() {
  this.placeOnTile(5, 2);
  this.status.action = 'idle';
  this.status.distanceLeft = 0;
};
