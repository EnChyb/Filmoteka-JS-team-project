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

  const buttons = document.querySelectorAll('.page-btn');
  const buttonsArray = Array.from(buttons);

  // Hiding pages that are far away and putting '...' in their place

  const hiddenLeft = [];
  const hiddenRight = [];

  buttonsArray.forEach(button => {
    button.addEventListener('click', hidePages);
    function hidePages() {
      if (currentPage >= 4) {
        for (let i = 2; i <= currentPage - 3; i++) {
          hiddenLeft.push(i);
          // return hiddenLeft;
        }
        // const leftToHide = [];
        // for (let i = 0; i <= hiddenLeft)
        // leftToHide.forEach(button => {
        //   button.innerHTML = '.';
        // })
      }

      if (currentPage + 3 <= totalPages) {
        for (let i = currentPage + 3; i < totalPages; i++) {
          hiddenRight.push(i);
          return hiddenRight;
        }
      }
    }
  });
}

// CARDS

const items = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 6',
  'Item 7',
  'Item 8',
  'Item 9',
  'Item 10',
  'Item 11',
  'Item 12',
  'Item 13',
  'Item 14',
  'Item 15',
  'Item 16',
  'Item 17',
  'Item 18',
  'Item 19',
  'Item 20',
  'Item 21',
  'Item 22',
  'Item 23',
  'Item 24',
  'Item 25',
  'Item 26',
  'Item 27',
  'Item 28',
  'Item 29',
  'Item 30',
  'Item 31',
  'Item 32',
  'Item 33',
  'Item 34',
  'Item 35',
];

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
