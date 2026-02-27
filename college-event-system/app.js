/* ================================================================
   NEXUS — College Event Management System  |  app.js
   ----------------------------------------------------------------
   Features:
   • Events stored in a structured array
   • Cards dynamically generated from that array
   • Live countdown timer on each card + in the modal
   • Register button saves data to localStorage
   • Custom confirmation alert (not browser alert())
   • My Registrations side panel
   • Filter, hamburger menu, ESC-to-close
   ================================================================ */

'use strict';

// ──────────────────────────────────────────────
//  1. EVENTS DATA ARRAY
// ──────────────────────────────────────────────
const EVENTS = [
  {
    id: 1,
    title: 'JISSP Hackathon 2025',
    icon: '💻',
    category: 'tech',
    badge: 'Tech',
    badgeClass: 'badge-tech',
    bg: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    datetime: '2025-09-15T09:00:00',
    displayDate: 'September 15, 2025',
    displayTime: '9:00 AM – 9:00 AM (48 hrs)',
    venue: 'Main Auditorium & Labs',
    organizer: 'CSE Society',
    fee: 'Free',
    registered: 144,
    capacity: 200,
    featured: false,
    status: 'Open',
    description:
      '48-hour hackathon at JISSP open to all branches. Build IoT, web, or AI solutions for real-world challenges. Teams of 2–4 welcome. ₹50K in prizes. Free meals, mentorship, and certificates.',
  },
  {
    id: 2,
    title: 'TechnoFest at JISSP',
    icon: '🎭',
    category: 'cultural',
    badge: 'Cultural',
    badgeClass: 'badge-cultural',
    bg: 'linear-gradient(135deg, #f953c6, #b91d73)',
    datetime: '2025-09-20T17:00:00',
    displayDate: 'September 20, 2025',
    displayTime: '5:00 PM – 11:00 PM',
    venue: 'Open-Air Amphitheater',
    organizer: 'Cultural Committee',
    fee: '₹100 / person',
    registered: 450,
    capacity: 500,
    featured: true,
    status: 'Filling Fast',
    description:
      'Annual cultural fest with dance, drama, comedy, and live music. Celebrate JISSP tech culture with design competitions, short film screening, and networking. Book now!',
  },
  {
    id: 3,
    title: 'IoT & Embedded Systems Workshop',
    icon: '📡',
    category: 'workshop',
    badge: 'Workshop',
    badgeClass: 'badge-workshop',
    bg: 'linear-gradient(135deg, #11998e, #38ef7d)',
    datetime: '2025-09-22T10:00:00',
    displayDate: 'September 22–24, 2025',
    displayTime: '10:00 AM – 4:00 PM',
    venue: 'Seminar Hall B',
    organizer: 'ECE Club',
    fee: '₹250 (kit included)',
    registered: 55,
    capacity: 100,
    featured: false,
    status: 'Open',
    description:
      'Hands-on 3-day workshop on Arduino, Raspberry Pi, and smart devices. Industry mentors from top companies guide projects. Certificate of completion for all participants.',
  },
  {
    id: 4,
    title: 'JISSP Sports Championship',
    icon: '⚽',
    category: 'sports',
    badge: 'Sports',
    badgeClass: 'badge-sports',
    bg: 'linear-gradient(135deg, #f7971e, #ffd200)',
    datetime: '2025-09-25T07:00:00',
    displayDate: 'September 25–26, 2025',
    displayTime: '7:00 AM – 6:00 PM',
    venue: 'Sports Complex',
    organizer: 'Sports Board',
    fee: '₹50 / person',
    registered: 80,
    capacity: 200,
    featured: false,
    status: 'Open',
    description:
      '2-day inter-departmental sports meet: football, badminton, chess, and athletics. All years welcome. Top 3 teams win trophies and certificates. Register your squad today!',
  },
  {
    id: 5,
    title: 'Campus Green Drive',
    icon: '🌿',
    category: 'social',
    badge: 'Social',
    badgeClass: 'badge-social',
    bg: 'linear-gradient(135deg, #4776e6, #8e54e9)',
    datetime: '2025-10-01T08:00:00',
    displayDate: 'October 1, 2025',
    displayTime: '8:00 AM – 12:00 PM',
    venue: 'Campus Grounds',
    organizer: 'Eco Club',
    fee: 'Free',
    registered: 30,
    capacity: 100,
    featured: false,
    status: 'Open',
    description:
      'Tree plantation & campus cleanup event. Earn volunteer credits and make a real environmental impact. Breakfast and participation certificates provided to all volunteers.',
  },
  {
    id: 6,
    title: 'CyberSec CTF',
    icon: '🔐',
    category: 'tech',
    badge: 'Tech',
    badgeClass: 'badge-tech',
    bg: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
    datetime: '2025-10-05T14:00:00',
    displayDate: 'October 5, 2025',
    displayTime: '2:00 PM – 10:00 PM',
    venue: 'Computer Lab 3 & Online',
    organizer: 'CyberSec Club',
    fee: 'Free',
    registered: 60,
    capacity: 100,
    featured: false,
    status: 'Open',
    description:
      'Capture The Flag cybersecurity challenge. Solve puzzles across cryptography, forensics, web exploitation, and binary exploitation. Solo or team of 2. Winner gets ₹15,000.',
  },
];

