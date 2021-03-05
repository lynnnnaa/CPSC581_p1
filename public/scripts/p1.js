//BOOMA buncing ball game
//load audio
window.addEventListener('load', (e) => {
    init();
})
//select canvas from html
const canvas = document.getElementById("game");
const canvasContext = canvas.getContext("2d");

//define variables
const PADDLE_WIDTH = 100;
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 20;
const BALL_RADIUS = 10;
let PADDLE_COLOR = "#252725";
let BALL_COLOR = "#252725";
let COLOR = ["#252725", "#6da18e", "#843839"];
let COLOR_CHOICE = 0;
let LIFE = 3;
let SCORE = 0;
let GAME_OVER = false;

//create paddle
const paddle = {
    x: canvas.width/2 - PADDLE_WIDTH/2,
    y: canvas.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
    dx: 3,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    color: PADDLE_COLOR
}

//create ball
const ball = {
    x: canvas.width/2,
    y: paddle.y - BALL_RADIUS,
    dx: 3 * (Math.random() * 2 - 1),
    dy: -3,
    radius: BALL_RADIUS,
    color: BALL_COLOR,
    speed: 3.5
}

//draw paddle
function drawPaddle(){
    canvasContext.fillStyle = paddle.color;
    canvasContext.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);


//move paddle
function movePaddle(){
    //move right
    if(audio.freqBin < 10 && audio.volume > 15 && audio.volume < 40 && paddle.x + paddle.width < canvas.width){
        paddle.x += paddle.dx;
    }
    // move left
    else if(audio.freqBin >= 10 && audio.volume > 15 && audio.volume < 40 && paddle.x > 0 && !(CHANGE_PADDLE_COLOR == true && CHANGE_PADDLE_COLOR_2 == false)){
        paddle.x -= paddle.dx;
    }
}

//change paddle color
function changeColorPaddle(){
  if(CHANGE_PADDLE_COLOR && CHANGE_PADDLE_COLOR_2){
    paddle.color = COLOR[COLOR_CHOICE];
    COLOR_CHOICE += 1;
    if(COLOR_CHOICE > 2){
      COLOR_CHOICE = 0;
    }
  }
}

//gernerate random int from min to max
function randomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

//draw the ball
function drawBall(){
    canvasContext.beginPath();
    canvasContext.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    canvasContext.fillStyle = ball.color;
    canvasContext.fill();
    canvasContext.closePath();
}

//move the ball
function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
}

//change ball color
function changeColorBall(){
  ball.color = COLOR[randomNum(0,2)];
}

//ball hit the wall
function ballHitWall(){
    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
        ball.dx = - ball.dx;
        wallHitAudio.play();
    }

    if(ball.y - ball.radius < 0){
        ball.dy = -ball.dy;
        wallHitAudio.play();
    }

    if(ball.y + ball.radius > canvas.height){
        LIFE--;
        resetBall();
        loseAudio.play();
    }
}

//reset the ball
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = paddle.y - BALL_RADIUS;
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = -3;
}

//ball hit the paddle
function ballHitPaddle(){
    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y){
        if(ball.color !== paddle.color){    //check if color matches
          LIFE --;
          colorUnmatchAudio.play();
        }else{
          SCORE += 1;
        }

        paddleHitAudio.play();
        changeColorBall();    // switch ball color

        let hitLoc = ball.x - (paddle.x + paddle.width/2);    //check where the ball hit the paddle
        hitLoc = hitLoc/(paddle.width/2);

        let angle = hitLoc * Math.PI/3;   //calc the angle of the ball

        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = - ball.speed * Math.cos(angle);
    }
}

//show game stats
function showGameStats(t1, t2, t3, img1, img2, img3){
    canvasContext.fillStyle = "#FFFF";
    canvasContext.font = "24px verdana One";
    canvasContext.fillText(t1, t2, t3);
    canvasContext.drawImage(img1, img2, img3, width = 24, height = 24);
}

//draw
function draw(){
    drawPaddle();
    drawBall();
    showGameStats(SCORE, 35, 25, scoreImg, 5, 5);
    showGameStats(LIFE, canvas.width - 25, 25, lifeImg, canvas.width - 55, 5);
}

//game over
function gameOver(){
    if(LIFE <= 0){
        showlose();
        GAME_OVER = true;
    }
}

//select element
const gameName = document.getElementById("gameName");
const startGame = document.getElementById("startGame");
const gameover = document.getElementById("gameOver");
const lose = document.getElementById("lose");
const restart = document.getElementById("restart");

//click on play again
restart.addEventListener("click", function(){
    location.reload(); // reload the page
})

//show game over
function showlose(){
    gameover.style.display = "block";
    lose.style.display = "block";
}

//update game
function update(){
    movePaddle();
    changeColorPaddle();
    moveBall();
    ballHitWall();
    ballHitPaddle();
    gameOver();
}

//game loop
function loop(){
    canvasContext.drawImage(backgroundImg, 0, 0);
    draw();
    update();
    if(!GAME_OVER){
        requestAnimationFrame(loop);
    }
}

//start of the game
canvasContext.drawImage(backgroundImg, 0, 0);
draw();

//click on the start
startGame.addEventListener("click", function(){
  startGame.style.display = "none";
  gameName.style.display = "none";
  loop();
})
