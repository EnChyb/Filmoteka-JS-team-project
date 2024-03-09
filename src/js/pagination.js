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

const main = document.querySelector('main');

var pagination = require('pagination');

var boostrapPaginator = new pagination.TemplatePaginator({
  prelink: '/',
  current: 3,
  rowsPerPage: 200,
  totalResult: 10020,
  slashSeparator: true,
  template: function (result) {
    var i, len, prelink;
    var html = '<div><ul class="pagination">';
    if (result.pageCount < 2) {
      html += '</ul></div>';
      return html;
    }
    prelink = this.preparePreLink(result.prelink);
    if (result.previous) {
      html +=
        '<li class="page-btn"><a class="page-link" href="' +
        prelink +
        result.previous +
        '">' +
        this.options.translator('PREVIOUS') +
        '</a></li>';
    }
    if (result.range.length) {
      for (i = 0, len = result.range.length; i < len; i++) {
        if (result.range[i] === result.current) {
          html +=
            '<li class="active page-btn"><a class="page-link" href="' +
            prelink +
            result.range[i] +
            '">' +
            result.range[i] +
            '</a></li>';
        } else {
          html +=
            '<li class="page-btn"><a class="page-link" href="' +
            prelink +
            result.range[i] +
            '">' +
            result.range[i] +
            '</a></li>';
        }
      }
    }
    if (result.next) {
      html +=
        '<li class="page-btn"><a class="page-link" href="' +
        prelink +
        result.next +
        '" class="paginator-next">' +
        this.options.translator('NEXT') +
        '</a></li>';
    }
    html += '</ul></div>';
    return html;
  },
});
console.log(boostrapPaginator.render());

main.insertAdjacentHTML('beforeend', boostrapPaginator.render());
