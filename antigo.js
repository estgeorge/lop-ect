var tela=1
var imgInicio;
var imgCenario;
var imgFogo;
var xtela=250
var ytela=300
var xtelaneve=250
var ytelaneve=300
var xtelaover=250
var ytelaover=300
var raioF=5
var raioO=30


var anima;
var anima1;
var anima2;
var anima3;
var anima4;
var anima5;
var anima6;
var anima8;

var imgsdrag = [];
var imgsZumbi = [];
var contFrame = 0;
var contFrame1 = 0; 
var contFrame2 = 0; 
var contFrame3 = 0;
var contFrame4 = 0; 
var contFrame5 = 0; 
var contFrame6 = 0;
var contFrame8 = 0; 

var colisao = false; 

var nivel = 1;
var pontos = 0;
var limitepontos = 2000;
var velo = 1;
var record = 0;


var disparo = false; 
var xdisp, ydisp;

 var posx1=50
 var posy1=-1000
 var posx2=100
 var posy2=-10
 var posx3=150
 var posy3=-3000
 var posx4=200
 var posy4=-200
 var posx5=250
 var posy5=-30
 var posx6=300
 var posy6=-60
 var posx8=400
 var posy8=10


function preload() { 
  imgInicio = loadImage('tela2.png');
  imgCenario = loadImage('neve1.png');
  imgGameover = loadImage('over.png');
  imgFogo = loadImage('fogo1.png');
  somInicio = loadSound('house.mp3')
  somMeio = loadSound('got.mp3')
 for(j=0;j<11;j++){
    imgsZumbi[j] = loadImage("vagante"+j+".png")} 

  for (i = 0; i < 13; i++) {
    imgsdrag[i] = loadImage("dragao"+i+".png");}}


function setup() {
 frameRate(30);    
  createCanvas(500, 600); 
  posx=250
  xdisp = posx;
  posy=550
  ydisp = posy;
  vida=5  
  somInicio.loop()}
  
