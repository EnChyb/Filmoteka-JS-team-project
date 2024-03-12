import { searchPopular, genresList } from './database';
const photoCard = document.querySelector('.movie-gallery');

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentPage;
let items;
let genres;

async function paginate(items, itemsPerPage, paginationContainer) {
  items = await searchPopular();
  genres = await genresList();
  // console.log(genres);

  currentPage = 1;
  const totalPages = Math.ceil(items.length / itemsPerPage);

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

  function setupPagination() {
    const pagination = document.querySelector(paginationContainer);
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const link = document.createElement('a');
      link.classList.add('page-btn');
      link.classList.add(`page-${i}`);
      link.href = '#';
      link.innerText = i;

      if (i === currentPage) {
        link.classList.add('active');
      }

      link.addEventListener('click', event => {
        event.preventDefault();
        currentPage = i;
        showItems(currentPage);

        const currentActive = pagination.querySelector('.active');
        currentActive.classList.remove('active');
        link.classList.add('active');
      });

      pagination.appendChild(link);
    }

    function showPrev() {
      if (currentPage > 1) {
        currentPage--;
        showItems(currentPage);
      }
    }

    function showNext() {
      if (currentPage < totalPages) {
        currentPage++;
        showItems(currentPage);
      }
    }

    prevButton.addEventListener('click', showPrev);
    nextButton.addEventListener('click', showNext);
  }

  showItems(currentPage);
  setupPagination();

  const buttons = document.querySelectorAll('.page-btn');
  const buttonsArray = Array.from(buttons);

  // Hiding pages that are far away and putting '...' in their place (ง ͠ಥ_ಥ)ง

  const firstPage = document.querySelector('.page-1');
  const lastPage = document.querySelector(`.page-${totalPages}`);

  function hidePages() {
    for (let i = 1; i <= totalPages; i++) {
      const link = pagination.querySelector(`.page-${i}`);
      if ((i < currentPage - 2 || i > currentPage + 2) && i !== 1 && i !== totalPages) {
        link.style.display = 'none';
      } else {
        link.style.display = 'flex';
      }
    }

    if (currentPage > 3) {
      if (!document.querySelector('.page-dots-left')) {
        const leftDots = "<div class='page-dots-left page-btn'>...</div>";
        firstPage.insertAdjacentHTML('afterend', leftDots);
      }
    } else {
      const leftDots = document.querySelector('.page-dots-left');
      if (leftDots) {
        leftDots.remove();
      }
    }

    if (currentPage + 3 <= totalPages) {
      if (!document.querySelector('.page-dots-right')) {
        const rightDots = "<div class='page-dots-right page-btn'>...</div>";
        lastPage.insertAdjacentHTML('beforebegin', rightDots);
      }
    } else {
      const rightDots = document.querySelector('.page-dots-right');
      if (rightDots) {
        rightDots.remove();
      }
    }
  }

  hidePages();

  // Everytime a button is clicked

  buttonsArray.forEach(button => {
    button.addEventListener('click', hidePages);
  });
}

// CARDS

// const items = searchPopular();

// const items = [
//  'Item 1',
//  'Item 2',
//  'Item 3',
//  'Item 4',
//  'Item 5',
//  'Item 6',
//  'Item 7',
//  'Item 8',
//  'Item 9',
//  'Item 10',
//  'Item 11',
//  'Item 12',
//  'Item 13',
//  'Item 14',
//  'Item 15',
//  'Item 16',
// 'Item 17',
//  'Item 18',
//  'Item 19',
//  'Item 20',
//  'Item 21',
//  'Item 22',
//  'Item 23',
//  'Item 24',
//  'Item 25',
//'Item 26',
//'Item 27',
//'Item 28',
// 'Item 29',
//'Item 30',
//'Item 31',
//'Item 32',
//'Item 33',
//'Item 34',
//'Item 35',
//];

const itemsPerPage = 5;
const paginationContainer = '#pagination';

paginate(items, itemsPerPage, paginationContainer);

var data = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
  28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
  52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,
  76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
  100,
];
