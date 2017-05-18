class Boss extends Enemy {
    constructor(x, y, health, skin)
    {
        super(x, y, health, skin);
        this.cadence = 0.5 * SECOND;
        this.strength = 100;
        this.timeBetweenPattern = 5 * SECOND;
        this.time = this.timeBetweenPattern;
        this.patterns = [];
        this.currentPatternID = 0;
    }

    init()
    {
        this.patterns.push(new Pattern(this.test));
        if(this.patterns.length > 0)
        {
            this.currentPattern = this.patterns[this.currentPatternID];
            this.currentPattern.Start();
        }
    }

    move(player)
    {
        var retValue = this.currentPattern.Update(this);
        if(this.currentPattern.HasEnded)
        {
            this.time--;
        }
        if(this.time <= 0)
        {
            this.time = this.timeBetweenPattern;
            this.currentPatternID ++;
            if(this.currentPatternID >= this.patterns.length)
            {
                this.currentPatternID = 0;
            }
            this.currentPattern = this.patterns[this.currentPatternID];
            this.currentPattern.Start();
        }
        return retValue;
    }

    test(that)
    {
        return that.throwShuriken("LEFT", 10);
    }
}