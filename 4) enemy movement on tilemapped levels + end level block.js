//add this to the enemy class
this.gridX = Math.floor(x/64);
this.gridY = Math.floor(y/64);

//this is the position of the enemy on the level grid (because each tile is 64x64 and then we floor it
//which means to truncate any decimal points (5.1 = 5, 9.8 = 9 and so on)) also .roof() and .round()

var currentLevel // in global scope
currentLevel = level; // in levelBuilder function (level beign the input parameter)
//this is so the baddies can check where they are on 'currentLevel' and we just change 'current level' every time
//we want to load a new level.

// this updates the position on the map, if we wanted to enable a debug mode to see where that is
// we could create a red block at gridX * 64 and gridY * 64
this.gridX = Math.floor(baddie.x/64);
this.gridY = Math.floor(baddie.y/64);
//This line of code is a little bit silly and spaggeti-ish
//it checks if the enemy is moving to the right and if the block one bellow and one to the right is NOT ground (i.e. empty space)
//OR it checks if it's moving left and if the block one below is NOT ground (because we are flooring it's position instead
//of rounding it, it works out so it walks to the end of the block and turns around) we flip the enemies direction.
//
//in short, it checks that there is something to walk on on either side of the current block it is on
if( baddie.body.velocity.x > 0 && currentLevel[this.gridY+1][this.gridX+1]!='g' ||
    baddie.body.velocity.x < 0 && currentLevel[this.gridY+1][this.gridX]!='g'){
    baddie.body.velocity.x *= -1;
}
//this line is similar except instead of checking that there's something the enemy can walk on, it checks for walls
//that it CANT walk through.
//checks if it's moving right and if the block one to the right is a wall OR
//checks if it's moving left and if the block to the left is a wall it changes direction
if( baddie.body.velocity.x > 0 && currentLevel[this.gridY][this.gridX+1] ==='g'||
    baddie.body.velocity.x < 0 && currentLevel[this.gridY][this.gridX-1] ==='g' ){
    baddie.body.velocity.x *= -1;
}

//classifying player
//copy the Baddie class and change all instances of Baddie to Player,
//delete the contents of the Baddie function, we'll make a new one
//
//instead of player = game.add.sprite(k*64,i*64,'dude'); we use Phaser.Sprite.Call
Phaser.Sprite.call(this,game,x,y,'dude');
game.physics.arcade.enable(this);
this.enableBody = true;
this.body.bounce.y = 0.2;
this.body.gravity.y = 500;
//this.body.collideWorldBounds = true;
this.animations.add('left', [0,1,2,3], 10, true);
this.animations.add('right', [5,6,7,8], 10, true);
game.camera.follow(this);
//copy the code from the world builder in last lesson and replace all instances of
//'player' with 'this' (it's identical code, we're just making it neater)
//
//
//in the update function we can copy all the code from the
//game.physics.arcade.overlap(player, baddies, touchBaddie, null, this);
//to the bottom of the controls where we make the player jump
//
//again, replace all instances of 'player' with 'this' (Ctrl+H)
//do not include  hitPlatform, we will use a different method of
//determinign whether or not there is contact
//test out the code, the player shouldn't be able to jump but we'll fix that
//
//in the main.js update function change
var hitPlatform = game.physics.arcade.collide(player,platforms);
//to
player.hitPlatform = game.physics.arcade.collide(player,platforms);
//and in the Player class change
if(cursors.up.isDown && this.body.touching.down && hitPlatform){
// to                                             \this./
if(cursors.up.isDown && this.body.touching.down && this.hitPlatform){


//create a new Class called End to load the next stage
//all it needs is
//1) a sprite that is called in its constructor so it is viewable
//2) to have arcade physics and body enabled so that collisions can be detected
//3) and to extend the Phaser.Sprite class Object.create(Phaser.Sprite.prototype);

End = function(game,x,y){
    Phaser.Sprite.call(this,game,x,y,'end');
    game.physics.arcade.enable(this);
    this.enableBody = true;
}
End.prototype = Object.create(Phaser.Sprite.prototype);
End.prototype.constructor = End;
//gz gz for doing what I typed above
