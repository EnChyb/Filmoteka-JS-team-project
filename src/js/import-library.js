
import { watchedToLibrary, queueToLibrary } from "./watched";


const watchedBtn = document.querySelector('#watched');
const queueBtn = document.querySelector('#queue');

watchedBtn.addEventListener("click", watchedToLibrary);
queueBtn.addEventListener("click", queueToLibrary);
