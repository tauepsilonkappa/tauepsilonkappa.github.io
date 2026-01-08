/**
 * Animated Testimonials Component
 * Vanilla JavaScript implementation of animated testimonials carousel
 */

class AnimatedTestimonials {
  constructor(containerId, testimonials, options = {}) {
    this.container = document.getElementById(containerId);
    this.testimonials = testimonials;
    this.active = 0;
    this.autoplay = options.autoplay || false;
    this.autoplayInterval = null;

    if (!this.container) {
      console.error(`Container with id "${containerId}" not found`);
      return;
    }

    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();

    if (this.autoplay) {
      this.startAutoplay();
    }
  }

  render() {
    this.container.innerHTML = `
      <div class="testimonials-container">
        <div class="testimonials-grid">
          <div class="testimonials-images">
            ${this.renderImages()}
          </div>
          <div class="testimonials-content">
            <div class="testimonial-text" id="testimonial-text">
              ${this.renderText()}
            </div>
            <div class="testimonial-controls">
              <button class="testimonial-btn" id="prev-btn" aria-label="Previous testimonial">
                <svg class="icon-left" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <button class="testimonial-btn" id="next-btn" aria-label="Next testimonial">
                <svg class="icon-right" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderImages() {
    return this.testimonials.map((testimonial, index) => {
      const rotation = this.randomRotation();
      const zIndex = index === this.active ? 40 : this.testimonials.length + 2 - index;
      const activeClass = index === this.active ? 'active' : '';

      return `
        <img
          src="${testimonial.src}"
          alt="${testimonial.name}"
          class="testimonial-image ${activeClass}"
          data-index="${index}"
          style="z-index: ${zIndex}; transform: rotate(${rotation}deg);"
          draggable="false"
        />
      `;
    }).join('');
  }

  renderText() {
    const testimonial = this.testimonials[this.active];
    const words = testimonial.quote.split(' ');
    const wordsHtml = words.map((word, index) =>
      `<span class="quote-word" style="animation-delay: ${index * 0.02}s">${word}</span>`
    ).join(' ');

    return `
      <h3 class="testimonial-name">${testimonial.name}</h3>
      <p class="testimonial-designation">${testimonial.designation}</p>
      <p class="testimonial-quote">${wordsHtml}</p>
    `;
  }

  attachEventListeners() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn) prevBtn.addEventListener('click', () => this.handlePrev());
    if (nextBtn) nextBtn.addEventListener('click', () => this.handleNext());
  }

  handleNext() {
    this.active = (this.active + 1) % this.testimonials.length;
    this.updateContent();
    this.restartAutoplay();
  }

  handlePrev() {
    this.active = (this.active - 1 + this.testimonials.length) % this.testimonials.length;
    this.updateContent();
    this.restartAutoplay();
  }

  updateContent() {
    // Update images
    const images = this.container.querySelectorAll('.testimonial-image');
    images.forEach((img, index) => {
      const isActive = index === this.active;
      const rotation = this.randomRotation();

      if (isActive) {
        img.classList.add('active', 'bounce');
        img.style.zIndex = 40;
        img.style.transform = 'rotate(0deg)';

        // Remove bounce class after animation
        setTimeout(() => img.classList.remove('bounce'), 400);
      } else {
        img.classList.remove('active', 'bounce');
        img.style.zIndex = this.testimonials.length + 2 - index;
        img.style.transform = `rotate(${rotation}deg)`;
      }
    });

    // Update text with animation
    const textContainer = document.getElementById('testimonial-text');
    if (textContainer) {
      textContainer.classList.add('fade-in');
      textContainer.innerHTML = this.renderText();

      // Remove fade-in class after animation
      setTimeout(() => textContainer.classList.remove('fade-in'), 200);
    }
  }

  randomRotation() {
    return Math.floor(Math.random() * 21) - 10; // Random rotation between -10 and 10 degrees
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.handleNext();
    }, 10000);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  restartAutoplay() {
    if (this.autoplay) {
      this.stopAutoplay();
      this.startAutoplay();
    }
  }

  destroy() {
    this.stopAutoplay();
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimatedTestimonials;
}
