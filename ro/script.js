/**
 * File role: Portfolio and FAQ interactions for the VOGO Enterprise Romanian page.
 * Responsibilities:
 * 1) Render portfolio cards with fully visible summaries.
 * 2) Render detailed portfolio sections stacked vertically under cards.
 * 3) Scroll smoothly to the related detailed section when a card is clicked.
 * 4) Render FAQ accordion with single-item expansion.
 */

/**
 * Portfolio data source used in both the summary cards and the detailed sections.
 * Each item includes an icon and a category chip for stronger visual scanning.
 */
const offers = [
  {
    title: 'VOGO AI Customer Support Plugin',
    chip: 'SUPPORT',
    icon: '🤖',
    summary:
      'Suport clienți multi-canal cu AI conversațional pentru voice, text și chat, plus automatizări inteligente pentru operațiuni rapide.',
    details: [
      'VOGO AI Customer Support Plugin este proiectat pentru companiile care vor să răspundă mai rapid, mai corect și mai personalizat fiecărui client, pe toate canalele digitale relevante.',
      'Soluția combină chat, voice și text într-un flux unificat, oferă răspunsuri contextuale, poate escalada instant către operator uman și păstrează log-uri structurate pentru audit, training și optimizare continuă.',
      'Este potrivită pentru ecommerce, servicii, SaaS, centre de suport și organizații care vor să reducă timpul de răspuns, să crească satisfacția clienților și să mențină standarde profesionale de calitate.'
    ]
  },
  {
    title: 'VOGO Get My Mobile Applications Plugin',
    chip: 'MOBILE',
    icon: '📱',
    summary:
      'Platformă de aplicații mobile cu securitate JWT, autentificare socială, multi-language și publicare asistată în ecosistemele Apple și Google.',
    details: [
      'VOGO Get My Mobile Applications Plugin accelerează lansarea de aplicații mobile performante printr-un set complet de funcții pregătite pentru business: securitate JWT, autentificare Google/Gmail/Apple, comunicare în aplicație și arhitectură multi-language.',
      'Pentru dezvoltare graduală, include opțiuni de publicare în Apple App Store și Google Play în ediția Essentials, iar pentru proiecte extinse se pot activa pachete separate precum push notifications și Agora calls.',
      'Componenta de mobilitate poate fi adaptată și pentru scenarii de tip drive, cu comenzi inter-city, aeroport și intra-city, susținând o experiență modernă pentru utilizatori și echipe operaționale.'
    ]
  },
  {
    title: 'VOGO Services: Build • Migrate • Integrate',
    chip: 'SERVICES',
    icon: '🛠️',
    summary:
      'Servicii enterprise cap-coadă pentru dezvoltare de produs nou, migrare sigură și integrare avansată de module AI în aplicații existente.',
    details: [
      'Prin serviciul Build, VOGO dezvoltă aplicații noi de la zero, cu arhitectură scalabilă, fluxuri clare și focus pe performanță, securitate și experiență de utilizare.',
      'Prin serviciul Migrate, VOGO execută migrarea controlată a aplicațiilor existente, cu analiză inițială, plan tehnic etapizat și reducerea riscurilor operaționale în tranziție.',
      'Prin serviciul Integrate, VOGO conectează funcții AI, plugin-uri și sisteme externe în infrastructura curentă, pentru creșterea eficienței fără întreruperi majore în business.'
    ]
  },
  {
    title: 'VOGO Bricolage M Series',
    chip: 'RETAIL',
    icon: '🏬',
    summary:
      'Soluție AI specializată pentru magazine de bricolaj, cu asistent conversațional, ghidare în magazin și recomandări tehnice pentru produse.',
    details: [
      'VOGO Bricolage M Series este un plugin AI pre-antrenat pentru retailul de bricolaj, optimizat pentru a oferi răspunsuri rapide și corecte în interacțiuni online și în spațiul fizic al magazinului.',
      'Asistentul poate indica poziționarea produselor pe raft, poate interpreta întrebări tehnice și poate recomanda produse complementare pe baza contextului transmis de client.',
      'Soluția oferă informații clare despre denumire, raion, descriere, materiale și instrucțiuni, inclusiv conținut video acolo unde este relevant, pentru o experiență completă de cumpărare.'
    ]
  },
  {
    title: 'VOGO Retail X Series',
    chip: 'COMMERCE',
    icon: '🛒',
    summary:
      'Asistent AI pentru food retail și magazine generale, cu recomandări personalizate, căutare rapidă și suport în timp real pentru clienți.',
    details: [
      'VOGO Retail X Series ajută magazinele food retail și comercianții generali să transforme experiența clientului prin interacțiuni rapide, clare și relevante.',
      'Sistemul optimizează căutarea produselor, propune recomandări personalizate și răspunde în timp real la întrebări frecvente despre stoc, alternative sau caracteristici.',
      'Rezultatul este un flux de cumpărare mai simplu, conversii mai bune și un nivel crescut de încredere în comunicarea dintre brand și client.'
    ]
  },
  {
    title: 'VOGO Support Services',
    chip: 'CARE',
    icon: '🎧',
    summary:
      'Suport tehnic continuu, mentenanță proactivă și SLA-uri clare pentru stabilitate operațională și predictibilitate în livrare.',
    details: [
      'VOGO Support Services oferă continuitate operațională prin monitorizare, mentenanță și intervenții rapide atunci când apar incidente sau nevoi de optimizare.',
      'Serviciul include procese clare de comunicare, SLA-uri definite și prioritizare profesională a ticketelor, astfel încât echipele interne să poată planifica eficient activitățile critice.',
      'Abordarea este orientată spre prevenție și performanță constantă, nu doar spre rezolvarea punctuală a problemelor tehnice.'
    ]
  },
  {
    title: 'VOGO Storage Services',
    chip: 'CLOUD',
    icon: '☁️',
    summary:
      'Servicii de storage scalabile, cu backup, securizare și administrare adaptată volumului de date și nivelului de trafic al afacerii.',
    details: [
      'VOGO Storage Services furnizează infrastructură de stocare adaptată pentru aplicații enterprise, platforme comerciale și proiecte cu cerințe dinamice de date.',
      'Serviciul acoperă backup recurent, politici de securitate și scalare progresivă, astfel încât sistemele să rămână disponibile și performante în perioade de încărcare ridicată.',
      'Prin planificare corectă a resurselor, companiile obțin control mai bun asupra costurilor și asupra rezilienței infrastructurii digitale.'
    ]
  },
  {
    title: 'Enterprise Projects',
    chip: 'CUSTOM',
    icon: '🚀',
    summary:
      'Proiecte enterprise personalizate, cu arhitectură custom, roadmap etapizat și integrare cu sisteme interne pentru ROI măsurabil.',
    details: [
      'Pentru inițiative complexe, VOGO livrează proiecte enterprise custom, pornind de la audit funcțional și tehnic, până la implementare și validare în producție.',
      'Arhitectura este construită pe nevoi reale de business, cu roadmap clar pe etape, milestone-uri măsurabile și integrare controlată cu ecosistemele interne existente.',
      'Obiectivul final este obținerea unui ROI clar, susținut de stabilitate tehnică, eficiență operațională și capacitate de scalare pe termen lung.'
    ]
  }
];

