class Map
{
    constructor()
    {
        this.context2D = document.getElementById('gameArea').getContext('2d');

        this.backgrounds = [];

    }

    get MapX()
    {
        return this.sizeMapX;
    }

    get MapY()
    {
        return this.sizeMapY;
    }

    initWall()
    {

    }

    initPlayer()
    {
        return new Player(0/WIN_RATIO, 0/WIN_RATIO);
    }
    
    initEnemies()
    {
        addEnemies(100/WIN_RATIO, 0/WIN_RATIO);
    }

    draw()
    {
        this.backgrounds.forEach(function(elt) {
            elt.draw();
        });
    }
}
