import Notiflix from 'notiflix';

const addToWatched = document.querySelector('.add-watched');
const addToQueue = document.querySelector('.add-queue');

const localStorage = movie => {
  const addedToWatched = () => {
    Notiflix.Notify.info(`The movie: "${movie.data.title}" has been added to watched`);
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
};
