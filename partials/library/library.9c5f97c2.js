function e(e,a,i,t){Object.defineProperty(e,a,{get:i,set:t,enumerable:!0,configurable:!0})}var a=globalThis,i={},t={},o=a.parcelRequired7c6;null==o&&((o=function(e){if(e in i)return i[e].exports;if(e in t){var a=t[e];delete t[e];var o={id:e,exports:{}};return i[e]=o,a.call(o.exports,o,o.exports),o.exports}var r=Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,a){t[e]=a},a.parcelRequired7c6=o),(0,o.register)("dykmQ",function(a,i){function t(){let e=document.querySelector("#movie-items-lib");if(console.log(e),e.innerHTML="",JSON.parse(localStorage.getItem("movies-watched")))try{let a=(JSON.parse(localStorage.getItem("movies-watched"))||[]).map(({poster_path:e,title:a,vote_average:i,release_date:t,genres:o,id:r})=>{let s=[];for(let e of o)s.push(e.name);return`
    <div class="movie-card-template" data-modal-open-window>
    <h2 id="movie-id" class="is-hidden">${r}</h2>
    <a class="movie-image">
    <img class="movie-image-detail" src="https://image.tmdb.org/t/p/w500${e}?api_key=a53cba9b0d8796262c7859f0f1e4d0eb" onerror="this.src='https://cdn.pixabay.com/photo/2019/04/24/21/55/cinema-4153289_960_720.jpg';"
    alt="film-poster" />
    </a>
    <div class="movie-info">
    <p class="movie-name">${a}</p>
    <div class="tags-grade-wrap">
    <p class="movie-tags-year">${s.slice(0,3).join(", ")} | ${t.slice(0,4)}</p>
    <p class="movie-grade">${i.toFixed(1)}</p>
    </div>
    </div>
    </div>`}).join("");e.insertAdjacentHTML("afterbegin",a)}catch(e){return console.log(e),[]}}function o(){let e=document.querySelector("#movie-items-lib");if(console.log(e),e.innerHTML="",JSON.parse(localStorage.getItem("movies-queue")))try{let a=(JSON.parse(localStorage.getItem("movies-queue"))||[]).map(({poster_path:e,title:a,vote_average:i,release_date:t,genres:o,id:r})=>{let s=[];for(let e of o)s.push(e.name);return`
    <div class="movie-card-template" data-modal-open-window>
    <h2 id="movie-id" class="is-hidden">${r}</h2>
    <a class="movie-image">
    <img class="movie-image-detail" src="https://image.tmdb.org/t/p/w500${e}?api_key=a53cba9b0d8796262c7859f0f1e4d0eb"
    alt="film-poster" />
    </a>
    <div class="movie-info">
    <p class="movie-name">${a}</p>
    <div class="tags-grade-wrap">
    <p class="movie-tags-year">${s.slice(0,3).join(", ")} | ${t.slice(0,4)}</p>
    <p class="movie-grade">${i.toFixed(1)}</p>
    </div>
    </div>
    </div>`}).join("");e.insertAdjacentHTML("afterbegin",a)}catch(e){return console.log(e),[]}}e(a.exports,"watchedToLibrary",()=>t),e(a.exports,"queueToLibrary",()=>o)}),o("dykmQ");
//# sourceMappingURL=library.9c5f97c2.js.map
