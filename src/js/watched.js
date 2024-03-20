import { openModal } from './modal';
export function watchedToLibrary() {
  const gallery = document.querySelector('#movie-items-lib');
  console.log(gallery);

  gallery.innerHTML = '';
  if (JSON.parse(localStorage.getItem('movies-watched'))) {
    try {
      const array = JSON.parse(localStorage.getItem('movies-watched')) || [];
      const markup = array
        .map(({ poster_path, title, vote_average, release_date, genres, id }) => {
          const genreArray = [];
          for (const genre of genres) {
            genreArray.push(genre.name);
          }
          return `
    <div class="movie-card-template" data-modal-open-window>
    <h2 id="movie-id" class="is-hidden">${id}</h2>
    <a class="movie-image">
    <img class="movie-image-detail" src="https://image.tmdb.org/t/p/w500${poster_path}?api_key=a53cba9b0d8796262c7859f0f1e4d0eb" onerror="this.src='https://cdn.pixabay.com/photo/2019/04/24/21/55/cinema-4153289_960_720.jpg';"
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
      gallery.insertAdjacentHTML('afterbegin', markup);

      //setTimeout(loaderRemove, 1000);
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  const movieCardTemplate = document.querySelectorAll('.movie-card-template');
  movieCardTemplate.forEach(card => {
    card.addEventListener('click', e => {
      openModal(e);
    });
  });
}

export function queueToLibrary() {
  const gallery = document.querySelector('#movie-items-lib');
  console.log(gallery);
  //loaderAdd();
  //const array = JSON.parse(localStorage.getItem('movies-watched')); // parse JSON string to object;
  //console.log(array);
  gallery.innerHTML = '';
  if (JSON.parse(localStorage.getItem('movies-queue'))) {
    try {
      const arrayQueue = JSON.parse(localStorage.getItem('movies-queue')) || [];
      const markupQueue = arrayQueue
        .map(({ poster_path, title, vote_average, release_date, genres, id }) => {
          const genreArray = [];
          for (const genre of genres) {
            genreArray.push(genre.name);
          }
          return `
    <div class="movie-card-template" data-modal-open-window>
    <h2 id="movie-id" class="is-hidden">${id}</h2>
    <a class="movie-image">
    <img class="movie-image-detail" src="https://image.tmdb.org/t/p/w500${poster_path}?api_key=a53cba9b0d8796262c7859f0f1e4d0eb"
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
      gallery.insertAdjacentHTML('afterbegin', markupQueue);

      //setTimeout(loaderRemove, 1000);
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  const movieCardTemplate = document.querySelectorAll('.movie-card-template');
  movieCardTemplate.forEach(card => {
    card.addEventListener('click', e => {
      openModal(e);
    });
  });
}
