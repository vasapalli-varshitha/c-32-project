const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
 

var bridge;
var jointPoint;
var link;
var stones=[];
var bg 
var breakButton;
var zombie_1;
var zombie1,zombie2,zombie3,zombie4;
var sad;


function preload(){
 bg= loadImage("background.png");
 zombie1 = loadImage("zombie1.png");
 zombie2 = loadImage("zombie2.png");
 zombie3 = loadImage("zombie3.png");
 zombie4 = loadImage("zombie4.png");
 sad = loadImage("sad.png")
}

function setup() {
  createCanvas(1200,800);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);
  
  breakButton = createButton("");
  breakButton.position(1100,380);
  breakButton.size(80,80);
     
  bridge = new Bridge(29,{x:30,y:300}); 
  jointPoint = new Base(1100, 300, 40, 20, "#8d6e63", true); 
  Matter.Composite.add(bridge.body,jointPoint); 
  link = new Link(bridge,jointPoint);
  
  zombie_1 = createSprite(width/2,height-110);
  zombie_1.addAnimation("lefttoright",zombie1,zombie2,zombie1);
  zombie_1.addAnimation("righttoleft",zombie3,zombie4,zombie3);
  zombie_1.scale=0.1;
  zombie_1.velocityX=-10;
   
  for(var i =0;i<=8;i++){
  var x = width/4;
  var y = height/2-200;
  var stone = new Stone(x,y,40);
  stones.push(stone);
  }
}

function showBalls(index,stone) {
  stone[index].display();

}


function draw() {
  background(bg);
  Engine.update(engine);
  rectMode(CENTER);
  text("press up arrow to detach bridge",1100, 380)
  bridge.show();
  
 
  for(var stone of stones){
   stone.display();
   var pos = stone.body.position;
   var distance = dist(zombie_1.position.x,zombie_1.position.y,pos.x,pos.y)
   if(distance<=50){
     zombie_1.velocityX = 0;
     Matter.Body.setVelocity(stone.body,{x:10,y:10});
     zombie_1.changeImage("sad.png");
     collide = true;
  } 
  }

  if (keyDown("up_arrow"))
 {
  link.detach();
  setTimeout(()=>{
    bridge.break();
  },1000)
  
 }  
  drawSprites();
  if(zombie_1.x<=300){
    zombie_1.velocityX=10;
   zombie_1.changeAnimation("lefttoright");
   }
   if(zombie_1.x>=width-300){
    zombie_1.velocityX=-10;
    zombie_1.changeAnimation("righttoleft");
    }
}



 
  

  



