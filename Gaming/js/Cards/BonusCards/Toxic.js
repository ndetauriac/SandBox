class Toxic
{
    constructor()
    {
        this.name = "Toxic";
        this.picture = new Image();
        this.description = "Add poison damage on your weapons";
        this.level = "Common"; // Common, Unco, Rare, Legendary
    }

    applyEffect(player)
    {
        player.bonusEffects.push(new Poison());
    }
}