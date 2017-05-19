class Map
{
    constructor()
    {
        this.context2D = document.getElementById('gameArea').getContext('2d');

        this.sizeMapX = WIN_WIDTH * 2;
        this.sizeMapY = WIN_HEIGHT * 1;
        this.backgrounds = [];
        this.backgrounds.push(new Background(this.sizeMapX, this.sizeMapY, "whiteWorld_scn"));
        this.backgrounds.push(new Background(this.sizeMapX, this.sizeMapY, "Clouds"));
        this.backgrounds.push(new Background(this.sizeMapX, this.sizeMapY, "game-background_first"));
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
        this.backgrounds.forEach(function(elt) {
            elt.draw();
        });
        
        //this.context2D.drawImage(this.background_2, posX_2, posY_2, this.bgW, this.bgH, 0, 0, this.width/WIN_RATIO, this.height/WIN_RATIO);
        //this.context2D.drawImage(this.background_1, posX_1, posY_1, this.bgW, this.bgH, 0, 0, this.width/WIN_RATIO, this.height/WIN_RATIO);
        //this.context2D.drawImage(this.background, posX, posY, this.background.width, this.background.height, 0, 0, this.background.width/WIN_RATIO, this.background.height/WIN_RATIO);
    }
}
