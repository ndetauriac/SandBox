const STATUS_REFRESH_RATE = SECOND;

class StatusEffect
{
    constructor(duration, refreshRate = STATUS_REFRESH_RATE) // Duration in second
    {
        this.color = "white";
        this.refreshRate = refreshRate;
        this.duration = duration * SECOND  + refreshRate;
    }
    
    ApplyEffect()
    {
        this.duration--;
        if (this.duration > 0)
        {
            if (this.duration % this.refreshRate == 0)
            {
                return true;
            }
            else
            {
                return false;
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