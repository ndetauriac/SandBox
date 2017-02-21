class Sprites
{
    constructor(img, frameNumber, x, y)
    {
        this.context2D = document.getElementById('gameArea').getContext('2d');
        this.imgSprite = new Image();
        this.imgSprite.src = img;
        this.spriteW = this.imgSprite.width / frameNumber;
        this.spriteH = this.imgSprite.height;
        this.imgSprite.style.position = 'relative';
        this.posX = x;
        this.posY = y;
        this.frame = 0;
    }

    draw()
    {
        this.context2D.clearRect(this.posX, this.posY, this.spriteW, this.spriteH);
        if (this.imgSprite != undefined)
            this.context2D.drawImage(this.imgSprite, this.frame * this.spriteW, 0, this.spriteW, this.spriteH, this.posX, this.posY, this.spriteW, this.spriteH);

        this.frame = (this.frame + 1) % 4;
    }
}