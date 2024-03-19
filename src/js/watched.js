import { genresList } from './database';
const gallery = document.querySelector('#movie-items-lib');
const watched = document.querySelector('.watched');
const queue = document.querySelector('.queue');

watched.addEventListener('click', async () => {
  const array = JSON.parse(localStorage.getItem('movies-watched')); // parse JSON string to object;
  console.log(array);
  const genres = await genresList();
  const markup = array
    .map(({ poster_path, title, vote_average, release_date, genre_ids, id }) => {
      const allGenresNames = {};
watched.addEventListener('click', () => {
  const arrayWatched = JSON.parse(localStorage.getItem('movies-watched')); // parse JSON string to object;
  console.log(arrayWatched);
  gallery.innerHTML = '';
  const markupWatched = arrayWatched
    .map(({ poster_path, title, vote_average, release_date, genres, id }) => {
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
  gallery.insertAdjacentHTML('afterbegin', markup);
});

queue.addEventListener('click', () => {
  const arrayQueue = JSON.parse(localStorage.getItem('movies-queue')); // parse JSON string to object;
  console.log(arrayQueue);
  gallery.innerHTML = '';
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
  gallery.insertAdjacentHTML('afterbegin', markup);
});
