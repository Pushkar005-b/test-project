/* ================================================================
   Calendar functionality for JISSP Events System
   ================================================================ */

'use strict';

const calendarEl = document.getElementById('calendar');
const monthYearEl = document.getElementById('monthYear');
const selectedMonthEl = document.getElementById('selectedMonth');
const monthEventsEl = document.getElementById('monthEvents');
let currentCalendarDate = new Date(2026, 1); // February 2026

function renderCalendar(date) {
  calendarEl.innerHTML = '';
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Update header
  monthYearEl.textContent = date.toLocaleString(undefined, { month: 'long', year: 'numeric' });
  selectedMonthEl.textContent = date.toLocaleString(undefined, { month: 'long' });

  // Days of week header
  const headerRow = document.createElement('tr');
  headerRow.style.backgroundColor = 'var(--bg-secondary)';
  ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(d => {
    const th = document.createElement('th');
    th.textContent = d;
    th.style.padding = '12px';
    th.style.textAlign = 'center';
    th.style.fontWeight = '600';
    th.style.color = 'var(--text-primary)';
    headerRow.appendChild(th);
  });
  calendarEl.appendChild(headerRow);

  let row = document.createElement('tr');
  
  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    const td = document.createElement('td');
    td.style.padding = '12px';
    row.appendChild(td);
  }

  // Days with events
  for (let day = 1; day <= daysInMonth; day++) {
    if (row.children.length === 7) {
      calendarEl.appendChild(row);
      row = document.createElement('tr');
    }

    const td = document.createElement('td');
    td.style.padding = '12px';
    td.style.borderBottom = '1px solid var(--border-color)';
    td.style.verticalAlign = 'top';
    td.style.minHeight = '100px';
    td.style.backgroundColor = 'var(--bg-primary)';
    td.style.cursor = 'pointer';

    // Check for events on this day
    const dayDate = new Date(year, month, day);
    const eventsOnDay = EVENTS.filter(ev => {
      const evDate = new Date(ev.datetime);
      return evDate.getDate() === day && 
             evDate.getMonth() === month && 
             evDate.getFullYear() === year;
    });

    // Day number
    const dayNum = document.createElement('div');
    dayNum.style.fontWeight = '600';
    dayNum.style.marginBottom = '8px';
    dayNum.style.color = new Date(year, month, day) < new Date() ? 'var(--text-secondary)' : 'var(--text-primary)';
    dayNum.textContent = day;
    td.appendChild(dayNum);

    // Events on this day
    eventsOnDay.forEach(ev => {
      const eventEl = document.createElement('div');
      eventEl.style.fontSize = '11px';
      eventEl.style.padding = '4px 6px';
      eventEl.style.marginBottom = '4px';
      eventEl.style.borderRadius = '4px';
      eventEl.style.backgroundColor = 'var(--accent-color)';
      eventEl.style.color = 'white';
      eventEl.style.cursor = 'pointer';
      eventEl.style.overflow = 'hidden';
      eventEl.style.textOverflow = 'ellipsis';
      eventEl.style.whiteSpace = 'nowrap';
      eventEl.textContent = ev.icon + ' ' + ev.title;
      eventEl.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(ev.id);
      });
      td.appendChild(eventEl);
    });

    row.appendChild(td);
  }

  // Fill remaining cells
  while (row.children.length < 7) {
    const td = document.createElement('td');
    td.style.padding = '12px';
    row.appendChild(td);
  }

  calendarEl.appendChild(row);

  // Render events for this month
  renderMonthEvents(year, month);
}

