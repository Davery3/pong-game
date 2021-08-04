var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 10;
var ballY = 50;
var ballSpeedY = 5;
var paddle1Y = 250;
var paddle2Y = 250;
var player1Score = 0;
var player2Score = 0;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;
var framesPerSecond = 30;
var middleLineThickness = 8;

function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
}

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  drawStartScreen();
}

function runGame() {
  moveEverything();
  drawEverything();
}

function runGameWithInterval() {
  setInterval(runGame, 1000/framesPerSecond);
  //Hooking mouse position to paddle
  canvas.addEventListener('mousemove', function(evt) {
    var mousePos = calculateMousePos(evt);
    paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
  })
  //remove start button after click
  document.getElementById("menu").remove();
}

function ballReset() {
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width/2;
  bally = canvas.height/2;
}

function computerMovement() {
  paddle2Y = ballY;
}

function moveEverything() {
  computerMovement();
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT){
      ballSpeedX = -ballSpeedX;
    } else {
      ballReset();
      player2Score++;
    }
  }
  if (ballX > canvas.width) {
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT){
      ballSpeedX = -ballSpeedX;
    } else {
      ballReset();
      player1Score++;
    }
  }
  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
}

function drawStartScreen() {
  //Makes Black Square Background
  colorRect(0, 0, canvas.width, canvas.height, 'black');
}

function drawEverything() {
  //Makes Black Square Background
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  //Makes Middle Line
  colorRect(canvas.width/2, 0, middleLineThickness, canvas.height, 'white');
  //Makes Paddle 1
  colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
  //Makes Paddle 2
  colorRect(canvas.width-PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
  //Makes Ball
  drawCircle(ballX, ballY, 10, 'white');
  //Makes Score
  canvasContext.font = "40px Serif";
  canvasContext.fillText(player1Score, 200, 100);
  canvasContext.fillText(player2Score, canvas.width - 200, 100);
}

function drawCircle (centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}

function colorRect (leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect (leftX, topY, width, height);
}


document.getElementById("menu").addEventListener('click', runGameWithInterval);



/*var canvas = document.getElementById('gameCanvas');
var canvasContext = canvas.getContext('2d');

window.onload = function() {
  canvasContext.fillStyle = 'black';
  canvasContext.fillRect (0,0,canvas.width,canvas.height);
}*/
