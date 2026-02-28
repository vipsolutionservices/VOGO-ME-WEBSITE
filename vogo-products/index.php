<?php include __DIR__ . '/../products-header.php'; ?>

  <!--
    File role: This is the main VOGO landing page in Romanian.
    It presents compact product/service cards and expands details on click,
    plus trust, plans, FAQ, enterprise, and CTA sections.
  -->

  <main>
    <!-- Hero section: concise value proposition with visual trust cue -->
    <section class="hero section">
      <div class="container hero-grid">
        <div>
          <p class="eyebrow">VOGO • crafted in Europe</p>
          <h1>Încredere și inovație, construite pentru scalare</h1>
          <p class="lead">
            Soluții AI, mobile și enterprise gândite profesional: suport clienți, aplicații,
            integrare și automatizare pentru business-uri care vor rezultate reale.
          </p>
        </div>
        <div class="hero-card">
          <h3>Siguranță & performanță</h3>
          <ul>
            <li>✅ Infrastructură scalabilă și securizată</li>
            <li>✅ Arhitectură modulară pe plugin-uri</li>
            <li>✅ Implementare rapidă și suport dedicat</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Portfolio section: full-summary cards + stacked detailed sections -->
    <section id="overview" class="section">
      <div class="container">
        <h2>Portofoliu VOGO</h2>
        <p class="section-subtitle">
          Fiecare cartonaș include rezumatul complet. La click, pagina face scroll către secțiunea detaliată aferentă.
        </p>

        <div class="cards-grid" id="offer-cards" aria-label="Lista soluțiilor VOGO"></div>

        <!-- Stacked detailed content rendered one section under another by script.js -->
        <div class="details-stack" id="details-stack" aria-label="Detalii extinse pentru portofoliul VOGO"></div>
      </div>
    </section>

    <!-- Trust section: includes certifications and social-proof style content -->
    <section class="section trust-section">
      <div class="container trust-grid">
        <div>
          <p class="eyebrow">Credibilitate</p>
          <h2>Website-ul tău, construit inteligent</h2>
          <p>
            Livrăm produse robuste, documentate și conforme. În această zonă poți integra
            certificările VOGO (ISO, EUIPO și alte standarde relevante).
          </p>
        </div>
        <div class="badges" aria-label="Certificări și acreditări">
          <span class="badge">ISO 9001</span>
          <span class="badge">ISO 27001</span>
          <span class="badge">EUIPO</span>
          <span class="badge">SOC 2 Ready</span>
          <span class="badge">GDPR by Design</span>
          <span class="badge">Hosted in EU</span>
        </div>
      </div>
    </section>

    <!-- Plans section inspired by pricing layout, localized and simplified -->
    <section id="plans" class="section">
      <div class="container">
        <h2>Selectează planul potrivit</h2>
        <p class="section-subtitle">Prezentare orientativă. Planurile pot fi personalizate în funcție de proiect.</p>

        <div class="plans-grid">
          <article class="plan-card">
            <h3>VOGO Essentials</h3>
            <p class="price">€5 <span>/lună</span></p>
            <ul>
              <li>JWT Secure</li>
              <li>Multi-language</li>
              <li>Comunicare în aplicație</li>
              <li>Login Google, Gmail, Apple</li>
              <li>Publicare Apple & Google Play (Essentials)</li>
            </ul>
            <button class="btn btn-outline">Alege Essentials</button>
          </article>

          <article class="plan-card">
            <h3>VOGO Advanced</h3>
            <p class="price">€7 <span>/lună</span></p>
            <ul>
              <li>Tot din Essentials</li>
              <li>Pop-up & comunicări avansate</li>
              <li>Custom code & CSS</li>
              <li>Suport prioritar</li>
              <li>Extensii pentru integrare API</li>
            </ul>
            <button class="btn btn-outline">Alege Advanced</button>
          </article>

          <article class="plan-card featured">
            <p class="tag">Best value</p>
            <h3>VOGO One Enterprise</h3>
            <p class="price">€14 <span>/lună</span></p>
            <ul>
              <li>Tot din Advanced</li>
              <li>Push notifications (pachet separat)</li>
              <li>Agora Calls (pachet separat)</li>
              <li>Drive & comenzi curse (inter-city, aeroport, intra-city)</li>
              <li>Extensii enterprise personalizate</li>
            </ul>
            <button class="btn btn-primary">Alege Enterprise</button>
          </article>
        </div>
      </div>
    </section>

    <!-- Products contact section inspired by form-focused screenshot -->
    <section id="products" class="section enterprise-section">
      <div class="container enterprise-grid">
        <div>
          <p class="eyebrow">Soluții enterprise VOGO</p>
          <h2>O soluție enterprise pentru ambiții mari</h2>
          <p>
            Construim, migrăm și integrăm aplicații pentru echipe care vor guvernanță,
            performanță și creștere accelerată.
          </p>
        </div>
        <form class="enterprise-form" id="contact">
          <label>Nume
            <input type="text" placeholder="Nume" />
          </label>
          <label>Email business
            <input type="email" placeholder="email@companie.ro" />
          </label>
          <label>Telefon
            <input type="tel" placeholder="+40..." />
          </label>
          <label>Companie
            <input type="text" placeholder="Nume companie" />
          </label>
          <label>Descrie proiectul
            <textarea rows="4" placeholder="Spune-ne pe scurt ce vrei să construim."></textarea>
          </label>
          <button type="button" class="btn btn-primary">Book demo</button>
        </form>
      </div>
    </section>

    <!-- FAQ section: simple accordion behavior with clear calls to support -->
    <section class="section faq-section">
      <div class="container faq-grid">
        <div>
          <h2>FAQ</h2>
          <p>
            Ai întrebări suplimentare? Accesează <a href="#">Help Center</a> sau
            <a href="#contact">Contactează-ne</a>.
          </p>
        </div>
        <div id="faq-list"></div>
      </div>
    </section>

    <!-- Final CTA section inspired by dark footer CTA block -->
    <section class="section cta-section">
      <div class="container cta-grid">
        <h2>Construiește ce urmează</h2>
        <div>
          <p>
            Livrează experiențe digitale extraordinare cu un stack modern, susținut de AI și de expertiza VOGO.
          </p>
          <a href="#plans" class="btn btn-light">Vezi planurile de preț</a>
        </div>
      </div>
    </section>
  </main>

<?php include __DIR__ . '/../products-footer.php'; ?>
