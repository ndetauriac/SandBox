const MAX_SPEED_X = 20;
const MAX_JUMP_HEIGHT = 35;
const GRIP = 1;
const GRAVITY = 2;
const MAX_JUMP = 1;
const CADENCE = 20;

class Player {
    constructor(name, x, y) {

        this.mapSprites = {};
        this.mapSprites["IDLE_LEFT"] = new Sprites("./images/ninjaIdleLeft.png", 10, 1, true, 3);
        this.mapSprites["IDLE_RIGHT"] = new Sprites("./images/ninjaIdleRight.png", 10, 1, true, 3);

        this.mapSprites["RUN_LEFT"] = new Sprites("./images/ninjaRunLeft.png", 10, 1, true, 3);
        this.mapSprites["RUN_RIGHT"] = new Sprites("./images/ninjaRunRight.png", 10, 1, true, 3);

        this.mapSprites["SLIDE_LEFT"] = new Sprites("./images/ninjaSlideLeft.png", 10, 1, true, 3);
        this.mapSprites["SLIDE_RIGHT"] = new Sprites("./images/ninjaSlideRight.png", 10, 1, true, 3);

        this.mapSprites["JUMP_LEFT"] = new Sprites("./images/ninjaJumpLeft.png", 10, 1, false, 2);
        this.mapSprites["JUMP_RIGHT"] = new Sprites("./images/ninjaJumpRight.png", 10, 1, false, 2);

        this.mapSprites["DIE_LEFT"] = new Sprites("./images/ninjaDieLeft.png", 10, 1, false, 5);
        this.mapSprites["DIE_RIGHT"] = new Sprites("./images/ninjaDieRight.png", 10, 1, false, 5);

        this.posX = x;
        this.posY = y;
        this.previewPosX = x;
        this.previewPosY = y;

        this.staminaX = 0;
        this.staminaY = 0;

        this.jumpPower = 0;
        this.jumped = 0;
        this.lastDir = 1;
        this.onTheFloor = false;
        this.cadence = 0;
        this.score = 10;
        this.boost = 0;
        this.healthBar = new HealthBar(100);
        this.isAlive = true;
        this.slide = false;
        this.state = "IDLE_RIGHT";
        this.lastState = "IDLE_RIGHT";
        this.winWidth = document.getElementById('gameArea').width;
        this.winHeight = document.getElementById('gameArea').height;
        
        this.lifeTime = 100;
    }

    hasCollectedCoin(coin)
    {
        if (coin.contact(this.posX, this.posY, this.mapSprites[this.state].width, this.mapSprites[this.state].height) != null)
        {
            this.score += coin.coinValue;
            document.getElementById('gamestartscreen').innerHTML = this.score;
            return true;
        }
        else
        {
            return false;
        }
    }
    
    get Health()
    {
        return this.health;
    }
    
    set Health(value)
    {
        this.health = value;
        if (this.health <= 0)
            this.isAlive = false;
    }
    
    get PosX()
    {
        return this.posX;
    }
    
    get PosY()
    {
        return this.posY;
    }

    hasBeenHit(shuriken)
    {
        var damages = shuriken.contact(this.posX, this.posY, this.mapSprites[this.state].width, this.mapSprites[this.state].height);
        if (damages > 0)
        {
            this.isAlive = this.healthBar.takeDamage(damages);
            return true;
        }
        else
        {
            return false;
        }
    }

    updatePosition(plateforms, nPlateform) {
        this.computeXPosition();
        this.computeYPosition();

        var plat;
        var xContact = false;
        var yContact = false;
        var floorLevel = this.winHeight;
        var sWidth = this.mapSprites[this.state].width;
        var sHeight = this.mapSprites[this.state].height;
        var prevWidth = this.mapSprites[this.lastState].width;
        var prevHeight = this.mapSprites[this.lastState].height;
        this.onTheFloor = false;
        for (plat = 0; plat < nPlateform; plat++)
        {
            if (sWidth != null && sHeight != null) {
                var gap = plateforms[plat].contact(this.posX, this.posY, this.previewPosX, this.previewPosY, prevWidth, prevHeight, sWidth, sHeight);
                if (gap.kill)
                {
                    this.isAlive = false;
                }
                if (gap.isInContactRight)
                {
                    this.previewPosX = gap.gapX;
                    this.staminaX = 0;
                }
                if (gap.isInContactLeft)
                {
                    this.previewPosX = gap.gapX;
                    this.staminaX = 0;
                }

                if (gap.isInContactTop)
                {
                    this.previewPosY = gap.gapY;
                    this.onTheFloor = true;
                }
                if (gap.isInContactBot)
                {
                    this.previewPosY = gap.gapY;
                    this.jumpPower = 0;
                    this.staminaY = 0;
                }
            }

        }

        this.applyXPosition();
        this.applyYPosition();
        
        this.cadence = Decr(this.cadence, 1, 0);

        return this.switchState();
    }

    computeXPosition(){
        this.previewPosX = this.posX;
        this.previewPosX += this.staminaX;
    }

    computeYPosition(){
        this.previewPosY = this.posY;
        this.previewPosY += this.staminaY;
    }

    applyXPosition(){
        this.posX = this.previewPosX;
        if (this.staminaX > 0)
        {
            if(!(!this.onTheFloor && this.slide))
            {
                this.staminaX = Decr(this.staminaX, GRIP/(1+this.slide), 0);
            }
        }
        else if (this.staminaX < 0)
        {
            if(!(!this.onTheFloor && this.slide))
            {
                this.staminaX = Incr(this.staminaX, GRIP/(1+this.slide), 0);
            }
        }
        else
        {
            this.slide = false;
        }
    }

