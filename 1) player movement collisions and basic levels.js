
//intialises the phaser game obejct
var game = new Phaser.Game(800,600, Phaser.AUTO, "", {preload:preload, create:create,update:update});

function preload(){

}
function create(){

}
function update(){

}

//preload: runs before game starts
game.load.image('sky', 'assets/sky.png'); //to load the sky image as 'sky'
//create: to render sky  at the top left corner of the screen
game.add.sprite(0,0,'sky');



//~~~~~~MAKING THE LEVEL~~~~~~~~~``
var platforms; //in global scope
game.physics.startSystem(Phaser.Physics.ARCADE);//in create to start the Arcade Physics System
platforms = game.add.group();//create: adds a group of objects called platforms, useful because it lets us check if the player every platform at once
platforms.enableBody = true;//enables the physics on the platforms

//creates a new ground object ( we just need to set it as a variable so we can apply some things to it)
var ground = platforms.create(0, game.world.height - 64, 'ground');
ground.scale.setTo(2, 2);  //makes it double size to stretch accross screen
ground.body.immovable = true; //makes it so it can not move (try running your game withoutt this line)

var ledge = platforms.create(400, 400, 'ground'); //again, making a new variable so we can make it immovable
ledge.body.immovable = true;
ledge = platforms.create(-150, 250, 'ground'); //here we over write the ledge variable because it's already been added to the game
ledge.body.immovable = true;

//~~~~~~~~~~~~MAKING THE PLAYER~~~~~~~~~~~`

game.load.spritesheet('dude', 'assets/dude.png', 32,48); //dude.png is a number of images in one
//so we specify the height and width of each element in the sprite sheet
/*in create*/ player = game.add.sprite(32, game.world.height-150,'dude');
game.physics.arcade.enable(player); //enables physics on player

//Player physics properties. Give the little guy a slight bounce.
player.body.bounce.y = 0.2;
player.body.gravity.y = 300;
player.body.collideWorldBounds = true;


//Our two animations, walking left and right.
player.animations.add('left', [0, 1, 2, 3], 10, true);
player.animations.add('right', [5, 6, 7, 8], 10, true);

//Reload
//
//~~~~~~~~~~~~~MAKING THE PLAYER MOVE~~~~~~~~~~~~~
var hitPlatform = game.physics.arcade.collide(player, platforms);
//makes a check to see if player has hit a platform this frame

//in create
cursors = game.input.keyboard.createCursorKeys();  //starts the keyboard manager

//reset the players velocity (movement)
   player.body.velocity.x = 0;

   if (cursors.left.isDown){
       player.body.velocity.x = -150;
       player.animations.play('left');
   } else if (cursors.right.isDown){
       player.body.velocity.x = 150;
       player.animations.play('right');
   } else {
       player.animations.stop();
       player.frame = 4;
   }

   //allow the player to jump if they are touching the ground.
   if (cursors.up.isDown && player.body.touching.down && hitPlatform){
       player.body.velocity.y = -350;
   }


//~~~~~~~~~~~~~~ADDING STARS~~~~~~~~~~~~
//in global namespace
var score = 0;
var scoreText;
//in create
stars = game.add.group();
stars.enableBody = true;

for(var i = 0; i < 12; i++){
  var star = stars.create(i*70, 0, 'star');
  star.body.gravity.y = 6;
  star.body.bounce.y = 0.7+Math.random()*0.2;
}
//Adds a text object
scoreText = game.add.text(16,16, 'score: 0', {fontSide:'32px', fill:'#000'});

//in update
//checks for overlaps between player and stars, if they do collide, it runs the collectStar function and passes the plaer and star object
game.physics.arcade.overlap(player,stars,collectStar,null, this);

function collectStar(player, star){
  star.kill();
  score += 10;
  scoreText.text = 'score: '+score;
}
