const MAX_SPEED_X = 450 / WIN_RATIO / SECOND;
const PIXEL_PER_SECOND = 10;
const GRIP = 100; // % of break
const GRAVITY = 10 / WIN_RATIO / SECOND;
const MAX_JUMP = 1;
const MAX_JUMP_HEIGHT = 450  / WIN_RATIO / SECOND;
const CADENCE = 1 * SECOND;

class Characters {
    constructor(x, y, startHealth, name) {

        this.mapSprites = {};
        this.mapSprites["IDLE_LEFT"] = new Sprites("/Characters/" + name + "/IdleLeft", 10, 1, true, 3);
        this.mapSprites["IDLE_RIGHT"] = new Sprites("/Characters/" + name + "/IdleRight", 10, 1, true, 3);
        
        var runSprites = 10;
        if (name == "Robot")
            runSprites = 8;
        this.mapSprites["RUN_LEFT"] = new Sprites("/Characters/" + name + "/RunLeft", runSprites, 1, true, 3);
        this.mapSprites["RUN_RIGHT"] = new Sprites("/Characters/" + name + "/RunRight", runSprites, 1, true, 3);

        this.mapSprites["SLIDE_LEFT"] = new Sprites("/Characters/" + name + "/SlideLeft", 10, 1, true, 3);
        this.mapSprites["SLIDE_RIGHT"] = new Sprites("/Characters/" + name + "/SlideRight", 10, 1, true, 3);

        this.mapSprites["JUMP_LEFT"] = new Sprites("/Characters/" + name + "/JumpLeft", 10, 1, false, 2);
        this.mapSprites["JUMP_RIGHT"] = new Sprites("/Characters/" + name + "/JumpRight", 10, 1, false, 2);

        this.mapSprites["DIE_LEFT"] = new Sprites("/Characters/" + name + "/DieLeft", 10, 1, false, 5);
        this.mapSprites["DIE_RIGHT"] = new Sprites("/Characters/" + name + "/DieRight", 10, 1, false, 5);

        this.damageTaken = [];
        this.damageIndicator = [];
        this.statusEffect = [];

        this.bonusEffects = [];
        
        this.strength = 100;

        this.posX = x;
        this.posY = y;
        this.previewPosX = x;
        this.previewPosY = y;

        this.staminaX = 0;
        this.staminaY = 0;

        this.jumpPower = 0;
        this.jumped = 0;
        this.lastDir = 1;
        this.onTheFloor = false;
        this.cadence = CADENCE;
        this.fireTime = this.cadence;
        this.slow = 0;
        this.isAlive = true;
        this.slide = false;
        this.state = "IDLE_RIGHT";
        this.lastState = "IDLE_RIGHT";
        this.winWidth = document.getElementById('gameArea').width;
        this.winHeight = document.getElementById('gameArea').height;
        this.lifeTime = 50;
        this.visible = true;
        this.health = startHealth;
        this.maxHealth = startHealth;
        this.wallGrip = 0;
        this.dashTimer = 5 * SECOND;
        this.regen = 2 / (5 * SECOND);
    }

    get Health()
    {
        return this.health;
    }

    set Health(value)
    {
        this.health = value;
        if (this.health <= 0)
        {
            this.health = 0;
            this.isAlive = false;
        }
        if(this.health >= this.maxHealth)
            this.health = this.maxHealth;
    }

    get Slow()
    {
        return this.slow;
    }

    set Slow(value)
    {
        this.slow = value;
    }

    get PosX()
    {
        return this.posX;
    }

    get PosY()
    {
        return this.posY;
    }

    get PosXMiddle()
    {
        return this.posX + this.mapSprites[this.state].width / 2;
    }

    get PosYMiddle()
    {
        return this.posY + this.mapSprites[this.state].height / 2;
    }

    throwFumaShurikenDir(dirX, dirY, nShuriken)
    {
        var xThrow = this.posX;
        var yThrow = this.posY;
        var effects = [];
        effects = cloneObject(this.bonusEffects);
        var sentShurikens = [];
        
        for (var i = 0; i < nShuriken; i++)
        {
            sentShurikens.push(new ShurikenFuma(xThrow, yThrow, dirX, dirY, 0, effects, this.strength, this));
        }
        return sentShurikens;
    }

    throwShurikenDir(dirX, dirY, nShuriken)
    {
        var xThrow = this.posX;
        var yThrow = this.posY;
        var effects = [];
        effects = cloneObject(this.bonusEffects);
        var sentShurikens = [];
        
        for (var i = 0; i < nShuriken; i++)
        {
            sentShurikens.push(new Shuriken(xThrow, yThrow, dirX, dirY, 0, effects, this.strength, this));
        }
        return sentShurikens;
    }

