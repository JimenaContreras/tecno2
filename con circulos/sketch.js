let canvasWidth = 800;
let canvasHeight = 800;

//amarillas
let customImage, customImage2;
let minDistance = 650;

let yellowPhaseTime = 3000; // Tiempo en milisegundos para la fase amarilla
let yellowPhaseActive = true;

//lilas
let lilas = [];

let lilacPhaseTime = 2000; // Tiempo en milisegundos para la fase lila
let lilacPhaseActive = false;

//celeste
let celestes;
let celestePhaseTime = 4000; // Tiempo en milisegundos para la fase celeste
let celestePhaseActive = false;

// Tiempo actual en milisegundos
let currentTime = 0;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  //amarillas
  customImage = new CustomImage(random(width), random(0, 400));
  customImage2 = new CustomImage(random(width), random(400, 800));

  //lilas
  let numLilas;
  if (random() < 0.15) { // 15% de las veces crear 3 elipses
    numLilas = 3;
  } else {
    numLilas = 2;
  }
  for (let i = 0; i < numLilas; i++) {
    let l = new Lila();
    while (l.checkOverlap()) {
      l = new Lila();
    }
    lilas.push(l);
  }

  //celeste
  celestes = new Celestes();

}

function draw() {
  background(255);
  // Actualizar el tiempo actual
  currentTime += deltaTime;

  // Fase amarilla
  if (yellowPhaseActive) {
    customImage.showImage();
    customImage.updatePosition();
    customImage2.showImage();
    customImage2.updatePosition();
    customImage.checkDistance(customImage2);

    // Verificar si ha pasado el tiempo de la fase amarilla
    if (currentTime >= yellowPhaseTime) {
      yellowPhaseActive = false;
      lilacPhaseActive = true;
      currentTime = 0; // Reiniciar el tiempo actual
    }
  }
  // Fase lila
  else if (lilacPhaseActive) {
    for (let l of lilas) {
      l.draw();
      l.actualizarPosicion();
    }

    // Verificar si ha pasado el tiempo de la fase lila
    if (currentTime >= lilacPhaseTime) {
      lilacPhaseActive = false;
      celestePhaseActive = true;
      currentTime = 0; // Reiniciar el tiempo actual
    }
  }
  // Fase celeste
  else if (celestePhaseActive) {
    celestes.moving = true; // Establecer la variable "moving" en true durante el turno de "celestes"
    celestes.dibujar();
    celestes.updatePosition();

    // Verificar si ha pasado el tiempo de la fase celeste
    if (currentTime >= celestePhaseTime) {
      celestePhaseActive = false;
      celestes.moving = false; // Establecer la variable "moving" en false después del turno de "celestes"
      currentTime = 0; // Reiniciar el tiempo actual
    }
  }
  // Mostrar todas las capas juntas en una posición fija
  else {
    customImage.showImage();
    customImage2.showImage();
    for (let l of lilas) {
      l.draw();
    }
    celestes.dibujar();
  }
}

function mouseMoved() {
  if (celestePhaseActive && celestes.moving) {
    celestes.updatePosition();
    celestes.checkDistances();
  }
}
