class Pattern {
    constructor(action) {
        this.isStarted = false;
        this.hasEnded = false;
        this.Action = action;
    }

    Start() {
        this.isStarted = true;
        this.hasEnded = false;
    }

    Update() {
        if (this.isStarted && !this.hasEnded) {
            var retValue = this.Action;
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