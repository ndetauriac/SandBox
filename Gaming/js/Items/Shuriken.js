const SHURIKEN_SPEED = 10;

class Shuriken
{
    constructor(x, y, directionX, directionY, innerSpeed = 0, statusEffects = [], dmgBonus = 100)
    {
        this.sprite = new Sprites("shuriken3", 4, 1, true, 1);
        // this.sprite = new Sprites("./images/fumaShuriken.png", 8, 1, true, 0);
        this.value = 10 * dmgBonus / 100;
        this.posX = x;
        this.posY = y;
        this.previewPosX = x;
        this.previewPosY = y;
        this.staminaY = 0;
        this.onTheFloor = false;
        this.stasis = false;
        this.staminaX = (directionX * SHURIKEN_SPEED + innerSpeed) / 2;
        this.staminaY = (directionY * SHURIKEN_SPEED)/2;
        this.lifeTime = 100;
		this.winWidth = document.getElementById('gameArea').width;
		this.winHeight = document.getElementById('gameArea').height;
        //this.statusEffects = [new StatusEffect("Fire"), new StatusEffect("Poison")];
        this.statusEffects = statusEffects;
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
                    this.previewPosX = gap.gapX + sWidth / 2;
                    this.staminaX = 0;
                    this.staminaY = 0;
                    this.onTheFloor = true;
                }
                if (gap.isInContactRight)
                {
                    this.previewPosX = gap.gapX - sWidth / 2;
                    this.staminaX = 0;
                    this.staminaY = 0;
                    this.onTheFloor = true;
                }
                if (gap.isInContactBot)
                {
                    this.previewPosY = gap.gapY - sHeight / 2;
                    this.staminaY = 0;
                    this.staminaX = 0;
                    this.onTheFloor = true;
                }
                if (gap.isInContactTop)
                {
                    this.previewPosY = gap.gapY + sHeight / 2;
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
        if (this.sprite.width === undefined && this.sprite.height === undefined)
        {
            return 0;
        }
        else if (this.sprite.width !== null && this.sprite.height !== null) {
            if (!(x > this.posX + this.sprite.width || x < this.posX - w || y > this.posY + this.sprite.height || y < this.posY - h / 3))
                return 2 * this.value;
            else if (!(x > this.posX + this.sprite.width || x < this.posX - w || y > this.posY + this.sprite.height || y < this.posY - h))
                return this.value;
            else
                return 0;
        }
        else
        {
            return 0;
        }
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
