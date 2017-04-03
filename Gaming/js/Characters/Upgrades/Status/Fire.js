class Fire extends StatusEffect
{
    constructor()
    {
        super(5, 0.5);
        this.color = "red";
        this.damage = 4;
    }

    ApplyEffect(character)
    {
        if(super.ApplyEffect())
        {
            character.addDamage(this.color, this.damage);
            //SPREAD
        }
        else
            return false;
    }
}