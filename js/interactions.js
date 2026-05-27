/* ============================================================
   BrainChain · interactions.js
   custom-cursor · magnetic · spotlight · reveal · tilt · tickers · faq · reduced-motion
============================================================ */
(function () {
  'use strict';

  const prefersReduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia && window.matchMedia('(hover: none)').matches;
  const isWide  = () => window.matchMedia('(min-width: 1024px)').matches;

  /* ---------- Custom cursor ---------- */
  function initCursor() {
    if (prefersReduced || isTouch || !isWide()) return;

    const cursor = document.createElement('div');
    cursor.className = 'bc-cursor';
    document.body.appendChild(cursor);

    document.documentElement.dataset.cursor = 'on';

    let x = -100, y = -100, tx = -100, ty = -100;
    let hover = false;

    document.addEventListener('mousemove', (e) => {
      tx = e.clientX; ty = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '';
    });

    // Hoverables
    const HOVER_SEL = 'a, button, [data-magnetic], .bc-card, .bc-pane, .bc-faq__q, .bc-role-card, .bc-agent-tile, .bc-resume-card, input, textarea';
    document.addEventListener('mouseover', (e) => {
      const t = e.target.closest(HOVER_SEL);
      hover = !!t;
      cursor.dataset.hover = hover ? 'true' : 'false';
    });

    document.addEventListener('click', (e) => {
      if (!e.clientX && !e.clientY) return;
      const r = document.createElement('div');
      r.className = 'bc-cursor__ripple';
      r.style.left = e.clientX + 'px';
      r.style.top  = e.clientY + 'px';
      document.body.appendChild(r);
      setTimeout(() => r.remove(), 320);
    });

    function frame() {
      x += (tx - x) * 0.32;
      y += (ty - y) * 0.32;
      cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Magnetic ---------- */
  function initMagnetic() {
    if (prefersReduced || isTouch || !isWide()) return;
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) * 0.22;
        const dy = (e.clientY - cy) * 0.22;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* ---------- Spotlight (cards) ---------- */
  function initSpotlight() {
    if (prefersReduced || isTouch) return;
    document.querySelectorAll('[data-spotlight]').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ---------- Tilt ---------- */
  function initTilt() {
    if (prefersReduced || isTouch || !isWide()) return;
    document.querySelectorAll('[data-tilt]').forEach((el) => {
      const max = parseFloat(el.dataset.tilt) || 4;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - 0.5;
        const dy = (e.clientY - r.top) / r.height - 0.5;
        const rx = -dy * max;
        const ry =  dx * max;
        el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* ---------- Section reveal ---------- */
  function initReveal() {
    if (prefersReduced) {
      document.querySelectorAll('.bc-reveal, .bc-stagger').forEach(el => el.dataset.revealed = 'true');
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.dataset.revealed = 'true';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
    document.querySelectorAll('.bc-reveal, .bc-stagger').forEach((el) => obs.observe(el));
  }

  /* ---------- Number tickers ---------- */
  function initTickers() {
    if (prefersReduced) {
      document.querySelectorAll('[data-tick]').forEach(el => {
        const target = el.dataset.tick;
        el.textContent = target;
      });
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tick(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    function tick(el) {
      const target = parseFloat(el.dataset.tick);
      const prefix = el.dataset.tickPrefix || '';
      const suffix = el.dataset.tickSuffix || '';
      const decimals = parseInt(el.dataset.tickDecimals || '0', 10);
      const duration = 700;
      const start = performance.now();
      function step(now) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = target * eased;
        el.textContent = prefix + val.toFixed(decimals) + suffix;
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = prefix + target.toFixed(decimals) + suffix;
      }
      requestAnimationFrame(step);
    }
    document.querySelectorAll('[data-tick]').forEach(el => obs.observe(el));
  }

  /* ---------- Bar fills (for role cards / mock bars on reveal) ---------- */
  function initBars() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.bc-bar__fill[data-fill]').forEach((bar, i) => {
            setTimeout(() => {
              bar.style.width = bar.dataset.fill;
            }, i * 60);
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('[data-bars]').forEach(el => obs.observe(el));
  }

  /* ---------- FAQ accordion ---------- */
  function initFAQ() {
    document.querySelectorAll('.bc-faq__item').forEach((item) => {
      const q = item.querySelector('.bc-faq__q');
      q.addEventListener('click', () => {
        const isOpen = item.dataset.open === 'true';
        item.dataset.open = isOpen ? 'false' : 'true';
        q.setAttribute('aria-expanded', !isOpen);
      });
    });
  }

  /* ---------- Mobile menu ---------- */
  function initMobileNav() {
    const btn = document.querySelector('[data-mobile-menu-toggle]');
    const menu = document.querySelector('[data-mobile-menu]');
    if (!btn || !menu) return;

    const close = () => {
      document.documentElement.dataset.mobileMenu = 'closed';
      btn.setAttribute('aria-expanded', 'false');
    };
    const open = () => {
      document.documentElement.dataset.mobileMenu = 'open';
      btn.setAttribute('aria-expanded', 'true');
    };

    close();
    btn.addEventListener('click', () => {
      const isOpen = document.documentElement.dataset.mobileMenu === 'open';
      isOpen ? close() : open();
    });
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', close);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  /* ---------- Lead capture ---------- */
  function initLeadForms() {
    document.querySelectorAll('[data-lead-form]').forEach((form) => {
      const input = form.querySelector('input[type="email"]');
      const status = form.querySelector('[data-lead-status]');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!input || !input.value || !input.checkValidity()) {
          if (status) status.textContent = window.BCI18N ? window.BCI18N.t('Informe um email válido.') : 'Informe um email válido.';
          if (input) input.focus();
          return;
        }
        const email = input.value.trim();
        const saved = JSON.parse(localStorage.getItem('bc-leads') || '[]');
        if (!saved.includes(email)) saved.push(email);
        localStorage.setItem('bc-leads', JSON.stringify(saved));
        if (status) status.textContent = window.BCI18N ? window.BCI18N.t('Email registrado localmente. Obrigado.') : 'Email registrado localmente. Obrigado.';
        input.value = '';
        showToast('Email registrado localmente.');
      });
    });
  }

  function showToast(message) {
    let toast = document.querySelector('[data-bc-toast]');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'bc-toast';
      toast.setAttribute('data-bc-toast', '');
      toast.setAttribute('role', 'status');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.dataset.open = 'true';
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.dataset.open = 'false';
    }, 3200);
  }

  /* ---------- Initialize ---------- */
  function init() {
    initCursor();
    initMagnetic();
    initSpotlight();
    initTilt();
    initReveal();
    initTickers();
    initBars();
    initFAQ();
    initMobileNav();
    initLeadForms();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
