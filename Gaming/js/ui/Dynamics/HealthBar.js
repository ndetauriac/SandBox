const HEALTH_BAR_MAX_WIDTH = 50;

class HealthBar
{
    constructor(healthMax, width = HEALTH_BAR_MAX_WIDTH)
    {
        this.currentHealth = healthMax;
        this.healthMax = healthMax;
        this.previewPosX;
        this.previewPosY;
        this.context2D = document.getElementById('gameArea').getContext('2d');
		this.width = width;
    }
    
    takeDamage(value)
    {
        var isAlive = true;
        this.currentHealth -= value;
        if (this.currentHealth <= 0)
        {
            this.currentHealth = 0;
            isAlive = false;
        }
            return isAlive;
    }

    setHealth(value)
    {
        this.currentHealth = value;
    }

    heal(value)
    {
        var isAlive = true;
        this.currentHealth += value;
        if (this.currentHealth >= this.healthMax)
        {
            this.currentHealth = this.healthMax;
            isAlive = false;
        }
            return isAlive;
    }
    
    draw(x, y)
    {
        var posX = Math.floor(x - posWorldX);
        var posY = Math.floor(y - posWorldY);
        this.context2D.fillStyle = "#000";
        this.context2D.fillRect(posX, posY, this.width + 2, 5);
        this.context2D.fillStyle = this.rgbToHex(255- 255*this.currentHealth / this.healthMax, 255*this.currentHealth / this.healthMax, 0);
        this.context2D.fillRect(posX + 1 , posY + 1, this.width * this.currentHealth / this.healthMax, 3);
        this.previewPosX = posX;
        this.previewPosY = posY;
    }
    
    clear()
    {
        this.context2D.clearRect(this.previewPosX-1, this.previewPosY-1, this.width + 4, 7);
    }

    rgbToHex(r, g, b) {
        return "#" + this.componentToHex(Math.floor(r)) + this.componentToHex(Math.floor(g)) + this.componentToHex(Math.floor(b));
    }
    
    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
}