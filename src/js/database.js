import axios from 'axios';
const photoCard = document.querySelector('.movie-gallery');

// gdyby był problem z autoryzacją wrzucić do *Options.headers
// Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTNjYmE5YjBkODc5NjI2MmM3ODU5ZjBmMWU0ZDBlYiIsInN1YiI6IjY1ZWExNzQ2NmEyMjI3MDE2Mzk1YTI0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fzc0o8w2TrTKhHRsCzNh2iOOm_E6YThcasNUoIPbAog',

// database domyślnie ma 42863 stron każda po 20 filmów
// i w sumie jest 857258 wyników mamy w czym wybierać xDD

let movieId;
let keywords = 'black%20panther'; // słowo/słowa klucz do wywołania z inputa
//domyślnie baza danych łączy słowa używając "%20"
let language = 'en-US'; // lista do wyrenderowania ze strony lub zrobimy własną, żeby okroić projekt
let includeAdult = 'false'; //default 'false' boolean
let pageNum = '1';

const searchOptions = {
  params: {
    query: keywords,
    include_adult: includeAdult,
    language: language,
    page: pageNum,
  },
  headers: {
    accept: 'application/json',
  },
};

async function searchMovie() {
  const response = await axios.get(
    'https://api.themoviedb.org/3/search/movie?api_key=a53cba9b0d8796262c7859f0f1e4d0eb',
    searchOptions,
  );
  const database = response.data.results;
  // console.log(database);
}

try {
  searchDetails();
} catch (error) {
  console.log(error);
}

//Wyszukiwarka popularnych na główną
//ze zmiennych tylko to ID i język
//------------------------------------------------------//
const popularOptions = {
  params: { language: language, page: pageNum },
  headers: {
    accept: 'application/json',
  },
};

export async function searchPopular() {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=a53cba9b0d8796262c7859f0f1e4d0eb`,
    popularOptions,
  );
  const database = response.data.results;
  console.log(database);
  const markup = database
    .map(
      ({ poster_path, title, vote_average, vote_count, release_date, genre_ids, id }) => `
    <div class="movie-card-template" data-modal-open-window data-movie-id="${id}">
      <a class="movie-image">
        <img src="https://image.tmdb.org/t/p/w500${poster_path}?api_key=a53cba9b0d8796262c7859f0f1e4d0eb" 
        alt="film-poster" />
      </a>
      <div class="movie-info">
        <p class="movie-name">${title}</p>
        <div class="tags-grade-wrap">
          <p class="movie-tags-year">${genre_ids} | ${release_date}</p>
          <p class="movie-grade">${vote_average}</p>
          <p class="movie-grade" style="display: none;">${vote_count}</p>
          </div>
    </div>
    </div>
  `,
    )
    .join('');
  photoCard.insertAdjacentHTML('beforeend', markup);
  movieId = database.id;
  console.log(movieId);
}

//Wyszukiwarka detali filmu po movie_id
//ze zmiennych tylko to ID i język
//------------------------------------------------------//
const detailsOptions = {
  params: { language: 'en-US' },
  headers: {
    accept: 'application/json',
  },
};

async function searchDetails() {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/550?api_key=a53cba9b0d8796262c7859f0f1e4d0eb`,
    detailsOptions,
  );
  const database = response.data;
  console.log(database);
}

//fetch listy gatunków z id
//------------------------------------------------------//
const genresOptions = {
  params: { language: language },
  headers: {
    accept: 'application/json',
  },
};

async function genresList() {
  const response = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=a53cba9b0d8796262c7859f0f1e4d0eb`,
    genresOptions,
  );
  const database = response.data;
  console.log(database);
}

//fetch listy języków dostępnych
//w tej bazie danych do wykorzystania później lub nie
//------------------------------------------------------//
async function languageList() {
  const response = await axios.get(
    'https://api.themoviedb.org/3/configuration/languages?api_key=a53cba9b0d8796262c7859f0f1e4d0eb',
  );
  const database = response.data;
  console.log(database);
}
