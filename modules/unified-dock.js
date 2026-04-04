// ═══════════════════════════════════════════════════════════════
// MODULE: unified-dock.js  —  BARRA DOCK UNIFICADA + MENU LIMPO
// ─────────────────────────────────────────────────────────────
// • Substitui TODOS os botões flutuantes por UMA barra limpa
// • Desktop: barra horizontal discreta no topo do painel de jogo
// • Mobile: dock fixo na parte de baixo da tela
// • Ícones: Missões · Codex · Perf · (expandir para mais)
// • Menu Cidade reorganizado: grid 4x2 clean sem acordeões pesados
// • Sugestões inteligentes compactas (1 linha cada)
// • Favoritos personalizáveis (toque longo)
// ═══════════════════════════════════════════════════════════════
(function UnifiedDockModule() {
  'use strict';

  // ══════════════════════════════════════════════════════════════
  // 1. TODAS AS AÇÕES DO JOGO
  // ══════════════════════════════════════════════════════════════
  const ACTIONS = [
    { id:'battle',      label:'Masmorra',   icon:'⚔️',  color:'#ef4444', fn:() => rpg.openPreBattle(false),  cat:'combate',  badge:null },
    { id:'boss',        label:'Boss',       icon:'💀',  color:'#dc2626', fn:() => rpg.openPreBattle(true),   cat:'combate',  badge:null },
    { id:'wave',        label:'Ondas',      icon:'🌊',  color:'#06b6d4', fn:() => openWaveMode(),            cat:'combate',  badge:null },
    { id:'arena',       label:'Arena',      icon:'🏆',  color:'#f59e0b', fn:() => openArena(),               cat:'combate',  badge:null },
    { id:'challenge',   label:'Desafio',    icon:'☠️',  color:'#f43f5e', fn:() => openChallenge(),           cat:'combate',  badge:null },
    { id:'speedrun',    label:'Speed Run',  icon:'⏱️',  color:'#10b981', fn:() => openSpeedRun(),            cat:'combate',  badge:null },
    { id:'shop',        label:'Loja',       icon:'🛒',  color:'#f59e0b', fn:() => openShop(),                cat:'loja',     badge:null },
    { id:'forge',       label:'Forja',      icon:'🔨',  color:'#f97316', fn:() => openForge(),               cat:'loja',     badge:null },
    { id:'gems',        label:'Gemas',      icon:'💎',  color:'#34d399', fn:() => openGems(),                cat:'loja',     badge:null },
    { id:'honor',       label:'Honra',      icon:'🏅',  color:'#fbbf24', fn:() => openHonorShop(),           cat:'loja',     badge:null },
    { id:'wanderer',    label:'Errante',    icon:'🎒',  color:'#fb923c', fn:() => openWanderer(),            cat:'loja',     badge:'wanderer-dot' },
    { id:'craft',       label:'Craft',      icon:'🪄',  color:'#fcd34d', fn:() => openCraft(),               cat:'loja',     badge:null },
    { id:'talents',     label:'Talentos',   icon:'🧠',  color:'#38bdf8', fn:() => openTalentTree(),          cat:'prog',     badge:'talent-dot' },
    { id:'runes',       label:'Runas',      icon:'🔮',  color:'#a78bfa', fn:() => openRuneModal(),           cat:'prog',     badge:null },
    { id:'auras',       label:'Auras',      icon:'✨',  color:'#fbbf24', fn:() => openAuras(),               cat:'prog',     badge:null },
    { id:'mutations',   label:'Mutações',   icon:'🧬',  color:'#a3e635', fn:() => openMutations(),           cat:'prog',     badge:null },
    { id:'memories',    label:'Memórias',   icon:'🧩',  color:'#c084fc', fn:() => openMemories(),            cat:'prog',     badge:null },
    { id:'legacy',      label:'Legados',    icon:'🛡️',  color:'#7dd3fc', fn:() => openLegacy(),              cat:'prog',     badge:null },
    { id:'prestige',    label:'Prestígio',  icon:'🔁',  color:'#fb923c', fn:() => openPrestige(),            cat:'prog',     badge:null },
    { id:'ngplus',      label:'NG+',        icon:'♾️',  color:'#34d399', fn:() => openNgPlus(),              cat:'prog',     badge:null },
    { id:'achievements',label:'Conquistas', icon:'🏅',  color:'#fcd34d', fn:() => openAchievements(),        cat:'missoes',  badge:null },
    { id:'daily',       label:'Diário',     icon:'📖',  color:'#6ee7b7', fn:() => openDaily(),               cat:'missoes',  badge:'diary-dot' },
    { id:'npcs',        label:'Missões',    icon:'👥',  color:'#6ee7b7', fn:() => openNpcs(),                cat:'missoes',  badge:'npc-quest-dot' },
    { id:'battlepass',  label:'Passe',      icon:'⭐',  color:'#c084fc', fn:() => openBattlePass(),          cat:'missoes',  badge:null },
    { id:'season',      label:'Season',     icon:'📅',  color:'#fcd34d', fn:() => openSeason(),              cat:'missoes',  badge:null },
    { id:'event',       label:'Evento',     icon:'⚡',  color:'#f87171', fn:() => openEvent(),               cat:'missoes',  badge:'world-event-badge' },
    { id:'map',         label:'Mapa',       icon:'🗺️',  color:'#818cf8', fn:() => openMap(),                 cat:'mundo',    badge:null },
    { id:'portals',     label:'Portais',    icon:'🌀',  color:'#a78bfa', fn:() => openPortals(),             cat:'mundo',    badge:null },
    { id:'dungeon',     label:'Dungeon',    icon:'🏰',  color:'#6ee7b7', fn:() => openDailyDungeon(),        cat:'mundo',    badge:'dd-dot' },
    { id:'procdungeon', label:'Proc.',      icon:'🕸️',  color:'#a1a1aa', fn:() => openProcDungeon(),         cat:'mundo',    badge:null },
    { id:'mathmode',    label:'Matemát.',   icon:'🧮',  color:'#22d3ee', fn:() => openMathMode(),            cat:'mundo',    badge:null },
    { id:'tourney',     label:'Torneio',    icon:'🥇',  color:'#fbbf24', fn:() => openTourney(),             cat:'mundo',    badge:null },
    { id:'profile',     label:'Perfil',     icon:'👤',  color:'#f472b6', fn:() => openProfile(),             cat:'perfil',   badge:null },
    { id:'bestiary',    label:'Bestiário',  icon:'📚',  color:'#fbbf24', fn:() => openTavern(),              cat:'perfil',   badge:null },
    { id:'lore',        label:'Codex',      icon:'📜',  color:'#d4a843', fn:() => typeof openCodex!=='undefined'?openCodex():openLore(), cat:'perfil', badge:null },
    { id:'oracle',      label:'Oráculo',    icon:'👁️',  color:'#c084fc', fn:() => openOracle(),              cat:'perfil',   badge:null },
    { id:'settings',    label:'Sistema',    icon:'⚙️',  color:'#a1a1aa', fn:() => openSettings(),            cat:'perfil',   badge:null },
    { id:'grimoire',    label:'Grimório',   icon:'📓',  color:'#e879f9', fn:() => openGrimoire(),            cat:'perfil',   badge:null },
  ];

  const CAT_INFO = {
    combate:  { icon:'⚔️',  label:'Combate'    },
    loja:     { icon:'🛒',  label:'Loja'       },
    prog:     { icon:'📈',  label:'Progressão' },
    missoes:  { icon:'📋',  label:'Missões'    },
    mundo:    { icon:'🗺️',  label:'Mundo'      },
    perfil:   { icon:'👤',  label:'Perfil'     },
  };

  const FAV_KEY = 'rpg_dock_favs';
  const DEFAULT_FAVS = ['battle','boss','shop','forge','talents','npcs'];
  let _favs = JSON.parse(localStorage.getItem(FAV_KEY) || JSON.stringify(DEFAULT_FAVS));
  function saveFavs() { localStorage.setItem(FAV_KEY, JSON.stringify(_favs)); }
  function getAction(id) { return ACTIONS.find(a => a.id === id); }
  function hasBadge(action) {
    if (!action.badge) return false;
    const el = document.getElementById(action.badge);
    return el && !el.classList.contains('hidden');
  }

  // ══════════════════════════════════════════════════════════════
  // 2. CSS — TUDO LIMPO, SEM POLUIÇÃO
  // ══════════════════════════════════════════════════════════════
  function injectCSS() {
    if (document.getElementById('dock-css')) return;
    const s = document.createElement('style');
    s.id = 'dock-css';
    s.textContent = `
      /* ══════════════════════════════════════════
         DOCK PRINCIPAL
      ══════════════════════════════════════════ */
      #unified-dock {
        position: fixed;
        z-index: 9000;
        display: flex;
        align-items: center;
        gap: 2px;
        background: rgba(6,6,12,0.92);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 16px;
        padding: 5px;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        box-shadow: 0 4px 24px rgba(0,0,0,0.6);
        transition: opacity 0.25s, transform 0.25s;
      }

      /* CRÍTICO: oculta dock durante batalha — não bloqueia botões ATACAR/MAGIA/etc */
      body.in-battle #unified-dock {
        opacity: 0 !important;
        pointer-events: none !important;
        transform: translateY(10px);
      }
      body.in-battle #dock-drawer {
        opacity: 0 !important;
        pointer-events: none !important;
      }
      /* Desktop: dock visível em batalha mas discreto e sem bloquear */
      @media (pointer: fine) {
        body.in-battle #unified-dock {
          opacity: 0.35 !important;
          pointer-events: all !important;
          transform: none;
        }
        body.in-battle #unified-dock:hover {
          opacity: 1 !important;
        }
      }

      /* Desktop: canto superior direito, pequeno */
      @media (pointer: fine) {
        #unified-dock {
          top: 12px;
          right: 12px;
          flex-direction: row;
        }
      }

      /* Mobile: dock na base, horizontal e esticado */
      @media (pointer: coarse), (max-width: 600px) {
        #unified-dock {
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          flex-direction: row;
          border-radius: 20px;
          padding: 6px 10px;
          gap: 4px;
          width: auto;
          max-width: calc(100vw - 24px);
        }
      }

      /* ── Botão do dock ── */
      .dock-btn {
        position: relative;
        width: 38px;
        height: 38px;
        border-radius: 10px;
        border: none;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 17px;
        cursor: pointer;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
        color: rgba(148,163,184,0.7);
        transition: background 0.12s, color 0.12s, transform 0.1s;
        flex-shrink: 0;
      }
      .dock-btn:hover { background: rgba(255,255,255,0.07); color: #fff; }
      .dock-btn:active { transform: scale(0.88); background: rgba(255,255,255,0.1); }
      .dock-btn.active { background: rgba(255,255,255,0.1); color: #fff; }

      /* Badge ponto vermelho */
      .dock-badge {
        position: absolute;
        top: 5px; right: 5px;
        width: 7px; height: 7px;
        background: #ef4444;
        border-radius: 50%;
        border: 1.5px solid rgba(6,6,12,0.92);
        animation: dockBadgePulse 2s ease-in-out infinite;
      }
      @keyframes dockBadgePulse {
        0%,100%{opacity:1;} 50%{opacity:0.5;}
      }

      /* Separador */
      .dock-sep {
        width: 1px;
        height: 22px;
        background: rgba(255,255,255,0.08);
        margin: 0 2px;
        flex-shrink: 0;
      }

      /* ══════════════════════════════════════════
         DRAWER — painel que abre ao clicar num btn do dock
      ══════════════════════════════════════════ */
      #dock-drawer {
        position: fixed;
        z-index: 8999;
        background: rgba(6,6,12,0.97);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.8);
        overflow: hidden;
        opacity: 0;
        pointer-events: none;
        transform: scale(0.95) translateY(6px);
        transition: opacity 0.18s, transform 0.18s cubic-bezier(0.34,1.4,0.64,1);
        min-width: 260px;
        max-width: min(320px, 90vw);
        max-height: 70vh;
        display: flex;
        flex-direction: column;
      }
      #dock-drawer.open {
        opacity: 1;
        pointer-events: all;
        transform: scale(1) translateY(0);
      }
      @media (pointer: fine) {
        #dock-drawer { top: 58px; right: 12px; }
      }
      @media (pointer: coarse),(max-width:600px) {
        #dock-drawer { bottom: 62px; left: 50%; transform: translateX(-50%) scale(0.95); }
        #dock-drawer.open { transform: translateX(-50%) scale(1); }
      }

      #dock-drawer-header {
        padding: 10px 14px 8px;
        border-bottom: 1px solid rgba(255,255,255,0.06);
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
      }
      #dock-drawer-header h4 {
        font-family: 'Orbitron', monospace;
        font-size: 9px;
        font-weight: 900;
        color: rgba(148,163,184,0.8);
        letter-spacing: 0.15em;
        text-transform: uppercase;
        margin: 0;
      }
      #dock-drawer-close {
        font-size: 12px;
        color: rgba(148,163,184,0.4);
        cursor: pointer;
        line-height: 1;
        padding: 2px 5px;
        border-radius: 4px;
        touch-action: manipulation;
      }
      #dock-drawer-close:hover { color: rgba(148,163,184,0.8); background: rgba(255,255,255,0.05); }

      #dock-drawer-body {
        overflow-y: auto;
        flex: 1;
        padding: 8px;
        -webkit-overflow-scrolling: touch;
      }
      #dock-drawer-body::-webkit-scrollbar { display: none; }

      /* ── Item de ação no drawer ── */
      .drawer-action {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        border-radius: 8px;
        cursor: pointer;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
        transition: background 0.12s;
        position: relative;
      }
      .drawer-action:hover { background: rgba(255,255,255,0.04); }
      .drawer-action:active { background: rgba(255,255,255,0.08); }
      .drawer-action-icon { font-size: 16px; flex-shrink: 0; width: 22px; text-align: center; }
      .drawer-action-label {
        font-family: 'Orbitron', monospace;
        font-size: 9px;
        font-weight: 700;
        color: rgba(226,232,240,0.8);
        letter-spacing: 0.05em;
        flex: 1;
      }
      .drawer-action-badge-dot {
        width: 7px; height: 7px;
        background: #ef4444;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .drawer-cat-label {
        font-family: 'Orbitron', monospace;
        font-size: 7px;
        font-weight: 900;
        color: rgba(148,163,184,0.35);
        letter-spacing: 0.18em;
        text-transform: uppercase;
        padding: 8px 10px 4px;
      }

      /* ══════════════════════════════════════════
         MENU CIDADE — GRID LIMPO (substitui acordeões)
      ══════════════════════════════════════════ */
      #city-quick-grid {
        margin-bottom: 8px;
      }
      .cqg-title {
        font-family: 'Orbitron', monospace;
        font-size: 7px;
        font-weight: 900;
        color: rgba(148,163,184,0.35);
        letter-spacing: 0.18em;
        text-transform: uppercase;
        padding: 2px 0 6px;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .cqg-title::after { content:''; flex:1; height:1px; background:rgba(255,255,255,0.06); }

      /* Barra de favoritos horizontais */
      #cqg-fav-bar {
        display: flex;
        gap: 5px;
        overflow-x: auto;
        scrollbar-width: none;
        padding-bottom: 2px;
        margin-bottom: 8px;
      }
      #cqg-fav-bar::-webkit-scrollbar { display: none; }

      .cqg-fav-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        flex-shrink: 0;
        cursor: pointer;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
        position: relative;
        width: 54px;
      }
      .cqg-fav-icon {
        width: 46px;
        height: 46px;
        border-radius: 13px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.07);
        transition: transform 0.1s, background 0.12s;
        position: relative;
      }
      .cqg-fav-btn:active .cqg-fav-icon { transform: scale(0.87); }
      .cqg-fav-label {
        font-family: 'Orbitron', monospace;
        font-size: 6.5px;
        font-weight: 700;
        color: rgba(148,163,184,0.65);
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 52px;
      }
      .cqg-fav-badge {
        position: absolute;
        top: -3px; right: -3px;
        width: 9px; height: 9px;
        background: #ef4444;
        border-radius: 50%;
        border: 1.5px solid rgba(8,8,18,0.9);
        animation: dockBadgePulse 2s ease-in-out infinite;
      }

      /* Botão "editar" da barra */
      .cqg-edit-fav {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        flex-shrink: 0;
        cursor: pointer;
        touch-action: manipulation;
        width: 46px;
      }
      .cqg-edit-icon {
        width: 46px; height: 46px;
        border-radius: 13px;
        display: flex; align-items: center; justify-content: center;
        font-size: 14px;
        border: 1px dashed rgba(148,163,184,0.2);
        color: rgba(148,163,184,0.3);
        transition: all 0.12s;
      }
      .cqg-edit-fav:active .cqg-edit-icon { transform: scale(0.88); }
      .cqg-edit-label {
        font-family: 'Orbitron', monospace;
        font-size: 6.5px; color: rgba(148,163,184,0.35);
      }

      /* Sugestões compactas */
      #cqg-suggestions { margin-bottom: 6px; }
      .cqg-sug-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 7px 8px;
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.05);
        background: rgba(255,255,255,0.02);
        margin-bottom: 4px;
        cursor: pointer;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
        transition: background 0.12s;
      }
      .cqg-sug-item:active { background: rgba(255,255,255,0.06); }
      .cqg-sug-icon { font-size: 14px; flex-shrink: 0; }
      .cqg-sug-text { flex: 1; min-width: 0; }
      .cqg-sug-name {
        font-family: 'Orbitron', monospace;
        font-size: 8px; font-weight: 700;
        color: rgba(226,232,240,0.85);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .cqg-sug-desc {
        font-size: 8px; color: rgba(148,163,184,0.55); line-height: 1.3;
        margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .cqg-sug-pill {
        font-family: 'Orbitron', monospace;
        font-size: 6px; font-weight: 900; letter-spacing: 0.08em;
        padding: 2px 6px; border-radius: 4px; flex-shrink: 0;
      }
      .pill-hot  { background:rgba(239,68,68,0.15);  color:#f87171; }
      .pill-new  { background:rgba(52,211,153,0.15); color:#34d399; }
      .pill-tip  { background:rgba(251,191,36,0.15); color:#fbbf24; }
      .pill-warn { background:rgba(168,85,247,0.15); color:#c084fc; }

      /* Modal de editar favoritos */
      #fav-edit-modal {
        position: fixed; inset: 0; z-index: 20000;
        background: rgba(0,0,0,0.85);
        display: flex; align-items: flex-end; justify-content: center;
        opacity: 0; pointer-events: none;
        transition: opacity 0.2s;
        backdrop-filter: blur(4px);
      }
      #fav-edit-modal.open { opacity: 1; pointer-events: all; }
      #fav-edit-panel {
        width: min(440px,100vw);
        background: rgba(8,8,18,0.99);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 20px 20px 0 0;
        max-height: 78vh;
        display: flex; flex-direction: column;
        transform: translateY(30px);
        transition: transform 0.25s cubic-bezier(0.34,1.2,0.64,1);
        overflow: hidden;
      }
      #fav-edit-modal.open #fav-edit-panel { transform: translateY(0); }
      #fav-edit-top {
        padding: 14px 16px 10px;
        border-bottom: 1px solid rgba(255,255,255,0.06);
        display: flex; align-items: center; justify-content: space-between;
        flex-shrink: 0;
      }
      #fav-edit-top h3 {
        font-family: 'Orbitron', monospace; font-size: 9px; font-weight: 900;
        color: rgba(0,229,255,0.8); letter-spacing: 0.15em; margin: 0;
      }
      #fav-edit-top p { font-size: 8px; color: rgba(148,163,184,0.45); margin: 3px 0 0; }
      #fav-edit-close {
        width: 26px; height: 26px; border-radius: 50%;
        background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
        color: rgba(148,163,184,0.5); font-size: 13px;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; touch-action: manipulation;
      }
      #fav-edit-body {
        overflow-y: auto; flex: 1; padding: 10px 14px 16px;
        -webkit-overflow-scrolling: touch;
      }
      #fav-edit-body::-webkit-scrollbar { display: none; }
      .fav-cat-title {
        font-family: 'Orbitron', monospace; font-size: 7px; font-weight: 900;
        color: rgba(148,163,184,0.35); letter-spacing: 0.15em;
        padding: 8px 0 5px;
      }
      .fav-grid {
        display: grid; grid-template-columns: repeat(5,1fr); gap: 6px; margin-bottom: 10px;
      }
      .fav-item {
        display: flex; flex-direction: column; align-items: center; gap: 3px;
        padding: 7px 3px 6px; border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.06);
        background: rgba(255,255,255,0.02);
        cursor: pointer; touch-action: manipulation;
        transition: all 0.12s; position: relative;
      }
      .fav-item.sel {
        border-color: rgba(0,229,255,0.4);
        background: rgba(0,229,255,0.06);
      }
      .fav-item.sel::after {
        content: '✓'; position: absolute; top: 3px; right: 5px;
        font-size: 7px; color: #00e5ff; font-weight: 900;
      }
      .fav-item-icon { font-size: 18px; line-height: 1; }
      .fav-item-label {
        font-family: 'Orbitron', monospace; font-size: 6px; font-weight: 700;
        color: rgba(148,163,184,0.65); text-align: center;
        white-space: nowrap; max-width: 52px; overflow: hidden; text-overflow: ellipsis;
      }
      #fav-count {
        text-align: center; padding: 6px;
        font-family: 'Orbitron', monospace; font-size: 8px;
        color: rgba(0,229,255,0.5);
      }
      #fav-save {
        font-family: 'Orbitron', monospace; font-size: 9px; font-weight: 900;
        letter-spacing: 0.15em; color: #fff;
        background: rgba(14,165,233,0.2); border: 1px solid rgba(14,165,233,0.3);
        border-radius: 10px; padding: 11px; width: 100%; cursor: pointer;
        touch-action: manipulation; transition: background 0.15s;
      }
      #fav-save:hover { background: rgba(14,165,233,0.3); }
    `;
    document.head.appendChild(s);
  }

  // ══════════════════════════════════════════════════════════════
  // 3. DOCK PRINCIPAL
  // ══════════════════════════════════════════════════════════════
  let _drawerOpen = false;
  let _drawerContent = null; // id da seção aberta

  function buildDock() {
    const dock = document.createElement('div');
    dock.id = 'unified-dock';

    // Botões fixos do dock
    const DOCK_ITEMS = [
      { id:'d-menu',   icon:'☰',   title:'Menu completo',   fn: () => toggleDrawer('menu')   },
      { id:'d-quests', icon:'📋',  title:'Missões',         fn: () => toggleDrawer('quests') },
      { id:'d-codex',  icon:'📜',  title:'Codex de Lore',   fn: () => { closeDockDrawer(); typeof openCodex!=='undefined'?openCodex():openLore(); } },
      { id:'d-sep',    type:'sep' },
      { id:'d-perf',   icon:'⚡',  title:'Modo Econômico',  fn: () => onPerfToggle()         },
    ];

    DOCK_ITEMS.forEach(item => {
      if (item.type === 'sep') {
        const sep = document.createElement('div');
        sep.className = 'dock-sep';
        dock.appendChild(sep);
        return;
      }
      const btn = document.createElement('button');
      btn.className = 'dock-btn';
      btn.id = item.id;
      btn.title = item.title;
      btn.textContent = item.icon;
      btn.addEventListener('click', item.fn);
      dock.appendChild(btn);
    });

    document.body.appendChild(dock);

    // Drawer
    const drawer = document.createElement('div');
    drawer.id = 'dock-drawer';
    drawer.innerHTML = `
      <div id="dock-drawer-header">
        <h4 id="dock-drawer-title">Menu</h4>
        <span id="dock-drawer-close">✕</span>
      </div>
      <div id="dock-drawer-body"></div>
    `;
    drawer.querySelector('#dock-drawer-close').addEventListener('click', closeDockDrawer);
    document.addEventListener('click', e => {
      if (_drawerOpen && !drawer.contains(e.target) && !dock.contains(e.target)) closeDockDrawer();
    });
    document.body.appendChild(drawer);

    // Atualiza badges periodicamente
    setInterval(updateDockBadges, 5000);
    setTimeout(updateDockBadges, 800);
  }

  function onPerfToggle() {
    const isOn = typeof window._toggleLowPerf === 'function' ? window._toggleLowPerf() : false;
    const btn = document.getElementById('d-perf');
    if (btn) {
      btn.style.color = isOn ? '#34d399' : '';
      btn.title = isOn ? 'Modo Econômico: ON' : 'Modo Econômico: OFF';
    }
  }

  function updateDockBadges() {
    // Badge no botão de missões
    const qBtn = document.getElementById('d-quests');
    if (qBtn && typeof rpg !== 'undefined' && rpg.NPCS) {
      const hasReady = (rpg.NPCS||[]).some(n =>
        n.quests.some(q => !(rpg.npcQuestsDone||[]).includes(q.id) && q.cond?.(rpg))
      );
      let badge = qBtn.querySelector('.dock-badge');
      if (hasReady && !badge) { badge = document.createElement('div'); badge.className='dock-badge'; qBtn.appendChild(badge); }
      if (!hasReady && badge) badge.remove();
    }
  }

  function toggleDrawer(content) {
    if (_drawerOpen && _drawerContent === content) { closeDockDrawer(); return; }
    _drawerContent = content;
    _drawerOpen = true;
    renderDrawer(content);
    document.getElementById('dock-drawer').classList.add('open');
    document.querySelectorAll('.dock-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.getElementById('d-' + content === 'menu' ? 'd-menu' : 'd-quests');
    if (activeBtn) activeBtn.classList.add('active');
  }

  function closeDockDrawer() {
    _drawerOpen = false;
    _drawerContent = null;
    document.getElementById('dock-drawer')?.classList.remove('open');
    document.querySelectorAll('.dock-btn').forEach(b => b.classList.remove('active'));
  }

  function renderDrawer(content) {
    const body = document.getElementById('dock-drawer-body');
    const title = document.getElementById('dock-drawer-title');
    if (!body) return;

    if (content === 'quests') {
      title.textContent = 'Missões NPC';
      renderQuestsInDrawer(body);
    } else {
      title.textContent = 'Menu Completo';
      renderMenuInDrawer(body);
    }
  }

  function renderQuestsInDrawer(body) {
    if (typeof rpg === 'undefined' || !rpg.NPCS) { body.innerHTML = '<div style="padding:16px;text-align:center;font-size:10px;color:rgba(148,163,184,0.4);">A carregar...</div>'; return; }
    const done = rpg.npcQuestsDone || [];
    const lang = rpg.lang || 'pt';
    const npcIcons = { blacksmith:'🔨', sage:'✨', merchant:'🛒', ghost:'👻', soldier:'🛡️' };

    const allQ = [];
    (rpg.NPCS||[]).forEach(npc => {
      (npc.quests||[]).forEach(q => {
        const isDone  = done.includes(q.id);
        const isReady = !isDone && q.cond?.(rpg);
        allQ.push({ npc, q, isDone, isReady });
      });
    });
    allQ.sort((a,b) => { if(a.isReady&&!b.isReady)return -1;if(!a.isReady&&b.isReady)return 1;if(!a.isDone&&b.isDone)return -1;if(a.isDone&&!b.isDone)return 1;return 0; });

    body.innerHTML = allQ.map(({ npc, q, isDone, isReady }) => {
      const icon = npcIcons[npc.id] || '📌';
      const title = q.title?.[lang] || q.title || '???';
      const rew   = q.reward?.[lang] || q.reward || '';
      const statusIcon = isDone ? '✅' : isReady ? '🔔' : '🔒';
      const bg = isDone ? 'rgba(52,211,153,0.03)' : isReady ? 'rgba(52,211,153,0.06)' : 'rgba(255,255,255,0.02)';
      const border = isDone ? 'rgba(52,211,153,0.1)' : isReady ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.05)';
      const claimBtn = isReady
        ? `<button onclick="rpg.claimNpcQuest('${npc.id}','${q.id}');renderDrawer('quests')" style="font-family:Orbitron,monospace;font-size:7px;font-weight:900;color:#fff;background:rgba(5,150,105,0.25);border:1px solid rgba(52,211,153,0.4);border-radius:6px;padding:4px 8px;cursor:pointer;flex-shrink:0;touch-action:manipulation;">RESGATAR</button>` : '';
      return `<div style="display:flex;align-items:center;gap:8px;padding:7px 8px;border-radius:8px;border:1px solid ${border};background:${bg};margin-bottom:4px;${isDone?'opacity:0.45;':''}">
        <div style="font-size:14px;flex-shrink:0;">${statusIcon} ${icon}</div>
        <div style="flex:1;min-width:0;">
          <div style="font-family:Orbitron,monospace;font-size:8px;font-weight:700;color:rgba(226,232,240,0.85);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${title}</div>
          ${rew ? `<div style="font-size:7px;color:#fbbf24;margin-top:1px;">🏆 ${rew}</div>` : ''}
        </div>
        ${claimBtn}
      </div>`;
    }).join('') || '<div style="padding:16px;text-align:center;font-size:10px;color:rgba(148,163,184,0.4);">Sem missões disponíveis</div>';
  }

  function renderMenuInDrawer(body) {
    const cats = Object.keys(CAT_INFO);
    body.innerHTML = cats.map(cat => {
      const actions = ACTIONS.filter(a => a.cat === cat);
      return `
        <div class="drawer-cat-label">${CAT_INFO[cat].icon} ${CAT_INFO[cat].label}</div>
        ${actions.map(a => {
          const badge = hasBadge(a) ? '<div class="drawer-action-badge-dot"></div>' : '';
          return `<div class="drawer-action" data-action="${a.id}">
            <div class="drawer-action-icon">${a.icon}</div>
            <div class="drawer-action-label">${a.label}</div>
            ${badge}
          </div>`;
        }).join('')}
      `;
    }).join('');

    body.querySelectorAll('.drawer-action').forEach(el => {
      el.addEventListener('click', () => {
        const action = getAction(el.dataset.action);
        if (action) { closeDockDrawer(); try { action.fn(); } catch(e){} }
      });
    });
  }

  // ══════════════════════════════════════════════════════════════
  // 4. MENU CIDADE LIMPO
  // ══════════════════════════════════════════════════════════════
  function buildCityMenu() {
    const panel = document.getElementById('panel-cidade');
    if (!panel) return;

    const wrap = document.createElement('div');
    wrap.id = 'city-quick-grid';

    // Barra de favoritos
    const favTitle = document.createElement('div');
    favTitle.className = 'cqg-title';
    favTitle.textContent = 'Acesso Rápido';
    wrap.appendChild(favTitle);

    const favBar = document.createElement('div');
    favBar.id = 'cqg-fav-bar';
    wrap.appendChild(favBar);

    // Sugestões
    const sugTitle = document.createElement('div');
    sugTitle.className = 'cqg-title';
    sugTitle.id = 'cqg-sug-title';
    sugTitle.textContent = 'Sugestões';
    wrap.appendChild(sugTitle);

    const sugWrap = document.createElement('div');
    sugWrap.id = 'cqg-suggestions';
    wrap.appendChild(sugWrap);

    panel.insertBefore(wrap, panel.firstChild);

    renderFavBar();
    renderSuggestions();
    setInterval(() => { renderFavBar(); renderSuggestions(); }, 8000);
  }

  function renderFavBar() {
    const bar = document.getElementById('cqg-fav-bar');
    if (!bar) return;
    bar.innerHTML = '';

    _favs.forEach(id => {
      const a = getAction(id);
      if (!a) return;
      const wrap = document.createElement('div');
      wrap.className = 'cqg-fav-btn';
      const badgeHtml = hasBadge(a) ? '<div class="cqg-fav-badge"></div>' : '';
      wrap.innerHTML = `
        <div class="cqg-fav-icon" style="box-shadow:inset 0 0 0 1px ${a.color}22;">
          ${a.icon}${badgeHtml}
        </div>
        <div class="cqg-fav-label">${a.label}</div>`;
      wrap.addEventListener('click', () => { try { a.fn(); } catch(e){} });
      bar.appendChild(wrap);
    });

    // Botão editar
    const editBtn = document.createElement('div');
    editBtn.className = 'cqg-edit-fav';
    editBtn.innerHTML = `<div class="cqg-edit-icon">✏️</div><div class="cqg-edit-label">Editar</div>`;
    editBtn.addEventListener('click', openFavEdit);
    bar.appendChild(editBtn);
  }

  function renderSuggestions() {
    const wrap = document.getElementById('cqg-suggestions');
    const title = document.getElementById('cqg-sug-title');
    if (!wrap) return;
    const sugs = getSuggestions();
    if (sugs.length === 0) { wrap.style.display='none'; if(title)title.style.display='none'; return; }
    wrap.style.display=''; if(title)title.style.display='';

    const pillClass = { hot:'pill-hot', new:'pill-new', tip:'pill-tip', warn:'pill-warn' };
    const pillLabel = { hot:'AGORA', new:'NOVO', tip:'DICA', warn:'ATENÇÃO' };

    wrap.innerHTML = sugs.map(s => {
      const pill = s.badge ? `<div class="cqg-sug-pill ${pillClass[s.badge]||''}">${pillLabel[s.badge]||''}</div>` : '';
      return `<div class="cqg-sug-item" data-sug-fn="${s.id}">
        <div class="cqg-sug-icon">${s.icon}</div>
        <div class="cqg-sug-text">
          <div class="cqg-sug-name">${s.name}</div>
          <div class="cqg-sug-desc">${s.desc}</div>
        </div>
        ${pill}
      </div>`;
    }).join('');

    wrap.querySelectorAll('.cqg-sug-item').forEach((el, i) => {
      el.addEventListener('click', () => { try { sugs[i].fn(); } catch(e){} });
    });
  }

  function getSuggestions() {
    if (typeof rpg === 'undefined') return [];
    const s = rpg; const sugs = [];
    if ((s.talentPoints||0) > 0) sugs.push({ id:'talents', icon:'🧠', name:'Talentos disponíveis', desc:`${s.talentPoints} ponto(s) para gastar`, badge:'hot', fn:()=>openTalentTree() });
    const npcsReady = (s.NPCS||[]).filter(n=>n.quests.some(q=>!(s.npcQuestsDone||[]).includes(q.id)&&q.cond?.(s)));
    if (npcsReady.length>0) sugs.push({ id:'npcs', icon:'👥', name:'Missão pronta!', desc:`${npcsReady[0].name?.[s.lang||'pt']||'NPC'} tem recompensa`, badge:'hot', fn:()=>openNpcs() });
    const wandDot = document.getElementById('wanderer-dot');
    if (wandDot&&!wandDot.classList.contains('hidden')) sugs.push({ id:'wanderer', icon:'🎒', name:'Mercador Errante', desc:'Ofertas especiais por tempo limitado', badge:'new', fn:()=>openWanderer() });
    const ddDot = document.getElementById('dd-dot');
    if (ddDot&&!ddDot.classList.contains('hidden')) sugs.push({ id:'dungeon', icon:'🏰', name:'Dungeon Diária', desc:'Ainda não completada hoje', badge:'new', fn:()=>openDailyDungeon() });
    if ((s.equippedRunes||[]).length===0&&(s.unlockedRunes||[]).length>0) sugs.push({ id:'runes', icon:'🔮', name:'Runas não equipadas', desc:'Potencial desperdiçado!', badge:'tip', fn:()=>openRuneModal() });
    if ((s.ngPlusActive||0)===0&&(s.bossKills||0)>=18) sugs.push({ id:'ngplus', icon:'♾️', name:'New Game+ disponível', desc:'O ciclo NG+ está desbloqueado', badge:'warn', fn:()=>openNgPlus() });
    if ((s.gold||0)>=500&&(s.level||1)<15) sugs.push({ id:'shop', icon:'🛒', name:'Comprar equipamento', desc:`${Math.floor(s.gold).toLocaleString()} ouro disponível`, badge:'tip', fn:()=>openShop() });
    return sugs.slice(0, 3);
  }

  // ══════════════════════════════════════════════════════════════
  // 5. MODAL EDITAR FAVORITOS
  // ══════════════════════════════════════════════════════════════
  let _tempFavs = [];

  function buildFavModal() {
    const modal = document.createElement('div');
    modal.id = 'fav-edit-modal';
    modal.innerHTML = `
      <div id="fav-edit-panel">
        <div id="fav-edit-top">
          <div>
            <h3>Acesso Rápido</h3>
            <p>Escolhe até 6 ações para aparecerem na barra</p>
          </div>
          <div id="fav-edit-close">✕</div>
        </div>
        <div id="fav-count">0 / 6 selecionados</div>
        <div id="fav-edit-body"></div>
        <div style="padding:0 14px 20px;flex-shrink:0;">
          <button id="fav-save">✅ GUARDAR</button>
        </div>
      </div>
    `;
    modal.addEventListener('click', e => { if(e.target===modal) closeFavEdit(); });
    modal.querySelector('#fav-edit-close').addEventListener('click', closeFavEdit);
    modal.querySelector('#fav-save').addEventListener('click', () => {
      _favs = [..._tempFavs]; saveFavs(); closeFavEdit(); renderFavBar();
    });
    document.body.appendChild(modal);
  }

  function openFavEdit() {
    _tempFavs = [..._favs];
    const body = document.getElementById('fav-edit-body');
    if (!body) return;
    body.innerHTML = '';
    Object.entries(CAT_INFO).forEach(([cat, info]) => {
      const actions = ACTIONS.filter(a => a.cat === cat);
      const catLabel = document.createElement('div');
      catLabel.className = 'fav-cat-title';
      catLabel.textContent = `${info.icon} ${info.label}`;
      body.appendChild(catLabel);
      const grid = document.createElement('div');
      grid.className = 'fav-grid';
      actions.forEach(a => {
        const item = document.createElement('div');
        item.className = 'fav-item' + (_tempFavs.includes(a.id) ? ' sel' : '');
        item.innerHTML = `<div class="fav-item-icon">${a.icon}</div><div class="fav-item-label">${a.label}</div>`;
        item.addEventListener('click', () => {
          const idx = _tempFavs.indexOf(a.id);
          if (idx >= 0) { _tempFavs.splice(idx,1); item.classList.remove('sel'); }
          else if (_tempFavs.length < 6) { _tempFavs.push(a.id); item.classList.add('sel'); }
          else { return; }
          document.getElementById('fav-count').textContent = `${_tempFavs.length} / 6 selecionados`;
        });
        grid.appendChild(item);
      });
      body.appendChild(grid);
    });
    document.getElementById('fav-count').textContent = `${_tempFavs.length} / 6 selecionados`;
    document.getElementById('fav-edit-modal').classList.add('open');
  }

  function closeFavEdit() { document.getElementById('fav-edit-modal')?.classList.remove('open'); }

  // ══════════════════════════════════════════════════════════════
  // 6. INIT
  // ══════════════════════════════════════════════════════════════
  // ── Hook startBattle/endBattle para esconder dock na batalha ──
  function patchBattleHooks() {
    if (typeof rpg === 'undefined') return;

    const _origStart = rpg.startBattle.bind(rpg);
    rpg.startBattle = function(isBoss) {
      document.body.classList.add('in-battle');
      closeDockDrawer();
      _origStart.call(this, isBoss);
    };

    const _origEnd = rpg.endBattle.bind(rpg);
    rpg.endBattle = function() {
      document.body.classList.remove('in-battle');
      _origEnd.call(this);
    };

    // Também oculta ao ir para a batalha via navTo
    const _origFlee = rpg.flee && rpg.flee.bind(rpg);
    if (_origFlee) {
      rpg.flee = function() {
        document.body.classList.remove('in-battle');
        _origFlee.call(this);
      };
    }

    console.log('[UnifiedDock] Battle hooks OK');
  }

  function init() {
    injectCSS();
    buildDock();
    buildFavModal();
    buildCityMenu();
    patchBattleHooks();
    console.log('[UnifiedDock] OK');
  }

  function waitDom(cb, n) {
    if (document.getElementById('panel-cidade')) cb();
    else if ((n||0) < 30) setTimeout(() => waitDom(cb,(n||0)+1), 300);
    else {
      // panel-cidade não encontrado — inicia sem o city menu mas mantém dock + hooks
      injectCSS();
      buildDock();
      buildFavModal();
      waitForRpgHooks(0);
    }
  }

  function waitForRpgHooks(n) {
    if (typeof rpg !== 'undefined' && rpg.startBattle) patchBattleHooks();
    else if ((n||0) < 40) setTimeout(() => waitForRpgHooks((n||0)+1), 250);
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', () => waitDom(init))
    : waitDom(init);

})();
