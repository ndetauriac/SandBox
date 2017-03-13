class Boss extends Enemy {
    constructor(x, y)
    {
        super(x, y, 1000);
        this.cadence = 5 * SECOND;
        this.strength = 300;
    }

    move(player)
    {
        var distX = Math.abs(player.PosX - this.PosX);
        var distY = Math.abs(player.PosY - this.PosY);

        // Move
        if(player.PosX > this.posX)
        {
            this.lastDir = 1;
            return super.throwShuriken("RIGHT", 10);
            
        }
        else if(player.PosX < this.posX)
        {
            this.lastDir = -1;
            return super.throwShuriken("LEFT", 10);
        }
    }
}