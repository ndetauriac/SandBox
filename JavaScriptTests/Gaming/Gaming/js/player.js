const MAX_SPEED_X = 7; 
const MAX_JUMP_HEIGHT = 20; 

class Player {
    constructor() {
        this.spriteLeft = new Sprites("./images/playerLeft.png", 6, 5);
        this.sprite = new Sprites("./images/player.png", 6, 5);
        this.posX = 0;
        this.posY = 0;
        this.staminaX = 0;
        this.staminaY = 0;
        this.jumpPower = 0;
        this.lastDir = 1;
        this.onTheFloor = false;
        this.score = 0;
        this.boost = 0;
    }
    
    hasCollectedCoin(coin)
    {
        if (coin.contact(this.posX, this.posY, this.sprite.width, this.sprite.height) != null)
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
            
            if (this.sprite.width != null && this.sprite.height != null) {
                if (plateforms[plat].contact(this.posX, this.posY, this.sprite.width, this.sprite.height))
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
            this.sprite.animate();
            this.posX += this.staminaX + this.boost * MAX_SPEED_X;
            this.staminaX --;
        }
        else if (this.staminaX < 0)
        {
            this.spriteLeft.animate();
            this.posX += this.staminaX - this.boost * MAX_SPEED_X;
            this.staminaX ++;
        }
        else
        {
            this.sprite.finishAnimation();
            this.spriteLeft.finishAnimation();
        }
    }
    
    gravity(level)
    {
        this.moveDown(level);
        if (this.posY < (level - this.sprite.height)){
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
        if (this.posY + this.staminaY > (level - this.sprite.height))
            this.posY = level - this.sprite.height;
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
            this.sprite.draw(this.posX, this.posY);
            this.lastDir = 1;
        }
        else if (this.staminaX < 0)
        {
            this.spriteLeft.draw(this.posX, this.posY);
            this.lastDir = -1;
        }
        else
        {
            if (this.lastDir == 1)
            {
                this.sprite.draw(this.posX, this.posY);
            }
            else
            {
                this.spriteLeft.draw(this.posX, this.posY);
            }
        }
    }
    
    clear()
    {
        if (this.lastDir == 1)
            this.sprite.clear();
        else
            this.spriteLeft.clear();
    }
}