// ──────────────────────────────────────────────
//  2. LOCALSTORAGE HELPERS
// ──────────────────────────────────────────────
const LS_KEY = 'jissp_registrations';

function getRegistrations() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveRegistration(event) {
  const regs = getRegistrations();
  if (regs.find((r) => r.id === event.id)) return false; // already registered
  regs.push({
    id: event.id,
    title: event.title,
    icon: event.icon,
    displayDate: event.displayDate,
    displayTime: event.displayTime,
    venue: event.venue,
    registeredAt: new Date().toISOString(),
  });
  localStorage.setItem(LS_KEY, JSON.stringify(regs));
  return true;
}

function removeRegistration(id) {
  const regs = getRegistrations().filter((r) => r.id !== id);
  localStorage.setItem(LS_KEY, JSON.stringify(regs));
}

function isRegistered(id) {
  return getRegistrations().some((r) => r.id === id);
}

// ──────────────────────────────────────────────
//  3. COUNTDOWN HELPERS
// ──────────────────────────────────────────────
function getTimeLeft(datetimeStr) {
  const target = new Date(datetimeStr).getTime();
  const now = Date.now();
  const diff = target - now;
  if (diff <= 0) return null; // event has passed / started
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

function pad(n) {
  return String(n).padStart(2, '0');
}

// ──────────────────────────────────────────────
//  4. CARD GENERATION
// ──────────────────────────────────────────────
function buildCard(ev) {
  const pct = Math.round((ev.registered / ev.capacity) * 100);
  const registered = isRegistered(ev.id);

  const article = document.createElement('article');
  article.className = 'event-card' + (ev.featured ? ' featured' : '');
  article.dataset.category = ev.category;
  article.dataset.id = ev.id;

  article.innerHTML = `
    ${ev.featured ? '<div class="featured-label">⭐ Featured</div>' : ''}
    <div class="card-badge ${ev.badgeClass}">${ev.badge}</div>
    <div class="card-image" style="background:${ev.bg};">
      <span class="card-icon">${ev.icon}</span>
    </div>
    <div class="card-body">
      <div class="card-meta">
        <span class="card-date">📅 ${ev.displayDate}</span>
      </div>
      <h3 class="card-title">${ev.title}</h3>
      <p class="card-desc">${ev.description}</p>

      <!-- Countdown Timer -->
      <div class="card-countdown" id="countdown-${ev.id}">
        <span class="cd-label">Starts in</span>
        <div class="cd-blocks">
          <span class="cd-unit"><b id="cd-d-${ev.id}">--</b><small>d</small></span>
          <span class="cd-colon">:</span>
          <span class="cd-unit"><b id="cd-h-${ev.id}">--</b><small>h</small></span>
          <span class="cd-colon">:</span>
          <span class="cd-unit"><b id="cd-m-${ev.id}">--</b><small>m</small></span>
          <span class="cd-colon">:</span>
          <span class="cd-unit"><b id="cd-s-${ev.id}">--</b><small>s</small></span>
        </div>
      </div>

      <div class="card-footer">
        <div class="card-spots">
          <span class="spots-bar"><span style="width:${pct}%"></span></span>
          <span class="spots-text">${ev.registered}/${ev.capacity} spots</span>
        </div>
        <button class="btn-register ${registered ? 'registered' : ''}"
                data-id="${ev.id}">
          ${registered ? '✓ Registered' : 'Register'}
        </button>
      </div>
    </div>
  `;

  // Register button click → open modal
  article.querySelector('.btn-register').addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(ev.id);
  });

  return article;
}

function renderCards(filterCategory = 'all') {
  const grid = document.getElementById('eventsGrid');
  grid.innerHTML = '';
  const filtered = filterCategory === 'all'
    ? EVENTS
    : EVENTS.filter((ev) => ev.category === filterCategory);

  filtered.forEach((ev, i) => {
    const card = buildCard(ev);
    card.style.animationDelay = `${i * 0.07}s`;
    grid.appendChild(card);
  });

  document.getElementById('eventCount').textContent =
    filtered.length + ' event' + (filtered.length !== 1 ? 's' : '');
}

// ──────────────────────────────────────────────
//  5. COUNTDOWN TICK  (runs every second)
// ──────────────────────────────────────────────
let countdownInterval = null;

