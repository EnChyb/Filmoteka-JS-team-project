(() => {
    const refs = {
      openModalBtn: document.querySelector("[data-modal-open-subscribe]"),
      closeModalBtn: document.querySelector("[data-modal-close-window]"),
      modal: document.querySelector("[data-modal-window]"),
    };
  
    refs.openModalBtn.addEventListener("click", toggleModal);
    refs.closeModalBtn.addEventListener("click", toggleModal);
  
    function toggleModal() {
      refs.modal.classList.toggle("is-hidden");
    }
  })();