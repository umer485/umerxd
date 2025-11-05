/* license-check-single.js
Simple, single-file JavaScript. Copy this file to GitHub and include on your Blogger page.
Kaam: ek page div (CONFIG.selector) ka text check karega against CONFIG.keys.
Agar match mile -> site normal. Agar match na mile -> professional popup + WhatsApp (03304541001).
Config me keys jitne dalna chahein dal dain; jo keys add karen ge, wahi verify hoti rahengi.
*/

/* ---------- CONFIG - sirf yahan edit karein ---------- */
const CONFIG = {
  selector: '.license-check', // Page par jo div hogi uska selector (class ya id). Example: <div class="license-check">MY-KEY</div>
  keys: [ 'BLOG-TRIAL-2025' ], // yahan jitne keys chahen dal dain
  whatsapp: '923304541001', // WhatsApp (international, without +). Example Pakistan: 92XXXXXXXXXX
  whatsappMessage: 'Assalamualaikum%20—%20License%20issue%20on%20my%20blog.%20Please%20help.' // URL-encoded default message
};
/* ----------------------------------------------------- */

(function cfgSafe(){
  'use strict';

  // small helpers
  const elSel = String(CONFIG.selector || '.license-check').trim();
  const WA = String(CONFIG.whatsapp || '923304541001').replace(/\D/g,'');
  const WA_MSG = String(CONFIG.whatsappMessage || 'Assalamualaikum%20—%20License%20issue').trim();
  const KEYS = Array.isArray(CONFIG.keys) ? CONFIG.keys.map(k => String(k).trim()).filter(Boolean) : [];
  // build case-insensitive whole-word regex for keys
  function buildRegex(keys){
    if(!keys.length) return null;
    const esc = k => k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    const parts = keys.map(esc).join('|');
    // try Unicode-aware lookaround, fallback to simple word boundaries
    try {
      return new RegExp('(?<![\\p{L}\\p{N}_])(?:' + parts + ')(?![\\p{L}\\p{N}_])','iu');
    } catch(e){
      return new RegExp('\\b(?:' + parts + ')\\b','i');
    }
  }
  const KEY_REGEX = buildRegex(KEYS);

  // overlay UI
  let overlayRoot = null;
  function createOverlay(){
    if(overlayRoot) return overlayRoot;
    const ov = document.createElement('div');
    ov.id = 'lic-ov-root';
    Object.assign(ov.style, {
      position:'fixed',inset:'0',display:'flex',alignItems:'center',justifyContent:'center',
      background:'rgba(2,6,23,0.78)',backdropFilter:'blur(3px)',zIndex:'2147483647',opacity:'0',pointerEvents:'none',transition:'opacity .18s ease'
    });

    const card = document.createElement('div');
    Object.assign(card.style,{
      width:'min(760px,92%)',background:'#fff',borderRadius:'12px',padding:'20px',boxShadow:'0 16px 48px rgba(2,6,23,.5)',
      fontFamily:'Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial',color:'#0f172a'
    });

    const h = document.createElement('h2');
    h.textContent = 'License Expired or Invalid';
    Object.assign(h.style,{margin:'0 0 8px',fontSize:'20px'});

    const p = document.createElement('p');
    p.id = 'lic-ov-msg';
    p.textContent = 'Aapki site ka license valid nahi mila. Support se rabta karein.';
    Object.assign(p.style,{margin:'0 0 14px',color:'#374151',fontSize:'14px'});

    const row = document.createElement('div');
    Object.assign(row.style,{display:'flex',gap:'10px',justifyContent:'flex-end',alignItems:'center'});

    const wa = document.createElement('a');
    wa.href = `https://wa.me/${WA}?text=${WA_MSG}`;
    wa.target = '_blank';
    wa.rel = 'noopener noreferrer';
    wa.textContent = 'WhatsApp Support';
    wa.setAttribute('aria-label','Contact Support on WhatsApp');
    Object.assign(wa.style,{
      padding:'10px 14px',borderRadius:'10px',fontWeight:700,textDecoration:'none',
      background:'linear-gradient(180deg,#25D366,#128C7E)',color:'#fff',boxShadow:'0 8px 20px rgba(18,140,126,.12)'
    });

    const retry = document.createElement('button');
    retry.type = 'button';
    retry.textContent = 'Retry';
    Object.assign(retry.style,{
      padding:'10px 14px',borderRadius:'10px',fontWeight:700,cursor:'pointer',border:'0',background:'#0f172a',color:'#fff'
    });

    const info = document.createElement('p');
    info.textContent = 'Agar aap owner hain to page me required word wapas add karein ya keys update karein.';
    Object.assign(info.style,{margin:'12px 0 0',color:'#6b7280',fontSize:'13px'});

    row.appendChild(wa);
    row.appendChild(retry);
    card.appendChild(h);
    card.appendChild(p);
    card.appendChild(row);
    card.appendChild(info);
    ov.appendChild(card);
    document.documentElement.appendChild(ov);

    function show(msg){
      const mEl = document.getElementById('lic-ov-msg');
      if(mEl) mEl.textContent = msg || 'Aapki site ka license valid nahi mila. Support se rabta karein.';
      ov.style.pointerEvents = 'auto';
      ov.style.opacity = '1';
      ov.setAttribute('aria-hidden','false');
      document.documentElement.classList.add('lic-blocked');
    }
    function hide(){
      ov.style.pointerEvents = 'none';
      ov.style.opacity = '0';
      ov.setAttribute('aria-hidden','true');
      document.documentElement.classList.remove('lic-blocked');
    }

    retry.addEventListener('click', ()=>{
      hide();
      setTimeout(()=> runCheck(true), 180);
    });

    overlayRoot = {root:ov, show, hide, setMessage:(m)=>{document.getElementById('lic-ov-msg').textContent = m;}};
    return overlayRoot;
  }

  // block page interactions when overlay shown
  const styleEl = document.createElement('style');
  styleEl.textContent = '.lic-blocked *:not(#lic-ov-root):not(#lic-ov-root *){pointer-events:none !important;user-select:none !important;filter:blur(.6px) grayscale(.04);}';
  document.head.appendChild(styleEl);

  // core check
  function getTargetText(){
    const node = document.querySelector(elSel);
    if(!node) return {exists:false,text:''};
    const txt = (node.innerText || node.textContent || '').trim();
    return {exists:true,text:txt};
  }

  function isValid(){
    // if no keys configured -> invalid
    if(!KEY_REGEX) return {ok:false,reason:'NO_KEYS',detail:'No license keys configured.'};
    const t = getTargetText();
    if(!t.exists) return {ok:false,reason:'NO_TARGET',detail:`Target element (${elSel}) not found.`};
    if(!t.text) return {ok:false,reason:'EMPTY',detail:'License element is empty.'};
    // test regex
    const matched = KEY_REGEX.test(t.text);
    if(!matched) return {ok:false,reason:'KEY_NOT_FOUND',detail:'Required word not found in target element.'};
    return {ok:true,reason:'OK'};
  }

  let last = null;
  const ov = createOverlay();

  function apply(){
    const res = isValid();
    last = res;
    if(res.ok){
      ov.hide();
      return;
    }
    // message mapping
    const map = {
      'NO_KEYS':'License keys not configured.',
      'NO_TARGET':`Element ${elSel} missing on page.`,
      'EMPTY':'License element empty. Add required word.',
      'KEY_NOT_FOUND':'Required word not found. Please add it back or update keys.'
    };
    ov.setMessage(map[res.reason] || res.detail || 'License invalid.');
    ov.show();
  }

  // run checks
  let running = false;
  function runCheck(force){
    if(running) return;
    running = true;
    try{
      apply();
    } finally { running = false; }
  }

  // observe target changes
  function startWatcher(){
    const node = document.querySelector(elSel);
    if(!node) return;
    const mo = new MutationObserver(()=> runCheck());
    mo.observe(node,{childList:true,subtree:true,characterData:true});
    window.addEventListener('visibilitychange', ()=> { if(!document.hidden) runCheck(); });
    window.addEventListener('focus', ()=> runCheck());
  }

  // init
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ()=>{
      runCheck();
      startWatcher();
    });
  } else {
    runCheck();
    startWatcher();
  }

  // expose minimal API for admin testing
  Object.defineProperty(window,'LICENSE_CHECK', {
    value: {
      run: runCheck,
      lastState: ()=> last,
      config: ()=> ({ selector: elSel, keys: KEYS.slice(), whatsapp: WA })
    },
    writable:false,configurable:false
  });

})();
