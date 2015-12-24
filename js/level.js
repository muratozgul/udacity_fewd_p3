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

  level.numRows = 6;
  level.numCols = 5;

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

  level.tileData = {
    height: 171,
    width: 101,
    surfaceTopOffset: 51,
    surfaceBottomOffset: 131,
    surfaceHeight: 80,
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