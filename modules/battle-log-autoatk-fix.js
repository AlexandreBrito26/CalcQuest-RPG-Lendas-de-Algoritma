// ═══════════════════════════════════════════════════════════════
// MODULE: battle-log-autoatk-fix.js  —  v1.0
// ─────────────────────────────────────────────────────────────
// CORRIGE 2 BUGS SIMULTÂNEOS:
//
// BUG 1 — Battle log vazio (área preta):
//   Os módulos vip-system.js, vip-system-v9.js e profile-vip-fix.js
//   definem min-height:55px !important no #battle-log.
//   Quando battleLog=[] no início do combate, renderBattleLog()
//   escreve innerHTML="" mas o container continua visível como
//   uma caixa preta (height = 55px com fundo bg-black/40).
//   Fix A: CSS que anula min-height quando vazio (:empty).
//   Fix B: patch em renderBattleLog() que zera o padding/border
//          inline quando não há entradas.
//   Fix C: fila de pendingLogs para mensagens chamadas antes de
//          inCombat=true (evita addLog descartar o 1.º log).
//
// BUG 2 — Auto-attack quebrado ao entrar em batalha:
//   A cadeia de patches em startBattle (combat-fix → combat-hud-fix
//   → combat-master-fix) não preserva rpg.autoAttack — o game.js
//   original não o reseta, mas combat-fix.js reseta no flee() e
//   nenhum módulo salva/restaura o estado ao re-entrar.
//   Fix: wrapper final em startBattle que salva autoAttack antes
//        da cadeia e o restaura 250ms depois (depois do setTimeout
//        de 200ms do combat-master-fix).
// ═══════════════════════════════════════════════════════════════
(function BattleLogAutoAtkFix() {
  'use strict';

  // ── FIX 1A: CSS — anula min-height quando #battle-log está vazio ──
  function fixBattleLogCSS() {
    if (document.getElementById('blaaf-css')) return;
    const s = document.createElement('style');
    s.id = 'blaaf-css';
    s.textContent = `
      /*
       * Quando o battle-log não tem filhos (<p> de log),
       * colapsa completamente — anula o min-height:55px !important
       * dos módulos VIP que cria a caixa preta vazia.
       */
      #battle-log:empty {
        min-height: 0 !important;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
        border-color: transparent !important;
        background: transparent !important;
        margin-bottom: 0 !important;
      }
      /* Quando tem conteúdo: deixa o conteúdo definir a altura */
      #battle-log:not(:empty) {
        min-height: 0 !important;
      }
    `;
    document.head.appendChild(s);
  }

  // ── FIX 1B: Patch renderBattleLog — controlo inline de visibilidade ──
  function fixRenderBattleLog() {
    if (!rpg.renderBattleLog) return;
    if (rpg._blaaf_renderPatched) return;
    rpg._blaaf_renderPatched = true;

    const _orig = rpg.renderBattleLog.bind(rpg);
    rpg.renderBattleLog = function () {
      _orig.call(this);
      const el = document.getElementById('battle-log');
      if (!el) return;
      if (!this.battleLog || this.battleLog.length === 0) {
        // Colapsa inline — mais forte que qualquer !important externo
        el.style.setProperty('min-height', '0', 'important');
        el.style.setProperty('padding',    '0', 'important');
        el.style.setProperty('border-color', 'transparent', 'important');
        el.style.setProperty('background',   'transparent', 'important');
        el.style.setProperty('margin-bottom','0',           'important');
      } else {
        // Limpa overrides inline — volta ao CSS padrão do index.html
        el.style.removeProperty('min-height');
        el.style.removeProperty('padding');
        el.style.removeProperty('border-color');
        el.style.removeProperty('background');
        el.style.removeProperty('margin-bottom');
      }
    };
  }

  // ── FIX 1C: Fila de pendingLogs ─────────────────────────────
  // addLog descarta mensagens quando !inCombat.
  // Se algum módulo chamar addLog logo antes de inCombat=true
  // ser definido (race condition), a mensagem é perdida.
  // Guardamos numa fila e drenamos no próximo addLog válido.
  function fixAddLogQueue() {
    if (!rpg.addLog) return;
    if (rpg._blaaf_addLogPatched) return;
    rpg._blaaf_addLogPatched = true;

    const _origAdd = rpg.addLog.bind(rpg);
    rpg._pendingLogs = rpg._pendingLogs || [];

    rpg.addLog = function (msg, color) {
      if (!this.inCombat) {
        // Guarda em vez de descartar — útil para msgs do spawnMonster
        this._pendingLogs = this._pendingLogs || [];
        if (this._pendingLogs.length < 8) {
          this._pendingLogs.push({ msg, color: color || 'text-zinc-400' });
        }
        return;
      }
      // Drena fila de pendentes ANTES de adicionar a nova mensagem
      if (this._pendingLogs && this._pendingLogs.length > 0) {
        const queue = this._pendingLogs.splice(0);
        queue.forEach(entry => {
          this.battleLog.unshift(entry);
        });
        if (this.battleLog.length > 8) {
          this.battleLog = this.battleLog.slice(0, 8);
        }
      }
      _origAdd.call(this, msg, color);
    };

    // Limpa fila ao terminar combate
    const _origEnd = rpg.endBattle ? rpg.endBattle.bind(rpg) : null;
    if (_origEnd && !rpg._blaaf_endPatched) {
      rpg._blaaf_endPatched = true;
      rpg.endBattle = function () {
        this._pendingLogs = [];
        // Limpa o log visual ao sair do combate
        const el = document.getElementById('battle-log');
        if (el) {
          el.innerHTML = '';
          el.style.setProperty('min-height',   '0',           'important');
          el.style.setProperty('padding',       '0',           'important');
          el.style.setProperty('border-color', 'transparent', 'important');
          el.style.setProperty('background',   'transparent', 'important');
        }
        _origEnd.call(this);
      };
    }
  }

  // ── FIX 2: Preserva autoAttack através da cadeia startBattle ──
  function fixAutoAttackPreservation() {
    if (!rpg.startBattle) return;
    if (rpg._blaaf_startPatched) return;
    rpg._blaaf_startPatched = true;

    const _orig = rpg.startBattle.bind(rpg);

    rpg.startBattle = function (isBoss) {
      // Salva estado ANTES da cadeia inteira
      const wasAutoAtk = !!this.autoAttack;

      _orig.call(this, isBoss);

      // Restaura 250ms depois — o combat-master-fix usa setTimeout(200ms),
      // então 250ms garante que somos os últimos a escrever.
      if (wasAutoAtk) {
        const self = this;
        setTimeout(function () {
          if (!self.inCombat) return; // saiu do combate entretanto
          self.autoAttack = true;
          const btn = document.getElementById('btn-auto-atk');
          if (btn) {
            btn.classList.add('auto-atk-active');
            btn.style.borderColor = '#00e5ff';
            btn.style.color       = '#00e5ff';
          }
          console.log('[BattleLogAutoAtkFix] autoAttack restaurado ✓');
        }, 250);
      }
    };
  }

  // ── INIT ─────────────────────────────────────────────────────
  function init() {
    fixBattleLogCSS();
    fixRenderBattleLog();
    fixAddLogQueue();
    fixAutoAttackPreservation();

    // Garante que o battle-log começa colapsado (estado limpo)
    const el = document.getElementById('battle-log');
    if (el && (!rpg.battleLog || rpg.battleLog.length === 0)) {
      el.style.setProperty('min-height',   '0',           'important');
      el.style.setProperty('padding',       '0',           'important');
      el.style.setProperty('border-color', 'transparent', 'important');
      el.style.setProperty('background',   'transparent', 'important');
    }

    console.log('[BattleLogAutoAtkFix] ✅ Battle log fix + autoAttack preserve ativos');
  }

  // Aguarda rpg estar pronto E todos os outros módulos terem patchado
  // (400ms para ser o último — combat-master-fix usa 300ms de delay)
  function waitForRpg(n) {
    if (
      typeof rpg !== 'undefined' &&
      rpg.addLog &&
      rpg.startBattle &&
      rpg.endBattle &&
      rpg.renderBattleLog
    ) {
      setTimeout(init, 400);
    } else if ((n || 0) < 60) {
      setTimeout(function () { waitForRpg((n || 0) + 1); }, 200);
    } else {
      console.warn('[BattleLogAutoAtkFix] Timeout aguardando rpg');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { waitForRpg(0); });
  } else {
    waitForRpg(0);
  }

})();
