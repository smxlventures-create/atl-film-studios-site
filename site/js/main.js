/* atlfilmstudios.com — main.js
 * Mobile nav, gallery lightbox, quote form, Meta pixel events
 */

(function () {
  'use strict';

  // ---------- Meta pixel safe-fire helper ----------
  // The fbq function is loaded inline in <head>. Wrap so it doesn't throw
  // pre-load or in environments where the pixel hasn't been initialized.
  function track(eventName, payload) {
    try {
      if (typeof window.fbq === 'function') {
        window.fbq('trackCustom', eventName, payload || {});
      }
      if (window.console && console.debug) {
        console.debug('[track]', eventName, payload || {});
      }
    } catch (e) {
      // swallow — never break the page on tracking
    }
  }

  // ---------- Mobile nav toggle ----------
  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      var open = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? '×' : '☰';
    });

    // close on link click
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      });
    });
  }

  // ---------- Gallery lightbox ----------
  function initLightbox() {
    var gallery = document.querySelector('.set-gallery');
    if (!gallery) return;

    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<span class="close" aria-label="Close">×</span><img alt="">';
    document.body.appendChild(lightbox);

    var imgEl = lightbox.querySelector('img');
    var closeEl = lightbox.querySelector('.close');

    gallery.querySelectorAll('img').forEach(function (img) {
      img.addEventListener('click', function () {
        imgEl.src = img.src;
        imgEl.alt = img.alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function close() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      imgEl.src = '';
    }
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target === closeEl) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) close();
    });
  }

  // ---------- Outbound CTA pixel events ----------
  function initCTATracking() {
    document.querySelectorAll('[data-track]').forEach(function (el) {
      el.addEventListener('click', function () {
        var name = el.getAttribute('data-track');
        var listing = el.getAttribute('data-listing') || '';
        track(name, { listing: listing, path: window.location.pathname });
      });
    });
  }

  // ---------- Quote form ----------
  // Default behavior: posts to formspree or netlify-style endpoint, then
  // shows confirmation OR redirects to /thank-you.html so Meta pixel fires
  // a Lead event on that page.
  function initQuoteForm() {
    var form = document.querySelector('.quote-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      // If form has no action attribute, prevent default and show local confirmation
      var action = form.getAttribute('action') || '';
      if (!action || action === '#') {
        e.preventDefault();
        // For local/preview testing — log to console
        var data = {};
        new FormData(form).forEach(function (v, k) { data[k] = v; });
        console.info('[QuoteForm submitted]', data);
        track('Lead', { source: 'site_form', listing: data.set || '' });

        // Show simple confirmation
        var confirm = document.createElement('div');
        confirm.innerHTML = '<p class="lead" style="color:var(--accent); margin-top:30px;">Got it — we will respond within 2 hours during business hours. For urgent inquiries, call 470-231-8971.</p>';
        form.parentNode.replaceChild(confirm, form);
        return false;
      }
      // Otherwise let the action submit normally; thank-you.html fires Lead
      track('Lead', { source: 'site_form' });
    });
  }

  // ---------- Boot ----------
  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initLightbox();
    initCTATracking();
    initQuoteForm();
  });
})();
