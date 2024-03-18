import { searchDetails } from './database';


const galleryOfMovies = document.querySelector('.movie-gallery');
const addToQueueButton = document.querySelector('.add-queue');
const queueButton = document.querySelector('.queue');

// przy kliknięciu add to queue informacje o zdjęciu zapisują się w kolekcji movies
addToQueueButton.addEventListener('click', data => {
  const thisMovieId = event.currentTarget.querySelector('#movie-id').innerHTML;
  console.log(thisMovieId);

  const JSONdata = await searchDetails(thisMovieId);
  const data = JSONdata.json();
  db.collection('queue-movies').set({
    image: data.poster_path,
    alt: data.outerview,
    name: data.title,
    tags: data.genres_ids,
    year: data.release_date,
    grade: data.vote_average,
  });
  console.log(data.id);
});

// przy kilknięciu w sekcję queue dodaje się do HTML kod który. zawiera dane z kolekcji movies
queueButton.addEventListener('click', () => {
  const markup = db
    .collection('queue-movies')
    .get()
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
  cardOfMovie.insertAdjacentHTML('afterbegin', markup);
});
