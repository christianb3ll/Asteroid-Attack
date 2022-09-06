class BulletSystem {

  constructor(){
    this.bullets = [];
    this.velocity = new createVector(0, -5);
    this.diam = 10;
  }

  run(){
      this.move();
      this.draw();
      this.edges();
  }
  
  // creates a bulet and pushes it to the bullets vector
  fire(x, y){
    this.bullets.push(createVector(x,y));
  }

  //draws all bullets
  draw(){
    fill(255);
    for (var i=0; i<this.bullets.length; i++){
      ellipse(this.bullets[i].x, this.bullets[i].y, this.diam, this.diam);
    }
  }

  //updates the location of all bullets
  move(){
    for (var i=0; i<this.bullets.length; i++){
      this.bullets[i].y += this.velocity.y;
    }
  }

  //check if bullets leave the screen and remove them from the array
  edges(){
      // Loop through the bullets array
      for(var i = 0; i < this.bullets.length; i++)
          {
              // if the bullets y position is beyond the edge of the screen
              // remove it from the array
              if(this.bullets[i].y < 0) {
                  this.destroy(i);
                  i--;
              }
          }
  }
    
  // Destroys the bullet  at a given index by removing it from the array
  destroy(index) {
      this.bullets.splice(index,1);
  }
}
