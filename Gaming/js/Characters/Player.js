const PLAYER_HEALTH_MAX = 300;

class Player extends Characters{
    constructor(x, y)
    {
        super(x, y, PLAYER_HEALTH_MAX, "purple");
        this.score = 0;
        this.ammo = 100;
        this.kills = 0;
        this.energy = 100;
        this.maxEnergy = 100;
        this.cooldown = 100;
        this.strength = 100;
        $("#playerAmmo").text(this.ammo);
        $("#playerCoin").text(this.score);
        $("#playerKill").text(this.kills);
        this.power = new Invisibility();
        this.cadence = SECOND / 4;
        this.Health = this.health;
        this.Energy = this.energy;
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

    get IsInvisible()
    {
        return !this.visible;
    }

    set IsInvisible(value)
    {
        this.visible = !value;
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
        setPlayerUlti(this.Energy, this.power.isAvailable(this.energy));
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
        if (this.isAlive)
        {

            if ((this.Ammo > 0) && this.cadence === 0)
            {
                this.Ammo --;
                this.cadence = CADENCE/4;
                return super.throwShuriken(direction);
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
        if(this.power.refreshPower(this))
            this.Energy = this.energy;
        return super.updatePosition(plateforms, nPlateform);
    }

    usePower()
    {
        this.power.applyPower(this);
    }
}
