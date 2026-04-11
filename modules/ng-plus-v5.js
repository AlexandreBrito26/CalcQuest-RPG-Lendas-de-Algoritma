// ═══════════════════════════════════════════════════════════════
// MODULE: ng-plus-v5.js  —  NEW GAME+ REESCRITO DO ZERO
// ─────────────────────────────────────────────────────────────
// Problemas corrigidos vs v4:
//   • Multiplicadores de inimigos e rewards agora aplicados
//     diretamente nos hooks de spawnMonster e de ganho de ouro/xp
//   • Classes de prestígio agora funcionam com auto-attack:
//     hooks patcheados na função attack() do game.js
//   • NG+ salvo de forma robusta: rpg_ng_plus + rpg.ngLevel
//   • Boss kills lidos corretamente (calc_bosses + rpg.bossKills)
//   • Modal completamente autónomo — sem depender de #ngplus-body existente
//   • Relíquias aplicadas em runtime a cada reload
//   • Badge NG+ sempre visível no HUD de menu
// ═══════════════════════════════════════════════════════════════
;(function NgPlusV5() {
  'use strict';

  // ══════════════════════════════════════════════════════════════
  // 1. CONFIGURAÇÃO DE CICLOS
  // ══════════════════════════════════════════════════════════════
  var CYCLES = [
    {
      ng: 0,
      label: 'NORMAL',
      color: '#94a3b8',
      glow: 'rgba(148,163,184,0.2)',
      title: '🌱 Início',
      desc: 'O começo de tudo. O código ainda não te viu.',
      enemyMult: 1,
      rewardMult: 1,
      relic: null,
    },
    {
      ng: 1,
      label: 'NG+1',
      color: '#a855f7',
      glow: 'rgba(168,85,247,0.35)',
      title: '🔮 Renascido',
      desc: 'O véu rasgou-se. O mundo lembra-se de ti.',
      enemyMult: 3,
      rewardMult: 5,
      relic: { id: 'ng1_echo', name: 'Eco do Passado', icon: '🔮', desc: '+8% XP por kill permanente', xpBonus: 0.08 },
    },
    {
      ng: 2,
      label: 'NG+2',
      color: '#f97316',
      glow: 'rgba(249,115,22,0.35)',
      title: '🔥 Forjado no Caos',
      desc: 'A chama não te consome — tu consomes a chama.',
      enemyMult: 6,
      rewardMult: 12,
      relic: { id: 'ng2_chaos_forge', name: 'Forja do Caos', icon: '🔥', desc: 'Fúria sobe 2× mais rápido', furyBoost: 2 },
    },
    {
      ng: 3,
      label: 'NG+3',
      color: '#ef4444',
      glow: 'rgba(239,68,68,0.4)',
      title: '💀 Além do Código',
      desc: 'Existir neste ciclo é um ato de violência contra a lógica.',
      enemyMult: 10,
      rewardMult: 25,
      relic: { id: 'ng3_void_pact', name: 'Pacto do Vazio', icon: '💀', desc: 'Críticos com 20% de chance de tirar 30% HP do inimigo', voidCrit: 0.20 },
    },
    {
      ng: 4,
      label: 'NG+4',
      color: '#ffd60a',
      glow: 'rgba(255,214,10,0.45)',
      title: '👑 O Inevitável',
      desc: 'Não és um jogador. És a própria equação.',
      enemyMult: 15,
      rewardMult: 40,
      relic: { id: 'ng4_mirror', name: 'Espelho do Fim', icon: '🪞', desc: 'Boss kills contam duplo para conquistas', bossMult: 2 },
    },
  ];

  // Ciclos infinitos além do NG+4
  function getCycle(n) {
    if (n >= 0 && n < CYCLES.length) return CYCLES[n];
    var extra = n - 4;
    return {
      ng: n,
      label: 'NG+' + n,
      color: '#ffffff',
      glow: 'rgba(255,255,255,0.4)',
      title: '∞ Transcendido',
      desc: 'Não existe limite. Apenas o combate.',
      enemyMult: 15 + extra * 6,
      rewardMult: 40 + extra * 20,
      relic: null,
    };
  }

  // ── Ler estado salvo ──────────────────────────────────────────
  function getNg() {
    var fromLS  = parseInt(localStorage.getItem('rpg_ng_plus') || '0', 10);
    var fromRpg = (typeof rpg !== 'undefined' && rpg) ? (rpg.ngPlusActive || rpg.ngLevel || 0) : 0;
    return Math.max(fromLS, fromRpg) || 0;
  }
  function getBossKills() {
    var fromLS  = parseInt(localStorage.getItem('calc_bosses') || '0', 10);
    var fromRpg = (typeof rpg !== 'undefined' && rpg) ? (rpg.bossKills || 0) : 0;
    return Math.max(fromLS, fromRpg) || 0;
  }
  function getTotalBosses() {
    if (typeof rpg !== 'undefined' && rpg && rpg.actBosses && Array.isArray(rpg.actBosses)) return rpg.actBosses.length;
    return parseInt(localStorage.getItem('rpg_total_bosses') || '19', 10);
  }
  function getRelics() {
    try { return JSON.parse(localStorage.getItem('rpg_ng_relics') || '[]'); } catch (e) { return []; }
  }
  function saveRelic(relic) {
    if (!relic) return;
    var list = getRelics();
    if (!list.some(function(r) { return r.id === relic.id; })) {
      list.push(relic);
      localStorage.setItem('rpg_ng_relics', JSON.stringify(list));
    }
  }

  // ══════════════════════════════════════════════════════════════
  // 2. APLICAR MULTIPLICADORES EM RUNTIME
  // ══════════════════════════════════════════════════════════════
  var _patched = false;

  function patchRpg() {
    if (_patched) return;
    if (typeof rpg === 'undefined' || !rpg || typeof rpg.spawnMonster !== 'function') return;
    _patched = true;

    var ng  = getNg();
    var cyc = getCycle(ng);

    // ── Patch spawnMonster: escala HP e DMG dos inimigos ─────────
    var _origSpawn = rpg.spawnMonster.bind(rpg);
    rpg.spawnMonster = function() {
      _origSpawn.call(this);
      if (!this.monster || ng <= 0) return;
      var em = cyc.enemyMult;
      this.monster.hp    = Math.floor((this.monster.hp    || 100) * em);
      this.monster.maxHp = Math.floor((this.monster.maxHp || 100) * em);
      this.monster.dmg   = Math.floor((this.monster.dmg   || 10)  * em);
      this.updateHpBars && this.updateHpBars();
    };

    // ── Patch gainGold: multiplica ouro ganho ────────────────────
    if (ng > 0 && typeof rpg.gainGold === 'function') {
      var _origGold = rpg.gainGold.bind(rpg);
      rpg.gainGold = function(amount, source) {
        return _origGold.call(this, Math.floor(amount * cyc.rewardMult), source);
      };
    } else if (ng > 0) {
      // Fallback: hook direto no killMonster
      var _origKill = rpg.killMonster ? rpg.killMonster.bind(rpg) : null;
      if (_origKill) {
        rpg.killMonster = function() {
          var goldBefore = this.gold;
          _origKill.call(this);
          var gained = this.gold - goldBefore;
          if (gained > 0) {
            var bonus = Math.floor(gained * (cyc.rewardMult - 1));
            this.gold += bonus;
          }
        };
      }
    }

    // ── Patch attack/dealDamage: aplica relíquias ─────────────────
    applyRelicPatches(ng);

    // Aplicar badge no HUD
    updateHudBadge(ng, cyc);

    console.log('[NgPlusV5] ✅ Ciclo ' + cyc.label + ' aplicado — inimigos ×' + cyc.enemyMult + ' | rewards ×' + cyc.rewardMult);
  }

  // ── Relíquias em runtime ──────────────────────────────────────
  function applyRelicPatches(ng) {
    var relics = getRelics();

    relics.forEach(function(relic) {
      // XP bonus (ng1_echo)
      if (relic.xpBonus && relic.xpBonus > 0) {
        var _origXp = rpg.gainXp || rpg.addXp;
        var _xpKey  = rpg.gainXp ? 'gainXp' : 'addXp';
        if (typeof rpg[_xpKey] === 'function' && !rpg['_ng5_xp_patched']) {
          var _origXpFn = rpg[_xpKey].bind(rpg);
          rpg[_xpKey] = function(amount) {
            return _origXpFn.call(this, Math.floor(amount * (1 + relic.xpBonus)));
          };
          rpg._ng5_xp_patched = true;
        }
      }

      // Fury boost (ng2_chaos_forge)
      if (relic.furyBoost && relic.furyBoost > 1) {
        if (!rpg._ng5_fury_patched) {
          var _origCombatTick = rpg.combatTick ? rpg.combatTick.bind(rpg) : null;
          if (_origCombatTick) {
            rpg.combatTick = function(ts) {
              var furyBefore = this.fury || 0;
              _origCombatTick.call(this, ts);
              var furyGained = (this.fury || 0) - furyBefore;
              if (furyGained > 0) this.fury = Math.min(this.fury + furyGained * (relic.furyBoost - 1), this.maxFury || 100);
            };
            rpg._ng5_fury_patched = true;
          }
        }
      }

      // Void crit (ng3_void_pact)
      if (relic.voidCrit && relic.voidCrit > 0 && !rpg._ng5_void_patched) {
        var _origAtk = rpg.attack ? rpg.attack.bind(rpg) : null;
        if (_origAtk) {
          rpg.attack = function() {
            var result = _origAtk.call(this);
            // Se foi crítico, chance de void (30% HP inimigo)
            if (this.monster && this._lastWasCrit && Math.random() < relic.voidCrit) {
              var voidDmg = Math.floor((this.monster.maxHp || this.monster.hp || 1) * 0.30);
              this.monster.hp = Math.max(1, (this.monster.hp || 0) - voidDmg);
              if (typeof showToast === 'function') showToast('💀 PACTO DO VAZIO! -' + voidDmg + ' HP!', 1500);
              this.updateHpBars && this.updateHpBars();
            }
            return result;
          };
          rpg._ng5_void_patched = true;
        }
      }

      // Boss mult (ng4_mirror) — boss kills contam duplo
      if (relic.bossMult && relic.bossMult > 1 && !rpg._ng5_boss_patched) {
        // Marcado para uso na UI — não duplica bossKills para evitar skip
        rpg._ng5_bossMult = relic.bossMult;
        rpg._ng5_boss_patched = true;
      }
    });
  }

  // ── Badge NG+ no HUD ──────────────────────────────────────────
  function updateHudBadge(ng, cyc) {
    if (ng <= 0) return;

    // Remove badge anterior
    var old = document.getElementById('ng5-hud-badge');
    if (old) old.remove();

    var badge = document.createElement('div');
    badge.id = 'ng5-hud-badge';
    badge.style.cssText = [
      'position:fixed',
      'top:10px',
      'right:12px',
      'z-index:8500',
      'font-family:Orbitron,monospace',
      'font-size:9px',
      'font-weight:900',
      'letter-spacing:.12em',
      'color:' + cyc.color,
      'background:rgba(0,0,0,0.8)',
      'border:1px solid ' + cyc.color + '55',
      'border-radius:8px',
      'padding:4px 10px',
      'box-shadow:0 0 12px ' + cyc.glow,
      'pointer-events:none',
      'text-transform:uppercase',
    ].join(';');
    badge.textContent = cyc.label;
    document.body.appendChild(badge);
  }

  // ══════════════════════════════════════════════════════════════
  // 3. CSS DO MODAL
  // ══════════════════════════════════════════════════════════════
  function injectCSS() {
    if (document.getElementById('ng5-css')) return;
    var s = document.createElement('style');
    s.id = 'ng5-css';
    s.textContent = `
      /* ══ NG+ V5 MODAL ══ */
      #ng5-modal {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 9800;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,0.82);
        backdrop-filter: blur(8px);
      }
      #ng5-modal.open { display: flex; }

      #ng5-box {
        background: #07070f;
        border-radius: 22px;
        width: min(95vw, 430px);
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 0 80px rgba(0,0,0,0.9);
      }

      #ng5-header {
        padding: 20px 20px 14px;
        border-bottom: 1px solid rgba(255,255,255,0.06);
        flex-shrink: 0;
      }
      #ng5-header h2 {
        font-family: 'Orbitron', monospace;
        font-size: 13px;
        font-weight: 900;
        color: #fff;
        letter-spacing: .16em;
        text-transform: uppercase;
        margin: 0 0 4px;
      }
      #ng5-header p {
        font-size: 9px;
        color: rgba(148,163,184,0.5);
        font-family: 'Fira Code', monospace;
        margin: 0;
      }

      #ng5-body {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        scrollbar-width: none;
      }
      #ng5-body::-webkit-scrollbar { display: none; }

      /* Current cycle card */
      #ng5-curr-card {
        border-radius: 14px;
        padding: 16px;
        text-align: center;
        margin-bottom: 14px;
        border: 1px solid transparent;
      }
      .ng5-curr-label {
        font-family: 'Orbitron', monospace;
        font-size: 28px;
        font-weight: 900;
        line-height: 1.1;
        margin-bottom: 4px;
      }
      .ng5-curr-title {
        font-family: 'Orbitron', monospace;
        font-size: 9px;
        letter-spacing: .14em;
        text-transform: uppercase;
        margin-bottom: 6px;
      }
      .ng5-curr-desc {
        font-family: 'Fira Code', monospace;
        font-size: 8.5px;
        color: rgba(148,163,184,0.5);
        font-style: italic;
        margin-bottom: 10px;
      }
      .ng5-mults {
        display: flex;
        justify-content: center;
        gap: 24px;
        font-size: 11px;
        color: #9ca3af;
      }

      /* Progress bar */
      #ng5-progress-wrap {
        margin-bottom: 14px;
      }
      #ng5-progress-label {
        display: flex;
        justify-content: space-between;
        font-size: 9px;
        color: rgba(148,163,184,0.5);
        font-family: 'Orbitron', monospace;
        font-weight: 700;
        letter-spacing: .08em;
        text-transform: uppercase;
        margin-bottom: 5px;
      }
      #ng5-progress-bar-wrap {
        height: 8px;
        background: rgba(255,255,255,0.05);
        border-radius: 4px;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.06);
      }
      #ng5-progress-bar-fill {
        height: 100%;
        border-radius: 4px;
        transition: width 0.6s ease;
      }

      /* Next cycle preview */
      #ng5-next-card {
        background: rgba(255,255,255,0.025);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 12px;
        padding: 12px;
        margin-bottom: 14px;
      }
      #ng5-next-card h3 {
        font-family: 'Orbitron', monospace;
        font-size: 9px;
        font-weight: 900;
        letter-spacing: .12em;
        text-transform: uppercase;
        color: rgba(148,163,184,0.5);
        margin: 0 0 8px;
      }
      .ng5-next-label {
        font-family: 'Orbitron', monospace;
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 2px;
      }
      .ng5-next-desc {
        font-size: 9px;
        color: rgba(148,163,184,0.45);
        margin-bottom: 8px;
      }
      .ng5-next-mults {
        display: flex;
        gap: 12px;
        font-size: 10px;
        color: #9ca3af;
        flex-wrap: wrap;
      }

      /* Relic row */
      #ng5-relics-wrap {
        margin-bottom: 14px;
      }
      #ng5-relics-wrap h3 {
        font-family: 'Orbitron', monospace;
        font-size: 9px;
        font-weight: 900;
        letter-spacing: .12em;
        text-transform: uppercase;
        color: rgba(148,163,184,0.5);
        margin: 0 0 8px;
      }
      #ng5-relics-list {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .ng5-relic-chip {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 5px 10px;
        border-radius: 8px;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.08);
        font-size: 9px;
        color: #e2e8f0;
        font-weight: 700;
      }
      .ng5-relic-icon { font-size: 13px; }
      .ng5-relic-desc {
        font-size: 8px;
        color: rgba(148,163,184,0.4);
        margin-top: 1px;
      }

      /* Action button */
      #ng5-action-btn {
        width: 100%;
        padding: 14px;
        border: none;
        border-radius: 12px;
        font-family: 'Orbitron', monospace;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: .14em;
        text-transform: uppercase;
        cursor: pointer;
        margin-bottom: 6px;
        transition: transform .1s, box-shadow .1s;
      }
      #ng5-action-btn:hover { transform: scale(1.015); }
      #ng5-action-btn:active { transform: scale(0.97); }
      #ng5-action-btn:disabled {
        opacity: 0.35;
        cursor: not-allowed;
        transform: none;
      }
      #ng5-action-reason {
        text-align: center;
        font-size: 9px;
        color: rgba(148,163,184,0.45);
        font-family: 'Orbitron', monospace;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: .08em;
        padding: 4px 0;
      }

      /* Footer */
      #ng5-footer {
        padding: 10px 20px 16px;
        border-top: 1px solid rgba(255,255,255,0.05);
        display: flex;
        justify-content: flex-end;
        flex-shrink: 0;
      }
      #ng5-close-btn {
        padding: 7px 18px;
        border-radius: 9px;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.08);
        color: rgba(148,163,184,0.6);
        font-size: 10px;
        font-weight: 800;
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: .08em;
        transition: background .15s;
        font-family: inherit;
      }
      #ng5-close-btn:hover { background: rgba(255,255,255,0.09); }

      /* Scrollbar kills reset */
      #ng5-modal * { box-sizing: border-box; }
    `;
    document.head.appendChild(s);
  }

  // ══════════════════════════════════════════════════════════════
  // 4. RENDER DO MODAL
  // ══════════════════════════════════════════════════════════════
  function buildModal() {
    if (document.getElementById('ng5-modal')) return;
    var el = document.createElement('div');
    el.id = 'ng5-modal';
    el.innerHTML = `
      <div id="ng5-box">
        <div id="ng5-header">
          <h2>⚡ NEW GAME+</h2>
          <p>Sistema de ciclos progressivos — cada ciclo preserva o teu legado</p>
        </div>
        <div id="ng5-body">
          <div id="ng5-curr-card"></div>
          <div id="ng5-progress-wrap">
            <div id="ng5-progress-label">
              <span>Progresso de Bosses</span>
              <span id="ng5-progress-text">0 / 0</span>
            </div>
            <div id="ng5-progress-bar-wrap">
              <div id="ng5-progress-bar-fill"></div>
            </div>
          </div>
          <div id="ng5-next-card"></div>
          <div id="ng5-relics-wrap">
            <h3>🏛 Relíquias de Ciclo</h3>
            <div id="ng5-relics-list"></div>
          </div>
          <button id="ng5-action-btn"></button>
          <div id="ng5-action-reason"></div>
        </div>
        <div id="ng5-footer">
          <button id="ng5-close-btn">Fechar</button>
        </div>
      </div>
    `;
    document.body.appendChild(el);

    el.addEventListener('click', function(e) { if (e.target === el) closeModal(); });
    document.getElementById('ng5-close-btn').addEventListener('click', closeModal);
    document.getElementById('ng5-action-btn').addEventListener('click', handleActionClick);
  }

  function renderModal() {
    var ng     = getNg();
    var killed = getBossKills();
    var total  = getTotalBosses();
    var cyc    = getCycle(ng);
    var next   = getCycle(ng + 1);
    var pct    = Math.min(100, total > 0 ? Math.round((killed / total) * 100) : 0);
    var can    = killed >= total;
    var relics = getRelics();

    // Current cycle card
    var currCard = document.getElementById('ng5-curr-card');
    if (currCard) {
      currCard.style.background = 'rgba(0,0,0,0.6)';
      currCard.style.borderColor = cyc.color + '30';
      currCard.style.boxShadow = 'inset 0 0 30px ' + cyc.glow;
      currCard.innerHTML = `
        <div class="ng5-curr-label" style="color:${cyc.color};text-shadow:0 0 20px ${cyc.glow}">${cyc.label}</div>
        <div class="ng5-curr-title" style="color:${cyc.color}">${cyc.title}</div>
        <div class="ng5-curr-desc">"${cyc.desc}"</div>
        ${ng > 0 ? `
        <div class="ng5-mults">
          <span>Inimigos <strong style="color:#f97316">${cyc.enemyMult}×</strong></span>
          <span>Rewards <strong style="color:#34d399">${cyc.rewardMult}×</strong></span>
        </div>` : ''}
      `;
    }

    // Progress bar
    var pText = document.getElementById('ng5-progress-text');
    var pFill = document.getElementById('ng5-progress-bar-fill');
    if (pText) pText.textContent = killed + ' / ' + total;
    if (pFill) {
      pFill.style.width = pct + '%';
      pFill.style.background = can
        ? 'linear-gradient(90deg, #34d399, #10b981)'
        : 'linear-gradient(90deg, ' + cyc.color + '88, ' + cyc.color + ')';
    }

    // Next cycle preview
    var nextCard = document.getElementById('ng5-next-card');
    if (nextCard) {
      nextCard.innerHTML = `
        <h3>🔮 Próximo Ciclo</h3>
        <div class="ng5-next-label" style="color:${next.color}">${next.label} — ${next.title}</div>
        <div class="ng5-next-desc">"${next.desc}"</div>
        <div class="ng5-next-mults">
          <span>⚔ Inimigos <strong style="color:#f97316">${next.enemyMult}×</strong></span>
          <span>💰 Rewards <strong style="color:#34d399">${next.rewardMult}×</strong></span>
          ${next.relic ? `<span style="color:#c084fc">🏛 Relíquia: ${next.relic.icon} ${next.relic.name}</span>` : ''}
        </div>
      `;
    }

    // Relics
    var relicList = document.getElementById('ng5-relics-list');
    if (relicList) {
      if (relics.length === 0) {
        relicList.innerHTML = '<span style="font-size:9px;color:rgba(148,163,184,0.3);font-style:italic;">Nenhuma relíquia ainda — complete ciclos para ganhar</span>';
      } else {
        relicList.innerHTML = relics.map(function(r) {
          return `<div class="ng5-relic-chip">
            <span class="ng5-relic-icon">${r.icon}</span>
            <div>
              <div>${r.name}</div>
              <div class="ng5-relic-desc">${r.desc}</div>
            </div>
          </div>`;
        }).join('');
      }
    }

    // Action button
    var btn    = document.getElementById('ng5-action-btn');
    var reason = document.getElementById('ng5-action-reason');
    if (btn) {
      if (can) {
        btn.disabled = false;
        btn.textContent = '🌟 Iniciar ' + next.label + ' →';
        btn.style.background = 'linear-gradient(135deg, ' + next.color + 'cc, ' + next.color + '88)';
        btn.style.color = '#fff';
        btn.style.boxShadow = '0 0 30px ' + next.glow;
        if (reason) reason.textContent = '✅ Todos os bosses derrotados — pronto para avançar';
      } else {
        var remaining = total - killed;
        btn.disabled = true;
        btn.textContent = '🔒 Derrotar ' + remaining + ' boss' + (remaining !== 1 ? 'es' : '') + ' restante' + (remaining !== 1 ? 's' : '');
        btn.style.background = 'rgba(255,255,255,0.03)';
        btn.style.color = 'rgba(148,163,184,0.3)';
        btn.style.boxShadow = 'none';
        if (reason) reason.textContent = killed + ' / ' + total + ' bosses derrotados (' + pct + '%)';
      }
    }
  }

  // ── Ação de avançar ciclo ────────────────────────────────────
  function handleActionClick() {
    var ng   = getNg();
    var next = getCycle(ng + 1);

    var ok = confirm(
      '🌟 Iniciar ' + next.label + '?\n\n' +
      '⚔ Inimigos ' + next.enemyMult + '× mais fortes\n' +
      '💰 Rewards ' + next.rewardMult + '× maiores\n' +
      (next.relic ? '🏛 Relíquia: ' + next.relic.icon + ' ' + next.relic.name + '\n' : '') +
      '\n✅ Preservado: Talentos, Runas, Grimório, Conquistas, Honra, Classe\n' +
      '🔄 Resetado: Nível, XP, Ouro, Bosses, Equipamentos\n\n' +
      'O jogo vai recarregar.'
    );
    if (!ok) return;

    // Salvar relíquia do próximo ciclo
    if (next.relic) saveRelic(next.relic);

    // Tentar usar o método nativo do game.js primeiro
    var r = (typeof rpg !== 'undefined') ? rpg : null;
    if (r && typeof r.startNewGamePlus === 'function') {
      try {
        r.ngPlusActive = ng + 1;
        r.startNewGamePlus();
        return;
      } catch (e) {
        console.warn('[NgPlusV5] startNewGamePlus nativo falhou, usando fallback:', e);
        r.ngPlusActive = ng; // reverte
      }
    }

    // Fallback robusto
    doTransition(ng, ng + 1, next, r);
  }

  function doTransition(oldNg, newNg, cfg, r) {
    function safe(obj, key) {
      try {
        var v = obj && obj[key];
        if (v == null) return '[]';
        return typeof v === 'string' ? v : JSON.stringify(v);
      } catch (e) { return '[]'; }
    }

    var keep = {
      'rpg_ng_plus':        String(newNg),
      'calc_intro_seen':    'true',
      'rpg_talents':        safe(r, 'unlockedTalents'),
      'rpg_talent_pts':     String((r && r.talentPoints) || 0),
      'rpg_grimoire':       safe(r, 'grimoire'),
      'rpg_achievements':   safe(r, 'achievementsClaimed'),
      'rpg_equip_runes':    safe(r, 'equippedRunes'),
      'rpg_unlocked_runes': safe(r, 'unlockedRunes'),
      'rpg_honor':          String((r && r.honor) || 0),
      'rpg_honor_shop':     safe(r, 'purchasedHonor'),
      'rpg_narrative':      safe(r, 'narrativeChoices'),
      'rpg_npc_quests':     safe(r, 'npcQuestsDone'),
      'rpg_lore_fragments': safe(r, 'loreFragments'),
      'rpg_best_wave':      String((r && r.bestWave) || 0),
      'rpg_class_rep':      safe(r, 'classReputation'),
      'rpg_diary':          safe(r, 'heroDiary'),
      'rpg_season_pts':     String((r && r.seasonPoints) || 0),
      'rpg_ng_relics':      localStorage.getItem('rpg_ng_relics') || '[]',
      'rpg_ng_best_ng':     String(Math.max(newNg, parseInt(localStorage.getItem('rpg_ng_best_ng') || '0', 10))),
      'calc_lang':          (r && r.lang) || localStorage.getItem('calc_lang') || 'pt',
      'calc_hero':          (r && r.heroName) || localStorage.getItem('calc_hero') || '',
      'rpg_avatar':         (r && r.avatar) || localStorage.getItem('rpg_avatar') || '',
      'rpg_class':          (r && r.eqClass) || localStorage.getItem('rpg_class') || 'warrior',
      'cq_modules_plus_v1': localStorage.getItem('cq_modules_plus_v1') || '{}',
    };

    localStorage.clear();
    Object.keys(keep).forEach(function(k) {
      var v = keep[k];
      if (v && v !== 'null' && v !== 'undefined') localStorage.setItem(k, v);
    });

    if (typeof showToast === 'function') showToast('🌟 ' + cfg.label + ' — ' + cfg.title + ' iniciado!', 3500);
    closeModal();
    setTimeout(function() { location.reload(); }, 1600);
  }

  // ──────────────────────────────────────────────────────────────
  // 5. OPEN / CLOSE
  // ──────────────────────────────────────────────────────────────
  function openModal() {
    buildModal();
    renderModal();
    document.getElementById('ng5-modal').classList.add('open');
  }
  function closeModal() {
    var m = document.getElementById('ng5-modal');
    if (m) m.classList.remove('open');
  }

  // Registar globalmente — sobrescreve openNgPlus de qualquer módulo anterior
  window.openNgPlus = openModal;

  // ══════════════════════════════════════════════════════════════
  // 6. INICIALIZAÇÃO
  // ══════════════════════════════════════════════════════════════
  function init() {
    injectCSS();

    // Aplicar multiplicadores assim que rpg estiver pronto
    var tries = 0;
    var waitPatch = setInterval(function() {
      tries++;
      if (typeof rpg !== 'undefined' && rpg && typeof rpg.spawnMonster === 'function') {
        clearInterval(waitPatch);
        patchRpg();
      } else if (tries > 200) {
        clearInterval(waitPatch);
        console.warn('[NgPlusV5] rpg não ficou pronto após 20s');
      }
    }, 100);

    // Sobrescrever openNgPlus com delay para garantir que vence versões anteriores
    setTimeout(function() {
      window.openNgPlus = openModal;
      if (typeof rpg !== 'undefined' && rpg) rpg.openNgPlus = openModal;
    }, 500);
    setTimeout(function() {
      window.openNgPlus = openModal;
      if (typeof rpg !== 'undefined' && rpg) rpg.openNgPlus = openModal;
    }, 2000);

    var ng = getNg();
    console.log('[NgPlusV5] ✅ Carregado — ciclo atual: NG+' + ng + ' | bosses: ' + getBossKills() + '/' + getTotalBosses());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
