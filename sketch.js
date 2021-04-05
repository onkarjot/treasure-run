var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var score = 0;
var CashG,DiamondsG,JwelleryG,SwordGroup;
var gameover,gameoverImage;
var play = 1;
var end = 0;
var gameState = play;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameoverImage = loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;
  
gameover = createSprite (200,100,10,10);
  gameover.addImage("over",gameoverImage);
  gameover.scale=0.5;

//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;

  
  boy.setCollider("rectangle",0,0,1050,1250)
  
CashG=new Group();
DiamondsG=new Group();
JwelleryG=new Group();
SwordGroup=new Group();

}

function draw() {

  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  if(path.y > 400 ){
    path.y = height/2;
  }

  drawSprites();
 
   textSize(20);
  fill(255);
  text("Treasure: "+ score,150,30);
  if(gameState === play){
    

  
 gameover.visible=false;
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (CashG.isTouching(boy)) {
      CashG.destroyEach();
      score=score+100;
    }
    else if (DiamondsG.isTouching(boy)) {
      DiamondsG.destroyEach();
      score=score+200;
      
    }else if(JwelleryG.isTouching(boy)) {
      JwelleryG.destroyEach();
      score=score+150;
      
    }else{
      if(SwordGroup.isTouching(boy)) {
        SwordGroup.destroyEach();
        boy.destroy();
        
      
    
         gameState = end;
      
  }}
  }
  if(gameState === end){
      
     SwordGroup.setVelocityYEach(0);
    JwelleryG.setVelocityYEach(0);
     DiamondsG.setVelocityYEach(0);
     CashG.setVelocityYEach(0);
    SwordGroup.setLifetimeEach(-1);
     JwelleryG.setLifetimeEach(-1);
     DiamondsG.setLifetimeEach(-1);
     CashG.setLifetimeEach(-1);
  gameover.visible=true;
   path.velocityY=0;
  }

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  CashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  DiamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  JwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  SwordGroup.add(sword);
  }
}