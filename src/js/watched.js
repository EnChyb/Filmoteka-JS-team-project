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

const galleryOfMovies = document.querySelector('.movie-gallery');
const cardOfMovie = document.querySelector('.movie-card');
const addToWatchedButton = document.querySelector('.add-watched');
const modal = document.querySelector('.modal-filmoteka');
const watchedButton = document.querySelector('.watched');

// ma za zadanie dodanie danych do firebase
addToWatchedButton.addEventListener('click', data => {
  db.collection('movies').set({
    image: data.poster_path,
    alt: data.outerview,
    name: data.title,
    tags: data.genres_ids,
    year: data.release_date,
    grade: data.vote_average,
    console.log(data.id);
  });
});

// ma za zadanie wyświetlenie filmów
watchedButton.addEventListener('click', () => {
  const markup = db
    .collection('movies')
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
    </div>`;
    })
    .join('');
  galleryOfMovies.insertAdjacentHTML('beforeend', markup);
});
