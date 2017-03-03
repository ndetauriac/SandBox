const FONT_DAMAGE = "25px Baloo";

class Damage
{
    constructor(damageValue, color = "white")
    {
        this.value = damageValue;
        this.color = color;
        this.posX;
        this.posY;
        this.previewPosX;
        this.previewPosY;
        this.width = 0;
        this.height = 0;
        this.upSpeed = 0;
        this.context2D = document.getElementById('gameArea').getContext('2d');
        this.lifeTime = 100;
    }
    
    draw(x, y)
    {
        this.previewPosX = this.posX;
        this.previewPosY = this.posY;
        this.posX = Math.floor(x - posWorldX);
        this.posY = Math.floor(y + this.upSpeed - posWorldY);
        this.context2D.font = FONT_DAMAGE;
        this.context2D.fillStyle = this.color;
        this.context2D.strokeStyle = 'white';
        //this.context2D.shadowBlur=5;
        //this.context2D.shadowColor="black";
        this.context2D.fillText("- " + this.value,this.posX,this.posY);
        this.context2D.strokeText("- " + this.value,this.posX,this.posY);
        //this.context2D.shadowBlur=0;
        
        this.width = 100;
        this.height = 100;
        this.lifeTime--;
        if (this.lifeTime > 0)
        {
            this.upSpeed -= (this.lifeTime - this.lifeTime%10) / 100;
            return true;
        }
        else
        {
            return false;
        }
    }

    get Value(){
        return this.value;
    }
    
    clear()
    {
        this.context2D.clearRect(this.previewPosX - this.width / 2, this.previewPosY - this.height / 2, this.width, this.height);
    }

    rgbToHex(r, g, b) {
        return "#" + this.componentToHex(Math.floor(r)) + this.componentToHex(Math.floor(g)) + this.componentToHex(Math.floor(b));
    }
    
    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
}