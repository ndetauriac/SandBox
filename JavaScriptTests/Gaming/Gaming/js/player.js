class Player {
    constructor() {
        this.imgPlayer = new Image();
        this.imgPlayer.src = "images/playerSprites.jpg";
        this.imgPlayer.style.position = 'relative';
        this.imgPlayer.style.left = '0px';
        this.imgPlayer.style.top = '0px';
        this.posX = 0;
        this.posY = 0;
        this.lastMove = "NONE";
    }

    updatePosition() {
        switch (this.lastMove) {
            case "UP":
                this.moveUp();
                break;
            case "DOWN":
                this.moveDown();
                break;
            case "LEFT":
                this.moveLeft();
                break;
            case "RIGHT":
                this.moveRight();
                break;
            default:
                break;
        }
    }

    setMove(move) {
        this.lastMove = move;
    }

    moveUp() {
        this.imgPlayer.style.top = parseInt(this.imgPlayer.style.top) - 10 + 'px';
    }

    moveDown() {
        this.imgPlayer.style.top = parseInt(this.imgPlayer.style.top) + 10 + 'px';
    }

    moveLeft() {
        this.imgPlayer.style.left = parseInt(this.imgPlayer.style.left) - 10 + 'px';
    }

    moveRight() {
        this.imgPlayer.style.left = parseInt(this.imgPlayer.style.left) + 10 + 'px';
    }
}