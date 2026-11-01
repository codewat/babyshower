/**
 * BABY SHOWER CELEBRATION APP
 * Interactive Logic, Modal System, LocalStorage persistence, RSVP, Polls, Registry, & Admin
 */

// Local Storage Keys
const STORAGE_KEYS = {
  CURRENT_THEME: 'baby_shower_theme',
  RSVPS: 'baby_shower_rsvps',
  REGISTRY_CLAIMS: 'baby_shower_registry_claims',
  WISHES: 'baby_shower_wishes',
  RESEMBLANCE_VOTES: 'baby_shower_resemblance_votes',
  NAME_GUESSES: 'baby_shower_name_guesses'
};

// Confetti Animation Controller
function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const count = 90;
  const colors = ['#5585b5', '#a4c5e8', '#dfba73', '#fbf8f2', '#788f69', '#d66ba0'];

  for (let i = 0; i < count; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 3 + 2,
      speedX: Math.random() * 2 - 1,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 6 - 3
    });
  }

  let animationFrame;
  let startTime = Date.now();

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      ctx.restore();
    });

    if (Date.now() - startTime < 4500) {
      animationFrame = requestAnimationFrame(update);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  update();
}

// Storage Helpers
function getStorage(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('LocalStorage read error', e);
    return defaultValue;
  }
}

function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('LocalStorage write error', e);
  }
}

// App Controller with readyState check & task isolation
function initApp() {
  const tasks = [
    ['Theme', initTheme],
    ['Hero & Details', renderHeroAndDetails],
    ['Countdown', initCountdown],
    ['Palette', renderPalette],
    ['Schedule', renderSchedule],
    ['Amazon Banner', renderAmazonRegistryBanner],
    ['Cash Fund', renderCashFund],
    ['Registry', initRegistry],
    ['RSVP Form', initRSVPForm],
    ['Wishes', initWishes],
    ['Resemblance Poll', initResemblancePoll],
    ['Name Guess Game', initNameGuessGame],
    ['Admin Dashboard', initAdminDashboard],
    ['Modals', initModals]
  ];

  tasks.forEach(([name, fn]) => {
    try {
      fn();
    } catch (err) {
      console.error(`Init error in "${name}":`, err);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  // If script executes after DOM is already parsed / interactive
  initApp();
}

// 1. Theme Initializer (Defaults to 'boy' theme)
function initTheme() {
  const savedTheme = getStorage(STORAGE_KEYS.CURRENT_THEME, 'boy');
  applyTheme(savedTheme);

  document.querySelectorAll('[data-theme-choice]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const theme = e.currentTarget.getAttribute('data-theme-choice');
      applyTheme(theme);
      setStorage(STORAGE_KEYS.CURRENT_THEME, theme);
    });
  });
}

function applyTheme(themeName) {
  document.body.classList.remove('theme-boy', 'theme-sage', 'theme-honey', 'theme-girl');
  document.body.classList.add(`theme-${themeName}`);

  // Highlight active theme buttons
  document.querySelectorAll('[data-theme-choice]').forEach(btn => {
    const active = btn.getAttribute('data-theme-choice') === themeName;
    btn.classList.toggle('ring-2', active);
    btn.classList.toggle('ring-offset-2', active);
    btn.classList.toggle('ring-stone-600', active);
  });
}

