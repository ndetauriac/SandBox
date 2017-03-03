// Votre code ici.

var mainPlayer;
var enemies = [];
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

const KEY_R = 82;
const KEY_E = 69;

const LEFT_SHIFT = 16;
const CTRL_LEFT = 17;
const WIN_RATIO = 0.5;
const WIN_WIDTH = window.innerWidth;
const WIN_HEIGHT = window.innerHeight;

var WORLD_WIDTH = WIN_WIDTH * 1;
var WORLD_HEIGHT = WIN_HEIGHT * 0.5;

var posWorldX = 0;
var posWorldY = 0;

var currentMap;

var bibliImages = [];
var loadedImages = 0;

function initImages()
{
    boucle = false;
    var imageNames = ["coin",
                        "shuriken3",
                        "shurikenItem",
                        "potion_red",
                        "ninjaDieLeft_purple",
                        "ninjaDieLeft_red",
                        "ninjaDieRight_purple",
                        "ninjaDieRight_red",
                        "ninjaIdleLeft_purple",
                        "ninjaIdleLeft_red",
                        "ninjaIdleRight_purple",
                        "ninjaIdleRight_red",
                        "ninjaJumpLeft_purple",
                        "ninjaJumpLeft_red",
                        "ninjaJumpRight_purple",
                        "ninjaJumpRight_red",
                        "ninjaRunRight_purple",
                        "ninjaRunRight_red",
                        "ninjaRunLeft_purple",
                        "ninjaRunLeft_red",
                        "ninjaSlideLeft_purple",
                        "ninjaSlideLeft_red",
                        "ninjaSlideRight_purple",
                        "ninjaSlideRight_red"];
    var loaders = [];
    imageNames.forEach(function(name) {
        loaders.push(loadImage(name));
    }, this);
    $.when.apply(null, loaders).done(init2);
}

function loadImage(name) {
    var deferred = $.Deferred();
    bibliImages[name] = new Image();
    bibliImages[name].onload = function() {
        deferred.resolve();
    };
    bibliImages[name].src = "./images/" + name + ".png";
    return deferred.promise();
}

function init() {
    var canvas = document.getElementById('gameArea');
    var context2D = canvas.getContext('2d');
    currentMap = new Map();
    WORLD_WIDTH = currentMap.MapX;
    WORLD_HEIGHT = currentMap.MapY;
    canvas.width = WIN_WIDTH;
    canvas.height = WIN_HEIGHT;
    context2D.scale(WIN_RATIO, WIN_RATIO);
    posWorldX = 0;
    posWorldY = 0;
    initImages();

}

function init2()
{
    mainPlayer = new Player(600, 10);

    enemies = [];
    nEnemies = 0;
    coin = [];
    nCoin = 0;
    shurikens = [];
    nShurikens = 0;
    shurikensEnemy = [];
    nShurikensEnemy = 0;
    platform = [];
    nPlatform = 0;

    addEnemies();
    addEnemies();

    addPlateform(WORLD_WIDTH / 6, WORLD_HEIGHT - 200, 200, 3, "FULL");
    addPlateform(WORLD_WIDTH / 2 - 100, WORLD_HEIGHT - 400, 200, 3, "FULL");
    addPlateform(2 * WORLD_WIDTH / 3, WORLD_HEIGHT - 300, 200, 3, "FULL");

    // Borders
    // Left
    addPlateform(-180, 0, 200, WORLD_HEIGHT);
    // Right
    addPlateform(WORLD_WIDTH - 20, 0, 200, WORLD_HEIGHT);
    // Top
    addPlateform(0, -180, WORLD_WIDTH, 200);
    // Bottom
    addPlateform(0, WORLD_HEIGHT - 20, WORLD_WIDTH, 200);
    document.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
            /*case (SPACE_BAR):
                boucle = !boucle;
                break;
            /*case (CTRL_LEFT):
                var tmpShuriken = mainPlayer.throwShuriken();
                if (tmpShuriken != null)
                {
                    shurikens[nShurikens] = tmpShuriken;
                    nShurikens++;
                }
                break;*/
            case(KEY_E):
                addSemiPlateform(mainPlayer.PosXMiddle - 100, mainPlayer.PosYMiddle + 100);
                break;
            case (KEY_R):
                if($("#gameOver").hasClass("isGameOver")){
                    startGame();
                }
                break;

            case (ESCAPE_KEY):
                mainPlayer.kill();
                break;
        }
    });
    boucle = true;
}

