import { searchPopular, genresList } from './database';
const photoCard = document.querySelector('.movie-gallery');
const paginationContainer = document.querySelector('#pagination');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentPage = 1;
let itemsPerPage = 2;
let items;
let genres;

async function fetchItems() {
  items = await searchPopular();
  genres = await genresList();
}

function showItems(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageItems = items.slice(startIndex, endIndex);

  const itemsContainer = document.querySelector('#movie-items');
  itemsContainer.innerHTML = '';

  const markup = pageItems
    .map(
      ({ poster_path, title, vote_average, release_date, genre_ids, id }) =>
        `
        <div class="movie-card-template" data-modal-open-window data-movie-id="${id}">
          <a class="movie-image">
           <img src="https://image.tmdb.org/t/p/w500${poster_path}?api_key=a53cba9b0d8796262c7859f0f1e4d0eb"
            alt="film-poster" />
          </a>
          <div class="movie-info">
            <p class="movie-name">${title}</p>
            <div class="tags-grade-wrap">
              <p class="movie-tags-year">${genre_ids} | ${release_date.slice(0, 4)}</p>
              <p class="movie-grade">${vote_average}</p>
            </div>
          </div>
        </div>`,
    )
    .join('');
  // console.log(genre_ids);
  photoCard.insertAdjacentHTML('beforeend', markup);
}

function showPrev() {
  if (currentPage > 1) {
    currentPage--;
    showItems(currentPage);
  }
}

function showNext() {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    showItems(currentPage);
  }
}

function setupPagination() {
  prevButton.addEventListener('click', showPrev);
  nextButton.addEventListener('click', showNext);
}

async function initialize() {
  await fetchItems();
  showItems(currentPage);
  setupPagination();
}

initialize();
