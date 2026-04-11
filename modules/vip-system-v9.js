// ═══════════════════════════════════════════════════════════════
// MODULE: vip-system-v9.js — Sistema VIP Completo (Banners + Bordas + Títulos + Benefícios)
// ─────────────────────────────────────────────────────────────
// ✦ BANNERS: Equipáveis no Perfil, Menu e Batalha
// ✦ BORDAS: Avatar com animações VIP em todos os painéis
// ✦ TÍTULOS: Exibidos em nome + perfil + HUD de batalha
// ✦ BENEFÍCIOS VIP: Gold, XP, ATK, Drop, Crit — por tier
// ✦ ALÉM DO VIP: Sistema de Fragmentos de Identidade (extra cosmético)
// ═══════════════════════════════════════════════════════════════
(function VipSystemV9() {
  'use strict';

  function rpgReady() { return typeof rpg !== 'undefined' && rpg && typeof rpg.save === 'function'; }
  function fmt(n) {
    if (n >= 1e15) return (n / 1e15).toFixed(1) + 'Qa';
    if (n >= 1e12) return (n / 1e12).toFixed(1) + 'T';
    if (n >= 1e9)  return (n / 1e9).toFixed(1)  + 'B';
    if (n >= 1e6)  return (n / 1e6).toFixed(1)  + 'M';
    if (n >= 1e3)  return (n / 1e3).toFixed(1)  + 'K';
    return String(Math.floor(n));
  }

  var currentShopTab = 'tiers';
  var SAVE_VIP   = 'rpg_vip_tier_v9';
  var SAVE_COSM  = 'rpg_vip_cosmetics_v9';
  var SAVE_EQUIP = 'rpg_vip_equipped_v9';
  var SAVE_FRAG  = 'rpg_vip_fragments_v9';

  // ── VIP TIERS ────────────────────────────────────────────────
  var VIP_TIERS = [
    {
      id: 'vip',      name: 'VIP',        emoji: '⭐', color: '#fbbf24',
      glow: 'rgba(251,191,36,0.45)',   cost: 500000,
      badge: '⭐ VIP',
      benefits: { gold: 25, xp: 25, atk: 0, drop: 0, crit: 0 },
      perks: ['Gold +25%', 'XP +25%']
    },
    {
      id: 'ultra_vip', name: 'Ultra VIP', emoji: '🌟', color: '#a78bfa',
      glow: 'rgba(167,139,250,0.5)',   cost: 2000000,
      badge: '🌟 ULTRA',
      benefits: { gold: 60, xp: 60, atk: 10, drop: 5, crit: 0 },
      perks: ['Gold +60%', 'XP +60%', 'ATK +10%', 'Drop +5%']
    },
    {
      id: 'elite',    name: 'ELITE',      emoji: '💎', color: '#38bdf8',
      glow: 'rgba(56,189,248,0.5)',    cost: 8000000,
      badge: '💎 ELITE',
      benefits: { gold: 120, xp: 120, atk: 30, drop: 15, crit: 5 },
      perks: ['Gold +120%', 'XP +120%', 'ATK +30%', 'Drop +15%', 'Crit +5%']
    },
    {
      id: 'legend',   name: 'LEGEND',     emoji: '🔮', color: '#e879f9',
      glow: 'rgba(232,121,249,0.55)',  cost: 30000000,
      badge: '🔮 LEGEND',
      benefits: { gold: 300, xp: 300, atk: 75, drop: 30, crit: 15 },
      perks: ['Gold +300%', 'XP +300%', 'ATK +75%', 'Drop +30%', 'Crit +15%']
    },
    {
      id: 'deus',     name: 'DEUS',       emoji: '👑', color: '#fde68a',
      glow: 'rgba(253,230,138,0.65)',  cost: 150000000,
      badge: '👑 DEUS',
      benefits: { gold: 999, xp: 999, atk: 200, drop: 60, crit: 30 },
      perks: ['Gold +999%', 'XP +999%', 'ATK +200%', 'Drop +60%', 'Crit +30%', 'Imune 1 Hit Fatal']
    },
    {
      id: 'titan',    name: 'TITÃ',       emoji: '🪐', color: '#ef4444',
      glow: 'rgba(239,68,68,0.65)',    cost: 1000000000,
      badge: '🪐 TITÃ',
      benefits: { gold: 5000, xp: 5000, atk: 500, drop: 100, crit: 50 },
      perks: ['Gold +5000%', 'XP +5000%', 'ATK +500%', 'Drop +100%', 'Crit +50%', 'Imune 1 Hit Fatal']
    },
    {
      id: 'entity',   name: 'ENTIDADE',   emoji: '👁️', color: '#06b6d4',
      glow: 'rgba(6,182,212,0.7)',     cost: 10000000000,
      badge: '👁️ ENTIDADE',
      benefits: { gold: 20000, xp: 20000, atk: 2000, drop: 200, crit: 75 },
      perks: ['Gold +20000%', 'XP +20000%', 'ATK +2000%', 'Drop +200%', 'Crit +75%', 'Regenera 5% HP/turno', 'Imune 1 Hit Fatal']
    },
    {
      id: 'omni',     name: 'ONIPOTENTE', emoji: '🌌', color: '#ec4899',
      glow: 'rgba(236,72,153,0.8)',    cost: 50000000000,
      badge: '🌌 OMNI',
      benefits: { gold: 99999, xp: 99999, atk: 9999, drop: 500, crit: 90 },
      perks: ['Gold +99999%', 'XP +99999%', 'ATK +9999%', 'Drop +500%', 'Crit +90%', 'Regenera 15% HP/turno', 'Imune 3 Hits Fatais']
    },
    {
      id: 'source',   name: 'CÓDIGO FONTE', emoji: '💻', color: '#10b981',
      glow: 'rgba(16,185,129,1.0)',    cost: 500000000000,
      badge: '💻 ROOT',
      benefits: { gold: 999999, xp: 999999, atk: 99999, drop: 999, crit: 100 },
      perks: ['Gold +999999%', 'IMORTAL', 'Dano máximo em críticos', 'Drop garantido', 'Crit sempre 100%']
    },
  ];

  // ── COSMÉTICOS: BORDAS ────────────────────────────────────────
  var BORDERS = [
    { id: 'border_cyan',    tier: 'normal',  name: '🔷 Ciano',          cost: 80000,       css: '3px solid #06b6d4', glow: '0 0 12px rgba(6,182,212,0.6)' },
    { id: 'border_purple',  tier: 'normal',  name: '🟣 Violeta',        cost: 120000,      css: '3px solid #a78bfa', glow: '0 0 14px rgba(167,139,250,0.6)' },
    { id: 'border_gold',    tier: 'normal',  name: '🟡 Dourada',        cost: 350000,      css: '3px solid #fbbf24', glow: '0 0 16px rgba(251,191,36,0.7)' },
    { id: 'border_rainbow', tier: 'normal',  name: '🌈 Arco-Íris',      cost: 1000000,     css: '3px solid transparent', glow: '0 0 18px rgba(255,255,255,0.5)', rainbow: true },
    { id: 'border_void',    tier: 'supreme', name: '🌀 Vazio Eterno',   cost: 5000000,     css: '3px solid #818cf8', glow: '0 0 22px rgba(129,140,248,0.8)', pulse: true },
    { id: 'border_glitch',  tier: 'supreme', name: '👾 Glitch',         cost: 80000000,    css: '4px solid #10b981', glow: '0 0 25px #10b981', glitch: true },
    { id: 'border_neon',    tier: 'supreme', name: '🔲 Néon Hacker',    cost: 250000000,   css: '2px solid #0ff',    glow: '0 0 15px #0ff',    neon: true, square: true },
    { id: 'border_plasma',  tier: 'omega',   name: '☄️ Plasma Estelar', cost: 1000000000,  css: '4px solid #38bdf8', glow: '0 0 40px #38bdf8', pulse: true },
    { id: 'border_inferno', tier: 'omega',   name: '🔥 Chama Negra',    cost: 15000000000, css: '4px dashed #991b1b',glow: '0 0 40px #7f1d1d', glitch: true },
    { id: 'border_singul',  tier: 'omega',   name: '⚫ Singularidade',  cost: 50000000000, css: '5px solid #c084fc', glow: '0 0 60px #ef4444', pulse: true },
  ];

  // ── COSMÉTICOS: TÍTULOS ───────────────────────────────────────
  var TITLES = [
    { id: 'title_slayer',    tier: 'normal',  name: '⚔️ Caçador de Sombras', cost: 200000,      text: '⚔️ Caçador de Sombras', color: '#f87171' },
    { id: 'title_sage',      tier: 'normal',  name: '📖 Sábio Ancião',       cost: 300000,      text: '📖 Sábio Ancião',       color: '#a78bfa' },
    { id: 'title_dragon',    tier: 'normal',  name: '🐉 Dragão',             cost: 900000,      text: '🐉 Dragão',             color: '#fb923c' },
    { id: 'title_god',       tier: 'supreme', name: '👑 Deus',               cost: 3000000,     text: '👑 Deus',               color: '#fde68a' },
    { id: 'title_creator',   tier: 'supreme', name: '⚡ O Arquiteto',        cost: 50000000,    text: '⚡ O Arquiteto',        color: '#60a5fa' },
    { id: 'title_destroyer', tier: 'supreme', name: '💥 Destruidor de Mundos',cost: 500000000,  text: '💥 Destruidor de Mundos',color: '#ef4444' },
    { id: 'title_omni',      tier: 'omega',   name: '👁️ O Onipotente',       cost: 5000000000,  text: '👁️ O Onipotente',       color: '#c084fc' },
    { id: 'title_inevitable',tier: 'omega',   name: '⏳ Fim dos Tempos',     cost: 25000000000, text: '⏳ Fim dos Tempos',     color: '#94a3b8' },
    { id: 'title_ng6',       tier: 'omega',   name: '🪐 Mestre Dimensional', cost: 100000000000,text: '🪐 Mestre Dimensional', color: '#e879f9' },
  ];

  // ── COSMÉTICOS: FUNDOS ────────────────────────────────────────
  var BACKGROUNDS = [
    { id: 'bg_flames',    tier: 'normal',  name: '🔥 Chamas',          cost: 400000,       bgId: 'flames' },
    { id: 'bg_paradise',  tier: 'normal',  name: '🌴 Paraíso',         cost: 2000000,      bgId: 'paradise' },
    { id: 'bg_matrix',    tier: 'supreme', name: '💻 Matrix',          cost: 15000000,     bgId: 'matrix' },
    { id: 'bg_dataflow',  tier: 'supreme', name: '💾 Fluxo de Dados',  cost: 75000000,     bgId: 'dataflow' },
    { id: 'bg_cyber',     tier: 'supreme', name: '霓 Ciber-Cidade',    cost: 50000000,     bgId: 'cyber' },
    { id: 'bg_blackhole', tier: 'omega',   name: '🌀 Buraco Negro',    cost: 5000000000,   bgId: 'blackhole' },
    { id: 'bg_bloodmoon', tier: 'omega',   name: '🩸 Lua de Sangue',   cost: 20000000000,  bgId: 'bloodmoon' },
    { id: 'bg_abyss',     tier: 'omega',   name: '🌌 Abismo Quântico', cost: 150000000000, bgId: 'abyss' },
  ];

  // ── BANNERS ───────────────────────────────────────────────────
  // Banners são imagens/gradientes exibidos atrás do card no perfil, menu e batalha
  var BANNERS = [
    {
      id: 'banner_basic',    tier: 'normal',  name: '🌒 Crepúsculo',      cost: 150000,
      css: 'linear-gradient(135deg,#1e1b4b 0%,#0f172a 100%)',
      border: '#3730a3'
    },
    {
      id: 'banner_crimson',  tier: 'normal',  name: '🔴 Escarlate',       cost: 600000,
      css: 'linear-gradient(135deg,#450a0a 0%,#1c0505 100%)',
      border: '#991b1b'
    },
    {
      id: 'banner_forest',   tier: 'normal',  name: '🌿 Selva Profunda',  cost: 800000,
      css: 'linear-gradient(135deg,#052e16 0%,#0f172a 100%)',
      border: '#166534'
    },
    {
      id: 'banner_ocean',    tier: 'normal',  name: '🌊 Abissal',         cost: 1200000,
      css: 'linear-gradient(135deg,#082f49 0%,#0c1445 100%)',
      border: '#0ea5e9',
      glow: 'rgba(14,165,233,0.3)'
    },
    {
      id: 'banner_gold',     tier: 'supreme', name: '✨ Ouro Divino',      cost: 10000000,
      css: 'linear-gradient(135deg,#451a03 0%,#1c1002 100%)',
      border: '#d97706',
      glow: 'rgba(217,119,6,0.4)',
      shine: true
    },
    {
      id: 'banner_galaxy',   tier: 'supreme', name: '🌌 Galáxia',         cost: 50000000,
      css: 'radial-gradient(ellipse at top,#1e1b4b 0%,#0f0a1e 60%,#000 100%)',
      border: '#818cf8',
      glow: 'rgba(129,140,248,0.4)',
      stars: true
    },
    {
      id: 'banner_inferno',  tier: 'supreme', name: '🔥 Inferno Negro',   cost: 200000000,
      css: 'linear-gradient(135deg,#1c0505 0%,#0f0000 40%,#1a0000 100%)',
      border: '#dc2626',
      glow: 'rgba(220,38,38,0.5)',
      fire: true
    },
    {
      id: 'banner_void',     tier: 'omega',   name: '⚫ Vazio Primordial', cost: 2000000000,
      css: 'radial-gradient(ellipse at center,#1e0a3e 0%,#000 70%)',
      border: '#7c3aed',
      glow: 'rgba(124,58,237,0.7)',
      vortex: true
    },
    {
      id: 'banner_singularity', tier: 'omega', name: '☄️ Singularidade', cost: 20000000000,
      css: 'conic-gradient(from 180deg at 50% 50%,#000 0deg,#1e1b4b 90deg,#000 180deg,#0f172a 270deg,#000 360deg)',
      border: '#c084fc',
      glow: 'rgba(192,132,252,0.8)',
      pulse: true
    },
    {
      id: 'banner_godcode',  tier: 'omega',   name: '💻 Código Divino',   cost: 100000000000,
      css: 'linear-gradient(180deg,#001a00 0%,#000d00 100%)',
      border: '#10b981',
      glow: 'rgba(16,185,129,1)',
      matrix: true
    },
  ];

  // ── FRAGMENTOS DE IDENTIDADE (Além do VIP) ────────────────────
  var FRAGMENTS = [
    { id: 'frag_aura_fire',   name: '🔥 Aura de Fogo',      cost: 5000000000,   effect: 'aura_fire',   desc: 'Partículas de fogo ao redor do avatar' },
    { id: 'frag_aura_ice',    name: '❄️ Aura Glacial',       cost: 5000000000,   effect: 'aura_ice',    desc: 'Cristais de gelo flutuando' },
    { id: 'frag_aura_thunder',name: '⚡ Aura Relâmpago',     cost: 8000000000,   effect: 'aura_thunder', desc: 'Raios percorrem o avatar' },
    { id: 'frag_nameplate',   name: '📛 Placa de Nome Épica',cost: 3000000000,   effect: 'nameplate',   desc: 'Placa de nome animada com brilho dourado' },
    { id: 'frag_trail',       name: '✨ Rastro Estelar',      cost: 10000000000,  effect: 'trail',       desc: 'Rastro de estrelas ao mover o cursor' },
    { id: 'frag_crown',       name: '👑 Coroa Flutuante',    cost: 15000000000,  effect: 'crown',       desc: 'Coroa animada acima do avatar' },
    { id: 'frag_wings',       name: '🪽 Asas de Anjo',       cost: 25000000000,  effect: 'wings',       desc: 'Asas brilhantes nas costas do avatar' },
    { id: 'frag_shadow',      name: '🌑 Alma das Trevas',    cost: 50000000000,  effect: 'shadow',      desc: 'Sombra pulsante ao redor do avatar' },
    { id: 'frag_code',        name: '💾 Corpo de Código',    cost: 200000000000, effect: 'code',        desc: 'Fragmentos de código cobrem o herói' },
  ];

  // ── SAVE/LOAD ─────────────────────────────────────────────────
  function getVipTier()  { return localStorage.getItem(SAVE_VIP) || null; }
  function setVipTier(id){ localStorage.setItem(SAVE_VIP, id); }
  function getOwned()    { try { return JSON.parse(localStorage.getItem(SAVE_COSM) || '[]'); } catch(e) { return []; } }
  function setOwned(arr) { localStorage.setItem(SAVE_COSM, JSON.stringify(arr)); }
  function getEquipped() { try { return JSON.parse(localStorage.getItem(SAVE_EQUIP) || '{}'); } catch(e) { return {}; } }
  function setEquipped(o){ localStorage.setItem(SAVE_EQUIP, JSON.stringify(o)); }
  function getFrags()    { try { return JSON.parse(localStorage.getItem(SAVE_FRAG) || '[]'); } catch(e) { return []; } }
  function setFrags(a)   { localStorage.setItem(SAVE_FRAG, JSON.stringify(a)); }
  function getCurrentTier(){ var id=getVipTier(); return id ? VIP_TIERS.find(t=>t.id===id) : null; }
  function getTierIndex()  { var id=getVipTier(); return id ? VIP_TIERS.findIndex(t=>t.id===id) : -1; }

  function hasAccess(tier) {
    var idx = getTierIndex();
    if (tier === 'normal')  return true;
    if (tier === 'supreme') return idx >= 1; // ultra_vip e acima
    if (tier === 'omega')   return idx >= 5; // titan e acima
    return false;
  }

  // ── APLICAR BÔNUS DO TIER ─────────────────────────────────────
  function applyTierBonuses() {
    if (!rpgReady()) return;
    var tier = getCurrentTier();
    if (!tier) { rpg._vipGoldBonus = 0; rpg._vipXpBonus = 0; rpg._vipAtkBonus = 0; return; }
    var b = tier.benefits;
    rpg._vipGoldBonus = b.gold / 100;
    rpg._vipXpBonus   = b.xp   / 100;
    rpg._vipAtkBonus  = b.atk  / 100;
    rpg._vipDropBonus = b.drop / 100;
    rpg._vipCritBonus = b.crit / 100;

    // Proteção de hits fatais
    if (!rpg._vipHitPatchV9 && ['deus','titan','entity','omni','source'].includes(tier.id)) {
      rpg._vipHitPatchV9 = true;
      var _orig = rpg.takeDamage ? rpg.takeDamage.bind(rpg) : null;
      if (_orig) {
        var maxBlocks = tier.id === 'omni' ? 3 : tier.id === 'source' ? Infinity : 1;
        var blocks = 0;
        rpg.takeDamage = function(dmg) {
          if (tier.id === 'source') { this.hp = this.getMaxHp ? this.getMaxHp() : this.hp; return; }
          if (blocks < maxBlocks && this.hp - dmg <= 0) { blocks++; this.hp = 1; return; }
          _orig(dmg);
        };
      }
    }

    // Regeneração HP por turno
    if (!rpg._vipRegenPatchV9 && ['entity','omni'].includes(tier.id)) {
      rpg._vipRegenPatchV9 = true;
      var regenPct = tier.id === 'omni' ? 0.15 : 0.05;
      var origAtt = rpg.playerAttack ? rpg.playerAttack.bind(rpg) : null;
      if (origAtt) {
        rpg.playerAttack = function() {
          var result = origAtt.apply(this, arguments);
          var maxHp = this.getMaxHp ? this.getMaxHp() : 1000;
          this.hp = Math.min(maxHp, this.hp + Math.floor(maxHp * regenPct));
          return result;
        };
      }
    }
  }

  // ── INJETAR CSS ───────────────────────────────────────────────
  function injectCSS() {
    if (document.getElementById('vip-v9-css')) return;
    var s = document.createElement('style'); s.id = 'vip-v9-css';
    s.textContent = `
      /* ── Keyframes ── */
      @keyframes vipRainbow    { 0%{filter:hue-rotate(0deg)} 100%{filter:hue-rotate(360deg)} }
      @keyframes vipGlitch     { 0%{transform:translate(0)} 20%{transform:translate(-2px,1px)} 40%{transform:translate(-1px,-1px)} 60%{transform:translate(2px,1px)} 80%{transform:translate(1px,-1px)} 100%{transform:translate(0)} }
      @keyframes vipPulse      { 0%,100%{opacity:1;box-shadow:var(--pGlow);} 50%{opacity:0.7;box-shadow:none;} }
      @keyframes neonSpin      { 100%{transform:rotate(360deg);} }
      @keyframes neonPulse     { 0%{box-shadow:0 0 5px #0ff,inset 0 0 5px #0ff;border-color:#0ff;} 50%{box-shadow:0 0 25px #b026ff,inset 0 0 25px #b026ff;border-color:#b026ff;} 100%{box-shadow:0 0 5px #0ff,inset 0 0 5px #0ff;border-color:#0ff;} }
      @keyframes bannerShine   { 0%{left:-100%} 100%{left:200%} }
      @keyframes bannerStars   { 0%{background-position:0 0,0 0,0 0} 100%{background-position:200px 200px,100px 100px,300px 50px} }
      @keyframes bannerFire    { 0%,100%{opacity:0.6;transform:scaleY(1)} 50%{opacity:1;transform:scaleY(1.05)} }
      @keyframes bannerVortex  { 0%{transform:rotate(0deg)scale(1)} 100%{transform:rotate(360deg)scale(1.05)} }
      @keyframes bannerMatrix  { 0%{background-position:0 0} 100%{background-position:0 100px} }
      @keyframes auraFire      { 0%,100%{box-shadow:0 0 15px 5px rgba(251,146,60,0.6),0 0 30px 10px rgba(239,68,68,0.3);} 50%{box-shadow:0 0 25px 10px rgba(251,146,60,0.9),0 0 50px 20px rgba(239,68,68,0.5);} }
      @keyframes auraIce       { 0%,100%{box-shadow:0 0 15px 5px rgba(147,197,253,0.6),0 0 30px 10px rgba(96,165,250,0.3);} 50%{box-shadow:0 0 25px 10px rgba(186,230,253,0.9),0 0 50px 20px rgba(147,197,253,0.5);} }
      @keyframes auraThunder   { 0%,100%{box-shadow:0 0 10px 3px rgba(253,224,71,0.8);} 33%{box-shadow:0 0 30px 12px rgba(250,204,21,1),0 0 5px 2px #fff;} 66%{box-shadow:0 0 8px 2px rgba(253,224,71,0.5);} }
      @keyframes auraShadow    { 0%,100%{box-shadow:0 0 20px 8px rgba(0,0,0,0.9),0 0 40px 15px rgba(124,58,237,0.3);} 50%{box-shadow:0 0 35px 15px rgba(0,0,0,0.95),0 0 70px 25px rgba(124,58,237,0.5);} }
      @keyframes crownFloat    { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-4px);} }
      @keyframes nameplateGlow { 0%,100%{text-shadow:0 0 8px #fbbf24,0 0 16px rgba(251,191,36,0.5);} 50%{text-shadow:0 0 16px #fbbf24,0 0 32px rgba(251,191,36,0.8),0 0 48px rgba(251,191,36,0.3);} }
      @keyframes flowData      { 0%{background-position:0 0,0 0;} 100%{background-position:0 100px,0 0;} }
      @keyframes vMS           { from{background-position:0 0} to{background-position:0 20px} }

      /* ── Borda Néon ── */
      .vip-neon-border { animation:neonPulse 3s infinite alternate!important; background:rgba(0,0,0,0.5); }
      .vip-neon-border::after { content:''; position:absolute; inset:-6px; border:1px dashed rgba(0,255,255,0.6); border-radius:16px; animation:neonSpin 10s linear infinite; pointer-events:none; }
      .vip-pulse-border { animation:vipRainbow 3s linear infinite; }
      .vip-glitch-border { animation:vipGlitch 0.3s infinite; }

      /* ── Fundos ── */
      .vip-bg-flames    { background:linear-gradient(to top,rgba(251,146,60,0.1),transparent 60%); }
      .vip-bg-paradise  { background:linear-gradient(to bottom,#0284c733,#10b98133); }
      .vip-bg-matrix::before { content:''; position:absolute; inset:0; background:repeating-linear-gradient(0deg,rgba(52,211,153,0.03) 0px,transparent 2px,transparent 20px); animation:vMS 2s linear infinite; }
      .vip-bg-dataflow  { background:linear-gradient(rgba(15,10,30,0.85),rgba(5,5,15,0.95)),repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,255,0.05) 3px,rgba(0,255,255,0.05) 3px); background-size:100% 100%,100% 20px; animation:flowData 2.5s linear infinite; box-shadow:inset 0 0 40px rgba(0,255,255,0.1); }
      .vip-bg-cyber     { background:linear-gradient(180deg,rgba(139,92,246,0.1) 0%,rgba(236,72,153,0.15) 100%); }
      .vip-bg-blackhole { background:radial-gradient(circle at center,transparent 10%,rgba(0,0,0,0.9) 80%); box-shadow:inset 0 0 50px rgba(139,92,246,0.5); }
      .vip-bg-bloodmoon { background:radial-gradient(circle at top,rgba(220,38,38,0.3) 0%,rgba(0,0,0,0.95) 80%); }
      .vip-bg-abyss     { background:radial-gradient(ellipse at bottom,#1e1b4b 0%,#000 100%); box-shadow:inset 0 0 100px #312e81; }

      /* ── Banner Wrappers ── */
      /* O banner é absoluto — filhos diretos do container ficam acima via z-index */
      .vip-banner-wrap  { position:absolute; inset:0; border-radius:inherit; overflow:hidden; pointer-events:none; z-index:0; }
      /* Todos os filhos diretos de um container com banner ficam sobre ele */
      #menu-hero-card > *:not(.vip-banner-wrap):not(.vip-bg-effect),
      #profile-modal .rounded-xl.border > *:not(.vip-banner-wrap):not(.vip-bg-effect) { position:relative; z-index:1; }
      .vip-banner-shine::after { content:''; position:absolute; top:0; left:-100%; width:50%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent); animation:bannerShine 3s ease-in-out infinite; }
      .vip-banner-stars { background:radial-gradient(1px 1px at 20% 30%,rgba(255,255,255,0.8),transparent),radial-gradient(1px 1px at 70% 20%,rgba(255,255,255,0.6),transparent),radial-gradient(1px 1px at 50% 80%,rgba(255,255,255,0.9),transparent),radial-gradient(2px 2px at 85% 60%,rgba(255,255,255,0.4),transparent); background-size:200px 200px,100px 100px,300px 300px,150px 150px; animation:bannerStars 8s linear infinite; }
      .vip-banner-fire::after { content:''; position:absolute; bottom:0; left:0; right:0; height:40%; background:linear-gradient(to top,rgba(239,68,68,0.25),rgba(251,146,60,0.1),transparent); animation:bannerFire 2s ease-in-out infinite; }
      .vip-banner-matrix-fx::before { content:''; position:absolute; inset:0; background:repeating-linear-gradient(0deg,rgba(16,185,129,0.04) 0px,transparent 2px,transparent 20px); animation:bannerMatrix 3s linear infinite; }
      .vip-banner-vortex::before { content:''; position:absolute; top:50%; left:50%; width:200%; height:200%; transform:translate(-50%,-50%); background:conic-gradient(transparent 0deg,rgba(124,58,237,0.1) 90deg,transparent 180deg); animation:bannerVortex 8s linear infinite; transform-origin:center; }

      /* ── Auras de Fragmento ── */
      .vip-aura-fire    { animation:auraFire    2s ease-in-out infinite!important; }
      .vip-aura-ice     { animation:auraIce     2.5s ease-in-out infinite!important; }
      .vip-aura-thunder { animation:auraThunder 0.5s steps(3) infinite!important; }
      .vip-aura-shadow  { animation:auraShadow  3s ease-in-out infinite!important; }
      .vip-frag-crown   { position:absolute; top:-18px; left:50%; transform:translateX(-50%); font-size:14px; animation:crownFloat 2s ease-in-out infinite; z-index:10; pointer-events:none; }
      .vip-frag-wings   { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-size:28px; opacity:0.35; z-index:0; pointer-events:none; animation:crownFloat 3s ease-in-out infinite; }

      /* ── Nameplate VIP ── */
      .vip-nameplate    { animation:nameplateGlow 2s ease-in-out infinite; }
      .vip-title-inline { font-family:'Rajdhani',sans-serif; font-size:11px; font-weight:900; text-transform:uppercase; text-shadow:0 0 6px currentColor; display:inline-block; white-space:nowrap; animation:nameplateGlow 2.5s ease-in-out infinite; }

      /* ── Badge VIP ── */
      .vip-badge-pill { font-family:'Orbitron',monospace; font-size:8px; font-weight:900; padding:2px 6px; border-radius:4px; text-transform:uppercase; display:inline-block; letter-spacing:1px; white-space:nowrap; animation:vipPulse 2s infinite ease-in-out; }

      /* ── HUD mini badge ── */
      #vip-hud-mini-v9 { font-size:7px!important; padding:1px 4px!important; letter-spacing:0!important; }

      /* Melhorar log de combate */
      #battle-log { font-size:12px!important; line-height:1.4!important; min-height:55px!important; padding:6px 8px!important; }
      #boss-dialogue-box { font-size:12px!important; line-height:1.3!important; }
      #profile-name-input { flex-shrink:1!important; max-width:140px!important; }
    `;
    document.head.appendChild(s);
  }

  // ── RENDERIZAR BANNER ─────────────────────────────────────────
  function renderBanner(container, bannerId) {
    var old = container.querySelector('.vip-banner-wrap');
    if (old) old.remove();
    if (!bannerId) return;

    var bDef = BANNERS.find(b => b.id === bannerId);
    if (!bDef) return;

    var wrap = document.createElement('div');
    wrap.className = 'vip-banner-wrap';
    wrap.style.background = bDef.css;

    if (bDef.border) {
      container.style.borderColor = bDef.border;
      if (bDef.glow) container.style.boxShadow = '0 0 20px ' + bDef.glow;
    }

    if (bDef.shine)  { wrap.classList.add('vip-banner-shine'); }
    if (bDef.stars)  { var st = document.createElement('div'); st.className='vip-banner-stars'; st.style.cssText='position:absolute;inset:0;'; wrap.appendChild(st); }
    if (bDef.fire)   { wrap.classList.add('vip-banner-fire'); }
    if (bDef.matrix) { wrap.classList.add('vip-banner-matrix-fx'); }
    if (bDef.vortex) { wrap.classList.add('vip-banner-vortex'); }
    if (bDef.pulse)  { wrap.style.animation = 'vipPulse 3s ease-in-out infinite'; }

    container.style.position = 'relative';
    container.insertBefore(wrap, container.firstChild);
  }

  // ── RENDERIZAR BORDA ──────────────────────────────────────────
  // Aplica borda no container do avatar sem tocar em cssText nem layout
  function renderBorder(avatarEl, borderId) {
    if (!avatarEl) return;
    // Limpar classes VIP anteriores e propriedades de borda apenas
    avatarEl.classList.remove('vip-pulse-border','vip-glitch-border','vip-neon-border');
    avatarEl.style.border            = '';
    avatarEl.style.boxShadow         = '';
    avatarEl.style.backgroundImage   = '';
    avatarEl.style.backgroundOrigin  = '';
    avatarEl.style.backgroundClip    = '';
    avatarEl.style.padding           = '';

    if (!borderId) return;
    var bDef = BORDERS.find(function(b){ return b.id === borderId; });
    if (!bDef) return;

    avatarEl.style.border     = bDef.css;
    avatarEl.style.boxShadow  = bDef.glow;

    if (bDef.rainbow) {
      avatarEl.style.border           = 'none';
      avatarEl.style.backgroundImage  = 'linear-gradient(white,white),linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f)';
      avatarEl.style.backgroundOrigin = 'border-box';
      avatarEl.style.backgroundClip   = 'content-box,border-box';
      avatarEl.style.padding          = '3px';
    }
    if (bDef.pulse)  avatarEl.classList.add('vip-pulse-border');
    if (bDef.glitch) avatarEl.classList.add('vip-glitch-border');
    if (bDef.neon)   avatarEl.classList.add('vip-neon-border');
  }

  // ── APLICAR AURA DE FRAGMENTO ─────────────────────────────────
  function applyFragmentAura(el, fragId) {
    if (!el) return;
    el.classList.remove('vip-aura-fire','vip-aura-ice','vip-aura-thunder','vip-aura-shadow');
    var old = el.parentElement ? el.parentElement.querySelector('.vip-frag-crown,.vip-frag-wings') : null;
    if (old) old.remove();

    if (!fragId) return;
    var fDef = FRAGMENTS.find(f => f.id === fragId);
    if (!fDef) return;

    switch (fDef.effect) {
      case 'aura_fire':    el.classList.add('vip-aura-fire'); break;
      case 'aura_ice':     el.classList.add('vip-aura-ice');  break;
      case 'aura_thunder': el.classList.add('vip-aura-thunder'); break;
      case 'shadow':       el.classList.add('vip-aura-shadow'); break;
      case 'crown':
        var crown = document.createElement('span');
        crown.className = 'vip-frag-crown'; crown.textContent = '👑';
        if (el.parentElement) el.parentElement.style.position = 'relative', el.parentElement.appendChild(crown);
        break;
      case 'wings':
        var wings = document.createElement('span');
        wings.className = 'vip-frag-wings'; wings.textContent = '🪽';
        if (el.parentElement) el.parentElement.style.position = 'relative', el.parentElement.appendChild(wings);
        break;
    }
  }

  // ── APLICAR VISUAIS GLOBAIS ───────────────────────────────────
  function applyGlobalVisuals() {
    var eq = getEquipped();
    var fragOwned = getFrags();
    var hasBorder = !!eq.border;
    var hasFrag   = !!(eq.fragment && fragOwned.includes(eq.fragment));

    // 1. MENU PRINCIPAL — Hero Card
    var menuCard = document.getElementById('menu-hero-card');
    if (menuCard) {
      safeApplyBanner(menuCard, eq.banner);
      if (hasBorder || hasFrag) {
        var menuAvatar = document.getElementById('menu-class-icon-container');
        if (menuAvatar) {
          renderBorder(menuAvatar, eq.border);
          if (hasFrag) applyFragmentAura(menuAvatar, eq.fragment);
        }
      }
    }

    // 2. PERFIL — Hero Card
    var profCard = document.querySelector('#profile-modal .rounded-xl.border.flex');
    if (!profCard) profCard = document.querySelector('#profile-modal .space-y-3 > div:first-child');
    if (profCard) {
      safeApplyBanner(profCard, eq.banner);
      if (hasBorder || hasFrag) {
        var profAvatar = profCard.querySelector('[onclick*="changeAvatar"]');
        if (profAvatar) {
          renderBorder(profAvatar, eq.border);
          if (hasFrag) applyFragmentAura(profAvatar, eq.fragment);
        }
      }
    }

    // 3. BATALHA — só cor de borda na HUD, nunca mexer no avatar/ícones
    var hn = document.getElementById('battle-hero-name');
    if (hn && eq.banner) {
      var bDef = BANNERS.find(function(b){ return b.id === eq.banner; });
      if (bDef && bDef.border) {
        var hudPanel = hn.closest('.rounded-xl') || hn.closest('[class*="rounded"]');
        if (hudPanel) {
          hudPanel.style.borderColor = bDef.border;
          if (bDef.glow) hudPanel.style.boxShadow = '0 0 12px ' + bDef.glow;
        }
      }
    }

    // 4. Fundo decorativo
    safeBgEffect('menu-hero-card', eq.bg);
    safeBgEffect('profile-modal',  eq.bg);
  }

  // Aplica banner como overlay absoluto — nunca como firstChild de layout
  function safeApplyBanner(container, bannerId) {
    // Remover banner anterior
    var old = container.querySelector('.vip-banner-wrap');
    if (old) old.remove();
    // Resetar estilos de banner anteriores
    container.style.borderColor = '';
    if (!bannerId) { container.style.boxShadow = ''; return; }

    var bDef = BANNERS.find(function(b){ return b.id === bannerId; });
    if (!bDef) return;

    // Container precisa de position:relative mas sem perder display
    var cur = window.getComputedStyle(container).position;
    if (cur === 'static') container.style.position = 'relative';

    var wrap = document.createElement('div');
    wrap.className = 'vip-banner-wrap';
    wrap.style.background = bDef.css;

    if (bDef.shine)  wrap.classList.add('vip-banner-shine');
    if (bDef.fire)   wrap.classList.add('vip-banner-fire');
    if (bDef.matrix) wrap.classList.add('vip-banner-matrix-fx');
    if (bDef.vortex) wrap.classList.add('vip-banner-vortex');
    if (bDef.pulse)  wrap.style.animation = 'vipPulse 3s ease-in-out infinite';
    if (bDef.stars) {
      var st = document.createElement('div');
      st.className = 'vip-banner-stars';
      st.style.cssText = 'position:absolute;inset:0;';
      wrap.appendChild(st);
    }

    // Inserir como primeiro filho (é absoluto, não afeta layout de filhos)
    container.insertBefore(wrap, container.firstChild);

    if (bDef.border) {
      container.style.borderColor = bDef.border;
      if (bDef.glow) container.style.boxShadow = '0 0 20px ' + bDef.glow;
    }
  }

  // Aplica efeito de fundo sem afetar posição de filhos
  function safeBgEffect(containerId, bgId) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var existing = container.querySelector('.vip-bg-effect');
    if (existing) existing.remove();
    if (!bgId) return;

    var cur = window.getComputedStyle(container).position;
    if (cur === 'static') container.style.position = 'relative';

    var div = document.createElement('div');
    div.className = 'vip-bg-effect vip-bg-' + bgId;
    div.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:0;border-radius:inherit;overflow:hidden;';
    container.insertBefore(div, container.firstChild);
  }

  // ── INJETAR BADGE VIP ─────────────────────────────────────────
  function buildVipHtml(small) {
    var tier = getCurrentTier(); var eq = getEquipped();
    var html = '';

    if (tier) {
      var sz = small ? '7px' : '9px';
      html += '<span class="vip-badge-pill" style="color:' + tier.color + ';background:' + tier.color + '22;border:1px solid ' + tier.color + '88;--pGlow:0 0 12px ' + tier.glow + ';font-size:' + sz + ';">' + tier.badge + '</span>';
    }

    var titleId = eq.title;
    if (titleId) {
      var td = TITLES.find(t => t.id === titleId);
      if (td) {
        var sz2 = small ? '8px' : '11px';
        html += ' <span class="vip-title-inline" style="color:' + td.color + ';font-size:' + sz2 + ';">' + td.text + '</span>';
      }
    }
    return html;
  }

  function injectBadges() {
    // Menu principal
    var menuNameEl = document.getElementById('menu-hero-name');
    if (menuNameEl) {
      menuNameEl.classList.remove('truncate');
      var existing = document.getElementById('vip-badge-menu-v9');
      if (!existing) {
        existing = document.createElement('span');
        existing.id = 'vip-badge-menu-v9';
        existing.style.cssText = 'display:flex;align-items:center;gap:4px;flex-wrap:wrap;margin-top:2px;';
        menuNameEl.parentNode.insertBefore(existing, menuNameEl.nextSibling);
      }
      existing.innerHTML = buildVipHtml(false);
    }

    // HUD de batalha
    var hudNameEl = document.getElementById('battle-hero-name');
    if (hudNameEl) {
      var existing2 = document.getElementById('vip-badge-hud-v9');
      if (!existing2) {
        existing2 = document.createElement('span');
        existing2.id = 'vip-badge-hud-v9';
        hudNameEl.appendChild(existing2);
      }
      existing2.innerHTML = buildVipHtml(true);
    }

    // Perfil
    var profRank = document.getElementById('profile-rank-badge');
    if (profRank) {
      profRank.innerHTML = buildVipHtml(false);
    }
  }

  // ── LOJA VIP ──────────────────────────────────────────────────
  function openVipShop() {
    var ex = document.getElementById('vip-v9-modal');
    if (ex) { ex.style.display = 'flex'; renderShop(); return; }

    var modal = document.createElement('div');
    modal.id = 'vip-v9-modal';
    modal.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.88);backdrop-filter:blur(8px);';
    modal.onclick = function(e) { if (e.target === modal) modal.style.display = 'none'; };

    var box = document.createElement('div');
    box.id = 'vip-v9-box';
    box.style.cssText = 'background:linear-gradient(135deg,#09090b,#111827);border:1px solid #3f3f46;border-radius:14px;width:min(500px,96vw);max-height:87vh;overflow-y:auto;padding:18px 20px;position:relative;box-shadow:0 0 60px rgba(0,0,0,0.9);';
    modal.appendChild(box);
    document.body.appendChild(modal);
    renderShop();
  }

  window._vipV9Tab = function(t) { currentShopTab = t; renderShop(); };

  function renderShop() {
    var box = document.getElementById('vip-v9-box');
    if (!box || !rpgReady()) return;
    var owned = getOwned(), eq = getEquipped(), fragOwned = getFrags();
    var curTierIdx = getTierIndex(), curTier = getCurrentTier();
    var gold = rpg.gold || 0;

    var html = [];
    html.push('<div style="text-align:center;margin-bottom:14px;">');
    html.push('<div style="font-family:Orbitron,monospace;font-size:18px;font-weight:900;color:#fbbf24;letter-spacing:2px;">👑 LOJA VIP OMNIVERSAL</div>');
    if (curTier) {
      html.push('<div style="margin-top:4px;font-family:Orbitron,monospace;font-size:9px;color:' + curTier.color + ';">' + curTier.badge + ' ATIVO</div>');
    }
    html.push('<div style="margin-top:2px;font-family:Orbitron,monospace;font-size:10px;color:#34d399;">💰 ' + fmt(gold) + ' Gold</div>');
    html.push('</div>');
    html.push('<button onclick="document.getElementById(\'vip-v9-modal\').style.display=\'none\'" style="position:absolute;top:12px;right:16px;background:none;border:none;color:#71717a;font-size:22px;cursor:pointer;">✕</button>');

    // Tabs
    var tabs = [
      { id:'tiers',    l:'⭐ Tiers',  c:'#fbbf24' },
      { id:'banners',  l:'🖼️ Banners'+(hasAccess('normal') ? '' : ' 🔒'), c:'#06b6d4' },
      { id:'cosmetics',l:'✨ Cosméticos', c:'#a78bfa' },
      { id:'fragments',l:'💎 Além VIP',  c:'#ec4899' },
    ];
    html.push('<div style="display:flex;gap:4px;margin-bottom:14px;flex-wrap:wrap;">');
    tabs.forEach(function(t) {
      var act = currentShopTab === t.id;
      html.push('<button onclick="window._vipV9Tab(\'' + t.id + '\')" style="flex:1;min-width:80px;padding:7px 4px;border-radius:6px;font-family:Orbitron,monospace;font-size:8px;font-weight:900;text-transform:uppercase;cursor:pointer;background:' + (act ? t.c + '22' : '#000') + ';border:1px solid ' + (act ? t.c : '#27272a') + ';color:' + (act ? t.c : '#52525b') + ';transition:all 0.2s;">' + t.l + '</button>');
    });
    html.push('</div>');

    if (currentShopTab === 'tiers') {
      // Benefícios atuais
      if (curTier) {
        html.push('<div style="background:#000;border:1px solid #fbbf2444;border-radius:8px;padding:10px;margin-bottom:12px;">');
        html.push('<div style="font-family:Orbitron,monospace;font-size:8px;color:#fbbf24;font-weight:900;margin-bottom:6px;">⚡ BENEFÍCIOS ATIVOS</div>');
        html.push('<div style="display:flex;flex-wrap:wrap;gap:4px;">');
        curTier.perks.forEach(function(p) {
          html.push('<span style="font-family:Rajdhani,sans-serif;font-size:9px;font-weight:700;color:#34d399;background:#064e3b44;border:1px solid #065f46;border-radius:3px;padding:2px 5px;">' + p + '</span>');
        });
        html.push('</div></div>');
      }

      VIP_TIERS.forEach(function(t, i) {
        var isOwn = curTierIdx >= i, isAct = curTier && curTier.id === t.id;
        var isNext = curTierIdx + 1 === i, canAff = gold >= t.cost;
        html.push('<div style="background:#000;border:1px solid ' + (isAct ? t.color + '88' : '#27272a') + ';border-radius:8px;padding:10px;margin-bottom:6px;">');
        html.push('<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">');
        html.push('<div style="font-size:20px;flex-shrink:0;">' + t.emoji + '</div>');
        html.push('<div style="flex:1;">');
        html.push('<div style="font-family:Orbitron,monospace;font-size:11px;font-weight:900;color:' + t.color + ';">' + t.name + '</div>');
        html.push('<div style="font-size:7px;color:#71717a;font-family:\'Fira Code\',monospace;margin-top:1px;">💰 ' + fmt(t.cost) + '</div>');
        html.push('</div>');
        if (isAct) {
          html.push('<div style="font-size:9px;font-weight:900;color:' + t.color + ';">✓ ATIVO</div>');
        } else if (isOwn) {
          html.push('<div style="font-size:10px;color:#34d399;">✓</div>');
        } else if (isNext) {
          html.push('<button onclick="window._vipV9BuyTier(\'' + t.id + '\')" style="padding:5px 10px;background:' + (canAff ? t.color + '33' : '#18181b') + ';border:1px solid ' + (canAff ? t.color : '#3f3f46') + ';border-radius:6px;color:' + (canAff ? t.color : '#52525b') + ';font-size:8px;font-weight:900;cursor:' + (canAff ? 'pointer' : 'not-allowed') + ';font-family:Orbitron,monospace;">COMPRAR</button>');
        } else {
          html.push('<div style="font-size:12px;color:#27272a;">🔒</div>');
        }
        html.push('</div>');
        // Perks rápidos
        html.push('<div style="display:flex;flex-wrap:wrap;gap:3px;">');
        t.perks.slice(0,4).forEach(function(p) {
          html.push('<span style="font-size:7px;color:#6b7280;background:#18181b;border-radius:3px;padding:1px 4px;">' + p + '</span>');
        });
        html.push('</div></div>');
      });
    }

    if (currentShopTab === 'banners') {
      html.push('<div style="font-family:Orbitron,monospace;font-size:8px;color:#06b6d4;font-weight:900;margin-bottom:8px;letter-spacing:1px;">🖼️ BANNERS — Aparecem no Menu, Perfil e Batalha</div>');
      html.push('<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:6px;">');
      BANNERS.forEach(function(b) {
        var isOwn = owned.includes(b.id), isEq = eq.banner === b.id;
        var access = hasAccess(b.tier), canAff = gold >= b.cost;
        var glow = b.glow ? ('box-shadow:0 0 20px ' + b.glow + ';') : '';
        html.push('<div style="border:1px solid ' + (isEq ? '#34d399' : (b.border || '#27272a')) + ';border-radius:8px;overflow:hidden;background:#000;">');
        // Banner preview
        html.push('<div style="height:50px;background:' + b.css + ';' + glow + 'position:relative;display:flex;align-items:center;justify-content:center;">');
        html.push('<span style="font-size:20px;z-index:1;position:relative;">' + (b.stars ? '⭐' : b.fire ? '🔥' : b.matrix ? '💻' : b.vortex ? '🌀' : b.shine ? '✨' : '🖼️') + '</span>');
        html.push('</div>');
        html.push('<div style="padding:6px;">');
        html.push('<div style="font-family:Rajdhani,sans-serif;font-size:9px;font-weight:700;color:#d4d4d8;margin-bottom:2px;">' + b.name + '</div>');
        html.push('<div style="font-family:\'Fira Code\',monospace;font-size:7px;color:#71717a;margin-bottom:5px;">💰 ' + fmt(b.cost) + '</div>');
        if (!access) {
          html.push('<div style="font-size:7px;color:#4b5563;text-align:center;">🔒 Requer Tier Maior</div>');
        } else if (isEq) {
          html.push('<button onclick="window._vipV9UnequipBanner()" style="width:100%;padding:3px;background:#064e3b;border:1px solid #10b981;border-radius:4px;font-size:7px;color:#10b981;font-weight:900;cursor:pointer;">✓ EQUIPADO</button>');
        } else if (isOwn) {
          html.push('<button onclick="window._vipV9EquipBanner(\'' + b.id + '\')" style="width:100%;padding:3px;background:#312e81;border:1px solid #6366f1;border-radius:4px;font-size:7px;color:#818cf8;font-weight:900;cursor:pointer;">EQUIPAR</button>');
        } else {
          html.push('<button onclick="window._vipV9BuyCosm(\'' + b.id + '\')" style="width:100%;padding:3px;background:' + (canAff ? '#78350f' : '#18181b') + ';border:1px solid ' + (canAff ? '#fbbf24' : '#3f3f46') + ';border-radius:4px;font-size:7px;color:' + (canAff ? '#fbbf24' : '#52525b') + ';font-weight:900;cursor:' + (canAff ? 'pointer' : 'not-allowed') + ';">COMPRAR</button>');
        }
        html.push('</div></div>');
      });
      html.push('</div>');
    }

    if (currentShopTab === 'cosmetics') {
      // Sub-tabs cosméticos
      var cosTab = currentShopTab + '_sub_' + (window._vipV9CosTab || 'border');
      var cosSubTabs = [
        { id:'border', l:'🔲 Bordas' },
        { id:'title',  l:'📛 Títulos' },
        { id:'bg',     l:'🌆 Fundos' },
      ];
      html.push('<div style="display:flex;gap:4px;margin-bottom:10px;">');
      cosSubTabs.forEach(function(st) {
        var act = (window._vipV9CosTab || 'border') === st.id;
        html.push('<button onclick="window._vipV9CosTab=\'' + st.id + '\';window._vipV9Tab(\'cosmetics\')" style="flex:1;padding:5px;border-radius:4px;font-family:Orbitron,monospace;font-size:8px;font-weight:900;cursor:pointer;background:' + (act ? '#a78bfa22' : '#000') + ';border:1px solid ' + (act ? '#a78bfa' : '#27272a') + ';color:' + (act ? '#a78bfa' : '#52525b') + ';">' + st.l + '</button>');
      });
      html.push('</div>');

      var subTab = window._vipV9CosTab || 'border';
      var items = subTab === 'border' ? BORDERS : subTab === 'title' ? TITLES : BACKGROUNDS;
      var tierGroups = ['normal','supreme','omega'];

      tierGroups.forEach(function(tier) {
        var tierItems = items.filter(function(it) { return it.tier === tier; });
        if (!tierItems.length) return;
        var tLabel = tier === 'normal' ? 'BASE' : tier === 'supreme' ? 'SUPREMO' : 'ÔMEGA';
        var tColor = tier === 'normal' ? '#38bdf8' : tier === 'supreme' ? '#fde68a' : '#ef4444';
        html.push('<div style="font-family:Orbitron,monospace;font-size:8px;font-weight:900;color:' + tColor + ';letter-spacing:1px;margin:10px 0 6px;">' + tLabel + (!hasAccess(tier) ? ' 🔒' : '') + '</div>');
        html.push('<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:6px;">');
        tierItems.forEach(function(it) {
          var isOwn = owned.includes(it.id), isEq = eq[subTab] === it.id;
          var access = hasAccess(it.tier), canAff = gold >= it.cost;
          html.push('<div style="background:#000;border:1px solid ' + (isEq ? '#34d399' : '#27272a') + ';border-radius:6px;padding:6px;text-align:center;display:flex;flex-direction:column;justify-content:space-between;">');
          // Preview
          if (subTab === 'border' && it.css) {
            html.push('<div style="width:36px;height:36px;border-radius:50%;margin:0 auto 4px;border:' + it.css + ';box-shadow:' + (it.glow||'none') + ';display:flex;align-items:center;justify-content:center;font-size:14px;">👤</div>');
          } else if (subTab === 'title' && it.color) {
            html.push('<div style="font-size:8px;font-weight:900;color:' + it.color + ';margin-bottom:4px;text-shadow:0 0 8px ' + it.color + ';">' + it.text + '</div>');
          } else {
            html.push('<div style="font-size:18px;margin-bottom:4px;">🎨</div>');
          }
          html.push('<div style="font-family:Rajdhani,sans-serif;font-size:9px;font-weight:700;color:#d4d4d8;margin-bottom:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + it.name + '</div>');
          html.push('<div style="font-family:\'Fira Code\',monospace;font-size:7px;color:#71717a;margin-bottom:5px;">💰 ' + fmt(it.cost) + '</div>');
          if (!access) {
            html.push('<div style="font-size:7px;color:#4b5563;">🔒 Tier Insuf.</div>');
          } else if (isEq) {
            html.push('<button onclick="window._vipV9Unequip(\'' + subTab + '\')" style="width:100%;padding:3px;background:#064e3b;border:1px solid #10b981;border-radius:3px;font-size:7px;color:#10b981;font-weight:900;cursor:pointer;">✓ EQ</button>');
          } else if (isOwn) {
            html.push('<button onclick="window._vipV9Equip(\'' + it.id + '\',\'' + subTab + '\')" style="width:100%;padding:3px;background:#312e81;border:1px solid #6366f1;border-radius:3px;font-size:7px;color:#818cf8;font-weight:900;cursor:pointer;">EQUIPAR</button>');
          } else {
            html.push('<button onclick="window._vipV9BuyCosm(\'' + it.id + '\')" style="width:100%;padding:3px;background:' + (canAff ? '#78350f' : '#18181b') + ';border:1px solid ' + (canAff ? '#fbbf24' : '#3f3f46') + ';border-radius:3px;font-size:7px;color:' + (canAff ? '#fbbf24' : '#52525b') + ';font-weight:900;cursor:' + (canAff ? 'pointer' : 'not-allowed') + ';">COMPRAR</button>');
          }
          html.push('</div>');
        });
        html.push('</div>');
      });
    }

    if (currentShopTab === 'fragments') {
      html.push('<div style="font-family:Orbitron,monospace;font-size:8px;color:#ec4899;font-weight:900;margin-bottom:4px;letter-spacing:1px;">💎 FRAGMENTOS DE IDENTIDADE</div>');
      html.push('<div style="font-family:Rajdhani,sans-serif;font-size:9px;color:#71717a;margin-bottom:10px;">Cosméticos especiais que vão além do VIP — auras, efeitos visuais no avatar e muito mais.</div>');
      html.push('<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;">');
      FRAGMENTS.forEach(function(f) {
        var isOwn = fragOwned.includes(f.id), isEq = eq.fragment === f.id;
        var canAff = gold >= f.cost;
        html.push('<div style="background:#000;border:1px solid ' + (isEq ? '#ec4899' : '#27272a') + ';border-radius:8px;padding:8px;display:flex;flex-direction:column;gap:4px;">');
        html.push('<div style="font-size:20px;">' + f.name.split(' ')[0] + '</div>');
        html.push('<div style="font-family:Rajdhani,sans-serif;font-size:9px;font-weight:700;color:#f0abfc;">' + f.name + '</div>');
        html.push('<div style="font-size:8px;color:#6b7280;line-height:1.3;">' + f.desc + '</div>');
        html.push('<div style="font-family:\'Fira Code\',monospace;font-size:7px;color:#71717a;">💰 ' + fmt(f.cost) + '</div>');
        if (isEq) {
          html.push('<button onclick="window._vipV9Unequip(\'fragment\')" style="width:100%;padding:4px;background:#831843;border:1px solid #ec4899;border-radius:5px;font-size:7px;color:#f9a8d4;font-weight:900;cursor:pointer;">✓ ATIVO</button>');
        } else if (isOwn) {
          html.push('<button onclick="window._vipV9EquipFrag(\'' + f.id + '\')" style="width:100%;padding:4px;background:#312e81;border:1px solid #6366f1;border-radius:5px;font-size:7px;color:#818cf8;font-weight:900;cursor:pointer;">EQUIPAR</button>');
        } else {
          html.push('<button onclick="window._vipV9BuyFrag(\'' + f.id + '\')" style="width:100%;padding:4px;background:' + (canAff ? '#831843' : '#18181b') + ';border:1px solid ' + (canAff ? '#ec4899' : '#3f3f46') + ';border-radius:5px;font-size:7px;color:' + (canAff ? '#f9a8d4' : '#52525b') + ';font-weight:900;cursor:' + (canAff ? 'pointer' : 'not-allowed') + ';">COMPRAR</button>');
        }
        html.push('</div>');
      });
      html.push('</div>');
    }

    box.innerHTML = html.join('');
  }

  // ── ACTIONS ───────────────────────────────────────────────────
  window._vipV9BuyTier = function(id) {
    if (!rpgReady()) return;
    var t = VIP_TIERS.find(x => x.id === id);
    if (t && rpg.gold >= t.cost) {
      rpg.gold -= t.cost;
      setVipTier(id);
      rpg._vipHitPatchV9 = false; // reset para reaplicar
      applyTierBonuses();
      rpg.save(); rpg.updateUI();
      renderShop();
      showNotif('✅ ' + t.badge + ' ativado! Bônus aplicados.');
    } else {
      showNotif('❌ Ouro insuficiente!');
    }
  };

  window._vipV9BuyCosm = function(id) {
    if (!rpgReady()) return;
    var item = [...BORDERS, ...TITLES, ...BACKGROUNDS, ...BANNERS].find(x => x.id === id);
    var owned = getOwned();
    if (item && !owned.includes(id) && rpg.gold >= item.cost) {
      rpg.gold -= item.cost;
      owned.push(id);
      setOwned(owned);
      rpg.save(); rpg.updateUI();
      renderShop();
      showNotif('✅ ' + item.name + ' comprado!');
    } else {
      showNotif('❌ Ouro insuficiente!');
    }
  };

  window._vipV9BuyFrag = function(id) {
    if (!rpgReady()) return;
    var f = FRAGMENTS.find(x => x.id === id);
    var owned = getFrags();
    if (f && !owned.includes(id) && rpg.gold >= f.cost) {
      rpg.gold -= f.cost;
      owned.push(id);
      setFrags(owned);
      rpg.save(); rpg.updateUI();
      renderShop();
      showNotif('✅ ' + f.name + ' desbloqueado!');
    } else {
      showNotif('❌ Ouro insuficiente!');
    }
  };

  window._vipV9Equip = function(id, type) {
    var eq = getEquipped(); eq[type] = id; setEquipped(eq);
    applyGlobalVisuals(); injectBadges(); renderShop();
  };
  window._vipV9EquipBanner = function(id) {
    var eq = getEquipped(); eq.banner = id; setEquipped(eq);
    applyGlobalVisuals(); renderShop();
  };
  window._vipV9EquipFrag = function(id) {
    var eq = getEquipped(); eq.fragment = id; setEquipped(eq);
    applyGlobalVisuals(); renderShop();
  };
  window._vipV9Unequip = function(type) {
    var eq = getEquipped(); delete eq[type]; setEquipped(eq);
    applyGlobalVisuals(); injectBadges(); renderShop();
  };
  window._vipV9UnequipBanner = function() { window._vipV9Unequip('banner'); };

  function showNotif(msg) {
    var n = document.getElementById('vip-notif-v9');
    if (!n) {
      n = document.createElement('div'); n.id = 'vip-notif-v9';
      n.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#1a1a2e;border:1px solid #fbbf24;border-radius:8px;padding:8px 16px;color:#fde68a;font-family:Orbitron,monospace;font-size:10px;font-weight:900;z-index:99999;pointer-events:none;opacity:0;transition:opacity 0.3s;';
      document.body.appendChild(n);
    }
    n.textContent = msg; n.style.opacity = '1';
    setTimeout(function() { n.style.opacity = '0'; }, 2500);
  }

  // ── BOTÃO NA UI ───────────────────────────────────────────────
  function injectShopButton() {
    if (document.getElementById('vip-v9-shopbtn')) return;

    // Inserir DEPOIS do menu-hero-card, não dentro dele
    var heroCard = document.getElementById('menu-hero-card');
    if (!heroCard || !heroCard.parentNode) return;

    var btn = document.createElement('button');
    btn.id = 'vip-v9-shopbtn';
    btn.onclick = openVipShop;
    btn.style.cssText = [
      'width:100%',
      'padding:7px',
      'font-family:Orbitron,monospace',
      'font-size:9px',
      'font-weight:900',
      'letter-spacing:1px',
      'text-transform:uppercase',
      'border-radius:8px',
      'cursor:pointer',
      'background:linear-gradient(135deg,rgba(251,191,36,0.12),rgba(167,139,250,0.12))',
      'border:1px solid rgba(251,191,36,0.35)',
      'color:#fbbf24',
      'margin-bottom:6px',
      'display:block'
    ].join(';');
    btn.innerHTML = '👑 LOJA VIP OMNIVERSAL';

    // Inserir logo depois do hero card (antes do botão de masmorra)
    heroCard.parentNode.insertBefore(btn, heroCard.nextSibling);
  }

  // ── INIT ──────────────────────────────────────────────────────
  function waitRpg(cb) {
    if (rpgReady()) { cb(); return; }
    var t = setInterval(function() { if (rpgReady()) { clearInterval(t); cb(); } }, 200);
  }

  function init() {
    injectCSS();
    waitRpg(function() {
      applyTierBonuses();

      var _orig = rpg.updateUI.bind(rpg);
      rpg.updateUI = function() {
        _orig.apply(this, arguments);
        setTimeout(function() {
          injectBadges();
          injectShopButton();
          applyGlobalVisuals();
        }, 60);
      };

      setTimeout(function() {
        injectBadges();
        injectShopButton();
        applyGlobalVisuals();
      }, 600);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