    throwShuriken(direction, nShuriken)
    {
        var xThrow = this.posX;
        var yThrow = this.posY;
        var effects = [];
        effects = cloneObject(this.bonusEffects);
        var directionX = this.lastDir;
        var directionY = 0;
        var sentShurikens = [];

        switch(direction)
        {
            case "LEFT":
                directionX = -1;
                directionY = 0;
                break;
            case "RIGHT":
                directionX = 1;
                directionY = 0;
                break;
            case "UP":
                directionX = 0;
                directionY = -1;
                break;
            case "DOWN":
                directionX = 0;
                directionY = 1;
                break;
        }
        for (var i = 0; i < nShuriken; i++)
        {
            let dirX = directionX;
            let dirY = directionY;
            if(directionX == 0)
            {
                dirX = (i - (nShuriken - 1) / 2) * 0.1;
                dirY += Math.abs((i - (nShuriken - 1) / 2) / nShuriken) * -Math.abs(directionY) / directionY; 
            }
            if(directionY == 0)
            {
                dirY = (i - (nShuriken - 1) / 2) * 0.1;
                dirX += Math.abs((i - (nShuriken - 1) / 2) / nShuriken) * -Math.abs(directionX) / directionX; 
            }
            sentShurikens.push(new Shuriken(xThrow, yThrow, dirX, dirY, 0, effects, this.strength, this));
        }
        return sentShurikens;
    }

    hasBeenHit(shuriken)
    {
        if (this.mapSprites[this.state].width === undefined || this.mapSprites[this.state].height === undefined)
        {
            return false;
        }
        else
        {
            var damages = shuriken.contact(this.posX, this.posY, this.mapSprites[this.state].width, this.mapSprites[this.state].height);
            if (damages > 0)
            {
                for(var i = 0; i < shuriken.statusEffects.length; i++)
                {
                    this.statusEffect.push(shuriken.statusEffects[i]);
                }
                this.addDamage("white", damages);
                return true;
            }
            else
            {
                return false;
            }
        }

    }

    addDamage(color, value){
        var damage = Math.floor(value * 100 / this.strength);
        if(color in this.damageTaken && this.damageTaken[color] !== null)
            this.damageTaken[color] = new Damage(this.damageTaken[color].Value + damage, color);
        else
            this.damageTaken[color] = new Damage(damage, color);
        this.Health -= damage;
    }

    updatePosition(plateforms, nPlateform) {
        this.computeXPosition();
        this.computeYPosition();
        var switchStateValue = this.switchState();
        var plat;
        var xContact = false;
        var yContact = false;
        var floorLevel = this.winHeight;
        var sWidth = this.mapSprites[this.state].width;
        var sHeight = this.mapSprites[this.state].height;
        var prevWidth = this.mapSprites[this.lastState].width;
        var prevHeight = this.mapSprites[this.lastState].height;
        this.onTheFloor = false;
        this.wallGrip = 0;
        if (this.isAlive)
            this.Health += this.regen;

        for (plat = 0; plat < nPlateform; plat++)
        {
            if (sWidth != null && sHeight != null) {
                var gap = plateforms[plat].contact(this.posX, this.posY, this.previewPosX, this.previewPosY, prevWidth, prevHeight, sWidth, sHeight);
                if (gap.kill)
                {
                    this.kill();
                }
                if (gap.isInContactRight)
                {
                    this.previewPosX = gap.gapX;
                    this.staminaX = 0;
                    this.wallGrip = 8 / WIN_RATIO / SECOND;
                    this.jumped = 0;
                }
                if (gap.isInContactLeft)
                {
                    this.previewPosX = gap.gapX;
                    this.staminaX = 0;
                    this.wallGrip = 8 / WIN_RATIO / SECOND;
                    this.jumped = 0;
                }

                if (gap.isInContactTop)
                {
                    this.previewPosY = gap.gapY;
                    this.onTheFloor = true;
                }
                if (gap.isInContactBot)
                {
                    this.previewPosY = gap.gapY;
                    this.jumpPower = 0;
                    this.staminaY = 0;
                }
            }

        }

        this.applyXPosition();
        this.applyYPosition();

        this.fireTime = Decr(this.fireTime, 1, 0);
        var effectDamage = null;
        for(var i = 0; i < this.statusEffect.length; i++)
        {
            if (this.statusEffect[i].ApplyEffect(this) === null)
            {
                this.statusEffect.splice(i, 1);
                i--;
            }
        }
        this.dashTimer = Decr(this.dashTimer, 1, 0);
        return switchStateValue;
    }

    computeXPosition(){
        this.previewPosX = Math.floor(this.posX + this.staminaX * (100 - this.Slow) / 100);
        //this.previewPosX += this.staminaX;
    }

