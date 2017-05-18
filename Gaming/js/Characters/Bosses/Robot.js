class Robot extends Boss
{
    constructor(x, y)
    {
        super(x, y, 1000, "Robot");
        this.cadence = 0.5 * SECOND;
        this.strength = 100;
        this.timeBetweenPattern = 5 * SECOND;
        this.time = this.timeBetweenPattern;
        this.patterns = [];
        this.currentPatternID = 0;
    }

    init()
    {
        this.patterns.push(new Pattern(this.patternLeft, SECOND));
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
        return that.throwShuriken("LEFT", 10);
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
}