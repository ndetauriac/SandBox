class Power
{
    constructor()
    {
        this.cooldown = 0;
        this.energyCost = 0;
    }

    applyPower(player)
    {
        if(this.cooldown <= 0 && this.energyCost < player.Energy)
        {
            player.Energy -= this.energyCost;
            return true;
        } else {
            return false;
        }
    }
}