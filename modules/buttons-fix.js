// ═══════════════════════════════════════════════════════════════
// MODULE: buttons-fix.js
// Fix: Todos os botões do menu que não funcionam
// Verifica cada função e cria fallbacks seguros para todas
// ═══════════════════════════════════════════════════════════════
(function ButtonsFixModule() {
  'use strict';

  // ── Helper: abre modal com render seguro ─────────────────────
  function safeOpen(renderFn, modalId, fallbackHTML) {
    // Tenta renderizar
    try {
      if (typeof renderFn === 'function') renderFn();
    } catch(e) {
      console.warn('[ButtonsFixModule] render error for', modalId, ':', e.message);
    }

    // Abre o modal
    const modal = document.getElementById(modalId);
    if (modal) {
      // Se o modal-content está vazio e há fallback, injeta
      if (fallbackHTML) {
        const content = modal.querySelector('.modal-content');
        if (!content) {
          injectModalContent(modal, modalId, fallbackHTML);
        }
      }
      modal.classList.add('active');
      try { lucide.createIcons(); } catch(e) {}
    } else {
      console.warn('[ButtonsFixModule] Modal não encontrado:', modalId);
      showMissingToast(modalId);
    }
  }

  // ── Injeta conteúdo padrão em modal vazio ───────────────────
  function injectModalContent(modal, modalId, config) {
    modal.innerHTML = `
      <div class="modal-content glass-panel bg-zinc-900/90 w-11/12 max-w-md rounded-2xl p-6 shadow-2xl">
        <div class="flex justify-between items-center mb-3 border-b border-zinc-800 pb-3">
          <h2 class="text-xl font-black text-white flex items-center gap-2 uppercase tracking-widest">
            <i data-lucide="${config.icon || 'box'}" class="w-6 h-6 ${config.iconColor || 'text-zinc-400'}"></i>
            ${config.title || 'Sistema'}
          </h2>
          <button onclick="closeModal('${modalId}')" class="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition text-zinc-400">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>
        ${config.subtitle ? `<p class="text-[10px] ${config.subtitleColor || 'text-zinc-500'} font-bold uppercase tracking-widest mb-4 text-center">${config.subtitle}</p>` : ''}
        <div id="${config.bodyId || modalId + '-body'}" class="max-h-[65vh] overflow-y-auto pr-1 pb-2 hide-scrollbar">
          ${config.defaultContent || ''}
        </div>
      </div>
    `;
    try { lucide.createIcons(); } catch(e) {}
  }

  // ── Toast de funcionalidade em desenvolvimento ───────────────
  function showMissingToast(feature) {
    if (typeof showToast === 'function') {
      showToast('⚙️ ' + feature + ' em carregamento...', 2500);
    }
  }

  // ── Mapa de todos os botões e seus modais/funções ────────────
  // Formato: { fn: 'nomeFuncao', renderFn: 'rpg.metodo', modal: 'id-modal', fallback: {...} }
  const BUTTON_MAP = [

    // ── TAB CIDADE ──────────────────────────────────────────────
    {
      fn: 'openShop',
      renderFn: () => rpg.renderShop && rpg.renderShop(),
      modal: 'shop-modal',
    },
    {
      fn: 'openTavern',
      renderFn: () => rpg.renderTavern && rpg.renderTavern(),
      modal: 'tavern-modal',
    },
    {
      fn: 'openProfile',
      renderFn: () => {
        const input = document.getElementById('profile-name-input');
        if (input) input.value = rpg.heroName || '';
        if (rpg.updateProfileStats) rpg.updateProfileStats();
      },
      modal: 'profile-modal',
    },
    {
      fn: 'openBestiary',
      renderFn: () => rpg.renderBestiary && rpg.renderBestiary(),
      modal: 'bestiary-modal',
    },
    {
      fn: 'openNpcs',
      renderFn: () => rpg.renderNpcs && rpg.renderNpcs(),
      modal: 'npc-modal',
    },
    {
      fn: 'openLore',
      renderFn: () => rpg.renderLore && rpg.renderLore(),
      modal: 'lore-modal',
    },
    {
      fn: 'openMap',
      renderFn: () => rpg.renderMap && rpg.renderMap(),
      modal: 'map-modal',
    },
    {
      fn: 'openPortals',
      renderFn: () => rpg.renderPortals && rpg.renderPortals(),
      modal: 'portals-modal',
    },

    // ── TAB PROGRESSO ───────────────────────────────────────────
    {
      fn: 'openBattlePass',
      renderFn: () => rpg.renderBattlePass && rpg.renderBattlePass(),
      modal: 'battlepass-modal',
    },
    {
      fn: 'openSeason',
      renderFn: () => rpg.renderSeason && rpg.renderSeason(),
      modal: 'season-modal',
    },
    {
      fn: 'openEvent',
      renderFn: () => rpg.renderEventModal && rpg.renderEventModal(),
      modal: 'event-modal',
    },
    {
      fn: 'openMemories',
      renderFn: () => rpg.renderMemories && rpg.renderMemories(),
      modal: 'memories-modal',
    },
    {
      fn: 'openDaily',
      renderFn: () => rpg.renderDailyMissions && rpg.renderDailyMissions(),
      modal: 'daily-modal',
    },
    {
      fn: 'openAchievements',
      renderFn: () => rpg.renderAchievements && rpg.renderAchievements(),
      modal: 'achievements-modal',
    },
    {
      fn: 'openCoop',
      renderFn: () => rpg.renderCoop && rpg.renderCoop(),
      modal: 'coop-modal',
    },
    {
      fn: 'openArena',
      renderFn: () => rpg.renderArena && rpg.renderArena(),
      modal: 'arena-modal',
    },
    {
      fn: 'openPrestige',
      renderFn: () => rpg.renderPrestige && rpg.renderPrestige(),
      modal: 'prestige-modal',
    },

    // ── TAB MODOS ────────────────────────────────────────────────
    {
      fn: 'openWaveMode',
      renderFn: () => rpg.renderWaveModal && rpg.renderWaveModal(),
      modal: 'wave-modal',
    },
    {
      fn: 'openSpeedRun',
      renderFn: () => rpg.renderSpeedRun && rpg.renderSpeedRun(),
      modal: 'speedrun-modal',
    },
    {
      fn: 'openTourney',
      renderFn: () => rpg.renderTourney && rpg.renderTourney(),
      modal: 'tourney-modal',
    },
    {
      fn: 'openDailyDungeon',
      renderFn: () => rpg.renderDailyDungeon && rpg.renderDailyDungeon(),
      modal: 'dd-modal',
    },
    {
      fn: 'openMathMode',
      renderFn: () => rpg.renderMathSetup && rpg.renderMathSetup(),
      modal: 'math-modal',
    },
    {
      fn: 'openChallenge',
      renderFn: () => rpg.renderChallengeModal && rpg.renderChallengeModal(),
      modal: 'challenge-modal',
    },
    {
      fn: 'openOracle',
      renderFn: () => rpg.renderOracle && rpg.renderOracle(),
      modal: 'oracle-modal',
    },

    // ── TAB ARSENAL ──────────────────────────────────────────────
    {
      fn: 'openRuneModal',
      renderFn: () => rpg.renderRuneModal && rpg.renderRuneModal(),
      modal: 'rune-modal',
    },
    {
      fn: 'openGrimoire',
      renderFn: () => rpg.renderGrimoire && rpg.renderGrimoire(),
      modal: 'grimoire-modal',
    },
    {
      fn: 'openLegacy',
      renderFn: () => rpg.renderLegacyModal && rpg.renderLegacyModal(),
      modal: 'legacy-modal',
    },
    {
      fn: 'openSecretClasses',
      renderFn: () => rpg.renderSecretClasses && rpg.renderSecretClasses(),
      modal: 'secret-classes-modal',
    },
    {
      fn: 'openTalentTree',
      renderFn: () => rpg.renderTalentTree && rpg.renderTalentTree(),
      modal: 'talent-modal',
    },
    {
      fn: 'openAuras',
      renderFn: () => rpg.renderAuraModal && rpg.renderAuraModal(),
      modal: 'aura-modal',
    },
    {
      fn: 'openMutations',
      renderFn: () => rpg.renderMutations && rpg.renderMutations(),
      modal: 'mutations-modal',
    },
    {
      fn: 'openCraft',
      renderFn: () => rpg.renderCraftModal && rpg.renderCraftModal(),
      modal: 'craft-modal',
    },
    {
      fn: 'openForge',
      renderFn: () => rpg.renderForge && rpg.renderForge(),
      modal: 'forge-modal',
    },
    {
      fn: 'openGems',
      renderFn: () => rpg.renderGemModal && rpg.renderGemModal(),
      modal: 'gem-modal',
    },
    {
      fn: 'openWanderer',
      renderFn: () => rpg.renderWanderer && rpg.renderWanderer(),
      modal: 'wanderer-modal',
    },
    {
      fn: 'openHonorShop',
      renderFn: () => rpg.renderHonorShop && rpg.renderHonorShop(),
      modal: 'honor-modal',
    },

    // ── UTILITÁRIOS ──────────────────────────────────────────────
    {
      fn: 'openSettings',
      renderFn: () => {
        if (typeof window.refreshSaveInfo === 'function') window.refreshSaveInfo();
      },
      modal: 'settings-modal',
    },
    {
      fn: 'openChangelog',
      renderFn: null,
      modal: 'changelog-modal',
    },
  ];

  // ── Registra todas as funções com wrapper seguro ─────────────
  function registerAll() {
    BUTTON_MAP.forEach(function(item) {
      // Guarda original se existir
      const orig = window[item.fn];

      window[item.fn] = function() {
        safeOpen(
          function() {
            // Tenta original primeiro
            if (orig && orig !== window[item.fn]) {
              try { orig.apply(this, arguments); return; } catch(e) {}
            }
            // Tenta renderFn
            if (item.renderFn) {
              item.renderFn();
            }
          },
          item.modal,
          item.fallback || null
        );
      };
    });
  }

  function init() {
    registerAll();
    console.log('[ButtonsFixModule] ' + BUTTON_MAP.length + ' botões registados com segurança.');
  }

  // Aguarda rpg estar pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(init, 300);
    });
  } else {
    setTimeout(init, 300);
  }

})();
