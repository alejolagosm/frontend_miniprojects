const postsContainer = document.querySelector('#post-container');
const loader = document.querySelector('.loader');
const filter = document.querySelector('#filter');
let pokemons = [];

let limit = 10;
let page = 1;
let current = 1;

async function getPokemon(id) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function addElements(current, limit) {
  for (let i = current; i < limit; i++) {
    let pokemon = await getPokemon(i);
    displaypokemon(pokemon);
  }
}

function displaypokemon(pokemon) {
  console.log(pokemon);
  const imgsrc = pokemon.sprites.front_default;
  const cardHtml = `<div class="post" data-description="Pokemon">
          <div class="number">
            <img src="${imgsrc}" alt="The pokemon picture" />
          </div>
          <div class="post-info">
            <h2 class="post-title">${pokemon.species.name}</h2>
            <p class="post-body">
                ${pokemon.base_experience}
            </p>
          </div>
        </div>`;
  postsContainer.innerHTML += cardHtml;
}

function filterPokemon(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();

    if (title.indexOf(term) >= 0) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

addElements(current, limit);

function showLoading() {
  loader.classList.add('show');
  setTimeout(() => {
    loader.classList.remove('show');
    setTimeout(() => {
      current += 10;
      limit += 10;
      addElements(current, limit);
    }, 300);
  }, 2000);
}

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener('input', filterPokemon);
