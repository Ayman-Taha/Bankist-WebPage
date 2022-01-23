'use strict';

// constants

const showModalBtns = document.querySelectorAll('.btn--show-modal');
const closeModalBtn = document.querySelector('.btn--close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const navLinkContainer = document.querySelector('.nav__links');
const navLinks = document.querySelectorAll('.nav__link');
const logo = document.querySelector('.nav__logo');

const btnLearnMore = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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

const smoothScroll = function (e) {
  e.preventDefault();
  if (!e.target.classList.contains('btn--show-modal')) {
    const href = e.target.getAttribute('href');
    const section = document.querySelector(href);
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const oldSchoolSmoothScroll = function () {
  const s1coords = section1.getBoundingClientRect();
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
};

//Events and Observers

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

//smooth scrolling
navLinkContainer.addEventListener('click', smoothScroll);

//old school scrolling
btnLearnMore.addEventListener('click', oldSchoolSmoothScroll);
