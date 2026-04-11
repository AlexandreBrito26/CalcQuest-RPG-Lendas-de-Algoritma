// ═══════════════════════════════════════════════════════════════
// MODULE: arena-challenges.js  —  ARENA DE DESAFIOS
// ─────────────────────────────────────────────────────────────
// ADICIONA:
//   1. 3 desafios diários rotativos com restrições únicas
//   2. Modificadores: "Sem poções", "Sem magia", "Com timer"
//   3. Recompensas exclusivas: Títulos, Bônus de XP, Relíquias
//   4. Histórico de desafios completados com estrelas (1-3)
//   5. Botão de Arena no menu principal
// ═══════════════════════════════════════════════════════════════
(function ArenaChallengesModule() {
  'use strict';

  // ── DEFINIÇÃO DOS DESAFIOS ────────────────────────────────────
  var CHALLENGE_POOL = [
    {
      id: 'no_potions',
      name: { pt: 'Sede de Batalha', en: 'Battle Thirst' },
      desc: { pt: 'Derrota um boss sem usar poções', en: 'Defeat a boss without using potions' },
      icon: '🚫🧪',
      modifier: 'no_potions',
      condition: function(rpg) { return rpg.bossKills >= 1; },
      reward: { pt: '+20% Ouro por 24h', en: '+20% Gold for 24h' },
      rewardFn: function(rpg) { rpg._arenaGoldBonus = (rpg._arenaGoldBonus || 0) + 0.20; },
      stars: 2,
    },
    {
      id: 'no_magic',
      name: { pt: 'Punhos de Ferro', en: 'Iron Fists' },
      desc: { pt: 'Mata 10 inimigos usando apenas Atacar', en: 'Kill 10 enemies using only Attack' },
      icon: '⚔️',
      modifier: 'no_magic',
      condition: function(rpg) { return rpg.level >= 10; },
      reward: { pt: '+15% ATK por 24h', en: '+15% ATK for 24h' },
      rewardFn: function(rpg) { rpg._arenaAtkBonus = (rpg._arenaAtkBonus || 0) + 0.15; },
      stars: 1,
    },
    {
      id: 'speed_kill',
      name: { pt: 'Assassino Veloz', en: 'Speed Killer' },
      desc: { pt: 'Mata 5 inimigos em menos de 30 segundos cada', en: 'Kill 5 enemies in under 30 seconds each' },
      icon: '⏱️',
      modifier: 'timer',
      condition: function(rpg) { return rpg.level >= 20; },
      reward: { pt: 'Relíquia: Cristal do Tempo', en: 'Relic: Time Crystal' },
      rewardFn: function(rpg) {
        if (rpg.inventory && !rpg.inventory.includes('r_time')) {
          rpg.inventory.push('r_time');
          if (typeof showToast === 'function') showToast('⏱️ Relíquia obtida: Cristal do Tempo!', 4000);
        }
      },
      stars: 3,
    },
    {
      id: 'combo_master',
      name: { pt: 'Mestre do Combo', en: 'Combo Master' },
      desc: { pt: 'Alcança combo x20 sem morrer', en: 'Reach combo x20 without dying' },
      icon: '🔥',
      modifier: 'combo',
      condition: function(rpg) { return rpg.level >= 30; },
      reward: { pt: '+25% XP por 24h', en: '+25% XP for 24h' },
      rewardFn: function(rpg) { rpg._arenaXpBonus = (rpg._arenaXpBonus || 0) + 0.25; },
      stars: 2,
    },
    {
      id: 'boss_rush',
      name: { pt: 'Rush de Guardiões', en: 'Guardian Rush' },
      desc: { pt: 'Derrota 3 bosses consecutivos sem recuperar HP', en: 'Defeat 3 bosses without recovering HP' },
      icon: '💀',
      modifier: 'boss_rush',
      condition: function(rpg) { return rpg.bossKills >= 5; },
      reward: { pt: 'Título: "Caçador de Guardiões"', en: 'Title: "Guardian Hunter"' },
      rewardFn: function(rpg) {
        if (!rpg.earnedTitles) rpg.earnedTitles = [];
        if (!rpg.earnedTitles.includes('guardian_hunter')) {
          rpg.earnedTitles.push('guardian_hunter');
          if (typeof showToast === 'function') showToast('👑 Título desbloqueado: Caçador de Guardiões!', 5000);
        }
      },
      stars: 3,
    },
    {
      id: 'no_defend',
      name: { pt: 'Ofensiva Total', en: 'Full Offense' },
      desc: { pt: 'Derrota 15 inimigos sem usar Defender', en: 'Defeat 15 enemies without using Defend' },
      icon: '🗡️',
      modifier: 'no_defend',
      condition: function(rpg) { return rpg.level >= 15; },
      reward: { pt: '+10% Crit por 24h', en: '+10% Crit for 24h' },
      rewardFn: function(rpg) { rpg._arenaCritBonus = (rpg._arenaCritBonus || 0) + 0.10; },
      stars: 2,
    },
    {
      id: 'low_hp',
      name: { pt: 'Fio da Navalha', en: 'Edge of the Blade' },
      desc: { pt: 'Derrota um boss com HP abaixo de 20%', en: 'Defeat a boss with HP below 20%' },
      icon: '❤️‍🔥',
      modifier: 'low_hp',
      condition: function(rpg) { return rpg.bossKills >= 2; },
      reward: { pt: '+50% Fury ganha por 24h', en: '+50% Fury gained for 24h' },
      rewardFn: function(rpg) { rpg._arenaFuryBonus = (rpg._arenaFuryBonus || 0) + 0.50; },
      stars: 3,
    },
  ];

  // ── ESTADO ────────────────────────────────────────────────────
  var _state = {
    todaySeed: 0,
    active: null,       // desafio em progresso {id, progress, goal, startTime}
    completed: {},      // {challengeId: starsEarned}
    bonusExpiry: {},    // {bonusKey: timestamp}
  };

  var _arenaInited = false;

  // ── INIT ──────────────────────────────────────────────────────
  function init() {
    if (typeof rpg === 'undefined') return;
    if (_arenaInited) return;
    _arenaInited = true;

    loadState();
    updateSeed();
    injectArenaButton();
    patchRpgForChallenges();
    checkBonusExpiry();

    console.log('[ArenaChallenges] iniciado');
  }

  // ── SEED DO DIA ───────────────────────────────────────────────
  function updateSeed() {
    var today = new Date();
    _state.todaySeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  }

  function getDailyChallenges() {
    var seed = _state.todaySeed;
    var available = CHALLENGE_POOL.filter(function(c) { return c.condition(rpg); });
    if (available.length === 0) available = CHALLENGE_POOL.slice(0, 3);

    // Pseudo-random determinístico baseado no seed
    var indices = [];
    var s = seed;
    while (indices.length < Math.min(3, available.length)) {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      var idx = Math.abs(s) % available.length;
      if (!indices.includes(idx)) indices.push(idx);
    }
    return indices.map(function(i) { return available[i]; });
  }

  // ── PATCHES ───────────────────────────────────────────────────
  function patchRpgForChallenges() {
    // Patch killMonster para rastrear progresso
    var _origKill = rpg.killMonster.bind(rpg);
    rpg.killMonster = function() {
      trackKill(this);
      return _origKill.apply(this, arguments);
    };

    // Patch getAtk para incluir bônus de arena
    var _origGetAtk = rpg.getAtk.bind(rpg);
    rpg.getAtk = function() {
      var base = _origGetAtk.apply(this, arguments);
      var mult = 1 + (this._arenaAtkBonus || 0);
      return Math.floor(base * mult);
    };

    // Patch getCritChance para bônus de arena
    if (rpg.getCritChance) {
      var _origCrit = rpg.getCritChance.bind(rpg);
      rpg.getCritChance = function() {
        return _origCrit.apply(this, arguments) + (this._arenaCritBonus || 0);
      };
    }

    // Patch addFury para bônus de arena
    var _origFury = rpg.addFury.bind(rpg);
    rpg.addFury = function(amount) {
      return _origFury.call(this, Math.floor(amount * (1 + (this._arenaFuryBonus || 0))));
    };

    // Patch save para incluir estado da arena
    var _origSave = rpg.save.bind(rpg);
    rpg.save = function() {
      saveState();
      return _origSave.apply(this, arguments);
    };
  }

  function trackKill(rpgObj) {
    if (!_state.active) return;
    var challenge = _state.active;

    if (challenge.modifier === 'no_magic') {
      if (!challenge._usedMagic) {
        challenge.progress = (challenge.progress || 0) + 1;
        if (challenge.progress >= 10) completeChallenge(rpgObj, challenge.id);
      }
    }

    if (challenge.modifier === 'no_defend') {
      if (!challenge._usedDefend) {
        challenge.progress = (challenge.progress || 0) + 1;
        if (challenge.progress >= 15) completeChallenge(rpgObj, challenge.id);
      }
    }

    if (challenge.modifier === 'timer') {
      var elapsed = (Date.now() - challenge._lastKillTime) / 1000;
      if (!challenge._lastKillTime || elapsed <= 30) {
        challenge.progress = (challenge.progress || 0) + 1;
        if (challenge.progress >= 5) completeChallenge(rpgObj, challenge.id);
      } else {
        challenge.progress = 0;
      }
      challenge._lastKillTime = Date.now();
    }

    if (challenge.modifier === 'combo') {
      if (rpgObj.combo >= 20 && rpgObj.heroHp > 0) {
        completeChallenge(rpgObj, challenge.id);
      }
    }

    updateArenaProgressUI();
  }

  function completeChallenge(rpgObj, challengeId) {
    var challenge = CHALLENGE_POOL.find(function(c) { return c.id === challengeId; });
    if (!challenge) return;

    _state.completed[challengeId] = challenge.stars;
    _state.active = null;

    // Aplicar recompensa
    if (challenge.rewardFn) challenge.rewardFn(rpgObj);

    // Registrar expiração de bônus temporários em 24h
    _state.bonusExpiry[challengeId] = Date.now() + 86400000;

    var msg = rpgObj.lang === 'pt'
      ? '🏆 Desafio completo: ' + challenge.name.pt + '!'
      : '🏆 Challenge complete: ' + challenge.name.en + '!';
    if (typeof showToast === 'function') showToast(msg, 5000);
    saveState();
  }

  function checkBonusExpiry() {
    var now = Date.now();
    Object.keys(_state.bonusExpiry).forEach(function(key) {
      if (_state.bonusExpiry[key] < now) {
        // Expirou — remove bônus temporários
        delete rpg._arenaGoldBonus;
        delete rpg._arenaAtkBonus;
        delete rpg._arenaXpBonus;
        delete rpg._arenaCritBonus;
        delete rpg._arenaFuryBonus;
        delete _state.bonusExpiry[key];
      }
    });
  }

  // ── UI ────────────────────────────────────────────────────────
  function injectArenaButton() {
    // Injeta botão no menu rápido ou na barra de tabs
    var target = document.querySelector('#tab-modos') ||
                 document.querySelector('[data-tab="modos"]') ||
                 document.querySelector('.quick-actions') ||
                 document.querySelector('#main-actions');

    if (!target) {
      // Fallback: botão flutuante
      var btn = document.createElement('button');
      btn.id = 'arena-challenge-btn';
      btn.innerHTML = '🏟️';
      btn.title = 'Arena de Desafios';
      btn.style.cssText = [
        'position:fixed',
        'bottom:180px',
        'left:16px',
        'width:44px',
        'height:44px',
        'border-radius:50%',
        'background:linear-gradient(135deg,#7c3aed,#4f46e5)',
        'border:2px solid #a855f7',
        'color:white',
        'font-size:18px',
        'cursor:pointer',
        'z-index:300',
        'box-shadow:0 0 12px #7c3aed',
        'transition:transform 0.2s',
      ].join(';');
      btn.onclick = openArenaModal;
      btn.onmouseenter = function() { btn.style.transform = 'scale(1.1)'; };
      btn.onmouseleave = function() { btn.style.transform = 'scale(1)'; };
      document.body.appendChild(btn);
    }

    injectArenaModal();
  }

  function injectArenaModal() {
    var modal = document.createElement('div');
    modal.id = 'arena-modal';
    modal.style.cssText = [
      'display:none',
      'position:fixed',
      'inset:0',
      'background:rgba(0,0,0,0.85)',
      'z-index:10000',
      'overflow-y:auto',
      'padding:20px',
    ].join(';');
    modal.innerHTML = '<div id="arena-modal-inner" style="max-width:480px;margin:0 auto;background:#0f172a;border:1px solid #7c3aed;border-radius:16px;padding:20px;"></div>';
    modal.onclick = function(e) { if (e.target === modal) modal.style.display = 'none'; };
    document.body.appendChild(modal);
  }

  window.openArenaModal = function() {
    updateSeed();
    var modal = document.getElementById('arena-modal');
    var inner = document.getElementById('arena-modal-inner');
    if (!modal || !inner) return;

    var challenges = getDailyChallenges();
    var lang = rpg.lang || 'pt';
    var html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">'
      + '<h2 style="color:#a855f7;font-size:18px;font-weight:900;margin:0;">🏟️ ' + (lang === 'pt' ? 'Arena de Desafios' : 'Challenge Arena') + '</h2>'
      + '<button onclick="document.getElementById(\'arena-modal\').style.display=\'none\'" style="background:none;border:none;color:#94a3b8;font-size:20px;cursor:pointer;">✕</button>'
      + '</div>';

    html += '<p style="color:#64748b;font-size:11px;margin-bottom:16px;">'
      + (lang === 'pt' ? '⏰ Desafios renovam à meia-noite' : '⏰ Challenges reset at midnight')
      + '</p>';

    challenges.forEach(function(c) {
      var done = _state.completed[c.id];
      var isActive = _state.active && _state.active.id === c.id;
      var stars = '⭐'.repeat(c.stars);
      html += '<div style="border:1px solid ' + (done ? '#22c55e' : isActive ? '#f97316' : '#1e293b')
        + ';border-radius:10px;padding:12px;margin-bottom:10px;background:rgba(255,255,255,0.02);">';
      html += '<div style="display:flex;justify-content:space-between;align-items:flex-start;">';
      html += '<div>';
      html += '<div style="font-size:14px;font-weight:700;color:' + (done ? '#22c55e' : '#e2e8f0') + ';">'
        + c.icon + ' ' + c.name[lang]
        + (done ? ' ✓' : '')
        + '</div>';
      html += '<div style="font-size:11px;color:#94a3b8;margin-top:4px;">' + c.desc[lang] + '</div>';
      html += '<div style="font-size:10px;color:#f59e0b;margin-top:6px;">🎁 ' + c.reward[lang] + '</div>';
      html += '</div>';
      html += '<div style="text-align:right;">';
      html += '<div style="font-size:12px;">' + stars + '</div>';
      if (!done && !isActive) {
        html += '<button onclick="window.startArenaChallenge(\'' + c.id + '\')" '
          + 'style="margin-top:8px;padding:4px 10px;background:#7c3aed;border:none;border-radius:6px;'
          + 'color:white;font-size:11px;cursor:pointer;font-weight:700;">'
          + (lang === 'pt' ? 'INICIAR' : 'START') + '</button>';
      } else if (isActive) {
        var prog = _state.active.progress || 0;
        html += '<div style="font-size:10px;color:#f97316;margin-top:6px;">▶ ' + prog + ' / ' + getGoal(c) + '</div>';
      }
      html += '</div></div></div>';
    });

    inner.innerHTML = html;
    modal.style.display = 'block';
  };

  function getGoal(challenge) {
    var goals = { no_potions: 1, no_magic: 10, timer: 5, combo: 1, boss_rush: 3, no_defend: 15, low_hp: 1 };
    return goals[challenge.modifier] || 1;
  }

  window.startArenaChallenge = function(id) {
    var challenge = CHALLENGE_POOL.find(function(c) { return c.id === id; });
    if (!challenge) return;

    _state.active = {
      id: id,
      modifier: challenge.modifier,
      progress: 0,
      goal: getGoal(challenge),
      startTime: Date.now(),
      _usedMagic: false,
      _usedDefend: false,
      _lastKillTime: null,
    };

    // Patch temporário para rastrear uso de magia/defesa
    if (challenge.modifier === 'no_magic') {
      var _origUseSkill = rpg.useSkill.bind(rpg);
      var _patchedSkill = function(id_) {
        if (id_ === 'mag' && _state.active) _state.active._usedMagic = true;
        return _origUseSkill(id_);
      };
      rpg.useSkill = _patchedSkill;
    }
    if (challenge.modifier === 'no_defend') {
      var _origUseSkill2 = rpg.useSkill.bind(rpg);
      var _patchedSkill2 = function(id_) {
        if (id_ === 'def' && _state.active) _state.active._usedDefend = true;
        return _origUseSkill2(id_);
      };
      rpg.useSkill = _patchedSkill2;
    }

    var lang = rpg.lang || 'pt';
    var msg = lang === 'pt'
      ? '🏟️ Desafio iniciado: ' + challenge.name.pt
      : '🏟️ Challenge started: ' + challenge.name.en;
    if (typeof showToast === 'function') showToast(msg, 3000);
    document.getElementById('arena-modal').style.display = 'none';
    injectArenaProgressBar(challenge);
  };

  function injectArenaProgressBar(challenge) {
    var existing = document.getElementById('arena-progress-bar');
    if (existing) existing.parentNode.removeChild(existing);

    var bar = document.createElement('div');
    bar.id = 'arena-progress-bar';
    bar.style.cssText = [
      'position:fixed',
      'top:8px',
      'left:50%',
      'transform:translateX(-50%)',
      'background:rgba(0,0,0,0.8)',
      'border:1px solid #7c3aed',
      'border-radius:20px',
      'padding:4px 14px',
      'font-size:11px',
      'color:#a855f7',
      'font-weight:700',
      'z-index:1000',
      'pointer-events:none',
    ].join(';');
    bar.id = 'arena-progress-bar';
    document.body.appendChild(bar);
    updateArenaProgressUI();
  }

  function updateArenaProgressUI() {
    var bar = document.getElementById('arena-progress-bar');
    if (!bar || !_state.active) {
      if (bar) bar.style.display = 'none';
      return;
    }
    var challenge = CHALLENGE_POOL.find(function(c) { return c.id === _state.active.id; });
    if (!challenge) return;
    bar.style.display = 'block';
    var prog = _state.active.progress || 0;
    var goal = getGoal(challenge);
    bar.textContent = '🏟️ ' + challenge.icon + ' ' + prog + '/' + goal;
  }

  // ── PERSISTÊNCIA ──────────────────────────────────────────────
  function saveState() {
    try { localStorage.setItem('rpg_arena_state', JSON.stringify(_state)); } catch(e) {}
  }

  function loadState() {
    try {
      var saved = localStorage.getItem('rpg_arena_state');
      if (saved) {
        var parsed = JSON.parse(saved);
        // Verifica se ainda é o mesmo dia
        var today = new Date();
        var todaySeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        if (parsed.todaySeed !== todaySeed) {
          // Novo dia: reseta completados mas mantém bônus
          parsed.completed = {};
          parsed.active = null;
          parsed.todaySeed = todaySeed;
        }
        Object.assign(_state, parsed);
      }
    } catch(e) {}
  }

  // ── BOOT ──────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(init, 2000); });
  } else {
    setTimeout(init, 2000);
  }

})();
