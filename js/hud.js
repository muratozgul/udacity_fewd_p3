/**
 * HUD class for displaying time, score and other info as an overlay
 * @param {Number} [x=0] - X position in the canvas
 * @param {Number} [y=0] - Y position in the canvas
 * @class
 */
var HUD = function(x, y) {
  //this.menuSprite = 'images/carousel-arrow.png',
  this.drawPosition = {
    x: x || 0, // X position in the canvas
    y: y || 0 // Y position in the canvas
  };

  this.timer = 0;
};

/**
 * Update unit - subClasses must implement
 * @param {Number} dt - A time delta between ticks (in milliseconds)
 */
HUD.prototype.update = function(dt) {
  this.timer = engine.lastTime - engine.startTime;
};

/**
 * Draw the unit on the screen, required method for game
 */
HUD.prototype.render = function() {
  this.clearHUDspace();
  this.drawTime();
  this.drawScore();
};

HUD.prototype.drawTime = function() {
  var ms = this.timer;
  var min = (ms/1000/60) << 0;
  var sec = ((ms/1000) % 60) << 0;

  var timeText = "Time: " + this.pad(min, 2) + ":" + this.pad(sec, 2);

  // draw font in red
  ctx.fillStyle = "black";
  ctx.font = "20pt sans-serif";
  ctx.fillText(timeText, 2, 40);
};

HUD.prototype.drawScore = function() {
  var scoreText = "Score: " + this.pad(player.score, 6);

  // draw font in red
  ctx.fillStyle = "black";
  ctx.font = "20pt sans-serif";
  ctx.fillText(scoreText, 410, 40);
};

HUD.prototype.clearHUDspace = function() {
  //clear background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, level.numCols*level.tileData.width, level.tileData.surfaceTopOffset);
};

HUD.prototype.reset = function() {
  this.timer = 0;
  this.clearHUDspace();
}

HUD.prototype.pad = function(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};
