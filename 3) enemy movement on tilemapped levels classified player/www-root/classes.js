Baddie = function(game,x,y){
  Phaser.Sprite.call(this, game, x, y, 'baddie');
  game.physics.arcade.enable(this);
  this.collideWorldBounds = true;
  this.enableBody = true;
  this.animations.add('right', [2,3], 10, true);
  this.animations.add('left', [0,1], 10, true);
  this.body.gravity.y = 800;
  this.body.bounce.y = 0;
  //this.body.bounce.x = 1;
  this.body.collideWorldBounds = true;
  this.body.velocity.x = 80;
  this.gridX = Math.floor(x/64);
  this.gridY = Math.floor(y/64);

};
Baddie.prototype = Object.create(Phaser.Sprite.prototype);
Baddie.prototype.constructor = Baddie;

Baddie.prototype.update = function(){
  game.physics.arcade.collide(this, platforms, function (baddie, platform) {
        // if baddie is moving to the right,
        // check if its position greater than the width of the platform minus its width
        // if baddie is moving to the left,
        // check if its position exceeds the left-most point of the platform
        this.gridX = Math.floor(baddie.x/64);
        this.gridY = Math.floor(baddie.y/64);
        //console.log(baddie.y);
        //console.log(currentLevel[this.gridY][this.gridX-1]);
        if( baddie.body.velocity.x > 0 && currentLevel[this.gridY+1][this.gridX+1]!='g' ||
            baddie.body.velocity.x < 0 && currentLevel[this.gridY+1][this.gridX]!='g'){
            baddie.body.velocity.x *= -1;
        }
        if( baddie.body.velocity.x > 0 && currentLevel[this.gridY][this.gridX+1] ==='g'||
            baddie.body.velocity.x < 0 && currentLevel[this.gridY][this.gridX-1] ==='g'){
            baddie.body.velocity.x *= -1;
        }
        /*if (baddie.body.velocity.x > 0 && baddie.x > platform.x + (platform.width - baddie.width) ||
                baddie.body.velocity.x < 0 && baddie.x < platform.x) {
            baddie.body.velocity.x *= -1;
            console.log('flip direction');

        } else {
          //console.log(baddie.x,platform.x);
        }*/
        if (baddie.body.velocity.x > 0) {
            baddie.animations.play('right');
        } else {
            baddie.animations.play('left');
        }
    });

    game.physics.arcade.collide(this, baddies, function (baddie, baddies) {
        baddie.body.velocity.x *= -1.0001;
    });
};

Bullet = function (game,x,y,direction,speed){
  Phaser.Sprite.call(this,game,x,y,'bullet');
  game.physics.arcade.enable(this);
  this.enableBody = true;
  this.xSpeed = direction*speed;
};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function(){
  this.body.velocity.y = 0;
  this.body.velocity.x = this.xSpeed;
  if(this.x < 0 || this.x > 1200){
    this.destroy();
  }
  console.log(this);
  game.physics.arcade.overlap(this, baddies, function(bullet, baddie){
    score+=100;
    scoreText.text = 'Score: '+score;
    bullet.kill();
    baddie.kill();
  });

  game.physics.arcade.overlap(this, platforms, function(bullet){
    bullet.kill();
  });
};
