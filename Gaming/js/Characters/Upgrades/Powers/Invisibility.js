class Invisibility extends Power
{
    constructor()
    {
        super(15, 10 * SECOND);
        this.duration = 5 * SECOND;
    }

    applyPower(player)
    {
        if(super.applyPower(player))
        {
            player.IsInvisible = true;
            this.duration = 5 * SECOND;
        }
    }

    refreshPower(player)
    {
        if (this.duration > 0)
            this.duration --;
        else
            player.IsInvisible = false;

        super.refreshPower();
    }
}