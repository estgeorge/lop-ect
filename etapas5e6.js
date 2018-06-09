var word = {text:"", x:0, y:0, x1:0, y1:0, x2:0, y2:0, tipo:0}
var angle = [0, Math.PI/2, Math.PI, 3*Math.PI/2];
var bar = [];

function setup() 
{
	createCanvas(550, 500);
	frameRate(30);
	word.text = "GIRAFA";
	word.x = 275;
	word.y = 0;
	word.tipo = 3;	

	bar[0] = {x1:200, y1:420, x2:215, y2:499};	
    bar[1] = {x1:265, y1:420, x2:280, y2:499};	
}

function draw() 
{
    planodefundo();

	/*
	if (keyIsDown(LEFT_ARROW)) {
		word.x -= 20;
	}	
	if (keyIsDown(RIGHT_ARROW)) {
		word.x += 20;
	}	
	if (keyIsDown(UP_ARROW)) {
		word.tipo = (word.tipo+1)%4;
	}	
	*/
	word.y += 3;
	
    getCoord(word);	
	
	collision = false;
	for (i=0; i<2; i++) {
		if (word.x1 < bar[i].x2 && word.x2 > bar[i].x1 && word.y2 > bar[i].y1) {
			collision = true;
		}
	}	
	
	if (word.y2>500 || collision) {
		word.text = "GIRAFA";
		word.x = 250;
		word.y = 0;
		word.tipo = 3;		
	}

	for (i=0; i<2; i++) {
		rect(bar[i].x1,bar[i].y1,bar[i].x2-bar[i].x1,bar[i].y2-bar[i].y1);
	}
	rotateWord(word.text,word.x,word.y,angle[word.tipo]);
	
	return false; 
}


function keyPressed() {
    if (keyCode == UP_ARROW) {
		word.tipo = (word.tipo+1)%4;
	}
	else if (keyCode == LEFT_ARROW) {
		word.x -= 20;
	}
	else if (keyCode == RIGHT_ARROW) {	
		word.x += 20;	
	}	
    return false; 
}



function planodefundo() 
{
	background(180,197,223);
	push();
	fill(168, 187, 217);
	strokeWeight(5);
    stroke(105, 121, 165);
	line(404, 0, 404, 504);
	pop();
}

function getCoord(w) 
{
	var wWidth  = w.text.length*20;
	var wHeight = 20;
    if (w.tipo==0 || w.tipo==2) {
		w.x1 = w.x-wWidth/2;
		w.y1 = w.y-wHeight/2;
		w.x2 = w.x+wWidth/2;
		w.y2 = w.y+wHeight/2;		
	}
	else if (w.tipo==1 || w.tipo==3) {
		w.x1 = w.x-wHeight/2;
		w.y1 = w.y-wWidth/2;
		w.x2 = w.x+wHeight/2;
		w.y2 = w.y+wWidth/2;			
	}
	
}


function rotateWord(s,x,y,a) 
{
	var c, d, i;
	var wWidth  = s.length*20;
	var wHeight = 20;	
    push();
    translate(x,y);
    rotate(a);	
    for (i=0; i<s.length; i++) {
       rect(i*20-wWidth/2,-10,20,20);
	   c = s.charAt(i);
	   d = (20-textWidth(c))/2;
       text(c,i*20+d-wWidth/2,15-10);      
    }
    pop();
}


