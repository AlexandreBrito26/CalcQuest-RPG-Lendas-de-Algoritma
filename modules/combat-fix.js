// ═══════════════════════════════════════════════════════════════
// MODULE: combat-fix.js
// Fix: Combate travado — recuperação de estado
// Fix: Bug onde o combate fica "preso" sem inimigo ou sem HP
// Fix: Auto-attack não para depois de fugir
// Fix: Monstro com HP -1 ou valores inválidos
// ═══════════════════════════════════════════════════════════════
(function CombatFixModule() {
  'use strict';

  function init() {
    patchCombatState();
    patchHpDisplay();
    addCombatWatchdog();
    patchFlee();
    console.log('[CombatFixModule] OK');
  }

  // ── 1. Corrige estado inválido do combate ────────────────────
  function patchCombatState() {
    // Patch no startBattle / startCombat para garantir HP válido
    const _origStartBattle = rpg.startBattle;
    if (_origStartBattle) {
      rpg.startBattle = function(monster, isBoss) {
        // Valida HP do monstro antes de começar
        if (monster) {
          monster.hp    = Math.max(1, parseInt(monster.hp)    || 1);
          monster.maxHp = Math.max(1, parseInt(monster.maxHp) || monster.hp);
        }

        // Garante HP do herói válido
        if (!this.heroHp || this.heroHp < 1) {
          this.heroHp = this.getMaxHp();
        }

        // Reseta flags de estado
        this.isDefending  = false;
        this.isSpawning   = false;
        this.fury         = this.fury || 0;

        try {
          return _origStartBattle.apply(this, arguments);
        } catch(e) {
          console.error('[CombatFixModule] startBattle error:', e);
        }
      };
    }
  }

  // ── 2. Corrige display de HP com valores negativos ───────────
  function patchHpDisplay() {
    // Wrapper no updateCombatUI / renderCombat para nunca mostrar HP < 0
    const _origUpdateHp = rpg.updateHpBars || rpg.renderHpBars;

    // Patch na função que atualiza o texto de HP
    const origHeroHpText = document.getElementById('hero-hp-text');
    const origMonsterHpText = document.getElementById('monster-hp-text');

    // Observer nos elementos de HP para corrigir valores negativos
    function fixNegativeHp(el) {
      if (!el) return;
      const obs = new MutationObserver(() => {
        if (el.textContent && el.textContent.startsWith('-')) {
          el.textContent = el.textContent.replace(/^-\d+/, '0');
        }
      });
      obs.observe(el, { childList: true, characterData: true, subtree: true });
    }

    setTimeout(() => {
      fixNegativeHp(document.getElementById('hero-hp-text'));
      fixNegativeHp(document.getElementById('monster-hp-text'));
    }, 500);

    // Também patcha a função updateHeroHp se existir
    const _origUpdateHeroHp = rpg.updateHeroHp;
    if (_origUpdateHeroHp) {
      rpg.updateHeroHp = function() {
        // Garante que heroHp não é negativo para display
        if (this.heroHp < 0) this.heroHp = 0;
        return _origUpdateHeroHp.apply(this, arguments);
      };
    }
  }

  // ── 3. Watchdog: detecta combate travado e oferece recuperação ─
  function addCombatWatchdog() {
    let lastTurnCount = -1;
    let staleTurns = 0;
    const MAX_STALE = 30; // 30 checks sem mudança = travado

    setInterval(() => {
      if (!rpg.inCombat) {
        staleTurns = 0;
        return;
      }

      const currentTurn = rpg.turnCount || 0;

      // Se o turno não mudou e o autoAttack está OFF, não é problema
      if (!rpg.autoAttack) {
        lastTurnCount = currentTurn;
        staleTurns = 0;
        return;
      }

      if (currentTurn === lastTurnCount) {
        staleTurns++;
      } else {
        staleTurns = 0;
      }

      lastTurnCount = currentTurn;

      // Se travado por mais de MAX_STALE intervalos de 2s = 60s
      if (staleTurns >= MAX_STALE) {
        staleTurns = 0;
        console.warn('[CombatFixModule] Combate parece travado — tentando recuperar');

        // Tenta recuperar
        try {
          // Se monstro não tem HP válido, mata-o
          if (rpg.monster && (rpg.monster.hp <= 0 || isNaN(rpg.monster.hp))) {
            if (rpg.killMonster) rpg.killMonster();
            else {
              rpg.inCombat = false;
              if (typeof navTo === 'function') navTo('menu');
            }
          } else if (!rpg.monster) {
            // Sem monstro mas inCombat = true → força saída
            rpg.inCombat = false;
            if (typeof navTo === 'function') navTo('menu');
          }
        } catch(e) {
          // Último recurso: força saída do combate
          rpg.inCombat = false;
          rpg.autoAttack = false;
          if (rpg.combatFrame) {
            cancelAnimationFrame(rpg.combatFrame);
            rpg.combatFrame = null;
          }
          if (typeof showToast === 'function')
            showToast('⚠️ Combate recuperado automaticamente', 3000);
          if (typeof navTo === 'function') navTo('menu');
        }
      }
    }, 2000);
  }

  // ── 4. Fix no flee para limpar estado corretamente ───────────
  function patchFlee() {
    const _origFlee = rpg.flee;
    if (!_origFlee) return;

    rpg.flee = function() {
      // Para o auto-attack imediatamente
      this.autoAttack = false;
      const autoBtn = document.getElementById('btn-auto-atk');
      if (autoBtn) {
        autoBtn.classList.remove('auto-atk-active');
        autoBtn.style.borderColor = '';
        autoBtn.style.color = '';
      }

      // Para o combat frame
      if (this.combatFrame) {
        cancelAnimationFrame(this.combatFrame);
        this.combatFrame = null;
      }

      try {
        return _origFlee.apply(this, arguments);
      } catch(e) {
        console.error('[CombatFixModule] flee error:', e);
        // Força saída
        this.inCombat = false;
        this.monster  = null;
        if (typeof navTo === 'function') navTo('menu');
      }
    };
  }

  // ── Aguarda rpg pronto ───────────────────────────────────────
  function waitForRpg(cb, attempts) {
    attempts = attempts || 0;
    if (typeof rpg !== 'undefined' && rpg.updateUI) {
      cb();
    } else if (attempts < 30) {
      setTimeout(() => waitForRpg(cb, attempts + 1), 200);
    }
  }

  waitForRpg(init);

})();
