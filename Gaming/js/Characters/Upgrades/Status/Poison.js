class Poison extends StatusEffect
{
    constructor()
    {
        super();
        this.color = "purple";
        this.damage = 5;
        this.duration = 100;
    }

    ApplyEffect(character)
    {
        if(super.ApplyEffect())
        {
            character.addDamage(this.color, this.damage);
        }
    }
}