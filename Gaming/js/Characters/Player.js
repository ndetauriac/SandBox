const PLAYER_HEALTH_MAX = 300;

class Player extends Characters{
    constructor(x, y)
    {
        super(x, y, PLAYER_HEALTH_MAX, "NinjaPurple");
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
        this.power = new SkyWalker();
        this.cadence = SECOND / 10;
        this.Health = this.health;
        this.Energy = this.energy;
    }

    prepareLoadout(cards)
    {
        var that = this;
        cards.forEach(function(card){
            card.applyEffect(that);
        });
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
        let row = 1;
        if (this.isAlive)
        {

            if ((this.Ammo >= row) && this.fireTime <= 0)
            {
                this.Ammo -= row;
                this.fireTime = this.cadence;
                return super.throwShuriken(direction, row);
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

    throwFumaShuriken(x, y)
    {
        let row = 1;
        if (this.isAlive)
        {

            if ((this.Ammo >= row) && this.fireTime <= 0)
            {
                this.Ammo -= row;
                this.fireTime = this.cadence;
                var ratio = Math.max(Math.abs(x - this.PosX), Math.abs(y - this.PosY))
                var dirX = (x - this.PosX) / ratio;
                var dirY = (y - this.PosY) / ratio;
                return super.throwFumaShurikenDir(dirX, dirY, row);
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

    throwShuriken(x, y)
    {
        let row = 1;
        if (this.isAlive)
        {

            if ((this.Ammo >= row) && this.fireTime <= 0)
            {
                this.Ammo -= row;
                this.fireTime = this.cadence;
                var ratio = Math.max(Math.abs(x - this.PosX), Math.abs(y - this.PosY))
                var dirX = (x - this.PosX) / ratio;
                var dirY = (y - this.PosY) / ratio;
                return super.throwShurikenDir(dirX, dirY, row);
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
        if(!this.isAlive)
            this.stopMoving();
        return super.updatePosition(plateforms, nPlateform);
    }

    usePower()
    {
        this.power.applyPower(this);
    }
}
