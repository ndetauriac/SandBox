class Boss extends Enemy {
    constructor(x, y)
    {
        super(x, y, 1000);
        this.cadence = 0.5 * SECOND;
        this.strength = 100;
        this.timeBetweenPattern = 2 * SECOND;
        this.patterns = [];
        this.currentPatternID = 0;
    }

    init()
    {
        /*actions.forEach(function(action){
                        this.patterns.add(new Pattern(action))
                    });*/
        this.patterns.push(new Pattern(this.test()));
        if(this.patterns.length > 0)
        {
            this.currentPattern = this.patterns[this.currentPatternID];
            this.currentPattern.Start();
        }
    }

    move(player)
    {
        var retValue = this.currentPattern.Update();
        if(retValue != null)
        {
            this.currentPatternID ++;
            if(this.currentPatternID >= this.patterns.length)
                this.currentPatternID = 0;
            this.currentPattern = this.patterns[this.currentPatternID]
        }
        return retValue;
    }

    test()
    {
        return this.throwShuriken("LEFT", 10);
    }
}