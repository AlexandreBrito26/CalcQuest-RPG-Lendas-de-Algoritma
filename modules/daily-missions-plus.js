// ═══════════════════════════════════════════════════════════════════════
// MODULE: daily-missions-plus.js  — POOL EXPANDIDO + CONTEÚDO NOVO
// ──────────────────────────────────────────────────────────────────────
// ADICIONA:
//   1. Pool de 25 missões (era 10) — variedade muito maior
//   2. Missões escaláveis com nível do jogador
//   3. Missões de dificuldade (matar em Difícil+)
//   4. Missões de sobrevivência (sobreviver com HP baixo)
//   5. Sistema de STREAK — dias consecutivos com bónus extra
//   6. Recompensas escaladas pelo nível do herói
//   7. Missão DIÁRIA ESPECIAL com mega-recompensa (diferente a cada dia)
// ═══════════════════════════════════════════════════════════════════════
;(function DailyMissionsPlus() {
  'use strict';

  function waitRpg(cb, n) {
    n = n || 0;
    if (typeof rpg !== 'undefined' && rpg && typeof rpg.save === 'function' &&
        Array.isArray(rpg._missionPool)) { cb(); return; }
    if (n < 400) setTimeout(function() { waitRpg(cb, n+1); }, 100);
  }

  // ── UTILS ──────────────────────────────────────────────────────────
  function goldScale(base) {
    var lvl = (rpg && rpg.level) || 1;
    // Escala com raiz do level para não ficar absurdo
    return Math.floor(base * Math.max(1, Math.pow(lvl, 0.5)));
  }

  // ── POOL EXPANDIDO ─────────────────────────────────────────────────
  // Formato compatível com o sistema original:
  // { id, type, qty, icon, gold, pot, name:{pt,en} }
  var EXTRA_MISSIONS = [
    // Abate ampliado
    { id:'m_kill50',  type:'kill',  qty:50,  icon:'swords',       gold:15000,  pot:8,  name:{pt:'Abater 50 inimigos',      en:'Slay 50 enemies'          }},
    { id:'m_kill100', type:'kill',  qty:100, icon:'swords',       gold:40000,  pot:15, name:{pt:'Abater 100 inimigos',     en:'Slay 100 enemies'         }},
    // Bosses ampliado
    { id:'m_boss3',   type:'boss',  qty:3,   icon:'skull',        gold:60000,  pot:20, name:{pt:'Derrotar 3 Guardiões',    en:'Defeat 3 Guardians'       }},
    // Críticos
    { id:'m_crit25',  type:'crit',  qty:25,  icon:'zap',          gold:8000,   pot:6,  name:{pt:'25 golpes críticos',      en:'25 critical hits'         }},
    { id:'m_crit50',  type:'crit',  qty:50,  icon:'zap',          gold:18000,  pot:10, name:{pt:'50 golpes críticos',      en:'50 critical hits'         }},
    // Parry
    { id:'m_parry10', type:'parry', qty:10,  icon:'shield',       gold:9000,   pot:8,  name:{pt:'Executar 10 Parrys',      en:'Execute 10 Parrys'        }},
    { id:'m_parry20', type:'parry', qty:20,  icon:'shield',       gold:20000,  pot:15, name:{pt:'Executar 20 Parrys',      en:'Execute 20 Parrys'        }},
    // Combo
    { id:'m_combo30', type:'combo', qty:30,  icon:'flame',        gold:9000,   pot:8,  name:{pt:'Atingir combo x30',       en:'Reach combo x30'          }},
    { id:'m_combo50', type:'combo', qty:50,  icon:'flame',        gold:20000,  pot:12, name:{pt:'Atingir combo x50',       en:'Reach combo x50'          }},
    // Fúria/Suprema
    { id:'m_fury5',   type:'fury',  qty:5,   icon:'zap',          gold:8000,   pot:6,  name:{pt:'Usar Supremo 5 vezes',    en:'Use Ultimate 5 times'     }},
    { id:'m_fury10',  type:'fury',  qty:10,  icon:'zap',          gold:18000,  pot:10, name:{pt:'Usar Supremo 10 vezes',   en:'Use Ultimate 10 times'    }},
    // Cura/Poções
    { id:'m_heal10',  type:'heal',  qty:10,  icon:'flask-round',  gold:4000,   pot:15, name:{pt:'Usar 10 poções',          en:'Use 10 potions'           }},
    { id:'m_heal20',  type:'heal',  qty:20,  icon:'flask-round',  gold:8000,   pot:25, name:{pt:'Usar 20 poções',          en:'Use 20 potions'           }},
    // Sobrevivência (tipo especial — detectado via hook)
    { id:'m_lowHP',   type:'lowHP', qty:3,   icon:'heart-pulse',  gold:25000,  pot:10, name:{pt:'Sobreviver 3x com HP<10%',en:'Survive 3x with HP<10%'   }},
    // Combo sem morrer
    { id:'m_noheal',  type:'noheal',qty:30,  icon:'skull',        gold:15000,  pot:0,  name:{pt:'30 abates sem curar',     en:'30 kills without healing' }},
  ];

  // ── MISSÃO ESPECIAL DO DIA (1 por dia, mega-recompensa) ───────────
  var SPECIAL_POOL = [
    { id:'sp_glory',   type:'boss',  qty:1,   icon:'crown',        gold:200000, pot:30, name:{pt:'🌟 Derrotar o Guardião atual', en:'🌟 Defeat current Guardian'  }},
    { id:'sp_rampage', type:'kill',  qty:200, icon:'swords',       gold:150000, pot:25, name:{pt:'🌟 200 abates épicos',          en:'🌟 200 epic kills'            }},
    { id:'sp_combo',   type:'combo', qty:100, icon:'flame',        gold:120000, pot:20, name:{pt:'🌟 Combo lendário x100',         en:'🌟 Legendary combo x100'      }},
    { id:'sp_parry',   type:'parry', qty:30,  icon:'shield',       gold:130000, pot:20, name:{pt:'🌟 30 Parrys perfeitos',         en:'🌟 30 perfect Parrys'         }},
    { id:'sp_fury',    type:'fury',  qty:20,  icon:'zap',          gold:140000, pot:25, name:{pt:'🌟 Libertar a Suprema 20x',      en:'🌟 Release Ultimate 20x'      }},
    { id:'sp_crit',    type:'crit',  qty:100, icon:'zap',          gold:110000, pot:20, name:{pt:'🌟 100 golpes críticos',          en:'🌟 100 critical hits'         }},
  ];

  // ── STREAK SYSTEM ──────────────────────────────────────────────────
  var STREAK_KEY  = 'rpg_daily_streak';
  var STREAK_DATE = 'rpg_daily_streak_date';

  function getStreak() { return parseInt(localStorage.getItem(STREAK_KEY) || '0'); }

  function updateStreak() {
    var today    = new Date().toISOString().slice(0,10);
    var lastDate = localStorage.getItem(STREAK_DATE) || '';
    var yesterday = new Date(Date.now() - 86400000).toISOString().slice(0,10);

    if (lastDate === today) return getStreak(); // já atualizado hoje

    var cur = getStreak();
    if (lastDate === yesterday) {
      cur++; // dia consecutivo
    } else if (lastDate !== today) {
      cur = 1; // quebrou a streak
    }

    localStorage.setItem(STREAK_KEY,  String(cur));
    localStorage.setItem(STREAK_DATE, today);
    return cur;
  }

  function getStreakBonus() {
    var s = getStreak();
    if (s >= 30) return { mult: 5.0,  label: '🔥×5 (30d)',  color: '#fbbf24' };
    if (s >= 14) return { mult: 3.0,  label: '🔥×3 (14d)',  color: '#f97316' };
    if (s >= 7)  return { mult: 2.0,  label: '🔥×2 (7d)',   color: '#ef4444' };
    if (s >= 3)  return { mult: 1.5,  label: '🔥×1.5 (3d)', color: '#fb923c' };
    return { mult: 1.0, label: '', color: '' };
  }

  // ── EXPAND POOL ────────────────────────────────────────────────────
  function expandPool() {
    var existingIds = rpg._missionPool.map(function(m) { return m.id; });

    EXTRA_MISSIONS.forEach(function(m) {
      if (!existingIds.includes(m.id)) {
        rpg._missionPool.push(m);
      }
    });
    console.log('[DailyPlus] Pool expandido para', rpg._missionPool.length, 'missões ✓');
  }

  // ── MISSÃO ESPECIAL DIÁRIA ─────────────────────────────────────────
  function injectSpecialMission() {
    var today = new Date().toISOString().slice(0,10);
    var spKey = 'rpg_daily_special_' + today;
    var spDone = localStorage.getItem(spKey + '_done') === '1';

    // Seleciona missão especial do dia (seed pelo dia)
    var dayNum = new Date().getDate() + new Date().getMonth() * 31;
    var spec = SPECIAL_POOL[dayNum % SPECIAL_POOL.length];

    if (!spec) return;

    // Escala recompensa pelo nível
    var lvl = rpg.level || 1;
    var scaledGold = Math.floor(spec.gold * Math.max(1, Math.pow(lvl, 0.4)));
    var scaledPot  = spec.pot;

    if (!rpg._specialMission || rpg._specialMission.id !== spec.id) {
      rpg._specialMission = {
        id: spec.id, type: spec.type, qty: spec.qty,
        icon: spec.icon, gold: scaledGold, pot: scaledPot,
        name: spec.name, progress: 0, done: false,
        special: true,
        claimed: spDone,
      };
      // Restaura progresso se já estava a fazer
      var saved = localStorage.getItem(spKey + '_prog');
      if (saved) rpg._specialMission.progress = parseInt(saved) || 0;
    }

    // Tick da missão especial em tickDailySpecial e tickDailyMissions
    var _origSpec = rpg.tickDailySpecial.bind(rpg);
    rpg.tickDailySpecial = function(type) {
      _origSpec.call(this, type);
      if (rpg._specialMission && !rpg._specialMission.done && !rpg._specialMission.claimed) {
        if (rpg._specialMission.type === type) {
          rpg._specialMission.progress++;
          if (rpg._specialMission.progress >= rpg._specialMission.qty) {
            rpg._specialMission.done = true;
          }
          localStorage.setItem(spKey + '_prog', String(rpg._specialMission.progress));
          updateSpecialDot();
        }
      }
    };

    var _origTick = rpg.tickDailyMissions.bind(rpg);
    rpg.tickDailyMissions = function(isBoss) {
      _origTick.call(this, isBoss);
      var sm = rpg._specialMission;
      if (sm && !sm.done && !sm.claimed && sm.type === 'kill') {
        sm.progress++;
        if (sm.progress >= sm.qty) sm.done = true;
        localStorage.setItem(spKey + '_prog', String(sm.progress));
        updateSpecialDot();
      }
      if (isBoss && sm && !sm.done && !sm.claimed && sm.type === 'boss') {
        sm.progress++;
        if (sm.progress >= sm.qty) sm.done = true;
        localStorage.setItem(spKey + '_prog', String(sm.progress));
        updateSpecialDot();
      }
    };

    // Claim da especial
    window.claimSpecialMission = function() {
      var sm = rpg._specialMission;
      if (!sm || !sm.done || sm.claimed) return;
      sm.claimed = true;
      localStorage.setItem(spKey + '_done', '1');

      // Aplica bónus de streak
      var sb = getStreakBonus();
      var finalGold = Math.floor(sm.gold * sb.mult);
      var finalPot  = Math.floor(sm.pot  * sb.mult);

      rpg.gold    += finalGold;
      rpg.potions += finalPot;
      rpg.save();
      rpg.updateUI();

      var msg = '🌟 MISSÃO ESPECIAL! +' + formatM(finalGold) + '💰 +' + finalPot + '🧪';
      if (sb.mult > 1) msg += '  ' + sb.label;
      if (typeof showToast === 'function') showToast(msg, 5000);
      rpg.renderDailyMissions();
    };

    console.log('[DailyPlus] Missão especial injectada: ' + spec.name.pt);
  }

  function updateSpecialDot() {
    var sm = rpg._specialMission;
    var dot = document.getElementById('daily-dot');
    if (!dot) return;
    var hasClaim = (sm && sm.done && !sm.claimed) ||
                   (rpg.dailyMissions || []).some(function(m) {
                     return m.done && !(rpg.dailyCompleted || []).includes(m.id);
                   });
    dot.classList.toggle('hidden', !hasClaim);
  }

  function formatM(n) {
    if (n >= 1e9) return (n/1e9).toFixed(1)+'B';
    if (n >= 1e6) return (n/1e6).toFixed(1)+'M';
    if (n >= 1e3) return (n/1e3).toFixed(0)+'K';
    return String(n);
  }

  // ── PATCH renderDailyMissions para mostrar especial + streak ───────
  function patchRenderForSpecial() {
    var _origRender = rpg.renderDailyMissions.bind(rpg);
    rpg.renderDailyMissions = function() {
      _origRender.call(this);

      var list = document.getElementById('daily-list');
      if (!list) return;

      // Streak badge no topo
      var streak = getStreak();
      var sb = getStreakBonus();
      var streakEl = document.getElementById('daily-streak');
      if (streakEl && streak > 0) {
        streakEl.style.display = 'inline';
        streakEl.textContent = '🔥 Streak: ' + streak + ' dias' + (sb.mult > 1 ? ' ' + sb.label : '');
      }

      // Missão especial no final
      var sm = rpg._specialMission;
      if (!sm) return;

      var pct = Math.min(100, Math.floor((sm.progress / sm.qty) * 100));
      var canClaim = sm.done && !sm.claimed;
      var claimed  = sm.claimed;

      var spDiv = document.createElement('div');
      spDiv.style.cssText = [
        'margin-top:8px',
        'background:' + (claimed ? '#18181b' : (canClaim ? 'rgba(234,179,8,0.08)' : 'rgba(99,102,241,0.08)')),
        'border:1.5px solid ' + (claimed ? '#27272a' : (canClaim ? '#ca8a04' : '#7c3aed')),
        'border-radius:10px',
        'padding:10px 12px',
        'position:relative',
        'overflow:hidden',
        claimed ? '' : (canClaim ? 'box-shadow:0 0 16px rgba(234,179,8,0.2)' : 'box-shadow:0 0 12px rgba(124,58,237,0.15)'),
      ].filter(Boolean).join(';');

      var streakBonusHtml = '';
      if (sb.mult > 1 && !claimed) {
        streakBonusHtml = '<span style="font-size:9px;color:' + sb.color + ';font-weight:700;margin-left:6px;">' + sb.label + '</span>';
      }

      spDiv.innerHTML =
        '<div style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:' + (claimed ? '#3f3f46' : (canClaim ? '#ca8a04' : '#7c3aed')) + ';font-family:Orbitron,sans-serif;margin-bottom:6px;">★ Missão Especial do Dia' + streakBonusHtml + '</div>' +
        '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">' +
          '<div style="flex:1;min-width:0;">' +
            '<div style="font-size:12px;font-weight:700;color:' + (claimed ? '#52525b' : '#e4e4e7') + ';">' + (claimed ? '✅ ' : '') + sm.name[this.lang || 'pt'] + '</div>' +
            '<div style="font-size:9px;color:#71717a;margin-top:2px;">+' + formatM(sm.gold) + ' 💰  +' + sm.pot + ' 🧪</div>' +
          '</div>' +
          (canClaim
            ? '<button onclick="claimSpecialMission()" style="background:linear-gradient(135deg,#92400e,#b45309);border:1px solid #d97706;color:#fef3c7;font-size:9px;font-weight:700;padding:5px 12px;border-radius:8px;cursor:pointer;white-space:nowrap;font-family:Orbitron,sans-serif;letter-spacing:0.06em;">RECLAMAR</button>'
            : (claimed
              ? '<span style="font-size:9px;color:#3f3f46;font-weight:700;">COMPLETO</span>'
              : '<span style="font-size:10px;font-weight:700;color:#71717a;">' + sm.progress + '/' + sm.qty + '</span>'
              )
          ) +
        '</div>' +
        (!claimed
          ? '<div style="margin-top:8px;background:#09090b;border-radius:4px;height:5px;overflow:hidden;">' +
              '<div style="width:' + pct + '%;height:100%;background:' + (canClaim ? '#eab308' : '#7c3aed') + ';border-radius:4px;transition:width 0.5s ease;' + (canClaim ? 'box-shadow:0 0 8px rgba(234,179,8,0.6);' : '') + '"></div>' +
            '</div>'
          : ''
        );

      list.appendChild(spDiv);
    };

    console.log('[DailyPlus] renderDailyMissions com especial + streak ✓');
  }

  // ── HOOKS PARA MISSÕES ESPECIAIS lowHP e noheal ───────────────────
  function hookSpecialTypes() {
    // lowHP — sobreviver com menos de 10% HP
    var _origUpdateHp = rpg.updateHpBars ? rpg.updateHpBars.bind(rpg) : null;
    if (_origUpdateHp) {
      var _lowHpTriggered = false;
      rpg.updateHpBars = function() {
        _origUpdateHp.call(this);
        if (this.inCombat && this.heroHp > 0) {
          var maxHp = this.getMaxHp ? this.getMaxHp() : 100;
          var pct = this.heroHp / maxHp;
          if (pct < 0.10 && !_lowHpTriggered) {
            _lowHpTriggered = true;
            rpg.tickDailySpecial('lowHP');
          }
          if (pct >= 0.10) _lowHpTriggered = false;
        }
      };
    }

    // noheal — matar sem usar poção (reset se curar)
    rpg._nohealKills = rpg._nohealKills || 0;
    var _origHeal = rpg.useSkill ? rpg.useSkill.bind(rpg) : null;
    if (_origHeal) {
      rpg.useSkill = function(id) {
        if (id === 'heal') rpg._nohealKills = 0; // reset streak sem cura
        return _origHeal.call(this, id);
      };
    }
    // Conta kills sem cura via tickDailyMissions
    var _origTM = rpg.tickDailyMissions.bind(rpg);
    rpg.tickDailyMissions = function(isBoss) {
      _origTM.call(this, isBoss);
      // Se chegou aqui, matou um inimigo
      rpg._nohealKills = (rpg._nohealKills || 0) + 1;
      rpg.dailyMissions && rpg.dailyMissions.forEach(function(m) {
        if (m.done || m.type !== 'noheal') return;
        m.progress = rpg._nohealKills;
        if (m.progress >= m.qty) m.done = true;
      });
    };
  }

  // ── INIT ───────────────────────────────────────────────────────────
  waitRpg(function() {
    updateStreak();
    expandPool();
    injectSpecialMission();
    hookSpecialTypes();
    // Aguarda o patchRenderDailyMissions do core-bugfixes estar ativo
    setTimeout(function() {
      patchRenderForSpecial();
    }, 500);
    console.log('[DailyPlus] Sistema de missões diárias expandido ✓ · Streak:', getStreak());
  });

})();
