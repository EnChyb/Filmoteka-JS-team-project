import { searchDetails } from './database';
import { openModal } from './modal';

const movieGallery = document.querySelector('.movie-gallery');
const addToWatchedButton = document.querySelector('.add-watched');
const watchedButton = document.querySelector('.watched');

// ma za zadanie dodanie danych do localstorage
addToWatchedButton.addEventListener('click', async event => {
  const thisMovieId = openModal();
  console.log(thisMovieId);
  const data = await searchDetails(thisMovieId);
  const localStorageData = {
    image: data.poster_path,
    alt: data.outerview,
    name: data.title,
    tags: data.genres_ids,
    year: data.release_date,
    grade: data.vote_average,
  };
  localStorage.setItem('localStorageData', JSON.stringify(localStorageData));
});

// ma za zadanie wyświetlenie filmów
watchedButton.addEventListener('click', () => {
  const markup = localStorage
    .getItem('localStorageData')
    .map(({ image, alt, name, tags, year, grade }) => {
      `<div class="movie-card-template">
        <a class="movie-image">
          <img src="${image}" alt="${alt}" loading="lazy" />
        </a>
        <div class="movie-info">
          <p class="movie-name">${name}</p>
          <div class="tags-grade-wrap">
            <p class="movie-tags-year">${tags} | ${year}</p>
            <p class="movie-grade">${grade}</p>
          </div>
        </div>
    </div>`;
    })
    .join('');
  movieGallery.insertAdjacentHTML('afterbegin', markup);
});
