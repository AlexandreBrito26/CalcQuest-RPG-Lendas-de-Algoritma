// ═══════════════════════════════════════════════════════════════
// MODULE: relic-forge.js  —  FORJA DE RELÍQUIAS
// ─────────────────────────────────────────────────────────────
// ADICIONA:
//   1. Sistema de Fusão: combina 2 relíquias em 1 superior
//   2. 8 relíquias forjadas exclusivas (não compráveis na loja)
//   3. UI de forja com drag-to-merge visual e animação de fusão
//   4. Botão "Forja" no modal de inventário
//   5. Receitas secretas com relíquias raras como ingrediente
// ═══════════════════════════════════════════════════════════════
(function RelicForgeModule() {
  'use strict';

  // ── RELÍQUIAS FORJADAS ────────────────────────────────────────
  var FORGED_RELICS = [
    {
      id: 'rf_bloodmidas',
      name: { pt: 'Toque Hemático', en: 'Blood Touch' },
      desc: { pt: '+100% Ouro e cura 5% HP por morte', en: '+100% Gold and heal 5% HP on kill' },
      icon: '💎',
      recipe: ['r_vamp', 'r_midas'],
      apply: function(rpg) {
        rpg._rf_bloodmidas = true;
      },
    },
    {
      id: 'rf_critgod',
      name: { pt: 'Olho do Criador', en: "Creator's Eye" },
      desc: { pt: '+40% Crit, críticos dão x4 dano', en: '+40% Crit, crits deal x4 damage' },
      icon: '👁️',
      recipe: ['r_crit', 'r_fury'],
      apply: function(rpg) {
        rpg._rf_critgod = true;
      },
    },
    {
      id: 'rf_ghosttime',
      name: { pt: 'Relógio Fantasma', en: 'Ghost Clock' },
      desc: { pt: 'Esquiva +30%, cooldowns -20%', en: 'Dodge +30%, cooldowns -20%' },
      icon: '⏰',
      recipe: ['r_dodge', 'r_time'],
      apply: function(rpg) {
        rpg._rf_ghosttime = true;
      },
    },
    {
      id: 'rf_omnivoid',
      name: { pt: 'Núcleo do Vazio', en: 'Void Core' },
      desc: { pt: '+500% Ouro/XP, -20% HP máx', en: '+500% Gold/XP, -20% max HP' },
      icon: '🌑',
      recipe: ['r_omni', 'r_void'],
      apply: function(rpg) {
        rpg._rf_omnivoid = true;
      },
    },
    {
      id: 'rf_xpfury',
      name: { pt: 'Mente Ardente', en: 'Burning Mind' },
      desc: { pt: '+200% XP, Fúria enche 2x mais rápido', en: '+200% XP, Fury fills 2x faster' },
      icon: '🔥',
      recipe: ['r_xp', 'r_fury'],
      apply: function(rpg) {
        rpg._rf_xpfury = true;
      },
    },
    {
      id: 'rf_quantumgod',
      name: { pt: 'Fragmento Quântico', en: 'Quantum Fragment' },
      desc: { pt: '+1000% tudo, mas dano recebido +50%', en: '+1000% everything, but +50% damage taken' },
      icon: '⚛️',
      recipe: ['r_quantum', 'r_god'],
      apply: function(rpg) {
        rpg._rf_quantumgod = true;
      },
    },
    {
      id: 'rf_devmidas',
      name: { pt: 'Código Dourado', en: 'Golden Code' },
      desc: { pt: '+300% Ouro, XP igual ao ouro ganho', en: '+300% Gold, XP equals gold gained' },
      icon: '💻',
      recipe: ['r_dev', 'r_midas'],
      apply: function(rpg) {
        rpg._rf_devmidas = true;
      },
    },
    {
      id: 'rf_chaostime',
      name: { pt: 'Paradoxo do Caos', en: 'Chaos Paradox' },
      desc: { pt: 'Cada kill tem 10% de chance de resetar cooldowns', en: 'Each kill has 10% chance to reset cooldowns' },
      icon: '🌀',
      recipe: ['r_chaos', 'r_time'],
      apply: function(rpg) {
        rpg._rf_chaostime = true;
      },
    },
  ];

  var _forgeInited = false;

  // ── INIT ──────────────────────────────────────────────────────
  function init() {
    if (typeof rpg === 'undefined') return;
    if (_forgeInited) return;
    _forgeInited = true;

    if (!rpg.forgedRelics) rpg.forgedRelics = [];

    injectForgeButton();
    injectForgeModal();
    patchEffects();
    loadForged();

    console.log('[RelicForge] iniciado');
  }

  // ── PATCHES DE EFEITO ─────────────────────────────────────────
  function patchEffects() {

    // Patch dealDamageToMonster → rf_critgod (x4 em crits)
    var _origDeal = rpg.dealDamageToMonster.bind(rpg);
    rpg.dealDamageToMonster = function(baseDmg, atkType, isUltimate) {
      if (this._rf_critgod && isUltimate && atkType === 'atk') {
        baseDmg = Math.floor(baseDmg * 2); // extra x2 (já tem x2 base = x4 total)
      }
      if (this._rf_omnivoid) baseDmg = Math.floor(baseDmg * 1); // neutro no dano
      return _origDeal.call(this, baseDmg, atkType, isUltimate);
    };

    // Patch killMonster → rf_bloodmidas (cura), rf_devmidas (XP=Gold), rf_chaostime
    var _origKill = rpg.killMonster.bind(rpg);
    rpg.killMonster = function() {
      var result = _origKill.apply(this, arguments);

      if (this._rf_bloodmidas) {
        var heal = Math.floor(this.getMaxHp() * 0.05);
        this.heroHp = Math.min(this.getMaxHp(), this.heroHp + heal);
        if (typeof this.updateHpBars === 'function') this.updateHpBars();
      }

      if (this._rf_chaostime && Math.random() < 0.10) {
        // Reset de cooldowns
        Object.keys(this.skills || {}).forEach(function(k) {
          if (this.skills[k]) this.skills[k].timer = 0;
        }.bind(this));
        if (typeof showToast === 'function') showToast('🌀 Paradoxo! Cooldowns resetados!', 2000);
      }

      return result;
    };

    // Patch getCritChance → rf_critgod (+0.40), rf_ghosttime (+0.30)
    if (rpg.getCritChance) {
      var _origCrit = rpg.getCritChance.bind(rpg);
      rpg.getCritChance = function() {
        var base = _origCrit.apply(this, arguments);
        if (this._rf_critgod) base += 0.40;
        if (this._rf_ghosttime) base += 0.30;
        return Math.min(base, 0.99);
      };
    }

    // Patch getMaxHp → rf_omnivoid (-20%), rf_ghosttime nenhum
    var _origMaxHp = rpg.getMaxHp.bind(rpg);
    rpg.getMaxHp = function() {
      var base = _origMaxHp.apply(this, arguments);
      if (this._rf_omnivoid) base = Math.floor(base * 0.80);
      return base;
    };

    // Patch addFury → rf_xpfury (2x)
    var _origFury = rpg.addFury.bind(rpg);
    rpg.addFury = function(amount) {
      if (this._rf_xpfury) amount = amount * 2;
      return _origFury.call(this, amount);
    };

    // Patch save
    var _origSave = rpg.save.bind(rpg);
    rpg.save = function() {
      saveForged();
      return _origSave.apply(this, arguments);
    };
  }

  // Aplica relíquias forjadas ao carregar
  function applyAllForged() {
    if (!rpg.forgedRelics) return;
    rpg.forgedRelics.forEach(function(id) {
      var relic = FORGED_RELICS.find(function(r) { return r.id === id; });
      if (relic && relic.apply) relic.apply(rpg);
    });
  }

  // ── UI ────────────────────────────────────────────────────────
  function injectForgeButton() {
    // Tenta injetar dentro do modal de inventário/armário
    setTimeout(function() {
      var inventoryModal = document.getElementById('inventory-modal') ||
                           document.getElementById('shop-modal');

      // Botão flutuante no canto
      var btn = document.createElement('button');
      btn.id = 'relic-forge-btn';
      btn.innerHTML = '⚗️';
      btn.title = rpg.lang === 'pt' ? 'Forja de Relíquias' : 'Relic Forge';
      btn.style.cssText = [
        'position:fixed',
        'bottom:236px',
        'left:16px',
        'width:44px',
        'height:44px',
        'border-radius:50%',
        'background:linear-gradient(135deg,#b45309,#78350f)',
        'border:2px solid #f59e0b',
        'color:white',
        'font-size:18px',
        'cursor:pointer',
        'z-index:300',
        'box-shadow:0 0 12px #f59e0b',
        'transition:transform 0.2s',
      ].join(';');
      btn.onclick = openForgeModal;
      btn.onmouseenter = function() { btn.style.transform = 'scale(1.1)'; };
      btn.onmouseleave = function() { btn.style.transform = 'scale(1)'; };
      document.body.appendChild(btn);
    }, 2500);
  }

  function injectForgeModal() {
    var modal = document.createElement('div');
    modal.id = 'relic-forge-modal';
    modal.style.cssText = [
      'display:none',
      'position:fixed',
      'inset:0',
      'background:rgba(0,0,0,0.88)',
      'z-index:10001',
      'overflow-y:auto',
      'padding:20px',
    ].join(';');
    modal.innerHTML = '<div id="relic-forge-inner" style="max-width:500px;margin:0 auto;background:#0f172a;border:1px solid #f59e0b;border-radius:16px;padding:20px;"></div>';
    modal.onclick = function(e) { if (e.target === modal) modal.style.display = 'none'; };
    document.body.appendChild(modal);
  }

  window.openForgeModal = function() {
    var modal = document.getElementById('relic-forge-modal');
    var inner = document.getElementById('relic-forge-inner');
    if (!modal || !inner) return;

    var lang = rpg.lang || 'pt';
    var ownedRelics = rpg.inventory || [];
    var forged = rpg.forgedRelics || [];

    var html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">'
      + '<h2 style="color:#f59e0b;font-size:18px;font-weight:900;margin:0;">⚗️ ' + (lang === 'pt' ? 'Forja de Relíquias' : 'Relic Forge') + '</h2>'
      + '<button onclick="document.getElementById(\'relic-forge-modal\').style.display=\'none\'" style="background:none;border:none;color:#94a3b8;font-size:20px;cursor:pointer;">✕</button>'
      + '</div>';

    html += '<p style="color:#64748b;font-size:11px;margin-bottom:16px;">'
      + (lang === 'pt' ? 'Combine 2 relíquias para criar uma superior. As originais são consumidas.' : 'Combine 2 relics to forge a superior one. Originals are consumed.')
      + '</p>';

    var hasAny = false;
    FORGED_RELICS.forEach(function(recipe) {
      var alreadyForged = forged.includes(recipe.id);
      var hasIngredients = recipe.recipe.every(function(r) { return ownedRelics.includes(r); });

      if (!alreadyForged && !hasIngredients && !recipe.recipe.some(function(r) { return ownedRelics.includes(r); })) return;
      hasAny = true;

      var canForge = hasIngredients && !alreadyForged;

      html += '<div style="border:1px solid ' + (alreadyForged ? '#22c55e' : canForge ? '#f59e0b' : '#1e293b')
        + ';border-radius:10px;padding:12px;margin-bottom:10px;background:rgba(255,255,255,0.02);">';
      html += '<div style="display:flex;justify-content:space-between;align-items:center;">';
      html += '<div>';
      html += '<div style="font-size:15px;font-weight:700;color:' + (alreadyForged ? '#22c55e' : '#fcd34d') + ';">'
        + recipe.icon + ' ' + recipe.name[lang]
        + (alreadyForged ? ' ✓' : '')
        + '</div>';
      html += '<div style="font-size:11px;color:#94a3b8;margin-top:4px;">' + recipe.desc[lang] + '</div>';

      // Ingredientes
      html += '<div style="font-size:10px;color:#64748b;margin-top:6px;">🔩 '
        + recipe.recipe.map(function(r) {
            var owned = ownedRelics.includes(r);
            var relicData = rpg.relics ? rpg.relics.find(function(x) { return x.id === r; }) : null;
            var name = relicData ? (relicData.name ? relicData.name[lang] || r : r) : r;
            return '<span style="color:' + (owned ? '#86efac' : '#ef4444') + ';">' + name + '</span>';
          }).join(' + ')
        + '</div>';
      html += '</div>';

      if (!alreadyForged) {
        html += '<button '
          + (canForge ? 'onclick="window.forgeRelic(\'' + recipe.id + '\')"' : 'disabled')
          + ' style="padding:6px 14px;background:' + (canForge ? '#b45309' : '#1e293b') + ';'
          + 'border:1px solid ' + (canForge ? '#f59e0b' : '#334155') + ';'
          + 'border-radius:8px;color:' + (canForge ? 'white' : '#64748b') + ';'
          + 'font-size:12px;cursor:' + (canForge ? 'pointer' : 'default') + ';font-weight:700;">'
          + (lang === 'pt' ? 'FORJAR' : 'FORGE') + '</button>';
      }

      html += '</div></div>';
    });

    if (!hasAny) {
      html += '<div style="text-align:center;color:#64748b;padding:30px 0;font-size:13px;">'
        + (lang === 'pt' ? '⚗️ Obtém relíquias na loja para desbloquear receitas.' : '⚗️ Get relics from the shop to unlock recipes.')
        + '</div>';
    }

    inner.innerHTML = html;
    modal.style.display = 'block';
  };

  window.forgeRelic = function(id) {
    var recipe = FORGED_RELICS.find(function(r) { return r.id === id; });
    if (!recipe) return;

    var lang = rpg.lang || 'pt';

    // Verifica ingredientes
    var hasAll = recipe.recipe.every(function(r) { return rpg.inventory.includes(r); });
    if (!hasAll) return;

    // Animação de forja
    var inner = document.getElementById('relic-forge-inner');
    if (inner) {
      var overlay = document.createElement('div');
      overlay.style.cssText = 'position:absolute;inset:0;background:rgba(245,158,11,0.15);border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:40px;animation:pulse 0.5s infinite;';
      overlay.textContent = '⚗️';
      inner.style.position = 'relative';
      inner.appendChild(overlay);
      setTimeout(function() {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 1000);
    }

    setTimeout(function() {
      // Remove ingredientes
      recipe.recipe.forEach(function(r) {
        var idx = rpg.inventory.indexOf(r);
        if (idx !== -1) rpg.inventory.splice(idx, 1);
        // Remove da flag interna do rpg
        delete rpg['_rf_' + r.replace('r_', '')];
      });

      // Adiciona relíquia forjada
      if (!rpg.forgedRelics) rpg.forgedRelics = [];
      rpg.forgedRelics.push(id);

      // Aplica efeito
      if (recipe.apply) recipe.apply(rpg);

      var msg = lang === 'pt'
        ? '⚗️ Forjado! ' + recipe.icon + ' ' + recipe.name.pt
        : '⚗️ Forged! ' + recipe.icon + ' ' + recipe.name.en;
      if (typeof showToast === 'function') showToast(msg, 5000);

      if (typeof rpg.save === 'function') rpg.save();
      openForgeModal(); // Refresh modal
    }, 800);
  };

  // ── PERSISTÊNCIA ──────────────────────────────────────────────
  function saveForged() {
    try { localStorage.setItem('rpg_forged_relics', JSON.stringify(rpg.forgedRelics || [])); } catch(e) {}
  }

  function loadForged() {
    try {
      var saved = localStorage.getItem('rpg_forged_relics');
      if (saved) {
        rpg.forgedRelics = JSON.parse(saved);
        applyAllForged();
      }
    } catch(e) {}
  }

  // ── BOOT ──────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(init, 2500); });
  } else {
    setTimeout(init, 2500);
  }

})();
