// ═══════════════════════════════════════════════════════════════
// MODULE: world-map.js  — 🗺️ Mapa do Mundo Interativo
// • Canvas SVG com regiões hexagonais desbloqueáveis
// • Névoa de guerra com reveal progressivo (boss kills)
// • Sistema de clima por região (afeta monstros)
// • Eventos aleatórios: mercador, portal boss, armadilha, bênção
// • Viagem entre regiões desbloqueadas
// • Totalmente integrado com o save system existente
// ═══════════════════════════════════════════════════════════════
(function WorldMapModule() {
  'use strict';

  // ═══════════════════════════════════════════════════════════════
  // DADOS DO MUNDO
  // ═══════════════════════════════════════════════════════════════
  const WORLD = {
    regions: [
      // id, name, x%, y%, unlockAfterBosses, biome, climate
      { id:'plains',    name:'Planícies de Arador',   x:38, y:55, unlockAt:0,  biome:'grassland', climate:'clear',   emoji:'🌾', color:'#4a7c3f', desc:'Terras abertas e ventos suaves. O começo de toda jornada.' },
      { id:'forest',    name:'Floresta de Miravel',   x:25, y:42, unlockAt:1,  biome:'forest',    climate:'foggy',   emoji:'🌲', color:'#1a5c2a', desc:'Árvores antigas que sussurram segredos. A névoa nunca parte completamente.' },
      { id:'mountain',  name:'Pico do Silêncio',      x:55, y:30, unlockAt:2,  biome:'mountain',  climate:'stormy',  emoji:'⛰️', color:'#5a5a6a', desc:'Tempestades eternas coroam este cume. Somente os bravos chegam ao topo.' },
      { id:'desert',    name:'Dunas de Khara',        x:68, y:60, unlockAt:3,  biome:'desert',    climate:'scorching',emoji:'🏜️',color:'#c49a3c', desc:'O calor fende pedras. Os mortos caminham sob o sol implacável.' },
      { id:'swamp',     name:'Pântano de Malachar',   x:22, y:65, unlockAt:2,  biome:'swamp',     climate:'rainy',   emoji:'🌿', color:'#3a6b3a', desc:'Lama que engole aventureiros. As criaturas aqui não morrem — apenas se transformam.' },
      { id:'tundra',    name:'Tundra de Gelo Eterno', x:45, y:15, unlockAt:4,  biome:'tundra',    climate:'blizzard',emoji:'❄️', color:'#5a8aaa', desc:'O frio aqui não é apenas temperatura — é uma presença.' },
      { id:'volcano',   name:'Caldeira de Ignaros',   x:72, y:40, unlockAt:5,  biome:'volcanic',  climate:'infernal',emoji:'🌋', color:'#8a2020', desc:'A lava pulsa como sangue. Os demônios nasceram aqui.' },
      { id:'ruins',     name:'Ruínas de Vel\'than',   x:32, y:28, unlockAt:3,  biome:'ruins',     climate:'cursed',  emoji:'🏛️', color:'#6a4a80', desc:'Uma civilização apagada. Os ecos dos mortos não descansam.' },
      { id:'coast',     name:'Costa dos Perdidos',    x:10, y:50, unlockAt:2,  biome:'coastal',   climate:'windy',   emoji:'🌊', color:'#2a5a8a', desc:'O mar aqui não reflete o céu — reflete o fundo.' },
      { id:'citadel',   name:'Cidadela das Sombras',  x:50, y:50, unlockAt:8,  biome:'citadel',   climate:'eclipsed',emoji:'🏰', color:'#3a1a5a', desc:'O fim de todos os caminhos. A origem de toda escuridão.' },
    ],

    connections: [
      ['plains','forest'], ['plains','mountain'], ['plains','desert'],
      ['plains','swamp'],  ['plains','coast'],    ['forest','ruins'],
      ['forest','tundra'], ['mountain','tundra'], ['mountain','volcano'],
      ['desert','volcano'],['swamp','coast'],     ['ruins','citadel'],
      ['tundra','citadel'],['volcano','citadel'], ['plains','citadel'],
    ],
  };

  const CLIMATES = {
    clear:     { label:'Sereno',    icon:'☀️', monsterMod:'+Humanos',      color:'#f9d71c', fogAlpha:0.0 },
    foggy:     { label:'Nevoeiro', icon:'🌫️', monsterMod:'+Espectros',    color:'#aab8c2', fogAlpha:0.3 },
    stormy:    { label:'Tempestade',icon:'⚡', monsterMod:'+Elementais',   color:'#5b7fa6', fogAlpha:0.1 },
    scorching: { label:'Escaldante',icon:'🔥', monsterMod:'+Mortos-Vivos', color:'#e07b39', fogAlpha:0.0 },
    rainy:     { label:'Chuva',     icon:'🌧️', monsterMod:'+Anfíbios',    color:'#5a8aaa', fogAlpha:0.2 },
    blizzard:  { label:'Nevasca',   icon:'🌨️', monsterMod:'+Criaturas Gelo',color:'#a8d8ea',fogAlpha:0.4 },
    infernal:  { label:'Infernal',  icon:'😈', monsterMod:'+Demônios',     color:'#c0392b', fogAlpha:0.0 },
    cursed:    { label:'Amaldiçoado',icon:'💀',monsterMod:'+Mortos-Vivos', color:'#8e44ad', fogAlpha:0.5 },
    windy:     { label:'Ventoso',   icon:'💨', monsterMod:'+Piratas',      color:'#74b9ff', fogAlpha:0.1 },
    eclipsed:  { label:'Eclipsado', icon:'🌑', monsterMod:'+Boss Raro',    color:'#2d3436', fogAlpha:0.6 },
  };

  const EVENT_TYPES = {
    merchant: { icon:'🛒', label:'Mercador',        color:'#f9d71c', desc:'Um mercador viajante! Oferece itens raros com desconto de 30%.' },
    bossportal:{ icon:'⚡', label:'Portal de Boss', color:'#e74c3c', desc:'Um portal instável pulsa energia sombria. Boss especial disponível!' },
    trap:     { icon:'💀', label:'Armadilha',       color:'#e17055', desc:'O chão treme. Uma armadilha oculta aguarda o incauto.' },
    blessing: { icon:'✨', label:'Bênção',          color:'#00cec9', desc:'Uma aura sagrada emana daqui. +20% XP nesta região.' },
    treasure: { icon:'💰', label:'Tesouro',         color:'#fdcb6e', desc:'Marcas de ouro antigo. Um baú esquecido aguarda.' },
    portal:   { icon:'🌀', label:'Portal Arcano',   color:'#a29bfe', desc:'Um portal entre regiões — viagem instantânea disponível.' },
  };

  // ═══════════════════════════════════════════════════════════════
  // ESTADO DO MAPA
  // ═══════════════════════════════════════════════════════════════
  let mapState = {
    currentRegion: 'plains',
    unlockedRegions: new Set(['plains']),
    activeEvents: {},        // regionId -> eventType
    regionClimate: {},       // regionId -> climate (pode mudar)
    lastEventRefresh: 0,
    fogReveal: {},           // regionId -> 0..1 (0=full fog, 1=revealed)
  };

  // ═══════════════════════════════════════════════════════════════
  // INTEGRAÇÃO COM RPG
  // ═══════════════════════════════════════════════════════════════
  function loadMapState() {
    if (!rpg) return;

    // Carrega do save
    if (rpg.mapState) {
      try {
        const saved = rpg.mapState;
        mapState.currentRegion  = saved.currentRegion  || 'plains';
        mapState.unlockedRegions= new Set(saved.unlockedRegions || ['plains']);
        mapState.activeEvents   = saved.activeEvents   || {};
        mapState.regionClimate  = saved.regionClimate  || {};
        mapState.lastEventRefresh = saved.lastEventRefresh || 0;
        mapState.fogReveal      = saved.fogReveal      || {};
      } catch(e) {}
    }

    // Desbloqueia regiões baseado em boss kills
    const bosses = rpg.bossKills || 0;
    WORLD.regions.forEach(r => {
      if (bosses >= r.unlockAt) {
        if (!mapState.unlockedRegions.has(r.id)) {
          mapState.unlockedRegions.add(r.id);
          mapState.fogReveal[r.id] = 0; // começa com névoa
        }
        // Revela progressivamente baseado em kills a mais
        const extra = bosses - r.unlockAt;
        mapState.fogReveal[r.id] = Math.min(1, (mapState.fogReveal[r.id] || 0) + extra * 0.15);
      }
    });

    // Climas iniciais
    WORLD.regions.forEach(r => {
      if (!mapState.regionClimate[r.id]) {
        mapState.regionClimate[r.id] = r.climate;
      }
    });

    // Gera eventos se preciso
    refreshEvents();
  }

  function saveMapState() {
    if (!rpg) return;
    rpg.mapState = {
      currentRegion:   mapState.currentRegion,
      unlockedRegions: [...mapState.unlockedRegions],
      activeEvents:    mapState.activeEvents,
      regionClimate:   mapState.regionClimate,
      lastEventRefresh:mapState.lastEventRefresh,
      fogReveal:       mapState.fogReveal,
    };
    if (rpg.save) try { rpg.save(); } catch(e) {}
  }

  function refreshEvents() {
    const now = Date.now();
    // Refresca eventos a cada 5 minutos
    if (now - mapState.lastEventRefresh < 5 * 60 * 1000 && Object.keys(mapState.activeEvents).length > 0) return;

    mapState.activeEvents = {};
    const eventKeys = Object.keys(EVENT_TYPES);
    const unlocked = [...mapState.unlockedRegions];

    // 40% de chance de evento por região desbloqueada
    unlocked.forEach(regionId => {
      if (Math.random() < 0.4) {
        const evtKey = eventKeys[Math.floor(Math.random() * eventKeys.length)];
        mapState.activeEvents[regionId] = evtKey;
      }
    });

    mapState.lastEventRefresh = now;
  }

  // ═══════════════════════════════════════════════════════════════
  // MODAL E CANVAS DO MAPA
  // ═══════════════════════════════════════════════════════════════
  function createMapModal() {
    if (document.getElementById('world-map-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'world-map-modal';
    modal.className = 'modal-overlay fixed inset-0 flex items-center justify-center';
    modal.style.cssText = 'z-index:700;';
    modal.innerHTML = `
      <div class="wm-container">
        <!-- Header -->
        <div class="wm-header">
          <div class="wm-title-group">
            <div class="wm-title">🗺️ MAPA DO MUNDO</div>
            <div class="wm-subtitle" id="wm-boss-count">Bosses derrotados: 0</div>
          </div>
          <div class="wm-header-right">
            <div class="wm-legend">
              <span class="wm-legend-dot" style="background:#4a7c3f;"></span><span>Desbloqueado</span>
              <span class="wm-legend-dot" style="background:rgba(80,80,100,0.4);"></span><span>Bloqueado</span>
              <span class="wm-legend-dot wm-legend-pulse" style="background:#f9d71c;"></span><span>Evento</span>
            </div>
            <button onclick="closeModal('world-map-modal')" class="wm-close-btn">✕</button>
          </div>
        </div>

        <!-- Mapa canvas -->
        <div class="wm-map-wrapper">
          <canvas id="wm-canvas" class="wm-canvas"></canvas>

          <!-- Overlay de eventos (renderizado em HTML sobre o canvas) -->
          <div id="wm-events-overlay" class="wm-events-overlay"></div>

          <!-- Clima animado overlay -->
          <div id="wm-weather-overlay" class="wm-weather-overlay"></div>
        </div>

        <!-- Painel de info da região -->
        <div class="wm-info-panel" id="wm-info-panel">
          <div class="wm-info-placeholder">
            <span class="wm-info-arrow">←</span>
            Clica numa região para ver detalhes
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    injectMapStyles();
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDERIZAÇÃO DO MAPA (Canvas 2D)
  // ═══════════════════════════════════════════════════════════════
  let canvas, ctx, animFrame;
  let hoveredRegion = null;
  let selectedRegion = null;
  let time = 0;

  function initCanvas() {
    canvas = document.getElementById('wm-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', onCanvasHover);
    canvas.addEventListener('click', onCanvasClick);
    canvas.addEventListener('touchstart', onCanvasTouch, { passive: true });
    startMapAnimation();
  }

  function resizeCanvas() {
    if (!canvas) return;
    const wrapper = canvas.parentElement;
    canvas.width  = wrapper.clientWidth;
    canvas.height = wrapper.clientHeight;
  }

  function getRegionPos(r) {
    return {
      x: (r.x / 100) * canvas.width,
      y: (r.y / 100) * canvas.height,
    };
  }

  function startMapAnimation() {
    if (animFrame) cancelAnimationFrame(animFrame);
    function loop() {
      time += 0.016;
      drawMap();
      animFrame = requestAnimationFrame(loop);
    }
    loop();
  }

  function drawMap() {
    if (!ctx || !canvas) return;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // ── Fundo do mapa ─────────────────────────────────────────
    drawMapBackground(W, H);

    // ── Conexões entre regiões ────────────────────────────────
    drawConnections();

    // ── Névoa de guerra global (regiões não desbloqueadas) ────
    drawGlobalFog(W, H);

    // ── Regiões ───────────────────────────────────────────────
    WORLD.regions.forEach(r => drawRegion(r));

    // ── Herói na região atual ─────────────────────────────────
    drawHeroMarker();
  }

  function drawMapBackground(W, H) {
    // Fundo de pergaminho antigo
    const grad = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W,H)/1.4);
    grad.addColorStop(0,   '#1e2a1a');
    grad.addColorStop(0.5, '#141e12');
    grad.addColorStop(1,   '#0a0f08');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Grid subtil de hexágonos no fundo
    ctx.strokeStyle = 'rgba(60,90,50,0.08)';
    ctx.lineWidth = 0.5;
    const step = 40;
    for (let x = 0; x < W; x += step) {
      for (let y = 0; y < H; y += step) {
        drawHexPath(ctx, x, y, 20);
        ctx.stroke();
      }
    }

    // Linhas de latitude/longitude decorativas
    ctx.strokeStyle = 'rgba(80,120,60,0.06)';
    ctx.lineWidth = 0.5;
    for (let i = 1; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(0, H * i / 5);
      ctx.lineTo(W, H * i / 5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(W * i / 5, 0);
      ctx.lineTo(W * i / 5, H);
      ctx.stroke();
    }
  }

  function drawHexPath(ctx, cx, cy, r) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  function drawConnections() {
    WORLD.connections.forEach(([aId, bId]) => {
      const a = WORLD.regions.find(r => r.id === aId);
      const b = WORLD.regions.find(r => r.id === bId);
      if (!a || !b) return;

      const pa = getRegionPos(a);
      const pb = getRegionPos(b);
      const bothUnlocked = mapState.unlockedRegions.has(a.id) && mapState.unlockedRegions.has(b.id);

      // Linha base
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);

      // Bezier levemente curvada
      const mx = (pa.x + pb.x) / 2 + (Math.random() * 20 - 10) * 0; // curva suave
      const my = (pa.y + pb.y) / 2;
      ctx.quadraticCurveTo(mx, my, pb.x, pb.y);

      if (bothUnlocked) {
        ctx.strokeStyle = 'rgba(120,180,80,0.25)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
      } else {
        ctx.strokeStyle = 'rgba(80,80,80,0.12)';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 6]);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    });
  }

  function drawGlobalFog(W, H) {
    // Névoa nas bordas (sempre)
    const edgeFog = ctx.createRadialGradient(W/2, H/2, Math.min(W,H)*0.35, W/2, H/2, Math.max(W,H)*0.75);
    edgeFog.addColorStop(0, 'rgba(0,0,0,0)');
    edgeFog.addColorStop(1, 'rgba(0,0,0,0.7)');
    ctx.fillStyle = edgeFog;
    ctx.fillRect(0, 0, W, H);
  }

  function drawRegion(r) {
    if (!canvas) return;
    const pos = getRegionPos(r);
    const isUnlocked = mapState.unlockedRegions.has(r.id);
    const isHovered  = hoveredRegion === r.id;
    const isSelected = selectedRegion === r.id;
    const isCurrent  = mapState.currentRegion === r.id;
    const fogLevel   = isUnlocked ? (1 - (mapState.fogReveal[r.id] || 0)) : 1;
    const event      = mapState.activeEvents[r.id];

    const R = isHovered || isSelected ? 34 : 28;

    // ── Aura da região atual ──────────────────────────────────
    if (isCurrent) {
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, R + 12 + Math.sin(time * 2) * 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(100,200,80,0.06)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(100,200,80,0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // ── Sombra ────────────────────────────────────────────────
    if (isUnlocked) {
      ctx.beginPath();
      ctx.arc(pos.x + 2, pos.y + 3, R, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fill();
    }

    // ── Círculo principal ─────────────────────────────────────
    const bossesNeeded = r.unlockAt;
    const bosses = rpg ? (rpg.bossKills || 0) : 0;

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, R, 0, Math.PI * 2);

    if (isUnlocked) {
      // Gradiente da cor da bioma
      const grad = ctx.createRadialGradient(pos.x - R*0.3, pos.y - R*0.3, 0, pos.x, pos.y, R);
      const col  = hexToRgba(r.color, 1);
      const colD = hexToRgba(r.color, 0.6);
      grad.addColorStop(0, brighten(r.color, 40));
      grad.addColorStop(1, r.color);
      ctx.fillStyle = isSelected ? grad : (isHovered ? grad : r.color + 'cc');
      ctx.fill();

      // Borda
      ctx.strokeStyle = isSelected ? '#ffffff' : (isHovered ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)');
      ctx.lineWidth = isSelected ? 2.5 : (isHovered ? 2 : 1);
      ctx.stroke();

      // Névoa sobreposta
      if (fogLevel > 0.05) {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, R, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(10,15,10,${fogLevel * 0.85})`;
        ctx.fill();

        // Partículas de névoa animadas
        if (fogLevel > 0.3) {
          for (let i = 0; i < 3; i++) {
            const angle = (time * 0.5 + i * 2.1) % (Math.PI * 2);
            const fr = R * 0.5 * fogLevel;
            const fx = pos.x + Math.cos(angle) * fr;
            const fy = pos.y + Math.sin(angle) * fr;
            ctx.beginPath();
            ctx.arc(fx, fy, 4 + Math.sin(time + i) * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(150,170,150,${0.15 * fogLevel})`;
            ctx.fill();
          }
        }
      }

    } else {
      // Região bloqueada
      ctx.fillStyle = 'rgba(20,25,20,0.8)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(80,80,80,0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Névoa densa
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, R + 8, 0, Math.PI * 2);
      const fogGrad = ctx.createRadialGradient(pos.x, pos.y, R*0.3, pos.x, pos.y, R+8);
      fogGrad.addColorStop(0, 'rgba(15,20,15,0.7)');
      fogGrad.addColorStop(1, 'rgba(10,15,10,0)');
      ctx.fillStyle = fogGrad;
      ctx.fill();
    }

    // ── Emoji / ícone da região ───────────────────────────────
    ctx.font = `${isHovered ? 18 : 15}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (isUnlocked && fogLevel < 0.7) {
      ctx.globalAlpha = 1 - fogLevel * 0.8;
      ctx.fillText(r.emoji, pos.x, pos.y);
      ctx.globalAlpha = 1;
    } else if (!isUnlocked) {
      ctx.globalAlpha = 0.25;
      ctx.fillText('🔒', pos.x, pos.y);
      ctx.globalAlpha = 1;
    }

    // ── Nome da região ────────────────────────────────────────
    if (isUnlocked && fogLevel < 0.5) {
      ctx.font = '700 9px "Orbitron", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.globalAlpha = 1 - fogLevel;
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0,0,0,0.9)';
      ctx.shadowBlur = 4;
      ctx.fillText(r.name.length > 16 ? r.name.slice(0,15)+'…' : r.name, pos.x, pos.y + R + 5);
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    } else if (!isUnlocked) {
      ctx.font = '700 8px "Orbitron", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillStyle = 'rgba(150,150,150,0.4)';
      ctx.fillText(`${bossesNeeded} bosses`, pos.x, pos.y + R + 5);
    }

    // ── Pulsação de evento ────────────────────────────────────
    if (event && isUnlocked && fogLevel < 0.5) {
      const evt = EVENT_TYPES[event];
      const pulse = Math.sin(time * 3) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.arc(pos.x + R*0.6, pos.y - R*0.6, 9 + pulse * 2, 0, Math.PI * 2);
      ctx.fillStyle = evt.color + 'cc';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = '9px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(evt.icon, pos.x + R*0.6, pos.y - R*0.6);
    }

    // ── Indicador de herói ────────────────────────────────────
    if (isCurrent) {
      ctx.font = '14px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const heroY = pos.y - R - 10 + Math.sin(time * 2) * 3;
      ctx.fillText('⚔️', pos.x, heroY);
    }
  }

  function drawHeroMarker() {
    // Já desenhado dentro de drawRegion
  }

  // ═══════════════════════════════════════════════════════════════
  // INTERAÇÃO
  // ═══════════════════════════════════════════════════════════════
  function getRegionAtPos(mx, my) {
    for (const r of WORLD.regions) {
      const pos = getRegionPos(r);
      const dist = Math.hypot(mx - pos.x, my - pos.y);
      if (dist <= 36) return r;
    }
    return null;
  }

  function onCanvasHover(e) {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const region = getRegionAtPos(mx, my);
    hoveredRegion = region ? region.id : null;
    canvas.style.cursor = region ? 'pointer' : 'default';
  }

  function onCanvasClick(e) {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const region = getRegionAtPos(mx, my);
    if (region) selectRegion(region);
  }

  function onCanvasTouch(e) {
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const mx = touch.clientX - rect.left;
    const my = touch.clientY - rect.top;
    const region = getRegionAtPos(mx, my);
    if (region) selectRegion(region);
  }

  function selectRegion(r) {
    selectedRegion = r.id;
    renderInfoPanel(r);
  }

  // ═══════════════════════════════════════════════════════════════
  // PAINEL DE INFO
  // ═══════════════════════════════════════════════════════════════
  function renderInfoPanel(r) {
    const panel = document.getElementById('wm-info-panel');
    if (!panel) return;

    const isUnlocked = mapState.unlockedRegions.has(r.id);
    const isCurrent  = mapState.currentRegion === r.id;
    const climate    = CLIMATES[mapState.regionClimate[r.id] || r.climate];
    const event      = mapState.activeEvents[r.id];
    const evt        = event ? EVENT_TYPES[event] : null;
    const fog        = mapState.fogReveal[r.id] || 0;
    const bosses     = rpg ? (rpg.bossKills || 0) : 0;

    if (!isUnlocked) {
      panel.innerHTML = `
        <div class="wm-info-locked">
          <div class="wm-info-lock-icon">🔒</div>
          <div class="wm-info-lock-title">${r.name}</div>
          <div class="wm-info-lock-req">Requer <strong>${r.unlockAt} bosses</strong> derrotados</div>
          <div class="wm-info-lock-prog">
            <div class="wm-prog-bar">
              <div class="wm-prog-fill" style="width:${Math.min(100, (bosses/r.unlockAt)*100)}%"></div>
            </div>
            <span class="wm-prog-label">${Math.min(bosses, r.unlockAt)} / ${r.unlockAt}</span>
          </div>
          <div class="wm-info-hint">${r.desc}</div>
        </div>
      `;
      return;
    }

    const fogPct = Math.round(fog * 100);
    const climateColor = climate ? climate.color : '#888';

    panel.innerHTML = `
      <div class="wm-info-content">
        <div class="wm-info-top">
          <div class="wm-info-emoji">${r.emoji}</div>
          <div class="wm-info-titles">
            <div class="wm-info-name">${r.name}</div>
            <div class="wm-info-biome">${r.biome.toUpperCase()}</div>
          </div>
          ${isCurrent ? '<div class="wm-info-here">AQUI</div>' : ''}
        </div>

        <div class="wm-info-desc">${r.desc}</div>

        <div class="wm-info-stats">
          <!-- Clima -->
          <div class="wm-stat-card" style="border-color:${climateColor}33;">
            <div class="wm-stat-icon">${climate ? climate.icon : '?'}</div>
            <div class="wm-stat-body">
              <div class="wm-stat-label">CLIMA</div>
              <div class="wm-stat-val">${climate ? climate.label : '—'}</div>
              <div class="wm-stat-sub">${climate ? climate.monsterMod : ''}</div>
            </div>
          </div>

          <!-- Névoa -->
          <div class="wm-stat-card">
            <div class="wm-stat-icon">${fog >= 0.8 ? '🌞' : fog >= 0.4 ? '🌤️' : '🌫️'}</div>
            <div class="wm-stat-body">
              <div class="wm-stat-label">EXPLORAÇÃO</div>
              <div class="wm-stat-val">${fogPct}%</div>
              <div class="wm-prog-bar wm-prog-sm">
                <div class="wm-prog-fill wm-prog-fog" style="width:${fogPct}%;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Evento ativo -->
        ${evt ? `
          <div class="wm-event-card" style="border-color:${evt.color}55;background:${evt.color}0a;">
            <span class="wm-event-icon">${evt.icon}</span>
            <div class="wm-event-body">
              <div class="wm-event-name" style="color:${evt.color};">${evt.label}</div>
              <div class="wm-event-desc">${evt.desc}</div>
            </div>
          </div>
        ` : ''}

        <!-- Botões de ação -->
        <div class="wm-actions">
          ${!isCurrent ? `
            <button class="wm-action-btn wm-action-travel" onclick="window._wmTravel('${r.id}')">
              <span>⚡</span> Viajar para Cá
            </button>
          ` : `
            <button class="wm-action-btn wm-action-hunt" onclick="window._wmHunt('${r.id}')">
              <span>⚔️</span> Caçar Aqui
            </button>
          `}
          ${evt === 'merchant' ? `
            <button class="wm-action-btn wm-action-event" onclick="window._wmEvent('${r.id}','merchant')" style="border-color:#f9d71c55;color:#f9d71c;">
              🛒 Visitar Mercador
            </button>
          ` : ''}
          ${evt === 'bossportal' ? `
            <button class="wm-action-btn wm-action-event" onclick="window._wmEvent('${r.id}','bossportal')" style="border-color:#e74c3c55;color:#e74c3c;">
              ⚡ Entrar no Portal
            </button>
          ` : ''}
          ${evt === 'treasure' ? `
            <button class="wm-action-btn wm-action-event" onclick="window._wmEvent('${r.id}','treasure')" style="border-color:#fdcb6e55;color:#fdcb6e;">
              💰 Abrir Tesouro
            </button>
          ` : ''}
          ${evt === 'blessing' ? `
            <button class="wm-action-btn wm-action-event" onclick="window._wmEvent('${r.id}','blessing')" style="border-color:#00cec955;color:#00cec9;">
              ✨ Receber Bênção
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  // AÇÕES DO MAPA
  // ═══════════════════════════════════════════════════════════════
  window._wmTravel = function(regionId) {
    const region = WORLD.regions.find(r => r.id === regionId);
    if (!region || !mapState.unlockedRegions.has(regionId)) return;

    mapState.currentRegion = regionId;

    // Aplica modificadores de clima ao rpg
    const climate = CLIMATES[mapState.regionClimate[regionId] || region.climate];
    if (rpg) {
      rpg.currentMapRegion = regionId;
      rpg.currentClimate   = mapState.regionClimate[regionId] || region.climate;
    }

    saveMapState();
    if (typeof showToast === 'function')
      showToast(`⚡ Viajaste para ${region.name}!`, 3000);

    // Fecha modal e volta ao menu de combate
    closeModal('world-map-modal');

    // Atualiza info panel se ainda visível
    renderInfoPanel(region);
  };

  window._wmHunt = function(regionId) {
    const region = WORLD.regions.find(r => r.id === regionId);
    if (!region) return;
    closeModal('world-map-modal');
    // Inicia combate nessa região
    if (typeof rpg !== 'undefined') {
      if (rpg.startHunt) rpg.startHunt(regionId);
      else if (rpg.startCombat) rpg.startCombat();
      else if (typeof navTo === 'function') navTo('dungeon');
    }
    if (typeof showToast === 'function')
      showToast(`⚔️ A caçar em ${region.name}...`, 2500);
  };

  window._wmEvent = function(regionId, eventType) {
    const region = WORLD.regions.find(r => r.id === regionId);
    const evt = EVENT_TYPES[eventType];
    if (!region || !evt) return;

    switch(eventType) {
      case 'merchant':
        delete mapState.activeEvents[regionId];
        closeModal('world-map-modal');
        if (typeof openShop === 'function') {
          // Aplica desconto temporário
          if (rpg) rpg._mapMerchantDiscount = 0.3;
          openShop();
          if (typeof showToast === 'function')
            showToast('🛒 Mercador Viajante — 30% de desconto!', 4000);
        }
        break;

      case 'bossportal':
        delete mapState.activeEvents[regionId];
        closeModal('world-map-modal');
        if (rpg && rpg.startBossFight) rpg.startBossFight();
        else if (typeof navTo === 'function') navTo('dungeon');
        if (typeof showToast === 'function')
          showToast('⚡ Portal de Boss activo!', 3000);
        break;

      case 'treasure':
        delete mapState.activeEvents[regionId];
        const gold = 50 + Math.floor(Math.random() * 200);
        if (rpg) { rpg.gold = (rpg.gold || 0) + gold; if (rpg.save) rpg.save(); if (rpg.updateUI) rpg.updateUI(); }
        if (typeof showToast === 'function')
          showToast(`💰 Encontraste ${gold} de ouro!`, 3500);
        renderInfoPanel(region);
        break;

      case 'blessing':
        delete mapState.activeEvents[regionId];
        if (rpg) { rpg._mapXpBonus = 1.2; rpg._mapXpBonusRegion = regionId; }
        if (typeof showToast === 'function')
          showToast('✨ Bênção recebida — +20% XP nesta região!', 4000);
        renderInfoPanel(region);
        break;

      case 'trap':
        delete mapState.activeEvents[regionId];
        const dmg = 5 + Math.floor(Math.random() * 15);
        if (rpg) { rpg.heroHp = Math.max(1, (rpg.heroHp || 50) - dmg); if (rpg.updateUI) rpg.updateUI(); }
        if (typeof showToast === 'function')
          showToast(`💀 Armadilha! Perdeste ${dmg} HP!`, 3500, 'error');
        renderInfoPanel(region);
        break;
    }

    saveMapState();
  };

  // ═══════════════════════════════════════════════════════════════
  // ABERTURA DO MAPA
  // ═══════════════════════════════════════════════════════════════
  window.openMap = function() {
    createMapModal();
    loadMapState();

    const modal = document.getElementById('world-map-modal');
    if (modal) modal.classList.add('active');

    // Actualiza contador de bosses
    const bossEl = document.getElementById('wm-boss-count');
    if (bossEl && rpg) {
      bossEl.textContent = `Bosses derrotados: ${rpg.bossKills || 0} • Regiões: ${mapState.unlockedRegions.size}/${WORLD.regions.length}`;
    }

    // Inicia canvas após o modal estar visível
    setTimeout(() => {
      initCanvas();
      // Seleciona região atual por padrão
      const current = WORLD.regions.find(r => r.id === mapState.currentRegion);
      if (current) selectRegion(current);
    }, 80);
  };

  // Hook no killMonster para revelar névoa após bosses
  function hookBossKillForMap() {
    const _orig = rpg.killMonster;
    if (!_orig) return;
    rpg.killMonster = function() {
      const result = _orig.apply(this, arguments);
      // Após boss kill, revela névoa da região atual
      if (this.monster && (this.monster.isBoss || this.isBossFight)) {
        const regionId = mapState.currentRegion || 'plains';
        if (mapState.unlockedRegions.has(regionId)) {
          mapState.fogReveal[regionId] = Math.min(1, (mapState.fogReveal[regionId] || 0) + 0.25);
        }
        // Desbloqueia novas regiões
        const bosses = this.bossKills || 0;
        WORLD.regions.forEach(r => {
          if (bosses >= r.unlockAt && !mapState.unlockedRegions.has(r.id)) {
            mapState.unlockedRegions.add(r.id);
            mapState.fogReveal[r.id] = 0.1;
            if (typeof showToast === 'function')
              showToast(`🗺️ Nova região desbloqueada: ${r.name}!`, 4000);
          }
        });
        // Gera novo evento na região revelada
        if (Math.random() < 0.6) {
          const evtKeys = Object.keys(EVENT_TYPES);
          mapState.activeEvents[regionId] = evtKeys[Math.floor(Math.random() * evtKeys.length)];
        }
        saveMapState();
      }
      return result;
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // HELPERS
  // ═══════════════════════════════════════════════════════════════
  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function brighten(hex, amt) {
    const r = Math.min(255, parseInt(hex.slice(1,3),16) + amt);
    const g = Math.min(255, parseInt(hex.slice(3,5),16) + amt);
    const b = Math.min(255, parseInt(hex.slice(5,7),16) + amt);
    return `rgb(${r},${g},${b})`;
  }

  // ═══════════════════════════════════════════════════════════════
  // ESTILOS
  // ═══════════════════════════════════════════════════════════════
  function injectMapStyles() {
    if (document.getElementById('world-map-styles')) return;
    const s = document.createElement('style');
    s.id = 'world-map-styles';
    s.textContent = `
      #world-map-modal {
        background: rgba(0,0,0,0.9) !important;
        backdrop-filter: blur(8px) !important;
      }

      .wm-container {
        width: 96vw;
        max-width: 740px;
        max-height: 94vh;
        display: flex;
        flex-direction: column;
        gap: 0;
        border-radius: 16px;
        overflow: hidden;
        border: 1px solid rgba(80,120,60,0.25);
        box-shadow:
          0 0 60px rgba(0,0,0,0.8),
          0 0 0 1px rgba(60,90,40,0.15),
          inset 0 1px 0 rgba(255,255,255,0.04);
      }

      /* ══ HEADER ══ */
      .wm-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        background: rgba(8,14,6,0.97);
        border-bottom: 1px solid rgba(60,90,40,0.2);
        flex-shrink: 0;
        gap: 10px;
      }

      .wm-title-group { display: flex; flex-direction: column; gap: 2px; }
      .wm-title {
        font-family: 'Orbitron', sans-serif;
        font-size: 13px;
        font-weight: 900;
        color: rgba(160,220,100,0.95);
        letter-spacing: 0.15em;
        text-transform: uppercase;
      }
      .wm-subtitle {
        font-family: 'Fira Code', monospace;
        font-size: 9px;
        color: rgba(100,150,70,0.7);
        letter-spacing: 0.1em;
      }

      .wm-header-right { display: flex; align-items: center; gap: 10px; }

      .wm-legend {
        display: flex;
        align-items: center;
        gap: 6px;
        font-family: 'Fira Code', monospace;
        font-size: 8px;
        color: rgba(120,160,90,0.7);
      }
      .wm-legend-dot {
        width: 8px; height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .wm-legend-pulse { animation: legendPulse 1.5s ease infinite; }
      @keyframes legendPulse {
        0%,100% { box-shadow: 0 0 0 0 rgba(249,215,28,0.4); }
        50%      { box-shadow: 0 0 0 4px rgba(249,215,28,0); }
      }

      .wm-close-btn {
        width: 28px; height: 28px;
        border-radius: 8px;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        color: rgba(200,200,200,0.7);
        font-size: 11px;
        cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        transition: all 0.15s;
      }
      .wm-close-btn:hover { background: rgba(200,50,50,0.2); color: #ff6b6b; }

      /* ══ MAPA ══ */
      .wm-map-wrapper {
        position: relative;
        flex: 1;
        min-height: 280px;
        overflow: hidden;
        background: #0a0f08;
      }

      .wm-canvas {
        display: block;
        width: 100%;
        height: 100%;
        cursor: default;
      }

      .wm-events-overlay, .wm-weather-overlay {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }

      /* ══ PAINEL INFO ══ */
      .wm-info-panel {
        background: rgba(6,10,5,0.97);
        border-top: 1px solid rgba(60,90,40,0.2);
        padding: 12px 14px;
        min-height: 120px;
        flex-shrink: 0;
        overflow-y: auto;
        max-height: 220px;
        scrollbar-width: none;
      }
      .wm-info-panel::-webkit-scrollbar { display: none; }

      .wm-info-placeholder {
        display: flex;
        align-items: center;
        gap: 8px;
        color: rgba(80,110,60,0.5);
        font-family: 'Fira Code', monospace;
        font-size: 10px;
        height: 100%;
        justify-content: center;
        padding: 20px 0;
      }
      .wm-info-arrow { font-size: 16px; animation: arrowPulse 1.5s ease infinite; }
      @keyframes arrowPulse {
        0%,100% { transform: translateX(0); opacity: 0.5; }
        50%      { transform: translateX(-4px); opacity: 1; }
      }

      .wm-info-locked {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        padding: 8px 0;
      }
      .wm-info-lock-icon { font-size: 22px; }
      .wm-info-lock-title {
        font-family: 'Orbitron', sans-serif;
        font-size: 11px;
        font-weight: 900;
        color: rgba(150,150,170,0.8);
        letter-spacing: 0.1em;
      }
      .wm-info-lock-req {
        font-family: 'Fira Code', monospace;
        font-size: 9px;
        color: rgba(120,120,140,0.7);
      }
      .wm-info-lock-req strong { color: rgba(200,100,80,0.9); }
      .wm-info-lock-prog {
        display: flex; align-items: center; gap: 8px; width: 200px;
      }
      .wm-info-hint {
        font-family: 'Fira Code', monospace;
        font-size: 8px;
        color: rgba(80,80,100,0.6);
        text-align: center;
        font-style: italic;
        max-width: 280px;
        margin-top: 4px;
      }

      .wm-info-content { display: flex; flex-direction: column; gap: 8px; }

      .wm-info-top {
        display: flex; align-items: center; gap: 10px;
      }
      .wm-info-emoji { font-size: 22px; flex-shrink: 0; }
      .wm-info-titles { flex: 1; min-width: 0; }
      .wm-info-name {
        font-family: 'Orbitron', sans-serif;
        font-size: 12px;
        font-weight: 900;
        color: rgba(160,220,100,0.95);
        letter-spacing: 0.08em;
      }
      .wm-info-biome {
        font-family: 'Fira Code', monospace;
        font-size: 8px;
        color: rgba(100,140,70,0.6);
        letter-spacing: 0.2em;
        margin-top: 2px;
      }
      .wm-info-here {
        padding: 3px 8px;
        background: rgba(100,200,80,0.12);
        border: 1px solid rgba(100,200,80,0.3);
        border-radius: 6px;
        font-family: 'Orbitron', sans-serif;
        font-size: 8px;
        font-weight: 900;
        color: rgba(100,200,80,0.9);
        letter-spacing: 0.1em;
        flex-shrink: 0;
        animation: hereGlow 2s ease infinite alternate;
      }
      @keyframes hereGlow {
        from { box-shadow: none; }
        to   { box-shadow: 0 0 8px rgba(100,200,80,0.2); }
      }

      .wm-info-desc {
        font-family: 'Fira Code', monospace;
        font-size: 9px;
        color: rgba(120,160,90,0.7);
        font-style: italic;
        line-height: 1.5;
      }

      .wm-info-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }

      .wm-stat-card {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        padding: 8px 10px;
        background: rgba(20,30,15,0.8);
        border: 1px solid rgba(60,90,40,0.2);
        border-radius: 10px;
      }
      .wm-stat-icon { font-size: 16px; flex-shrink: 0; }
      .wm-stat-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
      .wm-stat-label {
        font-family: 'Orbitron', sans-serif;
        font-size: 7px;
        color: rgba(100,140,70,0.6);
        letter-spacing: 0.2em;
      }
      .wm-stat-val {
        font-family: 'Fira Code', monospace;
        font-size: 11px;
        font-weight: 700;
        color: rgba(180,220,130,0.9);
      }
      .wm-stat-sub {
        font-family: 'Fira Code', monospace;
        font-size: 8px;
        color: rgba(120,160,80,0.6);
      }

      .wm-event-card {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 8px 12px;
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 10px;
        background: rgba(20,20,20,0.5);
      }
      .wm-event-icon { font-size: 18px; flex-shrink: 0; }
      .wm-event-body { flex: 1; min-width: 0; }
      .wm-event-name {
        font-family: 'Orbitron', sans-serif;
        font-size: 9px;
        font-weight: 900;
        letter-spacing: 0.1em;
        margin-bottom: 2px;
      }
      .wm-event-desc {
        font-family: 'Fira Code', monospace;
        font-size: 8.5px;
        color: rgba(180,180,200,0.7);
        line-height: 1.4;
      }

      .wm-actions { display: flex; gap: 6px; flex-wrap: wrap; }

      .wm-action-btn {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 7px 14px;
        border-radius: 8px;
        font-family: 'Orbitron', sans-serif;
        font-size: 8px;
        font-weight: 900;
        letter-spacing: 0.1em;
        cursor: pointer;
        transition: all 0.15s;
        border: 1px solid;
        text-transform: uppercase;
      }
      .wm-action-travel {
        background: rgba(100,200,80,0.1);
        border-color: rgba(100,200,80,0.35);
        color: rgba(140,230,100,0.9);
      }
      .wm-action-travel:hover {
        background: rgba(100,200,80,0.2);
        box-shadow: 0 0 12px rgba(100,200,80,0.15);
      }
      .wm-action-hunt {
        background: rgba(200,80,80,0.1);
        border-color: rgba(200,80,80,0.35);
        color: rgba(230,120,100,0.9);
      }
      .wm-action-hunt:hover {
        background: rgba(200,80,80,0.2);
        box-shadow: 0 0 12px rgba(200,80,80,0.15);
      }
      .wm-action-event {
        background: rgba(255,255,255,0.04);
        border-color: rgba(255,255,255,0.15);
        color: rgba(220,220,240,0.8);
      }
      .wm-action-event:hover { background: rgba(255,255,255,0.08); }

      /* ══ BARRAS DE PROGRESSO ══ */
      .wm-prog-bar {
        flex: 1;
        height: 5px;
        background: rgba(0,0,0,0.5);
        border-radius: 99px;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.05);
      }
      .wm-prog-sm { height: 3px; margin-top: 3px; }
      .wm-prog-fill {
        height: 100%;
        background: linear-gradient(90deg, #4a7c3f, #7bc96f);
        border-radius: 99px;
        transition: width 0.5s ease;
      }
      .wm-prog-fog {
        background: linear-gradient(90deg, #2a5a8a, #74b9ff);
      }
      .wm-prog-label {
        font-family: 'Fira Code', monospace;
        font-size: 8px;
        color: rgba(150,150,170,0.7);
        flex-shrink: 0;
      }
    `;
    document.head.appendChild(s);
  }

  // ═══════════════════════════════════════════════════════════════
  // INIT
  // ═══════════════════════════════════════════════════════════════
  function init() {
    hookBossKillForMap();
    // Pré-cria o modal
    createMapModal();
    console.log('[WorldMapModule] OK — ' + WORLD.regions.length + ' regiões, névoa de guerra activa.');
  }

  function waitForRpg(cb, n) {
    if (typeof rpg !== 'undefined' && rpg.updateUI) cb();
    else if ((n || 0) < 40) setTimeout(() => waitForRpg(cb, (n||0)+1), 200);
  }
  waitForRpg(init);

})();
