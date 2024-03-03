//DOM variables
let gameState = 'start';
let player1 = document.querySelector('.player1');
let player2 = document.querySelector('.player2');
let board = document.querySelector('.board');
let tempBall = document.querySelector('.ball');
let ball = document.querySelector('.ball');
let score1 = document.querySelector('.player1score');
let score2 = document.querySelector('.player2score');
let startButton = document.getElementById('startButton');
let newGameButton = document.getElementById('newGameButton');

//coordinates
let player1Coord = player1.getBoundingClientRect();
let player2Coord = player2.getBoundingClientRect();
let tempBallCoord = ball.getBoundingClientRect();
let ballCoord = tempBallCoord;
let boardCoord = board.getBoundingClientRect();
let paddle = document.querySelector('.paddle').getBoundingClientRect();

//speed
let dx = Math.floor(Math.random() * 4) +3;
let dy = Math.floor(Math.random() * 4) +3;
let dxd = Math.floor(Math.random() * 2);
let dyd = Math.floor(Math.random() * 2);

//buttons
startButton.addEventListener('click', startGame);
newGameButton.addEventListener('click', newGame);

function newGame(){
  score1.textContent = '0';
  score2.textContent = '0';
}//end newGame

function startGame(){
  gameState = 'play';
  
  requestAnimationFrame(() => {
    dx = Math.floor(Math.random() * 4) +3; 
    dy = Math.floor(Math.random() * 4) +3; 
    dxd = Math.floor(Math.random() * 2); 
    dyd = Math.floor(Math.random() * 2); 
    moveBall(dx, dy, dxd, dyd); 
  });
}//end startGame

  

document.addEventListener('keydown', (e) => {
  if (gameState == 'play') {
    //player1 keys up and down
    if (e.key == 'w') {
      player1.style.top = Math.max(boardCoord.top, player1Coord.top - window.innerHeight * 0.06) + 'px';
      player1Coord = player1.getBoundingClientRect();
    }
    if (e.key == 's') {
      player1.style.top = Math.min(boardCoord.bottom - paddle.height, player1Coord.top + window.innerHeight * 0.06) + 'px';
      player1Coord = player1.getBoundingClientRect();
    }

    //player2 keys up and down
    if (e.key == 'ArrowUp') {
      player2.style.top = Math.max(boardCoord.top, player2Coord.top - window.innerHeight * 0.1) + 'px';
      player2Coord = player2.getBoundingClientRect();
    }
    if (e.key == 'ArrowDown') {
      player2.style.top = Math.min(boardCoord.bottom - paddle.height, player2Coord.top + window.innerHeight * 0.1) + 'px';
      player2Coord = player2.getBoundingClientRect();
    }
  }
});//end event listner

function moveBall(dx, dy, dxd, dyd) {
  if (ballCoord.top <= boardCoord.top) {
    dyd = 1;
  }
  if (ballCoord.bottom >= boardCoord.bottom) {
    dyd = 0;
  }
  if (ballCoord.left <= player1Coord.right && ballCoord.top >= player1Coord.top && ballCoord.bottom <= player1Coord.bottom) {
    dxd = 1;
    dx = Math.floor(Math.random() * 4) +3;
    dy = Math.floor(Math.random() * 4) +3;
  }
  if (ballCoord.right >= player2Coord.left && ballCoord.top >= player2Coord.top && ballCoord.bottom <= player2Coord.bottom) {
    dxd = 0;
    dx = Math.floor(Math.random() * 4) +3;
    dy = Math.floor(Math.random() * 4) +3;
  }
  if (ballCoord.left <= boardCoord.left || ballCoord.right >= boardCoord.right) {
    if (ballCoord.left <= boardCoord.left) {
      score2.innerHTML = +score2.innerHTML + 1;
    } 
    else {
      score1.innerHTML = +score1.innerHTML + 1;
    }
    gameState = 'start';
    ballCoord = tempBallCoord;
    ball.style = tempBall.style;
    return;
  }
  ball.style.top = ballCoord.top + dy * (dyd == 0 ? -1 : 1) + 'px';
  ball.style.left = ballCoord.left + dx * (dxd == 0 ? -1 : 1) + 'px';
  ballCoord = ball.getBoundingClientRect();
  requestAnimationFrame(() => {
    moveBall(dx, dy, dxd, dyd);
  });
}//end moveBall



