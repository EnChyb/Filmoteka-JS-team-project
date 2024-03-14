
const openModalTeamBtn = document.querySelector("#modal-team-open");
const closeModalTeamBtn= document.querySelector("[data-modal-team-close]");
const modalTeam= document.querySelector("#modal-team");

  
openModalTeamBtn.addEventListener("click", toggleModalTeam);
closeModalTeamBtn.addEventListener("click", toggleModalTeam);
document.addEventListener("keydown", (e) => {
    if (e.key === 'Escape') {
        modalTeam.classList.add("is-hidden");
    }
});
document.addEventListener("click", (e) => {
    if (e.target === modalTeam) {
        modalTeam.classList.add("is-hidden");
    }
});
  
function toggleModalTeam() {
      modalTeam.classList.toggle("is-hidden");
};
