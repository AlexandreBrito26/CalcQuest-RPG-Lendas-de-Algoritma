// ═══════════════════════════════════════════════════════════════
// MODULE: combo-mastery.js  —  SISTEMA DE MAESTRIA DE COMBOS
// ─────────────────────────────────────────────────────────────
// ADICIONA:
//   1. Combo Tiers visuais (5/10/15/20) com efeitos e cores
//   2. Habilidade especial "QUEBRA-COMBO" por nível de maestria
//   3. Bônus permanentes desbloqueáveis via XP de combo
//   4. Indicador visual animado do multiplicador de dano ativo
//   5. Mensagens de combo temáticas no battle log
// ═══════════════════════════════════════════════════════════════
(function ComboMasteryModule() {
  'use strict';

  // ── CONFIGURAÇÃO ──────────────────────────────────────────────
  var TIERS = [
    { at: 5,  name: 'QUENTE',    color: '#f97316', glow: '0 0 12px #f97316', dmgBonus: 0.25 },
    { at: 10, name: 'EM CHAMAS', color: '#ef4444', glow: '0 0 20px #ef4444', dmgBonus: 0.60 },
    { at: 15, name: 'FÚRIA',     color: '#dc2626', glow: '0 0 30px #dc2626', dmgBonus: 1.20 },
    { at: 20, name: 'LENDÁRIO',  color: '#a855f7', glow: '0 0 40px #a855f7, 0 0 80px #7c3aed', dmgBonus: 2.00 },
  ];

  var COMBO_MESSAGES = [
    ['Dano limpo!', 'Clean hit!'],
    ['Precisão cirúrgica!', 'Surgical precision!'],
    ['Sem chance de defesa!', 'No defense chance!'],
    ['Impacto devastador!', 'Devastating impact!'],
    ['O inimigo titubeia!', 'Enemy staggers!'],
    ['CRÍTICO DE COMBO!', 'COMBO CRITICAL!'],
  ];

  // Estado de maestria (persistido via rpg object)
  var _masteryInited = false;

  // ── INIT ──────────────────────────────────────────────────────
  function init() {
    if (typeof rpg === 'undefined') return;
    if (_masteryInited) return;
    _masteryInited = true;

    // Inicializa estado se necessário
    if (!rpg.comboMastery) {
      rpg.comboMastery = {
        xp: 0,
        level: 0,
        totalCombosReached20: 0,
        permDmgBonus: 0,
      };
    }

    // Inject UI
    injectComboUI();

    // Patch updateComboUI para adicionar tier visual
    var _origUpdateComboUI = rpg.updateComboUI.bind(rpg);
    rpg.updateComboUI = function() {
      _origUpdateComboUI();
      updateTierDisplay(this.combo);
    };

    // Patch dealDamageToMonster para bônus de combo tier
    var _origDeal = rpg.dealDamageToMonster.bind(rpg);
    rpg.dealDamageToMonster = function(baseDmg, atkType, isUltimate) {
      var bonus = getComboBonus(this.combo) + (this.comboMastery.permDmgBonus || 0);
      var boostedDmg = Math.floor(baseDmg * (1 + bonus));

      // Mensagem especial de combo a cada 5 combos
      if (this.combo > 0 && this.combo % 5 === 0 && this.inCombat) {
        var msgIdx = Math.min(Math.floor(this.combo / 5) - 1, COMBO_MESSAGES.length - 1);
        var msg = COMBO_MESSAGES[msgIdx][this.lang === 'pt' ? 0 : 1];
        setTimeout(function() { showComboMessage(msg); }, 100);
      }

      // Acumula XP de maestria
      if (this.combo >= 5) {
        this.comboMastery.xp = (this.comboMastery.xp || 0) + this.combo;
        checkMasteryLevelUp(this);
      }

      return _origDeal.call(this, boostedDmg, atkType, isUltimate);
    };

    // Patch killMonster para contar combos lendários
    var _origKill = rpg.killMonster.bind(rpg);
    rpg.killMonster = function() {
      if (this.combo >= 20) {
        this.comboMastery.totalCombosReached20 = (this.comboMastery.totalCombosReached20 || 0) + 1;
      }
      return _origKill.apply(this, arguments);
    };

    // Patch save para incluir comboMastery
    var _origSave = rpg.save.bind(rpg);
    rpg.save = function() {
      if (this.comboMastery) {
        try { localStorage.setItem('rpg_combo_mastery', JSON.stringify(this.comboMastery)); } catch(e){}
      }
      return _origSave.apply(this, arguments);
    };

    // Carregar do save
    try {
      var saved = localStorage.getItem('rpg_combo_mastery');
      if (saved) {
        var parsed = JSON.parse(saved);
        Object.assign(rpg.comboMastery, parsed);
      }
    } catch(e) {}

    console.log('[ComboMastery] iniciado — nível', rpg.comboMastery.level);
  }

  // ── HELPERS ───────────────────────────────────────────────────
  function getComboBonus(combo) {
    var bonus = 0;
    for (var i = TIERS.length - 1; i >= 0; i--) {
      if (combo >= TIERS[i].at) {
        bonus = TIERS[i].dmgBonus;
        break;
      }
    }
    return bonus;
  }

  function getCurrentTier(combo) {
    var tier = null;
    for (var i = 0; i < TIERS.length; i++) {
      if (combo >= TIERS[i].at) tier = TIERS[i];
    }
    return tier;
  }

  function checkMasteryLevelUp(rpg) {
    var xpNeeded = [0, 500, 1500, 3500, 7000, 12000, 20000, 35000, 60000, 100000];
    var lvl = rpg.comboMastery.level || 0;
    if (lvl >= xpNeeded.length - 1) return;
    if ((rpg.comboMastery.xp || 0) >= xpNeeded[lvl + 1]) {
      rpg.comboMastery.level = lvl + 1;
      rpg.comboMastery.permDmgBonus = (rpg.comboMastery.permDmgBonus || 0) + 0.05;
      var msg = rpg.lang === 'pt'
        ? '⚡ Maestria de Combo Nv.' + rpg.comboMastery.level + '! +5% dano permanente!'
        : '⚡ Combo Mastery Lv.' + rpg.comboMastery.level + '! +5% permanent damage!';
      if (typeof showToast === 'function') showToast(msg, 5000);
      updateMasteryBadge();
    }
  }

  // ── UI INJECTION ──────────────────────────────────────────────
  function injectComboUI() {
    // Tier badge abaixo do combo counter
    var comboEl = document.getElementById('combo-display') ||
                  document.querySelector('[id*="combo"]');

    var tierBadge = document.createElement('div');
    tierBadge.id = 'combo-tier-badge';
    tierBadge.style.cssText = [
      'position:fixed',
      'top:50%',
      'left:50%',
      'transform:translate(-50%,-50%)',
      'font-size:28px',
      'font-weight:900',
      'letter-spacing:4px',
      'pointer-events:none',
      'opacity:0',
      'transition:opacity 0.3s',
      'z-index:9999',
      'text-shadow:0 0 20px currentColor',
    ].join(';');
    document.body.appendChild(tierBadge);

    // Mastery level badge (canto inferior direito do combat area)
    var masteryBadge = document.createElement('div');
    masteryBadge.id = 'combo-mastery-badge';
    masteryBadge.style.cssText = [
      'position:fixed',
      'bottom:120px',
      'right:16px',
      'background:rgba(0,0,0,0.7)',
      'border:1px solid #7c3aed',
      'border-radius:8px',
      'padding:4px 10px',
      'font-size:11px',
      'color:#a855f7',
      'font-weight:bold',
      'z-index:200',
      'display:none',
    ].join(';');
    document.body.appendChild(masteryBadge);
    updateMasteryBadge();

    // Multiplier popup ao atingir tier
    var dmgPopup = document.createElement('div');
    dmgPopup.id = 'combo-dmg-popup';
    dmgPopup.style.cssText = [
      'position:fixed',
      'top:40%',
      'left:50%',
      'transform:translateX(-50%)',
      'font-size:14px',
      'font-weight:700',
      'pointer-events:none',
      'opacity:0',
      'transition:all 0.4s',
      'z-index:9998',
    ].join(';');
    document.body.appendChild(dmgPopup);
  }

  var _lastTierAt = -1;
  function updateTierDisplay(combo) {
    var tier = getCurrentTier(combo);
    var badge = document.getElementById('combo-tier-badge');
    var popup = document.getElementById('combo-dmg-popup');
    if (!badge) return;

    if (!tier) {
      badge.style.opacity = '0';
      _lastTierAt = -1;
      return;
    }

    // Mostra badge quando muda de tier
    if (combo === tier.at && _lastTierAt !== tier.at) {
      _lastTierAt = tier.at;
      badge.style.color = tier.color;
      badge.style.textShadow = tier.glow;
      badge.textContent = tier.name + '!';
      badge.style.opacity = '1';
      setTimeout(function() { badge.style.opacity = '0'; }, 1800);

      // Popup de multiplicador
      if (popup) {
        var bonus = Math.round(tier.dmgBonus * 100);
        popup.style.color = tier.color;
        popup.textContent = '+' + bonus + '% DMG';
        popup.style.opacity = '1';
        popup.style.top = '38%';
        setTimeout(function() {
          popup.style.opacity = '0';
          popup.style.top = '34%';
        }, 1500);
      }
    }
  }

  function updateMasteryBadge() {
    if (typeof rpg === 'undefined' || !rpg.comboMastery) return;
    var el = document.getElementById('combo-mastery-badge');
    if (!el) return;
    var lvl = rpg.comboMastery.level || 0;
    if (lvl === 0) { el.style.display = 'none'; return; }
    el.style.display = 'block';
    var perm = Math.round((rpg.comboMastery.permDmgBonus || 0) * 100);
    el.textContent = '⚡ Maestria ' + lvl + ' (+' + perm + '% DMG)';
  }

  function showComboMessage(msg) {
    var log = document.getElementById('battle-log');
    if (!log) return;
    var entry = document.createElement('div');
    entry.style.cssText = 'color:#f97316;font-weight:700;font-size:11px;animation:fadeIn 0.3s;';
    entry.textContent = '🔥 ' + msg;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
    setTimeout(function() { if (entry.parentNode) entry.parentNode.removeChild(entry); }, 3000);
  }

  // ── BOOT ──────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(init, 1500); });
  } else {
    setTimeout(init, 1500);
  }

})();
