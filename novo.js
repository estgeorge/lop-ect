var tela = 1
var imgInicio;
var imgCenario;
var imgFogo;
var xtela = 250
var ytela = 300
var xtelaneve = 250
var ytelaneve = 300
var xtelaover = 250
var ytelaover = 300
var raioF = 5
var raioO = 30

var imgsdrag = [];
var imgsZumbi = [];
var contFrame = 0;
var contFrameZumb = [];

var colisao = false;

var nivel = 1;
var pontos = 0;
var limitepontos = 2000;
var velo = 1;
var record = 0;

var disparo = false;
var xdisp, ydisp;

var posxZumb = [];
var posyZumb = [];

var posx;
var posy;

var posxInit = [50,100,150,200,250,300,400];
var posyInit = [-1000,-10,-3000,-200,-30,-60,10];



var nZumb = 7;  // numero de zumbis

function preload() {
    imgInicio = loadImage('tela2.png');
    imgCenario = loadImage('neve1.png');
    imgGameover = loadImage('over.png');
    imgFogo = loadImage('fogo1.png');
    somInicio = loadSound('house.mp3')
    somMeio = loadSound('got.mp3')
    for (j = 0; j < 11; j++) {
        imgsZumbi[j] = loadImage("vagante" + j + ".png")
    }
    for (i = 0; i < 13; i++) {
        imgsdrag[i] = loadImage("dragao" + i + ".png");
    }
}


function setup() {
    frameRate(30);
    createCanvas(500, 600);
    posx = 250
    xdisp = posx;
    posy = 550
    ydisp = posy;
    vida = 5;
    somInicio.loop();
    for (i = 0; i < nZumb; i++) {
        contFrameZumb[i] = 0;
        posxZumb[i] = posxInit[i]; // random(50, 400);
        posyZumb[i] = posyInit[i]; // random(-200, -10);
        
    }
}

function draw() {

    background(0);


    if (tela == 1) {
        image(imgInicio, xtela, ytela)
        imageMode(CENTER)
        if (keyIsDown(ENTER)) {
            tela = 2
            somInicio.stop()
            somMeio.loop()
        }
    }

    if (tela == 2) {
        background(0);
        image(imgCenario, xtelaneve, ytelaneve)

        textSize(24);
        fill(135, 206, 235);
        text("Nivel: " + nivel, 30, 50);
        text("Pontos: " + pontos, 180, 50);
        text("Vidas: " + vida, 370, 50);
        pontos = pontos + 10;

        if (pontos > limitepontos) {
            nivel++;
            limitepontos = limitepontos + 2000;
            velo = velo + 1;
            if (vida < 5) {
                vida = vida + 1;
            }
        }

        if (keyIsDown(LEFT_ARROW))
            posx = posx - 15;

        if (keyIsDown(RIGHT_ARROW))
            posx = posx + 15;

        if (keyIsDown(UP_ARROW))
            posy = posy - 8;

        if (keyIsDown(DOWN_ARROW))
            posy = posy + 8;

        for (i = 0; i < nZumb; i++) {
            if (posyZumb[i] < 600) {
                posyZumb[i] = posyZumb[i] + velo;
            } else {
                posxZumb[i] = posxInit[i]; // random(50, 400);
                posyZumb[i] = posyInit[i]; // random(-200, -10);
                vida = vida - 1;
            }
        }

        if (keyIsDown(CONTROL) && disparo == false) {
            xdisp = posx;
            ydisp = posy;
            disparo = true;
        }


        if (disparo) {
            ellipse(xdisp, ydisp - 50, 2 * raioF, 2 * raioF);
            image(imgFogo, xdisp, ydisp - 50)
            ydisp = ydisp - 40
        }
      
        if (ydisp < 0) {
            disparo = false
        }

        for (i = 0; i < nZumb; i++) {
            if (dist(xdisp, ydisp, posxZumb[i], posyZumb[i]) < raioO + raioF) {
                posxZumb[i] = random(50, 400);
                posyZumb[i] = random(-2000, -10);
                colisao = true;
                disparo = false;
            } else {
                colisao = false;
            }
        }

        imageMode(CENTER);
        for (i = 0; i < nZumb; i++) {
            anima = imgsZumbi[contFrameZumb[i]]
            image(anima, posxZumb[i], posyZumb[i], 110, 90);
            contFrameZumb[i]++;
            if (contFrameZumb[i] > 10) {
                contFrameZumb[i] = 0;
            }
        }
        image(imgsdrag[contFrame], posx, posy, 200, 128);
        contFrame++;
        if (contFrame > 12) {
            contFrame = 0;
        }

        if (vida < 1) {
            tela = 3
        }

    }

    if (tela == 3) {
        image(imgGameover, xtelaover, ytelaover);
        somMeio.stop();
        if (pontos > record) {
            record = pontos;
        }

        text("Pontuação Máxima: " + record, 50, 70);
        if (keyIsDown(ENTER)) {
            pontos = 0;
            limitepontos = 1000;
            velo = 1;
            nivel = 1;
            vida = 5;
            tela = 1;
        }
    }

}
