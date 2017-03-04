class Potion extends Item
{
    constructor(x, y, stasis = false)
    {
        super(x, y, stasis)
        this.amount = 25;
        this.itemType = "Potion";
    }

    get Amount()
    {
        return this.amount;
    }
}
