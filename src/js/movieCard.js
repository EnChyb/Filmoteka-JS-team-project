const photoCard = document.querySelector('.photo-card');

export function renderMovie(database) {
  const movies = database.data.results;
  const markup = movies
    .map(
      ({ image, alt, name, tags, year, grade }) => `
      <div class="movie-card-template">
        <a class="movie-image">
          <img src="${image}" alt="${alt}" loading="lazy" />
        </a>
        <div class="movie-info">
          <p class="movie-name">${name}</p>
          <div class="tags-grade-wrap">
            <p class="movie-tags-year">${tags} | ${year}</p>
            <p class="movie-grade">${grade}</p>
        </div>
      </div>
    `,
    )
    .join('');
  photoCard.insertAdjacentHTML('beforeend', markup);
}
