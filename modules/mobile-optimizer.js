// ═══════════════════════════════════════════════════════════════
// MODULE: mobile-optimizer.js  —  OTIMIZAÇÃO MOBILE COMPLETA v3
// ─────────────────────────────────────────────────────────────
// • Topbar mobile: localização + relógio em tempo real
// • Badge de talentos disponíveis no hero card
// • Botão Boss: mostra lock/skull conforme nível
// • Barra de XP visual no hero card
// • Grid de stats 3 colunas (ATK · HP · Ouro)
// • Throttle do updateMenu (1x/800ms) — fix principal do lag
// • Desativa blur, 3D, scanlines, sombras em mobile
// • FPS monitor: modo econômico automático se <28fps
// • Pausa auto-attack em background (visibilitychange)
// • Fix barra de HP que não atualizava na batalha
// ═══════════════════════════════════════════════════════════════
(function MobileOptimizerModule() {
  'use strict';

  const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent)
    || window.innerWidth <= 600
    || navigator.maxTouchPoints > 1;

  const isLowEnd = isMobile && (
    navigator.hardwareConcurrency <= 4 ||
    (navigator.deviceMemory && navigator.deviceMemory <= 3)
  );

  // ── FPS monitor ───────────────────────────────────────────
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
    console.log('[MobileOptimizer] Low-perf ON — FPS:', _fps);
  }
  window._toggleLowPerf = () => {
    _lowPerf = !_lowPerf;
    document.body.classList.toggle('low-perf-mode', _lowPerf);
    return _lowPerf;
  };
  window._isLowPerf = () => _lowPerf;

  // ── CSS de performance ────────────────────────────────────
  function injectCSS() {
    if (document.getElementById('mob-opt-css')) return;
    const s = document.createElement('style');
    s.id = 'mob-opt-css';
    s.textContent = `
      #hero-hp-bar {
        transition: width 0.25s ease, background 0.4s ease, box-shadow 0.4s ease !important;
        will-change: width;
      }
      #monster-hp-bar {
        transition: width 0.25s ease !important;
        will-change: width;
      }
      body.low-perf-mode .glass-panel { backdrop-filter:none!important;-webkit-backdrop-filter:none!important; }
      body.low-perf-mode .arena-bg-layer { mix-blend-mode:normal!important;opacity:0.4!important; }
      body.low-perf-mode body::after { display:none!important; }
      body.low-perf-mode .sprite-idle,
      body.low-perf-mode .sprite-atk { animation:none!important; }
      body.low-perf-mode .btn-3d { box-shadow:none!important;text-shadow:none!important; }
      body.low-perf-mode * { transition-duration:0.05s!important; }
    `;
    document.head.appendChild(s);
  }

  // ── Relógio em tempo real ─────────────────────────────────
  function startClock() {
    const el = document.getElementById('mob-clock');
    if (!el) return;
    function tick() {
      const d = new Date();
      const h = String(d.getHours()).padStart(2,'0');
      const m = String(d.getMinutes()).padStart(2,'0');
      el.textContent = h + ':' + m;
    }
    tick();
    setInterval(tick, 10000);
  }

  // ── Atualiza topbar mobile com localização do rpg ─────────
  function updateMobTopbar() {
    if (typeof rpg === 'undefined') return;
    const locEl = document.getElementById('mob-location-label');
    if (!locEl) return;
    // Tenta pegar o nome da região/localização atual
    const loc = rpg.currentRegion?.name
      || rpg.region?.name
      || rpg.locationName
      || rpg.currentZone
      || 'ALDEIA';
    locEl.textContent = '⚔ ' + (typeof loc === 'object' ? (loc.pt || loc.en || 'ALDEIA') : loc).toUpperCase();
  }

  // ── Badge de talentos disponíveis ─────────────────────────
  function updateTalentBadge() {
    if (!isMobile) return;
    const badge = document.getElementById('mob-talent-badge');
    const countEl = document.getElementById('mob-talent-count');
    if (!badge) return;
    const pts = (typeof rpg !== 'undefined') ? (rpg.talentPoints || 0) : 0;
    if (pts > 0) {
      badge.style.display = 'flex';
      if (countEl) countEl.textContent = pts;
    } else {
      badge.style.display = 'none';
    }
  }

  // ── Botão Boss: lock/skull conforme nível ─────────────────
  function updateBossBtn() {
    const btn = document.getElementById('btn-daily-boss');
    const lockIcon = document.getElementById('btn-boss-lock-icon');
    const skullIcon = document.getElementById('btn-boss-skull-icon');
    const reqLabel = document.getElementById('btn-boss-req');
    if (!btn || typeof rpg === 'undefined') return;

    const lvl = rpg.level || 1;
    const req = rpg.BOSS_LEVEL_REQ || 20;
    const unlocked = lvl >= req;

    if (unlocked) {
      btn.style.borderColor = 'rgba(239,68,68,0.3)';
      btn.style.color = '#fca5a5';
      if (lockIcon) lockIcon.style.display = 'none';
      if (skullIcon) skullIcon.style.display = 'inline';
      if (reqLabel) reqLabel.style.display = 'none';
    } else {
      btn.style.borderColor = 'rgba(255,255,255,0.06)';
      btn.style.color = 'rgba(113,113,122,1)';
      if (lockIcon) lockIcon.style.display = 'inline';
      if (skullIcon) skullIcon.style.display = 'none';
      if (reqLabel) { reqLabel.style.display = 'inline'; reqLabel.textContent = '· req. LVL ' + req; }
    }
  }

  // ── Barra de XP ───────────────────────────────────────────
  function updateXpBar() {
    const fill = document.getElementById('mob-xp-bar-fill');
    const txt  = document.getElementById('mob-xp-text');
    const nxt  = document.getElementById('mob-xp-next');
    if (!fill || typeof rpg === 'undefined') return;

    const lvl    = rpg.level || 1;
    const curXp  = rpg.xp || rpg.experience || 0;
    const xpNext = rpg.xpToNextLevel || rpg.getXpToNextLevel?.() || rpg.XP_TABLE?.[lvl] || (lvl * 100);
    const xpPrev = rpg.XP_TABLE?.[lvl - 1] || 0;
    const pct    = Math.min(100, Math.max(0, ((curXp - xpPrev) / Math.max(1, xpNext - xpPrev)) * 100));

    fill.style.width = pct.toFixed(1) + '%';
    if (txt) txt.textContent = 'XP ' + Math.round(pct) + '%';
    if (nxt) nxt.textContent = '→ LVL ' + (lvl + 1);
  }

  // ── Atualização completa da UI mobile ─────────────────────
  function refreshMobileUI() {
    updateTalentBadge();
    updateBossBtn();
    updateXpBar();
    updateMobTopbar();
  }

  // ── Fix HP bars ───────────────────────────────────────────
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
        const mMax = Math.max(1, this.monster.maxHp || 1);
        const mCur = Math.max(0, this.monster.hp || 0);
        const mPct = Math.min(100, Math.max(0, (mCur / mMax) * 100));
        const mBar = document.getElementById('monster-hp-bar');
        const mTxt = document.getElementById('monster-hp-text');
        if (mBar) mBar.style.width = mPct + '%';
        if (mTxt) mTxt.innerText = Math.ceil(mCur) + ' / ' + Math.ceil(mMax);
      }
      const potBtn = document.getElementById('btn-potion-count');
      if (potBtn) potBtn.innerText = typeof formatNumber !== 'undefined' ? formatNumber(this.potions) : this.potions;
      if (isMobile) refreshMobileUI();
    };
    console.log('[MobileOptimizer] HP bars patched');
  }

  // ── Throttle do updateMenu — fix principal do lag ─────────
  function optimizeMenuUpdates() {
    if (!isMobile || typeof rpg === 'undefined' || !rpg.updateMenu) return;
    let _throttle = null;
    const _orig = rpg.updateMenu.bind(rpg);
    rpg.updateMenu = function() {
      if (_throttle) return;
      _throttle = setTimeout(() => { _throttle = null; }, 800);
      _orig();
      refreshMobileUI();
    };
    console.log('[MobileOptimizer] updateMenu throttled 800ms');
  }

  // ── Touch events ──────────────────────────────────────────
  function fixTouchEvents() {
    document.querySelectorAll('button,[onclick]').forEach(el => {
      el.style.touchAction = 'manipulation';
    });
    new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => {
      if (n.nodeType === 1) n.querySelectorAll?.('button,[onclick]').forEach(el => {
        el.style.touchAction = 'manipulation';
      });
    }))).observe(document.body, { childList: true, subtree: true });
  }

  // ── Pausa auto-attack em background ──────────────────────
  function optimizeIntervals() {
    document.addEventListener('visibilitychange', () => {
      if (typeof rpg === 'undefined') return;
      if (document.hidden && rpg.autoInterval) {
        clearInterval(rpg.autoInterval);
        rpg._autoWasPaused = true;
      } else if (rpg._autoWasPaused) {
        rpg._autoWasPaused = false;
        if (rpg.autoOn && !rpg.autoInterval) rpg.startAutoAttack?.();
      }
    });
  }

  // ── INIT ─────────────────────────────────────────────────
  function init() {
    injectCSS();
    fixTouchEvents();
    optimizeIntervals();
    patchHpBars();
    optimizeMenuUpdates();
    startClock();
    // Atualiza UI mobile a cada 5s para badges e botão boss
    setInterval(refreshMobileUI, 5000);
    setTimeout(refreshMobileUI, 800);
    if (isLowEnd) setTimeout(enableLowPerf, 2000);
    console.log('[MobileOptimizer v3] OK — mobile:', isMobile, 'lowEnd:', isLowEnd);
  }

  function waitForRpg(cb, n) {
    if (typeof rpg !== 'undefined' && typeof rpg.updateHpBars === 'function') cb();
    else if ((n || 0) < 50) setTimeout(() => waitForRpg(cb, (n || 0) + 1), 200);
    else { injectCSS(); fixTouchEvents(); }
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', () => waitForRpg(init))
    : waitForRpg(init);

})();
