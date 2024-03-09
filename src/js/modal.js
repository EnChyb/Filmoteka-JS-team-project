const apiKey = 'a53cba9b0d8796262c7859f0f1e4d0eb';

async function fetchData(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

  try {
    const response = await axios.get(url);
    const movieData = response.data;
    updateModal(movieData);
  } catch (error) {
    console.error(error);
  }
}

function updateModal(movieData) {
  // Aktualizacja modala na podstawie pobranych danych z API
  document.getElementById('movie-title').innerText = movieData.title;
  document.getElementById('vote-average').innerText = `Vote: ${movieData.vote_average}`;
  document.getElementById('popularity').innerText = `Popularity: ${movieData.popularity}`;
  document.getElementById('original-title').innerText = `Original Title: ${movieData.original_title}`;
  document.getElementById('genre').innerText = `Genre: ${getGenreNames(movieData.genres)}`;
  document.getElementById('about-text').innerText = movieData.overview;

  // Otwarcie okna modalnego
  openModal();
}

function getGenreNames(genres) {
  return genres.map(genre => genre.name).join(', ');
}

function openModal() {
  const modalWindow = document.querySelector('.modal-window');
  if (modalWindow) {
    modalWindow.style.display = 'block';
  }
}