// FAQ entries in Romanian for better local relevance.
const faqData = [
  ['De ce să aleg VOGO One și care este diferența față de varianta standard?', 'VOGO One grupează funcții avansate AI, suport prioritar și opțiuni enterprise într-un flux unificat.'],
  ['Cum funcționează pachetele modulare (push notifications / agora calls)?', 'Sunt activate separat pentru a permite cost optim și scalare doar când ai nevoie.'],
  ['Ce se întâmplă dacă am nevoie de funcții suplimentare?', 'Putem extinde proiectul în pachete enterprise personalizate, în funcție de roadmap-ul tău.'],
  ['Puteți migra aplicația mea existentă?', 'Da. Avem servicii dedicate de audit, migrare și integrare progresivă.'],
  ['Aveți suport pentru companii cu mai multe echipe?', 'Da, inclusiv guvernanță de acces, monitorizare și suport dedicat.']
];

const cardsContainer = document.getElementById('offer-cards');
const detailsStack = document.getElementById('details-stack');
const faqList = document.getElementById('faq-list');

// Icon set styled as line illustrations to match the monochrome VOGO-green look.
const offerLineIcons = {
  SUPPORT: '<svg class="offer-line-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3a8 8 0 0 0-8 8v3a2 2 0 0 0 2 2h1v-5H6a6 6 0 0 1 12 0h-1v5h1a2 2 0 0 0 2-2v-3a8 8 0 0 0-8-8Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 16.5a3 3 0 0 0 6 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  MOBILE: '<svg class="offer-line-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M10 6h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="17" r="1" fill="currentColor"/></svg>',
  SERVICES: '<svg class="offer-line-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 4.5a3.5 3.5 0 0 1 4.95 4.95l-2.02 2.02-4.95-4.95 2.02-2.02Z" stroke="currentColor" stroke-width="1.8"/><path d="m4 20 5.1-1.05 8.4-8.4-4.95-4.95-8.4 8.4L4 20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  RETAIL: '<svg class="offer-line-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 9h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9Z" stroke="currentColor" stroke-width="1.8"/><path d="M7 9V6a5 5 0 1 1 10 0v3" stroke="currentColor" stroke-width="1.8"/><path d="M9 14h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  COMMERCE: '<svg class="offer-line-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="19" r="1.5" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="19" r="1.5" stroke="currentColor" stroke-width="1.8"/><path d="M4 5h2l2.2 9.2a1 1 0 0 0 .98.8H18a1 1 0 0 0 .98-.78L20 8H7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  CARE: '<svg class="offer-line-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4a6 6 0 0 0-6 6v2a2 2 0 0 0 2 2h1v-4H8a4 4 0 1 1 8 0h-1v4h1a2 2 0 0 0 2-2v-2a6 6 0 0 0-6-6Z" stroke="currentColor" stroke-width="1.8"/><path d="M10 17h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  CLOUD: '<svg class="offer-line-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 18a4 4 0 1 1 .5-7.97A5.5 5.5 0 0 1 18 12a3.5 3.5 0 1 1 0 7H7Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  CUSTOM: '<svg class="offer-line-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m12 3 2.1 4.6L19 9.2l-3.5 3.5.8 4.8L12 15.9 7.7 17.5l.8-4.8L5 9.2l4.9-1.6L12 3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M18.5 4.5v3M17 6h3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
};

