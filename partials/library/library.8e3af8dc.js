function e(e,a,t,i){Object.defineProperty(e,a,{get:t,set:i,enumerable:!0,configurable:!0})}var a=globalThis,t={},i={},o=a.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in i){var a=i[e];delete i[e];var o={id:e,exports:{}};return t[e]=o,a.call(o.exports,o,o.exports),o.exports}var r=Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,a){i[e]=a},a.parcelRequired7c6=o),(0,o.register)("dykmQ",function(a,t){e(a.exports,"watchedToLibrary",()=>r),e(a.exports,"queueToLibrary",()=>s);var i=o("40lI0");function r(){let e=document.querySelector("#movie-items-lib");if(console.log(e),e.innerHTML="",JSON.parse(localStorage.getItem("movies-watched")))try{let a=(JSON.parse(localStorage.getItem("movies-watched"))||[]).map(({poster_path:e,title:a,vote_average:t,release_date:i,genres:o,id:r})=>{let s=[];for(let e of o)s.push(e.name);return`
    <div class="movie-card-template" data-modal-open-window>
    <h2 id="movie-id" class="is-hidden">${r}</h2>
    <a class="movie-image">
    <img class="movie-image-detail" src="https://image.tmdb.org/t/p/w500${e}?api_key=a53cba9b0d8796262c7859f0f1e4d0eb" onerror="this.src='https://cdn.pixabay.com/photo/2019/04/24/21/55/cinema-4153289_960_720.jpg';"
    alt="film-poster" />
    </a>
    <div class="movie-info">
    <p class="movie-name">${a}</p>
    <div class="tags-grade-wrap">
    <p class="movie-tags-year">${s.slice(0,3).join(", ")} | ${i.slice(0,4)}</p>
    <p class="movie-grade">${t.toFixed(1)}</p>
    </div>
    </div>
    </div>`}).join("");e.insertAdjacentHTML("afterbegin",a)}catch(e){return console.log(e),[]}document.querySelectorAll(".movie-card-template").forEach(e=>{e.addEventListener("click",e=>{(0,i.openModal)(e)})})}function s(){let e=document.querySelector("#movie-items-lib");if(console.log(e),e.innerHTML="",JSON.parse(localStorage.getItem("movies-queue")))try{let a=(JSON.parse(localStorage.getItem("movies-queue"))||[]).map(({poster_path:e,title:a,vote_average:t,release_date:i,genres:o,id:r})=>{let s=[];for(let e of o)s.push(e.name);return`
    <div class="movie-card-template" data-modal-open-window>
    <h2 id="movie-id" class="is-hidden">${r}</h2>
    <a class="movie-image">
    <img class="movie-image-detail" src="https://image.tmdb.org/t/p/w500${e}?api_key=a53cba9b0d8796262c7859f0f1e4d0eb"
    alt="film-poster" />
    </a>
    <div class="movie-info">
    <p class="movie-name">${a}</p>
    <div class="tags-grade-wrap">
    <p class="movie-tags-year">${s.slice(0,3).join(", ")} | ${i.slice(0,4)}</p>
    <p class="movie-grade">${t.toFixed(1)}</p>
    </div>
    </div>
    </div>`}).join("");e.insertAdjacentHTML("afterbegin",a)}catch(e){return console.log(e),[]}document.querySelectorAll(".movie-card-template").forEach(e=>{e.addEventListener("click",e=>{(0,i.openModal)(e)})})}}),o("dykmQ");
//# sourceMappingURL=library.8e3af8dc.js.map