// 2. Render Hero & Details from EVENT_CONFIG
function renderHeroAndDetails() {
  const elements = {
    'baby-subtitle': EVENT_CONFIG.babySubtitle,
    'baby-name-title': EVENT_CONFIG.babyName,
    'parents-names': EVENT_CONFIG.parentsNames,
    'event-date-text': EVENT_CONFIG.displayDate,
    'event-time-text': EVENT_CONFIG.displayTime,
    'venue-name-text': `${EVENT_CONFIG.venueName}, ${EVENT_CONFIG.venueAddress}`,
    'venue-name-text-modal': EVENT_CONFIG.venueName,
    'venue-address-text': EVENT_CONFIG.venueAddress,
    'dress-code-title': EVENT_CONFIG.dressCodeTitle,
    'dress-code-desc': EVENT_CONFIG.dressCodeDescription
  };

  for (const [id, value] of Object.entries(elements)) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  // Hero Amazon Link
  const heroAmazonBtn = document.getElementById('hero-amazon-btn');
  if (heroAmazonBtn) {
    heroAmazonBtn.href = EVENT_CONFIG.amazonRegistryUrl;
  }

  // Google Map Links
  const mapLink = document.getElementById('google-map-btn');
  if (mapLink) {
    mapLink.href = EVENT_CONFIG.googleMapsUrl;
  }
  const headerMapLink = document.getElementById('header-map-link');
  if (headerMapLink) {
    headerMapLink.href = EVENT_CONFIG.googleMapsUrl;
  }
  const modalAddressLink = document.getElementById('modal-address-link');
  if (modalAddressLink) {
    modalAddressLink.href = EVENT_CONFIG.googleMapsUrl;
  }

  // Calendar Links
  const gcalBtn = document.getElementById('add-to-gcal-btn');
  if (gcalBtn) {
    const startIso = EVENT_CONFIG.eventDate.replace(/[-:]/g, '');
    const title = encodeURIComponent(`Baby Shower: ${EVENT_CONFIG.parentsNames}`);
    const details = encodeURIComponent(`Join us in celebrating the upcoming arrival of Baby Boy! View registry: ${EVENT_CONFIG.amazonRegistryUrl}`);
    const location = encodeURIComponent(`${EVENT_CONFIG.venueName}, ${EVENT_CONFIG.venueAddress}`);
    gcalBtn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${startIso}&details=${details}&location=${location}`;
  }

  const icsBtn = document.getElementById('download-ics-btn');
  if (icsBtn) {
    icsBtn.addEventListener('click', downloadIcsFile);
  }
}

function downloadIcsFile() {
  const dateFormatted = EVENT_CONFIG.eventDate.replace(/[-:]/g, '');
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Baby Shower Website//EN
BEGIN:VEVENT
SUMMARY:Baby Shower: Onin & Charlene
DESCRIPTION:Join us in celebrating with ${EVENT_CONFIG.parentsNames}! Amazon Registry: ${EVENT_CONFIG.amazonRegistryUrl}
LOCATION:${EVENT_CONFIG.venueName}, ${EVENT_CONFIG.venueAddress}
DTSTART:${dateFormatted}
DTEND:${dateFormatted}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `baby-shower-onin-charlene.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 3. Countdown Timer
function initCountdown() {
  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minutesEl = document.getElementById('count-minutes');
  const secondsEl = document.getElementById('count-seconds');
  const countdownBanner = document.getElementById('countdown-message');
  const cubeDaysEl = document.getElementById('cube-countdown-days');

  function update() {
    const target = new Date(EVENT_CONFIG.eventDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      if (countdownBanner) countdownBanner.textContent = "Today is the Big Day! 🎉 Welcome to Baby Boy's Shower!";
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";
      if (cubeDaysEl) cubeDaysEl.textContent = "0";
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    if (cubeDaysEl) cubeDaysEl.textContent = String(days);
  }

  update();
  setInterval(update, 1000);
}

// 4. Palette Color Swatches
function renderPalette() {
  const container = document.getElementById('palette-container');
  if (!container) return;

  container.innerHTML = EVENT_CONFIG.palette.map(color => `
    <div class="flex flex-col items-center group">
      <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-md transition-transform duration-300 group-hover:scale-110 border-2 border-white/80" style="background-color: ${color.hex}"></div>
      <span class="text-[10px] sm:text-[11px] font-medium text-stone-600 mt-1.5 text-center">${color.name}</span>
    </div>
  `).join('');
}

// 5. Program Schedule
function renderSchedule() {
  const list = document.getElementById('schedule-list');
  if (!list) return;

  list.innerHTML = EVENT_CONFIG.schedule.map((item) => `
    <div class="relative pl-6 pb-6 last:pb-0 border-l-2 border-primary/30">
      <div class="absolute -left-[7px] top-0 w-3.5 h-3.5 rounded-full bg-primary border-2 border-white shadow"></div>
      <div class="bg-white rounded-2xl p-3.5 shadow-sm border border-stone-100 transition hover:shadow-md">
        <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/15 text-primary mb-1">
          ${item.time}
        </span>
        <h4 class="text-sm sm:text-base font-bold text-stone-800">${item.title}</h4>
        <p class="text-xs sm:text-sm text-stone-600 mt-0.5">${item.description}</p>
      </div>
    </div>
  `).join('');
}

// 6. Amazon Registry Banner
function renderAmazonRegistryBanner() {
  const container = document.getElementById('amazon-registry-card');
  if (!container) return;

  container.innerHTML = `
    <div class="bg-gradient-to-r from-sky-50 via-white to-amber-50/50 rounded-3xl p-6 sm:p-8 border-2 border-sky-200/80 shadow-md relative overflow-hidden">
      <div class="absolute -right-8 -bottom-8 opacity-10 text-8xl pointer-events-none">📦</div>
      
      <div class="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div class="text-center md:text-left max-w-xl">
          <div class="inline-flex items-center gap-1.5 bg-[#ff9900]/15 text-[#d47800] px-3 py-1 rounded-full text-xs font-bold mb-2.5 border border-[#ff9900]/30">
            <span>📦</span>
            <span>Official Amazon Baby Registry</span>
          </div>
          <h3 class="text-xl sm:text-2xl font-serif font-bold text-stone-800">
            Our Gift Registry is on Amazon 🛍️
          </h3>
          <p class="text-stone-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
            ${EVENT_CONFIG.amazonRegistryNote}
          </p>
          <div class="flex flex-wrap items-center gap-3 mt-3 text-xs text-stone-500 justify-center md:justify-start">
            <span class="flex items-center gap-1">✓ Direct shipping</span>
            <span class="flex items-center gap-1">✓ Automatic gift tracking</span>
            <span class="flex items-center gap-1">✓ Easy international ordering</span>
          </div>
        </div>

        <div class="w-full md:w-auto text-center flex-shrink-0">
          <a
            href="${EVENT_CONFIG.amazonRegistryUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#ff9900] hover:bg-[#e68a00] text-stone-900 font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5">
            <span>Open Amazon Registry</span>
            <span class="text-base">↗</span>
          </a>
          <p class="text-[11px] text-stone-400 mt-1.5">Click to browse and order directly on Amazon</p>
        </div>
      </div>
    </div>
  `;
}

// 7. Cash / Diaper Fund Section
function renderCashFund() {
  const fundBox = document.getElementById('cash-fund-details');
  if (!fundBox) return;

  const f = EVENT_CONFIG.cashFund;
  fundBox.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div class="bg-emerald-50/70 border border-emerald-200/60 rounded-2xl p-4 text-center">
        <div class="w-9 h-9 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs mb-1.5">G</div>
        <h4 class="font-bold text-stone-800 text-sm">GCash / Remit</h4>
        <p class="text-xs text-stone-500">${f.gcash.accountName}</p>
        <div class="mt-2.5 bg-white px-2.5 py-1.5 rounded-lg border border-emerald-200 font-mono text-xs font-bold text-emerald-800 tracking-wider flex items-center justify-between">
          <span class="text-[11px]">${f.gcash.accountNumber}</span>
          <button onclick="copyToClipboard('${f.gcash.accountNumber}')" class="text-xs hover:text-emerald-950 font-sans ml-2 text-emerald-600 font-bold">Copy</button>
        </div>
      </div>

      <div class="bg-sky-50/70 border border-sky-200/60 rounded-2xl p-4 text-center">
        <div class="w-9 h-9 mx-auto rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs mb-1.5">M</div>
        <h4 class="font-bold text-stone-800 text-sm">Maya / Remit</h4>
        <p class="text-xs text-stone-500">${f.maya.accountName}</p>
        <div class="mt-2.5 bg-white px-2.5 py-1.5 rounded-lg border border-sky-200 font-mono text-xs font-bold text-sky-800 tracking-wider flex items-center justify-between">
          <span class="text-[11px]">${f.maya.accountNumber}</span>
          <button onclick="copyToClipboard('${f.maya.accountNumber}')" class="text-xs hover:text-sky-950 font-sans ml-2 text-sky-600 font-bold">Copy</button>
        </div>
      </div>

      <div class="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-4 text-center">
        <div class="w-9 h-9 mx-auto rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs mb-1.5">🏦</div>
        <h4 class="font-bold text-stone-800 text-sm">${f.bank.bankName}</h4>
        <p class="text-xs text-stone-500">${f.bank.accountName}</p>
        <div class="mt-2.5 bg-white px-2.5 py-1.5 rounded-lg border border-amber-200 font-mono text-xs font-bold text-amber-800 tracking-wider flex items-center justify-between">
          <span class="text-[11px]">${f.bank.accountNumber}</span>
          <button onclick="copyToClipboard('${f.bank.accountNumber}')" class="text-xs hover:text-amber-950 font-sans ml-2 text-amber-600 font-bold">Copy</button>
        </div>
      </div>
    </div>
  `;
}

window.copyToClipboard = function(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied to clipboard: ' + text);
  }).catch(() => {
    alert('Copied: ' + text);
  });
};

// 8. Registry Implementation
let currentCategory = 'all';

function initRegistry() {
  renderRegistryFilterButtons();
  renderRegistryItems();

  const searchInput = document.getElementById('registry-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderRegistryItems();
    });
  }

  // Claim Modal events
  const modalCloseBtn = document.getElementById('claim-modal-close');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeClaimModal);
  }

  const claimForm = document.getElementById('claim-form');
  if (claimForm) {
    claimForm.addEventListener('submit', handleClaimSubmit);
  }
}

function renderRegistryFilterButtons() {
  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'nursery', label: 'Crib & Nursery' },
    { id: 'feeding', label: 'Feeding' },
    { id: 'diapering', label: 'Diapers & Bath' },
    { id: 'travel', label: 'Carrier & Travel' },
    { id: 'toys', label: 'Sensory & Play' }
  ];

  const bar = document.getElementById('registry-categories');
  if (!bar) return;

  bar.innerHTML = categories.map(cat => `
    <button
      class="px-3.5 py-1.5 rounded-full text-xs font-medium transition whitespace-nowrap ${
        cat.id === currentCategory
          ? 'bg-primary text-white shadow-sm'
          : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
      }"
      onclick="setRegistryCategory('${cat.id}')">
      ${cat.label}
    </button>
  `).join('');
}

window.setRegistryCategory = function(catId) {
  currentCategory = catId;
  renderRegistryFilterButtons();
  renderRegistryItems();
};

function renderRegistryItems() {
  const grid = document.getElementById('registry-grid');
  if (!grid) return;

  const searchQuery = (document.getElementById('registry-search')?.value || '').toLowerCase();
  const claims = getStorage(STORAGE_KEYS.REGISTRY_CLAIMS, {});

  const filtered = EVENT_CONFIG.registryItems.filter(item => {
    const matchCategory = currentCategory === 'all' || item.category === currentCategory;
    const matchSearch = item.name.toLowerCase().includes(searchQuery) || item.notes.toLowerCase().includes(searchQuery);
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-8 text-center bg-white/60 rounded-2xl border border-dashed border-stone-300">
        <p class="text-2xl mb-1">🎁</p>
        <p class="text-stone-500 text-xs font-medium">No registry items found in this category.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const claim = claims[item.id];
    const isClaimed = Boolean(claim);
    const itemUrl = item.storeLink || EVENT_CONFIG.amazonRegistryUrl;

    return `
      <div class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-stone-200/80 flex flex-col group ${isClaimed ? 'opacity-90' : ''}">
        <div class="relative h-40 overflow-hidden bg-stone-100">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
          <div class="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-stone-700 shadow-sm flex items-center gap-1">
            <span>📦 Amazon</span>
          </div>
          ${
            isClaimed
              ? `<div class="absolute top-2.5 right-2.5 bg-amber-500 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-md">
                   ✓ Reserved
                 </div>`
              : `<div class="absolute top-2.5 right-2.5 bg-emerald-500 text-white px-2.5 py-0.5 rounded-full text-[10px] font-semibold shadow-md">
                   Wishlist
                 </div>`
          }
        </div>

        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-[11px] text-stone-500 mb-1">
              <span class="capitalize tracking-wider uppercase font-semibold text-stone-400 text-[10px]">${item.category}</span>
              <span class="text-amber-700 font-medium font-mono text-[10px]">Amazon</span>
            </div>
            <h4 class="font-bold text-stone-800 text-sm leading-snug mb-1">${item.name}</h4>
            <p class="text-xs text-stone-500 line-clamp-2 mb-3">${item.notes}</p>
          </div>

          <div class="pt-2.5 border-t border-stone-100">
            ${
              isClaimed
                ? `
                  <div class="bg-amber-50 rounded-xl p-2 text-xs text-amber-900 mb-2 border border-amber-200/60 flex items-center justify-between">
                    <div>
                      <span class="font-bold">Reserved by:</span> ${claim.claimerName}
                    </div>
                    <button onclick="unclaimItem('${item.id}')" class="text-stone-400 hover:text-red-500 font-semibold underline text-[11px] ml-1">
                      Cancel
                    </button>
                  </div>
                  <a href="${itemUrl}" target="_blank" rel="noopener noreferrer" class="w-full inline-flex items-center justify-center gap-1 text-xs text-stone-600 hover:text-stone-900 font-medium py-1">
                    View on Amazon ↗
                  </a>
                `
                : `
                  <div class="flex gap-2">
                    <button
                      onclick="openClaimModal('${item.id}')"
                      class="flex-1 bg-primary hover:bg-primary-dark text-white text-xs font-bold py-2 px-2.5 rounded-xl transition shadow-sm hover:shadow flex items-center justify-center gap-1">
                      <span>Reserve 🎁</span>
                    </button>
                    <a
                      href="${itemUrl}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="px-2.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold flex items-center justify-center gap-1"
                      title="Buy on Amazon">
                      <span>Amazon ↗</span>
                    </a>
                  </div>
                `
            }
          </div>
        </div>
      </div>
    `;
  }).join('');
}

let activeClaimItemId = null;

window.openClaimModal = function(itemId) {
  const item = EVENT_CONFIG.registryItems.find(i => i.id === itemId);
  if (!item) return;

  activeClaimItemId = itemId;
  const modal = document.getElementById('claim-modal');
  const modalItemTitle = document.getElementById('modal-item-title');
  const modalItemDesc = document.getElementById('modal-item-desc');
  const modalItemStore = document.getElementById('modal-item-store');

  if (modalItemTitle) modalItemTitle.textContent = item.name;
  if (modalItemDesc) modalItemDesc.textContent = `${item.notes}`;
  if (modalItemStore) {
    modalItemStore.href = item.storeLink || EVENT_CONFIG.amazonRegistryUrl;
    modalItemStore.textContent = `Buy on Amazon ↗`;
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

function closeClaimModal() {
  const modal = document.getElementById('claim-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
  activeClaimItemId = null;
}

function handleClaimSubmit(e) {
  e.preventDefault();
  if (!activeClaimItemId) return;

  const claimerName = document.getElementById('claim-name')?.value.trim();
  const claimerNote = document.getElementById('claim-note')?.value.trim();

  if (!claimerName) {
    alert('Please enter your name.');
    return;
  }

  const claims = getStorage(STORAGE_KEYS.REGISTRY_CLAIMS, {});
  claims[activeClaimItemId] = {
    claimerName,
    claimerNote,
    claimedAt: new Date().toISOString()
  };

  setStorage(STORAGE_KEYS.REGISTRY_CLAIMS, claims);
  closeClaimModal();
  renderRegistryItems();
  triggerConfetti();
  showToast(`Thank you so much, ${claimerName}! This gift has been reserved.`);

  document.getElementById('claim-name').value = '';
  document.getElementById('claim-note').value = '';

  updateAdminStats();
}

window.unclaimItem = function(itemId) {
  if (!confirm('Are you sure you want to release this gift reservation so others can purchase it?')) return;
  const claims = getStorage(STORAGE_KEYS.REGISTRY_CLAIMS, {});
  delete claims[itemId];
  setStorage(STORAGE_KEYS.REGISTRY_CLAIMS, claims);
  renderRegistryItems();
  showToast('Registry item updated.');
  updateAdminStats();
};

// 9. RSVP Form Handling
function initRSVPForm() {
  const form = document.getElementById('rsvp-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('rsvp-name').value.trim();
    const contact = document.getElementById('rsvp-contact').value.trim();
    const attendance = document.querySelector('input[name="attending"]:checked')?.value || 'yes';
    const companions = parseInt(document.getElementById('rsvp-companions').value || '0', 10);
    const dietary = document.getElementById('rsvp-dietary').value.trim();
    const message = document.getElementById('rsvp-message').value.trim();

    if (!name) {
      alert('Please enter your full name.');
      return;
    }

    const newRsvp = {
      id: 'rsvp-' + Date.now(),
      name,
      contact,
      attendance,
      companions,
      totalCount: attendance === 'yes' ? 1 + companions : 0,
      dietary,
      message,
      submittedAt: new Date().toISOString()
    };

    const rsvps = getStorage(STORAGE_KEYS.RSVPS, []);
    rsvps.unshift(newRsvp);
    setStorage(STORAGE_KEYS.RSVPS, rsvps);

    // If guest left a sweet message, post it directly to wishes guestbook!
    if (message) {
      const wishes = getStorage(STORAGE_KEYS.WISHES, EVENT_CONFIG.initialWishes);
      wishes.unshift({
        name,
        relationship: attendance === 'yes' ? 'Attending Guest' : 'Sending Love from Afar',
        message,
        date: new Date().toISOString().split('T')[0]
      });
      setStorage(STORAGE_KEYS.WISHES, wishes);
      renderWishes();
    }

    triggerConfetti();
    showRsvpSuccessModal(newRsvp);
    form.reset();
    updateAdminStats();
  });
}

function showRsvpSuccessModal(rsvp) {
  closeModal('modal-rsvp');
  const modal = document.getElementById('rsvp-success-modal');
  const details = document.getElementById('rsvp-success-details');
  if (!modal || !details) return;

  const isYes = rsvp.attendance === 'yes';

  details.innerHTML = `
    <div class="text-center py-4">
      <div class="w-16 h-16 mx-auto rounded-full ${isYes ? 'bg-sky-100 text-sky-600' : 'bg-stone-100 text-stone-500'} flex items-center justify-center text-3xl mb-3">
        ${isYes ? '🎉' : '💌'}
      </div>
      <h3 class="text-xl font-bold text-stone-800">${isYes ? "We Can't Wait to Celebrate!" : 'Thank You for Letting Us Know!'}</h3>
      <p class="text-sm text-stone-600 mt-2">
        ${
          isYes
            ? `Thank you so much, <strong>${rsvp.name}</strong>! Onin and Charlene have noted your attendance with <strong>${rsvp.companions}</strong> guest(s).`
            : `Thank you, <strong>${rsvp.name}</strong>, for sending your warmest blessings to Onin & Charlene!`
        }
      </p>
      <div class="mt-4 p-3 bg-stone-50 rounded-2xl text-xs text-stone-500 text-left space-y-1">
        <p><strong>Date:</strong> ${EVENT_CONFIG.displayDate} (${EVENT_CONFIG.displayTime})</p>
        <p><strong>Location:</strong> <a href="${EVENT_CONFIG.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-semibold" title="Open in Google Maps">${EVENT_CONFIG.venueName}, ${EVENT_CONFIG.venueAddress} ↗</a></p>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.classList.add('modal-open');

  const closeBtn = document.getElementById('rsvp-success-close');
  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.classList.remove('modal-open');
    };
  }
}

