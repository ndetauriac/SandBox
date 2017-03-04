class PutchInBall extends Enemy{
    constructor(x, y)
    {
        super(x, y, 10000, "red");
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
        this.healthBar.heal(5);
        return null;
    }
}