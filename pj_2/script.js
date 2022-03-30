const teather = document.querySelector('.theater');
const seatsSelected = document.querySelector('#count');
const totalValue = document.querySelector('#total');
const movieSelection = document.querySelector('#movie');

let seatCount = 0;
let ticketValue = movieSelection.value;

function addSeats(rows, seats) {
  teather.innerHTML = '';
  for (let i = 0; i < rows; i++) {
    const row = document.createElement('div');
    const randSeat = Math.floor(Math.random() * seats);
    row.classList.add('row');
    for (let j = 0; j < seats; j++) {
      const seat = document.createElement('div');
      seat.classList.add('seat');
      if (j === randSeat || j === randSeat + 1) seat.classList.add('occupied');
      row.appendChild(seat);
    }
    teather.appendChild(row);
  }
}

addSeats(8, 15);

movieSelection.addEventListener('change', e => {
  addSeats(8, 15);
  ticketValue = e.target.value;
  seatCount = 0;
  seatsSelected.innerText = seatCount;
  totalValue.innerText = seatCount * ticketValue;
});

teather.addEventListener('click', e => {
  if (e.target.classList.contains('seat')) {
    e.target.classList.toggle('selected');
    seatCount++;
    seatsSelected.innerText = seatCount;
    totalValue.innerText = seatCount * ticketValue;
  }
});