function getOfferIcon(chip) {
  return offerLineIcons[chip] || offerLineIcons.CUSTOM;
}

/**
 * Creates stacked detailed sections once, each with an id target for smooth scrolling.
 * Visual parity note: detailed sections reuse the same icon/chip/button language as top cards
 * so users can instantly map every lower section to the corresponding upper card.
 */
function renderDetailedSections() {
  offers.forEach((offer, index) => {
    const section = document.createElement('article');
    section.className = 'detail-section';
    section.id = `detail-${index + 1}`;

    section.innerHTML = `
      <div class="detail-section-head">
        <div class="detail-title-wrap">
          <div class="offer-icon" aria-hidden="true">${getOfferIcon(offer.chip)}</div>
          <h3>${offer.title}</h3>
        </div>
        <span class="offer-chip">${offer.chip}</span>
      </div>
      <div class="detail-section-content">
        ${offer.details.map((paragraph) => `<p>${paragraph}</p>`).join('')}
      </div>
      <span class="offer-more detail-offer-more">Explore more <span aria-hidden="true">→</span></span>
    `;

    detailsStack.appendChild(section);
  });
}

/**
 * Renders cards in a compact product-tile style with icon, title and CTA button.
 * On click, the page scrolls to the corresponding detailed section below.
 */
