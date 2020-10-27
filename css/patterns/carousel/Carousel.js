class Carousel {
  index = 0;

  constructor() {
    this.prevButton = document.querySelector('.prev');
    this.nextButton = document.querySelector('.next');
    this.carousel = document.querySelector('.carousel');
  }

  mount() {
    this.prevButton.addEventListener('click', () => {
      this.prev();
    });

    this.nextButton.addEventListener('click', () => {
      this.next();
    });
  }

  prev() {
    if (this.index === 0) return;
    this.index -= 1;

    this.carousel.style.transform = `translate3d(-${500 * this.index}px, 0, 0)`;
  }

  next() {
    if (this.index === 2) return;
    this.index += 1;

    this.carousel.style.transform = `translate3d(-${500 * this.index}px, 0, 0)`;
  }
}
