class Explosion extends Effect
{
    constructor(posX, posY, direction)
    {
        var angle = 0;
        switch (direction) {
            case ("LEFT"):
                angle = 0;
                break;
            case ("RIGHT"):
                angle = Math.PI;
                break;
            case ("UP"):
                angle = Math.PI/2;
                break;
            case ("DOWN"):
                angle = 3*Math.PI/2;
                break;
        }
        var sprite = new Sprites("Explosion", 5, 1, false, 2, angle);
        super(posX, posY, sprite);
    }
    
    update()
    {
        return this.sprite.animate();
    }
}