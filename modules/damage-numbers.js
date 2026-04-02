// ═══════════════════════════════════════════════════════════════
// MODULE: damage-numbers.js  —  NÚMEROS DE DANO MELHORADOS
// ─────────────────────────────────────────────────────────────
// • Tamanho proporcional ao dano (normal→crit→ultimate)
// • Cor por tipo: verde=heal, vermelho=dano, dourado=crit, azul=magic
// • Trajetória diferente por tipo (arco, reto, espiral)
// • "CRITICAL!" com zoom dramático separado do número
// • Partículas ao redor de crits
// • Substituição do showDamage original — compatível com todo o código existente
// ═══════════════════════════════════════════════════════════════
(function DamageNumbersModule() {
  'use strict';

  // ── Configuração de cada tipo ─────────────────────────────────
  const TYPE_CONFIG = {
    // tipo         cor         sombra                  tamanho  trajetória   lado
    'crit':        { color:'#ffd60a', shadow:'rgba(255,214,10,0.8)', size:28, path:'arc-up',    side:'monster', showCritLabel:true  },
    'monster':     { color:'#ef4444', shadow:'rgba(239,68,68,0.5)',  size:16, path:'straight',  side:'monster', showCritLabel:false },
    'heal':        { color:'#34d399', shadow:'rgba(52,211,153,0.6)', size:18, path:'float-up',  side:'hero',    showCritLabel:false },
    'hero':        { color:'#ff6b6b', shadow:'rgba(255,107,107,0.6)',size:20, path:'wobble',    side:'hero',    showCritLabel:false },
    'dodge':       { color:'#00e5ff', shadow:'rgba(0,229,255,0.5)',  size:14, path:'slide',     side:'hero',    showCritLabel:false },
    'dmg-parry':   { color:'#a855f7', shadow:'rgba(168,85,247,0.7)', size:22, path:'arc-up',    side:'hero',    showCritLabel:false },
    'dmg-effective':{ color:'#fb923c',shadow:'rgba(251,146,60,0.7)', size:20, path:'arc-up',    side:'monster', showCritLabel:false },
    'dmg-resistant':{ color:'#94a3b8',shadow:'rgba(148,163,184,0.4)',size:13, path:'slide',     side:'monster', showCritLabel:false },
    'monster-dodge':{ color:'#60a5fa',shadow:'rgba(96,165,250,0.5)', size:13, path:'slide',     side:'monster', showCritLabel:false },
    'monster-block':{ color:'#6b7280',shadow:'rgba(107,114,128,0.4)',size:13, path:'straight',  side:'monster', showCritLabel:false },
    'dmg-normal':  { color:'#e2e8f0', shadow:'rgba(226,232,240,0.3)',size:14, path:'straight',  side:'monster', showCritLabel:false },
    'dmg-warning': { color:'#ef4444', shadow:'rgba(239,68,68,0.4)',  size:15, path:'straight',  side:'monster', showCritLabel:false },
    'dmg-player':  { color:'#ff6b6b', shadow:'rgba(255,107,107,0.5)',size:18, path:'wobble',    side:'hero',    showCritLabel:false },
  };

  // Mapa de type antigo → novo key
  const TYPE_MAP = {
    'crit':          'crit',
    'heal':          'heal',
    'hero':          'hero',
    'dodge':         'dodge',
    'dmg-parry':     'dmg-parry',
    'monster':       'dmg-warning',
    'dmg-effective': 'dmg-effective',
    'dmg-resistant': 'dmg-resistant',
    'monster-dodge': 'monster-dodge',
    'monster-block': 'monster-block',
    'normal':        'dmg-normal',
  };

  // ── Injeta CSS base ───────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('dmg-numbers-styles')) return;
    const s = document.createElement('style');
    s.id = 'dmg-numbers-styles';
    s.textContent = `
      .dmg-enhanced {
        position: absolute;
        pointer-events: none;
        font-family: 'Orbitron', 'Fira Code', monospace;
        font-weight: 900;
        letter-spacing: 0.04em;
        white-space: nowrap;
        z-index: 100;
        user-select: none;
        will-change: transform, opacity;
        line-height: 1;
      }

      /* ── Trajetórias via keyframes ── */
      @keyframes dmg-straight {
        0%   { transform: translateY(0)   scale(1);    opacity: 1; }
        60%  { transform: translateY(-44px) scale(1.05); opacity: 1; }
        100% { transform: translateY(-70px) scale(0.85); opacity: 0; }
      }
      @keyframes dmg-arc-up {
        0%   { transform: translate(0, 0)    scale(0.6); opacity: 1; }
        20%  { transform: translate(8px, -20px) scale(1.15); opacity: 1; }
        60%  { transform: translate(14px, -55px) scale(1.05); opacity: 1; }
        100% { transform: translate(18px, -80px) scale(0.8); opacity: 0; }
      }
      @keyframes dmg-float-up {
        0%   { transform: translateY(0) scale(0.9); opacity: 1; }
        40%  { transform: translateY(-30px) scale(1.1); opacity: 1; }
        100% { transform: translateY(-65px) scale(1); opacity: 0; }
      }
      @keyframes dmg-wobble {
        0%   { transform: translate(0, 0) rotate(-5deg) scale(1); opacity: 1; }
        25%  { transform: translate(-6px, -15px) rotate(5deg) scale(1.1); opacity: 1; }
        60%  { transform: translate(3px, -40px) rotate(-3deg) scale(1.05); opacity: 1; }
        100% { transform: translate(0, -60px) rotate(0deg) scale(0.9); opacity: 0; }
      }
      @keyframes dmg-slide {
        0%   { transform: translateX(0) translateY(0) scale(1);   opacity: 1; }
        50%  { transform: translateX(-18px) translateY(-20px) scale(1.05); opacity: 1; }
        100% { transform: translateX(-28px) translateY(-40px) scale(0.9); opacity: 0; }
      }

      /* ── CRITICAL label ── */
      @keyframes crit-label-in {
        0%   { transform: translateX(-50%) scale(0.3) rotate(-8deg); opacity: 0; }
        35%  { transform: translateX(-50%) scale(1.2) rotate(2deg);  opacity: 1; }
        65%  { transform: translateX(-50%) scale(1.0) rotate(0deg);  opacity: 1; }
        100% { transform: translateX(-50%) scale(0.9) translateY(-20px) rotate(0deg); opacity: 0; }
      }
      .dmg-crit-label {
        position: absolute;
        pointer-events: none;
        font-family: 'Orbitron', monospace;
        font-size: 9px;
        font-weight: 900;
        letter-spacing: 0.18em;
        color: #fff;
        background: linear-gradient(90deg, #dc2626, #ffd60a, #dc2626);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: none;
        white-space: nowrap;
        z-index: 101;
        animation: crit-label-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        transform-origin: center bottom;
        left: 50%;
        filter: drop-shadow(0 0 6px rgba(255,214,10,0.9));
      }

      /* ── Partícula de crit ── */
      @keyframes crit-particle {
        0%   { transform: translate(0,0) scale(1); opacity: 1; }
        100% { transform: translate(var(--px), var(--py)) scale(0); opacity: 0; }
      }
      .dmg-particle {
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 99;
        animation: crit-particle 0.6s ease-out forwards;
      }

      /* ── Mega damage (> 1M) ── */
      @keyframes mega-pulse {
        0%   { filter: brightness(1); }
        50%  { filter: brightness(1.6); }
        100% { filter: brightness(1); }
      }
      .dmg-mega {
        animation-name: dmg-arc-up, mega-pulse !important;
        animation-duration: 1s, 0.3s !important;
        animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1), ease !important;
        animation-fill-mode: forwards, none !important;
      }
    `;
    document.head.appendChild(s);
  }

  // ── Calcula tamanho baseado no valor numérico ─────────────────
  function calcFontSize(text, baseSize) {
    const num = parseFloat(text.replace(/[^0-9.]/g, '')) || 0;
    if (num <= 0) return baseSize;

    // Escala logarítmica: 1→base, 1K→base+4, 1M→base+8, 1B→base+12
    const magnitude = Math.log10(Math.max(1, num));
    const bonus = Math.min(16, Math.floor(magnitude * 2.5));
    return baseSize + bonus;
  }

  // ── Cria partículas de crítico ────────────────────────────────
  function spawnCritParticles(zone, x, y) {
    const COLORS = ['#ffd60a', '#fb923c', '#ef4444', '#ffffff', '#fbbf24'];
    for (let i = 0; i < 8; i++) {
      const p = document.createElement('div');
      p.className = 'dmg-particle';
      const angle = (i / 8) * Math.PI * 2;
      const dist  = 20 + Math.random() * 25;
      p.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        background: ${COLORS[i % COLORS.length]};
        --px: ${Math.cos(angle) * dist}px;
        --py: ${Math.sin(angle) * dist}px;
        animation-delay: ${Math.random() * 0.1}s;
      `;
      zone.appendChild(p);
      setTimeout(() => p.remove(), 700);
    }
  }

  // ── Função principal de exibição ──────────────────────────────
  function showEnhancedDamage(textOut, type) {
    const zone = document.getElementById('damage-zone');
    if (!zone) return;

    const cfgKey = TYPE_MAP[type] || type || 'dmg-normal';
    const cfg    = TYPE_CONFIG[cfgKey] || TYPE_CONFIG['dmg-normal'];

    // ── Posição base ──────────────────────────────────────────
    const randomX = (Math.random() - 0.5) * 55;
    const baseLeft = cfg.side === 'hero' ? 20 : 80;
    const leftPx   = (zone.offsetWidth * baseLeft / 100) + randomX;
    const bottomPct = 38 + Math.random() * 10;

    // ── Tamanho ───────────────────────────────────────────────
    const fontSize = calcFontSize(textOut, cfg.size);

    // ── Cria o popup ──────────────────────────────────────────
    const popup = document.createElement('div');
    popup.className = 'dmg-enhanced';

    const isMega = parseFloat(textOut.replace(/[^0-9.]/g, '')) >= 1e6;

    popup.style.cssText = `
      left: ${leftPx}px;
      bottom: ${bottomPct}%;
      font-size: ${fontSize}px;
      color: ${cfg.color};
      text-shadow: 0 0 12px ${cfg.shadow}, 0 2px 0 rgba(0,0,0,0.8), 1px 1px 0 rgba(0,0,0,0.9);
      animation: dmg-${cfg.path} ${isMega ? '1s' : '0.85s'} cubic-bezier(0.22, 1, 0.36, 1) forwards;
    `;
    popup.textContent = textOut;

    if (isMega) popup.classList.add('dmg-mega');

    zone.appendChild(popup);
    setTimeout(() => popup.remove(), 1050);

    // ── CRITICAL extras ───────────────────────────────────────
    if (cfg.showCritLabel || type === 'crit') {
      // Label "CRITICAL!"
      const label = document.createElement('div');
      label.className = 'dmg-crit-label';
      label.textContent = 'CRITICAL!';
      label.style.cssText = `
        left: ${leftPx}px;
        bottom: calc(${bottomPct}% + ${fontSize + 4}px);
      `;
      zone.appendChild(label);
      setTimeout(() => label.remove(), 950);

      // Partículas
      spawnCritParticles(zone, leftPx, zone.offsetHeight * (1 - bottomPct / 100));
    }

    // ── Ultimate: shake extra ─────────────────────────────────
    if (type === 'crit' && fontSize >= 38) {
      const gc = document.getElementById('game-container');
      if (gc) {
        gc.classList.add('shake-heavy');
        setTimeout(() => gc.classList.remove('shake-heavy'), 350);
      }
    }
  }

  // ── Patch do showDamage original ──────────────────────────────
  function patchShowDamage() {
    const _orig = rpg.showDamage;
    rpg.showDamage = function(textOut, type) {
      // Chama o original para manter compatibilidade com o battle log
      // mas esconde o popup original via CSS (vamos usar o nosso)
      try { _orig.apply(this, arguments); } catch(e) {}
      showEnhancedDamage(textOut, type);
    };

    // Esconde os popups originais (manter só os nossos)
    const hideStyle = document.createElement('style');
    hideStyle.textContent = `
      /* Esconde popups originais — usamos os enhanced */
      .dmg-popup { display: none !important; }
    `;
    document.head.appendChild(hideStyle);
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    injectStyles();
    patchShowDamage();
    console.log('[DamageNumbersModule] OK — números escaláveis, partículas, CRITICAL!');
  }

  function waitForRpg(cb, n) {
    if (typeof rpg !== 'undefined' && rpg.showDamage) cb();
    else if ((n || 0) < 40) setTimeout(() => waitForRpg(cb, (n || 0) + 1), 200);
  }

  waitForRpg(init);
})();
