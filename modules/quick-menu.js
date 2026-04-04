// ═══════════════════════════════════════════════════════════════
// MODULE: quick-menu.js  —  MENU REORGANIZADO + ACESSO RÁPIDO
// ─────────────────────────────────────────────────────────────
// • Barra de atalhos rápidos (7 botões grandes, acessíveis)
// • "Favoritos" personalizáveis — jogador define os seus atalhos
// • Seção "Sugestões Inteligentes" — muda conforme progresso
// • Indicadores de novidade em cada ação relevante
// • Substituição visual do painel de cidade/tabs por grid claro
// • Totalmente compatível com os módulos existentes
// ═══════════════════════════════════════════════════════════════
(function QuickMenuModule() {
  'use strict';

  // ══════════════════════════════════════════════════════════════
  // 1. MAPA DE TODAS AS AÇÕES DO JOGO
  // ══════════════════════════════════════════════════════════════
  const ALL_ACTIONS = [
    // combate
    { id:'battle',       label:'Masmorra',    icon:'⚔️',  color:'#ef4444', fn:() => rpg.openPreBattle(false),  cat:'combate',   hotkey:'M' },
    { id:'boss',         label:'Boss',        icon:'💀',  color:'#dc2626', fn:() => rpg.openPreBattle(true),   cat:'combate',   hotkey:'B' },
    { id:'wave',         label:'Ondas',       icon:'🌊',  color:'#06b6d4', fn:() => openWaveMode(),            cat:'combate'  },
    { id:'arena',        label:'Arena',       icon:'🏆',  color:'#f59e0b', fn:() => openArena(),              cat:'combate'  },
    { id:'challenge',    label:'Desafio',     icon:'💀',  color:'#f43f5e', fn:() => openChallenge(),          cat:'combate'  },
    { id:'speedrun',     label:'Speed Run',   icon:'⏱️',  color:'#10b981', fn:() => openSpeedRun(),           cat:'combate'  },
    // loja & equip
    { id:'shop',         label:'Loja',        icon:'🛒',  color:'#f59e0b', fn:() => openShop(),               cat:'loja'     },
    { id:'forge',        label:'Forja',       icon:'🔨',  color:'#f97316', fn:() => openForge(),              cat:'loja'     },
    { id:'gems',         label:'Gemas',       icon:'💎',  color:'#34d399', fn:() => openGems(),               cat:'loja'     },
    { id:'honor',        label:'Honra',       icon:'🏅',  color:'#fbbf24', fn:() => openHonorShop(),          cat:'loja'     },
    { id:'wanderer',     label:'Errante',     icon:'🎒',  color:'#fb923c', fn:() => openWanderer(),           cat:'loja',    badge:'wanderer-dot' },
    { id:'craft',        label:'Craft',       icon:'🪄',  color:'#fcd34d', fn:() => openCraft(),              cat:'loja'     },
    // progressão
    { id:'talents',      label:'Talentos',    icon:'🧠',  color:'#38bdf8', fn:() => openTalentTree(),         cat:'prog',    badge:'talent-dot' },
    { id:'runes',        label:'Runas',       icon:'🔮',  color:'#a78bfa', fn:() => openRuneModal(),          cat:'prog'     },
    { id:'auras',        label:'Auras',       icon:'✨',  color:'#fbbf24', fn:() => openAuras(),              cat:'prog'     },
    { id:'mutations',    label:'Mutações',    icon:'🧬',  color:'#a3e635', fn:() => openMutations(),          cat:'prog'     },
    { id:'memories',     label:'Memórias',    icon:'🧩',  color:'#c084fc', fn:() => openMemories(),           cat:'prog'     },
    { id:'legacy',       label:'Legados',     icon:'🛡️',  color:'#7dd3fc', fn:() => openLegacy(),             cat:'prog'     },
    { id:'prestige',     label:'Prestígio',   icon:'🔁',  color:'#fb923c', fn:() => openPrestige(),           cat:'prog'     },
    { id:'ngplus',       label:'NG+',         icon:'♾️',  color:'#34d399', fn:() => openNgPlus(),             cat:'prog'     },
    // missões
    { id:'achievements', label:'Conquistas',  icon:'🏅',  color:'#fcd34d', fn:() => openAchievements(),       cat:'missoes'  },
    { id:'daily',        label:'Diário',      icon:'📖',  color:'#6ee7b7', fn:() => openDaily(),              cat:'missoes', badge:'diary-dot' },
    { id:'npcs',         label:'NPCs',        icon:'👥',  color:'#6ee7b7', fn:() => openNpcs(),               cat:'missoes', badge:'npc-quest-dot' },
    { id:'battlepass',   label:'Passe',       icon:'⭐',  color:'#c084fc', fn:() => openBattlePass(),         cat:'missoes'  },
    { id:'season',       label:'Season',      icon:'📅',  color:'#fcd34d', fn:() => openSeason(),             cat:'missoes'  },
    { id:'event',        label:'Evento',      icon:'⚡',  color:'#f87171', fn:() => openEvent(),              cat:'missoes'  },
    // mundo
    { id:'map',          label:'Mapa',        icon:'🗺️',  color:'#818cf8', fn:() => openMap(),                cat:'mundo'    },
    { id:'portals',      label:'Portais',     icon:'🌀',  color:'#a78bfa', fn:() => openPortals(),            cat:'mundo'    },
    { id:'dungeon',      label:'Dungeon',     icon:'🏰',  color:'#6ee7b7', fn:() => openDailyDungeon(),       cat:'mundo',   badge:'dd-dot' },
    { id:'procdungeon',  label:'Masmorra',    icon:'🕸️',  color:'#a1a1aa', fn:() => openProcDungeon(),        cat:'mundo'    },
    { id:'mathmode',     label:'Matemática',  icon:'🧮',  color:'#22d3ee', fn:() => openMathMode(),           cat:'mundo'    },
    { id:'tourney',      label:'Torneio',     icon:'🥇',  color:'#fbbf24', fn:() => openTourney(),            cat:'mundo'    },
    // perfil
    { id:'profile',      label:'Perfil',      icon:'👤',  color:'#f472b6', fn:() => openProfile(),            cat:'perfil'   },
    { id:'bestiary',     label:'Bestiário',   icon:'📚',  color:'#fbbf24', fn:() => openTavern(),             cat:'perfil'   },
    { id:'lore',         label:'Codex',       icon:'📜',  color:'#d4a843', fn:() => (typeof openCodex!=='undefined'?openCodex():openLore()), cat:'perfil' },
    { id:'inventory',    label:'Inventário',  icon:'🎒',  color:'#94a3b8', fn:() => openInventory?.(),        cat:'perfil'   },
    { id:'oracle',       label:'Oráculo',     icon:'👁️',  color:'#c084fc', fn:() => openOracle(),             cat:'perfil'   },
    { id:'secretclass',  label:'Classes',     icon:'🔒',  color:'#c4b5fd', fn:() => openSecretClasses(),      cat:'perfil'   },
    { id:'settings',     label:'Sistema',     icon:'⚙️',  color:'#a1a1aa', fn:() => openSettings(),           cat:'perfil'   },
    { id:'grimoire',     label:'Grimório',    icon:'📓',  color:'#e879f9', fn:() => openGrimoire(),            cat:'perfil'   },
  ];

  const FAV_KEY = 'rpg_quick_favs';
  const DEFAULT_FAVS = ['battle','boss','shop','forge','talents','arena','wave'];
  let _favs = JSON.parse(localStorage.getItem(FAV_KEY) || JSON.stringify(DEFAULT_FAVS));

  function saveFavs() { localStorage.setItem(FAV_KEY, JSON.stringify(_favs)); }
  function getAction(id) { return ALL_ACTIONS.find(a => a.id === id); }

  // ══════════════════════════════════════════════════════════════
  // 2. CSS
  // ══════════════════════════════════════════════════════════════
  function injectStyles() {
    if (document.getElementById('qm-styles')) return;
    const s = document.createElement('style');
    s.id = 'qm-styles';
    s.textContent = `
      /* ── BARRA DE ATALHOS RÁPIDOS ── */
      #qm-bar {
        display: flex;
        gap: 6px;
        padding: 10px 0 4px;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        margin-bottom: 8px;
      }
      #qm-bar::-webkit-scrollbar { display: none; }

      .qm-shortcut {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        flex-shrink: 0;
        cursor: pointer;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
        position: relative;
      }
      .qm-shortcut-icon {
        width: 48px;
        height: 48px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        border: 1.5px solid rgba(255,255,255,0.08);
        background: rgba(255,255,255,0.04);
        transition: transform 0.12s, box-shadow 0.12s;
        position: relative;
        overflow: hidden;
      }
      .qm-shortcut-icon::before {
        content:'';
        position:absolute;
        inset:0;
        background: var(--qm-color, #fff);
        opacity: 0.08;
        border-radius: inherit;
      }
      .qm-shortcut:active .qm-shortcut-icon {
        transform: scale(0.88);
      }
      .qm-shortcut-label {
        font-family: 'Orbitron', monospace;
        font-size: 7px;
        font-weight: 700;
        color: rgba(148,163,184,0.8);
        letter-spacing: 0.04em;
        text-align: center;
        white-space: nowrap;
        max-width: 52px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .qm-shortcut-badge {
        position: absolute;
        top: -3px; right: -3px;
        width: 12px; height: 12px;
        background: #ef4444;
        border-radius: 50%;
        border: 1.5px solid #05050a;
        animation: qmBadgePulse 1.5s ease-in-out infinite;
      }
      @keyframes qmBadgePulse {
        0%,100%{transform:scale(1);} 50%{transform:scale(1.2);}
      }

      /* Botão de editar favs */
      .qm-edit-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        flex-shrink: 0;
        cursor: pointer;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
      }
      .qm-edit-icon {
        width: 48px;
        height: 48px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        border: 1.5px dashed rgba(148,163,184,0.2);
        background: transparent;
        color: rgba(148,163,184,0.35);
        transition: all 0.15s;
      }
      .qm-edit-btn:active .qm-edit-icon { transform: scale(0.88); }

      /* ── GRID DE AÇÕES POR CATEGORIA ── */
      #qm-grid-wrap {
        margin-bottom: 6px;
      }
      .qm-cat-label {
        font-family: 'Orbitron', monospace;
        font-size: 7px;
        font-weight: 900;
        color: rgba(148,163,184,0.4);
        letter-spacing: 0.18em;
        text-transform: uppercase;
        padding: 8px 2px 4px;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .qm-cat-label::after {
        content:'';
        flex:1;
        height:1px;
        background: rgba(148,163,184,0.1);
      }
      .qm-action-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 5px;
        margin-bottom: 4px;
      }
      .qm-action-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 8px 4px 7px;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.06);
        background: rgba(255,255,255,0.025);
        cursor: pointer;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
        transition: background 0.12s, border-color 0.12s, transform 0.1s;
        position: relative;
        overflow: hidden;
        text-decoration: none;
      }
      .qm-action-btn::before {
        content:'';
        position:absolute;
        inset:0;
        background: var(--qm-color, #fff);
        opacity:0;
        transition: opacity 0.15s;
      }
      .qm-action-btn:active {
        transform: scale(0.93);
      }
      .qm-action-btn:active::before { opacity: 0.06; }
      .qm-action-icon { font-size: 18px; line-height: 1; }
      .qm-action-label {
        font-family: 'Orbitron', monospace;
        font-size: 6.5px;
        font-weight: 700;
        color: rgba(148,163,184,0.75);
        text-align: center;
        letter-spacing: 0.04em;
        white-space: nowrap;
        max-width: 58px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .qm-action-badge {
        position: absolute;
        top: 4px; right: 4px;
        width: 7px; height: 7px;
        background: #34d399;
        border-radius: 50%;
        animation: qmBadgePulse 1.5s ease-in-out infinite;
      }

      /* ── SUGESTÕES INTELIGENTES ── */
      #qm-suggestions {
        margin-bottom: 8px;
      }
      .qm-sug-title {
        font-family: 'Orbitron', monospace;
        font-size: 7px;
        font-weight: 900;
        color: rgba(0,229,255,0.5);
        letter-spacing: 0.18em;
        text-transform: uppercase;
        padding: 4px 2px 6px;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .qm-sug-title::before { content:'💡'; font-size:10px; }
      .qm-sug-title::after {
        content:'';
        flex:1;
        height:1px;
        background: rgba(0,229,255,0.1);
      }
      .qm-sug-card {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 9px 10px;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.06);
        background: rgba(255,255,255,0.02);
        margin-bottom: 5px;
        cursor: pointer;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
        transition: background 0.15s, border-color 0.15s;
      }
      .qm-sug-card:active { background: rgba(255,255,255,0.06); }
      .qm-sug-icon { font-size: 22px; flex-shrink: 0; }
      .qm-sug-body { flex: 1; min-width: 0; }
      .qm-sug-name {
        font-family: 'Orbitron', monospace;
        font-size: 8.5px;
        font-weight: 700;
        color: #e2e8f0;
        margin-bottom: 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .qm-sug-desc {
        font-size: 8px;
        color: rgba(148,163,184,0.6);
        line-height: 1.4;
      }
      .qm-sug-arrow {
        font-size: 12px;
        color: rgba(148,163,184,0.3);
        flex-shrink: 0;
      }
      .qm-sug-badge-pill {
        font-family: 'Orbitron', monospace;
        font-size: 6px;
        padding: 2px 6px;
        border-radius: 4px;
        font-weight: 900;
        letter-spacing: 0.08em;
        flex-shrink: 0;
      }
      .qm-sug-new  { background:rgba(52,211,153,0.15); color:#34d399; border:1px solid rgba(52,211,153,0.3); }
      .qm-sug-hot  { background:rgba(239,68,68,0.15);  color:#f87171; border:1px solid rgba(239,68,68,0.3); }
      .qm-sug-tip  { background:rgba(251,191,36,0.15); color:#fbbf24; border:1px solid rgba(251,191,36,0.3); }
      .qm-sug-warn { background:rgba(168,85,247,0.15); color:#c084fc; border:1px solid rgba(168,85,247,0.3); }

      /* ── MODAL DE EDITAR FAVORITOS ── */
      #qm-fav-modal {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.88);
        z-index: 25000;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.25s;
        backdrop-filter: blur(4px);
      }
      #qm-fav-modal.open {
        opacity: 1;
        pointer-events: all;
      }
      #qm-fav-panel {
        width: min(440px, 100vw);
        max-height: 80vh;
        background: rgba(8,8,18,0.99);
        border: 1px solid rgba(0,229,255,0.15);
        border-radius: 20px 20px 0 0;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transform: translateY(40px);
        transition: transform 0.3s cubic-bezier(0.34,1.2,0.64,1);
      }
      #qm-fav-modal.open #qm-fav-panel {
        transform: translateY(0);
      }
      #qm-fav-header {
        padding: 14px 16px 10px;
        border-bottom: 1px solid rgba(0,229,255,0.08);
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
      }
      #qm-fav-header h3 {
        font-family: 'Orbitron', monospace;
        font-size: 10px;
        font-weight: 900;
        color: #00e5ff;
        letter-spacing: 0.15em;
      }
      #qm-fav-header p {
        font-size: 8px;
        color: rgba(148,163,184,0.5);
        margin-top: 2px;
      }
      #qm-fav-close {
        width: 28px;height:28px;border-radius:50%;
        background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);
        color:rgba(148,163,184,0.6);font-size:14px;
        display:flex;align-items:center;justify-content:center;
        cursor:pointer;
      }
      #qm-fav-body {
        flex:1;overflow-y:auto;padding:10px 14px 20px;
        -webkit-overflow-scrolling:touch;
      }
      #qm-fav-body::-webkit-scrollbar{display:none;}
      .qm-fav-section-title {
        font-family:'Orbitron',monospace;font-size:7px;font-weight:900;
        color:rgba(148,163,184,0.4);letter-spacing:0.15em;text-transform:uppercase;
        padding:6px 0 5px;
      }
      .qm-fav-grid {
        display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-bottom:10px;
      }
      .qm-fav-item {
        display:flex;flex-direction:column;align-items:center;gap:3px;
        padding:7px 3px 6px;border-radius:10px;
        border:1px solid rgba(255,255,255,0.06);
        background:rgba(255,255,255,0.02);
        cursor:pointer;touch-action:manipulation;
        transition:all 0.12s;
        position:relative;
      }
      .qm-fav-item.selected {
        border-color:rgba(0,229,255,0.4);
        background:rgba(0,229,255,0.06);
      }
      .qm-fav-item.selected::after {
        content:'✓';
        position:absolute;top:3px;right:5px;
        font-size:7px;color:#00e5ff;font-weight:900;
      }
      .qm-fav-item-icon{font-size:18px;line-height:1;}
      .qm-fav-item-label{
        font-family:'Orbitron',monospace;font-size:6px;font-weight:700;
        color:rgba(148,163,184,0.7);text-align:center;
        white-space:nowrap;max-width:52px;overflow:hidden;text-overflow:ellipsis;
      }
      #qm-fav-count {
        text-align:center;padding:8px;
        font-family:'Orbitron',monospace;font-size:8px;
        color:rgba(0,229,255,0.6);
      }
      #qm-fav-save {
        font-family:'Orbitron',monospace;font-size:9px;font-weight:900;
        letter-spacing:0.15em;color:#fff;
        background:linear-gradient(135deg,#0369a1,#0ea5e9);
        border:none;border-radius:10px;
        padding:12px;width:100%;cursor:pointer;
        touch-action:manipulation;
        transition:transform 0.1s;
      }
      #qm-fav-save:active{transform:scale(0.97);}
    `;
    document.head.appendChild(s);
  }

  // ══════════════════════════════════════════════════════════════
  // 3. SUGESTÕES INTELIGENTES (baseadas no estado do rpg)
  // ══════════════════════════════════════════════════════════════
  function getSuggestions() {
    if (typeof rpg === 'undefined') return [];
    const s = rpg;
    const sugs = [];

    // Talento disponível
    if ((s.talentPoints || 0) > 0) {
      sugs.push({ id:'talents', icon:'🧠', name:'Talentos Disponíveis', badge:'hot',
        desc:`Tens ${s.talentPoints} ponto(s) de talento para gastar!`, fn:() => openTalentTree() });
    }

    // Dungeon diária disponível
    if (s.dungeonsCleared !== undefined) {
      const today = new Date().toDateString();
      const lastD = localStorage.getItem('rpg_last_daily_dungeon');
      if (lastD !== today) {
        sugs.push({ id:'dungeon', icon:'🏰', name:'Dungeon Diária', badge:'new',
          desc:'A dungeon diária ainda não foi completada hoje.', fn:() => openDailyDungeon() });
      }
    }

    // Nível baixo mas tem ouro para comprar
    if ((s.level || 1) < 10 && (s.gold || 0) >= 200) {
      sugs.push({ id:'shop', icon:'🛒', name:'Comprar Equipamento', badge:'tip',
        desc:`Tens ${Math.floor(s.gold).toLocaleString()} ouro. Melhora o teu equip!`, fn:() => openShop() });
    }

    // Forja — se tem itens que pode melhorar
    if ((s.gold || 0) >= 500 && Object.keys(s.forgeUpgrades || {}).length === 0) {
      sugs.push({ id:'forge', icon:'🔨', name:'Forjar Equipamento', badge:'tip',
        desc:'A Forja melhora os teus itens com ouro. Experimenta!', fn:() => openForge() });
    }

    // NPC com missão pronta
    const npcsReady = (s.NPCS || []).filter(n =>
      n.quests.some(q => !((s.npcQuestsDone||[]).includes(q.id)) && q.cond && q.cond(s))
    );
    if (npcsReady.length > 0) {
      sugs.push({ id:'npcs', icon:'👥', name:'Missão Pronta!', badge:'hot',
        desc:`${npcsReady[0].name[s.lang||'pt']} tem uma recompensa a aguardar.`, fn:() => openNpcs() });
    }

    // Boss kills próximo de desbloquear algo
    if ((s.bossKills || 0) > 0 && (s.bossKills % 5 === 4)) {
      sugs.push({ id:'boss', icon:'💀', name:'Boss Seguinte', badge:'hot',
        desc:`Mais 1 guardião para um marco! Bossas eliminados: ${s.bossKills}`, fn:() => rpg.openPreBattle(true) });
    }

    // Errante disponível
    const wandDot = document.getElementById('wanderer-dot');
    if (wandDot && !wandDot.classList.contains('hidden')) {
      sugs.push({ id:'wanderer', icon:'🎒', name:'Mercador Errante', badge:'new',
        desc:'O Errante chegou com ofertas especiais por tempo limitado!', fn:() => openWanderer() });
    }

    // Arena — se tem pouca atividade
    if ((s.kills || 0) > 50 && (s.honor || 0) < 100) {
      sugs.push({ id:'arena', icon:'🏆', name:'Arena Classificatória', badge:'tip',
        desc:'Ganhar Honra na Arena desbloqueia recompensas exclusivas.', fn:() => openArena() });
    }

    // NG+ disponível
    if ((s.ngPlusActive || 0) === 0 && (s.bossKills || 0) >= 18) {
      sugs.push({ id:'ngplus', icon:'♾️', name:'New Game+', badge:'warn',
        desc:'Derrotaste os guardiões principais. O ciclo NG+ está disponível!', fn:() => openNgPlus() });
    }

    // Prestígio
    if ((s.prestigeLevel || 0) === 0 && (s.level || 1) >= 30) {
      sugs.push({ id:'prestige', icon:'🔁', name:'Prestígio Disponível', badge:'warn',
        desc:'O nível máximo está próximo. O Prestígio renova e fortalece.', fn:() => openPrestige() });
    }

    // Runas não configuradas
    if ((s.equippedRunes || []).length === 0 && (s.unlockedRunes || []).length > 0) {
      sugs.push({ id:'runes', icon:'🔮', name:'Equipar Runas', badge:'tip',
        desc:'Tens runas desbloqueadas mas nenhuma equipada. Potencial desperdiçado!', fn:() => openRuneModal() });
    }

    // Conquistas — sempre um lembrete suave
    if ((s.kills || 0) > 20) {
      sugs.push({ id:'achievements', icon:'🏅', name:'Ver Conquistas', badge:null,
        desc:'Verifica conquistas desbloqueadas e as que estão quase prontas.', fn:() => openAchievements() });
    }

    // Modo Onda — se nunca jogou
    if ((s.bestWave || 0) === 0) {
      sugs.push({ id:'wave', icon:'🌊', name:'Tentar Modo Onda', badge:'new',
        desc:'Ondas infinitas de inimigos. Até onde aguentas?', fn:() => openWaveMode() });
    }

    // Lore / Codex
    if ((s.bossKills || 0) >= 1) {
      sugs.push({ id:'lore', icon:'📜', name:'Codex de Lore', badge:null,
        desc:'Fragmentos da história de Algoritma aguardam por ti.', fn:() => (typeof openCodex!=='undefined'?openCodex():openLore()) });
    }

    // Limita a 4 sugestões mais relevantes
    return sugs.slice(0, 4);
  }

  // ══════════════════════════════════════════════════════════════
  // 4. RENDER DA BARRA DE ATALHOS
  // ══════════════════════════════════════════════════════════════
  function renderShortcutBar(container) {
    container.innerHTML = '';

    _favs.slice(0, 7).forEach(id => {
      const action = getAction(id);
      if (!action) return;

      const wrap = document.createElement('div');
      wrap.className = 'qm-shortcut';
      wrap.style.setProperty('--qm-color', action.color);

      // badge de notificação
      let badgeHtml = '';
      if (action.badge) {
        const orig = document.getElementById(action.badge);
        if (orig && !orig.classList.contains('hidden')) {
          badgeHtml = '<div class="qm-shortcut-badge"></div>';
        }
      }

      wrap.innerHTML = `
        <div class="qm-shortcut-icon" style="box-shadow:0 0 14px ${action.color}22;">
          ${action.icon}${badgeHtml}
        </div>
        <div class="qm-shortcut-label">${action.label}</div>
      `;
      wrap.addEventListener('click', () => { try { action.fn(); } catch(e){} });
      container.appendChild(wrap);
    });

    // Botão de editar
    const editBtn = document.createElement('div');
    editBtn.className = 'qm-edit-btn';
    editBtn.innerHTML = `<div class="qm-edit-icon">✏️</div><div class="qm-shortcut-label">Editar</div>`;
    editBtn.addEventListener('click', openFavModal);
    container.appendChild(editBtn);
  }

  // ══════════════════════════════════════════════════════════════
  // 5. RENDER DO GRID POR CATEGORIA
  // ══════════════════════════════════════════════════════════════
  const CAT_META = {
    combate:  { label:'⚔️ Combate',    color:'#ef4444' },
    loja:     { label:'🛒 Loja & Forja', color:'#f59e0b' },
    prog:     { label:'📈 Progressão',  color:'#38bdf8' },
    missoes:  { label:'📋 Missões',     color:'#34d399' },
    mundo:    { label:'🗺️ Mundo',       color:'#818cf8' },
    perfil:   { label:'👤 Perfil',      color:'#f472b6' },
  };

  function renderActionGrid(container) {
    container.innerHTML = '';

    Object.entries(CAT_META).forEach(([cat, meta]) => {
      const actions = ALL_ACTIONS.filter(a => a.cat === cat);
      if (actions.length === 0) return;

      const label = document.createElement('div');
      label.className = 'qm-cat-label';
      label.textContent = meta.label;
      container.appendChild(label);

      const grid = document.createElement('div');
      grid.className = 'qm-action-grid';

      actions.forEach(action => {
        const btn = document.createElement('div');
        btn.className = 'qm-action-btn';
        btn.style.setProperty('--qm-color', action.color);

        // badge
        let badgeHtml = '';
        if (action.badge) {
          const orig = document.getElementById(action.badge);
          if (orig && !orig.classList.contains('hidden')) {
            badgeHtml = '<div class="qm-action-badge"></div>';
          }
        }

        btn.innerHTML = `
          <div class="qm-action-icon">${action.icon}${badgeHtml}</div>
          <div class="qm-action-label">${action.label}</div>
        `;
        btn.addEventListener('click', () => { try { action.fn(); } catch(e){} });
        grid.appendChild(btn);
      });

      container.appendChild(grid);
    });
  }

  // ══════════════════════════════════════════════════════════════
  // 6. RENDER SUGESTÕES
  // ══════════════════════════════════════════════════════════════
  function renderSuggestions(container) {
    const sugs = getSuggestions();
    if (sugs.length === 0) {
      container.style.display = 'none';
      return;
    }
    container.style.display = '';
    container.innerHTML = '';

    const title = document.createElement('div');
    title.className = 'qm-sug-title';
    title.textContent = 'Sugestões para Ti';
    container.appendChild(title);

    const badgeClasses = { new:'qm-sug-new', hot:'qm-sug-hot', tip:'qm-sug-tip', warn:'qm-sug-warn' };
    const badgeLabels  = { new:'NOVO', hot:'AGORA', tip:'DICA', warn:'ATENÇÃO' };

    sugs.forEach(sug => {
      const card = document.createElement('div');
      card.className = 'qm-sug-card';

      const badgePill = sug.badge
        ? `<span class="qm-sug-badge-pill ${badgeClasses[sug.badge]||''}">${badgeLabels[sug.badge]||''}</span>`
        : '';

      card.innerHTML = `
        <div class="qm-sug-icon">${sug.icon}</div>
        <div class="qm-sug-body">
          <div class="qm-sug-name">${sug.name}</div>
          <div class="qm-sug-desc">${sug.desc}</div>
        </div>
        ${badgePill}
        <div class="qm-sug-arrow">›</div>
      `;
      card.addEventListener('click', () => { try { sug.fn(); } catch(e){} });
      container.appendChild(card);
    });
  }

  // ══════════════════════════════════════════════════════════════
  // 7. MODAL DE EDITAR FAVORITOS
  // ══════════════════════════════════════════════════════════════
  let _tempFavs = [];

  function buildFavModal() {
    const modal = document.createElement('div');
    modal.id = 'qm-fav-modal';
    modal.innerHTML = `
      <div id="qm-fav-panel">
        <div id="qm-fav-header">
          <div>
            <h3>⚡ ATALHOS RÁPIDOS</h3>
            <p>Escolhe até 7 ações para aparecerem na barra de topo</p>
          </div>
          <div id="qm-fav-close" onclick="window._closeQmFav()">✕</div>
        </div>
        <div id="qm-fav-body">
          <div id="qm-fav-count" class="qm-fav-count">0 / 7 selecionados</div>
          <div id="qm-fav-grid-inner"></div>
        </div>
        <div style="padding:0 14px 20px;flex-shrink:0;">
          <button id="qm-fav-save" onclick="window._saveQmFav()">✅ GUARDAR ATALHOS</button>
        </div>
      </div>
    `;
    modal.addEventListener('click', e => { if (e.target === modal) window._closeQmFav(); });
    document.body.appendChild(modal);
  }

  function openFavModal() {
    _tempFavs = [..._favs];
    renderFavGrid();
    document.getElementById('qm-fav-modal').classList.add('open');
  }

  window._closeQmFav = function() {
    document.getElementById('qm-fav-modal').classList.remove('open');
  };

  window._saveQmFav = function() {
    _favs = [..._tempFavs];
    saveFavs();
    window._closeQmFav();
    refreshQuickMenu();
  };

  function renderFavGrid() {
    const inner = document.getElementById('qm-fav-grid-inner');
    if (!inner) return;
    inner.innerHTML = '';

    const cats = ['combate','loja','prog','missoes','mundo','perfil'];
    cats.forEach(cat => {
      const actions = ALL_ACTIONS.filter(a => a.cat === cat);
      if (!actions.length) return;

      const catLabel = document.createElement('div');
      catLabel.className = 'qm-fav-section-title';
      catLabel.textContent = CAT_META[cat].label;
      inner.appendChild(catLabel);

      const grid = document.createElement('div');
      grid.className = 'qm-fav-grid';

      actions.forEach(action => {
        const item = document.createElement('div');
        item.className = 'qm-fav-item' + (_tempFavs.includes(action.id) ? ' selected' : '');
        item.dataset.id = action.id;
        item.innerHTML = `<div class="qm-fav-item-icon">${action.icon}</div><div class="qm-fav-item-label">${action.label}</div>`;
        item.addEventListener('click', () => {
          const idx = _tempFavs.indexOf(action.id);
          if (idx >= 0) {
            _tempFavs.splice(idx, 1);
            item.classList.remove('selected');
          } else {
            if (_tempFavs.length >= 7) { showQmToast('Máximo 7 atalhos!'); return; }
            _tempFavs.push(action.id);
            item.classList.add('selected');
          }
          updateFavCount();
        });
        grid.appendChild(item);
      });
      inner.appendChild(grid);
    });
    updateFavCount();
  }

  function updateFavCount() {
    const el = document.getElementById('qm-fav-count');
    if (el) el.textContent = `${_tempFavs.length} / 7 selecionados`;
  }

  // ══════════════════════════════════════════════════════════════
  // 8. TOAST SIMPLES
  // ══════════════════════════════════════════════════════════════
  function showQmToast(msg) {
    let t = document.getElementById('qm-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'qm-toast';
      t.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:rgba(8,8,18,0.95);border:1px solid rgba(0,229,255,0.2);border-radius:8px;padding:7px 14px;font-family:Orbitron,monospace;font-size:8px;color:#00e5ff;z-index:30000;pointer-events:none;transition:opacity 0.3s;white-space:nowrap;';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = '1';
    clearTimeout(t._t);
    t._t = setTimeout(() => t.style.opacity = '0', 2000);
  }

  // ══════════════════════════════════════════════════════════════
  // 9. INJEÇÃO NO PAINEL CIDADE
  // ══════════════════════════════════════════════════════════════
  function injectIntoMenu() {
    // Encontra o painel cidade
    const cidadePanel = document.getElementById('panel-cidade');
    if (!cidadePanel) return;

    // Container principal do quick menu — inserido ANTES dos accordions
    const qmWrap = document.createElement('div');
    qmWrap.id = 'qm-wrap';

    // Barra de atalhos
    const barLabel = document.createElement('div');
    barLabel.className = 'qm-cat-label';
    barLabel.style.paddingTop = '0';
    barLabel.textContent = '⚡ Acesso Rápido';
    qmWrap.appendChild(barLabel);

    const bar = document.createElement('div');
    bar.id = 'qm-bar';
    qmWrap.appendChild(bar);

    // Sugestões
    const sugsWrap = document.createElement('div');
    sugsWrap.id = 'qm-suggestions';
    qmWrap.appendChild(sugsWrap);

    // Grid completo (toggle)
    const gridToggle = document.createElement('button');
    gridToggle.id = 'qm-grid-toggle';
    gridToggle.style.cssText = `
      width:100%;padding:7px;border-radius:10px;
      background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);
      font-family:Orbitron,monospace;font-size:7px;font-weight:700;
      color:rgba(148,163,184,0.5);letter-spacing:0.1em;
      cursor:pointer;touch-action:manipulation;
      display:flex;align-items:center;justify-content:center;gap:6px;
      margin-bottom:6px;transition:background 0.15s;
    `;
    gridToggle.innerHTML = '▼ &nbsp;VER TODAS AS AÇÕES';
    let gridOpen = false;
    const gridWrap = document.createElement('div');
    gridWrap.id = 'qm-grid-wrap';
    gridWrap.style.display = 'none';

    gridToggle.addEventListener('click', () => {
      gridOpen = !gridOpen;
      gridWrap.style.display = gridOpen ? 'block' : 'none';
      gridToggle.innerHTML = gridOpen ? '▲ &nbsp;OCULTAR AÇÕES' : '▼ &nbsp;VER TODAS AS AÇÕES';
      if (gridOpen) renderActionGrid(gridWrap);
    });

    qmWrap.appendChild(gridToggle);
    qmWrap.appendChild(gridWrap);

    // Insere no topo do painel cidade
    cidadePanel.insertBefore(qmWrap, cidadePanel.firstChild);

    // Render inicial
    renderShortcutBar(bar);
    renderSuggestions(sugsWrap);

    // Atualiza a cada 10s
    setInterval(() => {
      renderShortcutBar(bar);
      renderSuggestions(sugsWrap);
    }, 10000);
  }

  function refreshQuickMenu() {
    const bar = document.getElementById('qm-bar');
    const sugs = document.getElementById('qm-suggestions');
    if (bar) renderShortcutBar(bar);
    if (sugs) renderSuggestions(sugs);
  }

  window._refreshQuickMenu = refreshQuickMenu;

  // ══════════════════════════════════════════════════════════════
  // 10. INIT
  // ══════════════════════════════════════════════════════════════
  function init() {
    injectStyles();
    buildFavModal();
    injectIntoMenu();
    console.log('[QuickMenuModule] OK — acesso rápido + sugestões ativas');
  }

  function waitForDom(cb, n) {
    const panel = document.getElementById('panel-cidade');
    if (panel) cb();
    else if ((n||0) < 30) setTimeout(() => waitForDom(cb,(n||0)+1), 300);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => waitForDom(init));
  } else {
    waitForDom(init);
  }

})();
