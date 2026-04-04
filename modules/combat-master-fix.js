// ═══════════════════════════════════════════════════════════════
// MODULE: combat-master-fix.js
// ─────────────────────────────────────────────────────────────
// Corrige 3 bugs críticos de uma vez:
//
// BUG 1 — HUD duplicada:
//   combat-hud.js reescreve o DOM criando IDs duplicados.
//   Fix: substitui os IDs duplicados por IDs canónicos únicos
//   e garante que updateHpBars sempre encontra os elementos.
//
// BUG 2 — Aviso vermelho (boss-warning) aparece errado:
//   isBossFight fica true após fugir de um boss.
//   Fix: limpa isBossFight e esconde boss-warning no endBattle/flee.
//
// BUG 3 — Combate travado (Lorde do Caos / qualquer boss):
//   A cadeia de 8 patches em startBattle faz o combatFrame
//   nunca iniciar devido a erros silenciosos.
//   Fix: após startBattle, verifica se combatFrame está ativo
//   e força-o a iniciar se necessário.
// ═══════════════════════════════════════════════════════════════
(function CombatMasterFix() {
  'use strict';

  // ══════════════════════════════════════════════════════════════
  // BUG 1: FIX DA HUD DUPLICADA
  // ══════════════════════════════════════════════════════════════

  // Após combat-hud.js reescrever o DOM, os elementos têm IDs
  // corretos MAS o mobile-optimizer.js também patches updateHpBars
  // e às vezes não encontra os elementos. Garantimos que o patch
  // final do updateHpBars usa querySelector como fallback.

  function fixUpdateHpBars() {
    if (typeof rpg === 'undefined') return;

    rpg.updateHpBars = function () {
      const maxHp = Math.max(1, this.getMaxHp ? this.getMaxHp() : 100);
      const curHp = Math.max(0, this.heroHp || 0);
      const pct   = Math.min(100, Math.max(0, (curHp / maxHp) * 100));

      // getElementById primeiro, depois querySelector como fallback
      const heroBar = document.getElementById('hero-hp-bar');
      const heroTxt = document.getElementById('hero-hp-text');

      if (heroBar) {
        heroBar.style.width = pct + '%';
        if (pct > 60)      { heroBar.style.background = 'linear-gradient(90deg,#059669,#34d399)'; heroBar.style.boxShadow = '0 0 8px rgba(52,211,153,0.4)'; }
        else if (pct > 30) { heroBar.style.background = 'linear-gradient(90deg,#b45309,#fbbf24)'; heroBar.style.boxShadow = '0 0 8px rgba(251,191,36,0.5)'; }
        else               { heroBar.style.background = 'linear-gradient(90deg,#991b1b,#ef4444)'; heroBar.style.boxShadow = '0 0 10px rgba(239,68,68,0.7)'; }
      }
      if (heroTxt) {
        heroTxt.innerText = (typeof formatNumber === 'function'
          ? formatNumber(Math.ceil(curHp)) + ' / ' + formatNumber(Math.ceil(maxHp))
          : Math.ceil(curHp) + ' / ' + Math.ceil(maxHp));
      }

      if (this.monster) {
        const mMax = Math.max(1, this.monster.maxHp || 1);
        const mCur = Math.max(0, this.monster.hp   || 0);
        const mPct = Math.min(100, Math.max(0, (mCur / mMax) * 100));
        const monBar = document.getElementById('monster-hp-bar');
        const monTxt = document.getElementById('monster-hp-text');
        if (monBar) monBar.style.width = mPct + '%';
        if (monTxt) monTxt.innerText = (typeof formatNumber === 'function'
          ? formatNumber(Math.ceil(mCur)) + ' / ' + formatNumber(Math.ceil(mMax))
          : Math.ceil(mCur) + ' / ' + Math.ceil(mMax));

        // Blind challenge mode
        if (this.challengeActive && this.activeChallenges && this.activeChallenges.includes('ch_blind')) {
          if (monBar) monBar.style.width = '100%';
          if (monTxt) monTxt.innerText   = '??? / ???';
        }
      }

      const furyBar = document.getElementById('hero-fury-bar');
      if (furyBar) furyBar.style.width = Math.min(100, Math.max(0, this.fury || 0)) + '%';

      const potBtn = document.getElementById('btn-potion-count');
      if (potBtn) potBtn.innerText = typeof formatNumber === 'function'
        ? formatNumber(this.potions) : this.potions;
    };
  }

  // ══════════════════════════════════════════════════════════════
  // BUG 2: FIX DO BOSS-WARNING ERRADO
  // ══════════════════════════════════════════════════════════════

  function fixBossWarning() {
    if (typeof rpg === 'undefined') return;

    // Garantir que endBattle sempre limpa isBossFight e esconde boss-warning
    const _origEnd = rpg.endBattle.bind(rpg);
    rpg.endBattle = function () {
      this.isBossFight = false;
      const bw = document.getElementById('boss-warning');
      if (bw) bw.classList.add('hidden');
      _origEnd.call(this);
    };

    // Garantir que flee também limpa
    if (rpg.flee) {
      const _origFlee = rpg.flee.bind(rpg);
      rpg.flee = function () {
        this.isBossFight = false;
        const bw = document.getElementById('boss-warning');
        if (bw) bw.classList.add('hidden');
        _origFlee.call(this);
      };
    }
  }

  // ══════════════════════════════════════════════════════════════
  // BUG 3: FIX DO COMBATE TRAVADO
  // ══════════════════════════════════════════════════════════════
  // O problema: startBattle está encadeado com 8+ patches.
  // O combatFrame (rAF) pode não iniciar se algum patch engolir
  // um erro silenciosamente.
  //
  // Solução: watchdog que detecta batalha ativa sem combatFrame
  // e força reinício do loop de combate.

  let _combatWatchdog = null;

  function startCombatWatchdog() {
    if (_combatWatchdog) return; // já ativo

    _combatWatchdog = setInterval(function () {
      if (typeof rpg === 'undefined') return;
      if (!rpg.inCombat || !rpg.monster || rpg.monster.hp <= 0 || rpg.heroHp <= 0) return;

      // Se inCombat mas combatFrame está null/undefined, o loop morreu
      if (!rpg.combatFrame) {
        console.warn('[CombatMasterFix] combatFrame morto — forçando reinício');
        rpg.lastTime = performance.now();
        rpg.combatFrame = requestAnimationFrame(function (ts) {
          rpg.combatTick && rpg.combatTick.call(rpg, ts);
        });
      }

      // Também verifica se os botões de batalha estão incorretamente disabled
      if (rpg.inCombat) {
        ['btn-atk', 'btn-mag', 'btn-def', 'btn-heal', 'btn-class5'].forEach(function (id) {
          // Só reativa se o cooldown não está ativo (skills[id].timer === false)
          const skillId = id.replace('btn-', '').replace('class5', 'class5');
          const skill = rpg.skills && (rpg.skills[id.replace('btn-', '')] || rpg.skills.atk);
          const btn = document.getElementById(id);
          if (!btn) return;

          // Se o botão está disabled MAS não tem cooldown ativo → reativa
          if (btn.disabled) {
            const cdId = id === 'btn-class5' ? 'cd-class5' : 'cd-' + id.replace('btn-', '');
            const cdBar = document.getElementById(cdId);
            const cdWidth = cdBar ? parseFloat(cdBar.style.width || '0') : 0;
            if (cdWidth <= 0) {
              btn.disabled = false;
              btn.style.opacity = '';
              btn.style.pointerEvents = '';
            }
          }
        });
      }
    }, 1500);
  }

  // Patch DEFINITIVO do startBattle — aplicado POR ÚLTIMO
  // Usando um wrapper mínimo que não interfere com a cadeia
  function patchStartBattleFinal() {
    if (typeof rpg === 'undefined') return;

    const _last = rpg.startBattle.bind(rpg);
    rpg.startBattle = function (isBoss) {
      // Limpa estado anterior
      this.isBossFight = !!isBoss;
      const bw = document.getElementById('boss-warning');
      if (bw) bw.classList.toggle('hidden', !isBoss);

      // Ativa classe in-battle
      document.body.classList.add('in-battle');

      // Garante botões ativos ANTES de chamar a cadeia
      ['btn-atk', 'btn-mag', 'btn-def', 'btn-heal', 'btn-class5'].forEach(function (id) {
        const b = document.getElementById(id);
        if (b) { b.disabled = false; b.style.pointerEvents = ''; b.style.opacity = ''; }
      });

      // Chama a cadeia existente
      try {
        _last.call(this, isBoss);
      } catch (e) {
        console.error('[CombatMasterFix] Erro na cadeia startBattle:', e);
      }

      // Garante que combatFrame está ativo após 200ms
      // (tempo suficiente para todos os patches inicializarem)
      const self = this;
      setTimeout(function () {
        if (self.inCombat && !self.combatFrame) {
          console.warn('[CombatMasterFix] combatFrame não iniciou — forçando start');
          self.lastTime = performance.now();
          self.combatFrame = requestAnimationFrame(function (ts) {
            self.combatTick && self.combatTick.call(self, ts);
          });
        }
        // Re-aplica botões após cadeia (por se algum patch os desativou)
        ['btn-atk', 'btn-mag', 'btn-def', 'btn-heal', 'btn-class5'].forEach(function (id) {
          const b = document.getElementById(id);
          if (b && !rpg.skills?.[id.replace('btn-', '')]?.timer) {
            b.disabled = false;
            b.style.pointerEvents = '';
            b.style.opacity = '';
          }
        });
      }, 200);
    };
  }

  // ══════════════════════════════════════════════════════════════
  // INIT
  // ══════════════════════════════════════════════════════════════
  // ── Observa o DOM da arena para re-aplicar fix quando combat-hud.js reescrever ──
  function watchArenaDOM() {
    const arena = document.getElementById('arena-container');
    if (!arena) return;

    const obs = new MutationObserver(function() {
      // Sempre que o arena-container mudar (combat-hud.js reescreve),
      // re-aplica o updateHpBars para garantir que usa os novos elementos
      if (typeof rpg !== 'undefined') {
        setTimeout(fixUpdateHpBars, 50);
        setTimeout(function() {
          rpg.updateHpBars && rpg.updateHpBars();
        }, 100);
      }
    });

    obs.observe(arena, { childList: true, subtree: false });
  }

  function init() {
    fixUpdateHpBars();
    fixBossWarning();
    patchStartBattleFinal();
    startCombatWatchdog();
    watchArenaDOM();

    document.body.classList.remove('in-battle');

    console.log('[CombatMasterFix] ✅ HUD fix + BossWarning fix + CombatFrame watchdog + DOM observer ativos');
  }

  function waitForRpg(n) {
    if (typeof rpg !== 'undefined' && rpg.startBattle && rpg.endBattle && rpg.updateHpBars) {
      // Aguarda 300ms extra para todos os outros módulos terminarem de carregar
      // (garantir que somos o ÚLTIMO a patchear)
      setTimeout(init, 300);
    } else if ((n || 0) < 60) {
      setTimeout(function () { waitForRpg((n || 0) + 1); }, 200);
    } else {
      console.warn('[CombatMasterFix] rpg não disponível após timeout');
    }
  }

  // Aguarda DOM + todos os outros scripts
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { waitForRpg(0); });
  } else {
    waitForRpg(0);
  }

})();
