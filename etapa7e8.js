var word  = {text:"", cat:"", x:0, y:0, x1:0, y1:0, x2:0, y2:0, tipo:0}
var angle = [0, Math.PI/2, Math.PI, 3*Math.PI/2];
var bar   = [], words, cats;

var score, level;
var newLevel, endGame, yspeed;
var workWidth = 400;
var workheight = 500;


function setup() 
{
	createCanvas(550, 500);
	textFont('Helvetica');
	frameRate(30);
	score = 0;
	level = 1;
    newLevel = false; 
	endGame = false;	
	initializeCats();
	initializeWord();	
}


function initializeWord()
{
	if (words.length==0) {
		newLevel = true;
		return;
	}
	
	var r = getRndInteger(0, words.length-1);
	word.text = words[r].text;
	word.cat = words[r].cat; 
	word.x = 250;
	word.y = 0;
	word.tipo = getRndInteger(0, 3);	
	words.splice(r,1); // deleta a palavra para 
	                   // não ser usada novamente 
}


function initializeCats()
{
	var r, i, j, w, d;
		
	if (level == 1) {
	   r = [0,1];	
	   yspeed = 3; 
	} 
	else if (level == 2) {
	   r = [2,3,4];	
	   yspeed = 3; 	   
	}
	else if (level == 3) {
	   r = [5,6,7,8];
	   yspeed = 3; 		   
	}
	else if (level == 4) {
	   r = [0,1,2,3,8];	
	   yspeed = 3; 		   
	}
	else if (level == 5) {
	   r = [2,3,4,1,0];
	   yspeed = 5; 
	}	
	
    words = [];
    cats = []; 
	for (i=0; i<r.length; i++) {
	    w = easycat[r[i]]["words"];
		cats.push(easycat[r[i]]["title"]);
		for (j=0; j<w.length; j++) {
			words.push({"text":w[j].toUpperCase(), "cat":i});
		}
	}
	bar = [];
	d = (workWidth - cats.length*55+15)/2;
	for (i=0; i<=cats.length; i++) {
		bar[i] = {x1:d+55*i, y1:420, x2:d+15+55*i, y2:499};	
    }
	
}


function draw() 
{
	var success;
	
	if (endGame) {
		telafim();
		return;
	}
	
	if (newLevel) {
		level++;
		if (level <= 5) {
			initializeCats();
			initializeWord();
			newLevel = false;
		}
		else {
			endGame = true; 
		}
		return;		
	}
	
	planodefundo();
	
	initializeCoord(word);	
	
	if (keyIsDown(LEFT_ARROW) && word.x1>4) {
		word.x -= 5;
	}	
	if (keyIsDown(RIGHT_ARROW) && word.x2<400) {
		word.x += 5;
	}	
	if (keyIsDown(DOWN_ARROW)) {
		word.y += 30;
	}

	word.y += yspeed;
	
	initializeCoord(word);
		
	// detect collision
	for (i=0; i<bar.length; i++) {
		if (word.x1 < bar[i].x2 && word.x2 > bar[i].x1 && word.y2 > bar[i].y1) {
			initializeWord();
			return false;
		}
	}	
	
	if (word.y2>workheight) {
		
		success = false;
		if (word.x1 > bar[0].x2) {
			for (i=0; i<bar.length-1; i++) {
				if (word.x1 < bar[i+1].x1) {
					if (word.cat == i && word.tipo==1) {
						success = true;
						break;
					}
				}
			}	
        }		
        if (success) {
			score++;
		}
		
		initializeWord();	
	}

	rotateWord(word.text,word.x,word.y,angle[word.tipo]);		
	return false; 
}


function keyPressed() {
    if (keyCode == UP_ARROW) {
		tipo = word.tipo;
		word.tipo = (word.tipo+1)%4;
		initializeCoord(word);
		
		// verifica se pode rotacionar
		if (word.x1<4 || word.x2>400) {
			word.tipo = tipo;
		}	
	}	
	if (keyIsDown(RIGHT_ARROW) && word.x2<400) {
	}
    return false; 
}


function telafim() 
{
	background(180,197,223);
	textSize(50);
    text("FIM",230,250)
	textSize(30);	
	text("Pontos",228,350)
	text(score,265,390)
}


function planodefundo() 
{
	push();
	background(180,197,223);
	strokeWeight(5);
    stroke(105, 121, 165);
	line(404, 0, 404, 504);
	pop();
	boxText('Pontos',50,20,false);
	boxText(score,90,20,true);
	boxText('Nível',150,20,false);
	boxText(level,190,20,true);	
	
	for (i=0; i<bar.length; i++) {
		rect(bar[i].x1,bar[i].y1,bar[i].x2-bar[i].x1,bar[i].y2-bar[i].y1);
	}	
	for (i=0; i<cats.length; i++) {
		push()
		x = (bar[i].x2+bar[i+1].x1)/2+3;
		translate(x,490);
		rotate(3*PI/2);			
		text(cats[i],0,0);
        pop();
	}
	
}

function boxText(w,y,size,box) 
{
	push();
	textSize(size);
	var x = 400+(150-textWidth(w))/2;
	fill(206, 224, 245);
	stroke(105, 121, 165);
	if (box) {
		rect(425,y-32,100,50);
	}
	noStroke();
	fill(105, 121, 165);
	text(w,x,y);	
	pop();
}


function initializeCoord(w) 
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
	var wWidth  = s.length*21;
	var wHeight = 21;	
    push();
	textSize(15);
    translate(x,y);
    rotate(a);	
    for (i=0; i<s.length; i++) {
       rect(i*21-wWidth/2,-10,21,21);
	   c = s.charAt(i);
	   d = (21-textWidth(c))/2;
       text(c,i*21+d-wWidth/2,7);      
    }
    pop();
}

// This JavaScript function returns a random number 
// between min and max (both included):
function getRndInteger(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}


