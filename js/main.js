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
    // Re-evaluate "Show More" against the newly filtered set, collapsed back to start
    if (expandControllers['work-grid']) expandControllers['work-grid'].reset();
  });
});

// ==========================================================================
// PROJECT DATA + MODAL
// ==========================================================================
const projectData = {
  somahhashi: {
    title: 'Somahhashi Tyres & Wheels',
    tag: 'Branding',
    heroImage: 'IMAGES/Frame 336.png',
    challenge: 'The client needed a bold brand identity that would stand out in the competitive automotive retail space and communicate quality and reliability to customers.',
    approach: 'High-contrast colour and bold, heavyweight type chosen specifically for roadside visibility and appeal within the automotive retail category.',
    solution: 'A high-contrast orange and black brand system with bold typography designed for maximum visibility in both physical retail and roadside environments.',
    deliverables: ['Logo Design', 'Brand Identity System', 'Marketing Materials', 'Signage Concepts'],
    gallery: ['IMAGES/Frame 336.png', 'IMAGES/Frame 336.png', 'IMAGES/Frame 336.png']
  },
  fusi: {
    title: 'Fusi Dental Clinic',
    tag: 'Health / Dentistry',
    heroImage: 'IMAGES/FUSI DENTAL .png',
    challenge: 'Establish a professional dental identity that communicates trusted care, cleanliness and modern treatment.',
    approach: 'A tooth-based monogram paired with a calming, clinical colour pairing chosen to feel trustworthy without feeling cold.',
    solution: 'A distinctive tooth-based monogram, supported by calming turquoise and charcoal, creates a clean and confident healthcare brand.',
    deliverables: ['Logo & Monogram', 'Signage', 'Staff Uniform Branding', 'Brochure', 'Booking App Mockup'],
    gallery: ['IMAGES/FUSI DENTAL .png', 'IMAGES/FUSI DENTAL .png', 'IMAGES/FUSI DENTAL .png']
  },
  deployedants: {
    title: 'Deployed Ants',
    tag: 'Technology',
    heroImage: 'IMAGES/DEPLOYED ANTS.png',
    challenge: 'Build a bold technology brand capable of transforming ideas into functional software and business systems.',
    approach: 'A geometric, collaboration-themed monogram built to hold up across pitch decks, merchandise and proposal documents alike.',
    solution: 'A geometric ant-inspired monogram and high-contrast palette communicate collaboration, intelligent problem-solving and purposeful development.',
    deliverables: ['Logo & Monogram', 'Merchandise (Hoodie, Sleeve, Notebook)', 'Proposal & Tender Documents'],
    gallery: ['IMAGES/DEPLOYED ANTS.png', 'IMAGES/DEPLOYED ANTS.png', 'IMAGES/DEPLOYED ANTS.png']
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
    tag: 'Finance',
    heroImage: 'IMAGES/khanyokuuhle-02.png',
    challenge: 'Position Khanyokuhle as a dependable accounting partner helping businesses manage their finances, records and compliance.',
    approach: 'A clean, restrained system built for boardrooms and proposal decks — designed to read as trustworthy at a glance.',
    solution: 'The folder, cityscape and upward graph combine into a structured identity representing organisation, financial clarity and sustainable growth.',
    deliverables: ['Brand System', 'Logo Design', 'Corporate Materials'],
    gallery: ['IMAGES/khanyokuuhle-02.png', 'IMAGES/khanyokuuhle-02.png', 'IMAGES/khanyokuuhle-02.png']
  },
  marongrong: {
    title: 'Marong-Rong Cash Loans',
    tag: 'Finance',
    heroImage: 'IMAGES/marong rong.png',
    challenge: 'Establish an accessible lending brand offering customers a clear, convenient and trustworthy borrowing experience.',
    approach: 'A fast-moving wallet symbol and confident green palette, built to feel approachable rather than intimidating for first-time borrowers.',
    solution: 'The fast-moving wallet symbol and confident green palette communicate quick service, financial accessibility and responsible support.',
    deliverables: ['Logo Design', 'Storefront Signage', 'Loan Application Stationery', 'App UI Mockup'],
    gallery: ['IMAGES/marong rong.png', 'IMAGES/marong rong.png', 'IMAGES/marong rong.png']
  },
  mosebela: {
    title: 'Mosebela',
    tag: 'Finance',
    heroImage: 'IMAGES/PRIMARY LOGO.png',
    challenge: 'Create a flexible corporate identity for a purpose-driven company operating across property, tax, registration and general business services.',
    approach: 'A structured, adaptable system designed to flex across multiple service lines without losing a consistent visual thread.',
    solution: 'A structured and adaptable identity system communicates professionalism, progress and meaningful impact across multiple service areas.',
    deliverables: ['Logo Design', 'Signage', 'Company Profile', 'Invoice & Stationery Set', 'Social Campaign'],
    gallery: ['IMAGES/PRIMARY LOGO.png', 'IMAGES/PRIMARY LOGO.png', 'IMAGES/PRIMARY LOGO.png']
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
  },
  bestea: {
    title: 'Bestea',
    tag: 'Concept Brand',
    heroImage: 'IMAGES/logo-bestea.jpg',
    challenge: 'A self-initiated concept for a cookie brand designed to appeal across every age group and market segment — the perfect snack to pair with your tea.',
    approach: 'A friendly, character-led mascot mark, built to feel at home on packaging, social content and in-store signage alike.',
    solution: 'A warm, character-led identity built around a cookie mascot, giving the brand a universal, approachable feel across every touchpoint.',
    deliverables: ['Logo & Mascot Design'],
    gallery: ['IMAGES/logo-bestea.jpg', 'IMAGES/logo-bestea.jpg']
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

// ==========================================================================
// EXPANDABLE GRIDS — "Show More", reactive to screen size
// Wrap any image grid like:
// <div class="expand-block" data-show-desktop="6" data-show-tablet="4" data-show-mobile="2">
//   <div class="project-grid" data-expand-grid> ...cards... </div>
//   <div class="show-more-wrap"><button class="btn btn-outline show-more-btn" data-expand-toggle>Show More</button></div>
// </div>
// Works alongside category filters: items hidden by a filter (class "is-hidden")
// are excluded from the count entirely, so "Show More" always reflects what's
// actually filterable/visible right now.
// ==========================================================================
const expandControllers = {};

function initExpandableGrid(block) {
  const grid = block.querySelector('[data-expand-grid]');
  const btn = block.querySelector('[data-expand-toggle]');
  if (!grid || !btn) return;

  let expanded = false;

  function visibleItems() {
    return Array.from(grid.children).filter(el => !el.classList.contains('is-hidden'));
  }

  function getLimit() {
    const w = window.innerWidth;
    if (w <= 600) return parseInt(block.dataset.showMobile || block.dataset.showDesktop, 10);
    if (w <= 900) return parseInt(block.dataset.showTablet || block.dataset.showDesktop, 10);
    return parseInt(block.dataset.showDesktop, 10);
  }

  function apply() {
    const items = visibleItems();
    const limit = getLimit();
    const overflow = items.length - limit;

    if (overflow <= 0) {
      items.forEach(el => el.classList.remove('is-capped'));
      btn.style.display = 'none';
      return;
    }

    if (expanded) {
      items.forEach(el => el.classList.remove('is-capped'));
      btn.textContent = 'Show Less';
    } else {
      items.forEach((el, i) => el.classList.toggle('is-capped', i >= limit));
      btn.textContent = `Show More (+${overflow})`;
    }
    btn.style.display = '';
  }

  function reset() {
    expanded = false;
    apply();
  }

  btn.addEventListener('click', () => {
    expanded = !expanded;
    apply();
    if (!expanded) block.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  window.addEventListener('resize', () => { if (!expanded) apply(); }, { passive: true });

  apply();

  const id = block.dataset.expandId;
  if (id) expandControllers[id] = { apply, reset };
}

document.querySelectorAll('.expand-block').forEach(initExpandableGrid);

// ==========================================================================
// LIGHTBOX — full-image view for "More Work" style galleries (shared across pages)
// ==========================================================================
(function () {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lbImage = document.getElementById('lightboxImage');
  const lbCaption = document.getElementById('lightboxCaption');

  function openLightbox(src, caption) {
    lbImage.src = src;
    lbImage.alt = caption;
    lbCaption.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.quickwork-item img').forEach(img => {
    img.addEventListener('click', () => {
      const caption = img.closest('.quickwork-item').querySelector('span')?.textContent || img.alt;
      openLightbox(img.src, caption);
    });
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  lightbox.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
})();
