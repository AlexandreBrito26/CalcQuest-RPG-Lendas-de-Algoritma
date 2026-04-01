// ═══════════════════════════════════════════════════════════════
// MODULE: dungeon-fix.js
// Fix: Botão "Masmorra" não abre → proc-modal sem conteúdo HTML
// Fix: Todos os botões do sub-menu dungeon verificados
// Melhoria: feedback visual ao abrir dungeon
// ═══════════════════════════════════════════════════════════════
(function DungeonFixModule() {
  'use strict';

  function init() {
    fixProcModal();
    fixAllDungeonButtons();
    console.log('[DungeonFixModule] OK');
  }

  // ── 1. Injeta conteúdo no proc-modal que estava vazio ────────
  // O HTML tinha <div id="proc-modal"> mas fechava sem filho algum.
  // A função renderProcDungeon() procura por #procdungeon-body → criamos aqui.
  function fixProcModal() {
    const procModal = document.getElementById('proc-modal');
    if (!procModal) return;

    // Se já tem conteúdo interno (modal-content), não faz nada
    if (procModal.querySelector('.modal-content')) return;

    procModal.innerHTML = `
      <div class="modal-content glass-panel bg-zinc-900/90 w-11/12 max-w-md rounded-2xl p-6 shadow-2xl">
        <div class="flex justify-between items-center mb-3 border-b border-zinc-800 pb-3">
          <h2 class="text-xl font-black text-white flex items-center gap-2 uppercase tracking-widest">
            <i data-lucide="castle" class="w-6 h-6 text-emerald-400"></i> Masmorra
          </h2>
          <button onclick="closeModal('proc-modal')" class="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition text-zinc-400">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>
        <p class="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-4 text-center">
          Dungeons procedurais • Salas aleatórias • Recompensas únicas
        </p>
        <div id="procdungeon-body" class="max-h-[65vh] overflow-y-auto pr-1 pb-2 hide-scrollbar"></div>
      </div>
    `;

    try { lucide.createIcons(); } catch(e) {}
  }

  // ── 2. Corrige openProcDungeon para usar o modal correto ─────
  window.openProcDungeon = function() {
    // Garante que o modal tem conteúdo
    fixProcModal();

    try {
      if (typeof rpg !== 'undefined' && typeof rpg.renderProcDungeon === 'function') {
        rpg.renderProcDungeon();
      } else {
        // Fallback se renderProcDungeon não existir
        const body = document.getElementById('procdungeon-body');
        if (body && body.innerHTML === '') {
          body.innerHTML = `
            <div class="text-center py-8">
              <p class="text-4xl mb-3">🏰</p>
              <p class="text-zinc-400 text-sm">Sistema de Masmorra em carregamento...</p>
              <p class="text-zinc-600 text-xs mt-2">Tenta novamente após o jogo carregar completamente.</p>
            </div>
          `;
        }
      }
    } catch(e) {
      console.warn('[DungeonFixModule] renderProcDungeon error:', e);
    }

    const modal = document.getElementById('proc-modal');
    if (modal) {
      modal.classList.add('active');
      try { lucide.createIcons(); } catch(e) {}
    }
  };

  // ── 3. Verifica e corrige todos os botões do acc-dungeon ─────
  function fixAllDungeonButtons() {
    // openDailyDungeon — verifica existência
    if (typeof window.openDailyDungeon === 'undefined') {
      window.openDailyDungeon = function() {
        safeModalOpen(() => {
          if (rpg.renderDailyDungeon) rpg.renderDailyDungeon();
        }, 'dd-modal');
      };
    }

    // openMathMode — já definido mas garante fallback
    const _origMath = window.openMathMode;
    window.openMathMode = function() {
      try {
        if (_origMath) { _origMath(); return; }
        if (rpg.renderMathSetup) rpg.renderMathSetup();
        const m = document.getElementById('math-modal');
        if (m) m.classList.add('active');
      } catch(e) {
        console.warn('[DungeonFixModule] openMathMode:', e);
      }
    };

    // openEquilibrium — fallback se modal não existir
    if (typeof window.openEquilibrium === 'undefined' || !document.getElementById('equilibrium-modal')) {
      window.openEquilibrium = function() {
        // Cria modal on-the-fly se não existir
        let modal = document.getElementById('equilibrium-modal');
        if (!modal) {
          modal = document.createElement('div');
          modal.id = 'equilibrium-modal';
          modal.className = 'modal-overlay fixed inset-0 flex items-center justify-center';
          modal.innerHTML = `
            <div class="modal-content glass-panel bg-zinc-900/90 w-11/12 max-w-md rounded-2xl p-6 shadow-2xl">
              <div class="flex justify-between items-center mb-3 border-b border-zinc-800 pb-3">
                <h2 class="text-xl font-black text-white flex items-center gap-2 uppercase tracking-widest">
                  <i data-lucide="scale" class="w-6 h-6 text-indigo-400"></i> Equilíbrio
                </h2>
                <button onclick="closeModal('equilibrium-modal')" class="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition text-zinc-400">
                  <i data-lucide="x" class="w-5 h-5"></i>
                </button>
              </div>
              <div id="equilibrium-body" class="max-h-[65vh] overflow-y-auto pr-1 pb-2 hide-scrollbar">
                <div class="text-center py-8">
                  <p class="text-4xl mb-3">⚖️</p>
                  <p class="text-zinc-300 text-sm font-bold">Modo Equilíbrio</p>
                  <p class="text-zinc-500 text-xs mt-2">Em desenvolvimento. Disponível em breve.</p>
                </div>
              </div>
            </div>
          `;
          document.body.appendChild(modal);
        }
        try {
          if (rpg.renderEquilibrium) rpg.renderEquilibrium();
        } catch(e) {}
        modal.classList.add('active');
        try { lucide.createIcons(); } catch(e) {}
      };
    }
  }

  // ── Helper interno ───────────────────────────────────────────
  function safeModalOpen(renderFn, modalId) {
    try { renderFn(); } catch(e) { console.warn('[DungeonFixModule] render error:', e); }
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      try { lucide.createIcons(); } catch(e) {}
    } else {
      console.warn('[DungeonFixModule] Modal não encontrado:', modalId);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
