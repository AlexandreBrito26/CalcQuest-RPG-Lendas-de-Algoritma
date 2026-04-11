// ═══════════════════════════════════════════════════════════════
// MODULE: prestige-plus.js
// ─────────────────────────────────────────────────────────────
// 1. Prestígio+ — recompensas em marcos 5/10/15/20/25/30/50
//    com classes e armas exclusivas de prestígio
// 2. Fix Classes — requisitos corretos + boss kills após troca
// 3. NG+ HUD — badge e indicador de ciclo ativo no menu
// ═══════════════════════════════════════════════════════════════
(function PrestigePlus() {
  'use strict';

  // ── Utilitários ───────────────────────────────────────────────
  function rpgReady() {
    return typeof rpg !== 'undefined' && rpg && typeof rpg.save === 'function';
  }

  function waitRpg(cb, n) {
    if (rpgReady()) { cb(); return; }
    if ((n||0) < 150) setTimeout(function() { waitRpg(cb, (n||0)+1); }, 100);
    else console.warn('[PrestigePlus] rpg não encontrado após 15s');
  }

  function fmt(n) {
    if (!n && n!==0) return '0';
    if (n >= 1e15) return (n/1e15).toFixed(1)+'Qa';
    if (n >= 1e12) return (n/1e12).toFixed(1)+'T';
    if (n >= 1e9)  return (n/1e9).toFixed(1)+'B';
    if (n >= 1e6)  return (n/1e6).toFixed(1)+'M';
    if (n >= 1e3)  return (n/1e3).toFixed(1)+'K';
    return String(Math.floor(n));
  }

  // ══════════════════════════════════════════════════════════════
  // 1. CLASSES E ARMAS EXCLUSIVAS DE PRESTÍGIO
  // ══════════════════════════════════════════════════════════════
  var PRESTIGE_CLASSES = [
    {
      id: 'prestige_phoenix', name: { pt: 'Fénix de Algoritma', en: 'Algorithm Phoenix' },
      icon: 'flame', req: 5,
      desc: { pt: '+200% ATK, ressurge 1× por batalha com 30% HP', en: '+200% ATK, revives once per battle at 30% HP' },
      multHp: 1.3, multAtk: 3.0, addCrit: 0.10, addDodge: 0.05,
      special: 'phoenix_revive'
    },
    {
      id: 'prestige_titan', name: { pt: 'Titã do Código', en: 'Code Titan' },
      icon: 'shield', req: 10,
      desc: { pt: '+500% HP, cada hit bloqueia 10% do dano', en: '+500% HP, each hit blocks 10% damage' },
      multHp: 6.0, multAtk: 1.5, addCrit: 0.05, addDodge: 0.0,
      special: 'damage_block'
    },
    {
      id: 'prestige_void', name: { pt: 'Entidade do Vazio', en: 'Void Entity' },
      icon: 'circle-dashed', req: 15,
      desc: { pt: '+400% stats, críticos causam Vazio (dano %HP)', en: '+400% all stats, crits cause Void (% HP dmg)' },
      multHp: 5.0, multAtk: 5.0, addCrit: 0.25, addDodge: 0.15,
      special: 'void_crit'
    },
    {
      id: 'prestige_eternal', name: { pt: 'O Eterno', en: 'The Eternal' },
      icon: 'infinity', req: 20,
      desc: { pt: '+1000% stats, imortal por 3 turnos ao chegar em 1HP', en: '+1000% all stats, immortal for 3 turns at 1HP' },
      multHp: 11.0, multAtk: 11.0, addCrit: 0.30, addDodge: 0.20,
      special: 'true_immortal'
    },
    {
      id: 'prestige_god', name: { pt: 'Deus do Sistema', en: 'System God' },
      icon: 'zap', req: 30,
      desc: { pt: '+2000% ATK, cada kill recupera 15% HP e Fury máxima', en: '+2000% ATK, each kill restores 15% HP and full Fury' },
      multHp: 8.0, multAtk: 21.0, addCrit: 0.40, addDodge: 0.30,
      special: 'god_harvest'
    },
    {
      id: 'prestige_beyond', name: { pt: 'Além do Fim', en: 'Beyond the End' },
      icon: 'sparkles', req: 50,
      desc: { pt: '+5000% tudo, boss kills contam duplo para NG+', en: '+5000% everything, boss kills count double for NG+' },
      multHp: 51.0, multAtk: 51.0, addCrit: 0.50, addDodge: 0.40,
      special: 'beyond_limit'
    },
  ];

  var PRESTIGE_WEAPONS = [
    {
      id: 'pw_rebirth_blade', name: { pt: 'Lâmina do Renascimento', en: 'Rebirth Blade' },
      icon: 'sword', req: 5,
      desc: { pt: '+150% ATK, +10% Crit', en: '+150% ATK, +10% Crit' },
      multAtk: 2.5, addCrit: 0.10
    },
    {
      id: 'pw_titan_hammer', name: { pt: 'Martelo Titânico', en: 'Titan Hammer' },
      icon: 'hammer', req: 10,
      desc: { pt: '+300% ATK, stunna bosses por 1 turno', en: '+300% ATK, stuns bosses for 1 turn' },
      multAtk: 4.0, addCrit: 0.05
    },
    {
      id: 'pw_void_scythe', name: { pt: 'Foice do Vazio', en: 'Void Scythe' },
      icon: 'scissors', req: 15,
      desc: { pt: '+600% ATK, +25% Crit, ataques ignoram 50% defesa', en: '+600% ATK, +25% Crit, attacks ignore 50% defense' },
      multAtk: 7.0, addCrit: 0.25
    },
    {
      id: 'pw_eternal_spear', name: { pt: 'Lança Eterna', en: 'Eternal Spear' },
      icon: 'zap', req: 20,
      desc: { pt: '+1200% ATK, +40% Crit, hits adicionais a cada 5 ataques', en: '+1200% ATK, +40% Crit, bonus hit every 5 attacks' },
      multAtk: 13.0, addCrit: 0.40
    },
    {
      id: 'pw_god_staff', name: { pt: 'Cetro do Deus', en: "God's Staff" },
      icon: 'wand', req: 30,
      desc: { pt: '+3000% ATK, cada hit tem 20% de triplicar dano', en: '+3000% ATK, each hit has 20% to triple damage' },
      multAtk: 31.0, addCrit: 0.50
    },
    {
      id: 'pw_beyond_key', name: { pt: 'Chave do Além', en: 'Key of Beyond' },
      icon: 'key', req: 50,
      desc: { pt: '+9999% ATK, 50% Crit, mata qualquer boss em 3 hits garantidos', en: '+9999% ATK, 50% Crit, kills any boss in 3 guaranteed hits' },
      multAtk: 100.0, addCrit: 0.50
    },
  ];

  // Marcos de prestígio com recompensas
  var MILESTONES = [
    { level: 5,  label: '🔥 Fénix',      reward: 'Classe + Arma Prestígio Nível 5',   bonus: '+75% XP permanente',  permXp: 0.75 },
    { level: 10, label: '🛡 Titã',        reward: 'Classe + Arma Prestígio Nível 10',  bonus: '+150% Gold permanente', permGold: 1.50 },
    { level: 15, label: '🌀 Vazio',       reward: 'Classe + Arma Prestígio Nível 15',  bonus: '+200% stats permanente', permAll: 2.0 },
    { level: 20, label: '♾ Eterno',      reward: 'Classe + Arma Prestígio Nível 20',  bonus: '+300% ATK permanente',  permAtk: 3.0 },
    { level: 25, label: '⚡ Tempestade',  reward: 'Bónus: +500% HP e ATK',             bonus: '+500% HP + ATK perm.',  permAll: 5.0 },
    { level: 30, label: '⚡ Deus',        reward: 'Classe + Arma Prestígio Nível 30',  bonus: '+1000% stats permanente', permAll: 10.0 },
    { level: 40, label: '🌌 Cosmos',      reward: 'Bónus: ×2 em todos multiplicadores',bonus: '×2 mult perm.',         permAll: 20.0 },
    { level: 50, label: '✨ Além do Fim', reward: 'Classe + Arma Prestígio Nível 50',  bonus: '+5000% stats permanente', permAll: 50.0 },
  ];

  // ══════════════════════════════════════════════════════════════
  // 2. INJETAR CLASSES E ARMAS DE PRESTÍGIO NO RPG
  // ══════════════════════════════════════════════════════════════
  function injectPrestigeItems() {
    if (!rpgReady()) return;
    if (rpg._prestigePlusInjected) return;
    rpg._prestigePlusInjected = true;

    var pl = rpg.prestigeLevel || 0;

    // Injeta classes de prestígio no rpg.classes
    PRESTIGE_CLASSES.forEach(function(pc) {
      if (!rpg.classes[pc.id]) {
        rpg.classes[pc.id] = {
          id: pc.id,
          name: pc.name,
          icon: pc.icon,
          desc: pc.desc,
          multHp: pc.multHp,
          multAtk: pc.multAtk,
          addCrit: pc.addCrit,
          addDodge: pc.addDodge,
          reqBosses: 0,
          reqPrestige: pc.req,
          isPrestige: true,
          special: pc.special,
        };
      }
    });

    // Aplica efeitos especiais da classe equipada
    applyClassSpecial();
  }

  function applyClassSpecial() {
    if (!rpgReady()) return;
    var cls = rpg.classes[rpg.eqClass];
    if (!cls || !cls.isPrestige || !cls.special) return;

    var spec = cls.special;

    if (spec === 'phoenix_revive' && !rpg._ppPhoenixPatched) {
      rpg._ppPhoenixPatched = true;
      rpg._phoenixUsed = false;
      var _origTakeDmg = rpg.takeDamage ? rpg.takeDamage.bind(rpg) : null;
      if (_origTakeDmg) {
        rpg.takeDamage = function(dmg) {
          if (!this._phoenixUsed && this.hp - dmg <= 0) {
            this._phoenixUsed = true;
            this.hp = Math.floor(this.getMaxHp() * 0.3);
            if (typeof showToast === 'function') showToast('🔥 Fénix! Ressurgiu com 30% HP!', 3000);
            return;
          }
          _origTakeDmg(dmg);
        };
      }
    }

    if (spec === 'god_harvest' && !rpg._ppGodPatched) {
      rpg._ppGodPatched = true;
      var _origKill = rpg.killMonster.bind(rpg);
      rpg.killMonster = function() {
        var result = _origKill.apply(this, arguments);
        this.hp = Math.min(this.getMaxHp(), this.hp + Math.floor(this.getMaxHp() * 0.15));
        this.fury = this.maxFury || 100;
        return result;
      };
    }
  }

  // ══════════════════════════════════════════════════════════════
  // 3. APLICAR RECOMPENSAS DE MARCOS
  // ══════════════════════════════════════════════════════════════
  function applyMilestoneRewards() {
    if (!rpgReady()) return;
    var pl = rpg.prestigeLevel || 0;
    var claimed = JSON.parse(localStorage.getItem('rpg_pp_milestones') || '[]');

    MILESTONES.forEach(function(m) {
      if (pl >= m.level && !claimed.includes(m.level)) {
        claimed.push(m.level);
        if (m.permXp)  rpg.permXpBonus   = (rpg.permXpBonus   || 0) + m.permXp;
        if (m.permGold) rpg.permGoldBonus = (rpg.permGoldBonus || 0) + m.permGold;
        if (m.permAtk) rpg.permAtkBonus   = (rpg.permAtkBonus  || 0) + m.permAtk;
        if (m.permAll) rpg.permAllBonus   = (rpg.permAllBonus  || 0) + m.permAll;
        localStorage.setItem('rpg_pp_milestones', JSON.stringify(claimed));
        rpg.save();
        if (typeof showToast === 'function') {
          showToast('🏆 Marco ' + m.label + '! ' + m.bonus, 5000);
        }
      }
    });
  }

  // ══════════════════════════════════════════════════════════════
  // 4. RENDER DO PRESTÍGIO MELHORADO
  // ══════════════════════════════════════════════════════════════
  function renderPrestigePlus() {
    var el = document.getElementById('prestige-body');
    if (!el || !rpgReady()) return;

    var pl    = rpg.prestigeLevel || 0;
    var canP  = rpg.canPrestige();
    var next  = pl + 1;
    var mult  = (1 + next * 0.15).toFixed(2);
    var claimed = JSON.parse(localStorage.getItem('rpg_pp_milestones') || '[]');

    // Próximo marco
    var nextMilestone = MILESTONES.find(function(m) { return pl < m.level; });

    // Classes de prestígio disponíveis
    var availClasses = PRESTIGE_CLASSES.filter(function(c) { return pl >= c.req; });
    var availWeapons = PRESTIGE_WEAPONS.filter(function(w) { return pl >= w.req; });

    var lang = rpg.lang || 'pt';

    el.innerHTML = [

      /* ── Header Prestígio ── */
      '<div style="background:linear-gradient(135deg,rgba(194,65,12,0.3),rgba(153,27,27,0.2));',
        'border:1px solid rgba(234,88,12,0.35);border-radius:14px;padding:14px;margin-bottom:10px;text-align:center;">',
        '<div style="font-family:Orbitron,sans-serif;font-size:22px;font-weight:900;',
          'color:#fb923c;text-shadow:0 0 16px rgba(251,146,60,0.6);margin-bottom:2px;">',
          'PRESTÍGIO ' + pl,
        '</div>',
        '<div style="font-size:9px;color:#f97316;font-family:Orbitron,sans-serif;letter-spacing:.12em;">',
          'MULTIPLICADOR ×' + (1 + pl * 0.15).toFixed(2),
        '</div>',
        pl > 0 ? '<div style="display:flex;justify-content:center;gap:16px;margin-top:8px;font-size:10px;">' +
          '<span style="color:#9ca3af;">Stats <strong style="color:#fb923c;">+' + (pl*15) + '%</strong></span>' +
          '<span style="color:#9ca3af;">Poções <strong style="color:#34d399;">' + (10+pl*5) + '</strong></span>' +
        '</div>' : '',
      '</div>',

      /* ── Próximo Marco ── */
      nextMilestone ? [
        '<div style="background:rgba(0,0,0,0.4);border:1px solid rgba(251,191,36,0.25);',
          'border-radius:12px;padding:12px;margin-bottom:10px;">',
          '<div style="font-family:Orbitron,monospace;font-size:7.5px;font-weight:900;',
            'color:#d97706;letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px;">',
            '🏆 Próximo Marco: ' + nextMilestone.label + ' (Prestígio ' + nextMilestone.level + ')',
          '</div>',
          '<div style="font-size:10px;color:#fcd34d;font-family:Rajdhani,sans-serif;font-weight:700;">',
            '✨ ' + nextMilestone.reward,
          '</div>',
          '<div style="font-size:9px;color:#a16207;margin-top:4px;font-family:\'Fira Code\',monospace;">',
            nextMilestone.bonus,
          '</div>',
          /* Progress bar to next milestone */
          '<div style="height:6px;background:rgba(0,0,0,0.5);border-radius:99px;margin-top:8px;overflow:hidden;">',
            '<div style="height:100%;border-radius:99px;',
              'background:linear-gradient(90deg,#d97706,#fbbf24);',
              'width:' + Math.min(100, Math.round((pl / nextMilestone.level) * 100)) + '%;transition:width .5s;">',
            '</div>',
          '</div>',
          '<div style="font-size:7.5px;color:#92400e;text-align:center;margin-top:4px;font-family:\'Fira Code\',monospace;">',
            pl + ' / ' + nextMilestone.level + ' prestígios (' + Math.round((pl/nextMilestone.level)*100) + '%)',
          '</div>',
        '</div>',
      ].join('') : '',

      /* ── Todos os marcos ── */
      '<div style="background:rgba(0,0,0,0.35);border:1px solid rgba(255,255,255,0.06);',
        'border-radius:12px;padding:12px;margin-bottom:10px;">',
        '<div style="font-family:Orbitron,monospace;font-size:7.5px;font-weight:900;',
          'color:#52525b;letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px;">',
          '📋 Marcos de Prestígio',
        '</div>',
        MILESTONES.map(function(m) {
          var done = claimed.includes(m.level);
          var active = pl >= m.level;
          var color = done ? '#34d399' : (active ? '#fbbf24' : '#52525b');
          return '<div style="display:flex;align-items:center;gap:8px;padding:5px 0;' +
            'border-bottom:1px solid rgba(255,255,255,0.04);last-child:border-bottom:none;">' +
            '<div style="font-size:13px;width:20px;text-align:center;">' + m.label.split(' ')[0] + '</div>' +
            '<div style="flex:1;">' +
              '<div style="font-family:Rajdhani,sans-serif;font-size:11px;font-weight:700;color:' + color + ';">' +
                'P.' + m.level + ' — ' + m.label.split(' ').slice(1).join(' ') +
              '</div>' +
              '<div style="font-family:\'Fira Code\',monospace;font-size:7.5px;color:#52525b;">' + m.bonus + '</div>' +
            '</div>' +
            '<div style="font-size:9px;color:' + (done ? '#34d399' : '#3f3f46') + ';">' +
              (done ? '✓' : (active ? '!' : '🔒')) +
            '</div>' +
            '</div>';
        }).join(''),
      '</div>',

      /* ── Classes de Prestígio ── */
      availClasses.length ? [
        '<div style="background:rgba(0,0,0,0.35);border:1px solid rgba(251,146,60,0.2);',
          'border-radius:12px;padding:12px;margin-bottom:10px;">',
          '<div style="font-family:Orbitron,monospace;font-size:7.5px;font-weight:900;',
            'color:#f97316;letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px;">',
            '⚔ Classes de Prestígio',
          '</div>',
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">',
            availClasses.map(function(pc) {
              var isEq = rpg.eqClass === pc.id;
              var color = isEq ? '#34d399' : '#fb923c';
              var border = isEq ? 'rgba(52,211,153,0.4)' : 'rgba(251,146,60,0.2)';
              return '<div style="background:rgba(0,0,0,0.4);border:1px solid ' + border + ';' +
                'border-radius:9px;padding:8px;text-align:center;">' +
                '<div style="font-size:16px;margin-bottom:3px;">🏆</div>' +
                '<div style="font-family:Orbitron,sans-serif;font-size:7px;font-weight:900;color:' + color + ';margin-bottom:3px;">' +
                  pc.name[lang] + '</div>' +
                '<div style="font-size:7.5px;color:#6b7280;font-family:\'Fira Code\',monospace;margin-bottom:5px;line-height:1.3;">' +
                  pc.desc[lang] + '</div>' +
                (isEq
                  ? '<div style="padding:3px;background:rgba(52,211,153,0.15);border:1px solid rgba(52,211,153,0.35);border-radius:5px;font-size:7px;color:#34d399;font-family:Orbitron,monospace;font-weight:900;">✓ EQUIPADA</div>'
                  : '<button onclick="window._ppEquipClass(\'' + pc.id + '\')" style="width:100%;padding:3px;background:rgba(251,146,60,0.12);border:1px solid rgba(251,146,60,0.3);border-radius:5px;font-size:7px;color:#fb923c;font-family:Orbitron,monospace;font-weight:900;cursor:pointer;">EQUIPAR</button>'
                ) +
              '</div>';
            }).join(''),
          '</div>',
        '</div>',
      ].join('') : '',

      /* ── Info de reset ── */
      '<div style="background:rgba(0,0,0,0.35);border:1px solid rgba(255,255,255,0.06);',
        'border-radius:12px;padding:12px;margin-bottom:10px;font-family:Rajdhani,sans-serif;font-size:11px;">',
        '<div style="font-family:Orbitron,monospace;font-size:7.5px;font-weight:900;color:#52525b;',
          'letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px;">📋 Transição</div>',
        '<div style="color:#6ee7b7;margin-bottom:3px;">🔒 <strong>Mantido:</strong> Bosses · Equipamentos · Relíquias · Passe · Classes Prestígio</div>',
        '<div style="color:#fca5a5;">🔄 <strong>Resetado:</strong> Nível · XP · Ouro · Abates normais</div>',
      '</div>',

      /* ── Botão ── */
      '<button onclick="window._ppDoPrestige()" style="width:100%;padding:14px;' +
        'font-family:Orbitron,sans-serif;font-size:10px;font-weight:900;letter-spacing:.1em;' +
        'text-transform:uppercase;border-radius:12px;cursor:pointer;transition:all .2s;' +
        (canP
          ? 'border:2px solid rgba(234,88,12,0.7);color:#fb923c;' +
            'background:linear-gradient(135deg,rgba(234,88,12,0.2),rgba(153,27,27,0.1));' +
            'box-shadow:0 0 18px rgba(234,88,12,0.4);'
          : 'border:2px solid rgba(63,63,70,0.5);color:#52525b;background:rgba(0,0,0,0.3);cursor:not-allowed;') + '">' +
        (canP ? '🔥 ASCENDER AO PRESTÍGIO ' + next : '🔒 Req: Lvl 50 + 3 Bosses') +
        '<br><span style="font-size:7.5px;opacity:.7;font-weight:400;">+' + Math.round(next*15) + '% stats · ×' + mult + ' multiplicador</span>' +
      '</button>',

    ].join('');

    try { if (typeof lucide !== 'undefined') lucide.createIcons(); } catch(e) {}
  }

  // ══════════════════════════════════════════════════════════════
  // 5. DOPRETIGE MELHORADO
  // ══════════════════════════════════════════════════════════════
  window._ppDoPrestige = function() {
    if (!rpgReady()) return;
    if (!rpg.canPrestige()) {
      if (typeof showToast === 'function') showToast('🔒 Requer Nível 50 + 3 bosses!', 3000);
      return;
    }
    var next = (rpg.prestigeLevel || 0) + 1;
    var nextMilestone = MILESTONES.find(function(m) { return next >= m.level && !(JSON.parse(localStorage.getItem('rpg_pp_milestones')||'[]').includes(m.level)); });
    var milestoneMsg = nextMilestone ? '\n🏆 Marco desbloqueado: ' + nextMilestone.label + '!' : '';

    if (!confirm(
      '🔥 Ascender ao Prestígio ' + next + '?\n\n' +
      '+' + Math.round(next*15) + '% stats permanentes\n' +
      '×' + (1 + next*0.15).toFixed(2) + ' multiplicador\n' +
      milestoneMsg + '\n\n' +
      '✅ Mantido: Bosses, Equipamentos, Relíquias, Passe\n' +
      '🔄 Resetado: Nível, XP, Ouro, Abates'
    )) return;

    rpg.prestigeLevel = next;
    rpg.prestigeMult  = 1 + next * 0.15;
    rpg.level  = 1;
    rpg.xp     = 0;
    rpg.gold   = 0;
    rpg.kills  = 0;
    rpg.potions = 10 + next * 5;
    rpg.seenMilestones = ['intro'];
    rpg.introSeen = true;

    // Aplica recompensas de marco
    applyMilestoneRewards();

    rpg.save();
    rpg.updateUI();
    if (typeof rpg.updateTheme === 'function') rpg.updateTheme();

    if (typeof showToast === 'function') {
      showToast('🔥 Prestígio ' + next + '! +' + Math.round(next*15) + '% Stats!', 5000);
    }
    renderPrestigePlus();
  };

  // ══════════════════════════════════════════════════════════════
  // 6. EQUIPAR CLASSE DE PRESTÍGIO
  // ══════════════════════════════════════════════════════════════
  window._ppEquipClass = function(id) {
    if (!rpgReady()) return;
    var pc = PRESTIGE_CLASSES.find(function(c) { return c.id === id; });
    if (!pc) return;
    if ((rpg.prestigeLevel || 0) < pc.req) {
      if (typeof showToast === 'function') showToast('🔒 Requer Prestígio ' + pc.req + '!', 3000);
      return;
    }
    rpg.eqClass = id;
    // Regista como unlocked para o sistema de classes saber
    if (!rpg._prestigeClassesUnlocked) rpg._prestigeClassesUnlocked = [];
    if (!rpg._prestigeClassesUnlocked.includes(id)) rpg._prestigeClassesUnlocked.push(id);
    rpg.save();
    rpg.updateUI();
    applyClassSpecial();
    if (typeof showToast === 'function') {
      showToast('⚔ ' + pc.name[rpg.lang||'pt'] + ' equipada!', 3000);
    }
    renderPrestigePlus();
  };

  // ══════════════════════════════════════════════════════════════
  // 7. FIX CLASSES — requisitos + boss kills após troca
  // ══════════════════════════════════════════════════════════════
  function fixClasses() {
    if (!rpgReady()) return;

    // Patch: changeClass não deve resetar bossKills
    // O problema era que changeClass fechava o modal de taverna que chamava updateUI
    // mas algumas versões do código resetavam estado de batalha
    var _origChange = rpg.changeClass.bind(rpg);
    rpg.changeClass = function(clsId) {
      var bkBefore = this.bossKills;
      var bkLS = parseInt(localStorage.getItem('calc_bosses') || '0');

      _origChange(clsId);

      // Garante que bossKills não ficou menor após a troca
      if (this.bossKills < bkBefore) {
        this.bossKills = bkBefore;
      }
      // Garante que o localStorage também está correto
      var bkLS2 = parseInt(localStorage.getItem('calc_bosses') || '0');
      if (bkLS2 < Math.max(bkBefore, bkLS)) {
        localStorage.setItem('calc_bosses', String(Math.max(bkBefore, bkLS)));
        this.bossKills = Math.max(this.bossKills, bkBefore, bkLS);
      }

      console.log('[PrestigePlus] Classe trocada para', clsId, '| bossKills mantido:', this.bossKills);
    };

    // Fix: classes de prestígio devem aparecer na taverna se desbloqueadas
    var _origRenderTavern = rpg.renderTavern ? rpg.renderTavern.bind(rpg) : null;
    if (_origRenderTavern) {
      rpg.renderTavern = function() {
        _origRenderTavern();
        // Append prestige classes section if player has any
        var pl = this.prestigeLevel || 0;
        var avail = PRESTIGE_CLASSES.filter(function(c) { return pl >= c.req; });
        if (!avail.length) return;

        var list = document.getElementById('classes-list');
        if (!list) return;
        var lang = this.lang || 'pt';

        var section = document.createElement('div');
        section.style.cssText = 'margin-top:12px;padding-top:12px;border-top:1px solid rgba(251,146,60,0.2);';
        section.innerHTML = '<div style="font-family:Orbitron,sans-serif;font-size:7.5px;font-weight:900;' +
          'color:#f97316;letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px;text-align:center;">⚔ CLASSES DE PRESTÍGIO</div>';

        avail.forEach(function(pc) {
          var isEq = rpg.eqClass === pc.id;
          var card = document.createElement('div');
          card.style.cssText = 'background:rgba(0,0,0,0.4);border:1px solid ' +
            (isEq ? 'rgba(52,211,153,0.4)' : 'rgba(251,146,60,0.25)') +
            ';border-radius:10px;padding:10px;margin-bottom:6px;display:flex;align-items:center;gap:10px;';
          card.innerHTML =
            '<div style="font-size:20px;">🏆</div>' +
            '<div style="flex:1;">' +
              '<div style="font-family:Orbitron,sans-serif;font-size:9px;font-weight:900;color:' +
                (isEq ? '#34d399' : '#fb923c') + ';">' + pc.name[lang] + '</div>' +
              '<div style="font-size:8.5px;color:#6b7280;font-family:Rajdhani,sans-serif;">' + pc.desc[lang] + '</div>' +
            '</div>' +
            (isEq
              ? '<div style="font-size:7px;color:#34d399;font-family:Orbitron,monospace;font-weight:900;">✓ EM USO</div>'
              : '<button onclick="window._ppEquipClass(\'' + pc.id + '\')" style="padding:4px 8px;background:rgba(251,146,60,0.15);border:1px solid rgba(251,146,60,0.35);border-radius:6px;font-size:7px;color:#fb923c;font-family:Orbitron,monospace;font-weight:900;cursor:pointer;">EQUIPAR</button>'
            );
          section.appendChild(card);
        });

        list.appendChild(section);
      };
    }

    console.log('[PrestigePlus] Fix de classes aplicado');
  }

  // ══════════════════════════════════════════════════════════════
  // 8. NG+ HUD BADGE
  // ══════════════════════════════════════════════════════════════
  function updateNgBadge() {
    var ng = parseInt(localStorage.getItem('rpg_ng_plus') || '0');
    if (!ng) { clearNgBadge(); return; }

    var colors = ['#94a3b8','#a855f7','#f97316','#ef4444','#ffd60a'];
    var color  = colors[Math.min(ng, 4)] || '#ffffff';
    var labels = ['NORMAL','NG+1','NG+2','NG+3','NG+4'];
    var label  = ng <= 4 ? labels[ng] : 'NG+' + ng;

    // Badge no HUD de batalha
    var badge = document.getElementById('pp-ng-badge');
    if (!badge) {
      badge = document.createElement('div');
      badge.id = 'pp-ng-badge';
      badge.style.cssText = [
        'position:fixed;top:8px;left:50%;transform:translateX(-50%)',
        'font-family:Orbitron,sans-serif;font-size:8px;font-weight:900',
        'letter-spacing:.12em;padding:3px 10px;border-radius:5px',
        'border:1px solid;z-index:200;pointer-events:none;white-space:nowrap',
        'animation:ppNgGlow 1.2s ease-in-out infinite alternate',
      ].join(';');
      document.body.appendChild(badge);
    }
    badge.textContent = label;
    badge.style.color = color;
    badge.style.borderColor = color;
    badge.style.background = 'rgba(0,0,0,0.75)';
    badge.style.boxShadow = '0 0 10px ' + color + '66';

    // Indicador no menu
    var pill = document.getElementById('pp-ng-pill');
    if (!pill) {
      pill = document.createElement('div');
      pill.id = 'pp-ng-pill';
      pill.style.cssText = [
        'text-align:center;padding:4px 0;margin-bottom:6px',
        'font-family:Orbitron,sans-serif;font-size:8px;font-weight:900',
        'letter-spacing:.12em',
        'animation:ppNgGlow 1.5s ease-in-out infinite alternate',
      ].join(';');
      var anchor = document.querySelector('#view-menu') || document.body;
      anchor.insertAdjacentElement('afterbegin', pill);
    }
    pill.textContent = '◆ ' + label + ' ◆';
    pill.style.color = color;
    pill.style.textShadow = '0 0 10px ' + color;
  }

  function clearNgBadge() {
    var b = document.getElementById('pp-ng-badge');
    if (b) b.remove();
    var p = document.getElementById('pp-ng-pill');
    if (p) p.remove();
  }

  // ══════════════════════════════════════════════════════════════
  // 9. CSS
  // ══════════════════════════════════════════════════════════════
  function injectCSS() {
    if (document.getElementById('pp-css')) return;
    var s = document.createElement('style');
    s.id = 'pp-css';
    s.textContent = '@keyframes ppNgGlow { 0%{opacity:.65} 100%{opacity:1} }';
    document.head.appendChild(s);
  }

  // ══════════════════════════════════════════════════════════════
  // 10. SUBSTITUIR RENDER DO PRESTÍGIO NATIVO
  // ══════════════════════════════════════════════════════════════
  function patchPrestige() {
    if (!rpgReady()) return;
    rpg.renderPrestige = renderPrestigePlus;
    rpg._ppOrigDoPrestige = rpg.doPrestige;
    rpg.doPrestige = window._ppDoPrestige;
    applyMilestoneRewards();
    console.log('[PrestigePlus] ✅ Sistema de Prestígio+ activo — Prestígio ' + (rpg.prestigeLevel||0));
  }

  // ══════════════════════════════════════════════════════════════
  // 11. INIT
  // ══════════════════════════════════════════════════════════════
  function init() {
    injectCSS();
    waitRpg(function() {
      injectPrestigeItems();
      fixClasses();
      patchPrestige();
      setTimeout(updateNgBadge, 800);
      setInterval(updateNgBadge, 5000);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
