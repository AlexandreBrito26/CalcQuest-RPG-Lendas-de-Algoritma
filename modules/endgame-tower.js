// ═══════════════════════════════════════════════════════════════
// MODULE: endgame-tower.js
// ─────────────────────────────────────────────────────────────
// 1. Torre Infinita   — andares sem fim, bosses escalados,
//    placar semanal local, recompensas por milestone de andar
// 2. Fracturas de Realidade — dungeons procedurais com
//    modificadores aleatórios (imunidades, regras invertidas, timer)
// 3. Simulacro — reviver batalhas passadas com build fixa,
//    pontuado por eficiência
// ═══════════════════════════════════════════════════════════════
(function EndGameTower() {
  'use strict';

  /* ── helpers ─────────────────────────────────────────────── */
  function rdy() { return typeof rpg !== 'undefined' && rpg && typeof rpg.save === 'function'; }
  function wait(cb, n) { if (rdy()) { cb(); return; } if ((n||0)<200) setTimeout(()=>wait(cb,(n||0)+1),100); }
  function fmt(n) {
    if (n>=1e12) return (n/1e12).toFixed(1)+'T'; if (n>=1e9) return (n/1e9).toFixed(1)+'B';
    if (n>=1e6)  return (n/1e6).toFixed(1)+'M';  if (n>=1e3) return (n/1e3).toFixed(1)+'K';
    return String(Math.floor(n));
  }
  function toast(msg, ms) { if (typeof showToast==='function') showToast(msg, ms||4000); }

  /* ══════════════════════════════════════════════════════════
     1. TORRE INFINITA
  ══════════════════════════════════════════════════════════ */
  const TOWER_KEY   = 'rpg_tower_best';
  const TOWER_LOG   = 'rpg_tower_log';
  const TOWER_WEEK  = 'rpg_tower_week';

  // Milestones de andar → recompensa
  const TOWER_MILESTONES = [
    { floor: 10,  reward: 'gold',  amount: 50000,   label: '+50K Ouro' },
    { floor: 25,  reward: 'gold',  amount: 200000,  label: '+200K Ouro' },
    { floor: 50,  reward: 'perm',  stat: 'permAllBonus', val: 0.5, label: '+50% Stats Perm.' },
    { floor: 75,  reward: 'gold',  amount: 1000000, label: '+1M Ouro' },
    { floor: 100, reward: 'perm',  stat: 'permAllBonus', val: 1.0, label: '+100% Stats Perm.' },
    { floor: 150, reward: 'perm',  stat: 'permAllBonus', val: 2.0, label: '+200% Stats Perm.' },
    { floor: 200, reward: 'perm',  stat: 'permAllBonus', val: 5.0, label: '+500% Stats Perm.' },
    { floor: 300, reward: 'perm',  stat: 'permAllBonus', val: 10.0, label: '+1000% Stats Perm.' },
    { floor: 500, reward: 'perm',  stat: 'permAllBonus', val: 30.0, label: '+3000% Stats Perm.' },
  ];

  // Gera boss de andar escalado
  function towerBoss(floor) {
    const prestige = rdy() ? (rpg.prestigeLevel||0) : 0;
    const scale = 1 + floor * 0.08 + prestige * 0.05;
    const hp  = Math.floor(5000 * scale * (1 + floor*0.2));
    const dmg = Math.floor(80  * scale * (1 + floor*0.15));
    const names = ['Guardião','Colosso','Sombra','Titã','Espectro','Quimera','Deus Menor','Entidade'];
    const suffixes = ['do Algoritmo','do Vazio','da Lógica','do Código','Primordial','Corrompido'];
    const name = names[floor % names.length] + ' ' + suffixes[Math.floor(floor/8) % suffixes.length];
    return { name, hp, maxHp: hp, dmg, floor,
      reward: Math.floor(hp * 0.12),
      xp:     Math.floor(hp * 0.08) };
  }

  // Estado da torre (sessão)
  let towerState = null;

  function startTower() {
    if (!rdy()) return;
    towerState = {
      floor: 1,
      boss: towerBoss(1),
      heroHp: rpg.getMaxHp(),
      claimedMilestones: JSON.parse(localStorage.getItem('rpg_tower_claimed')||'[]'),
      startTime: Date.now(),
    };
    renderTower();
  }

  function towerAttack() {
    if (!towerState) return;
    const { boss } = towerState;
    // Player hits
    let atk = rpg.getAtk ? rpg.getAtk() : 100;
    let crit = rpg.getCritChance ? rpg.getCritChance() : 0.1;
    let isCrit = Math.random() < crit;
    let dmg = Math.floor(atk * (isCrit ? 2 : 1));
    boss.hp = Math.max(0, boss.hp - dmg);

    // Boss hits back (if alive)
    if (boss.hp > 0) {
      let dodge = rpg.getDodgeChance ? rpg.getDodgeChance() : 0.05;
      if (Math.random() > dodge) {
        towerState.heroHp = Math.max(0, towerState.heroHp - boss.dmg);
      }
    }

    if (towerState.heroHp <= 0) { towerEnd(false); return; }
    if (boss.hp <= 0) { towerFloorClear(); return; }
    renderTower();
  }

  function towerFloorClear() {
    const { boss, floor, claimedMilestones } = towerState;
    // Gold + XP reward
    rpg.gold += boss.reward;
    rpg.xp   += boss.xp;
    // Heal partial between floors
    towerState.heroHp = Math.min(rpg.getMaxHp(), towerState.heroHp + Math.floor(rpg.getMaxHp()*0.15));
    // Milestone rewards
    TOWER_MILESTONES.forEach(m => {
      if (floor >= m.floor && !claimedMilestones.includes(m.floor)) {
        claimedMilestones.push(m.floor);
        if (m.reward === 'gold') { rpg.gold += m.amount; }
        if (m.reward === 'perm') { rpg[m.stat] = (rpg[m.stat]||0) + m.val; }
        toast('🗼 Torre Andar '+m.floor+': '+m.label, 5000);
      }
    });
    localStorage.setItem('rpg_tower_claimed', JSON.stringify(claimedMilestones));
    // Advance
    towerState.floor++;
    towerState.boss = towerBoss(towerState.floor);
    rpg.save();
    rpg.updateUI();
    renderTower();
  }

  function towerEnd(victory) {
    const best = parseInt(localStorage.getItem(TOWER_KEY)||'0');
    const floor = towerState.floor - (victory ? 0 : 1);
    if (floor > best) {
      localStorage.setItem(TOWER_KEY, String(floor));
      toast('🏆 Novo Recorde na Torre: Andar '+floor+'!', 6000);
    }
    // Weekly log
    const weekKey = getWeekKey();
    const log = JSON.parse(localStorage.getItem(TOWER_LOG)||'[]');
    log.unshift({ name: rpg.heroName||'Herói', floor, week: weekKey, ts: Date.now() });
    localStorage.setItem(TOWER_LOG, JSON.stringify(log.slice(0,50)));
    towerState = null;
    renderTower();
  }

  function getWeekKey() {
    const d = new Date(); const y = d.getFullYear();
    const w = Math.ceil(((d - new Date(y,0,1))/86400000 + new Date(y,0,1).getDay()+1)/7);
    return y+'-W'+w;
  }

  function renderTower() {
    const box = document.getElementById('tower-body');
    if (!box) return;
    const best = parseInt(localStorage.getItem(TOWER_KEY)||'0');
    const log  = JSON.parse(localStorage.getItem(TOWER_LOG)||'[]');
    const thisWeek = log.filter(e => e.week === getWeekKey()).sort((a,b)=>b.floor-a.floor);
    const lang = rdy() ? (rpg.lang||'pt') : 'pt';

    if (!towerState) {
      // Lobby
      const milRows = TOWER_MILESTONES.map(m => {
        const claimed = JSON.parse(localStorage.getItem('rpg_tower_claimed')||'[]');
        const done = claimed.includes(m.floor);
        return `<div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
          <span style="font-family:'Fira Code',monospace;font-size:8px;color:${done?'#34d399':'#6b7280'};">Andar ${m.floor}</span>
          <span style="font-size:9px;color:${done?'#34d399':'#fbbf24'};">${m.label}</span>
          <span style="font-size:9px;">${done?'✓':'🔒'}</span>
        </div>`;
      }).join('');

      const rankRows = thisWeek.slice(0,10).map((e,i)=>
        `<div style="display:flex;gap:8px;align-items:center;padding:3px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
          <span style="font-family:Orbitron,monospace;font-size:8px;color:#fbbf24;width:16px;">${i+1}</span>
          <span style="flex:1;font-size:9px;color:#e7e5e4;font-family:Rajdhani,sans-serif;">${e.name}</span>
          <span style="font-family:'Fira Code',monospace;font-size:8px;color:#f97316;">Andar ${e.floor}</span>
        </div>`
      ).join('') || '<div style="font-size:9px;color:#52525b;text-align:center;padding:8px;">Sem registos esta semana.</div>';

      box.innerHTML = `
        <div style="text-align:center;margin-bottom:14px;">
          <div style="font-family:Orbitron,sans-serif;font-size:18px;font-weight:900;color:#f97316;text-shadow:0 0 16px rgba(249,115,22,0.5);">🗼 TORRE INFINITA</div>
          <div style="font-family:'Fira Code',monospace;font-size:9px;color:#78716c;margin-top:3px;">Sobe o mais alto que conseguires</div>
          ${best?`<div style="margin-top:6px;font-family:Orbitron,sans-serif;font-size:10px;color:#fbbf24;">🏆 Recorde pessoal: Andar ${best}</div>`:''}
        </div>
        <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(249,115,22,0.2);border-radius:12px;padding:12px;margin-bottom:10px;">
          <div style="font-family:Orbitron,monospace;font-size:7.5px;font-weight:900;color:#92400e;letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px;">🏆 Marcos de Andar</div>
          ${milRows}
        </div>
        <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(251,191,36,0.15);border-radius:12px;padding:12px;margin-bottom:12px;">
          <div style="font-family:Orbitron,monospace;font-size:7.5px;font-weight:900;color:#78350f;letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px;">📋 Placar Semanal</div>
          ${rankRows}
        </div>
        <button onclick="window._towerStart()" style="width:100%;padding:14px;font-family:Orbitron,sans-serif;font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;border-radius:12px;cursor:pointer;border:2px solid rgba(249,115,22,0.7);color:#fb923c;background:linear-gradient(135deg,rgba(249,115,22,0.2),rgba(153,27,27,0.1));box-shadow:0 0 18px rgba(249,115,22,0.35);">
          🗼 INICIAR ESCALADA
        </button>`;
    } else {
      // Battle
      const { boss, heroHp, floor } = towerState;
      const bossHpPct = Math.max(0, Math.round((boss.hp/boss.maxHp)*100));
      const heroHpPct = Math.max(0, Math.round((heroHp/rpg.getMaxHp())*100));
      box.innerHTML = `
        <div style="text-align:center;margin-bottom:12px;">
          <div style="font-family:Orbitron,sans-serif;font-size:14px;font-weight:900;color:#f97316;">🗼 ANDAR ${floor}</div>
        </div>
        <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(239,68,68,0.3);border-radius:12px;padding:12px;margin-bottom:10px;">
          <div style="font-family:Rajdhani,sans-serif;font-size:13px;font-weight:900;color:#f87171;margin-bottom:6px;">👹 ${boss.name}</div>
          <div style="height:8px;background:rgba(0,0,0,0.5);border-radius:99px;overflow:hidden;margin-bottom:3px;">
            <div style="height:100%;border-radius:99px;background:linear-gradient(90deg,#dc2626,#ef4444);width:${bossHpPct}%;transition:width .3s;"></div>
          </div>
          <div style="font-family:'Fira Code',monospace;font-size:8px;color:#7f1d1d;">${fmt(boss.hp)} / ${fmt(boss.maxHp)} HP • DMG: ${fmt(boss.dmg)}</div>
        </div>
        <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(52,211,153,0.2);border-radius:12px;padding:10px;margin-bottom:12px;">
          <div style="font-family:Rajdhani,sans-serif;font-size:11px;font-weight:700;color:#34d399;margin-bottom:5px;">⚔ ${rdy()?(rpg.heroName||'Herói'):'Herói'}</div>
          <div style="height:7px;background:rgba(0,0,0,0.5);border-radius:99px;overflow:hidden;margin-bottom:3px;">
            <div style="height:100%;border-radius:99px;background:linear-gradient(90deg,#059669,#34d399);width:${heroHpPct}%;transition:width .3s;"></div>
          </div>
          <div style="font-family:'Fira Code',monospace;font-size:8px;color:#065f46;">${fmt(heroHp)} / ${fmt(rpg.getMaxHp())} HP</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <button onclick="window._towerAttack()" style="padding:12px;font-family:Orbitron,sans-serif;font-size:9px;font-weight:900;border-radius:10px;cursor:pointer;border:2px solid rgba(239,68,68,0.6);color:#f87171;background:rgba(239,68,68,0.15);text-transform:uppercase;">⚔ ATACAR</button>
          <button onclick="window._towerFlee()" style="padding:12px;font-family:Orbitron,sans-serif;font-size:9px;font-weight:900;border-radius:10px;cursor:pointer;border:2px solid rgba(113,113,122,0.5);color:#a1a1aa;background:rgba(0,0,0,0.3);text-transform:uppercase;">🏃 RETIRAR</button>
        </div>`;
    }
    try { if (typeof lucide!=='undefined') lucide.createIcons(); } catch(e){}
  }

  window._towerStart  = startTower;
  window._towerAttack = towerAttack;
  window._towerFlee   = () => { towerEnd(false); };

  /* ══════════════════════════════════════════════════════════
     2. FRACTURAS DE REALIDADE
  ══════════════════════════════════════════════════════════ */
  const FRAC_MODS = [
    { id:'immune_fire',  label:'🔥 Imune a críticos',  apply: s => { s._fracNoCrit=true; },    remove: s => { delete s._fracNoCrit; }   },
    { id:'inverse',      label:'🔄 Cura inverte dano', apply: s => { s._fracInverse=true; },   remove: s => { delete s._fracInverse; }  },
    { id:'timer',        label:'⏱ Temporizador 45s',   apply: () => {},                        remove: () => {},       timed: 45 },
    { id:'blind',        label:'🌑 Às Cegas (sem HP)',  apply: s => { s._fracBlind=true; },     remove: s => { delete s._fracBlind; }    },
    { id:'regen',        label:'💚 Boss Regenera 5%/turno', apply: s => { s._fracRegen=true; }, remove: s => { delete s._fracRegen; }   },
    { id:'double_dmg',   label:'💀 Dano Duplo',         apply: s => { s._fracDblDmg=true; },   remove: s => { delete s._fracDblDmg; }  },
    { id:'gold_curse',   label:'💸 Sem Ouro no Drop',   apply: s => { s._fracNoGold=true; },   remove: s => { delete s._fracNoGold; }  },
    { id:'xp_bonus',     label:'⭐ XP ×3',              apply: s => { s._fracXpMult=3; },       remove: s => { delete s._fracXpMult; }  },
  ];

  let fracState = null;
  let fracTimer = null;

  function rollFracture() {
    // 2-3 random mods
    const count = 2 + (Math.random()>.6 ? 1 : 0);
    const shuffled = [...FRAC_MODS].sort(()=>Math.random()-.5);
    return shuffled.slice(0, count);
  }

  function startFracture() {
    if (!rdy()) return;
    const mods = rollFracture();
    const floor = Math.max(1, (rpg.prestigeLevel||0)*2 + Math.floor(Math.random()*10+5));
    const boss = towerBoss(floor);
    boss.hp    = Math.floor(boss.hp * 1.4);
    boss.maxHp = boss.hp;
    fracState = { boss, heroHp: rpg.getMaxHp(), mods, startTime: Date.now(), timedMod: null };
    // Apply mods
    mods.forEach(m => { m.apply(rpg); if (m.timed) fracState.timedMod = m; });
    // Timer
    if (fracState.timedMod) {
      clearInterval(fracTimer);
      fracState.timeLeft = fracState.timedMod.timed;
      fracTimer = setInterval(() => {
        if (!fracState) { clearInterval(fracTimer); return; }
        fracState.timeLeft--;
        renderFracture();
        if (fracState.timeLeft <= 0) { clearInterval(fracTimer); fracEnd(false); }
      }, 1000);
    }
    renderFracture();
  }

  function fracAttack() {
    if (!fracState) return;
    const { boss, mods } = fracState;
    let atk = rpg.getAtk ? rpg.getAtk() : 100;
    let crit = (!rpg._fracNoCrit && rpg.getCritChance) ? rpg.getCritChance() : 0;
    let isCrit = Math.random() < crit;
    let dmg = Math.floor(atk * (isCrit ? 2 : 1));
    // Inverse: cure
    if (rpg._fracInverse) { boss.hp = Math.min(boss.maxHp, boss.hp + dmg); }
    else { boss.hp = Math.max(0, boss.hp - dmg); }
    // Boss regen
    if (rpg._fracRegen && boss.hp > 0) boss.hp = Math.min(boss.maxHp, boss.hp + Math.floor(boss.maxHp*0.05));
    // Boss hits
    if (boss.hp > 0) {
      let bdmg = boss.dmg * (rpg._fracDblDmg ? 2 : 1);
      let dodge = rpg.getDodgeChance ? rpg.getDodgeChance() : 0;
      if (Math.random() > dodge) fracState.heroHp = Math.max(0, fracState.heroHp - bdmg);
    }
    if (fracState.heroHp <= 0) { fracEnd(false); return; }
    if (boss.hp <= 0) { fracEnd(true); return; }
    renderFracture();
  }

  function fracEnd(win) {
    clearInterval(fracTimer);
    const mods = fracState ? fracState.mods : [];
    mods.forEach(m => m.remove(rpg));
    if (win) {
      const gold = Math.floor(fracState.boss.maxHp * 0.2) * (!rpg._fracNoGold ? 1 : 0);
      const xp   = Math.floor(fracState.boss.maxHp * 0.15) * (rpg._fracXpMult||1);
      rpg.gold += gold; rpg.xp += xp;
      rpg.save(); rpg.updateUI();
      toast(`🌀 Fratura concluída! +${fmt(gold)} Ouro, +${fmt(xp)} XP`, 5000);
    } else {
      toast('💀 Fratura falhou…', 3000);
    }
    fracState = null;
    renderFracture();
  }

  function renderFracture() {
    const box = document.getElementById('fracture-body');
    if (!box) return;
    if (!fracState) {
      box.innerHTML = `
        <div style="text-align:center;margin-bottom:14px;">
          <div style="font-family:Orbitron,sans-serif;font-size:18px;font-weight:900;color:#818cf8;text-shadow:0 0 16px rgba(129,140,248,0.5);">🌀 FRACTURAS DE REALIDADE</div>
          <div style="font-family:'Fira Code',monospace;font-size:9px;color:#78716c;margin-top:3px;">Dungeons com modificadores imprevisíveis</div>
        </div>
        <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(129,140,248,0.2);border-radius:12px;padding:12px;margin-bottom:12px;">
          <div style="font-family:Orbitron,monospace;font-size:7.5px;font-weight:900;color:#4338ca;letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px;">⚙ Modificadores Possíveis</div>
          ${FRAC_MODS.map(m=>`<div style="font-size:9px;color:#6b7280;padding:3px 0;border-bottom:1px solid rgba(255,255,255,0.04);">${m.label}</div>`).join('')}
        </div>
        <button onclick="window._fracStart()" style="width:100%;padding:14px;font-family:Orbitron,sans-serif;font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;border-radius:12px;cursor:pointer;border:2px solid rgba(129,140,248,0.6);color:#818cf8;background:linear-gradient(135deg,rgba(129,140,248,0.15),rgba(99,102,241,0.1));box-shadow:0 0 18px rgba(129,140,248,0.25);">
          🌀 ENTRAR NA FRATURA
        </button>`;
      return;
    }
    const { boss, heroHp, mods, timeLeft } = fracState;
    const bossHpPct = Math.max(0, Math.round((boss.hp/boss.maxHp)*100));
    const heroHpPct = Math.max(0, Math.round((heroHp/rpg.getMaxHp())*100));
    const modLabels = mods.map(m=>`<span style="display:inline-block;padding:2px 7px;margin:2px;background:rgba(129,140,248,0.15);border:1px solid rgba(129,140,248,0.3);border-radius:5px;font-size:8px;color:#818cf8;">${m.label}</span>`).join('');
    box.innerHTML = `
      <div style="margin-bottom:10px;text-align:center;">
        <div style="font-family:Orbitron,sans-serif;font-size:12px;font-weight:900;color:#818cf8;">🌀 FRATURA ATIVA</div>
        ${timeLeft !== undefined ? `<div style="font-family:Orbitron,monospace;font-size:14px;color:${timeLeft<=10?'#ef4444':'#fbbf24'};margin-top:4px;">⏱ ${timeLeft}s</div>` : ''}
      </div>
      <div style="margin-bottom:10px;">${modLabels}</div>
      <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(239,68,68,0.3);border-radius:12px;padding:10px;margin-bottom:8px;">
        <div style="font-family:Rajdhani,sans-serif;font-size:12px;font-weight:900;color:#f87171;margin-bottom:5px;">👹 ${boss.name}</div>
        <div style="height:8px;background:rgba(0,0,0,0.5);border-radius:99px;overflow:hidden;margin-bottom:3px;">
          <div style="height:100%;border-radius:99px;background:linear-gradient(90deg,#7c3aed,#818cf8);width:${bossHpPct}%;transition:width .3s;"></div>
        </div>
        <div style="font-family:'Fira Code',monospace;font-size:8px;color:#7f1d1d;">${rpg._fracBlind ? '??? HP' : fmt(boss.hp)+' / '+fmt(boss.maxHp)+' HP'}</div>
      </div>
      <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(52,211,153,0.2);border-radius:12px;padding:8px;margin-bottom:12px;">
        <div style="height:7px;background:rgba(0,0,0,0.5);border-radius:99px;overflow:hidden;margin-bottom:2px;">
          <div style="height:100%;border-radius:99px;background:linear-gradient(90deg,#059669,#34d399);width:${heroHpPct}%;"></div>
        </div>
        <div style="font-family:'Fira Code',monospace;font-size:8px;color:#065f46;">${rpg._fracBlind ? '??? HP' : fmt(heroHp)+' HP'}</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        <button onclick="window._fracAttack()" style="padding:12px;font-family:Orbitron,sans-serif;font-size:9px;font-weight:900;border-radius:10px;cursor:pointer;border:2px solid rgba(129,140,248,0.6);color:#818cf8;background:rgba(129,140,248,0.12);text-transform:uppercase;">⚔ ATACAR</button>
        <button onclick="window._fracFlee()" style="padding:12px;font-family:Orbitron,sans-serif;font-size:9px;font-weight:900;border-radius:10px;cursor:pointer;border:2px solid rgba(113,113,122,0.5);color:#a1a1aa;background:rgba(0,0,0,0.3);text-transform:uppercase;">🏃 FUGIR</button>
      </div>`;
    try { if (typeof lucide!=='undefined') lucide.createIcons(); } catch(e){}
  }

  window._fracStart  = startFracture;
  window._fracAttack = fracAttack;
  window._fracFlee   = () => { fracEnd(false); };

  /* ══════════════════════════════════════════════════════════
     3. SIMULACRO
  ══════════════════════════════════════════════════════════ */
  const SIM_LOG_KEY = 'rpg_sim_log';

  // Save a "snapshot" of the last boss battle for replay
  function saveSimRecord() {
    if (!rdy()) return;
    const log = JSON.parse(localStorage.getItem(SIM_LOG_KEY)||'[]');
    const record = {
      id: Date.now(),
      label: `Boss #${rpg.bossKills} — Lvl ${rpg.level}`,
      bossKills: rpg.bossKills,
      level: rpg.level,
      heroName: rpg.heroName,
      atk: rpg.getAtk ? rpg.getAtk() : 100,
      hp:  rpg.getMaxHp ? rpg.getMaxHp() : 1000,
      crit: rpg.getCritChance ? rpg.getCritChance() : 0.1,
      dodge: rpg.getDodgeChance ? rpg.getDodgeChance() : 0.05,
      weapon: rpg.eqWeapon,
      armor:  rpg.eqArmor,
      class:  rpg.eqClass,
      prestige: rpg.prestigeLevel||0,
      boss: rpg.monster ? { name: rpg.monster.name||'Boss', maxHp: rpg.monster.maxHp||5000, dmg: rpg.monster.dmg||200 } : null,
    };
    if (!record.boss) return;
    log.unshift(record);
    localStorage.setItem(SIM_LOG_KEY, JSON.stringify(log.slice(0,10)));
  }

  let simState = null;

  function startSimulacro(idx) {
    const log = JSON.parse(localStorage.getItem(SIM_LOG_KEY)||'[]');
    const record = log[idx];
    if (!record || !record.boss) return;
    const boss = { ...record.boss, hp: record.boss.maxHp };
    simState = {
      record, boss,
      heroHp: record.hp,
      turns: 0, totalDmg: 0, totalRec: 0,
      startTime: Date.now(),
    };
    renderSimulacro();
  }

  function simAttack() {
    if (!simState) return;
    const { record, boss } = simState;
    const isCrit = Math.random() < record.crit;
    const dmg    = Math.floor(record.atk * (isCrit ? 2 : 1));
    boss.hp = Math.max(0, boss.hp - dmg);
    simState.totalDmg += dmg;
    simState.turns++;
    // Boss hits
    if (boss.hp > 0) {
      const dodge = record.dodge;
      if (Math.random() > dodge) {
        simState.heroHp = Math.max(0, simState.heroHp - boss.dmg);
        simState.totalRec += boss.dmg;
      }
    }
    if (simState.heroHp <= 0) { simEnd(false); return; }
    if (boss.hp <= 0) { simEnd(true); return; }
    renderSimulacro();
  }

  function simEnd(win) {
    const elapsed = ((Date.now() - simState.startTime)/1000).toFixed(1);
    const { totalDmg, turns, record } = simState;
    const efficiency = win ? Math.floor((record.boss.maxHp / Math.max(1,turns)) * 10) : 0;
    const goldReward = win ? efficiency * 100 : 0;
    if (win && rdy()) { rpg.gold += goldReward; rpg.save(); rpg.updateUI(); }
    toast(win ? `🎭 Simulacro vencido! Eficiência: ${efficiency} pts. +${fmt(goldReward)} Ouro` : '💀 Simulacro falhou.', 5000);
    simState = null;
    renderSimulacro();
  }

  function renderSimulacro() {
    const box = document.getElementById('simulacro-body');
    if (!box) return;
    const log = JSON.parse(localStorage.getItem(SIM_LOG_KEY)||'[]');

    if (!simState) {
      const records = log.map((r,i) =>
        `<div style="background:rgba(0,0,0,0.4);border:1px solid rgba(232,121,249,0.15);border-radius:10px;padding:10px;margin-bottom:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <div style="font-family:Rajdhani,sans-serif;font-size:11px;font-weight:700;color:#e879f9;">${r.label}</div>
              <div style="font-family:'Fira Code',monospace;font-size:7.5px;color:#52525b;">${r.heroName} · P.${r.prestige} · ${r.boss.name}</div>
            </div>
            <button onclick="window._simStart(${i})" style="padding:5px 10px;background:rgba(232,121,249,0.12);border:1px solid rgba(232,121,249,0.35);border-radius:8px;font-size:7.5px;color:#e879f9;font-family:Orbitron,monospace;font-weight:900;cursor:pointer;">REVIVER</button>
          </div>
        </div>`
      ).join('') || '<div style="font-size:9px;color:#52525b;text-align:center;padding:16px;">Nenhuma batalha registada ainda.</div>';

      box.innerHTML = `
        <div style="text-align:center;margin-bottom:14px;">
          <div style="font-family:Orbitron,sans-serif;font-size:18px;font-weight:900;color:#e879f9;text-shadow:0 0 16px rgba(232,121,249,0.4);">🎭 SIMULACRO</div>
          <div style="font-family:'Fira Code',monospace;font-size:9px;color:#78716c;margin-top:3px;">Revive batalhas passadas pela eficiência</div>
        </div>
        <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(232,121,249,0.15);border-radius:12px;padding:12px;margin-bottom:10px;">
          <div style="font-family:Orbitron,monospace;font-size:7.5px;font-weight:900;color:#701a75;letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px;">⚙ Como funciona</div>
          <div style="font-size:8.5px;color:#6b7280;font-family:Rajdhani,sans-serif;line-height:1.6;">
            Cada batalha contra um boss guarda um registo.<br>
            Reviver usa os stats da altura (build fixa).<br>
            <span style="color:#e879f9;">Eficiência = dano total ÷ turnos × bónus.</span><br>
            Ouro de recompensa escala com a eficiência.
          </div>
        </div>
        ${records}`;
      return;
    }
    const { record, boss, heroHp, turns, totalDmg } = simState;
    const bossHpPct = Math.max(0, Math.round((boss.hp/boss.maxHp)*100));
    const heroHpPct = Math.max(0, Math.round((heroHp/record.hp)*100));
    box.innerHTML = `
      <div style="text-align:center;margin-bottom:12px;">
        <div style="font-family:Orbitron,sans-serif;font-size:12px;font-weight:900;color:#e879f9;">🎭 ${record.boss.name}</div>
        <div style="font-family:'Fira Code',monospace;font-size:8px;color:#78716c;">Turno ${turns} · DMG Total: ${fmt(totalDmg)}</div>
      </div>
      <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(239,68,68,0.3);border-radius:12px;padding:10px;margin-bottom:8px;">
        <div style="height:8px;background:rgba(0,0,0,0.5);border-radius:99px;overflow:hidden;margin-bottom:3px;">
          <div style="height:100%;border-radius:99px;background:linear-gradient(90deg,#9333ea,#e879f9);width:${bossHpPct}%;transition:width .3s;"></div>
        </div>
        <div style="font-family:'Fira Code',monospace;font-size:8px;color:#7f1d1d;">${fmt(boss.hp)} / ${fmt(boss.maxHp)} HP</div>
      </div>
      <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(52,211,153,0.2);border-radius:12px;padding:8px;margin-bottom:12px;">
        <div style="height:7px;background:rgba(0,0,0,0.5);border-radius:99px;overflow:hidden;margin-bottom:2px;">
          <div style="height:100%;border-radius:99px;background:linear-gradient(90deg,#059669,#34d399);width:${heroHpPct}%;"></div>
        </div>
        <div style="font-family:'Fira Code',monospace;font-size:8px;color:#065f46;">${fmt(heroHp)} HP</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        <button onclick="window._simAttack()" style="padding:12px;font-family:Orbitron,sans-serif;font-size:9px;font-weight:900;border-radius:10px;cursor:pointer;border:2px solid rgba(232,121,249,0.6);color:#e879f9;background:rgba(232,121,249,0.12);text-transform:uppercase;">⚔ ATACAR</button>
        <button onclick="window._simFlee()" style="padding:12px;font-family:Orbitron,sans-serif;font-size:9px;font-weight:900;border-radius:10px;cursor:pointer;border:2px solid rgba(113,113,122,0.5);color:#a1a1aa;background:rgba(0,0,0,0.3);text-transform:uppercase;">🚪 SAIR</button>
      </div>`;
    try { if (typeof lucide!=='undefined') lucide.createIcons(); } catch(e){}
  }

  window._simStart  = startSimulacro;
  window._simAttack = simAttack;
  window._simFlee   = () => { simState = null; renderSimulacro(); };

  /* ── Hook killMonster para salvar simulacro record ─────── */
  function hookKillMonster() {
    if (!rdy()) return;
    const _orig = rpg.killMonster.bind(rpg);
    rpg.killMonster = function() {
      const r = _orig.apply(this, arguments);
      if (this.monster && (this.monster.isBoss || this.bossKills > 0)) {
        try { saveSimRecord(); } catch(e){}
      }
      return r;
    };
  }

  /* ── open functions (called from HTML buttons) ─────────── */
  window.openTower     = () => { openEndGameModal('tower');      renderTower(); };
  window.openFracture  = () => { openEndGameModal('fracture');   renderFracture(); };
  window.openSimulacro = () => { openEndGameModal('simulacro');  renderSimulacro(); };

  function openEndGameModal(which) {
    ['tower','fracture','simulacro'].forEach(w => {
      const el = document.getElementById('endgame-'+w+'-section');
      if (el) el.style.display = w===which ? 'block' : 'none';
    });
    const m = document.getElementById('endgame-modal');
    if (m) { m.classList.add('active'); try { if (typeof lucide!=='undefined') lucide.createIcons(); } catch(e){} }
  }

  /* ── Inject modal HTML ──────────────────────────────────── */
  function injectModal() {
    if (document.getElementById('endgame-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'endgame-modal';
    modal.className = 'modal-overlay fixed inset-0 flex items-center justify-center';
    modal.innerHTML = `
      <div class="modal-content glass-panel bg-zinc-900/95 w-11/12 max-w-md rounded-2xl shadow-2xl" style="max-height:88vh;display:flex;flex-direction:column;">
        <div style="padding:16px 20px 12px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;">
          <div style="display:flex;gap:6px;">
            <button onclick="openTower()" class="endgame-tab" data-tab="tower" style="padding:5px 10px;background:rgba(249,115,22,0.15);border:1px solid rgba(249,115,22,0.35);border-radius:7px;font-family:Orbitron,sans-serif;font-size:7.5px;font-weight:900;color:#fb923c;cursor:pointer;">🗼 Torre</button>
            <button onclick="openFracture()" class="endgame-tab" data-tab="fracture" style="padding:5px 10px;background:rgba(129,140,248,0.12);border:1px solid rgba(129,140,248,0.3);border-radius:7px;font-family:Orbitron,sans-serif;font-size:7.5px;font-weight:900;color:#818cf8;cursor:pointer;">🌀 Fratura</button>
            <button onclick="openSimulacro()" class="endgame-tab" data-tab="simulacro" style="padding:5px 10px;background:rgba(232,121,249,0.12);border:1px solid rgba(232,121,249,0.3);border-radius:7px;font-family:Orbitron,sans-serif;font-size:7.5px;font-weight:900;color:#e879f9;cursor:pointer;">🎭 Simulacro</button>
          </div>
          <button onclick="closeModal('endgame-modal')" class="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition text-zinc-400"><i data-lucide="x" class="w-4 h-4"></i></button>
        </div>
        <div style="overflow-y:auto;padding:16px;flex:1;" class="hide-scrollbar">
          <div id="endgame-tower-section">    <div id="tower-body"></div></div>
          <div id="endgame-fracture-section"  style="display:none;"><div id="fracture-body"></div></div>
          <div id="endgame-simulacro-section" style="display:none;"><div id="simulacro-body"></div></div>
        </div>
      </div>`;
    document.body.appendChild(modal);
  }

  /* ── Init ────────────────────────────────────────────────── */
  function init() {
    injectModal();
    wait(() => {
      hookKillMonster();
      renderTower();
      renderFracture();
      renderSimulacro();
      console.log('[EndGameTower] ✅ Torre, Fracturas e Simulacro prontos');
    });
  }

  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
