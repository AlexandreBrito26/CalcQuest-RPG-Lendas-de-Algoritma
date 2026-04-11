// ═══════════════════════════════════════════════════════════════
// MODULE: prestige-multibuy.js (V7 - Safe Farm Final)
// ─────────────────────────────────────────────────────────────
// - Removido o Watchdog que forçava botões ativos.
// - Lotes de ascensão end-game (x100 a x10000).
// - Patch seguro para Farmar o Boss Final.
// ═══════════════════════════════════════════════════════════════
(function PrestigeMultiBuyV7() {
  'use strict';

  function initPatches() {
    if (typeof rpg === 'undefined') return;

    // 🛡️ CORREÇÃO DO "JOGO ZERADO" (MÉTODO SEGURO)
    if (rpg.startBattle && rpg.updateUI) {
      const _origStartBattle = rpg.startBattle.bind(rpg);
      rpg.startBattle = function(isBoss) {
         try {
             let maxB = (this.actBosses && this.actBosses.length) ? this.actBosses.length : 16;
             let restored = false;
             
             if (isBoss && this.bossKills >= maxB) {
                 this.bossKills = maxB - 1;
                 restored = true;
             }
             
             _origStartBattle(isBoss);
             
             if (restored) {
                 this.bossKills = maxB; 
             }
         } catch(e) {
             _origStartBattle(isBoss); 
         }
      };

      const _origUpdateUI = rpg.updateUI.bind(rpg);
      rpg.updateUI = function () {
        _origUpdateUI.apply(this, arguments);
        try {
            let maxB = (this.actBosses && this.actBosses.length) ? this.actBosses.length : 16;
            const btnBoss = document.getElementById("btn-daily-boss");
            if (btnBoss && this.bossKills >= maxB) {
              btnBoss.classList.remove("opacity-50", "cursor-not-allowed", "bg-zinc-800", "border-zinc-700");
              btnBoss.classList.add("bg-gradient-to-r", "from-red-950", "to-red-900", "border-red-700");
              btnBoss.innerHTML = `<i data-lucide="infinity" class="w-4 h-4 text-purple-500 flex-shrink-0"></i> <span class="truncate font-black text-purple-400">FARM FINAL</span>`;
              btnBoss.onclick = () => rpg.openPreBattle(true);
            }
        } catch(e){}
      };
    }

    // 🌌 INJEÇÃO DOS BOTÕES DE PRESTÍGIO END-GAME
    if (rpg.renderPrestige) {
      const _origRender = rpg.renderPrestige.bind(rpg);

      rpg.renderPrestige = function () {
        _origRender();
        setTimeout(() => {
          const body = document.getElementById('prestige-body');
          if (!body || document.getElementById('multi-prestige-wrapper')) return;

          const wrapper = document.createElement('div');
          wrapper.id = 'multi-prestige-wrapper';
          wrapper.style.cssText = 'background:rgba(0,0,0,0.6); border:1px solid rgba(139,92,246,0.5); border-radius:12px; padding:12px; margin-bottom:10px; box-shadow: inset 0 0 20px rgba(139,92,246,0.2);';

          const titleLabel = document.createElement('div');
          titleLabel.style.cssText = 'text-align: center; font-family: Orbitron; font-size: 9px; font-weight: 900; color: #a78bfa; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 0 8px #a78bfa;';
          titleLabel.innerText = "⚡ ASCENSÃO DIVINA (Lotes End-Game)";
          wrapper.appendChild(titleLabel);

          const container = document.createElement('div');
          container.style.cssText = 'display: flex; gap: 6px; justify-content: space-between;';

          const multipliers = [100, 500, 1000, 10000];

          multipliers.forEach(amt => {
            const btn = document.createElement('button');
            btn.className = 'btn-3d rounded-lg';
            btn.style.cssText = 'flex: 1; padding: 8px 0; background: linear-gradient(135deg, #2e1065, #4c1d95); border: 1px solid #7c3aed; box-shadow: 0 4px 0 #2e1065; cursor:pointer; color:white; font-size:11px; font-weight:900; font-family: Orbitron; transition: all 0.2s;';
            btn.innerText = `x${amt}`;

            btn.onclick = function () {
              const requiredLvl = 50 * amt;
              if (rpg.level >= requiredLvl) {
                if (!confirm(`🔥 ASCENDER ${amt} VEZES custa Nível ${requiredLvl}. Avançar para o próximo patamar de poder?`)) return;

                let next = (rpg.prestigeLevel || 0) + amt;
                rpg.prestigeLevel = next;
                rpg.prestigeMult  = 1 + (next * 0.15);
                rpg.level = 1; rpg.xp = 0; rpg.gold = 0; rpg.kills = 0;
                rpg.potions = 10 + (next * 5);
                rpg.seenMilestones = ['intro']; rpg.introSeen = true;

                rpg.save(); rpg.updateUI(); rpg.renderPrestige();
                if (typeof showToast === 'function') showToast(`🌌 PODER DIVINO: +${amt} Prestígios Alcançados!`, 5000);
              } else {
                if (typeof showToast === 'function') showToast(`❌ Nível Insuficiente! Exige Nível ${requiredLvl}.`, 3500);
              }
            };
            container.appendChild(btn);
          });
          wrapper.appendChild(container);

          const lastBtn = body.querySelector('button[onclick="window._ppDoPrestige()"]');
          if (lastBtn) body.insertBefore(wrapper, lastBtn);
          else body.appendChild(wrapper);
        }, 50);
      };
    }
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', () => setTimeout(initPatches, 500)); } 
  else { setTimeout(initPatches, 500); }
})();