const OPENING_SPEED = 0.5*SECOND;

class Door extends Plateform
{
	constructor(x, y, closedW, closedH, sens)
	{
		super(x, y, closedW, closedH, "DOOR");
		this.maxW = closedW;
		this.maxH = closedH;
		this.horizontal = sens;
		this.closed = true;
		this.openSpeed = 0;
		this.range = Math.max(closedW, closedH);
		
	}
	
	contact(prevX, prevY, nextX, nextY, prevW, prevH, nextW, nextH, canOpen = true)
	{
		
        if (!(nextX > this.rectX + this.rectW + this.range || nextX < this.rectX - nextW - this.range || nextY > this.rectY + this.rectH + this.range || nextY < this.rectY - nextH - this.range))
		{
			if (this.closed && canOpen)
			{
				this.closed = false;
				this.openSpeed = OPENING_SPEED;
			}
		}
		else
		{
			/*if (!this.closed)
			{
				this.closed = true;
				this.openSpeed = OPENING_SPEED;
			}*/
		}

		return super.contact(prevX, prevY, nextX, nextY, prevW, prevH, nextW, nextH);
	}
	
	updatePosition()
	{
		if (this.openSpeed > 0)
		{
			var fact = 1;
			this.openSpeed --;
			
			if(this.closed)
			{
				if (this.horizontal)
					this.rectW += this.maxW/OPENING_SPEED;
				else
					this.rectH += this.maxH/OPENING_SPEED;
			}
			else
			{
				if (this.horizontal)
					this.rectW -= this.maxW/OPENING_SPEED;
				else
					this.rectH -= this.maxH/OPENING_SPEED;
			}
			if(this.rectW < 0) this.rectW = 0;
			if(this.rectH < 0) this.rectH = 0;
			
			if(this.rectW > this.maxW) this.rectW = this.maxW;
			if(this.rectH > this.maxH) this.rectH = this.maxH;
		}
		else
		{
			if (!this.closed)
			{
				this.closed = true;
				this.openSpeed = OPENING_SPEED;
			}
				
		}
		return super.updatePosition();
	}
}