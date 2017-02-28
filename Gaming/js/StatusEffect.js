const STATUS_REFRESH_RATE = 10;

class StatusEffect
{
    constructor(effectType)
    {
        this.refreshRate = STATUS_REFRESH_RATE;
        this.damage = 3;
        this.duration = 100;;
    }
    
    ApplyEffect()
    {
        this.duration--;
        if (this.duration > 0)
        {
            if (this.refreshRate > 0)
            {
                this.refreshRate --;
                return 0;
            }
            else
            {
                this.refreshRate = STATUS_REFRESH_RATE;
                return this.damage;
            }
        }
        else
        {
            return null;
        }
    }
}