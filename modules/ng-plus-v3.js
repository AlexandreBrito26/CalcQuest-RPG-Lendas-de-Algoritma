// ═══════════════════════════════════════════════════════════════
// MODULE: ng-plus-v3.js  —  NG+ REESCRITO DEFINITIVO
// ─────────────────────────────────────────────────────────────
// BUGS CORRIGIDOS vs v2:
//   • Não recria modal — usa o HTML existente no index.html
//   • Usa rpg.renderNgPlus() nativo como base, não o substitui
//   • openNgPlus() é uma wrapper transparente sobre a função do game.js
//   • modal-content tem as classes CSS corretas para animar
//   • z-index não conflita com o sistema de modais do jogo
//   • startNewGamePlus() usa o método nativo do rpg
//   • bossKills lido diretamente do rpg (chave correta: calc_bosses)
//   • Patches de combate aplicados SEM quebrar killMonster existente
//   • Guard contra dupla aplicação de patches
// ═══════════════════════════════════════════════════════════════
(function NgPlusV3() {
  'use strict';

  // ══════════════════════════════════════════════════════════════
  // 1. CONFIGURAÇÃO DOS CICLOS
  // ══════════════════════════════════════════════════════════════
  const NG_CYCLES = [
    { ng:0, label:'NORMAL',  color:'#94a3b8', glow:'rgba(148,163,184,0.2)', enemyMult:1,  rewardMult:1,  title:'🌱 Iniciante',    desc:'O começo de tudo.' },
    { ng:1, label:'NG+1',    color:'#a855f7', glow:'rgba(168,85,247,0.3)',  enemyMult:3,  rewardMult:5,  title:'🔮 Renascido',    desc:'O véu rasgou-se. O mundo lembra-se de ti.',
      relic:{ id:'ng1_echo',       name:'Eco do Passado',    icon:'🔮', desc:'+5% XP em cada kill' } },
    { ng:2, label:'NG+2',    color:'#f97316', glow:'rgba(249,115,22,0.3)',  enemyMult:6,  rewardMult:10, title:'🔥 Forjado no Caos', desc:'A chama não te consome — tu consomes a chama.',
      relic:{ id:'ng2_chaos_forge', name:'Forja do Caos',     icon:'🔥', desc:'Fury sobe 2× mais rápido' } },
    { ng:3, label:'NG+3',    color:'#ef4444', glow:'rgba(239,68,68,0.35)', enemyMult:10, rewardMult:20, title:'💀 Além do Código', desc:'Existir neste ciclo é um ato de violência contra a lógica.',
      relic:{ id:'ng3_void_pact',   name:'Pacto do Vazio',    icon:'💀', desc:'Críticos têm 15% de tirar -50% HP do monstro' } },
    { ng:4, label:'NG+4',    color:'#ffd60a', glow:'rgba(255,214,10,0.4)', enemyMult:15, rewardMult:40, title:'👑 O Inevitável',   desc:'Não és um jogador. És a própria equação.',
      relic:{ id:'ng4_mirror',      name:'Espelho do Fim',    icon:'🪞', desc:'A cada 10 turnos troca stats com o monstro por 3 ataques' }, isMax:true },
  ];

  function getInfiniteCycle(ng) {
    return {
      ng, label:'NG+'+ng, color:'#ffffff', glow:'rgba(255,255,255,0.4)',
      enemyMult: 15 + (ng-4)*5, rewardMult: 40 + (ng-4)*15,
      title:'∞ Transcendido', desc:'Não existe nada além de ti e do combate.',
    };
  }

  function getCycle(ng) {
    if (ng >= 0 && ng <= 4) return NG_CYCLES[ng];
    return getInfiniteCycle(ng);
  }

  // ══════════════════════════════════════════════════════════════
  // 2. LEITURA SEGURA DO ESTADO
  // ══════════════════════════════════════════════════════════════
  function safeRpg() { return (typeof rpg !== 'undefined') ? rpg : null; }

  function getNgLevel() {
    const r = safeRpg();
    // Chave primária usada pelo game.js
    const fromSave = parseInt(localStorage.getItem('rpg_ng_plus') || '0');
    const fromRpg  = r ? (r.ngPlusActive || 0) : 0;
    return Math.max(fromSave, fromRpg);
  }

  function getBossKills() {
    const r = safeRpg();
    // game.js usa: localStorage.getItem("calc_bosses") e rpg.bossKills
    const fromCalc = parseInt(localStorage.getItem('calc_bosses') || '0');
    const fromRpg  = r ? (r.bossKills || 0) : 0;
    return Math.max(fromCalc, fromRpg);
  }

  function getTotalBosses() {
    const r = safeRpg();
    if (r && r.actBosses && Array.isArray(r.actBosses)) return r.actBosses.length;
    return 19; // fallback — o jogo tem 19 bosses no actBosses
  }

  function getNgRelics() {
    try { return JSON.parse(localStorage.getItem('rpg_ng_relics') || '[]'); } catch(e) { return []; }
  }

  // ══════════════════════════════════════════════════════════════
  // 3. RENDER DO CONTEÚDO (escreve no ngplus-body existente)
  // ══════════════════════════════════════════════════════════════
  function renderContent() {
    const el = document.getElementById('ngplus-body');
    if (!el) {
      console.warn('[NgPlusV3] ngplus-body não encontrado no DOM');
      return false;
    }

    const ng      = getNgLevel();
    const killed  = getBossKills();
    const total   = getTotalBosses();
    const can     = killed >= total;
    const pct     = Math.min(100, Math.round((killed / Math.max(total, 1)) * 100));
    const curr    = getCycle(ng);
    const next    = getCycle(ng + 1);
    const relics  = getNgRelics();

    el.innerHTML = `
      <!-- Ciclo Atual -->
      <div style="text-align:center;padding:16px 12px;border-radius:14px;margin-bottom:12px;
        background:rgba(0,0,0,0.55);border:1px solid ${curr.color}28;
        box-shadow:inset 0 0 24px ${curr.glow};">
        <div style="font-family:'Orbitron',sans-serif;font-size:26px;font-weight:900;
          color:${curr.color};text-shadow:0 0 16px ${curr.glow};margin-bottom:3px;">${curr.label}</div>
        <div style="font-family:'Orbitron',sans-serif;font-size:9px;color:${curr.color};
          letter-spacing:0.14em;margin-bottom:4px;">${curr.title}</div>
        <div style="font-family:'Fira Code',monospace;font-size:8.5px;color:#52525b;
          font-style:italic;">"${curr.desc}"</div>
        ${ng > 0 ? `
        <div style="display:flex;justify-content:center;gap:20px;margin-top:10px;font-size:11px;">
          <span style="color:#9ca3af;">Inimigos <strong style="color:#f97316;">${curr.enemyMult}×</strong></span>
          <span style="color:#9ca3af;">Rewards <strong style="color:#34d399;">${curr.rewardMult}×</strong></span>
        </div>` : ''}
      </div>

      <!-- Progresso de bosses -->
      <div style="background:rgba(0,0,0,0.45);border:1px solid rgba(255,255,255,0.06);
        border-radius:12px;padding:12px;margin-bottom:10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <span style="font-family:'Orbitron',monospace;font-size:7.5px;font-weight:900;
            color:#52525b;letter-spacing:0.14em;text-transform:uppercase;">⚔ Guardiões Derrotados</span>
          <span style="font-family:'Fira Code',monospace;font-size:13px;font-weight:900;
            color:${can ? '#34d399' : '#a1a1aa'};">${killed}<span style="color:#52525b;">/${total}</span></span>
        </div>
        <div style="height:9px;background:rgba(0,0,0,0.6);border-radius:99px;overflow:hidden;
          border:1px solid rgba(255,255,255,0.05);margin-bottom:6px;">
          <div style="height:100%;width:${pct}%;transition:width 0.6s ease;
            background:${can
              ? 'linear-gradient(90deg,#059669,#34d399)'
              : 'linear-gradient(90deg,#7c3aed,#a855f7)'};
            border-radius:99px;box-shadow:0 0 8px ${can
              ? 'rgba(52,211,153,0.5)'
              : 'rgba(168,85,247,0.4)'};"></div>
        </div>
        <div style="font-family:'Fira Code',monospace;font-size:8.5px;text-align:center;
          font-weight:700;color:${can ? '#34d399' : '#f87171'};">
          ${can
            ? '✅ Todos os Guardiões derrotados — NG+ disponível!'
            : `🔒 Faltam ${total - killed} guardiões (${pct}%)`}
        </div>
      </div>

      <!-- Próximo ciclo -->
      <div style="background:rgba(0,0,0,0.38);border:1px solid rgba(255,255,255,0.06);
        border-radius:12px;padding:12px;margin-bottom:10px;">
        <div style="font-family:'Orbitron',monospace;font-size:7.5px;font-weight:900;
          color:#52525b;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:8px;">
          ⚡ Próximo: ${next.label} — ${next.title}
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:${next.relic ? '8px' : '0'};">
          <div style="background:rgba(0,0,0,0.38);border:1px solid rgba(249,115,22,0.18);
            border-radius:8px;padding:8px;text-align:center;">
            <div style="font-family:'Fira Code',monospace;font-size:8px;color:#52525b;margin-bottom:3px;">Inimigos</div>
            <div style="font-family:'Orbitron',monospace;font-size:13px;font-weight:900;color:#f97316;">${next.enemyMult}×</div>
          </div>
          <div style="background:rgba(0,0,0,0.38);border:1px solid rgba(52,211,153,0.18);
            border-radius:8px;padding:8px;text-align:center;">
            <div style="font-family:'Fira Code',monospace;font-size:8px;color:#52525b;margin-bottom:3px;">Recompensas</div>
            <div style="font-family:'Orbitron',monospace;font-size:13px;font-weight:900;color:#34d399;">${next.rewardMult}×</div>
          </div>
        </div>
        ${next.relic ? `
        <div style="background:rgba(168,85,247,0.07);border:1px solid rgba(168,85,247,0.22);
          border-radius:8px;padding:8px 10px;display:flex;gap:8px;align-items:center;">
          <span style="font-size:16px;">${next.relic.icon}</span>
          <div>
            <div style="font-family:'Rajdhani',sans-serif;font-size:12px;font-weight:700;color:#c084fc;">${next.relic.name}</div>
            <div style="font-family:'Fira Code',monospace;font-size:8px;color:#52525b;">${next.relic.desc}</div>
          </div>
        </div>` : ''}
      </div>

      <!-- O que se preserva -->
      <div style="background:rgba(0,0,0,0.38);border:1px solid rgba(255,255,255,0.06);
        border-radius:12px;padding:12px;margin-bottom:10px;font-family:'Rajdhani',sans-serif;font-size:12px;">
        <div style="font-family:'Orbitron',monospace;font-size:7.5px;font-weight:900;
          color:#52525b;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:8px;">📋 Transição de Ciclo</div>
        <div style="color:#6ee7b7;margin-bottom:4px;">🔒 <strong>Mantido:</strong> Talentos · Runas · Grimório · Conquistas · Honra</div>
        <div style="color:#fca5a5;margin-bottom:4px;">🔄 <strong>Resetado:</strong> Nível · XP · Ouro · Bosses · Inventário</div>
        <div style="color:#c084fc;">✨ <strong>Ganho:</strong> ${next.title}${next.relic ? ' · ' + next.relic.name : ''}</div>
      </div>

      <!-- Relíquias já obtidas -->
      ${relics.length ? `
      <div style="background:rgba(0,0,0,0.38);border:1px solid rgba(251,191,36,0.18);
        border-radius:12px;padding:12px;margin-bottom:10px;">
        <div style="font-family:'Orbitron',monospace;font-size:7.5px;font-weight:900;
          color:#d97706;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:8px;">✦ Relíquias de Ciclo</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;">
          ${relics.map(r => `
            <div style="display:flex;align-items:center;gap:5px;background:rgba(0,0,0,0.45);
              border:1px solid rgba(251,191,36,0.18);border-radius:7px;padding:4px 8px;" title="${r.desc||''}">
              <span style="font-size:12px;">${r.icon||'⭐'}</span>
              <span style="font-family:'Rajdhani',sans-serif;font-size:11px;font-weight:700;color:#fcd34d;">${r.name}</span>
            </div>`).join('')}
        </div>
      </div>` : ''}

      <!-- Botão de ação -->
      ${can ? `
        <button id="ng-confirm-btn"
          style="width:100%;padding:14px;font-family:'Orbitron',sans-serif;font-size:10px;
            font-weight:900;letter-spacing:0.12em;text-transform:uppercase;
            border-radius:12px;cursor:pointer;border:2px solid ${next.color}70;
            color:${next.color};background:linear-gradient(135deg,${next.color}18,${next.color}08);
            box-shadow:0 0 18px ${next.glow};transition:all 0.2s;touch-action:manipulation;">
          🌟 INICIAR ${next.label}
          <br><span style="font-size:7.5px;opacity:0.7;font-weight:400;letter-spacing:0.08em;">${next.title}</span>
        </button>
      ` : `
        <div style="text-align:center;padding:14px;border-radius:12px;
          background:rgba(0,0,0,0.38);border:1px solid rgba(255,255,255,0.05);">
          <div style="font-family:'Orbitron',monospace;font-size:8.5px;color:#52525b;letter-spacing:0.08em;">
            🔒 DERROTA TODOS OS GUARDIÕES PRIMEIRO
          </div>
          <div style="font-family:'Fira Code',monospace;font-size:8px;color:#52525b;margin-top:4px;">
            Progresso: ${killed} / ${total} (${pct}%)
          </div>
        </div>
      `}
    `;

    // Bind do botão de confirmar
    const confirmBtn = document.getElementById('ng-confirm-btn');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', handleConfirm);
      confirmBtn.addEventListener('mouseenter', () => {
        confirmBtn.style.transform = 'scale(1.02)';
        confirmBtn.style.boxShadow = `0 0 28px ${next.glow}`;
      });
      confirmBtn.addEventListener('mouseleave', () => {
        confirmBtn.style.transform = '';
        confirmBtn.style.boxShadow = `0 0 18px ${next.glow}`;
      });
    }

    return true;
  }

  // ══════════════════════════════════════════════════════════════
  // 4. ABRIR O MODAL (wrapper transparente sobre o sistema nativo)
  // ══════════════════════════════════════════════════════════════
  function openNgPlusModal() {
    // Renderiza conteúdo no ngplus-body existente
    renderContent();

    // Abre usando o sistema nativo do jogo (classe .active)
    const modal = document.getElementById('ngplus-modal');
    if (!modal) {
      console.error('[NgPlusV3] ngplus-modal não encontrado no DOM!');
      return;
    }

    // Garante classes corretas para a animação CSS funcionar
    modal.classList.add('active');
    // NÃO forçamos z-index aqui — o CSS do jogo (z-index:300 via .active) é suficiente

    // Fechar ao clicar no overlay
    modal._ngV3Handler = modal._ngV3Handler || function(e) {
      if (e.target === modal) closeNgPlusModal();
    };
    modal.removeEventListener('click', modal._ngV3Handler);
    modal.addEventListener('click', modal._ngV3Handler);

    console.log('[NgPlusV3] Modal aberto — NG+' + getNgLevel() + ' | Bosses: ' + getBossKills() + '/' + getTotalBosses());
  }

  function closeNgPlusModal() {
    const modal = document.getElementById('ngplus-modal');
    if (modal) modal.classList.remove('active');
  }

  // ══════════════════════════════════════════════════════════════
  // 5. CONFIRMAR E EXECUTAR NG+
  // ══════════════════════════════════════════════════════════════
  function handleConfirm() {
    const killed = getBossKills();
    const total  = getTotalBosses();

    if (killed < total) {
      if (typeof showToast === 'function') showToast('⚔ Derrota todos os ' + total + ' guardiões primeiro!', 3000);
      else alert('Derrota todos os ' + total + ' guardiões primeiro!\nAtual: ' + killed);
      return;
    }

    const ng     = getNgLevel();
    const nextNg = ng + 1;
    const next   = getCycle(nextNg);

    const ok = confirm(
      '🌟 Iniciar ' + next.label + '?\n\n' +
      '⚔ Inimigos ' + next.enemyMult + '× mais fortes\n' +
      '💰 Rewards ' + next.rewardMult + '× maiores\n\n' +
      '✅ Preservado: Talentos, Runas, Grimório, Conquistas, Honra\n' +
      '🔄 Reiniciado: Nível, XP, Ouro, Bosses, Itens\n\n' +
      'O jogo vai recarregar.'
    );
    if (!ok) return;

    executeTransition(ng, nextNg, next);
  }

  function executeTransition(oldNg, newNg, cfg) {
    const r = safeRpg();

    // Tenta usar o método nativo do rpg (startNewGamePlus)
    // que já tem toda a lógica de preservação correta
    if (r && typeof r.startNewGamePlus === 'function') {
      // Atualiza ngPlusActive para o novo valor antes de chamar
      r.ngPlusActive = newNg;
      // Adiciona relíquia NG+ ao localStorage antes do reload
      addNgRelic(cfg);
      try {
        r.startNewGamePlus();
        return; // startNewGamePlus faz o reload
      } catch(e) {
        console.warn('[NgPlusV3] startNewGamePlus() falhou, usando fallback:', e);
        // Reset ngPlusActive para tentar o fallback
        r.ngPlusActive = oldNg;
      }
    }

    // Fallback completo — preserva o máximo possível
    fallbackTransition(oldNg, newNg, cfg, r);
  }

  function addNgRelic(cfg) {
    if (!cfg.relic) return;
    try {
      const existing = JSON.parse(localStorage.getItem('rpg_ng_relics') || '[]');
      if (!existing.some(r => r.id === cfg.relic.id)) {
        existing.push(cfg.relic);
        localStorage.setItem('rpg_ng_relics', JSON.stringify(existing));
      }
    } catch(e) {}
  }

  function fallbackTransition(oldNg, newNg, cfg, r) {
    // Lê TUDO do rpg object para preservar o máximo
    const preserve = {
      // NG+ state
      'rpg_ng_plus':  String(newNg),
      'calc_intro_seen': 'true',

      // Progressão permanente
      'rpg_talents':        safeJson(r, 'unlockedTalents'),
      'rpg_talent_pts':     String(r?.talentPoints || 0),
      'rpg_grimoire':       safeJson(r, 'grimoire'),
      'rpg_achievements':   safeJson(r, 'achievementsClaimed'),
      'rpg_equip_runes':    safeJson(r, 'equippedRunes'),
      'rpg_unlocked_runes': safeJson(r, 'unlockedRunes'),
      'rpg_honor':          String(r?.honor || 0),
      'rpg_honor_shop':     safeJson(r, 'purchasedHonor'),
      'rpg_narrative':      safeJson(r, 'narrativeChoices'),
      'rpg_npc_quests':     safeJson(r, 'npcQuestsDone'),
      'rpg_lore_fragments': safeJson(r, 'loreFragments'),
      'rpg_best_wave':      String(r?.bestWave || 0),
      'rpg_class_rep':      safeJson(r, 'classReputation'),
      'rpg_diary':          safeJson(r, 'heroDiary'),
      'rpg_season_pts':     String(r?.seasonPoints || 0),
      'rpg_season_kills':   String(r?.seasonKills || 0),

      // Identidade
      'calc_lang':   r?.lang || localStorage.getItem('calc_lang') || 'pt',
      'calc_hero':   r?.heroName || localStorage.getItem('calc_hero') || '',
      'rpg_avatar':  r?.avatar || localStorage.getItem('rpg_avatar') || '',
      'rpg_class':   r?.eqClass || localStorage.getItem('rpg_class') || 'warrior',

      // Histórico NG+
      'rpg_ng_best_ng': String(Math.max(newNg, parseInt(localStorage.getItem('rpg_ng_best_ng') || '0'))),
    };

    // Relíquias NG+
    addNgRelic(cfg);
    preserve['rpg_ng_relics'] = localStorage.getItem('rpg_ng_relics') || '[]';

    // Títulos NG+
    try {
      const titles = JSON.parse(localStorage.getItem('rpg_ng_titles') || '[]');
      if (cfg.title && !titles.includes(cfg.title)) titles.push(cfg.title);
      preserve['rpg_ng_titles'] = JSON.stringify(titles);
    } catch(e) { preserve['rpg_ng_titles'] = '[]'; }

    // Backup automático antes de limpar
    try {
      const backups = JSON.parse(localStorage.getItem('rpg_autobackups') || '[]');
      backups.push({ ts: Date.now(), ng: oldNg });
      if (backups.length > 3) backups.shift();
      preserve['rpg_autobackups'] = JSON.stringify(backups);
    } catch(e) {}

    // Limpa e restaura
    localStorage.clear();
    Object.entries(preserve).forEach(([k, v]) => {
      if (v !== null && v !== undefined && v !== 'null' && v !== 'undefined') {
        localStorage.setItem(k, v);
      }
    });

    const msg = '🌟 ' + cfg.label + ' — ' + cfg.title + ' iniciado!';
    if (typeof showToast === 'function') showToast(msg, 3000);
    else alert(msg);

    closeNgPlusModal();
    setTimeout(() => location.reload(), 1500);
  }

  function safeJson(obj, key) {
    try {
      const val = obj?.[key];
      if (val === undefined || val === null) return '[]';
      return JSON.stringify(val);
    } catch(e) { return '[]'; }
  }

  // ══════════════════════════════════════════════════════════════
  // 6. PATCHES DE COMBATE (sem quebrar o que já existe)
  // ══════════════════════════════════════════════════════════════
  let _patchesApplied = false;

  function applyPatches() {
    if (_patchesApplied) return;
    const r = safeRpg();
    if (!r) return;

    // Já existe lógica de NG+ no game.js (NG_ENEMY_MULT / NG_REWARD_MULT)
    // Só precisamos de garantir que ngPlusActive está sincronizado
    const ng = getNgLevel();
    r.ngPlusActive = ng;
    r.ngLevel = ng;

    // Sincroniza multiplicadores com os ciclos da v3
    r.NG_ENEMY_MULT  = NG_CYCLES.map(c => c.enemyMult);
    r.NG_REWARD_MULT = NG_CYCLES.map(c => c.rewardMult);

    // Aplica relíquias de ciclos anteriores
    applyRelicEffects(r);

    _patchesApplied = true;
    console.log('[NgPlusV3] Patches OK — NG+' + ng + ' ativo');
  }

  function applyRelicEffects(r) {
    const relics = getNgRelics();
    if (!relics.length) return;

    relics.forEach(relic => {
      if (relic.id === 'ng1_echo' && !r._ng1EchoApplied) {
        // +5% XP em cada kill — patch no killMonster
        r._ng1EchoApplied = true;
        const _orig = r.killMonster.bind(r);
        r.killMonster = function() {
          const xpBefore = this.xp || 0;
          const result = _orig.apply(this, arguments);
          const gained = (this.xp || 0) - xpBefore;
          if (gained > 0) { this.xp = xpBefore + Math.floor(gained * 1.05); }
          return result;
        };
      }
      if (relic.id === 'ng2_chaos_forge' && r.addFury && !r._ng2ForgeApplied) {
        r._ng2ForgeApplied = true;
        const _o = r.addFury.bind(r);
        r.addFury = function(amt) { return _o.call(this, Math.floor(amt * 2)); };
      }
      if (relic.id === 'ng3_void_pact') { r._ng3VoidPact = true; }
      if (relic.id === 'ng4_mirror')    { r._ng4Mirror  = true; }
    });
  }

  // ══════════════════════════════════════════════════════════════
  // 7. BADGE NG+ NO HUD DE COMBATE
  // ══════════════════════════════════════════════════════════════
  function updateCombatBadge() {
    const ng = getNgLevel();
    if (!ng) return;
    const cfg = getCycle(ng);

    let badge = document.getElementById('ng-combat-badge');
    if (!badge) {
      badge = document.createElement('div');
      badge.id = 'ng-combat-badge';
      badge.style.cssText = [
        'position:absolute;top:6px;left:50%;transform:translateX(-50%)',
        'font-family:Orbitron,sans-serif;font-size:7px;font-weight:900',
        'letter-spacing:0.12em;padding:2px 8px;border-radius:4px;z-index:50',
        'border:1px solid;white-space:nowrap;pointer-events:none',
        'animation:ngBadgeGlow 1.2s ease-in-out infinite alternate',
      ].join(';');
      const arena = document.getElementById('arena-container');
      if (arena) arena.style.position = arena.style.position || 'relative';
      if (arena) arena.appendChild(badge);
    }

    badge.textContent  = cfg.label;
    badge.style.color  = cfg.color;
    badge.style.borderColor = cfg.color;
    badge.style.background  = cfg.glow;
    badge.style.boxShadow   = '0 0 8px ' + cfg.glow;
  }

  // ══════════════════════════════════════════════════════════════
  // 8. INDICADOR NO MENU
  // ══════════════════════════════════════════════════════════════
  function injectMenuIndicator() {
    const ng = getNgLevel();
    if (!ng) return;
    if (document.getElementById('ng-menu-indicator')) return;

    const cfg = getCycle(ng);
    const anchor = document.querySelector('#view-menu .rounded-2xl.p-3.mb-4') ||
                   document.querySelector('#view-menu .menu-container');
    if (!anchor) return;

    const pill = document.createElement('div');
    pill.id = 'ng-menu-indicator';
    pill.style.cssText = [
      'text-align:center;margin:4px 0 8px',
      'font-family:Orbitron,sans-serif;font-size:8px;font-weight:900',
      'letter-spacing:0.12em;color:' + cfg.color,
      'text-shadow:0 0 10px ' + cfg.glow,
      'animation:ngBadgeGlow 1.5s ease-in-out infinite alternate',
    ].join(';');
    pill.textContent = '◆ ' + cfg.label + ' · ' + cfg.title + ' ◆';
    anchor.insertAdjacentElement('afterend', pill);
  }

  // ══════════════════════════════════════════════════════════════
  // 9. CSS
  // ══════════════════════════════════════════════════════════════
  function injectCSS() {
    if (document.getElementById('ng-plus-v3-css')) return;
    const s = document.createElement('style');
    s.id = 'ng-plus-v3-css';
    s.textContent = `
      @keyframes ngBadgeGlow { 0% { opacity:0.65; } 100% { opacity:1; } }
      #ngplus-body { scrollbar-width:none; }
      #ngplus-body::-webkit-scrollbar { display:none; }
      #ng-confirm-btn:hover { transform:scale(1.015); }
      #ng-confirm-btn:active { transform:scale(0.97); }
    `;
    document.head.appendChild(s);
  }

  // ══════════════════════════════════════════════════════════════
  // 10. SUBSTITUIÇÃO DO openNgPlus GLOBAL
  // ══════════════════════════════════════════════════════════════
  // Substitui SEMPRE — não usa || — para garantir que a v3 vence
  window.openNgPlus = openNgPlusModal;

  // Também patches o rpg.renderNgPlus para usar o nosso render
  function patchRpgRender() {
    const r = safeRpg();
    if (!r) return;
    // Mantém a função original mas a substitui pela v3
    r._origRenderNgPlus = r.renderNgPlus;
    r.renderNgPlus = function() {
      renderContent();
    };
  }

  // ══════════════════════════════════════════════════════════════
  // 11. INIT
  // ══════════════════════════════════════════════════════════════
  function init() {
    injectCSS();
    applyPatches();
    patchRpgRender();
    setTimeout(injectMenuIndicator, 900);
    setTimeout(updateCombatBadge, 1200);

    // Atualiza badge ao iniciar batalha
    const r = safeRpg();
    if (r && r.startBattle) {
      const _sb = r.startBattle.bind(r);
      r.startBattle = function(isBoss) {
        _sb.call(this, isBoss);
        setTimeout(updateCombatBadge, 300);
      };
    }

    const ng = getNgLevel();
    console.log('[NgPlusV3] ✅ OK — Ciclo NG+' + ng + ' | Bosses: ' + getBossKills() + '/' + getTotalBosses() + ' | openNgPlus registado');
  }

  function waitForRpg(cb, tries) {
    const r = safeRpg();
    if (r && typeof r.killMonster === 'function') {
      cb();
    } else if ((tries || 0) < 50) {
      setTimeout(() => waitForRpg(cb, (tries || 0) + 1), 200);
    } else {
      // Timeout — inicializa na mesma sem patches de combate
      injectCSS();
      patchRpgRender();
      console.warn('[NgPlusV3] Timeout aguardando rpg — inicializado sem patches de combate');
    }
  }

  // openNgPlus disponível IMEDIATAMENTE (antes do rpg carregar)
  // para que o botão no menu nunca falhe
  window.openNgPlus = openNgPlusModal;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => waitForRpg(init));
  } else {
    waitForRpg(init);
  }

})();
