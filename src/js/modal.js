import { showBackdrop, closeBackdrop } from './backdrop.js';

const filmModal = document.querySelector('.movie-modal');
const filmModalMask = document.querySelector('.modal-filmoteka');
const modalBody = document.querySelector('body');

filmModalMask.addEventListener('click', closeModal);

export function showModal(data) {
  renderModal(data);
  const closeBtn = document.querySelector('.modal-close-btn');
  closeBtn.addEventListener('click', closeModal);
  filmModal.classList.remove('is-hidden');
  showBackdrop();
  window.addEventListener('keydown', onEscKeyPress);

  locStorage(data);
}

function closeModal(e) {
  e.preventDefault();
  filmModal.classList.add('is-hidden');
  closeBackdrop();
  window.removeEventListener('keydown', onEscKeyPress);
}

function onEscKeyPress(e) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = e.code === ESC_KEY_CODE;

  if (isEscKey) {
    closeModal(e);
  }
}

function getPosterImg(path, title) {
  if (!path) return '';
  const posterPath = `https://api.themoviedb.org/3/search/movie?api_key=a53cba9b0d8796262c7859f0f1e4d0eb${path}`;
  return `<img class = "modal-poster-img" src="${posterPath}" alt="${title}">`;
}

function renderModal(data) {
  filmModal.innerHTML = `
    <div class="modal-content">
        <button class = "modal-close-btn">
        <svg width="30" height="30" viewbox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 8L22 22" stroke="black" stroke-width="2"></path>
                    <path d="M8 22L22 8" stroke="black" stroke-width="2"></path>
                </svg>
        </button>
        <div class="modal-poster">
            ${getPosterImg(data.poster_path, data.title)}
        </div>
        <div class="modal-info-film">
            <h1 class="modal-movie-title">${data.title}</h1>
    <div class="modal-movie">
        <div class="modal-movie-info-name">
            <p class="info-name">Vote / Votes</p>
            <p class="info-name">Popularity</p>
            <p class="info-name">Original Title</p>
            <p class="info-name">Genre</p>
        </div>
        <div class="modal-info-value">
            <p class="info-value">
                <span class="info-value__vote">${data.vote_average.toFixed(
                  1
                )}</span>&ensp;/&ensp; 

                <span class="js-info-value__votes">${data.vote_count}</span>
            </p>
            <p class="info-value">${data.popularity}</p>
            <p class="info-value">${data.original_title}</p>
            <p class="info-value">${data.genres
              .map(genre => genre.name)
              .join(', ')}</p>
        </div>
    </div>
    <h2 class="modal-movie-about">About </h2>
    <p class="modal-about-text">${data.overview}</p>
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
