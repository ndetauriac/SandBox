const STATUS_REFRESH_RATE = 20;

class StatusEffect
{
    constructor(effectType)
    {
        switch (effectType)
        {
            case "Poison":
                this.color = "green";
                break;
            case "Fire":
                this.color = "red";
                break;
            default:
                this.color = "white";
                break;
        }
        this.refreshRate = STATUS_REFRESH_RATE;
        this.damage = 3;
        this.duration = 100;
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

    get Color()
    {
        return this.color;
    }

    draw(x, y)
    {
        return true;
    }

    clear()
    {
    }
}