// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.initialLocationx = Math.random()*400;
    this.initialLocationy = Math.floor(Math.random() * (220 - 80) ) + 50;
    this.location;
    this.speed = 1 + Math.random();
    this.x = this.initialLocationx;
    this.y = this.initialLocationy;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // To move the enemies 
    this.x += dt+1*this.speed;

    // To check for collision 
    allEnemies.forEach(function(a){
        if (a.x < player.x + player.width &&
            a.x + a.width > player.x &&
            a.y < player.y + b.height &&
            a.y + a.height > player.y){
                gameOver();
            };
    });
    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.handleInput = function(key){
        switch (key) {
            case 'left':
              this.x -= 50;
              break;
            case 'up':
              this.y -= 50;
              break;
            case 'right':
              this.x += 50;
              break;
            case 'down':
              this.y += 50;
              break;
          }
    };
};

player.prototype.update = function(dt){

};

player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var player = new player();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemy1 = new Enemy();
    var enemy2 = new Enemy();
    var enemy3 = new Enemy();
    var enemy4 = new Enemy();
    allEnemies.push(enemy1);
    allEnemies.push(enemy2);
    allEnemies.push(enemy3);
    allEnemies.push(enemy4);

setInterval(function(){

    var enemy1 = new Enemy();
    var enemy2 = new Enemy();
    var enemy3 = new Enemy();
    allEnemies.push(enemy1);
    allEnemies.push(enemy2);
    allEnemies.push(enemy3);
    enemy1.x = enemy2.x = enemy3.x = Math.random()*(-150);

},4000)

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function gameOver(){
    reset();[]
    var gameEndMsg = document.getElementsByName('game-end');
    gameEndMsg.style.display = "block";
}