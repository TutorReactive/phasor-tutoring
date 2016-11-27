var game = new Phaser.Game(800,600, Phaser.AUTO, "", {preload:preload, create:create,update:update});

var platforms;
var player;
var end;
var cursors;
var stars;
var score = 0;
var scoreText;
var baddies;

var bullets;
var bulletXSpeed = 300;
var direction = 1;
var spaceBar;
var camera;
var currentLevel;
var lvl1 = [['g','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
            ['g','.','e','.','b','.','.','.','.','.','.','.','.','.','.','.','.','.'],
            ['g','g','g','g','g','g','g','g','g','g','g','g','g','g','.','.','.','.'],
            ['g','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
            ['g','.','.','.','.','.','.','.','.','.','.','b','g','g','g','.','.','.'],
            ['g','.','.','.','.','.','.','.','.','.','g','g','g','g','g','g','.','.'],
            ['g','p','.','.','.','.','g','g','g','g','g','g','g','g','g','g','g','.'],
            ['g','g','g','g','g','.','g','g','g','g','g','g','g','g','g','g','g','g'],
            ['g','g','g','g','g','.','g','g','g','g','g','g','g','g','g','g','g','g'],
            ['g','g','g','g','g','.','g','g','g','g','g','g','g','g','g','g','g','g']];

var lvl2 = [['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','.','.','.'],
            ['.','.','.','.','.','.','.','b','.','.'],
            ['.','.','.','.','.','.','.','g','g','.'],
            ['.','.','.','.','.','.','b','.','.','.'],
            ['.','.','.','.','.','.','g','.','.','.'],
            ['.','p','.','.','g','g','g','.','.','.'],
            ['g','g','g','g','g','g','g','g','g','g']];

function preload(){ //load images
  game.load.image('sky', 'assets/sky.png');
  game.load.image('end', 'assets/end.jpg');
  game.load.image('ground','assets/platform.png');
  game.load.image('block','assets/block.png');
  game.load.spritesheet('dude', 'assets/dude.png',32,48);
  game.load.image('star', 'assets/star.png');
  game.load.image('bullet', 'assets/bullet.gif');
  game.load.spritesheet('baddie','assets/baddie.png',32,32);
}

function create(){ //intitalize everything at the start of the game
    cursors = game.input.keyboard.createCursorKeys();
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.world.setBounds(0,0,1600,800);
  var sky = game.add.sprite(0,0,'sky');
  sky.fixedToCamera = true;
  levelBuilder(lvl1);
  scoreText = game.add.text(16,16, 'score: 0', {fontSize:'32px', fill:"#000"});
  scoreText.fixedToCamera = true;
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
    player.hitPlatform = game.physics.arcade.collide(player,platforms);
    game.physics.arcade.collide(stars,platforms);

}

function levelBuilder(level){
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
        baddies = game.add.group();
        baddies.enableBody = true;
    }
    currentLevel = level;

    game.world.setBounds(0,0,level[0].length*64,level.length*64);
    for(var i = 0; i < level.length; i++){
        for(var k = 0; k < level[i].length; k++){
            switch (level[i][k]) {
                case '.':
                    // do nothing, air
                    break;
                case 'g':
                    var ground = platforms.create(k*64,i*64,'block');
                    ground.scale.setTo(0.5,0.5);
                    ground.enableBody = true;
                    ground.body.immovable = true;
                    break;
                case 'p':
                    player = new Player(game,k*64,i*64);
                    game.add.existing(player);
                case 'b':
                    var baddie = new Baddie(game, k*64, i*64);
                    baddies.add(baddie);
                    break;
                case 'e':
                    end = new End(game,k*64,i*64);
                    game.add.existing(end);
                    break;

                default:

            }
        }
    }
}
