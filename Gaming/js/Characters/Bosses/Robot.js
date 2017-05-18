class Robot extends Boss
{
    constructor(x, y)
    {
        super(x, y, 1000, "Robot");
        this.cadence = 0.5 * SECOND;
        this.strength = 200;
        this.timeBetweenPattern = 2 * SECOND;
        this.time = this.timeBetweenPattern;
        this.patterns = [];
        this.currentPatternID = 0;
    }

    init()
    {
        this.patterns.push(new Pattern(this.patternLeft, SECOND));
        this.patterns.push(new Pattern(this.patternShoot));
        this.patterns.push(new Pattern(this.patternShoot));
        this.patterns.push(new Pattern(this.patternShoot));
        this.patterns.push(new Pattern(this.patternShoot));
        this.patterns.push(new Pattern(this.patternRight, SECOND));
        this.patterns.push(new Pattern(this.patternShoot));
        if(this.patterns.length > 0)
        {
            this.currentPattern = this.patterns[this.currentPatternID];
            this.currentPattern.Start();
        }
    }

    patternLeft(that)
    {
        that.moveLeft(that);
        return null;
    }

    patternRight(that)
    {
        that.moveRight(that);
        return null;
    }

    patternShoot(that)
    {
        that.stopMoving(that);
        var shots = [];
        shots.push(that.throwShuriken("LEFT", 1)[0]);
        shots.push(that.throwShuriken("UP", 1)[0]);
        shots.push(that.throwShuriken("RIGHT", 1)[0]);
        return shots;
    }

    stopMoving(that)
    {
        that.staminaX = 0;
    }

    moveLeft(that) {
        if(that.isAlive)
        {
            if (that.staminaX > -MAX_SPEED_X && !that.slide)
                that.staminaX = Decr(that.staminaX, MAX_SPEED_X * 10 / SECOND, -MAX_SPEED_X);
            else if (that.staminaX < -MAX_SPEED_X)
            {
                that.stopMoving();
            }
        }
    }

    moveRight(that) {
        if(that.isAlive)
        {
            if (that.staminaX < MAX_SPEED_X && !that.slide)
                that.staminaX = Incr(that.staminaX, MAX_SPEED_X * 10 / SECOND, MAX_SPEED_X);
            else if (that.staminaX > MAX_SPEED_X)
            {
                that.stopMoving();
            }
        }
    }

    throwShuriken(direction, nShuriken)
    {
        var xThrow = this.posX;
        var yThrow = this.posY;
        var effects = [];
        effects = cloneObject(this.bonusEffects);
        var directionX = this.lastDir;
        var directionY = 0;
        var sentShurikens = [];

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
        for (var i = 0; i < nShuriken; i++)
        {
            let dirX = directionX;
            let dirY = directionY;
            if(directionX == 0)
            {
                dirX = (i - (nShuriken - 1) / 2) * 0.1;
                dirY += Math.abs((i - (nShuriken - 1) / 2) / nShuriken) * -Math.abs(directionY) / directionY; 
            }
            if(directionY == 0)
            {
                dirY = (i - (nShuriken - 1) / 2) * 0.1;
                dirX += Math.abs((i - (nShuriken - 1) / 2) / nShuriken) * -Math.abs(directionX) / directionX; 
            }
            sentShurikens.push(new LaserShot(xThrow, yThrow, dirX, dirY, 0, effects, this.strength, this));
        }
        return sentShurikens;
    }
}