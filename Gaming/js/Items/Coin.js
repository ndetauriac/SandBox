class Coin
{
    constructor(x, y, stasis = false)
    {
        this.sprite = new Sprites("./images/Coin.png", 10, 1, true, 3);
        this.value = 10;
        this.posX = x;
        this.posY = y;
        this.previewPosX = x;
        this.previewPosY = y;
        this.staminaX = 0;
        this.staminaY = 0;
        this.onTheFloor = false;
        this.stasis = stasis;
		this.winWidth = document.getElementById('gameArea').width;
		this.winHeight = document.getElementById('gameArea').height;
    }

    updatePosition(plateforms, nPlateform) {
        var plat;
        var floorLevel = this.winHeight;
        var exist = true;
        if (!this.stasis)
        {
            this.computeXPosition();
            this.computeYPosition();

            var sWidth = this.sprite.width;
            var sHeight = this.sprite.height;
            for (plat = 0; plat < nPlateform; plat++)
            {

                if (this.sprite.width != null && this.sprite.height != null) {
                    var gap = plateforms[plat].contact(this.posX, this.posY, this.previewPosX, this.previewPosY, sWidth, sHeight, sWidth, sHeight);

                    if(gap.kill)
                    {
                        exist = false;
                    }
                    if (gap.isInContactRight || gap.isInContactLeft)
                    {
                        this.previewPosX = gap.gapX;
                        this.staminaX = 0;
                    }

                    if (gap.isInContactTop || gap.isInContactBot)
                    {
                        this.previewPosY = gap.gapY;
                        this.staminaY = 0;
                    }
                }

            }

            this.applyXPosition();
            this.applyYPosition();
        }
        return exist;
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
    }

    applyYPosition(){
        this.posY = this.previewPosY;
        if (!this.onTheFloor){
            this.staminaY += GRAVITY;
        }
        else{
            this.staminaY = GRAVITY;
        }
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
        if (this.onTheFloor){
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
