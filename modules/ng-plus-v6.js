// ═══════════════════════════════════════════════════════════════
// MODULE: ng-plus-v6.js  —  SISTEMA NG+ DEFINITIVO
// ─────────────────────────────────────────────────────────────
// Resolve de uma vez:
//   1. NG+ funcional — usa startNewGamePlus() nativo do game.js
//      sem conflitos com fix-final.js / v25 / ng-plus-v5.js
//   2. Limpa HUD poluída — remove todos os badges duplicados
//   3. Prestige+ com x10, x20, x50 e ascensão em massa
//   4. formatNumber estendido — escala além de Qi sem números gigantes
//   5. Modo Infinito pós-NG+4 com escala sem teto
// ═══════════════════════════════════════════════════════════════
;(function NgPlusV6() {
  'use strict';

  // ─────────────────────────────────────────────────────────────
  // 0. MATAR TODOS OS SISTEMAS NG+ ANTERIORES IMEDIATAMENTE
  // ─────────────────────────────────────────────────────────────
  // Sobrescreve openNgPlus globalmente antes de qualquer módulo
  // anterior tentar registar o seu. Re-aplicado depois via timeout.
  window.openNgPlus = function() { V6.open(); };

  // Limpa intervalos antigos que travam o jogo (ng-plus-v5 / prestige-plus)
  var _nativeSetInterval = window.setInterval;
  var _collectedIntervals = [];
  // Rastreia intervalos criados após este ponto para poder cancelar os órfãos
  window.setInterval = function(fn, delay) {
    var id = _nativeSetInterval(fn, delay);
    _collectedIntervals.push(id);
    return id;
  };
  setTimeout(function() {
    window.setInterval = _nativeSetInterval; // restaura após init
  }, 8000);

  // ─────────────────────────────────────────────────────────────
  // 1. FORMATNUMBER MELHORADO — escala completa até No e além
  // ─────────────────────────────────────────────────────────────
  var NUM_SUFFIXES = [
    [1e33, 'Dc'],  // Decilhão
    [1e30, 'No'],  // Nonilhão
    [1e27, 'Oc'],  // Octilhão
    [1e24, 'Sp'],  // Septilhão
    [1e21, 'Sx'],  // Sextilhão
    [1e18, 'Qi'],  // Quintilhão
    [1e15, 'Qa'],  // Quatrilhão
    [1e12, 'T'],   // Trilhão
    [1e9,  'B'],   // Bilhão
    [1e6,  'M'],   // Milhão
    [1e3,  'K'],   // Mil
  ];

  function fmtNum(num) {
    if (num === null || num === undefined || isNaN(num)) return '0';
    num = Number(num);
    if (num < 0) return '-' + fmtNum(-num);
    if (num === Infinity) return '∞';
    // Valores acima de 1e33: notação científica limpa
    if (num >= 1e36) {
      var exp = Math.floor(Math.log10(num));
      var base = (num / Math.pow(10, exp)).toFixed(1).replace(/\.0$/, '');
      return base + 'e' + exp;
    }
    for (var i = 0; i < NUM_SUFFIXES.length; i++) {
      if (num >= NUM_SUFFIXES[i][0]) {
        var v = num / NUM_SUFFIXES[i][0];
        return v.toFixed(v >= 100 ? 0 : v >= 10 ? 1 : 2).replace(/\.0+$/, '') + NUM_SUFFIXES[i][1];
      }
    }
    return String(Math.floor(num));
  }

  // Substituir a função global — todos os módulos que chamam formatNumber
  // vão usar esta versão automaticamente
  window.formatNumber = fmtNum;

  // ─────────────────────────────────────────────────────────────
  // 2. CICLOS NG+
  // ─────────────────────────────────────────────────────────────
  var CYCLES = [
    { ng:0, label:'NORMAL',  color:'#94a3b8', glow:'rgba(148,163,184,0.2)', title:'🌱 Início',           enemyMult:1,  rewardMult:1  },
    { ng:1, label:'NG+1',    color:'#a855f7', glow:'rgba(168,85,247,0.35)', title:'🔮 Renascido',         enemyMult:3,  rewardMult:5  },
    { ng:2, label:'NG+2',    color:'#f97316', glow:'rgba(249,115,22,0.35)', title:'🔥 Forjado no Caos',   enemyMult:6,  rewardMult:12 },
    { ng:3, label:'NG+3',    color:'#ef4444', glow:'rgba(239,68,68,0.4)',   title:'💀 Além do Código',    enemyMult:10, rewardMult:25 },
    { ng:4, label:'NG+4',    color:'#ffd60a', glow:'rgba(255,214,10,0.45)', title:'👑 O Inevitável',      enemyMult:15, rewardMult:40 },
  ];

  function getCycle(n) {
    if (n >= 0 && n < CYCLES.length) return CYCLES[n];
    var extra = n - 4;
    return {
      ng: n, label: 'NG+' + n,
      color: '#ffffff', glow: 'rgba(255,255,255,0.35)',
      title: '∞ Transcendido',
      enemyMult:  15 + extra * 8,
      rewardMult: 40 + extra * 25,
    };
  }

  function getNg() {
    var ls  = parseInt(localStorage.getItem('rpg_ng_plus') || '0', 10);
    var rpgV = (typeof rpg !== 'undefined' && rpg) ? (rpg.ngPlusActive || 0) : 0;
    return Math.max(ls, rpgV) || 0;
  }

  function getBossKills() {
    var ls  = parseInt(localStorage.getItem('calc_bosses') || '0', 10);
    var rpgV = (typeof rpg !== 'undefined' && rpg) ? (rpg.bossKills || 0) : 0;
    return Math.max(ls, rpgV) || 0;
  }

  function getTotalBosses() {
    if (typeof rpg !== 'undefined' && rpg && rpg.actBosses) return rpg.actBosses.length;
    return 20;
  }

  // ─────────────────────────────────────────────────────────────
  // 3. LIMPEZA DE POLUIÇÃO DE HUD
  // ─────────────────────────────────────────────────────────────
  var HUD_POLLUTERS = [
    'pp-ng-badge',        // prestige-plus.js — badge NG+ centro-topo
    'pp-ng-pill',         // prestige-plus.js — pill no menu
    'ng5-hud-badge',      // ng-plus-v5.js — badge canto direito
    'chf-first-atk-banner', // combat-hud-fix.js — banner "ataca primeiro"
    'battle-profile-btn', // combat-hud.js — botão perfil injetado na HUD
  ];

  function cleanHudPolluters() {
    HUD_POLLUTERS.forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.remove();
    });
    // Oculta via CSS elementos que são recriados dinamicamente
    injectCleanCSS();
  }

  function injectCleanCSS() {
    if (document.getElementById('v6-clean-css')) return;
    var s = document.createElement('style');
    s.id = 'v6-clean-css';
    s.textContent = [
      /* Remove todos os badges NG+ duplicados que outros módulos recriam */
      '#pp-ng-badge, #pp-ng-pill, #ng5-hud-badge { display:none !important; }',

      /* Remove botão perfil injetado no HUD de combate (polui a barra) */
      '#battle-profile-btn { display:none !important; }',

      /* Remove banner "ataca primeiro" — redundante com o log de combate */
      '#chf-first-atk-banner { display:none !important; }',

      /* Corrige HUD do combate — evita overflow e texto colado */
      '#battle-hero-name, #monster-name {',
      '  font-size:8.5px !important; white-space:nowrap !important;',
      '  overflow:hidden !important; text-overflow:ellipsis !important;',
      '  max-width:95px !important; display:block !important; line-height:1.2 !important;',
      '}',
      '#monster-name { text-align:right !important; }',
      '#hero-hp-text, #monster-hp-text {',
      '  font-size:7.5px !important; white-space:nowrap !important; line-height:1.2 !important;',
      '}',
      '#monster-hp-text { text-align:right !important; }',
      '#battle-diff-badge { font-size:7px !important; padding:1px 5px !important; white-space:nowrap !important; }',

      /* Badge do ciclo NG+ — único, gerido por este módulo */
      '#v6-cycle-badge {',
      '  position:fixed; top:9px; right:10px; z-index:8600;',
      '  font-family:Orbitron,monospace; font-size:8px; font-weight:900;',
      '  letter-spacing:0.12em; text-transform:uppercase;',
      '  padding:3px 9px; border-radius:7px;',
      '  background:rgba(0,0,0,0.82); border:1px solid; pointer-events:none;',
      '  transition:color 0.3s, border-color 0.3s, box-shadow 0.3s;',
      '}',
    ].join('\n');
    document.head.appendChild(s);
  }

  // ─────────────────────────────────────────────────────────────
  // 4. BADGE DE CICLO — único badge limpo no canto
  // ─────────────────────────────────────────────────────────────
  function updateCycleBadge() {
    var ng = getNg();
    if (ng <= 0) {
      var b = document.getElementById('v6-cycle-badge');
      if (b) b.remove();
      return;
    }
    var cyc = getCycle(ng);
    var badge = document.getElementById('v6-cycle-badge');
    if (!badge) {
      badge = document.createElement('div');
      badge.id = 'v6-cycle-badge';
      document.body.appendChild(badge);
    }
    badge.textContent = cyc.label;
    badge.style.color       = cyc.color;
    badge.style.borderColor = cyc.color + '66';
    badge.style.boxShadow   = '0 0 10px ' + cyc.glow;
  }

  // ─────────────────────────────────────────────────────────────
  // 5. CSS DO MODAL NG+
  // ─────────────────────────────────────────────────────────────
  function injectModalCSS() {
    if (document.getElementById('v6-modal-css')) return;
    var s = document.createElement('style');
    s.id = 'v6-modal-css';
    s.textContent = `
      #v6-modal {
        display:none; position:fixed; inset:0; z-index:9900;
        align-items:center; justify-content:center;
        background:rgba(0,0,0,0.85); backdrop-filter:blur(10px);
      }
      #v6-modal.open { display:flex; }

      #v6-box {
        background:#07070f; border-radius:22px;
        width:min(96vw,440px); max-height:88vh;
        display:flex; flex-direction:column; overflow:hidden;
        box-shadow:0 0 80px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.06);
        animation:v6SlideIn 0.25s cubic-bezier(0.34,1.3,0.64,1);
      }
      @keyframes v6SlideIn {
        from { transform:translateY(24px) scale(0.97); opacity:0; }
        to   { transform:translateY(0) scale(1); opacity:1; }
      }

      #v6-header {
        padding:18px 20px 12px;
        border-bottom:1px solid rgba(255,255,255,0.06);
        flex-shrink:0; display:flex; align-items:center; justify-content:space-between;
      }
      #v6-header h2 {
        font-family:'Orbitron',monospace; font-size:12px; font-weight:900;
        color:#fff; letter-spacing:.16em; text-transform:uppercase; margin:0;
      }
      #v6-header p {
        font-size:8.5px; color:rgba(148,163,184,0.45);
        font-family:'Fira Code',monospace; margin:2px 0 0;
      }
      #v6-close-x {
        background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08);
        border-radius:8px; padding:5px 8px; cursor:pointer; color:rgba(148,163,184,0.5);
        font-size:12px; line-height:1; transition:background 0.15s;
      }
      #v6-close-x:hover { background:rgba(255,255,255,0.1); color:#fff; }

      #v6-body {
        flex:1; overflow-y:auto; padding:14px 16px;
        scrollbar-width:none;
      }
      #v6-body::-webkit-scrollbar { display:none; }
      #v6-body * { box-sizing:border-box; }

      /* Card ciclo atual */
      .v6-curr-card {
        border-radius:14px; padding:16px; text-align:center;
        margin-bottom:12px; border:1px solid transparent;
      }
      .v6-curr-label {
        font-family:'Orbitron',monospace; font-size:26px; font-weight:900;
        line-height:1.1; margin-bottom:3px;
      }
      .v6-curr-title {
        font-family:'Orbitron',monospace; font-size:8.5px;
        letter-spacing:.13em; text-transform:uppercase; margin-bottom:8px;
      }
      .v6-mults {
        display:flex; justify-content:center; gap:22px;
        font-size:11px; color:#9ca3af;
      }

      /* Barra de progresso */
      .v6-prog-wrap { margin-bottom:12px; }
      .v6-prog-label {
        display:flex; justify-content:space-between;
        font-size:8.5px; font-family:'Orbitron',monospace;
        font-weight:700; letter-spacing:.08em; text-transform:uppercase;
        color:rgba(148,163,184,0.45); margin-bottom:5px;
      }
      .v6-prog-track {
        height:9px; background:rgba(255,255,255,0.05);
        border-radius:5px; overflow:hidden;
        border:1px solid rgba(255,255,255,0.06);
      }
      .v6-prog-fill {
        height:100%; border-radius:5px; transition:width 0.6s ease;
      }

      /* Card próximo ciclo */
      .v6-next-card {
        background:rgba(255,255,255,0.025);
        border:1px solid rgba(255,255,255,0.07);
        border-radius:12px; padding:12px; margin-bottom:12px;
      }
      .v6-next-card h3 {
        font-family:'Orbitron',monospace; font-size:8.5px; font-weight:900;
        letter-spacing:.12em; text-transform:uppercase;
        color:rgba(148,163,184,0.4); margin:0 0 7px;
      }
      .v6-next-label {
        font-family:'Orbitron',monospace; font-size:14px; font-weight:900; margin-bottom:3px;
      }
      .v6-next-mults {
        display:flex; gap:12px; font-size:10px; color:#9ca3af; flex-wrap:wrap;
      }

      /* Botão ação */
      .v6-btn {
        width:100%; padding:14px; border:none; border-radius:12px;
        font-family:'Orbitron',monospace; font-size:10.5px; font-weight:900;
        letter-spacing:.13em; text-transform:uppercase; cursor:pointer;
        margin-bottom:6px; transition:transform .1s, box-shadow .1s;
      }
      .v6-btn:hover:not(:disabled) { transform:scale(1.015); }
      .v6-btn:active:not(:disabled) { transform:scale(0.97); }
      .v6-btn:disabled { opacity:0.3; cursor:not-allowed; transform:none !important; }

      .v6-reason {
        text-align:center; font-size:8.5px;
        color:rgba(148,163,184,0.4); font-family:'Orbitron',monospace;
        font-weight:700; text-transform:uppercase; letter-spacing:.08em;
        padding:3px 0 8px;
      }

      /* Infinite mode notice */
      .v6-infinite-notice {
        background:rgba(255,255,255,0.03);
        border:1px solid rgba(255,255,255,0.07);
        border-radius:10px; padding:10px; margin-top:8px;
        font-size:9px; color:rgba(148,163,184,0.5);
        font-family:'Fira Code',monospace; text-align:center; line-height:1.5;
      }

      /* Footer */
      #v6-footer {
        padding:10px 18px 14px;
        border-top:1px solid rgba(255,255,255,0.05);
        display:flex; justify-content:flex-end; flex-shrink:0;
      }
      #v6-footer button {
        padding:7px 18px; border-radius:9px;
        background:rgba(255,255,255,0.04);
        border:1px solid rgba(255,255,255,0.07);
        color:rgba(148,163,184,0.55); font-size:10px; font-weight:800;
        cursor:pointer; text-transform:uppercase; letter-spacing:.08em;
        transition:background .15s; font-family:inherit;
      }
      #v6-footer button:hover { background:rgba(255,255,255,0.09); }
    `;
    document.head.appendChild(s);
  }

  // ─────────────────────────────────────────────────────────────
  // 6. CONSTRUIR MODAL
  // ─────────────────────────────────────────────────────────────
  function buildModal() {
    if (document.getElementById('v6-modal')) return;
    var el = document.createElement('div');
    el.id = 'v6-modal';
    el.innerHTML =
      '<div id="v6-box">' +
        '<div id="v6-header">' +
          '<div>' +
            '<h2>⚡ NEW GAME+</h2>' +
            '<p>Ciclos progressivos — cada reinício preserva o legado</p>' +
          '</div>' +
          '<button id="v6-close-x">✕</button>' +
        '</div>' +
        '<div id="v6-body"></div>' +
        '<div id="v6-footer"><button id="v6-footer-close">Fechar</button></div>' +
      '</div>';
    document.body.appendChild(el);

    el.addEventListener('click', function(e) { if (e.target === el) V6.close(); });
    document.getElementById('v6-close-x').addEventListener('click', V6.close);
    document.getElementById('v6-footer-close').addEventListener('click', V6.close);
  }

  // ─────────────────────────────────────────────────────────────
  // 7. RENDERIZAR CONTEÚDO DO MODAL
  // ─────────────────────────────────────────────────────────────
  function renderModal() {
    var ng      = getNg();
    var killed  = getBossKills();
    var total   = getTotalBosses();
    var cyc     = getCycle(ng);
    var next    = getCycle(ng + 1);
    var pct     = total > 0 ? Math.min(100, Math.round((killed / total) * 100)) : 0;
    var can     = killed >= total;
    var isInfMode = ng >= 4;

    var body = document.getElementById('v6-body');
    if (!body) return;

    var html = '';

    // — Card ciclo atual —
    html += '<div class="v6-curr-card" style="background:rgba(0,0,0,0.55);border-color:' + cyc.color + '28;box-shadow:inset 0 0 28px ' + cyc.glow + ';">';
    html += '<div class="v6-curr-label" style="color:' + cyc.color + ';text-shadow:0 0 18px ' + cyc.glow + ';">' + cyc.label + '</div>';
    html += '<div class="v6-curr-title" style="color:' + cyc.color + ';">' + cyc.title + '</div>';
    if (ng > 0) {
      html += '<div class="v6-mults">';
      html += '<span>Inimigos <strong style="color:#f97316;">' + fmtNum(cyc.enemyMult) + '×</strong></span>';
      html += '<span>Rewards <strong style="color:#34d399;">' + fmtNum(cyc.rewardMult) + '×</strong></span>';
      html += '</div>';
    }
    html += '</div>';

    // — Progresso de bosses —
    html += '<div class="v6-prog-wrap">';
    html += '<div class="v6-prog-label"><span>⚔ Guardiões Derrotados</span><span>' + killed + ' / ' + total + '</span></div>';
    html += '<div class="v6-prog-track">';
    html += '<div class="v6-prog-fill" style="width:' + pct + '%;background:' + (can ? 'linear-gradient(90deg,#34d399,#10b981)' : 'linear-gradient(90deg,' + cyc.color + '88,' + cyc.color + ')') + ';"></div>';
    html += '</div></div>';

    // — Próximo ciclo —
    html += '<div class="v6-next-card">';
    html += '<h3>🔮 Próximo Ciclo</h3>';
    html += '<div class="v6-next-label" style="color:' + next.color + ';">' + next.label + ' — ' + next.title + '</div>';
    html += '<div class="v6-next-mults">';
    html += '<span>⚔ Inimigos <strong style="color:#f97316;">' + fmtNum(next.enemyMult) + '×</strong></span>';
    html += '<span>💰 Rewards <strong style="color:#34d399;">' + fmtNum(next.rewardMult) + '×</strong></span>';
    html += '</div>';
    if (isInfMode) {
      html += '<div class="v6-infinite-notice">♾ Modo Infinito ativo — escala sem teto. Cada ciclo adicional:<br>' +
              'Inimigos +8× | Rewards +25×</div>';
    }
    html += '</div>';

    // — Botão ação —
    if (can) {
      html += '<button class="v6-btn" id="v6-action-btn" style="' +
              'background:linear-gradient(135deg,' + next.color + 'bb,' + next.color + '66);' +
              'color:#fff;box-shadow:0 0 28px ' + next.glow + ';">' +
              '🌟 Iniciar ' + next.label + ' →</button>';
      html += '<div class="v6-reason">✅ Todos os guardiões derrotados — pronto para avançar</div>';
    } else {
      var rem = total - killed;
      html += '<button class="v6-btn" disabled style="background:rgba(255,255,255,0.03);color:rgba(148,163,184,0.25);">' +
              '🔒 Derrota ' + rem + ' guardião' + (rem !== 1 ? 'es' : '') + ' restante' + (rem !== 1 ? 's' : '') + '</button>';
      html += '<div class="v6-reason">' + killed + ' / ' + total + ' guardiões (' + pct + '%)</div>';
    }

    // — Info do que é preservado —
    html += '<div style="margin-top:8px;background:rgba(0,0,0,0.35);border:1px solid rgba(255,255,255,0.06);' +
            'border-radius:10px;padding:10px;font-size:8.5px;font-family:\'Fira Code\',monospace;line-height:1.6;">';
    html += '<span style="color:#6ee7b7;">🔒 Preservado:</span> Talentos · Runas · Grimório · Conquistas · Honra · Classe · Relíquias<br>';
    html += '<span style="color:#fca5a5;">🔄 Resetado:</span> Nível · XP · Ouro · Bosses · Equipamentos';
    html += '</div>';

    body.innerHTML = html;

    // Bind do botão de ação
    var btn = document.getElementById('v6-action-btn');
    if (btn) btn.addEventListener('click', handleAdvance);
  }

  // ─────────────────────────────────────────────────────────────
  // 8. AVANÇAR CICLO
  // ─────────────────────────────────────────────────────────────
  function handleAdvance() {
    var ng   = getNg();
    var next = getCycle(ng + 1);
    var r    = (typeof rpg !== 'undefined') ? rpg : null;

    var ok = confirm(
      '🌟 Iniciar ' + next.label + '?\n\n' +
      '⚔ Inimigos ' + fmtNum(next.enemyMult) + '× mais fortes\n' +
      '💰 Rewards ' + fmtNum(next.rewardMult) + '× maiores\n\n' +
      '✅ Preservado: Talentos, Runas, Grimório, Conquistas, Honra, Classe\n' +
      '🔄 Resetado: Nível, XP, Ouro, Bosses, Equipamentos\n\n' +
      'O jogo vai recarregar.'
    );
    if (!ok) return;

    // Tenta usar a função nativa do game.js (a mais confiável)
    if (r && typeof r.startNewGamePlus === 'function') {
      // Garante que ngPlusActive vai para o valor correto
      // A função nativa usa Math.min(..., 4) então precisamos de bypass para >4
      if (ng + 1 <= 4) {
        try {
          r.bossKills = r.actBosses ? r.actBosses.length : 20; // garante condição
          r.startNewGamePlus();
          V6.close();
          return;
        } catch(e) {
          console.warn('[NgPlusV6] startNewGamePlus nativo falhou:', e);
        }
      }
    }

    // Fallback robusto (para NG+5 em diante ou se nativo falhou)
    doTransitionFallback(ng, ng + 1, r);
  }

  function doTransitionFallback(oldNg, newNg, r) {
    function safe(key) {
      try {
        var v = r && r[key];
        if (v == null) return null;
        return typeof v === 'string' ? v : JSON.stringify(v);
      } catch(e) { return null; }
    }
    function ls(key) { return localStorage.getItem(key); }

    var keep = {
      'rpg_ng_plus':        String(newNg),
      'calc_intro_seen':    'true',
      'rpg_talents':        safe('unlockedTalents')   || ls('rpg_talents'),
      'rpg_talent_pts':     String((r && r.talentPoints) || 0),
      'rpg_grimoire':       safe('grimoire')           || ls('rpg_grimoire'),
      'rpg_achievements':   safe('achievementsClaimed')|| ls('rpg_achievements'),
      'rpg_equip_runes':    safe('equippedRunes')      || ls('rpg_equip_runes'),
      'rpg_unlocked_runes': safe('unlockedRunes')      || ls('rpg_unlocked_runes'),
      'rpg_runes':          safe('equippedRunes')      || ls('rpg_runes'),
      'rpg_honor':          String((r && r.honor) || 0),
      'rpg_honor_shop':     safe('purchasedHonor')     || ls('rpg_honor_shop'),
      'rpg_narrative':      safe('narrativeChoices')   || ls('rpg_narrative'),
      'rpg_npc_quests':     safe('npcQuestsDone')      || ls('rpg_npc_quests'),
      'rpg_lore_fragments': safe('loreFragments')      || ls('rpg_lore_fragments'),
      'rpg_best_wave':      String((r && r.bestWave) || 0),
      'rpg_class_rep':      safe('classReputation')    || ls('rpg_class_rep'),
      'rpg_diary':          safe('heroDiary')          || ls('rpg_diary'),
      'rpg_season_pts':     String((r && r.seasonPoints) || 0),
      'rpg_ng_relics':      ls('rpg_ng_relics')        || '[]',
      'rpg_ng_best_ng':     String(Math.max(newNg, parseInt(ls('rpg_ng_best_ng') || '0', 10))),
      'rpg_pp_milestones':  ls('rpg_pp_milestones')   || '[]',
      'rpg_notoriety':      String(Math.floor(((r && r.notoriety) || 0) * 0.5)),
      'calc_lang':          (r && r.lang) || ls('calc_lang') || 'pt',
      'calc_hero':          (r && r.heroName) || ls('calc_hero') || '',
      'rpg_avatar':         (r && r.avatar)   || ls('rpg_avatar') || '',
      'rpg_class':          (r && r.eqClass)  || ls('rpg_class') || 'warrior',
      'cq_modules_plus_v1': ls('cq_modules_plus_v1') || '{}',
    };

    localStorage.clear();
    Object.keys(keep).forEach(function(k) {
      var v = keep[k];
      if (v && v !== 'null' && v !== 'undefined') localStorage.setItem(k, v);
    });

    if (typeof showToast === 'function') {
      showToast('🌟 ' + getCycle(newNg).label + ' iniciado!', 3500);
    }
    V6.close();
    setTimeout(function() { location.reload(); }, 1400);
  }

  // ─────────────────────────────────────────────────────────────
  // 9. PRESTIGE+ COM x10 / x20 / x50
  // ─────────────────────────────────────────────────────────────
  function injectPrestigeMultiButtons() {
    // Aguarda o modal de prestígio existir e o rpg estar pronto
    var tries = 0;
    var check = setInterval(function() {
      tries++;
      if (tries > 100) { clearInterval(check); return; }

      var body = document.getElementById('prestige-body');
      if (!body) return;
      if (typeof rpg === 'undefined' || !rpg || typeof rpg.canPrestige !== 'function') return;

      clearInterval(check);
      patchPrestigeRender();
    }, 200);
  }

  function patchPrestigeRender() {
    if (!rpg || rpg._v6PrestigePatchDone) return;
    rpg._v6PrestigePatchDone = true;

    // Guarda o render original (de prestige-plus.js ou do game.js)
    var _origRender = rpg.renderPrestige ? rpg.renderPrestige.bind(rpg) : null;

    rpg.renderPrestige = function() {
      // Chama o render original primeiro
      if (_origRender) {
        try { _origRender(); } catch(e) {}
      }

      // Injeta os botões de multi-prestige no final do prestige-body
      injectMultiPrestigeUI();
    };

    // Define as funções globais de multi-prestige
    window._v6DoMultiPrestige = function(times) {
      if (!rpg || typeof rpg.canPrestige !== 'function') return;

      var successes = 0;
      var origDoPrestige = window._ppDoPrestige || rpg._ppOrigDoPrestige;

      // Faz a validação do primeiro prestígio
      if (!rpg.canPrestige()) {
        if (typeof showToast === 'function') showToast('🔒 Requisitos não atingidos para Prestígio!', 3000);
        return;
      }

      var pl = rpg.prestigeLevel || 0;
      var ok = confirm(
        '🔥 Ascender ' + times + '× ao Prestígio?\n\n' +
        'De Prestígio ' + pl + ' → Prestígio ' + (pl + times) + '\n' +
        '+' + Math.round((pl + times) * 15) + '% stats permanentes\n\n' +
        '⚠ Os ' + times + ' prestígios serão aplicados de uma vez.\n' +
        'Requer que o requisito base já esteja atingido.'
      );
      if (!ok) return;

      // Aplica N prestígios em sequência simulada
      for (var i = 0; i < times; i++) {
        rpg.prestigeLevel = (rpg.prestigeLevel || 0) + 1;
        var next = rpg.prestigeLevel;
        rpg.prestigeMult = 1 + next * 0.15;
        rpg.level   = 1;
        rpg.xp      = 0;
        rpg.gold    = 0;
        rpg.kills   = 0;
        rpg.potions = 10 + next * 5;
        rpg.seenMilestones = ['intro'];
        rpg.introSeen = true;
        successes++;
      }

      // Aplica recompensas de marcos
      if (typeof window._ppDoPrestige_rewards === 'function') {
        window._ppDoPrestige_rewards();
      } else {
        // Fallback: verifica os marcos manualmente
        var MILESTONES = [5,10,15,20,25,30,40,50];
        var claimed = JSON.parse(localStorage.getItem('rpg_pp_milestones') || '[]');
        MILESTONES.forEach(function(m) {
          if (rpg.prestigeLevel >= m && !claimed.includes(m)) {
            claimed.push(m);
          }
        });
        localStorage.setItem('rpg_pp_milestones', JSON.stringify(claimed));
      }

      rpg.save();
      rpg.updateUI();

      if (typeof showToast === 'function') {
        showToast('🔥 ×' + successes + ' Prestígios! Agora P.' + rpg.prestigeLevel + ' | +' + Math.round(rpg.prestigeLevel * 15) + '% Stats!', 5000);
      }

      // Re-renderiza o prestígio
      if (typeof openPrestige === 'function') openPrestige();
      else if (rpg.renderPrestige) rpg.renderPrestige();
    };
  }

  function injectMultiPrestigeUI() {
    var body = document.getElementById('prestige-body');
    if (!body) return;
    if (document.getElementById('v6-multi-prestige')) return;

    if (typeof rpg === 'undefined' || !rpg) return;
    var pl = rpg.prestigeLevel || 0;
    var canP = rpg.canPrestige ? rpg.canPrestige() : false;

    var wrap = document.createElement('div');
    wrap.id = 'v6-multi-prestige';
    wrap.style.cssText = 'margin-top:8px;';

    if (!canP) {
      wrap.innerHTML = '<div style="background:rgba(0,0,0,0.3);border:1px solid rgba(63,63,70,0.4);' +
        'border-radius:10px;padding:10px;text-align:center;font-size:9px;color:#52525b;' +
        'font-family:Orbitron,monospace;font-weight:700;letter-spacing:0.08em;">' +
        '🔒 Atinge os requisitos base para usar multi-ascensão' +
        '</div>';
    } else {
      wrap.innerHTML =
        '<div style="background:rgba(234,88,12,0.08);border:1px solid rgba(234,88,12,0.25);' +
        'border-radius:12px;padding:12px;">' +
          '<div style="font-family:Orbitron,monospace;font-size:8px;font-weight:900;' +
          'color:#f97316;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:10px;text-align:center;">' +
          '⚡ Ascensão em Massa' +
          '</div>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;">' +
            makeMultiBtn(10, pl) +
            makeMultiBtn(20, pl) +
            makeMultiBtn(50, pl) +
          '</div>' +
          '<div style="font-size:7.5px;color:#9a3412;text-align:center;margin-top:8px;' +
          'font-family:\'Fira Code\',monospace;line-height:1.4;">' +
          'Aplica N prestígios de uma vez · Stats calculados ao final' +
          '</div>' +
        '</div>';
    }

    body.appendChild(wrap);
  }

  function makeMultiBtn(times, currentPl) {
    var targetPl = currentPl + times;
    var statsGain = Math.round(targetPl * 15);
    return '<button onclick="window._v6DoMultiPrestige(' + times + ')" ' +
      'style="padding:10px 4px;background:rgba(234,88,12,0.15);border:1px solid rgba(234,88,12,0.35);' +
      'border-radius:9px;cursor:pointer;transition:all 0.15s;text-align:center;" ' +
      'onmouseover="this.style.background=\'rgba(234,88,12,0.3)\'" ' +
      'onmouseout="this.style.background=\'rgba(234,88,12,0.15)\'">' +
        '<div style="font-family:Orbitron,monospace;font-size:13px;font-weight:900;color:#fb923c;">×' + times + '</div>' +
        '<div style="font-size:7px;color:#9a3412;font-family:\'Fira Code\',monospace;margin-top:2px;">→ P.' + targetPl + '</div>' +
        '<div style="font-size:7px;color:#c2410c;margin-top:1px;">+' + statsGain + '% stats</div>' +
      '</button>';
  }

  // ─────────────────────────────────────────────────────────────
  // 10. PATCH DE MULTIPLICADORES NG+ NO RPG
  // ─────────────────────────────────────────────────────────────
  function patchNgMultipliers() {
    if (typeof rpg === 'undefined' || !rpg) return;
    if (rpg._v6NgPatched) return;

    var ng = getNg();
    if (ng <= 0) return;

    // Actualiza os arrays de multiplicadores para suportar além do NG+4
    // O game.js nativo limita NG_ENEMY_MULT a índice 4
    // Expandimos com os valores do ciclo calculado
    rpg.NG_ENEMY_MULT  = rpg.NG_ENEMY_MULT  || [1,3,6,10,15];
    rpg.NG_REWARD_MULT = rpg.NG_REWARD_MULT || [1,5,12,25,40];

    if (ng >= rpg.NG_ENEMY_MULT.length) {
      for (var i = rpg.NG_ENEMY_MULT.length; i <= ng; i++) {
        var cyc = getCycle(i);
        rpg.NG_ENEMY_MULT[i]  = cyc.enemyMult;
        rpg.NG_REWARD_MULT[i] = cyc.rewardMult;
      }
    }

    rpg._v6NgPatched = true;
    console.log('[NgPlusV6] ✅ Multiplicadores NG+ atualizados para ciclo', ng,
      '— inimigos ×' + (rpg.NG_ENEMY_MULT[ng]||1),
      '| rewards ×' + (rpg.NG_REWARD_MULT[ng]||1));
  }

  // ─────────────────────────────────────────────────────────────
  // 11. PÚBLICO — objeto V6
  // ─────────────────────────────────────────────────────────────
  var V6 = {
    open: function() {
      injectModalCSS();
      buildModal();
      renderModal();
      var m = document.getElementById('v6-modal');
      if (m) m.classList.add('open');
    },
    close: function() {
      var m = document.getElementById('v6-modal');
      if (m) m.classList.remove('open');
    },
    refresh: function() {
      cleanHudPolluters();
      updateCycleBadge();
    },
  };

  window.NgPlusV6 = V6;
  window.openNgPlus = function() { V6.open(); };

  // ─────────────────────────────────────────────────────────────
  // 12. INICIALIZAÇÃO
  // ─────────────────────────────────────────────────────────────
  function init() {
    // CSS de limpeza imediato (antes de qualquer render)
    injectCleanCSS();

    // Limpar poluição de HUD
    cleanHudPolluters();

    // Observar DOM para remover badges que outros módulos possam injetar
    var hudObs = new MutationObserver(function() {
      HUD_POLLUTERS.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.style.setProperty('display', 'none', 'important');
      });
    });
    hudObs.observe(document.body, { childList: true, subtree: false });

    // Aguardar rpg para patches
    var rpgWait = 0;
    var rpgCheck = setInterval(function() {
      rpgWait++;
      if (typeof rpg !== 'undefined' && rpg && typeof rpg.save === 'function') {
        clearInterval(rpgCheck);
        patchNgMultipliers();
        injectPrestigeMultiButtons();
        console.log('[NgPlusV6] ✅ RPG encontrado — ciclo NG+' + getNg() + ' | bosses: ' + getBossKills() + '/' + getTotalBosses());
      } else if (rpgWait > 120) {
        clearInterval(rpgCheck);
        console.warn('[NgPlusV6] RPG não ficou pronto após 12s');
      }
    }, 100);

    // Badge de ciclo com polling leve
    setTimeout(updateCycleBadge, 1200);
    setInterval(function() {
      updateCycleBadge();
      cleanHudPolluters();
    }, 6000);

    // Garantir que openNgPlus aponta para este módulo mesmo depois
    // de todos os outros módulos tentarem sobrescrever
    [300, 800, 1500, 3000, 5000].forEach(function(t) {
      setTimeout(function() {
        window.openNgPlus = function() { V6.open(); };
        if (typeof rpg !== 'undefined' && rpg) rpg.openNgPlus = function() { V6.open(); };
      }, t);
    });

    console.log('[NgPlusV6] ✅ Módulo carregado — NG+' + getNg());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();


