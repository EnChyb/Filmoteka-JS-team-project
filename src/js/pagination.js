import { searchPopular, genresList, popularOptions } from './database';
const photoCard = document.querySelector('.movie-gallery');
const paginationContainers = document.querySelectorAll('.pagination-container');
const prevButtons = document.querySelectorAll('.prev');
const nextButtons = document.querySelectorAll('.next');

const paginationContainersArr = Array.from(paginationContainers);
console.log(paginationContainersArr);
const nextButtonsArr = Array.from(nextButtons);
const prevButtonsArr = Array.from(prevButtons);

let activeButton;
let currentPage = 1;
// let itemsPerPage = 20;
let items;
let popularOptionsCopy = { ...popularOptions }; // Create a copy of popularOptions
// let genres;
let pageNum = popularOptionsCopy.params.page;
console.log(popularOptionsCopy.params.page);

// fetching informacji do kart

async function fetchItems() {
  pageNum = currentPage;
  items = await searchPopular();
  // genres = await genresList();
  console.log(items);
}

// wyświetl karty

function showItems(page) {
  // const startIndex = (page - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const pageItems = items.slice(startIndex, endIndex);
  let pageItems = items;

  const itemsContainer = document.querySelector('#movie-items');
  itemsContainer.innerHTML = '';

  // wnętrze karty

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
  // podłączenie karty do strony
  photoCard.insertAdjacentHTML('beforeend', markup);
}

// pokaż poprzednią stronę

function showPrev() {
  if (currentPage > 1) {
    currentPage--;
    showItems(currentPage);
    updatePagination();
  }
}

// pokaż następną stronę

function showNext() {
  // const totalPages = Math.ceil(items.length / itemsPerPage);
  const totalPages = 5;
  if (currentPage < totalPages) {
    currentPage++;
    showItems(currentPage);
    updatePagination();
  }
}

function updatePage() {
  popularOptionsCopy.params.page = currentPage; // Update page in popularOptionsCopy
  showItems(currentPage);
  updatePagination();
}

function setupPagination() {
  prevButtonsArr.forEach(prevButton => {
    prevButton.addEventListener('click', showPrev);
  });
  nextButtonsArr.forEach(nextButton => {
    nextButton.addEventListener('click', showNext);
  });
  updatePagination();
}

function updatePagination() {
  // const totalPages = Math.ceil(items.length / itemsPerPage);
  const totalPages = 5;
  paginationContainersArr.forEach(paginationContainer => {
    paginationContainer.innerHTML = '';
  });
  // paginationContainer.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.classList.add('page-btn');
    if (i === currentPage) {
      pageButton.classList.add('active');
    }
    pageButton.addEventListener('click', () => {
      currentPage = i;
      // showItems(currentPage);
      // updatePagination();
      updatePage();
    });
    // paginationContainer.appendChild(pageButton);
    paginationContainersArr.forEach(paginationContainer => {
      paginationContainer.appendChild(pageButton);
    });
  }
  // console.log(popularOptions.params.page);
  activeButton = document.querySelector('.active');
  // console.log(activeButton);
  currentPage = activeButton.innerHTML;
  console.log(currentPage);

  fetchItems();
}

async function initialize() {
  await fetchItems();
  await showItems(currentPage);
  setupPagination();
}

initialize();
