// Votre code ici.

var clapi;
const ESCAPE_KEY = 27;
const SPACE_BAR = 32;
const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;

function init() {
    clapi = new Player();
    coin[0] = new Sprites("./images/coin.png", 10, 10, 10);
    coin[1] = new Sprites("./images/coin.png", 10, 200, 10);
    coin[2] = new Sprites("./images/coin.png", 10, 100, 50);

    document.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
            case (ARROW_LEFT):
                keyLeft();
                break;
            case (ARROW_UP):
                keyUp();
                break;
            case (ARROW_RIGHT):
                keyRight();
                break;
            case (ARROW_DOWN):
                keyDown();
                break;
            case (SPACE_BAR):
                boucle = !boucle;
                break;
            case (ESCAPE_KEY):
                boucle = false;
                break;
        }
    });
}
var coin = new Array();
var boucle = true;

function keyUp() {
    clapi.setMove("UP");
}

function keyDown() {
    clapi.setMove("DOWN");
}

function keyLeft() {
    clapi.setMove("LEFT");
}

function keyRight() {
    clapi.setMove("RIGHT");
}

function refreshGame() {
    if (boucle)
    {
        for (i = 0; i < 3; i++)
            coin[i].draw();
    }
}