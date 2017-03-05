﻿class Sprites
{
    constructor(img, frameNumberX, frameNumberY, repeat = true, refresh = 0)
    {
        this.context2D = document.getElementById('gameArea').getContext('2d');
        this.imgSprite = bibliImages[img];
        this.frameNumberX = frameNumberX;
        this.frameNumberY = frameNumberY;
        this.spriteW = this.imgSprite.width / this.frameNumberX;
        this.spriteH = this.imgSprite.height / this.frameNumberY;
        //this.imgSprite.style.position = 'relative';
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
        return this.spriteH;
    }
    
    get width()
    {
        return this.spriteW;
    }
    
    clear()
    {
        this.context2D.clearRect(this.lastPosX, this.lastPosY, this.spriteW, this.spriteH);
    }
    
    animate()
    {
        if (this.speed == this.speedRefresh)
        {
            this.speed = 0;
            if (!this.started || this.repeat)
            {
                this.frame = (this.frame + 1) % (this.frameNumberX * this.frameNumberY);
                this.started = true;
            }
            else if (this.frame < this.frameNumberX * this.frameNumberY - 1)
            {
                this.frame = (this.frame + 1) % (this.frameNumberX * this.frameNumberY);
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
    
    draw(x, y, visible = true)
    {
        var posX = Math.floor(x - posWorldX);
        var posY = Math.floor(y - posWorldY);
        var posSpriteX = (this.frame % this.frameNumberX) * this.spriteW;
        var posSpriteY = (this.frame - (this.frame % this.frameNumberX)) / this.frameNumberX * this.spriteH;
        
        if (this.imgSprite !== undefined)
        {
            if (visible)
            {
                this.context2D.drawImage(this.imgSprite, posSpriteX, posSpriteY, this.spriteW, this.spriteH, posX, posY, this.spriteW, this.spriteH);
            }
            else
            {
                this.context2D.globalAlpha = 0.3;
                this.context2D.drawImage(this.imgSprite, posSpriteX, posSpriteY, this.spriteW, this.spriteH, posX, posY, this.spriteW, this.spriteH);
                this.context2D.globalAlpha = 1;
            }
        
        }
        this.lastPosX = posX;
        this.lastPosY = posY;
    }
}