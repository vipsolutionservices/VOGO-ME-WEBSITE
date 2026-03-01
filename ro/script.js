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
    // Rich text is intentionally structured with paragraphs + lists only,
    // so the detailed card stays visually consistent with existing CSS.
    detailsHtml: `
      <p><strong>VOGO AI Based Chatbot</strong> — inteligență artificială reală, integrată direct în ecosistemul tău digital.</p>
      <p>VOGO AI Chatbot este un plugin avansat pentru WordPress / WooCommerce, creat pentru afaceri care vor mai mult decât un widget de chat: un asistent operațional capabil să înțeleagă contextul utilizatorului, să execute acțiuni reale prin API și să transfere conversația către operator uman când este necesar.</p>

      <p><strong>Ce face diferit:</strong></p>
      <ul>
        <li><strong>AI multi-engine configurabil:</strong> OpenAI, Gemini, Croq, Rasa, Vask etc., cu reguli pe roluri (Basic, VIP, Support) și fallback pe primul engine disponibil.</li>
        <li><strong>Acțiuni reale în contul utilizatorului:</strong> task-uri Agenda, Shopping List, adăugare evenimente, integrare WooCommerce (Faza C), transfer către operator uman.</li>
        <li><strong>Securitate by design:</strong> autentificare JWT pe REST API, control pe roluri și autentificare obligatorie pentru acțiuni personale.</li>
        <li><strong>Human Operator Mode:</strong> transfer automat către operator, thread dedicat, suport pentru text, imagini, fișiere, voce/video, unread badges și polling inteligent.</li>
        <li><strong>WooCommerce ready:</strong> căutare produse, deschidere produs în aceeași pagină și integrare în fluxuri comerciale pentru conversie mai bună.</li>
        <li><strong>UI modern:</strong> fundal transparent, checkbox-uri interactive, numerotare inteligentă, interfață minimalistă integrabilă în orice temă.</li>
      </ul>

      <p><strong>Arhitectură scalabilă pe faze:</strong> PoC Phase, B Phase (VIP + AI combinat + Agenda/Shopping), C Phase (WooCommerce + Human Operator), D Phase (Voice), E Phase (Final delivery review).</p>

      <p><strong>Ideal pentru:</strong> magazine WooCommerce, marketplace-uri, proiecte SaaS, aplicații mobile conectate prin API și platforme care vor AI real, nu doar marketing AI.</p>

      <p><strong>Concluzie:</strong> VOGO AI Chatbot transformă chatbotul dintr-un element conversațional într-un motor operațional AI — execută, înțelege, transferă și scalează în infrastructura digitală a afacerii tale.</p>
    `,
    supportGalleryImages: [
      '../img/ai-chatbot/ai-chatbot1.png',
      '../img/ai-chatbot/ai-chatbot2.png',
      '../img/ai-chatbot/ai-chatbot3.png',
      '../img/ai-chatbot/ai-chatbot4.png',
      '../img/ai-chatbot/ai-chatbot5.png',
      '../img/ai-chatbot/ai-chatbot6.png',
      '../img/ai-chatbot/ai-chatbot7.png',
      '../img/ai-chatbot/ai-chatbot8.png'
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
    // Service description uses a dedicated two-column bullet layout focused on WordPress integrations.
    detailsHtml: `
      <p><strong>Nu aveți încă un website pe WordPress?</strong> Nicio problemă. VOGO livrează integrare profesionistă prin pluginuri WordPress, cu instrumente moderne și procese clare de implementare.</p>
      <div class="services-columns" role="list" aria-label="VOGO Build Migrate Integrate services">
        <ul>
          <li><strong>Build smart:</strong> construim website-uri WordPress / WooCommerce de la zero, cu structură pregătită pentru creștere și mentenanță ușoară.</li>
          <li><strong>Upgrade profesional:</strong> dacă site-ul actual nu mai performează, refacem experiența completă cu design modern și fluxuri comerciale optimizate.</li>
          <li><strong>Integrare prin feed-uri:</strong> conectăm rapid catalogul prin XML feed, CSV feed și import Excel cu mapare controlată pe câmpuri.</li>
          <li><strong>Servicii web & API:</strong> activăm conectări sigure prin REST API și servicii web pentru sincronizare automată între sisteme.</li>
        </ul>
        <ul>
          <li><strong>Migrare fără stres:</strong> mutăm proiectele existente către WordPress, WooCommerce sau Shopify cu plan etapizat și risc minim.</li>
          <li><strong>Pluginuri WordPress dedicate:</strong> folosim pluginuri stabile pentru import, sincronizare stoc, actualizare prețuri și management produse.</li>
          <li><strong>Automatizare operațională:</strong> integrăm procese de update periodic pentru produse, comenzi și conținut, fără intervenții manuale repetitive.</li>
          <li><strong>Suport expert VOGO:</strong> primești consultanță tehnică, implementare cap-coadă și ghidaj continuu pentru evoluția platformei tale.</li>
        </ul>
      </div>
    `,
    ctaLinks: [
      {
        label: 'Discută acum cu un consultant',
        href: 'https://wa.me/40723313296'
      },
      {
        label: 'Contact us',
        href: 'https://vogo.me/ecomm-contact-request/'
      }
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
  },
  {
    title: 'Pluginuri recomandate',
    chip: 'CUSTOM',
    icon: '🔗',
    summary:
      'Descoperă selecția VOGO de pluginuri recomandate pentru performanță, integrare rapidă și extindere eficientă a funcționalităților.',
    // External route card: opens the recommended plugins page in a new browser tab.
    externalUrl: '../vogo-recommended-plugins.html',
    details: [
      'Accesează pagina VOGO Recommended pentru lista curată de pluginuri validate, cu focus pe fiabilitate, compatibilitate și rezultate practice.'
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
      ${buildOfferDetailLayout(offer, index)}
      ${buildDetailCtaMarkup(offer)}
    `;

    detailsStack.appendChild(section);
  });
}

/** Builds per-section CTA links; uses a default label if a section has no custom links. */
function buildDetailCtaMarkup(offer) {
  if (Array.isArray(offer.ctaLinks) && offer.ctaLinks.length > 0) {
    return `
      <div class="detail-cta-row" aria-label="Section links">
        ${offer.ctaLinks
          .map(
            (cta) => `
              <a class="offer-more detail-offer-more" href="${cta.href}" target="_blank" rel="noopener noreferrer">
                ${cta.label} <span aria-hidden="true">→</span>
              </a>
            `
          )
          .join('')}
      </div>
    `;
  }

  return '<span class="offer-more detail-offer-more">Explore more <span aria-hidden="true">→</span></span>';
}

/**
 * Builds a two-column support layout (text + image preview) for the AI card only.
 * Gallery opens in a popup either from thumbnail click or "Vezi imagini" action.
 */
function buildOfferDetailLayout(offer, offerIndex) {
  const detailsMarkup = offer.detailsHtml || offer.details.map((paragraph) => `<p>${paragraph}</p>`).join('');

  if (!offer.supportGalleryImages || offer.supportGalleryImages.length === 0) {
    return `<div class="detail-section-content">${detailsMarkup}</div>`;
  }

  const previewImages = offer.supportGalleryImages
    .slice(0, 3)
    .map((imagePath, imageIndex) => {
      const altText = `VOGO AI preview ${imageIndex + 1}`;
      return `
        <button class="support-gallery-thumb" type="button" data-gallery-index="${imageIndex}" aria-label="Open image ${imageIndex + 1}">
          <img src="${imagePath}" alt="${altText}" loading="lazy" decoding="async" />
        </button>
      `;
    })
    .join('');

  const imagesPayload = encodeURIComponent(JSON.stringify(offer.supportGalleryImages));

  return `
    <div class="support-detail-layout">
      <div class="detail-section-content">${detailsMarkup}</div>
      <aside class="support-gallery-column" aria-label="VOGO AI image preview">
        <div class="support-gallery-grid">${previewImages}</div>
        <button class="support-gallery-link" type="button" data-gallery-images="${imagesPayload}" data-gallery-index="0">
          Vezi imagini
        </button>
      </aside>
    </div>
  `;
}

/** Creates one reusable lightbox and wires open/close/next/prev interactions. */
function initSupportGalleryLightbox() {
  if (document.querySelector('.support-lightbox')) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'support-lightbox';
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.innerHTML = `
    <div class="support-lightbox__backdrop" data-lightbox-close="true"></div>
    <div class="support-lightbox__dialog" role="dialog" aria-modal="true" aria-label="VOGO AI gallery">
      <button class="support-lightbox__close" type="button" data-lightbox-close="true" aria-label="Close gallery">✕</button>
      <button class="support-lightbox__nav" type="button" data-lightbox-nav="prev" aria-label="Previous image">‹</button>
      <img class="support-lightbox__image" src="" alt="VOGO AI gallery image" />
      <button class="support-lightbox__nav" type="button" data-lightbox-nav="next" aria-label="Next image">›</button>
    </div>
  `;
  document.body.appendChild(lightbox);

  const imageNode = lightbox.querySelector('.support-lightbox__image');
  let galleryImages = [];
  let currentIndex = 0;

  function renderCurrentImage() {
    if (galleryImages.length === 0) return;
    imageNode.src = galleryImages[currentIndex];
  }

  function openLightbox(images, startIndex) {
    galleryImages = images;
    currentIndex = startIndex;
    renderCurrentImage();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  document.addEventListener('click', (event) => {
    const directTrigger = event.target.closest('[data-gallery-images]');
    const thumbTrigger = event.target.closest('.support-gallery-thumb');
    const closeTarget = event.target.closest('[data-lightbox-close]');
    const navTarget = event.target.closest('[data-lightbox-nav]');

    if (directTrigger) {
      const images = JSON.parse(decodeURIComponent(directTrigger.dataset.galleryImages));
      const startIndex = Number(directTrigger.dataset.galleryIndex || 0);
      openLightbox(images, startIndex);
      return;
    }

    if (thumbTrigger) {
      const layout = thumbTrigger.closest('.support-detail-layout');
      const link = layout ? layout.querySelector('[data-gallery-images]') : null;
      if (!link) return;
      const images = JSON.parse(decodeURIComponent(link.dataset.galleryImages));
      const startIndex = Number(thumbTrigger.dataset.galleryIndex || 0);
      openLightbox(images, startIndex);
      return;
    }

    if (closeTarget) {
      closeLightbox();
      return;
    }

    if (navTarget && galleryImages.length > 0) {
      currentIndex = navTarget.dataset.lightboxNav === 'next'
        ? (currentIndex + 1) % galleryImages.length
        : (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      renderCurrentImage();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowRight' && galleryImages.length > 0) {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      renderCurrentImage();
    }
    if (event.key === 'ArrowLeft' && galleryImages.length > 0) {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      renderCurrentImage();
    }
  });
}

/**
 * Renders cards in a compact product-tile style with icon, title and CTA button.
 * On click, the page scrolls to the corresponding detailed section below.
 */
function renderOffers() {
  offers.forEach((offer, index) => {
    // Use anchor cards for external routes and button cards for local in-page navigation.
    const card = document.createElement(offer.externalUrl ? 'a' : 'button');
    card.className = 'offer-card';

    if (offer.externalUrl) {
      card.href = offer.externalUrl;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
    } else {
      card.type = 'button';
    }
    // Keep content split by role: header row, full-width summary text, then bottom footer actions.
    card.innerHTML = `
      <div class="offer-card-top">
        <div class="offer-icon-badge" aria-hidden="true">${getOfferIcon(offer.chip)}</div>
        <div class="offer-card-title-wrap">
          <h3>${offer.title}</h3>
        </div>
      </div>
      <p class="offer-card-summary">${offer.summary}</p>
      <div class="offer-card-footer">
        <span class="offer-bullet">${offer.chip}</span>
        <span class="offer-more">Let's go</span>
      </div>
    `;

    if (!offer.externalUrl) {
      card.addEventListener('click', () => {
        document.querySelectorAll('.offer-card').forEach((el) => el.classList.remove('active'));
        card.classList.add('active');

        const targetSection = document.getElementById(`detail-${index + 1}`);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

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
initSupportGalleryLightbox();
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
    image.src = imageUrl.replace(/\+/g, '%2B');
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
      .map((href) => new URL(href, folderAbsoluteUrl).toString().replace(/\+/g, '%2B'))
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
