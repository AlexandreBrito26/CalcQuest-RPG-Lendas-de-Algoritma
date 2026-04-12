// ═══════════════════════════════════════════════════════════════════════════
// MODULE: world-map-rewrite.js  — 🗺️ Mapa de Algoritma v2.0
// ─────────────────────────────────────────────────────────────────────────
// • Substitui o modal world-map-modal com versão estável (SVG puro)
// • Sincroniza em tempo real com rpg.MAP_REGIONS (game.js)
// • Tab "Mundos" — lista de regiões com status, lore e viagem
// • Tab "DLC" — conteúdos adicionais (mundos do world-expansion.js)
// • Tab "Mapa" — SVG interativo com conexões e névoa
// • Sem canvas = sem bugs de resize/contexto perdido
// ═══════════════════════════════════════════════════════════════════════════
;(function WorldMapRewrite() {
  'use strict';

  var MODAL_ID = 'wmr-modal';
  var activeTab = 'worlds';

  // ══════════════════════════════════════════════════════════════════════════
  // CORES DOS BIOMAS
  // ══════════════════════════════════════════════════════════════════════════
  var BIOME_COLORS = {
    medieval:'#71717a', swamp:'#16a34a', forest:'#15803d', cave:'#6d28d9',
    desert:'#ca8a04', volcano:'#dc2626', tundra:'#38bdf8', astral:'#7c3aed',
    cyber:'#0284c7', storm:'#eab308', void:'#18181b', shadow:'#be123c',
    matrix:'#059669', abyss:'#4f46e5', quantum:'#7c3aed', neural:'#00e5ff',
    end:'#be123c', chrono:'#f59e0b', crystal:'#06b6d4', corruption:'#7c3aed',
    dream:'#ec4899', primordial:'#f97316', beyond:'#ffffff',
  };

  var BIOME_ICONS = {
    medieval:'⚔️', swamp:'🌿', forest:'🌲', cave:'🕳️', desert:'🏜️',
    volcano:'🌋', tundra:'❄️', astral:'🌌', cyber:'💻', storm:'⚡',
    void:'🌀', shadow:'👁️', matrix:'🟩', abyss:'🕸️', quantum:'⚛️',
    neural:'🧠', end:'∞', chrono:'⏳', crystal:'💎', corruption:'☣️',
    dream:'🌸', primordial:'🔥', beyond:'✨',
  };

  // ══════════════════════════════════════════════════════════════════════════
  // DLC PACKS (integrando world-expansion.js e módulos futuros)
  // ══════════════════════════════════════════════════════════════════════════
  var DLC_PACKS = [
    {
      id: 'dlc_world_expansion',
      name: 'Expansão de Mundos',
      version: 'v1.0',
      icon: '🌍',
      color: '#10b981',
      status: 'installed',
      desc: 'Adiciona 6 novos mundos — Labirinto do Tempo, Cavernas Cristalinas, Núcleo da Corrupção, Plano dos Sonhos, Código Primordial e O Além.',
      regions: ['r_chrono','r_crystalline','r_corruption','r_dreamscape','r_primordial','r_beyond'],
      monsters: 18,
      bosses: 6,
      items: 10,
    },
    {
      id: 'dlc_late_game',
      name: 'Late Game Content',
      version: 'v1.0',
      icon: '⚡',
      color: '#f59e0b',
      status: 'installed',
      desc: 'Monstros de nível 300–1000, 4 bosses épicos, novas classes e árvore de talentos Arcana.',
      regions: [],
      monsters: 10,
      bosses: 4,
      items: 13,
    },
    {
      id: 'dlc_void_region',
      name: 'O Vazio Pós-Jogo',
      version: 'v1.0',
      icon: '🌑',
      color: '#e879f9',
      status: 'installed',
      desc: 'Região desbloqueada após o primeiro ciclo NG+. Monstros além da escala, armas e relíquias únicas.',
      regions: ['post_void'],
      monsters: 3,
      bosses: 1,
      items: 7,
    },
    {
      id: 'dlc_future_1',
      name: 'Dimensão Fractal',
      version: '—',
      icon: '🔮',
      color: '#6366f1',
      status: 'coming',
      desc: 'Em desenvolvimento. Um plano onde a geometria do combate muda a cada round.',
      regions: [],
      monsters: 0,
      bosses: 0,
      items: 0,
    },
    {
      id: 'dlc_future_2',
      name: 'Era dos Arquitetos',
      version: '—',
      icon: '🏛️',
      color: '#64748b',
      status: 'coming',
      desc: 'Em desenvolvimento. A história dos Arquitetos que criaram Algoritma — e porque desapareceram.',
      regions: [],
      monsters: 0,
      bosses: 0,
      items: 0,
    },
  ];

  // ══════════════════════════════════════════════════════════════════════════
  // CONEXÕES DO MAPA (para o SVG)
  // ══════════════════════════════════════════════════════════════════════════
  var MAP_CONNECTIONS = [
    ['r_ruins','r_swamp'],['r_ruins','r_forest'],['r_swamp','r_cave'],
    ['r_forest','r_desert'],['r_forest','r_volcano'],['r_cave','r_tundra'],
    ['r_desert','r_volcano'],['r_tundra','r_astral'],['r_volcano','r_storm'],
    ['r_astral','r_void'],['r_astral','r_cyber'],['r_storm','r_shadow'],
    ['r_void','r_matrix'],['r_shadow','r_matrix'],['r_matrix','r_abyss'],
    ['r_matrix','r_quantum'],['r_abyss','r_end'],['r_quantum','r_neural'],
    ['r_neural','r_end'],
    // Expansão
    ['r_astral','r_chrono'],['r_storm','r_crystalline'],
    ['r_void','r_corruption'],['r_shadow','r_dreamscape'],
    ['r_abyss','r_primordial'],['r_end','r_beyond'],
  ];

  // ══════════════════════════════════════════════════════════════════════════
  // HELPERS
  // ══════════════════════════════════════════════════════════════════════════
  function rpg() { return window.rpg || null; }

  function getRegions() {
    var r = rpg();
    var base = (r && r.MAP_REGIONS) ? r.MAP_REGIONS : [];

    // Incluir regiões do world-expansion.js (WX_DATA) que ainda não foram injetadas
    if (window.WX_DATA && Array.isArray(window.WX_DATA.regions)) {
      window.WX_DATA.regions.forEach(function(wx) {
        if (!base.find(function(b) { return b.id === wx.id; })) {
          base.push(wx);
        }
      });
    }

    // Incluir post_void se existir no rpg
    if (r && r.POST_VOID_REGION && !base.find(function(b){ return b.id === 'post_void'; })) {
      base.push(r.POST_VOID_REGION);
    }

    return base;
  }

  function isUnlocked(region) {
    var r = rpg();
    if (!r) return false;
    return (r.level || 1) >= (region.reqLvl || 1) &&
           (r.bossKills || 0) >= (region.reqBoss || 0);
  }

  function isCurrent(region) {
    var r = rpg();
    return r && r.currentRegion === region.id;
  }

  function getBossProgress(region) {
    var r = rpg();
    var kills = r ? (r.bossKills || 0) : 0;
    var req = region.reqBoss || 0;
    return { kills: kills, req: req, pct: req ? Math.min(100, Math.round(kills/req*100)) : 100 };
  }

  function getLvlProgress(region) {
    var r = rpg();
    var lvl = r ? (r.level || 1) : 1;
    var req = region.reqLvl || 1;
    return { lvl: lvl, req: req, pct: req ? Math.min(100, Math.round(lvl/req*100)) : 100 };
  }

  function travel(regionId) {
    var r = rpg();
    if (!r) return;
    if (r.travelToRegion) {
      r.travelToRegion(regionId);
    } else {
      r.currentRegion = regionId;
      if (typeof localStorage !== 'undefined')
        localStorage.setItem('rpg_current_region', regionId);
    }
    render(); // atualiza display
  }

  function fmt(n) {
    if (typeof formatNumber === 'function') return formatNumber(n);
    if (n >= 1e9) return (n/1e9).toFixed(1)+'B';
    if (n >= 1e6) return (n/1e6).toFixed(1)+'M';
    if (n >= 1e3) return (n/1e3).toFixed(1)+'K';
    return n;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // MODAL HTML
  // ══════════════════════════════════════════════════════════════════════════
  function createModal() {
    if (document.getElementById(MODAL_ID)) return;

    var el = document.createElement('div');
    el.id = MODAL_ID;
    el.style.cssText = [
      'position:fixed;inset:0;z-index:800;',
      'display:none;align-items:center;justify-content:center;',
      'background:rgba(0,0,0,0.85);backdrop-filter:blur(4px);',
    ].join('');

    el.innerHTML = [
      '<div id="wmr-panel" style="',
        'width:min(96vw,480px);max-height:90vh;',
        'background:#09090b;border:1px solid rgba(99,102,241,0.3);',
        'border-radius:16px;display:flex;flex-direction:column;',
        'box-shadow:0 0 40px rgba(99,102,241,0.15);overflow:hidden;',
      '">',

        // ── Header ──
        '<div style="',
          'padding:14px 16px 0;display:flex;align-items:center;',
          'justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.06);',
          'padding-bottom:12px;flex-shrink:0;',
        '">',
          '<div style="display:flex;align-items:center;gap:8px;">',
            '<span style="font-size:18px;">🗺️</span>',
            '<div>',
              '<div style="font-family:Orbitron,monospace;font-size:12px;font-weight:900;color:#e4e4e7;letter-spacing:.1em;">ATLAS DE ALGORITMA</div>',
              '<div id="wmr-subtitle" style="font-family:Fira Code,monospace;font-size:9px;color:#52525b;margin-top:1px;"></div>',
            '</div>',
          '</div>',
          '<button onclick="window.wmrClose()" style="',
            'background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);',
            'border-radius:8px;color:#71717a;cursor:pointer;',
            'padding:6px 10px;font-size:13px;',
          '">✕</button>',
        '</div>',

        // ── Tabs ──
        '<div style="display:flex;gap:0;border-bottom:1px solid rgba(255,255,255,0.06);flex-shrink:0;">',
          '<button id="wmr-tab-worlds" onclick="window.wmrTab(\'worlds\')" style="',
            'flex:1;padding:10px 4px;font-family:Orbitron,monospace;font-size:8px;font-weight:900;',
            'letter-spacing:.08em;border:none;cursor:pointer;transition:all .2s;',
          '">🌍 MUNDOS</button>',
          '<button id="wmr-tab-map" onclick="window.wmrTab(\'map\')" style="',
            'flex:1;padding:10px 4px;font-family:Orbitron,monospace;font-size:8px;font-weight:900;',
            'letter-spacing:.08em;border:none;cursor:pointer;transition:all .2s;',
          '">🗺️ MAPA</button>',
          '<button id="wmr-tab-dlc" onclick="window.wmrTab(\'dlc\')" style="',
            'flex:1;padding:10px 4px;font-family:Orbitron,monospace;font-size:8px;font-weight:900;',
            'letter-spacing:.08em;border:none;cursor:pointer;transition:all .2s;',
          '">📦 DLC</button>',
        '</div>',

        // ── Content ──
        '<div id="wmr-content" style="flex:1;overflow-y:auto;min-height:0;scrollbar-width:thin;scrollbar-color:rgba(99,102,241,0.3) transparent;">',
        '</div>',

      '</div>',
    ].join('');

    document.body.appendChild(el);
    injectStyles();
  }

  // ══════════════════════════════════════════════════════════════════════════
  // RENDER PRINCIPAL
  // ══════════════════════════════════════════════════════════════════════════
  function render() {
    updateSubtitle();
    updateTabs();
    var content = document.getElementById('wmr-content');
    if (!content) return;

    if (activeTab === 'worlds') content.innerHTML = renderWorldsTab();
    else if (activeTab === 'map')    content.innerHTML = renderMapTab();
    else if (activeTab === 'dlc')    content.innerHTML = renderDlcTab();

    // Recria ícones lucide se disponível
    try { if (window.lucide) lucide.createIcons(); } catch(e){}
  }

  function updateSubtitle() {
    var el = document.getElementById('wmr-subtitle');
    if (!el) return;
    var r = rpg();
    if (!r) return;
    var regions = getRegions();
    var unlocked = regions.filter(isUnlocked).length;
    el.textContent = 'Lvl ' + (r.level||1) + ' · ' + (r.bossKills||0) + ' bosses · ' + unlocked + '/' + regions.length + ' regiões';
  }

  function updateTabs() {
    var tabs = ['worlds','map','dlc'];
    tabs.forEach(function(t) {
      var btn = document.getElementById('wmr-tab-' + t);
      if (!btn) return;
      if (t === activeTab) {
        btn.style.background = 'rgba(99,102,241,0.15)';
        btn.style.color = '#818cf8';
        btn.style.borderBottom = '2px solid #818cf8';
      } else {
        btn.style.background = 'transparent';
        btn.style.color = '#52525b';
        btn.style.borderBottom = '2px solid transparent';
      }
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // TAB: MUNDOS
  // ══════════════════════════════════════════════════════════════════════════
  function renderWorldsTab() {
    var regions = getRegions();
    var r = rpg();
    if (!regions.length) {
      // Reagendar render automaticamente até MAP_REGIONS estar pronto
      setTimeout(function() {
        var modal = document.getElementById(MODAL_ID);
        if (modal && modal.style.display !== 'none') render();
      }, 300);
      return '<div style="padding:32px;text-align:center;color:#52525b;font-family:Fira Code,monospace;font-size:10px;">⏳ A carregar mundos...</div>';
    }

    // Agrupar por tier (reqLvl)
    var tiers = [
      { label:'⚔️ Início',         min:0,    max:49  },
      { label:'🗺️ Exploração',     min:50,   max:149 },
      { label:'⚡ Perigo',          min:150,  max:499 },
      { label:'💀 Endgame',         min:500,  max:1999},
      { label:'🌌 Lendário',        min:2000, max:Infinity },
    ];

    var html = '<div style="padding:12px 14px 20px;">';

    tiers.forEach(function(tier) {
      var tierRegions = regions.filter(function(rg) {
        return (rg.reqLvl || 1) >= tier.min && (rg.reqLvl || 1) <= tier.max;
      });
      if (!tierRegions.length) return;

      html += '<div style="margin-bottom:4px;padding:6px 0 4px;">';
      html += '<div style="font-family:Orbitron,monospace;font-size:7px;font-weight:900;color:#3f3f46;letter-spacing:.15em;margin-bottom:8px;">' + tier.label + '</div>';

      tierRegions.forEach(function(region) {
        var unlocked = isUnlocked(region);
        var current  = isCurrent(region);
        var color    = BIOME_COLORS[region.biome] || region.color || '#71717a';
        var icon     = BIOME_ICONS[region.biome] || region.icon || '🌐';
        var boss     = getBossProgress(region);
        var lvl      = getLvlProgress(region);

        var borderColor = current ? color : unlocked ? (color + '50') : 'rgba(255,255,255,0.05)';
        var bgColor     = current ? (color + '18') : unlocked ? (color + '08') : 'rgba(255,255,255,0.02)';

        html += '<div style="';
        html += 'border:1px solid ' + borderColor + ';';
        html += 'background:' + bgColor + ';';
        html += 'border-radius:12px;padding:10px 12px;margin-bottom:6px;';
        html += 'position:relative;overflow:hidden;';
        if (current) html += 'box-shadow:0 0 16px ' + color + '30;';
        html += '">';

        // Faixa "ATUAL"
        if (current) {
          html += '<div style="position:absolute;top:0;right:0;background:' + color + ';color:#000;font-family:Orbitron,monospace;font-size:6px;font-weight:900;padding:3px 8px;border-radius:0 12px 0 8px;">AQUI</div>';
        }

        html += '<div style="display:flex;align-items:flex-start;gap:10px;">';

        // Ícone
        html += '<div style="font-size:20px;flex-shrink:0;margin-top:1px;' + (unlocked ? '' : 'filter:grayscale(1);opacity:.3;') + '">' + icon + '</div>';

        // Info
        html += '<div style="flex:1;min-width:0;">';
        html += '<div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;">';
        html += '<div style="font-family:Rajdhani,sans-serif;font-size:13px;font-weight:700;color:' + (unlocked ? '#e4e4e7' : '#3f3f46') + ';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + (region.name ? (region.name.pt || region.name) : region.id) + '</div>';
        if (!unlocked) html += '<div style="font-size:8px;">🔒</div>';
        html += '</div>';

        // Desc
        var descText = region.desc ? (region.desc.pt || region.desc) : '';
        if (descText) {
          html += '<div style="font-family:Fira Code,monospace;font-size:8px;color:#52525b;line-height:1.4;margin-bottom:6px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">' + descText + '</div>';
        }

        // Requisitos
        html += '<div style="display:flex;gap:8px;flex-wrap:wrap;">';

        // Lvl req
        html += '<div style="font-family:Fira Code,monospace;font-size:8px;">';
        html += '<span style="color:#52525b;">Lvl </span>';
        html += '<span style="color:' + (lvl.pct >= 100 ? '#34d399' : '#f59e0b') + ';font-weight:700;">' + region.reqLvl + '</span>';
        html += '</div>';

        // Boss req
        if (region.reqBoss > 0) {
          html += '<div style="font-family:Fira Code,monospace;font-size:8px;">';
          html += '<span style="color:#52525b;">👹 </span>';
          html += '<span style="color:' + (boss.pct >= 100 ? '#34d399' : '#f59e0b') + ';font-weight:700;">' + region.reqBoss + ' bosses</span>';
          html += '</div>';
        }

        // Bioma
        html += '<div style="font-family:Fira Code,monospace;font-size:8px;color:#3f3f46;">' + (region.biome || '').toUpperCase() + '</div>';

        html += '</div>'; // req row

        // Barra de progresso dupla (só se bloqueada)
        if (!unlocked) {
          html += '<div style="margin-top:6px;display:flex;flex-direction:column;gap:3px;">';
          // Lvl bar
          html += '<div style="display:flex;align-items:center;gap:6px;">';
          html += '<div style="font-family:Fira Code,monospace;font-size:7px;color:#3f3f46;width:24px;">LVL</div>';
          html += '<div style="flex:1;height:3px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden;">';
          html += '<div style="height:100%;width:' + lvl.pct + '%;background:' + (lvl.pct >= 100 ? '#34d399' : '#f59e0b') + ';border-radius:2px;transition:width .5s;"></div>';
          html += '</div>';
          html += '<div style="font-family:Fira Code,monospace;font-size:7px;color:#52525b;width:40px;text-align:right;">' + lvl.lvl + '/' + region.reqLvl + '</div>';
          html += '</div>';
          // Boss bar
          if (region.reqBoss > 0) {
            html += '<div style="display:flex;align-items:center;gap:6px;">';
            html += '<div style="font-family:Fira Code,monospace;font-size:7px;color:#3f3f46;width:24px;">👹</div>';
            html += '<div style="flex:1;height:3px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden;">';
            html += '<div style="height:100%;width:' + boss.pct + '%;background:' + (boss.pct >= 100 ? '#34d399' : '#f59e0b') + ';border-radius:2px;transition:width .5s;"></div>';
            html += '</div>';
            html += '<div style="font-family:Fira Code,monospace;font-size:7px;color:#52525b;width:40px;text-align:right;">' + Math.min(boss.kills, region.reqBoss) + '/' + region.reqBoss + '</div>';
            html += '</div>';
          }
          html += '</div>'; // bars
        }

        html += '</div>'; // info

        // Botão viajar
        html += '<div style="flex-shrink:0;display:flex;align-items:center;">';
        if (current) {
          html += '<div style="font-family:Orbitron,monospace;font-size:7px;color:' + color + ';font-weight:900;">ATUAL</div>';
        } else if (unlocked) {
          html += '<button onclick="window.wmrTravel(\'' + region.id + '\')" style="';
          html += 'background:' + color + '22;border:1px solid ' + color + '55;';
          html += 'color:' + color + ';border-radius:8px;padding:6px 10px;';
          html += 'font-family:Orbitron,monospace;font-size:7px;font-weight:900;';
          html += 'cursor:pointer;white-space:nowrap;';
          html += '">VIAJAR ⚡</button>';
        } else {
          html += '<div style="font-family:Orbitron,monospace;font-size:7px;color:#3f3f46;">BLOQUEADO</div>';
        }
        html += '</div>';

        html += '</div>'; // flex row
        html += '</div>'; // card
      });

      html += '</div>'; // tier
    });

    html += '</div>';
    return html;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // TAB: MAPA SVG
  // ══════════════════════════════════════════════════════════════════════════
  function renderMapTab() {
    var regions = getRegions();
    var r = rpg();

    // SVG viewBox 0 0 100 100 — usa coordenadas x/y das regiões diretamente
    var svgLines = '';
    MAP_CONNECTIONS.forEach(function(pair) {
      var a = regions.find(function(rg){ return rg.id === pair[0]; });
      var b = regions.find(function(rg){ return rg.id === pair[1]; });
      if (!a || !b) return;
      var aU = isUnlocked(a), bU = isUnlocked(b);
      var color = (aU && bU) ? 'rgba(99,102,241,0.35)' : 'rgba(255,255,255,0.06)';
      var dash  = (aU && bU) ? '2,2' : '1,4';
      svgLines += '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '" stroke="' + color + '" stroke-width=".6" stroke-dasharray="' + dash + '"/>';
    });

    var svgNodes = '';
    regions.forEach(function(region) {
      var unlocked = isUnlocked(region);
      var current  = isCurrent(region);
      var color    = BIOME_COLORS[region.biome] || region.color || '#71717a';
      var icon     = BIOME_ICONS[region.biome] || region.icon || '🌐';
      var r2 = current ? 5.5 : unlocked ? 4.5 : 3.5;

      svgNodes += '<g onclick="window.wmrSelectRegion(\'' + region.id + '\')" style="cursor:' + (unlocked ? 'pointer' : 'default') + ';">';

      // Aura da região atual
      if (current) {
        svgNodes += '<circle cx="' + region.x + '" cy="' + region.y + '" r="' + (r2+4) + '" fill="' + color + '18" stroke="' + color + '60" stroke-width=".8"/>';
      }

      // Círculo principal
      svgNodes += '<circle cx="' + region.x + '" cy="' + region.y + '" r="' + r2 + '"';
      svgNodes += ' fill="' + (unlocked ? color + 'cc' : 'rgba(20,20,24,0.9)') + '"';
      svgNodes += ' stroke="' + (current ? '#fff' : unlocked ? color : 'rgba(80,80,90,0.4)') + '"';
      svgNodes += ' stroke-width="' + (current ? '1' : '.5') + '"/>';

      // Emoji/ícone
      svgNodes += '<text x="' + region.x + '" y="' + (region.y + 1.2) + '"';
      svgNodes += ' text-anchor="middle" dominant-baseline="middle"';
      svgNodes += ' font-size="' + (unlocked ? '4' : '3') + '"';
      svgNodes += ' opacity="' + (unlocked ? '1' : '0.3') + '">';
      svgNodes += unlocked ? icon : '🔒';
      svgNodes += '</text>';

      // Nome
      if (unlocked) {
        var name = region.name ? (region.name.pt || region.name) : region.id;
        var shortName = name.split(' ')[0];
        svgNodes += '<text x="' + region.x + '" y="' + (region.y + r2 + 3.5) + '"';
        svgNodes += ' text-anchor="middle" font-size="2.8" fill="' + (current ? '#fff' : '#a1a1aa') + '"';
        svgNodes += ' font-family="Orbitron,monospace" font-weight="700">';
        svgNodes += shortName;
        svgNodes += '</text>';
      }

      svgNodes += '</g>';
    });

    var html = '<div style="padding:12px 14px;">';

    // SVG Mapa
    html += '<div style="background:#050508;border:1px solid rgba(99,102,241,0.2);border-radius:12px;overflow:hidden;margin-bottom:12px;">';
    html += '<svg viewBox="0 0 100 100" style="width:100%;display:block;" xmlns="http://www.w3.org/2000/svg">';

    // Fundo gradiente
    html += '<defs>';
    html += '<radialGradient id="wmr-bg" cx="50%" cy="50%" r="70%">';
    html += '<stop offset="0%" stop-color="#0d1117"/>';
    html += '<stop offset="100%" stop-color="#050508"/>';
    html += '</radialGradient>';
    html += '</defs>';
    html += '<rect width="100" height="100" fill="url(#wmr-bg)"/>';

    // Grid subtil
    html += '<g stroke="rgba(99,102,241,0.04)" stroke-width=".3">';
    for (var gx = 0; gx <= 100; gx += 10) html += '<line x1="' + gx + '" y1="0" x2="' + gx + '" y2="100"/>';
    for (var gy = 0; gy <= 100; gy += 10) html += '<line x1="0" y1="' + gy + '" x2="100" y2="' + gy + '"/>';
    html += '</g>';

    html += svgLines;
    html += svgNodes;
    html += '</svg>';
    html += '</div>';

    // Painel de info da região selecionada
    html += '<div id="wmr-map-info" style="';
    html += 'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);';
    html += 'border-radius:10px;padding:12px;min-height:64px;';
    html += '">';
    html += '<div style="font-family:Fira Code,monospace;font-size:9px;color:#3f3f46;text-align:center;padding:12px 0;">← Clica numa região para ver detalhes</div>';
    html += '</div>';

    // Legenda
    html += '<div style="display:flex;gap:14px;margin-top:10px;justify-content:center;">';
    html += '<div style="display:flex;align-items:center;gap:4px;font-family:Fira Code,monospace;font-size:8px;color:#52525b;"><div style="width:8px;height:8px;border-radius:50%;background:#818cf8;"></div> Desbloqueado</div>';
    html += '<div style="display:flex;align-items:center;gap:4px;font-family:Fira Code,monospace;font-size:8px;color:#52525b;"><div style="width:8px;height:8px;border-radius:50%;background:rgba(80,80,90,0.5);"></div> Bloqueado</div>';
    html += '<div style="display:flex;align-items:center;gap:4px;font-family:Fira Code,monospace;font-size:8px;color:#52525b;"><div style="width:8px;height:8px;border-radius:50%;background:#fff;border:1px solid #fff;"></div> Atual</div>';
    html += '</div>';

    html += '</div>';
    return html;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // TAB: DLC
  // ══════════════════════════════════════════════════════════════════════════
  function renderDlcTab() {
    var html = '<div style="padding:12px 14px 20px;">';

    html += '<div style="font-family:Fira Code,monospace;font-size:9px;color:#52525b;line-height:1.5;margin-bottom:14px;padding:10px 12px;background:rgba(99,102,241,0.05);border:1px solid rgba(99,102,241,0.15);border-radius:10px;">';
    html += '📦 Expansões de conteúdo que adicionam novos mundos, monstros e bosses ao universo de Algoritma.';
    html += '</div>';

    DLC_PACKS.forEach(function(dlc) {
      var installed = dlc.status === 'installed';
      var coming    = dlc.status === 'coming';
      var color     = installed ? dlc.color : (coming ? '#52525b' : '#ef4444');
      var statusLabel = installed ? '✅ INSTALADO' : (coming ? '🔜 EM BREVE' : '⬇️ DISPONÍVEL');
      var statusColor = installed ? '#34d399' : (coming ? '#52525b' : '#f59e0b');

      html += '<div style="';
      html += 'border:1px solid ' + (installed ? color + '40' : 'rgba(255,255,255,0.06)') + ';';
      html += 'background:' + (installed ? color + '08' : 'rgba(255,255,255,0.02)') + ';';
      html += 'border-radius:12px;padding:12px 14px;margin-bottom:8px;';
      html += (installed ? 'box-shadow:0 0 12px ' + color + '15;' : '') ;
      html += '">';

      // Header do DLC
      html += '<div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:8px;">';
      html += '<div style="font-size:22px;flex-shrink:0;' + (coming ? 'filter:grayscale(1);opacity:.4;' : '') + '">' + dlc.icon + '</div>';
      html += '<div style="flex:1;min-width:0;">';
      html += '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">';
      html += '<div style="font-family:Rajdhani,sans-serif;font-size:14px;font-weight:700;color:' + (coming ? '#3f3f46' : '#e4e4e7') + ';">' + dlc.name + '</div>';
      html += '<div style="font-family:Fira Code,monospace;font-size:7px;color:' + statusColor + ';font-weight:700;">' + statusLabel + '</div>';
      html += '</div>';
      html += '<div style="font-family:Fira Code,monospace;font-size:8px;color:#3f3f46;">' + dlc.version + '</div>';
      html += '</div>';
      html += '</div>';

      // Descrição
      html += '<div style="font-family:Fira Code,monospace;font-size:8px;color:' + (coming ? '#3f3f46' : '#71717a') + ';line-height:1.5;margin-bottom:8px;">' + dlc.desc + '</div>';

      // Stats do DLC (só se instalado)
      if (installed && (dlc.monsters || dlc.bosses || dlc.items || dlc.regions.length)) {
        html += '<div style="display:flex;gap:6px;flex-wrap:wrap;">';
        if (dlc.regions.length) {
          html += '<div style="font-family:Fira Code,monospace;font-size:8px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);border-radius:6px;padding:3px 8px;color:#34d399;">🌍 ' + dlc.regions.length + ' regiões</div>';
        }
        if (dlc.monsters) {
          html += '<div style="font-family:Fira Code,monospace;font-size:8px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);border-radius:6px;padding:3px 8px;color:#f87171;">👾 ' + dlc.monsters + ' monstros</div>';
        }
        if (dlc.bosses) {
          html += '<div style="font-family:Fira Code,monospace;font-size:8px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.2);border-radius:6px;padding:3px 8px;color:#fbbf24;">💀 ' + dlc.bosses + ' bosses</div>';
        }
        if (dlc.items) {
          html += '<div style="font-family:Fira Code,monospace;font-size:8px;background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);border-radius:6px;padding:3px 8px;color:#818cf8;">⚔️ ' + dlc.items + ' itens</div>';
        }
        html += '</div>';
      }

      html += '</div>'; // card
    });

    html += '</div>';
    return html;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SELEÇÃO DE REGIÃO NO MAPA SVG
  // ══════════════════════════════════════════════════════════════════════════
  window.wmrSelectRegion = function(regionId) {
    var regions = getRegions();
    var region = regions.find(function(rg){ return rg.id === regionId; });
    if (!region) return;

    var panel = document.getElementById('wmr-map-info');
    if (!panel) return;

    var unlocked = isUnlocked(region);
    var current  = isCurrent(region);
    var color    = BIOME_COLORS[region.biome] || region.color || '#71717a';
    var icon     = BIOME_ICONS[region.biome] || region.icon || '🌐';
    var name     = region.name ? (region.name.pt || region.name) : region.id;
    var desc     = region.desc ? (region.desc.pt || region.desc) : '';
    var boss     = getBossProgress(region);
    var lvl      = getLvlProgress(region);

    var html = '<div style="display:flex;gap:10px;align-items:flex-start;">';
    html += '<div style="font-size:24px;flex-shrink:0;' + (!unlocked ? 'filter:grayscale(1);opacity:.3;' : '') + '">' + icon + '</div>';
    html += '<div style="flex:1;min-width:0;">';
    html += '<div style="font-family:Rajdhani,sans-serif;font-size:14px;font-weight:700;color:' + (unlocked ? color : '#52525b') + ';">' + name + '</div>';
    if (desc) html += '<div style="font-family:Fira Code,monospace;font-size:8px;color:#52525b;line-height:1.4;margin-top:2px;">' + desc + '</div>';

    if (!unlocked) {
      html += '<div style="margin-top:6px;font-family:Fira Code,monospace;font-size:8px;color:#f59e0b;">Requer Lvl ' + region.reqLvl + ' · ' + region.reqBoss + ' bosses</div>';
    } else if (current) {
      html += '<div style="margin-top:6px;font-family:Orbitron,monospace;font-size:7px;color:' + color + ';font-weight:900;">⚔️ LOCALIZAÇÃO ATUAL</div>';
    } else {
      html += '<div style="margin-top:6px;">';
      html += '<button onclick="window.wmrTravel(\'' + region.id + '\')" style="';
      html += 'background:' + color + '22;border:1px solid ' + color + '55;';
      html += 'color:' + color + ';border-radius:8px;padding:5px 12px;';
      html += 'font-family:Orbitron,monospace;font-size:7px;font-weight:900;cursor:pointer;">';
      html += 'VIAJAR ⚡</button>';
      html += '</div>';
    }

    html += '</div>';
    html += '</div>';

    panel.innerHTML = html;
  };

  // ══════════════════════════════════════════════════════════════════════════
  // FUNÇÕES GLOBAIS
  // ══════════════════════════════════════════════════════════════════════════
  window.wmrTravel = function(regionId) {
    travel(regionId);
    if (typeof showToast === 'function')
      showToast('🗺️ A viajar para ' + regionId + '...', 2000);
  };

  window.wmrTab = function(tab) {
    activeTab = tab;
    render();
  };

  window.wmrClose = function() {
    var el = document.getElementById(MODAL_ID);
    if (el) el.style.display = 'none';
  };

  // Substitui o openMap original
  window.openMap = function() {
    createModal();
    var el = document.getElementById(MODAL_ID);
    if (el) el.style.display = 'flex';
    render();
  };

  // Fecha ao clicar fora
  document.addEventListener('click', function(e) {
    var modal = document.getElementById(MODAL_ID);
    var panel = document.getElementById('wmr-panel');
    if (modal && panel && e.target === modal) window.wmrClose();
  });

  // ══════════════════════════════════════════════════════════════════════════
  // ESTILOS
  // ══════════════════════════════════════════════════════════════════════════
  function injectStyles() {
    if (document.getElementById('wmr-styles')) return;
    var s = document.createElement('style');
    s.id = 'wmr-styles';
    s.textContent = [
      '#wmr-content::-webkit-scrollbar { width: 4px; }',
      '#wmr-content::-webkit-scrollbar-track { background: transparent; }',
      '#wmr-content::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 2px; }',
      '#wmr-panel button { font-family: Orbitron, sans-serif; }',
    ].join('\n');
    document.head.appendChild(s);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // INICIALIZAÇÃO
  // ══════════════════════════════════════════════════════════════════════════
  console.log('[WorldMapRewrite] ✅ Mapa SVG estável carregado — openMap() redirecionado.');

})();
