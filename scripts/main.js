(function () {
  const html = document.documentElement;
  const themeToggleButton = document.getElementById('themeToggle');
  const menuToggleButton = document.getElementById('menuToggle');
  const navList = document.getElementById('menu');
  const yearSpan = document.getElementById('year');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const backToTopButton = document.getElementById('backToTop');

  // Year
  if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());

  // Theme handling: user preference stored in localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    html.setAttribute('data-theme', savedTheme);
    if (themeToggleButton) themeToggleButton.setAttribute('aria-pressed', savedTheme === 'dark' ? 'true' : 'false');
  } else {
    // auto: prefer color scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    if (themeToggleButton) themeToggleButton.setAttribute('aria-pressed', prefersDark ? 'true' : 'false');
  }

  function toggleTheme() {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    if (themeToggleButton) themeToggleButton.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
  }

  themeToggleButton?.addEventListener('click', toggleTheme);

  // Mobile menu
  function toggleMenu() {
    const open = navList?.classList.toggle('open');
    if (menuToggleButton) menuToggleButton.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  menuToggleButton?.addEventListener('click', toggleMenu);

  // Close menu on link click (mobile)
  navList?.addEventListener('click', (e) => {
    const target = e.target;
    if (target instanceof HTMLAnchorElement) {
      navList.classList.remove('open');
      if (menuToggleButton) menuToggleButton.setAttribute('aria-expanded', 'false');
    }
  });

  // Contact form (progressive enhancement)
  contactForm?.addEventListener('submit', async (e) => {
    if (!contactForm.action || contactForm.method.toLowerCase() !== 'post') return;
    e.preventDefault();
    formStatus.hidden = false;
    formStatus.textContent = 'Envoi en cours…';

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, { method: 'POST', body: formData, headers: { Accept: 'application/json' } });
      if (response.ok) {
        formStatus.textContent = 'Merci ! Votre message a bien été envoyé.';
        contactForm.reset();
      } else {
        formStatus.textContent = "Une erreur est survenue. Vous pouvez m'écrire directement par email.";
      }
    } catch (err) {
      formStatus.textContent = "Impossible d'envoyer le message. Vérifiez votre connexion.";
    }
  });

  // Bouton retour en haut de page
  function toggleBackToTopButton() {
    if (window.scrollY > 300) {
      backToTopButton.style.display = 'flex';
    } else {
      backToTopButton.style.display = 'none';
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Écouter le scroll pour afficher/masquer le bouton
  window.addEventListener('scroll', toggleBackToTopButton);
  
  // Cliquer sur le bouton pour remonter en haut
  backToTopButton?.addEventListener('click', scrollToTop);
})();




