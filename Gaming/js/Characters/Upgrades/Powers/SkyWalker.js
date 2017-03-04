class SkyWalker extends Power
{
    constructor()
    {
        super(20,50);
    }

    applyPower(player)
    {
        if(super.applyPower(player))
            addSemiPlateform(player.PosXMiddle - 100, player.PosYMiddle + 100);
    }

    refreshPower()
    {
        super.refreshPower();
    }
}