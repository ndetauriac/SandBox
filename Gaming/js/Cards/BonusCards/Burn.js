class Burn
{
    constructor()
    {
        this.name = "Burn";
        this.picture = new Image();
        this.description = "Add fire damage on your weapons";
        this.level = "Common"; // Common, Unco, Rare, Legendary
    }

    applyEffect(player)
    {
        player.bonusEffects.push(new Fire());
    }
}