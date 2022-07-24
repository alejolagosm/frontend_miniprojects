const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');

rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;
const brickRows = 9;
const brickCols = 6;

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 2,
  dy: 3,
};

const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};

const brick = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

//Create bricks
const bricks = [];
for (let i = 0; i < brickRows; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickCols; j++) {
    const x = i * (brick.w + brick.padding) + brick.offsetX;
    const y = j * (brick.h + brick.padding) + brick.offsetY;
    bricks[i][j] = { x, y, ...brick };
  }
}

//Draw Elements
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  (ctx.font = '20px Roboto'),
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

function drawBricks() {
  bricks.forEach(column => {
    column.forEach(brick => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
}

function draw() {
  //Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //Redraw canvas
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

//Functions to update the animation
function movePaddle() {
  paddle.x += paddle.dx;
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }
  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
  //Wall collision
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }
  //Paddle Collision
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }
  //Brick Collision
  bricks.forEach(column => {
    column.forEach(brick => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x &&
          ball.x + ball.size < brick.x + brick.w &&
          ball.y + ball.size > brick.y &&
          ball.y - ball.size < brick.y + brick.h
        ) {
          ball.dy *= -1;
          brick.visible = false;
          score += 1;
          if (score % (brickRows * brickCols) === 0) {
            showAllBricks();
            draw();
          }
        }
      }
    });
  });
  //Lose game
  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    score = 0;
    // ball.x = canvas.width / 2;
    // ball.y = canvas.height / 2;
    draw();
  }
}

function showAllBricks() {
  bricks.forEach(column => {
    column.forEach(brick => {
      brick.visible = true;
    });
  });
}

function update() {
  movePaddle();
  moveBall();
  draw();
  window.requestAnimationFrame(update);
}

//Event listeners
function keyDown(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  }
  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
}
function keyUp(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = 0;
  }
  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = 0;
  }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

update();
