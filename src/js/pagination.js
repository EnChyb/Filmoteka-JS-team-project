import { searchPopular } from './database';
const photoCard = document.querySelector('.movie-gallery');

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentPage = 1;

function paginate(items, itemsPerPage, paginationContainer) {
  let currentPage = 1;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  function showItems(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = items.slice(startIndex, endIndex);

    const itemsContainer = document.querySelector('#movie-items');
    itemsContainer.innerHTML = '';

    pageItems.forEach(item => {
      const li = document.createElement('li');
      li.innerText = item;
      itemsContainer.appendChild(li);
    });
  }

  function setupPagination() {
    const pagination = document.querySelector(paginationContainer);
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const link = document.createElement('a');
      link.classList.add('page-btn');
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
}

// TUTAJ SĄ KARTY

const items = searchPopular();

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

// for (var i = 0; i < data.length; i++) {
//   if (i >= (currentPage - 1) * itemsPerPage && i < currentPage * itemsPerPage) {
//     console.log(data[i]);
//   }
// }
