var galazyImg, galazy;
var ufoImg, ufo;
var jetImg, jet, jetsGroup;
var laserImg, laser, lasersGroup;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var score = 0;

function preload(){
    galazyImg = loadImage("galazy.png");
    ufoImg = loadImage("ufo.png");
    jetImg = loadImage("jet.png");
    laserImg = loadImage("laser.png");
    jetsGroup = new Group();
    lasersGroup = new Group();
    invisibleBlockGroup = new Group();
}

function setup() {
    createCanvas(600,600);
    galazy = createSprite(300,300,);


    galazy.addImage("galazy",galazyImg);
    galazy.velocityY = 1;
    galazy.scale = 5;

    ufo = createSprite(200,200,50,50);
    ufo.scale = 0.3;
    ufo.addImage(ufoImg);
}

function draw() {
    background(galazyImg);
    
    if(gameState == "play"){

        if(galazy.y > 400){
            galazy.y = 300;
          }
        if(keyDown("left_arrow")){
            ufo.x = ufo.x -3;
        }
      
        if(keyDown("right_arrow")){
            ufo.x = ufo.x +3;
        }
      
        if(keyDown("space")){
            ufo.velocityY = -5;
        }
      
        if(jetsGroup.isTouching(ufo)){
            ufo.velocityY = 0;
        }
      
        if(invisibleBlockGroup.isTouching(ufo)||ufo.y>600){
            ufo.destroy();
            gameState = "end";
        }
      
          
          ufo.velocityY = ufo.velocityY +0.8;
      
          spawnJets();
      
          drawSprites();
        
          fill("#846dbf");
          textSize(17);
          text("score : " + score,500,50);
          score = score + Math.round(frameCount/150);
        
    }
     
      
        if(gameState == "end"){
          stroke("#b5c4ff");
          fill("#b5c4ff");
          textSize(30);
          text("game Over",230,250);
        }
      
}

function spawnJets(){
    if(frameCount%240==0){
        var jet = createSprite(200,-50);
        jet.addImage(jetImg);
        jet.scale = 0.2;
        var laser = createSprite(200,10);
        laser.addImage(laserImg);
        laser.scale = 0.08;
        var invisibleBlock = createSprite(200,15);
        invisibleBlock.width = 100;
        invisibleBlock.height = 2;
        jet.x = Math.round(random(120,400));
        jet.velocityY = 1;
        laser.x = jet.x;
        laser.velocityY = 1;
        invisibleBlock.x = jet.x;
        invisibleBlock.velocityY = 1;
        ufo.depth = jet.depth;
        ufo.depth += 1;
        laser.lifetime = 800;
        jet.lifetime = 800;
        jetsGroup.add(jet);
        lasersGroup.add(laser);
        invisibleBlock.debug = true;
        invisibleBlockGroup.add(invisibleBlock);
    }
}