var items = [];
var nItem = 0;

var shurikens = [];
var nShurikens = 0;

var shurikensEnemy = [];
var nShurikensEnemy = 0;

var platform = [];
var nPlatform = 0;

var boucle = false;
var frameCpt = 0;

var map = {}; // You could also use an array
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
    /* insert conditional here */
};

function addEnemies()
{
    enemies[nEnemies] = new Enemy(Math.random()*WORLD_WIDTH*0.9+WORLD_WIDTH*0.05, WIN_HEIGHT - 290);
    nEnemies ++;
}

function addShuriken(x, y, stasis = false)
{
    items[nItem] = new Ammo(x, y, stasis);
    nItem++;
}

function addCoin(x, y, stasis = false)
{
    items[nItem] = new Coin(x, y, stasis);
    nItem++;
}

function addPotion(x, y, stasis = false)
{
    items[nItem] = new Potion(x, y, stasis);
    nItem++;
}

function addRandomCoin()
{
    let x = Math.random()*WIN_WIDTH*0.9 + WIN_WIDTH*0.05;
    let y = Math.random() * WIN_HEIGHT * 0.9 + WIN_HEIGHT * 0.05;
    addCoin(x, y);
}

function addPlateform(x, y, w = 200, h = 10, mode = "FULL")
{
    platform[nPlatform] = new Plateform(x / WIN_RATIO , y / WIN_RATIO , w / WIN_RATIO , h / WIN_RATIO , mode);
    nPlatform++;
}

