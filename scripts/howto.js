// howto.js
// Improved: supports multiple .howto-btn elements (mobile bar + header) and
// attempts to open YouTube app on mobile devices before falling back to web.

document.addEventListener('DOMContentLoaded', () => {
  const buttons = Array.from(document.querySelectorAll('.howto-btn'));
  const modal = document.getElementById('howtoModal');
  const iframe = document.getElementById('howtoIframe');
  const closeControls = modal ? modal.querySelectorAll('[data-close-howto]') : [];
  if (!buttons.length) return;

  function parseYouTubeId(url) {
    try {
      const u = new URL(url);
      if (u.hostname.includes('youtube.com')) return u.searchParams.get('v');
      if (u.hostname === 'youtu.be') return u.pathname.slice(1);
    } catch (e) {}
    return null;
  }

  function isMobile() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '');
  }

  // Try to open YouTube app using known URI schemes. If not successful within timeout,
  // fallback to web URL. Only attempt on mobile.
  function tryOpenInYouTubeApp(youtubeUrl, fallbackUrl) {
    if (!isMobile()) {
      window.location.href = fallbackUrl;
      return;
    }

    const id = parseYouTubeId(youtubeUrl);
    const now = Date.now();
    // prefer vnd.youtube (Android), youtube:// (iOS)
    const schemeUrls = [];
    if (id) {
      schemeUrls.push(`vnd.youtube://watch?v=${id}`);
      schemeUrls.push(`youtube://watch?v=${id}`);
      // Android intent fallback (safer on newer Android browsers)
      schemeUrls.push(`intent://www.youtube.com/watch?v=${id}#Intent;package=com.google.android.youtube;scheme=https;end`);
    }
    // fallback attempt: if no id or schemes fail, open the original url

    // Try each scheme by navigating an iframe then setting a timer to fallback.
    let handled = false;
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const tryScheme = (index) => {
      if (index >= schemeUrls.length) {
        // none worked — go to web
        cleanupAndOpenWeb();
        return;
      }
      try {
        iframe.src = schemeUrls[index];
      } catch (e) {
        // ignore
      }
      // If app opens, page visibility will change or the iframe navigation may throw.
      // Use a short timeout then fallback.
      setTimeout(() => {
        // If after 1200ms still visible, try next scheme or fallback
        tryScheme(index + 1);
      }, 1200);
    };

    const cleanupAndOpenWeb = () => {
      try { document.body.removeChild(iframe); } catch (e) {}
      // open web version in same tab for modal/external behavior
      window.location.href = fallbackUrl;
    };

    // Start trying schemes if we have any; otherwise open fallback directly.
    if (schemeUrls.length) tryScheme(0);
    else cleanupAndOpenWeb();
  }

  function buildYouTubeEmbed(url) {
    try {
      const u = new URL(url);
      if (u.hostname.includes('youtube.com')) {
        const id = u.searchParams.get('v');
        if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
      }
      if (u.hostname === 'youtu.be') {
        const id = u.pathname.slice(1);
        if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
      }
    } catch (e) {}
    return url;
  }

  function openModalWithUrl(url) {
    if (!modal) { window.open(url, '_blank', 'noopener'); return; }
    const embed = buildYouTubeEmbed(url);
    iframe.src = embed;
    modal.setAttribute('aria-hidden', 'false');
    const closeBtn = modal.querySelector('[data-close-howto]');
    if (closeBtn) closeBtn.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    if (iframe) iframe.src = '';
    document.body.style.overflow = '';
  }

  // Attach click listeners to all .howto-btn elements. Each button may have its own data-url and data-mode.
  buttons.forEach((btn) => {
    const updateState = () => {
      const url = (btn.dataset.url || '').trim();
      const hasUrl = url.length > 0 && url !== '#';
      btn.disabled = !hasUrl;
      btn.title = hasUrl ? 'Open tutorial' : 'Tutorial link not configured yet';
      if (!hasUrl) btn.setAttribute('aria-disabled', 'true'); else btn.removeAttribute('aria-disabled');
    };

    btn.addEventListener('click', (e) => {
      const url = (btn.dataset.url || '').trim();
      const mode = (btn.dataset.mode || '').trim(); // 'external' or 'modal'
      if (!url || url === '#') {
        console.warn('How-to link not configured. Use window.setHowToUrl(url) to configure.');
        return;
      }

      // If external mode and the url is a YouTube watch link, attempt to open app on mobile
      const isYouTube = /youtu\.be|youtube\.com/.test(url);
      if (mode === 'external' && isYouTube) {
        // try app then web
        tryOpenInYouTubeApp(url, url);
        return;
      }

      if (mode === 'external') window.open(url, '_blank', 'noopener');
      else openModalWithUrl(url);
    });

    // initialize
    updateState();
  });

  // Close controls for modal
  closeControls.forEach(c => c.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  if (modal) {
    modal.addEventListener('click', (e) => { if (e.target === modal || e.target.classList.contains('howto-backdrop')) closeModal(); });
  }

  // Global helpers: setHowToUrl will update all buttons; setHowToMode updates all as well.
  window.setHowToUrl = function (url) {
    buttons.forEach(b => { b.dataset.url = url || ''; b.disabled = !(url && url !== '#'); });
  };
  window.setHowToMode = function (mode) {
    buttons.forEach(b => { if (mode) b.dataset.mode = mode; else delete b.dataset.mode; });
  };
});