// 10. Wishes / Guestbook
function initWishes() {
  renderWishes();

  const wishForm = document.getElementById('direct-wish-form');
  if (wishForm) {
    wishForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('wish-name')?.value.trim();
      const rel = document.getElementById('wish-relationship')?.value.trim() || 'Friend';
      const msg = document.getElementById('wish-message')?.value.trim();

      if (!name || !msg) {
        alert('Please enter your name and message.');
        return;
      }

      const wishes = getStorage(STORAGE_KEYS.WISHES, EVENT_CONFIG.initialWishes);
      wishes.unshift({
        name,
        relationship: rel,
        message: msg,
        date: new Date().toISOString().split('T')[0]
      });

      setStorage(STORAGE_KEYS.WISHES, wishes);
      renderWishes();
      wishForm.reset();
      triggerConfetti();
      showToast('Thank you so much for your sweet message!');
    });
  }
}

function renderWishes() {
  const container = document.getElementById('wishes-container');
  if (!container) return;

  const wishes = getStorage(STORAGE_KEYS.WISHES, EVENT_CONFIG.initialWishes);

  if (wishes.length === 0) {
    container.innerHTML = `<p class="text-center text-stone-400 py-6 text-xs">Be the first to leave a message for Onin, Charlene, and Baby Boy! ✨</p>`;
    return;
  }

  container.innerHTML = wishes.map(w => `
    <div class="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div class="flex items-center gap-2.5 mb-2">
          <div class="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
            ${w.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h5 class="font-bold text-stone-800 text-xs leading-tight">${w.name}</h5>
            <span class="text-[10px] text-stone-400">${w.relationship || 'Friend'}</span>
          </div>
        </div>
        <p class="text-xs text-stone-700 italic leading-relaxed">"${w.message}"</p>
      </div>
      <div class="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400">
        <span>${w.date || 'Recently'}</span>
        <span class="text-sky-400">💙</span>
      </div>
    </div>
  `).join('');
}

