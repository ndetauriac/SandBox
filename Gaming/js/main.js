// Votre code ici.

var mainPlayer;
var ia1;
const ESCAPE_KEY = 27;
const SPACE_BAR = 32;
const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;
const LEFT_SHIFT = 16;
const CTRL_LEFT = 17;

function init() {
    mainPlayer = new Player("ninja", 600, 0);
    addPlateform(200, 550, 20, 250, "LEFT");
    addPlateform(600, 300, 200, 20, "BOT");
    addPlateform(800, 550, 200, 20);
    // Borders
    // Left
    addPlateform(-200, 0, 200, 800);
    // Right
    addPlateform(1200, 0, 200, 800);
    // Top
    addPlateform(0, -200, 1200, 200);
    // Bottom
    addPlateform(0, 800, 1200, 200);
    addCoin(500, 200);
    addCoin(600, 200);
    addCoin(700, 200);
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
            case (CTRL_LEFT):
                shurikens[nShurikens] = mainPlayer.throwShuriken();
                nShurikens++;
                break;
            case (ESCAPE_KEY):
                mainPlayer.kill();
                break;
        }
    });
    boucle = true;
}


var coin = new Array();
var nCoin = 0;

var shurikens = new Array();
var nShurikens = 0;

var platform = new Array();
var nPlatform = 0;

var boucle = false;
var frameCpt = 0;

var map = {}; // You could also use an array
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
    /* insert conditional here */
}

function addCoin(x, y, stasis = false)
{
    coin[nCoin] = new Coin(x, y, stasis);
    nCoin++;
}

function addPlateform(x, y, w = 200, h = 10, mode = "FULL")
{
    platform[nPlatform] = new Plateform(x, y, w, h, mode);
    nPlatform++;
}

function addSemiPlateform(x, y, w = 200, h = 10)
{
    platform[nPlatform] = new Plateform(x, y, w, h, "BOT");
    nPlatform++;
}

function keyUp() {
    mainPlayer.moveUp();
}

function keyDown() {
    mainPlayer.setMove("DOWN");
}

function keyLeft() {
    mainPlayer.moveLeft();
}

function keyRight() {
    mainPlayer.moveRight();
}

function refreshGame() {
    if (boucle)
    {
        // Controls
        if(mainPlayer.isPAlive)
        {
            if(map[ARROW_LEFT]){
                mainPlayer.moveLeft();
            }
            if(map[ARROW_UP]){
                mainPlayer.moveUp();
            }
            if(map[ARROW_RIGHT]){
                mainPlayer.moveRight();
            }
            if(map[CTRL_LEFT]){
            }
            if(map[ARROW_DOWN]){
                mainPlayer.playerSlide = true;
            }
            else{
                mainPlayer.playerSlide = false;
            }
            if(map[LEFT_SHIFT]){
                mainPlayer.run = 1;
            }
            else
                mainPlayer.run = 0;
        }
        // Clear sprites
        mainPlayer.clear();
        //ia1.clear();
        for (i = 0; i < nCoin; i++)
            coin[i].clear();
        for (i = 0; i < nPlatform; i++)
            platform[i].clear();
        for (i = 0; i < nShurikens; i++)
            shurikens[i].clear();

        if (frameCpt++ == 3)
        {

            // Update sprites
            mainPlayer.updatePosition(platform, nPlatform);
            //ia1.updatePosition(platform, nPlatform);
            for (i = 0; i < nCoin; i++)
            {
                coin[i].updatePosition(platform, nPlatform);
                if (mainPlayer.hasCollectedCoin(coin[i]))
                {
                    coin[i] = coin[--nCoin];
                }
            }
            for (i = 0; i < nShurikens; i++)
            {
                if (shurikens[i].updatePosition(platform, nPlatform))
                {
                    shurikens[i] = shurikens[--nShurikens];
                }

            }
            frameCpt = 0;
        }


        // Draw sprites
        for (i = 0; i < nCoin; i++)
            coin[i].draw();
        for (i = 0; i < nShurikens; i++)
            shurikens[i].draw();
        for (i = 0; i < nPlatform; i++)
            platform[i].draw();
        mainPlayer.draw();
        //ia1.draw();
    }
}
