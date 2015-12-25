/**
 * Level factory crates and returns a level object
 * @returns {Object} - level object for generating level and providing info about the level
 */
var levelFactory = function(){
  var level = {};

  level.rowImages = [
    'images/water-block.png',   // Top row is water
    'images/stone-block.png',   // Row 1 of 3 of stone
    'images/stone-block.png',   // Row 2 of 3 of stone
    'images/stone-block.png',   // Row 3 of 3 of stone
    'images/grass-block.png',   // Row 1 of 2 of grass
    'images/grass-block.png'    // Row 2 of 2 of grass
  ];

  level.numRows = 6; // #of Tile rows
  level.numCols = 5; // #of Tile columns

  /**
   * Draw the level map on the screen
   */
  level.render = function(){
    for (var row = 0; row < level.numRows; row++) {
      for (var col = 0; col < level.numCols; col++) {
        /* The drawImage function of the canvas' context element
         * requires 3 parameters: the image to draw, the x coordinate
         * to start drawing and the y coordinate to start drawing.
         * We're using our Resources helpers to refer to our images
         * so that we get the benefits of caching these images, since
         * we're using them over and over.
         */
        ctx.drawImage(Resources.get(level.rowImages[row]), col * 101, row * 83);
      }
    }
  }

  // Helper data object
  level.tileData = {
    height: 171, // Tile height
    width: 101, // Tile width
    surfaceTopOffset: 51, // Tile top offset (transparent)
    surfaceBottomOffset: 131, // Tile bottom offset (underground)
    surfaceHeight: 80, // Visible tile height when stacked
    /**
     * Returns the center coordinates of a tile
     * Helps alignment for placement and drawing
     * @param {Number} row - Row index of the tile
     * @param {Number} col - Column index of the tile
     * @returns {Object} - Contains x and y position of tile center
     */
    getTileCenter: function(row, col){
      row++;
      col++;
      var x = col*this.width - Math.floor(this.width/2);
      var y = row*this.surfaceHeight + this.surfaceTopOffset;
      return {x: x, y: y};
    }
  }

  return level;
};