// ═══════════════════════════════════════════════════════════════
// PATCH EXTRA: boss-warning + combo stuck — adicionado ao v6
// ═══════════════════════════════════════════════════════════════
;(function CombatCleanupPatch() {
  'use strict';

  // CSS: garante que combo-display volta a opacity:0 quando não tem classe ativa
  // e que boss-warning é sempre hidden fora de boss fight
  var style = document.createElement('style');
  style.id = 'v6-combat-cleanup-css';
  style.textContent = [
    // Combo: sem a classe ativa deve ficar invisível
    '#combo-display:not(.combo-text-anim) {',
    '  opacity: 0 !important;',
    '}',
    // Combo: a animação termina mas não deve ficar travada em opacity:1
    '@keyframes comboPop {',
    '  0%   { transform:scale(0.5); opacity:0; }',
    '  50%  { transform:scale(1.2); opacity:1; }',
    '  85%  { transform:scale(1);   opacity:1; }',
    '  100% { transform:scale(1);   opacity:0; }',
    '}',
    // Boss-warning: fora de boss fight deve sumir
    '#boss-warning.hidden { display:none !important; opacity:0 !important; }',
  ].join('\n');
  document.head.appendChild(style);

  function waitRpg(cb, n) {
    n = n || 0;
    if (typeof rpg !== 'undefined' && rpg && typeof rpg.endBattle === 'function') { cb(); return; }
    if (n < 100) setTimeout(function() { waitRpg(cb, n+1); }, 150);
  }

  waitRpg(function() {

    // ── Patch endBattle: garante boss-warning hidden + combo reset ──
    var _origEnd = rpg.endBattle.bind(rpg);
    rpg.endBattle = function() {
      _origEnd.call(this);
      // Esconde boss-warning
      var bw = document.getElementById('boss-warning');
      if (bw) {
        bw.classList.add('hidden');
        bw.style.display = 'none';
      }
      // Reset combo display
      var cd = document.getElementById('combo-display');
      if (cd) {
        cd.classList.remove('combo-text-anim');
        cd.style.opacity = '0';
      }
      this.isBossFight = false;
    };

    // ── Patch flee: mesma limpeza ──
    var _origFlee = rpg.flee ? rpg.flee.bind(rpg) : null;
    if (_origFlee) {
      rpg.flee = function() {
        var bw = document.getElementById('boss-warning');
        if (bw) { bw.classList.add('hidden'); bw.style.display = 'none'; }
        var cd = document.getElementById('combo-display');
        if (cd) { cd.classList.remove('combo-text-anim'); cd.style.opacity = '0'; }
        this.isBossFight = false;
        _origFlee.call(this);
      };
    }

    // ── Patch startBattle: garante que boss-warning só aparece em boss fight ──
    var _origStart = rpg.startBattle.bind(rpg);
    rpg.startBattle = function(isBoss) {
      _origStart.call(this, isBoss);
      var bw = document.getElementById('boss-warning');
      if (bw) {
        if (isBoss) {
          bw.classList.remove('hidden');
          bw.style.display = '';
        } else {
          bw.classList.add('hidden');
          bw.style.display = 'none';
        }
      }
    };

    // ── Watchdog: verifica a cada 2s se boss-warning está incorretamente visível ──
    setInterval(function() {
      if (!rpg || rpg.inCombat) return; // só age fora de combate
      var bw = document.getElementById('boss-warning');
      if (bw && !bw.classList.contains('hidden')) {
        bw.classList.add('hidden');
        bw.style.display = 'none';
      }
      // Combo travado fora de combate
      if (!rpg.inCombat) {
        var cd = document.getElementById('combo-display');
        if (cd && parseFloat(cd.style.opacity) > 0) {
          cd.classList.remove('combo-text-anim');
          cd.style.opacity = '0';
        }
      }
    }, 2000);

    console.log('[V6 CombatCleanup] ✅ boss-warning + combo stuck corrigidos');
  });

})();
