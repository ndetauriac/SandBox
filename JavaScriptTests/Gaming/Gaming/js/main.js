﻿// Votre code ici.
class Personnage {
    constructor() {
        this.imgObj = document.getElementById('clapi');
        this.imgObj.style.position = 'relative';
        this.imgObj.style.left = '0px';
        this.imgObj.style.top = '0px';
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
        this.imgObj.style.top = parseInt(this.imgObj.style.top) - 10 + 'px';
    }

    moveDown() {
        this.imgObj.style.top = parseInt(this.imgObj.style.top) + 10 + 'px';
    }

    moveLeft() {
        this.imgObj.style.left = parseInt(this.imgObj.style.left) - 10 + 'px';
    }

    moveRight() {
        this.imgObj.style.left = parseInt(this.imgObj.style.left) + 10 + 'px';
    }

    sayMyName() {
        alert("Clapi");
    }
}
var clapi;
const ESCAPE_KEY = 27;
const SPACE_BAR = 32;
const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;

function init() {
    clapi = new Personnage();

    document.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
            case (ARROW_LEFT):
                keyLeft();
                break;
            case (ARROW_UP):
                keyUp();
                break;
            case (ARROW_RIGHT):
                keyRight();
                break;
            case (ARROW_DOWN):
                keyDown();
                break;
            case (SPACE_BAR):
                boucle = !boucle;
                break;
            case (ESCAPE_KEY):
                boucle = false;
                break;
        }
    });
}

var boucle = true;

function sayMyName() {
    clapi.sayMyName();
}

function keyUp() {
    clapi.setMove("UP");
}

function keyDown() {
    clapi.setMove("DOWN");
}

function keyLeft() {
    clapi.setMove("LEFT");
}

function keyRight() {
    clapi.setMove("RIGHT");
}

function refreshGame() {
    if (boucle)
        clapi.updatePosition();
}