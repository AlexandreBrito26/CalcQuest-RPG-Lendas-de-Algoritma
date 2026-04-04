// ═══════════════════════════════════════════════════════════════
// MODULE: combat-fix.js  —  v3 CORRIGIDO
// ─────────────────────────────────────────────────────────────
// BUG CRÍTICO CORRIGIDO: assinatura errada em startBattle
//   ANTES: rpg.startBattle = function(monster, isBoss) → ERRADO
//   AGORA: rpg.startBattle = function(isBoss) → CORRETO
//   (o game.js só aceita 1 parâmetro — o monster é criado
//    internamente via spawnMonster())
//
// O bug antigo fazia com que todo combate fosse tratado como
// boss fight porque `monster` (objeto truthy) era passado como
// primeiro argumento onde o game.js esperava `isBoss` (boolean).
// ═══════════════════════════════════════════════════════════════
(function CombatFixModule() {
  'use strict';

  function init() {
    patchStartBattle();
    patchFlee();
    addCombatWatchdog();
    console.log('[CombatFixModule v3] OK — assinatura startBattle corrigida');
  }

  // ── 1. Patch startBattle com assinatura CORRETA ──────────────
  function patchStartBattle() {
    const _orig = rpg.startBattle.bind(rpg);

    rpg.startBattle = function(isBoss) {          // ← 1 param, não 2
      // Garante HP do herói válido antes de qualquer coisa
      if (!this.heroHp || this.heroHp < 1) {
        this.heroHp = this.getMaxHp ? this.getMaxHp() : 100;
      }

      // Reseta flags de estado
      this.isDefending = false;
      this.isSpawning  = false;
      this.fury        = this.fury || 0;

      // Chama original com assinatura correta
      try {
        return _orig.call(this, isBoss);
      } catch(e) {
        console.error('[CombatFixModule] startBattle error:', e);
      }
    };
  }

  // ── 2. Patch flee — limpa estado completamente ───────────────
  function patchFlee() {
    if (!rpg.flee) return;
    const _orig = rpg.flee.bind(rpg);

    rpg.flee = function() {
      // Para auto-attack imediatamente
      this.autoAttack = false;
      const autoBtn = document.getElementById('btn-auto-atk');
      if (autoBtn) {
        autoBtn.classList.remove('auto-atk-active');
        autoBtn.style.borderColor = '';
        autoBtn.style.color = '';
      }

      // Cancela o combatFrame
      if (this.combatFrame) {
        cancelAnimationFrame(this.combatFrame);
        this.combatFrame = null;
      }

      try {
        return _orig.call(this);
      } catch(e) {
        console.error('[CombatFixModule] flee error:', e);
        this.inCombat = false;
        this.monster  = null;
        if (typeof navTo === 'function') navTo('menu');
      }
    };
  }

  // ── 3. Watchdog leve — só recupera se realmente travado ──────
  function addCombatWatchdog() {
    let lastKills = -1;
    let staleCount = 0;

    setInterval(() => {
      if (!rpg.inCombat || !rpg.autoAttack) {
        staleCount = 0;
        lastKills = rpg.kills || 0;
        return;
      }

      const cur = rpg.kills || 0;
      if (cur === lastKills) staleCount++;
      else { staleCount = 0; lastKills = cur; }

      // 60s de auto-attack ativo sem matar nada = provavelmente travado
      if (staleCount >= 30) {
        staleCount = 0;
        // Só intervém se o monstro tem HP inválido
        if (rpg.monster && (rpg.monster.hp <= 0 || isNaN(rpg.monster.hp))) {
          console.warn('[CombatFixModule] Monstro com HP inválido — forçando killMonster');
          try { rpg.killMonster && rpg.killMonster(); } catch(e) {}
        }
      }
    }, 2000);
  }

  // ── Aguarda rpg ──────────────────────────────────────────────
  function waitForRpg(n) {
    if (typeof rpg !== 'undefined' && rpg.startBattle && rpg.flee) {
      init();
    } else if ((n || 0) < 30) {
      setTimeout(() => waitForRpg((n || 0) + 1), 200);
    }
  }

  waitForRpg(0);
})();
