//first we'll need to find a 64x64 pixel block online,
//try searching for 'block sprite' or 'icon'

//comment out all of the platforms and player and baddie building parts,
//we'll use them later to make the world builder

//first we create the level, using an array of arrays
//we use letters to indicate whatever block or object we'd like there
//I'll use g for ground, p for player and a '.' for air or nothing
var lvl1 = [['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','p','.','.','.','.','.','.','.','.'],
            ['g','g','g','g','g','g','g','g','g','g']];
//we then create a function to build the level, takes the level array as a parameter
levelBuilder(level){

}

//to access an object on the array we use
console.log(length[x][y]);

//but we need to loop through each object.
for(var i = 0; i < level.length; i++){
    for(var k = 0; k < level.length; k++){
        //try to log each element in the array
    }
}

//next we'll use a switch statement, used if statements with many specific possiblitites
//this is what you are checking it with
switch (level[i][k]) {
    case '.': //this is what you see whether it is equal to
        //do nothing because air
        break;
    case 'g':
        var ground = platforms.create(k*64,i*64,'block');
        ground.body.immovable = true;
        break;
    case 'p':
        //see if you can add a player by repurposing
        //the code from earlier.
        break;
    case 'b':
        //likewise for baddies, dont forget to add it to the baddies group
        break;
    default:
}

//ok so now we could THEORETICALLY render a level but
//we need to get all the groups and sky setup

//we'll use a try statement, that means it will attempt to do one thing,
//and if it runs into an error it will do something else.
//
//this is usefull because we want to TRY to clear the scene but if
//there isn't a scene to clear (i.e. running for the first time)
//we want to BUILD the scene
try {
    platforms.removeAll();
    baddies.removeAll();
    stars.removeAll();
    stars.removeAll();
} catch (e) {
    console.log('no groups yet (first level), just building the level');
    platforms = game.add.group();
    platforms.enableBody = true;
    stars = game.add.group();
    stars.enableBody = true;
}

//for following camera we need to change the world bounds
game.physics.setBound(x1,y1, x2, x2);
//think about how you can use
level[y][x] & level[x]
//and then multiply it by the width and height of each tile, to figure
//out the world bounds
//to get a better idea, try setting world bounds to something static
//like 1200 by 600 (1200px wide, 600 high);
game.world.setBounds(0,0,level.length,level[0].length);
//Now that the sky background isnt moving any more
//it's possible to give sky a variable name
var sky = game.add.sprite(0,0,'sky');
sky.fixedToCamera = true;
//do the same for the UI

//bonus round, try making a block which takes you to the next level
//a good idea would be to have an array of arrays so you can increment the levelIndex variable to take you to the next one