    computeYPosition(){
        this.previewPosY = Math.floor(this.posY + this.staminaY);
        //this.previewPosY += this.staminaY;
    }

    applyXPosition(){
        this.posX = this.previewPosX;
    }

    stopMoving()
    {
        if (this.staminaX > 0)
        {
            this.staminaX = Decr(this.staminaX, GRIP/10 * Math.max(MAX_SPEED_X, this.staminaX)/SECOND, 0);
        }
        else if (this.staminaX < 0)
        {
            this.staminaX = Incr(this.staminaX, GRIP/10 * Math.max(MAX_SPEED_X, -this.staminaX)/SECOND, 0);
        }
        else
        {
            this.slide = false;
        }
    }

    applyYPosition(){
        this.posY = this.previewPosY;
        if (this.jumpPower > 0)
        {
            this.staminaY = -this.jumpPower;
            this.jumpPower = Decr(this.jumpPower, GRAVITY, 0);
        }
        else if (!this.onTheFloor){
            this.staminaY += GRAVITY - this.wallGrip;
        }
        else{
            this.staminaY = GRAVITY;
            this.jumped = 0;
        }
    }

    get isPAlive()
    {
        return this.isAlive;
    }

    moveUp() {
        if(this.isAlive)
        {
            if (this.jumpPower < MAX_JUMP_HEIGHT / 3 && this.jumped < MAX_JUMP)
            {
                this.mapSprites["JUMP_LEFT"].resetAnimation();
                this.mapSprites["JUMP_RIGHT"].resetAnimation();
                this.jumpPower = MAX_JUMP_HEIGHT;
                this.jumped++;
            }
        }
    }

    moveLeft() {
        if(this.isAlive)
        {
            if (this.staminaX > -MAX_SPEED_X && !this.slide)
                this.staminaX = Decr(this.staminaX, MAX_SPEED_X * 10 / SECOND, -MAX_SPEED_X);
            else if (this.staminaX < -MAX_SPEED_X)
            {
                this.stopMoving();
            }
        }
    }

    moveRight() {
        if(this.isAlive)
        {
            if (this.staminaX < MAX_SPEED_X && !this.slide)
                this.staminaX = Incr(this.staminaX, MAX_SPEED_X * 10 / SECOND, MAX_SPEED_X);
            else if (this.staminaX > MAX_SPEED_X)
            {
                this.stopMoving();
            }
        }
    }

    set playerSlide(value)
    {
        if (this.staminaX > MAX_SPEED_X / 2 || this.staminaX < -MAX_SPEED_X / 2)
            this.slide = value;
    }

    switchState()
    {
        var keep = true;
        this.lastState = this.state;
        if (this.isAlive)
        {
            if (this.staminaX > 0)
            {
                if (this.slide)
                this.state = "SLIDE_RIGHT";
                else if (this.jumped > 0)
                this.state = "JUMP_RIGHT";
                else
                this.state = "RUN_RIGHT";
                this.lastDir = 1;
            }
            else if (this.staminaX < 0)
            {
                if (this.slide)
                this.state = "SLIDE_LEFT";
                else if (this.jumped > 0)
                this.state = "JUMP_LEFT";
                else
                this.state = "RUN_LEFT";
                this.lastDir = -1;
            }
            else
            {
                if (this.lastDir == 1)
                {
                    if (this.jumped > 0)
                    this.state = "JUMP_RIGHT";
                    else
                    this.state = "IDLE_RIGHT";
                }
                else
                {
                    if (this.jumped > 0)
                    this.state = "JUMP_LEFT";
                    else
                    this.state = "IDLE_LEFT";
                }
            }
        }
        else
        {
            this.lifeTime--;
            if (this.lifeTime <= 0)
                keep = false;
            if (this.lastDir == 1)
                this.state = "DIE_RIGHT";
            else
                this.state = "DIE_LEFT";

        }
        return keep;
    }

    draw()
    {
        this.mapSprites[this.state].animate();
        
        var i = 0;
        if(this.mapSprites[this.state].draw(this.posX, this.posY, this.visible))
        {
            for (var color in this.damageTaken)
            {
                if (this.damageTaken[color] !== null)
                {
                    if (!this.damageTaken[color].draw(this.PosXMiddle + i * 30, this.PosYMiddle))
                    {
                        this.damageTaken[color] = null;
                    }
                    i++;
                }
            }
        }
    }

    kill()
    {
        this.isAlive = false;
    }

    clear()
    {
        this.healthBar.clear();
        this.mapSprites[this.state].clear();
        for(var i = 0; i < this.damageIndicator.length; i ++)
        {
            this.damageIndicator[i].clear();
        }
    }

    dash()
    {
        if(this.dashTimer == 0)
        {
            this.dashTimer = 5 * SECOND;
            this.staminaX = this.lastDir * 50;
        }
    }
}
