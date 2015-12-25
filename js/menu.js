

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

  this.state = 0;

  this.states = {
    SELECTION: 0,
    HIDDEN: 1,
    WIN: 2,
    LOSE: 3
  }
};

Menu.prototype.constructor = Menu;

Menu.prototype.update = function(dt) {
  this.rightButton.update(dt);
  this.leftButton.update(dt);
};

Menu.prototype.render = function() {
  if(this.state === this.states.SELECTION){
    this.renderSelection();
  } else if(this.state === this.states.WIN) {
    this.renderWin();
  } else if(this.state === this.states.LOSE) {
    this.renderLose();
  }
};

Menu.prototype.renderSelection = function() {
  this.rightButton.render();
  this.leftButton.render();

  this.drawTextWithBackground("Use keyboard arrow keys to select hero", this.CW/2, 200);
  this.drawTextWithBackground("Press enter to start", this.CW/2, 450);

  //draw player image
  ctx.drawImage(Resources.get(this.playerCatalog[this.selectedPlayer]), this.CW/2-this.TW/2, this.CH/2-100);
};

Menu.prototype.renderWin = function() {
  this.drawTextWithBackground("YOU WIN! Press Enter to play again", this.CW/2, 450);
};

Menu.prototype.renderLose = function() {
  this.drawTextWithBackground("YOU LOSE :( Press Enter to play again", this.CW/2, 450);
};

Menu.prototype.handleInput = function(keyString) {
  var self = this;

  var avatars = Object.keys(this.playerCatalog);
  var len = avatars.length;

  function nextAvatar(shifter) {
    shifter = shifter || 1;
    var index = avatars.indexOf(self.selectedPlayer);
    var nextIndex = (((index+shifter)%len)+len)%len;
    return avatars[nextIndex];
  }

  if(keyString === 'left') {
    this.leftButton.clicked();  
    this.selectedPlayer = nextAvatar(-1);
  } else if(keyString === 'right') {
    this.rightButton.clicked();
    this.selectedPlayer = nextAvatar();
  } else if(keyString === 'enter') {
    if(this.state === this.states.SELECTION){
      player.setSpriteImage(this.playerCatalog[this.selectedPlayer]);
      this.state = this.states.HIDDEN;
    } else if(this.state === this.states.WIN || this.state === this.states.LOSE) {
      engine.reset();
    }
    
  }
};

Menu.prototype.drawText = function(text, x, y) {
  ctx.fillStyle = "black";
  ctx.strokeStyle = "#ddd";
  ctx.font = "18pt sans-serif";
  ctx.textAlign = "center";
  ctx.strokeText(text, x, y);
  ctx.fillText(text, x, y);
};

Menu.prototype.drawTextWithBackground = function(text, x, y) {
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.fillRect(0, y-30, this.CW, 44);
  this.drawText(text, x, y);
};

