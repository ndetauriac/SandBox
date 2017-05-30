class PutchInBall extends Enemy{
    constructor(x, y)
    {
        super(x, y, 1000, "NinjaRed");
        this.cadence = CADENCE;
    }
 
    move(player)
    {
        this.sight.isInSight(player)
        // Move
        if(player.PosX > this.posX)
        {
            this.lastDir = 1;
        }
        else if(player.PosX < this.posX)
        {
            this.lastDir = -1;
        }
        this.Health += 5;
        return null;
    }
}