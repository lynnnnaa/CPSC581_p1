//project 1 sources
//add images
const backgroundImg = new Image();
backgroundImg.src = "../img/backgroundImage.jpeg";

const scoreImg = new Image();
scoreImg.src = "../img/score.png";

const lifeImg = new Image();
lifeImg.src = "../img/life.png";

//add sounds
const wallHitAudio = new Audio();
wallHitAudio.src = "../sounds/hit.mp3";

const paddleHitAudio = new Audio();
paddleHitAudio.src = "../sounds/hit.mp3";
paddleHitAudio.volume = 0.8;

const colorUnmatchAudio = new Audio();
colorUnmatchAudio.src = "../sounds/colorUnmatch.mp3";

const loseAudio = new Audio();
loseAudio.src = "../sounds/lose.mp3";
loseAudio.volume = 0.15;
