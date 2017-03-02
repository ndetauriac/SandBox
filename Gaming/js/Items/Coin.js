class Coin extends Item
{
    constructor(x, y, stasis = false)
    {
        super(x, y, stasis);
        this.sprite = new Sprites("./images/coin.png", 10, 1, true, 3);
        this.amount = 10;
        this.itemType = "Coin";
    }

    get Amount()
    {
        return this.amount;
    }
}
