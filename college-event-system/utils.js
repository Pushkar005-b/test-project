/* ─── THEME TOGGLE UTILITY ─── */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;
  
  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

/* ─── TOAST NOTIFICATIONS ─── */
class Toast {
  static container = null;

  static init() {
    if (!Toast.container) {
      Toast.container = document.createElement('div');
      Toast.container.className = 'toast-container';
      document.body.appendChild(Toast.container);
    }
  }

  static show(message, type = 'info', duration = 3000) {
    Toast.init();
    
    const toast = document.createElement('div');
    toast.className = `toast-message ${type}`;
    toast.textContent = message;
    toast.style.animationDuration = '0.4s';
    
    Toast.container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 400);
    }, duration);
  }

  static success(message, duration) { this.show(message, 'success', duration); }
  static error(message, duration) { this.show(message, 'error', duration); }
  static info(message, duration) { this.show(message, 'info', duration); }
}

/* ─── STATS COUNTER ─── */
function updateStatsDisplay(stats = {}) {
  const statsDisplay = document.getElementById('statsDisplay');
  if (!statsDisplay) return;
  
  const registered = stats.registered || 0;
  const total = stats.total || 0;
  const pending = stats.pending || 0;
  
  statsDisplay.innerHTML = `
    <div class="stat-box">
      <div class="stat-box-num">${registered}</div>
      <div class="stat-box-label">Registered</div>
    </div>
    <div class="stat-box">
      <div class="stat-box-num">${pending}</div>
      <div class="stat-box-label">Pending</div>
    </div>
    <div class="stat-box">
      <div class="stat-box-num">${total}</div>
      <div class="stat-box-label">Total</div>
    </div>
  `;
}

/* ─── SEARCH FILTER UTILITY ─── */
function initSearchFilter(items, searchInputId, filterFn) {
  const searchInput = document.getElementById(searchInputId);
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    filterFn(query);
  });
}

/* Initialize on page load */
document.addEventListener('DOMContentLoaded', initThemeToggle);
