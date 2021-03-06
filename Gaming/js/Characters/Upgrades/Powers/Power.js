class Power
{
    constructor(energyCost, cooldown = 0, ico = null)
    {
        document.getElementById("icoPower").src = "./images/" + ico;
        this.cooldownTime = cooldown;
        this.cooldown = 0;
        this.energyCost = energyCost;
    }

    applyPower(player, forFree = false)
    {
        if(this.cooldown <= 0)
        {
            if (forFree)
            {
                this.cooldown = this.cooldownTime;
                return true;
            }
            else if (this.energyCost <= player.Energy)
            {
                this.cooldown = this.cooldownTime;
                player.Energy -= this.energyCost;
                return true;
            }
        } else {
            return false;
        }
    }

    refreshPower(player)
    {
        var powerRecovered = false;
        if(this.cooldown > 0)
        {
            this.cooldown--;
            if(this.cooldown == 0)
                powerRecovered = true;
        }
        return powerRecovered;
    }

    isAvailable(energy)
    {
        return (this.cooldown <= 0 && energy >= this.energyCost);
    }
}