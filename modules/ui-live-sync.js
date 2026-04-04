// ═══════════════════════════════════════════════════════════════
// MODULE: ui-live-sync.js
// ─────────────────────────────────────────────────────────────
// Corrige o problema de UI não atualizar em tempo real:
//   • Observador de estado (MutationObserver + polling)
//   • Patch em todas as funções que mudam estado mas não chamam
//     updateUI(): buy, equipItem, useRelic, etc.
//   • Força updateUI() após qualquer abertura/fecho de modal
//   • Sincroniza sidebar em tempo real sem ter de navegar
//   • Atualiza botões do menu (boss btn, talent dot, etc.) sem
//     precisar sair e voltar ao menu
// ═══════════════════════════════════════════════════════════════
;(function UiLiveSyncModule() {
  'use strict';

  // ── Estado de referência para detetar mudanças ────────────────
  let _last = {};

  function snapshot() {
    if (!window.rpg) return {};
    return {
      gold:       rpg.gold,
      potions:    rpg.potions,
      level:      rpg.level,
      xp:         rpg.xp,
      heroHp:     rpg.heroHp,
      bossKills:  rpg.bossKills,
      kills:      rpg.kills,
      eqClass:    rpg.eqClass,
      eqWeapon:   rpg.eqWeapon,
      eqArmor:    rpg.eqArmor,
      inCombat:   rpg.inCombat,
      talentPoints: rpg.talentPoints,
      honor:      rpg.honor,
    };
  }

  function stateChanged() {
    const now = snapshot();
    for (const k in now) {
      if (now[k] !== _last[k]) { _last = now; return true; }
    }
    return false;
  }

  // ── Update forçado ────────────────────────────────────────────
  function forceUpdate() {
    if (!window.rpg) return;
    try { rpg.updateUI && rpg.updateUI(); } catch(e) {}
    try { updateSidebar(); } catch(e) {}
    try { if (typeof lucide !== 'undefined') lucide.createIcons(); } catch(e) {}
  }

  // ── Sidebar live update ───────────────────────────────────────
  function updateSidebar() {
    if (!window.rpg) return;
    const r = rpg;

    // Sidebar stats
    const sb = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    const fmt = (n) => typeof formatNumber === 'function' ? formatNumber(n) : n;

    sb('sb-level',   r.level   || 1);
    sb('sb-bosses',  r.bossKills || 0);
    sb('sb-kills',   fmt(r.kills || 0));
    sb('sb-prestige', r.ngPlusActive || r.ngLevel || 0);

    // Menu stats
    sb('menu-gold',    fmt(r.gold    || 0));
    sb('menu-potions', fmt(r.potions || 0));
    sb('menu-level-text', r.level || 1);

    if (r.getAtk)   sb('menu-dmgt',  fmt(r.getAtk())   + ' ATK');
    if (r.getMaxHp) sb('menu-hp',    fmt(r.getMaxHp()) + ' HP');

    // Talent dot
    const td = document.getElementById('talent-dot');
    if (td) td.classList.toggle('hidden', !(r.talentPoints > 0));

    // Daily dot
    const dd = document.getElementById('daily-dot');
    if (dd && r.dailyMissions) {
      dd.classList.toggle('hidden', !r.dailyMissions.some(m => !m.done && m.progress >= m.goal));
    }

    // NPC dot
    const nd = document.getElementById('npc-quest-dot');
    if (nd && r.NPCS) {
      try {
        nd.classList.toggle('hidden', !r.NPCS.some(n => n.quests?.some(q => !r.npcQuestsDone?.includes(q.id) && q.cond?.(r))));
      } catch(e) {}
    }

    // Wanderer dot
    const wd = document.getElementById('wanderer-dot');
    if (wd) wd.classList.toggle('hidden', !r.wandererActive);
  }

  // ── Polling loop (500ms) ──────────────────────────────────────
  // Leve: só chama updateUI se algo mudou de facto
  function startPolling() {
    _last = snapshot();
    setInterval(() => {
      try {
        if (stateChanged()) forceUpdate();
      } catch(e) {}
    }, 500);
  }

  // ── Patch: funções que mudam estado sem chamar updateUI ────────
  function patchStateMutators() {
    if (!window.rpg) return;

    // Lista de métodos que devem disparar updateUI mas às vezes não
    const METHODS = [
      'buyItem', 'sellItem', 'equipItem', 'unequipItem',
      'usePotion', 'useRelic', 'addGold', 'spendGold',
      'addHonor', 'spendHonor',
      'unlockTalent', 'upgradeTalent', 'resetTalents',
      'equipRune', 'unequipRune',
      'equipGem', 'unequipGem',
      'forgeItem', 'upgradeLegendary',
      'changeClass', 'changeAvatar',
      'setFormation', 'equipAura', 'equipMutation',
      'completeQuest', 'claimDailyReward',
    ];

    METHODS.forEach(fn => {
      if (typeof rpg[fn] !== 'function') return;
      const _orig = rpg[fn].bind(rpg);
      rpg[fn] = function() {
        const result = _orig.apply(this, arguments);
        // Debounced update após 100ms
        clearTimeout(rpg._uiSyncTimer);
        rpg._uiSyncTimer = setTimeout(forceUpdate, 100);
        return result;
      };
    });
  }

  // ── Patch: openModal / closeModal → atualiza UI ao fechar ─────
  function patchModalSystem() {
    const origOpen  = window.openModal;
    const origClose = window.closeModal;

    window.openModal = function(id) {
      if (origOpen) origOpen(id);
      else {
        const m = document.getElementById(id);
        if (m) { m.classList.add('active'); m.style.zIndex = '300'; }
      }
    };

    window.closeModal = function(id) {
      if (origClose) origClose(id);
      else {
        const m = document.getElementById(id);
        if (m) { m.classList.remove('active'); }
      }
      // Atualiza UI quando qualquer modal fecha
      setTimeout(forceUpdate, 150);
    };
  }

  // ── Patch: navTo → atualiza UI ao navegar ─────────────────────
  function patchNavTo() {
    const origNavTo = window.navTo;
    window.navTo = function(view, ...args) {
      if (origNavTo) origNavTo(view, ...args);
      setTimeout(forceUpdate, 200);
    };
  }

  // ── Patch: switchTab → atualiza UI ao mudar tab ───────────────
  function patchSwitchTab() {
    const origSwitch = window.switchTab;
    window.switchTab = function(tab) {
      if (origSwitch) origSwitch(tab);
      setTimeout(forceUpdate, 100);
    };
  }

  // ── MutationObserver nos modais para detectar abertura ────────
  function observeModals() {
    const observer = new MutationObserver((mutations) => {
      const changed = mutations.some(m =>
        m.type === 'attributes' &&
        (m.attributeName === 'class' || m.attributeName === 'style') &&
        m.target.classList?.contains('modal-overlay')
      );
      if (changed) setTimeout(forceUpdate, 200);
    });

    // Observa o body para qualquer mudança em modais
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class', 'style'],
      subtree: true,
    });
  }

  // ── Patch específico: shop buy → re-render shop ───────────────
  function patchShopBuy() {
    if (!window.rpg?.buyShopItem && !window.rpg?.buyItem) return;
    const fn = rpg.buyShopItem ? 'buyShopItem' : 'buyItem';
    const _orig = rpg[fn].bind(rpg);
    rpg[fn] = function() {
      const result = _orig.apply(this, arguments);
      setTimeout(() => {
        forceUpdate();
        // Re-render shop if open
        try {
          if (document.getElementById('shop-modal')?.classList.contains('active')) {
            rpg.renderShop && rpg.renderShop();
          }
        } catch(e) {}
      }, 150);
      return result;
    };
  }

  // ── updateUI wrapper: garante que sidebar também atualiza ─────
  function wrapUpdateUI() {
    if (!window.rpg?.updateUI) return;
    const _orig = rpg.updateUI.bind(rpg);
    rpg.updateUI = function() {
      _orig();
      try { updateSidebar(); } catch(e) {}
    };
  }

  // ── Força atualização ao voltar ao foco da janela ────────────
  function handleVisibilityChange() {
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) setTimeout(forceUpdate, 300);
    });
    window.addEventListener('focus', () => setTimeout(forceUpdate, 200));
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    wrapUpdateUI();
    patchStateMutators();
    patchModalSystem();
    patchNavTo();
    patchSwitchTab();
    patchShopBuy();
    observeModals();
    handleVisibilityChange();
    startPolling();

    // Força update inicial
    setTimeout(forceUpdate, 500);

    window._uiLiveSync = { forceUpdate, updateSidebar };
    console.log('[UiLiveSync] ✅ Carregado — UI sincronizada em tempo real (polling 500ms)');
  }

  function waitForRpg(cb, n) {
    if (window.rpg?.updateUI) cb();
    else if ((n || 0) < 40) setTimeout(() => waitForRpg(cb, (n || 0) + 1), 200);
    else cb();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => waitForRpg(init));
  } else {
    waitForRpg(init);
  }

})();