function renderOffers() {
  offers.forEach((offer, index) => {
    const card = document.createElement('button');
    card.className = 'offer-card';
    card.type = 'button';
    card.innerHTML = `
      <div class="offer-card-top">
        <div class="offer-icon-badge" aria-hidden="true">${getOfferIcon(offer.chip)}</div>
        <div>
          <h3>${offer.title}</h3>
          <p>${offer.summary}</p>
        </div>
      </div>
      <span class="offer-more">Let's go</span>
    `;

    card.addEventListener('click', () => {
      document.querySelectorAll('.offer-card').forEach((el) => el.classList.remove('active'));
      card.classList.add('active');

      const targetSection = document.getElementById(`detail-${index + 1}`);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    // Keep first card highlighted to indicate initial context.
    if (index === 0) {
      card.classList.add('active');
    }

    cardsContainer.appendChild(card);
  });
}

/**
 * Renders FAQ accordion and allows single-item expansion for clarity.
 */
function renderFaq() {
  faqData.forEach(([question, answer], index) => {
    const item = document.createElement('article');
    item.className = 'faq-item';

    item.innerHTML = `
      <button class="faq-question" type="button" aria-expanded="false">
        <span>${question}</span><span>+</span>
      </button>
      <div class="faq-answer"><p>${answer}</p></div>
    `;

    const button = item.querySelector('.faq-question');
    button.addEventListener('click', () => {
      document.querySelectorAll('.faq-item').forEach((el) => {
        if (el !== item) {
          el.classList.remove('open');
          el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          el.querySelector('.faq-question span:last-child').textContent = '+';
        }
      });

      const isOpen = item.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
      button.querySelector('span:last-child').textContent = isOpen ? '−' : '+';
    });

    // Open the first FAQ item by default for faster scanning.
    if (index === 0) {
      item.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
      button.querySelector('span:last-child').textContent = '−';
    }

    faqList.appendChild(item);
  });
}

renderDetailedSections();
renderOffers();
renderFaq();

/**
 * Hero carousel section logic.
 * - Auto-rotates all sub-hero images.
 * - Supports left/right keyboard navigation.
 * - Pauses rotation while the user hovers the carousel.
 */
const heroCarouselTrack = document.querySelector('.hero-carousel-track');
let heroCarouselSlides = heroCarouselTrack ? Array.from(heroCarouselTrack.children) : [];
let heroCarouselIndex = 0;
let heroCarouselTimer;

/** Returns a readable alt text from an image file name. */
function buildCarouselAltFromName(filename, index) {
  const cleanName = filename.replace(/\.[a-z0-9]+$/i, '').replace(/[_+\-]+/g, ' ').trim();
  return `VOGO carousel image ${index + 1}: ${cleanName}`;
}

/** Renders carousel slides from a dynamic list of image URLs. */
function renderHeroCarouselSlides(imageUrls) {
  if (!heroCarouselTrack || imageUrls.length === 0) return;

  heroCarouselTrack.innerHTML = '';
  imageUrls.forEach((imageUrl, index) => {
    const figure = document.createElement('figure');
    figure.className = 'hero-slide';

    const image = document.createElement('img');
    image.src = imageUrl;
    image.alt = buildCarouselAltFromName(imageUrl.split('/').pop() || 'image', index);
    image.loading = index === 0 ? 'eager' : 'lazy';
    image.decoding = 'async';

    figure.appendChild(image);
    heroCarouselTrack.appendChild(figure);
  });

  heroCarouselSlides = Array.from(heroCarouselTrack.children);
  setHeroCarouselSlide(0);
}

/**
 * Loads carousel images dynamically by reading the /img/products/carousel directory index.
 * Falls back to static HTML slides when local file protocol or directory listing is unavailable.
 */
async function loadHeroCarouselImages() {
  if (!heroCarouselTrack) return;

  const folderUrl = heroCarouselTrack.dataset.carouselFolder;
  if (!folderUrl) return;

  if (window.location.protocol === 'file:') return;

  try {
    const response = await fetch(folderUrl, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const folderAbsoluteUrl = new URL(folderUrl, window.location.href);
    const imageUrls = Array.from(doc.querySelectorAll('a[href]'))
      .map((link) => link.getAttribute('href'))
      .filter((href) => Boolean(href) && /\.(png|jpe?g|webp|gif|svg)$/i.test(href))
      .map((href) => new URL(href, folderAbsoluteUrl).toString())
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

    if (imageUrls.length > 0) {
      renderHeroCarouselSlides(imageUrls);
    }
  } catch (_) {
    // Fallback keeps static slides from HTML without noisy console errors.
  }

  heroCarouselSlides = Array.from(heroCarouselTrack.children);
  if (heroCarouselSlides.length > 1) {
    startHeroCarouselAutoplay();
  }
}

/** Moves carousel to the requested slide index with loop wrapping. */
function setHeroCarouselSlide(nextIndex) {
  if (!heroCarouselTrack || heroCarouselSlides.length === 0) return;
  heroCarouselIndex = (nextIndex + heroCarouselSlides.length) % heroCarouselSlides.length;
  heroCarouselTrack.style.transform = `translateX(-${heroCarouselIndex * 100}%)`;
}

/** Starts/restarts the carousel autoplay interval. */
function startHeroCarouselAutoplay() {
  if (!heroCarouselTrack || heroCarouselSlides.length <= 1) return;
  clearInterval(heroCarouselTimer);
  heroCarouselTimer = setInterval(() => {
    setHeroCarouselSlide(heroCarouselIndex + 1);
  }, 4200);
}

/** Stops autoplay; used on hover to reduce UI motion while reading an image. */
function stopHeroCarouselAutoplay() {
  clearInterval(heroCarouselTimer);
}

if (heroCarouselTrack) {
  loadHeroCarouselImages();

  heroCarouselTrack.addEventListener('mouseenter', stopHeroCarouselAutoplay);
  heroCarouselTrack.addEventListener('mouseleave', startHeroCarouselAutoplay);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      setHeroCarouselSlide(heroCarouselIndex + 1);
      startHeroCarouselAutoplay();
    }
    if (event.key === 'ArrowLeft') {
      setHeroCarouselSlide(heroCarouselIndex - 1);
      startHeroCarouselAutoplay();
    }
  });
}
