class Image
{
    constructor(img)
    {
        this.context2D = document.getElementById('gameArea').getContext('2d');
        this.img = bibliImages[img];
        
        this.angle = angle;
        this.defaultAngle = Math.atan2(this.spriteH, this.spriteW);
        
        this.lastPosX = 0;
        this.lastPosY = 0;
    }
    
    get height()
    {
        return this.img.height;
    }
    
    get width()
    {
        return this.img.width;
    }
    
    clear()
    {
        this.context2D.clearRect(this.lastPosX, this.lastPosY, this.spriteW, this.spriteH);
    }
    
    draw(x, y, visible = true)
    {
        var posX = Math.floor(x - posWorldX) ;
        var posY = Math.floor(y - posWorldY);
        this.context2D.save();
        if (this.img !== undefined)
        {            
            this.context2D.translate(posX + this.width / 2,posY + this.height / 2); // to get it in the origin
            this.context2D.rotate(this.angle);
            this.context2D.translate(-posX - this.width / 2,-posY - this.height / 2); // to get it in the origin
            // Rect for debug uses only
            // this.context2D.fillRect(posX,posY,this.spriteW, this.spriteH);
            if (!visible)
            {
                this.context2D.globalAlpha = 0.3;
            }
            this.context2D.drawImage(this.img, posX, posY, this.width, this.height);
        }
        this.context2D.restore();
        this.lastPosX = posX;
        this.lastPosY = posY;
    }
}