const MAX_SPEED_X = 20;
const MAX_JUMP_HEIGHT = 20;
const GRIP = 1.5;
const GRAVITY = 1;
const MAX_JUMP = 2;
const CADENCE = 30;

class Characters {
    constructor(x, y, startHealth, color) {

        this.mapSprites = {};
        this.mapSprites["IDLE_LEFT"] = new Sprites("ninjaIdleLeft_"+ color, 10, 1, true, 3);
        this.mapSprites["IDLE_RIGHT"] = new Sprites("ninjaIdleRight_"+ color, 10, 1, true, 3);

        this.mapSprites["RUN_LEFT"] = new Sprites("ninjaRunLeft_"+ color, 10, 1, true, 3);
        this.mapSprites["RUN_RIGHT"] = new Sprites("ninjaRunRight_"+ color, 10, 1, true, 3);

        this.mapSprites["SLIDE_LEFT"] = new Sprites("ninjaSlideLeft_"+ color, 10, 1, true, 3);
        this.mapSprites["SLIDE_RIGHT"] = new Sprites("ninjaSlideRight_"+ color, 10, 1, true, 3);

        this.mapSprites["JUMP_LEFT"] = new Sprites("ninjaJumpLeft_"+ color, 10, 1, false, 2);
        this.mapSprites["JUMP_RIGHT"] = new Sprites("ninjaJumpRight_"+ color, 10, 1, false, 2);

        this.mapSprites["DIE_LEFT"] = new Sprites("ninjaDieLeft_"+ color, 10, 1, false, 5);
        this.mapSprites["DIE_RIGHT"] = new Sprites("ninjaDieRight_"+ color, 10, 1, false, 5);

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
        this.cadence = 0;
        this.boost = 0;
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
    }

    prepareLoadout(cards)
    {
        cards.applyEffect(this);
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

    throwShuriken(direction)
    {
        var xThrow = this.posX;
        var yThrow = this.posY;
        var effects = [];
        effects = cloneObject(this.bonusEffects);
        var directionX = this.lastDir;
        var directionY = 0;

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
        return new Shuriken(xThrow, yThrow, directionX, directionY, this.staminaX, effects, this.strength, this);
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
                damages = Math.floor(damages * 100 / this.strength);
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
        if(color in this.damageTaken && this.damageTaken[color] !== null)
            this.damageTaken[color] = new Damage(this.damageTaken[color].Value + value, color);
        else
            this.damageTaken[color] = new Damage(value, color);
        this.Health -= value;
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
                }
                if (gap.isInContactLeft)
                {
                    this.previewPosX = gap.gapX;
                    this.staminaX = 0;
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

        this.cadence = Decr(this.cadence, 1, 0);
        var effectDamage = null;
        this.Slow = 0;
        for(var i = 0; i < this.statusEffect.length; i++)
        {
            if (this.statusEffect[i].ApplyEffect(this) === null)
            {
                console.log("Remove");
                this.statusEffect.splice(i, 1);
                i++;
            }
        }
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
        if (this.staminaX > 0)
        {
            if(!(!this.onTheFloor && this.slide))
            {
                this.staminaX = Decr(this.staminaX, GRIP/(1+this.slide*2), 0);
            }
        }
        else if (this.staminaX < 0)
        {
            if(!(!this.onTheFloor && this.slide))
            {
                this.staminaX = Incr(this.staminaX, GRIP/(1+this.slide*2), 0);
            }
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
            this.staminaY += GRAVITY;
        }
        else{
            this.staminaY = GRAVITY;
            this.jumped = 0;
            this.mapSprites["JUMP_LEFT"].resetAnimation();
            this.mapSprites["JUMP_RIGHT"].resetAnimation();
        }
    }

    get isPAlive()
    {
        return this.isAlive;
    }

    gravity()
    {
        this.previewPosY += this.staminaY;
        if (this.posY < (level - this.mapSprites[this.state].height)){
            this.staminaY += GRAVITY;
            this.onTheFloor = false;
        }
        else{
            this.staminaY = 0;
            this.onTheFloor = true;
            this.jumped = 0;
            this.mapSprites["JUMP_LEFT"].resetAnimation();
            this.mapSprites["JUMP_RIGHT"].resetAnimation();
        }
    }

    moveUp() {
        if(this.isAlive)
        {
            if (this.jumpPower < MAX_JUMP_HEIGHT / 2 && this.jumped < MAX_JUMP)
            {
                this.mapSprites["JUMP_LEFT"].resetAnimation();
                this.mapSprites["JUMP_RIGHT"].resetAnimation();
                this.jumpPower = MAX_JUMP_HEIGHT;
                this.jumped++;
            }
        }
    }

    moveDown() {
        if(this.isAlive)
        {
            this.previewPosY += this.staminaY;
        }
    }

    moveLeft() {
        if(this.isAlive)
        {
            if (this.staminaX > -MAX_SPEED_X - this.boost * MAX_SPEED_X && !this.slide)
                this.staminaX -= 2;
        }
    }

    moveRight() {
        if(this.isAlive)
        {
            if (this.staminaX < MAX_SPEED_X + this.boost * MAX_SPEED_X && !this.slide)
                this.staminaX +=2;
        }
    }

    set playerSlide(value)
    {
        if (this.staminaX > MAX_SPEED_X / 2 || this.staminaX < -MAX_SPEED_X / 2)
            this.slide = value;
    }

    set run(value)
    {
        this.boost = value;
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
        if (this.posX > posWorldX && this.posY > posWorldY && this.posX < posWorldX + WIN_WIDTH / WIN_RATIO && this.posY < posWorldY + WIN_HEIGHT / WIN_RATIO)
        {
            this.mapSprites[this.state].animate();
            this.mapSprites[this.state].draw(this.posX, this.posY, this.visible);
            
            var i = 0;
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
}
