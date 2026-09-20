# Sandile Masilela — Portfolio Redesign

## How to drop this into your existing GitHub repo

1. Copy these files into your `web-portfolio` repo, replacing the old `index.html`:
   - `index.html`
   - `policies.html`
   - `css/style.css`
   - `js/main.js`
   - `js/booking.js`
2. Keep your existing `IMAGES/` folder exactly where it is — every image path (e.g. `IMAGES/Frame 336.png`) matches what your old site already used, so nothing needs renaming.
3. Push to GitHub / redeploy however you currently host it (GitHub Pages, Netlify, etc.). No build step, no dependencies — still plain HTML/CSS/JS.

## What changed

- **Visual redesign**: kept your dark + red identity, added depth (gradient reds, warm white text), swapped the single Poppins font for **Unbounded** (headlines) + **Inter** (body) for more personality.
- **New interactive pieces**: cursor-reactive hero glow, rotating hero headline, scroll count-up stats, a filterable project grid, tabbed pricing by category, and a **4-step booking wizard** replacing the old plain WhatsApp/email links.
- **Booking wizard** (`#book` on the homepage): service → budget → project details → contact info, then builds a formatted message and hands it to WhatsApp or the user's email app. No backend, no server, nothing stored — same as before, just structured.
- **Basic spam/abuse protection on the booking form**:
  - A hidden honeypot field that silently drops bot submissions
  - A 1-minute client-side cooldown between submissions
  - Input length limits and required-field validation
  - All dynamic text is escaped before being inserted into the page (prevents script injection via the project modal / form)
- **New `policies.html`**: tabbed Privacy Policy, Terms of Service, and Booking & Cancellation Policy, linked from the footer and from the booking form's consent checkbox. Written with POPIA (South Africa's data protection law) in mind.

## New: recruiter path (`hire.html`)

- A "Hiring? / Need a project?" toggle now sits at the top of the nav on every page, so recruiters and clients each land on the right experience.
- `hire.html` is built from your real CV and 2026 portfolio PDF: professional summary, skills, a proper experience timeline (Commercial Autoparts, TenOne Venture Group, Kaypat Medical Centre), education/certifications, and 7 deep case studies (Fusi Dental Clinic, Deployed Ants, Sompeta, Somahhashi Wheels & Tyres, Marong-Rong, Khanyokuhle, Mosebela) — each with brief, solution, real color palette, and deliverables straight from your portfolio PDF.
- **To finish this page you need to add two things to your repo:**
  1. **`resume.pdf`** at the repo root — your actual CV file, renamed to `resume.pdf`. The "Download Resume" buttons point here.
  2. **Case study images** in `IMAGES/`, named to match what `hire.html` expects: `case-fusi.jpg`, `case-deployedants.jpg`, `case-sompeta.jpg`, `case-somahhashi.jpg`, `case-marongrong.jpg`, `case-khanyokuhle.jpg`, `case-mosebela.jpg`. Use the mockup images from your portfolio PDF (export them as images, or I can help crop them if you upload the PDF's source images).
  3. **"More Work" gallery images** in `IMAGES/`: `poster-autoparts-engines.jpg`, `poster-autoparts-parts.jpg`, `poster-autoparts-crashdeals.jpg`, `logo-bestea.jpg`, `poster-lamborghini.jpg`, `poster-cemair.jpg`, `poster-dodge.jpg` — the quick-hit logos/posters from your portfolio PDF, shown below the case studies without full write-ups.
- I used `cedricmasilela@gmail.com` and your LinkedIn (`linkedin.com/in/morris-masilela-65099220b`) from your CV for this page — separate from the WhatsApp/email used in client bookings. Let me know if you'd rather unify these.
- `preview-hire.html` is a self-contained preview of this page (placeholder images/colors) — same rule as `preview.html`: for viewing only, not for deployment.

## Client site now shares the full project library

- `index.html`'s Work section now has all 11 projects (the original 6 plus Fusi Dental Clinic, Deployed Ants, Marong-Rong, Mosebela, and Bestea from the recruiter page), with 3 new filter categories (Health, Tech, Finance) to match.
- Renamed `somabhashi` → `somahhashi` everywhere (matches the real logo spelling) — if anything in your own notes still says "Somabhashi," that's the reason for the change.
- Added a client-facing **More Work** section (posters, campaign concepts, logo marks) — same images as the recruiter page's More Work section, reframed without the employer-specific language that only makes sense on the resume page.

## "Show More" on every image grid

Every grid on both pages (`index.html` Work + More Work, `hire.html` Case Studies + More Work) now shows a capped number of items and reveals the rest on click — the cap adjusts by screen size (desktop/tablet/mobile) via `data-show-desktop` / `data-show-tablet` / `data-show-mobile` attributes on each grid's wrapper `<div class="expand-block">`. The logic lives once in `js/main.js` (`initExpandableGrid`), shared by both pages. On `index.html`, it also plays nicely with the category filter — filtering resets the "Show More" state to the first batch of whatever's currently filtered.

The lightbox (click-to-enlarge) also moved from `js/hire.js` into the shared `js/main.js`, and now works on `index.html`'s new More Work section too, not just the recruiter page.

## Things worth double-checking / personalizing before you go live

- **Policies are a strong starting template, not legal advice** — if this becomes a real registered business, worth a quick review by a SA attorney, especially the deposit % and refund terms in the Terms of Service, which I set at a common freelance default (50% deposit, non-refundable once work starts).
- **Hero stats** (`6 industries`, `9 brand systems`) in `index.html` around line 40 — update these to your real numbers.
- **WhatsApp number / email** are pulled from your original site (`27646950715`, `masileasandile01@gmail.com`) — update in `js/booking.js` (top of file) and in `index.html`/`policies.html` if either changes.
- The booking form's rate-limit and "last submitted" tracking uses `localStorage` — this is a light deterrent, not real bot protection. If spam becomes a real problem later, that's the point to add a proper backend (e.g. Formspree, or a small serverless function) — happy to help with that when you're ready.
