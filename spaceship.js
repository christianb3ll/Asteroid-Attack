class Spaceship {

  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.particleSys = new Particles(this.location.x,this.location.y + this.size/2);
    this.size = 50;
  }

  run(){
    this.bulletSys.run();
    this.particleSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }
    
  // Draws the spaceship
  draw(){
    fill(125);
    triangle(this.location.x - this.size/3, this.location.y + this.size/2,
        this.location.x + this.size/3, this.location.y + this.size/2,
        this.location.x, this.location.y - this.size/2);
  }

  // Moves the spaceship
  move(){
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxVelocity);
      this.location.add(this.velocity);
      this.acceleration.mult(0);
      this.particleSys.location = createVector(this.location.x,this.location.y + this.size/2);
  }
  
  // adds force to acceleration
  applyForce(f){
    this.acceleration.add(f);
  }

  // apply user input and apply thrust in the movement direction
  interaction(){
      if (keyIsDown(LEFT_ARROW)){
        this.applyForce(createVector(-0.1, 0));
        this.particleSys.thrust(createVector(1, 0));
      }
      if (keyIsDown(RIGHT_ARROW)){
        this.applyForce(createVector(+0.1, 0));
        this.particleSys.thrust(createVector(-1, 0));
      }
      if (keyIsDown(UP_ARROW)){
        this.applyForce(createVector(0, -0.1));
        this.particleSys.thrust(createVector(0, 1));
      }
      if (keyIsDown(DOWN_ARROW)){
        this.applyForce(createVector(0, +0.1));
        this.particleSys.thrust(createVector(0, -1));
      }
  }

  // create and fire a bullet
  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  // Set edges to wraparound
  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  // increase gravity when near earth
  setNearEarth(){
    var earthGravity = new createVector(0,0.05);
    if(isInside(this.location,this.size,atmosphereLoc,atmosphereSize.x))
        {
            var friction = this.velocity.copy();
            friction = friction.div(30);
            this.applyForce(earthGravity);
            this.applyForce(friction.mult(-1));
        }
  }
}
