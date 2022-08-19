const random = document.getElementById('random');
const submit = document.getElementById('submit');
const search = document.getElementById('search');
const resultsHead = document.getElementById('result-heading');
const meals = document.getElementById('meals');
const singleMeal = document.getElementById('single-meal');

const apiURL = 'https://www.themealdb.com/api/json/v1/1/';

submit.addEventListener('submit', e => {
  e.preventDefault();
  searchMeals();
});

random.addEventListener('click', e => {
  e.preventDefault();
  searchRandomMeal();
});

async function searchMeals() {
  singleMeal.innerHTML = '';
  const term = search.value;
  search.value = '';
  if (!term) return;

  const res = await fetch(`${apiURL}search.php?s=${term}`);
  const data = await res.json();

  if (!data.meals) {
    resultsHead.innerHTML = `
    <h2> No search results for '${term}':</h2>
    `;
    return;
  }

  resultsHead.innerHTML = `
  <h2> Results for '${term}':</h2>
  `;
  meals.innerHTML = data.meals
    .map(
      meal => `<div class="meal">
        <img src="${meal.strMealThumb}"  alt="${meal.strMeal}"/>
        <div class="meal-info" data-mealId="${meal.idMeal}">
            <h3> ${meal.strMeal}</h3>
        </div>
    </div>`
    )
    .join('');
}

async function searchRandomMeal() {
  singleMeal.innerHTML = '';
  resultsHead.innerHTML = '';
  const res = await fetch(`${apiURL}random.php`);
  const data = await res.json();
  const meal = data.meals[0];
  addSingleMeal(meal);
}

meals.addEventListener('click', e => {
  const mealInfo = e.path.find(item => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    }
    return false;
  });
  if (!mealInfo) return;
  const mealID = mealInfo.getAttribute('data-mealId');
  getMealById(mealID);
});

async function getMealById(mealId) {
  const res = await fetch(`${apiURL}lookup.php?i=${mealId}`);
  const data = await res.json();
  const meal = data.meals[0];
  addSingleMeal(meal);
}

function addSingleMeal(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  singleMeal.innerHTML = `
  <div class="single-meal" >
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}"  alt="${meal.strMeal}"/>
    <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
    </div>
    <div class="main">
        <h3>Ingredients</h3>
        <ul>
            ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
    </div>
  </div>
  `;
}
