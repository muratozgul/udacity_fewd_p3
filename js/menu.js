

var Menu = function() {
  this.CW = engine.canvas.width;
  this.CH = engine.canvas.height;
  this.TW = level.tileData.width;

  this.rightButton = new MenuItem({
    image: 'images/carousel-arrow-right.png',
    width: 100,
    height: 100
  }, this.CW/2-50+this.TW, this.CH/2-50);

  this.leftButton = new MenuItem({
    image: 'images/carousel-arrow-left.png',
    width: 100,
    height: 100
  }, this.CW/2-50-this.TW, this.CH/2-50);

  this.playerCatalog = {
    boy: 'images/char-boy.png',
    catGirl: 'images/char-cat-girl.png',
    hornGirl: 'images/char-horn-girl.png',
    pinkGirl: 'images/char-pink-girl.png',
    princess: 'images/char-princess-girl.png'
  };

  this.selectedPlayer = 'boy';
};

Menu.prototype.constructor = Menu;

Menu.prototype.update = function(dt) {
  this.rightButton.update(dt);
  this.leftButton.update(dt);
};

Menu.prototype.render = function() {
  this.rightButton.render();
  this.leftButton.render();

  this.drawText("Use keyboard arrow keys to change player", this.CW/2, 200);
  this.drawText("Press enter to start", this.CW/2, 450);

  //draw player image
  ctx.drawImage(Resources.get(this.playerCatalog[this.selectedPlayer]), this.CW/2-this.TW/2, this.CH/2-100);
};

Menu.prototype.handleInput = function(keyString) {
  if(keyString === 'left') {
    this.leftButton.clicked();    
  } else if(keyString === 'right') {
    this.rightButton.clicked();  
  } else if(keyString === 'enter') {
    appState = 'playing';
    console.log("appstate", appState);
  }
};

Menu.prototype.drawText = function(text, x, y) {
  ctx.fillStyle = "black";
  ctx.strokeStyle = "#ddd";
  ctx.font = "18pt sans-serif";
  ctx.textAlign = "center";
  ctx.strokeText(text, x, y);
  ctx.fillText(text, x, y);
}

