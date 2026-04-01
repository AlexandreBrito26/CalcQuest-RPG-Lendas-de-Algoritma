// ═══════════════════════════════════════════════════════════════
// MODULE: ui-improvements.js
// Melhoria: Visual geral do jogo — menu, animações, polish
// Melhoria: Battle log mais legível e compacto
// Melhoria: Botões de ação com feedback melhor
// Melhoria: Status effects visualmente mais claros
// ═══════════════════════════════════════════════════════════════
(function UIImprovementsModule() {
  'use strict';

  function init() {
    injectGlobalStyles();
    improveMenuLayout();
    improveBattleLog();
    improveBattleButtons();
    improveToastSystem();
    console.log('[UIImprovementsModule] OK');
  }

  // ── 1. Estilos globais de melhoria ──────────────────────────
  function injectGlobalStyles() {
    if (document.getElementById('ui-improvements-styles')) return;

    const style = document.createElement('style');
    style.id = 'ui-improvements-styles';
    style.textContent = `
      /* ══ MENU: acordeão com animação suave ══ */
      .acc-sub {
        overflow: hidden;
        max-height: 0;
        opacity: 0;
        transition: max-height 0.28s cubic-bezier(0.4,0,0.2,1),
                    opacity 0.22s ease,
                    margin-top 0.2s ease;
        margin-top: 0;
      }
      .acc-sub.open {
        max-height: 200px;
        opacity: 1;
        margin-top: 4px;
      }

      /* ══ MENU: hero card — borda com gradiente animado quando nível alto ══ */
      #view-menu .rounded-2xl.p-3.mb-4 {
        position: relative;
        overflow: hidden;
      }

      /* ══ BATTLE LOG: mais compacto e legível ══ */
      #battle-log {
        max-height: 52px !important;
        overflow-y: auto !important;
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
        display: flex;
        flex-direction: column-reverse;
        gap: 1px;
        padding: 6px 8px !important;
        font-size: 9px !important;
        font-family: 'Fira Code', monospace !important;
        background: rgba(0,0,0,0.5) !important;
        border: 1px solid rgba(0,229,255,0.06) !important;
        border-radius: 8px !important;
      }
      #battle-log::-webkit-scrollbar { display: none; }

      #battle-log > * {
        animation: logFadeIn 0.2s ease;
      }
      @keyframes logFadeIn {
        from { opacity: 0; transform: translateY(4px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      /* ══ BATTLE BUTTONS: grade 2x2 mais espaçada com hover melhor ══ */
      #btn-atk, #btn-mag, #btn-def, #btn-heal {
        min-height: 58px !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 4px !important;
        padding: 8px 4px !important;
        border-radius: 14px !important;
        transition: transform 0.1s ease, filter 0.15s ease, box-shadow 0.15s ease !important;
      }
      #btn-atk:not(:disabled):hover,
      #btn-mag:not(:disabled):hover,
      #btn-def:not(:disabled):hover,
      #btn-heal:not(:disabled):hover {
        transform: translateY(-2px) !important;
        filter: brightness(1.15) !important;
      }
      #btn-atk:not(:disabled):active,
      #btn-mag:not(:disabled):active,
      #btn-def:not(:disabled):active,
      #btn-heal:not(:disabled):active {
        transform: translateY(3px) !important;
      }

      /* ══ SKILL DE CLASSE: destaque maior ══ */
      #btn-class5 {
        min-height: 44px !important;
        letter-spacing: 0.12em !important;
        font-size: 9px !important;
        transition: transform 0.1s ease, filter 0.15s ease !important;
      }
      #btn-class5:not(:disabled):hover {
        transform: translateY(-2px) !important;
        filter: brightness(1.2) !important;
      }

      /* ══ STATUS EFFECTS: chips mais bonitos ══ */
      #status-effects-bar > * {
        font-size: 9px !important;
        padding: 2px 6px !important;
        border-radius: 6px !important;
        border: 1px solid !important;
        font-family: 'Fira Code', monospace !important;
        font-weight: 700 !important;
        animation: statusIn 0.25s ease !important;
      }
      @keyframes statusIn {
        from { transform: scale(0.7); opacity: 0; }
        to   { transform: scale(1);   opacity: 1; }
      }

      /* ══ MODAL: entrada com animação ══ */
      .modal-overlay {
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease;
      }
      .modal-overlay.active {
        opacity: 1;
        pointer-events: all;
      }
      .modal-overlay.active .modal-content {
        animation: modalSlideIn 0.22s cubic-bezier(0.34,1.3,0.64,1);
      }
      @keyframes modalSlideIn {
        from { transform: translateY(20px) scale(0.97); opacity: 0; }
        to   { transform: translateY(0) scale(1);       opacity: 1; }
      }

      /* ══ TOAST melhorado ══ */
      #general-toast {
        font-family: 'Orbitron', sans-serif !important;
        font-size: 9px !important;
        letter-spacing: 0.08em !important;
        padding: 10px 18px !important;
        border-radius: 10px !important;
        box-shadow: 0 8px 24px rgba(0,0,0,0.7), 0 0 20px rgba(0,229,255,0.1) !important;
        backdrop-filter: blur(12px) !important;
      }

      /* ══ TABS: indicador ativo mais nítido ══ */
      .menu-tab {
        position: relative;
        transition: color 0.15s, background 0.15s !important;
      }
      .active-tab {
        background: rgba(0,229,255,0.09) !important;
        color: #00e5ff !important;
      }

      /* ══ SUB-PILLS: micro-animação ══ */
      .sub-pill {
        transition: all 0.15s ease !important;
      }
      .sub-pill:active {
        transform: scale(0.94) !important;
      }

      /* ══ Botão Fugir: mais visível ══ */
      #btn-flee {
        font-family: 'Orbitron', sans-serif !important;
        font-size: 8.5px !important;
        letter-spacing: 0.08em !important;
      }
      #btn-flee:hover {
        background: rgba(153,27,27,0.4) !important;
        border-color: rgba(220,38,38,0.4) !important;
        color: #fca5a5 !important;
      }

      /* ══ Botão Auto: feedback quando ativo ══ */
      #btn-auto-atk.auto-atk-active {
        background: rgba(0,229,255,0.12) !important;
        border-color: rgba(0,229,255,0.45) !important;
        color: #00e5ff !important;
        animation: autoGlow 1.5s infinite alternate !important;
      }

      /* ══ Combo display mais dramático ══ */
      #combo-display {
        text-shadow:
          0 0 20px rgba(251,191,36,0.8),
          0 2px 0 #000,
          -1px 0 0 #000,
          1px 0 0 #000 !important;
      }

      /* ══ XP bar label ══ */
      .flex.justify-between.text-\\[9px\\] {
        font-family: 'Orbitron', sans-serif !important;
      }

      /* ══ Level up toast centrado ══ */
      #level-up-toast {
        left: 50% !important;
        transform: translateX(-50%) !important;
      }
      #level-up-toast.opacity-0 {
        transform: translateX(-50%) translateY(-10px) !important;
      }
    `;
    document.head.appendChild(style);
  }

  // ── 2. Pequenas melhorias no menu ───────────────────────────
  function improveMenuLayout() {
    // Adiciona animação hover nos stat boxes do hero card
    document.querySelectorAll('.menu-stat-box').forEach(box => {
      box.style.cursor = 'default';
    });
  }

  // ── 3. Battle log: limita histórico a 6 linhas ──────────────
  function improveBattleLog() {
    const log = document.getElementById('battle-log');
    if (!log) return;

    // Observer para limitar entradas
    const obs = new MutationObserver(() => {
      const children = Array.from(log.children);
      if (children.length > 6) {
        // Remove os mais antigos
        children.slice(6).forEach(c => c.remove());
      }
    });
    obs.observe(log, { childList: true });
  }

  // ── 4. Melhora botões de combate com ícones ─────────────────
  function improveBattleButtons() {
    // Aguarda o DOM do combate estar pronto
    const check = setInterval(() => {
      const atk = document.getElementById('btn-atk');
      if (!atk) return;
      clearInterval(check);

      // Adiciona data-tooltip com cooldown info
      const buttons = [
        { id: 'btn-atk',  tooltip: 'Ataque básico' },
        { id: 'btn-mag',  tooltip: 'Magia — usa mana' },
        { id: 'btn-def',  tooltip: 'Defender — reduz dano' },
        { id: 'btn-heal', tooltip: 'Curar — usa poção' },
      ];
      buttons.forEach(b => {
        const el = document.getElementById(b.id);
        if (el && !el.title) el.title = b.tooltip;
      });
    }, 500);
  }

  // ── 5. Toast system melhorado ────────────────────────────────
  function improveToastSystem() {
    // Patch showToast para suportar tipos (success, error, warning, info)
    const _origToast = window.showToast;
    window.showToast = function(msg, duration, type) {
      if (_origToast) _origToast(msg, duration || 3000);

      // Cor extra baseada no tipo
      const toast = document.getElementById('general-toast');
      if (!toast) return;

      // Reset
      toast.style.borderColor = '';
      toast.style.boxShadow   = '';

      if (type === 'error') {
        toast.style.borderColor = 'rgba(220,38,38,0.5)';
        toast.style.boxShadow   = '0 8px 24px rgba(0,0,0,0.7), 0 0 20px rgba(220,38,38,0.2)';
      } else if (type === 'success') {
        toast.style.borderColor = 'rgba(52,211,153,0.5)';
        toast.style.boxShadow   = '0 8px 24px rgba(0,0,0,0.7), 0 0 20px rgba(52,211,153,0.2)';
      }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
