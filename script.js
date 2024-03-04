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
let speedX = Math.floor(Math.random() * 4) +3;
let speedY = Math.floor(Math.random() * 4) +3;
let directX = Math.floor(Math.random() * 2);
let directY = Math.floor(Math.random() * 2);

//buttons
startButton.addEventListener('click', startGame);
newGameButton.addEventListener('click', newGame);

function newGame(){
  score1.textContent = '0';
  score2.textContent = '0';
}//end newGame

// Recalculate board and ball coordinates when changed to full of half screen
window.addEventListener('resize', () => {
  boardCoord = board.getBoundingClientRect();
  ballCoord = ball.getBoundingClientRect();
});

function startGame(){
  gameState = 'play';
  requestAnimationFrame(() => {
    boardCoord = board.getBoundingClientRect();
    ballCoord = ball.getBoundingClientRect();
    speedX = Math.floor(Math.random() * 4) +3; 
    speedY = Math.floor(Math.random() * 4) +3; 
    //0 means ball goes up, 1 means ball goes down
    directX = Math.floor(Math.random() * 2); 
    directY = Math.floor(Math.random() * 2); 
    moveBall(speedX, speedY, directX, directY); 
  });
}//end startGame


document.addEventListener('keydown', (e) => {
  if (gameState == 'play') {
    //player1 keys up and down
    if (e.key == 'w') {
      player1.style.top = Math.max(boardCoord.top, player1Coord.top - window.innerHeight * 0.1) + 'px';
      player1Coord = player1.getBoundingClientRect();
    }
    if (e.key == 's') {
      player1.style.top = Math.min(boardCoord.bottom - paddle.height, player1Coord.top + window.innerHeight * 0.1) + 'px';
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

function moveBall(speedX, speedY, directX, directY) {
  if (ballCoord.top <= boardCoord.top) {
    directY = 1;
  }
  if (ballCoord.bottom >= boardCoord.bottom) {
    directY = 0;
  }

  if (ballCoord.left <= player1Coord.right && ballCoord.top >= player1Coord.top && ballCoord.bottom <= player1Coord.bottom) {
    directX = 1;
    speedX = Math.floor(Math.random() * 4) +3;
    speedY = Math.floor(Math.random() * 4) +3;
  }
  if (ballCoord.right >= player2Coord.left && ballCoord.top >= player2Coord.top && ballCoord.bottom <= player2Coord.bottom) {
    directX = 0;
    speedX = Math.floor(Math.random() * 4) +3;
    speedY = Math.floor(Math.random() * 4) +3;
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
  ball.style.top = ballCoord.top + speedY * (directY == 0 ? -1 : 1) + 'px';
  ball.style.left = ballCoord.left + speedX * (directX == 0 ? -1 : 1) + 'px';
  console.log(ball.style.top + " " + ball.style.left + " ");
  ballCoord = ball.getBoundingClientRect();
  requestAnimationFrame(() => {
    moveBall(speedX, speedY, directX, directY);
  });
}//end moveBall



