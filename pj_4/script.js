import data from './currency.json' assert { type: 'json' };

const currencyOne = document.querySelector('#currency-one');
const currencyTwo = document.querySelector('#currency-two');
const currencyOneName = document.querySelector('#currency-name1');
const currencyTwoName = document.querySelector('#currency-name2');
const AmountOne = document.querySelector('#amount-1');
const AmountTwo = document.querySelector('#amount-2');

const switchBtn = document.querySelector('#rate-switch');
const rateText = document.querySelector('#rate');

let dataExc = {};
const getCurrencies = function () {
  for (let i = 0; i < data.length; i++) {
    const opt1 = document.createElement('option');
    const opt2 = document.createElement('option');
    opt1.value = data[i].cc;
    opt1.innerText = data[i].cc;
    opt2.value = data[i].cc;
    opt2.innerText = data[i].cc;
    currencyOne.appendChild(opt1);
    currencyTwo.appendChild(opt2);
  }
  const randCurr = Math.floor(Math.random() * data.length);
  currencyOne.value = 'USD';
  currencyOneName.innerText = 'United States dollar';
  currencyTwo.value = data[randCurr].cc;
  currencyTwoName.innerText = data[randCurr].name;
};

getCurrencies();

async function calculateRate() {
  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/41ab8f672a04e9c1770fcfa6/latest/${currencyOne.value}`
  );
  dataExc = await res.json();
  changeValues();
}

function changeValues() {
  const convertCurr = currencyTwo.value;
  const amountConv = AmountOne.value * dataExc.conversion_rates[convertCurr];
  AmountTwo.value = amountConv.toFixed(2);
  const idx1 = data.findIndex(x => x.cc == currencyOne.value);
  currencyOneName.innerText = data[idx1].name;
  const idx2 = data.findIndex(x => x.cc == currencyTwo.value);
  currencyTwoName.innerText = data[idx2].name;
  rateText.innerText = `1 ${
    currencyOne.value
  } equals ${dataExc.conversion_rates[convertCurr].toFixed(2)} ${
    currencyTwo.value
  }  `;
}

calculateRate();

currencyOne.addEventListener('change', e => {
  calculateRate();
});

currencyTwo.addEventListener('change', e => {
  calculateRate();
});

AmountOne.addEventListener('change', e => {
  const convertCurr = currencyTwo.value;
  const amountConv = AmountOne.value * dataExc.conversion_rates[convertCurr];
  AmountTwo.value = amountConv.toFixed(2);
});

switchBtn.addEventListener('click', e => {
  const tempVar = currencyTwo.value;
  currencyTwo.value = currencyOne.value;
  currencyOne.value = tempVar;
  calculateRate();
});
