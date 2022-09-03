const container = document.getElementById('container');
const text = document.getElementById('text');

const totalTime = 16000;
const intervalTime = totalTime / 4;

function breathAnimation() {
  text.innerText = 'Breathe in!';
  container.classList.add('grow');
  setTimeout(() => {
    text.innerText = 'Hold';
    setTimeout(() => {
      text.innerText = 'Breathe out!';
      container.classList.remove('grow');
      container.classList.add('shrink');
      setTimeout(() => {
        container.classList.remove('shrink');
        text.innerText = 'Hold';
      }, intervalTime);
    }, intervalTime);
  }, intervalTime);
}

setInterval(breathAnimation, totalTime);
