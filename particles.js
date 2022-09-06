class Particles {

    constructor(x,y){
        this.particles = [];
        this.lifespans = [];
        this.velocities = [];
        this.location = createVector(x,y);
        this.diam = 4;
        this.thrustStrength = 20;
    }
    
    run(){
      this.move();
      this.draw();
      // Destroy particles that have exceeded their lifespan
      for(var i = 0; i < this.particles.length; i++){
          if(this.lifespans[i] <= 0){
              this.destroy(i);
              i--;
          }
          this.lifespans[i]--;
      }
    }
    
    // Create a particle and apply direction
    createParticle(direction){
        this.particles.push(createVector(this.location.x,this.location.y));
        this.lifespans.push(10);
        this.velocities.push(direction);
    }
    
    // Create muliple particles in a given direction
    thrust(direction){
        for(var i = 0; i < this.thrustStrength; i++){
            var rand = createVector(random(-0.5,0.5),0);
            this.createParticle(direction.add(rand));
        }
    }
    
    // Draw the particles
    draw() {
        fill(255,0,0);
        for(var i =0; i < this.particles.length; i++){
            ellipse(this.particles[i].x, this.particles[i].y, this.diam, this.diam);
        }
            
    }
    
    //updates the location of all particles
    move(){
        for (var i=0; i<this.particles.length; i++){
            this.particles[i].y += this.velocities[i].y;
            this.particles[i].x += this.velocities[i].x;
        }
    }
    
    // Destroys the particle at a given index by removing it from the array
    destroy(index) {
        this.particles.splice(index,1);
        this.lifespans.splice(index,1);
        this.velocities.splice(index,1);
  }
}