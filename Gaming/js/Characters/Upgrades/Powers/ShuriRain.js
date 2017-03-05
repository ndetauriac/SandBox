class ShuriRain extends Power
{
    constructor()
    {
        super(80, 15 * SECOND);
        this.damage = 150;
        this.duration = 0;
        this.posX = 0;
        this.posY = 0;
        this.refreshRate = 0.01 * SECOND;
        this.range = 100 / WIN_RATIO;
    }

    applyPower(player)
    {
        if(super.applyPower(player))
        {
            this.posX = player.PosXMiddle;
            this.posY = 0;
            this.duration = 5 * SECOND;
        }
    }

    refreshPower(player)
    {
        if (this.duration > 0){
            if (this.duration % this.refreshRate == 0)
            {
                shurikens[nShurikens] = new Shuriken(this.posX + Math.random() * this.range - this.range/2, this.posY, 0, 1, 0, player.bonusEffects, this.damage);
                nShurikens ++;
            }
            this.duration --;
        }
        else
            player.IsInvisible = false;

        super.refreshPower();
    }
}