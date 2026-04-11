// ═══════════════════════════════════════════════════════════════
// MODULE: ng-plus-v4.js  —  NG+ REESCRITO v4
// ─────────────────────────────────────────────────────────────
// CORREÇÕES vs v3 / fix-final:
//   • SEM duplicate const modal (bug fatal do v3)
//   • Carrega APÓS fix-final.js e sobrescreve openNgPlus com
//     setTimeout encadeado — garante que vence qualquer módulo
//   • CSS corrigido: .modal-overlay NÃO recebe display:flex global
//     (fix-final.js quebrava todos os modais com essa regra)
//   • Modal abre via classList.add('active') + opacity/pointer-events
//     corretos — sem forçar display inline que conflita com o CSS base
//   • startNewGamePlus() nativo do game.js é usado diretamente
//   • Relíquias de ciclo preservadas no localStorage antes do reload
//   • Badge NG+ no HUD e indicador no menu
// ═══════════════════════════════════════════════════════════════
(function NgPlusV4() {
  'use strict';

  // ══════════════════════════════════════════════════════════════
  // 1. CICLOS NG+
  // ══════════════════════════════════════════════════════════════
  var CYCLES = [
    { ng:0, label:'NORMAL',  color:'#94a3b8', glow:'rgba(148,163,184,0.25)', title:'🌱 Início',           desc:'O começo de tudo.' },
    { ng:1, label:'NG+1',    color:'#a855f7', glow:'rgba(168,85,247,0.3)',   title:'🔮 Renascido',         desc:'O véu rasgou-se. O mundo lembra-se de ti.',
      relic:{ id:'ng1_echo',        name:'Eco do Passado',   icon:'🔮', desc:'+5% XP em cada kill' } },
    { ng:2, label:'NG+2',    color:'#f97316', glow:'rgba(249,115,22,0.3)',   title:'🔥 Forjado no Caos',   desc:'A chama não te consome — tu consomes a chama.',
      relic:{ id:'ng2_chaos_forge', name:'Forja do Caos',    icon:'🔥', desc:'Fury sobe 2× mais rápido' } },
    { ng:3, label:'NG+3',    color:'#ef4444', glow:'rgba(239,68,68,0.35)',   title:'💀 Além do Código',    desc:'Existir neste ciclo é um ato de violência contra a lógica.',
      relic:{ id:'ng3_void_pact',   name:'Pacto do Vazio',   icon:'💀', desc:'Críticos têm 15% de tirar -50% HP do monstro' } },
    { ng:4, label:'NG+4',    color:'#ffd60a', glow:'rgba(255,214,10,0.4)',   title:'👑 O Inevitável',      desc:'Não és um jogador. És a própria equação.',
      relic:{ id:'ng4_mirror',      name:'Espelho do Fim',   icon:'🪞', desc:'A cada 10 turnos troca stats com o monstro por 3 ataques' }, isMax:true },
  ];

  function getCycle(ng) {
    if (ng >= 0 && ng <= 4) return CYCLES[ng];
    return {
      ng: ng, label: 'NG+' + ng, color: '#ffffff', glow: 'rgba(255,255,255,0.4)',
      title: '∞ Transcendido', desc: 'Não existe nada além de ti e do combate.',
      enemyMult: 15 + (ng - 4) * 5, rewardMult: 40 + (ng - 4) * 15
    };
  }

  // ══════════════════════════════════════════════════════════════
  // 2. LEITURA DE ESTADO
  // ══════════════════════════════════════════════════════════════
  function getRpg() {
    return (typeof rpg !== 'undefined' && rpg && typeof rpg.killMonster === 'function') ? rpg : null;
  }

  function getNgLevel() {
    var r = getRpg();
    var fromSave = parseInt(localStorage.getItem('rpg_ng_plus') || '0');
    var fromRpg  = r ? (r.ngPlusActive || 0) : 0;
    return Math.max(fromSave, fromRpg);
  }

  function getBossKills() {
    var r = getRpg();
    var fromLS  = parseInt(localStorage.getItem('calc_bosses') || '0');
    var fromRpg = r ? (r.bossKills || 0) : 0;
    return Math.max(fromLS, fromRpg);
  }

  function getTotalBosses() {
    var r = getRpg();
    if (r && r.actBosses && Array.isArray(r.actBosses)) return r.actBosses.length;
    return 19;
  }

  function getEnemyMult(idx) {
    var r = getRpg();
    var mults = (r && r.NG_ENEMY_MULT) ? r.NG_ENEMY_MULT : [1, 3, 6, 10, 15];
    return mults[Math.min(idx, mults.length - 1)] || (15 + (idx - 4) * 5);
  }

  function getRewardMult(idx) {
    var r = getRpg();
    var mults = (r && r.NG_REWARD_MULT) ? r.NG_REWARD_MULT : [1, 5, 10, 20, 40];
    return mults[Math.min(idx, mults.length - 1)] || (40 + (idx - 4) * 15);
  }

  function getRelics() {
    try { return JSON.parse(localStorage.getItem('rpg_ng_relics') || '[]'); } catch(e) { return []; }
  }

  // ══════════════════════════════════════════════════════════════
  // 3. CSS — só o necessário, SEM quebrar modal-overlay global
  // ══════════════════════════════════════════════════════════════
  function injectCSS() {
    if (document.getElementById('ngv4-css')) return;
    var s = document.createElement('style');
    s.id = 'ngv4-css';
    s.textContent = [
      /* Apenas animações e scrollbar — display/opacity controlados via style inline */
      '#ngplus-body { scrollbar-width: none; }',
      '#ngplus-body::-webkit-scrollbar { display: none; }',
      '@keyframes ngv4Pulse { 0%{opacity:.6} 100%{opacity:1} }',
      '#ngv4-start-btn:hover { transform: scale(1.02) !important; }',
      '#ngv4-start-btn:active { transform: scale(0.97) !important; }',
      /* Garante que modal-content nunca fica escondido pelo CSS do index.html */
      '#ngplus-modal .modal-content { transform: none !important; opacity: 1 !important; }',
    ].join('\n');
    document.head.appendChild(s);
  }

  // ══════════════════════════════════════════════════════════════
  // 4. RENDER DO CONTEÚDO
  // ══════════════════════════════════════════════════════════════
  function renderContent() {
    var el = document.getElementById('ngplus-body');
    if (!el) { console.warn('[NgPlusV4] #ngplus-body não encontrado'); return false; }

    /* Se rpg ainda não carregou, mostra estado de loading */
    if (!getRpg()) {
      el.innerHTML = '<div style="text-align:center;padding:40px 20px;color:#52525b;font-family:Orbitron,sans-serif;font-size:10px;letter-spacing:.1em;">' +
        '<div style="font-size:24px;margin-bottom:12px;">⏳</div>' +
        'AGUARDANDO JOGO...<br>' +
        '<div style="font-size:8px;margin-top:8px;color:#3f3f46;">Clique novamente em alguns segundos</div>' +
        '</div>';
      return false;
    }

    var ng     = getNgLevel();
    var killed = getBossKills();
    var total  = getTotalBosses();
    var can    = killed >= total;
    var pct    = Math.min(100, Math.round((killed / Math.max(total, 1)) * 100));
    var curr   = getCycle(ng);
    var next   = getCycle(ng + 1);
    var currEM = getEnemyMult(ng);
    var currRM = getRewardMult(ng);
    var nextEM = getEnemyMult(ng + 1);
    var nextRM = getRewardMult(ng + 1);
    var relics = getRelics();

    el.innerHTML = [

      /* ── Ciclo Atual ── */
      '<div style="text-align:center;padding:16px 12px;border-radius:14px;margin-bottom:12px;',
        'background:rgba(0,0,0,0.55);border:1px solid ' + curr.color + '28;',
        'box-shadow:inset 0 0 24px ' + curr.glow + ';">',
        '<div style="font-family:Orbitron,sans-serif;font-size:26px;font-weight:900;',
          'color:' + curr.color + ';text-shadow:0 0 16px ' + curr.glow + ';margin-bottom:3px;">' + curr.label + '</div>',
        '<div style="font-family:Orbitron,sans-serif;font-size:9px;color:' + curr.color + ';',
          'letter-spacing:.14em;margin-bottom:4px;">' + curr.title + '</div>',
        '<div style="font-family:\'Fira Code\',monospace;font-size:8.5px;color:#52525b;font-style:italic;">"' + curr.desc + '"</div>',
        ng > 0
          ? '<div style="display:flex;justify-content:center;gap:20px;margin-top:10px;font-size:11px;">' +
              '<span style="color:#9ca3af;">Inimigos <strong style="color:#f97316;">' + currEM + '×</strong></span>' +
              '<span style="color:#9ca3af;">Rewards <strong style="color:#34d399;">' + currRM + '×</strong></span>' +
            '</div>'
          : '',
      '</div>',

      /* ── Progresso de Bosses ── */
      '<div style="background:rgba(0,0,0,0.45);border:1px solid rgba(255,255,255,.06);',
        'border-radius:12px;padding:12px;margin-bottom:10px;">',
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">',
          '<span style="font-family:Orbitron,monospace;font-size:7.5px;font-weight:900;',
            'color:#52525b;letter-spacing:.14em;text-transform:uppercase;">⚔ Guardiões Derrotados</span>',
          '<span style="font-family:\'Fira Code\',monospace;font-size:13px;font-weight:900;',
            'color:' + (can ? '#34d399' : '#a1a1aa') + ';">' + killed + '<span style="color:#52525b;">/' + total + '</span></span>',
        '</div>',
        '<div style="height:9px;background:rgba(0,0,0,.6);border-radius:99px;overflow:hidden;',
          'border:1px solid rgba(255,255,255,.05);margin-bottom:6px;">',
          '<div style="height:100%;width:' + pct + '%;transition:width .6s;border-radius:99px;',
            'background:' + (can ? 'linear-gradient(90deg,#059669,#34d399)' : 'linear-gradient(90deg,#7c3aed,#a855f7)') + ';',
            'box-shadow:0 0 8px ' + (can ? 'rgba(52,211,153,.5)' : 'rgba(168,85,247,.4)') + ';"></div>',
        '</div>',
        '<div style="font-family:\'Fira Code\',monospace;font-size:8.5px;text-align:center;',
          'font-weight:700;color:' + (can ? '#34d399' : '#f87171') + ';">',
          can
            ? '✅ Todos os Guardiões derrotados — NG+ disponível!'
            : '🔒 Faltam ' + (total - killed) + ' guardiões (' + pct + '%)',
        '</div>',
      '</div>',

      /* ── Próximo Ciclo ── */
      '<div style="background:rgba(0,0,0,0.38);border:1px solid rgba(255,255,255,.06);',
        'border-radius:12px;padding:12px;margin-bottom:10px;">',
        '<div style="font-family:Orbitron,monospace;font-size:7.5px;font-weight:900;',
          'color:#52525b;letter-spacing:.14em;text-transform:uppercase;margin-bottom:8px;">',
          '⚡ Próximo: ' + next.label + ' — ' + next.title,
        '</div>',
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:' + (next.relic ? '8px' : '0') + ';">',
          '<div style="background:rgba(0,0,0,.38);border:1px solid rgba(249,115,22,.18);',
            'border-radius:8px;padding:8px;text-align:center;">',
            '<div style="font-family:\'Fira Code\',monospace;font-size:8px;color:#52525b;margin-bottom:3px;">Inimigos</div>',
            '<div style="font-family:Orbitron,monospace;font-size:13px;font-weight:900;color:#f97316;">' + nextEM + '×</div>',
          '</div>',
          '<div style="background:rgba(0,0,0,.38);border:1px solid rgba(52,211,153,.18);',
            'border-radius:8px;padding:8px;text-align:center;">',
            '<div style="font-family:\'Fira Code\',monospace;font-size:8px;color:#52525b;margin-bottom:3px;">Recompensas</div>',
            '<div style="font-family:Orbitron,monospace;font-size:13px;font-weight:900;color:#34d399;">' + nextRM + '×</div>',
          '</div>',
        '</div>',
        next.relic
          ? '<div style="background:rgba(168,85,247,.07);border:1px solid rgba(168,85,247,.22);' +
              'border-radius:8px;padding:8px 10px;display:flex;gap:8px;align-items:center;">' +
              '<span style="font-size:16px;">' + next.relic.icon + '</span>' +
              '<div>' +
                '<div style="font-family:Rajdhani,sans-serif;font-size:12px;font-weight:700;color:#c084fc;">' + next.relic.name + '</div>' +
                '<div style="font-family:\'Fira Code\',monospace;font-size:8px;color:#52525b;">' + next.relic.desc + '</div>' +
              '</div></div>'
          : '',
      '</div>',

      /* ── Transição ── */
      '<div style="background:rgba(0,0,0,.38);border:1px solid rgba(255,255,255,.06);',
        'border-radius:12px;padding:12px;margin-bottom:10px;font-family:Rajdhani,sans-serif;font-size:12px;">',
        '<div style="font-family:Orbitron,monospace;font-size:7.5px;font-weight:900;',
          'color:#52525b;letter-spacing:.14em;text-transform:uppercase;margin-bottom:8px;">📋 Transição de Ciclo</div>',
        '<div style="color:#6ee7b7;margin-bottom:4px;">🔒 <strong>Mantido:</strong> Talentos · Runas · Grimório · Conquistas · Honra</div>',
        '<div style="color:#fca5a5;margin-bottom:4px;">🔄 <strong>Resetado:</strong> Nível · XP · Ouro · Bosses · Inventário</div>',
        '<div style="color:#c084fc;">✨ <strong>Ganho:</strong> ' + next.title + (next.relic ? ' · ' + next.relic.name : '') + '</div>',
      '</div>',

      /* ── Relíquias obtidas ── */
      relics.length
        ? '<div style="background:rgba(0,0,0,.38);border:1px solid rgba(251,191,36,.18);' +
            'border-radius:12px;padding:12px;margin-bottom:10px;">' +
            '<div style="font-family:Orbitron,monospace;font-size:7.5px;font-weight:900;' +
              'color:#d97706;letter-spacing:.14em;text-transform:uppercase;margin-bottom:8px;">✦ Relíquias de Ciclo</div>' +
            '<div style="display:flex;flex-wrap:wrap;gap:5px;">' +
              relics.map(function(r) {
                return '<div style="display:flex;align-items:center;gap:5px;background:rgba(0,0,0,.45);' +
                  'border:1px solid rgba(251,191,36,.18);border-radius:7px;padding:4px 8px;" title="' + (r.desc||'') + '">' +
                  '<span style="font-size:12px;">' + (r.icon||'⭐') + '</span>' +
                  '<span style="font-family:Rajdhani,sans-serif;font-size:11px;font-weight:700;color:#fcd34d;">' + r.name + '</span>' +
                  '</div>';
              }).join('') +
            '</div></div>'
        : '',

      /* ── Botão ── */
      can
        ? '<button id="ngv4-start-btn"' +
            ' style="width:100%;padding:14px;font-family:Orbitron,sans-serif;font-size:10px;' +
            'font-weight:900;letter-spacing:.12em;text-transform:uppercase;border-radius:12px;' +
            'cursor:pointer;border:2px solid ' + next.color + '70;color:' + next.color + ';' +
            'background:linear-gradient(135deg,' + next.color + '18,' + next.color + '08);' +
            'box-shadow:0 0 18px ' + next.glow + ';transition:all .2s;">' +
            '🌟 INICIAR ' + next.label +
            '<br><span style="font-size:7.5px;opacity:.7;font-weight:400;letter-spacing:.08em;">' + next.title + '</span>' +
            '</button>'
        : '<div style="text-align:center;padding:14px;border-radius:12px;' +
            'background:rgba(0,0,0,.38);border:1px solid rgba(255,255,255,.05);">' +
            '<div style="font-family:Orbitron,monospace;font-size:8.5px;color:#52525b;letter-spacing:.08em;">' +
              '🔒 DERROTA TODOS OS GUARDIÕES PRIMEIRO' +
            '</div>' +
            '<div style="font-family:\'Fira Code\',monospace;font-size:8px;color:#52525b;margin-top:4px;">' +
              'Progresso: ' + killed + ' / ' + total + ' (' + pct + '%)' +
            '</div></div>',

    ].join('');

    /* Bind do botão */
    var btn = document.getElementById('ngv4-start-btn');
    if (btn) {
      btn.addEventListener('click', handleStart);
    }
    return true;
  }

  // ══════════════════════════════════════════════════════════════
  // 5. ABRIR MODAL
  // ══════════════════════════════════════════════════════════════
  function openNgPlusV4() {
    var modal = document.getElementById('ngplus-modal');
    if (!modal) {
      console.error('[NgPlusV4] #ngplus-modal não encontrado!');
      return;
    }

    /* 1. Abre o modal IMEDIATAMENTE via inline styles — vence qualquer CSS */
    modal.style.cssText = [
      'display:flex !important',
      'position:fixed !important',
      'inset:0 !important',
      'z-index:99999 !important',
      'align-items:center !important',
      'justify-content:center !important',
      'background:rgba(0,0,0,0.88) !important',
      'backdrop-filter:blur(8px)',
      'opacity:1 !important',
      'pointer-events:auto !important',
    ].join(';');
    modal.classList.add('active');

    /* 2. Garante modal-content visível */
    var mc = modal.querySelector('.modal-content');
    if (mc) {
      mc.style.cssText += ';transform:none !important;opacity:1 !important';
    }

    /* 3. Fecha ao clicar no overlay */
    if (!modal._ngv4Bound) {
      modal._ngv4Bound = true;
      modal.addEventListener('click', function(e) {
        if (e.target === modal) closeNgPlusV4();
      });
    }

    /* 4. Renderiza conteúdo — em try/catch para nunca travar o modal */
    try {
      renderContent();
    } catch(e) {
      console.error('[NgPlusV4] renderContent erro:', e);
      var body = document.getElementById('ngplus-body');
      if (body) body.innerHTML = '<div style="color:#f87171;padding:20px;text-align:center;font-family:monospace;">Erro ao carregar NG+.<br>Tenta recarregar a página.</div>';
    }

    console.log('[NgPlusV4] Modal aberto — NG+' + getNgLevel() + ' | Bosses: ' + getBossKills() + '/' + getTotalBosses());
  }

  function closeNgPlusV4() {
    var modal = document.getElementById('ngplus-modal');
    if (!modal) return;
    modal.classList.remove('active');
    /* Limpa os estilos inline para fechar corretamente */
    modal.style.removeProperty('display');
    modal.style.removeProperty('opacity');
    modal.style.removeProperty('pointer-events');
    modal.style.removeProperty('z-index');
    modal.style.removeProperty('position');
    modal.style.removeProperty('inset');
    modal.style.removeProperty('background');
    modal.style.removeProperty('backdrop-filter');
    modal.style.removeProperty('align-items');
    modal.style.removeProperty('justify-content');
  }

  // ══════════════════════════════════════════════════════════════
  // 6. INICIAR NG+
  // ══════════════════════════════════════════════════════════════
  function handleStart() {
    var killed = getBossKills();
    var total  = getTotalBosses();

    if (killed < total) {
      if (typeof showToast === 'function') showToast('⚔ Derrota todos os ' + total + ' guardiões primeiro!', 3000);
      else alert('Derrota todos os ' + total + ' guardiões primeiro!\nAtual: ' + killed);
      return;
    }

    var ng   = getNgLevel();
    var next = getCycle(ng + 1);

    var ok = confirm(
      '🌟 Iniciar ' + next.label + '?\n\n' +
      '⚔ Inimigos ' + getEnemyMult(ng + 1) + '× mais fortes\n' +
      '💰 Rewards ' + getRewardMult(ng + 1) + '× maiores\n\n' +
      '✅ Preservado: Talentos, Runas, Grimório, Conquistas, Honra\n' +
      '🔄 Resetado: Nível, XP, Ouro, Bosses, Itens\n\n' +
      'O jogo vai recarregar.'
    );
    if (!ok) return;

    /* Salva relíquia do ciclo antes do reload */
    if (next.relic) {
      try {
        var existing = JSON.parse(localStorage.getItem('rpg_ng_relics') || '[]');
        if (!existing.some(function(r) { return r.id === next.relic.id; })) {
          existing.push(next.relic);
          localStorage.setItem('rpg_ng_relics', JSON.stringify(existing));
        }
      } catch(e) {}
    }

    /* Usa o método nativo do game.js (ele já faz o localStorage.clear + reload) */
    var r = getRpg();
    if (r && typeof r.startNewGamePlus === 'function') {
      try {
        r.ngPlusActive = ng + 1; /* atualiza antes de chamar */
        r.startNewGamePlus();
        return;
      } catch(e) {
        console.warn('[NgPlusV4] startNewGamePlus falhou, usando fallback:', e);
        r.ngPlusActive = ng; /* reverte */
      }
    }

    /* Fallback: preserva manualmente e recarrega */
    fallbackTransition(ng, ng + 1, next, r);
  }

  function fallbackTransition(oldNg, newNg, cfg, r) {
    var keep = {
      'rpg_ng_plus':        String(newNg),
      'calc_intro_seen':    'true',
      'rpg_talents':        safeJSON(r, 'unlockedTalents'),
      'rpg_talent_pts':     String((r && r.talentPoints) || 0),
      'rpg_grimoire':       safeJSON(r, 'grimoire'),
      'rpg_achievements':   safeJSON(r, 'achievementsClaimed'),
      'rpg_equip_runes':    safeJSON(r, 'equippedRunes'),
      'rpg_unlocked_runes': safeJSON(r, 'unlockedRunes'),
      'rpg_honor':          String((r && r.honor) || 0),
      'rpg_honor_shop':     safeJSON(r, 'purchasedHonor'),
      'rpg_narrative':      safeJSON(r, 'narrativeChoices'),
      'rpg_npc_quests':     safeJSON(r, 'npcQuestsDone'),
      'rpg_lore_fragments': safeJSON(r, 'loreFragments'),
      'rpg_best_wave':      String((r && r.bestWave) || 0),
      'rpg_class_rep':      safeJSON(r, 'classReputation'),
      'rpg_diary':          safeJSON(r, 'heroDiary'),
      'rpg_season_pts':     String((r && r.seasonPoints) || 0),
      'rpg_ng_relics':      localStorage.getItem('rpg_ng_relics') || '[]',
      'rpg_ng_best_ng':     String(Math.max(newNg, parseInt(localStorage.getItem('rpg_ng_best_ng') || '0'))),
      'calc_lang':          (r && r.lang) || localStorage.getItem('calc_lang') || 'pt',
      'calc_hero':          (r && r.heroName) || localStorage.getItem('calc_hero') || '',
      'rpg_avatar':         (r && r.avatar) || localStorage.getItem('rpg_avatar') || '',
      'rpg_class':          (r && r.eqClass) || localStorage.getItem('rpg_class') || 'warrior',
    };

    localStorage.clear();
    Object.keys(keep).forEach(function(k) {
      var v = keep[k];
      if (v && v !== 'null' && v !== 'undefined') localStorage.setItem(k, v);
    });

    if (typeof showToast === 'function') showToast('🌟 ' + cfg.label + ' — ' + cfg.title + ' iniciado!', 3000);
    closeNgPlusV4();
    setTimeout(function() { location.reload(); }, 1500);
  }

  function safeJSON(obj, key) {
    try {
      var v = obj && obj[key];
      if (v == null) return '[]';
      return JSON.stringify(v);
    } catch(e) { return '[]'; }
  }

  // ══════════════════════════════════════════════════════════════
  // 7. BADGE NO HUD + INDICADOR NO MENU
  // ══════════════════════════════════════════════════════════════
  function updateBadge() {
    var ng = getNgLevel();
    if (!ng) return;
    var cfg = getCycle(ng);
    var badge = document.getElementById('ngv4-badge');
    if (!badge) {
      badge = document.createElement('div');
      badge.id = 'ngv4-badge';
      badge.style.cssText = [
        'position:absolute;top:6px;left:50%;transform:translateX(-50%)',
        'font-family:Orbitron,sans-serif;font-size:7px;font-weight:900',
        'letter-spacing:.12em;padding:2px 8px;border-radius:4px;z-index:50',
        'border:1px solid;white-space:nowrap;pointer-events:none',
        'animation:ngv4Pulse 1.2s ease-in-out infinite alternate',
      ].join(';');
      var arena = document.getElementById('arena-container');
      if (arena) {
        arena.style.position = arena.style.position || 'relative';
        arena.appendChild(badge);
      }
    }
    badge.textContent = cfg.label;
    badge.style.color = cfg.color;
    badge.style.borderColor = cfg.color;
    badge.style.background = cfg.glow;
    badge.style.boxShadow = '0 0 8px ' + cfg.glow;
  }

  function updateMenuIndicator() {
    var ng = getNgLevel();
    if (!ng) return;
    if (document.getElementById('ngv4-menu-pill')) return;
    var cfg = getCycle(ng);
    var anchor = document.querySelector('#view-menu .rounded-2xl.p-3.mb-4') ||
                 document.querySelector('#view-menu .menu-container');
    if (!anchor) return;
    var pill = document.createElement('div');
    pill.id = 'ngv4-menu-pill';
    pill.style.cssText = [
      'text-align:center;margin:4px 0 8px',
      'font-family:Orbitron,sans-serif;font-size:8px;font-weight:900',
      'letter-spacing:.12em;color:' + cfg.color,
      'text-shadow:0 0 10px ' + cfg.glow,
      'animation:ngv4Pulse 1.5s ease-in-out infinite alternate',
    ].join(';');
    pill.textContent = '◆ ' + cfg.label + ' · ' + cfg.title + ' ◆';
    anchor.insertAdjacentElement('afterend', pill);
  }

  // ══════════════════════════════════════════════════════════════
  // 8. REGISTRO GLOBAL — vence qualquer módulo anterior
  // ══════════════════════════════════════════════════════════════
  function register() {
    window.openNgPlus = openNgPlusV4;
    window.openNgPlus._isNgV4 = true;

    /* Reaplica nos botões inline do DOM */
    document.querySelectorAll('[onclick*="openNgPlus"]').forEach(function(btn) {
      btn.onclick = openNgPlusV4;
    });

    console.log('[NgPlusV4] ✅ openNgPlus registado — NG+' + getNgLevel() + ' | Bosses: ' + getBossKills() + '/' + getTotalBosses());
  }

  // ══════════════════════════════════════════════════════════════
  // 9. INIT
  // ══════════════════════════════════════════════════════════════
  function init() {
    injectCSS();
    register();
    setTimeout(updateMenuIndicator, 1000);
    setTimeout(updateBadge, 1300);

    /* Re-registra APÓS os timeouts do fix-final.js (500ms, 1500ms, 3000ms) */
    setTimeout(register, 700);
    setTimeout(register, 2000);
    setTimeout(register, 3500);
    setTimeout(register, 5000);
  }

  function waitForDOM(cb) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', cb);
    } else {
      cb();
    }
  }

  waitForDOM(init);

})();
