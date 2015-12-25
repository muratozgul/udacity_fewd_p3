
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
  this.animation = {
    state: null,
    startTime: null,
    duration: null
  };
};

MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.update = function(dt) {
  if(this.animation.state) {
    if(this.animation.startTime + this.animation.duration < engine.lastTime) {
      this.animation.state = null;
    }
  }
};

MenuItem.prototype.render = function() {
  if(this.animation.state === 'clicked') {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(this.drawPosition.x + this.sprite.width/2,
            this.drawPosition.y + this.sprite.width/2,
            this.sprite.width/2 - 5,
            0, 2*Math.PI);
    ctx.fill();
  }
  ctx.drawImage(Resources.get(this.sprite.image), this.drawPosition.x, this.drawPosition.y);
};

MenuItem.prototype.clicked = function() {
  this.animation = {
    state: "clicked",
    startTime: engine.lastTime,
    duration: 300 //ms
  }
};