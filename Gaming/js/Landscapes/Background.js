class Background
{
    constructor(mapX, mapY, img)
    {
        this.context2D = document.getElementById('gameArea').getContext('2d');
        this.sizeMapX = mapX;
        this.sizeMapY = mapY;
        this.width = Math.min(this.sizeMapX, WIN_WIDTH);
        this.height = Math.min(this.sizeMapY, WIN_HEIGHT);
        this.background = bibliImages[img];
        this.initMap();
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
        var posX = posWorldX * this.factorX;
        var posY = posWorldY * this.factorY;

        this.context2D.drawImage(this.background, posX, posY, this.bgW, this.bgH, 0, 0, this.width/WIN_RATIO, this.height/WIN_RATIO);
    }

    initMap()
    {
        if (this.sizeMapX != WIN_WIDTH)
            this.factorX = (this.background.width - WIN_WIDTH) / (this.sizeMapX - WIN_WIDTH) * WIN_RATIO;
        else
            this.factorX = 0;

        if (this.sizeMapY != WIN_HEIGHT)
            this.factorY = (this.background.height - WIN_HEIGHT) / (this.sizeMapY - WIN_HEIGHT) * WIN_RATIO;
        else
            this.factorY = 0;

        if(this.width > this.sizeMapX)
            this.bgW = this.width;
        else
            this.bgW = this.width;

        if(this.height > this.sizeMapY)
            this.bgH = this.height;
        else
            this.bgH = this.height;
    }
}
