class Sprites
{
    constructor(img, frameNumberX, frameNumberY, repeat = true, refresh = 0)
    {
        this.context2D = document.getElementById('gameArea').getContext('2d');
        this.imgSprite = new Image();
        this.imgSprite.frameNumberX = frameNumberX;
        this.imgSprite.frameNumberY = frameNumberY;
        this.imgSprite.onload = this.getSize;
        this.imgSprite.onclick = this.click;
        this.imgSprite.src = img;
        this.imgSprite.style.position = 'relative';
        this.lastPosX = 0;
        this.lastPosY = 0;
        this.started = false;
        this.repeat = repeat;
        this.speed = 0;
        this.speedRefresh = refresh;
        
        this.frame = 0;
    }
    
    get height()
    {
        return this.imgSprite.spriteH;
    }
    
    get width()
    {
        return this.imgSprite.spriteW;
    }
    
    clear()
    {
        this.context2D.clearRect(this.lastPosX, this.lastPosY, this.imgSprite.spriteW, this.imgSprite.spriteH);
    }
    
    animate()
    {
        if (this.speed == this.speedRefresh)
        {
            this.speed = 0;
            if (!this.started || this.repeat)
            {
                this.frame = (this.frame + 1) % (this.imgSprite.frameNumberX * this.imgSprite.frameNumberY);
                this.started = true;
            }
            else if (this.frame < this.imgSprite.frameNumberX * this.imgSprite.frameNumberY - 1)
            {
                this.frame = (this.frame + 1) % (this.imgSprite.frameNumberX * this.imgSprite.frameNumberY);
            }
        }
        else
            this.speed++;
    }
    
    resetAnimation()
    {
        this.started = false;
    }
    
    finishAnimation()
    {
    
    }
    
    draw(x, y)
    {
        var posSpriteX = (this.frame % this.imgSprite.frameNumberX) * this.imgSprite.spriteW;
        var posSpriteY = (this.frame - (this.frame % this.imgSprite.frameNumberX)) / this.imgSprite.frameNumberX * this.imgSprite.spriteH;
        
        if (this.imgSprite != undefined)
        {
            this.context2D.drawImage(this.imgSprite, posSpriteX, posSpriteY, this.imgSprite.spriteW, this.imgSprite.spriteH, x, y, this.imgSprite.spriteW, this.imgSprite.spriteH);
        }
        this.lastPosX = x;
        this.lastPosY = y;
    }
    
    getSize()
    {
        this.spriteW = this.width / this.frameNumberX;
        this.spriteH = this.height / this.frameNumberY;
    }
    
    click()
    {
        console.log("Click");
    }
}