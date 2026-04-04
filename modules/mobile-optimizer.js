// ═══════════════════════════════════════════════════════════════
// MODULE: mobile-optimizer.js  —  OTIMIZAÇÃO MOBILE + FIX HP
// ─────────────────────────────────────────────────────────────
// • Reduz efeitos pesados (blur, 3D, scanlines) em mobile
// • Corrige bug: barra de HP não diminuia na batalha
// • Fix applyHudSkin/applyHudTheme que resetavam a width
// • SEM botões flutuantes — tudo centralizado no unified-dock.js
// ═══════════════════════════════════════════════════════════════
(function MobileOptimizerModule() {
  'use strict';

  const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
  const isLowEnd = isMobile && (
    navigator.hardwareConcurrency <= 4 ||
    (navigator.deviceMemory && navigator.deviceMemory <= 3)
  );

  // ── FPS monitor para modo econômico automático ────────────
  let _fps = 60, _fc = 0, _ft = performance.now(), _lowPerf = false;
  function monitorFPS() {
    _fc++;
    const now = performance.now();
    if (now - _ft >= 2000) {
      _fps = Math.round((_fc * 1000) / (now - _ft));
      _fc = 0; _ft = now;
      if (_fps < 28 && !_lowPerf) enableLowPerf();
    }
    requestAnimationFrame(monitorFPS);
  }
  requestAnimationFrame(monitorFPS);

  function enableLowPerf() {
    _lowPerf = true;
    document.body.classList.add('low-perf-mode');
    console.log('[MobileOptimizer] Low-perf ON — FPS was', _fps);
  }

  // Expõe para o dock acionar manualmente
  window._toggleLowPerf = function() {
    _lowPerf = !_lowPerf;
    document.body.classList.toggle('low-perf-mode', _lowPerf);
    return _lowPerf;
  };
  window._isLowPerf = () => _lowPerf;

  // ── CSS de otimização ─────────────────────────────────────
  function injectCSS() {
    if (document.getElementById('mob-opt-css')) return;
    const s = document.createElement('style');
    s.id = 'mob-opt-css';
    s.textContent = `
      @media (max-width:600px),(pointer:coarse) {
        .glass-panel { backdrop-filter:blur(4px)!important;-webkit-backdrop-filter:blur(4px)!important; }
        .game-container { box-shadow:0 0 20px rgba(0,0,0,0.8)!important; }
        .arena-3d-container { perspective:none!important;transform-style:flat!important; }
        .stage-floor { display:none!important; }
        .arena-bg-layer { mix-blend-mode:normal!important;opacity:0.5!important; }
        body::after { display:none!important; }
        button,[onclick] { touch-action:manipulation!important;-webkit-tap-highlight-color:transparent!important; }
        #hero-hp-bar,#monster-hp-bar { contain:strict; }
      }
      body.low-perf-mode .glass-panel { backdrop-filter:none!important;-webkit-backdrop-filter:none!important; }
      body.low-perf-mode .arena-bg-layer { mix-blend-mode:normal!important;opacity:0.4!important; }
      body.low-perf-mode body::after { display:none!important; }
      body.low-perf-mode .sprite-idle,
      body.low-perf-mode .sprite-atk { animation:none!important; }

      #hero-hp-bar {
        transition: width 0.25s ease, background 0.4s ease, box-shadow 0.4s ease!important;
        will-change: width;
      }
      #monster-hp-bar {
        transition: width 0.25s ease!important;
        will-change: width;
      }
    `;
    document.head.appendChild(s);
  }

  // ── Fix principal: HP bar não atualizava ──────────────────
  function patchHpBars() {
    if (typeof rpg === 'undefined') return;
    const _orig = rpg.updateHpBars.bind(rpg);
    rpg.updateHpBars = function() {
      try { _orig(); } catch(e) {}
      const maxHp = Math.max(1, this.getMaxHp ? this.getMaxHp() : 100);
      const curHp = Math.max(0, this.heroHp || 0);
      const pct   = Math.min(100, Math.max(0, (curHp / maxHp) * 100));
      const bar   = document.getElementById('hero-hp-bar');
      const txt   = document.getElementById('hero-hp-text');
      if (bar) {
        bar.style.width = pct + '%';
        if (pct > 60)      { bar.style.background='linear-gradient(90deg,#059669,#34d399)'; bar.style.boxShadow='0 0 8px rgba(52,211,153,0.4)'; }
        else if (pct > 30) { bar.style.background='linear-gradient(90deg,#b45309,#fbbf24)'; bar.style.boxShadow='0 0 8px rgba(251,191,36,0.5)'; }
        else               { bar.style.background='linear-gradient(90deg,#991b1b,#ef4444)'; bar.style.boxShadow='0 0 10px rgba(239,68,68,0.7)'; }
      }
      if (txt) txt.innerText = Math.ceil(curHp) + ' / ' + Math.ceil(maxHp);
      if (this.monster) {
        const mMax = Math.max(1, this.monster.maxHp||1);
        const mCur = Math.max(0, this.monster.hp||0);
        const mPct = Math.min(100, Math.max(0,(mCur/mMax)*100));
        const mBar = document.getElementById('monster-hp-bar');
        const mTxt = document.getElementById('monster-hp-text');
        if (mBar) mBar.style.width = mPct + '%';
        if (mTxt) mTxt.innerText = Math.ceil(mCur) + ' / ' + Math.ceil(mMax);
      }
      const potBtn = document.getElementById('btn-potion-count');
      if (potBtn) potBtn.innerText = typeof formatNumber !== 'undefined' ? formatNumber(this.potions) : this.potions;
    };
    console.log('[MobileOptimizer] HP bar patched');
  }

  // ── Touch events ──────────────────────────────────────────
  function fixTouchEvents() {
    document.querySelectorAll('button,[onclick]').forEach(el => { el.style.touchAction='manipulation'; });
    new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => {
      if (n.nodeType===1) n.querySelectorAll?.('button,[onclick]').forEach(el => { el.style.touchAction='manipulation'; });
    }))).observe(document.body, { childList:true, subtree:true });
  }

  // ── Pausa auto-attack em background ──────────────────────
  function optimizeIntervals() {
    document.addEventListener('visibilitychange', () => {
      if (typeof rpg === 'undefined') return;
      if (document.hidden && rpg.autoInterval) { clearInterval(rpg.autoInterval); rpg._autoWasPaused = true; }
      else if (rpg._autoWasPaused) { rpg._autoWasPaused = false; if (rpg.autoOn && !rpg.autoInterval) rpg.startAutoAttack?.(); }
    });
  }

  function init() {
    injectCSS();
    fixTouchEvents();
    optimizeIntervals();
    patchHpBars();
    if (isLowEnd) setTimeout(enableLowPerf, 2000);
    console.log('[MobileOptimizer] OK — mobile:', isMobile, 'lowEnd:', isLowEnd);
  }

  function waitForRpg(cb, n) {
    if (typeof rpg !== 'undefined' && typeof rpg.updateHpBars === 'function') cb();
    else if ((n||0) < 50) setTimeout(() => waitForRpg(cb,(n||0)+1), 200);
    else { injectCSS(); fixTouchEvents(); }
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', () => waitForRpg(init))
    : waitForRpg(init);
})();
