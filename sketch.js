const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;

const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var stones = []
var ground,leftWall,rightWall;
var bridge;
var sadZombie;
var distance;

var joinPoint,joinLink;

function preload(){
  zombie1 = loadImage("./assets/zombie1.png");
  zombie2 = loadImage("./assets/zombie2.png");
  zombie3 = loadImage("./assets/zombie3.png");
  zombie4 = loadImage("./assets/zombie4.png");
  sadZombie = loadImage("./assets/sad_zombie.png");

  backgroundImage = loadImage("./assets/background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Ground(width/2,height-10,width,20,"brown");
  leftWall = new Ground(200,height/2+50,100,300,"green");
  rightWall = new Ground(width-200,height/2+50,100,300,"green");
  bridge = new Bridge(18,{x:width/2 - 600, y:height/2})

  joinPoint = new Ground(width-250,height/2+10,40,20,"yellow");
  Matter.Composite.add(bridge.body,joinPoint);

  joinLink = new Link(bridge,joinPoint);

  for(var i = 0; i< 8; i++){
    var x = random(width/2 - 200, width/2 + 150);
    var y = random(-10, 140);
    var stone = new Stone(x,y,80);
    stones.push(stone);
  }

  zombie = createSprite(width/2,height - 110);
  zombie.addAnimation("lefttoright",zombie1,zombie2,zombie1);
  zombie.addAnimation("righttoleft",zombie3,zombie4,zombie3);
  zombie.addImage("sadZombie",sadZombie);
  zombie.scale = 0.1;
  zombie.velocityX = 10;


  breakButton = createImg("assets/axe.png");
  breakButton.size(80,80) 
  breakButton.position(width - 200, height/2 - 100);
  breakButton.class("breakbutton")
  breakButton.mouseClicked(handleButtonPress);


}

function draw() {
  background(backgroundImage);
  Engine.update(engine);



  for(var stone of stones){
    stone.display();
    distance = dist(zombie.position.x,zombie.position.y,stone.body.position.x,stone.body.position.y);
    if(distance<50){
      zombie.velocityX = 0
      zombie.changeImage("sadZombie");
    }
  }

  if(zombie.position.x>=width-300){
    zombie.velocityX = -5;
    zombie.changeAnimation("righttoleft");
  }
  if(zombie.position.x<= 300){
    zombie.velocityX = 5;
    zombie.changeAnimation("lefttoright");
  }
 
  ground.display();
  leftWall.display()
  rightWall.display()
  bridge.show();
  
  drawSprites();
}

function handleButtonPress(){
  joinLink.detach();
  setTimeout(() => {bridge.break();}, 1500);

}
