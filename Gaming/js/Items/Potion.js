class Potion extends Item
{
    constructor(x, y, stasis = false)
    {
        super(x, y, stasis)
        this.sprite = new Sprites("./images/potion_red.png", 12, 1, true, 4);
        this.amount = 25;
        this.itemType = "Potion";
    }

    get Amount()
    {
        return this.amount;
    }
}