function renderMonthEvents(year, month) {
  const monthEvents = EVENTS.filter(ev => {
    const evDate = new Date(ev.datetime);
    return evDate.getMonth() === month && evDate.getFullYear() === year;
  }).sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

  monthEventsEl.innerHTML = '';

  if (monthEvents.length === 0) {
    monthEventsEl.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">No events scheduled for this month</div>';
    return;
  }

  monthEvents.forEach((ev, i) => {
    const isPast = new Date(ev.datetime) <= new Date();
    
    const eventCard = document.createElement('div');
    eventCard.style.padding = '16px';
    eventCard.style.borderRadius = '8px';
    eventCard.style.backgroundColor = 'var(--bg-secondary)';
    eventCard.style.border = '1px solid var(--border-color)';
    eventCard.style.cursor = 'pointer';
    eventCard.style.transition = 'all 0.3s ease';
    eventCard.addEventListener('mouseenter', () => {
      eventCard.style.transform = 'translateY(-4px)';
      eventCard.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
    });
    eventCard.addEventListener('mouseleave', () => {
      eventCard.style.transform = 'translateY(0)';
      eventCard.style.boxShadow = 'none';
    });
    eventCard.addEventListener('click', () => openModal(ev.id));

    const badgeColor = ev.badgeClass.includes('tech') ? '#3b82f6' :
                       ev.badgeClass.includes('cultural') ? '#ec4899' :
                       ev.badgeClass.includes('sports') ? '#f59e0b' :
                       ev.badgeClass.includes('workshop') ? '#10b981' : '#8b5cf6';

    eventCard.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
        <span style="font-size: 24px;">${ev.icon}</span>
        ${isPast ? '<span style="font-size: 11px; padding: 2px 8px; background: #6b7280; color: white; border-radius: 4px;">Past</span>' : ''}
      </div>
      <h3 style="margin: 8px 0; color: var(--text-primary); font-size: 14px; font-weight: 600;">${ev.title}</h3>
      <div style="display: flex; gap: 6px; margin-bottom: 8px; flex-wrap: wrap;">
        <span style="font-size: 11px; padding: 2px 8px; background: ${badgeColor}; color: white; border-radius: 4px;">${ev.badge}</span>
        <span style="font-size: 11px; padding: 2px 8px; background: var(--bg-tertiary); color: var(--text-secondary); border-radius: 4px;">⏰ ${ev.displayTime}</span>
      </div>
      <p style="margin: 8px 0; color: var(--text-secondary); font-size: 12px; line-height: 1.4;">${ev.description.substring(0, 80)}...</p>
      <div style="display: flex; gap: 12px; margin-top: 10px; font-size: 12px; color: var(--text-secondary);">
        <span>📍 ${ev.venue.substring(0, 25)}</span>
        <span>💰 ${ev.fee}</span>
      </div>
      <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border-color);">
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
          <span>${ev.registered}/${ev.capacity} registered</span>
          <div style="width: 100px; height: 6px; background: var(--bg-tertiary); border-radius: 3px; overflow: hidden;">
            <div style="width: ${(ev.registered/ev.capacity)*100}%; height: 100%; background: linear-gradient(90deg, #3b82f6, #10b981);"></div>
          </div>
        </div>
      </div>
    `;

    monthEventsEl.appendChild(eventCard);
  });
}

// Navigation
document.getElementById('prevBtn').addEventListener('click', () => {
  currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
  renderCalendar(new Date(currentCalendarDate));
});

document.getElementById('nextBtn').addEventListener('click', () => {
  currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
  renderCalendar(new Date(currentCalendarDate));
});

// Initial render
renderCalendar(currentCalendarDate);

// Setup hamburger menu for calendar page
function setupHamburgerCalendar() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn) return;
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });
}

// Initialize on page load
function initCalendarPage() {
  setupHamburgerCalendar();
  updateRegBadge();
  
  // Modal listeners
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
    }
  });

  // Confirmation buttons
  document.getElementById('confirmOk').addEventListener('click', () => {
    hideConfirmation();
    showToast('🎉 Registration confirmed & saved!', 'success');
  });

  document.getElementById('confirmCancel').addEventListener('click', () => {
    if (pendingRegistrationId !== null) {
      removeRegistration(pendingRegistrationId);
      updateRegBadge();
    }
    hideConfirmation();
    showToast('Registration removed.', 'warning');
  });

  // Panel listeners
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

  // Theme toggle
  initThemeToggle();
}

document.addEventListener('DOMContentLoaded', initCalendarPage);
