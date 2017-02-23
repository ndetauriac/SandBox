const MAX_SPEED_X = 20; 
const MAX_JUMP_HEIGHT = 35; 
const GRIP = 1; 
const GRAVITY = 2; 

class Player {
    constructor(name, x, y) {
        
        this.mapSprites = {};
        this.mapSprites["IDLE_LEFT"] = new Sprites("./images/" + name + "IdleLeft.png", 10, 1, true, 1);
        this.mapSprites["IDLE_RIGHT"] = new Sprites("./images/ninjaIdleRight.png", 10, 1, true, 1);
        
        this.mapSprites["RUN_LEFT"] = new Sprites("./images/" + name + "RunLeft.png", 10, 1, true);
        this.mapSprites["RUN_RIGHT"] = new Sprites("./images/ninjaRunRight.png", 10, 1, true);
        
        this.mapSprites["SLIDE_LEFT"] = new Sprites("./images/" + name + "SlideLeft.png", 10, 1, true);
        this.mapSprites["SLIDE_RIGHT"] = new Sprites("./images/ninjaSlideRight.png", 10, 1, true);
        
        this.mapSprites["JUMP_LEFT"] = new Sprites("./images/" + name + "JumpLeft.png", 10, 1, false);
        this.mapSprites["JUMP_RIGHT"] = new Sprites("./images/ninjaJumpRight.png", 10, 1, false);
        
        this.mapSprites["DIE_LEFT"] = new Sprites("./images/" + name + "DieLeft.png", 10, 1, false, 2);
        this.mapSprites["DIE_RIGHT"] = new Sprites("./images/ninjaDieRight.png", 10, 1, false, 2);
        
        this.posX = x;
        this.posY = y;
        this.staminaX = 0;
        this.staminaY = 0;
        this.jumpPower = 0;
        this.jumped = false;
        this.lastDir = 1;
        this.onTheFloor = false;
        this.score = 0;
        this.boost = 0;
        this.isAlive = true;
        this.slide = false;
		this.lastState = "IDLE_RIGHT";
		this.state = "IDLE_RIGHT";
		this.winWidth = document.getElementById('gameArea').width;
		this.winHeight = document.getElementById('gameArea').height;
    }
	
	get currentSprite()
	{
        return this.mapSprites[this.state];
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

    updatePosition(plateforms, nPlateform) {
        
        var plat;
        var floorLevel = this.winHeight;
        for (plat = 0; plat < nPlateform; plat++)
        {
            
            if (this.mapSprites[this.state].width != null && this.mapSprites[this.state].height != null) {
                if (plateforms[plat].contact(this.posX, this.posY, this.mapSprites[this.state].width, this.mapSprites[this.state].height))
                {
                    floorLevel = plateforms[plat].yLevel;
                }
            }
            
        }
        
        if (this.jumpPower > 0)
        {
            this.staminaY = -this.jumpPower;
            this.jumpPower -= GRAVITY;
            if (this.jumpPower < 0)
                this.jumpPower = 0;
        }
        this.gravity(floorLevel);
        
        if (this.staminaX > 0)
        {
            this.mapSprites[this.state].animate();
            this.posX += this.staminaX + this.boost * MAX_SPEED_X / 2;
            if(!(!this.onTheFloor && this.slide))
            {
                this.staminaX -= (GRIP/(1+this.slide));
                if (this.staminaX < 0)
                    this.staminaX = 0;
            }
        }
        else if (this.staminaX < 0)
        {
            this.mapSprites[this.state].animate();
            this.posX += this.staminaX - this.boost * MAX_SPEED_X / 2;
            if(!(!this.onTheFloor && this.slide))
            {
                this.staminaX += (GRIP/(1+this.slide));
                if (this.staminaX > 0)
                    this.staminaX = 0;
            }
        }
        else
        {
            this.mapSprites[this.state].animate();
            this.slide = false;
        }
    }
    
    get isPAlive()
    {
        return this.isAlive;
    }
    
    throwShuriken()
    {
        return new Shuriken(this.posX, this.posY, this.lastDir);
        
    }
    
    gravity(level)
    {
        this.moveDown(level);
        if (this.posY < (level - this.mapSprites[this.state].height)){
            this.staminaY += GRAVITY;
            this.onTheFloor = false;
        }
        else{
            this.staminaY = 0;
            this.onTheFloor = true;
            this.jumped = false;
            this.mapSprites["JUMP_LEFT"].resetAnimation();
            this.mapSprites["JUMP_RIGHT"].resetAnimation();
        }
    }

    moveUp() {
        if (this.jumpPower == 0 && !this.jumped)
        {
            this.jumpPower = MAX_JUMP_HEIGHT;
            this.jumped = true;
        }
    }

    moveDown(level) {
        if (this.posY + this.staminaY > (level - this.mapSprites[this.state].height))
            this.posY = level - this.mapSprites[this.state].height;
        else
            this.posY += this.staminaY;
    }

    moveLeft() {
        if (this.staminaX > -MAX_SPEED_X - this.boost * MAX_SPEED_X && !this.slide)
            this.staminaX -= 2;
    }

    moveRight() {
        if (this.staminaX < MAX_SPEED_X + this.boost * MAX_SPEED_X && !this.slide)
            this.staminaX +=2;
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
    
    draw()
    {
        if (this.isAlive)
        {
            if (this.staminaX > 0)
            {
                if (this.slide)
                    this.state = "SLIDE_RIGHT";
                else if (this.jumped)
                    this.state = "JUMP_RIGHT";
                else
                    this.state = "RUN_RIGHT";
                this.lastDir = 1;
            }
            else if (this.staminaX < 0)
            {
                if (this.slide)
                    this.state = "SLIDE_LEFT";
                else if (this.jumped)
                    this.state = "JUMP_LEFT";
                else  
                    this.state = "RUN_LEFT";
                this.lastDir = -1;
            }
            else
            {
                if (this.lastDir == 1)
                {
                    if (this.jumped)
                        this.state = "JUMP_RIGHT";
                    else  
                        this.state = "IDLE_RIGHT";
                }
                else
                {
                    if (this.jumped)
                        this.state = "JUMP_LEFT";
                    else  
                        this.state = "IDLE_LEFT";
                }
            }
        }
        else
        {
            
        }
        this.mapSprites[this.state].draw(this.posX, this.posY);
        this.lastState = this.state;
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
		this.mapSprites[this.lastState].clear();
    }
}