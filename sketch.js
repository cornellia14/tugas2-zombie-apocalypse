let zombie = [];
let human;
let numZombies = 10;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < numZombies; i++) {
    zombie.push(new Zombie(random(width), random(height)));
  }
  human = new Human(width/2, height/2);
}

function draw() {
  background(51);
  for (let i = 0; i < zombie.length; i++) {
    zombie[i].update();
    zombie[i].show();
    zombie[i].chase(human);
  }
  human.update();
  human.show();
  human.handleInput();
}

class Zombie {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(2);
    this.acc = createVector();
    this.r = 10;
  }
  
  update() {
    this.vel.add(this.acc);
    this.vel.limit(4);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  show() {
    fill(255, 0, 0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
  }
  
  chase(target) {
    let desired = p5.Vector.sub(target.pos, this.pos);
    desired.setMag(4);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(0.1);
    this.applyForce(steer);
  }
  
  applyForce(force) {
    this.acc.add(force);
  }
}

class Human {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.r = 20;
  }
  
  update() {
    this.vel.add(this.acc);
    this.vel.limit(4);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  }
  
  show() {
    fill(0, 255, 0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
  }
  
  handleInput() {
    if (keyIsDown(LEFT_ARROW)) {
      this.vel.x = -4;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.vel.x = 4;
    } else {
      this.vel.x = 0;
    }
    if (keyIsDown(UP_ARROW)) {
      this.vel.y = -4;
    } else if (keyIsDown(DOWN_ARROW)) {
      this.vel.y = 4;
    } else {
      this.vel.y = 0;
    }
  }
}