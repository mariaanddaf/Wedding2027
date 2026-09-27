// ============================================================
// María & Dafydd — Wedding site behavior
// Countdown target + everything else is plain and editable below.
// ============================================================

// EDIT: this must match the date/time shown in the hero section.
// 12:30 midday Madrid time; Madrid is on CET (UTC+1) in December.
var WEDDING_DATETIME = new Date('2027-12-04T12:30:00+01:00');

function updateCountdown() {
  var now = new Date();
  var diff = WEDDING_DATETIME - now;

  var els = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    minutes: document.getElementById('cd-minutes'),
    seconds: document.getElementById('cd-seconds')
  };

  if (!els.days) return;

  if (diff <= 0) {
    els.days.textContent = '0';
    els.hours.textContent = '0';
    els.minutes.textContent = '0';
    els.seconds.textContent = '0';
    return;
  }

  var totalSeconds = Math.floor(diff / 1000);
  var days = Math.floor(totalSeconds / 86400);
  var hours = Math.floor((totalSeconds % 86400) / 3600);
  var minutes = Math.floor((totalSeconds % 3600) / 60);
  var seconds = totalSeconds % 60;

  els.days.textContent = days;
  els.hours.textContent = hours;
  els.minutes.textContent = minutes;
  els.seconds.textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ---------- Floating menu ----------

var menuButton = document.getElementById('menu-button');
var menuIcon = document.getElementById('menu-icon');

function toggleMenu(event) {
  if (event) event.stopPropagation();
  menuButton.classList.toggle('is-open');
}

function closeMenu() {
  menuButton.classList.remove('is-open');
}

if (menuIcon) {
  menuIcon.addEventListener('click', toggleMenu);
}

document.querySelectorAll('.menu-list a').forEach(function (link) {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('click', function (event) {
  if (menuButton && !menuButton.contains(event.target)) {
    closeMenu();
  }
});

// ---------- Modals ----------

function openModal(id) {
  var modal = document.getElementById(id);
  if (modal) modal.classList.add('is-open');
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach(function (modal) {
    modal.classList.remove('is-open');
  });
}

document.querySelectorAll('[data-open-modal]').forEach(function (trigger) {
  trigger.addEventListener('click', function () {
    openModal(trigger.getAttribute('data-open-modal'));
  });
});

document.querySelectorAll('[data-close-modal]').forEach(function (trigger) {
  trigger.addEventListener('click', closeAllModals);
});

document.querySelectorAll('.modal').forEach(function (modal) {
  modal.addEventListener('click', function (event) {
    if (event.target === modal) closeAllModals();
  });
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') closeAllModals();
});

// ---------- Language (English / Español) ----------

function applyLanguage(lang) {
  document.documentElement.setAttribute('data-site-lang', lang);
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-lang]').forEach(function (el) {
    // NOTE: display:'' would just remove the inline override and fall back to
    // the stylesheet's `[data-lang] { display: none }` rule — still hidden.
    // 'revert' skips that author rule and restores the tag's normal display
    // (block for div/p/h2..., inline for span/a, etc).
    el.style.display = (el.getAttribute('data-lang') === lang) ? 'revert' : 'none';
  });
}

document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    applyLanguage(btn.getAttribute('data-set-lang'));
    document.getElementById('language-select').classList.add('is-hidden');
  });
});

var openLanguageSelect = document.getElementById('open-language-select');
if (openLanguageSelect) {
  openLanguageSelect.addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('language-select').classList.remove('is-hidden');
  });
}

// Language screen shows on every visit — defaults the content underneath to
// English until a flag is picked, but does not auto-dismiss itself.
applyLanguage('en');
