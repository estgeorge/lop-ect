var x = 100;
var y = 100;

function setup() {
  createCanvas(400, 400);
  frameRate(30);
}

function draw() {
  
  background(200);
  ellipse(350, 90, 20, 20);
  
  if (keyIsDown(LEFT_ARROW))
    x-=5;

  if (keyIsDown(RIGHT_ARROW))
    x+=5;

  if (keyIsDown(UP_ARROW))
    y-=5;

  if (keyIsDown(DOWN_ARROW))
    y+=5; 
  
  rect(x, y, 20, 20);
  
}
