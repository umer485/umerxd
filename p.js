const CONFIG = {
  selector: '.license-check',
  keys: ['BLOG-TRIAL-2025'],
  whatsapp: '923304541001',
  whatsappMessage: 'Hello%20My%20Blog%20License%20Expired.%20Please%20Help.'
};

(function() {
  'use strict';
  const q = (s) => document.querySelector(s);
  const elSel = CONFIG.selector.trim();
  const WA = CONFIG.whatsapp.replace(/\D/g, '');
  const WA_MSG = CONFIG.whatsappMessage.trim();
  const KEYS = Array.isArray(CONFIG.keys) ? CONFIG.keys.map(e => String(e).trim()).filter(Boolean) : [];

  function buildRegex(keys) {
    if (!keys.length) return null;
    const esc = k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = keys.map(esc).join('|');
    try {
      return new RegExp('(?<![\\p{L}\\p{N}_])(?:' + parts + ')(?![\\p{L}\\p{N}_])', 'iu');
    } catch (e) {
      return new RegExp('\\b(?:' + parts + ')\\b', 'i');
    }
  }
  const KEY_REGEX = buildRegex(KEYS);

  let ov = null;
  function overlay() {
    if (ov) return ov;
    
    const o = document.createElement('div');
    o.id = 'lpop';
    Object.assign(o.style, {
      position: 'fixed',
      inset: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.70)',
      backdropFilter: 'blur(3px)',
      zIndex: '99999999999',
      opacity: '0',
      pointerEvents: 'none',
      transition: 'opacity .25s ease',
      padding: '20px'
    });

    const c = document.createElement('div');
    Object.assign(c.style, {
      width: '100%',
      maxWidth: '400px',
      background: '#fff',
      borderRadius: '12px',
      padding: '24px',
      textAlign: 'center',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
      overflow: 'hidden',
      position: 'relative'
    });

    const header = document.createElement('div');
    header.innerHTML = `
      <svg width="45" height="45" fill="none" viewBox="0 0 24 24">
      <path fill="#E02424" d="M10.29 3.86c.8-1.33 2.62-1.33 3.42 0l8.23 13.64c.81 1.35-.17 3.05-1.71 3.05H3.77c-1.54 0-2.52-1.7-1.71-3.05l8.23-13.64z"/>
      <path fill="#fff" d="M13 16a1 1 0 11-2 0 1 1 0 012 0zm0-2V9a1 1 0 10-2 0v5a1 1 0 002 0z"/>
      </svg>
    `;
    Object.assign(header.style, {
      marginBottom: '16px'
    });

    const h = document.createElement('div');
    h.textContent = 'License Required';
    Object.assign(h.style, {
      fontSize: '22px',
      fontWeight: '700',
      marginBottom: '8px',
      color: '#E02424'
    });

    const d = document.createElement('div');
    d.textContent = 'Your blog license has expired or is invalid. Please contact support to renew your license.';
    Object.assign(d.style, {
      fontSize: '15px',
      color: '#65676B',
      marginBottom: '24px',
      lineHeight: '1.5'
    });

    const b = document.createElement('a');
    b.href = `https://wa.me/${WA}?text=${WA_MSG}`;
    b.target = '_blank';
    b.rel = 'noopener';
    b.textContent = 'Contact Support';
    Object.assign(b.style, {
      display: 'inline-block',
      padding: '12px 24px',
      borderRadius: '6px',
      background: '#1877F2',
      color: '#fff',
      fontWeight: '600',
      textDecoration: 'none',
      fontSize: '15px',
      transition: 'background-color 0.2s',
    });

    c.appendChild(header);
    c.appendChild(h);
    c.appendChild(d);
    c.appendChild(b);
    o.appendChild(c);
    document.documentElement.appendChild(o);

    function show() {
      o.style.pointerEvents = 'auto';
      o.style.opacity = '1';
      document.documentElement.classList.add('lblock');
      document.body.style.overflow = 'hidden';
    }

    ov = { show, root: o };
    return ov;
  }

  const style = document.createElement('style');
  style.textContent = `
    .lblock body > *:not(#lpop):not(#lpop *) {
      pointer-events: none !important;
      user-select: none !important;
      filter: blur(2px) grayscale(.1);
    }
  `;
  document.head.appendChild(style);

  function getTxt() {
    const n = q(elSel);
    if (!n) return { e: false, t: '' };
    const t = (n.innerText || n.textContent || '').trim();
    return { e: true, t };
  }

  function valid() {
    if (!KEY_REGEX) return false;
    const v = getTxt();
    if (!v.e) return false;
    if (!v.t) return false;
    return KEY_REGEX.test(v.t);
  }

  function apply() {
    if (valid()) { return; }
    overlay().show();
  }

  function guard() {
    const mo = new MutationObserver(() => {
      if (!document.getElementById('lpop')) overlay().show();
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  }

  function watch() {
    const n = q(elSel);
    if (!n) return;
    const mo = new MutationObserver(() => apply());
    mo.observe(n, { childList: true, subtree: true, characterData: true });
    window.addEventListener('visibilitychange', () => { if (!document.hidden) apply(); });
    window.addEventListener('focus', () => apply());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { apply(); watch(); guard(); });
  } else {
    apply(); watch(); guard();
  }
})();