// 11. Resemblance Poll ("Who Will Baby Boy Look Like?")
function initResemblancePoll() {
  renderResemblancePoll();

  const voteDaddyBtn = document.getElementById('vote-daddy-btn');
  const voteMommyBtn = document.getElementById('vote-mommy-btn');

  if (voteDaddyBtn) {
    voteDaddyBtn.addEventListener('click', () => submitResemblanceVote('daddy'));
  }
  if (voteMommyBtn) {
    voteMommyBtn.addEventListener('click', () => submitResemblanceVote('mommy'));
  }
}

function renderResemblancePoll() {
  const votes = getStorage(STORAGE_KEYS.RESEMBLANCE_VOTES, { daddy: 18, mommy: 22 });
  const total = votes.daddy + votes.mommy;
  const daddyPct = total === 0 ? 50 : Math.round((votes.daddy / total) * 100);
  const mommyPct = total === 0 ? 50 : Math.round((votes.mommy / total) * 100);

  const daddyCountEl = document.getElementById('daddy-vote-count');
  const mommyCountEl = document.getElementById('mommy-vote-count');
  const daddyBarEl = document.getElementById('daddy-vote-bar');
  const mommyBarEl = document.getElementById('mommy-vote-bar');

  if (daddyCountEl) daddyCountEl.textContent = `Team Daddy Onin: ${votes.daddy} (${daddyPct}%)`;
  if (mommyCountEl) mommyCountEl.textContent = `Team Mommy Charlene: ${votes.mommy} (${mommyPct}%)`;
  if (daddyBarEl) daddyBarEl.style.width = `${daddyPct}%`;
  if (mommyBarEl) mommyBarEl.style.width = `${mommyPct}%`;
}

