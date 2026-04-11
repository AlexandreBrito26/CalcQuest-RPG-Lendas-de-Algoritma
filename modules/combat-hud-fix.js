// ═══════════════════════════════════════════════════════════════
// MODULE: combat-hud-fix.js
// ─────────────────────────────────────────────────────────────
// 1. Banner "QUEM ATACA PRIMEIRO" maior e mais legível
//    — injectado sobre o HUD da arena no início de cada batalha
// 2. Tunnel-hint (aviso de combate) com font maior e mais claro
// 3. Boss-warning restyled (AVISO: GUARDIÃO DO ATO)
// ═══════════════════════════════════════════════════════════════
;(function CombatHudFix() {
  'use strict';

  function injectCSS() {
    if (document.getElementById('chf-css')) return;
    var s = document.createElement('style');
    s.id = 'chf-css';
    s.textContent = `
      /* ═══ BOSS WARNING — maior e mais impactante ═══ */
      #boss-warning {
        font-size: 11px !important;
        padding: 8px 12px !important;
        letter-spacing: .18em !important;
      }

      /* ═══ TUNNEL HINT — aviso maior e mais visível ═══ */
      #tunnel-hint {
        font-size: 11px !important;
        padding: 10px 14px !important;
        letter-spacing: .1em !important;
        border-radius: 10px !important;
        font-family: 'Orbitron', monospace !important;
      }

      /* ═══ FIRST ATTACKER BANNER ═══ */
      #chf-first-atk-banner {
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 50;
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 14px;
        border-radius: 20px;
        font-family: 'Orbitron', monospace;
        font-size: 10px;
        font-weight: 900;
        letter-spacing: .12em;
        text-transform: uppercase;
        white-space: nowrap;
        pointer-events: none;
        animation: chfBannerIn 0.4s ease forwards, chfBannerOut 0.4s ease 2.4s forwards;
      }
      @keyframes chfBannerIn {
        from { opacity: 0; transform: translateX(-50%) translateY(-8px) scale(0.9); }
        to   { opacity: 1; transform: translateX(-50%) translateY(0)    scale(1);   }
      }
      @keyframes chfBannerOut {
        from { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        to   { opacity: 0; transform: translateX(-50%) translateY(-6px) scale(0.95); }
      }

      #chf-first-atk-banner.hero-first {
        background: rgba(14,165,233,0.18);
        border: 1px solid rgba(14,165,233,0.5);
        color: #7dd3fc;
        box-shadow: 0 0 20px rgba(14,165,233,0.25);
      }
      #chf-first-atk-banner.monster-first {
        background: rgba(239,68,68,0.18);
        border: 1px solid rgba(239,68,68,0.5);
        color: #fca5a5;
        box-shadow: 0 0 20px rgba(239,68,68,0.25);
      }

      /* VS central — um pouco maior */
      #arena-container .flex.flex-col.items-center .text-\\[9px\\] {
        font-size: 11px !important;
        padding: 4px 8px !important;
      }
    `;
    document.head.appendChild(s);
  }

  // ── Banner de quem ataca primeiro ────────────────────────────
  function showFirstAttackerBanner(heroFirst, heroName, monsterName) {
    // Remove banner anterior se existir
    var old = document.getElementById('chf-first-atk-banner');
    if (old) old.remove();

    var arena = document.getElementById('arena-container');
    if (!arena) return;

    var banner = document.createElement('div');
    banner.id = 'chf-first-atk-banner';
    banner.className = heroFirst ? 'hero-first' : 'monster-first';

    if (heroFirst) {
      banner.innerHTML = '⚔ ' + (heroName || 'Herói') + ' ataca primeiro!';
    } else {
      banner.innerHTML = '💀 ' + (monsterName || 'Inimigo') + ' tem surpresa!';
    }

    arena.appendChild(banner);

    // Remove após animação
    setTimeout(function() {
      var el = document.getElementById('chf-first-atk-banner');
      if (el) el.remove();
    }, 2900);
  }

  // ── Patch startBattle para disparar o banner ─────────────────
  function patchStartBattle() {
    if (typeof rpg === 'undefined' || !rpg || typeof rpg.startBattle !== 'function') return;
    if (rpg._chf_patched) return;
    rpg._chf_patched = true;

    var _orig = rpg.startBattle.bind(rpg);
    rpg.startBattle = function(isBoss) {
      _orig.call(this, isBoss);

      // Determinar quem ataca primeiro baseado na velocidade/ATB
      // Se o monstro tem ATB (speed), hero ataca primeiro se não houver surpresa
      var heroSpd    = this.getClass ? (this.getClass().spd || 10) : 10;
      var monsterSpd = this.monster  ? (this.monster.spd || 10) : 10;

      // Chance de surpresa do monstro baseada na dificuldade
      var surpriseChance = 0;
      var diff = this.difficulty || 'normal';
      if (diff === 'hard')      surpriseChance = 0.20;
      if (diff === 'extreme')   surpriseChance = 0.35;
      if (diff === 'nightmare') surpriseChance = 0.45;
      if (diff === 'chaos')     surpriseChance = 0.55;
      if (diff === 'realmgod')  surpriseChance = 0.65;

      var heroFirst = Math.random() > surpriseChance && heroSpd >= monsterSpd * 0.8;

      var heroName    = document.getElementById('battle-hero-name') ? document.getElementById('battle-hero-name').textContent : (this.heroName || 'Herói');
      var monsterName = document.getElementById('monster-name')     ? document.getElementById('monster-name').textContent     : (this.monster && this.monster.name ? this.monster.name : 'Inimigo');

      setTimeout(function() {
        showFirstAttackerBanner(heroFirst, heroName, monsterName);
      }, 150);
    };
  }

  // ── Fix do texto do boss-warning ────────────────────────────
  function fixBossWarning() {
    // Quando o boss-warning aparecer, melhorar o texto
    var bw = document.getElementById('boss-warning');
    if (!bw) return;

    // Observar mudanças na classe (quando a batalha começa)
    var obs = new MutationObserver(function() {
      if (!bw.classList.contains('hidden') && bw.textContent.includes('Guardião')) {
        // Atualizar texto para ser mais informativo
        bw.textContent = bw.textContent; // mantém o texto, só melhora via CSS
      }
    });
    obs.observe(bw, { attributes: true, attributeFilter: ['class'] });
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    injectCSS();
    fixBossWarning();

    var tries = 0;
    var wait = setInterval(function() {
      tries++;
      if (typeof rpg !== 'undefined' && rpg && typeof rpg.startBattle === 'function') {
        clearInterval(wait);
        patchStartBattle();
        console.log('[CombatHudFix] ✅ Banner de primeiro ataque ativo');
      } else if (tries > 150) {
        clearInterval(wait);
      }
    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
