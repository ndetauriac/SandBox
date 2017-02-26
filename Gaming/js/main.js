// Votre code ici.

var mainPlayer;
var enemies = new Array();
var nEnemies = 0;
const ESCAPE_KEY = 27;
const SPACE_BAR = 32;
const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;

const KEY_Z = 90;
const KEY_S = 83;
const KEY_Q = 81;
const KEY_D = 68;

const LEFT_SHIFT = 16;
const CTRL_LEFT = 17;
const WIN_WIDTH = window.innerWidth;
const WIN_HEIGHT = window.innerHeight;

function init() {
    mainPlayer = new Player(600, 10);
    addEnemies();
    addEnemies();
    addPlateform(200, 550, 200, 20, "FULL");
    addPlateform(600, 300, 200, 20, "FULL");
    addPlateform(800, 700, 200, 20, "FULL");
    // Borders
    // Left
    addPlateform(-200, 0, 200, WIN_HEIGHT);
    // Right
    addPlateform(WIN_WIDTH, 0, 200, WIN_HEIGHT);
    // Top
    addPlateform(0, -200, WIN_WIDTH, 200);
    // Bottom
    addPlateform(0, WIN_HEIGHT - 20, WIN_WIDTH, 200, "FULL");
    document.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
            case (KEY_Z):
                var tmpShuriken = mainPlayer.throwShuriken("UP");
                if (tmpShuriken != null)
                {
                    shurikens[nShurikens] = tmpShuriken;
                    nShurikens++;
                }
                break;
            case (KEY_S):
                var tmpShuriken = mainPlayer.throwShuriken("DOWN");
                if (tmpShuriken != null)
                {
                    shurikens[nShurikens] = tmpShuriken;
                    nShurikens++;
                }
                break;
            case (KEY_Q):
                var tmpShuriken = mainPlayer.throwShuriken("LEFT");
                if (tmpShuriken != null)
                {
                    shurikens[nShurikens] = tmpShuriken;
                    nShurikens++;
                }
                break;
            case (KEY_D):
                var tmpShuriken = mainPlayer.throwShuriken("RIGHT");
                if (tmpShuriken != null)
                {
                    shurikens[nShurikens] = tmpShuriken;
                    nShurikens++;
                }
                break;
            case (SPACE_BAR):
                boucle = !boucle;
                break;
            case (CTRL_LEFT):
                var tmpShuriken = mainPlayer.throwShuriken();
                if (tmpShuriken != null)
                {
                    shurikens[nShurikens] = tmpShuriken;
                    nShurikens++;
                }
                break;
            case (ESCAPE_KEY):
                mainPlayer.kill();
                break;
        }
    });
    boucle = true;
    var canvas = document.getElementById('gameArea');
    canvas.width = WIN_WIDTH;
    canvas.height = WIN_HEIGHT;
}

var coin = new Array();
var nCoin = 0;

var shurikens = new Array();
var nShurikens = 0;

var shurikensEnemy = new Array();
var nShurikensEnemy = 0;

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

function addEnemies()
{
    enemies[nEnemies] = new Enemy(Math.random() * (WIN_WIDTH - 200) + 100, 10);
    nEnemies ++;
}

function addCoin(x, y, stasis = false)
{
    coin[nCoin] = new Coin(x, y, stasis);
    nCoin++;
}

function addRandomCoin()
{
    let x = Math.random()*WIN_WIDTH*0.9 + WIN_WIDTH*0.05;
    let y = Math.random() * WIN_HEIGHT * 0.9 + WIN_HEIGHT * 0.05;
    addCoin(x, y);
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
        if(Math.floor(Math.random()*10000) == 0)
        {
            addRandomCoin();
        }
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
        for (i = 0; i < nCoin; i++)
            coin[i].clear();
        for (i = 0; i < nPlatform; i++)
            platform[i].clear();
        for (i = 0; i < nShurikens; i++)
            shurikens[i].clear();
        for (i = 0; i < nShurikensEnemy; i++)
            shurikensEnemy[i].clear();
        for (i = 0; i < nEnemies; i++)
            enemies[i].clear();

        if (frameCpt++ == 3)
        {
            // Update sprites
            if(!mainPlayer.updatePosition(platform, nPlatform))
            {

            }

            for (i = 0; i < nEnemies; i++)
            {
                if(enemies[i].isAlive)
                {
                    let tmpShuriken = enemies[i].move(mainPlayer);
                    if (tmpShuriken != null)
                    {
                        shurikensEnemy[nShurikensEnemy] = tmpShuriken;
                        nShurikensEnemy++;
                    }
                }
                if (!enemies[i].updatePosition(platform, nPlatform))
                {
                    addCoin(enemies[i].PosX, enemies[i].PosY, true);
                    enemies[i] = enemies[--nEnemies];
                }
            }
            for (i = 0; i < nCoin; i++)
            {
                if (coin[i].updatePosition(platform, nPlatform))
                {
                    if (mainPlayer.hasCollectedCoin(coin[i]))
                    {
                        coin[i] = coin[--nCoin];
                    }
                }
                else
                {
                    coin[i] = coin[--nCoin];
                }
            }
            for (i = 0; i < nShurikens; i++)
            {
                if (shurikens[i].updatePosition(platform, nPlatform))
                {
                    for (j = 0; j < nEnemies; j++)
                    {
                        if (enemies[j].isAlive && shurikens[i] != null)
                        {
                            if(enemies[j].hasBeenHit(shurikens[i]))
                            {
                                shurikens[i] = shurikens[--nShurikens];
                            }
                            if(!enemies[j].isAlive)
                                addEnemies();
                        }
                    }
                }
                else
                {
                    shurikens[i] = shurikens[--nShurikens];
                }

            }
            for (i = 0; i < nShurikensEnemy; i++)
            {
                if(shurikensEnemy[i].updatePosition(platform, nPlatform))
                {
                    if(mainPlayer.hasBeenHit(shurikensEnemy[i]))
                    {
                        shurikensEnemy[i] = shurikensEnemy[--nShurikensEnemy];
                    }
                }
                else {
                    shurikensEnemy[i] = shurikensEnemy[--nShurikensEnemy];
                }
            }
            frameCpt = 0;
        }


        // Draw sprites
        for (i = 0; i < nCoin; i++)
            coin[i].draw();
        for (i = 0; i < nShurikens; i++)
            shurikens[i].draw();
        for (i = 0; i < nShurikensEnemy; i++)
            shurikensEnemy[i].draw();
        for (i = 0; i < nPlatform; i++)
            platform[i].draw();
        for (i = 0; i < nEnemies; i++)
            enemies[i].draw();
        mainPlayer.draw();
    }
}
