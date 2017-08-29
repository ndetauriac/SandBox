class Spaceship extends Map
{
    constructor()
    {
        super();
        this.sizeMapX = 8000;
        this.sizeMapY = 2500;

        this.backgrounds.push(new Background(this.sizeMapX, this.sizeMapY, "/Spaceship/bg_1"));
        this.backgrounds.push(new Background(this.sizeMapX, this.sizeMapY, "/Spaceship/bg_2"));
        this.backgrounds.push(new Background(this.sizeMapX, this.sizeMapY, "/Spaceship/spaceship"));
    }
    
    initWall()
    {        
        //Dojo
        addWall(1135, 1028, 3182, 1028); // TOP
        addWall(1135, 1028, 1135, 1505); // LEFT
        addWall(3167, 1028, 3167, 1371); // RIGHT
        addWall(3167, 1356, 3265, 1356); // CORRIDOR
        addDoor(3216, 1356, 10, 149); // DOOR

        // Toilettes
        addWall(1938, 743, 2131, 743); // TOP
        addWall(1938, 743, 1938, 1005); // LEFT
        addWall(2116, 743, 2116, 871); // RIGHT
        addWall(2116, 856, 2161, 856); // CORRIDOR
        addDoor(2131, 856, 10, 133); // DOOR

        //Chambre
        addWall(2145, 743, 3182, 743); // TOP
        addWall(2145, 743, 2145, 871); // LEFT
        addWall(3167, 743, 3167, 871); // RIGHT
        addWall(3167, 856, 3264, 856); // CORRIDOR
        addDoor(3200, 856, 10, 133); // DOOR

        //Stuff
        addWall(3264, 743, 3752, 743); // TOP
        addWall(3264, 743, 3264, 871); // LEFT
        addWall(3737, 743, 3737, 871); // RIGHT
        addWall(3737, 856, 3777, 856); // CORRIDOR
        addDoor(3757, 856, 10, 133); // DOOR

        //Security
        addWall(3777, 686, 4263, 686); // TOP
        addWall(3777, 686, 3777, 871); // LEFT
        addWall(4248, 686, 4248, 754); // RIGHT
        addWall(4248, 845, 4248, 989); // RIGHT
        addWall(4248, 739, 5158, 739); // CORRIDOR
        addWall(4248, 844, 5158, 844); // CORRIDOR

        //Repos
        addWall(3265, 1028, 3870, 1028); // TOP
        addWall(3941, 1028, 3987, 1028); // TOP
        addWall(3265, 1028, 3265, 1356); // LEFT
        addWall(3972, 1028, 3972, 1505); // RIGHT
        addWall(3855, 990, 3855, 1028); // CORRIDOR
        addDoor(3855, 1002, 3941-3855, 10, true); // DOOR
        addWall(3941, 990, 3941, 1028); // CORRIDOR


        //7
        addWall(5143, 700, 5853, 700); // TOP
        addWall(5143, 700, 5143, 739); // LEFT
        addWall(5143, 844, 5143, 960); // LEFT
        addWall(5838, 700, 5838, 855); // RIGHT
        addWall(5838, 840, 5894, 840); // CORRIDOR

        //8
        addWall(5879, 643, 6436, 643); // TOP
        addWall(5879, 643, 5879, 855); // LEFT
        addWall(6421, 643, 6421, 960); // RIGHT
        addWall(6047, 946, 6062, 1018); // CORRIDOR
        addWall(6133, 946, 6133, 1018); // CORRIDOR

        //9
        addWall(5143, 1018, 6011, 1018); // TOP
        addWall(5143, 1018, 5143, 1268); // LEFT
        addWall(5996, 1018, 5996, 1162); // RIGHT
        addWall(5996, 1147, 6046, 1147); // CORRIDOR

        //10
        addWall(6031, 1018, 6062, 1018); // TOP
        addWall(6133, 1018, 6432, 1018); // TOP
        addWall(6031, 1018, 6031, 1147); // LEFT
        addWall(6421, 1018, 6421, 1268); // RIGHT

        addWall(1937, 989, 3870, 989); // BOT
        addWall(3941, 989, 4263, 989); // BOT
        addWall(1135, 1490, 3987, 1490); // BOT
        addWall(5143, 945, 6062, 945); // BOT
        addWall(6133, 945, 6421, 945); // BOT
        addWall(5143, 1253, 6432, 1253); // BOT
    }
    
    initPlayer()
    {
        return new Player(2500/WIN_RATIO, 800/WIN_RATIO);
    }
    
    initEnemies()
    {
        addEnemies(2600/WIN_RATIO, 800/WIN_RATIO);
    }
}