function submitResemblanceVote(choice) {
  const votes = getStorage(STORAGE_KEYS.RESEMBLANCE_VOTES, { daddy: 18, mommy: 22 });
  votes[choice] = (votes[choice] || 0) + 1;
  setStorage(STORAGE_KEYS.RESEMBLANCE_VOTES, votes);
  renderResemblancePoll();
  triggerConfetti();
  showToast(`Thank you for your vote for Team ${choice === 'daddy' ? 'Daddy Onin 👨💙' : 'Mommy Charlene 👩💖'}!`);
}

// 12. Name Guess Game ("Guess Baby Boy's Name!")
function initNameGuessGame() {
  renderNameGuesses();

  const form = document.getElementById('name-guess-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const guesser = document.getElementById('guess-guesser-name')?.value.trim();
      const nameGuess = document.getElementById('guess-baby-name')?.value.trim();

      if (!guesser || !nameGuess) {
        alert('Please enter your name and your baby name prediction.');
        return;
      }

      const guesses = getStorage(STORAGE_KEYS.NAME_GUESSES, EVENT_CONFIG.initialNameGuesses);
      guesses.unshift({
        guesser,
        nameGuess,
        date: new Date().toISOString().split('T')[0]
      });

      setStorage(STORAGE_KEYS.NAME_GUESSES, guesses);
      renderNameGuesses();
      form.reset();
      triggerConfetti();
      showToast(`Awesome! Your guess "${nameGuess}" has been submitted! ✨`);
    });
  }
}

