// Votre code ici.

var clapi;
const ESCAPE_KEY = 27;
const SPACE_BAR = 32;
const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;
const LEFT_SHIFT = 16;

function init() {
    clapi = new Player();
    addCoin(200, 10);
    /*addPlateform(100,500);
    addPlateform(500,500);
    addPlateform(300,400);
    addPlateform(100,300);
    addPlateform(500,300);
    addPlateform(300,200);*/
    document.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
            /*
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
                */
            case (SPACE_BAR):
                boucle = !boucle;
                break;
            case (ESCAPE_KEY):
                boucle = false;
                break;
        }
    });
    boucle = true;
	
	winWidth = document.getElementById('gameArea').width;
	winHeight = document.getElementById('gameArea').height;
}

var winWidth;
var winHeight;


var coin = new Array();
var nCoin = 0;

var platform = new Array();
var nPlatform = 0;

var boucle = false;

var map = {}; // You could also use an array
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
    /* insert conditional here */
}

function addCoin(x, y)
{
    coin[nCoin] = new Coin(x, y);
    nCoin++;
}

function addPlateform(x, y)
{
    platform[nPlatform] = new Plateform(x, y);
    nPlatform++;
}

function keyUp() {
    clapi.moveUp();
}

function keyDown() {
    clapi.setMove("DOWN");
}

function keyLeft() {
    clapi.moveLeft();
}

function keyRight() {
    clapi.moveRight();
}

function refreshGame() {
    if (boucle)
    {
        if(map[ARROW_LEFT]){
            clapi.moveLeft();
        }
        if(map[ARROW_UP]){
            clapi.moveUp();
        }
        if(map[ARROW_RIGHT]){
            clapi.moveRight();
        }
        if(map[ARROW_DOWN]){
            addCoin(Math.random()*winHeight, Math.random()*winHeight);
        }
        if(map[LEFT_SHIFT]){
            clapi.run = 1;
        }
        else
            clapi.run = 0;
        
        // Clear sprites
        clapi.clear();
        for (i = 0; i < nCoin; i++)
            coin[i].clear();
        for (i = 0; i < nPlatform; i++)
            platform[i].clear();
        
        // Update sprites
        clapi.updatePosition(platform, nPlatform);
        for (i = 0; i < nCoin; i++)
        {
            coin[i].updatePosition(platform, nPlatform);
            if (clapi.hasCollectedCoin(coin[i]))
            {
                coin[i] = coin[--nCoin];
            }
        }
        
        // Draw sprites
        clapi.draw();
        for (i = 0; i < nCoin; i++)
            coin[i].draw();
        for (i = 0; i < nPlatform; i++)
            platform[i].draw();
    }
}