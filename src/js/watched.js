import Notiflix from 'notiflix';

const addToWatched = document.querySelector('.add-watched');
const addToQueue = document.querySelector('.add-queue');

const localStorage = movieId => {
  const addedToWatched = () => {
    Notiflix.Notify.info(`The movie: "${movieId.title}" has been added to watched`);
  };
  const addedToQueue = () => {
    Notiflix.Notify.info(`The movie: "${movie.data.title}" has been added to the queue`);
  };
  const removeFromWatched = () => {
    Notiflix.Notify.info(`The movie: "${movie.data.title}" has been removed from watched`);
  };
  const removeFromQueue = () => {
    Notiflix.Notify.info(`The movie: "${movie.data.title}" has been removed from the queue`);
  };
  const moviesWatched = JSON.parse(localStorage.getItem('movies-watched')) || [];
  const moviesQueue = JSON.parse(localStorage.getItem('movies-queue')) || [];

  const addWatchedRef = document.querySelector('.add-watched');
  const addQueueRef = document.querySelector('.add-queue');

  if (localStorage.length > 0) {
    if (moviesWatched.find(item => item.id === film.data.id)) {
      addWatchedRef.textContent = 'remove from watched';
    }
  }
  if (localStorage.length > 0) {
    if (moviesQueue.find(item => item.id === film.data.id)) {
      addQueueRef.textContent = 'remove from queue';
    }
  }

  addWatchedRef.addEventListener('click', onWatchedClick);
  addQueueRef.addEventListener('click', onQueueClick);

  function onWatchedClick() {
    console.log(film);
    if (!moviesWatched.find(item => item.id === film.data.id)) {
      moviesWatched.push(film.data);
      localStorage.setItem('movies-watched', JSON.stringify(moviesWatched));
      addToWatched();
      return;
    }
    let index = moviesWatched.findIndex(object => object.id === film.data.id);
    moviesWatched.splice(index, 1);
    localStorage.setItem('movies-watched', JSON.stringify(moviesWatched));
    removeFromWatched();
  }
  function onQueueClick() {
    if (!moviesQueue.find(item => item.id === film.data.id)) {
      moviesQueue.push(film.data);
      localStorage.setItem('movies-queue', JSON.stringify(moviesQueue));
      addToQueue();
      return;
    }
    let index = moviesQueue.findIndex(object => object.id === film.data.id);
    moviesQueue.splice(index, 1);
    localStorage.setItem('movies-queue', JSON.stringify(moviesQueue));
    infoRemoveFromQueue();
  }
};
