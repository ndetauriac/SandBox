const PLATEFORM_LIFETIME = 50;

class Plateform
{
    constructor(x, y, w, h, mode = "FULL")
    {
        this.context2D = document.getElementById('gameArea').getContext('2d');
        this.texture = new Image();
        this.rectX = Math.floor(x);
        this.rectY = Math.floor(y);
        this.posX = this.rectX;
        this.posY = this.rectY;
        this.previousPosX = this.rectX;
        this.previousPosY = this.rectY;
        this.rectW = Math.floor(w);
        this.rectH = Math.floor(h);
        this.bottomSide = false;
        this.topSide = false;
        this.leftSide = false;
        this.rightSide = false;
        this.kill = false;
        this.lifeTime = -1;
        this.mode = mode;
        this.alpha = 1.0;
        switch(mode)
        {
            case "TOP":
                this.topSide = true;
                this.texture.color = "#888888";
                break;
            case "BOT":
                this.bottomSide = true;
                this.texture.color = "#0000FF";
                break;
            case "LEFT":
                this.leftSide = true;
                this.texture.color = "#00FF00";
                break;
            case "RIGHT":
                this.rightSide = true;
                this.texture.color = "#0000FF0";
                break;
            case "LAVA":
                this.bottomSide = true;
                this.topSide = true;
                this.leftSide = true;
                this.rightSide = true;
                this.kill = true;
                var ctx = this.context2D;
                this.texture.src = "./images/lavaTexture.png";
                this.texture.onload = function() {this.color = ctx.createPattern(this, 'repeat');}
                break;
            case "FADE":
                this.bottomSide = true;
                this.topSide = true;
                this.leftSide = true;
                this.rightSide = true;
                this.texture.color = "#000000";
                break;
            case "INVI":
                this.bottomSide = true;
                this.topSide = true;
                this.leftSide = true;
                this.rightSide = true;
                this.texture.color = "#000";
                this.alpha = 0;
                break;
            case "DOOR":
                this.bottomSide = true;
                this.topSide = true;
                this.leftSide = true;
                this.rightSide = true;
                this.texture.color = "#000000";
                break;
            default:
                this.bottomSide = true;
                this.topSide = true;
                this.leftSide = true;
                this.rightSide = true;
                this.texture.color = "#F06292";
                break;
        }
    }

    contact(prevX, prevY, nextX, nextY, prevW, prevH, nextW, nextH)
    {
        var isInContactTop = false;
        var isInContactBot = false;
        var isInContactLeft = false;
        var isInContactRight = false;
        var kill = false;
        var newPosX = nextX;
        var newPosY = nextY;
        if (!(nextX > this.rectX + this.rectW || nextX < this.rectX - nextW || nextY > this.rectY + this.rectH || nextY < this.rectY - nextH))
        {
            kill = this.kill;
            if(this.leftContact(prevX + prevW, nextX + nextW) && this.leftSide)
            {
                isInContactLeft = true;
                newPosX = Math.floor(this.rectX - nextW) - GRAVITY;
            }
            else if(this.rightContact(prevX, nextX) && this.rightSide)
            {
                isInContactRight = true;
                newPosX = Math.floor(this.rectX + this.rectW) + 1 + GRAVITY;
            }
            if(this.topContact(prevY + prevH, nextY + nextH) && this.topSide)
            {
                isInContactTop = true;
                newPosY = Math.floor(this.rectY - nextH) - GRAVITY;
                if(this.mode == "FADE" && this.lifeTime < 0)
                    this.lifeTime = PLATEFORM_LIFETIME;
            }
            else if(this.bottomContact(prevY, nextY) && this.bottomSide)
            {
                isInContactBot = true;
                newPosY = Math.floor(this.rectY + this.rectH) + 1 + GRAVITY;
            }
        }

        return{
            isInContactTop: isInContactTop,
            isInContactBot: isInContactBot,
            isInContactLeft: isInContactLeft,
            isInContactRight: isInContactRight,
            gapX: newPosX,
            gapY: newPosY,
            kill: kill
        }
    }

    leftContact(prevX, nextX)
    {
        return (prevX < this.rectX && nextX >= this.rectX);
    }

    rightContact(prevX, nextX)
    {
        return (prevX > this.rectX + this.rectW && nextX <= this.rectX + this.rectW);
    }

    topContact(prevY, nextY)
    {
        return (prevY < this.rectY && nextY >= this.rectY);
    }

    bottomContact(prevY, nextY)
    {
        return (prevY > this.rectY + this.rectH && nextY <= this.rectY + this.rectH);
    }

    updatePosition()
    {
        var keep = true;
        if (this.lifeTime > 0)
        {
            this.lifeTime--;
        }
        else if (this.lifeTime == 0)
        {
            keep = false;
        }

        return keep;
    }

    draw()
    {
        if(this.rectX > posWorldX - this.rectW && this.rectY > posWorldY - this.rectH && this.rectX < posWorldX + WIN_WIDTH / WIN_RATIO && this.rectY < posWorldY + WIN_HEIGHT / WIN_RATIO)
        {
            this.context2D.globalAlpha = this.alpha;
            if (this.lifeTime >= 0)
                this.context2D.globalAlpha = this.lifeTime / PLATEFORM_LIFETIME;
            this.previousRectX = this.posX;
            this.previousRectY = this.posY;
            this.context2D.fillStyle = this.texture.color;
            this.posX = Math.floor(this.rectX - posWorldX);
            this.posY = Math.floor(this.rectY - posWorldY);
            this.context2D.fillRect(this.posX, this.posY, this.rectW, this.rectH);
            this.context2D.globalAlpha = 1.0;
        }
    }

    clear()
    {
        this.context2D.clearRect(this.previousRectX - 1, this.previousRectY - 1, this.rectW + 2, this.rectH + 2);
    }

    get yLevel()
    {
        return this.rectY;
    }
}
