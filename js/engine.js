/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = function(global) {
  /* Predefine the variables we'll be using within this scope,
   * create the canvas element, grab the 2D context for that canvas
   * set the canvas elements height/width and add it to the DOM.
   */
  this.doc = global.document;
  this.win = global.window;
  this.canvas = this.doc.createElement('canvas');
  this.ctx = this.canvas.getContext('2d');
  this.lastTime;
  this.startTime;

  this.canvas.width = 505;
  this.canvas.height = 606;
  this.doc.body.appendChild(this.canvas);

  /* Assign the canvas' context object to the global variable (the window
   * object when run in a browser) so that developers can use it more easily
   * from within their app.js files.
   */
  global.ctx = this.ctx;
}

/* This function serves as the kickoff point for the game loop itself
 * and handles properly calling the update and render methods.
 */
Engine.prototype.main = function(){
  /* Get our time delta information which is required if your game
   * requires smooth animation. Because everyone's computer processes
   * instructions at different speeds we need a constant value that
   * would be the same for everyone (regardless of how fast their
   * computer is) - hurray time!
   */
  var now = Date.now();
  var dt = (now - this.lastTime) / 1000.0;

  /* Call our update/render functions, pass along the time delta to
   * our update function since it may be used for smooth animation.
   */
  this.update(dt);
  this.render();

  /* Set our lastTime variable which is used to determine the time delta
   * for the next time this function is called.
   */
  this.lastTime = now;

  /* Use the browser's requestAnimationFrame function to call this
   * function again as soon as the browser is able to draw another frame.
   */
  this.win.requestAnimationFrame(this.main.bind(this));
}

/* This function does some initial setup that should only occur once,
 * particularly setting the lastTime variable that is required for the
 * game loop.
 */
Engine.prototype.init = function(){
  this.reset();
  this.lastTime = Date.now();
  this.startTime = this.lastTime;
  this.main();
}

/* This function is called by main (our game loop) and itself calls all
 * of the functions which may need to update entity's data. Based on how
 * you implement your collision detection (when two entities occupy the
 * same space, for instance when your character should die), you may find
 * the need to add an additional function call here. For now, we've left
 * it commented out - you may or may not want to implement this
 * functionality this way (you could just implement collision detection
 * on the entities themselves within your app.js file).
 */
Engine.prototype.update = function(dt){
  if(menu.state === menu.states.HIDDEN){
    this.updateEntities(dt);
    hud.update(dt);
  } else {
    menu.update(dt);
  }
}

/* This is called by the update function and loops through all of the
 * objects within your allEnemies array as defined in app.js and calls
 * their update() methods. It will then call the update function for your
 * player object. These update methods should focus purely on updating
 * the data/properties related to the object. Do your drawing in your
 * render methods.
 */
Engine.prototype.updateEntities = function(dt) {
  allEnemies.forEach(function(enemy) {
    enemy.update(dt);
  });
  player.update(dt);
}

/* This function initially draws the "game level", it will then call
 * the renderEntities function. Remember, this function is called every
 * game tick (or loop of the game engine) because that's how games work -
 * they are flipbooks creating the illusion of animation but in reality
 * they are just drawing the entire screen over and over.
 */
Engine.prototype.render = function() {
  level.render();
  
  if(menu.state !== menu.states.HIDDEN) {
    menu.render();
  } 
  if(menu.state !== menu.states.SELECTION) {
    hud.render();
    this.renderEntities();  
  }
}

/* This function is called by the render function and is called on each game
 * tick. Its purpose is to then call the render functions you have defined
 * on your enemy and player entities within app.js
 */
Engine.prototype.renderEntities = function() {
  /* Loop through all of the objects within the allEnemies array and call
   * the render function you have defined.
   */
  allEnemies.forEach(function(enemy) {
    enemy.render();
  });

  allCollectibles.forEach(function(collectible) {
    collectible.render();
  });

  player.render();
}

/* This function does nothing but it could have been a good place to
 * handle game reset states - maybe a new game menu or a game over screen
 * those sorts of things. It's only called once by the init() method.
 */
Engine.prototype.reset = function() {
  menu.state = menu.states.SELECTION;
  hud.reset();
  player.reset();
  allCollectibles.forEach(function(currentCollectible, index, array){
    currentCollectible.reset();
  }, this);
}











