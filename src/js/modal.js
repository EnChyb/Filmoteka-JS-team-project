import Notiflix from 'notiflix';
import { searchDetails } from './database';

const modalDiv = document.querySelector('#modal-window');
const filmModal = document.querySelector('.modal-content');
const overlay = document.querySelector('.modal-filmoteka');
const modalBody = document.querySelector('body');

export async function openModal(e) {
  const thisMovieId = e.currentTarget.querySelector('#movie-id').innerHTML;
  await renderModal(thisMovieId);
  filmModal.classList.remove('is-hidden');
  overlay.classList.remove('is-hidden');
  const closeModalBtn = document.querySelector('.modal-close-btn');
  const addWatchedRef = document.querySelector('.add-watched');
  const addQueueRef = document.querySelector('.add-queue');
  closeModalBtn.addEventListener('click', closeModal);

  //---Powiadomienia notiflix - dodanie i usunięcię z queue/watched
  const addedToWatched = () => {
    Notiflix.Notify.info(`The movie has been added to watched`);
  };
  const addedToQueue = () => {
    Notiflix.Notify.info(`The movie has been added to the queue`);
  };
  const removeFromWatched = () => {
    Notiflix.Notify.info(`The movie has been removed from watched`);
  };
  const removeFromQueue = () => {
    Notiflix.Notify.info(`The movie has been removed from the queue`);
  };
  const moviesWatched = JSON.parse(localStorage.getItem('movies-watched')) || [];
  const moviesQueue = JSON.parse(localStorage.getItem('movies-queue')) || [];

  /* if (localStorage.length > 0) {
    if (moviesWatched.find(item => item.id === thisMovieId)) {
      addWatchedRef.textContent = 'remove from watched';
      addWatchedRef.addEventListener('click', () => {
        localStorage.removeItem(item);
      });
    }
  }

  for (const movieQueue of moviesQueue) {
    if (String(movieQueue.id) === thisMovieId) {
      addQueueRef.textContent = 'remove from queue';
    }
  }
  */
  const onWatchedClick = async () => {
    addWatchedRef.textContent = 'remove from watched';
    if (addWatchedRef.textContent == 'remove from watched') {
      for (let movie of moviesWatched) {
        if (movie.id === thisMovieId) {
          localStorage.removeItem(movie);
        }
      }
      addWatchedRef.textContent = 'add to watch';
      if (addWatchedRef.textContent == 'add to watch') {
        console.log(thisMovieId);
        const data = await searchDetails(thisMovieId);
        if (!moviesWatched.find(item => item.id === thisMovieId)) {
          moviesWatched.push(data);
          localStorage.setItem('movies-watched', JSON.stringify(moviesWatched));
          addedToWatched();
          return;
        }
        //let index = moviesWatched.findIndex(object => object.id === thisMovieId);
        //moviesWatched.splice(index, 1);
        localStorage.setItem('movies-watched', JSON.stringify(moviesWatched));
        removeFromWatched();
      }
    }
  };

  //---Kliknięcie w add to queue
  const onQueueClick = async () => {
    if (addQueueRef.textContent.toUpperCase() === 'REMOVE FROM QUEUE') {
      addQueueRef.textContent = 'Add to queue';

      for (const movieQueue of moviesQueue) {
        if (String(movieQueue.id) === thisMovieId) {
          const posQ = moviesQueue.map(e => e.id).indexOf(Number(thisMovieId));
          moviesQueue.splice(posQ, 1);
          localStorage.setItem('movies-queue', JSON.stringify(moviesQueue));
          removeFromQueue();
        }
      }

      console.log(moviesQueue);
    } else if (addQueueRef.textContent.toUpperCase() == 'ADD TO QUEUE') {
      addQueueRef.textContent = 'remove from queue';
      const data = await searchDetails(thisMovieId);
      if (!moviesQueue.find(item => item.id === thisMovieId)) {
        moviesQueue.push(data);
        localStorage.setItem('movies-queue', JSON.stringify(moviesQueue));
        addedToQueue();
        return;
      }
      console.log(moviesQueue);
    }
  };

  closeModalBtn.addEventListener('click', closeModal);
  addWatchedRef.addEventListener('click', () => {
    onWatchedClick();
  });
  addQueueRef.addEventListener('click', onQueueClick);
}

function closeModal(e) {
  e.preventDefault();
  filmModal.classList.add('is-hidden');
  overlay.classList.add('is-hidden');
}

overlay.addEventListener('click', closeModal);
window.addEventListener('keydown', onEscKeyPress);

function onEscKeyPress(e) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = e.code === ESC_KEY_CODE;

  if (isEscKey) {
    closeModal(e);
  }
  //overlay.removeEventListener('click', closeModal);
  //window.removeEventListener('keydown', onEscKeyPress);
}

async function renderModal(data) {
  const details = await searchDetails(data);
  const {
    poster_path,
    original_title,
    title,
    id,
    overview,
    genres,
    popularity,
    vote_average,
    vote_count,
  } = details;
  filmModal.innerHTML = `
    <div class="modal-content">
        <button class = "modal-close-btn">
        <svg width="30" height="30" viewbox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 8L22 22" stroke="black" stroke-width="2"></path>
                    <path d="M8 22L22 8" stroke="black" stroke-width="2"></path>
                </svg>
        </button>
        <div class="modal-poster">
        <img class="movie-image-detail" src="https://image.tmdb.org/t/p/w342${poster_path}?api_key=a53cba9b0d8796262c7859f0f1e4d0eb"
        alt="film-poster" />
        </a>
        </div>
        <div class="modal-info-film">
            <h1 class="modal-movie-title">${title}</h1>
            <h2 id="movie-id-modal" class="is-hidden">${id}</h2>
    <div class="modal-movie">
        <div class="modal-movie-info-name">
            <p class="info-name">Vote / Votes</p>
            <p class="info-name">Popularity</p>
            <p class="info-name">Original Title</p>
            <p class="info-name">Genre</p>
        </div>
        <div class="modal-info-value">
            <p class="info-value">
                <span class="info-value__vote">${vote_average.toFixed(1)}</span>&ensp;/&ensp;

                <span class="js-info-value__votes">${vote_count}</span>
            </p>
            <p class="info-value">${popularity.toFixed(1)}</p>
            <p class="info-value">${original_title}</p>
            <p class="info-value">${genres.map(genre => genre.name).join(', ')}</p>
        </div>
    </div>
    <h2 class="modal-movie-about">About </h2>
    <p class="modal-about-text">${overview}</p>
          <ul class="modal-btn-list">
            <li class="modal-btn-list-item">
              <button class="modal-movie-btn add-watched" type="button">add to watched</button>
            </li>
            <li class="modal-btn-list-item">
              <button class="modal-movie-btn add-queue" type="button">add to queue</button>
            </li>
          </ul>
  </div>
`;
}
