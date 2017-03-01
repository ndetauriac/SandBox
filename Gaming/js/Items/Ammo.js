class Ammo extends Item
{
    constructor(x, y, stasis = false)
    {
        this.sprite = new Sprites("./images/shurikenItem.png", 10, 1, true, 3);
        this.amount = 10;
    }
}
