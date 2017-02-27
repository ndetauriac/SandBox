class Plateform
{
    constructor(x, y, w, h, mode = "FULL")
    {
        this.context2D = document.getElementById('gameArea').getContext('2d');
        this.texture = new Image();
        this.rectX = x/WIN_RATIO;
        this.rectY = y/WIN_RATIO;
        this.rectW = w/WIN_RATIO;
        this.rectH = h/WIN_RATIO;
        this.bottomSide = false;
        this.topSide = false;
        this.leftSide = false;
        this.rightSide = false;
        this.kill = false;
        
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
            default:
                this.bottomSide = true;
                this.topSide = true;
                this.leftSide = true;
                this.rightSide = true;
                this.texture.color = "#000";
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
                newPosX = Math.floor(this.rectX - nextW - 1);
            }
            else if(this.rightContact(prevX, nextX) && this.rightSide)
            {
                isInContactRight = true;
                newPosX = Math.floor(this.rectX + this.rectW + 1);
            }
            if(this.topContact(prevY + prevH, nextY + nextH) && this.topSide)
            {
                isInContactTop = true;
                newPosY = Math.floor(this.rectY - nextH - 1);
            }
            else if(this.bottomContact(prevY, nextY) && this.bottomSide)
            {
                isInContactBot = true;
                newPosY = Math.floor(this.rectY + this.rectH + 1);
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

    draw()
    {
        this.context2D.fillStyle = this.texture.color;
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
