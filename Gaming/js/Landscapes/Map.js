class Map
{
    constructor()
    {
        this.context2D = document.getElementById('gameArea').getContext('2d');
        
        this.sizeMapX = WIN_WIDTH * 2;
        this.sizeMapY = WIN_HEIGHT * 2;
        this.width = Math.min(this.sizeMapX, WIN_WIDTH);
        this.height = Math.min(this.sizeMapY, WIN_HEIGHT);
        
        this.background = new Image();
        this.background.caller = this;
        this.background.onload = this.bgLoaded;
        this.background.src = "./images/dojo.png";
    }

    get MapX()
    {
        return this.sizeMapX;
    }

    get MapY()
    {
        return this.sizeMapY;
    }

    draw()
    {
        var posX = posWorldX * this.background.factorX;
        var posY = posWorldY * this.background.factorY;
        
        this.context2D.drawImage(this.background, posX, posY, this.bgW, this.bgH, 0, 0, this.width/WIN_RATIO, this.height/WIN_RATIO);
        //this.context2D.drawImage(this.background, posX, posY, this.background.width, this.background.height, 0, 0, this.background.width/WIN_RATIO, this.background.height/WIN_RATIO);
    }

    bgLoaded()
    {
        this.factorX = (this.width - WIN_WIDTH) / (this.caller.sizeMapX - WIN_WIDTH) * WIN_RATIO;
        this.factorY = (this.height - WIN_HEIGHT) / (this.caller.sizeMapY - WIN_HEIGHT) * WIN_RATIO;
        
        if(this.width > this.caller.sizeMapX)
            this.caller.bgW = this.width;
        else
            this.caller.bgW = this.caller.width;
        
        if(this.height > this.caller.sizeMapY)
            this.caller.bgH = this.height;
        else
            this.caller.bgH = this.caller.height;
    }
}
