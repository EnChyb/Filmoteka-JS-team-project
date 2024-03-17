// inicjalizacja biblioteki firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDDpwcjcKhe_urNJExT9mupeVvY7ZU4amc',
  authDomain: 'filmoteka-99859.firebaseapp.com',
  projectId: 'filmoteka-99859',
  storageBucket: 'filmoteka-99859.appspot.com',
  messagingSenderId: '211928039404',
  appId: '1:211928039404:web:d0752ca154999a60d40ac9',
  measurementId: 'G-127B3WS3FV',
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

import { getStorage, ref } from firebaseConfig / appId;

const galleryOfMovies = document.querySelector('.movie-gallery');
const addToQueueButton = document.querySelector('.add-queue');
const queueButton = document.querySelector('.queue');

// przy kliknięciu add to queue informacje o zdjęciu zapisują się w kolekcji movies
addToQueueButton.addEventListener('click', data => {
  const dataJSON = JSON.stringify(data);
  db.collection('queue-movies').set({
    image: dataJSON.poster_path,
    alt: dataJSON.outerview,
    name: dataJSON.title,
    tags: dataJSON.genres_ids,
    year: dataJSON.release_date,
    grade: dataJSON.vote_average,
  });
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
  cardOfMovie.insertAdjacentHTML('afterstart', markup);
});