function tickAllCountdowns() {
  EVENTS.forEach((ev) => {
    const dEl = document.getElementById(`cd-d-${ev.id}`);
    if (!dEl) return; // card not rendered (filtered out)
    const tl = getTimeLeft(ev.datetime);
    if (!tl) {
      document.getElementById(`countdown-${ev.id}`).innerHTML =
        '<span class="cd-label cd-live">🔴 Live / Ended</span>';
      return;
    }
    dEl.textContent = pad(tl.d);
    document.getElementById(`cd-h-${ev.id}`).textContent = pad(tl.h);
    document.getElementById(`cd-m-${ev.id}`).textContent = pad(tl.m);
    document.getElementById(`cd-s-${ev.id}`).textContent = pad(tl.s);
  });
}

function startCountdowns() {
  tickAllCountdowns();
  clearInterval(countdownInterval);
  countdownInterval = setInterval(tickAllCountdowns, 1000);
}

// ──────────────────────────────────────────────
//  6. MODAL
// ──────────────────────────────────────────────
let activeModalEventId = null;
let modalCountdownInterval = null;

function openModal(id) {
  const ev = EVENTS.find((e) => e.id === id);
  if (!ev) return;
  activeModalEventId = id;

  const overlay = document.getElementById('modalOverlay');
  document.getElementById('modalImage').style.background = ev.bg;
  document.getElementById('modalIcon').textContent = ev.icon;
  document.getElementById('modalBadge').textContent = ev.badge;
  document.getElementById('modalBadge').className = 'modal-badge ' + ev.badgeClass;
  document.getElementById('modalStatus').textContent = ev.status;
  document.getElementById('modalStatus').className =
    'modal-status ' + (ev.status === 'Open' ? 'status-open' : 'status-filling');
  document.getElementById('modalTitle').textContent = ev.title;
  document.getElementById('modalDesc').textContent = ev.description;
  document.getElementById('modalDate').textContent = ev.displayDate;
  document.getElementById('modalTime').textContent = ev.displayTime;
  document.getElementById('modalVenue').textContent = ev.venue;
  document.getElementById('modalOrg').textContent = ev.organizer;
  document.getElementById('modalFee').textContent = ev.fee;

  const pct = Math.round((ev.registered / ev.capacity) * 100);
  document.getElementById('modalSpotsText').textContent =
    `${ev.registered} / ${ev.capacity} registered (${pct}%)`;
  document.getElementById('modalSpotsBar').style.width = pct + '%';

  // Register button state
  const regBtn = document.getElementById('modalRegisterBtn');
  const already = isRegistered(id);
  regBtn.textContent = already ? '✓ Already Registered' : 'Register Now →';
  regBtn.classList.toggle('already-registered', already);

  // Modal countdown
  tickModalCountdown(ev.datetime);
  clearInterval(modalCountdownInterval);
  modalCountdownInterval = setInterval(() => tickModalCountdown(ev.datetime), 1000);

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function tickModalCountdown(datetimeStr) {
  const tl = getTimeLeft(datetimeStr);
  const cd = document.getElementById('modalCountdown');
  if (!tl) {
    cd.innerHTML = '<span class="mcd-live">🔴 This event is live or has ended</span>';
    return;
  }
  document.getElementById('mcdD').textContent = pad(tl.d);
  document.getElementById('mcdH').textContent = pad(tl.h);
  document.getElementById('mcdM').textContent = pad(tl.m);
  document.getElementById('mcdS').textContent = pad(tl.s);
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
  clearInterval(modalCountdownInterval);
  activeModalEventId = null;
}

// ──────────────────────────────────────────────
//  7. CONFIRMATION ALERT
// ──────────────────────────────────────────────
let pendingRegistrationId = null;

function showConfirmation(ev) {
  pendingRegistrationId = ev.id;

  document.getElementById('confirmTitle').textContent = `You're in, ${ev.title}!`;
  document.getElementById('confirmMsg').textContent =
    'Your registration has been saved locally. Here's a summary:';
  document.getElementById('confirmDetail').innerHTML = `
    <div class="cd-row"><span>📅</span><span>${ev.displayDate}</span></div>
    <div class="cd-row"><span>⏰</span><span>${ev.displayTime}</span></div>
    <div class="cd-row"><span>📍</span><span>${ev.venue}</span></div>
    <div class="cd-row"><span>💰</span><span>${ev.fee}</span></div>
    <div class="cd-row"><span>🕐</span><span>Saved at ${new Date().toLocaleTimeString()}</span></div>
  `;

  document.getElementById('confirmOverlay').classList.add('active');
}

function hideConfirmation() {
  document.getElementById('confirmOverlay').classList.remove('active');
  pendingRegistrationId = null;
}

// ──────────────────────────────────────────────
//  8. TOAST
// ──────────────────────────────────────────────
let toastTimeout = null;

function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show toast-' + type;
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    t.classList.remove('show');
  }, 3500);
}

