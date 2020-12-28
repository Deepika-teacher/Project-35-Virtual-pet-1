var dog,happyDog,database,foodStock,foodS;

function preload()
{
  dogImage=loadImage("images/dogImg.png");
  dogHappyImage=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();

  dog=createSprite(250,300);
  dog.addImage(dogImage);
   dog.scale=0.3;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(255);

  if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappyImage)
  }
  // if(keyWentDown(UP_ARROW)){
  //   writeStock(foodS);
  //   dog.addImage(dogImage)
  // }

  drawSprites();

  textSize(24);
  fill(0);
  text("Food Remaining : "+foodS,150,100);
  text("NOTE:Press up arrow key to feed drago Milk!!!",10,450);

}


function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x-=1;
  }

  database.ref('/').update({
    Food : x
  })
}
