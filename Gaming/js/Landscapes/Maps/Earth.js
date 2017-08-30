class Earth extends Map
{
    constructor()
    {
        super();
        this.sizeMapX = 4080;
        this.sizeMapY = 1536;

        this.backgrounds.push(new Background(this.sizeMapX, this.sizeMapY, "game-background"));
    }

    initPlayer()
    {
        return new Player(100/WIN_RATIO, 100/WIN_RATIO);
    }
    
    initEnemies()
    {
        var target = addPNJ(2040/WIN_RATIO, 100/WIN_RATIO);
        addEnemies(200/WIN_RATIO, 0/WIN_RATIO, target);
    }
}