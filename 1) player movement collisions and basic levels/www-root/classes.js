Baddie = function(game, x, y){
    Phaser.Sprite.call(this, game, x,y,'baddie');
    game.physics.arcade.enable(this);
    this.collideWorldBounds = true;
    this.enableBody = true;
    this.body.gravity.y = 800;
    this.body.collideWorldBounds = true;
    this.body.velocity.x = 80;
    this.animations.add('left', [0,1], 10, true);
    this.animations.add('right', [2,3], 10, true);
}

Baddie.prototype = Object.create(Phaser.Sprite.prototype);
Baddie.prototype.constructor = Baddie;

Baddie.prototype.update = function(){
    game.physics.arcade.collide(this,platforms, function(baddie, platform){
        if(baddie.body.velocity.x > 0 && baddie.x > platform.x  + (platform.width-baddie.width)){
            baddie.body.velocity.x *= -1;
        }else if (baddie.body.velocity.x < 0 && baddie.x < platform.x){
            baddie.body.velocity.x *= -1;
        }
    });
    if(this.body.touching.left||this.body.touching.right){
        this.body.velocity.x *= -1;
    }
    if(this.body.velocity.x > 0){
        this.animations.play('right');
    } else {
        this.animations.play('left');
    }
}
