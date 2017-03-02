class Map
{
    constructor()
    {
        this.context2D = document.getElementById('gameArea').getContext('2d');
        this.background = new Image();
        this.background.caller = this;
        this.background.onload = this.bgLoaded;
        this.background.src = "./images/dojo.png";
        this.sizeMapX = WIN_WIDTH * 3;
        this.sizeMapY = WIN_HEIGHT * 3;
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
        this.factorX = (this.caller.sizeMapX - WIN_WIDTH) / (this.width - WIN_WIDTH);
        this.factorY = (this.caller.sizeMapY - WIN_HEIGHT) / (this.height - WIN_HEIGHT);
    }
}
