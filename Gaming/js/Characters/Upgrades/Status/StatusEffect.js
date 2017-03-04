const STATUS_REFRESH_RATE = 20;

class StatusEffect
{
    constructor()
    {
        this.color = "white";
        this.refreshRate = STATUS_REFRESH_RATE;
    }
    
    ApplyEffect()
    {
        this.duration--;
        if (this.duration > 0)
        {
            if (this.refreshRate > 0)
            {
                this.refreshRate --;
                return false;
            }
            else
            {
                this.refreshRate = STATUS_REFRESH_RATE;
                return true;
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