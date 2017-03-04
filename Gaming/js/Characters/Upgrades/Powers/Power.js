class Power
{
    constructor(energyCost, cooldown = 0)
    {
        this.cooldownTime = cooldown;
        this.cooldown = 0;
        this.energyCost = energyCost;
    }

    applyPower(player)
    {
        if(this.cooldown <= 0 && this.energyCost <= player.Energy)
        {
            this.cooldown = this.cooldownTime;
            player.Energy -= this.energyCost;
            return true;
        } else {
            return false;
        }
    }

    refreshPower()
    {
        this.cooldown = Decr(this.cooldown, 1, 0);
    }
}