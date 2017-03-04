class EnergyPotion extends Potion
{
    constructor(x, y, stasis = false)
    {
        super(x, y, stasis)
        this.sprite = new Sprites("potion_yellow", 12, 1, true, 4);
        this.amount = 25;
        this.itemType = "EnergyPotion";
    }

    get Amount()
    {
        return this.amount;
    }
}
