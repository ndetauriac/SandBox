class ShurikenFuma extends Projectile
{
    constructor(x, y, directionX, directionY, innerSpeed = 0, statusEffects = [], dmgBonus, character = null)
    {
        var sprite = new Sprites("fumaShuriken", 8, 1, true, 1);
        super(x, y, directionX, directionY, innerSpeed, statusEffects, 100 + dmgBonus, character, sprite);
        this.lifeLink = 10;
    }
}