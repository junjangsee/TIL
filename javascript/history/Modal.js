class Modal {
  constructor() {
    this.openModalBtn = document.querySelector('.open-modal-btn');
    this.modal = document.querySelector('.modal-wrapper');
    this.modalCloseBtn = this.modal.querySelector('.btn-close');

    window.onpopstate = () => {
      this.modal.classList.remove('active');
    };
  }

  mount() {
    this.openModalBtn.addEventListener('click', () => {
      this.modal.classList.add('active');
      history.pushState({ data: 'modal history' }, 'modal', null);
    });

    this.modalCloseBtn.addEventListener('click', () => {
      history.back();
    });
  }
}
