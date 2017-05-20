class Map
{
    constructor()
    {
        this.context2D = document.getElementById('gameArea').getContext('2d');

        this.sizeMapX = 8000;
        this.sizeMapY = 2500;
        this.backgrounds = [];
        this.backgrounds.push(new Background(this.sizeMapX, this.sizeMapY, "space"));
        this.backgrounds.push(new Background(this.sizeMapX, this.sizeMapY, "/Spaceship/spaceship"));

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
    }
}
