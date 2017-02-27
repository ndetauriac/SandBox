class Player extends Characters{
    constructor(x, y)
    {
        super(x, y, 100, "purple");
        this.score = 10;
    }

    hasCollectedCoin(coin)
    {
        if (coin.contact(this.posX, this.posY, this.mapSprites[this.state].width, this.mapSprites[this.state].height) != null)
        {
            this.score += coin.coinValue;
            document.getElementById('gamestartscreen').innerHTML = this.score;
            return true;
        }
        else
        {
            return false;
        }
    }

    get Score()
    {
        return parseInt(this.score);
    }

    set Score(value)
    {
        this.score = value;
        document.getElementById('gamestartscreen').innerHTML = this.score;
    }

    throwShuriken(direction = "NONE")
    {
        var tmpShuriken;
        var xThrow = this.posX;
        var yThrow = this.posY;
        if (this.isAlive)
        {
            switch(direction)
            {
                case "NONE":
                    tmpShuriken = new Shuriken(xThrow, yThrow, this.lastDir, 0, this.staminaX);
                    break;
                case "LEFT":
                    tmpShuriken = new Shuriken(xThrow, yThrow, -1, 0, this.staminaX);
                    break;
                case "RIGHT":
                    tmpShuriken = new Shuriken(xThrow, yThrow, 1, 0, this.staminaX);
                    break;
                case "UP":
                    tmpShuriken = new Shuriken(xThrow, yThrow, 0, -1, this.staminaX);
                    break;
                case "DOWN":
                    tmpShuriken = new Shuriken(xThrow, yThrow, 0, 1, this.staminaX);
                    break;
            }
            if ((this.Score > 0) && this.cadence == 0)
            {
                this.Score --;
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
