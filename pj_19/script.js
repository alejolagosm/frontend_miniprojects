const main = document.getElementById('main');
const add = document.getElementById('add');
const double = document.getElementById('double');
const sort = document.getElementById('sort');
const show = document.getElementById('show');
const calculate = document.getElementById('calculate');

let data = [];

//Fetch random users
async function getRandomUser() {
  const data = await fetch('https://randomuser.me/api/');
  const res = await data.json();
  const user = res.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

function addData(user) {
  data.push(user);
  updateDOM();
}

function updateDOM(providedData = data) {
  main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

  providedData.forEach(user => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `
    <strong> ${user.name} </strong> ${formatMoney(user.money)}
    `;
    main.appendChild(element);
  });
}

function formatMoney(money) {
  return '$' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

getRandomUser();

//Event listeners
add.addEventListener('click', getRandomUser);
double.addEventListener('click', () => {
  data = data.map(user => {
    return {
      name: user.name,
      money: user.money * 2,
    };
  });
  updateDOM();
});
sort.addEventListener('click', () => {
  data = data.sort((userA, userB) => {
    return userB.money - userA.money;
  });
  updateDOM();
});
show.addEventListener('click', () => {
  data = data.filter(user => user.money > 1000000);
  updateDOM();
});
calculate.addEventListener('click', () => {
  wealth = data.reduce((acc, num) => (acc += num.money), 0);
  data.push({
    name: 'Total wealth',
    money: wealth,
  });
  updateDOM();
});
