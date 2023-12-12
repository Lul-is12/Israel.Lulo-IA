var w = 800;
var h = 400;
var jugador;
var fondo;

var bala,
  balaD = false,
  nave;

var salto;
var menu;

var izquierda;
var derecha;

var velocidadBala;
var distB1X;
var distB2X;
var despB2X;
var distB2Y;
var isFalling = true;
var estatusSalto;
var estatusAdelante;

var moveBack = 0;
var waitFor = 0;
var waitFall = 0;

var nnNetwork,
  nnEntrenamiento,
  nnSalida,
  datosEntrenamiento = [];
var modoAuto = false,
  eCompleto = false;

var juego = new Phaser.Game(w, h, Phaser.CANVAS, "", {
  preload: preload,
  create: create,
  update: update,
  render: render,
});

function preload() {
  juego.load.image("fondo", "assets/game/fondo.jpg");
  juego.load.spritesheet("mono", "assets/sprites/altair.png", 32, 48);
  juego.load.image("nave", "assets/game/ufo.png");
  juego.load.image("bala", "assets/sprites/purple_ball.png");
  juego.load.image("menu", "assets/game/menu.png");
}

function create() {
  juego.physics.startSystem(Phaser.Physics.ARCADE);
  juego.physics.arcade.gravity.y = 800;
  juego.time.desiredFps = 30;

  fondo = juego.add.tileSprite(0, 0, w, h, "fondo");
  nave = juego.add.sprite(w - 100, h - 70, "nave");
  nave1 = juego.add.sprite(w - 790, h - 400, "nave");
  bala = juego.add.sprite(w - 100, h, "bala");
  balaFall = juego.add.sprite(50, h - 350, "bala");
  jugador = juego.add.sprite(50, h, "mono");

  juego.physics.enable(jugador);
  jugador.body.collideWorldBounds = true;
  var corre = jugador.animations.add("corre", [8, 9, 10, 11]);
  jugador.animations.play("corre", 10, true);

  juego.physics.enable(bala);
  juego.physics.enable(balaFall);
  bala.body.collideWorldBounds = true;
  balaFall.body.collideWorldBounds = true;

  izquierda = juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
  derecha = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

  pausaL = juego.add.text(w - 100, 20, "Pausa", {
    font: "20px Arial",
    fill: "#fff",
  });
  pausaL.inputEnabled = true;
  pausaL.events.onInputUp.add(pausa, self);
  juego.input.onDown.add(mPausa, self);

  salto = juego.input.keyboard.addKey(Phaser.Keyboard.UP);

  nnNetwork = new synaptic.Architect.Perceptron(5, 15, 15, 2);
  nnEntrenamiento = new synaptic.Trainer(nnNetwork);
}

function enRedNeural() {
  nnEntrenamiento.train(datosEntrenamiento, {
    rate: 0.0003,
    iterations: 10000,
    shuffle: true,
  });
}

function datosDeEntrenamiento(param_entrada) {
  console.log(
    "Entradas: ",
      param_entrada[0] +
      " " +
      param_entrada[1] +
      " " +
      param_entrada[2] +
      " " +
      param_entrada[3] +
      " " +
      param_entrada[4]
  );
  nnSalida = nnNetwork.activate(param_entrada);
  var salto = Math.round(nnSalida[0] * 100);
  var adelante = Math.round(nnSalida[1] * 100);
  console.log("Valor ", "En el Aire %: " + salto);
  console.log("Valor ", "Caminando %: " + adelante);
  var salidas = [];
  salidas[0] = nnSalida[0];
  salidas[1] = nnSalida[1];
  return salidas;
}

function pausa() {
  juego.paused = true;
  menu = juego.add.sprite(w / 2, h / 2, "menu");
  menu.anchor.setTo(0.5, 0.5);
}

function mPausa(event) {
  if (juego.paused) {
    var menu_x1 = w / 2 - 270 / 2,
      menu_x2 = w / 2 + 270 / 2,
      menu_y1 = h / 2 - 180 / 2,
      menu_y2 = h / 2 + 180 / 2;

    var mouse_x = event.x,
      mouse_y = event.y;

    if (
      mouse_x > menu_x1 &&
      mouse_x < menu_x2 &&
      mouse_y > menu_y1 &&
      mouse_y < menu_y2
    ) {
      if (
        mouse_x >= menu_x1 &&
        mouse_x <= menu_x2 &&
        mouse_y >= menu_y1 &&
        mouse_y <= menu_y1 + 90
      ) {
        eCompleto = false;
        datosEntrenamiento = [];
        modoAuto = false;
      } else if (
        mouse_x >= menu_x1 &&
        mouse_x <= menu_x2 &&
        mouse_y >= menu_y1 + 90 &&
        mouse_y <= menu_y2
      ) {
        if (!eCompleto) {
          console.log(
            "",
            "Datos del entrenamiento con " +
              datosEntrenamiento.length +
              " valores"
          );
          enRedNeural();
          eCompleto = true;
        }
        modoAuto = true;
      }
      restart();
      menu.destroy();
      juego.paused = false;
    }
  }
}

