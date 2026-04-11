// ═══════════════════════════════════════════════════════════════════════
// MODULE: vip-mega-integration.js  — VIP TOTAL + PERFIL FIX
// ──────────────────────────────────────────────────────────────────────
// CORRIGE:
//   1. PERFIL — modal não abre "para baixo": centra verticalmente sempre
//   2. VIP → COMBATE — _vipAtkBonus, _vipCritBonus integrados em getAtk/getCrit
//   3. VIP → HUD PRINCIPAL — badge de tier, aura, efeitos visuais no menu
//   4. VIP → BATALHA — aura no arena, efeito de dano colorido por tier
//   5. VIP → PERFIL — card hero com brilho/borda do tier ativo
//   6. VIP → GOLD/XP — bonus real aplicado ao killMonster e XP gain
//   7. BARRA DE STATUS VIP — widget flutuante com bónus ativos em combate
// ═══════════════════════════════════════════════════════════════════════
;(function VipMegaIntegration() {
  'use strict';

  // ─── Utilidades ────────────────────────────────────────────────────
  function ready(cb) {
    if (document.readyState !== 'loading') cb();
    else document.addEventListener('DOMContentLoaded', cb);
  }
  function waitRpg(cb, n) {
    n = n || 0;
    if (typeof rpg !== 'undefined' && rpg && typeof rpg.save === 'function' && typeof rpg.getAtk === 'function') { cb(); return; }
    if (n < 400) setTimeout(function() { waitRpg(cb, n + 1); }, 100);
  }
  function getVipTier() {
    var id = localStorage.getItem('rpg_vip_tier_v9');
    if (!id) return null;
    return {
      vip:      { name:'VIP',         emoji:'⭐', color:'#fbbf24', glow:'rgba(251,191,36,0.5)',  gold:25,   xp:25,  atk:0,    crit:0,   drop:0   },
      ultra_vip:{ name:'Ultra VIP',   emoji:'🌟', color:'#a78bfa', glow:'rgba(167,139,250,0.55)',gold:60,   xp:60,  atk:10,   crit:0,   drop:5   },
      elite:    { name:'ELITE',       emoji:'💎', color:'#38bdf8', glow:'rgba(56,189,248,0.55)', gold:120,  xp:120, atk:30,   crit:5,   drop:15  },
      legend:   { name:'LEGEND',      emoji:'🔮', color:'#e879f9', glow:'rgba(232,121,249,0.6)', gold:300,  xp:300, atk:75,   crit:15,  drop:30  },
      deus:     { name:'DEUS',        emoji:'👑', color:'#fde68a', glow:'rgba(253,230,138,0.7)', gold:999,  xp:999, atk:200,  crit:30,  drop:60  },
      titan:    { name:'TITÃ',        emoji:'🪐', color:'#ef4444', glow:'rgba(239,68,68,0.7)',   gold:5000, xp:5000,atk:500,  crit:50,  drop:100 },
      entity:   { name:'ENTIDADE',    emoji:'👁️', color:'#06b6d4', glow:'rgba(6,182,212,0.75)',  gold:20000,xp:20000,atk:2000,crit:75, drop:200 },
      omni:     { name:'ONIPOTENTE',  emoji:'🌌', color:'#ec4899', glow:'rgba(236,72,153,0.85)', gold:99999,xp:99999,atk:9999,crit:90, drop:500 },
      source:   { name:'CÓDIGO FONTE',emoji:'💻', color:'#10b981', glow:'rgba(16,185,129,1)',    gold:999999,xp:999999,atk:99999,crit:100,drop:999},
    }[id] || null;
  }

  // ─── 1. FIX PERFIL — abre sempre centrado, nunca para baixo ───────
  function fixProfileModal() {
    var style = document.createElement('style');
    style.id = 'vip-profile-fix';
    style.textContent = `
      #profile-modal {
        align-items: center !important;
        justify-content: center !important;
        padding: 12px !important;
        box-sizing: border-box !important;
      }
      #profile-modal .modal-content {
        max-height: calc(100dvh - 32px) !important;
        overflow: hidden !important;
        display: flex !important;
        flex-direction: column !important;
        width: 100% !important;
        max-width: 420px !important;
        margin: auto !important;
        transform-origin: center center !important;
      }
      #profile-modal .modal-content > div:last-child {
        flex: 1 1 auto !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
        -webkit-overflow-scrolling: touch !important;
        min-height: 0 !important;
      }
      .modal-overlay.active .modal-content {
        transform: scale(1) translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }

  // ─── 2. VIP → STATS de combate ─────────────────────────────────────
  function patchCombatStats() {
    // getAtk — injeta bónus ATK VIP
    var _origGetAtk = rpg.getAtk.bind(rpg);
    rpg.getAtk = function() {
      var base = _origGetAtk();
      var bonus = rpg._vipAtkBonus || 0;
      if (bonus > 0) base = Math.floor(base * (1 + bonus));
      return base;
    };

    // getCritChance — injeta bónus crit VIP
    var _origGetCrit = rpg.getCritChance.bind(rpg);
    rpg.getCritChance = function() {
      var base = _origGetCrit();
      var bonus = rpg._vipCritBonus || 0;
      return Math.min(0.99, base + bonus);
    };

    // killMonster — gold e XP com bónus VIP real
    var _origKill = rpg.killMonster.bind(rpg);
    rpg.killMonster = function() {
      // Temporariamente amplifica antes de chamar o original
      var origGoldMult = 1;
      var origXpMult   = 1;
      var tier = getVipTier();
      if (tier) {
        origGoldMult = 1 + (tier.gold / 100);
        origXpMult   = 1 + (tier.xp   / 100);
        rpg._vipGoldMult = origGoldMult;
        rpg._vipXpMult   = origXpMult;
      } else {
        rpg._vipGoldMult = 1;
        rpg._vipXpMult   = 1;
      }
      return _origKill.apply(this, arguments);
    };

    // Hook goldGain e xpGain após killMonster usa _vipGoldMult
    // O gold/xp é calculado dentro de killMonster então patchamos spawnLoot
    var _origSpawn = rpg.spawnLoot.bind(rpg);
    rpg.spawnLoot = function(amount) {
      var mult = rpg._vipGoldMult || 1;
      return _origSpawn.call(this, Math.floor(amount * mult));
    };

    console.log('[VipMega] Combat stats patched ✓');
  }

  // ─── 3. VIP BADGE HUD PRINCIPAL ────────────────────────────────────
  function injectMenuVipHud() {
    var tier = getVipTier();
    if (!tier) return;

    // Badge no topbar do menu
    var existing = document.getElementById('vip-menu-badge');
    if (existing) existing.remove();

    var badge = document.createElement('div');
    badge.id = 'vip-menu-badge';
    badge.style.cssText = [
      'position:fixed', 'top:8px', 'left:50%', 'transform:translateX(-50%)',
      'z-index:9990', 'pointer-events:none',
      'font-size:10px', 'font-weight:700', 'letter-spacing:0.1em',
      'padding:3px 10px', 'border-radius:20px',
      'border:1px solid ' + tier.color,
      'color:' + tier.color,
      'background:rgba(0,0,0,0.75)',
      'box-shadow:0 0 12px ' + tier.glow,
      'font-family:Orbitron,sans-serif',
      'text-shadow:0 0 8px ' + tier.color,
      'white-space:nowrap',
    ].join(';');
    badge.textContent = tier.emoji + ' ' + tier.name;
    document.body.appendChild(badge);

    // Aura no body quando no menu
    document.body.style.setProperty('--vip-glow', tier.glow);
    document.body.style.setProperty('--vip-color', tier.color);

    // Injetar CSS da aura
    if (!document.getElementById('vip-mega-css')) {
      var s = document.createElement('style');
      s.id = 'vip-mega-css';
      s.textContent = `
        @keyframes vipMenuGlow {
          0%,100% { box-shadow: 0 0 0 0 var(--vip-glow,transparent); }
          50%      { box-shadow: 0 0 18px 4px var(--vip-glow,transparent); }
        }
        @keyframes vipArenaPulse {
          0%,100% { box-shadow: inset 0 0 0 1px var(--vip-color,transparent), 0 0 0 0 var(--vip-glow,transparent); }
          50%      { box-shadow: inset 0 0 0 2px var(--vip-color,transparent), 0 0 25px 6px var(--vip-glow,transparent); }
        }
        @keyframes vipNameGlow {
          0%,100% { text-shadow: 0 0 6px var(--vip-color,transparent); }
          50%      { text-shadow: 0 0 18px var(--vip-color,transparent), 0 0 32px var(--vip-color,transparent); }
        }
        .vip-arena-active {
          animation: vipArenaPulse 2.5s ease-in-out infinite !important;
        }
        .vip-profile-glow {
          animation: vipMenuGlow 2s ease-in-out infinite !important;
        }
        .vip-name-glow {
          animation: vipNameGlow 2s ease-in-out infinite !important;
          color: var(--vip-color) !important;
        }
        #vip-battle-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          padding: 3px 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 9px;
          font-weight: 700;
          font-family: Orbitron, sans-serif;
          letter-spacing: 0.08em;
          background: rgba(0,0,0,0.6);
          border-bottom: 1px solid var(--vip-color, #333);
          color: var(--vip-color, #aaa);
          text-shadow: 0 0 6px var(--vip-glow, transparent);
          z-index: 10;
          pointer-events: none;
          border-radius: 12px 12px 0 0;
        }
        #vip-battle-bar span { opacity: 0.85; }
        #vip-battle-bar .vip-bb-sep { opacity: 0.3; }
      `;
      document.head.appendChild(s);
    }
  }

  // ─── 4. VIP → ARENA DE BATALHA ─────────────────────────────────────
  function injectArenaVip() {
    var tier = getVipTier();
    var arena = document.getElementById('arena-container');
    if (!arena) return;

    // Remove estado anterior
    arena.classList.remove('vip-arena-active');
    var oldBar = document.getElementById('vip-battle-bar');
    if (oldBar) oldBar.remove();

    if (!tier) return;

    // Aura na arena
    arena.classList.add('vip-arena-active');
    arena.style.setProperty('--vip-color', tier.color);
    arena.style.setProperty('--vip-glow', tier.glow);

    // Barra de bónus VIP dentro da arena
    var bar = document.createElement('div');
    bar.id = 'vip-battle-bar';

    var parts = [];
    parts.push(tier.emoji + ' ' + tier.name);
    if (tier.atk  > 0) parts.push('⚔️ ATK +' + tier.atk + '%');
    if (tier.crit > 0) parts.push('🎯 CRIT +' + tier.crit + '%');
    if (tier.gold > 0) parts.push('💰 GOLD +' + (tier.gold > 999 ? formatVip(tier.gold) : tier.gold) + '%');

    bar.innerHTML = parts.map(function(p, i) {
      return (i > 0 ? '<span class="vip-bb-sep">·</span>' : '') + '<span>' + p + '</span>';
    }).join('');

    arena.insertBefore(bar, arena.firstChild);
  }

  function formatVip(n) {
    if (n >= 1e6) return (n / 1e6).toFixed(0) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
    return String(n);
  }

  // ─── 5. VIP → PERFIL ───────────────────────────────────────────────
  function applyVipToProfile() {
    var tier = getVipTier();
    var heroCard = document.querySelector('#profile-modal .rounded-xl.flex.items-center');
    if (!heroCard) return;

    // Remove estado anterior
    heroCard.classList.remove('vip-profile-glow');
    heroCard.style.removeProperty('border-color');
    heroCard.style.removeProperty('border-width');

    if (!tier) return;

    // Borda colorida do tier
    heroCard.style.borderColor = tier.color;
    heroCard.style.borderWidth = '1.5px';
    heroCard.classList.add('vip-profile-glow');

    // Nome do herói com glow VIP
    var nameInput = document.getElementById('profile-name-input');
    if (nameInput) {
      nameInput.style.borderColor = tier.color;
      nameInput.style.boxShadow = '0 0 8px ' + tier.glow;
    }

    // Badge VIP no rank
    var rankBadge = document.getElementById('profile-rank-badge');
    if (rankBadge) {
      var existing = rankBadge.querySelector('.vip-rank-pill');
      if (!existing) {
        var pill = document.createElement('span');
        pill.className = 'vip-rank-pill';
        pill.style.cssText = [
          'display:inline-block', 'margin-left:6px',
          'background:rgba(0,0,0,0.6)', 'border:1px solid ' + tier.color,
          'border-radius:10px', 'padding:1px 7px',
          'color:' + tier.color, 'font-size:8px',
          'box-shadow:0 0 8px ' + tier.glow,
        ].join(';');
        pill.textContent = tier.emoji + ' ' + tier.name;
        rankBadge.appendChild(pill);
      }
    }

    // Seção de bónus VIP no perfil (se não existir)
    if (!document.getElementById('vip-profile-bonuses')) {
      var statsBox = document.querySelector('#profile-modal .rounded-xl.border.border-zinc-800\\/50');
      if (statsBox) {
        var vipBox = document.createElement('div');
        vipBox.id = 'vip-profile-bonuses';
        vipBox.style.cssText = [
          'border-radius:12px', 'border:1.5px solid ' + tier.color,
          'padding:10px', 'margin-bottom:8px',
          'background:rgba(0,0,0,0.4)',
          'box-shadow:inset 0 0 20px rgba(0,0,0,0.5), 0 0 12px ' + tier.glow,
        ].join(';');

        var bonuses = [];
        if (tier.gold > 0) bonuses.push({ icon: '💰', label: 'Ouro',    val: '+' + formatVip(tier.gold) + '%', color: '#fbbf24' });
        if (tier.xp   > 0) bonuses.push({ icon: '✨', label: 'XP',      val: '+' + formatVip(tier.xp)   + '%', color: '#a78bfa' });
        if (tier.atk  > 0) bonuses.push({ icon: '⚔️', label: 'ATK',     val: '+' + formatVip(tier.atk)  + '%', color: '#f87171' });
        if (tier.crit > 0) bonuses.push({ icon: '🎯', label: 'Crítico', val: '+' + tier.crit            + '%', color: '#60a5fa' });
        if (tier.drop > 0) bonuses.push({ icon: '🎁', label: 'Drop',    val: '+' + tier.drop            + '%', color: '#34d399' });

        vipBox.innerHTML =
          '<div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:' + tier.color + ';margin-bottom:8px;font-family:Orbitron,sans-serif;text-shadow:0 0 8px ' + tier.glow + ';">' +
            tier.emoji + ' Bónus ' + tier.name + ' Ativos' +
          '</div>' +
          '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;">' +
            bonuses.map(function(b) {
              return '<div style="background:rgba(0,0,0,0.5);border-radius:8px;padding:6px 4px;text-align:center;border:0.5px solid rgba(255,255,255,0.06);">' +
                '<div style="font-size:13px;margin-bottom:2px;">' + b.icon + '</div>' +
                '<div style="font-size:9px;color:#71717a;margin-bottom:1px;">' + b.label + '</div>' +
                '<div style="font-size:10px;font-weight:700;color:' + b.color + ';">' + b.val + '</div>' +
              '</div>';
            }).join('') +
          '</div>';

        statsBox.parentNode.insertBefore(vipBox, statsBox);
      }
    }
  }

  // ─── 6. VIP → DANO COLORIDO por tier ──────────────────────────────
  function patchDamageDisplay() {
    var tier = getVipTier();
    if (!tier) return;

    var _origShow = rpg.showDamage.bind(rpg);
    rpg.showDamage = function(text, type) {
      _origShow.call(this, text, type);
      // Adiciona glow colorido VIP nos números de dano crítico
      if (type === 'crit') {
        var el = document.querySelector('.damage-number.crit:last-child');
        if (el) {
          el.style.textShadow = '0 0 12px ' + tier.color + ', 0 0 24px ' + tier.glow;
          el.style.color = tier.color;
        }
      }
    };
  }

  // ─── 7. HOOK openProfile para aplicar VIP sempre que abrir ─────────
  function hookOpenProfile() {
    var _orig = window.openProfile;
    window.openProfile = function() {
      _orig && _orig();
      setTimeout(applyVipToProfile, 80);
    };
  }

  // ─── 8. HOOK navTo para aplicar VIP na arena ao entrar em combate ──
  function hookNavTo() {
    var _orig = window.navTo;
    window.navTo = function(view, isBoss) {
      var result = _orig && _orig(view, isBoss);
      if (view === 'battle') {
        setTimeout(injectArenaVip, 120);
      }
      return result;
    };
  }

  // ─── 9. VIP INDICATOR no HUD de batalha (HP bar colorida) ─────────
  function colorizeHpBar() {
    var tier = getVipTier();
    if (!tier) return;

    var hpBar = document.getElementById('hero-hp-bar');
    if (hpBar) {
      hpBar.style.background = 'linear-gradient(90deg, ' + tier.color + '99, ' + tier.color + ')';
      hpBar.style.boxShadow = '0 0 10px ' + tier.glow;
    }

    // Observer para manter colorido após updateHpBars
    if (!window._vipHpObs) {
      window._vipHpObs = new MutationObserver(function() {
        var bar = document.getElementById('hero-hp-bar');
        var t2 = getVipTier();
        if (bar && t2) {
          bar.style.background = 'linear-gradient(90deg, ' + t2.color + '99, ' + t2.color + ')';
          bar.style.boxShadow = '0 0 10px ' + t2.glow;
        }
      });
      var hpContainer = document.querySelector('.bg-zinc-900.rounded-full.h-3');
      if (hpContainer) {
        window._vipHpObs.observe(hpContainer, { childList: true, subtree: true, attributes: true });
      }
    }
  }

  // ─── 10. INIT ──────────────────────────────────────────────────────
  ready(function() {
    fixProfileModal();
    injectMenuVipHud();

    waitRpg(function() {
      patchCombatStats();
      patchDamageDisplay();
      hookOpenProfile();
      hookNavTo();
      colorizeHpBar();

      // Aplica na arena se já estiver em batalha
      var battleView = document.getElementById('view-battle');
      if (battleView && battleView.classList.contains('active')) {
        injectArenaVip();
        colorizeHpBar();
      }

      // Re-aplica bónus a cada compra de VIP (observa localStorage)
      var _lastVip = localStorage.getItem('rpg_vip_tier_v9');
      setInterval(function() {
        var cur = localStorage.getItem('rpg_vip_tier_v9');
        if (cur !== _lastVip) {
          _lastVip = cur;
          var t = getVipTier();
          if (t) {
            rpg._vipAtkBonus  = t.atk  / 100;
            rpg._vipCritBonus = t.crit / 100;
            rpg._vipGoldBonus = t.gold / 100;
            rpg._vipXpBonus   = t.xp   / 100;
            rpg._vipDropBonus = t.drop / 100;
          } else {
            rpg._vipAtkBonus = rpg._vipCritBonus = rpg._vipGoldBonus = rpg._vipXpBonus = rpg._vipDropBonus = 0;
          }
          injectMenuVipHud();
          injectArenaVip();
          colorizeHpBar();
          console.log('[VipMega] Tier atualizado:', cur);
        }
      }, 2000);

      console.log('[VipMega] Todos os sistemas VIP integrados ✓');
    });
  });

})();
