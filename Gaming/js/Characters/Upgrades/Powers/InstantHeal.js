class InstantHeal extends Power{
    constructor()
    {
        super();
        this.healValue = 50;
        this.energyCost = 50;
    }

    applyPower(player)
    {
        if(super.applyPower(player))
            player.Health += this.healValue;
    }
}