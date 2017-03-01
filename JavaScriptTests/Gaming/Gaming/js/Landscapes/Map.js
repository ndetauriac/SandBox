class Map
{
    constructor()
    {
        this.context2D = document.getElementById('gameArea').getContext('2d');
        this.background = new Image();
        this.background.caller = this;
        this.background.onload = this.bgLoaded;
        this.background.src = "./images/dojo.png";
        this.sizeMapX = WIN_WIDTH * 2;
        this.sizeMapY = WIN_HEIGHT * 2;
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
        var posX = posWorldX * WIN_RATIO / this.background.factorX;
        var posY = posWorldY * WIN_RATIO / this.background.factorY;
        this.context2D.drawImage(this.background, posX, posY, WIN_WIDTH, WIN_HEIGHT, 0, 0, this.background.width, this.background.height);
    }
    
    bgLoaded()
    {
        this.factorX = this.caller.sizeMapX / this.width;
        this.factorY = this.caller.sizeMapY / this.height;
    }
}