

function setup() 
{
	createCanvas(400, 400);
	frameRate(30);

  
}

function draw() 
{
	background(200);

    drawword("GIRAFA",200,50,PI);
    drawword("AZUL",300,200,PI/2);

}

function drawword(w,x,y,a) 
{
   push()
   translate(x,y);
   rotate(a)
   for (i=0; i<w.length; i++) {
      rect(i*20,0,20,20)
      text(w.charAt(i),5+i*20,15);         
   }
   pop()
}
