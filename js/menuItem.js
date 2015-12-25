/**
 * Menu Item class - Intertable, animatable objects displayed in menu
 * @param {Object} sprite - Object containing sprite information
 * @param {string} sprite.image - Image resource url of sprite to draw
 * @param {Number} sprite.width - Width of the sprite image in pixels
 * @param {Number} sprite.height - Height of the sprite image in pixels
 * @param {Number} [x=0] - X position in the canvas
 * @param {Number} [y=0] - Y position in the canvas
 * @class
 */
var MenuItem = function(sprite, x, y) {
  this.sprite = sprite || {
    image: 'images/carousel-arrow-right.png', // The image/sprite to draw
    width: 100, // Width of the sprite in pixels
    height: 100 // Height of the sprite in pixels
  };

  this.drawPosition = {
    x: x || 0, // X position in the canvas
    y: y || 0 // Y position in the canvas
  };

  // data for keeping track of (click) animation
  this.animation = {
    state: null,
    startTime: null,
    duration: null
  };
};

MenuItem.prototype.constructor = MenuItem;

/**
 * Update - used for updating click animation state
 * @param {Number} dt - A time delta between ticks (in milliseconds)
 */
MenuItem.prototype.update = function(dt) {
  if(this.animation.state) {
    if(this.animation.startTime + this.animation.duration < engine.lastTime) {
      this.animation.state = null;
    }
  }
};

/**
 * Draw the menuItem on the screen
 * Highlight yellow if clicked
 */
MenuItem.prototype.render = function() {
  if(this.animation.state === 'clicked') {
    // draw yellow circle
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(this.drawPosition.x + this.sprite.width/2,
            this.drawPosition.y + this.sprite.width/2,
            this.sprite.width/2 - 5,
            0, 2*Math.PI);
    ctx.fill();
  }

  // draw sprite
  ctx.drawImage(Resources.get(this.sprite.image), this.drawPosition.x, this.drawPosition.y);
};

/**
 * Starts the click animation, lasts 300ms
 */
MenuItem.prototype.clicked = function() {
  this.animation = {
    state: "clicked",
    startTime: engine.lastTime,
    duration: 300 //ms
  }
};