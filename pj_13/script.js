const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyTransactions = [
  { id: 1, text: 'Salary', amount: 1000 },
  { id: 1, text: 'Rent', amount: -300 },
];

const localStorageT = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorageT ?? dummyTransactions;

function addTransactionItem(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  item.classList.add(transaction.amount >= 0 ? 'plus' : 'minus');
  item.innerHTML = `
    ${transaction.text} <span> ${sign} $ ${Math.abs(
    transaction.amount
  )} </span> 
  <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">X</button>
  `;

  list.appendChild(item);
}

function updateTotals() {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  balance.innerText = (total - income > 0 ? '-' : '+') + '$' + total;
  money_plus.innerText = '+' + income;
  money_minus.innerText = '-' + Math.abs(total - income).toFixed(2);
}

function addTransaction() {
  console.log(text.value);
  if (text.value.trim() === '' || amount.value.trim() === '') return;

  const transaction = {
    id: generateID(),
    text: text.value,
    amount: +amount.value,
  };

  transactions.push(transaction);
  updateLocalStorage();
  addTransactionItem(transaction);
  updateTotals();
  text.value = '';
  amount.value = '';
}

function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  initApp();
}

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

//Helper
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

//Event listeners
form.addEventListener('submit', e => {
  e.preventDefault();
  console.log('hi');
  addTransaction();
});

//Init app
function initApp() {
  list.innerHTML = '';
  transactions.forEach(addTransactionItem);
  updateTotals();
}

initApp();