// ──────────────────────────────────────────────
//  9. MY REGISTRATIONS PANEL
// ──────────────────────────────────────────────
function openPanel() {
  renderPanel();
  document.getElementById('panelOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePanel() {
  document.getElementById('panelOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

function renderPanel() {
  const body = document.getElementById('panelBody');
  const regs = getRegistrations();

  if (regs.length === 0) {
    body.innerHTML = `
      <div class="panel-empty">
        <span>📭</span>
        <p>No registrations yet.<br/>Browse events and register!</p>
      </div>`;
    return;
  }

  body.innerHTML = regs
    .map(
      (r) => `
    <div class="panel-item" data-id="${r.id}">
      <div class="panel-item-icon">${r.icon}</div>
      <div class="panel-item-info">
        <strong>${r.title}</strong>
        <span>${r.displayDate}</span>
        <span>${r.venue}</span>
        <span class="panel-item-ts">Registered: ${new Date(r.registeredAt).toLocaleString()}</span>
      </div>
      <button class="panel-item-remove" data-id="${r.id}" title="Cancel registration">✕</button>
    </div>`
    )
    .join('');

  body.querySelectorAll('.panel-item-remove').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      removeRegistration(id);
      renderPanel();
      updateRegBadge();
      refreshCardButton(id);
      showToast('Registration cancelled.', 'warning');
    });
  });
}

function updateRegBadge() {
  const count = getRegistrations().length;
  const badge = document.getElementById('regBadge');
  badge.textContent = count;
  badge.classList.toggle('has-regs', count > 0);
}

// Refresh a single card's register button state without full re-render
function refreshCardButton(id) {
  const card = document.querySelector(`.event-card[data-id="${id}"]`);
  if (!card) return;
  const btn = card.querySelector('.btn-register');
  const already = isRegistered(id);
  btn.textContent = already ? '✓ Registered' : 'Register';
  btn.classList.toggle('registered', already);
}

// ──────────────────────────────────────────────
//  10. ANIMATED COUNTER (hero stats)
// ──────────────────────────────────────────────
function animateCount(el, target, suffix = '') {
  let start = 0;
  const duration = 1400;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = start.toLocaleString() + suffix;
    if (start >= target) clearInterval(timer);
  }, 16);
}

// ──────────────────────────────────────────────
//  11. FILTER
// ──────────────────────────────────────────────
let activeFilter = 'all';

function setupFilters() {
  document.getElementById('filterBar').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderCards(activeFilter);
    startCountdowns();
  });
}

// ──────────────────────────────────────────────
//  12. HAMBURGER
// ──────────────────────────────────────────────
function setupHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });
}

// ──────────────────────────────────────────────
//  13. EVENT LISTENERS
// ──────────────────────────────────────────────
function setupListeners() {
  // Modal close
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  });

  // Modal register button
  document.getElementById('modalRegisterBtn').addEventListener('click', () => {
    if (activeModalEventId === null) return;
    const ev = EVENTS.find((e) => e.id === activeModalEventId);
    if (isRegistered(ev.id)) {
      showToast('You already registered for this event!', 'warning');
      return;
    }
    const saved = saveRegistration(ev);
    if (saved) {
      closeModal();
      showConfirmation(ev);
      updateRegBadge();
      refreshCardButton(ev.id);
    }
  });

  // Confirmation OK
  document.getElementById('confirmOk').addEventListener('click', () => {
    hideConfirmation();
    showToast('🎉 Registration confirmed & saved!', 'success');
  });

  // Confirmation UNDO
  document.getElementById('confirmCancel').addEventListener('click', () => {
    if (pendingRegistrationId !== null) {
      removeRegistration(pendingRegistrationId);
      refreshCardButton(pendingRegistrationId);
      updateRegBadge();
    }
    hideConfirmation();
    showToast('Registration removed.', 'warning');
  });

  // Panel open/close
  document.getElementById('myRegistrationsBtn').addEventListener('click', openPanel);
  document.getElementById('panelClose').addEventListener('click', closePanel);
  document.getElementById('panelOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('panelOverlay')) closePanel();
  });

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closePanel();
      hideConfirmation();
    }
  });
}

// ──────────────────────────────────────────────
//  14. INIT
// ──────────────────────────────────────────────
function init() {
  renderCards();
  startCountdowns();
  setupFilters();
  setupHamburger();
  setupListeners();
  updateRegBadge();

  // Animated hero stats
  animateCount(document.getElementById('statEvents'), 48);
  animateCount(document.getElementById('statStudents'), 12000, '');
  animateCount(document.getElementById('statClubs'), 32);

  // Shorten 12000 → 12K after animation
  setTimeout(() => {
    document.getElementById('statStudents').textContent = '12K';
  }, 1500);
}

document.addEventListener('DOMContentLoaded', init);
