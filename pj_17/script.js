const msg = document.getElementById('msg');

const randNumb = getRandomNumber();

function getRandomNumber() {
  return Math.floor(Math.random() * 90) + 10;
}
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = event => {
  console.log(randNumb);
  msg.innerHTML = '';
  const number = event.results[0][0].transcript;
  const guess = getGuessMsg(number);
  msg.innerHTML = `
  <p> I understood: </p>
  <span class="box"> ${number} </span>
  <p> ${guess == 1 ? winner(number) : guess} </p>
  `;
};

function getGuessMsg(number) {
  const numb = parseInt(number);
  if (Number.isNaN(numb)) return "That's not a number";
  if (numb == randNumb) return 1;
  if (numb < randNumb) return 'Too low';
  if (numb > randNumb) return 'Too high';

  return 'Something went wrong...';
}

function winner(number) {
  document.body.innerHTML = `
    <h2> Congrats!  You have guessed the right number: ${number} </h2>
    <button class="play-btn" id="play-btn">Play Again</button>
    `;
}

document.body.onclick = () => {
  recognition.start();
  msg.innerHTML = '<p> Ready to receive a number! </p>';
};

document.body.addEventListener('click', e => {
  if (e.target.i == 'play-btn') {
    window.location.reload();
  }
});
