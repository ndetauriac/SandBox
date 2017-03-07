class Poison extends StatusEffect
{
    constructor()
    {
        super(5);
        this.color = "purple";
        this.damage = 5;
    }

    ApplyEffect(character)
    {
        if(super.ApplyEffect())
        {
            character.addDamage(this.color, this.damage);
            this.damage = this.damage * 1.2;
        }
    }
}