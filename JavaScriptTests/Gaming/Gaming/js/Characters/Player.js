class Player extends Characters{
    constructor(x, y)
    {
        super(x, y, 100, "purple");
        this.score = 0;
        this.ammo = 100;
        this.kills = 0;
        $("#playerAmmo").text(this.ammo);
        $("#playerCoin").text(this.score);
        $("#playerKill").text(this.kills);
    }

    hasCollectedCoin(coin)
    {
        if (coin.contact(this.posX, this.posY, this.mapSprites[this.state].width, this.mapSprites[this.state].height) !== null)
        {
            this.score += coin.coinValue;
        $("#playerCoin").text(this.score);
            return true;
        }
        else
        {
            return false;
        }
    }

    get Kills()
    {
        return parseInt(this.kills);
    }

    set Kills(value)
    {
        this.kills = value;
        $("#playerKill").text(this.kills);
    }

    get Score()
    {
        return parseInt(this.score);
    }

    set Score(value)
    {
        this.score = value;
        $("#playerCoin").text(this.score);
    }

    get Ammo()
    {
        return parseInt(this.ammo);
    }

    set Ammo(value)
    {
        this.ammo = value;
        $("#playerAmmo").text(this.ammo);
    }

    throwShuriken(direction = "NONE")
    {
        var tmpShuriken;
        var xThrow = this.posX;
        var yThrow = this.posY;
        var directionX = this.lastDir;
        var directionY = 0;
        var statusEffects = [new StatusEffect("Fire"), new StatusEffect("Poison")];
        if (this.isAlive)
        {
            switch(direction)
            {
                case "LEFT":
                    directionX = -1;
                    directionY = 0;
                    break;
                case "RIGHT":
                    directionX = 1;
                    directionY = 0;
                    break;
                case "UP":
                    directionX = 0;
                    directionY = -1;
                    break;
                case "DOWN":
                    directionX = 0;
                    directionY = 1;
                    break;
            }
            tmpShuriken = new Shuriken(xThrow, yThrow, directionX, directionY, this.staminaX, statusEffects);

            if ((this.Ammo > 0) && this.cadence === 0)
            {
                this.Ammo --;
                this.cadence = CADENCE/4;
                return tmpShuriken;
            }
            else
            {
                return null;
            }
        }
        else
        {
            return null;
        }
    }
}
