/**
 * UI interactions: nav scroll state, mobile menu, FAQ accordion,
 * sectors preview, reveal on scroll, form handling.
 */

export function initNav() {
  const nav = document.querySelector('[data-nav]');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  const burger = document.querySelector('[data-burger]');
  const menu = document.querySelector('[data-mobile-menu]');
  const close = document.querySelector('[data-menu-close]');
  if (!burger || !menu) return;
  const setOpen = (open) => {
    menu.dataset.open = String(open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      const first = menu.querySelector('a, button');
      first?.focus();
    } else {
      burger.focus();
    }
  };
  burger.addEventListener('click', () => setOpen(menu.dataset.open !== 'true'));
  close?.addEventListener('click', () => setOpen(false));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));

  // Focus trap: keep Tab cycling inside the open menu
  menu.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || menu.dataset.open !== 'true') return;
    const focusables = menu.querySelectorAll('a[href], button:not([disabled])');
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.dataset.open === 'true') setOpen(false);
  });
}

export function initFAQ() {
  const items = document.querySelectorAll('[data-faq-item]');
  items.forEach((item) => {
    const btn = item.querySelector('.faq__button');
    const panel = item.querySelector('.faq__panel');
    if (!btn || !panel) return;
    btn.setAttribute('aria-expanded', 'false');
    panel.dataset.open = 'false';
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      panel.dataset.open = String(!isOpen);
    });
  });
}

export function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );
  els.forEach((el) => io.observe(el));
}

export function initSectors() {
  const container = document.querySelector('[data-sectors]');
  if (!container) return;
  const sectors = container.querySelectorAll('[data-sector]');
  const frames = document.querySelectorAll('[data-sector-frame]');
  const setActive = (slug) => {
    sectors.forEach((s) => s.classList.toggle('is-active', s.dataset.sector === slug));
    frames.forEach((f) => f.dataset.active = String(f.dataset.sectorFrame === slug));
  };
  sectors.forEach((s) => {
    s.addEventListener('mouseenter', () => setActive(s.dataset.sector));
    s.addEventListener('focusin', () => setActive(s.dataset.sector));
  });
  if (sectors.length && frames.length) {
    setActive(sectors[0].dataset.sector);
  }
}

export function initForm() {
  const form = document.querySelector('[data-form]');
  if (!form) return;
  const status = form.querySelector('[data-form-status]');
  const submit = form.querySelector('[type="submit"]');
  const setStatus = (kind, text) => {
    if (!status) return;
    status.className = 'form-status' + (kind ? ' ' + kind : '');
    status.textContent = text;
    status.hidden = !text;
  };
  const setFieldError = (name, msg) => {
    const field = form.querySelector(`.field[data-field="${name}"]`);
    if (!field) return;
    field.classList.toggle('err', Boolean(msg));
    let m = field.querySelector('.err-msg');
    if (msg) {
      if (!m) {
        m = document.createElement('span');
        m.className = 'err-msg';
        m.setAttribute('role', 'alert');
        field.appendChild(m);
      }
      m.textContent = msg;
    } else if (m) {
      m.remove();
    }
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    setStatus('', '');
    const formData = new FormData(form);
    let hasError = false;
    let firstInvalid = null;

    const required = {
      name: 'Informe o seu nome.',
      email: 'Informe um e-mail para contato.',
      message: 'Escreva uma mensagem para começar a conversa.',
    };
    for (const [key, msg] of Object.entries(required)) {
      const val = String(formData.get(key) || '').trim();
      if (!val) {
        hasError = true;
        setFieldError(key, msg);
        firstInvalid = firstInvalid || form.querySelector(`.field[data-field="${key}"] input, .field[data-field="${key}"] textarea`);
      } else {
        setFieldError(key, '');
      }
    }
    const email = String(formData.get('email') || '');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      hasError = true;
      setFieldError('email', 'E-mail em formato inválido.');
      firstInvalid = firstInvalid || form.querySelector('.field[data-field="email"] input');
    }

    if (hasError) {
      setStatus('error', 'Confira os campos destacados para continuar.');
      firstInvalid?.focus();
      return;
    }

    // No integration configured. Guide user to email fallback (no fake success).
    const subject = encodeURIComponent(`Contato via site — ${formData.get('name')}`);
    const body = encodeURIComponent(
      `Nome: ${formData.get('name')}\nEmpresa: ${formData.get('company') || '—'}\n` +
      `E-mail: ${formData.get('email')}\nTelefone: ${formData.get('phone') || '—'}\n` +
      `Tipo de empreendimento: ${formData.get('project_type') || '—'}\n` +
      `Etapa da obra: ${formData.get('stage') || '—'}\n\nMensagem:\n${formData.get('message')}`
    );
    const mailto = `mailto:contato@bpfengenharia.eng.br?subject=${subject}&body=${body}`;
    setStatus('success',
      'Estamos abrindo seu cliente de e-mail com a mensagem pronta para contato@bpfengenharia.eng.br. Se preferir, ligue para (21) 2210-5298.');
    if (submit) submit.disabled = true;
    window.location.href = mailto;
  });
}

export function initYear() {
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}