function addSemiPlateform(x, y, w = 200, h = 10)
{
    platform[nPlatform] = new Plateform(x, y, w, h, "TOP");
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

function reStartGame(){
    init();

    var gameOverDiv = $("#gameOver");
    gameOverDiv.removeClass("isGameOver");
    gameOverDiv.fadeOut();
}

function gameOver(){
    var gameOverDiv = $("#gameOver");
    if(!gameOverDiv.hasClass("isGameOver")){
        gameOverDiv.addClass("isGameOver");
        gameOverDiv.fadeIn();
        $("#gameOverCoin").html(mainPlayer.Score);
        $("#gameOverKill").html(mainPlayer.Kills); // TODO : replace with kills
    }
}

$(document).on("click","#gameOverRestart", function(){
    reStartGame();
});

function refreshGame() {
    if (boucle)
    {
        if(Math.floor(Math.random()*100) === 0)
        {
            //addRandomCoin();
        }
        // Controls
        if(mainPlayer.isPAlive)
        {
            if(map[ARROW_LEFT]){
                mainPlayer.moveLeft();
            }
            if(map[ARROW_UP] || map[SPACE_BAR]){
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

            if(map[KEY_Z])
            {
                let tmpShuriken = mainPlayer.throwShuriken("UP");
                if (tmpShuriken !== null)
                {
                    shurikens[nShurikens] = tmpShuriken;
                    nShurikens++;
                }
            }
            if(map[KEY_S])
            {
                let tmpShuriken = mainPlayer.throwShuriken("DOWN");
                if (tmpShuriken !== null)
                {
                    shurikens[nShurikens] = tmpShuriken;
                    nShurikens++;
                }
            }
            if(map[KEY_Q])
            {
                let tmpShuriken = mainPlayer.throwShuriken("LEFT");
                if (tmpShuriken !== null)
                {
                    shurikens[nShurikens] = tmpShuriken;
                    nShurikens++;
                }
            }
            if(map[KEY_D])
            {
                let tmpShuriken = mainPlayer.throwShuriken("RIGHT");
                if (tmpShuriken !== null)
                {
                    shurikens[nShurikens] = tmpShuriken;
                    nShurikens++;
                }
            }
            if(map[LEFT_SHIFT]){
                mainPlayer.run = 1;
            }
            else
                mainPlayer.run = 0;
        }else{
          gameOver();
        }
        // Clear sprites
        /*
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
*/
        if (frameCpt%1 === 0)
        {
            for (j = 0; j < nShurikens; j++)
            {
                if (!shurikens[j].updatePosition(platform, nPlatform))
                {
                    shurikens[j] = shurikens[--nShurikens];
                    j--;
                }
            }

            for (i = 0; i < nShurikensEnemy; i++)
            {
                if(shurikensEnemy[i].updatePosition(platform, nPlatform))
                {
                    if(mainPlayer.isAlive && mainPlayer.hasBeenHit(shurikensEnemy[i]))
                    {
                        shurikensEnemy[i] = shurikensEnemy[--nShurikensEnemy];
                    }
                }
                else {
                    shurikensEnemy[i] = shurikensEnemy[--nShurikensEnemy];
                }
            }
        }

        if (frameCpt++ == 2)
        {
            // Update sprites
            if(mainPlayer.updatePosition(platform, nPlatform))
            {
                if (mainPlayer.PosX * WIN_RATIO < WIN_WIDTH / 2)
                    posWorldX = 0;
                else if(mainPlayer.PosX * WIN_RATIO > WORLD_WIDTH - WIN_WIDTH / 2)
                    posWorldX = (WORLD_WIDTH - WIN_WIDTH) / WIN_RATIO;
                else
                    posWorldX = mainPlayer.PosX - (WIN_WIDTH / 2) / WIN_RATIO;

                if (mainPlayer.PosY * WIN_RATIO < WIN_HEIGHT / 2 )
                    posWorldY = 0;
                else if (mainPlayer.PosY * WIN_RATIO > WORLD_HEIGHT - WIN_HEIGHT / 2)
                    posWorldY = (WORLD_HEIGHT - WIN_HEIGHT) / WIN_RATIO;
                else
                    posWorldY = mainPlayer.PosY - (WIN_HEIGHT / 2) / WIN_RATIO;

            }

            for (i = 0; i < nEnemies; i++)
            {
                if(enemies[i].isAlive)
                {
                    let tmpShuriken = enemies[i].move(mainPlayer);
                    if (tmpShuriken !== null)
                    {
                        shurikensEnemy[nShurikensEnemy] = tmpShuriken;
                        nShurikensEnemy++;
                    }

                    for (j = 0; j < nShurikens; j++)
                    {
                        if(enemies[i].hasBeenHit(shurikens[j]))
                        {
                            shurikens[j] = shurikens[--nShurikens];
                            j--;
                        }
                        if(!enemies[i].isAlive)
                        {
                            j = nShurikens;
                        }
                    }
                }
                if (!enemies[i].updatePosition(platform, nPlatform))
                {
                    let rnd = Math.floor(Math.random()*3);
                    if(rnd === 0)
                        addCoin(enemies[i].PosXMiddle, enemies[i].PosYMiddle, true);
                    if(rnd == 1)
                        addShuriken(enemies[i].PosXMiddle, enemies[i].PosYMiddle, true);
                    if(rnd == 2)
                        addPotion(enemies[i].PosXMiddle, enemies[i].PosYMiddle, true);

                    enemies[i] = enemies[--nEnemies];
                    i--;
                    addEnemies();
                    mainPlayer.Kills++;
                }
            }

            for (i = 0; i < nItem; i ++)
            {
                if (items[i].updatePosition(platform, nPlatform))
                {
                    if (mainPlayer.hasCollectedItem(items[i]))
                    {
                        items[i] = items[--nItem];
                    }
                }
                else
                {
                    items[i] = items[--nItem];
                }
            }
            frameCpt = 0;
        }


        // Draw sprites
        currentMap.draw();
        for (i = 0; i < nItem; i++)
            items[i].draw();
        for (i = 0; i < nShurikens; i++)
            shurikens[i].draw();
        for (i = 0; i < nShurikensEnemy; i++)
            shurikensEnemy[i].draw();
        for (i = 0; i < nEnemies; i++)
            enemies[i].draw();
        mainPlayer.draw();
        for (i = 0; i < nPlatform; i++)
            platform[i].draw();
    }
}
