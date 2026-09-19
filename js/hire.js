// ==========================================================================
// RECRUITER PAGE — CASE STUDY DATA + MODAL
// Sourced directly from Sandile's 2026 design portfolio PDF.
// ==========================================================================
const caseStudies = {
  fusi: {
    title: 'Fusi Dental Clinic',
    industry: 'Health / Dentistry',
    role: 'Brand Designer (Pitch)',
    heroImage: 'IMAGES/FUSI DENTAL .png',
    brief: 'Establish a professional dental identity that communicates trusted care, cleanliness and modern treatment.',
    solution: 'A distinctive tooth-based monogram, supported by calming turquoise and charcoal, creates a clean and confident healthcare brand.',
    deliverables: ['Logo & Monogram', 'Signage', 'Staff Uniform Branding', 'Brochure', 'Booking App Mockup'],
    palette: [['#2C323E', '2C323E'], ['#57C3CF', '57C3CF'], ['#FFFFFF', 'FFFFFF']],
    gallery: ['IMAGES/FUSI DENTAL .png', 'IMAGES/FUSI DENTAL .png']
  },
  deployedants: {
    title: 'Deployed Ants',
    industry: 'Technology',
    role: 'Brand Designer',
    heroImage: 'IMAGES/DEPLOYED ANTS.png',
    brief: 'Build a bold technology brand capable of transforming ideas into functional software and business systems.',
    solution: 'A geometric ant-inspired monogram and high-contrast palette communicate collaboration, intelligent problem-solving and purposeful development.',
    deliverables: ['Logo & Monogram', 'Merchandise (Hoodie, Sleeve, Notebook)', 'Proposal & Tender Documents'],
    palette: [['#D15D33', 'D15D33'], ['#110F0F', '110F0F'], ['#E2E2E2', 'E2E2E2']],
    gallery: ['IMAGES/DEPLOYED ANTS.png', 'IMAGES/DEPLOYED ANTS.png']
  },
  sompeta: {
    title: 'Sompeta Construction & Projects',
    industry: 'Construction',
    role: 'Brand Designer',
    heroImage: 'IMAGES/SOMPETA.png',
    brief: 'Create a credible construction identity representing professional project planning, management and delivery.',
    solution: 'The architectural symbol combines buildings with the letter "S", creating a strong visual foundation for a dependable construction brand.',
    deliverables: ['Logo Design', 'Tender & Company Profile Documents', 'Site Signage', 'Vehicle Branding'],
    palette: [['#0B1320', '0B1320'], ['#FFFFFF', 'FFFFFF'], ['#DD631A', 'DD631A']],
    gallery: ['IMAGES/SOMPETA.png', 'IMAGES/SOMPETA.png']
  },
  somahhashi: {
    title: 'Somahhashi Wheels & Tyres',
    industry: 'Motor / Automotive',
    role: 'Brand Designer',
    heroImage: 'IMAGES/Frame 336.png',
    brief: 'Develop an energetic automotive identity appealing to truck, bakkie and passenger-vehicle customers.',
    solution: 'The powerful horse and bold "HH" symbol communicate movement, strength and dependable performance across every road.',
    deliverables: ['Logo Design', 'Signage', 'Workwear', 'Quotation & Business Card Stationery'],
    palette: [['#EA5B0C', 'EA5B0C'], ['#010413', '010413'], ['#FFFFFF', 'FFFFFF']],
    gallery: ['IMAGES/Frame 336.png', 'IMAGES/Frame 336.png']
  },
  marongrong: {
    title: 'Marong-Rong Cash Loans',
    industry: 'Finance / Fast Loans',
    role: 'Brand Designer',
    heroImage: 'IMAGES/marong rong.png',
    brief: 'Establish an accessible lending brand offering customers a clear, convenient and trustworthy borrowing experience.',
    solution: 'The fast-moving wallet symbol and confident green palette communicate quick service, financial accessibility and responsible support.',
    deliverables: ['Logo Design', 'Storefront Signage', 'Loan Application Stationery', 'App UI Mockup'],
    palette: [['#2C323E', '2C323E'], ['#111111', '111111'], ['#FFFFFF', 'FFFFFF']],
    gallery: ['IMAGES/marong rong.png', 'IMAGES/marong rong.png']
  },
  khanyokuhle: {
    title: 'Khanyokuhle Projects',
    industry: 'Finance / Accounting',
    role: 'Brand Designer',
    heroImage: 'IMAGES/khanyokuhle.png',
    brief: 'Position Khanyokuhle as a dependable accounting partner helping businesses manage their finances, records and compliance.',
    solution: 'The folder, cityscape and upward graph combine into a structured identity representing organisation, financial clarity and sustainable growth.',
    deliverables: ['Logo Design', 'Client Document System', 'Invoice Stationery', 'Dashboard UI Mockup'],
    palette: [['#005E1B', '005E1B'], ['#FFFFFF', 'FFFFFF'], ['#1C1C1C', '1C1C1C']],
    gallery: ['IMAGES/khanyokuhle.png', 'IMAGES/khanyokuhle.png']
  },
  mosebela: {
    title: 'Mosebela',
    industry: 'Finance / Professional Services',
    role: 'Brand Designer',
    heroImage: 'IMAGES/PRIMARY LOGO.png',
    brief: 'Create a flexible corporate identity for a purpose-driven company operating across property, tax, registration and general business services.',
    solution: 'A structured and adaptable identity system communicates professionalism, progress and meaningful impact across multiple service areas.',
    deliverables: ['Logo Design', 'Signage', 'Company Profile', 'Invoice & Stationery Set', 'Social Campaign'],
    palette: [['#162855', '162855'], ['#C29634', 'C29634'], ['#FFFFFF', 'FFFFFF']],
    gallery: ['IMAGES/PRIMARY LOGO.png', 'IMAGES/PRIMARY LOGO.png']
  }
};

function escapeHTMLHire(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function openCaseModal(id) {
  const modal = document.getElementById('caseModal');
  const c = caseStudies[id];
  if (!modal || !c) return;

  document.getElementById('caseHeroImage').src = c.heroImage;
  document.getElementById('caseHeroImage').alt = c.title;
  document.getElementById('caseTitle').textContent = c.title;
  document.getElementById('caseBrief').textContent = c.brief;
  document.getElementById('caseSolution').textContent = c.solution;

  document.getElementById('caseMetaRow').innerHTML =
    `<span class="case-meta-tag">${escapeHTMLHire(c.industry)}</span><span class="case-meta-tag">${escapeHTMLHire(c.role)}</span>`;

  document.getElementById('caseDeliverables').innerHTML =
    c.deliverables.map(d => `<div class="deliverable-item">${escapeHTMLHire(d)}</div>`).join('');

  document.getElementById('casePalette').innerHTML =
    c.palette.map(([hex, label]) =>
      `<div class="palette-swatch"><div class="chip" style="background:${hex}"></div><span>${escapeHTMLHire(label)}</span></div>`
    ).join('');

  document.getElementById('caseGallery').innerHTML =
    c.gallery.map(img => `<img src="${escapeHTMLHire(img)}" alt="${escapeHTMLHire(c.title)}">`).join('');

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCaseModal() {
  const modal = document.getElementById('caseModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-case]').forEach(card => {
  card.addEventListener('click', () => openCaseModal(card.dataset.case));
});

const caseModalEl = document.getElementById('caseModal');
if (caseModalEl) {
  caseModalEl.addEventListener('click', (e) => {
    if (e.target === caseModalEl) closeCaseModal();
  });
  caseModalEl.querySelector('.modal-close')?.addEventListener('click', closeCaseModal);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCaseModal();
});
