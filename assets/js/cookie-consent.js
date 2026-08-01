(function () {
  var GA_ID = 'G-3X0KJSK4XP';
  var STORAGE_KEY = 'spc_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  var acceptBtn = document.getElementById('cookieAccept');
  var rejectBtn = document.getElementById('cookieReject');
  var prefLinks = document.querySelectorAll('.js-cookie-prefs');

  function loadGA() {
    if (window.__spcGaLoaded) return;
    window.__spcGaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('config', GA_ID);
  }

  function showBanner() {
    if (!banner) return;
    banner.hidden = false;
    requestAnimationFrame(function () { banner.classList.add('show'); });
  }
  function hideBanner() {
    if (!banner) return;
    banner.classList.remove('show');
    setTimeout(function () { banner.hidden = true; }, 350);
  }

  function applyConsent(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
    if (value === 'granted') loadGA();
  }

  var stored;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { stored = null; }

  if (stored === 'granted') {
    loadGA();
  } else if (stored !== 'denied') {
    showBanner();
  }

  if (acceptBtn) acceptBtn.addEventListener('click', function () { applyConsent('granted'); hideBanner(); });
  if (rejectBtn) rejectBtn.addEventListener('click', function () { applyConsent('denied'); hideBanner(); });

  prefLinks.forEach(function (link) {
    link.addEventListener('click', function (e) { e.preventDefault(); showBanner(); });
  });
})();