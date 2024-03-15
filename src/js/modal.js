const filmModal = document.querySelector('.modal-window'); // this one should have is-hidden class - add css style based on it
const overlay = document.querySelector('.modal-filmoteka');
const modalBody = document.querySelector('body');
const closeModalBtn = document.querySelector('.modal-close-btn');

function openModal(e) {
  e.preventDefault();
  filmModal.classList.remove('is-hidden');
  overlay.classList.remove('is-hidden');
}

function closeModal(e) {
  e.preventDefault();
  filmModal.classList.add('is-hidden');
  overlay.classList.add('is-hidden');
}

overlay.addEventListener('click', closeModal);
closeModalBtn.addEventListener('click', closeModal);
window.addEventListener('keydown', onEscKeyPress);

const movieGallery = document.querySelector('.movie-gallery'); // this element will be observed for changes
const observeOptions = { attributes: true, childList: true, subtree: true };

// callback to be called whenever the observer notices any change in movieGallery node
const getMovieCards = () => {
  const movieCards = document.querySelectorAll('.movie-card-template');
  movieCards.forEach(movieCard => {
    console.log(movieCard);
    movieCard.addEventListener('click', openModal);
  });
  observer.disconnect(); // stop observing because fetch is already complete
};

const observer = new MutationObserver(getMovieCards);
observer.observe(movieGallery, observeOptions);

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
                <span class="info-value__vote">${data.vote_average.toFixed(1)}</span>&ensp;/&ensp; 

                <span class="js-info-value__votes">${data.vote_count}</span>
            </p>
            <p class="info-value">${data.popularity}</p>
            <p class="info-value">${data.original_title}</p>
            <p class="info-value">${data.genres.map(genre => genre.name).join(', ')}</p>
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