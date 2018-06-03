var x, y, x0, y0, noPulo, a, b;
var d = 40;   // distância do pulo
var h = 60;   // altura do pulo	

function setup() 
{
	createCanvas(400, 400);
	frameRate(30);
	x = 100;
	y = 379;
	a = -4*h/(d*d);
	b = 4*h/d;	 
	noPulo = false;
}

function draw() 
{
	background(200);

	fill(255, 255, 255);
	ellipse(350, 90, 20, 20);
	
	text("Pulo para direita: SETA P/ DIREITA + BARRA DE ESPAÇO",20,20)
	text("Pulo para esquerda: SETA P/ ESQUERDA + BARRA DE ESPAÇO",20,40)
	
	if (noPulo) {		
		if (dirX==1) {
			x += 3;
			yy = a*(x-x0)*(x-x0)+b*(x-x0);
			y = 366-yy;
			if (x > x0+d) {
				noPulo = false;
			}	
		}
		if (dirX==-1) {
			x -= 3;
			yy = a*(x-x0+d)*(x-x0+d)+b*(x-x0+d);
			y = 366-yy;
			if (x < x0-d) {
				noPulo = false;
			}				
		}
	} 	
    else {
		dirX = 0;
		if (keyIsDown(LEFT_ARROW)) {
			dirX = -1;
			x -= 3;
		}	
		if (keyIsDown(RIGHT_ARROW)) {
			dirX = 1;
			x += 3;
		}	
    }
	
	fill(255, 255, 255);  
	rect(x, y, 20, 20);	
}

function keyPressed() {
  if (!noPulo && keyCode === 32 && dirX != 0) {
	noPulo = true;
	x0 = x;
	y0 = y;
  } 
  return false; 
}