function draw() {
  background(0); 
 
     
  if(tela==1){
    image(imgInicio,xtela,ytela)
    imageMode(CENTER)
     if(keyIsDown(ENTER)){
      tela=2
      somInicio.stop()
      somMeio.loop()}
  }
  
    
  if(tela==2){
    background(0);
     image(imgCenario,xtelaneve,ytelaneve)
    
   
  textSize(24);
  fill(135,206,235);
  text("Nivel: "+nivel, 30, 50);
  text("Pontos: "+pontos, 180, 50);
  text("Vidas: "+vida, 370, 50);
  pontos = pontos + 10;
    
  if (pontos > limitepontos) {
    nivel++;
    limitepontos = limitepontos+2000;
    velo = velo + 1;
    if (vida < 5){
    vida = vida+1;
    }
  }
   

 if (nivel > 0) {
      if (posx>500) { 
       posx= 499}
      if (posx<0) {
       posx=1}
      if (posy>600) {
       posy= 599}
      if (posy<0) {
       posy= 1}   
  

  if (keyIsDown(LEFT_ARROW))
   posx= posx - 15;

  if (keyIsDown(RIGHT_ARROW))
    posx = posx + 15;

  if (keyIsDown(UP_ARROW))
    posy = posy - 8;

  if (keyIsDown(DOWN_ARROW))
    posy = posy + 8;           
  
    

if (posy1<600) {
  posy1 = posy1+velo
} else {
  posy1 = -1000
  vida = vida-1;
}

if (posy2<600) {
  posy2 = posy2+velo
} else {
  posy2 = -2000
  vida = vida-1;
}

if (posy3<600) {
  posy3 = posy3+velo
} else {
  posy3 = -3000
  vida = vida-1;
}

if (posy4<600) {
  posy4 = posy4+velo
} else {
  posy4 = -2000
  vida = vida-1;
}
  if (posy5<600) {
  posy5 = posy5+velo
} else {
  posy5 = -3000
  vida = vida-1;
}
   if (posy6<600) {
  posy6 = posy6+velo
} else {
  posy6 = -1500
  vida = vida-1;
}
  
   if (posy8<600) {
  posy8 = posy8+velo
} else {
  posy8 = -1500
  vida = vida-1;
}
  

  
  if (keyIsDown(CONTROL) && disparo == false  ){ 
     
    xdisp = posx;
    ydisp = posy;
    disparo = true;
  }
   
  if (disparo) {
    ydisp = ydisp -20;
  
  }
  
   
  if (disparo == true) {
    ellipse(xdisp,ydisp-50,2*raioF,2*raioF);
     image(imgFogo,xdisp,ydisp-50)
    ydisp=ydisp-20
  }  
    if(ydisp < 0){
   disparo = false 
  }
  

if ( dist(xdisp,ydisp,posx1,posy1) < raioO+raioF)
       posy1 = -1000
       colisao = true;
 }
    else {
    colisao = false;  
         }
 
  
if ( dist(xdisp,ydisp,posx2,posy2) < 30 ) {
       posy2 = -1500
      colisao = true; 
 }
    else {
    colisao = false;  
         }
  
if ( dist(xdisp,ydisp,posx3,posy3) < 30 ) {
       posy3 = -2000
       colisao = true; 
 }
    else {
    colisao = false;  
         }
 
  
if ( dist(xdisp,ydisp,posx4,posy4) < 30 ) {
       posy4 = -200
       colisao = true; 
 }
    else {
    colisao = false;  
         }
   if ( dist(xdisp,ydisp,posx5,posy5) < 30 ) {
       posy5 = -300
       colisao = true; 
 }
    else {
    colisao = false;  
         }
if ( dist(xdisp,ydisp,posx6,posy6) < 30 ) {
       posy6 = -60
       colisao = true; 
 }
    else {
    colisao = false;  
         }

if ( dist(xdisp,ydisp,posx8,posy8) < 30 ) {
       posy8 = -40
       colisao = true; 
 }
    else {
    colisao = false;  
         }
  anima1 = imgsZumbi[contFrame1];
  image(anima1, posx1, posy1, 110, 90);
  imageMode(CENTER);
  contFrame1++;
  if ( contFrame1 > 10) {
     contFrame1 = 0;  
  }
   anima2 = imgsZumbi[contFrame2];
  image(anima2, posx2, posy2, 110, 90);
  imageMode(CENTER);
  contFrame2++;
  if ( contFrame2 > 10) {
     contFrame2 = 0;  
  }
    anima3 = imgsZumbi[contFrame3];
  image(anima3, posx3, posy3, 110, 90);
  imageMode(CENTER);
  contFrame3++;
  if ( contFrame3 > 10) {
     contFrame3 = 0;  
  }
    anima4 = imgsZumbi[contFrame4];
  image(anima4, posx4, posy4, 110, 90);
  imageMode(CENTER);
  contFrame4++;
  if ( contFrame4 > 10) {
     contFrame4 = 0;  
  }
  anima5 = imgsZumbi[contFrame5];
  image(anima5, posx5, posy5, 110, 90);
  imageMode(CENTER);
  contFrame5++;
  if ( contFrame5 > 10) {
     contFrame5 = 0;  
  }
    anima6= imgsZumbi[contFrame6];
  image(anima6, posx6, posy6, 110, 90);
  imageMode(CENTER);
  contFrame6++;
  if ( contFrame6 > 10) {
     contFrame6 = 0;  
  }
    
    anima8= imgsZumbi[contFrame8];
  image(anima8, posx8, posy8, 110, 90);
  imageMode(CENTER);
  contFrame8++;
  if ( contFrame8 > 10) {
     contFrame8 = 0;  
  }
  
    anima = imgsdrag[contFrame];
  image( anima, posx, posy, 200, 128);
  imageMode(CENTER);
  contFrame++;
  if ( contFrame > 12 ) {
     contFrame = 0;  
  }
    
 }

   if (vida<1) {
      tela=3
   }
     
  if (tela==3) {
      image(imgGameover, xtelaover, ytelaover);
    somMeio.stop();
    if(pontos>record) {
      record = pontos;
      }

    text("Pontuação Máxima: "+record, 50, 70);
    if(keyIsDown(ENTER)){
     pontos=0;
      limitepontos=1000;
      velo=1;
        nivel = 1;
        vida = 5;
        tela = 1;
       }
  }
  
    
 }
 

 
