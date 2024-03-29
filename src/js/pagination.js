import Notiflix from 'notiflix';
import {
  searchMovie,
  searchOptions,
  searchPopular,
  genresList,
  popularOptions,
} from './database.js';
import { openModal } from './modal';
const photoCard = document.querySelector('.movie-gallery');
const photoCardRender = document.querySelector('.movie-items');
const prevButton = document.querySelector('.page-btn.prev');
const nextButton = document.querySelector('.page-btn.next');
const paginationContainer = document.querySelector('.pagination-container');

const searchInput = document.querySelector('.main-header-input');
export const searchForm = document.querySelector('.main-header-form');
const failMessage = document.querySelector('.main-header-fail');
const searchSubmit = document.querySelector('.main-header-submit');

// paździerzowo wykonany loader
const loader = document.querySelector('.loader');

export function loaderRemove() {
  loader.classList.add('hidden');
  photoCard.classList.remove('hidden');
  paginationContainer.classList.remove('hidden');
  prevButton.classList.remove('hidden');
  nextButton.classList.remove('hidden');
}
export function loaderAdd() {
  loader.classList.remove('hidden');
  photoCard.classList.add('hidden');
  paginationContainer.classList.add('hidden');
  prevButton.classList.add('hidden');
  nextButton.classList.add('hidden');
}

let keywords;
const lastPage = 50;
let currentPage = 1;
let items;
let optionsCopy = { ...popularOptions }; // Create a copy of popularOptions
let genres;

// fetching informacji do kart

export function selectMovieCards() {
  const movieCards = document.querySelectorAll('.movie-card-template'); // NodeList

  if (movieCards.length) {
    [...movieCards].forEach(movieCard => {
      // Add event listener for click to each movie card element
      movieCard.addEventListener('click', openModal);
    });
  } else {
    // Element not found yet, try again after a delay
    setTimeout(selectMovieCards, 1000);
  }
}

export async function fetchItems() {
  optionsCopy = { ...popularOptions };
  optionsCopy.params.page = currentPage;

  items = await searchPopular();
  genres = await genresList();
  // console.log(genres);
  loaderAdd();
  showItems(items);
  // genres = await genresList();
  // Start the selection process
  selectMovieCards();
  // console.log(items);
}

// searchSubmit.addEventListener('submit', e => {});

async function fetchSearch(e) {
  if (currentPage === 1) {
    e.preventDefault();
  }

  failMessage.style.opacity = 0;

  optionsCopy = { ...searchOptions };
  optionsCopy.params.page = currentPage;

  keywords = searchInput.value.trim().split(' ').join('20%');
  console.log(keywords);
  optionsCopy.params.query = keywords;
  items = await searchMovie();
  console.log(items);
  genres = await genresList();

  if (items.length === 0) {
    failMessage.style.opacity = 1;
  }

  loaderAdd();
  showItems(items);
  selectMovieCards();
  searchInput.value = '';
}

searchForm.addEventListener('submit', fetchSearch);

//const switchToLibrary = document.querySelector("#switch-library");
//console.log(switchToLibrary);

//switchToLibrary.addEventListener("click", () => {
//  searchForm.removeEventListener('submit', fetchSearch);
//})

// wyświetl karty

export function showItems(items) {
  let pageItems = items;
  const itemsContainer = document.querySelector('#movie-items');
  itemsContainer.innerHTML = '';

  const markup = pageItems
    .map(({ poster_path, title, vote_average, release_date, genre_ids, id }) => {
      const allGenresNames = {};
      const genreArray = [];
      genres.map(genre => {
        allGenresNames[genre.id] = genre.name;

        if (genre_ids.includes(genre.id)) {
          genreArray.push(genre.name);
        }
        return genreArray;
      });
      return `
    <div class="movie-card-template" data-modal-open-window>
    <h2 id="movie-id" class="is-hidden">${id}</h2>
    <a class="movie-image">
    <img class="movie-image-detail"
    src="https://image.tmdb.org/t/p/w500${poster_path}?api_key=a53cba9b0d8796262c7859f0f1e4d0eb"
    onerror="this.src='https://cdn.pixabay.com/photo/2019/04/24/21/55/cinema-4153289_960_720.jpg';"
    alt="film-poster" />
    </a>
    <div class="movie-info">
    <p class="movie-name">${title}</p>
    <div class="tags-grade-wrap">
    <p class="movie-tags-year">${genreArray.slice(0, 3).join(', ')} | ${release_date.slice(
        0,
        4,
      )}</p>
    <p class="movie-grade">${vote_average.toFixed(1)}</p>
    </div>
    </div>
    </div>`;
    })
    .join('');

  photoCard.insertAdjacentHTML('beforeend', markup);

  setTimeout(loaderRemove, 1000);
}

// pokaż poprzednią stronę

function showPrev() {
  if (currentPage > 1) {
    currentPage--;
    if (searchInput.value === '') {
      fetchItems();
    } else {
      fetchSearch();
    }
    updatePagination();
  } else {
    return;
  }
}

// pokaż następną stronę

function showNext() {
  if (currentPage <= lastPage) {
    currentPage++;
    if (searchInput.value === '') {
      fetchItems();
    } else {
      fetchSearch();
    }
    updatePagination();
  } else {
    Notiflix.Notify.failure('Sorry, there are no more pages');
    return;
  }
}

prevButton.addEventListener('click', showPrev);
nextButton.addEventListener('click', showNext);

function updatePagination() {
  paginationContainer.innerHTML = '';

  if (currentPage >= 1 && currentPage <= 3) {
    for (let i = 1; i <= 5; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.classList.add('page-btn');
      if (i === currentPage) {
        pageButton.classList.add('active');
      }
      pageButton.addEventListener('click', () => {
        currentPage = i;
        optionsCopy.params.page = currentPage;
        if (searchInput.value === '') {
          fetchItems();
        } else {
          fetchSearch();
        }
        updatePagination();
      });
      paginationContainer.appendChild(pageButton);
    }
  }

  if (currentPage >= 4) {
    const pageButton = document.createElement('button');
    pageButton.textContent = 1;
    pageButton.classList.add('page-btn');
    paginationContainer.appendChild(pageButton);
    pageButton.addEventListener('click', () => {
      currentPage = 1;
      optionsCopy.params.page = currentPage;
      if (searchInput.value === '') {
        fetchItems();
      } else {
        fetchSearch();
      }
      updatePagination();
    });

    if (currentPage >= 5) {
      const pageButton = document.createElement('button');
      pageButton.textContent = '...';
      pageButton.classList.add('page-btn');
      paginationContainer.appendChild(pageButton);
    }
    for (let i = 1; i <= 5; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i - 3 + currentPage;
      pageButton.classList.add('page-btn');
      if (i === 3) {
        pageButton.classList.add('active');
      }
      pageButton.addEventListener('click', () => {
        currentPage = i + currentPage - 3;
        optionsCopy.params.page = currentPage;
        if (searchInput.value === '') {
          fetchItems();
        } else {
          fetchSearch();
        }
        updatePagination();
      });
      paginationContainer.appendChild(pageButton);
    }
  }
}

async function initialize() {
  await fetchItems();
  updatePagination();
}

initialize();
