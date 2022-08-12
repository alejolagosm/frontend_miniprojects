const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

wordsArr = [
  'necessary',
  'narcissistic',
  'accommodate',
  'vacuum',
  'accessory',
  'broccoli',
  'zucchini',
  'spaghetti',
  'embarrass',
  'Bourbon',
  'charcuterie',
  'entrepreneur',
  'liaison',
  'epitome',
  'asthma',
  'indict',
  'gnaw',
  'phlegm',
  'paradigm',
  'pneumonia',
  'island',
  'rhythm',
  'Wednesday',
  'eight',
  'acquiesce',
  'nauseous',
  'conscious',
  'grateful',
  'separate',
  'lightning',
];

let randWord;
let difficulty = localStorage.getItem('difficulty') ?? 'medium';
let score = 0;
let time = 10;

// set difficulty select value
difficultySelect.value = difficulty;

//Focus on input on reload
text.focus();

// Start counting down
const timeInterval = setInterval(() => {
  if (time == 0) {
    endGameLose();
  } else {
    time -= 1;
    timeEl.innerHTML = time + 's';
  }
}, 1000);

function getWord() {
  return wordsArr[Math.floor(Math.random() * wordsArr.length)];
}

function addWord() {
  randWord = getWord();
  word.innerHTML = randWord;
}

addWord();

function correctWord() {
  addWord();
  score++;
  scoreEl.innerHTML = score;

  if (difficulty === 'easy') {
    time += 4;
  } else if (difficulty === 'medium') {
    time += 3;
  } else {
    time += 1;
  }
}

function endGameLose() {
  clearInterval(timeInterval);
  endgameEl.innerHTML = `
  <h1>Game over</h1>
  <p> Your final score is ${score} </p>
  <button onclick="location.reload()" >Play again</button>
  `;
  endgameEl.style.display = `flex`;
}

text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if (insertedText === randWord) {
    e.target.value = '';
    correctWord();
  }
});

settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('show');
});

settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
