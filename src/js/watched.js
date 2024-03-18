import Notiflix from 'notiflix';
import { searchDetails } from './database';
import { openModal } from './modal';

let ID;

const localStorage = event => {
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

  const addWatchedRef = document.querySelector('.add-watched');
  const addQueueRef = document.querySelector('.add-queue');

  if (localStorage.length > 0) {
    if (moviesWatched.find(item => item.id === ID)) {
      addWatchedRef.textContent = 'remove from watched';
    }
  }
  if (localStorage.length > 0) {
    if (moviesQueue.find(item => item.id === ID)) {
      addQueueRef.textContent = 'remove from queue';
    }
  }

  addWatchedRef.addEventListener('click', onWatchedClick);
  addQueueRef.addEventListener('click', onQueueClick);

  const onWatchedClick = async () => {
    ID = openModal(e);
    console.log(ID);
    const data = await searchDetails(ID);
    if (!moviesWatched.find(item => item.id === ID)) {
      moviesWatched.push(data);
      localStorage.setItem('movies-watched', JSON.stringify(moviesWatched));
      addToWatched();
      return;
    }
    let index = moviesWatched.findIndex(object => object.id === ID);
    moviesWatched.splice(index, 1);
    localStorage.setItem('movies-watched', JSON.stringify(moviesWatched));
    removeFromWatched();
  };
  const onQueueClick = async () => {
    ID = openModal();
    console.log(ID);
    const data = await searchDetails(ID);
    if (!moviesQueue.find(item => item.id === ID)) {
      moviesQueue.push(data);
      localStorage.setItem('movies-queue', JSON.stringify(moviesQueue));
      addToQueue();
      return;
    }
    let index = moviesQueue.findIndex(object => object.id === ID);
    moviesQueue.splice(index, 1);
    localStorage.setItem('movies-queue', JSON.stringify(moviesQueue));
    infoRemoveFromQueue();
  };
};
