class Pattern {
    constructor(action) {
        this.isStarted = false;
        this.hasEnded = false;
        this.Action = action;
    }

    HasEnded()
    {
        return this.hasEnded;
    }

    Start() {
        this.isStarted = true;
        this.hasEnded = false;
    }

    Update(that) {
        if (this.isStarted && !this.hasEnded) {
            var retValue = this.Action(that);
            if (retValue != null)
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