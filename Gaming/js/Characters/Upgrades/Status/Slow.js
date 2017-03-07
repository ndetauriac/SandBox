class Slow extends StatusEffect
{
    constructor()
    {
        super(5);
        this.value = 50;
    }

    ApplyEffect(character)
    {
        let keep = super.ApplyEffect();
        if(keep !== null)
        {
            character.Slow = this.value;
        }
        return keep;
    }
}