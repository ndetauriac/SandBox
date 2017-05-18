class Pattern {
    constructor(action, time = -1) {
        this.isStarted = false;
        this.hasEnded = false;
        this.Action = action;
        this.timeAction = time;
        this.time = time;
    }

    HasEnded()
    {
        return this.hasEnded;
    }

    Start() {
        this.isStarted = true;
        this.hasEnded = false;
        this.time = this.timeAction;
    }

    Update(that) {
        if (this.isStarted && !this.hasEnded) {
            var retValue = this.Action(that);
            if (this.time > 0)
                this.time --;
            if (retValue != null || (this.time <= 0 && this.timeAction > 0))
            {
                this.hasEnded = true;
            }
            return retValue;
        }
        else
        {
            return null;
        }
    }
}