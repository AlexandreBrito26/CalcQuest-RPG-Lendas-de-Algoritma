// ═══════════════════════════════════════════════════════════════
// MODULE: endgame-social.js
// ─────────────────────────────────────────────────────────────
// 1. Ascensão de Classe — após P.50, forma "Além" com mecânica única
// 2. Torneio de Ciclo   — ranking de quem chegou mais longe no NG+
// 3. Boss Lendário Semanal — seed semanal, top-10, títulos exclusivos
// 4. Masmorra Cooperativa — 2 saves enfrentam boss com HP somado
// ═══════════════════════════════════════════════════════════════
(function EndGameSocial() {
  'use strict';

  /* ── helpers ─────────────────────────────────────────────── */
  function rdy() { return typeof rpg !== 'undefined' && rpg && typeof rpg.save === 'function'; }
  function wait(cb, n) { if (rdy()) { cb(); return; } if ((n||0)<200) setTimeout(()=>wait(cb,(n||0)+1),100); }
  function fmt(n) {
    if (n>=1e12) return (n/1e12).toFixed(1)+'T'; if (n>=1e9)  return (n/1e9).toFixed(1)+'B';
    if (n>=1e6)  return (n/1e6).toFixed(1)+'M';  if (n>=1e3)  return (n/1e3).toFixed(1)+'K';
    return String(Math.floor(n));
  }
  function toast(msg,ms) { if (typeof showToast==='function') showToast(msg,ms||4000); }
  function lang() { return rdy() ? (rpg.lang||'pt') : 'pt'; }
  function weekKey() {
    const d = new Date(), y = d.getFullYear();
    const w = Math.ceil((((d-new Date(y,0,1))/86400000)+new Date(y,0,1).getDay()+1)/7);
    return y+'-W'+w;
  }

  /* ══════════════════════════════════════════════════════════
     1. ASCENSÃO DE CLASSE — forma "Além" após P.50
     Cada classe base pode ascender a uma forma especial com
     mecânica única: efeito passivo + habilidade especial.
  ══════════════════════════════════════════════════════════ */
  const BEYOND_CLASSES = [
    {
      id: 'beyond_warrior',  base: 'warrior',
      name: { pt: 'Guerreiro Eterno',     en: 'Eternal Warrior'     },
      icon: '⚔', color: '#f87171',
      desc: { pt: 'Cada hit que sobrevive cura 3% HP. ATK +400%.', en: 'Each survived hit heals 3% HP. ATK +400%.' },
      multHp: 3.0, multAtk: 5.0, addCrit: 0.15, addDodge: 0.05,
      special: 'eternal_regen',
      mechanic: { pt: 'Regeneração a cada dano recebido', en: 'Regeneration on each hit taken' },
    },
    {
      id: 'beyond_mage',     base: 'mage',
      name: { pt: 'Arquimago do Abismo',  en: 'Abyssal Archmage'    },
      icon: '🔮', color: '#c084fc',
      desc: { pt: 'Críticos causam Cadeia: +1 hit extra nos próximos 2 ataques. ATK +600%.', en: 'Crits trigger Chain: +1 extra hit next 2 attacks. ATK +600%.' },
      multHp: 1.5, multAtk: 7.0, addCrit: 0.35, addDodge: 0.0,
      special: 'crit_chain',
      mechanic: { pt: 'Crítico → 2 ataques seguintes são duplos', en: 'Crit → next 2 attacks are doubled' },
    },
    {
      id: 'beyond_rogue',    base: 'rogue',
      name: { pt: 'Sombra Absoluta',      en: 'Absolute Shadow'     },
      icon: '🌑', color: '#818cf8',
      desc: { pt: 'Dodge ativa Furtividade: próximo ataque é +300% dano garantido. Dodge +40%.', en: 'Dodge triggers Stealth: next attack +300% guaranteed. Dodge +40%.' },
      multHp: 1.8, multAtk: 4.0, addCrit: 0.30, addDodge: 0.40,
      special: 'stealth_strike',
      mechanic: { pt: 'Esquiva → próximo ataque triplo garantido', en: 'Dodge → next attack triple guaranteed' },
    },
    {
      id: 'beyond_paladin',  base: 'paladin',
      name: { pt: 'Arauto do Juízo',      en: 'Herald of Judgment'  },
      icon: '🛡', color: '#fbbf24',
      desc: { pt: 'Absorve 20% de qualquer dano. HP +700%. Armadura escala com HP perdido.', en: 'Absorbs 20% of all damage. HP +700%. Armor scales with lost HP.' },
      multHp: 8.0, multAtk: 2.0, addCrit: 0.10, addDodge: 0.10,
      special: 'divine_barrier',
      mechanic: { pt: 'Bloqueia 20% do dano a cada golpe', en: 'Blocks 20% of damage each hit' },
    },
    {
      id: 'beyond_cyber_ninja', base: 'cyber_ninja',
      name: { pt: 'Espectro Digital',     en: 'Digital Specter'     },
      icon: '💻', color: '#38bdf8',
      desc: { pt: 'A cada 3 ataques dispara um Ataque Fantasma automático. Crit +50%.', en: 'Every 3 attacks fires an auto Phantom Strike. Crit +50%.' },
      multHp: 2.0, multAtk: 5.0, addCrit: 0.50, addDodge: 0.35,
      special: 'phantom_strike',
      mechanic: { pt: 'A cada 3 ataques: hit automático extra', en: 'Every 3 attacks: free extra hit' },
    },
    {
      id: 'beyond_netrunner', base: 'netrunner',
      name: { pt: 'Deus da Rede',         en: 'Network God'         },
      icon: '🕸', color: '#6ee7b7',
      desc: { pt: 'Hackeia o boss: reduz defesa em 50% por 3 turnos. Ativa a cada 5 ataques.', en: 'Hacks boss: -50% defense for 3 turns. Triggers every 5 attacks.' },
      multHp: 2.5, multAtk: 4.5, addCrit: 0.25, addDodge: 0.20,
      special: 'hack_defense',
      mechanic: { pt: 'A cada 5 ataques: hack reduz defesa boss', en: 'Every 5 attacks: hack reduces boss defense' },
    },
  ];

  const BEYOND_SAVE = 'rpg_beyond_classes';

  function getUnlockedBeyond() {
    try { return JSON.parse(localStorage.getItem(BEYOND_SAVE)||'[]'); } catch(e) { return []; }
  }

  function canAscend(baseClassId) {
    if (!rdy()) return false;
    return (rpg.prestigeLevel||0) >= 50 && rpg.eqClass === baseClassId;
  }

  function ascendClass(beyondId) {
    if (!rdy()) return;
    const bc = BEYOND_CLASSES.find(b=>b.id===beyondId);
    if (!bc) return;
    if (!canAscend(bc.base)) { toast('🔒 Requer P.50 e classe base equipada!',3000); return; }
    const cost = 5000000;
    if (rpg.gold < cost) { toast(`💰 Requer ${fmt(cost)} Ouro para ascender!`,3000); return; }
    rpg.gold -= cost;
    const unlocked = getUnlockedBeyond();
    if (!unlocked.includes(beyondId)) {
      unlocked.push(beyondId);
      localStorage.setItem(BEYOND_SAVE, JSON.stringify(unlocked));
    }
    // Inject into rpg.classes
    injectBeyondClass(bc);
    // Equip it
    rpg.eqClass = beyondId;
    localStorage.setItem('rpg_class', beyondId);
    applyBeyondSpecial(bc.special);
    rpg.save(); rpg.updateUI();
    toast(`✨ ASCENSÃO: ${bc.icon} ${bc.name[lang()]}! ${bc.desc[lang()]}`,7000);
    renderAscension();
  }
  window._ascendClass = ascendClass;

  function injectBeyondClass(bc) {
    if (!rdy()) return;
    if (rpg.classes[bc.id]) return;
    rpg.classes[bc.id] = {
      id: bc.id, name: bc.name, icon: 'sparkles',
      desc: bc.desc, multHp: bc.multHp, multAtk: bc.multAtk,
      addCrit: bc.addCrit, addDodge: bc.addDodge,
      reqBosses: 0, isPrestige: true, isBeyond: true, special: bc.special,
    };
  }

  function applyBeyondSpecial(special) {
    if (!rdy()) return;
    if (rpg['_beyond_'+special+'_patched']) return;
    rpg['_beyond_'+special+'_patched'] = true;

    if (special === 'eternal_regen') {
      const _orig = rpg.takeDamage ? rpg.takeDamage.bind(rpg) : null;
      if (_orig) {
        rpg.takeDamage = function(dmg) {
          _orig(dmg);
          if (this.eqClass === 'beyond_warrior') {
            const heal = Math.floor(this.getMaxHp()*0.03);
            this.heroHp = Math.min(this.getMaxHp(), (this.heroHp||0) + heal);
          }
        };
      }
    }
    if (special === 'crit_chain') {
      rpg._beyondChainCount = 0;
      const _orig = rpg.getAtk ? rpg.getAtk.bind(rpg) : null;
      if (_orig) {
        rpg.getAtk = function() {
          const base = _orig.apply(this,arguments);
          if (this.eqClass === 'beyond_mage' && this._beyondChainCount > 0) {
            this._beyondChainCount--;
            return base * 2;
          }
          return base;
        };
      }
      // Hook crit trigger
      const _origAtk = rpg.playerAttack ? rpg.playerAttack.bind(rpg) : null;
      if (_origAtk) {
        rpg.playerAttack = function() {
          const wasCrit = this.eqClass==='beyond_mage' && Math.random()<this.getCritChance();
          const r = _origAtk.apply(this,arguments);
          if (wasCrit) this._beyondChainCount = 2;
          return r;
        };
      }
    }
    if (special === 'stealth_strike') {
      rpg._beyondStealthReady = false;
      const _origDodge = rpg.getDodgeChance ? rpg.getDodgeChance.bind(rpg) : null;
      if (_origDodge) {
        rpg.getDodgeChance = function() {
          const base = _origDodge.apply(this,arguments);
          // After a dodge, mark stealth ready
          return base;
        };
      }
      const _origAtk = rpg.getAtk ? rpg.getAtk.bind(rpg) : null;
      if (_origAtk) {
        rpg.getAtk = function() {
          const base = _origAtk.apply(this,arguments);
          if (this.eqClass==='beyond_rogue' && this._beyondStealthReady) {
            this._beyondStealthReady = false;
            return base * 3;
          }
          return base;
        };
      }
    }
    if (special === 'divine_barrier') {
      const _orig = rpg.takeDamage ? rpg.takeDamage.bind(rpg) : null;
      if (_orig) {
        rpg.takeDamage = function(dmg) {
          if (this.eqClass === 'beyond_paladin') dmg = Math.floor(dmg * 0.80);
          _orig(dmg);
        };
      }
    }
    if (special === 'phantom_strike') {
      rpg._beyondPhantomCount = 0;
      const _origAtk = rpg.playerAttack ? rpg.playerAttack.bind(rpg) : null;
      if (_origAtk) {
        rpg.playerAttack = function() {
          const r = _origAtk.apply(this,arguments);
          if (this.eqClass === 'beyond_cyber_ninja') {
            this._beyondPhantomCount = ((this._beyondPhantomCount||0) + 1) % 3;
            if (this._beyondPhantomCount === 0 && this.monster && this.monster.hp > 0) {
              const extraDmg = Math.floor(this.getAtk() * 0.5);
              this.monster.hp = Math.max(0, this.monster.hp - extraDmg);
              if (typeof this.addLog === 'function') this.addLog('💻 Ataque Fantasma: -'+fmt(extraDmg),'text-cyan-300');
            }
          }
          return r;
        };
      }
    }
    if (special === 'hack_defense') {
      rpg._beyondHackCount = 0;
      rpg._beyondHackActive = 0;
      const _origMonsterDmg = rpg.monsterAttack ? rpg.monsterAttack.bind(rpg) : null;
      // Hack reduces boss attack temporarily (simulates defense reduction)
      const _origPlayerAtk = rpg.playerAttack ? rpg.playerAttack.bind(rpg) : null;
      if (_origPlayerAtk) {
        rpg.playerAttack = function() {
          if (this.eqClass === 'beyond_netrunner') {
            this._beyondHackCount = ((this._beyondHackCount||0) + 1) % 5;
            if (this._beyondHackCount === 0) {
              this._beyondHackActive = 3;
              toast('🕸 Hack ativo! Defesa do boss -50% por 3 turnos',2500);
            }
          }
          return _origPlayerAtk.apply(this,arguments);
        };
      }
    }
  }

  function initBeyondOnLoad() {
    if (!rdy()) return;
    const unlocked = getUnlockedBeyond();
    BEYOND_CLASSES.forEach(bc => {
      if (unlocked.includes(bc.id)) injectBeyondClass(bc);
    });
    // Re-apply special of currently equipped beyond class
    const cur = BEYOND_CLASSES.find(b=>b.id===rpg.eqClass);
    if (cur) applyBeyondSpecial(cur.special);
  }

  function renderAscension() {
    const box = document.getElementById('ascension-body');
    if (!box || !rdy()) return;
    const pl = rpg.prestigeLevel||0, l = lang();
    const unlocked = getUnlockedBeyond();
    const gold = rpg.gold||0;

    let html = `
      <div style="text-align:center;margin-bottom:14px;">
        <div style="font-family:Orbitron,sans-serif;font-size:18px;font-weight:900;color:#fbbf24;text-shadow:0 0 16px rgba(251,191,36,0.4);">✨ ASCENSÃO DE CLASSE</div>
        <div style="font-family:'Fira Code',monospace;font-size:9px;color:#78716c;margin-top:3px;">Forma "Além" — disponível a partir de P.50</div>
        <div style="margin-top:6px;display:inline-flex;gap:12px;">
          <span style="font-family:Orbitron,sans-serif;font-size:10px;color:#fb923c;">🔥 Prestígio ${pl}</span>
          <span style="font-family:Orbitron,sans-serif;font-size:10px;color:#fbbf24;">💰 ${fmt(gold)}</span>
        </div>
        ${pl<50?`<div style="margin-top:8px;padding:6px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25);border-radius:8px;font-size:9px;color:#f87171;font-family:Rajdhani,sans-serif;">🔒 Requer Prestígio 50 (atual: P.${pl})</div>`:''}
      </div>`;

    BEYOND_CLASSES.forEach(bc => {
      const isOwned   = unlocked.includes(bc.id);
      const isActive  = rdy() && rpg.eqClass === bc.id;
      const isBase    = rdy() && rpg.eqClass === bc.base;
      const canAfford = gold >= 5000000;
      const eligible  = pl >= 50 && isBase;
      const opacity   = isOwned||eligible ? 1 : (pl>=50 ? 0.7 : 0.4);

      html += `<div style="background:rgba(0,0,0,0.4);border:1px solid ${isActive?bc.color+'88':isOwned?bc.color+'44':'rgba(63,63,70,0.3)'};border-radius:12px;padding:12px;margin-bottom:8px;opacity:${opacity};">
        <div style="display:flex;align-items:flex-start;gap:10px;">
          <div style="font-size:24px;flex-shrink:0;filter:${isOwned?'drop-shadow(0 0 8px '+bc.color+')':'grayscale(.8)'};">${bc.icon}</div>
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
              <span style="font-family:Orbitron,sans-serif;font-size:10px;font-weight:900;color:${isOwned?bc.color:'#78716c'};">${bc.name[l]}</span>
              ${isActive?`<span style="font-family:Orbitron,monospace;font-size:7px;color:#34d399;padding:1px 5px;background:rgba(52,211,153,0.15);border:1px solid rgba(52,211,153,0.3);border-radius:4px;">ATIVA</span>`:''}
            </div>
            <div style="font-size:8.5px;color:#6b7280;font-family:Rajdhani,sans-serif;margin-bottom:4px;">${bc.desc[l]}</div>
            <div style="font-family:'Fira Code',monospace;font-size:7.5px;color:${bc.color}88;padding:3px 6px;background:rgba(0,0,0,0.3);border-radius:4px;display:inline-block;">
              ⚡ ${bc.mechanic[l]}
            </div>
            <div style="margin-top:5px;display:flex;gap:8px;font-family:'Fira Code',monospace;font-size:7px;color:#52525b;">
              <span>HP ×${bc.multHp}</span><span>ATK ×${bc.multAtk}</span><span>Crit +${Math.round(bc.addCrit*100)}%</span>
            </div>
          </div>
        </div>
        <div style="margin-top:8px;padding-top:6px;border-top:1px solid rgba(255,255,255,0.04);">
          <div style="font-family:'Fira Code',monospace;font-size:7.5px;color:#44403c;margin-bottom:6px;">
            🔓 Base: ${bc.base.replace('_',' ').toUpperCase()} · 💰 5M Ouro · 🏆 P.50+
          </div>
          ${isActive
            ? `<div style="text-align:center;padding:4px;background:rgba(52,211,153,0.1);border:1px solid rgba(52,211,153,0.25);border-radius:6px;font-family:Orbitron,monospace;font-size:8px;color:#34d399;">✓ FORMA ALÉM ATIVA</div>`
            : isOwned
              ? `<button onclick="window._beyondEquip('${bc.id}')" style="width:100%;padding:5px;background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.35);border-radius:7px;font-family:Orbitron,monospace;font-size:8px;font-weight:900;color:#818cf8;cursor:pointer;">EQUIPAR FORMA ALÉM</button>`
              : eligible && canAfford
                ? `<button onclick="window._ascendClass('${bc.id}')" style="width:100%;padding:5px;background:linear-gradient(135deg,rgba(251,191,36,0.2),rgba(251,146,60,0.15));border:1px solid rgba(251,191,36,0.4);border-radius:7px;font-family:Orbitron,monospace;font-size:8px;font-weight:900;color:#fbbf24;cursor:pointer;">✨ ASCENDER — 5M Ouro</button>`
                : eligible
                  ? `<div style="text-align:center;font-family:Orbitron,monospace;font-size:8px;color:#52525b;">💰 Sem Ouro suficiente (5M)</div>`
                  : `<div style="text-align:center;font-family:Orbitron,monospace;font-size:8px;color:#3f3f46;">🔒 Equipa a classe base primeiro</div>`
          }
        </div>
      </div>`;
    });

    box.innerHTML = html;
    try { if (typeof lucide!=='undefined') lucide.createIcons(); } catch(e){}
  }

  window._beyondEquip = function(id) {
    if (!rdy()) return;
    const bc = BEYOND_CLASSES.find(b=>b.id===id);
    if (!bc) return;
    rpg.eqClass = id;
    localStorage.setItem('rpg_class', id);
    applyBeyondSpecial(bc.special);
    rpg.save(); rpg.updateUI();
    toast(`${bc.icon} ${bc.name[lang()]} equipada!`, 3000);
    renderAscension();
  };

  /* ══════════════════════════════════════════════════════════
     2. TORNEIO DE CICLO — ranking por NG+ ativo
  ══════════════════════════════════════════════════════════ */
  const CYCLE_LOG_KEY = 'rpg_cycle_log';

  function getCycleNg() { return parseInt(localStorage.getItem('rpg_ng_plus')||'0'); }

  function recordCycleEntry(lvl) {
    if (!rdy()) return;
    const ng = getCycleNg();
    if (!ng) return;
    const log = JSON.parse(localStorage.getItem(CYCLE_LOG_KEY)||'[]');
    const week = weekKey();
    // Update existing entry for this run or add new
    const existing = log.findIndex(e=>e.week===week && e.heroName===rpg.heroName);
    const entry = { heroName: rpg.heroName, level: lvl, ng, week, prestige: rpg.prestigeLevel||0, ts: Date.now() };
    if (existing>=0) { if (lvl > log[existing].level) log[existing] = entry; }
    else { log.unshift(entry); }
    localStorage.setItem(CYCLE_LOG_KEY, JSON.stringify(log.slice(0,100)));
  }

  function renderCycleTourney() {
    const box = document.getElementById('cycle-body');
    if (!box) return;
    const log  = JSON.parse(localStorage.getItem(CYCLE_LOG_KEY)||'[]');
    const week = weekKey();
    const ng   = getCycleNg();
    const thisWeek = log.filter(e=>e.week===week).sort((a,b)=>b.level-a.level||b.ng-a.ng);
    const allTime  = [...log].sort((a,b)=>b.ng-a.ng||b.level-a.level).slice(0,10);

    const rankRows = (arr, showNg) => arr.slice(0,10).map((e,i)=>`
      <div style="display:flex;gap:8px;align-items:center;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
        <span style="font-family:Orbitron,monospace;font-size:9px;color:${i<3?['#fbbf24','#a1a1aa','#b45309'][i]:'#52525b'};width:18px;">${i+1}</span>
        <span style="flex:1;font-size:9px;color:#e7e5e4;font-family:Rajdhani,sans-serif;">${e.heroName}</span>
        ${showNg?`<span style="font-family:'Fira Code',monospace;font-size:8px;color:#a78bfa;">NG+${e.ng}</span>`:''}
        <span style="font-family:'Fira Code',monospace;font-size:8px;color:#34d399;">Lvl ${e.level}</span>
      </div>`).join('') || '<div style="font-size:9px;color:#52525b;text-align:center;padding:8px;">Sem registos.</div>';

    box.innerHTML = `
      <div style="text-align:center;margin-bottom:14px;">
        <div style="font-family:Orbitron,sans-serif;font-size:17px;font-weight:900;color:#a78bfa;text-shadow:0 0 16px rgba(167,139,250,0.4);">🔁 TORNEIO DE CICLO</div>
        <div style="font-family:'Fira Code',monospace;font-size:9px;color:#78716c;margin-top:3px;">Ranking de nível máximo por NG+</div>
        <div style="margin-top:6px;font-family:Orbitron,sans-serif;font-size:10px;color:#c4b5fd;">Ciclo atual: NG+${ng} · Semana ${week}</div>
      </div>
      ${ng>0?`<button onclick="window._cycleRecord()" style="width:100%;padding:9px;font-family:Orbitron,sans-serif;font-size:8.5px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;border-radius:10px;cursor:pointer;border:1px solid rgba(167,139,250,0.4);color:#a78bfa;background:rgba(167,139,250,0.1);margin-bottom:12px;">📋 REGISTAR NÍVEL ATUAL (${rdy()?(rpg.level||1):1})</button>`:'<div style="text-align:center;padding:8px;font-size:9px;color:#52525b;margin-bottom:10px;">🔒 Requer pelo menos NG+1</div>'}
      <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(167,139,250,0.15);border-radius:12px;padding:12px;margin-bottom:10px;">
        <div style="font-family:Orbitron,monospace;font-size:7.5px;font-weight:900;color:#4c1d95;letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px;">🗓 Esta Semana</div>
        ${rankRows(thisWeek, true)}
      </div>
      <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(109,40,217,0.15);border-radius:12px;padding:12px;">
        <div style="font-family:Orbitron,monospace;font-size:7.5px;font-weight:900;color:#3b0764;letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px;">🏆 Todos os Tempos</div>
        ${rankRows(allTime, true)}
      </div>`;
    try { if (typeof lucide!=='undefined') lucide.createIcons(); } catch(e){}
  }

  window._cycleRecord = function() {
    if (!rdy()) return;
    recordCycleEntry(rpg.level||1);
    toast('📋 Nível registado no Torneio de Ciclo!',3000);
    renderCycleTourney();
  };

  /* ══════════════════════════════════════════════════════════
     3. BOSS LENDÁRIO SEMANAL — seed da semana, títulos exclusivos
  ══════════════════════════════════════════════════════════ */
  const WLB_KEY   = 'rpg_wlb_data';
  const WLB_BOARD = 'rpg_wlb_board';

  const LEGENDARY_TITLES = [
    { rank:1,  title:{pt:'⚔ Campeão da Semana',   en:'⚔ Champion of the Week'}, color:'#fbbf24' },
    { rank:2,  title:{pt:'🥈 Vice-Campeão',        en:'🥈 Vice-Champion'},        color:'#a1a1aa' },
    { rank:3,  title:{pt:'🥉 Terceiro Lendário',   en:'🥉 Third Legend'},         color:'#b45309' },
    { rank:10, title:{pt:'🏅 Top 10 Semanal',      en:'🏅 Weekly Top 10'},        color:'#6ee7b7' },
  ];

  function getLegendaryBossData() {
    const w = weekKey();
    const saved = JSON.parse(localStorage.getItem(WLB_KEY)||'{}');
    if (saved.week === w) return saved;
    // Generate new weekly boss from seed
    const seed = w.split('').reduce((a,c)=>a+c.charCodeAt(0),0);
    const bossNames = [
      {pt:'Kronos, o Devorador de Tempos',   en:'Kronos, Devourer of Times'},
      {pt:'Nemesis, a Entidade Absoluta',     en:'Nemesis, the Absolute Entity'},
      {pt:'Axioma, o Primeiro Bug',           en:'Axiom, the First Bug'},
      {pt:'Paradoxo, o Sem-Forma',            en:'Paradox, the Formless'},
      {pt:'Entropia, o Fim do Código',        en:'Entropy, End of Code'},
      {pt:'Singularidade Prime',              en:'Prime Singularity'},
      {pt:'Compilador das Sombras',           en:'Shadow Compiler'},
      {pt:'Ω, o Algoritmo Final',             en:'Ω, the Final Algorithm'},
    ];
    const scales = [2, 3, 5, 8, 13, 21, 34, 55];
    const idx = seed % bossNames.length;
    const scale = scales[seed % scales.length];
    const data = {
      week: w, idx,
      name: bossNames[idx],
      scale,
      baseHp: 1000000 * scale,
      baseDmg: 50000  * scale,
    };
    localStorage.setItem(WLB_KEY, JSON.stringify(data));
    return data;
  }

  let wlbState = null;

  function startWLB() {
    if (!rdy()) return;
    const bd = getLegendaryBossData();
    const maxHp = Math.floor(bd.baseHp * (1 + (rpg.prestigeLevel||0)*0.1));
    wlbState = {
      boss: { name: bd.name, hp: maxHp, maxHp, dmg: bd.baseDmg },
      heroHp: rpg.getMaxHp(),
      totalDmg: 0,
      turns: 0,
      week: bd.week,
    };
    renderWLB();
  }

  function wlbAttack() {
    if (!wlbState||!rdy()) return;
    const atk  = rpg.getAtk ? rpg.getAtk() : 100;
    const crit = rpg.getCritChance ? rpg.getCritChance() : 0.1;
    const dmg  = Math.floor(atk * (Math.random()<crit ? 2 : 1));
    wlbState.boss.hp = Math.max(0, wlbState.boss.hp - dmg);
    wlbState.totalDmg += dmg;
    wlbState.turns++;
    if (wlbState.boss.hp > 0) {
      const dodge = rpg.getDodgeChance ? rpg.getDodgeChance() : 0.05;
      if (Math.random()>dodge) wlbState.heroHp = Math.max(0, wlbState.heroHp - wlbState.boss.dmg);
    }
    if (wlbState.heroHp<=0 || wlbState.boss.hp<=0) { wlbEnd(wlbState.boss.hp<=0); return; }
    renderWLB();
  }

  function wlbEnd(win) {
    if (!wlbState||!rdy()) return;
    const board = JSON.parse(localStorage.getItem(WLB_BOARD)||'[]');
    const entry = { heroName: rpg.heroName, dmg: wlbState.totalDmg, win, week: wlbState.week, ts: Date.now(), prestige: rpg.prestigeLevel||0 };
    // Only keep best run per hero per week
    const existing = board.findIndex(e=>e.heroName===rpg.heroName && e.week===wlbState.week);
    if (existing>=0) { if (wlbState.totalDmg>board[existing].dmg) board[existing]=entry; }
    else { board.unshift(entry); }
    const sorted = board.filter(e=>e.week===wlbState.week).sort((a,b)=>b.dmg-a.dmg);
    const myRank = sorted.findIndex(e=>e.heroName===rpg.heroName) + 1;
    // Assign title based on rank
    const titleObj = LEGENDARY_TITLES.find(t=>myRank<=t.rank);
    if (titleObj && myRank<=10) {
      if (!rpg._wlbTitles) rpg._wlbTitles = [];
      const tLabel = titleObj.title[lang()];
      if (!rpg._wlbTitles.includes(tLabel)) rpg._wlbTitles.push(tLabel);
      toast(`🏆 Rank #${myRank}! Título: ${tLabel}`,7000);
    }
    // Gold reward
    const goldReward = win ? Math.floor(wlbState.totalDmg * 0.001) : Math.floor(wlbState.totalDmg * 0.0001);
    rpg.gold += goldReward;
    localStorage.setItem(WLB_BOARD, JSON.stringify(board.slice(0,200)));
    rpg.save(); rpg.updateUI();
    toast(`${win?'🏆 Lendário VENCIDO!':'💀 Boss sobreviveu…'} DMG: ${fmt(wlbState.totalDmg)} · +${fmt(goldReward)} Ouro`, 6000);
    wlbState = null;
    renderWLB();
  }

  function renderWLB() {
    const box = document.getElementById('wlb-body');
    if (!box) return;
    const bd = getLegendaryBossData();
    const board = JSON.parse(localStorage.getItem(WLB_BOARD)||'[]');
    const thisWeek = board.filter(e=>e.week===bd.week).sort((a,b)=>b.dmg-a.dmg);
    const l = lang();

    if (!wlbState) {
      const rankRows = thisWeek.slice(0,10).map((e,i)=>{
        const titleObj = LEGENDARY_TITLES.find(t=>(i+1)<=t.rank);
        return `<div style="display:flex;gap:6px;align-items:center;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
          <span style="font-family:Orbitron,monospace;font-size:9px;color:${i<3?['#fbbf24','#a1a1aa','#b45309'][i]:'#52525b'};width:18px;">${i+1}</span>
          <span style="flex:1;font-size:9px;color:#e7e5e4;font-family:Rajdhani,sans-serif;">${e.heroName}</span>
          ${titleObj?`<span style="font-size:8px;color:${titleObj.color};">${e.win?'💀':'⚔'}</span>`:''}
          <span style="font-family:'Fira Code',monospace;font-size:8px;color:#fb923c;">${fmt(e.dmg)}</span>
        </div>`;
      }).join('') || '<div style="font-size:9px;color:#52525b;text-align:center;padding:8px;">Nenhuma tentativa esta semana.</div>';

      box.innerHTML = `
        <div style="text-align:center;margin-bottom:14px;">
          <div style="font-family:Orbitron,sans-serif;font-size:16px;font-weight:900;color:#ef4444;text-shadow:0 0 16px rgba(239,68,68,0.4);">💀 BOSS LENDÁRIO SEMANAL</div>
          <div style="font-family:'Fira Code',monospace;font-size:9px;color:#78716c;margin-top:3px;">Seed da semana ${bd.week}</div>
        </div>
        <div style="background:linear-gradient(135deg,rgba(127,29,29,0.4),rgba(69,10,10,0.2));border:1px solid rgba(239,68,68,0.3);border-radius:12px;padding:14px;margin-bottom:10px;text-align:center;">
          <div style="font-size:28px;margin-bottom:4px;">💀</div>
          <div style="font-family:Orbitron,sans-serif;font-size:13px;font-weight:900;color:#f87171;">${bd.name[l]}</div>
          <div style="font-family:'Fira Code',monospace;font-size:9px;color:#7f1d1d;margin-top:4px;">HP: ${fmt(bd.baseHp)} · Escala ×${bd.scale}</div>
          <div style="margin-top:6px;font-size:8px;color:#991b1b;font-family:Rajdhani,sans-serif;">Top 10 ganham títulos exclusivos permanentes</div>
        </div>
        <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(239,68,68,0.15);border-radius:12px;padding:12px;margin-bottom:12px;">
          <div style="font-family:Orbitron,monospace;font-size:7.5px;font-weight:900;color:#7f1d1d;letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px;">📋 Placar desta Semana</div>
          ${rankRows}
        </div>
        <button onclick="window._wlbStart()" style="width:100%;padding:14px;font-family:Orbitron,sans-serif;font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;border-radius:12px;cursor:pointer;border:2px solid rgba(239,68,68,0.6);color:#f87171;background:linear-gradient(135deg,rgba(239,68,68,0.2),rgba(127,29,29,0.1));box-shadow:0 0 16px rgba(239,68,68,0.25);">
          💀 DESAFIAR O LENDÁRIO
        </button>`;
      return;
    }
    const { boss, heroHp, totalDmg, turns } = wlbState;
    const bossHpPct = Math.max(0, Math.round((boss.hp/boss.maxHp)*100));
    const heroHpPct = rdy() ? Math.max(0, Math.round((heroHp/rpg.getMaxHp())*100)) : 0;
    box.innerHTML = `
      <div style="text-align:center;margin-bottom:10px;">
        <div style="font-family:Orbitron,sans-serif;font-size:12px;font-weight:900;color:#ef4444;">💀 ${boss.name[l]}</div>
        <div style="font-family:'Fira Code',monospace;font-size:8px;color:#78716c;">Turno ${turns} · DMG Total: ${fmt(totalDmg)}</div>
      </div>
      <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(239,68,68,0.3);border-radius:12px;padding:10px;margin-bottom:8px;">
        <div style="height:8px;background:rgba(0,0,0,0.5);border-radius:99px;overflow:hidden;margin-bottom:3px;">
          <div style="height:100%;border-radius:99px;background:linear-gradient(90deg,#7f1d1d,#ef4444);width:${bossHpPct}%;transition:width .3s;"></div>
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
        <button onclick="window._wlbAttack()" style="padding:12px;font-family:Orbitron,sans-serif;font-size:9px;font-weight:900;border-radius:10px;cursor:pointer;border:2px solid rgba(239,68,68,0.6);color:#f87171;background:rgba(239,68,68,0.12);text-transform:uppercase;">⚔ ATACAR</button>
        <button onclick="window._wlbFlee()" style="padding:12px;font-family:Orbitron,sans-serif;font-size:9px;font-weight:900;border-radius:10px;cursor:pointer;border:2px solid rgba(113,113,122,0.5);color:#a1a1aa;background:rgba(0,0,0,0.3);text-transform:uppercase;">🏃 RETIRAR</button>
      </div>`;
    try { if (typeof lucide!=='undefined') lucide.createIcons(); } catch(e){}
  }

  window._wlbStart  = startWLB;
  window._wlbAttack = wlbAttack;
  window._wlbFlee   = () => { wlbEnd(false); };

  /* ══════════════════════════════════════════════════════════
     4. MASMORRA COOPERATIVA — 2 saves, boss com HP somado
  ══════════════════════════════════════════════════════════ */
  let coopDungeonState = null;

  function exportCoopProfile() {
    if (!rdy()) return;
    const profile = {
      heroName:  rpg.heroName,
      level:     rpg.level,
      atk:       rpg.getAtk ? rpg.getAtk() : 100,
      hp:        rpg.getMaxHp ? rpg.getMaxHp() : 1000,
      crit:      rpg.getCritChance ? rpg.getCritChance() : 0.1,
      dodge:     rpg.getDodgeChance ? rpg.getDodgeChance() : 0.05,
      prestige:  rpg.prestigeLevel||0,
      className: rpg.classes[rpg.eqClass]?.name?.[lang()]||'Guerreiro',
    };
    try {
      const code = btoa(JSON.stringify(profile));
      navigator.clipboard.writeText(code).then(()=>toast('📋 Código copiado! Partilha com o teu parceiro.',4000));
    } catch(e) { toast('Erro ao copiar.'); }
  }

  function importCoopPartner(code) {
    if (!code) return null;
    try { const p = JSON.parse(atob(code.trim())); if (!p.heroName||!p.atk) throw 0; return p; }
    catch(e) { toast('❌ Código inválido!',3000); return null; }
  }

  function startCoopDungeon(partnerCode) {
    if (!rdy()) return;
    const partner = importCoopPartner(partnerCode);
    if (!partner) return;
    // Boss HP = sum of both heroes HP × 3
    const myHp = rpg.getMaxHp ? rpg.getMaxHp() : 1000;
    const partnerHp = partner.hp;
    const bossMaxHp = Math.floor((myHp + partnerHp) * 3);
    const bossDmg   = Math.floor((myHp + partnerHp) * 0.05);
    const prestige  = Math.max(rpg.prestigeLevel||0, partner.prestige||0);
    coopDungeonState = {
      partner,
      boss: { name: {pt:'Guardião Dual',en:'Dual Guardian'}, hp: bossMaxHp, maxHp: bossMaxHp, dmg: bossDmg },
      myHp,
      partnerHpLeft: partnerHp,
      myHpLeft: myHp,
      turns: 0,
    };
    renderCoopDungeon();
    toast(`⚔ Masmorra Co-op iniciada com ${partner.heroName}! Boss HP: ${fmt(bossMaxHp)}`,5000);
  }

  function coopDungeonAttack() {
    if (!coopDungeonState||!rdy()) return;
    const { boss, partner } = coopDungeonState;
    // My attack
    const myAtk  = rpg.getAtk ? rpg.getAtk() : 100;
    const myCrit = rpg.getCritChance ? rpg.getCritChance() : 0.1;
    const myDmg  = Math.floor(myAtk * (Math.random()<myCrit ? 2 : 1));
    // Partner auto-attack (simulated)
    const partnerDmg = Math.floor(partner.atk * (Math.random()<partner.crit ? 2 : 1));
    boss.hp = Math.max(0, boss.hp - myDmg - partnerDmg);
    coopDungeonState.turns++;
    // Boss splits damage between both
    if (boss.hp > 0) {
      const bdmg = boss.dmg;
      if (Math.random() > (rpg.getDodgeChance?rpg.getDodgeChance():0.05))
        coopDungeonState.myHpLeft = Math.max(0, coopDungeonState.myHpLeft - Math.floor(bdmg*0.6));
      if (Math.random() > partner.dodge)
        coopDungeonState.partnerHpLeft = Math.max(0, coopDungeonState.partnerHpLeft - Math.floor(bdmg*0.4));
    }
    const bothDead = coopDungeonState.myHpLeft<=0 && coopDungeonState.partnerHpLeft<=0;
    if (boss.hp<=0) { coopDungeonEnd(true); return; }
    if (bothDead)   { coopDungeonEnd(false); return; }
    renderCoopDungeon();
  }

  function coopDungeonEnd(win) {
    if (!coopDungeonState||!rdy()) return;
    const { partner, boss, turns } = coopDungeonState;
    if (win) {
      const gold = Math.floor(boss.maxHp * 0.25);
      const xp   = Math.floor(boss.maxHp * 0.15);
      rpg.gold += gold; rpg.xp += xp;
      rpg.save(); rpg.updateUI();
      toast(`🤝 CO-OP VITÓRIA com ${partner.heroName}! +${fmt(gold)} Ouro · +${fmt(xp)} XP`, 6000);
    } else {
      toast(`💀 Derrota co-op… ambos caíram no Andar ${turns}.`, 4000);
    }
    coopDungeonState = null;
    renderCoopDungeon();
  }

  function renderCoopDungeon() {
    const box = document.getElementById('coop-dungeon-body');
    if (!box) return;
    const l = lang();

    if (!coopDungeonState) {
      box.innerHTML = `
        <div style="text-align:center;margin-bottom:14px;">
          <div style="font-family:Orbitron,sans-serif;font-size:17px;font-weight:900;color:#38bdf8;text-shadow:0 0 16px rgba(56,189,248,0.4);">🤝 MASMORRA COOPERATIVA</div>
          <div style="font-family:'Fira Code',monospace;font-size:9px;color:#78716c;margin-top:3px;">2 heróis vs 1 boss com HP somado</div>
        </div>
        <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(56,189,248,0.2);border-radius:12px;padding:12px;margin-bottom:10px;">
          <div style="font-family:Orbitron,monospace;font-size:7.5px;font-weight:900;color:#0c4a6e;letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px;">⚙ Como funciona</div>
          <div style="font-size:8.5px;color:#6b7280;font-family:Rajdhani,sans-serif;line-height:1.6;">
            1. Exporta o teu código e envia ao aliado.<br>
            2. O aliado envia o código dele de volta.<br>
            3. Cola o código do aliado e inicia.<br>
            <span style="color:#38bdf8;">O boss tem HP = (teu HP + HP aliado) × 3.<br>
            O aliado ataca automaticamente contigo.</span>
          </div>
        </div>
        <button onclick="window._coopExport()" style="width:100%;padding:10px;font-family:Orbitron,sans-serif;font-size:9px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;border-radius:10px;cursor:pointer;border:1px solid rgba(56,189,248,0.4);color:#38bdf8;background:rgba(56,189,248,0.1);margin-bottom:8px;">
          📤 EXPORTAR MEU CÓDIGO
        </button>
        <div style="display:flex;gap:8px;">
          <input id="coop-import-input" placeholder="Colar código do aliado…" style="flex:1;padding:8px;background:rgba(0,0,0,0.4);border:1px solid rgba(56,189,248,0.2);border-radius:8px;color:#e7e5e4;font-family:'Fira Code',monospace;font-size:8px;outline:none;">
          <button onclick="window._coopStart(document.getElementById('coop-import-input').value)" style="padding:8px 12px;font-family:Orbitron,sans-serif;font-size:8px;font-weight:900;border-radius:8px;cursor:pointer;border:1px solid rgba(56,189,248,0.4);color:#38bdf8;background:rgba(56,189,248,0.12);white-space:nowrap;">▶ INICIAR</button>
        </div>`;
      return;
    }

    const { boss, myHpLeft, partnerHpLeft, partner, turns } = coopDungeonState;
    const bossHpPct    = Math.max(0, Math.round((boss.hp/boss.maxHp)*100));
    const myHpPct      = Math.max(0, Math.round((myHpLeft/(rpg.getMaxHp()||1))*100));
    const partHpPct    = Math.max(0, Math.round((partnerHpLeft/partner.hp)*100));

    box.innerHTML = `
      <div style="text-align:center;margin-bottom:10px;">
        <div style="font-family:Orbitron,sans-serif;font-size:12px;font-weight:900;color:#38bdf8;">🤝 CO-OP · Turno ${turns}</div>
      </div>
      <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(239,68,68,0.3);border-radius:12px;padding:10px;margin-bottom:8px;">
        <div style="font-family:Rajdhani,sans-serif;font-size:12px;font-weight:700;color:#f87171;margin-bottom:4px;">👹 ${boss.name[l]}</div>
        <div style="height:8px;background:rgba(0,0,0,0.5);border-radius:99px;overflow:hidden;margin-bottom:3px;">
          <div style="height:100%;border-radius:99px;background:linear-gradient(90deg,#dc2626,#ef4444);width:${bossHpPct}%;transition:width .3s;"></div>
        </div>
        <div style="font-family:'Fira Code',monospace;font-size:7.5px;color:#7f1d1d;">${fmt(boss.hp)} / ${fmt(boss.maxHp)} HP</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:12px;">
        <div style="background:rgba(0,0,0,0.35);border:1px solid rgba(52,211,153,0.25);border-radius:10px;padding:8px;">
          <div style="font-family:Rajdhani,sans-serif;font-size:9px;font-weight:700;color:#34d399;margin-bottom:4px;">⚔ ${rdy()?(rpg.heroName||'Tu'):'Tu'}</div>
          <div style="height:6px;background:rgba(0,0,0,0.5);border-radius:99px;overflow:hidden;margin-bottom:2px;">
            <div style="height:100%;border-radius:99px;background:linear-gradient(90deg,#059669,#34d399);width:${myHpPct}%;"></div>
          </div>
          <div style="font-family:'Fira Code',monospace;font-size:7px;color:#065f46;">${fmt(myHpLeft)} HP</div>
        </div>
        <div style="background:rgba(0,0,0,0.35);border:1px solid rgba(56,189,248,0.25);border-radius:10px;padding:8px;">
          <div style="font-family:Rajdhani,sans-serif;font-size:9px;font-weight:700;color:#38bdf8;margin-bottom:4px;">🤝 ${partner.heroName}</div>
          <div style="height:6px;background:rgba(0,0,0,0.5);border-radius:99px;overflow:hidden;margin-bottom:2px;">
            <div style="height:100%;border-radius:99px;background:linear-gradient(90deg,#0369a1,#38bdf8);width:${partHpPct}%;"></div>
          </div>
          <div style="font-family:'Fira Code',monospace;font-size:7px;color:#0c4a6e;">${fmt(partnerHpLeft)} HP ${partnerHpLeft<=0?'💀':''}</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        <button onclick="window._coopAttack()" style="padding:12px;font-family:Orbitron,sans-serif;font-size:9px;font-weight:900;border-radius:10px;cursor:pointer;border:2px solid rgba(56,189,248,0.5);color:#38bdf8;background:rgba(56,189,248,0.12);text-transform:uppercase;">⚔ ATACAR</button>
        <button onclick="window._coopFlee()" style="padding:12px;font-family:Orbitron,sans-serif;font-size:9px;font-weight:900;border-radius:10px;cursor:pointer;border:2px solid rgba(113,113,122,0.5);color:#a1a1aa;background:rgba(0,0,0,0.3);text-transform:uppercase;">🚪 SAIR</button>
      </div>`;
    try { if (typeof lucide!=='undefined') lucide.createIcons(); } catch(e){}
  }

  window._coopExport = exportCoopProfile;
  window._coopStart  = (code) => { startCoopDungeon(code); };
  window._coopAttack = coopDungeonAttack;
  window._coopFlee   = () => { coopDungeonState=null; renderCoopDungeon(); };

  /* ── Modal compartilhado ──────────────────────────────────── */
  function injectModal() {
    if (document.getElementById('social-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'social-modal';
    modal.className = 'modal-overlay fixed inset-0 flex items-center justify-center';
    modal.innerHTML = `
      <div class="modal-content glass-panel bg-zinc-900/95 w-11/12 max-w-md rounded-2xl shadow-2xl" style="max-height:88vh;display:flex;flex-direction:column;">
        <div style="padding:14px 18px 10px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;flex-wrap:wrap;gap:4px;">
          <div style="display:flex;gap:4px;flex-wrap:wrap;">
            <button onclick="openSocialTab('ascension')"  style="padding:4px 8px;background:rgba(251,191,36,0.12);border:1px solid rgba(251,191,36,0.3);border-radius:6px;font-family:Orbitron,sans-serif;font-size:7px;font-weight:900;color:#fbbf24;cursor:pointer;">✨ Ascensão</button>
            <button onclick="openSocialTab('cycle')"      style="padding:4px 8px;background:rgba(167,139,250,0.1);border:1px solid rgba(167,139,250,0.25);border-radius:6px;font-family:Orbitron,sans-serif;font-size:7px;font-weight:900;color:#a78bfa;cursor:pointer;">🔁 Ciclo</button>
            <button onclick="openSocialTab('wlb')"        style="padding:4px 8px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25);border-radius:6px;font-family:Orbitron,sans-serif;font-size:7px;font-weight:900;color:#f87171;cursor:pointer;">💀 Lendário</button>
            <button onclick="openSocialTab('coop')"       style="padding:4px 8px;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.25);border-radius:6px;font-family:Orbitron,sans-serif;font-size:7px;font-weight:900;color:#38bdf8;cursor:pointer;">🤝 Co-op</button>
          </div>
          <button onclick="closeModal('social-modal')" class="p-1.5 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition text-zinc-400"><i data-lucide="x" class="w-4 h-4"></i></button>
        </div>
        <div style="overflow-y:auto;padding:16px;flex:1;" class="hide-scrollbar">
          <div id="ascension-section">     <div id="ascension-body"></div></div>
          <div id="cycle-section"       style="display:none;"><div id="cycle-body"></div></div>
          <div id="wlb-section"         style="display:none;"><div id="wlb-body"></div></div>
          <div id="coop-dungeon-section" style="display:none;"><div id="coop-dungeon-body"></div></div>
        </div>
      </div>`;
    document.body.appendChild(modal);
  }

  const SECTIONS = ['ascension','cycle','wlb','coop-dungeon'];
  const RENDERS  = {
    ascension: renderAscension,
    cycle:     renderCycleTourney,
    wlb:       renderWLB,
    'coop-dungeon': renderCoopDungeon,
  };

  window.openSocialTab = function(which) {
    SECTIONS.forEach(s => {
      const el = document.getElementById(s+'-section');
      if (el) el.style.display = s===which||s===which+'-dungeon'?'block':'none';
      // handle "coop" tab key → "coop-dungeon" section
      if (which==='coop' && s==='coop-dungeon') { if (el) el.style.display='block'; }
    });
    const key = which==='coop' ? 'coop-dungeon' : which;
    if (RENDERS[key]) RENDERS[key]();
    try { if (typeof lucide!=='undefined') lucide.createIcons(); } catch(e){}
  };

  // Public entry points from menu buttons
  window.openAscension   = () => { openSocialModal(); openSocialTab('ascension'); };
  window.openCycleTourney= () => { openSocialModal(); openSocialTab('cycle'); };
  window.openWeeklyBoss  = () => { openSocialModal(); openSocialTab('wlb'); };
  window.openCoopDungeon = () => { openSocialModal(); openSocialTab('coop'); };

  function openSocialModal() {
    const m = document.getElementById('social-modal');
    if (m) { m.classList.add('active'); try { if (typeof lucide!=='undefined') lucide.createIcons(); } catch(e){} }
  }

  /* ── Hook level-up to record cycle ──────────────────────── */
  function hookLevelUp() {
    if (!rdy()) return;
    const _orig = rpg.levelUp ? rpg.levelUp.bind(rpg) : null;
    if (!_orig) return;
    rpg.levelUp = function() {
      const r = _orig.apply(this,arguments);
      try { recordCycleEntry(this.level||1); } catch(e){}
      return r;
    };
  }

  /* ── Init ────────────────────────────────────────────────── */
  function init() {
    injectModal();
    wait(() => {
      initBeyondOnLoad();
      hookLevelUp();
      console.log('[EndGameSocial] ✅ Ascensão, Torneio de Ciclo, Boss Lendário, Co-op prontos');
    });
  }

  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
