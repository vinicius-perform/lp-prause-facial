/**
 * DR. TIAGO PRAUSE — CIRURGIA FACIAL
 * Script de Interatividade & Usabilidade
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. HEADER SCROLL STATE
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. MOBILE DRAWER MENU
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer .btn-cta');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. FAQ ACCORDION
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fecha todos os outros
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherPanel = other.querySelector('.faq-panel');
          if (otherPanel) {
            otherPanel.style.maxHeight = null;
          }
        }
      });

      // Alterna o atual
      if (isActive) {
        item.classList.remove('active');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('active');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  // Abre a primeira pergunta por padrão para incentivar a leitura
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    firstItem.classList.add('active');
    const firstPanel = firstItem.querySelector('.faq-panel');
    if (firstPanel) {
      firstPanel.style.maxHeight = firstPanel.scrollHeight + 'px';
    }
  }

  // 4. INTERSECTION OBSERVER PARA FADE-UP SUAVE
  document.body.classList.add('js-loaded');
  const fadeElements = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -20px 0px',
      threshold: 0.05
    });

    fadeElements.forEach(el => {
      // Elementos já no topo ficam visíveis de imediato
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      } else {
        observer.observe(el);
      }
    });
  } else {
    fadeElements.forEach(el => el.classList.add('visible'));
  }
});
