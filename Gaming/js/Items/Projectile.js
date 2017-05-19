const SHURIKEN_SPEED = 800 / WIN_RATIO / SECOND;

class Projectile
{
    constructor(x, y, directionX, directionY, innerSpeed = 0, statusEffects = [], dmgBonus = 100, character = null, sprite)
    {
        this.sprite = sprite;
        this.value = 10 * dmgBonus / 100;
        this.posX = x;
        this.posY = y;
        this.previewPosX = x;
        this.previewPosY = y;
        this.staminaY = 0;
        this.onTheFloor = false;
        this.stasis = false;
        this.staminaX = directionX * SHURIKEN_SPEED + innerSpeed*0.1;
        this.staminaY = directionY * SHURIKEN_SPEED;
        this.lifeTime = 100;
		this.winWidth = document.getElementById('gameArea').width;
		this.winHeight = document.getElementById('gameArea').height;
        this.statusEffects = statusEffects;
        this.lifeLink = 0;
        this.owner = character;
    }

    updatePosition(plateforms, nPlateform) {
        var plat;

        this.computeXPosition();
        this.computeYPosition();

        var sWidth = this.sprite.width;
        var sHeight = this.sprite.height;
        for (plat = 0; plat < nPlateform; plat++)
        {

            if (this.sprite.width !== null && this.sprite.height !== null) {
                var gap = plateforms[plat].contact(this.posX, this.posY, this.previewPosX, this.previewPosY, sWidth, sHeight, sWidth, sHeight);

                if (gap.isInContactLeft)
                {
                    this.previewPosX = gap.gapX + sWidth / 5;
                    this.staminaX = 0;
                    this.staminaY = 0;
                    this.onTheFloor = true;
                }
                if (gap.isInContactRight)
                {
                    this.previewPosX = gap.gapX - sWidth / 5;
                    this.staminaX = 0;
                    this.staminaY = 0;
                    this.onTheFloor = true;
                }
                if (gap.isInContactBot)
                {
                    this.previewPosY = gap.gapY - sHeight / 5;
                    this.staminaY = 0;
                    this.staminaX = 0;
                    this.onTheFloor = true;
                }
                if (gap.isInContactTop)
                {
                    this.previewPosY = gap.gapY + sHeight / 5;
                    this.staminaY = 0;
                    this.staminaX = 0;
                    this.onTheFloor = true;
                }
            }

        }

        this.applyXPosition();
        this.applyYPosition();

        if (this.staminaX === 0 && this.staminaY === 0)
        {
            this.value = 0;
            this.lifeTime--;
        }
        return (this.lifeTime > 0);
    }

    computeXPosition(){
        this.previewPosX = this.posX;
        this.previewPosX += this.staminaX;
    }

    computeYPosition(){
        this.previewPosY = this.posY;
        this.previewPosY += this.staminaY;
    }

    applyXPosition(){
        this.posX = this.previewPosX;
    }

    applyYPosition(){
        this.posY = this.previewPosY;
        if (!this.onTheFloor){
            this.staminaY += GRAVITY / 100;
        }
        else{
            this.staminaY = 0;
        }
    }

    contact(x, y, w, h)
    {
        var damageValue = 0;
        if (!(this.sprite.width === undefined && this.sprite.height === undefined))
        {   
            if (this.sprite.width !== null && this.sprite.height !== null) {
                if (!(x > this.posX + this.sprite.width || x < this.posX - w || y > this.posY + this.sprite.height || y < this.posY - h / 3))
                    damageValue = 2 * this.value;
                else if (!(x > this.posX + this.sprite.width || x < this.posX - w || y > this.posY + this.sprite.height || y < this.posY - h))
                    damageValue = this.value;
            }
        }
        if (this.lifeLink > 0 && this.owner !== null)
            this.owner.Health += damageValue * this.lifeLink / 100;
        return damageValue;
    }

    get shurikenDamage()
    {
        return this.value;
    }

    draw()
    {
        if (this.posX > posWorldX && this.posY > posWorldY && this.posX < posWorldX + WIN_WIDTH / WIN_RATIO && this.posY < posWorldY + WIN_HEIGHT / WIN_RATIO)
        {
            if (this.staminaX !== 0 || this.staminaY !== 0)
                this.sprite.animate();
            this.sprite.draw(this.posX, this.posY);
        }
    }

    gravity(level)
    {
        this.moveDown(level);
        if (this.posY < (level - this.sprite.height) && !this.onTheFloor){
            this.staminaY++;
            this.onTheFloor = false;
        }
        else{
            this.staminaY = 0;
            this.onTheFloor = true;
            this.staminaX = 0;
        }
    }

    moveDown(level) {
        this.posY += this.staminaY;
    }

    clear()
    {
        this.sprite.clear();
    }
}
