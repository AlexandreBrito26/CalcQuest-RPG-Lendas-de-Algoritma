// ═══════════════════════════════════════════════════════════════════════
// MODULE: core-bugfixes.js  — CORREÇÕES CRÍTICAS + DAILY MISSIONS ++
// ──────────────────────────────────────────────────────────────────────
// CORRIGE:
//   1. tickDailySpecial — progresso parcial agora persiste (save throttled)
//   2. VIP Gold/XP — aplicado DENTRO do killMonster antes do spawnLoot
//   3. VIP XP — aplicado antes de adicionar ao rpg.xp
//   4. Missões Diárias — countdown regressivo até reset (em vez de "meia-noite")
//   5. Missões Diárias — barra de progresso animada + tooltip de recompensa
//   6. Daily modal — header com timer live + streak de dias consecutivos
// ═══════════════════════════════════════════════════════════════════════
;(function CoreBugfixes() {
  'use strict';

  function waitRpg(cb, n) {
    n = n || 0;
    if (typeof rpg !== 'undefined' && rpg &&
        typeof rpg.save === 'function' &&
        typeof rpg.killMonster === 'function' &&
        typeof rpg.tickDailySpecial === 'function') { cb(); return; }
    if (n < 400) setTimeout(function() { waitRpg(cb, n+1); }, 100);
  }

  function getVipBenefits() {
    var id = localStorage.getItem('rpg_vip_tier_v9');
    if (!id) return null;
    var map = {
      vip:       { gold: 25,    xp: 25    },
      ultra_vip: { gold: 60,    xp: 60    },
      elite:     { gold: 120,   xp: 120   },
      legend:    { gold: 300,   xp: 300   },
      deus:      { gold: 999,   xp: 999   },
      titan:     { gold: 5000,  xp: 5000  },
      entity:    { gold: 20000, xp: 20000 },
      omni:      { gold: 99999, xp: 99999 },
      source:    { gold: 999999,xp: 999999},
    };
    return map[id] || null;
  }

  // ── 1. FIX tickDailySpecial — save throttled (máx 1x/s) ──────────
  function fixDailySpecialSave() {
    var saveTimer = null;
    var _orig = rpg.tickDailySpecial.bind(rpg);
    rpg.tickDailySpecial = function(type) {
      _orig.call(this, type);
      // Persiste progresso parcial com throttle para não travar o combate
      if (!saveTimer) {
        saveTimer = setTimeout(function() {
          saveTimer = null;
          try {
            localStorage.setItem('rpg_daily_missions', JSON.stringify(rpg.dailyMissions));
          } catch(e) {}
        }, 1000);
      }
    };
    console.log('[CoreFix] tickDailySpecial save ✓');
  }

  // ── 2. FIX killMonster — VIP Gold/XP real ─────────────────────────
  function fixKillMonsterVip() {
    var _orig = rpg.killMonster.bind(rpg);
    rpg.killMonster = function() {
      // Injeta multiplicadores VIP antes do original rodar
      var vip = getVipBenefits();
      rpg._vipGoldMult = vip ? (1 + vip.gold / 100) : 1;
      rpg._vipXpMult   = vip ? (1 + vip.xp   / 100) : 1;

      // Patch temporário de spawnLoot para aplicar gold VIP
      var _spawnOrig = rpg.spawnLoot.bind(rpg);
      var applied = false;
      rpg.spawnLoot = function(amount) {
        if (!applied) {
          applied = true;
          amount = Math.floor(amount * (rpg._vipGoldMult || 1));
          rpg.spawnLoot = _spawnOrig; // restaura imediatamente
        }
        return _spawnOrig.call(this, amount);
      };

      // Patch temporário de xp gain
      var _origXp = this.xp;
      var result = _orig.apply(this, arguments);

      // Aplica multiplicador XP VIP na diferença de XP ganha
      var xpGained = this.xp - _origXp;
      if (xpGained > 0 && rpg._vipXpMult > 1) {
        var extraXp = Math.floor(xpGained * (rpg._vipXpMult - 1));
        this.xp += extraXp;
        // Re-checa level up com o XP extra
        var leveledUp = false;
        while (this.xp >= this.xpRequired()) {
          this.xp -= this.xpRequired();
          this.level++;
          if (this.level > this.highestLevel) this.highestLevel = this.level;
          leveledUp = true;
          this.potions++;
        }
        if (leveledUp) {
          var toast = document.getElementById('level-up-toast');
          var tlt = document.getElementById('toast-level-text');
          if (toast && tlt) {
            tlt.innerText = 'Lvl ' + this.level;
            toast.classList.remove('hidden');
            setTimeout(function() { toast.classList.remove('opacity-0', '-translate-y-4'); }, 50);
            setTimeout(function() {
              toast.classList.add('opacity-0', '-translate-y-4');
              setTimeout(function() { toast.classList.add('hidden'); }, 500);
            }, 3000);
          }
        }
      }

      // Restaura spawnLoot se o patch acidental não foi chamado
      if (rpg.spawnLoot !== _spawnOrig) rpg.spawnLoot = _spawnOrig;

      return result;
    };
    console.log('[CoreFix] killMonster VIP gold/xp ✓');
  }

  // ── 3. COUNTDOWN TIMER nas missões diárias ─────────────────────────
  function formatCountdown() {
    var now = new Date();
    var midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    var diff = Math.floor((midnight - now) / 1000);
    var h = Math.floor(diff / 3600);
    var m = Math.floor((diff % 3600) / 60);
    var s = diff % 60;
    return (h > 0 ? h + 'h ' : '') + m + 'm ' + s + 's';
  }

  function injectDailyHeader() {
    var modal = document.getElementById('daily-modal');
    if (!modal) return;

    // Injeta countdown no header se não existir
    if (document.getElementById('daily-countdown')) return;

    var header = modal.querySelector('.flex.justify-between');
    if (!header) return;

    var countdownDiv = document.createElement('div');
    countdownDiv.style.cssText = 'text-align:center;padding:4px 0 10px;border-bottom:1px solid rgba(255,255,255,0.06);margin-bottom:8px;';
    countdownDiv.innerHTML =
      '<span style="font-size:9px;color:#52525b;font-family:Orbitron,sans-serif;letter-spacing:0.1em;text-transform:uppercase;">Reset em </span>' +
      '<span id="daily-countdown" style="font-size:11px;font-weight:700;color:#a78bfa;font-family:Orbitron,sans-serif;"></span>' +
      '<span id="daily-streak" style="margin-left:12px;font-size:9px;color:#fbbf24;font-weight:700;display:none;"></span>';

    var list = document.getElementById('daily-list');
    if (list && list.parentNode) {
      list.parentNode.insertBefore(countdownDiv, list);
    }
  }

  function startDailyCountdown() {
    function tick() {
      var el = document.getElementById('daily-countdown');
      if (el) el.textContent = formatCountdown();
    }
    tick();
    setInterval(tick, 1000);
  }

  // ── 4. RENDERIZAÇÃO MELHORADA das missões diárias ──────────────────
  function patchRenderDailyMissions() {
    var _orig = rpg.renderDailyMissions.bind(rpg);
    rpg.renderDailyMissions = function() {
      var list = document.getElementById('daily-list');
      if (!list) return;

      this._genDailyMissions();
      list.innerHTML = '';

      // Injeta header com countdown se não existir
      injectDailyHeader();

      var today = new Date().toISOString().slice(0, 10);
      var allDone = (this.dailyMissions || []).every(function(m) {
        return (rpg.dailyCompleted || []).includes(m.id);
      });

      if (allDone) {
        list.innerHTML =
          '<div style="text-align:center;padding:24px 0;">' +
          '<div style="font-size:28px;margin-bottom:8px;">🏆</div>' +
          '<div style="font-size:13px;font-weight:700;color:#4ade80;margin-bottom:4px;">Todas as missões concluídas!</div>' +
          '<div style="font-size:10px;color:#52525b;">Volta amanhã para novas missões · Conta regressiva activa</div>' +
          '</div>';
        return;
      }

      (this.dailyMissions || []).forEach(function(m) {
        var claimed = (rpg.dailyCompleted || []).includes(m.id);
        var pct = Math.min(100, Math.floor((m.progress / m.qty) * 100));
        var canClaim = m.done && !claimed;

        var stateColor = claimed ? '#27272a' : (canClaim ? '#166534' : '#18181b');
        var borderColor = claimed ? '#3f3f46' : (canClaim ? '#16a34a' : '#27272a');
        var textColor = claimed ? '#52525b' : (canClaim ? '#4ade80' : '#e4e4e7');

        var div = document.createElement('div');
        div.style.cssText = [
          'background:' + stateColor,
          'border:1px solid ' + borderColor,
          'border-radius:10px',
          'padding:10px 12px',
          'margin-bottom:6px',
          'transition:all 0.2s',
          'position:relative',
          'overflow:hidden',
        ].join(';');

        // Brilho verde se pronto para reclamar
        if (canClaim) {
          div.style.boxShadow = '0 0 12px rgba(74,222,128,0.2), inset 0 0 20px rgba(74,222,128,0.05)';
        }

        var rewardText = '+' + (m.gold >= 1e6 ? (m.gold/1e6).toFixed(1)+'M' : m.gold >= 1e3 ? (m.gold/1e3).toFixed(0)+'K' : m.gold) + ' 💰';
        if (m.pot > 0) rewardText += ' +' + m.pot + ' 🧪';

        div.innerHTML =
          // Linha principal
          '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">' +
            '<div style="display:flex;align-items:center;gap:8px;flex:1;min-width:0;">' +
              '<i data-lucide="' + (m.icon || 'star') + '" style="width:14px;height:14px;flex-shrink:0;color:' + (canClaim ? '#4ade80' : (claimed ? '#3f3f46' : '#a1a1aa')) + ';"></i>' +
              '<div style="min-width:0;">' +
                '<div style="font-size:11px;font-weight:700;color:' + textColor + ';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' +
                  (claimed ? '✅ ' : '') + m.name[rpg.lang || 'pt'] +
                '</div>' +
                '<div style="font-size:9px;color:#71717a;margin-top:1px;">' + rewardText + '</div>' +
              '</div>' +
            '</div>' +
            (canClaim
              ? '<button onclick="rpg.claimDailyMission(\'' + m.id + '\')" style="background:#15803d;border:1px solid #16a34a;color:#fff;font-size:9px;font-weight:700;padding:4px 10px;border-radius:8px;cursor:pointer;white-space:nowrap;font-family:Orbitron,sans-serif;letter-spacing:0.06em;transition:all 0.15s;" onmouseover="this.style.background=\'#166534\'" onmouseout="this.style.background=\'#15803d\'">RECLAMAR</button>'
              : (claimed
                ? '<span style="font-size:9px;color:#3f3f46;font-weight:700;">COMPLETO</span>'
                : '<span style="font-size:10px;font-weight:700;color:#71717a;">' + m.progress + '/' + m.qty + '</span>'
              )
            ) +
          '</div>' +
          // Barra de progresso
          (!claimed
            ? '<div style="margin-top:8px;background:#09090b;border-radius:4px;height:4px;overflow:hidden;">' +
                '<div style="width:' + pct + '%;height:100%;background:' + (canClaim ? '#4ade80' : '#7c3aed') + ';border-radius:4px;transition:width 0.4s ease;' + (canClaim ? 'box-shadow:0 0 6px rgba(74,222,128,0.6);' : '') + '"></div>' +
              '</div>'
            : ''
          );

        list.appendChild(div);
      });

      // Re-inicializa ícones lucide nos novos elementos
      if (typeof lucide !== 'undefined') lucide.createIcons();
    };
    console.log('[CoreFix] renderDailyMissions melhorado ✓');
  }

  // ── 5. HOOK openDailyModal para injetar header e countdown ─────────
  function hookDailyModal() {
    var origOpen = window.openDailyModal;
    window.openDailyModal = function() {
      origOpen && origOpen();
      setTimeout(function() {
        injectDailyHeader();
        if (rpg && rpg.renderDailyMissions) rpg.renderDailyMissions();
      }, 80);
    };

    // Também via closeModal hook para cleanup
    var _origClose = window.closeModal;
    window.closeModal = function(id) {
      _origClose && _origClose(id);
    };
  }

  // ── INIT ───────────────────────────────────────────────────────────
  waitRpg(function() {
    fixDailySpecialSave();
    fixKillMonsterVip();
    patchRenderDailyMissions();
    hookDailyModal();
    startDailyCountdown();
    console.log('[CoreBugfixes] Todos os fixes aplicados ✓');
  });

})();
