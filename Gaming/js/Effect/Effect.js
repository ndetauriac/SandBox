class Effect
{
    constructor(posX, posY, sprite)
    {
        this.sprite = sprite;
        this.posX = posX;
        this.posY = posY;
    }
    
    draw()
    {
        this.sprite.draw(this.posX - this.sprite.width/2, this.posY - this.sprite.height/2);        
    }
}