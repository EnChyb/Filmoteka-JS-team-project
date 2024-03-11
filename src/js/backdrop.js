const modalWindows = document.querySelectorAll('[data-modal-window]');
const closeButtons = document.querySelectorAll('[data-modal-close-window]');

function closeModal() {
  modalWindows.forEach(modal => {
    modal.style.display = 'none';
  });
}

// obsługa zamykania po kliknięciu przycisku zamknięcia
closeButtons.forEach(button => {
  button.addEventListener('click', closeModal);
});

// obsługa zamykania po naciśnięciu klawisza Escape
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// obsługa zamykania po kliknięciu poza oknem modalnym
window.addEventListener('click', (event) => {
  if (event.target === modalWindows[0]) {
    closeModal();
  }
});

modalWindows.forEach(modal => {
  modal.classList.add('show');
});

// otwieranie okna modalnego (możesz dostosować tę część według swoich potrzeb)
const openButton = document.getElementById('open-modal-button'); // Przykładowy przycisk otwierający modal
openButton.addEventListener('click', () => {
  modalWindows.forEach(modal => {
    modal.style.display = 'block';
  });
});
