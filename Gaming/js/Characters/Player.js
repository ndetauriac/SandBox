const PLAYER_HEALTH_MAX = 300;

class Player extends Characters{
    constructor(x, y)
    {
        super(x, y, PLAYER_HEALTH_MAX, "purple");
        this.score = 0;
        this.ammo = 100;
        this.kills = 0;
        this.energy = 0;
        this.maxEnergy = 100;
        this.cooldown = 100;
        $("#playerAmmo").text(this.ammo);
        $("#playerCoin").text(this.score);
        $("#playerKill").text(this.kills);
        this.Health = this.health;
        this.Energy = this.energy;
        
        this.power = new InstantHeal();
    }

    hasCollectedItem(item)
    {
        if (item.contact(this.posX, this.posY, this.mapSprites[this.state].width, this.mapSprites[this.state].height) !== null)
        {
            if(item.onPick(this))
                return true;
            else
                return false;
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
        this.Energy += 10;
        $("#playerKill").text(this.kills);
    }

    get HasMaxHealth()
    {
        return this.health == this.maxHealth;
    }

    get HasMaxEnergy()
    {
        return this.energy == this.maxEnergy;
    }

    get Health()
    {
        return super.Health;
    }

    set Health(value)
    {
        super.Health = value;
        setPlayerHealth(this.Health * 100 / this.maxHealth);
    }

    get Energy()
    {
        return this.energy;
    }

    set Energy(value)
    {
        this.energy = value;
        if (this.energy < 0)
            this.energy = 0;
        if (this.energy > this.maxEnergy)
            this.energy = this.maxEnergy;
        setPlayerUlti(this.Energy);
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

    updatePosition(plateforms, nPlateform)
    {
        this.cooldown --;
        return super.updatePosition(plateforms, nPlateform);
    }

    usePower()
    {
        this.power.applyPower(this);
    }
}
