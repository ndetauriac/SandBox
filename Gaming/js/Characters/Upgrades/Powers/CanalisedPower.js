class CanalisedPower extends Power
{
    constructor(initialCost, costPerSecond, refreshRate)
    {
        super(initialCost, 10, "bonus_health.png");
        this.isActivated = false;
        this.refreshRate = refreshRate;
        this.activationTime = 0;
        this.energyCostPerSec = costPerSecond;
    }

    applyPower(player)
    {
        if(!this.isActivated)
        {
            if (super.applyPower(player))
            {
                this.activationTime = 0;
                this.isActivated = true;
            }
        }
        else
        {
            if (super.applyPower(player, true))
            {
                this.isActivated = false;
            }
        }
    }

    refreshPower(player)
    {
        if(this.isActivated)
        {
            this.activationTime ++;
            if(this.activationTime % this.refreshRate == 0)
            {
                this.powerEffect(player);
            }
            if(this.activationTime >= SECOND)
            {
                if (player.Energy >= this.energyCostPerSec)
                    player.Energy -= this.energyCostPerSec;
                else
                    this.isActivated = false;
                this.activationTime = 0;
            }
        }
        super.refreshPower(player);
    }

    powerEffect(player)
    {

    }
}