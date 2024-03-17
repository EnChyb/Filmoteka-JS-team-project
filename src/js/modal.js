import { searchDetails } from './database';

const filmModal = document.querySelector('.modal-window');
const overlay = document.querySelector('.modal-filmoteka');
const modalBody = document.querySelector('body');

export async function openModal(e) {
  const thisMovieId = e.currentTarget.querySelector('#movie-id').innerHTML;
  console.log(thisMovieId);
  await renderModal(thisMovieId);
  filmModal.classList.remove('is-hidden');
  overlay.classList.remove('is-hidden');
  const closeModalBtn = document.querySelector('.modal-close-btn');
  closeModalBtn.addEventListener('click', closeModal);
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
}

async function renderModal(data) {
  const details = await searchDetails(data);
  const {
    poster_path,
    original_title,
    title,
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
    <ul class = "modal-btn-list">
        <li class = "modal-btn-list-item">
            <button class="modal-movie-btn add-watched" type = "button">add to Watched</button>
        </li>
        <li class = "modal-btn-list-item">
            <button class="modal-movie-btn add-queue" type = "button">add to queue</button>
        </li>
    </ul>
        </div>
    </div>`;
}
