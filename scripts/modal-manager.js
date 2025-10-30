document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-modal-target]').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = button.dataset.modalTarget;
      const modal = document.querySelector(modalId);
      if (modal) {
        modal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  document.querySelectorAll('.modal .close-button').forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      if (modal) {
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  });

  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  });
});
