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
          <div class="offer-icon" aria-hidden="true">${offer.icon}</div>
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
 * Renders cards with icon, chip and Explore more green button.
 * On click, the page scrolls to the corresponding detailed section below.
 */
function renderOffers() {
  offers.forEach((offer, index) => {
    const card = document.createElement('button');
    card.className = 'offer-card';
    card.type = 'button';
    card.innerHTML = `
      <div class="offer-card-head">
        <h3>${offer.title}</h3>
        <span class="offer-chip">${offer.chip}</span>
      </div>
      <div class="offer-icon" aria-hidden="true">${offer.icon}</div>
      <p>${offer.summary}</p>
      <span class="offer-more">Explore more <span aria-hidden="true">→</span></span>
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
