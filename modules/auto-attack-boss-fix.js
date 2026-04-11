// ═══════════════════════════════════════════════════════════════
// MODULE: auto-attack-boss-fix.js (V3 - Escudo Anti-Farm Fantasma)
// ─────────────────────────────────────────────────────────────
// Resolve o bug de "farmar o monstro morto infinitamente".
// Remove o spam de 'killMonster' e bloqueia a ação na raiz.
// ═══════════════════════════════════════════════════════════════
(function AutoAttackBossFixV3() {
  'use strict';

  function applyAntiGhostFarm() {
    if (typeof rpg === 'undefined') return;

    // 1. Escudo de Combate: Proíbe estritamente atacar se não há monstro vivo
    const _origAtk = rpg.attack;
    if (_origAtk) {
      rpg.attack = function() {
        if (!this.inCombat || !this.monster || this.monster.hp <= 0) return; 
        return _origAtk.apply(this, arguments);
      };
    }

    const _origMag = rpg.magic;
    if (_origMag) {
      rpg.magic = function() {
        if (!this.inCombat || !this.monster || this.monster.hp <= 0) return;
        return _origMag.apply(this, arguments);
      };
    }

    // 2. Loop de Auto-Attack inteligente (Só clica se for seguro)
    setInterval(() => {
      // Se não estiver em combate, ou o auto attack estiver desligado, ou o monstro estiver morto -> NÃO FAZ NADA
      if (!rpg.inCombat || !rpg.autoAttack || !rpg.monster || rpg.monster.hp <= 0) return;

      const atkBtn = document.getElementById('btn-atk');
      const magBtn = document.getElementById('btn-mag');

      // Só clica se o botão estiver visível e ativado
      if (atkBtn && !atkBtn.disabled) {
        atkBtn.click();
      } else if (magBtn && !magBtn.disabled) {
        magBtn.click();
      }
    }, 300);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(applyAntiGhostFarm, 500));
  } else {
    setTimeout(applyAntiGhostFarm, 500);
  }
})();