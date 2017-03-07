class ShuriRain extends CanalisedPower
{
    constructor()
    {
        super(15, 5, 0.05 * SECOND);
        this.damage = 100;
        this.duration = 0;
        this.posX = 0;
        this.posY = 0;
        this.range = 300 / WIN_RATIO;
    }

    applyPower(player)
    {
        super.applyPower(player);
        this.posX = player.PosXMiddle;
        this.posY = 0;
    }

    refreshPower(player)
    {
        super.refreshPower(player);
    }

    powerEffect(player)
    {
        shurikens[nShurikens] = new Shuriken(this.posX + Math.random() * this.range - this.range/2, this.posY, 0, 1, 0, {}, this.damage);
        nShurikens ++;
    }
}