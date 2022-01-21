'use strict';
// constants

const showModalBtns = document.querySelectorAll('.btn--show-modal');
const closeModalBtn = document.querySelector('.btn--close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

//functions

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//Events

//modal controls

showModalBtns.forEach(function (btn) {
  btn.addEventListener('click', openModal);
});

closeModalBtn.addEventListener('click', closeModal);
document.addEventListener('keyup', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

overlay.addEventListener('click', function (e) {
  if (!modal.classList.contains('hidden')) {
    closeModal();
  }
});
