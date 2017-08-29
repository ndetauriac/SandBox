// Votre code ici.

var mainPlayer;
var levelBoss;
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

const REFRESH_RATE = 10;
const SECOND = 1000 / REFRESH_RATE;

var WORLD_WIDTH = WIN_WIDTH * 1;
var WORLD_HEIGHT = WIN_HEIGHT * 0.5;
var WORLD_Floor = WORLD_HEIGHT;

var posWorldX = 0;
var posWorldY = 0;

var currentMap;

var bibliImages = [];
var loadedImages = 0;

/*
                        "game-background_first",
                        "whiteWorld_scn",
                        "Clouds",*/
function initImages()
{
    boucle = false;
    var imageNames = ["/Spaceship/spaceship",
                        "/Spaceship/bg_1",
                        "/Spaceship/bg_2",
                        "game-background",
                        "coin",
                        "shuriken3",
                        "shurikenItem",
                        "fumaShuriken",
                        "RobotShootLeft",
                        "RobotShootRight",
                        "Explosion",
                        "potion_red",
                        "potion_yellow",
                        "/Characters/Robot/DieLeft",
                        "/Characters/Robot/DieRight",
                        "/Characters/Robot/IdleLeft",
                        "/Characters/Robot/IdleRight",
                        "/Characters/Robot/JumpLeft",
                        "/Characters/Robot/JumpRight",
                        "/Characters/Robot/RunRight",
                        "/Characters/Robot/RunLeft",
                        "/Characters/Robot/SlideLeft",
                        "/Characters/Robot/SlideRight",
                        "/Characters/NinjaPurple/DieLeft",
                        "/Characters/NinjaRed/DieLeft",
                        "/Characters/NinjaPurple/DieRight",
                        "/Characters/NinjaRed/DieRight",
                        "/Characters/NinjaPurple/IdleLeft",
                        "/Characters/NinjaRed/IdleLeft",
                        "/Characters/NinjaPurple/IdleRight",
                        "/Characters/NinjaRed/IdleRight",
                        "/Characters/NinjaPurple/JumpLeft",
                        "/Characters/NinjaRed/JumpLeft",
                        "/Characters/NinjaPurple/JumpRight",
                        "/Characters/NinjaRed/JumpRight",
                        "/Characters/NinjaPurple/RunRight",
                        "/Characters/NinjaRed/RunRight",
                        "/Characters/NinjaPurple/RunLeft",
                        "/Characters/NinjaRed/RunLeft",
                        "/Characters/NinjaPurple/SlideLeft",
                        "/Characters/NinjaRed/SlideLeft",
                        "/Characters/NinjaPurple/SlideRight",
                        "/Characters/NinjaRed/SlideRight"];
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
    canvas.width = WIN_WIDTH;
    canvas.height = WIN_HEIGHT;
    context2D.scale(WIN_RATIO, WIN_RATIO);
    initImages();

}

function initTabs()
{
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
}

function init2()
{
    initTabs();
    posWorldX = 0;
    posWorldY = 0;
    currentMap = new Earth();
    WORLD_WIDTH = currentMap.MapX;
    WORLD_HEIGHT = currentMap.MapY;
    WORLD_Floor = WORLD_HEIGHT;

    currentMap.initWall();
    currentMap.initEnemies();

    mainPlayer = currentMap.initPlayer();
    var ListCard = [];
    //ListCard.push(new Burn());
    //ListCard.push(new Toxic());
    mainPlayer.prepareLoadout(ListCard);

    // Bottom
    addPlateform(0, WORLD_Floor, WORLD_WIDTH, 200, "INVI");
    document.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
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
	$(document).mousedown(function(event){
		event.preventDefault();
	});
    document.addEventListener("click", printMousePos);

    document.addEventListener('contextmenu', function(ev) {
    ev.preventDefault();
    var x = posWorldX + event.clientX / WIN_RATIO;
    var y = posWorldY + event.clientY / WIN_RATIO;
    Shoot2(x, y);
});

    boucle = true;
}

function printMousePos(event) {
    var x = posWorldX + event.clientX / WIN_RATIO;
    var y = posWorldY + event.clientY / WIN_RATIO;
    Shoot(x, y);
}

function Shoot2(x, y)
{
    let tmpShuriken = mainPlayer.throwFumaShuriken(x, y);
    if (tmpShuriken !== null)
    {
        tmpShuriken.forEach(function(element){
            shurikens[nShurikens] = element;
            nShurikens++;
        });
    }
}

