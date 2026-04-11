// ═══════════════════════════════════════════════════════════════
// MODULE: prestige-infinite.js
// ─────────────────────────────────────────────────────────────
// Marcos de Prestígio infinitos: 100, 200, 300, 400... ∞
// Cada centena desbloqueia título, bónus permanente e badge.
// Os marcos além de 50 não são cobertos pelo prestige-plus.js.
// ═══════════════════════════════════════════════════════════════
(function PrestigeInfinite() {
  'use strict';

  // ── Utilitário ────────────────────────────────────────────────
  function rpgReady() {
    return typeof rpg !== 'undefined' && rpg && typeof rpg.save === 'function';
  }
  function waitRpg(cb, n) {
    if (rpgReady()) { cb(); return; }
    if ((n || 0) < 200) setTimeout(function () { waitRpg(cb, (n || 0) + 1); }, 100);
  }

  // ── Configuração de marcos por centena ───────────────────────
  //    Para P=100, 200, 300… o sistema gera automaticamente.
  //    Cada centena tem um "tier" com nome, cor, emoji e bónus.

  var CENTURY_TIERS = [
    { century: 1,   emoji: '💯',  name: 'Cem Vidas',        color: '#f59e0b',  permAll: 100,  titleKey: 'centurion'    },
    { century: 2,   emoji: '🌟',  name: 'Duplamente Lendário', color: '#a78bfa', permAll: 250, titleKey: 'double_legend' },
    { century: 3,   emoji: '🔥',  name: 'Chama Tricentenária', color: '#fb923c', permAll: 500, titleKey: 'tri_flame'    },
    { century: 4,   emoji: '⚡',  name: 'Tempestade Quádrupla', color: '#38bdf8', permAll: 900, titleKey: 'quad_storm'  },
    { century: 5,   emoji: '🌀',  name: 'Quintoessência',    color: '#818cf8',  permAll: 1500, titleKey: 'quintessence' },
    { century: 6,   emoji: '🌌',  name: 'Sextante Cósmico', color: '#e879f9',   permAll: 2500, titleKey: 'cosmic_six'  },
    { century: 7,   emoji: '🏛',  name: 'Sete Maravilhas',  color: '#fde68a',   permAll: 4000, titleKey: 'seven_wonders'},
    { century: 8,   emoji: '♾',  name: 'Infinito Oitavo',  color: '#6ee7b7',   permAll: 6500, titleKey: 'eight_infinite'},
    { century: 9,   emoji: '🐉',  name: 'Nono Dragão',      color: '#fca5a5',   permAll: 10000, titleKey: 'nine_dragon' },
    { century: 10,  emoji: '👑',  name: 'Décima Coroa',     color: '#fbbf24',   permAll: 15000, titleKey: 'tenth_crown' },
  ];

  // Para centenas > 10, gera progressivamente
  function getTierForCentury(c) {
    if (c <= 10) return CENTURY_TIERS[c - 1];
    // Cicla pelos tiers mas escala os bónus
    var base = CENTURY_TIERS[(c - 1) % 10];
    var scale = Math.floor((c - 1) / 10) + 1;
    return {
      century: c,
      emoji: base.emoji,
      name: base.name + ' ×' + scale,
      color: base.color,
      permAll: base.permAll * scale * scale,
      titleKey: base.titleKey + '_x' + scale
    };
  }

  // ── Titles / Badges dos títulos ───────────────────────────────
  var TITLE_LABELS = {
    centurion: { pt: 'Centurião', en: 'Centurion' },
    double_legend: { pt: 'Dupla Lenda', en: 'Double Legend' },
    tri_flame: { pt: 'Chama Tri', en: 'Tri Flame' },
    quad_storm: { pt: 'Quad Storm', en: 'Quad Storm' },
    quintessence: { pt: 'Quinta Essência', en: 'Quintessence' },
    cosmic_six: { pt: 'Sextante', en: 'Cosmic Six' },
    seven_wonders: { pt: '7 Maravilhas', en: '7 Wonders' },
    eight_infinite: { pt: '8º Infinito', en: '8th Infinite' },
    nine_dragon: { pt: 'Dragão IX', en: 'Dragon IX' },
    tenth_crown: { pt: 'Coroa X', en: 'Crown X' },
  };

  function getTitleLabel(key, lang) {
    var base = key.replace(/_x\d+$/, '');
    var suffix = key.match(/_x(\d+)$/);
    var t = TITLE_LABELS[base] || { pt: key, en: key };
    var str = t[lang] || t.pt;
    if (suffix) str += ' ×' + suffix[1];
    return str;
  }

  // ── Chave de save ─────────────────────────────────────────────
  var SAVE_KEY = 'rpg_pi_milestones'; // lista de centenas já reclamadas

  function getClaimed() {
    try { return JSON.parse(localStorage.getItem(SAVE_KEY) || '[]'); } catch (e) { return []; }
  }
  function saveClaimed(arr) {
    localStorage.setItem(SAVE_KEY, JSON.stringify(arr));
  }

  // ── Aplicar recompensas de marcos ────────────────────────────
  function applyInfiniteMilestones() {
    if (!rpgReady()) return;
    var pl = rpg.prestigeLevel || 0;
    if (pl < 100) return; // nada a fazer ainda

    var claimed = getClaimed();
    var maxCentury = Math.floor(pl / 100);

    for (var c = 1; c <= maxCentury; c++) {
      if (claimed.includes(c)) continue;
      var tier = getTierForCentury(c);
      claimed.push(c);
      saveClaimed(claimed);

      // Aplica bónus permanente
      rpg.permAllBonus = (rpg.permAllBonus || 0) + tier.permAll;

      // Registra título desbloqueado
      if (!rpg._piTitles) rpg._piTitles = [];
      if (!rpg._piTitles.includes(tier.titleKey)) {
        rpg._piTitles.push(tier.titleKey);
      }

      rpg.save();

      var lang = rpg.lang || 'pt';
      var label = getTitleLabel(tier.titleKey, lang);
      if (typeof showToast === 'function') {
        showToast(
          tier.emoji + ' Marco Lendário P.' + (c * 100) + '! +' + tier.permAll + '% Stats perm! Título: ' + label,
          7000
        );
      }
      console.log('[PrestigeInfinite] Marco P.' + (c * 100) + ' desbloqueado — ' + tier.name);
    }
  }

  // ── Badge dinâmico no HUD ─────────────────────────────────────
  function updateCenturyBadge() {
    if (!rpgReady()) return;
    var pl = rpg.prestigeLevel || 0;
    var c = Math.floor(pl / 100);
    if (!c) { removeBadge(); return; }

    var tier = getTierForCentury(c);
    var badge = document.getElementById('pi-century-badge');
    if (!badge) {
      badge = document.createElement('div');
      badge.id = 'pi-century-badge';
      badge.style.cssText = [
        'position:fixed;top:32px;left:50%;transform:translateX(-50%)',
        'font-family:Orbitron,sans-serif;font-size:7px;font-weight:900',
        'letter-spacing:.14em;padding:2px 8px;border-radius:4px',
        'border:1px solid;z-index:201;pointer-events:none;white-space:nowrap',
        'animation:piPulse 2s ease-in-out infinite alternate',
      ].join(';');
      document.body.appendChild(badge);
    }
    var lang = rpg.lang || 'pt';
    badge.textContent = tier.emoji + ' ' + getTitleLabel(tier.titleKey, lang).toUpperCase();
    badge.style.color = tier.color;
    badge.style.borderColor = tier.color;
    badge.style.background = 'rgba(0,0,0,0.8)';
    badge.style.boxShadow = '0 0 12px ' + tier.color + '55';
  }

  function removeBadge() {
    var b = document.getElementById('pi-century-badge');
    if (b) b.remove();
  }

  // ── Painel de marcos infinitos (injetado no prestige-body) ────
  function renderInfiniteMilestonesPanel() {
    var pl = rpgReady() ? (rpg.prestigeLevel || 0) : 0;
    if (pl < 50) return ''; // só mostra se próximo do 100

    var lang = rpgReady() ? (rpg.lang || 'pt') : 'pt';
    var claimed = getClaimed();
    var nextCentury = (Math.floor(pl / 100) + 1);
    var nextTarget = nextCentury * 100;
    var progress = Math.round((pl / nextTarget) * 100);
    var tier = getTierForCentury(nextCentury);

    // Lista últimas conquistas
    var doneRows = '';
    var maxDone = Math.floor(pl / 100);
    for (var i = Math.max(1, maxDone - 2); i <= maxDone; i++) {
      var dt = getTierForCentury(i);
      doneRows += '<div style="display:flex;align-items:center;gap:6px;padding:3px 0;border-bottom:1px solid rgba(255,255,255,0.04);">' +
        '<span style="font-size:14px;">' + dt.emoji + '</span>' +
        '<div style="flex:1;">' +
          '<span style="font-family:Orbitron,sans-serif;font-size:9px;font-weight:900;color:' + dt.color + ';">P.' + (i*100) + ' ' + getTitleLabel(dt.titleKey, lang) + '</span>' +
          '<span style="font-family:\'Fira Code\',monospace;font-size:7px;color:#52525b;display:block;">+' + dt.permAll + '% Stats perm.</span>' +
        '</div>' +
        '<span style="font-size:10px;color:#34d399;">✓</span>' +
      '</div>';
    }

    return [
      '<div id="pi-panel" style="background:linear-gradient(135deg,rgba(139,92,246,0.12),rgba(59,130,246,0.08));',
        'border:1px solid rgba(139,92,246,0.3);border-radius:14px;padding:14px;margin-bottom:10px;">',

        '<div style="font-family:Orbitron,sans-serif;font-size:8px;font-weight:900;',
          'color:#a78bfa;letter-spacing:.14em;text-transform:uppercase;margin-bottom:10px;text-align:center;">',
          '♾ MARCOS INFINITOS',
        '</div>',

        /* Próximo marco */
        '<div style="background:rgba(0,0,0,0.4);border:1px solid rgba(139,92,246,0.2);border-radius:10px;padding:10px;margin-bottom:8px;">',
          '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">',
            '<span style="font-family:Rajdhani,sans-serif;font-size:11px;font-weight:700;color:#c4b5fd;">',
              tier.emoji + ' Próximo: P.' + nextTarget,
            '</span>',
            '<span style="font-family:\'Fira Code\',monospace;font-size:8px;color:#6d28d9;">+' + tier.permAll + '% All</span>',
          '</div>',
          '<div style="font-size:8px;color:#7c3aed;font-family:Rajdhani,sans-serif;margin-bottom:6px;">' +
            getTitleLabel(tier.titleKey, lang) + ' — ' + tier.name +
          '</div>',
          '<div style="height:5px;background:rgba(0,0,0,0.5);border-radius:99px;overflow:hidden;">',
            '<div style="height:100%;border-radius:99px;',
              'background:linear-gradient(90deg,' + tier.color + '99,' + tier.color + ');',
              'width:' + progress + '%;transition:width .5s;">',
            '</div>',
          '</div>',
          '<div style="font-size:7px;color:#4c1d95;text-align:center;margin-top:3px;font-family:\'Fira Code\',monospace;">',
            pl + ' / ' + nextTarget + ' (' + progress + '%)',
          '</div>',
        '</div>',

        /* Conquistas recentes */
        maxDone > 0 ? (
          '<div style="border-top:1px solid rgba(139,92,246,0.15);padding-top:8px;">' +
            '<div style="font-family:\'Fira Code\',monospace;font-size:7px;color:#4c1d95;margin-bottom:6px;">MARCOS CONQUISTADOS</div>' +
            doneRows +
          '</div>'
        ) : '',

      '</div>',
    ].join('');
  }

  // ── Injetar painel no prestige-body ───────────────────────────
  function patchRenderPrestige() {
    if (!rpgReady()) return;
    var _orig = rpg.renderPrestige;
    rpg.renderPrestige = function () {
      _orig.apply(this, arguments);
      // Injeta painel de infinitos abaixo do conteúdo existente
      var body = document.getElementById('prestige-body');
      if (!body) return;
      var panel = document.getElementById('pi-panel');
      if (panel) panel.remove();
      var html = renderInfiniteMilestonesPanel();
      if (!html) return;
      var wrapper = document.createElement('div');
      wrapper.innerHTML = html;
      body.insertBefore(wrapper.firstChild, body.firstChild);
    };
  }

  // ── Hook no doPrestige ────────────────────────────────────────
  function hookDoPrestige() {
    if (!rpgReady()) return;
    var _orig = rpg.doPrestige || window._ppDoPrestige;
    if (!_orig) return;

    var _wrapped = function () {
      var r = _orig.apply(this, arguments);
      setTimeout(applyInfiniteMilestones, 300);
      setTimeout(updateCenturyBadge, 500);
      return r;
    };

    if (rpg.doPrestige) rpg.doPrestige = _wrapped;
    window._ppDoPrestige = _wrapped;
  }

  // ── CSS ───────────────────────────────────────────────────────
  function injectCSS() {
    if (document.getElementById('pi-css')) return;
    var s = document.createElement('style');
    s.id = 'pi-css';
    s.textContent = '@keyframes piPulse { 0%{opacity:.6;transform:translateX(-50%) scale(.98)} 100%{opacity:1;transform:translateX(-50%) scale(1)} }';
    document.head.appendChild(s);
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    injectCSS();
    waitRpg(function () {
      applyInfiniteMilestones();
      updateCenturyBadge();
      patchRenderPrestige();
      setTimeout(hookDoPrestige, 800);
      setInterval(function () {
        applyInfiniteMilestones();
        updateCenturyBadge();
      }, 8000);
      console.log('[PrestigeInfinite] ✅ Marcos infinitos activos');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expor para uso externo
  window._piGetPanel = renderInfiniteMilestonesPanel;

})();
