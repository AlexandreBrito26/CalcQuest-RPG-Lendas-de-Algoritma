// ═══════════════════════════════════════════════════════════════
// MODULE: save-system.js  — Sistema de Save Melhorado
// • Autosave com indicador visual (dot verde no settings)
// • Export/Import com textarea visual (não usa clipboard raw)
// • Backup automático a cada 5 min no localStorage
// • Histórico dos últimos 3 saves automáticos (restore)
// • Indicador de "último save" no menu
// ═══════════════════════════════════════════════════════════════
(function SaveSystemModule() {
  'use strict';

  const BACKUP_INTERVAL_MS = 5 * 60 * 1000; // 5 minutos
  const MAX_BACKUPS        = 3;
  const BACKUP_KEY_PREFIX  = 'rpg_autobackup_';

  // ── 1. Patch rpg.save — autosave indicator ──────────────────
  function patchSave() {
    const _orig = rpg.save ? rpg.save.bind(rpg) : null;
    rpg.save = function() {
      if (_orig) { try { _orig(); } catch(e) {} }
      flashSaveDot();
      updateLastSaveLabel();
    };
  }

  // ── 2. Flash do dot verde ────────────────────────────────────
  function flashSaveDot() {
    let dot = document.getElementById('save-indicator-dot');
    if (!dot) {
      dot = document.createElement('span');
      dot.id = 'save-indicator-dot';
      dot.style.cssText = `
        position:fixed; bottom:14px; left:14px; width:8px; height:8px;
        border-radius:50%; background:#166534; z-index:9999;
        transition: background 0.3s, box-shadow 0.3s;
        cursor:pointer; border:1px solid rgba(255,255,255,0.1);
      `;
      dot.title = 'Autosave';
      dot.onclick = () => {
        if (typeof openSettings === 'function') openSettings();
      };
      document.body.appendChild(dot);
    }
    dot.style.background  = '#34d399';
    dot.style.boxShadow   = '0 0 10px #34d399, 0 0 20px rgba(52,211,153,0.4)';
    setTimeout(() => {
      dot.style.background  = '#166534';
      dot.style.boxShadow   = 'none';
    }, 1400);
  }

  // ── 3. Label "Salvo às HH:MM" no menu ───────────────────────
  function updateLastSaveLabel() {
    let label = document.getElementById('last-save-label');
    if (!label) {
      // Injeta abaixo do hero card no menu
      const heroCard = document.querySelector('#view-menu .rounded-2xl.p-3.mb-4');
      if (!heroCard) return;
      label = document.createElement('p');
      label.id = 'last-save-label';
      label.style.cssText = `
        font-family:'Fira Code',monospace; font-size:8px; color:rgba(100,200,120,0.7);
        text-align:center; margin-top:-10px; margin-bottom:6px;
        letter-spacing:0.06em; user-select:none;
      `;
      heroCard.insertAdjacentElement('afterend', label);
    }
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    label.textContent = `✓ salvo às ${h}:${m}:${s}`;
    localStorage.setItem('rpg_last_save_time', now.toISOString());
  }

  // ── 4. Backup automático a cada 5 min ───────────────────────
  function startAutoBackup() {
    setInterval(() => {
      try {
        const data = collectSaveData();
        const code = btoa(JSON.stringify(data));
        const ts   = Date.now();

        // Carrega lista de backups
        let backups = [];
        try { backups = JSON.parse(localStorage.getItem('rpg_autobackups') || '[]'); } catch(e) {}

        // Adiciona novo e mantém só os últimos MAX_BACKUPS
        backups.unshift({ ts, code });
        if (backups.length > MAX_BACKUPS) backups = backups.slice(0, MAX_BACKUPS);

        localStorage.setItem('rpg_autobackups', JSON.stringify(backups));
        console.log('[SaveSystemModule] Backup automático salvo:', new Date(ts).toLocaleTimeString());
      } catch(e) {
        console.warn('[SaveSystemModule] Backup error:', e);
      }
    }, BACKUP_INTERVAL_MS);
  }

  // ── 5. Coleta todos os dados do rpg para export ──────────────
  function collectSaveData() {
    return {
      version:        '2.0',
      ts:             Date.now(),
      lang:           rpg.lang,
      heroName:       rpg.heroName,
      level:          rpg.level,
      xp:             rpg.xp,
      gold:           rpg.gold,
      potions:        rpg.potions,
      kills:          rpg.kills,
      bossKills:      rpg.bossKills,
      highestLevel:   rpg.highestLevel,
      maxDmgDealt:    rpg.maxDmgDealt,
      eqClass:        rpg.eqClass,
      eqWeapon:       rpg.eqWeapon,
      eqArmor:        rpg.eqArmor,
      eqPet:          rpg.eqPet,
      eqTheme:        rpg.eqTheme,
      avatar:         rpg.avatar,
      inventory:      rpg.inventory,
      bestiary:       rpg.bestiary,
      seenMilestones: rpg.seenMilestones,
      introSeen:      rpg.introSeen,
      bpClaimed:      rpg.bpClaimed || [],
      prestigeLevel:  rpg.prestigeLevel,
      prestigeMult:   rpg.prestigeMult,
      dailyCompleted: rpg.dailyCompleted,
      dailyMissions:  rpg.dailyMissions,
      dailyDate:      rpg.dailyDate,
      ngPlusActive:   rpg.ngPlusActive   || 0,
      forgeUpgrades:  rpg.forgeUpgrades  || {},
      unlockedTalents:rpg.unlockedTalents|| [],
      talentPoints:   rpg.talentPoints   || 0,
      equippedRunes:  rpg.equippedRunes  || [],
      unlockedRunes:  rpg.unlockedRunes  || [],
      grimoire:       rpg.grimoire       || [],
      honor:          rpg.honor          || 0,
      purchasedHonor: rpg.purchasedHonor || [],
      loreFragments:  rpg.loreFragments  || [],
      equippedAura:   rpg.equippedAura   || null,
      unlockedAuras:  rpg.unlockedAuras  || [],
      narrativeChoices: rpg.narrativeChoices || {},
      npcQuestsDone:  rpg.npcQuestsDone  || [],
      heroDiary:      rpg.heroDiary      || [],
      bestWave:       rpg.bestWave       || 0,
    };
  }

  // ── 6. Export visual — modal próprio ─────────────────────────
  window.saveSystemExport = function() {
    try {
      const data = collectSaveData();
      const code = btoa(JSON.stringify(data));
      showSaveCodeModal(code, 'export');
    } catch(e) {
      if (typeof showToast === 'function') showToast('❌ Erro ao exportar save.', 3000);
    }
  };

  // ── 7. Import visual ─────────────────────────────────────────
  window.saveSystemImport = function() {
    showSaveCodeModal('', 'import');
  };

  // ── 8. Restore de backup automático ─────────────────────────
  window.saveSystemRestoreBackup = function(idx) {
    try {
      const backups = JSON.parse(localStorage.getItem('rpg_autobackups') || '[]');
      const b = backups[idx];
      if (!b) { if (typeof showToast === 'function') showToast('Backup não encontrado.'); return; }
      if (!confirm('Restaurar backup de ' + new Date(b.ts).toLocaleString('pt-BR') + '?\nProgressão atual será perdida!')) return;
      applyImportCode(b.code);
    } catch(e) {
      if (typeof showToast === 'function') showToast('❌ Erro ao restaurar backup.');
    }
  };

  function applyImportCode(code) {
    try {
      const data = JSON.parse(atob(code.trim()));
      // Aplica via rpg.importSave se existir, senão aplica manualmente
      if (rpg.importSave) {
        const _origPrompt = window.prompt;
        window.prompt = () => { window.prompt = _origPrompt; return code; };
        rpg.importSave();
      } else {
        Object.assign(rpg, data);
        if (rpg.save) rpg.save();
        if (typeof showToast === 'function') showToast('✅ Save restaurado! A recarregar...', 3000);
        setTimeout(() => location.reload(), 1500);
      }
    } catch(e) {
      if (typeof showToast === 'function') showToast('❌ Código inválido!', 3000);
    }
  }

  // ── 9. Modal de save code ────────────────────────────────────
  function showSaveCodeModal(code, mode) {
    let modal = document.getElementById('save-system-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'save-system-modal';
      modal.className = 'modal-overlay fixed inset-0 flex items-center justify-center';
      modal.style.zIndex = '500';
      document.body.appendChild(modal);
    }

    // Backups
    let backups = [];
    try { backups = JSON.parse(localStorage.getItem('rpg_autobackups') || '[]'); } catch(e) {}
    const backupHTML = backups.length > 0
      ? `<div class="mt-4 border-t border-zinc-800 pt-4">
          <p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2" style="font-family:'Orbitron',sans-serif;">Backups Automáticos</p>
          ${backups.map((b, i) => `
            <div class="flex items-center justify-between p-2 bg-zinc-950/60 border border-zinc-800 rounded-lg mb-1">
              <span class="text-[9px] text-zinc-400">${new Date(b.ts).toLocaleString('pt-BR')}</span>
              <button onclick="saveSystemRestoreBackup(${i}); closeModal('save-system-modal')" class="px-2 py-0.5 bg-emerald-800 hover:bg-emerald-700 text-emerald-200 rounded text-[8px] font-bold transition">Restaurar</button>
            </div>`).join('')}
        </div>` : '';

    modal.innerHTML = `
      <div class="modal-content glass-panel bg-zinc-900/95 w-11/12 max-w-md rounded-2xl p-6 shadow-2xl">
        <div class="flex justify-between items-center mb-4 border-b border-zinc-800 pb-3">
          <h2 class="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2" style="font-family:'Orbitron',sans-serif;">
            <i data-lucide="${mode === 'export' ? 'upload' : 'download'}" class="w-5 h-5 text-cyan-400"></i>
            ${mode === 'export' ? 'Exportar Save' : 'Importar Save'}
          </h2>
          <button onclick="closeModal('save-system-modal')" class="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition text-zinc-400">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        ${mode === 'export' ? `
          <p class="text-[9px] text-zinc-500 mb-2 uppercase tracking-widest font-bold">O teu código de save:</p>
          <textarea id="save-code-textarea" readonly
            class="w-full h-24 bg-black/60 border border-zinc-700 text-zinc-300 rounded-lg p-2 text-[8px] font-mono resize-none focus:outline-none focus:border-cyan-700 select-all"
            onclick="this.select()">${code}</textarea>
          <button onclick="navigator.clipboard.writeText(document.getElementById('save-code-textarea').value).then(()=>{if(typeof showToast==='function')showToast('✅ Código copiado!',2500)})"
            class="w-full mt-2 py-2 bg-cyan-800 hover:bg-cyan-700 text-white rounded-lg text-xs font-black uppercase tracking-widest transition">
            📋 Copiar Código
          </button>
        ` : `
          <p class="text-[9px] text-zinc-500 mb-2 uppercase tracking-widest font-bold">Cola o teu código de save:</p>
          <textarea id="save-import-textarea"
            class="w-full h-24 bg-black/60 border border-zinc-700 text-zinc-300 rounded-lg p-2 text-[8px] font-mono resize-none focus:outline-none focus:border-cyan-700"
            placeholder="Cola aqui o código de save..."></textarea>
          <button onclick="const c=document.getElementById('save-import-textarea').value.trim();if(c){window._saveSystemApply(c);}else{if(typeof showToast==='function')showToast('Cola um código primeiro!',2000);}"
            class="w-full mt-2 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-black uppercase tracking-widest transition">
            ⬆️ Importar Save
          </button>
        `}

        ${backupHTML}
      </div>
    `;

    modal.classList.add('active');
    try { lucide.createIcons(); } catch(e) {}
  }

  window._saveSystemApply = function(code) {
    applyImportCode(code);
    closeModal('save-system-modal');
  };

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    patchSave();
    startAutoBackup();
    // Recupera label do último save
    const lastSaveTime = localStorage.getItem('rpg_last_save_time');
    if (lastSaveTime) {
      setTimeout(() => {
        const label = document.getElementById('last-save-label');
        if (!label) updateLastSaveLabel();
      }, 500);
    }
    console.log('[SaveSystemModule] OK — backup a cada 5min, export/import melhorado');
  }

  function waitForRpg(cb, n) {
    if (typeof rpg !== 'undefined' && rpg.save) cb();
    else if ((n || 0) < 30) setTimeout(() => waitForRpg(cb, (n || 0) + 1), 200);
  }

  waitForRpg(init);
})();
