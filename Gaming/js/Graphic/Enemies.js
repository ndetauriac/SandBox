class Enemy extends Characters{
    constructor(x, y)
    {
        super(x, y, 40, "red");
        this.cadence = CADENCE;
    }

    move(player)
    {
        var throwDir = "NONE";
        var distX = Math.abs(player.PosX - this.PosX);
        var distY = Math.abs(player.PosY - this.PosY);

        // Move
        if(distX < 200) {
            if(this.lastDir > 0)
            {
                this.moveRight();
            }
            else if(this.lastDir < 0)
            {
                this.moveLeft();
            }

        } else {
            if(player.PosX > this.posX)
            {
                this.moveRight();
            }
            else if(player.PosX < this.posX)
            {
                this.moveLeft();
            }
        }

        if(distY > MAX_JUMP_HEIGHT)
        {
            if(player.PosY < this.posY)
            {
                this.moveUp();
            }
        }

        // Shoot

        if(distY > distX)
        {
            if(player.PosY < this.PosY)
            {
                throwDir = "UP";
            } else {
                throwDir = "DOWN";
            }
        } else {
            if(player.PosX > this.posX)
            {
                throwDir = "RIGHT";
            }
            else if(player.PosX < this.posX)
            {
                throwDir = "LEFT";
            }
        }

        return this.throwShuriken(throwDir, true);
        //return null;
    }

    throwShuriken(direction = "NONE")
    {
        var tmpShuriken;
        var xThrow = this.posX;
        var yThrow = this.posY;
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
        if (this.cadence == 0)
        {
            this.cadence = CADENCE;
            return tmpShuriken;
        }
        else
        {
            return null;
        }
    }
}
