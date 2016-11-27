var game = new Phaser.Game(800,600, Phaser.AUTO, "", {preload:preload, create:create,update:update});

var platforms;
var player;
var cursors;
var stars;
var score = 0;
var scoreText;
var baddies;

var bullets;
var bulletXSpeed = 300;
var direction = 1;
var spaceBar;
var lvl1 = [['.','.','.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','g','g','g','g','g','g','.','.','.'],
            ['.','p','.','.','.','.','.','.','.','.','.','.'],
            ['g','g','g','g','g','g','g','g','g','g','g','g']];

function preload(){ //load images
game.load.image('block', 'assets/block.png');
game.load.image('sky', 'assets/sky.png');
game.load.image('ground','assets/platform.png');
game.load.spritesheet('dude', 'assets/dude.png',32,48);
game.load.image('star', 'assets/star.png');
game.load.image('bullet', 'assets/bullet.gif');
game.load.spritesheet('baddie','assets/baddie.png',32,32);
}

function create(){ //intitalize everything at the start of the game
  cursors = game.input.keyboard.createCursorKeys();
  game.physics.startSystem(Phaser.Physics.ARCADE);
  levelBuilder(lvl1);
  scoreText = game.add.text(16,16, 'score: 0', {fontSize:'32px', fill:"#000"});
  bullets = game.add.group();
  bullets.enableBody = true;
  spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  spaceBar.onDown.add(shootBullet, this);
  function shootBullet() {
    if (bullets.length < 5) {
      var bullet = new Bullet(game, player.x + 10, player.y + 10, direction, bulletXSpeed);
      bullets.add(bullet);
    }
  }

}
function update(){ // used to update the scene as we play (60x per second)
  var hitPlatform = game.physics.arcade.collide(player,platforms);
  game.physics.arcade.collide(stars,platforms);

  game.physics.arcade.overlap(player, baddies, touchBaddie, null, this);
  game.physics.arcade.overlap(player, stars, collectStar, null, this);

  function touchBaddie(player, baddie){

  }

  function collectStar(player, star){
    star.kill();
    score += 10;
    scoreText.text = 'score: ' + score;
  }

  if(cursors.left.isDown){
    direction = -1;
    player.body.velocity.x = -150;
    player.animations.play('left');
  } else if(cursors.right.isDown){
    direction = 1;
    player.body.velocity.x = 150;
    player.animations.play('right');
  } else {
    player.body.velocity.x = 0;
    player.animations.stop();
    player.frame = 4;
  }
  if(cursors.up.isDown && player.body.touching.down && hitPlatform){
    player.body.velocity.y = -600;
  }
}
function levelBuilder(level){
    try {
        platforms.removeAll();
        baddies.removeAll();
        stars.removeAll();
    } catch (e) {
        console.log('first run, creating groups now');
        platforms = game.add.group()
        platforms.enableBody = true;
        stars = game.add.group();
        stars.enableBody = true;
        baddies = game.add.group();
        baddies.enableBody = true;
        console.log(platforms, stars,baddies);
    }
    console.log(level.length);
    for(var i = 0; i < level.length; i++){
        for(var k = 0; k < level[i].length; k++){
            switch (level[i][k]) {
                case 'a':
                    // do nothing, air
                    break;
                case 'g':
                    var ground = platforms.create(k*64,i*64,'block');
                    ground.scale.setTo(0.5,0.5);
                    ground.body.immovable = true;
                    break;
                case 'p':
                    console.log(player);
                    player = game.add.sprite(k*64,i*64,'dude');
                    game.physics.arcade.enable(player);
                    player.body.bounce.y = 0.2;
                    player.body.gravity.y = 500;
                    //player.body.collideWorldBounds = true;
                    player.animations.add('left', [0,1,2,3], 10, true);
                    player.animations.add('right', [5,6,7,8], 10, true);
                    game.camera.follow(player);
                    console.log(player);
                case 'b':
                    var baddie = new Baddie(game, k*64, i*64);
                    baddies.add(baddie);
                    break;
                case 'e':
                    break;

                default:

            }
        }
    }
}
