const MAX_SPEED_X = 10; 
const MAX_JUMP_HEIGHT = 30; 

class Player {
    constructor() {
        this.spriteRunLeft = new Sprites("./images/playerRunLeft.png", 10, 1);
        this.spriteRunRight = new Sprites("./images/playerRunRight.png", 10, 1);
        this.spriteIdleLeft = new Sprites("./images/playerIdleLeft.png", 10, 1);
        this.spriteIdleRight = new Sprites("./images/playerIdleRight.png", 10, 1);
        this.posX = 0;
        this.posY = 0;
        this.staminaX = 0;
        this.staminaY = 0;
        this.jumpPower = 0;
        this.lastDir = 1;
        this.onTheFloor = false;
        this.score = 0;
        this.boost = 0;
		this.state = "IDLE_RIGHT";
    }
	
	get currentSprite()
	{
		switch(this.state)
		{
			case "IDLE_LEFT":
				return this.spriteIdleLeft;
				break;
			case "IDLE_RIGHT":
				return this.spriteIdleRight;
				break;
			case "RUN_LEFT":
				return this.spriteRunLeft;
				break;
			case "RUN_RIGHT":
				return this.spriteRunRight;
				break;
			default:
				return this.spriteIdleRight;
				break;
		}
	}
    
    hasCollectedCoin(coin)
    {
        if (coin.contact(this.posX, this.posY, this.currentSprite.width, this.currentSprite.height) != null)
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
        var floorLevel = 600;
        for (plat = 0; plat < nPlateform; plat++)
        {
            
            if (this.currentSprite.width != null && this.currentSprite.height != null) {
                if (plateforms[plat].contact(this.posX, this.posY, this.currentSprite.width, this.currentSprite.height))
                {
                    floorLevel = plateforms[plat].yLevel;
                }
            }
            
        }
        
        if (this.jumpPower > 0)
        {
            this.staminaY = -this.jumpPower;
            this.jumpPower -= 2;
            if (this.jumpPower < 0)
                this.jumpPower = 0;
        }
        this.gravity(floorLevel);
        
        if (this.staminaX > 0)
        {
            this.currentSprite.animate();
            this.posX += this.staminaX + this.boost * MAX_SPEED_X;
            this.staminaX --;
        }
        else if (this.staminaX < 0)
        {
            this.currentSprite.animate();
            this.posX += this.staminaX - this.boost * MAX_SPEED_X;
            this.staminaX ++;
        }
        else
        {
            this.currentSprite.animate();
        }
    }
    
    gravity(level)
    {
        this.moveDown(level);
        if (this.posY < (level - this.currentSprite.height)){
            this.staminaY++;
            this.onTheFloor = false;
        }
        else{
            this.staminaY = 0;
            this.onTheFloor = true;
        }
    }

    moveUp() {
        if (this.jumpPower == 0 && this.onTheFloor)
            this.jumpPower = MAX_JUMP_HEIGHT;
    }

    moveDown(level) {
        if (this.posY + this.staminaY > (level - this.currentSprite.height))
            this.posY = level - this.currentSprite.height;
        else
            this.posY += this.staminaY;
    }

    moveLeft() {
        if (this.staminaX > -MAX_SPEED_X)
            this.staminaX -= 2;
    }

    moveRight() {
        if (this.staminaX < MAX_SPEED_X)
            this.staminaX +=2;
    }
    
    set run(value)
    {
        this.boost = value;
    }
    
    draw()
    {
        if (this.staminaX > 0)
        {
			this.state = "RUN_RIGHT";
            this.lastDir = 1;
        }
        else if (this.staminaX < 0)
        {
			this.state = "RUN_LEFT";
            this.lastDir = -1;
        }
        else
        {
            if (this.lastDir == 1)
            {
				this.state = "IDLE_RIGHT";
            }
            else
            {
				this.state = "IDLE_LEFT";
            }
        }
        this.currentSprite.draw(this.posX, this.posY);
    }
    
    clear()
    {
		this.currentSprite.clear();
    }
}