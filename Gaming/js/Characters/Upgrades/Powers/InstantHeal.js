class InstantHeal extends Power{
    constructor()
    {
        super(50, 50);
        this.healValue = 50;
    }

    applyPower(player)
    {
        if(super.applyPower(player))
            player.Health += this.healValue;
    }

    refreshPower()
    {
        super.refreshPower();
    }
}