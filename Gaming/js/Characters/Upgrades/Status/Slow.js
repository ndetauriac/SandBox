class Slow extends StatusEffect
{
    constructor()
    {
        super();
        this.duration = 100;
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