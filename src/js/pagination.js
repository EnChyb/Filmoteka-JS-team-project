// const buttons = document.querySelectorAll('.page-btn');
// buttonsArray = Array.from(buttons);
// console.log(buttonsArray);

// const paginationDiv = document.querySelector('.pagination');
// const prevButton = buttonsArray[0];
// console.log(prevButton);
// const lastButton = buttonsArray[9];
// const nextButton = buttonsArray[10];

// var pagination = require('pagination');
// var paginator = pagination.create('search', {
//   prelink: '/',
//   current: 1,
//   rowsPerPage: 30,
//   totalResult: 10020,
// });
// console.log(paginator.render());
// export const pageViewer = paginator.render();

// const main = document.querySelector('main');

// var pagination = require('pagination');

// var boostrapPaginator = new pagination.TemplatePaginator({
//   prelink: '/',
//   current: 3,
//   rowsPerPage: 200,
//   totalResult: 10020,
//   slashSeparator: true,
//   template: function (result) {
//     var i, len, prelink;
//     var html = '<div><ul class="pagination">';
//     if (result.pageCount < 2) {
//       html += '</ul></div>';
//       return html;
//     }
//     prelink = this.preparePreLink(result.prelink);
//     if (result.previous) {
//       html +=
//         '<li class="page-btn"><a class="page-link" href="' +
//         prelink +
//         result.previous +
//         '">' +
//         this.options.translator('PREVIOUS') +
//         '</a></li>';
//     }
//     if (result.range.length) {
//       for (i = 0, len = result.range.length; i < len; i++) {
//         if (result.range[i] === result.current) {
//           html +=
//             '<li class="active page-btn"><a class="page-link" href="' +
//             prelink +
//             result.range[i] +
//             '">' +
//             result.range[i] +
//             '</a></li>';
//         } else {
//           html +=
//             '<li class="page-btn"><a class="page-link" href="' +
//             prelink +
//             result.range[i] +
//             '">' +
//             result.range[i] +
//             '</a></li>';
//         }
//       }
//     }
//     if (result.next) {
//       html +=
//         '<li class="page-btn"><a class="page-link" href="' +
//         prelink +
//         result.next +
//         '" class="paginator-next">' +
//         this.options.translator('NEXT') +
//         '</a></li>';
//     }
//     html += '</ul></div>';
//     return html;
//   },
// });
// console.log(boostrapPaginator.render());

// main.insertAdjacentHTML('beforeend', boostrapPaginator.render());

// const

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
  }

  showItems(currentPage);
  setupPagination();
}

// TUTAJ SĄ KARTY

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

const currentPage = 1;

for (var i = 0; i < data.length; i++) {
  if (i >= (currentPage - 1) * itemsPerPage && i < currentPage * itemsPerPage) {
    console.log(data[i]);
  }
}