function restart(){
  jugador.position.y = h;
  jugador.position.x = 50;
  var pp = jugador.position.x = 50;
  resetFall(pp);
  resetVariables();
}

function resetVariables() {
  bala.position.x = w - 100;
  bala.position.y = h;
  bala.body.velocity.x = 0;
  jugador.body.velocity.x = 0;
  jugador.body.velocity.y = 0;
  //   jugador.position.x = 50;
  balaD = false;
}

function resetFall(playerPosX) {
  balaFall.position.x = playerPosX;
  balaFall.position.y = h - 350;
  balaFall.body.velocity.y = velocidadRandom(10, 20);
  waitFall++;
  if (waitFall > waitFor) {
    isFalling = true;
    waitFall = 0;
    waitFor = velocidadRandom(20, 50);
  }
}

function saltar() {
  jugador.body.velocity.y = -300;
}

function update() {
  fondo.tilePosition.x -= 1;

  juego.physics.arcade.collide(bala, jugador, colisionH, null, this);
  juego.physics.arcade.collide(balaFall, jugador, colisionH, null, this);
  estatusSalto = 0;
  estatusAdelante = 0;

  if (!jugador.body.onFloor()) {
    estatusSalto = 1;
  }

  distB1X = Math.floor(jugador.position.x - bala.position.x);
  distB2X = Math.floor(jugador.position.y - balaFall.position.y);
  despB2X = Math.floor(balaFall.position.x);
  distB2Y = Math.floor(jugador.position.x - balaFall.position.x);

  if (!isFalling) {
    resetFall(jugador.position.x);
  }
  nave1.position.x = jugador.position.x - 50;
  nave1.position.y = h - 400;

  if (modoAuto == false && derecha.isDown) {
    jugador.body.velocity.x = 200;
    estatusAdelante = 1;
    moveBack++;
  } else if (modoAuto == false && moveBack > 0) {
    jugador.body.velocity.x = -200;
    moveBack--;
  } else if (modoAuto == false) {
    jugador.body.velocity.x = 0;
  } else {
    if (modoAuto == true) {
      console.log("DATOS MODO AUTOMATICO")
      var bot = datosDeEntrenamiento([
        distB1X,
        velocidadBala,
        distB2X,
        distB2Y,
        despB2X,
      ]);
      if (bot[0] > 0.5 && jugador.body.onFloor()) {
        saltar();
      }
      if (Math.abs(bot[1]) > 0.5 || Math.abs(bot[4]) == jugador.position.x) {
        jugador.body.velocity.x = 200;
        moveBack++;
        console.log("Adelante: ", moveBack);
      } else if (moveBack > 0) {
        jugador.body.velocity.x = -200;
        moveBack--;
        console.log("Atras: ", moveBack);
      } else {
        jugador.body.velocity.x = 0;
        console.log("Atras: ", moveBack);
      }
    }
  }

  if (modoAuto == false && salto.isDown && jugador.body.onFloor()) {
    saltar();
  }

  if (balaD == false) {
    disparo();
  }

  if (bala.position.x <= 0) {
    resetVariables();
  }

  if (balaFall.body.onFloor()) {
    isFalling = false;
  }

  if (modoAuto == false && bala.position.x > 0) {
    datosEntrenamiento.push({
      input: [distB1X, velocidadBala, distB2X, distB2Y, despB2X],
      output: [estatusSalto, estatusAdelante],
    });

    console.log("ENTRADAS -> distB1X: " + distB1X + 
                          ", velBala: " + velocidadBala +
                          ", distB2X: " + distB2X +
                          ", distB2Y: " + distB2Y +
                          ", despB2X: " + despB2X );
    console.log("SALIDAS -> Estatus Aire: "+ estatusSalto+", Estatus adelante: "+ estatusAdelante);
  }
}

function disparo() {
  velocidadBala = -1 * velocidadRandom(300, 600);
  bala.body.velocity.y = 0;
  bala.body.velocity.x = velocidadBala;
  balaD = true;
}

function colisionH() {
  pausa();
}

function velocidadRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function render() {}
