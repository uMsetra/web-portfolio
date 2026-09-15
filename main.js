// ==========================================================================
// NAVBAR SCROLL + MOBILE MENU
// ==========================================================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// ==========================================================================
// SMOOTH SCROLL FOR ON-PAGE ANCHORS
// ==========================================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length < 2) return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ==========================================================================
// HERO CURSOR-REACTIVE GLOW (desktop only, subtle)
// ==========================================================================
const hero = document.getElementById('home');
if (hero && window.matchMedia('(hover: hover)').matches) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    hero.style.setProperty('--mx', x + '%');
    hero.style.setProperty('--my', y + '%');
  });
}

// ==========================================================================
// HERO ROLE ROTATOR
// ==========================================================================
const rotatorEl = document.querySelector('.rotator');
if (rotatorEl) {
  const words = JSON.parse(rotatorEl.dataset.words || '[]');
  let i = 0;
  if (words.length > 1) {
    setInterval(() => {
      i = (i + 1) % words.length;
      rotatorEl.style.opacity = 0;
      setTimeout(() => {
        rotatorEl.textContent = words[i];
        rotatorEl.style.opacity = 1;
      }, 250);
    }, 2600);
  }
  rotatorEl.style.transition = 'opacity 0.25s ease';
}

// ==========================================================================
// SCROLL REVEAL (single pattern, applied once per element)
// ==========================================================================
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}

// ==========================================================================
// COUNT-UP STATS (hero meta numbers), triggers once on view
// ==========================================================================
const counters = document.querySelectorAll('[data-count]');
if ('IntersectionObserver' in window && counters.length) {
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1100;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countIO.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(el => countIO.observe(el));
}

// ==========================================================================
// PROJECT FILTER
// ==========================================================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !show);
    });
  });
});

