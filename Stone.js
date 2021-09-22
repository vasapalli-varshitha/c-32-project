class Stone {
    constructor(x, y,r) {
     
      var options = {
        restitution: 0.8,
        friction: 1.0,
        density: 1.0,
        isStatic: false
      };
      this.image = loadImage("stone.png");
      this.r = r;
      this.body = Bodies.circle(x, y,r, options);
      World.add(world, this.body);
    }
  
    
  
    display() {
      var angle = this.body.angle;
      var pos = this.body.position;
      
      push();
      fill("white")
      translate(pos.x, pos.y);
      rotate(angle);
      ellipseMode(CENTER);
      ellipse(pos.x,pos.y,this.r,this.r);
      pop();
      
    }
  }
  