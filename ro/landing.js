/**
 * File purpose and role:
 * Behavior layer for ro/landing.html.
 * Handles testimonial cycling and plan price mode switching.
 */

/* @-- Testimonial slider data extracted from validated VOGO value propositions --@ */
const testimonials = [
  {
    text: 'VOGO Mobile App Builder for WooCommerce transformă magazinul tău WordPress într-o aplicație mobilă reală iOS & Android.',
    author: 'VOGO Product Message — Mobile Applications Creator'
  },
  {
    text: 'Nu doar răspunde la întrebări, ci execută operațiuni în contul utilizatorului și interacționează direct cu WooCommerce.',
    author: 'VOGO Product Message — AI Sales & Support Assistant'
  },
  {
    text: 'Construim exact ce ai nevoie. Adaptăm arhitectura, funcționalitățile și integrările în jurul business-ului tău.',
    author: 'VOGO Product Message — Enterprise™'
  }
];

let testimonialIndex = 0;

/**
 * @-- Updates testimonial section content based on current index --@
 */
function renderTestimonial() {
  const textNode = document.getElementById('testimonialText');
  const authorNode = document.getElementById('testimonialAuthor');

  if (!textNode || !authorNode) return;

  textNode.textContent = testimonials[testimonialIndex].text;
  authorNode.textContent = testimonials[testimonialIndex].author;
}

/**
 * @-- Moves carousel by one item in direction (-1 or +1) --@
 */
function shiftTestimonial(direction) {
  testimonialIndex = (testimonialIndex + direction + testimonials.length) % testimonials.length;
  renderTestimonial();
}

/**
 * @-- Updates all pricing cards based on selected mode --@
 */
function applyPlanMode(mode) {
  const cards = document.querySelectorAll('.price-card');
  const toggleButtons = document.querySelectorAll('.toggle-btn');

  cards.forEach((card) => {
    const value = mode === 'clients' ? card.dataset.clientPrice : card.dataset.selfPrice;
    const valueNode = card.querySelector('.price-value');

    if (valueNode && value) {
      valueNode.textContent = value;
    }
  });

  toggleButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.planMode === mode);
  });
}

/**
 * @-- Attaches event listeners after DOM is ready --@
 */
document.addEventListener('DOMContentLoaded', () => {
  renderTestimonial();

  const prevButton = document.getElementById('prevTestimonial');
  const nextButton = document.getElementById('nextTestimonial');

  prevButton?.addEventListener('click', () => shiftTestimonial(-1));
  nextButton?.addEventListener('click', () => shiftTestimonial(1));

  document.querySelectorAll('.toggle-btn').forEach((button) => {
    button.addEventListener('click', () => applyPlanMode(button.dataset.planMode));
  });
});
