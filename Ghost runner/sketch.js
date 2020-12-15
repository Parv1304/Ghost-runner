var tower,tower_i;
var ghost,ghost_s,ghost_j;
var door,door_i,doorGrp;
var climber,climber_i,climberGrp;
var iGround,iGroundGrp;
var START=1;
var END=0;
var gamestate=START;
var spooky;
function preload()
{
  tower_i=loadImage("tower.png");
  ghost_s=loadImage("ghost-standing.png");
  door_i=loadImage("door.png");
  climber_i=loadImage("climber.png");
  ghost_j=loadImage("ghost-jumping.png");
  spooky=loadSound("spooky.wav");
}
function setup()
{
  createCanvas(600,600);
  tower=createSprite(300,300,600,600);
  tower.addImage("tower",tower_i);
  tower.velocityY=3;
  ghost=createSprite(300,300,50,50);
  ghost.addImage("ghost",ghost_s);
  ghost.scale=0.4;
  doorGrp=new Group();
  climberGrp=new Group();
  iGroundGrp=new Group();                               
}
function draw()
{
  if(gamestate==1)
    {
      spooky.loop();
       if(keyDown("space"))
        {
          ghost.velocityY=-3;
          ghost.changeImage("ghost",ghost_j);
        }
      ghost.velocityY=ghost.velocityY+0.8;
      if(keyDown("left_arrow"))
        {
          ghost.x-=4;
        }
      if(keyDown("right_arrow"))
        {
          ghost.x+=4;
        }
      if(ghost.isTouching(climberGrp))
        {
          ghost.velocityY=0;
        }
      if(ghost.isTouching(iGroundGrp)||ghost.y>600)
        {
          gamestate=0;
          ghost.destroy();
        }
      doors();
    }
  if(tower.y>625)
      tower.y=tower.height/2;
  drawSprites();
    if(gamestate==0)
    {
      textSize(50);
      fill("white");
      text("Game Over",180,300);
    }
}
function doors()
{
  var r=Math.round(random(100,500))
  if(frameCount%180==0)
    {
      door=createSprite(r,0,50,50);
      door.addImage("door",door_i);
      door.velocityY=2;
      climber=createSprite(door.x,50,50,50);
      climber.addImage("climber",climber_i);
      climber.velocityY=2;
      ghost.depth=door.depth+1;
      ghost.depth=climber.depth+1;
      doorGrp.add(door);
      climberGrp.add(climber);
      iGround=createSprite(climber.x,55,75,10);
      iGround.velocityY=2;
      iGround.visible=false;
      iGroundGrp.add(iGround);
    }
}