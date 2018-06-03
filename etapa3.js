var x, y, x0, y0, naTela;

function setup() 
{
	createCanvas(400, 400);
	frameRate(30);
	x = 100;
	y = 100;
	dirX = random([-1,1]);
	if (dirX == 1) {
		xo = 0;
	}
	else {
		xo = 400;
	}
	yo = random(20,380);   
	naTela = true;
}

function draw() 
{
	background(200);

	fill(255, 255, 255);
	ellipse(350, 90, 20, 20);

	if (keyIsDown(LEFT_ARROW))
		x-=5;

	if (keyIsDown(RIGHT_ARROW))
		x+=5;

	if (keyIsDown(UP_ARROW))
		y-=5;

	if (keyIsDown(DOWN_ARROW))
		y+=5; 
  
	fill(255, 255, 255);  
	rect(x, y, 20, 20);

	if (naTela) {
		xo += dirX*15;
	} 
	else {
		dirX = random([-1,1]);
		if (dirX == 1) {
			xo = 0;
		}
		else {
			xo = 400;
		}
		yo = random(20,380); 
		naTela = true;
	}
  
	if (xo > width || xo < 0) {
		naTela = false;
	}
  
	fill(150, 150, 0);
	ellipse(xo,yo,40,40);  
  
}
