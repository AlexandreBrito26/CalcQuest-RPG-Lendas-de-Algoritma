// ═══════════════════════════════════════════════════════════════
// MODULE: combat-elements.js  —  SISTEMA DE ELEMENTOS V1
// ─────────────────────────────────────────────────────────────
// Adiciona ao combate existente:
//   • 4 elementos: Fogo 🔥 Ice ❄️ Raio ⚡ Sombra 🌑
//   • Status effects: Burn / Slow / Stun / Blind
//   • Cada classe tem elemento principal
//   • Monstros têm fraquezas elementais
//   • UI de status no HUD de combate
//   • Boss fases: a 50% HP, boss entra em Fase 2
// ═══════════════════════════════════════════════════════════════
(function CombatElementsModule() {
  'use strict';

  // ── Elementos ─────────────────────────────────────────────────
  const ELEMENTS = {
    fire:    { label:'Fogo',   icon:'flame',   color:'#ef4444', light:'rgba(239,68,68,0.3)',   statusId:'burn'  },
    ice:     { label:'Gelo',   icon:'snowflake',color:'#67e8f9', light:'rgba(103,232,249,0.3)', statusId:'slow'  },
    thunder: { label:'Raio',   icon:'zap',     color:'#fcd34d', light:'rgba(252,211,77,0.3)',  statusId:'stun'  },
    shadow:  { label:'Sombra', icon:'moon',    color:'#a855f7', light:'rgba(168,85,247,0.3)',  statusId:'blind' },
    none:    { label:'Neutro', icon:'circle',  color:'#94a3b8', light:'rgba(148,163,184,0.2)', statusId:null    },
  };

  // ── Status Effects ────────────────────────────────────────────
  const STATUS_EFFECTS = {
    burn: {
      label:'BURN🔥', color:'#ef4444', icon:'flame',
      onTick: (ctx) => {
        if (!ctx.monster || ctx.monster.hp <= 0) return;
        const dmg = Math.max(1, Math.floor(ctx.monster.maxHp * 0.025));
        ctx.monster.hp -= dmg;
        ctx.showDamage && ctx.showDamage('🔥 -' + formatNumber(dmg), 'monster');
        ctx.updateHpBars && ctx.updateHpBars();
      },
      duration: 3,
    },
    slow: {
      label:'SLOW❄️', color:'#67e8f9', icon:'snowflake',
      onApply: (ctx) => {
        if (ctx.monster) ctx.monster._origSpd = ctx.monster.spd;
        if (ctx.monster) ctx.monster.spd = Math.floor((ctx.monster.spd || 1000) * 1.5); // ATB demora mais
      },
      onRemove: (ctx) => {
        if (ctx.monster && ctx.monster._origSpd) ctx.monster.spd = ctx.monster._origSpd;
      },
      duration: 3,
    },
    stun: {
      label:'STUN⚡', color:'#fcd34d', icon:'zap-off',
      onApply: (ctx) => { ctx._stunned = true; },
      onRemove: (ctx) => { ctx._stunned = false; },
      duration: 1, // pula 1 ataque do monstro
    },
    blind: {
      label:'BLIND🌑', color:'#a855f7', icon:'eye-off',
      onApply: (ctx) => { ctx._blinded = true; },
      onRemove: (ctx) => { ctx._blinded = false; },
      duration: 2,
    },
  };

  // ── Elemento por classe ───────────────────────────────────────
  const CLASS_ELEMENT = {
    warrior:     'fire',
    mage:        'ice',
    rogue:       'shadow',
    paladin:     'thunder',
    necromancer: 'shadow',
    berserker:   'fire',
    archivist:   'thunder',
  };

  // ── Fraquezas elementais por monstro ─────────────────────────
  const MONSTER_WEAKNESSES = {
    slime:            { weak: 'fire',    res: 'ice'     },
    goblin:           { weak: 'thunder', res: 'shadow'  },
    orc:              { weak: 'ice',     res: 'fire'    },
    ghost:            { weak: 'thunder', res: 'shadow'  },
    dragon:           { weak: 'ice',     res: 'fire'    },
    glitch:           { weak: 'shadow',  res: 'thunder' },
    trojan:           { weak: 'fire',    res: 'ice'     },
    ransomware:       { weak: 'thunder', res: 'shadow'  },
    rogue_ai:         { weak: 'ice',     res: 'fire'    },
    void_walker:      { weak: 'fire',    res: 'shadow'  },
    star_eater:       { weak: 'ice',     res: 'thunder' },
    time_warden:      { weak: 'shadow',  res: 'fire'    },
    memory_leak:      { weak: 'fire',    res: 'ice'     },
    infinite_loop:    { weak: 'thunder', res: 'shadow'  },
    corrupted_file:   { weak: 'fire',    res: 'ice'     },
    syntax_error:     { weak: 'ice',     res: 'thunder' },
    dev_bot:          { weak: 'shadow',  res: 'fire'    },
  };

  // ── Estado dos status effects ─────────────────────────────────
  let activeStatuses = {}; // { statusId: { turnsLeft, config } }

  // ── Patch: magic attack agora aplica elemento ─────────────────
  function patchMagicAttack() {
    const _origUseSkill = rpg.useSkill;
    if (!_origUseSkill) return;

    rpg.useSkill = function(id) {
      if (id === 'mag' && this.inCombat && this.monster) {
        // Determina elemento da classe
        const cls  = this.eqClass || 'warrior';
        const elem = CLASS_ELEMENT[cls] || 'none';
        this._currentElement = elem;

        // Verifica fraqueza elemental
        if (this.monster && MONSTER_WEAKNESSES[this.monster.id]) {
          const mw = MONSTER_WEAKNESSES[this.monster.id];
          if (mw.weak === elem) {
            this._elemBonus = 2.0; // 2x damage
            this._elemLabel = '💥 ELEMENTAL!';
          } else if (mw.res === elem) {
            this._elemBonus = 0.5;
            this._elemLabel = '🛡 RESISTENTE';
          } else {
            this._elemBonus = 1.0;
            this._elemLabel = null;
          }
        }

        // Aplica status effect com probabilidade
        setTimeout(() => tryApplyStatus(elem), 500);
      }

      const result = _origUseSkill.apply(this, arguments);
      this._currentElement = null;
      this._elemBonus = 1.0;
      this._elemLabel = null;
      return result;
    };
  }

  // ── Patch: dealDamageToMonster para usar bonus elemental ──────
  function patchDealDamage() {
    const _orig = rpg.dealDamageToMonster;
    if (!_orig) return;

    rpg.dealDamageToMonster = function(baseDmg, atkType, isUltimate) {
      // Aplica bonus elemental se atkType === 'mag'
      if (atkType === 'mag' && rpg._elemBonus && rpg._elemBonus !== 1.0) {
        baseDmg = Math.floor(baseDmg * rpg._elemBonus);
        if (rpg._elemLabel) {
          const elem = ELEMENTS[rpg._currentElement] || ELEMENTS.none;
          setTimeout(() => {
            rpg.showDamage && rpg.showDamage(rpg._elemLabel, rpg._elemBonus > 1 ? 'dmg-effective' : 'dmg-resistant');
          }, 100);
        }
      }

      // Blind: monstro erra 40% das vezes (aplicado no executeMonsterAttack separado)
      return _orig.apply(this, [baseDmg, atkType, isUltimate]);
    };
  }

  // ── Patch: executeMonsterAttack para Stun e Blind ─────────────
  function patchMonsterAttack() {
    const _orig = rpg.executeMonsterAttack;
    if (!_orig) return;

    rpg.executeMonsterAttack = function() {
      // Stun: pula o ataque
      if (rpg._stunned) {
        rpg._stunned = false;
        rpg.showDamage && rpg.showDamage('⚡ STUNADO!', 'dodge');
        tickStatuses();
        return;
      }

      // Blind: 40% de chance de errar
      if (rpg._blinded && Math.random() < 0.4) {
        rpg.showDamage && rpg.showDamage('🌑 ERROU!', 'dodge');
        tickStatuses();
        return;
      }

      tickStatuses();
      return _orig.apply(this, arguments);
    };
  }

  // ── Tenta aplicar status effect ───────────────────────────────
  function tryApplyStatus(elemId) {
    const elem   = ELEMENTS[elemId];
    if (!elem || !elem.statusId) return;

    const statusId = elem.statusId;
    const status   = STATUS_EFFECTS[statusId];
    if (!status) return;

    // 35% de chance de aplicar (sobe com level)
    const chance = 0.35 + (rpg.level || 1) * 0.0005;
    if (Math.random() > chance) return;

    // Não reaplica se já ativo (exceto burn que se acumula)
    if (activeStatuses[statusId] && statusId !== 'burn') {
      activeStatuses[statusId].turnsLeft = status.duration; // refresca
      return;
    }

    activeStatuses[statusId] = {
      turnsLeft: status.duration,
      config:    status,
    };

    // Aplica efeito de início
    if (status.onApply) status.onApply(rpg);

    showToast('✨ ' + status.label + ' aplicado!', 2000);
    updateStatusUI();
  }

  // ── Tick dos status effects ───────────────────────────────────
  function tickStatuses() {
    const toRemove = [];

    Object.entries(activeStatuses).forEach(([id, entry]) => {
      // Tick effect (ex: burn damage)
      if (entry.config.onTick) entry.config.onTick(rpg);

      entry.turnsLeft--;
      if (entry.turnsLeft <= 0) {
        if (entry.config.onRemove) entry.config.onRemove(rpg);
        toRemove.push(id);
      }
    });

    toRemove.forEach(id => delete activeStatuses[id]);
    updateStatusUI();
  }

  // ── UI dos status effects ─────────────────────────────────────
  function updateStatusUI() {
    let bar = document.getElementById('element-status-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'element-status-bar';
      bar.style.cssText = `
        display:flex; gap:4px; flex-wrap:wrap; padding:4px 8px;
        position:absolute; bottom:2px; left:50%; transform:translateX(-50%);
        z-index:30; pointer-events:none;
      `;
      const arena = document.getElementById('arena-container');
      if (arena) { arena.style.position = 'relative'; arena.appendChild(bar); }
    }

    bar.innerHTML = Object.entries(activeStatuses).map(([id, entry]) => {
      const s = STATUS_EFFECTS[id];
      const e = Object.values(ELEMENTS).find(el => el.statusId === id) || ELEMENTS.none;
      return `
        <div style="
          font-family:'Fira Code',monospace; font-size:7px; font-weight:900;
          color:${e.color}; background:${e.light}; border:1px solid ${e.color}50;
          padding:2px 6px; border-radius:4px; letter-spacing:0.06em; line-height:1.4;
          animation:statusPulse 0.8s ease-in-out infinite alternate;
        ">
          ${s.label} ${entry.turnsLeft}t
        </div>
      `;
    }).join('');
  }

  // ── BOSS FASES ────────────────────────────────────────────────
  let bossPhase2Triggered = false;

  function initBossPhases() {
    const _origUpdateHp = rpg.updateHpBars;
    if (!_origUpdateHp) return;

    rpg.updateHpBars = function() {
      _origUpdateHp.apply(this, arguments);

      // Verifica fase 2 do boss
      if (this.isBossFight && this.monster && !bossPhase2Triggered) {
        const pct = this.monster.hp / this.monster.maxHp;
        if (pct <= 0.5 && pct > 0) {
          bossPhase2Triggered = true;
          triggerBossPhase2();
        }
      }
    };

    // Reset ao iniciar batalha
    const _origStartBattle = rpg.startBattle || rpg.spawnMonster;
    if (_origStartBattle) {
      const origFn = rpg.startBattle ? 'startBattle' : 'spawnMonster';
      const _o     = rpg[origFn];
      rpg[origFn]  = function() {
        bossPhase2Triggered = false;
        return _o.apply(this, arguments);
      };
    }
  }

  function triggerBossPhase2() {
    if (!rpg.monster) return;

    // Animação de fase 2
    const monsterSprite = document.getElementById('monster-sprite-container');
    if (monsterSprite) {
      monsterSprite.style.animation = 'none';
      monsterSprite.style.filter    = 'hue-rotate(120deg) brightness(1.5)';
      monsterSprite.style.transform = 'scale(1.3)';
      setTimeout(() => {
        if (monsterSprite) {
          monsterSprite.style.filter    = '';
          monsterSprite.style.transform = '';
        }
      }, 1500);
    }

    // Flash vermelho na tela
    const flash = document.getElementById('flash-overlay');
    if (flash) {
      flash.style.background = 'rgba(239,68,68,0.3)';
      flash.classList.add('flash-screen');
      setTimeout(() => {
        flash.classList.remove('flash-screen');
        flash.style.background = '';
      }, 800);
    }

    // Buff do boss: +50% velocidade e +30% dano
    rpg.monster.spd = Math.floor((rpg.monster.spd || 1000) * 0.6);
    rpg.monster.dmg = Math.floor(rpg.monster.dmg * 1.3);

    // Adiciona ao battle log
    setTimeout(() => {
      if (typeof showToast === 'function')
        showToast('💀 ' + (rpg.monster.name || 'Boss') + ' entrou em FASE 2! Mais rápido e mais forte!', 4000);
    }, 500);

    // Atualiza badge de dificuldade
    const diffBadge = document.getElementById('battle-diff-badge');
    if (diffBadge) {
      diffBadge.textContent  = 'FASE 2 ⚡';
      diffBadge.style.color  = '#ef4444';
      diffBadge.style.animation = 'statusPulse 0.5s ease-in-out infinite alternate';
    }
  }

  // ── Indicador de elemento da classe ──────────────────────────
  function injectElementIndicator() {
    const cls  = rpg.eqClass || 'warrior';
    const elem = CLASS_ELEMENT[cls] || 'none';
    const e    = ELEMENTS[elem];

    // Adiciona ao botão de magia
    const magBtn = document.getElementById('btn-mag');
    if (!magBtn || document.getElementById('elem-indicator')) return;

    const ind = document.createElement('span');
    ind.id    = 'elem-indicator';
    ind.style.cssText = `
      position:absolute; top:2px; right:4px;
      font-size:8px; font-weight:900;
      color:${e.color}; font-family:'Fira Code',monospace;
      line-height:1; pointer-events:none;
    `;
    ind.textContent = e.label.slice(0, 4).toUpperCase();
    magBtn.style.position = 'relative';
    magBtn.appendChild(ind);
  }

  // ── CSS ───────────────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('combat-elements-styles')) return;
    const s = document.createElement('style');
    s.id = 'combat-elements-styles';
    s.textContent = `
      @keyframes statusPulse {
        from { opacity: 0.7; transform: scale(0.97); }
        to   { opacity: 1;   transform: scale(1.02); }
      }
    `;
    document.head.appendChild(s);
  }

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    patchMagicAttack();
    patchDealDamage();
    patchMonsterAttack();
    initBossPhases();
    injectStyles();
    setTimeout(injectElementIndicator, 800);

    // Limpa status ao sair do combate
    const _origEndBattle = rpg.endBattle;
    if (_origEndBattle) {
      rpg.endBattle = function() {
        activeStatuses = {};
        rpg._stunned   = false;
        rpg._blinded   = false;
        const bar = document.getElementById('element-status-bar');
        if (bar) bar.innerHTML = '';
        const diffBadge = document.getElementById('battle-diff-badge');
        if (diffBadge) { diffBadge.style.color = ''; diffBadge.style.animation = ''; }
        return _origEndBattle.apply(this, arguments);
      };
    }

    console.log('[CombatElementsModule] OK — 4 elementos + status effects + boss fases');
  }

  function waitForRpg(cb, n) {
    if (typeof rpg !== 'undefined' && rpg.useSkill) cb();
    else if ((n || 0) < 40) setTimeout(() => waitForRpg(cb, (n || 0) + 1), 200);
  }

  waitForRpg(init);
})();
