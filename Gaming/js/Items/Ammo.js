class Ammo extends Item
{
    constructor(x, y, stasis = false)
    {
        super(x, y , stasis);
        this.sprite = new Sprites("shurikenItem", 10, 1, true, 3);
        this.amount = 10;
        this.itemType = "Ammo";
    }

    get Amount()
    {
        return this.amount;
    }
}
