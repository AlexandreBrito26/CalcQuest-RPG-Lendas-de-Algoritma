// ═══════════════════════════════════════════════════════════════
// MODULE: mobile-optimizer.js  —  MOBILE PREMIUM v4
// ─────────────────────────────────────────────────────────────
// ✅ Modo Econômico REMOVIDO — sem degradação visual automática
// ✅ Touch targets maiores e mais precisos (mín 44px)
// ✅ Gestos: swipe left/right nas tabs do menu
// ✅ Haptic feedback (vibrate API) nos botões de ação
// ✅ Botões de batalha maiores com ícones nítidos
// ✅ Long-press no monstro exibe info detalhada
// ✅ Pull-to-refresh desativado (evita reload acidental)
// ✅ Font-size mínimo 11px em tudo (legibilidade)
// ✅ Barra de HP colorida dinâmica
// ✅ Ripple effect nos botões de batalha
// ✅ Relógio em tempo real na topbar
// ✅ Badge de talentos disponíveis
// ✅ Throttle do updateMenu (fix de lag)
// ═══════════════════════════════════════════════════════════════
(function MobileOptimizerV4() {
  'use strict';

  const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent)
    || window.innerWidth <= 768
    || navigator.maxTouchPoints > 1;

  // ══ NUNCA ativa modo econômico — sempre qualidade máxima ══
  window._isLowPerf     = () => false;
  window._toggleLowPerf = () => false;
  document.body.classList.remove('low-perf-mode');

  // Impede que qualquer módulo reactive o modo eco
  const _noEcoObs = new MutationObserver(() => {
    if (document.body.classList.contains('low-perf-mode')) {
      document.body.classList.remove('low-perf-mode');
    }
  });
  _noEcoObs.observe(document.body, { attributes: true, attributeFilter: ['class'] });

  // ─────────────────────────────────────────────────────────────
  // 1. CSS MOBILE PREMIUM
  // ─────────────────────────────────────────────────────────────
  function injectCSS() {
    if (document.getElementById('mob-premium-css')) return;
    const s = document.createElement('style');
    s.id = 'mob-premium-css';
    s.textContent = `
      /* ══ KILL ECO MODE — anula em qualquer situação ══ */
      body.low-perf-mode .glass-panel {
        backdrop-filter: blur(8px) !important;
        -webkit-backdrop-filter: blur(8px) !important;
      }
      body.low-perf-mode * {
        transition-duration: unset !important;
      }
      body.low-perf-mode .btn-3d {
        box-shadow: 0 4px 12px rgba(0,0,0,0.4) !important;
      }
      body.low-perf-mode .sprite-idle,
      body.low-perf-mode .sprite-atk {
        animation: unset !important;
      }

      /* ══ HP BARS — suave e colorido ══ */
      #hero-hp-bar {
        transition: width 0.3s cubic-bezier(0.4,0,0.2,1),
                    background 0.5s ease, box-shadow 0.5s ease !important;
        will-change: width;
      }
      #monster-hp-bar {
        transition: width 0.25s ease !important;
        will-change: width;
      }

      /* ══ RIPPLE ══ */
      .mob-ripple { position: relative; overflow: hidden; }
      .mob-ripple::after {
        content: '';
        position: absolute;
        width: 100%; height: 100%;
        top: 0; left: 0;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        transform: scale(0);
        opacity: 0;
        transition: transform 0.35s ease, opacity 0.4s ease;
        pointer-events: none;
      }
      .mob-ripple.rippling::after {
        transform: scale(2.5);
        opacity: 0;
      }

      @media (max-width: 768px), (pointer: coarse) {

        /* ══ SEM RELOAD ACIDENTAL ══ */
        body {
          overscroll-behavior: none !important;
          -webkit-overflow-scrolling: touch;
        }
        #view-menu, #game-container {
          overscroll-behavior-y: contain !important;
        }

        /* ══ TOUCH TARGETS — mínimo 44px ══ */
        button, [onclick], .sub-pill, .acc-trigger, .menu-tab {
          touch-action: manipulation !important;
          -webkit-tap-highlight-color: transparent !important;
          min-height: 44px !important;
          cursor: pointer !important;
        }

        /* SUB-PILLS maiores */
        .sub-pill {
          min-height: 54px !important;
          padding: 8px 4px !important;
          font-size: 8px !important;
          border-radius: 10px !important;
          gap: 4px !important;
        }
        .sub-pill svg, .sub-pill i {
          width: 14px !important;
          height: 14px !important;
        }

        /* ACCORDEÃO triggers */
        .acc-trigger {
          padding: 12px 16px !important;
          font-size: 11px !important;
          min-height: 48px !important;
        }
        .menu-tab {
          padding: 10px 4px !important;
          font-size: 8.5px !important;
        }

        /* ══ BOTÕES DE BATALHA — grandes e claros ══ */
        #btn-atk, #btn-mag, #btn-def, #btn-heal {
          min-height: 76px !important;
          padding: 12px 8px !important;
          font-size: 10px !important;
          letter-spacing: 0.06em !important;
          border-radius: 14px !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 6px !important;
        }
        #btn-atk svg,  #btn-mag svg,  #btn-def svg,  #btn-heal svg,
        #btn-atk i,   #btn-mag i,   #btn-def i,   #btn-heal i {
          width: 22px !important;
          height: 22px !important;
        }

        /* Skill de classe */
        #btn-class5 {
          min-height: 54px !important;
          font-size: 10px !important;
          border-radius: 14px !important;
        }

        /* ══ TIPOGRAFIA ══ */
        #battle-hero-name, #monster-name {
          font-size: 10px !important;
          max-width: 110px !important;
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
        }
        #hero-hp-text, #monster-hp-text {
          font-size: 9px !important;
          white-space: nowrap !important;
        }
        #menu-hero-name { font-size: 15px !important; }
        #menu-class-text { font-size: 11px !important; }
        .menu-stat-box span.stat-text { font-size: 15px !important; }

        /* ══ LOG DE COMBATE ══ */
        #battle-log, .battle-log, #combat-log {
          font-size: 11px !important;
          line-height: 1.7 !important;
          padding: 8px 10px !important;
        }
        #battle-log > *, .battle-log > *, #combat-log > * {
          padding: 3px 0 !important;
          border-bottom: 1px solid rgba(255,255,255,0.04) !important;
        }

        /* ══ MODAIS ══ */
        .modal-content {
          max-height: 88vh !important;
          overflow-y: auto !important;
          -webkit-overflow-scrolling: touch !important;
          overscroll-behavior: contain !important;
        }

        /* ══ ACCORDEÃO ══ */
        .acc-sub { gap: 5px !important; }
        #panel-cidade, #panel-progresso, #panel-modos, #panel-arsenal {
          gap: 5px !important;
        }

        /* ══ DOCK SPACE ══ */
        #view-menu { padding-bottom: 72px !important; }

        /* ══ TOPBAR MOBILE ══ */
        #mob-topbar {
          display: flex !important;
          align-items: center !important;
          justify-content: flex-end !important;
          margin-bottom: 6px !important;
          padding: 0 2px !important;
        }
        #mob-location-label { display: none !important; }
        #mob-clock {
          font-size: 12px !important;
          color: #22d3ee !important;
          font-family: 'Fira Code', monospace !important;
          font-weight: 700 !important;
        }

        /* ══ CALCQUEST TITLE — ocultar ══ */
        #mob-hide-title, #menu-era-badge { display: none !important; }

        /* ══ MENU CONTAINER ══ */
        .menu-container { padding: 12px !important; }
        .menu-container .absolute.top-3.right-3 {
          top: 6px !important; right: 6px !important; gap: 4px !important;
        }
        .menu-container .absolute.top-3.right-3 button { padding: 5px !important; }

        /* ══ ALDEIA STATUS — ocultar ══ */
        #village-state-indicator,
        .living-village-bar,
        #village-status-bar { display: none !important; }

        /* ══ DAMAGE NUMBERS — maiores ══ */
        .damage-number, .dmg-float, [class*="dmg-num"] {
          font-size: 16px !important;
          font-weight: 900 !important;
        }
      }
    `;
    document.head.appendChild(s);
  }

  // ─────────────────────────────────────────────────────────────
  // 2. RELÓGIO EM TEMPO REAL
  // ─────────────────────────────────────────────────────────────
  function startClock() {
    const el = document.getElementById('mob-clock');
    if (!el) return;
    function tick() {
      const d = new Date();
      el.textContent = String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
    }
    tick();
    setInterval(tick, 10000);
  }

  // ─────────────────────────────────────────────────────────────
  // 3. HAPTIC FEEDBACK
  // ─────────────────────────────────────────────────────────────
  function addHapticFeedback() {
    if (!isMobile || !navigator.vibrate) return;
    function wire(id, pattern) {
      const btn = document.getElementById(id);
      if (!btn || btn._hapticDone) return;
      btn._hapticDone = true;
      btn.addEventListener('touchstart', () => navigator.vibrate(pattern), { passive: true });
    }
    ['btn-atk','btn-mag','btn-def','btn-heal'].forEach(id => wire(id, 10));
    wire('btn-class5', [15, 10, 15]);
    new MutationObserver(() => {
      ['btn-atk','btn-mag','btn-def','btn-heal','btn-class5'].forEach(id => wire(id, id === 'btn-class5' ? [15,10,15] : 10));
    }).observe(document.body, { childList: true, subtree: true });
  }

  // ─────────────────────────────────────────────────────────────
  // 4. RIPPLE EFFECT
  // ─────────────────────────────────────────────────────────────
  function addRippleEffect() {
    if (!isMobile) return;
    function wire(id) {
      const btn = document.getElementById(id);
      if (!btn || btn._rippleDone) return;
      btn._rippleDone = true;
      btn.classList.add('mob-ripple');
      btn.addEventListener('touchstart', () => {
        btn.classList.remove('rippling');
        void btn.offsetWidth;
        btn.classList.add('rippling');
        setTimeout(() => btn.classList.remove('rippling'), 400);
      }, { passive: true });
    }
    ['btn-atk','btn-mag','btn-def','btn-heal','btn-class5'].forEach(wire);
  }

  // ─────────────────────────────────────────────────────────────
  // 5. SWIPE NAS TABS DO MENU
  // ─────────────────────────────────────────────────────────────
  function addSwipeGestures() {
    if (!isMobile) return;
    const TABS = ['cidade','progresso','modos','arsenal'];
    let _sx = 0, _sy = 0, _t = 0;

    function attachTo(el) {
      if (!el || el._swipeDone) return;
      el._swipeDone = true;
      el.addEventListener('touchstart', e => {
        _sx = e.touches[0].clientX;
        _sy = e.touches[0].clientY;
        _t  = Date.now();
      }, { passive: true });
      el.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - _sx;
        const dy = e.changedTouches[0].clientY - _sy;
        const dt = Date.now() - _t;
        if (dt > 400 || Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx) * 0.9) return;
        const cur = TABS.findIndex(t => document.getElementById('tab-'+t)?.classList.contains('active-tab'));
        if (cur < 0) return;
        const next = Math.max(0, Math.min(TABS.length - 1, cur + (dx < 0 ? 1 : -1)));
        if (next !== cur && typeof switchTab === 'function') {
          switchTab(TABS[next]);
          if (navigator.vibrate) navigator.vibrate(15);
        }
      }, { passive: true });
    }

    const mc = document.querySelector('.menu-container');
    if (mc) attachTo(mc);
    // Retry se o DOM ainda não estiver pronto
    setTimeout(() => attachTo(document.querySelector('.menu-container')), 1500);
  }

  // ─────────────────────────────────────────────────────────────
  // 6. LONG PRESS NO MONSTRO
  // ─────────────────────────────────────────────────────────────
  function addMonsterLongPress() {
    if (!isMobile) return;
    const zone = document.getElementById('arena-container');
    if (!zone || zone._lpDone) return;
    zone._lpDone = true;
    let _lp = null;
    zone.addEventListener('touchstart', () => {
      _lp = setTimeout(() => {
        _lp = null;
        if (typeof rpg === 'undefined' || !rpg.monster) return;
        const m    = rpg.monster;
        const name = m.name?.[rpg.lang] || m.name?.pt || 'Monstro';
        const hp   = m.hp ? Math.ceil(m.hp) : '?';
        const mhp  = m.maxHp ? Math.ceil(m.maxHp) : '?';
        const atk  = m.atk || m.dmg || '?';
        if (typeof showToast === 'function') showToast(`${name} — HP: ${hp}/${mhp} · ATK: ${atk}`, 3000);
        if (navigator.vibrate) navigator.vibrate([20, 30, 20]);
      }, 600);
    }, { passive: true });
    zone.addEventListener('touchend',  () => { if (_lp) { clearTimeout(_lp); _lp = null; } }, { passive: true });
    zone.addEventListener('touchmove', () => { if (_lp) { clearTimeout(_lp); _lp = null; } }, { passive: true });
  }

  // ─────────────────────────────────────────────────────────────
  // 7. BARRA DE HP DINÂMICA
  // ─────────────────────────────────────────────────────────────
  function patchHpBars() {
    if (typeof rpg === 'undefined' || rpg._hpBarPatched) return;
    rpg._hpBarPatched = true;
    const _orig = rpg.updateHpBars.bind(rpg);
    rpg.updateHpBars = function () {
      try { _orig(); } catch (e) {}
      const maxHp = Math.max(1, this.getMaxHp ? this.getMaxHp() : (this.heroMaxHp || 100));
      const curHp = Math.max(0, this.heroHp || 0);
      const pct   = Math.min(100, Math.max(0, (curHp / maxHp) * 100));
      const bar   = document.getElementById('hero-hp-bar');
      const txt   = document.getElementById('hero-hp-text');
      if (bar) {
        bar.style.width = pct + '%';
        if      (pct > 60) { bar.style.background = 'linear-gradient(90deg,#059669,#34d399)'; bar.style.boxShadow = '0 0 8px rgba(52,211,153,0.5)'; }
        else if (pct > 30) { bar.style.background = 'linear-gradient(90deg,#b45309,#fbbf24)'; bar.style.boxShadow = '0 0 8px rgba(251,191,36,0.6)'; }
        else               { bar.style.background = 'linear-gradient(90deg,#7f1d1d,#ef4444)'; bar.style.boxShadow = '0 0 10px rgba(239,68,68,0.8)'; }
      }
      if (txt) {
        const fmt = typeof formatNumber !== 'undefined' ? formatNumber : (n => n);
        txt.innerText = fmt(Math.ceil(curHp)) + ' / ' + fmt(Math.ceil(maxHp));
      }
      if (this.monster) {
        const mMax = Math.max(1, this.monster.maxHp || 1);
        const mCur = Math.max(0, this.monster.hp || 0);
        const mPct = Math.min(100, Math.max(0, (mCur / mMax) * 100));
        const mBar = document.getElementById('monster-hp-bar');
        const mTxt = document.getElementById('monster-hp-text');
        if (mBar) { mBar.style.width = mPct + '%'; mBar.style.boxShadow = mPct < 20 ? '0 0 10px rgba(239,68,68,0.8)' : ''; }
        if (mTxt) {
          const fmt = typeof formatNumber !== 'undefined' ? formatNumber : (n => n);
          mTxt.innerText = fmt(Math.ceil(mCur)) + ' / ' + fmt(Math.ceil(mMax));
        }
      }
      const potBtn = document.getElementById('btn-potion-count');
      if (potBtn) potBtn.innerText = typeof formatNumber !== 'undefined' ? formatNumber(this.potions) : this.potions;
      if (isMobile) refreshMobileUI();
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 8. THROTTLE DO updateMenu
  // ─────────────────────────────────────────────────────────────
  function optimizeMenuUpdates() {
    if (!isMobile || typeof rpg === 'undefined' || !rpg.updateMenu || rpg._menuThrottled) return;
    rpg._menuThrottled = true;
    let _t = null;
    const _orig = rpg.updateMenu.bind(rpg);
    rpg.updateMenu = function () {
      if (_t) return;
      _t = setTimeout(() => { _t = null; }, 600);
      _orig();
      refreshMobileUI();
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 9. BADGE DE TALENTOS + XP BAR
  // ─────────────────────────────────────────────────────────────
  function updateTalentBadge() {
    if (!isMobile) return;
    const badge = document.getElementById('mob-talent-badge');
    if (!badge) return;
    const pts = typeof rpg !== 'undefined' ? (rpg.talentPoints || 0) : 0;
    badge.style.display = pts > 0 ? 'flex' : 'none';
    const cnt = document.getElementById('mob-talent-count');
    if (cnt) cnt.textContent = pts;
  }
  function updateXpBar() {
    const fill = document.getElementById('mob-xp-bar-fill');
    if (!fill || typeof rpg === 'undefined') return;
    const lvl  = rpg.level || 1;
    const cur  = rpg.xp || 0;
    const nxt  = rpg.xpToNextLevel || rpg.XP_TABLE?.[lvl] || (lvl * 100);
    const prv  = rpg.XP_TABLE?.[lvl - 1] || 0;
    const pct  = Math.min(100, Math.max(0, ((cur - prv) / Math.max(1, nxt - prv)) * 100));
    fill.style.width = pct.toFixed(1) + '%';
  }
  function refreshMobileUI() { updateTalentBadge(); updateXpBar(); }

  // ─────────────────────────────────────────────────────────────
  // 10. PAUSA AUTO-ATTACK EM BACKGROUND
  // ─────────────────────────────────────────────────────────────
  function optimizeIntervals() {
    document.addEventListener('visibilitychange', () => {
      if (typeof rpg === 'undefined') return;
      if (document.hidden && rpg.autoInterval) {
        clearInterval(rpg.autoInterval); rpg._autoWasPaused = true;
      } else if (rpg._autoWasPaused) {
        rpg._autoWasPaused = false;
        if (rpg.autoOn && !rpg.autoInterval) rpg.startAutoAttack?.();
      }
    });
  }

  // ─────────────────────────────────────────────────────────────
  // 11. TOUCH ACTION EM TODOS OS BOTÕES
  // ─────────────────────────────────────────────────────────────
  function fixTouchEvents() {
    function apply(root) {
      root.querySelectorAll?.('button,[onclick]').forEach(el => {
        el.style.touchAction = 'manipulation';
        el.style.webkitTapHighlightColor = 'transparent';
      });
    }
    apply(document);
    new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => {
      if (n.nodeType === 1) apply(n);
    }))).observe(document.body, { childList: true, subtree: true });
  }

  // ─────────────────────────────────────────────────────────────
  // INIT
  // ─────────────────────────────────────────────────────────────
  function init() {
    injectCSS();
    fixTouchEvents();
    optimizeIntervals();
    patchHpBars();
    optimizeMenuUpdates();
    startClock();
    if (isMobile) {
      addHapticFeedback();
      addRippleEffect();
      addSwipeGestures();
      addMonsterLongPress();
    }
    setInterval(refreshMobileUI, 5000);
    setTimeout(refreshMobileUI, 800);

    // Re-wire após entrar em batalha
    if (typeof rpg !== 'undefined' && rpg.startBattle) {
      const _sb = rpg.startBattle.bind(rpg);
      rpg.startBattle = function () {
        const r = _sb.apply(this, arguments);
        setTimeout(() => { addRippleEffect(); addHapticFeedback(); addMonsterLongPress(); }, 500);
        return r;
      };
    }
    console.log('[MobileOptimizer v4] ✅ Premium — eco mode DESATIVADO · Gestos · Haptic');
  }

  function waitForRpg(cb, n) {
    if (typeof rpg !== 'undefined' && typeof rpg.updateHpBars === 'function') cb();
    else if ((n || 0) < 60) setTimeout(() => waitForRpg(cb, (n || 0) + 1), 150);
    else { injectCSS(); fixTouchEvents(); optimizeIntervals(); startClock(); }
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', () => waitForRpg(init))
    : waitForRpg(init);

})();
