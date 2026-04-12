// ═══════════════════════════════════════════════════════════════
// MODULE: vip-system.js
// ─────────────────────────────────────────────────────────────
// Sistema VIP / UltraVIP / Premium — comprado com Gold do jogo
// ► VIP, UltraVIP, ELITE, LEGEND, DEUS tiers
// ► Cosméticos de perfil: bordas, avatares, títulos, badges
// ► Loja acessível por botão no perfil
// ► Bónus passivos por tier
// ═══════════════════════════════════════════════════════════════
(function VipSystem() {
  'use strict';

  // ── Utilitários ───────────────────────────────────────────────
  function rpgReady() {
    return typeof rpg !== 'undefined' && rpg && typeof rpg.save === 'function';
  }
  function waitRpg(cb, n) {
    if (rpgReady()) { cb(); return; }
    if ((n || 0) < 200) setTimeout(function () { waitRpg(cb, (n || 0) + 1); }, 100);
  }
  function fmt(n) {
    if (n >= 1e15) return (n / 1e15).toFixed(1) + 'Qa';
    if (n >= 1e12) return (n / 1e12).toFixed(1) + 'T';
    if (n >= 1e9)  return (n / 1e9).toFixed(1)  + 'B';
    if (n >= 1e6)  return (n / 1e6).toFixed(1)  + 'M';
    if (n >= 1e3)  return (n / 1e3).toFixed(1)  + 'K';
    return String(Math.floor(n));
  }

  // ── VIP Tiers ─────────────────────────────────────────────────
  var VIP_TIERS = [
    {
      id: 'vip',
      name: 'VIP',
      emoji: '⭐',
      color: '#fbbf24',
      glow: 'rgba(251,191,36,0.4)',
      borderStyle: 'border-vip',
      cost: 500000,
      desc: { pt: '+25% Ouro e XP', en: '+25% Gold & XP' },
      bonusGold: 0.25, bonusXp: 0.25,
      badge: '⭐ VIP',
    },
    {
      id: 'ultra_vip',
      name: 'Ultra VIP',
      emoji: '🌟',
      color: '#a78bfa',
      glow: 'rgba(167,139,250,0.45)',
      borderStyle: 'border-ultravip',
      cost: 2000000,
      desc: { pt: '+60% Ouro, XP e Stats', en: '+60% Gold, XP & Stats' },
      bonusGold: 0.60, bonusXp: 0.60, bonusAtk: 0.60,
      badge: '🌟 Ultra VIP',
    },
    {
      id: 'elite',
      name: 'ELITE',
      emoji: '💎',
      color: '#38bdf8',
      glow: 'rgba(56,189,248,0.45)',
      borderStyle: 'border-elite',
      cost: 8000000,
      desc: { pt: '+120% tudo, Ouro duplo em bosses', en: '+120% everything, double gold on bosses' },
      bonusGold: 1.2, bonusXp: 1.2, bonusAtk: 1.2,
      badge: '💎 ELITE',
    },
    {
      id: 'legend',
      name: 'LEGEND',
      emoji: '🔮',
      color: '#e879f9',
      glow: 'rgba(232,121,249,0.5)',
      borderStyle: 'border-legend',
      cost: 30000000,
      desc: { pt: '+300% tudo, crítico mínimo 25%', en: '+300% everything, min 25% crit' },
      bonusGold: 3.0, bonusXp: 3.0, bonusAtk: 3.0, addCrit: 0.25,
      badge: '🔮 LEGEND',
    },
    {
      id: 'deus',
      name: 'DEUS',
      emoji: '👑',
      color: '#fde68a',
      glow: 'rgba(253,230,138,0.6)',
      borderStyle: 'border-deus',
      cost: 150000000,
      desc: { pt: '+999% tudo, imunidade a 1 hit mortal/batalha', en: '+999% everything, immune to 1 fatal hit/battle' },
      bonusGold: 9.99, bonusXp: 9.99, bonusAtk: 9.99, addCrit: 0.40,
      badge: '👑 DEUS',
    },
  ];

  // ── Cosméticos de Perfil ──────────────────────────────────────
  var COSMETICS = [
    // Bordas de avatar
    { id: 'border_gold',    type: 'border', name: { pt: 'Borda Dourada',    en: 'Gold Border'     }, cost: 50000,   emoji: '🟡', css: '3px solid #fbbf24',     glow: '0 0 12px rgba(251,191,36,0.6)' },
    { id: 'border_purple',  type: 'border', name: { pt: 'Borda Violeta',    en: 'Purple Border'   }, cost: 120000,  emoji: '🟣', css: '3px solid #a78bfa',     glow: '0 0 14px rgba(167,139,250,0.6)' },
    { id: 'border_fire',    type: 'border', name: { pt: 'Borda de Fogo',    en: 'Fire Border'     }, cost: 300000,  emoji: '🔥', css: '3px solid #fb923c',     glow: '0 0 16px rgba(251,146,60,0.7)' },
    { id: 'border_ice',     type: 'border', name: { pt: 'Borda de Gelo',    en: 'Ice Border'      }, cost: 300000,  emoji: '❄️', css: '3px solid #7dd3fc',     glow: '0 0 16px rgba(125,211,252,0.7)' },
    { id: 'border_rainbow', type: 'border', name: { pt: 'Borda Arco-Íris',  en: 'Rainbow Border'  }, cost: 1000000, emoji: '🌈', css: '3px solid transparent', glow: '0 0 18px rgba(255,255,255,0.5)', rainbow: true },
    { id: 'border_void',    type: 'border', name: { pt: 'Borda do Vazio',   en: 'Void Border'     }, cost: 5000000, emoji: '🌀', css: '3px solid #818cf8',     glow: '0 0 22px rgba(129,140,248,0.8)', pulse: true },

    // Títulos de perfil
    { id: 'title_slayer',   type: 'title',  name: { pt: '⚔ Caçador',     en: '⚔ Slayer'       }, cost: 80000,   emoji: '⚔', text: { pt: 'Caçador de Monstros', en: 'Monster Slayer' } },
    { id: 'title_sage',     type: 'title',  name: { pt: '📖 Sábio',       en: '📖 Sage'         }, cost: 180000,  emoji: '📖', text: { pt: 'Sábio dos Algoritmos', en: 'Algorithm Sage' } },
    { id: 'title_shadow',   type: 'title',  name: { pt: '🌑 Sombra',      en: '🌑 Shadow'       }, cost: 400000,  emoji: '🌑', text: { pt: 'Sombra do Código',     en: 'Code Shadow' } },
    { id: 'title_dragon',   type: 'title',  name: { pt: '🐉 Dragão',      en: '🐉 Dragon'       }, cost: 900000,  emoji: '🐉', text: { pt: 'Dragão de Algoritma',  en: 'Algoritma Dragon' } },
    { id: 'title_god',      type: 'title',  name: { pt: '👑 Deus',        en: '👑 God'          }, cost: 3000000, emoji: '👑', text: { pt: 'Deus do Sistema',      en: 'System God' } },
    { id: 'title_void',     type: 'title',  name: { pt: '♾ Vazio Eterno', en: '♾ Eternal Void' }, cost: 15000000,emoji: '♾', text: { pt: 'Eterno do Vazio',      en: 'Eternal of the Void' } },

    // Efeitos de fundo do perfil
    { id: 'bg_stars',   type: 'bg', name: { pt: '✨ Estrelas',    en: '✨ Stars'     }, cost: 200000,  emoji: '✨', bgId: 'stars'  },
    { id: 'bg_flames',  type: 'bg', name: { pt: '🔥 Chamas',     en: '🔥 Flames'    }, cost: 400000,  emoji: '🔥', bgId: 'flames' },
    { id: 'bg_cosmos',  type: 'bg', name: { pt: '🌌 Cosmos',     en: '🌌 Cosmos'    }, cost: 1500000, emoji: '🌌', bgId: 'cosmos' },
    { id: 'bg_matrix',  type: 'bg', name: { pt: '💻 Matrix',     en: '💻 Matrix'    }, cost: 3000000, emoji: '💻', bgId: 'matrix' },
  ];

  // ── Save / Load ───────────────────────────────────────────────
  var SAVE_VIP    = 'rpg_vip_tier';
  var SAVE_COSM   = 'rpg_vip_cosmetics';
  var SAVE_EQUIP  = 'rpg_vip_equipped';

  function getVipTier()      { return localStorage.getItem(SAVE_VIP) || null; }
  function setVipTier(id)    { localStorage.setItem(SAVE_VIP, id); }
  function getOwned()        { try { return JSON.parse(localStorage.getItem(SAVE_COSM) || '[]'); } catch(e) { return []; } }
  function setOwned(arr)     { localStorage.setItem(SAVE_COSM, JSON.stringify(arr)); }
  function getEquipped()     { try { return JSON.parse(localStorage.getItem(SAVE_EQUIP) || '{}'); } catch(e) { return {}; } }
  function setEquipped(obj)  { localStorage.setItem(SAVE_EQUIP, JSON.stringify(obj)); }

  function getCurrentTierObj() {
    var id = getVipTier();
    if (!id) return null;
    return VIP_TIERS.find(function(t) { return t.id === id; }) || null;
  }

  // ── Aplicar bónus do tier ─────────────────────────────────────
  function applyTierBonuses() {
    if (!rpgReady()) return;
    var tier = getCurrentTierObj();
    if (!tier) return;
    rpg._vipGoldBonus = tier.bonusGold || 0;
    rpg._vipXpBonus   = tier.bonusXp   || 0;
    rpg._vipAtkBonus  = tier.bonusAtk  || 0;
    rpg._vipCritBonus = tier.addCrit   || 0;

    // Deus: imunidade a hit mortal
    if (tier.id === 'deus' && !rpg._vipDeusPatched) {
      rpg._vipDeusPatched = true;
      rpg._vipDeusUsed    = false;
      var _orig = rpg.takeDamage ? rpg.takeDamage.bind(rpg) : null;
      if (_orig) {
        rpg.takeDamage = function (dmg) {
          if (!this._vipDeusUsed && this.hp - dmg <= 0) {
            this._vipDeusUsed = true;
            this.hp = 1;
            if (typeof showToast === 'function') showToast('👑 DEUS absorveu hit mortal!', 3500);
            return;
          }
          _orig(dmg);
        };
      }
    }
    console.log('[VipSystem] Tier ' + tier.id + ' aplicado.');
  }

  // ── Cosmético: aplicar borda no avatar ───────────────────────
  function applyCosmetics() {
    var eq = getEquipped();
    var avatarEl = document.getElementById('profile-avatar-icon');
    var avatarWrap = avatarEl ? avatarEl.parentElement : null;

    if (avatarWrap) {
      // Borda
      var borderCosmId = eq.border;
      if (borderCosmId) {
        var bc = COSMETICS.find(function(c) { return c.id === borderCosmId; });
        if (bc) {
          avatarWrap.style.border     = bc.css;
          avatarWrap.style.boxShadow  = bc.glow;
          avatarWrap.style.borderRadius = '50%';
          if (bc.rainbow) {
            avatarWrap.style.border = 'none';
            avatarWrap.style.backgroundImage = 'linear-gradient(white,white),linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f)';
            avatarWrap.style.backgroundOrigin = 'border-box';
            avatarWrap.style.backgroundClip   = 'content-box,border-box';
            avatarWrap.style.padding = '3px';
          }
          if (bc.pulse) {
            avatarWrap.classList.add('vip-pulse-border');
          }
        }
      } else {
        avatarWrap.style.border = '';
        avatarWrap.style.boxShadow = '';
        avatarWrap.style.backgroundImage = '';
        avatarWrap.style.padding = '';
        avatarWrap.classList.remove('vip-pulse-border');
      }
    }

    // Título
    var titleEl = document.getElementById('vip-profile-title');
    var titleId = eq.title;
    if (titleId) {
      var tc = COSMETICS.find(function(c) { return c.id === titleId; });
      var lang = rpgReady() ? (rpg.lang || 'pt') : 'pt';
      if (tc && titleEl) {
        titleEl.textContent = tc.emoji + ' ' + tc.text[lang];
        titleEl.style.display = 'block';
      }
    } else if (titleEl) {
      titleEl.textContent = '';
      titleEl.style.display = 'none';
    }

    // Background do perfil
    var bgModal = document.getElementById('profile-modal');
    var bgId = eq.bg;
    if (bgModal && bgId) {
      applyBgEffect(bgModal, bgId);
    } else if (bgModal) {
      removeBgEffect(bgModal);
    }
  }

  function applyBgEffect(el, bgId) {
    var existing = el.querySelector('.vip-bg-effect');
    if (existing) existing.remove();
    var div = document.createElement('div');
    div.className = 'vip-bg-effect vip-bg-' + bgId;
    div.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:0;border-radius:inherit;overflow:hidden;';
    el.style.position = 'relative';
    el.insertBefore(div, el.firstChild);
  }
  function removeBgEffect(el) {
    var ex = el.querySelector('.vip-bg-effect');
    if (ex) ex.remove();
  }

  // ── Badge VIP no perfil ───────────────────────────────────────
  function injectVipBadgeInProfile() {
    var tier = getCurrentTierObj();
    var badge = document.getElementById('vip-profile-badge');

    // Injeta o elemento badge + título se não existir
    if (!badge) {
      var nameEl = document.querySelector('#profile-modal .text-xl.font-black');
      if (!nameEl) return;
      badge = document.createElement('div');
      badge.id = 'vip-profile-badge';
      badge.style.cssText = 'text-align:center;margin:4px 0 2px;';
      nameEl.parentNode.insertBefore(badge, nameEl.nextSibling);

      var titleDiv = document.createElement('div');
      titleDiv.id = 'vip-profile-title';
      titleDiv.style.cssText = 'text-align:center;font-family:Rajdhani,sans-serif;font-size:10px;font-weight:700;letter-spacing:.08em;margin-bottom:4px;display:none;';
      badge.parentNode.insertBefore(titleDiv, badge.nextSibling);
    }

    if (!tier) {
      badge.innerHTML = '';
      return;
    }

    badge.innerHTML = '<span style="display:inline-block;padding:2px 12px;border-radius:99px;' +
      'background:linear-gradient(90deg,' + tier.color + '22,' + tier.color + '44);' +
      'border:1px solid ' + tier.color + '88;' +
      'color:' + tier.color + ';font-family:Orbitron,sans-serif;font-size:8px;font-weight:900;' +
      'letter-spacing:.14em;text-transform:uppercase;' +
      'box-shadow:0 0 10px ' + tier.glow + ';">' + tier.badge + '</span>';
  }

  // ── Botão "Loja VIP" removido — já existe LOJA VIP OMNIVERSAL ──
  function injectVipShopButton() { /* desativado — usar LOJA VIP OMNIVERSAL */ }

  // ── Modal da Loja VIP ─────────────────────────────────────────
  function openVipShop() {
    var existing = document.getElementById('vip-shop-modal');
    if (existing) { existing.style.display = 'flex'; renderVipShop(); return; }

    var modal = document.createElement('div');
    modal.id = 'vip-shop-modal';
    modal.style.cssText = [
      'position:fixed;inset:0;z-index:9999;',
      'display:flex;align-items:center;justify-content:center;',
      'background:rgba(0,0,0,0.85);backdrop-filter:blur(6px);',
    ].join('');
    modal.onclick = function (e) { if (e.target === modal) modal.style.display = 'none'; };

    var box = document.createElement('div');
    box.id = 'vip-shop-box';
    box.style.cssText = [
      'background:linear-gradient(135deg,#0f0f1a,#1a1a2e);',
      'border:1px solid rgba(251,191,36,0.3);border-radius:18px;',
      'width:min(420px,96vw);max-height:88vh;overflow-y:auto;',
      'padding:20px;position:relative;',
      'box-shadow:0 0 40px rgba(251,191,36,0.15);',
    ].join('');

    modal.appendChild(box);
    document.body.appendChild(modal);
    renderVipShop();
  }

  function renderVipShop() {
    var box = document.getElementById('vip-shop-box');
    if (!box || !rpgReady()) return;

    var lang = rpg.lang || 'pt';
    var owned = getOwned();
    var eq = getEquipped();
    var curTier = getVipTier();
    var curTierIdx = VIP_TIERS.findIndex(function (t) { return t.id === curTier; });
    var gold = rpg.gold || 0;

    var html = [];

    // Header
    html.push(
      '<div style="text-align:center;margin-bottom:16px;">',
        '<div style="font-family:Orbitron,sans-serif;font-size:16px;font-weight:900;color:#fbbf24;text-shadow:0 0 20px rgba(251,191,36,0.5);">👑 LOJA VIP</div>',
        '<div style="font-family:\'Fira Code\',monospace;font-size:9px;color:#78716c;margin-top:2px;">Melhore seu perfil com Gold do jogo</div>',
        '<div style="margin-top:6px;font-family:Orbitron,sans-serif;font-size:10px;color:#fbbf24;">💰 ' + fmt(gold) + ' Gold disponível</div>',
      '</div>',
      '<button onclick="document.getElementById(\'vip-shop-modal\').style.display=\'none\'" ',
        'style="position:absolute;top:12px;right:14px;background:none;border:none;color:#52525b;font-size:18px;cursor:pointer;">✕</button>'
    );

    // ── Seção Tiers VIP ──
    html.push(
      '<div style="font-family:Orbitron,sans-serif;font-size:8px;font-weight:900;color:#92400e;',
        'letter-spacing:.14em;text-transform:uppercase;margin-bottom:10px;">⭐ TIERS VIP</div>'
    );

    VIP_TIERS.forEach(function (tier, idx) {
      var isOwned   = curTierIdx >= idx;
      var isActive  = curTier === tier.id;
      var canAfford = gold >= tier.cost;
      var isNext    = curTierIdx + 1 === idx;

      html.push(
        '<div style="background:rgba(0,0,0,0.4);border:1px solid ' + (isActive ? tier.color + '88' : 'rgba(255,255,255,0.06)') + ';',
          'border-radius:12px;padding:10px;margin-bottom:8px;display:flex;align-items:center;gap:10px;">',
          '<div style="font-size:24px;flex-shrink:0;">' + tier.emoji + '</div>',
          '<div style="flex:1;">',
            '<div style="font-family:Orbitron,sans-serif;font-size:10px;font-weight:900;color:' + tier.color + ';">' + tier.name + '</div>',
            '<div style="font-size:8.5px;color:#6b7280;font-family:Rajdhani,sans-serif;">' + tier.desc[lang] + '</div>',
            '<div style="font-size:7.5px;color:#44403c;font-family:\'Fira Code\',monospace;margin-top:2px;">💰 ' + fmt(tier.cost) + ' Gold</div>',
          '</div>',
          isActive
            ? '<div style="font-family:Orbitron,sans-serif;font-size:7px;font-weight:900;color:' + tier.color + ';text-shadow:0 0 8px ' + tier.color + ';">✓ ATIVO</div>'
            : isOwned
              ? '<div style="font-size:9px;color:#34d399;">✓</div>'
              : (isNext
                ? '<button onclick="window._vipBuyTier(\'' + tier.id + '\')" style="padding:5px 10px;background:' + (canAfford ? 'rgba(251,191,36,0.2)' : 'rgba(0,0,0,0.3)') + ';border:1px solid ' + (canAfford ? tier.color : '#3f3f46') + ';border-radius:8px;color:' + (canAfford ? tier.color : '#52525b') + ';font-family:Orbitron,monospace;font-size:7px;font-weight:900;cursor:' + (canAfford ? 'pointer' : 'not-allowed') + ';">COMPRAR</button>'
                : '<div style="font-size:8px;color:#3f3f46;">🔒</div>'
              ),
        '</div>'
      );
    });

    // ── Seção Cosméticos ──
    var cosTypes = [
      { key: 'border', label: '🖼 BORDAS DE AVATAR' },
      { key: 'title',  label: '📛 TÍTULOS DE PERFIL' },
      { key: 'bg',     label: '🌌 EFEITOS DE FUNDO' },
    ];

    cosTypes.forEach(function (ct) {
      var items = COSMETICS.filter(function (c) { return c.type === ct.key; });
      html.push(
        '<div style="font-family:Orbitron,sans-serif;font-size:8px;font-weight:900;color:#3f3f46;',
          'letter-spacing:.12em;text-transform:uppercase;margin:14px 0 8px;">' + ct.label + '</div>',
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">'
      );

      items.forEach(function (item) {
        var isOwned  = owned.includes(item.id);
        var isEquip  = eq[ct.key] === item.id;
        var canAfford = (rpg.gold || 0) >= item.cost;
        var nameStr  = item.name[lang];

        html.push(
          '<div style="background:rgba(0,0,0,0.4);border:1px solid ' + (isEquip ? 'rgba(52,211,153,0.4)' : 'rgba(255,255,255,0.06)') + ';border-radius:10px;padding:8px;text-align:center;">',
            '<div style="font-size:16px;margin-bottom:3px;">' + item.emoji + '</div>',
            '<div style="font-family:Rajdhani,sans-serif;font-size:9px;font-weight:700;color:' + (isEquip ? '#34d399' : '#e7e5e4') + ';margin-bottom:4px;">' + nameStr + '</div>',
            '<div style="font-family:\'Fira Code\',monospace;font-size:7px;color:#44403c;margin-bottom:6px;">💰 ' + fmt(item.cost) + '</div>'
        );

        if (isEquip) {
          html.push('<button onclick="window._vipUnequip(\'' + ct.key + '\')" style="width:100%;padding:3px;background:rgba(52,211,153,0.15);border:1px solid rgba(52,211,153,0.4);border-radius:6px;font-size:7px;color:#34d399;font-family:Orbitron,monospace;font-weight:900;cursor:pointer;">✓ EQUIPADO</button>');
        } else if (isOwned) {
          html.push('<button onclick="window._vipEquipCosmetic(\'' + item.id + '\',\'' + ct.key + '\')" style="width:100%;padding:3px;background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.35);border-radius:6px;font-size:7px;color:#818cf8;font-family:Orbitron,monospace;font-weight:900;cursor:pointer;">EQUIPAR</button>');
        } else {
          html.push('<button onclick="window._vipBuyCosmetic(\'' + item.id + '\')" style="width:100%;padding:3px;background:' + (canAfford ? 'rgba(251,191,36,0.1)' : 'rgba(0,0,0,0.3)') + ';border:1px solid ' + (canAfford ? 'rgba(251,191,36,0.35)' : 'rgba(63,63,70,0.5)') + ';border-radius:6px;font-size:7px;color:' + (canAfford ? '#fbbf24' : '#52525b') + ';font-family:Orbitron,monospace;font-weight:900;cursor:' + (canAfford ? 'pointer' : 'not-allowed') + ';">COMPRAR</button>');
        }

        html.push('</div>');
      });

      html.push('</div>');
    });

    box.innerHTML = html.join('');
  }

  // ── Comprar Tier VIP ─────────────────────────────────────────
  window._vipBuyTier = function (tierId) {
    if (!rpgReady()) return;
    var tier = VIP_TIERS.find(function (t) { return t.id === tierId; });
    if (!tier) return;
    var curTierIdx = VIP_TIERS.findIndex(function (t) { return t.id === getVipTier(); });
    var targetIdx  = VIP_TIERS.findIndex(function (t) { return t.id === tierId; });
    if (targetIdx !== curTierIdx + 1) {
      if (typeof showToast === 'function') showToast('🔒 Compre os tiers anteriores primeiro!', 3000);
      return;
    }
    if (rpg.gold < tier.cost) {
      if (typeof showToast === 'function') showToast('💰 Sem Ouro suficiente!', 3000);
      return;
    }
    rpg.gold -= tier.cost;
    setVipTier(tierId);
    applyTierBonuses();
    rpg.save();
    rpg.updateUI();
    if (typeof showToast === 'function') {
      showToast(tier.emoji + ' ' + tier.name + ' ativado! ' + tier.desc[rpg.lang || 'pt'], 5000);
    }
    renderVipShop();
    setTimeout(injectVipBadgeInProfile, 200);
    updateVipHudBadge();
    console.log('[VipSystem] Tier ' + tierId + ' comprado.');
  };

  // ── Comprar Cosmético ────────────────────────────────────────
  window._vipBuyCosmetic = function (cosId) {
    if (!rpgReady()) return;
    var cos = COSMETICS.find(function (c) { return c.id === cosId; });
    if (!cos) return;
    var owned = getOwned();
    if (owned.includes(cosId)) {
      if (typeof showToast === 'function') showToast('Já possui este item!', 2000);
      return;
    }
    if (rpg.gold < cos.cost) {
      if (typeof showToast === 'function') showToast('💰 Sem Ouro suficiente!', 3000);
      return;
    }
    rpg.gold -= cos.cost;
    owned.push(cosId);
    setOwned(owned);
    rpg.save();
    rpg.updateUI();
    if (typeof showToast === 'function') {
      showToast(cos.emoji + ' ' + (cos.name[rpg.lang || 'pt']) + ' desbloqueado!', 4000);
    }
    renderVipShop();
  };

  // ── Equipar / Desequipar Cosmético ───────────────────────────
  window._vipEquipCosmetic = function (cosId, cosType) {
    var eq = getEquipped();
    eq[cosType] = cosId;
    setEquipped(eq);
    setTimeout(applyCosmetics, 100);
    renderVipShop();
    if (typeof showToast === 'function') {
      var cos = COSMETICS.find(function (c) { return c.id === cosId; });
      if (cos) showToast(cos.emoji + ' Equipado!', 2000);
    }
  };

  window._vipUnequip = function (cosType) {
    var eq = getEquipped();
    delete eq[cosType];
    setEquipped(eq);
    setTimeout(applyCosmetics, 100);
    renderVipShop();
  };

  // ── HUD Badge de tier ─────────────────────────────────────────
  function updateVipHudBadge() {
    var tier = getCurrentTierObj();
    var badge = document.getElementById('vip-hud-badge');

    if (!tier) {
      if (badge) badge.remove();
      return;
    }

    if (!badge) {
      badge = document.createElement('div');
      badge.id = 'vip-hud-badge';
      badge.style.cssText = [
        'position:fixed;bottom:60px;right:10px;',
        'font-family:Orbitron,sans-serif;font-size:7px;font-weight:900;',
        'letter-spacing:.1em;padding:3px 8px;border-radius:5px;',
        'border:1px solid;z-index:200;pointer-events:none;',
        'animation:vipPulse 1.5s ease-in-out infinite alternate;',
      ].join('');
      document.body.appendChild(badge);
    }

    badge.textContent = tier.badge;
    badge.style.color = tier.color;
    badge.style.borderColor = tier.color;
    badge.style.background = 'rgba(0,0,0,0.75)';
    badge.style.boxShadow = '0 0 10px ' + tier.glow;
  }

  // ── CSS ───────────────────────────────────────────────────────
  function injectCSS() {
    if (document.getElementById('vip-css')) return;
    var s = document.createElement('style');
    s.id = 'vip-css';
    s.textContent = `
      @keyframes vipPulse { 0%{opacity:.6} 100%{opacity:1} }
      @keyframes vipRainbow { 0%{filter:hue-rotate(0deg)} 100%{filter:hue-rotate(360deg)} }
      .vip-pulse-border { animation: vipRainbow 3s linear infinite; }

      /* Background effects */
      .vip-bg-stars    { background: radial-gradient(ellipse at center, transparent 50%, rgba(255,255,255,0.03) 100%); }
      .vip-bg-stars::before { content:''; position:absolute; inset:0;
        background-image: radial-gradient(white 1px,transparent 1px);
        background-size: 30px 30px; opacity:.08; animation: vipStarsTwinkle 4s infinite; }
      .vip-bg-flames   { background: linear-gradient(to top, rgba(251,146,60,0.08), transparent 60%); }
      .vip-bg-cosmos   { background: radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.15), transparent 70%); }
      .vip-bg-matrix::before { content:''; position:absolute; inset:0;
        background: repeating-linear-gradient(0deg, rgba(52,211,153,0.03) 0px, transparent 2px, transparent 20px);
        animation: vipMatrixScroll 2s linear infinite; }
      @keyframes vipStarsTwinkle { 0%,100%{opacity:.08} 50%{opacity:.15} }
      @keyframes vipMatrixScroll { from{background-position:0 0} to{background-position:0 20px} }
    `;
    document.head.appendChild(s);
  }

  // ── Hook no updateUI para reaplica cosméticos ─────────────────
  function hookUpdateUI() {
    if (!rpgReady()) return;
    var _orig = rpg.updateUI.bind(rpg);
    rpg.updateUI = function () {
      _orig.apply(this, arguments);
      setTimeout(function () {
        injectVipBadgeInProfile();
        injectVipShopButton();
        applyCosmetics();
        updateVipHudBadge();
      }, 80);
    };
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    injectCSS();
    waitRpg(function () {
      applyTierBonuses();
      hookUpdateUI();
      setTimeout(function () {
        injectVipBadgeInProfile();
        injectVipShopButton();
        applyCosmetics();
        updateVipHudBadge();
      }, 600);
      console.log('[VipSystem] ✅ Sistema VIP activo — Tier: ' + (getVipTier() || 'nenhum'));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
