//instead of making a baddie sprite and adding physics and collisions,
//we can use classes, which have a constructor
//a constructor is basically a function that runs when an object is
//created which is useful for automatting settings like physics,
//animations and more

//this code is quite hard to understand because it's built on the
//Phaser.image class and it means it can be difficult to understand
//without knowledge of what the Phaser.image class does
//
//first we will create the constructor, aka the code that runs when we
//create the object, such as a player, enemy or projectile.
Baddie = function(game,x,y){

}
//it's the convention to use Captials in classnames instead of camelType
Baddie = function(game,x,y){

    //this line inherits all of the features of Phaser.Sprite (such as
    //being able to add physics, animations, etc)
    Phaser.Sprite.call(this,game,x,y,'baddie');
    //because in a class the function IS the object we don't reference
    //<var baddie>, instead we reference ourselves with <this>;
    //we then add everything we would to the player or baddie except
    //using <this.collideWorldBounds> instead of
    //<player.collideWorldBounds>
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
}
//This line is also inheriting the behavior of the Phaser.Sprite object
Baddie.prototype = Object.create(Phaser.Sprite.prototype);
//here we assign the 'constructor' function which runs when we create
//a new instance of an object
//consider it like phaser's <function create(){}> except only for
//this object
Baddie.prototype.constructor = Baddie;
//Here we can assign the Baddie object an update function, similarly
//to phaser's update, this is run every frame and is a really easy way of
//managing behavior for a single object and keeping your code clean
Baddie.prototype.update = function(){
    //every frame we check for a collision between this and platforms
    //what's interesting is we use a 'callback' function which only
    //runs when a collision triggers
    //this is usefull for having different behaviour when on the ground
    //vs on the sky AND it allows us to easily access where the collision
    //took place and do things to the objects (such as make the player die,
    //add points)
    game.physics.arcade.collide(this, platforms, function (baddie, platform) {
        //there's not really much I can do here except explain how this
        //next line of code works
        //first it checks if the baddie is moving to the right,
        //which means it needs to check the baddie is touching
        //the right bounds of the platform
        //if that is the case it will flip the velocity (multiply it by -1)
        //draw it on the board connor
        if (baddie.body.velocity.x > 0 && baddie.x > platform.x + (platform.width - baddie.width) ||
                baddie.body.velocity.x < 0 && baddie.x < platform.x) {
            baddie.body.velocity.x *= -1;
            console.log('flip direction');
        } else {
          //console.log(baddie.x,platform.x);
        }
        //this just checks if the baddie is moving left or right
        //if it is it will play the relevant animation
        if (baddie.body.velocity.x > 0) {
            baddie.animations.play('right');
        } else {
            baddie.animations.play('left');
        }
    });
}
