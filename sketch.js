
var mario, marioRSImg, marioLRImg, marioRRImg, marioLSImg, fireball, fireballG, fireballImg;
var iG, ground, groundImg, ground2, ground3, groundG, ground4;
var gameState = "play";
var moving, lava, score = 0;
var mushroom, mushroomImg, mushroomG;

var lives = 2;

var mushroomTouch = false;
var fireballTouch = false;


function preload(){
  marioRSImg = loadAnimation("th.png");
  marioLSImg = loadAnimation("th (3).png");
  marioRRImg = loadAnimation("th (2).png", "th (1).png");
  marioLRImg = loadAnimation("th (2) (1).png", "th (1) (1).png");
  groundImg = loadImage("groundd.png");
  fireballImg = loadImage("Fireball.png");
  mushroomImg = loadImage("mushroom.png");
  
}

function setup() {
  createCanvas(700, 600);
  mario = createSprite(300,400);

  
  mario.scale = 0.4;
  
  

  ground = createSprite(100,565);
  ground.scale = 0.5;
  ground.addImage("Ground", groundImg);
  ground2 = createSprite(300,565);
  ground2.scale = 0.5;
  ground2.addImage("Ground", groundImg);
  ground3 = createSprite(500,565);
  ground3.scale = 0.5;
  ground3.addImage("Ground", groundImg);
  ground4 = createSprite(700,565);
  ground4.scale = 0.5;
  ground4.addImage("Ground", groundImg);
  iG = createSprite(300, 550,800000000000000000,50);
  iG.visible = false;
  iG.debug = true;
  lava = createSprite(100,300,200,600);
  lava.shapeColor = "red";

  fireballG = new Group();
  mushroomG = new Group();
  

  mario.setCollider("rectangle", -75, 20, 100, 180);
  mario.addAnimation("MarioRunning", marioRSImg);
  

}

function draw() {
  background(0);

  if(mario.isTouching(iG)){
    mario.velocityY = -0.5;
  }
  if(gameState === "play"){

    
    ground.velocityX = -5;
    ground2.velocityX = -5;
    ground3.velocityX = -5;
    ground4.velocityX = -5;
    if(mario.y >= 480 ){
    mario.velocityX = -5;
    }
    else{
      mario.velocityX = 0;
    }

    var obstacle = Math.floor(Math.random() *3);
    console.log(obstacle);
  
    if (World.frameCount % 150 == 0) {
      if (obstacle == 1) {
        spawnFireball();
        
      }
      if (obstacle == 2) {
        spawnMushroom();
        
      } 
      if (obstacle == 3) {
        
      }
    }
    if(mario.isTouching(lava)){
      lives -= 1;
      mario.x = 400
    }
    if(fireballG.isTouching(mario)){
      if(!fireballTouch){
        lives -= 1;
        fireballTouch = true;
      }
      setTimeout(() => {
        fireballTouch = false;
      }, 3000);
      fireball.destroy();
    }
    if(mushroomG.isTouching(mario)){
      if(!mushroomTouch){
        lives += 1;
        mushroomTouch = true;
      }
      setTimeout(() => {
        mushroomTouch = false;
      }, 3000);
      mushroom.destroy();
    }
    score = score + Math.round(getFrameRate()/50);
    
    textSize(20);
    fill(255);
    text("Score: "+ score,500,30);
    text("Lives:"+ lives, 500, 50 );
    if(lives == 0){
      gameState = "end";
    }

      

  


  if(keyDown(RIGHT_ARROW) || keyDown("d")){
    mario.addAnimation("MarioRunning", marioRRImg);
    if(mario.y >= 480 ){
      mario.x += 9;
    }
    else{
      mario.x += 5;
    }
    
    moving = true;
    
  }
  else{
    
  }
  if(keyDown(LEFT_ARROW) || keyDown("a")){
    mario.addAnimation("MarioRunning", marioLRImg);
    mario.x -= 3;
    moving = true;
    
    
    
  }
  if(keyDown(DOWN_ARROW)){
    moving = false;
    mario.addAnimation("MarioRunning", marioRSImg);
    
  }


  if(ground.x <= 100)
  {
    ground.x = 800;
  }
  if(ground2.x <=100){
    ground2.x = 800;
  }
  if(ground3.x <=100){
    ground3.x = 800;
  }
  if(ground4.x <=100){
    ground4.x = 800;
  }
  
  
  if(keyDown("space") && mario.y >= 480){
    mario.velocityY = -10;
  }
  mario.velocityY += 0.5;

  

  







    
 }
 if(gameState === "end"){
  mario.addAnimation("MarioRunning", marioRSImg);
  textSize(75);
  fill(255);
  text("Game Over", 250,200);
  ground.velocityX = 0;
  ground4.velocityX = 0;
  ground3.velocityX = 0;
  ground2.velocityX = 0;
  textSize(50)
  text("Final score: "+ score,250,300);
  text("Press Up to restart",250,400);
  if(keyDown(UP_ARROW)){
    reset();
  }
  

}
 drawSprites(); 
   
 
}

function spawnFireball(){
  fireball =createSprite(600,500);
  fireball.scale =0.4;
  fireball.velocityX = -6;
  fireball.addAnimation("fireball", fireballImg);
  fireball.setLifetime=170;
  fireballG.add(fireball);
}
function spawnMushroom(){
  mushroom =createSprite(600,500);
  mushroom.scale =0.05;
  mushroom.velocityX = -6;
  mushroom.addAnimation("mushroom", mushroomImg);
  mushroom.setLifetime=170;
  mushroomG.add(mushroom)
}

function reset(){
  gameState = "play";
  mario.x = 400;
 
  
  
  score = 0;
  lives = 2;
 }



