class Sight
{
    constructor(posX, posY, range, angle, orientation)
    {
        this.context2D = document.getElementById('gameArea').getContext('2d');
        this.range = range;
        this.angle = angle;
        //this.orientation = orientation;
        //this.AX = posX;
        //this.AY = posY;
        this.updatePosition(posX, posY, orientation);
        this.yRange = range * Math.tan(this.angle);
        this.inSight = false;
    }
    
    isInSight(player)
    {
        if (player.IsInvisible)
        {
            this.inSight = false;
        }
        else
        {
            if(this.crossUpperBound(player.posX, player.posY + player.mapSprites[player.state].height, player.posX + player.mapSprites[player.state].width, player.posY + player.mapSprites[player.state].height) > 0 ||
                this.crossLowerBound(player.posX, player.posY, player.posX + player.mapSprites[player.state].width, player.posY) < 0)
            {
                this.inSight = false;
            }
            else
            {
                if (player.posX + player.mapSprites[player.state].width > Math.min(this.AX, this.AX + this.orientation * this.range) && player.posX < Math.max(this.AX, this.AX + this.orientation * this.range))
                    this.inSight = true;
                else
                    this.inSight = false;
            }
        }
        
        return this.inSight;
    }
    
    lineCross(a1, b1, a2, b2)
    {
        
    }
    
    crossLowerBound(a1, b1, a2, b2)
    {
        // y = ax + b
        var a = (this.CY - this.AY) / (this.CX - this.AX);
        var b = this.AY - a * this.AX;
        
        var minX = Math.min(this.AX, this.CX);
        var maxX = Math.max(this.AX, this.CX);
        
        var y1 = a * a1 + b;
        var y2 = a * a2 + b;
        
        if(y1 > b1 && y2 > b2)
        {
            return 1;
        }
        else if(y1 < b1 && y2 < b2)
        {
            return -1;
        }
        else
        {
            return 0;
        }
    }
    
    crossUpperBound(a1, b1, a2, b2)
    {
        // y = ax + b
        var a = (this.BY - this.AY) / (this.BX - this.AX);
        var b = this.AY - a * this.AX;
        
        var minX = Math.min(this.AX, this.BX);
        var maxX = Math.max(this.AX, this.BX);
        
        var y1 = a * a1 + b;
        var y2 = a * a2 + b;
        
        if(y1 > b1 && y2 > b2)
        {
            return 1;
        }
        else if(y1 < b1 && y2 < b2)
        {
            return -1;
        }
        else
        {
            return 0;
        }
    }
    
    updatePosition(newPosX, newPosY, orientation)
    {
        this.AX = newPosX;
        this.AY = newPosY;
        this.BX = this.AX + this.range * this.orientation;
        this.BY = this.AY - this.yRange;
        this.CX = this.AX + this.range * this.orientation;
        this.CY = this.AY + this.yRange;
        this.orientation = orientation;
    }
    
    get PosX()
    {
        return Math.floor(this.AX - posWorldX);
    }
    
    get PosY()
    {
        return Math.floor(this.AY - posWorldY);
    }
    
    draw()
    {
        this.context2D.save();
        // the triangle
        this.context2D.beginPath();
        this.context2D.moveTo(this.PosX, this.PosY);
        this.context2D.lineTo(this.PosX + this.range * this.orientation, this.PosY - this.yRange);
        this.context2D.lineTo(this.PosX + this.range * this.orientation, this.PosY + this.yRange);
        this.context2D.closePath();
         
        // the outline
        this.context2D.lineWidth = 1;
        this.context2D.strokeStyle = '#666666';
        this.context2D.stroke();
         
        // the fill color
        if (this.inSight)
            this.context2D.fillStyle = "#FF0000";
        else
            this.context2D.fillStyle = "#00FF00";
        this.context2D.globalAlpha = 0.3;
        this.context2D.fill();
        this.context2D.restore();
    }
    
}