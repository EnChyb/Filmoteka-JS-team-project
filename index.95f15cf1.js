let e,t,a;function i(e){return e&&e.__esModule?e.default:e}var o=globalThis,s={},n={},d=o.parcelRequired7c6;null==d&&((d=function(e){if(e in s)return s[e].exports;if(e in n){var t=n[e];delete n[e];var a={id:e,exports:{}};return s[e]=a,t.call(a.exports,a,a.exports),a.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},o.parcelRequired7c6=d),d.register,d("4l9KP");const l=document.querySelectorAll(".team-link"),c=document.querySelectorAll("[data-modal-team-close]"),r=document.querySelector(".modal-team-container"),m=document.querySelector(".modal-team-backdrop");function u(){r.classList.toggle("is-hidden"),m.classList.toggle("is-hidden")}l.forEach(e=>{e.addEventListener("click",u)}),c.forEach(e=>{e.addEventListener("click",u)}),document.addEventListener("keydown",e=>{"Escape"===e.key&&(r.classList.add("is-hidden"),m.classList.add("is-hidden"))}),document.addEventListener("click",e=>{e.target===r&&(r.classList.add("is-hidden"),m.classList.add("is-hidden"))});var v=d("lzX4I"),p=d("4l9KP");const h=document.querySelector(".modal-window"),f=document.querySelector(".modal-filmoteka");async function g(e){let t=e.currentTarget.querySelector("#movie-id").innerHTML;await L(t),h.classList.remove("is-hidden"),f.classList.remove("is-hidden");let a=document.querySelector(".modal-close-btn"),o=document.querySelector(".add-watched"),s=document.querySelector(".add-queue");a.addEventListener("click",y);let n=()=>{i(v).Notify.info("The movie has been added to watched")},d=()=>{i(v).Notify.info("The movie has been added to the queue")},l=()=>{i(v).Notify.info("The movie has been removed from watched")},c=JSON.parse(localStorage.getItem("movies-watched"))||[],r=JSON.parse(localStorage.getItem("movies-queue"))||[],m=async()=>{if(o.textContent="remove from watched","remove from watched"==o.textContent){for(let e of c)e.id===t&&localStorage.removeItem(e);if(o.textContent="add to watch","add to watch"==o.textContent){console.log(t);let e=await (0,p.searchDetails)(t);if(!c.find(e=>e.id===t)){c.push(e),localStorage.setItem("movies-watched",JSON.stringify(c)),n();return}localStorage.setItem("movies-watched",JSON.stringify(c)),l()}}let e=async()=>{console.log(t);let e=await (0,p.searchDetails)(t);if(!r.find(e=>e.id===t)){r.push(e),localStorage.setItem("movies-queue",JSON.stringify(r)),d();return}localStorage.setItem("movies-queue",JSON.stringify(r)),infoRemoveFromQueue()};o.addEventListener("click",m),s.addEventListener("click",e)}}function y(e){e.preventDefault(),h.classList.add("is-hidden"),f.classList.add("is-hidden")}async function L(e){let{poster_path:t,original_title:a,title:i,id:o,overview:s,genres:n,popularity:d,vote_average:l,vote_count:c}=await (0,p.searchDetails)(e);h.innerHTML=`
    <div class="modal-content">
        <button class = "modal-close-btn">
        <svg width="30" height="30" viewbox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 8L22 22" stroke="black" stroke-width="2"></path>
                    <path d="M8 22L22 8" stroke="black" stroke-width="2"></path>
                </svg>
        </button>
        <div class="modal-poster">
        <img class="movie-image-detail" src="https://image.tmdb.org/t/p/w342${t}?api_key=a53cba9b0d8796262c7859f0f1e4d0eb"
        alt="film-poster" />
        </a>
        </div>
        <div class="modal-info-film">
            <h1 class="modal-movie-title">${i}</h1>
            <h2 id="movie-id-modal" class="is-hidden">${o}</h2>
    <div class="modal-movie">
        <div class="modal-movie-info-name">
            <p class="info-name">Vote / Votes</p>
            <p class="info-name">Popularity</p>
            <p class="info-name">Original Title</p>
            <p class="info-name">Genre</p>
        </div>
        <div class="modal-info-value">
            <p class="info-value">
                <span class="info-value__vote">${l.toFixed(1)}</span>&ensp;/&ensp;

                <span class="js-info-value__votes">${c}</span>
            </p>
            <p class="info-value">${d.toFixed(1)}</p>
            <p class="info-value">${a}</p>
            <p class="info-value">${n.map(e=>e.name).join(", ")}</p>
        </div>
    </div>
    <h2 class="modal-movie-about">About </h2>
    <p class="modal-about-text">${s}</p>
    <ul class = "modal-btn-list">
        <li class = "modal-btn-list-item">
            <button class="modal-movie-btn add-watched" type = "button">add to Watched</button>
        </li>
        <li class = "modal-btn-list-item">
            <button class="modal-movie-btn add-queue" type = "button">add to queue</button>
        </li>
    </ul>
        </div>
    </div>`}document.querySelector("body"),f.addEventListener("click",y),window.addEventListener("keydown",function(e){"Escape"===e.code&&y(e)});var v=d("lzX4I"),p=d("4l9KP");const b=document.querySelector(".movie-gallery"),w=document.querySelector(".page-btn.prev"),S=document.querySelector(".page-btn.next"),q=document.querySelector(".pagination-container"),k=document.querySelector(".main-header-input"),E=document.querySelector(".main-header-form"),x=document.querySelector(".main-header-fail");document.querySelector(".main-header-submit");const _=document.querySelector(".loader");function $(){_.classList.add("hidden"),b.classList.remove("hidden"),q.classList.remove("hidden"),w.classList.remove("hidden"),S.classList.remove("hidden")}function N(){_.classList.remove("hidden"),b.classList.add("hidden"),q.classList.add("hidden"),w.classList.add("hidden"),S.classList.add("hidden")}let T=1,C={...p.popularOptions};function O(){let e=document.querySelectorAll(".movie-card-template");e.length?[...e].forEach(e=>{e.addEventListener("click",g)}):setTimeout(O,1e3)}async function M(){(C={...p.popularOptions}).params.page=T,t=await (0,p.searchPopular)(),a=await (0,p.genresList)(),N(),D(t),O()}async function I(o){1===T&&o.preventDefault();try{(C={...p.searchOptions}).params.page=T,e=k.value.split(" ").join("20%"),console.log(e),C.params.query=e,t=await (0,p.searchMovie)(),console.log(t),console.log("fetchsearch"),a=await (0,p.genresList)(),N(),D(t),O(),t.length>0&&(i(v).Notify.success(`Found ${t.length} movies for this page!`),x.style.opacity=0),0===t.length&&(x.style.opacity=1),k.value=""}catch(e){i(v).Notify.failure("Sorry, failed to fetch searched movies"),console.log(`fetchSearch error: ${e}`)}}function D(e){document.querySelector("#movie-items").innerHTML="";let t=e.map(({poster_path:e,title:t,vote_average:i,release_date:o,genre_ids:s,id:n})=>{let d={},l=[];return a.map(e=>(d[e.id]=e.name,s.includes(e.id)&&l.push(e.name),l)),`
    <div class="movie-card-template" data-modal-open-window>
    <h2 id="movie-id" class="is-hidden">${n}</h2>
    <a class="movie-image">
    <img class="movie-image-detail" src="https://image.tmdb.org/t/p/w500${e}?api_key=a53cba9b0d8796262c7859f0f1e4d0eb"
    alt="film-poster" />
    </a>
    <div class="movie-info">
    <p class="movie-name">${t}</p>
    <div class="tags-grade-wrap">
    <p class="movie-tags-year">${l.slice(0,3).join(", ")} | ${o.slice(0,4)}</p>
    <p class="movie-grade">${i.toFixed(1)}</p>
    </div>
    </div>
    </div>`}).join("");b.insertAdjacentHTML("beforeend",t),setTimeout($,1e3)}function j(){if(q.innerHTML="",T>=1&&T<=3)for(let e=1;e<=5;e++){let t=document.createElement("button");t.textContent=e,t.classList.add("page-btn"),e===T&&t.classList.add("active"),t.addEventListener("click",()=>{T=e,C.params.page=T,""===k.value?M():I(),j()}),q.appendChild(t)}if(T>=4){let e=document.createElement("button");if(e.textContent=1,e.classList.add("page-btn"),q.appendChild(e),e.addEventListener("click",()=>{T=1,C.params.page=T,""===k.value?M():I(),j()}),T>=5){let e=document.createElement("button");e.textContent="...",e.classList.add("page-btn"),q.appendChild(e)}for(let e=1;e<=5;e++){let t=document.createElement("button");t.textContent=e-3+T,t.classList.add("page-btn"),3===e&&t.classList.add("active"),t.addEventListener("click",()=>{T=e+T-3,C.params.page=T,""===k.value?M():I(),j()}),q.appendChild(t)}}}E.addEventListener("submit",I),w.addEventListener("click",function(){T>1&&(T--,""===k.value?M():I(),j())}),S.addEventListener("click",function(){if(T<=50)T++,""===k.value?M():I(),j();else{i(v).Notify.failure("Sorry, there are no more pages");return}}),async function(){await M(),j()}();const F=document.querySelector(".scroll-top");window.addEventListener("scroll",()=>{window.scrollY>250?F.classList.add("active"):F.classList.remove("active")}),d("dykmQ");
//# sourceMappingURL=index.95f15cf1.js.map