function Shoot(x, y)
{
    let tmpShuriken = mainPlayer.throwShuriken(x, y);
    if (tmpShuriken !== null)
    {
        tmpShuriken.forEach(function(element){
            shurikens[nShurikens] = element;
            nShurikens++;
        });
    }
}



var items = [];
var nItem = 0;

var shurikens = [];
var nShurikens = 0;

var shurikensEnemy = [];
var nShurikensEnemy = 0;

var platform = [];
var nPlatform = 0;

var effect = [];
var nEffect = 0;

var boucle = false;
var frameCpt = 0;

var map = {}; // You could also use an array
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
    /* insert conditional here */
};

function addEnemies(x = Math.random()*WORLD_WIDTH*0.9+WORLD_WIDTH*0.05, y = WIN_HEIGHT - 290)
{
    // enemies[nEnemies] = new Enemy(Math.random()*WORLD_WIDTH*0.9+WORLD_WIDTH*0.05, WIN_HEIGHT - 290);
    enemies[nEnemies] = new Enemy(x, y);
    nEnemies ++;
}

function addBoss()
{
    // enemies[nEnemies] = new Enemy(Math.random()*WORLD_WIDTH*0.9+WORLD_WIDTH*0.05, WIN_HEIGHT - 290);
    enemies[nEnemies] = new Robot((WORLD_WIDTH - 800) / WIN_RATIO, (WORLD_HEIGHT - 800) / WIN_RATIO);
    enemies[nEnemies].init();
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

function addExplosion(x, y, direction)
{
    effect[nEffect] = new Explosion(x, y, direction);
    nEffect++;
}

function addLoot(x, y)
{
    let rnd = Math.floor(Math.random()*4);
    if(rnd === 0)
        items[nItem] = new Ammo(x, y, true);
    if(rnd == 1)
        items[nItem] = new Coin(x, y, true);
    if(rnd == 2)
        items[nItem] = new HealthPotion(x, y, true);
    if(rnd == 3)
        items[nItem] = new EnergyPotion(x, y, true);
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

function addPlateform(x, y, w = 200, h = 15, mode = "FULL")
{
    platform[nPlatform] = new Plateform(x / WIN_RATIO , y / WIN_RATIO , w / WIN_RATIO , h / WIN_RATIO , mode);
    nPlatform++;
}

function addDoor(x, y, w = 200, h = 15, horiz = false)
{
    platform[nPlatform] = new Door(x / WIN_RATIO , y / WIN_RATIO , w / WIN_RATIO , h / WIN_RATIO , horiz);
    nPlatform++;
}

function addWall(x1, y1, x2, y2)
{
    var w = 15;
    var h = 15;
    if(x1 != x2)
        w = x2 - x1;
    if(y1 != y2)
        h = y2 - y1;
    addPlateform(x1, y1, w, h, "INVI");
}

function addSemiPlateform(x, y, w = 200, h = 10)
{
    platform[nPlatform] = new Plateform(x, y, w, h, "FADE");
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
        // Controls
        if(mainPlayer.isPAlive)
        {
            if(map[KEY_Q]){
                mainPlayer.moveLeft();
            }
            if(map[KEY_Z] || map[SPACE_BAR]){
                mainPlayer.moveUp();
            }
            if(map[KEY_D]){
                mainPlayer.moveRight();
            }
            if(map[CTRL_LEFT]){
            }
            if(!map[KEY_Q] && !map[KEY_D])
            {
                mainPlayer.stopMoving();
            }
            if(map[KEY_S]){
                mainPlayer.playerSlide = true;
            }
            else{
                mainPlayer.playerSlide = false;
            }
            if(map[KEY_E])
            {
                mainPlayer.usePower();
            }
            if(map[LEFT_SHIFT]){
                mainPlayer.dash();
            }
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

        if (frameCpt++ >= 0)
        {
            // Update sprites
            for (i = 0; i < nPlatform; i++)
            {
                if(!platform[i].updatePosition())
                {
                    platform[i] = platform[--nPlatform];
                    i--;
                }
            }

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
                        tmpShuriken.forEach(function(element){
                            shurikensEnemy[nShurikensEnemy] = element;
                            nShurikensEnemy++;
                        });
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
                    addLoot(enemies[i].PosXMiddle, enemies[i].PosYMiddle);
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

        for (i = 0; i < nEffect; i++)
        {
            if (effect[i].update())
                effect[i] = effect[--nEffect];
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
        for (i = 0; i < nEffect; i++)
            effect[i].draw();
    }
}
