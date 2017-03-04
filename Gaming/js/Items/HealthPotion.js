class HealthPotion extends Potion
{
    constructor(x, y, stasis = false)
    {
        super(x, y, stasis)
        this.sprite = new Sprites("potion_red", 12, 1, true, 4);
        this.amount = 25;
        this.itemType = "HealthPotion";
    }

    get Amount()
    {
        return this.amount;
    }

    onPick(player)
    {
        if (!player.HasMaxHealth)
        {
            player.Health += this.amount;
            return true;
        }
        else
        {
            return false;
        }
    }
}
