const HEALTH_BAR_MAX_WIDTH = 50;

class HealthBar
{
    constructor(healthMax)
    {
        this.currentHealth = healthMax;
        this.healthMax = healthMax;
        this.previewPosX;
        this.previewPosY;
        this.context2D = document.getElementById('gameArea').getContext('2d');
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
    
    draw(x, y)
    {
        this.context2D.fillStyle = "#000";
        this.context2D.fillRect(x, y, HEALTH_BAR_MAX_WIDTH + 2, 5);
        this.context2D.fillStyle = this.rgbToHex(255- 255*this.currentHealth / this.healthMax, 255*this.currentHealth / this.healthMax, 0);
        this.context2D.fillRect(x + 1 , y + 1, HEALTH_BAR_MAX_WIDTH * this.currentHealth / this.healthMax, 3);
        this.previewPosX = x;
        this.previewPosY = y;
    }
    
    clear()
    {
        this.context2D.clearRect(this.previewPosX, this.previewPosY, HEALTH_BAR_MAX_WIDTH + 4, 5);
    }

    rgbToHex(r, g, b) {
        return "#" + this.componentToHex(Math.floor(r)) + this.componentToHex(Math.floor(g)) + this.componentToHex(Math.floor(b));
    }
    
    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
}