function renderNameGuesses() {
  const container = document.getElementById('name-guesses-list');
  if (!container) return;

  const guesses = getStorage(STORAGE_KEYS.NAME_GUESSES, EVENT_CONFIG.initialNameGuesses);

  if (guesses.length === 0) {
    container.innerHTML = `<span class="text-xs text-stone-400">No guesses yet. Be the first to guess!</span>`;
    return;
  }

  container.innerHTML = guesses.map(g => `
    <div class="inline-flex items-center gap-1.5 bg-white border border-sky-200/80 rounded-full px-3 py-1 shadow-sm text-xs transition hover:scale-105">
      <span class="font-bold text-sky-800">"${g.nameGuess}"</span>
      <span class="text-stone-400 text-[10px]">— ${g.guesser}</span>
    </div>
  `).join('');
}

// 13. Admin / Organizer Dashboard
function initAdminDashboard() {
  const toggleBtn = document.getElementById('toggle-admin-btn');
  const closeBtn = document.getElementById('close-admin-btn');
  const panel = document.getElementById('admin-panel');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      openModal('admin-panel');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeModal('admin-panel');
    });
  }

  const exportBtn = document.getElementById('export-csv-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportRsvpsToCSV);
  }

  const clearDataBtn = document.getElementById('clear-sample-data-btn');
  if (clearDataBtn) {
    clearDataBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all RSVPs, claimed gifts, and name guesses?')) {
        localStorage.removeItem(STORAGE_KEYS.RSVPS);
        localStorage.removeItem(STORAGE_KEYS.REGISTRY_CLAIMS);
        localStorage.removeItem(STORAGE_KEYS.WISHES);
        localStorage.removeItem(STORAGE_KEYS.RESEMBLANCE_VOTES);
        localStorage.removeItem(STORAGE_KEYS.NAME_GUESSES);
        location.reload();
      }
    });
  }

  updateAdminStats();
}

