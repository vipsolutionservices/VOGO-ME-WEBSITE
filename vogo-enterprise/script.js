/**
 * File role: Client-side interactions for VOGO landing page.
 * Responsibilities:
 * 1) Render clickable product/service cards.
 * 2) Show details in a dedicated panel when a card is clicked.
 * 3) Render FAQ accordion with progressive disclosure behavior.
 */

// Data source for the compact cards and expanded details panel.
const offers = [
  {
    title: '1. VOGO AI Customer Support Plugin',
    details: [
      'Suport clienți multi-canal: voice, text, chat și automatizări AI.',
      'Răspunsuri contextuale, escaladare către operator și log-uri utile pentru echipă.',
      'Potrivit pentru ecommerce, servicii, SaaS și call-center modern.'
    ]
  },
  {
    title: '2. VOGO Get My Mobile Applications Plugin',
    details: [
      'VOGO Essentials: JWT secure, multi-language, comunicare în aplicație, login Google/Gmail/Apple.',
      'Publicare aplicații pe Apple App Store și Google Play - Essentials Edition.',
      'VOGO Enterprise Project: push notifications și Agora calls în pachete separate.',
      'Curse drive: comenzi inter-city, aeroport, intra-city + opțiuni viitoare competitive.'
    ]
  },
  {
    title: '3. VOGO Services: Build • Migrate • Integrate',
    details: [
      'Build: dezvoltare aplicație nouă de la zero.',
      'Migrate: migrare profesională pentru aplicația actuală.',
      'Integrate: integrare funcții AI/plugin-uri în aplicația existentă.'
    ]
  },
  {
    title: '4. VOGO Bricolage M Series',
    details: [
      'Plugin AI pre-antrenat pentru magazine de bricolaj.',
      'Discuție cu robot online și asistență vocală/scrisă în magazin.',
      'Harta magazinului, localizare produse pe raft, recomandări tehnice și ghidare către locator.',
      'Oferă denumire produs, raion, descriere, informații utile, asistență și materiale video.'
    ]
  },
  {
    title: '5. VOGO Retail X Series',
    details: [
      'Plugin AI pre-antrenat pentru food retail și magazine generale.',
      'Recomandări personalizate, căutare rapidă produse, asistență clienți în timp real.'
    ]
  },
  {
    title: '6. VOGO Support Services',
    details: [
      'Suport tehnic continuu, mentenanță și optimizare performanță.',
      'SLA-uri clare pentru stabilitate operațională și timp de răspuns predictibil.'
    ]
  },
  {
    title: '7. VOGO Storage Services',
    details: [
      'Servicii de storage bazate pe infrastructură Hostinger.',
      'Backup, securizare și scalare în funcție de volum și trafic.'
    ]
  },
  {
    title: '8. Enterprise Projects',
    details: [
      'Arhitecturi custom pentru proiecte complexe și extinse.',
      'Roadmap pe etape, integrare cu sisteme interne și livrare orientată pe ROI.'
    ]
  }
];

// FAQ entries that mirror the style of the provided visual reference.
const faqData = [
  ['De ce să aleg VOGO One și care este diferența față de varianta standard?', 'VOGO One grupează funcții avansate AI, suport prioritar și opțiuni enterprise într-un flux unificat.'],
  ['Cum funcționează pachetele modulare (push notifications / agora calls)?', 'Sunt activate separat pentru a permite cost optim și scalare doar când ai nevoie.'],
  ['Ce se întâmplă dacă am nevoie de funcții suplimentare?', 'Putem extinde proiectul în pachete enterprise personalizate, în funcție de roadmap-ul tău.'],
  ['Puteți migra aplicația mea existentă?', 'Da. Avem servicii dedicate de audit, migrare și integrare progresivă.'],
  ['Aveți suport pentru companii cu mai multe echipe?', 'Da, inclusiv guvernanță de acces, monitorizare și suport dedicat.']
];

const cardsContainer = document.getElementById('offer-cards');
const detailTitle = document.getElementById('detail-title');
const detailContent = document.getElementById('detail-content');
const faqList = document.getElementById('faq-list');

/**
 * Renders compact cards and binds click events to update detail panel.
 */
function renderOffers() {
  offers.forEach((offer, index) => {
    const card = document.createElement('button');
    card.className = 'offer-card';
    card.type = 'button';
    card.innerHTML = `<h3>${offer.title}</h3>`;

    card.addEventListener('click', () => {
      document.querySelectorAll('.offer-card').forEach((el) => el.classList.remove('active'));
      card.classList.add('active');
      detailTitle.textContent = offer.title;
      detailContent.innerHTML = `<ul>${offer.details.map((item) => `<li>${item}</li>`).join('')}</ul>`;
    });

    // Auto-open first card to present content immediately.
    if (index === 0) {
      card.classList.add('active');
      detailTitle.textContent = offer.title;
      detailContent.innerHTML = `<ul>${offer.details.map((item) => `<li>${item}</li>`).join('')}</ul>`;
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

renderOffers();
renderFaq();