    applyYPosition(){
        this.posY = this.previewPosY;
        if (this.jumpPower > 0)
        {
            this.staminaY = -this.jumpPower;
            this.jumpPower = Decr(this.jumpPower, GRAVITY, 0);
        }
        else if (!this.onTheFloor){
            this.staminaY += GRAVITY;
        }
        else{
            this.staminaY = GRAVITY;
            this.jumped = 0;
            this.mapSprites["JUMP_LEFT"].resetAnimation();
            this.mapSprites["JUMP_RIGHT"].resetAnimation();
        }
    }

    get isPAlive()
    {
        return this.isAlive;
    }
    
    move(player)
    {
        var throwDir = "NONE";
        if(player.PosX > this.posX)
        {
            this.moveRight();
            throwDir = "RIGHT";
        }
        else if(player.PosX < this.posX)
        {
            this.moveLeft();
            throwDir = "LEFT";
            
        }
        return this.throwShuriken(throwDir, true);
    }

    throwShuriken(direction = "NONE", free = false)
    {
        var tmpShuriken;
        var xThrow = this.posX;
        var yThrow = this.posY;
        switch(direction)
        {
            case "NONE":
                tmpShuriken = new Shuriken(xThrow, yThrow, this.lastDir, 0, this.staminaX);
                break;
            case "LEFT":
                tmpShuriken = new Shuriken(xThrow, yThrow, -1, 0, this.staminaX);
                break;
            case "RIGHT":
                tmpShuriken = new Shuriken(xThrow, yThrow, 1, 0, this.staminaX);
                break;
            case "UP":
                tmpShuriken = new Shuriken(xThrow, yThrow, 0, -1, this.staminaX);
                break;
            case "DOWN":
                tmpShuriken = new Shuriken(xThrow, yThrow, 0, 1, this.staminaX);
                break;
        }
        if ((this.Score > 0 || free) && this.cadence == 0)
        {
            this.Score --;
            this.cadence = CADENCE;
            return tmpShuriken;
        }
        else
        {
            return null;
        }
    }
    
    get Score()
    {
        return parseInt(this.score);
    }
    
    set Score(value)
    {
        this.score = value;
        document.getElementById('gamestartscreen').innerHTML = this.score;
    }
    
    gravity()
    {
        this.previewPosY += this.staminaY;
        if (this.posY < (level - this.mapSprites[this.state].height)){
            this.staminaY += GRAVITY;
            this.onTheFloor = false;
        }
        else{
            this.staminaY = 0;
            this.onTheFloor = true;
            this.jumped = 0;
            this.mapSprites["JUMP_LEFT"].resetAnimation();
            this.mapSprites["JUMP_RIGHT"].resetAnimation();
        }
    }

    moveUp() {
        if(this.isAlive)
        {
            if (this.jumpPower == 0 && this.jumped < MAX_JUMP)
            {
                this.jumpPower = MAX_JUMP_HEIGHT;
                this.jumped++;
            }
        }
    }

    moveDown() {
        if(this.isAlive)
        {
            this.previewPosY += this.staminaY;
        }
    }

    moveLeft() {
        if(this.isAlive)
        {
            if (this.staminaX > -MAX_SPEED_X - this.boost * MAX_SPEED_X && !this.slide)
                this.staminaX -= 2;
        }
    }

    moveRight() {
        if(this.isAlive)
        {
            if (this.staminaX < MAX_SPEED_X + this.boost * MAX_SPEED_X && !this.slide)
                this.staminaX +=2;
        }
    }

    set playerSlide(value)
    {
        if (this.staminaX > MAX_SPEED_X / 2 || this.staminaX < -MAX_SPEED_X / 2)
            this.slide = value;
    }

    set run(value)
    {
        this.boost = value;
    }

    switchState()
    {
        var keep = true;
        this.lastState = this.state;
        if (this.isAlive)
        {
            if (this.staminaX > 0)
            {
                if (this.slide)
                this.state = "SLIDE_RIGHT";
                else if (this.jumped > 0)
                this.state = "JUMP_RIGHT";
                else
                this.state = "RUN_RIGHT";
                this.lastDir = 1;
            }
            else if (this.staminaX < 0)
            {
                if (this.slide)
                this.state = "SLIDE_LEFT";
                else if (this.jumped > 0)
                this.state = "JUMP_LEFT";
                else
                this.state = "RUN_LEFT";
                this.lastDir = -1;
            }
            else
            {
                if (this.lastDir == 1)
                {
                    if (this.jumped > 0)
                    this.state = "JUMP_RIGHT";
                    else
                    this.state = "IDLE_RIGHT";
                }
                else
                {
                    if (this.jumped > 0)
                    this.state = "JUMP_LEFT";
                    else
                    this.state = "IDLE_LEFT";
                }
            }
        }
        else
        {
            this.lifeTime--;
            if (this.lifeTime == 0)
                keep = false;
            if (this.lastDir == 1)
                this.state = "DIE_RIGHT";
            else
                this.state = "DIE_LEFT";
                 
        }
        return keep;
    }

    draw()
    {
        if (this.isAlive)
            this.healthBar.draw(this.posX, this.posY - 10);
        this.mapSprites[this.state].animate();
        this.mapSprites[this.state].draw(this.posX, this.posY);
    }

    kill()
    {
        this.isAlive = false;
        if (this.lastDir == 1)
        this.state = "DIE_RIGHT";
        else
        this.state = "DIE_LEFT";
    }

    clear()
    {
        this.healthBar.clear();
        this.mapSprites[this.state].clear();
    }
}
