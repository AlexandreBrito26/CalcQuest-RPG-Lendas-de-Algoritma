// ═══════════════════════════════════════════════════════════════
// MODULE: modules-plus.js  —  SISTEMA PLUS+ DE MÓDULOS
// ─────────────────────────────────────────────────────────────
// • Itens e buffs exclusivos para cada módulo do jogo
// • Tier MID-GAME  → desbloqueados a partir do LVL 50
// • Tier END-GAME  → desbloqueados a partir do LVL 200 / Prestígio 5
// • Tier ETERNAL   → desbloqueados após NG+1
// • UI própria: botão "PLUS+" na aba Progresso
// ═══════════════════════════════════════════════════════════════
(function ModulesPlus() {
  'use strict';

  // ── Utilitários ────────────────────────────────────────────────
  function rpgReady() {
    return typeof rpg !== 'undefined' && rpg && typeof rpg.save === 'function';
  }
  function waitRpg(cb, n) {
    if (rpgReady()) { cb(); return; }
    if ((n || 0) < 200) setTimeout(function () { waitRpg(cb, (n || 0) + 1); }, 100);
    else console.warn('[ModulesPlus] rpg não encontrado após 20s');
  }
  function fmt(n) {
    if (!n && n !== 0) return '0';
    if (n >= 1e15) return (n / 1e15).toFixed(1) + 'Qa';
    if (n >= 1e12) return (n / 1e12).toFixed(1) + 'T';
    if (n >= 1e9)  return (n / 1e9).toFixed(1) + 'B';
    if (n >= 1e6)  return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3)  return (n / 1e3).toFixed(1) + 'K';
    return String(Math.floor(n));
  }
  function fmtPct(v) { return (v * 100).toFixed(0) + '%'; }
  function getLevel()    { return (rpgReady() && rpg.level)         || 1; }
  function getPrestige() { return (rpgReady() && rpg.prestigeLevel)  || 0; }
  function getNg()       { return (rpgReady() && rpg.ngLevel)        || 0; }
  function getGold()     { return (rpgReady() && rpg.gold)           || 0; }
  function toast(msg, d) { if (typeof showToast === 'function') showToast(msg, d || 2800); }

  // ── Chave de save ──────────────────────────────────────────────
  const SAVE_KEY = 'cq_modules_plus_v1';
  function loadSave() {
    try { return JSON.parse(localStorage.getItem(SAVE_KEY) || '{}'); } catch { return {}; }
  }
  function writeSave(data) {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  }

  // ══════════════════════════════════════════════════════════════
  // CATÁLOGO DE ITENS PLUS+
  // ─────────────────────────────────────────────────────────────
  // Cada item:
  //   id, name, desc, tier, module, icon, cost (ouro), type, value, req
  // type: 'atk_mult' | 'hp_mult' | 'gold_mult' | 'xp_mult' | 'crit_add'
  //       | 'dodge_add' | 'boss_dmg' | 'prestige_bonus' | 'passive' | 'active'
  // ══════════════════════════════════════════════════════════════
  const ITEMS = [

    // ──────────────────────────────────────────────────────────────
    // MÓDULO: combat-hud.js  — buff visuais e de combate
    // ──────────────────────────────────────────────────────────────
    {
      id: 'hud_focus',
      name: 'Foco de Combate',
      desc: '+15% dano em cada acerto consecutivo (máx 5×)',
      tier: 'mid',
      module: 'Combat HUD',
      icon: '🎯',
      cost: 50_000,
      type: 'atk_mult',
      value: 0.15,
      req: { level: 50 },
    },
    {
      id: 'hud_fury_boost',
      name: 'Fúria Amplificada',
      desc: 'Barra de Fúria carrega 30% mais rápido',
      tier: 'mid',
      module: 'Combat HUD',
      icon: '🔥',
      cost: 80_000,
      type: 'passive',
      value: 0.30,
      req: { level: 75 },
    },
    {
      id: 'hud_berserker',
      name: 'Modo Berserker',
      desc: 'Abaixo de 25% HP: +80% ATK e invulnerabilidade por 2 turnos',
      tier: 'end',
      module: 'Combat HUD',
      icon: '💢',
      cost: 500_000,
      type: 'active',
      value: 0.80,
      req: { level: 200, prestige: 3 },
    },
    {
      id: 'hud_eternal_strike',
      name: 'Golpe Eterno',
      desc: 'Críticos restabelecem 5% HP e aumentam dano do próximo hit em 2×',
      tier: 'eternal',
      module: 'Combat HUD',
      icon: '⚡',
      cost: 2_000_000,
      type: 'passive',
      value: 2.0,
      req: { ng: 1 },
    },

    // ──────────────────────────────────────────────────────────────
    // MÓDULO: alchemy-system.js  — buffs de alquimia
    // ──────────────────────────────────────────────────────────────
    {
      id: 'alch_potency',
      name: 'Potência Alquímica',
      desc: 'Poções recuperam 25% mais HP',
      tier: 'mid',
      module: 'Alchemy System',
      icon: '⚗️',
      cost: 40_000,
      type: 'hp_mult',
      value: 0.25,
      req: { level: 50 },
    },
    {
      id: 'alch_transmute',
      name: 'Grande Transmutação',
      desc: 'Itens descartados convertem para ouro extra (+50% valor)',
      tier: 'mid',
      module: 'Alchemy System',
      icon: '🧪',
      cost: 120_000,
      type: 'gold_mult',
      value: 0.50,
      req: { level: 100 },
    },
    {
      id: 'alch_philosopher',
      name: 'Pedra Filosofal',
      desc: 'Ouro gerado em combate +100% e fragmentos de XP +50%',
      tier: 'end',
      module: 'Alchemy System',
      icon: '💎',
      cost: 800_000,
      type: 'gold_mult',
      value: 1.00,
      req: { level: 250, prestige: 5 },
    },

    // ──────────────────────────────────────────────────────────────
    // MÓDULO: monster-evolution.js  — progressão de monstros
    // ──────────────────────────────────────────────────────────────
    {
      id: 'evo_hunter',
      name: 'Marca do Caçador',
      desc: 'Monstros evoluídos dropam +40% de recompensas',
      tier: 'mid',
      module: 'Monster Evolution',
      icon: '🦴',
      cost: 60_000,
      type: 'gold_mult',
      value: 0.40,
      req: { level: 60 },
    },
    {
      id: 'evo_slayer',
      name: 'Lâmina Evolutiva',
      desc: '+20% dano contra monstros de tier Elite ou superior',
      tier: 'end',
      module: 'Monster Evolution',
      icon: '🗡️',
      cost: 350_000,
      type: 'boss_dmg',
      value: 0.20,
      req: { level: 200, prestige: 3 },
    },
    {
      id: 'evo_apex',
      name: 'Predador Apex',
      desc: 'Kill de monstro Apex: XP ×5 e chance de drop de runa lendária',
      tier: 'eternal',
      module: 'Monster Evolution',
      icon: '👑',
      cost: 3_000_000,
      type: 'xp_mult',
      value: 5.0,
      req: { ng: 1, prestige: 5 },
    },

    // ──────────────────────────────────────────────────────────────
    // MÓDULO: ng-plus-v4.js  — buffs de New Game+
    // ──────────────────────────────────────────────────────────────
    {
      id: 'ng_carryover',
      name: 'Herança do Ciclo',
      desc: 'No próximo NG+, 10% do ouro atual é preservado',
      tier: 'mid',
      module: 'NG+ v4',
      icon: '♾️',
      cost: 200_000,
      type: 'passive',
      value: 0.10,
      req: { level: 150 },
    },
    {
      id: 'ng_resonance',
      name: 'Ressonância de Ciclo',
      desc: 'Cada ciclo de NG+ acumula +5% de todos os stats permanentemente',
      tier: 'end',
      module: 'NG+ v4',
      icon: '🔄',
      cost: 600_000,
      type: 'atk_mult',
      value: 0.05,
      req: { ng: 1, prestige: 4 },
    },
    {
      id: 'ng_omniscience',
      name: 'Onisciência Eterna',
      desc: 'Todos os bosses de NG+ revelam fraqueza antes do combate (+25% dano crítico)',
      tier: 'eternal',
      module: 'NG+ v4',
      icon: '🌌',
      cost: 5_000_000,
      type: 'crit_add',
      value: 0.25,
      req: { ng: 2 },
    },

    // ──────────────────────────────────────────────────────────────
    // MÓDULO: prestige-plus.js  — buffs de prestígio
    // ──────────────────────────────────────────────────────────────
    {
      id: 'pre_empower',
      name: 'Empoderamento de Prestígio',
      desc: 'Cada nível de prestígio adiciona +3% de ATK base permanente',
      tier: 'mid',
      module: 'Prestige Plus',
      icon: '🏅',
      cost: 150_000,
      type: 'prestige_bonus',
      value: 0.03,
      req: { prestige: 1, level: 80 },
    },
    {
      id: 'pre_surge',
      name: 'Surto Pós-Prestígio',
      desc: 'Após cada Prestígio: +200% ATK e +200% ouro por 30 batalhas',
      tier: 'end',
      module: 'Prestige Plus',
      icon: '🌟',
      cost: 400_000,
      type: 'active',
      value: 2.0,
      req: { prestige: 5 },
    },
    {
      id: 'pre_godhood',
      name: 'Ascensão à Divindade',
      desc: 'Prestígio 30+: stats não regridem ao fazer Prestígio, apenas acumulam',
      tier: 'eternal',
      module: 'Prestige Plus',
      icon: '✨',
      cost: 10_000_000,
      type: 'passive',
      value: 1.0,
      req: { prestige: 30, ng: 1 },
    },

    // ──────────────────────────────────────────────────────────────
    // MÓDULO: boss-parts-destructible.js  — mecânica de partes
    // ──────────────────────────────────────────────────────────────
    {
      id: 'boss_weakspot',
      name: 'Análise de Ponto Fraco',
      desc: 'Destruir uma parte do boss: +35% dano ao corpo principal por 3 turnos',
      tier: 'mid',
      module: 'Boss Parts',
      icon: '💥',
      cost: 90_000,
      type: 'boss_dmg',
      value: 0.35,
      req: { level: 80 },
    },
    {
      id: 'boss_dismember',
      name: 'Desmembramento Total',
      desc: 'Destruir todas as partes: instakill se boss estiver abaixo de 20% HP',
      tier: 'end',
      module: 'Boss Parts',
      icon: '☠️',
      cost: 700_000,
      type: 'active',
      value: 0.20,
      req: { level: 250, prestige: 5 },
    },

    // ──────────────────────────────────────────────────────────────
    // MÓDULO: class-synergy.js  — sinergia de classes
    // ──────────────────────────────────────────────────────────────
    {
      id: 'syn_dual',
      name: 'Sinergia Dual',
      desc: 'Combinar duas classes ativas: +20% a todos os stats de ambas',
      tier: 'mid',
      module: 'Class Synergy',
      icon: '🤝',
      cost: 100_000,
      type: 'atk_mult',
      value: 0.20,
      req: { level: 100 },
    },
    {
      id: 'syn_mastery',
      name: 'Maestria Absoluta',
      desc: 'Classe principal com 500+ batalhas: habilidade especial carrega 2× mais rápido',
      tier: 'end',
      module: 'Class Synergy',
      icon: '🎖️',
      cost: 550_000,
      type: 'passive',
      value: 2.0,
      req: { level: 200, prestige: 4 },
    },
    {
      id: 'syn_transcend',
      name: 'Transcendência de Classe',
      desc: 'Desbloqueia slot secreto de 3ª classe (exclusive NG+1)',
      tier: 'eternal',
      module: 'Class Synergy',
      icon: '🌀',
      cost: 8_000_000,
      type: 'passive',
      value: 1.0,
      req: { ng: 1 },
    },
  ];

  // ── Verificar requisitos ───────────────────────────────────────
  function meetsReq(item) {
    const r = item.req || {};
    if (r.level   && getLevel()    < r.level)   return false;
    if (r.prestige && getPrestige() < r.prestige) return false;
    if (r.ng       && getNg()       < r.ng)       return false;
    return true;
  }

  // ── Tier helpers ───────────────────────────────────────────────
  const TIER_META = {
    mid:     { label: 'MID-GAME',  color: '#34d399', bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.35)'  },
    end:     { label: 'END-GAME',  color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.35)'  },
    eternal: { label: 'ETERNAL',   color: '#c084fc', bg: 'rgba(192,132,252,0.12)', border: 'rgba(192,132,252,0.35)' },
  };

  // ──────────────────────────────────────────────────────────────
  // APPLY BUFFS ao rpg baseado nos itens comprados
  // ──────────────────────────────────────────────────────────────
  function applyBuff(item) {
    if (!rpgReady()) return;
    switch (item.type) {
      case 'atk_mult':
        rpg.baseAtk = (rpg.baseAtk || rpg.atk || 10) * (1 + item.value);
        break;
      case 'hp_mult':
        rpg.baseHp  = (rpg.baseHp  || rpg.maxHp || 100) * (1 + item.value);
        rpg.maxHp   = rpg.baseHp;
        rpg.hp      = Math.min(rpg.hp || rpg.maxHp, rpg.maxHp);
        break;
      case 'gold_mult':
        rpg._mplusGoldMult = ((rpg._mplusGoldMult || 1) + item.value);
        break;
      case 'xp_mult':
        rpg._mplusXpMult = ((rpg._mplusXpMult || 1) + item.value);
        break;
      case 'crit_add':
        rpg.critChance = Math.min(0.95, (rpg.critChance || 0.10) + item.value);
        break;
      case 'dodge_add':
        rpg.dodgeChance = Math.min(0.60, (rpg.dodgeChance || 0.05) + item.value);
        break;
      case 'boss_dmg':
        rpg._mplusBossDmg = ((rpg._mplusBossDmg || 1) + item.value);
        break;
      case 'prestige_bonus':
        // Buff cumulativo por nível de prestígio
        rpg.baseAtk = (rpg.baseAtk || rpg.atk || 10) * (1 + item.value * getPrestige());
        break;
      case 'passive':
      case 'active':
        // Registrado para uso futuro pelo combat engine
        if (!rpg._mplusActives) rpg._mplusActives = {};
        rpg._mplusActives[item.id] = item;
        break;
    }
    if (typeof rpg.updateUI === 'function') rpg.updateUI();
  }

  function applyAllPurchased() {
    const data = loadSave();
    const purchased = data.purchased || [];
    ITEMS.forEach(item => {
      if (purchased.includes(item.id)) applyBuff(item);
    });
  }

  // ──────────────────────────────────────────────────────────────
  // UI PRINCIPAL
  // ──────────────────────────────────────────────────────────────
  function injectCSS() {
    if (document.getElementById('mplus-css')) return;
    const s = document.createElement('style');
    s.id = 'mplus-css';
    s.textContent = `
      /* ═══ MODULES PLUS MODAL ═══ */
      #mplus-modal {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 9500;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,0.75);
        backdrop-filter: blur(6px);
      }
      #mplus-modal.active { display: flex; }
      #mplus-box {
        background: #0a0a14;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 20px;
        width: min(96vw, 440px);
        max-height: 88vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 0 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05);
      }
      #mplus-header {
        padding: 16px 18px 12px;
        border-bottom: 1px solid rgba(255,255,255,0.06);
        flex-shrink: 0;
      }
      #mplus-header h2 {
        font-family: 'Orbitron', monospace;
        font-size: 14px;
        font-weight: 900;
        color: #fff;
        letter-spacing: .14em;
        text-transform: uppercase;
        margin: 0 0 10px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      #mplus-tabs {
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
      }
      .mplus-tab {
        padding: 4px 10px;
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.08);
        background: rgba(255,255,255,0.03);
        color: rgba(148,163,184,0.7);
        font-size: 9px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: .08em;
        cursor: pointer;
        transition: all .15s;
      }
      .mplus-tab.active {
        background: rgba(99,102,241,0.18);
        border-color: rgba(99,102,241,0.5);
        color: #a5b4fc;
      }
      #mplus-body {
        flex: 1;
        overflow-y: auto;
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      #mplus-body::-webkit-scrollbar { width: 4px; }
      #mplus-body::-webkit-scrollbar-track { background: transparent; }
      #mplus-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }

      .mplus-item {
        background: rgba(255,255,255,0.025);
        border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.06);
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        transition: border-color .15s;
      }
      .mplus-item:hover { border-color: rgba(255,255,255,0.12); }
      .mplus-item.owned {
        background: rgba(52,211,153,0.06);
        border-color: rgba(52,211,153,0.25);
      }
      .mplus-item.locked {
        opacity: 0.5;
      }
      .mplus-item-top {
        display: flex;
        align-items: flex-start;
        gap: 10px;
      }
      .mplus-icon {
        font-size: 22px;
        flex-shrink: 0;
        line-height: 1;
        margin-top: 1px;
      }
      .mplus-info { flex: 1; min-width: 0; }
      .mplus-name {
        font-family: 'Orbitron', monospace;
        font-size: 10px;
        font-weight: 900;
        color: #e2e8f0;
        letter-spacing: .06em;
        text-transform: uppercase;
        line-height: 1.3;
      }
      .mplus-desc {
        font-size: 10px;
        color: rgba(148,163,184,0.8);
        line-height: 1.45;
        margin-top: 2px;
      }
      .mplus-meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 6px;
        flex-wrap: wrap;
      }
      .mplus-tier-badge {
        font-size: 8px;
        font-weight: 900;
        letter-spacing: .1em;
        text-transform: uppercase;
        padding: 2px 7px;
        border-radius: 5px;
      }
      .mplus-module-tag {
        font-size: 8px;
        color: rgba(148,163,184,0.45);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: .06em;
      }
      .mplus-req {
        font-size: 8px;
        color: rgba(251,113,133,0.7);
        font-weight: 700;
        text-transform: uppercase;
      }
      .mplus-req.ok { color: rgba(52,211,153,0.7); }
      .mplus-buy-btn {
        width: 100%;
        padding: 8px;
        border-radius: 9px;
        border: none;
        font-family: 'Orbitron', monospace;
        font-size: 9px;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: .1em;
        cursor: pointer;
        transition: opacity .15s, transform .1s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
      }
      .mplus-buy-btn:active { transform: scale(.97); }
      .mplus-buy-btn.can-buy {
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: #fff;
      }
      .mplus-buy-btn.cant-buy {
        background: rgba(255,255,255,0.04);
        color: rgba(148,163,184,0.35);
        cursor: not-allowed;
      }
      .mplus-buy-btn.owned-btn {
        background: rgba(52,211,153,0.12);
        color: #34d399;
        cursor: default;
      }
      #mplus-footer {
        padding: 10px 18px 14px;
        border-top: 1px solid rgba(255,255,255,0.05);
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
      }
      #mplus-gold-display {
        font-family: 'Orbitron', monospace;
        font-size: 11px;
        font-weight: 900;
        color: #fcd34d;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      #mplus-close-btn {
        padding: 6px 14px;
        border-radius: 8px;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.08);
        color: rgba(148,163,184,0.6);
        font-size: 10px;
        font-weight: 800;
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: .08em;
        transition: background .15s;
      }
      #mplus-close-btn:hover { background: rgba(255,255,255,0.09); }

      /* Botão de abertura no menu Progresso */
      #mplus-open-btn {
        width: 100%;
        padding: 10px;
        border-radius: 12px;
        border: 1px solid rgba(99,102,241,0.4);
        background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.10));
        color: #a5b4fc;
        font-family: 'Orbitron', monospace;
        font-size: 10px;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: .12em;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        transition: border-color .15s, background .15s;
        margin-bottom: 6px;
      }
      #mplus-open-btn:hover {
        border-color: rgba(99,102,241,0.7);
        background: linear-gradient(135deg, rgba(99,102,241,0.22), rgba(139,92,246,0.15));
      }
      #mplus-open-btn .mplus-btn-badge {
        background: #6366f1;
        color: #fff;
        font-size: 8px;
        padding: 1px 5px;
        border-radius: 4px;
      }
    `;
    document.head.appendChild(s);
  }

  // ──────────────────────────────────────────────────────────────
  // INJETAR BOTÃO NA ABA PROGRESSO
  // ──────────────────────────────────────────────────────────────
  function injectOpenButton() {
    if (document.getElementById('mplus-open-btn')) return;
    const panel = document.getElementById('panel-progresso');
    if (!panel) return;

    const btn = document.createElement('button');
    btn.id = 'mplus-open-btn';
    btn.innerHTML = `⚡ <span>Módulos</span> <span class="mplus-btn-label">PLUS+</span> <span class="mplus-btn-badge" id="mplus-avail-badge">0</span>`;
    btn.addEventListener('click', openMplusModal);
    panel.insertBefore(btn, panel.firstChild);
    updateAvailBadge();
  }

  function updateAvailBadge() {
    const badge = document.getElementById('mplus-avail-badge');
    if (!badge) return;
    const data = loadSave();
    const purchased = data.purchased || [];
    const avail = ITEMS.filter(i => meetsReq(i) && !purchased.includes(i.id)).length;
    badge.textContent = avail;
    badge.style.background = avail > 0 ? '#6366f1' : 'rgba(255,255,255,0.08)';
  }

  // ──────────────────────────────────────────────────────────────
  // MODAL PRINCIPAL
  // ──────────────────────────────────────────────────────────────
  let _currentTab = 'all';

  function buildModal() {
    if (document.getElementById('mplus-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'mplus-modal';
    modal.innerHTML = `
      <div id="mplus-box">
        <div id="mplus-header">
          <h2>⚡ Módulos <span style="color:#8b5cf6;">PLUS+</span></h2>
          <div id="mplus-tabs">
            <button class="mplus-tab active" data-tab="all">Todos</button>
            <button class="mplus-tab" data-tab="mid">Mid-Game</button>
            <button class="mplus-tab" data-tab="end">End-Game</button>
            <button class="mplus-tab" data-tab="eternal">Eternal</button>
            <button class="mplus-tab" data-tab="owned">Comprados</button>
          </div>
        </div>
        <div id="mplus-body"></div>
        <div id="mplus-footer">
          <div id="mplus-gold-display">💰 <span id="mplus-gold-val">0</span></div>
          <button id="mplus-close-btn">Fechar</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Tabs
    modal.querySelectorAll('.mplus-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        modal.querySelectorAll('.mplus-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        _currentTab = tab.dataset.tab;
        renderItems();
      });
    });

    modal.getElementById = function(id) { return document.getElementById(id); };
    document.getElementById('mplus-close-btn').addEventListener('click', closeMplusModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeMplusModal(); });
  }

  function openMplusModal() {
    buildModal();
    document.getElementById('mplus-modal').classList.add('active');
    renderItems();
    refreshGoldDisplay();
  }

  function closeMplusModal() {
    const m = document.getElementById('mplus-modal');
    if (m) m.classList.remove('active');
  }
  // Registro global
  window.openModulesPlus = openMplusModal;

  function refreshGoldDisplay() {
    const el = document.getElementById('mplus-gold-val');
    if (el) el.textContent = fmt(getGold());
  }

  function renderItems() {
    const body = document.getElementById('mplus-body');
    if (!body) return;

    const data = loadSave();
    const purchased = data.purchased || [];

    let list = ITEMS;
    if (_currentTab !== 'all') {
      if (_currentTab === 'owned') list = ITEMS.filter(i => purchased.includes(i.id));
      else list = ITEMS.filter(i => i.tier === _currentTab);
    }

    if (list.length === 0) {
      body.innerHTML = `<div style="text-align:center;padding:32px 0;color:rgba(148,163,184,0.4);font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;">Nenhum item nesta categoria</div>`;
      return;
    }

    body.innerHTML = '';
    list.forEach(item => {
      const owned = purchased.includes(item.id);
      const unlocked = meetsReq(item);
      const canAfford = getGold() >= item.cost;
      const tm = TIER_META[item.tier];

      const reqText = buildReqText(item.req || {});
      const reqOk = unlocked;

      const card = document.createElement('div');
      card.className = 'mplus-item' + (owned ? ' owned' : '') + (!unlocked && !owned ? ' locked' : '');
      card.style.borderColor = owned ? 'rgba(52,211,153,0.3)' : tm.border;

      let btnHTML;
      if (owned) {
        btnHTML = `<button class="mplus-buy-btn owned-btn" disabled>✓ Comprado</button>`;
      } else if (!unlocked) {
        btnHTML = `<button class="mplus-buy-btn cant-buy" disabled>🔒 ${reqText}</button>`;
      } else if (!canAfford) {
        btnHTML = `<button class="mplus-buy-btn cant-buy" disabled>💰 ${fmt(item.cost)} ouro</button>`;
      } else {
        btnHTML = `<button class="mplus-buy-btn can-buy" data-id="${item.id}">💰 Comprar — ${fmt(item.cost)} ouro</button>`;
      }

      card.innerHTML = `
        <div class="mplus-item-top">
          <div class="mplus-icon">${item.icon}</div>
          <div class="mplus-info">
            <div class="mplus-name">${item.name}</div>
            <div class="mplus-desc">${item.desc}</div>
          </div>
        </div>
        <div class="mplus-meta">
          <span class="mplus-tier-badge" style="background:${tm.bg};border:1px solid ${tm.border};color:${tm.color};">${tm.label}</span>
          <span class="mplus-module-tag">${item.module}</span>
          ${!owned && reqText ? `<span class="mplus-req ${reqOk ? 'ok' : ''}">${reqOk ? '✓ Req. OK' : reqText}</span>` : ''}
        </div>
        ${btnHTML}
      `;

      // Buy action
      const buyBtn = card.querySelector('.can-buy');
      if (buyBtn) {
        buyBtn.addEventListener('click', () => purchaseItem(item));
      }

      body.appendChild(card);
    });
  }

  function buildReqText(req) {
    const parts = [];
    if (req.level)    parts.push(`LVL ${req.level}`);
    if (req.prestige) parts.push(`Prestígio ${req.prestige}`);
    if (req.ng)       parts.push(`NG+${req.ng}`);
    return parts.join(' · ');
  }

  function purchaseItem(item) {
    if (!rpgReady()) return;
    if (!meetsReq(item)) { toast('❌ Requisitos não atingidos!'); return; }
    if (getGold() < item.cost) { toast('💰 Ouro insuficiente!'); return; }

    // Debitar ouro
    rpg.gold -= item.cost;

    // Salvar
    const data = loadSave();
    if (!data.purchased) data.purchased = [];
    if (!data.purchased.includes(item.id)) data.purchased.push(item.id);
    writeSave(data);

    // Aplicar buff
    applyBuff(item);

    // Feedback
    toast(`⚡ ${item.name} ativado!`, 3000);

    // Re-render
    renderItems();
    refreshGoldDisplay();
    updateAvailBadge();

    // Update rpg UI se disponível
    if (typeof rpg.save === 'function') rpg.save();
    if (typeof rpg.updateUI === 'function') rpg.updateUI();
  }

  // ──────────────────────────────────────────────────────────────
  // INICIALIZAR
  // ──────────────────────────────────────────────────────────────
  function init() {
    injectCSS();
    applyAllPurchased();

    // Injetar botão na aba progresso (pode não estar no DOM ainda)
    const tryInject = (n) => {
      if (document.getElementById('panel-progresso')) {
        injectOpenButton();
      } else if ((n || 0) < 100) {
        setTimeout(() => tryInject((n || 0) + 1), 200);
      }
    };
    tryInject();

    // Atualizar badge quando tab progresso é aberta
    document.addEventListener('click', (e) => {
      if (e.target && e.target.id === 'tab-progresso') {
        setTimeout(updateAvailBadge, 100);
      }
    });

    console.log('[ModulesPlus] ✅ Carregado —', ITEMS.length, 'itens Plus+ disponíveis');
  }

  // ── Aguardar rpg e DOM ────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => waitRpg(init));
  } else {
    waitRpg(init);
  }

})();
