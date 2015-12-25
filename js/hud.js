/**
 * Heads Up Display class for displaying time, score and other info as an overlay
 * @class
 */
var HUD = function(x, y) {
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
 * Draw the HUD on the screen, required method for game
 */
HUD.prototype.render = function() {
  this.clearHUDspace();
  this.drawTime();
  this.drawScore();
};

/**
 * Draw the timer (time passed in "mm:ss" format)
 */
HUD.prototype.drawTime = function() {
  var ms = this.timer;
  var min = (ms/1000/60) << 0; // bitwise operator for converting to integer
  var sec = ((ms/1000) % 60) << 0;

  var timeText = "Time: " + this.pad(min, 2) + ":" + this.pad(sec, 2);

  // draw text on upper left corner
  ctx.fillStyle = "black";
  ctx.font = "20pt sans-serif";
  ctx.fillText(timeText, 2, 40);
};

/**
 * Draw player score
 */
HUD.prototype.drawScore = function() {
  var scoreText = "Score: " + this.pad(player.score, 6);

  // draw text on upper right corner
  ctx.fillStyle = "black";
  ctx.font = "20pt sans-serif";
  ctx.fillText(scoreText, 410, 40);
};

/**
 * Repaint HUD background (white) to clear artifacts
 */
HUD.prototype.clearHUDspace = function() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, level.numCols*level.tileData.width, level.tileData.surfaceTopOffset);
};

/**
 * Reset HUD when game restarts
 */
HUD.prototype.reset = function() {
  this.timer = 0;
  this.clearHUDspace();
}

/**
 * Pads the given number with zeros
 * @param {string} n - Value to be padded
 * @param {Number} width - Required with including the padding
 * @param {string} [z='0'] - Padding character
 * @returns {string} - Padded final value
 */
HUD.prototype.pad = function(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};
