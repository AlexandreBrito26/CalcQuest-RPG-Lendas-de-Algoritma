// ═══════════════════════════════════════════════════════════════
// MODULE: profile-vip-fix.js (V3 - Anti-Poluição & HUD Legível)
// ─────────────────────────────────────────────────────────────
// - Aumenta o tamanho do texto do Registro de Combate.
// - Previne títulos "DEUS DEUS" duplicados fundindo-os.
// - Reduz o tamanho do VIP na HUD de Combate para não poluir.
// - Remove os antigos Centuriões de vez.
// ═══════════════════════════════════════════════════════════════
(function ProfileVipFixV3() {
  'use strict';

  function applyVipVisuals() {
    if (typeof rpg === 'undefined') return;

    // 1. Ocultar o "Centurião" antigo de vez
    const hideIds = ['hero-title-badge', 'profile-rank-badge'];
    hideIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });

    // 2. Recuperar dados VIP
    const tierId = localStorage.getItem('rpg_vip_tier');
    let eq = {};
    try { eq = JSON.parse(localStorage.getItem('rpg_vip_equipped') || '{}'); } catch(e) {}
    
    if (!tierId && !eq.title) return; 

    const vipHtml = getVipHtml(tierId, eq.title);

    // 3. Injetar no Menu Principal
    const menuNameEl = document.getElementById('menu-hero-name');
    if (menuNameEl) {
      menuNameEl.classList.remove('truncate');
      menuNameEl.style.display = 'flex';
      menuNameEl.style.alignItems = 'center';
      menuNameEl.style.flexWrap = 'wrap';
      menuNameEl.style.gap = '6px';
      
      let badge = document.getElementById('vip-badge-main');
      if (!badge) {
        badge = document.createElement('span');
        badge.id = 'vip-badge-main';
        menuNameEl.appendChild(badge);
      }
      badge.innerHTML = vipHtml;
    }

    // 4. Injetar na HUD DE COMBATE (Barra de Batalha)
    const hudNameEl = document.getElementById('battle-hero-name');
    if (hudNameEl) {
      hudNameEl.classList.remove('truncate');
      hudNameEl.style.display = 'flex';
      hudNameEl.style.alignItems = 'center';
      hudNameEl.style.gap = '4px';
      
      let badge = document.getElementById('vip-badge-hud');
      if (!badge) {
        badge = document.createElement('span');
        badge.id = 'vip-badge-hud';
        hudNameEl.appendChild(badge);
      }
      badge.innerHTML = vipHtml;
    }

    // 5. Injetar no Perfil
    const profInput = document.getElementById('profile-name-input');
    if (profInput && profInput.parentNode) {
      const parent = profInput.parentNode;
      parent.style.flexWrap = 'wrap';
      parent.style.justifyContent = 'flex-start';
      
      let badge = document.getElementById('vip-badge-prof');
      if (!badge) {
        badge = document.createElement('div');
        badge.id = 'vip-badge-prof';
        badge.style.display = 'flex';
        badge.style.alignItems = 'center';
        badge.style.gap = '6px';
        badge.style.marginLeft = '4px';
        badge.style.marginRight = '4px';
        parent.insertBefore(badge, profInput.nextSibling);
      }
      badge.innerHTML = vipHtml;
    }
  }

  function init() {
    if (typeof rpg !== 'undefined' && rpg.updateUI) {
      const _orig = rpg.updateUI.bind(rpg);
      rpg.updateUI = function() {
        _orig.apply(this, arguments);
        setTimeout(applyVipVisuals, 50);
      };
    }
    setTimeout(applyVipVisuals, 500);
  }

  function getVipHtml(tierId, titleId) {
    let html = '';
    const tiers = {
      'vip': { text: '⭐ VIP', color: '#fbbf24', bg: '#fbbf2433' },
      'ultra_vip': { text: '🌟 ULTRA VIP', color: '#a78bfa', bg: '#a78bfa33' },
      'elite': { text: '💎 ELITE', color: '#38bdf8', bg: '#38bdf833' },
      'legend': { text: '🔮 LEGEND', color: '#e879f9', bg: '#e879f933' },
      'deus': { text: '👑 DEUS', color: '#fde68a', bg: '#fde68a33' }
    };

    const titles = {
      'title_slayer': '⚔ Caçador',
      'title_sage': '📖 Sábio',
      'title_shadow': '🌑 Sombra',
      'title_dragon': '🐉 Dragão',
      'title_god': '👑 Deus',
      'title_void': '♾ Vazio Eterno'
    };

    // 🛡️ LÓGICA ANTI-POLUIÇÃO: Se rank for Deus e título for Deus, mostra só um unificado
    let isDoubleGod = (tierId === 'deus' && titleId === 'title_god');

    if (tierId && tiers[tierId]) {
      const t = tiers[tierId];
      // Se for duplo Deus, aplica um título único para poupar espaço
      html += `<span class="vip-super-badge" style="color: ${t.color}; border: 1px solid ${t.color}; background: ${t.bg};">${isDoubleGod ? '👑 DEUS SUPREMO' : t.text}</span>`;
    }

    // Só mostra o título secundário se não for o caso do duplo Deus
    if (!isDoubleGod && titleId && titles[titleId]) {
      html += `<span class="vip-super-title" style="color: #34d399;">${titles[titleId]}</span>`;
    }

    return html;
  }

  // Estilos V3 (Aumentar Log do Combate e Ajustar Escalas VIP)
  const style = document.createElement('style');
  style.innerHTML = `
    /* 1. ANIMAÇÕES VIP GERAIS */
    @keyframes vipSuperPulse {
      0% { filter: drop-shadow(0 0 4px currentColor); transform: scale(1); }
      50% { filter: drop-shadow(0 0 10px currentColor); transform: scale(1.03); }
      100% { filter: drop-shadow(0 0 4px currentColor); transform: scale(1); }
    }
    .vip-super-badge {
      animation: vipSuperPulse 2s infinite ease-in-out;
      font-family: 'Orbitron', sans-serif;
      font-size: 10px;
      font-weight: 900;
      padding: 2px 6px;
      border-radius: 4px;
      text-transform: uppercase;
      display: inline-block;
      letter-spacing: 1px;
      white-space: nowrap;
    }
    .vip-super-title {
      font-family: 'Rajdhani', sans-serif;
      font-size: 13px;
      font-weight: 900;
      animation: vipSuperPulse 2.5s infinite ease-in-out;
      display: inline-block;
      text-transform: uppercase;
      text-shadow: 0 0 6px currentColor;
      white-space: nowrap;
    }

    /* 2. ESCALA REDUZIDA DO VIP *SÓ* NA HUD DE COMBATE (ANTI-POLUIÇÃO) */
    #vip-badge-hud .vip-super-badge {
      font-size: 7px !important;
      padding: 1px 4px !important;
      letter-spacing: 0 !important;
    }
    #vip-badge-hud .vip-super-title {
      font-size: 9px !important;
    }

    /* 3. AUMENTAR E RESOLVER O TAMANHO DO TEXTO NO REGISTRO DE COMBATE */
    #battle-log {
      font-size: 12px !important;
      line-height: 1.4 !important;
      min-height: 55px !important;
      padding: 6px 8px !important;
    }
    #boss-dialogue-box {
      font-size: 12px !important;
      line-height: 1.3 !important;
    }

    /* Previne que o layout do Perfil quebre se o nome for gigante */
    #profile-name-input {
       flex-shrink: 1 !important;
       max-width: 140px !important;
    }
  `;
  document.head.appendChild(style);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();