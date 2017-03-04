class Fire extends StatusEffect
{
    constructor()
    {
        super();
        this.color = "red";
        this.damage = 4;
        this.duration = 100;
    }

    ApplyEffect(character)
    {
        if(super.ApplyEffect())
        {
            character.addDamage(this.color, this.damage);
        }
        else
            return false;
    }
}