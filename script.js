'use strict';
// constants

const showModalBtns = document.querySelectorAll('.btn--show-modal');
const closeModalBtn = document.querySelector('.btn--close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const navLinkContainer = document.querySelector('.nav__links');
const navLinks = document.querySelectorAll('.nav__link');
const logo = document.querySelector('.nav__logo');

//functions

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const navLinkFade = function (e) {
  if (e.target.classList.contains('nav__link')) {
    navLinks.forEach(navLink => {
      if (navLink !== e.target) {
        navLink.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
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

// nav links fading
navLinkContainer.addEventListener('mouseover', navLinkFade.bind(0.5));
navLinkContainer.addEventListener('mouseout', navLinkFade.bind(1));