function updateAdminStats() {
  const rsvps = getStorage(STORAGE_KEYS.RSVPS, []);
  const claims = getStorage(STORAGE_KEYS.REGISTRY_CLAIMS, {});

  const totalResponses = rsvps.length;
  const attendingRsvps = rsvps.filter(r => r.attendance === 'yes');
  const totalHeadcount = attendingRsvps.reduce((acc, cur) => acc + (cur.totalCount || 1), 0);
  const declinedCount = rsvps.filter(r => r.attendance === 'no').length;
  const claimedGiftsCount = Object.keys(claims).length;

  const statResponses = document.getElementById('admin-stat-responses');
  const statHeadcount = document.getElementById('admin-stat-headcount');
  const statDeclined = document.getElementById('admin-stat-declined');
  const statClaimed = document.getElementById('admin-stat-claimed');

  if (statResponses) statResponses.textContent = totalResponses;
  if (statHeadcount) statHeadcount.textContent = totalHeadcount;
  if (statDeclined) statDeclined.textContent = declinedCount;
  if (statClaimed) statClaimed.textContent = `${claimedGiftsCount} / ${EVENT_CONFIG.registryItems.length}`;

  const tbody = document.getElementById('admin-rsvp-table-body');
  if (!tbody) return;

  if (rsvps.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-stone-400 text-xs">No RSVPs submitted yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = rsvps.map(r => `
    <tr class="border-b border-stone-100 hover:bg-stone-50/60">
      <td class="py-2.5 px-3 font-semibold text-stone-800 text-xs">${r.name}</td>
      <td class="py-2.5 px-3 text-stone-600 text-xs">${r.contact || 'N/A'}</td>
      <td class="py-2.5 px-3">
        ${
          r.attendance === 'yes'
            ? `<span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Attending</span>`
            : `<span class="bg-stone-200 text-stone-600 text-[10px] font-medium px-2 py-0.5 rounded-full">Declined</span>`
        }
      </td>
      <td class="py-2.5 px-3 text-center text-xs font-bold text-stone-700">${r.attendance === 'yes' ? r.totalCount : 0}</td>
      <td class="py-2.5 px-3 text-xs text-stone-500 max-w-xs truncate">${r.dietary || 'None'}</td>
      <td class="py-2.5 px-3 text-xs text-stone-500 max-w-xs truncate">${r.message || '-'}</td>
    </tr>
  `).join('');
}

function exportRsvpsToCSV() {
  const rsvps = getStorage(STORAGE_KEYS.RSVPS, []);
  if (rsvps.length === 0) {
    alert('No RSVP data to export yet.');
    return;
  }

  let csv = 'Name,Contact,Attendance,Companions,Total Headcount,Dietary Notes,Wishes Message,Date Submitted\n';

  rsvps.forEach(r => {
    const clean = str => `"${(str || '').replace(/"/g, '""')}"`;
    csv += `${clean(r.name)},${clean(r.contact)},${clean(r.attendance)},${r.companions || 0},${r.totalCount || 0},${clean(r.dietary)},${clean(r.message)},${clean(r.submittedAt)}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `baby-shower-rsvps-${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 14. Modal Management System
function openModal(modalId) {
  if (!modalId) return;
  const modal = typeof modalId === 'string' ? document.getElementById(modalId) : modalId;
  if (!modal) return;
  const targetId = modal.id;

  // Hide other modals unless it's a nested modal like claim-modal
  document.querySelectorAll('.app-modal').forEach(m => {
    if (m !== modal && m.id !== 'claim-modal') {
      m.classList.add('hidden');
      m.classList.remove('flex');
    }
  });

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.classList.add('modal-open');

  // Trigger targeted re-renderings when modal opens
  try {
    if (targetId === 'modal-details') {
      renderPalette();
      renderSchedule();
    } else if (targetId === 'modal-registry') {
      renderRegistryFilterButtons();
      renderRegistryItems();
      renderCashFund();
    } else if (targetId === 'modal-games') {
      renderResemblancePoll();
      renderNameGuesses();
    } else if (targetId === 'modal-guestbook') {
      renderWishes();
    } else if (targetId === 'admin-panel') {
      updateAdminStats();
    }
  } catch (err) {
    console.error('Error refreshing modal content:', err);
  }
}

function closeModal(modalId) {
  const modal = typeof modalId === 'string' ? document.getElementById(modalId) : modalId;
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');

  const anyOpen = Array.from(document.querySelectorAll('.app-modal')).some(m => !m.classList.contains('hidden'));
  if (!anyOpen) {
    document.body.classList.remove('modal-open');
  }
}

function closeAllModals() {
  document.querySelectorAll('.app-modal').forEach(m => {
    m.classList.add('hidden');
    m.classList.remove('flex');
  });
  document.body.classList.remove('modal-open');
}

// Immediately bind to global window so inline onclick="openModal(...)" works anywhere
window.openModal = openModal;
window.closeModal = closeModal;
window.closeAllModals = closeAllModals;

function initModals() {
  // Direct event listeners on existing elements
  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-open-modal');
      openModal(targetId);
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = btn.closest('.app-modal');
      if (modal) closeModal(modal);
    });
  });

  document.querySelectorAll('.app-modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Global delegation handler - ensures clicks on button children or dynamically rendered elements ALWAYS work
  document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('[data-open-modal]');
    if (openBtn) {
      e.preventDefault();
      const targetId = openBtn.getAttribute('data-open-modal');
      if (targetId) openModal(targetId);
      return;
    }

    const closeBtn = e.target.closest('[data-close-modal]');
    if (closeBtn) {
      e.preventDefault();
      const modal = closeBtn.closest('.app-modal');
      if (modal) closeModal(modal);
      return;
    }

    if (e.target.classList && e.target.classList.contains('app-modal')) {
      closeModal(e.target);
    }
  });

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Handle URL hash navigation (#rsvp, #details, #registry, etc.)
  try {
    handleHashNavigation();
  } catch (err) {
    console.error('Hash navigation error:', err);
  }
  window.addEventListener('hashchange', handleHashNavigation);
}

function handleHashNavigation() {
  const hash = window.location.hash.replace('#', '');
  const hashMap = {
    'rsvp': 'modal-rsvp',
    'details': 'modal-details',
    'schedule': 'modal-details',
    'invitation': 'modal-details',
    'countdown': 'modal-countdown',
    'timer': 'modal-countdown',
    'registry': 'modal-registry',
    'gifts': 'modal-registry',
    'games': 'modal-games',
    'predictions': 'modal-games',
    'guestbook': 'modal-guestbook',
    'wishes': 'modal-guestbook',
    'admin': 'admin-panel'
  };
  if (hashMap[hash]) {
    openModal(hashMap[hash]);
  }
}

// 15. Toast Notifications
function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'fixed bottom-6 right-6 z-50 bg-stone-900/90 text-white px-5 py-3 rounded-2xl shadow-xl backdrop-blur text-sm flex items-center gap-2 transform transition duration-300 translate-y-12 opacity-0 pointer-events-none';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
  toast.classList.remove('translate-y-12', 'opacity-0', 'pointer-events-none');

  setTimeout(() => {
    toast.classList.add('translate-y-12', 'opacity-0', 'pointer-events-none');
  }, 4000);
}
