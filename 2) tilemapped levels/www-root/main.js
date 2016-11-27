var game = new Phaser.Game(800,600, Phaser.AUTO, "",
{preload:preload, create:create,update:update});

var player;
var platforms;
var cursors;

function preload(){
  //load images
  game.load.image('sky', 'assets/sky.png');
  game.load.image('ground', 'assets/platform.png');
  game.load.spritesheet('dude','assets/dude.png',32,48);
}

function create(){
  game.add.sprite(0,0,'sky');
  game.physics.startSystem(Phaser.Physics.ARCADE);

  platforms = game.add.group();
  platforms.enableBody = true;

  var ground = platforms.create(0, 550,'ground');
  ground.body.immovable = true;
  ground.scale.setTo(2,2);

  var ledge = platforms.create(0,250, 'ground');
  ledge.body.immovable = true;
  ledge = platforms.create(500,400,'ground')
  ledge.body.immovable = true;




  player = game.add.sprite(32,400,'dude');
  game.physics.arcade.enable(player);

  player.body.collideWorldBounds = true;
  player.body.gravity.y = 500;

  player.animations.add('left',[0,1,2,3],10,true);
  player.animations.add('right',[5,6,7,8],10,true);

  cursors = game.input.keyboard.createCursorKeys();

  //initialising everything we need
}
function update(){
  //runs every frame
  var onGround = game.physics.arcade.collide(player, platforms);

  if(cursors.left.isDown){
    player.animations.play('left');
    player.body.velocity.x = -150;
  } else if(cursors.right.isDown){
    player.animations.play('right');
    player.body.velocity.x = 150;
  } else {
    player.animations.stop();
    player.frame = 4;
    player.body.velocity.x = 0;
  }

  if(cursors.up.isDown && onGround && player.body.touching.down){
    player.body.velocity.y = -600;
  }


}
