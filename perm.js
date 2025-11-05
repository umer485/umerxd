const CONFIG={
  selector:'.license-check',
  keys:['BLOG-TRIAL-2025'],
  whatsapp:'923304541001',
  whatsappMessage:'Hello%20My%20Blog%20License%20Expired.%20Please%20Help.'
};

(function(){
  'use strict';
  const q=(s)=>document.querySelector(s);
  const elSel=CONFIG.selector.trim();
  const WA=CONFIG.whatsapp.replace(/\D/g,'');
  const WA_MSG=CONFIG.whatsappMessage.trim();
  const KEYS=Array.isArray(CONFIG.keys)?CONFIG.keys.map(e=>String(e).trim()).filter(Boolean):[];
  function buildRegex(keys){
    if(!keys.length)return null;
    const esc=k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    const parts=keys.map(esc).join('|');
    try{return new RegExp('(?<![\\p{L}\\p{N}_])(?:'+parts+')(?![\\p{L}\\p{N}_])','iu');}
    catch(e){return new RegExp('\\b(?:'+parts+')\\b','i');}
  }
  const KEY_REGEX=buildRegex(KEYS);

  let ov=null;
  function overlay(){
    if(ov)return ov;
    const o=document.createElement('div');
    o.id='lpop';
    Object.assign(o.style,{
      position:'fixed',inset:'0',display:'flex',alignItems:'center',justifyContent:'center',
      background:'rgba(0,0,0,0.70)',backdropFilter:'blur(3px)',zIndex:'99999999999',
      opacity:'0',pointerEvents:'none',transition:'opacity .25s ease'
    });

    const c=document.createElement('div');
    Object.assign(c.style,{
      width:'92%',maxWidth:'360px',background:'#fff',borderRadius:'12px',
      padding:'18px 20px',textAlign:'center',fontFamily:'system-ui,Arial',
      boxShadow:'0 4px 14px rgba(0,0,0,.18)',overflow:'hidden'
    });

    const h=document.createElement('div');
    h.textContent='License Expired';
    Object.assign(h.style,{fontSize:'20px',fontWeight:'700',marginBottom:'6px',color:'#1877F2'});

    const d=document.createElement('div');
    d.textContent='Your blog license is invalid or removed.';
    Object.assign(d.style,{fontSize:'14px',color:'#555',marginBottom:'16px',lineHeight:'1.4'});

    const b=document.createElement('a');
    b.href=`https://wa.me/${WA}?text=${WA_MSG}`;
    b.target='_blank';
    b.rel='noopener';
    b.textContent='Contact Support';
    Object.assign(b.style,{
      display:'inline-block',padding:'12px 20px',borderRadius:'8px',
      border:'2px solid #1877F2',color:'#1877F2',fontWeight:'700',textDecoration:'none',
      fontSize:'14px'
    });

    c.appendChild(h);
    c.appendChild(d);
    c.appendChild(b);
    o.appendChild(c);
    document.documentElement.appendChild(o);

    function show(){
      o.style.pointerEvents='auto';
      o.style.opacity='1';
      document.documentElement.classList.add('lblock');
    }

    ov={show,root:o};
    return ov;
  }

  const style=document.createElement('style');
  style.textContent=
  '.lblock body>*:not(#lpop):not(#lpop *){pointer-events:none !important;user-select:none !important;filter:blur(2px) grayscale(.1);}';
  document.head.appendChild(style);

  function getTxt(){
    const n=q(elSel);
    if(!n)return{e:false,t:''};
    const t=(n.innerText||n.textContent||'').trim();
    return{e:true,t};
  }

  function valid(){
    if(!KEY_REGEX)return false;
    const v=getTxt();
    if(!v.e)return false;
    if(!v.t)return false;
    return KEY_REGEX.test(v.t);
  }

  function apply(){
    if(valid()){return;}
    overlay().show();
  }

  function watch(){
    const n=q(elSel);
    if(!n)return;
    const mo=new MutationObserver(()=>apply());
    mo.observe(n,{childList:true,subtree:true,characterData:true});
    window.addEventListener('visibilitychange',()=>{if(!document.hidden)apply();});
    window.addEventListener('focus',()=>apply());
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',()=>{apply();watch();});
  }else{apply();watch();}
})();
