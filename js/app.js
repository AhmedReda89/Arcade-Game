// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.initialLocationx = Math.random() * 400;
    this.initialLocationy = Math.floor(Math.random() * (220 - 80)) + 50;
    this.speed = 1 + Math.random();
    this.x = this.initialLocationx;
    this.y = this.initialLocationy;
    this.width = 75;
    this.height = 75;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // To move the enemies 
    this.x += dt + 1 * this.speed;

    this.checkCollisions();
};

Enemy.prototype.checkCollisions = function () {
    // To check for collision 
    if (player.x < this.x + this.width &&
        player.x + player.width > this.x &&
        player.y < this.y + this.height &&
        player.y + player.height > this.y) {
        gameOver();
    };
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.width = 70;
    this.height = 70;
    this.handleInput = function (key) {
        switch (key) {
            case 'left':
                if (this.x > 10)
                    this.x -= 50;
                break;

            case 'up':
                if (this.y > 0) {
                    this.y -= 50;
                }
                else {
                    winGameOver();
                }
                break;

            case 'right':
                if (this.x < 400)
                    this.x += 50;
                break;

            case 'down':
                if (this.y < 450)
                    this.y += 50;
                break;
        }
    };
};

player.prototype.render = function () {
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

setInterval(function () {

    var enemy1 = new Enemy();
    var enemy2 = new Enemy();
    var enemy3 = new Enemy();
    allEnemies.push(enemy1);
    allEnemies.push(enemy2);
    allEnemies.push(enemy3);
    enemy1.x = enemy2.x = enemy3.x = Math.random() * (-150);

}, 4000)

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (modal && !modal.opened) {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});

function gameOver() {
    //alert('Game Over');
    openModal("lose");
}
function winGameOver() {
    //alert('You Win!');
    openModal("win");
}


class Modal {
    constructor(overlay) {
        this.overlay = overlay;
        this.opened = false;
        const closeButton = overlay.querySelector('.button-close')
        closeButton.addEventListener('click', this.close.bind(this));
        overlay.addEventListener('click', e => {
            if (e.srcElement.id === this.overlay.id) {
                this.close();
            }
        });
    }
    open(res) {
        this.overlay.classList.remove('is-hidden');
        this.opened = true;
        var status = document.querySelector('.modal .content h3');
        if (res == 'win') {
            status.innerHTML = "You Win!";
            gameReset();
        } else if (res == 'lose') {
            status.innerHTML = "You Lose!";
            gameReset();
        }
    }

    close() {
        this.overlay.classList.add('is-hidden');
        this.opened = false;
    }
}
const modal = new Modal(document.querySelector('.modal-overlay'));
window.openModal = modal.open.bind(modal);
//window.openModal();

function gameReset() {
    allEnemies = [];
    player.x = 200;
    player.y = 400;
};