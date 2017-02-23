class Plateform
{
    constructor(x, y)
    {
        this.context2D = document.getElementById('gameArea').getContext('2d');
        this.rectX = x;
        this.rectY = y;
        this.rectW = 200;
        this.rectH = 10;
    }
    
    contact(x, y, w, h)
    {
        return (!(x > this.rectX + this.rectW || x < this.rectX - w || y > this.rectY + this.rectH || y < this.rectY - h));
    }    
    
    draw()
    {
        this.context2D.fillRect(this.rectX, this.rectY, this.rectW, this.rectH);
    }
    
    clear()
    {
        this.context2D.clearRect(this.rectX, this.rectY, this.rectW, this.rectH);
    }
    
    get yLevel()
    {
        return this.rectY;
    }
}