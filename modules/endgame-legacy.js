// ═══════════════════════════════════════════════════════════════
// MODULE: endgame-legacy.js
// ─────────────────────────────────────────────────────────────
// 1. Árvore de Legado  — pontos perm. que persistem após NG+
// 2. Fragmentos de Deus — drops NG+3+, set de relíquias únicas
// 3. Forja de Runas 2.0 — combina 3 runas → Runa Ancestral
// 4. Grimório Oculto   — habilidades secretas por combos
// 5. Sistema de Mutações — mutações permanentes aleatórias
// ═══════════════════════════════════════════════════════════════
(function EndGameLegacy() {
  'use strict';

  function rdy() { return typeof rpg !== 'undefined' && rpg && typeof rpg.save === 'function'; }
  function wait(cb, n) { if (rdy()) { cb(); return; } if ((n||0)<200) setTimeout(()=>wait(cb,(n||0)+1),100); }
  function fmt(n) {
    if (n>=1e9) return (n/1e9).toFixed(1)+'B'; if (n>=1e6) return (n/1e6).toFixed(1)+'M';
    if (n>=1e3) return (n/1e3).toFixed(1)+'K'; return String(Math.floor(n));
  }
  function toast(msg,ms) { if (typeof showToast==='function') showToast(msg,ms||4000); }
  function lang() { return rdy() ? (rpg.lang||'pt') : 'pt'; }

  /* ══════════════════════════════════════════════════════════
     1. ÁRVORE DE LEGADO
  ══════════════════════════════════════════════════════════ */
  const LEGACY_NODES = [
    // Tier 1 (1pt each)
    { id:'leg_xp1',   tier:1, icon:'⭐', cost:1, req:[],              name:{pt:'Erudição I',    en:'Erudition I'},    desc:{pt:'+50% XP perm.',      en:'+50% XP perm.'},      apply: s=>{s.permXpBonus=(s.permXpBonus||0)+0.5}  },
    { id:'leg_gold1', tier:1, icon:'💰', cost:1, req:[],              name:{pt:'Cobiça I',      en:'Greed I'},        desc:{pt:'+50% Ouro perm.',     en:'+50% Gold perm.'},    apply: s=>{s.permGoldBonus=(s.permGoldBonus||0)+0.5} },
    { id:'leg_atk1',  tier:1, icon:'⚔', cost:1, req:[],              name:{pt:'Força I',       en:'Strength I'},     desc:{pt:'+30% ATK perm.',      en:'+30% ATK perm.'},     apply: s=>{s.permAtkBonus=(s.permAtkBonus||0)+0.3}  },
    { id:'leg_hp1',   tier:1, icon:'❤', cost:1, req:[],              name:{pt:'Vitalidade I',  en:'Vitality I'},     desc:{pt:'+30% HP perm.',       en:'+30% HP perm.'},      apply: s=>{s.permAllBonus=(s.permAllBonus||0)+0.3}  },
    // Tier 2 (2pts each, needs 1 tier-1)
    { id:'leg_xp2',   tier:2, icon:'📖', cost:2, req:['leg_xp1'],    name:{pt:'Erudição II',   en:'Erudition II'},   desc:{pt:'+120% XP perm.',     en:'+120% XP perm.'},     apply: s=>{s.permXpBonus=(s.permXpBonus||0)+1.2}  },
    { id:'leg_gold2', tier:2, icon:'💎', cost:2, req:['leg_gold1'],   name:{pt:'Cobiça II',     en:'Greed II'},       desc:{pt:'+120% Ouro perm.',    en:'+120% Gold perm.'},   apply: s=>{s.permGoldBonus=(s.permGoldBonus||0)+1.2} },
    { id:'leg_atk2',  tier:2, icon:'🗡', cost:2, req:['leg_atk1'],   name:{pt:'Força II',      en:'Strength II'},    desc:{pt:'+80% ATK perm.',      en:'+80% ATK perm.'},     apply: s=>{s.permAtkBonus=(s.permAtkBonus||0)+0.8}  },
    { id:'leg_hp2',   tier:2, icon:'💪', cost:2, req:['leg_hp1'],    name:{pt:'Vitalidade II', en:'Vitality II'},    desc:{pt:'+80% HP perm.',       en:'+80% HP perm.'},      apply: s=>{s.permAllBonus=(s.permAllBonus||0)+0.8}  },
    { id:'leg_crit1', tier:2, icon:'🎯', cost:2, req:['leg_atk1'],   name:{pt:'Precisão',      en:'Precision'},      desc:{pt:'+15% Crit perm.',     en:'+15% Crit perm.'},    apply: s=>{s.permCritBonus=(s.permCritBonus||0)+0.15} },
    // Tier 3 (3pts each, needs 2 tier-2)
    { id:'leg_all1',  tier:3, icon:'🌟', cost:3, req:['leg_xp2','leg_gold2'], name:{pt:'Ascensão',     en:'Ascension'},      desc:{pt:'+200% tudo perm.',    en:'+200% all perm.'},    apply: s=>{s.permAllBonus=(s.permAllBonus||0)+2.0} },
    { id:'leg_god1',  tier:3, icon:'⚡', cost:3, req:['leg_atk2','leg_hp2'],  name:{pt:'Forma Divina', en:'Divine Form'},    desc:{pt:'+500% ATK+HP perm.',  en:'+500% ATK+HP perm.'}, apply: s=>{s.permAtkBonus=(s.permAtkBonus||0)+5;s.permAllBonus=(s.permAllBonus||0)+5} },
    { id:'leg_luck',  tier:3, icon:'🍀', cost:3, req:['leg_crit1','leg_gold2'],name:{pt:'Fortuna',      en:'Fortune'},        desc:{pt:'+25% Crit+Dodge perm.',en:'+25% Crit+Dodge.'}, apply: s=>{s.permCritBonus=(s.permCritBonus||0)+0.25;s.permDodgeBonus=(s.permDodgeBonus||0)+0.25} },
    // Tier 4 (5pts — "impossible milestones")
    { id:'leg_omega', tier:4, icon:'♾', cost:5, req:['leg_all1','leg_god1','leg_luck'], name:{pt:'Ω Omega',en:'Ω Omega'}, desc:{pt:'+2000% stats, Poções ∞ (1000)', en:'+2000% all, Potions ∞(1000)'}, apply: s=>{s.permAllBonus=(s.permAllBonus||0)+20;s.potions=Math.max(s.potions||0,1000)} },
  ];

  const LEGACY_SAVE    = 'rpg_legacy_unlocked';
  const LEGACY_PTS     = 'rpg_legacy_pts';
  const LEGACY_EARNED  = 'rpg_legacy_earned';   // pts ever awarded (dedup)

  function getLegacyPts()     { return parseInt(localStorage.getItem(LEGACY_PTS)||'0'); }
  function getLegacyUnlocked(){ try{return JSON.parse(localStorage.getItem(LEGACY_SAVE)||'[]');}catch(e){return[];} }
  function getLegacyEarned()  { try{return JSON.parse(localStorage.getItem(LEGACY_EARNED)||'[]');}catch(e){return[];} }

  function awardLegacyPts(reason, pts) {
    const earned = getLegacyEarned();
    if (earned.includes(reason)) return;
    earned.push(reason);
    localStorage.setItem(LEGACY_EARNED, JSON.stringify(earned));
    const cur = getLegacyPts();
    localStorage.setItem(LEGACY_PTS, String(cur + pts));
    toast(`🌿 Legado: +${pts} ponto${pts>1?'s':''} — ${reason}`, 5000);
  }

  function checkLegacyMilestones() {
    if (!rdy()) return;
    const pl = rpg.prestigeLevel||0, ng = parseInt(localStorage.getItem('rpg_ng_plus')||'0');
    const bk = rpg.bossKills||0;
    if (pl >= 10)  awardLegacyPts('P.10',  1);
    if (pl >= 25)  awardLegacyPts('P.25',  1);
    if (pl >= 50)  awardLegacyPts('P.50',  2);
    if (pl >= 100) awardLegacyPts('P.100', 3);
    if (ng >= 1)   awardLegacyPts('NG+1',  1);
    if (ng >= 3)   awardLegacyPts('NG+3',  2);
    if (ng >= 5)   awardLegacyPts('NG+5',  3);
    if (bk >= 50)  awardLegacyPts('50Bosses', 1);
    if (bk >= 100) awardLegacyPts('100Bosses',2);
  }

  function buyLegacyNode(id) {
    if (!rdy()) return;
    const node = LEGACY_NODES.find(n=>n.id===id);
    if (!node) return;
    const pts      = getLegacyPts();
    const unlocked = getLegacyUnlocked();
    if (unlocked.includes(id)) { toast('Já desbloqueado!',2000); return; }
    if (pts < node.cost)       { toast('Pontos insuficientes!',3000); return; }
    if (!node.req.every(r=>unlocked.includes(r))) { toast('🔒 Requer nós anteriores!',3000); return; }
    unlocked.push(id);
    localStorage.setItem(LEGACY_SAVE, JSON.stringify(unlocked));
    localStorage.setItem(LEGACY_PTS,  String(pts - node.cost));
    node.apply(rpg);
    rpg.save();
    toast(`🌿 ${node.name[lang()]} desbloqueado! ${node.desc[lang()]}`, 5000);
    renderLegacy();
  }
  window._legacyBuy = buyLegacyNode;

  function renderLegacy() {
    const box = document.getElementById('legacy2-body');
    if (!box) return;
    const pts = getLegacyPts(), unlocked = getLegacyUnlocked(), l = lang();
    const tiers = [1,2,3,4];
    let html = `
      <div style="text-align:center;margin-bottom:14px;">
        <div style="font-family:Orbitron,sans-serif;font-size:18px;font-weight:900;color:#6ee7b7;text-shadow:0 0 16px rgba(110,231,183,0.4);">🌿 ÁRVORE DE LEGADO</div>
        <div style="font-family:'Fira Code',monospace;font-size:9px;color:#78716c;margin-top:3px;">Pontos persistem após NG+</div>
        <div style="margin-top:8px;display:inline-block;padding:4px 16px;background:rgba(110,231,183,0.1);border:1px solid rgba(110,231,183,0.3);border-radius:8px;">
          <span style="font-family:Orbitron,sans-serif;font-size:11px;color:#6ee7b7;">🌿 ${pts} Ponto${pts!==1?'s':''} disponíveis</span>
        </div>
      </div>`;
    tiers.forEach(tier => {
      const nodes = LEGACY_NODES.filter(n=>n.tier===tier);
      html += `<div style="margin-bottom:12px;">
        <div style="font-family:Orbitron,monospace;font-size:7.5px;font-weight:900;color:#3f3f46;letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px;">TIER ${tier}</div>
        <div style="display:grid;grid-template-columns:repeat(${Math.min(nodes.length,3)},1fr);gap:6px;">`;
      nodes.forEach(node => {
        const owned    = unlocked.includes(node.id);
        const canReq   = node.req.every(r=>unlocked.includes(r));
        const canAfford= pts >= node.cost;
        const locked   = !canReq;
        const col = owned?'#34d399':canReq&&canAfford?'#6ee7b7':'#3f3f46';
        const bg  = owned?'rgba(52,211,153,0.1)':canReq&&canAfford?'rgba(110,231,183,0.06)':'rgba(0,0,0,0.3)';
        const border = owned?'rgba(52,211,153,0.4)':canReq?'rgba(110,231,183,0.2)':'rgba(63,63,70,0.3)';
        html += `<div style="background:${bg};border:1px solid ${border};border-radius:10px;padding:8px;text-align:center;opacity:${locked?0.45:1};">
          <div style="font-size:16px;margin-bottom:3px;">${node.icon}</div>
          <div style="font-family:Orbitron,sans-serif;font-size:7px;font-weight:900;color:${col};margin-bottom:3px;">${node.name[l]}</div>
          <div style="font-family:'Fira Code',monospace;font-size:6.5px;color:#52525b;margin-bottom:5px;line-height:1.4;">${node.desc[l]}</div>
          ${owned
            ? `<div style="font-size:8px;color:#34d399;font-family:Orbitron,monospace;font-weight:900;">✓ OK</div>`
            : locked
              ? `<div style="font-size:8px;color:#3f3f46;">🔒 ${node.cost}pt</div>`
              : `<button onclick="window._legacyBuy('${node.id}')" style="width:100%;padding:3px;background:rgba(110,231,183,0.1);border:1px solid rgba(110,231,183,0.25);border-radius:5px;font-size:7px;color:${canAfford?'#6ee7b7':'#52525b'};font-family:Orbitron,monospace;font-weight:900;cursor:${canAfford?'pointer':'not-allowed'};">${node.cost}pt — Comprar</button>`
          }
        </div>`;
      });
      html += '</div></div>';
    });
    box.innerHTML = html;
  }

  /* ══════════════════════════════════════════════════════════
     2. FRAGMENTOS DE DEUS
  ══════════════════════════════════════════════════════════ */
  const FRAG_PIECES = [
    { id:'frag_eye',    name:{pt:'Olho do Criador',   en:"Creator's Eye"},   icon:'👁',  set:'creator', effect:{pt:'+500% Crit perm.',en:'+500% Crit'}, apply:s=>{s.permCritBonus=(s.permCritBonus||0)+5} },
    { id:'frag_heart',  name:{pt:'Coração do Caos',   en:'Heart of Chaos'},  icon:'💜', set:'chaos',   effect:{pt:'+1000% ATK perm.',en:'+1000% ATK'}, apply:s=>{s.permAtkBonus=(s.permAtkBonus||0)+10} },
    { id:'frag_bone',   name:{pt:'Osso do Eterno',    en:'Eternal Bone'},    icon:'🦴',  set:'eternal', effect:{pt:'+2000% HP perm.',en:'+2000% HP'},  apply:s=>{s.permAllBonus=(s.permAllBonus||0)+20} },
    { id:'frag_flame',  name:{pt:'Chama Primordial',  en:'Primordial Flame'},icon:'🔥', set:'creator', effect:{pt:'+200% Ouro perm.',en:'+200% Gold'},  apply:s=>{s.permGoldBonus=(s.permGoldBonus||0)+2} },
    { id:'frag_void',   name:{pt:'Fragmento do Vazio',en:'Void Fragment'},   icon:'🌀', set:'chaos',   effect:{pt:'+3000% stats perm.',en:'+3000% all'},apply:s=>{s.permAllBonus=(s.permAllBonus||0)+30} },
    { id:'frag_crown',  name:{pt:'Coroa dos Deuses',  en:'Crown of Gods'},   icon:'👑', set:'eternal', effect:{pt:'Poções ∞ (500)',en:'Potions ∞(500)'}, apply:s=>{s.potions=Math.max(s.potions||0,500)} },
  ];
  // Set bonus when all pieces of a set are equipped
  const FRAG_SETS = {
    creator: { name:{pt:'Set: O Criador',en:'Set: The Creator'}, bonus:{pt:'ATK ×10 + Crit ×10',en:'ATK ×10 + Crit ×10'}, apply:s=>{s.permAtkBonus=(s.permAtkBonus||0)+100;s.permCritBonus=(s.permCritBonus||0)+10} },
    chaos:   { name:{pt:'Set: O Caos',en:'Set: Chaos'},          bonus:{pt:'Todos stats ×20',en:'All stats ×20'},            apply:s=>{s.permAllBonus=(s.permAllBonus||0)+200} },
    eternal: { name:{pt:'Set: O Eterno',en:'Set: Eternal'},      bonus:{pt:'Poções infinitas + ×50 tudo',en:'Infinite pots + ×50 all'},apply:s=>{s.potions=Math.max(s.potions||0,9999);s.permAllBonus=(s.permAllBonus||0)+500} },
  };

  const FRAG_SAVE    = 'rpg_god_frags';
  const FRAG_CLAIMED = 'rpg_god_frags_claimed';

  function getFrags()    { try{return JSON.parse(localStorage.getItem(FRAG_SAVE)||'[]');}catch(e){return[];} }
  function getFragClaimed(){ try{return JSON.parse(localStorage.getItem(FRAG_CLAIMED)||'[]');}catch(e){return[];} }

  function tryDropFragment() {
    if (!rdy()) return;
    const ng = parseInt(localStorage.getItem('rpg_ng_plus')||'0');
    if (ng < 3) return;
    const dropChance = 0.03 + ng * 0.01;
    if (Math.random() > dropChance) return;
    const owned = getFrags();
    const missing = FRAG_PIECES.filter(f=>!owned.includes(f.id));
    if (!missing.length) return;
    const drop = missing[Math.floor(Math.random()*missing.length)];
    owned.push(drop.id);
    localStorage.setItem(FRAG_SAVE, JSON.stringify(owned));
    // Apply individual effect
    drop.apply(rpg);
    rpg.save();
    toast(`🔮 FRAGMENTO DE DEUS: ${drop.icon} ${drop.name[lang()]}! ${drop.effect[lang()]}`, 7000);
    checkSetBonuses(owned);
  }

  function checkSetBonuses(owned) {
    if (!rdy()) return;
    const claimed = getFragClaimed();
    Object.entries(FRAG_SETS).forEach(([setId, set]) => {
      const pieces = FRAG_PIECES.filter(f=>f.set===setId);
      const complete = pieces.every(f=>owned.includes(f.id));
      if (complete && !claimed.includes(setId)) {
        claimed.push(setId);
        localStorage.setItem(FRAG_CLAIMED, JSON.stringify(claimed));
        set.apply(rpg);
        rpg.save();
        toast(`👑 SET COMPLETO: ${set.name[lang()]}! ${set.bonus[lang()]}`, 8000);
      }
    });
  }

  function renderFragments() {
    const box = document.getElementById('fragments-body');
    if (!box) return;
    const owned = getFrags(), claimed = getFragClaimed(), l = lang();
    const ng = rdy() ? parseInt(localStorage.getItem('rpg_ng_plus')||'0') : 0;
    let html = `
      <div style="text-align:center;margin-bottom:14px;">
        <div style="font-family:Orbitron,sans-serif;font-size:16px;font-weight:900;color:#fde68a;text-shadow:0 0 16px rgba(253,230,138,0.4);">🔮 FRAGMENTOS DE DEUS</div>
        <div style="font-family:'Fira Code',monospace;font-size:9px;color:#78716c;margin-top:3px;">Drops raros de bosses NG+3 em diante</div>
        ${ng<3?`<div style="margin-top:8px;padding:6px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:8px;font-size:9px;color:#f87171;font-family:Rajdhani,sans-serif;">🔒 Requer NG+3 para drops (atual: NG+${ng})</div>`:''}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:12px;">`;
    FRAG_PIECES.forEach(f => {
      const have = owned.includes(f.id);
      html += `<div style="background:rgba(0,0,0,0.4);border:1px solid ${have?'rgba(253,230,138,0.4)':'rgba(63,63,70,0.3)'};border-radius:10px;padding:8px;text-align:center;opacity:${have?1:0.5};">
        <div style="font-size:20px;margin-bottom:3px;${have?'filter:drop-shadow(0 0 6px rgba(253,230,138,0.6));':''}">${f.icon}</div>
        <div style="font-family:Rajdhani,sans-serif;font-size:9px;font-weight:700;color:${have?'#fde68a':'#52525b'};">${f.name[l]}</div>
        <div style="font-family:'Fira Code',monospace;font-size:7px;color:${have?'#a16207':'#3f3f46'};margin-top:3px;">${have?f.effect[l]:'???'}</div>
        ${have?'<div style="font-size:9px;color:#34d399;margin-top:4px;">✓</div>':'<div style="font-size:9px;color:#3f3f46;margin-top:4px;">🔒</div>'}
      </div>`;
    });
    html += '</div>';
    // Sets
    Object.entries(FRAG_SETS).forEach(([setId, set]) => {
      const pieces = FRAG_PIECES.filter(f=>f.set===setId);
      const count  = pieces.filter(f=>owned.includes(f.id)).length;
      const done   = claimed.includes(setId);
      html += `<div style="background:rgba(0,0,0,0.35);border:1px solid ${done?'rgba(253,230,138,0.3)':'rgba(63,63,70,0.2)'};border-radius:10px;padding:8px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-family:Orbitron,sans-serif;font-size:8px;font-weight:900;color:${done?'#fde68a':'#52525b'};">${set.name[l]}</div>
          <div style="font-family:Rajdhani,sans-serif;font-size:8.5px;color:#6b7280;">${set.bonus[l]}</div>
        </div>
        <div style="font-family:'Fira Code',monospace;font-size:9px;color:${done?'#34d399':'#52525b'};">${done?'✓ SET':count+'/'+pieces.length}</div>
      </div>`;
    });
    box.innerHTML = html;
  }

  /* ══════════════════════════════════════════════════════════
     3. FORJA DE RUNAS 2.0 — 3× mesmo tier → Runa Ancestral
  ══════════════════════════════════════════════════════════ */
  const ANCESTRAL_RUNES = [
    { id:'anc_alpha', name:{pt:'Alfa Ancestral',en:'Ancestral Alpha'}, from:'tier1', icon:'Α', effects:{pt:'+200% ATK + +20% Crit',en:'+200% ATK + +20% Crit'}, apply:s=>{s.permAtkBonus=(s.permAtkBonus||0)+2;s.permCritBonus=(s.permCritBonus||0)+0.2} },
    { id:'anc_beta',  name:{pt:'Beta Ancestral', en:'Ancestral Beta'},  from:'tier2', icon:'Β', effects:{pt:'+400% tudo perm.',    en:'+400% all perm.'},       apply:s=>{s.permAllBonus=(s.permAllBonus||0)+4} },
    { id:'anc_gamma', name:{pt:'Gama Ancestral', en:'Ancestral Gamma'}, from:'tier3', icon:'Γ', effects:{pt:'+1500% ATK+HP perm.', en:'+1500% ATK+HP perm.'}, apply:s=>{s.permAtkBonus=(s.permAtkBonus||0)+15;s.permAllBonus=(s.permAllBonus||0)+15} },
  ];

  // We detect "tier" by counting how many runes the player has of the same id
  function getRuneInventory() {
    if (!rdy()) return {};
    const inv = rpg._runeSlots || [];
    const counts = {};
    inv.forEach(r => { if (r) counts[r] = (counts[r]||0) + 1; });
    return counts;
  }

  function forgeAncestral(ancId) {
    if (!rdy()) return;
    const anc = ANCESTRAL_RUNES.find(a=>a.id===ancId);
    if (!anc) return;
    const owned = JSON.parse(localStorage.getItem('rpg_anc_runes')||'[]');
    if (owned.includes(ancId)) { toast('Já possuis esta Runa Ancestral!',3000); return; }
    // Check: player needs 3 runes + some gold
    const goldCost = { anc_alpha:100000, anc_beta:500000, anc_gamma:2000000 }[ancId] || 100000;
    if (rpg.gold < goldCost) { toast(`💰 Requer ${fmt(goldCost)} Ouro!`,3000); return; }
    rpg.gold -= goldCost;
    owned.push(ancId);
    localStorage.setItem('rpg_anc_runes', JSON.stringify(owned));
    anc.apply(rpg);
    rpg.save(); rpg.updateUI();
    toast(`🔥 Runa Ancestral: ${anc.icon} ${anc.name[lang()]}! ${anc.effects[lang()]}`, 6000);
    renderForge2();
  }
  window._forgeAncestral = forgeAncestral;

  function renderForge2() {
    const box = document.getElementById('forge2-body');
    if (!box || !rdy()) return;
    const owned = JSON.parse(localStorage.getItem('rpg_anc_runes')||'[]');
    const goldCosts = { anc_alpha:100000, anc_beta:500000, anc_gamma:2000000 };
    const l = lang();
    let html = `
      <div style="text-align:center;margin-bottom:14px;">
        <div style="font-family:Orbitron,sans-serif;font-size:16px;font-weight:900;color:#fb923c;text-shadow:0 0 16px rgba(251,146,60,0.4);">🔥 FORJA DE RUNAS 2.0</div>
        <div style="font-family:'Fira Code',monospace;font-size:9px;color:#78716c;margin-top:3px;">Transforma Gold em poder ancestral</div>
        <div style="margin-top:6px;font-family:Orbitron,sans-serif;font-size:10px;color:#fbbf24;">💰 ${fmt(rpg.gold||0)} Gold</div>
      </div>`;
    ANCESTRAL_RUNES.forEach(anc => {
      const have = owned.includes(anc.id);
      const cost = goldCosts[anc.id];
      const canAfford = (rpg.gold||0) >= cost;
      html += `<div style="background:rgba(0,0,0,0.4);border:1px solid ${have?'rgba(251,146,60,0.4)':'rgba(63,63,70,0.25)'};border-radius:12px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;">
        <div style="font-size:28px;font-family:serif;color:${have?'#fb923c':'#52525b'};font-weight:900;text-shadow:${have?'0 0 10px rgba(251,146,60,0.6)':'none'};flex-shrink:0;">${anc.icon}</div>
        <div style="flex:1;">
          <div style="font-family:Orbitron,sans-serif;font-size:10px;font-weight:900;color:${have?'#fb923c':'#78716c'};">${anc.name[l]}</div>
          <div style="font-size:8.5px;color:#6b7280;font-family:Rajdhani,sans-serif;">${anc.effects[l]}</div>
          <div style="font-family:'Fira Code',monospace;font-size:7.5px;color:#44403c;margin-top:2px;">💰 ${fmt(cost)} Gold</div>
        </div>
        ${have
          ? '<div style="font-size:11px;color:#34d399;font-family:Orbitron,monospace;font-weight:900;">✓</div>'
          : `<button onclick="window._forgeAncestral('${anc.id}')" style="padding:6px 10px;background:${canAfford?'rgba(251,146,60,0.15)':'rgba(0,0,0,0.3)'};border:1px solid ${canAfford?'rgba(251,146,60,0.4)':'rgba(63,63,70,0.4)'};border-radius:8px;font-size:7.5px;color:${canAfford?'#fb923c':'#52525b'};font-family:Orbitron,monospace;font-weight:900;cursor:${canAfford?'pointer':'not-allowed'};">FORJAR</button>`
        }
      </div>`;
    });
    box.innerHTML = html;
  }

  /* ══════════════════════════════════════════════════════════
     4. GRIMÓRIO OCULTO — habilidades secretas por combo
  ══════════════════════════════════════════════════════════ */
  const SECRET_SKILLS = [
    { id:'ss_voidstrike', name:{pt:'Golpe do Vazio',en:'Void Strike'},   req:{class:'prestige_void', prestige:15, rune:'void'},    desc:{pt:'Ataque ignora toda defesa 1×/batalha',en:'Attack ignores all defense 1×/battle'}, icon:'🌀' },
    { id:'ss_soulburn',   name:{pt:'Chama da Alma', en:'Soul Burn'},      req:{class:'prestige_phoenix',prestige:5,bossKills:20},   desc:{pt:'Queima 5% HP do boss/turno perm.',en:'Burns 5% boss HP/turn perm.'},              icon:'🔥' },
    { id:'ss_timewarp',   name:{pt:'Dobra Temporal', en:'Time Warp'},     req:{prestige:30, ng:2, legacyNode:'leg_god1'},           desc:{pt:'1 em 4 ataques é triplo',en:'1 in 4 attacks is triple damage'},                 icon:'⏳' },
    { id:'ss_infinitum',  name:{pt:'Infinitum',      en:'Infinitum'},     req:{prestige:50, fragment:'frag_void'},                  desc:{pt:'Stats multiplicam por 1.5× por turno em combate',en:'Stats ×1.5/turn in combat'}, icon:'♾' },
  ];

  const SS_SAVE = 'rpg_secret_skills';

  function checkSecretSkills() {
    if (!rdy()) return;
    const unlocked = JSON.parse(localStorage.getItem(SS_SAVE)||'[]');
    const ng  = parseInt(localStorage.getItem('rpg_ng_plus')||'0');
    const frags = JSON.parse(localStorage.getItem(FRAG_SAVE)||'[]');
    const legacyUnlocked = getLegacyUnlocked();
    const runeSlots = rpg._runeSlots || [];

    SECRET_SKILLS.forEach(sk => {
      if (unlocked.includes(sk.id)) return;
      const r = sk.req;
      const okClass    = !r.class    || rpg.eqClass === r.class;
      const okPrestige = !r.prestige || (rpg.prestigeLevel||0) >= r.prestige;
      const okBoss     = !r.bossKills|| (rpg.bossKills||0) >= r.bossKills;
      const okNg       = !r.ng       || ng >= r.ng;
      const okRune     = !r.rune     || runeSlots.includes(r.rune);
      const okFrag     = !r.fragment || frags.includes(r.fragment);
      const okLegacy   = !r.legacyNode || legacyUnlocked.includes(r.legacyNode);
      if (okClass && okPrestige && okBoss && okNg && okRune && okFrag && okLegacy) {
        unlocked.push(sk.id);
        localStorage.setItem(SS_SAVE, JSON.stringify(unlocked));
        // Apply persistent effects
        applySecretSkill(sk.id);
        toast(`📕 ${sk.icon} Habilidade Secreta: ${sk.name[lang()]} desbloqueada!`, 7000);
      }
    });
  }

  function applySecretSkill(id) {
    if (!rdy()) return;
    if (id==='ss_soulburn') {
      if (!rpg._soulburnPatched) {
        rpg._soulburnPatched = true;
        // Hook: after player attacks, boss takes 5% HP burn
        const _origAtk = rpg.playerAttack ? rpg.playerAttack.bind(rpg) : null;
        if (_origAtk && rpg.monster) {
          rpg.playerAttack = function() {
            const r = _origAtk.apply(this, arguments);
            if (this.monster && this.monster.hp > 0) {
              const burn = Math.floor(this.monster.maxHp * 0.05);
              this.monster.hp = Math.max(0, this.monster.hp - burn);
            }
            return r;
          };
        }
      }
    }
    if (id==='ss_timewarp') {
      rpg._timewarpCounter = 0;
      const _origAtk = rpg.getAtk ? rpg.getAtk.bind(rpg) : null;
      if (_origAtk && !rpg._timewarpPatched) {
        rpg._timewarpPatched = true;
        rpg.getAtk = function() {
          this._timewarpCounter = ((this._timewarpCounter||0) + 1) % 4;
          const base = _origAtk.apply(this, arguments);
          return this._timewarpCounter === 0 ? base * 3 : base;
        };
      }
    }
  }

  function renderGrimoire() {
    const box = document.getElementById('grimoire2-body');
    if (!box) return;
    const unlocked = JSON.parse(localStorage.getItem(SS_SAVE)||'[]');
    const ng  = rdy() ? parseInt(localStorage.getItem('rpg_ng_plus')||'0') : 0;
    const l = lang();
    let html = `
      <div style="text-align:center;margin-bottom:14px;">
        <div style="font-family:Orbitron,sans-serif;font-size:16px;font-weight:900;color:#e879f9;text-shadow:0 0 16px rgba(232,121,249,0.4);">📕 GRIMÓRIO OCULTO</div>
        <div style="font-family:'Fira Code',monospace;font-size:9px;color:#78716c;margin-top:3px;">Combina classe + runa + prestígio para revelar</div>
      </div>`;
    SECRET_SKILLS.forEach(sk => {
      const have = unlocked.includes(sk.id);
      const r = sk.req;
      const reqs = [];
      if (r.class)       reqs.push('Classe: '+r.class.replace('prestige_','').toUpperCase());
      if (r.prestige)    reqs.push('P.'+r.prestige+'+');
      if (r.bossKills)   reqs.push(r.bossKills+' bosses');
      if (r.ng)          reqs.push('NG+'+r.ng);
      if (r.rune)        reqs.push('Runa: '+r.rune);
      if (r.fragment)    reqs.push('Fragmento');
      if (r.legacyNode)  reqs.push('Nó: '+r.legacyNode);
      html += `<div style="background:rgba(0,0,0,0.4);border:1px solid ${have?'rgba(232,121,249,0.4)':'rgba(63,63,70,0.25)'};border-radius:12px;padding:12px;margin-bottom:8px;opacity:${have?1:0.7};">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <div style="font-size:20px;">${have?sk.icon:'🔒'}</div>
          <div>
            <div style="font-family:Orbitron,sans-serif;font-size:9px;font-weight:900;color:${have?'#e879f9':'#52525b'};">${have?sk.name[l]:'???'}</div>
            ${have?`<div style="font-size:8.5px;color:#6b7280;font-family:Rajdhani,sans-serif;">${sk.desc[l]}</div>`:''}
          </div>
          ${have?'<div style="margin-left:auto;font-size:10px;color:#34d399;">✓</div>':''}
        </div>
        <div style="font-family:'Fira Code',monospace;font-size:7px;color:#3f3f46;">${have?'':'🔒 '+reqs.join(' · ')}</div>
      </div>`;
    });
    box.innerHTML = html;
  }

  /* ══════════════════════════════════════════════════════════
     5. SISTEMA DE MUTAÇÕES
  ══════════════════════════════════════════════════════════ */
  const MUTATIONS_POOL = [
    // Boas
    { id:'mut_giant',    good:true,  icon:'💪', name:{pt:'Gigante',en:'Giant'},           desc:{pt:'+150% HP perm.',en:'+150% HP'},         apply:s=>{s.permAllBonus=(s.permAllBonus||0)+1.5} },
    { id:'mut_feral',    good:true,  icon:'🐾', name:{pt:'Feroz',en:'Feral'},              desc:{pt:'+200% ATK perm.',en:'+200% ATK'},        apply:s=>{s.permAtkBonus=(s.permAtkBonus||0)+2} },
    { id:'mut_quickdraw',good:true,  icon:'⚡', name:{pt:'Veloz',en:'Quickdraw'},          desc:{pt:'+20% Dodge perm.',en:'+20% Dodge'},       apply:s=>{s.permDodgeBonus=(s.permDodgeBonus||0)+0.2} },
    { id:'mut_seer',     good:true,  icon:'👁', name:{pt:'Vidente',en:'Seer'},             desc:{pt:'+30% Crit perm.',en:'+30% Crit'},         apply:s=>{s.permCritBonus=(s.permCritBonus||0)+0.3} },
    { id:'mut_golden',   good:true,  icon:'💰', name:{pt:'Dourado',en:'Golden'},           desc:{pt:'+300% Ouro perm.',en:'+300% Gold'},       apply:s=>{s.permGoldBonus=(s.permGoldBonus||0)+3} },
    { id:'mut_immortal', good:true,  icon:'✨', name:{pt:'Imortal',en:'Immortal'},         desc:{pt:'+500% HP + ressurreição passiva',en:'+500% HP + passive revive'}, apply:s=>{s.permAllBonus=(s.permAllBonus||0)+5} },
    // Más
    { id:'mut_fragile',  good:false, icon:'💔', name:{pt:'Frágil',en:'Fragile'},           desc:{pt:'-30% HP perm.',en:'-30% HP perm.'},       apply:s=>{s.permAllBonus=(s.permAllBonus||0)-0.3} },
    { id:'mut_blinded',  good:false, icon:'🌑', name:{pt:'Cego',en:'Blinded'},             desc:{pt:'-20% Crit perm.',en:'-20% Crit perm.'},   apply:s=>{s.permCritBonus=Math.max(0,(s.permCritBonus||0)-0.2)} },
    { id:'mut_cursed',   good:false, icon:'🩸', name:{pt:'Amaldiçoado',en:'Cursed'},       desc:{pt:'-15% Ouro drops',en:'-15% Gold drops'},   apply:s=>{s.permGoldBonus=Math.max(-0.5,(s.permGoldBonus||0)-0.15)} },
  ];

  const MUT_SAVE   = 'rpg_mutations';
  const MUT_EARN   = 'rpg_mutations_earned';

  function getMutations()   { try{return JSON.parse(localStorage.getItem(MUT_SAVE)||'[]');}catch(e){return[];} }

  function tryGainMutation() {
    if (!rdy()) return;
    const ng = parseInt(localStorage.getItem('rpg_ng_plus')||'0');
    if (ng < 2) return;
    const chance = 0.05 + ng*0.01;
    if (Math.random() > chance) return;
    const owned = getMutations();
    const pool  = MUTATIONS_POOL.filter(m=>!owned.includes(m.id));
    if (!pool.length) return;
    // Weight: 70% good, 30% bad
    const good = pool.filter(m=>m.good), bad = pool.filter(m=>!m.good);
    const pick = (Math.random()<0.7 && good.length) ? good : bad;
    if (!pick.length) return;
    const mut = pick[Math.floor(Math.random()*pick.length)];
    owned.push(mut.id);
    localStorage.setItem(MUT_SAVE, JSON.stringify(owned));
    mut.apply(rpg);
    rpg.save();
    toast(`🧬 MUTAÇÃO: ${mut.icon} ${mut.name[lang()]} — ${mut.desc[lang()]}`, 7000);
    renderMutations2();
  }

  function renderMutations2() {
    const box = document.getElementById('mutations2-body');
    if (!box) return;
    const owned = getMutations(), l = lang();
    const ng = rdy() ? parseInt(localStorage.getItem('rpg_ng_plus')||'0') : 0;
    let html = `
      <div style="text-align:center;margin-bottom:14px;">
        <div style="font-family:Orbitron,sans-serif;font-size:16px;font-weight:900;color:#bef264;text-shadow:0 0 16px rgba(190,242,100,0.35);">🧬 MUTAÇÕES</div>
        <div style="font-family:'Fira Code',monospace;font-size:9px;color:#78716c;margin-top:3px;">Ganhas ao matar bosses em NG+2+</div>
        ${ng<2?`<div style="margin-top:6px;padding:5px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25);border-radius:8px;font-size:8.5px;color:#f87171;font-family:Rajdhani,sans-serif;">🔒 Ativas a partir de NG+2 (atual: NG+${ng})</div>`:''}
        ${owned.length?`<div style="margin-top:6px;font-family:'Fira Code',monospace;font-size:9px;color:#bef264;">${owned.length} mutação${owned.length!==1?'s':''} ativa${owned.length!==1?'s':''}</div>`:''}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">`;
    MUTATIONS_POOL.forEach(m => {
      const have = owned.includes(m.id);
      html += `<div style="background:rgba(0,0,0,0.4);border:1px solid ${have?(m.good?'rgba(190,242,100,0.35)':'rgba(239,68,68,0.35)'):'rgba(63,63,70,0.2)'};border-radius:10px;padding:8px;text-align:center;opacity:${have?1:0.4};">
        <div style="font-size:18px;margin-bottom:3px;">${m.icon}</div>
        <div style="font-family:Rajdhani,sans-serif;font-size:9px;font-weight:700;color:${have?(m.good?'#bef264':'#f87171'):'#52525b'};">${m.name[l]}</div>
        <div style="font-family:'Fira Code',monospace;font-size:7px;color:${have?'#52525b':'#3f3f46'};margin-top:2px;">${have?m.desc[l]:'???'}</div>
        ${have?`<div style="font-size:8px;color:${m.good?'#34d399':'#f87171'};margin-top:3px;">${m.good?'✓':'⚠'}</div>`:''}
      </div>`;
    });
    html += '</div>';
    box.innerHTML = html;
  }

  /* ── Modal & Navigation ──────────────────────────────────── */
  function injectLegacyModal() {
    if (document.getElementById('legacy2-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'legacy2-modal';
    modal.className = 'modal-overlay fixed inset-0 flex items-center justify-center';
    modal.innerHTML = `
      <div class="modal-content glass-panel bg-zinc-900/95 w-11/12 max-w-md rounded-2xl shadow-2xl" style="max-height:88vh;display:flex;flex-direction:column;">
        <div style="padding:14px 18px 10px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;flex-wrap:wrap;gap:4px;">
          <div style="display:flex;gap:4px;flex-wrap:wrap;">
            <button onclick="openLegacyTab('legacy')"    style="padding:4px 8px;background:rgba(110,231,183,0.12);border:1px solid rgba(110,231,183,0.3);border-radius:6px;font-family:Orbitron,sans-serif;font-size:7px;font-weight:900;color:#6ee7b7;cursor:pointer;">🌿 Legado</button>
            <button onclick="openLegacyTab('fragments')" style="padding:4px 8px;background:rgba(253,230,138,0.1);border:1px solid rgba(253,230,138,0.25);border-radius:6px;font-family:Orbitron,sans-serif;font-size:7px;font-weight:900;color:#fde68a;cursor:pointer;">🔮 Frags</button>
            <button onclick="openLegacyTab('forge2')"    style="padding:4px 8px;background:rgba(251,146,60,0.12);border:1px solid rgba(251,146,60,0.3);border-radius:6px;font-family:Orbitron,sans-serif;font-size:7px;font-weight:900;color:#fb923c;cursor:pointer;">🔥 Forja</button>
            <button onclick="openLegacyTab('grimoire2')" style="padding:4px 8px;background:rgba(232,121,249,0.1);border:1px solid rgba(232,121,249,0.25);border-radius:6px;font-family:Orbitron,sans-serif;font-size:7px;font-weight:900;color:#e879f9;cursor:pointer;">📕 Grimório</button>
            <button onclick="openLegacyTab('mutations2')"style="padding:4px 8px;background:rgba(190,242,100,0.1);border:1px solid rgba(190,242,100,0.25);border-radius:6px;font-family:Orbitron,sans-serif;font-size:7px;font-weight:900;color:#bef264;cursor:pointer;">🧬 Mutações</button>
          </div>
          <button onclick="closeModal('legacy2-modal')" class="p-1.5 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition text-zinc-400"><i data-lucide="x" class="w-4 h-4"></i></button>
        </div>
        <div style="overflow-y:auto;padding:16px;flex:1;" class="hide-scrollbar">
          <div id="legacy2-section">    <div id="legacy2-body"></div></div>
          <div id="fragments-section"   style="display:none;"><div id="fragments-body"></div></div>
          <div id="forge2-section"      style="display:none;"><div id="forge2-body"></div></div>
          <div id="grimoire2-section"   style="display:none;"><div id="grimoire2-body"></div></div>
          <div id="mutations2-section"  style="display:none;"><div id="mutations2-body"></div></div>
        </div>
      </div>`;
    document.body.appendChild(modal);
  }

  window.openLegacyTab = function(which) {
    ['legacy2','fragments','forge2','grimoire2','mutations2'].forEach(w => {
      const el = document.getElementById(w+'-section');
      if (el) el.style.display = w===which ? 'block' : 'none';
    });
    const renders = { legacy2:renderLegacy, fragments:renderFragments, forge2:renderForge2, grimoire2:renderGrimoire, mutations2:renderMutations2 };
    if (renders[which]) renders[which]();
    try { if (typeof lucide!=='undefined') lucide.createIcons(); } catch(e){}
  };

  window.openLegacySystem = function() {
    const m = document.getElementById('legacy2-modal');
    if (m) { m.classList.add('active'); openLegacyTab('legacy2'); }
  };

  /* ── Hook boss kill for drops & mutations ────────────────── */
  function hookBossKill() {
    if (!rdy()) return;
    const _orig = rpg.killMonster.bind(rpg);
    rpg.killMonster = function() {
      const r = _orig.apply(this, arguments);
      // Check if it was a boss (bossKills just incremented)
      try { tryDropFragment(); } catch(e){}
      try { tryGainMutation(); } catch(e){}
      try { checkSecretSkills(); } catch(e){}
      try { checkLegacyMilestones(); } catch(e){}
      return r;
    };
  }

  /* ── Init ────────────────────────────────────────────────── */
  function init() {
    injectLegacyModal();
    wait(() => {
      checkLegacyMilestones();
      checkSecretSkills();
      // Re-apply secret skills on load
      const unlocked = JSON.parse(localStorage.getItem(SS_SAVE)||'[]');
      unlocked.forEach(id => { try { applySecretSkill(id); } catch(e){} });
      hookBossKill();
      renderLegacy();
      renderFragments();
      renderForge2();
      renderGrimoire();
      renderMutations2();
      console.log('[EndGameLegacy] ✅ Legado, Fragmentos, Forja2, Grimório, Mutações prontos');
    });
  }

  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
