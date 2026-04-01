// ═══════════════════════════════════════════════════════════════
// MODULE: ng-plus-v2.js  —  NG+ REESCRITO COMPLETO
// ─────────────────────────────────────────────────────────────
// Fixes:
//   • Bug bossKills dessincronizado do localStorage → relê sempre
//   • Condição de unlock: exige bossKills >= actBosses.length
//   • Multiplicadores agora aplicados em spawnMonster
//   • NG∞ (modo infinito após NG4) com escala infinita
// Novidades:
//   • Títulos exclusivos por ciclo
//   • Relíquias de NG (bonus permanente por ciclo completado)
//   • Recompensas especiais por ciclo
//   • Modal completamente redesenhado com abas
//   • Modo Espelho no NG4 (toggle de stats herói/monstro)
// ═══════════════════════════════════════════════════════════════
(function NgPlusV2Module() {
  'use strict';

  // ── Configuração dos ciclos ──────────────────────────────────
  const NG_CYCLES = [
    {
      ng: 0,
      label: 'NORMAL',
      color: '#94a3b8',
      glow: 'rgba(148,163,184,0.2)',
      enemyMult: 1,
      rewardMult: 1,
      title: '🌱 Iniciante',
      desc: 'O começo de tudo.',
    },
    {
      ng: 1,
      label: 'NG+1',
      color: '#a855f7',
      glow: 'rgba(168,85,247,0.3)',
      enemyMult: 3,
      rewardMult: 5,
      title: '🔮 Renascido',
      desc: 'O véu rasgou-se. O mundo lembra-se de ti.',
      exclusiveRelic: { id: 'ng1_echo', name: 'Eco do Passado', icon: 'history', desc: 'Cada kill dá +5% XP extra' },
      bonusOnStart: 'unlockClass_archivist',
    },
    {
      ng: 2,
      label: 'NG+2',
      color: '#f97316',
      glow: 'rgba(249,115,22,0.3)',
      enemyMult: 6,
      rewardMult: 10,
      title: '🔥 Forjado no Caos',
      desc: 'A chama não te consome — tu consomes a chama.',
      exclusiveRelic: { id: 'ng2_chaos_forge', name: 'Forja do Caos', icon: 'flame', desc: 'Fury sobe 2× mais rápido' },
      bonusOnStart: 'giveGoldBonus',
    },
    {
      ng: 3,
      label: 'NG+3',
      color: '#ef4444',
      glow: 'rgba(239,68,68,0.35)',
      enemyMult: 10,
      rewardMult: 20,
      title: '💀 Além do Código',
      desc: 'Existir neste ciclo é um ato de violência contra a lógica.',
      exclusiveRelic: { id: 'ng3_void_pact', name: 'Pacto do Vazio', icon: 'skull', desc: 'Críticos têm chance de instakill -50% HP do monstro' },
      bonusOnStart: 'unlockSkin_dark',
    },
    {
      ng: 4,
      label: 'NG+4',
      color: '#ffd60a',
      glow: 'rgba(255,214,10,0.4)',
      enemyMult: 15,
      rewardMult: 40,
      title: '👑 O Inevitável',
      desc: 'Não és um jogador. És a própria equação que sustenta este cosmos.',
      exclusiveRelic: { id: 'ng4_mirror', name: 'Espelho do Fim', icon: 'scan-face', desc: 'A cada 10 turnos, herói e monstro trocam stats por 3 ataques' },
      bonusOnStart: 'unlockMirrorMode',
      isMax: true,
    },
  ];

  // ── Modo Infinito (NG5+) ─────────────────────────────────────
  function getInfiniteConfig(ng) {
    return {
      ng,
      label: 'NG+' + ng,
      color: '#ffffff',
      glow: 'rgba(255,255,255,0.4)',
      enemyMult: 15 + (ng - 4) * 5,
      rewardMult: 40 + (ng - 4) * 15,
      title: '∞ Transcendido',
      desc: 'Não existe mais nada além de ti e do combate.',
      isInfinite: true,
    };
  }

  // ── Obtém config do ciclo atual ──────────────────────────────
  function getCycleConfig(ng) {
    if (ng <= 4) return NG_CYCLES[ng] || NG_CYCLES[0];
    return getInfiniteConfig(ng);
  }

  // ── Lê bossKills com segurança (fix principal) ───────────────
  function getBossKills() {
    // Sempre relê do localStorage para evitar dessincronização
    const fromStorage = parseInt(localStorage.getItem('calc_bosses')) || 0;
    const fromRpg     = rpg.bossKills || 0;
    const val         = Math.max(fromStorage, fromRpg);
    rpg.bossKills = val; // sincroniza
    return val;
  }

  // ── Patch: spawnMonster para aplicar multiplicadores NG+ ─────
  function patchSpawnMonster() {
    const _orig = rpg.spawnMonster;
    if (!_orig) return;

    rpg.spawnMonster = function() {
      _orig.apply(this, arguments);

      // Após spawn, aplica multiplicador NG+
      const ng = this.ngPlusActive || 0;
      if (ng > 0 && this.monster) {
        const cfg = getCycleConfig(ng);
        const mult = cfg.enemyMult || 1;

        this.monster.hp    = Math.floor(this.monster.hp    * mult);
        this.monster.maxHp = Math.floor(this.monster.maxHp * mult);
        this.monster.dmg   = Math.floor(this.monster.dmg   * mult);

        // Atualiza barras com novo HP
        if (this.updateHpBars) this.updateHpBars();

        // Indicador visual no HUD
        updateNgBadge(ng, cfg);
      }
    };
  }

  // ── Atualiza badge NG no HUD de combate ──────────────────────
  function updateNgBadge(ng, cfg) {
    let badge = document.getElementById('ng-combat-badge');
    if (!badge && ng > 0) {
      badge = document.createElement('div');
      badge.id = 'ng-combat-badge';
      badge.style.cssText = `
        position:absolute; top:6px; left:50%; transform:translateX(-50%);
        font-family:'Orbitron',sans-serif; font-size:7px; font-weight:900;
        letter-spacing:0.12em; padding:2px 8px; border-radius:4px; z-index:50;
        border:1px solid; white-space:nowrap; pointer-events:none;
      `;
      const arena = document.getElementById('arena-container');
      if (arena) { arena.style.position = 'relative'; arena.appendChild(badge); }
    }
    if (badge && cfg) {
      badge.textContent  = cfg.label;
      badge.style.color  = cfg.color;
      badge.style.borderColor = cfg.color;
      badge.style.background  = cfg.glow;
      badge.style.boxShadow   = '0 0 8px ' + cfg.glow;
    }
  }

  // ── Patch: rewardMult ao ganhar XP/Gold ──────────────────────
  function patchRewards() {
    const _origKill = rpg.killMonster;
    if (!_origKill) return;

    rpg.killMonster = function() {
      const ng = this.ngPlusActive || 0;
      if (ng > 0) {
        const mult = getCycleConfig(ng).rewardMult || 1;
        // Temporariamente multiplica os ganhos
        const _origGold = this.gold;
        const _origXp   = this.xp;
        const result    = _origKill.apply(this, arguments);
        // Diferença ganhou, multiplica a diferença
        const goldGained = this.gold - _origGold;
        const xpGained   = this.xp   - _origXp;
        if (goldGained > 0) this.gold = _origGold + Math.floor(goldGained * mult);
        if (xpGained   > 0) this.xp   = _origXp   + Math.floor(xpGained   * mult);
        return result;
      }
      return _origKill.apply(this, arguments);
    };
  }

  // ── Modal principal de NG+ ────────────────────────────────────
  window.openNgPlus = function() {
    // Sincroniza dados
    rpg.ngPlusActive = parseInt(localStorage.getItem('rpg_ng_plus') || '0');
    rpg.bossKills    = getBossKills();

    ensureNgModal();
    renderNgModal();

    const modal = document.getElementById('ngplus-modal');
    if (modal) {
      modal.classList.add('active');
      modal.style.zIndex = '300';
    }

    try { lucide.createIcons(); } catch(e) {}
  };

  // ── Garante que o modal existe ────────────────────────────────
  function ensureNgModal() {
    const modal = document.getElementById('ngplus-modal');
    if (!modal) return;
    // Verifica se tem conteúdo
    if (!modal.querySelector('.modal-content')) {
      modal.innerHTML = `
        <div class="modal-content glass-panel bg-zinc-900/95 w-11/12 max-w-lg rounded-2xl p-6 shadow-2xl">
          <div class="flex justify-between items-center mb-4 border-b border-zinc-800 pb-3">
            <h2 class="text-xl font-black text-white flex items-center gap-2 uppercase tracking-widest" style="font-family:'Orbitron',sans-serif;">
              <i data-lucide="refresh-cw" class="w-6 h-6 text-violet-400"></i> New Game+
            </h2>
            <button onclick="closeModal('ngplus-modal')" class="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition text-zinc-400">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>
          <div id="ngplus-body" class="max-h-[70vh] overflow-y-auto pr-1 pb-2 hide-scrollbar"></div>
        </div>
      `;
    }
  }

  // ── Renderiza o modal completo ────────────────────────────────
  function renderNgModal() {
    const el = document.getElementById('ngplus-body');
    if (!el) return;

    const ng        = rpg.ngPlusActive || 0;
    const killed    = getBossKills();
    const total     = (rpg.actBosses || []).length || 16;
    const can       = killed >= total;
    const pct       = Math.min((killed / total) * 100, 100).toFixed(1);
    const currCfg   = getCycleConfig(ng);
    const nextCfg   = getCycleConfig(ng + 1);
    const isInfinite = ng >= 4;

    // Relíquias NG+ já obtidas
    const ngRelics  = JSON.parse(localStorage.getItem('rpg_ng_relics') || '[]');

    el.innerHTML = `
      <!-- ══ CICLO ATUAL ══ -->
      <div class="text-center mb-5 p-5 rounded-2xl relative overflow-hidden"
           style="background:rgba(0,0,0,0.6);border:1px solid ${currCfg.color}30;box-shadow:inset 0 0 30px ${currCfg.glow}">
        <div class="absolute inset-0 opacity-5" style="background:radial-gradient(circle at center, ${currCfg.color}, transparent 70%);pointer-events:none;"></div>
        <p class="text-6xl font-black mb-1" style="font-family:'Orbitron',sans-serif;color:${currCfg.color};text-shadow:0 0 20px ${currCfg.glow}">
          ${currCfg.label}
        </p>
        <p class="text-xs font-black mb-1" style="color:${currCfg.color};font-family:'Orbitron',sans-serif;letter-spacing:0.15em;">
          ${currCfg.title}
        </p>
        <p class="text-[10px] text-zinc-500 italic">"${currCfg.desc}"</p>
        ${ng > 0 ? `
        <div class="flex justify-center gap-6 mt-3 text-xs">
          <span class="text-zinc-400">Inimigos <strong style="color:#f97316">${currCfg.enemyMult}×</strong></span>
          <span class="text-zinc-400">Rewards <strong style="color:#34d399">${currCfg.rewardMult}×</strong></span>
        </div>` : ''}
      </div>

      <!-- ══ PROGRESSO DE BOSSES ══ -->
      <div class="mb-4 p-4 rounded-xl bg-black/50 border border-zinc-800/60">
        <div class="flex justify-between items-center mb-3">
          <span class="text-[9px] font-black text-zinc-400 uppercase tracking-widest" style="font-family:'Orbitron',sans-serif;">
            ⚔ Guardiões Derrotados
          </span>
          <span class="text-sm font-black" style="color:${can ? '#34d399' : '#a1a1aa'};font-family:'Fira Code',monospace;">
            ${killed} <span class="text-zinc-600">/</span> ${total}
          </span>
        </div>
        <div class="w-full h-3 bg-black/70 rounded-full overflow-hidden border border-white/5 mb-1">
          <div class="h-full rounded-full transition-all duration-700"
               style="width:${pct}%;background:${can ? 'linear-gradient(90deg,#059669,#34d399)' : 'linear-gradient(90deg,#7c3aed,#a855f7)'};box-shadow:0 0 8px ${can ? 'rgba(52,211,153,0.5)' : 'rgba(168,85,247,0.4)'};"></div>
        </div>
        <div class="flex justify-between text-[8px] font-mono text-zinc-600">
          <span>0</span><span>${Math.floor(total/4)}</span><span>${Math.floor(total/2)}</span><span>${Math.floor(3*total/4)}</span><span>${total}</span>
        </div>
        ${!can ? `<p class="text-[9px] text-rose-500 mt-2 text-center font-bold">🔒 Precisas de derrotar os ${total} Guardiões para desbloquear NG+</p>` :
                  `<p class="text-[9px] text-emerald-400 mt-2 text-center font-bold">✅ Todos os Guardiões derrotados — NG+ disponível!</p>`}
      </div>

      <!-- ══ INFO DO PRÓXIMO CICLO ══ -->
      ${ng < 99 ? `
      <div class="mb-4 p-4 rounded-xl bg-zinc-950/90 border border-zinc-800 space-y-2">
        <p class="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2" style="font-family:'Orbitron',sans-serif;">
          ⚡ Próximo Ciclo: ${nextCfg.label}
        </p>
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="p-2 rounded-lg bg-black/40 border border-orange-900/30">
            <p class="text-[8px] text-zinc-600 mb-0.5">Inimigos</p>
            <p class="font-black text-orange-400">${nextCfg.enemyMult}× mais fortes</p>
          </div>
          <div class="p-2 rounded-lg bg-black/40 border border-emerald-900/30">
            <p class="text-[8px] text-zinc-600 mb-0.5">Recompensas</p>
            <p class="font-black text-emerald-400">${nextCfg.rewardMult}× mais ricas</p>
          </div>
        </div>
        ${nextCfg.exclusiveRelic ? `
        <div class="p-2 rounded-lg bg-violet-950/40 border border-violet-800/30 flex items-start gap-2">
          <i data-lucide="${nextCfg.exclusiveRelic.icon}" style="width:14px;height:14px;color:#a855f7;flex-shrink:0;margin-top:2px;"></i>
          <div>
            <p class="text-[9px] font-black text-violet-300">${nextCfg.exclusiveRelic.name}</p>
            <p class="text-[8px] text-zinc-500">${nextCfg.exclusiveRelic.desc}</p>
          </div>
        </div>` : ''}
        ${nextCfg.isInfinite ? `<p class="text-[9px] text-amber-400 font-bold text-center">🌟 NG+4 é o máximo do passe — após isso entra no Modo Infinito ∞</p>` : ''}
      </div>` : ''}

      <!-- ══ O QUE SE PRESERVA ══ -->
      <div class="mb-4 p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-400 space-y-1">
        <p class="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-2" style="font-family:'Orbitron',sans-serif;">📋 Transição de Ciclo</p>
        <p>🔒 <strong class="text-emerald-300">Mantido:</strong> Talentos · Runas · Grimório · Conquistas · Honra · Relíquias NG+</p>
        <p>🔄 <strong class="text-rose-300">Resetado:</strong> Nível · XP · Ouro · Bosses · Inventário · Poções</p>
        <p>✨ <strong class="text-violet-300">Ganho:</strong> ${nextCfg.title || '—'} · Relíquia exclusiva · Título no perfil</p>
      </div>

      <!-- ══ RELÍQUIAS NG+ COLECIONADAS ══ -->
      ${ngRelics.length > 0 ? `
      <div class="mb-4 p-3 rounded-xl bg-zinc-950/80 border border-amber-900/30">
        <p class="text-[8px] font-black text-amber-500 uppercase tracking-widest mb-2" style="font-family:'Orbitron',sans-serif;">✦ Relíquias de Ciclo</p>
        <div class="flex flex-wrap gap-2">
          ${ngRelics.map(r => `
            <div class="flex items-center gap-1 px-2 py-1 rounded-lg bg-black/50 border border-amber-900/30" title="${r.desc || ''}">
              <i data-lucide="${r.icon || 'star'}" style="width:10px;height:10px;color:#ffd60a;"></i>
              <span class="text-[8px] text-amber-300 font-bold">${r.name}</span>
            </div>
          `).join('')}
        </div>
      </div>` : ''}

      <!-- ══ BOTÃO DE AÇÃO ══ -->
      ${renderActionButton(can, ng, isInfinite)}
    `;

    try { lucide.createIcons(); } catch(e) {}
  }

  // ── Botão de ação condicional ─────────────────────────────────
  function renderActionButton(can, ng, isInfinite) {
    if (!can) {
      return `
        <div class="text-center py-4 rounded-xl bg-zinc-950/60 border border-zinc-800/50 opacity-60">
          <p class="text-zinc-500 text-xs font-bold uppercase tracking-widest">🔒 Derrota todos os Guardiões primeiro</p>
        </div>`;
    }

    const nextNg   = ng + 1;
    const nextCfg  = getCycleConfig(nextNg);
    const btnColor = nextCfg.color;

    return `
      <button onclick="window._ngPlusV2Confirm()"
        class="w-full py-4 font-black rounded-xl uppercase tracking-wider text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        style="background:linear-gradient(135deg,${btnColor}20,${btnColor}10);border:2px solid ${btnColor}60;color:${btnColor};font-family:'Orbitron',sans-serif;letter-spacing:0.12em;box-shadow:0 0 20px ${nextCfg.glow};">
        ${isInfinite ? '∞' : '🌟'} INICIAR ${nextCfg.label}
        <br><span style="font-size:8px;opacity:0.7;letter-spacing:0.08em;">${nextCfg.title}</span>
      </button>
    `;
  }

  // ── Confirmação e execução do NG+ ─────────────────────────────
  window._ngPlusV2Confirm = function() {
    const ng     = rpg.ngPlusActive || 0;
    const killed = getBossKills();
    const total  = (rpg.actBosses || []).length || 16;

    if (killed < total) {
      if (typeof showToast === 'function')
        showToast('❌ Precisas de derrotar todos os ' + total + ' Guardiões!', 3000);
      return;
    }

    const nextNg  = ng + 1;
    const nextCfg = getCycleConfig(nextNg);

    const lang = rpg.lang || 'pt';
    const msg  = lang === 'pt'
      ? `Iniciar ${nextCfg.label}?\n\nInimigos ${nextCfg.enemyMult}× mais fortes\nRewards ${nextCfg.rewardMult}× maiores\n\nNível, Ouro e Bosses serão reiniciados.\nTalentos, Runas e Conquistas são preservados.`
      : `Start ${nextCfg.label}?\n\nEnemies ${nextCfg.enemyMult}× stronger\nRewards ${nextCfg.rewardMult}× bigger\n\nLevel, Gold and Bosses will reset.\nTalents, Runes and Achievements are kept.`;

    if (!confirm(msg)) return;

    executeNgTransition(ng, nextNg, nextCfg);
  };

  // ── Executa a transição para o novo ciclo ─────────────────────
  function executeNgTransition(oldNg, newNg, cfg) {
    // Tenta usar a função original primeiro
    try {
      if (typeof rpg.startNewGamePlus === 'function') {
        // Override temporário para garantir que o newNg está certo
        const _orig = rpg.startNewGamePlus;
        rpg.startNewGamePlus = function() {
          rpg.ngPlusActive = newNg;
          try { _orig.apply(this, arguments); } catch(e) { fallbackTransition(oldNg, newNg, cfg); }
        };
        rpg.startNewGamePlus();
        return;
      }
    } catch(e) {
      console.warn('[NgPlusV2] startNewGamePlus error:', e);
    }
    fallbackTransition(oldNg, newNg, cfg);
  }

  // ── Transição manual (fallback robusto) ───────────────────────
  function fallbackTransition(oldNg, newNg, cfg) {
    // Coleta o que preservar
    const keep = {
      rpg_ng_plus:         newNg,
      rpg_ng_relics:       buildNgRelics(oldNg, newNg, cfg),
      rpg_talents:         localStorage.getItem('rpg_talents')         || '[]',
      rpg_talent_pts:      localStorage.getItem('rpg_talent_pts')      || '0',
      rpg_grimoire:        localStorage.getItem('rpg_grimoire')        || '[]',
      rpg_achievements:    localStorage.getItem('rpg_achievements')    || '[]',
      rpg_equip_runes:     localStorage.getItem('rpg_equip_runes')     || '[]',
      rpg_unlocked_runes:  localStorage.getItem('rpg_unlocked_runes')  || '[]',
      rpg_honor:           localStorage.getItem('rpg_honor')           || '0',
      rpg_honor_shop:      localStorage.getItem('rpg_honor_shop')      || '[]',
      calc_lang:           rpg.lang                                    || 'pt',
      calc_hero:           rpg.heroName                                || 'Guerreiro',
      rpg_avatar:          rpg.avatar                                  || 'user',
      calc_intro_seen:     'true',
      rpg_class:           rpg.eqClass                                 || 'warrior',
      // Guarda highscores
      rpg_ng_best_ng:      Math.max(newNg, parseInt(localStorage.getItem('rpg_ng_best_ng') || '0')),
      // Autobackup antes de resetar
      rpg_autobackups:     localStorage.getItem('rpg_autobackups')     || '[]',
    };

    // Persiste o título
    const titles = JSON.parse(localStorage.getItem('rpg_ng_titles') || '[]');
    if (cfg.title && !titles.includes(cfg.title)) titles.push(cfg.title);
    keep.rpg_ng_titles = JSON.stringify(titles);

    // Limpa localStorage e restaura
    localStorage.clear();
    Object.entries(keep).forEach(([k, v]) => {
      localStorage.setItem(k, typeof v === 'object' ? JSON.stringify(v) : String(v));
    });

    // Feedback visual
    if (typeof showToast === 'function')
      showToast('🌟 ' + (cfg.label || 'NG+' + newNg) + ' iniciado! ' + (cfg.title || ''), 4000);

    // Fecha o modal e recarrega
    closeModal('ngplus-modal');
    setTimeout(() => location.reload(), 2000);
  }

  // ── Constrói a lista de relíquias NG+ ─────────────────────────
  function buildNgRelics(oldNg, newNg, cfg) {
    const existing = JSON.parse(localStorage.getItem('rpg_ng_relics') || '[]');

    // Adiciona a relíquia do CICLO QUE ACABOU DE SER COMPLETADO
    const completedCfg = getCycleConfig(newNg); // a relíquia é do próximo ciclo
    if (completedCfg.exclusiveRelic) {
      const alreadyHas = existing.some(r => r.id === completedCfg.exclusiveRelic.id);
      if (!alreadyHas) existing.push(completedCfg.exclusiveRelic);
    }

    return JSON.stringify(existing);
  }

  // ── Aplica bônus das relíquias NG+ no jogo ────────────────────
  function applyNgRelics() {
    const relics = JSON.parse(localStorage.getItem('rpg_ng_relics') || '[]');
    if (relics.length === 0) return;

    relics.forEach(relic => {
      switch (relic.id) {
        case 'ng1_echo':
          // +5% XP — patch em gainXp/levelUp
          patchXpBonus(1.05);
          break;
        case 'ng2_chaos_forge':
          // Fury sobe 2× mais rápido — patch em addFury
          patchFuryBonus(2);
          break;
        case 'ng3_void_pact':
          // Críticos têm chance de causar -50% HP do monstro
          rpg._ng3VoidPact = true;
          break;
        case 'ng4_mirror':
          // Modo espelho — ativado separadamente
          rpg._ng4Mirror = true;
          initMirrorMode();
          break;
      }
    });

    console.log('[NgPlusV2] Relíquias NG+ aplicadas:', relics.map(r => r.id));
  }

  // ── Patch XP bonus ────────────────────────────────────────────
  function patchXpBonus(mult) {
    const _orig = rpg.gainXp || rpg.addXp;
    if (!_orig) return;
    const fnName = rpg.gainXp ? 'gainXp' : 'addXp';
    rpg[fnName] = function(amount) {
      return _orig.apply(this, [Math.floor(amount * mult)]);
    };
  }

  // ── Patch Fury bonus ──────────────────────────────────────────
  function patchFuryBonus(mult) {
    const _origAddFury = rpg.addFury;
    if (!_origAddFury) return;
    rpg.addFury = function(amount) {
      return _origAddFury.apply(this, [Math.floor(amount * mult)]);
    };
  }

  // ── Modo Espelho (NG4) ────────────────────────────────────────
  let mirrorTurnCount = 0;
  let mirrorActive    = false;

  function initMirrorMode() {
    if (!rpg._ng4Mirror) return;

    const _origTick = rpg.useSkill;
    if (!_origTick) return;

    rpg.useSkill = function(id) {
      mirrorTurnCount++;

      // A cada 10 turnos, ativa modo espelho por 3 ataques
      if (mirrorTurnCount % 10 === 0 && !mirrorActive && this.inCombat && this.monster) {
        activateMirror();
      }

      return _origTick.apply(this, arguments);
    };
  }

  function activateMirror() {
    if (!rpg.monster) return;
    mirrorActive = true;

    // Guarda stats originais
    const heroAtk  = rpg.getAtk ? rpg.getAtk() : 100;
    const monsterDmg = rpg.monster.dmg;

    // Troca
    rpg._mirrorHeroAtk   = heroAtk;
    rpg._mirrorMonsterDmg = monsterDmg;
    rpg.monster.dmg = Math.floor(heroAtk * 0.3); // monstro usa 30% do ATK do herói

    if (typeof showToast === 'function')
      showToast('🔮 MODO ESPELHO ativo por 3 turnos!', 2500);

    // Efeito visual no HUD
    const arena = document.getElementById('arena-container');
    if (arena) {
      arena.style.filter = 'hue-rotate(180deg)';
      setTimeout(() => { if (arena) arena.style.filter = ''; }, 3000);
    }

    // Restaura após 3 turnos (via timeout de segurança)
    setTimeout(() => deactivateMirror(), 6000);

    // Hook em useSkill para contar 3 usos
    let mirrorUses = 0;
    const _origUse = rpg.useSkill;
    rpg.useSkill = function() {
      mirrorUses++;
      if (mirrorUses >= 3) {
        deactivateMirror();
        rpg.useSkill = _origUse; // restaura
      }
      return _origUse.apply(this, arguments);
    };
  }

  function deactivateMirror() {
    mirrorActive = false;
    if (rpg.monster && rpg._mirrorMonsterDmg !== undefined) {
      rpg.monster.dmg = rpg._mirrorMonsterDmg;
    }
    delete rpg._mirrorHeroAtk;
    delete rpg._mirrorMonsterDmg;
  }

  // ── Void Pact (NG3) — executa no dealDamageToMonster ─────────
  function patchVoidPact() {
    if (!rpg._ng3VoidPact) return;

    const _orig = rpg.dealDamageToMonster;
    if (!_orig) return;

    rpg.dealDamageToMonster = function(baseDmg, atkType, isUltimate) {
      const result = _orig.apply(this, arguments);

      // Crítico → 15% de chance de tirar 50% do HP atual do monstro
      if (this.monster && Math.random() < 0.15) {
        const voidDmg = Math.floor((this.monster.hp || 0) * 0.5);
        if (voidDmg > 0) {
          this.monster.hp -= voidDmg;
          this.showDamage && this.showDamage('💀 VOID ' + formatNumber(voidDmg), 'crit');
          this.updateHpBars && this.updateHpBars();
        }
      }

      return result;
    };
  }

  // ── Indicador de ciclo no menu ────────────────────────────────
  function injectNgIndicator() {
    const ng = rpg.ngPlusActive || 0;
    if (ng === 0) return;

    const cfg      = getCycleConfig(ng);
    const heroCard = document.querySelector('#view-menu .rounded-2xl.p-3.mb-4');
    if (!heroCard) return;
    if (document.getElementById('ng-menu-indicator')) return;

    const pill = document.createElement('div');
    pill.id    = 'ng-menu-indicator';
    pill.style.cssText = `
      text-align:center; margin-top:4px; margin-bottom:6px;
      font-family:'Orbitron',sans-serif; font-size:8px; font-weight:900;
      letter-spacing:0.12em; color:${cfg.color};
      text-shadow:0 0 10px ${cfg.glow};
    `;
    pill.textContent = '◆ ' + cfg.label + ' · ' + cfg.title + ' ◆';
    heroCard.insertAdjacentElement('afterend', pill);
  }

  // ── Injeção de estilos ────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('ng-plus-v2-styles')) return;
    const s = document.createElement('style');
    s.id = 'ng-plus-v2-styles';
    s.textContent = `
      #ngplus-body { scrollbar-width: none; }
      #ngplus-body::-webkit-scrollbar { display: none; }

      @keyframes ngGlow {
        0%   { opacity: 0.6; }
        100% { opacity: 1;   }
      }
      #ng-menu-indicator {
        animation: ngGlow 1.5s ease-in-out infinite alternate;
      }
      #ng-combat-badge {
        animation: ngGlow 1s ease-in-out infinite alternate;
      }
    `;
    document.head.appendChild(s);
  }

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    // Sincroniza ngPlusActive
    rpg.ngPlusActive = parseInt(localStorage.getItem('rpg_ng_plus') || '0');

    // Aplica patches
    patchSpawnMonster();
    patchRewards();
    applyNgRelics();
    patchVoidPact();

    // UI
    injectStyles();
    setTimeout(injectNgIndicator, 500);

    console.log('[NgPlusV2] OK — NG+' + (rpg.ngPlusActive || 0) + ' ativo');
  }

  function waitForRpg(cb, n) {
    if (typeof rpg !== 'undefined' && rpg.updateUI) cb();
    else if ((n || 0) < 40) setTimeout(() => waitForRpg(cb, (n || 0) + 1), 200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => waitForRpg(init));
  } else {
    waitForRpg(init);
  }

})();
