// ═══════════════════════════════════════════════════════════════
// MODULE: combat-hud.js
// Fix: HUD do combate quebrando linha → layout compacto inline
// Fix: botão de perfil fixo no topo direito da batalha
// Melhorias visuais gerais na arena de combate
// ═══════════════════════════════════════════════════════════════
(function CombatHUDModule() {
  'use strict';

  // ── Aguarda DOM pronto ──────────────────────────────────────
  function init() {
    fixCombatHUD();
    injectProfileButtonBattle();
    injectCombatHUDStyles();
    console.log('[CombatHUDModule] OK');
  }

  // ── 1. Reescreve o HUD superior do combate ──────────────────
  function fixCombatHUD() {
    const arena = document.getElementById('arena-container');
    if (!arena) return;

    // Encontra o painel de status (primeiro filho com bg-black/40)
    const hudPanel = arena.querySelector('.flex.justify-between.items-start.w-full');
    if (!hudPanel) return;

    // Substitui por layout compacto que nunca quebra linha
    hudPanel.className = 'hud-compact-panel';
    hudPanel.innerHTML = `
      <!-- HERO SIDE -->
      <div class="hud-side hud-hero-side">
        <div class="hud-name-row">
          <span class="hud-name hud-name-hero" id="battle-hero-name">Herói</span>
          <span class="hud-lvl" id="battle-hero-lvl">Lvl 1</span>
        </div>
        <div class="hud-bar-track">
          <div id="hero-hp-bar" class="hud-bar hud-bar-hp" style="width:100%"></div>
        </div>
        <div class="hud-bar-track hud-bar-track-thin">
          <div id="hero-fury-bar" class="hud-bar hud-bar-fury" style="width:0%"></div>
        </div>
        <div id="hero-hp-text" class="hud-hp-text">100 / 100</div>
      </div>

      <!-- CENTER -->
      <div class="hud-center">
        <div class="hud-vs">VS</div>
        <div id="battle-diff-badge" class="hud-diff">NORMAL</div>
      </div>

      <!-- MONSTER SIDE -->
      <div class="hud-side hud-monster-side">
        <div class="hud-name-row hud-name-row-right">
          <span class="hud-lvl" id="monster-lvl">Lvl 1</span>
          <span class="hud-name hud-name-monster" id="monster-name">Slime</span>
        </div>
        <div class="hud-bar-track">
          <div id="monster-hp-bar" class="hud-bar hud-bar-monster" style="width:100%"></div>
        </div>
        <div class="hud-bar-track hud-bar-track-thin">
          <div id="monster-atb-bar" class="hud-bar hud-bar-atb" style="width:0%"></div>
        </div>
        <div id="monster-hp-text" class="hud-hp-text hud-hp-text-right">100 / 100</div>
      </div>
    `;
  }

  // ── 2. Botão de perfil fixo no topo direito da batalha ──────
  function injectProfileButtonBattle() {
    // Adiciona no topo-bar do combate (linha com Fugir / Auto / Gold)
    const topBar = document.querySelector('#game-container .flex.justify-between.items-center.mb-3');
    if (!topBar) return;

    // Verifica se já existe
    if (document.getElementById('battle-profile-btn')) return;

    const rightGroup = topBar.querySelector('.flex.gap-2');
    if (!rightGroup) return;

    const profileBtn = document.createElement('button');
    profileBtn.id = 'battle-profile-btn';
    profileBtn.onclick = () => {
      if (typeof openProfile === 'function') openProfile();
    };
    profileBtn.className = 'battle-profile-btn';
    profileBtn.title = 'Perfil';
    profileBtn.innerHTML = `<i data-lucide="user" style="width:12px;height:12px;"></i>`;
    rightGroup.appendChild(profileBtn);

    try { lucide.createIcons(); } catch(e) {}
  }

  // ── 3. Estilos CSS do HUD compacto ──────────────────────────
  function injectCombatHUDStyles() {
    if (document.getElementById('combat-hud-styles')) return;

    const style = document.createElement('style');
    style.id = 'combat-hud-styles';
    style.textContent = `
      /* ══ HUD COMPACTO — nunca quebra linha ══ */
      .hud-compact-panel {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        gap: 6px;
        z-index: 20;
        background: rgba(0,0,0,0.55);
        padding: 8px 10px;
        border-radius: 10px;
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255,255,255,0.06);
        box-shadow: 0 8px 20px rgba(0,0,0,0.5);
        flex-shrink: 0;
        min-width: 0;
      }

      .hud-side {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 3px;
      }

      .hud-monster-side {
        align-items: flex-end;
      }

      .hud-name-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 4px;
        width: 100%;
      }

      .hud-name-row-right {
        flex-direction: row-reverse;
      }

      .hud-name {
        font-family: 'Orbitron', sans-serif;
        font-size: 8.5px !important;
        font-weight: 800;
        letter-spacing: 0.03em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 90px;
        line-height: 1;
      }

      .hud-name-hero  { color: #00e5ff !important; text-shadow: 0 0 8px rgba(0,229,255,0.5); }
      .hud-name-monster { color: #ff4d6a !important; text-shadow: 0 0 8px rgba(255,77,106,0.5); }

      .hud-lvl {
        font-family: 'Fira Code', monospace;
        font-size: 8px;
        color: rgba(180,180,200,0.9);
        font-weight: 700;
        white-space: nowrap;
        flex-shrink: 0;
        line-height: 1;
      }

      .hud-bar-track {
        width: 100%;
        height: 5px;
        background: rgba(0,0,0,0.7);
        border-radius: 99px;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.04);
      }

      .hud-bar-track-thin {
        height: 3px;
        opacity: 0.85;
      }

      .hud-bar {
        height: 100%;
        border-radius: 99px;
        transition: width 0.3s ease;
      }

      .hud-bar-hp      { background: linear-gradient(90deg, #059669, #34d399); box-shadow: 0 0 6px rgba(52,211,153,0.5); }
      .hud-bar-fury    { background: linear-gradient(90deg, #dc2626, #ffd60a); box-shadow: 0 0 6px rgba(255,214,10,0.4); }
      .hud-bar-monster { background: linear-gradient(270deg, #991b1b, #ef4444); box-shadow: 0 0 6px rgba(239,68,68,0.5); }
      .hud-bar-atb     { background: #00e5ff; box-shadow: 0 0 5px #00e5ff; }

      .hud-hp-text {
        font-family: 'Fira Code', monospace;
        font-size: 8px;
        color: rgba(180,180,210,0.85);
        font-weight: 700;
        line-height: 1;
        letter-spacing: 0.02em;
      }

      .hud-hp-text-right { text-align: right; }

      .hud-center {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 3px;
        flex-shrink: 0;
        padding: 0 4px;
      }

      .hud-vs {
        font-family: 'Orbitron', sans-serif;
        font-size: 8px;
        font-weight: 900;
        color: rgba(150,150,170,0.9);
        background: rgba(0,0,0,0.8);
        padding: 2px 6px;
        border-radius: 4px;
        border: 1px solid rgba(255,255,255,0.08);
        letter-spacing: 0.1em;
        line-height: 1;
      }

      .hud-diff {
        font-family: 'Fira Code', monospace;
        font-size: 7px;
        font-weight: 800;
        color: #ffd60a;
        letter-spacing: 0.08em;
        line-height: 1;
        white-space: nowrap;
        text-align: center;
      }

      /* ══ Botão de Perfil na batalha ══ */
      .battle-profile-btn {
        padding: 5px 7px;
        background: rgba(0,229,255,0.08);
        border: 1px solid rgba(0,229,255,0.25);
        border-radius: 8px;
        color: #00e5ff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.15s;
      }
      .battle-profile-btn:hover {
        background: rgba(0,229,255,0.18);
        box-shadow: 0 0 10px rgba(0,229,255,0.2);
      }

      /* ══ Correção: arena arena-box - garantir que o HUD não force overflow ══ */
      #arena-container {
        overflow: hidden !important;
      }

      /* ══ Melhoria geral: barra de XP mais nítida ══ */
      #battle-xp-bar {
        background: linear-gradient(90deg, #1d4ed8, #00e5ff) !important;
        box-shadow: 0 0 10px rgba(0,229,255,0.5) !important;
      }
    `;
    document.head.appendChild(style);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
