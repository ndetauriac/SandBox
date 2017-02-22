class Coin
{
    constructor(x, y)
    {
        this.sprite = new Sprites("./images/coin.png", 10, 1);
        this.value = Math.floor(Math.random() * 10) * 10;
        this.posX = x;
        this.posY = y;
        this.staminaY = 0;
        this.onTheFloor = false;
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
        if (this.sprite.height != null)
            this.gravity(floorLevel);
    }
    
    get coinValue()
    {
        return this.value;
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
        }
    }

    moveDown(level) {
        if (this.posY + this.staminaY > (level - this.sprite.height))
            this.posY = level - this.sprite.height;
        else
            this.posY += this.staminaY;
    }
    
    clear()
    {
        this.sprite.clear();
    }
}
