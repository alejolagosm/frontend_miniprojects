const apiURL = 'https://api.lyrics.ovh';

const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('results');
const more = document.getElementById('more');

form.addEventListener('submit', e => {
  e.preventDefault();

  const searchTerm = search.value;
  if (!searchTerm) return alert('Please type something');
  searchSongs(searchTerm);
});

async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  displayData(data);
}

function displayData(data) {
  result.innerHTML = '';
  data.data.forEach(song => {
    const songEl = document.createElement('li');
    songEl.innerHTML = `
        <span> <strong> ${song.artist.name}</strong> - ${song.title} </span>
        <button class = "btn" data-artist="${song.artist.name}" data-title="${song.title}">Get Lyrics </button>
        `;
    result.appendChild(songEl);
  });

  if (data.prev || data.next) {
    more.innerHTML = `
     ${
       data.prev
         ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
         : ''
     }
     ${
       data.next
         ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
         : ''
     }
    `;
  }
}

async function getMoreSongs(url) {
  //This trick only works temporarily and for development purposes, it will not work in production
  try {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();
    displayData(data);
  } catch (e) {
    result.innerHTML =
      "<p>I'm sorry, this functionality does not work on production stages of the webpage, due to CORS restrictions of the API</p>";
  }
}

//Get lyrics button click
result.addEventListener('click', e => {
  const clickedEl = e.target;
  if (clickedEl.tagName !== 'BUTTON') return;
  const artist = clickedEl.getAttribute('data-artist');
  const title = clickedEl.getAttribute('data-title');
  getLyrics(artist, title);
});

async function getLyrics(artist, title) {
  const res = await fetch(`${apiURL}/v1/${artist}/${title}`);
  const data = await res.json();

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '</br>');

  result.innerHTML = `
  <h2><strong>${artist}</strong> - ${title} </h2>
  <p>${lyrics}</p>
  `;
  more.innerHTML = '';
}