// ==========================================================================
// PROJECT DATA + MODAL
// ==========================================================================
const projectData = {
  somabhashi: {
    title: 'Somabhashi Tyres & Wheels',
    tag: 'Branding',
    heroImage: 'IMAGES/Frame 336.png',
    challenge: 'The client needed a bold brand identity that would stand out in the competitive automotive retail space and communicate quality and reliability to customers.',
    approach: 'High-contrast colour and bold, heavyweight type chosen specifically for roadside visibility and appeal within the automotive retail category.',
    solution: 'A high-contrast orange and black brand system with bold typography designed for maximum visibility in both physical retail and roadside environments.',
    deliverables: ['Logo Design', 'Brand Identity System', 'Marketing Materials', 'Signage Concepts'],
    gallery: ['IMAGES/Frame 336.png', 'IMAGES/Frame 336.png', 'IMAGES/Frame 336.png']
  },
  sompeta: {
    title: 'Sompeta Construction & Projects',
    tag: 'Brand Identity',
    heroImage: 'IMAGES/business card_11.jpg',
    challenge: 'A construction company needed professional branding to differentiate from competitors and build trust with clients.',
    approach: 'Structure- and stability-led symbolism, translated into a geometric mark and a restrained, repeatable system.',
    solution: 'A geometric logo combining structure and stability symbolism, with complete brand guidelines for consistent application across all materials.',
    deliverables: ['Logo Redesign', 'Business Cards', 'Letterhead', 'Brand Guidelines'],
    gallery: ['IMAGES/business card_11.jpg', 'IMAGES/business card_11.jpg', 'IMAGES/business card_11.jpg']
  },
  audiobooks: {
    title: 'Audiobooks Lounge',
    tag: 'Ed-Tech',
    heroImage: 'IMAGES/Frame 341.png',
    challenge: 'An educational startup needed a welcoming brand that made literature accessible for students who struggle with traditional reading.',
    approach: 'Visual metaphors of comfort and ease — soft shapes and a warm palette — to lower the barrier to entry for reluctant readers.',
    solution: 'A warm, approachable brand identity emphasising comfort and accessibility, with visual metaphors of relaxation and learning.',
    deliverables: ['Brand Identity', 'Logo Design', 'App UI Mockups', 'Marketing Materials'],
    gallery: ['IMAGES/Frame 341.png', 'IMAGES/Frame 341.png', 'IMAGES/Frame 341.png']
  },
  khanyokuhle: {
    title: 'Khanyokuhle Projects',
    tag: 'Corporate',
    heroImage: 'IMAGES/khanyokuuhle-02.png',
    challenge: 'A project management company needed a complete brand system that communicated professionalism and reliability.',
    approach: 'A clean, restrained system built for boardrooms and proposal decks — designed to read as trustworthy at a glance.',
    solution: 'A comprehensive corporate identity with clean, modern aesthetics suitable for business presentations and client communications.',
    deliverables: ['Brand System', 'Logo Design', 'Corporate Materials'],
    gallery: ['IMAGES/khanyokuuhle-02.png', 'IMAGES/khanyokuuhle-02.png', 'IMAGES/khanyokuuhle-02.png']
  },
  automotive: {
    title: 'Automotive Social Campaign',
    tag: 'Campaign Concept',
    heroImage: 'IMAGES/chery tiggo 4 pro.png',
    challenge: 'A self-initiated concept exploring social media marketing for the automotive industry, balancing aspirational and accessible messaging.',
    approach: 'Product photography paired with lifestyle storytelling, tuned for scroll-stopping performance on social feeds.',
    solution: 'A bold, lifestyle-driven design blending product photography with emotional storytelling to position vehicles as both aspirational and accessible.',
    deliverables: ['Social Media Campaign', 'Visual Concept', 'Marketing Strategy'],
    gallery: ['IMAGES/chery tiggo 4 pro.png', 'IMAGES/chery tiggo 4 pro.png', 'IMAGES/chery tiggo 4 pro.png']
  },
  neme: {
    title: 'Neme Hairs',
    tag: 'Logo & Marketing',
    heroImage: 'IMAGES/Frame 352.png',
    challenge: 'A hair salon needed a modern brand identity that reflected elegance and confidence while appealing to a diverse clientele.',
    approach: 'Sleek type, generous whitespace and a refined mark built to feel premium across signage, social and print.',
    solution: 'A sleek, sophisticated visual identity with cohesive marketing materials emphasising premium quality and personal care.',
    deliverables: ['Logo Design', 'Brand Identity', 'Marketing Materials'],
    gallery: ['IMAGES/Frame 352.png', 'IMAGES/Frame 352.png', 'IMAGES/Frame 352.png']
  }
};

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function openModal(projectId) {
  const modal = document.getElementById('projectModal');
  const project = projectData[projectId];
  if (!modal || !project) return;

  document.getElementById('modalHeroImage').src = project.heroImage;
  document.getElementById('modalHeroImage').alt = project.title;
  document.getElementById('modalTag').textContent = project.tag;
  document.getElementById('modalTitle').textContent = project.title;
  document.getElementById('modalChallenge').textContent = project.challenge;
  document.getElementById('modalSolution').textContent = project.solution;
  document.getElementById('modalApproach').textContent = project.approach;

  document.getElementById('modalDeliverables').innerHTML =
    project.deliverables.map(item => `<div class="deliverable-item">${escapeHTML(item)}</div>`).join('');

  document.getElementById('modalGallery').innerHTML =
    project.gallery.map(img => `<img src="${escapeHTML(img)}" alt="${escapeHTML(project.title)}">`).join('');

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('projectModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-project]').forEach(card => {
  card.addEventListener('click', () => openModal(card.dataset.project));
});

const modalEl = document.getElementById('projectModal');
if (modalEl) {
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) closeModal();
  });
  document.querySelector('.modal-close')?.addEventListener('click', closeModal);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ==========================================================================
// TOAST HELPER (used by booking.js)
// ==========================================================================
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), 3200);
}
