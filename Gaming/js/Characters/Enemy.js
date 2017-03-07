class Enemy extends Characters{
    constructor(x, y, lifePoint = 50)
    {
        super(x, y, lifePoint, "red");
        this.healthBar = new HealthBar(this.maxHealth);
        this.cadence = 2 * SECOND;
        this.Health = this.health;
        this.strength = 100;
        this.slow = 50;
    }

    get Health()
    {
        return super.Health;
    }

    set Health(value)
    {
        super.Health = value;
        this.healthBar.setHealth(super.Health);
    }

    move(player)
    {
        if(player.IsInvisible)
        {
            return null;
        }
        else
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
                else
                this.stopMoving();

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
                if(player.PosYMiddle < this.PosYMiddle)
                {
                    this.moveUp();
                }
            }

            // Shoot

            if(distY > distX)
            {
                if(player.PosYMiddle < this.PoPosYMiddlesY)
                {
                    throwDir = "UP";
                } else {
                    throwDir = "DOWN";
                }
            } else {
                if(player.PosXMiddle > this.PosXMiddle)
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
    }

    throwShuriken(direction = "NONE")
    {
        if (this.fireTime <= 0)
        {
            this.fireTime = this.cadence;
            return super.throwShuriken(direction);
        }
        else
        {
            return null;
        }
    }

    draw()
    {
        super.draw();
        if (this.isAlive)
            this.healthBar.draw(this.posX, this.posY - 10);
            
    }
}
