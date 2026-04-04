// ═══════════════════════════════════════════════════════════════
// MODULE: day-night-effects.js  —  EFEITOS REAIS DO CICLO DIA/NOITE
// ─────────────────────────────────────────────────────────────
// Assenta por cima do weather-system.js (não o modifica).
// Requer: weather-system.js carregado antes.
//
// Efeitos implementados:
//   NOITE (20h–5h)
//     • Monstros sombrios aparecem (+25% ATK, nome prefixado)
//     • Drops raros +15% (stacks com dropBonus do clima)
//     • Monstros ganham dodge +10%
//
//   AMANHECER (5h–8h)
//     • Bónus "Primeiro Ataque" do dia: 1 hit gratuito +50% ATK
//       sem contra-ataque do monstro no 1.º turno
//     • Regeneração passiva +5 HP por kill (enquanto durar)
//
//   DIA (8h–17h)
//     • Sem efeito extra (baseline)
//
//   ENTARDECER (17h–20h)
//     • Ouro +10%, XP +5% (trabalhadores a voltar do campo)
//     • Monstros ligeiramente mais rápidos (+10% ATB speed)
//
//   MADRUGADA (0h–5h)
//     • Como Noite mas com chance 3% de spawn Elite imediato
//     • Elite: HP×3, ATK×2, drop garantido de poção
// ═══════════════════════════════════════════════════════════════
(function DayNightEffectsModule() {
  'use strict';

  // ── Períodos e seus efeitos ───────────────────────────────────
  const PERIODS = {
    dawn: {
      hours: [5, 8],
      label: { pt: 'Amanhecer', en: 'Dawn' },
      icon: '🌅',
      firstStrikeBonus: true,   // 1.º ataque do combate: +50% ATK, sem contra
      regenPerKill: 5,           // +HP por kill
    },
    day: {
      hours: [8, 17],
      label: { pt: 'Dia', en: 'Day' },
      icon: '☀️',
      // baseline — sem efeito extra
    },
    dusk: {
      hours: [17, 20],
      label: { pt: 'Entardecer', en: 'Dusk' },
      icon: '🌇',
      goldMult: 1.10,            // +10% ouro
      xpMult:   1.05,            // +5% XP
      monsterSpdMult: 1.10,      // monstros +10% velocidade ATB
    },
    night: {
      hours: [20, 24],
      label: { pt: 'Noite', en: 'Night' },
      icon: '🌙',
      shadowMonsters: true,      // monstros sombrios (+25% ATK)
      dropBonus: 0.15,           // +15% drop raro
      monsterDodgeBonus: 0.10,   // +10% dodge
    },
    midnight: {
      hours: [0, 5],
      label: { pt: 'Madrugada', en: 'Midnight' },
      icon: '🌑',
      shadowMonsters: true,
      dropBonus: 0.15,
      monsterDodgeBonus: 0.10,
      eliteChance: 0.03,         // 3% spawn Elite
    },
  };

  // ── Estado ────────────────────────────────────────────────────
  let _period = null;           // período actual
  let _firstStrikeReady = false;// amanhecer: hit gratuito disponível
  let _firstStrikeUsed  = false;// já usou neste combate
  let _combatStarted    = false;

  // ── Utilidades ────────────────────────────────────────────────
  function getPeriod() {
    const h = new Date().getHours();
    for (const [key, p] of Object.entries(PERIODS)) {
      const [s, e] = p.hours;
      if (h >= s && h < e) return { key, ...p };
    }
    return { key: 'night', ...PERIODS.night };
  }

  function lang() {
    return (typeof rpg !== 'undefined' && rpg.lang) || 'pt';
  }

  function toast(msg, dur) {
    if (typeof showToast === 'function') showToast(msg, dur || 3000);
  }

  function fmt(n) {
    return typeof formatNumber === 'function' ? formatNumber(n) : String(n);
  }

  // ── 1. PATCH spawnMonster — monstros sombrios + elite ────────
  function patchSpawnMonster() {
    const _orig = rpg.spawnMonster;
    rpg.spawnMonster = function() {
      const result = _orig ? _orig.apply(this, arguments) : undefined;
      if (!this.monster || this.isBossFight) return result;

      _period = getPeriod();

      // ── Monstro Sombrio (Noite / Madrugada) ──────────────────
      if (_period.shadowMonsters) {
        const shadowNames = {
          pt: ['Sombra do', 'Espectro do', 'Eco Sombrio do', 'Glitch Noturno de'],
          en: ['Shadow', 'Spectre of', 'Dark Echo of', 'Night Glitch of'],
        };
        const l = lang();
        const prefix = shadowNames[l][Math.floor(Math.random() * shadowNames[l].length)];
        this.monster.name = `${prefix} ${this.monster.name}`;
        this.monster.dmg  = Math.floor(this.monster.dmg * 1.25);
        this.monster.dodge = Math.min(0.85, (this.monster.dodge || 0) + (_period.monsterDodgeBonus || 0));
        this.monster._isShadow = true;

        // Muda cor para tom mais escuro/sombrio
        this.monster.color = 'text-purple-300';

        // Atualiza o DOM do monstro
        const nameEl = document.getElementById('monster-name');
        if (nameEl) nameEl.innerText = this.monster.name;
      }

      // ── Elite (Madrugada, 3%) ─────────────────────────────────
      if (_period.eliteChance && Math.random() < _period.eliteChance && !this.monster._isElite) {
        makeElite(this.monster);
      }

      // ── Entardecer: monstros mais rápidos ────────────────────
      if (_period.monsterSpdMult) {
        this.monster.spd = Math.max(200, Math.floor(this.monster.spd / _period.monsterSpdMult));
      }

      // ── Amanhecer: activa first-strike ───────────────────────
      if (_period.firstStrikeBonus) {
        _firstStrikeReady = true;
        _firstStrikeUsed  = false;
      } else {
        _firstStrikeReady = false;
      }

      _combatStarted = true;
      updateCombatPeriodBadge();

      return result;
    };
  }

  function makeElite(monster) {
    monster.maxHp *= 3;
    monster.hp    *= 3;
    monster.dmg   *= 2;
    monster._isElite = true;
    monster.name  = `[ELITE] ${monster.name}`;
    monster.color = 'text-yellow-300';
    monster._guaranteedDrop = true;

    // Atualiza DOM
    const nameEl = document.getElementById('monster-name');
    if (nameEl) {
      nameEl.innerText = monster.name;
      nameEl.style.color = '#ffd60a';
    }

    toast('⭐ ELITE SPAWN!', 2500);
    console.log('[DayNight] Elite spawned:', monster.name);
  }

  // ── 2. PATCH killMonster — drops, regen, ouro/XP ─────────────
  function patchKillMonster() {
    const _orig = rpg.killMonster;
    rpg.killMonster = function() {
      _period = getPeriod();
      const monster = this.monster;
      const isElite  = monster?._isElite;
      const goldBefore = this.gold;
      const xpBefore   = this.xp || 0;

      const result = _orig ? _orig.apply(this, arguments) : undefined;

      // ── Drop garantido (Elite) ────────────────────────────────
      if (isElite && monster._guaranteedDrop) {
        this.potions = (this.potions || 0) + 1;
        toast('⭐ Elite drop: +1 Poção!', 2500);
        updatePotionDisplay(this);
      }

      // ── Drop raro bónus (Noite / Neblina / etc.) ──────────────
      const dropBonusTotal = (_period.dropBonus || 0) + (this._weatherEffects?.dropBonus || 0);
      if (dropBonusTotal > 0 && Math.random() < dropBonusTotal) {
        this.potions = (this.potions || 0) + 1;
        const dropMsg = _period.key === 'fog'
          ? `🌫 Drop Raro: +1 Poção (Neblina)`
          : `${_period.icon} Drop Raro: +1 Poção (${_period.label[lang()]})`;
        toast(dropMsg, 2500);
        updatePotionDisplay(this);
      }

      // ── Regeneração de Amanhecer ──────────────────────────────
      if (_period.regenPerKill && _period.regenPerKill > 0) {
        const heal = _period.regenPerKill;
        this.heroHp = Math.min(this.getMaxHp(), (this.heroHp || 0) + heal);
        if (this.showDamage) this.showDamage(`🌅 +${heal}`, 'heal');
        if (this.updateHpBars) this.updateHpBars();
      }

      // ── Bónus de ouro/XP do Entardecer ───────────────────────
      if (_period.goldMult && _period.goldMult !== 1.0) {
        const goldEarned = this.gold - goldBefore;
        if (goldEarned > 0) {
          const bonus = Math.floor(goldEarned * (_period.goldMult - 1.0));
          if (bonus > 0) {
            this.gold += bonus;
            if (this.showDamage) this.showDamage(`+${fmt(bonus)}💰`, 'heal');
          }
        }
      }

      _combatStarted = false;
      return result;
    };
  }

  function updatePotionDisplay(rpgCtx) {
    const potBtn = document.getElementById('btn-potion-count');
    if (potBtn) potBtn.innerText = fmt(rpgCtx.potions || 0);
    const menuPot = document.getElementById('menu-potions');
    if (menuPot) menuPot.innerText = fmt(rpgCtx.potions || 0);
  }

  // ── 3. FIRST STRIKE (Amanhecer) ──────────────────────────────
  // Ao atacar pela primeira vez num combate de Amanhecer,
  // o ataque tem +50% ATK e o monstro não contra-ataca nesse turno.
  function patchAttack() {
    const _orig = rpg.attack;
    if (!_orig) return;
    rpg.attack = function() {
      if (_firstStrikeReady && !_firstStrikeUsed && _combatStarted) {
        _firstStrikeUsed = true;

        // Aplica +50% no próximo dealDamageToMonster via flag
        this._firstStrikeActive = true;
        toast('🌅 Primeiro Ataque do Dia! +50% ATK', 2000);
        const result = _orig.apply(this, arguments);
        this._firstStrikeActive = false;

        // Bloqueia o contra-ataque do monstro por 1 turno
        if (this.monster) {
          this.monster._skipNextAttack = true;
          setTimeout(() => {
            if (this.monster) this.monster._skipNextAttack = false;
          }, this.monster.spd + 100);
        }
        return result;
      }
      return _orig.apply(this, arguments);
    };
  }

  function patchDealDamageForFirstStrike() {
    const _orig = rpg.dealDamageToMonster;
    if (!_orig) return;
    rpg.dealDamageToMonster = function(dmg, type, isCrit) {
      if (this._firstStrikeActive) {
        dmg = Math.floor(dmg * 1.5);
      }
      return _orig.call(this, dmg, type, isCrit);
    };
  }

  // Bloqueia contra-ataque do monstro no turno do first-strike
  function patchMonsterAttackForFirstStrike() {
    const _orig = rpg.executeMonsterAttack;
    if (!_orig) return;
    rpg.executeMonsterAttack = function() {
      if (this.monster?._skipNextAttack) {
        this.monster._skipNextAttack = false;
        return; // silencia o ataque
      }
      return _orig.apply(this, arguments);
    };
  }

  // ── 4. BADGE DE PERÍODO NO HUD DE COMBATE ────────────────────
  function updateCombatPeriodBadge() {
    let badge = document.getElementById('dn-period-badge');
    if (!badge) {
      // Injeta ao lado do weather badge (se existir) ou no hud-center
      const hudCenter = document.querySelector('.hud-center') ||
                        document.querySelector('.hud-compact-panel');
      if (!hudCenter) return;

      badge = document.createElement('div');
      badge.id = 'dn-period-badge';
      badge.style.cssText = `
        font-family: 'Fira Code', monospace;
        font-size: 7px;
        font-weight: 800;
        letter-spacing: 0.06em;
        text-align: center;
        opacity: 0.85;
        white-space: nowrap;
        margin-top: 2px;
      `;
      hudCenter.appendChild(badge);
    }

    const p = getPeriod();
    const effectLines = [];
    if (p.shadowMonsters)   effectLines.push('Sombras');
    if (p.firstStrikeBonus) effectLines.push('1.º Ataque');
    if (p.regenPerKill)     effectLines.push(`+${p.regenPerKill}HP/kill`);
    if (p.goldMult > 1)     effectLines.push(`Ouro+${Math.round((p.goldMult-1)*100)}%`);
    if (p.eliteChance)      effectLines.push('Elite!');

    badge.textContent = `${p.icon} ${p.label[lang()]}`;
    badge.title = effectLines.join(' · ') || p.label[lang()];

    // Cor por período
    const colors = {
      dawn:     '#fbbf24',
      day:      '#e5e7eb',
      dusk:     '#f97316',
      night:    '#a78bfa',
      midnight: '#6366f1',
    };
    badge.style.color = colors[p.key] || '#94a3b8';
  }

  // ── 5. HUD FLUTUANTE NO MENU ──────────────────────────────────
  function createMenuDayNightWidget() {
    // Injeta ao lado do weather widget (se existir) ou no body
    if (document.getElementById('dn-menu-widget')) return;

    const widget = document.createElement('div');
    widget.id = 'dn-menu-widget';
    widget.style.cssText = `
      position: fixed;
      top: 10px;
      left: 10px;
      z-index: 7999;
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 5px 9px;
      background: rgba(8,8,16,0.9);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 8px;
      backdrop-filter: blur(8px);
      cursor: default;
      pointer-events: none;
    `;
    document.body.appendChild(widget);
    updateMenuWidget();

    // Atualiza a cada minuto
    setInterval(updateMenuWidget, 60 * 1000);
  }

  function updateMenuWidget() {
    const widget = document.getElementById('dn-menu-widget');
    if (!widget) return;

    const p = getPeriod();
    const now = new Date();
    const hh  = String(now.getHours()).padStart(2, '0');
    const mm  = String(now.getMinutes()).padStart(2, '0');

    const colors = {
      dawn:     '#fbbf24',
      day:      '#e5e7eb',
      dusk:     '#f97316',
      night:    '#a78bfa',
      midnight: '#6366f1',
    };
    const col = colors[p.key] || '#94a3b8';

    widget.innerHTML = `
      <span style="font-size:11px;">${p.icon}</span>
      <span style="font-family:'Fira Code',monospace;font-size:8px;color:${col};font-weight:700;letter-spacing:0.04em;">
        ${hh}:${mm}
      </span>
    `;
    widget.title = `${p.label[lang()]} — ${buildEffectDesc(p)}`;
  }

  function buildEffectDesc(p) {
    const parts = [];
    if (p.shadowMonsters)         parts.push('Monstros Sombrios (+25% ATK, +10% Dodge)');
    if (p.dropBonus)              parts.push(`Drops Raros +${Math.round(p.dropBonus*100)}%`);
    if (p.firstStrikeBonus)       parts.push('1.º Ataque: +50% ATK gratuito');
    if (p.regenPerKill)           parts.push(`+${p.regenPerKill} HP por kill`);
    if (p.goldMult && p.goldMult > 1) parts.push(`Ouro +${Math.round((p.goldMult-1)*100)}%`);
    if (p.xpMult && p.xpMult > 1)    parts.push(`XP +${Math.round((p.xpMult-1)*100)}%`);
    if (p.monsterSpdMult)         parts.push('Monstros +10% velocidade');
    if (p.eliteChance)            parts.push('Chance Elite 3%');
    return parts.length ? parts.join(' · ') : 'Sem efeitos especiais';
  }

  // ── 6. INTEGRAÇÃO COM BOOT-SCREEN ────────────────────────────
  // Adiciona linha do período ao terminal de boot se disponível
  function hookBootScreen() {
    // O boot-screen.js lê rpg.ngPlusActive etc em getProgressLines()
    // Basta expor o período no rpg para ele incluir automaticamente
    if (typeof rpg !== 'undefined') {
      rpg._dayNightPeriod = getPeriod();
    }
  }

  // ── 7. NOTIFICAÇÃO AO ENTRAR EM NOVO PERÍODO ─────────────────
  let _lastPeriodKey = null;
  function watchPeriodChanges() {
    setInterval(() => {
      const p = getPeriod();
      if (p.key !== _lastPeriodKey) {
        _lastPeriodKey = p.key;
        const desc = buildEffectDesc(p);
        toast(`${p.icon} ${p.label[lang()]} — ${desc}`, 5000);
        updateMenuWidget();
        updateCombatPeriodBadge();
        console.log('[DayNight] Período →', p.key, desc);
      }
    }, 30 * 1000); // verifica a cada 30s
  }

  // ── INIT ──────────────────────────────────────────────────────
  function init() {
    _period = getPeriod();
    _lastPeriodKey = _period.key;

    patchSpawnMonster();
    patchKillMonster();
    patchAttack();
    patchDealDamageForFirstStrike();
    patchMonsterAttackForFirstStrike();
    createMenuDayNightWidget();
    hookBootScreen();
    watchPeriodChanges();

    console.log(
      '[DayNightEffects] OK —',
      `Período: ${_period.key} (${_period.icon})`,
      '|', buildEffectDesc(_period)
    );
  }

  function waitForRpg(cb, n) {
    const ready = typeof rpg !== 'undefined'
      && typeof rpg.spawnMonster === 'function'
      && typeof rpg.killMonster  === 'function'
      && typeof rpg.getMaxHp     === 'function';
    if (ready) cb();
    else if ((n || 0) < 50) setTimeout(() => waitForRpg(cb, (n || 0) + 1), 200);
    else console.warn('[DayNightEffects] rpg não encontrado após timeout.');
  }

  // Aguarda weather-system.js também (para stacking de efeitos)
  function waitForWeather(cb, n) {
    if (typeof rpg !== 'undefined' && rpg._weatherEffects !== undefined) cb();
    else if ((n || 0) < 30) setTimeout(() => waitForWeather(cb, (n || 0) + 1), 300);
    else cb(); // arranca sem weather se demorar demais
  }

  waitForRpg(() => waitForWeather(init));

})();
