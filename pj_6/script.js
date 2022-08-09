const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');
const words = ['application', 'programming', 'interface', 'jesus'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = new Set();
const wrongLetters = new Set();

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        letter => `<span class="letter">
        ${correctLetters.has(letter) ? letter : ''}
        </span>
        `
      )
      .join('')}
  `;
  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations, you won! 😁';
    popup.style.display = 'flex';
  }
}

//Update wrong letters
function updateWrongLettersEl() {
  wrongLettersEl.innerHTML = `
    ${wrongLetters.size > 0 ? ' <p>Wrong</p>' : ''}
    ${Array.from(wrongLetters).map(letter => `<span>${letter}</span>`)}
  `;

  figureParts.forEach((part, idx) => {
    const errors = wrongLetters.size;
    console.log(errors);
    if (idx < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  if (wrongLetters.size === figureParts.length) {
    finalMessage.innerText = "I'm sorry, you lost";
    popup.style.display = 'flex';
  }
}

// Notification event popup
function showNotification() {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

//Key down event
window.addEventListener('keydown', e => {
  if (e.keyCode <= 90 && e.keyCode >= 65) {
    const letter = e.key;
    if (selectedWord.includes(letter) && !correctLetters.has(letter)) {
      correctLetters.add(letter);
      displayWord();
    } else if (!wrongLetters.has(letter) && !correctLetters.has(letter)) {
      wrongLetters.add(letter);
      updateWrongLettersEl();
    } else {
      showNotification();
    }
  }
});

//Play Again button
playAgainBtn.addEventListener('click', e => {
  correctLetters.clear();
  wrongLetters.clear();
  updateWrongLettersEl();
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  popup.style.display = 'none';
});

displayWord();
