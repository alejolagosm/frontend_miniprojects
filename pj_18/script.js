const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// Keep track of current card
let currentActiveCard = 0;
//Store DOM cards
const cardsEl = [];

const defaultData = [
  {
    question: 'What has five legs and is green?',
    answer: 'A toad that lived through Chernobyl',
  },
];

//Get cards from local storage
const cardsData = getCardsData();
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? defaultData : cards;
}

//Add data to local storage
function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}

// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}
//Update
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1} /${cardsEl.length}`;
}

function createCard(data, idx) {
  const card = document.createElement('div');
  card.classList.add('card');
  if (idx == 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front">
            <p>${data.question}</p>
        </div>
        <div class="inner-card-back">
            <p>${data.answer}</p>
        </div>
    </div>
    `;
  card.addEventListener('click', () => {
    card.classList.toggle('show-answer');
  });
  //Add to DOM cards
  cardsEl.push(card);
  cardsContainer.appendChild(card);
  //Update text
  updateCurrentText();
}

createCards();

nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';
  currentActiveCard =
    currentActiveCard < cardsEl.length - 1
      ? currentActiveCard + 1
      : currentActiveCard;
  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText();
});
prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';
  currentActiveCard =
    currentActiveCard > 0 ? currentActiveCard - 1 : currentActiveCard;
  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText();
});

showBtn.addEventListener('click', () => {
  addContainer.classList.add('show');
});
hideBtn.addEventListener('click', () => {
  addContainer.classList.remove('show');
});

addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (!(question.trim() && answer.trim())) return;

  const newCard = { question, answer };
  createCard(newCard);
  questionEl.value = '';
  answerEl.value = '';

  addContainer.classList.remove('show');

  cardsData.push(newCard);
  setCardsData(cardsData);
});

clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
});
