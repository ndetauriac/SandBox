const SHURIKEN_SPEED = 40;

class Shuriken
{
    constructor(x, y, direction)
    {
        this.sprite = new Sprites("./images/shuriken.png", 4, 1, true, 1);
        this.value = 10;
        this.posX = x;
        this.posY = y;
        this.staminaY = 0;
        this.onTheFloor = false;
        this.stasis = false;
        this.direction = direction;
        this.speed = direction * SHURIKEN_SPEED;
        this.lifeTime = 100;
		this.winWidth = document.getElementById('gameArea').width;
		this.winHeight = document.getElementById('gameArea').height;
    }

    updatePosition(plateforms, nPlateform) {
        var plat;
        var floorLevel = this.winHeight;
        for (plat = 0; plat < nPlateform; plat++)
        {
            
            if (this.sprite.width != null && this.sprite.height != null) {
                if (plateforms[plat].contact(this.posX, this.posY, this.sprite.width, this.sprite.height))
                {
                    floorLevel = plateforms[plat].yLevel;
                }
            }
            
        }
        if (this.sprite.height != null && !this.stasis)
            this.gravity(floorLevel);
        
        this.posX += this.speed;
        if (this.speed == 0)
            this.lifeTime--;
        
        return (this.posX > this.winWidth || this.posX + this.sprite.width < 0 || this.lifeTime == 0);
    }
    
    contact(x, y, w, h)
    {
        if (this.sprite.width != null && this.sprite.height != null) {
            if (!(x > this.posX + this.sprite.width || x < this.posX - w || y > this.posY + this.sprite.height || y < this.posY - h))
                return this.value;
            else
                return null;
        }
        else
        {
            return null;
        }
    }
    
    draw()
    {
        if (this.speed != 0)
            this.sprite.animate();
        this.sprite.draw(this.posX, this.posY);
    }
    
    gravity(level)
    {
        this.moveDown(level);
        if (this.posY < (level - this.sprite.height) && !this.onTheFloor){
            this.staminaY++;
            this.onTheFloor = false;
        }
        else{
            this.staminaY = 0;
            this.onTheFloor = true;
            this.speed = 0;
        }
    }

    moveDown(level) {
        this.posY += this.staminaY;
    }
    
    clear()
    {
        this.sprite.clear();
    }
}
