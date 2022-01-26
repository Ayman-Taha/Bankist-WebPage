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

const navHeader = document.querySelector('.nav');
const header = document.querySelector('header');

const allSections = document.querySelectorAll('.section');

const imgs = document.querySelectorAll('img[data-src]');

const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContents = document.querySelectorAll('.operations__content');

const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');
const leftBtn = document.querySelector('.slider__btn--left');
const rightBtn = document.querySelector('.slider__btn--right');

//functions

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

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

const stickyObsFunc = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    navHeader.classList.add('sticky');
  } else {
    navHeader.classList.remove('sticky');
  }
};

const sectionObsFunc = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    sectionObserver.unobserve(entry.target);
  }
};

const lazyLoadObsFunc = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });
    lazyLoadObserver.unobserve(entry.target);
  }
};

const tabsFunction = function (e) {
  const selectedTab = e.target.closest('.btn');
  if (selectedTab) {
    tabs.forEach(function (tab) {
      tab.classList.remove('operations__tab--active');
    });
    tabsContents.forEach(function (tabContent) {
      tabContent.classList.remove('operations__content--active');
    });
    selectedTab.classList.add('operations__tab--active');
    document
      .querySelector(`.operations__content--${selectedTab.dataset.tab}`)
      .classList.add('operations__content--active');
  }
};

const init = function () {
  for (let i = 0; i < slides.length; i++) {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<span class="dots__dot" data-dot="${i}"></span>`
    );
  }
  activateSlide(0);
  activateDot(0);
};

const activateSlide = function (slide) {
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

const activateDot = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(function (d) {
    d.classList.remove('dots__dot--active');
  });
  document
    .querySelector(`[data-dot="${slide}"]`)
    .classList.add('dots__dot--active');
};

const nextSlide = function () {
  if (currentSlide >= slides.length - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  activateSlide(currentSlide);
  activateDot(currentSlide);
};

const prevSlide = function () {
  if (currentSlide <= 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide--;
  }
  activateSlide(currentSlide);
  activateDot(currentSlide);
};

const dotClick = function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const dotClicked = Number.parseInt(e.target.dataset.dot);
    activateSlide(dotClicked);
    activateDot(dotClicked);
  }
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

//sticky nav bar with observer API
const stickyObsOptionsObj = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};
const stickyObserver = new IntersectionObserver(
  stickyObsFunc,
  stickyObsOptionsObj
);
stickyObserver.observe(header);

//section reveal with observer API
const sectionObsOptionsObj = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
};
const sectionObserver = new IntersectionObserver(
  sectionObsFunc,
  sectionObsOptionsObj
);
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//lazy loading
const lazyLoadObsOptionsObj = {
  root: null,
  rootMargin: '100px',
  threshold: 0,
};
const lazyLoadObserver = new IntersectionObserver(
  lazyLoadObsFunc,
  lazyLoadObsOptionsObj
);
imgs.forEach(function (img) {
  lazyLoadObserver.observe(img);
});

//tabbed component
tabsContainer.addEventListener('click', tabsFunction);

//slider

//init
let currentSlide = 0;
init();

//arrows
rightBtn.addEventListener('click', nextSlide);
leftBtn.addEventListener('click', prevSlide);

//keyboard
document.addEventListener('keyup', function (e) {
  if (e.key === 'ArrowLeft') {
    prevSlide();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
  }
});

//dots
dotsContainer.addEventListener('click', dotClick);

// another way of doing the slider

/*
  const sliderInit = function () {
    slides.forEach(function (slide, i) {
      slide.style.transform = `translateX(${100 * i}%)`;
    });
  
    for (let i = 0; i < slides.length; i++) {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<span class="dots__dot" data-dot="${i}"></span>`
      );
    }
  
    dotsContainer.firstChild.classList.add('dots__dot--active');
  };
  const nextSlide = function () {
    const curDot = document.querySelector(`.dots__dot--active`);
    let curDotIndex = Number.parseInt(curDot.dataset.dot);
    if (curDotIndex + 2 > slides.length) {
      slides.forEach(function (slide, i) {
        slide.style.transform = `translateX(${100 * i}%)`;
      });
    curDotIndex = 0;
    dotsContainer.firstChild.classList.add('dots__dot--active');
    curDot.classList.remove('dots__dot--active');
  } else {
    slides.forEach(function (slide, i) {
      slide.style.transform = `translateX(${100 * (i - curDotIndex - 1)}%)`;
    });
    const nextDot = document.querySelector(`[data-dot="${curDotIndex + 1}"]`);
    curDot.classList.remove('dots__dot--active');
    nextDot.classList.add('dots__dot--active');
  }
};

const prevSlide = function () {
  const curDot = document.querySelector(`.dots__dot--active`);
  let curDotIndex = Number.parseInt(curDot.dataset.dot);
  if (curDotIndex < 1) {
    curDotIndex = slides.length - 1;
    slides.forEach(function (slide, i) {
      slide.style.transform = `translateX(${100 * (i - curDotIndex)}%)`;
    });
    dotsContainer.lastChild.classList.add('dots__dot--active');
    curDot.classList.remove('dots__dot--active');
  } else {
    slides.forEach(function (slide, i) {
      slide.style.transform = `translateX(${100 * (i - curDotIndex + 1)}%)`;
    });
    const prevDot = document.querySelector(`[data-dot="${curDotIndex - 1}"]`);
    curDot.classList.remove('dots__dot--active');
    prevDot.classList.add('dots__dot--active');
  }
};

const activateDot = function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const curDot = Number.parseInt(e.target.dataset.dot);
    document.querySelectorAll('.dots__dot').forEach(function (d) {
      d.classList.remove('dots__dot--active');
    });
    e.target.classList.add('dots__dot--active');
    slides.forEach(function (slide, i) {
      slide.style.transform = `translateX(${100 * (i - curDot)}%)`;
    });
  }
};
*/
