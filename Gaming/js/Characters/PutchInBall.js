class PutchInBall extends Enemy{
    constructor(x, y)
    {
        super(x, y, 1000, "red");
        this.cadence = CADENCE;
    }
 
    move(player)
    {
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