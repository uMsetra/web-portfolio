// ==========================================================================
// BOOKING WIZARD
// No backend — this builds a formatted request and hands it to WhatsApp
// or the user's email client. Nothing is sent anywhere without the user
// tapping "Send via WhatsApp" / "Send via Email" on the final step.
// ==========================================================================
(function () {
  const WHATSAPP_NUMBER = '27646950715'; // no + or leading 0, country code first
  const OWNER_EMAIL = 'masileasandile01@gmail.com';
  const RATE_LIMIT_MS = 60 * 1000; // 1 submission per minute, client-side courtesy limit

  const wizard = document.getElementById('bookingWizard');
  if (!wizard) return;

  const steps = Array.from(wizard.querySelectorAll('.booking-step'));
  const segs = Array.from(document.querySelectorAll('.booking-progress .seg'));
  let currentStep = 0;

  const state = {
    service: '',
    package: '',
    business: '',
    description: '',
    timeline: '',
    name: '',
    contact: '',
    method: '' // 'whatsapp' | 'email'
  };

  function updateProgress() {
    segs.forEach((seg, i) => {
      seg.classList.toggle('done', i < currentStep);
      seg.classList.toggle('current', i === currentStep);
    });
  }

  function showStep(index) {
    steps.forEach((s, i) => s.classList.toggle('active', i === index));
    currentStep = index;
    updateProgress();
    if (index === steps.length - 1) buildReview();
  }

  // ---- Option card selection (service + package) ----
  wizard.querySelectorAll('[data-option-group]').forEach(group => {
    const key = group.dataset.optionGroup;
    group.querySelectorAll('.option-card').forEach(card => {
      card.addEventListener('click', () => {
        group.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        state[key] = card.dataset.value;
        clearError(group.closest('.booking-step'));
      });
    });
  });

  // ---- Contact method toggle ----
  wizard.querySelectorAll('.method-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      wizard.querySelectorAll('.method-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.method = btn.dataset.method;
    });
  });

  // ---- Text inputs ----
  const fieldMap = {
    business: document.getElementById('field-business'),
    description: document.getElementById('field-description'),
    timeline: document.getElementById('field-timeline'),
    name: document.getElementById('field-name'),
    contact: document.getElementById('field-contact')
  };
  Object.keys(fieldMap).forEach(key => {
    const el = fieldMap[key];
    if (el) el.addEventListener('input', () => { state[key] = el.value.trim(); });
  });

  function clearError(stepEl) {
    stepEl.querySelectorAll('.field.invalid').forEach(f => f.classList.remove('invalid'));
  }

  function markInvalid(fieldEl) {
    const wrap = fieldEl.closest('.field');
    if (wrap) wrap.classList.add('invalid');
  }

  // ---- Per-step validation ----
  function validateStep(index) {
    const stepEl = steps[index];
    clearError(stepEl);
    let valid = true;

    if (index === 0 && !state.service) {
      valid = false;
      showToast('Pick a service to continue');
    }
    if (index === 1 && !state.package) {
      valid = false;
      showToast('Pick a package to continue');
    }
    if (index === 2) {
      if (!state.business) { markInvalid(fieldMap.business); valid = false; }
      if (!state.description || state.description.length < 10) { markInvalid(fieldMap.description); valid = false; }
      if (!valid) showToast('Fill in the required fields');
    }
    if (index === 3) {
      if (!state.name) { markInvalid(fieldMap.name); valid = false; }
      if (!state.contact) { markInvalid(fieldMap.contact); valid = false; }
      if (!state.method) valid = false;
      if (!valid) showToast('Add your name, contact details, and preferred channel');
      const consent = document.getElementById('field-consent');
      if (consent && !consent.checked) {
        valid = false;
        showToast('Please accept the Booking Policy to continue');
      }
    }
    return valid;
  }

  // ---- Nav buttons ----
  wizard.querySelectorAll('[data-next]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!validateStep(currentStep)) return;
      if (currentStep < steps.length - 1) showStep(currentStep + 1);
    });
  });
  wizard.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 0) showStep(currentStep - 1);
    });
  });

  // ---- Review screen ----
  const SERVICE_LABELS = {
    branding: 'Logo & Brand Identity',
    marketing: 'Marketing Materials',
    digital: 'Website & Digital',
    copy: 'Copywriting',
    custom: 'Not sure / custom'
  };
  const PACKAGE_LABELS = {
    under2500: 'Under R2,500',
    r2500to6000: 'R2,500 – R6,000',
    r6000to10000: 'R6,000 – R10,000',
    r10000plus: 'R10,000+'
  };

  function buildReview() {
    const box = document.getElementById('reviewBox');
    if (!box) return;
    const rows = [
      ['Service', SERVICE_LABELS[state.service] || '—'],
      ['Budget range', PACKAGE_LABELS[state.package] || '—'],
      ['Business', state.business || '—'],
      ['Timeline', state.timeline || 'Flexible'],
      ['Name', state.name || '—'],
      ['Contact', state.contact || '—'],
      ['Send via', state.method === 'whatsapp' ? 'WhatsApp' : state.method === 'email' ? 'Email' : '—']
    ];
    box.innerHTML = rows.map(([label, val]) =>
      `<div><span>${escapeHTML(label)}</span><strong>${escapeHTML(val)}</strong></div>`
    ).join('');
  }

  function buildMessage() {
    const lines = [
      'New project enquiry — Sandile Masilela Design',
      '',
      `Service: ${SERVICE_LABELS[state.service] || 'Not specified'}`,
      `Budget range: ${PACKAGE_LABELS[state.package] || 'Not specified'}`,
      `Business: ${state.business}`,
      `Timeline: ${state.timeline || 'Flexible'}`,
      '',
      `Project details: ${state.description}`,
      '',
      `Name: ${state.name}`,
      `Contact: ${state.contact}`
    ];
    return lines.join('\n');
  }

  // ---- Rate limiting (client-side courtesy — not real spam protection) ----
  function isRateLimited() {
    const last = Number(localStorage.getItem('bookingLastSubmit') || 0);
    return Date.now() - last < RATE_LIMIT_MS;
  }
  function markSubmitted() {
    localStorage.setItem('bookingLastSubmit', String(Date.now()));
  }

  // ---- Submit ----
  const sendBtn = document.getElementById('bookingSend');
  const honeypot = document.getElementById('field-hp');

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      // Honeypot: if a bot filled this hidden field, silently drop the submission
      if (honeypot && honeypot.value) return;

      if (!state.method) {
        showToast('Choose WhatsApp or Email on the previous step');
        return;
      }
      if (isRateLimited()) {
        showToast("You've just sent a request — give it a minute before sending another.");
        return;
      }

      const message = buildMessage();
      markSubmitted();

      if (state.method === 'whatsapp') {
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
      } else {
        const subject = encodeURIComponent(`Project enquiry — ${state.business || state.name}`);
        window.location.href = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${encodeURIComponent(message)}`;
      }

      document.getElementById('bookingForm').style.display = 'none';
      document.getElementById('bookingSuccess').classList.add('active');
    });
  }

  // ---- Prefill service from package/service card CTAs elsewhere on the page ----
  document.querySelectorAll('[data-prefill-service]').forEach(el => {
    el.addEventListener('click', () => {
      const val = el.dataset.prefillService;
      const group = wizard.querySelector('[data-option-group="service"]');
      const card = group?.querySelector(`[data-value="${val}"]`);
      if (card) {
        group.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        state.service = val;
      }
    });
  });

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = String(str);
    return div.innerHTML;
  }

  showStep(0);
})();
