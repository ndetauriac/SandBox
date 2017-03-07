class InstantHeal extends Power{
    constructor()
    {
        super(50, 20 * SECOND, "bonus_health.png");
        this.healValue = 50;
    }

    applyPower(player)
    {
        if(!player.HasMaxHealth)
        {
            if(super.applyPower(player))
                player.Health += this.healValue;
        }
    }
}