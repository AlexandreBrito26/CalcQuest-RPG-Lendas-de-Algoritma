// ═══════════════════════════════════════════════════════════════
// MODULE: session-stats.js  —  ESTATÍSTICAS DE SESSÃO EM TEMPO REAL
// ─────────────────────────────────────────────────────────────
// Dashboard flutuante com stats da sessão atual:
//   • Kills, ouro, XP, dano total, tempo de sessão
//   • Dano médio por ataque, maior crítico, curas feitas
//   • Precisão (acertos vs tentativas), parries, esquivas
//   • Gráfico de dano ao longo do tempo (últimos 20 ataques)
//   • Comparação com melhor sessão anterior
//   • Integra com killMonster, dealDamageToMonster, useSkill
// ═══════════════════════════════════════════════════════════════
;(function SessionStatsModule() {
  'use strict';

  // ── Estado da sessão ──────────────────────────────────────────
  const S = {
    startTime:    Date.now(),
    kills:        0,
    bossKills:    0,
    goldEarned:   0,
    xpEarned:     0,
    totalDmg:     0,
    attacks:      0,
    hits:         0,
    crits:        0,
    bestCrit:     0,
    healingDone:  0,
    potionsUsed:  0,
    parries:      0,
    dodgesLanded: 0,
    damageTaken:  0,
    skillsUsed:   { atk:0, mag:0, def:0, heal:0, class5:0 },
    dmgHistory:   [],   // últimos 30 valores de dano
    deaths:       0,
  };

  // ── Melhor sessão (do localStorage) ─────────────────────────
  const BEST_KEY = 'rpg_best_session';
  function getBest() {
    try { return JSON.parse(localStorage.getItem(BEST_KEY) || '{}'); } catch(e) { return {}; }
  }
  function saveBest() {
    const old = getBest();
    const upd = {
      kills:     Math.max(S.kills,     old.kills     || 0),
      totalDmg:  Math.max(S.totalDmg,  old.totalDmg  || 0),
      bestCrit:  Math.max(S.bestCrit,  old.bestCrit  || 0),
      goldEarned:Math.max(S.goldEarned,old.goldEarned || 0),
      xpEarned:  Math.max(S.xpEarned, old.xpEarned  || 0),
    };
    localStorage.setItem(BEST_KEY, JSON.stringify(upd));
  }

  // ── Helpers ───────────────────────────────────────────────────
  function fmt(n) {
    return typeof formatNumber === 'function' ? formatNumber(n) : (n >= 1e6 ? (n/1e6).toFixed(1)+'M' : n >= 1e3 ? (n/1e3).toFixed(1)+'K' : String(n));
  }
  function elapsed() {
    const s = Math.floor((Date.now() - S.startTime) / 1000);
    const m = Math.floor(s / 60), sec = s % 60;
    return `${m}m ${sec.toString().padStart(2,'0')}s`;
  }
  function accuracy() {
    return S.attacks > 0 ? Math.round((S.hits / S.attacks) * 100) : 0;
  }
  function dpm() { // dano por minuto
    const mins = (Date.now() - S.startTime) / 60000;
    return mins > 0 ? Math.round(S.totalDmg / mins) : 0;
  }

  // ── Injetar CSS ───────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('session-stats-styles')) return;
    const s = document.createElement('style');
    s.id = 'session-stats-styles';
    s.textContent = `
      #session-stats-widget {
        position: fixed;
        top: 60px; right: 16px;
        z-index: 490;
        width: 240px;
        font-family: 'Rajdhani', sans-serif;
      }
      #session-stats-panel {
        background: rgba(5,5,10,0.97);
        border: 1px solid rgba(0,229,255,0.15);
        border-radius: 14px;
        overflow: hidden;
        box-shadow: 0 8px 30px rgba(0,0,0,0.8);
        margin-bottom: 6px;
        transform-origin: top right;
        transform: scale(0) translateY(-10px);
        opacity: 0;
        transition: transform 0.2s ease, opacity 0.2s ease;
      }
      #session-stats-widget.ss-open #session-stats-panel {
        transform: scale(1) translateY(0);
        opacity: 1;
      }
      .ss-header {
        background: rgba(0,229,255,0.05);
        border-bottom: 1px solid rgba(0,229,255,0.1);
        padding: 8px 12px;
        display: flex; align-items: center; justify-content: space-between;
        font-family: 'Orbitron', monospace;
        font-size: 8px; font-weight: 900;
        letter-spacing: 0.15em; color: #00e5ff;
      }
      .ss-body { padding: 10px 12px; }
      .ss-row {
        display: flex; align-items: center; justify-content: space-between;
        padding: 3px 0;
        border-bottom: 1px solid rgba(255,255,255,0.03);
        font-size: 11px;
      }
      .ss-row:last-child { border-bottom: none; }
      .ss-label { color: #6b7280; font-weight: 600; }
      .ss-val { font-weight: 900; color: #e4e4e7; font-family: 'Fira Code', monospace; font-size: 10px; }
      .ss-val.best { color: #fbbf24; }
      .ss-val.good { color: #34d399; }
      .ss-val.danger { color: #f87171; }
      .ss-section-title {
        font-family: 'Orbitron', monospace;
        font-size: 7px; font-weight: 900;
        color: #374151; letter-spacing: 0.15em;
        text-transform: uppercase;
        margin: 8px 0 4px;
      }
      .ss-chart {
        display: flex; align-items: flex-end; gap: 2px;
        height: 30px; margin: 6px 0;
        padding: 0 2px;
      }
      .ss-bar {
        flex: 1; border-radius: 2px 2px 0 0;
        background: rgba(0,229,255,0.4);
        min-height: 2px;
        transition: height 0.3s ease;
      }
      .ss-bar.ss-crit { background: rgba(251,191,36,0.7); }
      .ss-toggle-btn {
        width: 36px; height: 36px;
        background: rgba(5,5,10,0.97);
        border: 1px solid rgba(0,229,255,0.2);
        border-radius: 10px;
        cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        font-size: 16px; float: right;
        box-shadow: 0 4px 12px rgba(0,0,0,0.6);
        transition: border-color 0.2s;
      }
      .ss-toggle-btn:hover { border-color: rgba(0,229,255,0.5); }
      .ss-toggle-wrap { display: flex; justify-content: flex-end; }
      .ss-skill-grid {
        display: grid; grid-template-columns: repeat(5, 1fr);
        gap: 3px; margin-top: 4px;
      }
      .ss-skill-pill {
        background: rgba(0,0,0,0.4);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 6px; padding: 3px 2px;
        text-align: center;
        font-family: 'Fira Code', monospace;
        font-size: 8px; color: #52525b;
      }
      .ss-skill-pill span { display: block; font-size: 9px; }
      .ss-compare {
        font-family: 'Fira Code', monospace;
        font-size: 7px; color: #374151;
        text-align: right; margin-left: 4px;
      }
      .ss-compare.up { color: #34d399; }
      .ss-compare.down { color: #f87171; }
      @keyframes ssNewRecord {
        0%,100% { opacity:1; } 50% { opacity:0.3; }
      }
      .ss-new-record { animation: ssNewRecord 0.6s ease 3; color: #fbbf24 !important; }
    `;
    document.head.appendChild(s);
  }

  // ── Criar widget ──────────────────────────────────────────────
  function createWidget() {
    if (document.getElementById('session-stats-widget')) return;
    const w = document.createElement('div');
    w.id = 'session-stats-widget';
    w.innerHTML = `
      <div id="session-stats-panel">
        <div class="ss-header">
          <span>📊 SESSÃO</span>
          <span id="ss-elapsed" style="font-size:7px;color:#52525b;">0m 00s</span>
          <button onclick="document.getElementById('session-stats-widget').classList.remove('ss-open')" style="background:none;border:none;color:#374151;cursor:pointer;font-size:12px;padding:0;">✕</button>
        </div>
        <div class="ss-body" id="ss-body">
          <div class="ss-section-title">⚔ COMBATE</div>
          <div class="ss-row"><span class="ss-label">Kills</span><span class="ss-val" id="ss-kills">0</span></div>
          <div class="ss-row"><span class="ss-label">Bosses</span><span class="ss-val good" id="ss-bosses">0</span></div>
          <div class="ss-row"><span class="ss-label">Dano Total</span><span class="ss-val" id="ss-dmg">0</span></div>
          <div class="ss-row"><span class="ss-label">Maior Crítico</span><span class="ss-val best" id="ss-crit">0</span></div>
          <div class="ss-row"><span class="ss-label">DPM</span><span class="ss-val" id="ss-dpm">0</span></div>
          <div class="ss-row"><span class="ss-label">Precisão</span><span class="ss-val" id="ss-acc">0%</span></div>
          <div class="ss-row"><span class="ss-label">Dano Recebido</span><span class="ss-val danger" id="ss-taken">0</span></div>
          <div class="ss-row"><span class="ss-label">Curas</span><span class="ss-val good" id="ss-heals">0</span></div>
          <div class="ss-row"><span class="ss-label">Parries</span><span class="ss-val" id="ss-parries">0</span></div>
          <div class="ss-section-title">💰 RECURSOS</div>
          <div class="ss-row"><span class="ss-label">Ouro Ganho</span><span class="ss-val best" id="ss-gold">0</span></div>
          <div class="ss-row"><span class="ss-label">XP Ganho</span><span class="ss-val" id="ss-xp">0</span></div>
          <div class="ss-row"><span class="ss-label">Mortes</span><span class="ss-val danger" id="ss-deaths">0</span></div>
          <div class="ss-section-title">⚡ SKILLS USADAS</div>
          <div class="ss-skill-grid">
            <div class="ss-skill-pill">⚔<span id="ss-sk-atk">0</span></div>
            <div class="ss-skill-pill">🔥<span id="ss-sk-mag">0</span></div>
            <div class="ss-skill-pill">🛡<span id="ss-sk-def">0</span></div>
            <div class="ss-skill-pill">💚<span id="ss-sk-heal">0</span></div>
            <div class="ss-skill-pill">⚡<span id="ss-sk-c5">0</span></div>
          </div>
          <div class="ss-section-title">📈 ÚLTIMOS 20 ATAQUES</div>
          <div class="ss-chart" id="ss-chart"></div>
        </div>
      </div>
      <div class="ss-toggle-wrap">
        <button class="ss-toggle-btn" onclick="toggleSessionStats()" title="Estatísticas">📊</button>
      </div>
    `;
    document.body.appendChild(w);
  }

  window.toggleSessionStats = function() {
    const w = document.getElementById('session-stats-widget');
    if (w) {
      w.classList.toggle('ss-open');
      if (w.classList.contains('ss-open')) renderStats();
    }
  };

  // ── Render do painel ──────────────────────────────────────────
  function renderStats() {
    const best = getBest();
    const set = (id, val, cls) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.textContent = val;
      if (cls) el.className = 'ss-val ' + cls;
    };

    const el = document.getElementById('ss-elapsed');
    if (el) el.textContent = elapsed();

    set('ss-kills',   S.kills,                 S.kills > (best.kills||0) ? 'best ss-new-record' : '');
    set('ss-bosses',  S.bossKills,             'good');
    set('ss-dmg',     fmt(S.totalDmg),         S.totalDmg > (best.totalDmg||0) ? 'best ss-new-record' : '');
    set('ss-crit',    fmt(S.bestCrit),         S.bestCrit > (best.bestCrit||0) ? 'best ss-new-record' : 'best');
    set('ss-dpm',     fmt(dpm()),               '');
    set('ss-acc',     accuracy() + '%',        accuracy() > 80 ? 'good' : accuracy() < 50 ? 'danger' : '');
    set('ss-taken',   fmt(S.damageTaken),       'danger');
    set('ss-heals',   fmt(S.healingDone),       'good');
    set('ss-parries', S.parries,                '');
    set('ss-gold',    fmt(S.goldEarned),        S.goldEarned > (best.goldEarned||0) ? 'best ss-new-record' : 'best');
    set('ss-xp',      fmt(S.xpEarned),         '');
    set('ss-deaths',  S.deaths,                 S.deaths > 0 ? 'danger' : '');
    set('ss-sk-atk',  S.skillsUsed.atk,        '');
    set('ss-sk-mag',  S.skillsUsed.mag,        '');
    set('ss-sk-def',  S.skillsUsed.def,        '');
    set('ss-sk-heal', S.skillsUsed.heal,       '');
    set('ss-sk-c5',   S.skillsUsed.class5,     '');

    // Chart
    const chart = document.getElementById('ss-chart');
    if (chart && S.dmgHistory.length) {
      const max = Math.max(...S.dmgHistory, 1);
      chart.innerHTML = S.dmgHistory.slice(-20).map((d, i, arr) => {
        const pct = Math.max(5, Math.round((d / max) * 100));
        const isCrit = d === S.bestCrit;
        return `<div class="ss-bar${isCrit ? ' ss-crit' : ''}" style="height:${pct}%" title="${fmt(d)}"></div>`;
      }).join('');
    }
  }

  // ── Auto-refresh quando aberto ────────────────────────────────
  setInterval(() => {
    const w = document.getElementById('session-stats-widget');
    if (w?.classList.contains('ss-open')) renderStats();
    // Atualiza elapsed sempre
    const el = document.getElementById('ss-elapsed');
    if (el) el.textContent = elapsed();
  }, 2000);

  // ── Patches ───────────────────────────────────────────────────
  function patchKillMonster() {
    if (!window.rpg?.killMonster) return;
    const _orig = rpg.killMonster.bind(rpg);
    rpg.killMonster = function() {
      const g0 = this.gold || 0, x0 = this.xp || 0;
      const wasBoss = this.isBossFight;
      const r = _orig();
      S.kills++;
      if (wasBoss) S.bossKills++;
      S.goldEarned += Math.max(0, (this.gold || 0) - g0);
      S.xpEarned   += Math.max(0, (this.xp   || 0) - x0);
      saveBest();
      return r;
    };
  }

  function patchDealDamage() {
    if (!window.rpg?.dealDamageToMonster) return;
    const _orig = rpg.dealDamageToMonster.bind(rpg);
    rpg.dealDamageToMonster = function(baseDmg, atkType, isUltimate) {
      S.attacks++;
      const hpBefore = this.monster?.hp || 0;
      const r = _orig(baseDmg, atkType, isUltimate);
      const hpAfter  = this.monster?.hp ?? hpBefore;
      const actualDmg = Math.max(0, hpBefore - hpAfter);
      if (actualDmg > 0) {
        S.hits++;
        S.totalDmg += actualDmg;
        S.dmgHistory.push(actualDmg);
        if (S.dmgHistory.length > 50) S.dmgHistory.shift();
        if (actualDmg > S.bestCrit) S.bestCrit = actualDmg;
      }
      return r;
    };
  }

  function patchExecuteMonsterAttack() {
    if (!window.rpg?.executeMonsterAttack) return;
    const _orig = rpg.executeMonsterAttack.bind(rpg);
    rpg.executeMonsterAttack = function() {
      const hpBefore = this.heroHp || 0;
      const r = _orig();
      const dmgTaken = Math.max(0, hpBefore - (this.heroHp || 0));
      if (dmgTaken > 0) S.damageTaken += dmgTaken;
      return r;
    };
  }

  function patchUseSkill() {
    if (!window.rpg?.useSkill) return;
    const _orig = rpg.useSkill.bind(rpg);
    rpg.useSkill = function(id) {
      if (id === 'atk')  S.skillsUsed.atk++;
      if (id === 'mag')  S.skillsUsed.mag++;
      if (id === 'def')  S.skillsUsed.def++;
      if (id === 'heal') {
        S.skillsUsed.heal++;
        S.potionsUsed++;
        const hpBefore = this.heroHp || 0;
        const r = _orig(id);
        S.healingDone += Math.max(0, (this.heroHp || 0) - hpBefore);
        return r;
      }
      return _orig(id);
    };
  }

  function patchUseClassSkill() {
    if (!window.rpg?.useClassSkill) return;
    const _orig = rpg.useClassSkill.bind(rpg);
    rpg.useClassSkill = function() {
      S.skillsUsed.class5++;
      return _orig();
    };
  }

  function patchDie() {
    if (!window.rpg?.die) return;
    const _orig = rpg.die.bind(rpg);
    rpg.die = function() {
      S.deaths++;
      return _orig();
    };
  }

  // ── Detectar parries via battle log ──────────────────────────
  function observeParries() {
    // Parry é mostrado como "PARRY" no battle log — interceta showDamage
    if (!window.rpg?.showDamage) return;
    const _orig = rpg.showDamage.bind(rpg);
    rpg.showDamage = function(text, type) {
      if (type === 'parry' || (typeof text === 'string' && text.toLowerCase().includes('parry'))) {
        S.parries++;
      }
      return _orig(text, type);
    };
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    injectStyles();
    createWidget();
    patchKillMonster();
    patchDealDamage();
    patchExecuteMonsterAttack();
    patchUseSkill();
    patchUseClassSkill();
    patchDie();
    observeParries();

    // Captura gold/xp iniciais para diff correto
    S._goldBase = window.rpg?.gold || 0;
    S._xpBase   = window.rpg?.xp   || 0;

    window._sessionStats = { S, renderStats, saveBest };
    console.log('[SessionStats] ✅ Carregado — estatísticas de sessão activas');
  }

  function waitForRpg(cb, n) {
    if (window.rpg?.killMonster && window.rpg?.dealDamageToMonster) cb();
    else if ((n || 0) < 40) setTimeout(() => waitForRpg(cb, (n || 0) + 1), 200);
    else cb();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => waitForRpg(init));
  } else {
    waitForRpg(init);
  }

})();
