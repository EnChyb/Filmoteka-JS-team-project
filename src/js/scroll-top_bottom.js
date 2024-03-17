const toTop = document.querySelector(".scroll-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 250) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
})