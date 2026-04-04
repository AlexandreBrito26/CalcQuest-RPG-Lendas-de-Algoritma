// ═══════════════════════════════════════════════════════════════
// MODULE: combat-hud.js  —  v5 DEFINITIVO
// ─────────────────────────────────────────────────────────────
// ROOT CAUSE DO BUG:
//   As versões anteriores faziam hudPanel.innerHTML = `...`
//   recriando IDs como hero-hp-bar / monster-hp-bar que JÁ
//   existiam no HTML. O DOM ficava com IDs DUPLICADOS.
//   getElementById devolve sempre o PRIMEIRO — o do HTML original
//   que estava escondido dentro do painel substituído.
//   Resultado: updateHpBars actualizava uma barra invisible;
//   a barra do monstro nunca baixava.
//
// FIX DEFINITIVO:
//   1. Nunca tocar no innerHTML do painel HUD.
//   2. Nunca recriar elementos com IDs que já existem.
//   3. Apenas injectar CSS + estilizar elementos existentes.
//   4. Usar getElementById (nunca querySelector com classes
//      Tailwind que podem mudar ou já ter sido trocadas).
// ═══════════════════════════════════════════════════════════════
(function CombatHUDModule() {
  'use strict';

  function init() {
    injectCombatHUDStyles();
    styleExistingHUD();
    injectProfileButtonBattle();
    console.log('[CombatHUDModule v5] OK — IDs únicos preservados');
  }

  // ── 1. Estilizar o wrapper do painel sem tocar no innerHTML ─
  function styleExistingHUD() {
    // Usar getElementById nos elementos que sabemos que existem
    // NÃO usar querySelector com classes Tailwind
    const heroBar  = document.getElementById('hero-hp-bar');
    const monBar   = document.getElementById('monster-hp-bar');
    const furyBar  = document.getElementById('hero-fury-bar');
    const atbBar   = document.getElementById('monster-atb-bar');
    const heroTxt  = document.getElementById('hero-hp-text');
    const monTxt   = document.getElementById('monster-hp-text');
    const badge    = document.getElementById('battle-diff-badge');
    const heroName = document.getElementById('battle-hero-name');
    const monName  = document.getElementById('monster-name');
    const heroLvl  = document.getElementById('battle-hero-lvl');
    const monLvl   = document.getElementById('monster-lvl');

    // Encontrar o painel wrapper subindo pelo parentElement do heroBar
    // (seguro — não depende de classes que podem mudar)
    let hudPanel = heroBar;
    for (let i = 0; i < 4 && hudPanel; i++) {
      hudPanel = hudPanel.parentElement;
      // O painel certo é o que contém também o monster-hp-bar
      if (hudPanel && hudPanel.contains(monBar)) break;
    }

    if (hudPanel && hudPanel !== document.body) {
      // Adicionar APENAS a classe de layout — não substituir className
      // para não perder z-20 e outros estilos críticos
      hudPanel.classList.add('hud-compact-panel');
      // Remover apenas as classes de layout que conflituam
      hudPanel.classList.remove('bg-black/40', 'p-3');

      // Lados hero/monster — subir do heroBar para encontrar o div-pai lateral
      if (heroBar) {
        const heroSide = heroBar.closest ? heroBar.closest('[class*="w-\\[45"]') ||
          findAncestorWithin(heroBar, hudPanel, 1) : null;
        if (heroSide) heroSide.classList.add('hud-side', 'hud-hero-side');

        const monSide = monBar ? (monBar.closest ? monBar.closest('[class*="w-\\[45"]') ||
          findAncestorWithin(monBar, hudPanel, 1) : null) : null;
        if (monSide) monSide.classList.add('hud-side', 'hud-monster-side');
      }
    }

    // Aplicar classes visuais directamente pelos IDs — 100% seguro
    if (heroBar)  { heroBar.classList.add('hud-bar', 'hud-bar-hp'); styleBarTrack(heroBar.parentElement); }
    if (furyBar)  { furyBar.classList.add('hud-bar', 'hud-bar-fury'); styleBarTrack(furyBar.parentElement, true); }
    if (monBar)   { monBar.classList.add('hud-bar', 'hud-bar-monster'); styleBarTrack(monBar.parentElement); }
    if (atbBar)   { atbBar.classList.add('hud-bar', 'hud-bar-atb'); styleBarTrack(atbBar.parentElement, true); }
    if (heroTxt)  heroTxt.classList.add('hud-hp-text');
    if (monTxt)   { monTxt.classList.add('hud-hp-text', 'hud-hp-text-right'); }
    if (badge)    badge.classList.add('hud-diff');
    if (heroName) heroName.classList.add('hud-name', 'hud-name-hero');
    if (monName)  monName.classList.add('hud-name', 'hud-name-monster');
    if (heroLvl)  heroLvl.classList.add('hud-lvl');
    if (monLvl)   monLvl.classList.add('hud-lvl');
  }

  function styleBarTrack(el, thin) {
    if (!el) return;
    el.classList.add('hud-bar-track');
    if (thin) el.classList.add('hud-bar-track-thin');
  }

  // Encontra o filho directo de container que é ancestral de el
  function findAncestorWithin(el, container, depth) {
    let cur = el;
    for (let i = 0; i < 6 && cur && cur !== container; i++) {
      if (cur.parentElement === container) return cur;
      cur = cur.parentElement;
    }
    return null;
  }

  // ── 2. Botão de perfil na barra de combate ──────────────────
  function injectProfileButtonBattle() {
    const topBar = document.querySelector(
      '#game-container .flex.justify-between.items-center.mb-3'
    );
    if (!topBar) return;
    if (document.getElementById('battle-profile-btn')) return;

    const rightGroup = topBar.querySelector('.flex.gap-2');
    if (!rightGroup) return;

    const btn = document.createElement('button');
    btn.id        = 'battle-profile-btn';
    btn.className = 'battle-profile-btn';
    btn.title     = 'Perfil';
    btn.onclick   = () => { if (typeof openProfile === 'function') openProfile(); };
    btn.innerHTML = '<i data-lucide="user" style="width:12px;height:12px;"></i>';
    rightGroup.appendChild(btn);
    try { lucide.createIcons(); } catch(e) {}
  }

  // ── 3. CSS ──────────────────────────────────────────────────
  function injectCombatHUDStyles() {
    if (document.getElementById('combat-hud-styles')) return;
    const s = document.createElement('style');
    s.id = 'combat-hud-styles';
    s.textContent = `
      /* Painel HUD compacto */
      .hud-compact-panel {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        width: 100% !important;
        gap: 6px !important;
        background: rgba(0,0,0,0.55) !important;
        padding: 8px 10px !important;
        border-radius: 10px !important;
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255,255,255,0.06) !important;
        box-shadow: 0 8px 20px rgba(0,0,0,0.5) !important;
        min-width: 0;
        overflow: hidden;
        z-index: 20;
        position: relative;
      }

      /* Lados hero/monster */
      .hud-side {
        flex: 1 !important;
        min-width: 0 !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 3px !important;
      }
      .hud-monster-side { align-items: flex-end !important; }

      /* Nomes */
      .hud-name {
        font-family: 'Orbitron', sans-serif !important;
        font-size: 8.5px !important;
        font-weight: 800 !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        max-width: 90px !important;
        line-height: 1 !important;
        display: block !important;
      }
      .hud-name-hero    { color: #00e5ff !important; text-shadow: 0 0 8px rgba(0,229,255,0.5); }
      .hud-name-monster { color: #ff4d6a !important; text-shadow: 0 0 8px rgba(255,77,106,0.5); }

      /* Nível */
      .hud-lvl {
        font-family: 'Fira Code', monospace !important;
        font-size: 8px !important;
        color: rgba(180,180,200,0.9) !important;
        font-weight: 700 !important;
        white-space: nowrap !important;
        line-height: 1 !important;
        display: inline-block !important;
      }

      /* Tracks das barras */
      .hud-bar-track {
        width: 100% !important;
        height: 5px !important;
        background: rgba(0,0,0,0.7) !important;
        border-radius: 99px !important;
        overflow: hidden !important;
      }
      .hud-bar-track-thin { height: 3px !important; opacity: 0.85; }

      /* Barras */
      .hud-bar {
        height: 100% !important;
        border-radius: 99px !important;
        transition: width 0.3s ease !important;
      }
      .hud-bar-hp      { background: linear-gradient(90deg,#059669,#34d399) !important; box-shadow: 0 0 6px rgba(52,211,153,.5) !important; }
      .hud-bar-fury    { background: linear-gradient(90deg,#dc2626,#ffd60a) !important; }
      .hud-bar-monster { background: linear-gradient(270deg,#991b1b,#ef4444) !important; box-shadow: 0 0 6px rgba(239,68,68,.5) !important; }
      .hud-bar-atb     { background: #00e5ff !important; box-shadow: 0 0 5px #00e5ff !important; }

      /* Textos HP */
      .hud-hp-text {
        font-family: 'Fira Code', monospace !important;
        font-size: 8px !important;
        color: rgba(180,180,210,.85) !important;
        font-weight: 700 !important;
        line-height: 1 !important;
        display: block !important;
      }
      .hud-hp-text-right { text-align: right !important; }

      /* Badge dificuldade */
      .hud-diff {
        font-family: 'Fira Code', monospace !important;
        font-size: 7px !important;
        font-weight: 800 !important;
        color: #ffd60a !important;
        letter-spacing: 0.08em !important;
        line-height: 1 !important;
        white-space: nowrap !important;
        text-align: center !important;
        display: block !important;
      }

      /* Botão perfil */
      .battle-profile-btn {
        padding: 5px 7px;
        background: rgba(0,229,255,.08);
        border: 1px solid rgba(0,229,255,.25);
        border-radius: 8px;
        color: #00e5ff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all .15s;
      }
      .battle-profile-btn:hover {
        background: rgba(0,229,255,.18);
        box-shadow: 0 0 10px rgba(0,229,255,.2);
      }

      /* XP bar */
      #battle-xp-bar {
        background: linear-gradient(90deg,#1d4ed8,#00e5ff) !important;
        box-shadow: 0 0 10px rgba(0,229,255,.5) !important;
      }

      /* Arena sem overflow */
      #arena-container { overflow: hidden !important; }
    `;
    document.head.appendChild(s);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
