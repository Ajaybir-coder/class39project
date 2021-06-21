var ghost, ghostImg;
var door,doorImg,dg;
var climber, climberImg,cg;
var tower, towerImg;
var leftE, rightE;
var ib,ibg;
var sound;
var PLAY;
var END;
var gameState = "PLAY";

var power = 200;

function preload(){
  ghostImg = loadImage("ghost-standing.png");
  doorImg  = loadImage("door.png");
  climberImg = loadImage("climber.png");
  towerImg = loadImage("tower.png");
  sound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  sound.loop();
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 2.5 ;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.36;
  
  rightE = createSprite(height, width/2 -30,0,height);
  rightE.visible = false;
  
  leftE = createSprite(height/2 -270,width,0,height+800);
  leftE.visible = false;
  
  dg = new Group();
  cg = new Group();
  ibg = new Group();
  
  power = 300;
}

function draw(){
  
 if(gameState === "PLAY"){
   if(tower.y > 400){
    tower.y = 300;
  }
    
  if (keyDown("space")){
    ghost.velocityY = -12;
    power = power-2;
  }
  
  if(keyDown("right")){
    ghost.x = ghost.x +7;
    power = power -1;
  }
  
  if(keyDown("left")){
    ghost.x = ghost.x -7;
    power = power-1;
  }
  
   ghost.velocityY = ghost.velocityY + 0.8
   Fdoor();
   
   if(frameCount % 150 === 0){
     power = power+15;
   }
   
   
   
   if(cg.isTouching(ghost)){
     ghost.velocityY = 0;
   }
   
   if(power === 0){
    gameState = END;
   }
   
   if(ibg.isTouching(ghost) || ghost.y > 600){
      gameState = END;
   }
 } 
  ghost.collide(rightE);
  ghost.collide(leftE);
  ghost.collide(cg);
  drawSprites();
  textSize(25)
  fill('white');
  text("Devil's Power :" +power,25,50);
  
  if(gameState === END){
    power = "He died😵";
    tower.velocityY = 0;
    ghost.destroy();
    cg.destroyEach();
    dg.destroyEach();
    ibg.destroyEach();
    stroke("black");
    fill("white")
    textSize(85);
    text("Game Over!",60,300)
  }
}

function Fdoor(){
 if(frameCount % 240 === 0){
   door = createSprite(200,-50);
   door.addImage(doorImg);
   door.scale = 1.4
   
   climber = createSprite(200,45);
   climber.addImage(climberImg);
   
   ib = createSprite(200,55);
   ib.width = climber.width;
   ib.height = 2;
   ib.visible = false;
   
   door.x = Math.round(random(120,400));
   climber.x = door.x;
   ib.x = door.x;
   
   door.velocityY = 2;
   climber.velocityY = 2;
   ib.velocityY = 2;
   
   ghost.depth = door.depth;
   ghost.depth = ghost.depth+1;
   
   door.lifetime = 800;
   climber.lifetime = 800;
   ib.lifetime = 800;
   
   dg.add(door);
   cg.add(climber);
   ibg.add(ib);
   //ib.debug = true;
 }
}