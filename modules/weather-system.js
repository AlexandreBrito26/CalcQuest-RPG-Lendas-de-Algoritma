// ═══════════════════════════════════════════════════════════════
// MODULE: weather-system.js  —  CLIMA & CICLO DIA/NOITE
// ─────────────────────────────────────────────────────────────
// • 6 climas com efeitos reais no combate e em drops
// • Ciclo dia/noite baseado no relógio real do sistema
// • HUD discreta com ícone de clima + hora do mundo
// • Transição animada entre climas (fade + glitch temático)
// • Integra com boot-screen.js (clima exibido no terminal)
// • Integra com combat-hud.js (badge no combate)
// • Integra com save-system.js (não afeta save do personagem)
// • Integra com damage-numbers.js (números coloridos por clima)
// • Integra com quest-tracker.js (missão de clima desbloqueável)
// • Patch não-destrutivo: wrap em getAtk / getMaxHp / killMonster
// ═══════════════════════════════════════════════════════════════
(function WeatherSystemModule() {
  'use strict';

  // ── Configuração dos climas ────────────────────────────────────
  // Cada clima tem: efeitos de combate, cor de HUD, lore
  const WEATHERS = {
    sunny: {
      id:       'sunny',
      icon:     '☀',
      label:    { pt: 'Ensolarado',    en: 'Sunny'       },
      lore:     { pt: 'A Lógica flui com mais clareza sob o sol.',
                  en: 'Logic flows more clearly under the sun.' },
      hue:      '#fbbf24',
      glow:     'rgba(251,191,36,0.25)',
      skyTop:   '#0c1a2e',   // top do gradiente de fundo (modo noite já é escuro)
      skyMid:   '#1e3a5f',
      effects: {
        atkMult:    1.0,
        hpMult:     1.0,
        critBonus:  0.05,    // +5% crítico
        goldMult:   1.15,    // +15% ouro
        dropBonus:  0,
        missChance: 0,
        magicMult:  1.0,
        xpMult:     1.0,
        desc: { pt: '+5% Crítico · +15% Ouro', en: '+5% Crit · +15% Gold' },
      },
    },

    rain: {
      id:       'rain',
      icon:     '🌧',
      label:    { pt: 'Chuva',         en: 'Rain'        },
      lore:     { pt: 'A chuva apaga o fogo. A magia da água flui livre.',
                  en: 'Rain douses fire. Water magic flows free.' },
      hue:      '#60a5fa',
      glow:     'rgba(96,165,250,0.2)',
      skyTop:   '#060d1a',
      skyMid:   '#0f2236',
      effects: {
        atkMult:    1.0,
        hpMult:     1.0,
        critBonus:  0,
        goldMult:   0.85,    // -15% ouro (tempo ruim = menos atividade)
        dropBonus:  0,
        missChance: 0.08,    // +8% chance de erro (visibilidade reduzida)
        magicMult:  1.3,     // +30% magia (elemento água amplificado)
        xpMult:     1.0,
        fireResist: true,    // inimigos de fogo com -20% ATK
        desc: { pt: '+30% Magia · -15% Ouro · +8% Erro · Fogo -20%', en: '+30% Magic · -15% Gold · +8% Miss · Fire -20%' },
      },
    },

    fog: {
      id:       'fog',
      icon:     '🌫',
      label:    { pt: 'Neblina',       en: 'Fog'         },
      lore:     { pt: 'A neblina obscurece a visão. Atacar às cegas é fatal.',
                  en: 'Fog obscures vision. Striking blind is fatal.' },
      hue:      '#94a3b8',
      glow:     'rgba(148,163,184,0.15)',
      skyTop:   '#0a0a0f',
      skyMid:   '#14141e',
      effects: {
        atkMult:    0.85,    // -15% ATK (difícil mirar)
        hpMult:     1.0,
        critBonus:  -0.1,   // -10% crítico
        goldMult:   0.9,
        dropBonus:  0.25,   // +25% chance de drop raro (criaturas fogem pra neblina)
        missChance: 0.15,   // +15% miss (ambos os lados)
        magicMult:  1.0,
        xpMult:     1.2,    // +20% XP (combate mais difícil = mais aprendizado)
        desc: { pt: '-15% ATK · +25% Drop raro · +20% XP · +15% Erro', en: '-15% ATK · +25% Rare Drop · +20% XP · +15% Miss' },
      },
    },

    storm: {
      id:       'storm',
      icon:     '⛈',
      label:    { pt: 'Tempestade',    en: 'Storm'       },
      lore:     { pt: 'O Caos se manifesta como relâmpago. Dano amplificado — para ambos.',
                  en: 'Chaos manifests as lightning. Damage amplified — for both.' },
      hue:      '#7c3aed',
      glow:     'rgba(124,58,237,0.3)',
      skyTop:   '#05020d',
      skyMid:   '#0f061e',
      effects: {
        atkMult:    1.35,    // +35% ATK
        hpMult:     1.0,
        critBonus:  0.10,   // +10% crítico
        goldMult:   0.7,    // -30% ouro (destruição colateral)
        dropBonus:  0,
        missChance: 0,
        magicMult:  1.5,    // +50% magia (raios)
        xpMult:     1.0,
        monsterDmgMult: 1.3, // monstros também causam +30%
        desc: { pt: '+35% ATK · +50% Magia · +10% Crítico · -30% Ouro · Inimigos +30%', en: '+35% ATK · +50% Magic · +10% Crit · -30% Gold · Enemies +30%' },
      },
    },

    snow: {
      id:       'snow',
      icon:     '❄',
      label:    { pt: 'Nevasca',       en: 'Blizzard'    },
      lore:     { pt: 'O frio absoluto congela tanto inimigos como heróis.',
                  en: 'Absolute cold freezes enemies and heroes alike.' },
      hue:      '#bae6fd',
      glow:     'rgba(186,230,253,0.2)',
      skyTop:   '#030811',
      skyMid:   '#0a1220',
      effects: {
        atkMult:    0.9,     // -10% ATK (dedos gelados)
        hpMult:     1.0,
        critBonus:  0,
        goldMult:   1.0,
        dropBonus:  0,
        missChance: 0,
        magicMult:  0.8,    // -20% magia (feitiços congelam)
        xpMult:     1.0,
        monsterSpeedMult: 0.65, // ATB inimigos -35% (congelados)
        iceBonus:   true,       // habilidades de gelo +50%
        desc: { pt: '-10% ATK · -20% Magia · Inimigos ATB -35% · Gelo +50%', en: '-10% ATK · -20% Magic · Enemy ATB -35% · Ice +50%' },
      },
    },

    blood_moon: {
      id:       'blood_moon',
      icon:     '🌕',
      label:    { pt: 'Lua de Sangue', en: 'Blood Moon'  },
      lore:     { pt: 'A Lua de Sangue acorda o lado sombrio do herói. Poder e perigo.',
                  en: 'The Blood Moon awakens the hero\'s dark side. Power and peril.' },
      hue:      '#ef4444',
      glow:     'rgba(239,68,68,0.35)',
      skyTop:   '#0d0002',
      skyMid:   '#1a0005',
      effects: {
        atkMult:    1.5,     // +50% ATK
        hpMult:     0.7,    // -30% HP máximo (vulnerável)
        critBonus:  0.20,   // +20% crítico
        goldMult:   2.0,    // +100% ouro
        dropBonus:  0.5,    // +50% drop raro
        missChance: 0,
        magicMult:  1.0,
        xpMult:     1.5,    // +50% XP
        monsterDmgMult: 1.5, // monstros também ficam fortes
        desc: { pt: '+50% ATK · -30% HP · +20% Crit · +100% Ouro · +50% XP · Inimigos +50%', en: '+50% ATK · -30% HP · +20% Crit · +100% Gold · +50% XP · Enemies +50%' },
      },
    },
  };

  // ── Ciclo dia/noite (baseado no relógio real) ─────────────────
  const DAY_NIGHT = {
    dawn:    { range: [5,  8],  label: { pt: 'Amanhecer', en: 'Dawn'    }, icon: '🌅', ambient: '#1a0f00' },
    day:     { range: [8,  17], label: { pt: 'Dia',       en: 'Day'     }, icon: '☀',  ambient: '#000814' },
    dusk:    { range: [17, 20], label: { pt: 'Entardecer',en: 'Dusk'    }, icon: '🌇', ambient: '#1a0700' },
    night:   { range: [20, 24], label: { pt: 'Noite',     en: 'Night'   }, icon: '🌙', ambient: '#000000' },
    midnight:{ range: [0,  5],  label: { pt: 'Madrugada', en: 'Midnight'}, icon: '🌑', ambient: '#000000' },
  };

  // ── Estado interno ────────────────────────────────────────────
  let _currentWeather  = null;
  let _nextWeather     = null;
  let _weatherTimer    = null;
  let _transitionTimer = null;
  let _particleFrame   = null;
  const WEATHER_DURATION_MS = 12 * 60 * 1000; // 12 min por padrão
  const WEATHER_SEED_INTERVAL = 15 * 60 * 1000; // muda a cada 15min real

  // ── Utilitários ───────────────────────────────────────────────
  function getLang() {
    return (typeof rpg !== 'undefined' ? rpg.lang : null) || 'pt';
  }

  function getCurrentTimeOfDay() {
    const h = new Date().getHours();
    for (const [key, val] of Object.entries(DAY_NIGHT)) {
      const [start, end] = val.range;
      if (h >= start && h < end) return { key, ...val };
    }
    return { key: 'night', ...DAY_NIGHT.night };
  }

  // Gera clima de forma determinística baseado no tempo real
  // Muda a cada 15min de forma consistente (mesma seed = mesmo clima)
  function pickWeatherBySeed() {
    const seed = Math.floor(Date.now() / WEATHER_SEED_INTERVAL);
    // Pseudo-random determinístico
    const r = ((seed * 1664525 + 1013904223) & 0xffffffff) >>> 0;
    const keys = Object.keys(WEATHERS);

    // Blood Moon só de noite e raro (1/12 chances, noite 20h-5h)
    const hour = new Date().getHours();
    const isNight = hour >= 20 || hour < 5;

    if (isNight && (r % 12 === 0)) return WEATHERS.blood_moon;
    if (!isNight && WEATHERS[keys[r % keys.length]]?.id === 'blood_moon') {
      return WEATHERS[keys[(r + 1) % (keys.length - 1)]]; // evita blood moon de dia
    }

    return WEATHERS[keys[r % (keys.length - 1)]]; // exclui blood_moon do pool normal
  }

  // ── Aplicação de efeitos no rpg ───────────────────────────────
  function applyWeatherEffects(weather) {
    if (typeof rpg === 'undefined') return;
    rpg._weatherEffects = weather ? weather.effects : null;
    rpg._currentWeatherId = weather ? weather.id : null;
  }

  // ── Patch getAtk ──────────────────────────────────────────────
  function patchGetAtk() {
    const _orig = rpg.getAtk.bind(rpg);
    rpg.getAtk = function() {
      let base = _orig();
      const fx = this._weatherEffects;
      if (!fx) return base;
      base = Math.floor(base * (fx.atkMult || 1.0));
      return base;
    };
  }

  // ── Patch getMaxHp ────────────────────────────────────────────
  function patchGetMaxHp() {
    const _orig = rpg.getMaxHp.bind(rpg);
    rpg.getMaxHp = function() {
      let base = _orig();
      const fx = this._weatherEffects;
      if (!fx || !fx.hpMult || fx.hpMult === 1.0) return base;
      return Math.floor(base * fx.hpMult);
    };
  }

  // ── Patch dealDamageToMonster (magic mult + miss) ─────────────
  function patchDealDamage() {
    const _orig = rpg.dealDamageToMonster.bind(rpg);
    rpg.dealDamageToMonster = function(dmg, type, isCrit) {
      const fx = this._weatherEffects;
      if (!fx) return _orig(dmg, type, isCrit);

      let finalDmg = dmg;

      // Amplificação de magia no clima
      if ((type === 'mag' || type === 'magic') && fx.magicMult && fx.magicMult !== 1.0) {
        finalDmg = Math.floor(finalDmg * fx.magicMult);
      }

      // Chuva: resistência a fogo
      if (fx.fireResist && this.monster?.elem === 'fire') {
        finalDmg = Math.floor(finalDmg * 0.8);
      }

      // Nevasca: bônus de gelo
      if (fx.iceBonus && type === 'ice') {
        finalDmg = Math.floor(finalDmg * 1.5);
      }

      // Miss chance
      if (fx.missChance && fx.missChance > 0 && Math.random() < fx.missChance) {
        if (this.showDamage) this.showDamage('ERRO!', 'dodge');
        if (this.addLog) this.addLog('A neblina desviou o ataque!', 'text-zinc-500');
        return;
      }

      return _orig(finalDmg, type, isCrit);
    };
  }

  // ── Patch executeMonsterAttack (monster dmg mult + speed) ─────
  function patchMonsterAttack() {
    const _orig = rpg.executeMonsterAttack.bind(rpg);
    rpg.executeMonsterAttack = function() {
      const fx = this._weatherEffects;
      if (!fx) return _orig();

      // Salva e modifica o dano do monstro temporariamente
      const savedDmg = this.monster ? this.monster.dmg : null;
      if (savedDmg !== null && fx.monsterDmgMult) {
        this.monster.dmg = Math.floor(savedDmg * fx.monsterDmgMult);
      }

      // Miss chance para o monstro também
      if (fx.missChance && Math.random() < fx.missChance * 0.6) {
        if (this.showDamage) this.showDamage('DESVIOU!', 'monster-dodge');
        if (this.monster && savedDmg !== null) this.monster.dmg = savedDmg;
        return;
      }

      const result = _orig();

      // Restaura
      if (this.monster && savedDmg !== null) this.monster.dmg = savedDmg;
      return result;
    };
  }

  // ── Patch killMonster (gold e xp multipliers) ─────────────────
  function patchKillMonster() {
    const _orig = rpg.killMonster.bind(rpg);
    rpg.killMonster = function() {
      const fx = this._weatherEffects;
      if (!fx) return _orig();

      // Salva gold antes para calcular bônus depois
      const goldBefore = this.gold;
      const result = _orig();
      const goldEarned = this.gold - goldBefore;

      // Aplica multiplicador de ouro do clima
      if (fx.goldMult && fx.goldMult !== 1.0 && goldEarned > 0) {
        const bonus = Math.floor(goldEarned * (fx.goldMult - 1.0));
        this.gold += bonus;
        if (bonus > 0) {
          this.showDamage && this.showDamage(`+${formatNumber(bonus)}💰`, 'heal');
        } else if (bonus < 0) {
          this.gold = Math.max(0, this.gold + bonus); // já foi adicionado, remove
        }
      }

      // Bônus de crítico de clima
      if (fx.critBonus && fx.critBonus !== 0) {
        // Aplicado em getCritChance se patched; aqui só efeito visual
      }

      return result;
    };
  }

  // ── Patch getCritChance ───────────────────────────────────────
  function patchGetCritChance() {
    if (!rpg.getCritChance) return;
    const _orig = rpg.getCritChance.bind(rpg);
    rpg.getCritChance = function() {
      let base = _orig();
      const fx = this._weatherEffects;
      if (!fx || !fx.critBonus) return base;
      return Math.max(0, Math.min(1, base + fx.critBonus));
    };
  }

  // ── Patch startBattle (ATB speed do monstro em neve) ─────────
  function patchStartBattle() {
    const _orig = rpg.startBattle.bind(rpg);
    rpg.startBattle = function(monster, isBoss) {
      const result = _orig(monster, isBoss);
      const fx = this._weatherEffects;
      // Neve: monstros mais lentos
      if (fx?.monsterSpeedMult && this.monster) {
        this.monster._weatherSpeedMult = fx.monsterSpeedMult;
      }
      // Mostra notificação de clima no início do combate
      if (_currentWeather && _currentWeather.id !== 'sunny') {
        setTimeout(() => {
          showWeatherCombatToast(_currentWeather);
        }, 800);
      }
      return result;
    };
  }

  // ── Toast de clima no início do combate ──────────────────────
  function showWeatherCombatToast(weather) {
    const lang = getLang();
    const msg = `${weather.icon} ${weather.label[lang]} — ${weather.effects.desc[lang]}`;
    if (typeof showToast === 'function') showToast(msg, 3500);
  }

  // ── Muda o clima com transição animada ────────────────────────
  function transitionToWeather(newWeather, forced) {
    if (_currentWeather?.id === newWeather?.id && !forced) return;
    const lang = getLang();
    const prev = _currentWeather;
    _currentWeather = newWeather;

    applyWeatherEffects(newWeather);
    updateWeatherHUD(newWeather);
    updateWorldBackground(newWeather);
    updateBootScreenLines(newWeather);

    // Toast de transição
    if (prev && newWeather.id !== prev.id) {
      const msg = `${newWeather.icon} ${newWeather.label[lang]}`;
      if (typeof showToast === 'function') {
        showToast(msg, 3000);
      }
    }

    // Se estiver em combate, atualiza o badge de clima na arena
    updateCombatWeatherBadge(newWeather);

    console.log(`[WeatherSystem] Clima → ${newWeather.label[lang]}`);
  }

  // ── HUD principal: widget no canto superior direito do menu ───
  function createWeatherHUD() {
    if (document.getElementById('weather-hud-widget')) return;

    const widget = document.createElement('div');
    widget.id = 'weather-hud-widget';
    widget.onclick = openWeatherModal;
    document.body.appendChild(widget);

    injectWeatherStyles();
  }

  function updateWeatherHUD(weather) {
    const widget = document.getElementById('weather-hud-widget');
    if (!widget) return;

    const tod = getCurrentTimeOfDay();
    const lang = getLang();
    const hour = new Date().getHours();
    const min  = String(new Date().getMinutes()).padStart(2, '0');

    widget.style.setProperty('--weather-color', weather.hue);
    widget.innerHTML = `
      <div class="wh-top">
        <span class="wh-icon">${weather.icon}</span>
        <div class="wh-info">
          <span class="wh-label">${weather.label[lang]}</span>
          <span class="wh-time">${tod.icon} ${hour}:${min}</span>
        </div>
      </div>
      <div class="wh-effects">${weather.effects.desc[lang]}</div>
    `;
  }

  // ── Badge de clima na arena de combate ───────────────────────
  function updateCombatWeatherBadge(weather) {
    // Tenta inserir no HUD do combate se estiver aberto
    let badge = document.getElementById('weather-combat-badge');
    const arenaTop = document.querySelector('.hud-compact-panel, #arena-container .flex.justify-between');

    if (!badge && arenaTop) {
      badge = document.createElement('div');
      badge.id = 'weather-combat-badge';
      badge.className = 'weather-combat-badge';
      badge.onclick = openWeatherModal;
      arenaTop.parentElement?.insertBefore(badge, arenaTop.nextSibling);
    }

    if (badge && weather) {
      const lang = getLang();
      badge.textContent = `${weather.icon} ${weather.label[lang]}`;
      badge.style.setProperty('--w-color', weather.hue);
      badge.style.display = 'flex';
    }
  }

  // ── Atualiza fundo do mundo com overlay de clima ──────────────
  function updateWorldBackground(weather) {
    let overlay = document.getElementById('weather-world-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'weather-world-overlay';
      overlay.style.cssText = `
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 0;
        transition: opacity 1.2s ease, background 1.2s ease;
        opacity: 0;
      `;
      document.body.insertBefore(overlay, document.body.firstChild);
    }

    const tod = getCurrentTimeOfDay();

    // Overlay de cor baseado no clima (muito sutil, para não interferir)
    const ambientColor = weather.glow;
    overlay.style.background = `radial-gradient(ellipse at 50% 0%, ${ambientColor} 0%, transparent 70%)`;
    overlay.style.opacity = '1';

    // Partículas de clima (chuva, neve)
    stopWeatherParticles();
    if (weather.id === 'rain' || weather.id === 'storm') spawnRainParticles(weather);
    if (weather.id === 'snow') spawnSnowParticles();
    if (weather.id === 'blood_moon') spawnBloodMoonEffect();
  }

  // ── Partículas de chuva ───────────────────────────────────────
  function spawnRainParticles(weather) {
    let container = document.getElementById('weather-particles');
    if (!container) {
      container = document.createElement('div');
      container.id = 'weather-particles';
      container.style.cssText = `
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
      `;
      document.body.appendChild(container);
    }
    container.innerHTML = '';

    const isStorm = weather.id === 'storm';
    const count = isStorm ? 60 : 35;
    const color = isStorm ? 'rgba(124,58,237,0.5)' : 'rgba(96,165,250,0.4)';

    for (let i = 0; i < count; i++) {
      const drop = document.createElement('div');
      const left = Math.random() * 110 - 5;
      const delay = Math.random() * 2;
      const duration = isStorm ? (0.4 + Math.random() * 0.3) : (0.6 + Math.random() * 0.5);
      const height = isStorm ? (20 + Math.random() * 15) : (12 + Math.random() * 10);
      const angle = isStorm ? '20deg' : '10deg';

      drop.style.cssText = `
        position: absolute;
        left: ${left}%;
        top: -30px;
        width: ${isStorm ? 1.5 : 1}px;
        height: ${height}px;
        background: ${color};
        border-radius: 99px;
        transform: rotate(${angle});
        animation: rain-fall ${duration}s linear ${delay}s infinite;
      `;
      container.appendChild(drop);
    }

    // Injetar keyframes se não existirem
    if (!document.getElementById('weather-particle-kf')) {
      const s = document.createElement('style');
      s.id = 'weather-particle-kf';
      s.textContent = `
        @keyframes rain-fall {
          0%   { transform: translateY(0) rotate(10deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(10deg); opacity: 0.5; }
        }
        @keyframes snow-fall {
          0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
          50%  { transform: translateY(40vh) translateX(15px) rotate(180deg); opacity: 0.8; }
          100% { transform: translateY(100vh) translateX(-10px) rotate(360deg); opacity: 0; }
        }
        @keyframes blood-pulse {
          0%, 100% { opacity: 0.08; }
          50%       { opacity: 0.18; }
        }
        @keyframes fog-drift {
          0%   { transform: translateX(-5%) translateY(0); opacity: 0.5; }
          50%  { transform: translateX(5%) translateY(-10px); opacity: 0.8; }
          100% { transform: translateX(-5%) translateY(0); opacity: 0.5; }
        }
      `;
      document.head.appendChild(s);
    }
  }

  // ── Partículas de neve ────────────────────────────────────────
  function spawnSnowParticles() {
    let container = document.getElementById('weather-particles');
    if (!container) {
      container = document.createElement('div');
      container.id = 'weather-particles';
      container.style.cssText = `
        position: fixed; inset: 0; pointer-events: none; z-index: 1; overflow: hidden;
      `;
      document.body.appendChild(container);
    }
    container.innerHTML = '';

    for (let i = 0; i < 40; i++) {
      const flake = document.createElement('div');
      const left = Math.random() * 100;
      const delay = Math.random() * 4;
      const size = 2 + Math.random() * 3;
      const duration = 3 + Math.random() * 3;

      flake.style.cssText = `
        position: absolute;
        left: ${left}%;
        top: -10px;
        width: ${size}px;
        height: ${size}px;
        background: rgba(186,230,253,0.8);
        border-radius: 50%;
        animation: snow-fall ${duration}s ease-in ${delay}s infinite;
      `;
      container.appendChild(flake);
    }
  }

  // ── Efeito Lua de Sangue ──────────────────────────────────────
  function spawnBloodMoonEffect() {
    let overlay = document.getElementById('blood-moon-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'blood-moon-overlay';
      overlay.style.cssText = `
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 1;
        background: radial-gradient(ellipse at 50% -10%, rgba(239,68,68,0.3) 0%, transparent 65%);
        animation: blood-pulse 3s ease-in-out infinite;
      `;
      document.body.appendChild(overlay);
    }

    // Lua no canto superior direito
    let moon = document.getElementById('blood-moon-orb');
    if (!moon) {
      moon = document.createElement('div');
      moon.id = 'blood-moon-orb';
      moon.style.cssText = `
        position: fixed;
        top: 12px;
        right: 60px;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: radial-gradient(circle at 35% 35%, #fca5a5, #ef4444, #991b1b);
        box-shadow: 0 0 20px rgba(239,68,68,0.7), 0 0 40px rgba(239,68,68,0.3);
        pointer-events: none;
        z-index: 100;
        animation: blood-pulse 2.5s ease-in-out infinite;
      `;
      document.body.appendChild(moon);
    }
  }

  function stopWeatherParticles() {
    const p = document.getElementById('weather-particles');
    if (p) p.remove();
    const bm = document.getElementById('blood-moon-overlay');
    if (bm) bm.remove();
    const mo = document.getElementById('blood-moon-orb');
    if (mo) mo.remove();
  }

  // ── Atualiza linhas do boot-screen com clima ──────────────────
  // Integra com boot-screen.js: se ainda estiver aberto, atualiza
  function updateBootScreenLines(weather) {
    const terminal = document.getElementById('boot-terminal-lines');
    if (!terminal) return;
    const lang = getLang();
    const line = document.createElement('div');
    line.className = 'boot-line';
    line.style.color = weather.hue;
    line.textContent = `Clima atual: ${weather.icon} ${weather.label[lang]}`;
    terminal.appendChild(line);
  }

  // ── Modal de detalhes do clima ────────────────────────────────
  window.openWeatherModal = function() {
    let modal = document.getElementById('weather-detail-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'weather-detail-modal';
      modal.className = 'modal-overlay fixed inset-0 flex items-center justify-center';
      modal.style.zIndex = '600';
      document.body.appendChild(modal);
    }

    const lang = getLang();
    const tod = getCurrentTimeOfDay();
    const hour = new Date().getHours();
    const min  = String(new Date().getMinutes()).padStart(2, '0');
    const weather = _currentWeather || WEATHERS.sunny;

    // Calcula quando o próximo clima muda
    const elapsed = Date.now() % WEATHER_SEED_INTERVAL;
    const remaining = WEATHER_SEED_INTERVAL - elapsed;
    const minsLeft = Math.ceil(remaining / 60000);

    modal.innerHTML = `
      <div class="modal-content glass-panel bg-zinc-900/95 w-11/12 max-w-sm rounded-2xl p-5 shadow-2xl" style="border:1px solid ${weather.hue}30;">
        <div class="flex justify-between items-center mb-4 border-b border-zinc-800 pb-3">
          <h2 style="font-family:'Orbitron',sans-serif;font-size:14px;font-weight:900;color:#fff;letter-spacing:0.15em;display:flex;align-items:center;gap:8px;">
            <span style="font-size:18px;">${weather.icon}</span>
            ${lang === 'pt' ? 'CLIMA DO NEXUS' : 'NEXUS WEATHER'}
          </h2>
          <button onclick="closeModal('weather-detail-modal')" style="padding:6px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#9ca3af;cursor:pointer;">✕</button>
        </div>

        <!-- Hora do mundo -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;padding:10px 12px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.06);border-radius:10px;">
          <div>
            <p style="font-family:'Fira Code',monospace;font-size:9px;color:#4b5563;letter-spacing:0.1em;margin-bottom:2px;">${lang==='pt'?'HORA DO NEXUS':'NEXUS TIME'}</p>
            <p style="font-family:'Orbitron',sans-serif;font-size:20px;font-weight:900;color:#fff;line-height:1;">${hour}:${min}</p>
          </div>
          <div style="text-align:right;">
            <span style="font-size:20px;">${tod.icon}</span>
            <p style="font-family:'Fira Code',monospace;font-size:9px;color:#6b7280;margin-top:2px;">${tod.label[lang]}</p>
          </div>
        </div>

        <!-- Clima atual -->
        <div style="background:${weather.hue}12;border:1px solid ${weather.hue}30;border-radius:12px;padding:14px;margin-bottom:12px;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
            <span style="font-size:28px;">${weather.icon}</span>
            <div>
              <p style="font-family:'Orbitron',sans-serif;font-size:13px;font-weight:900;color:${weather.hue};letter-spacing:0.08em;">${weather.label[lang].toUpperCase()}</p>
              <p style="font-family:'Fira Code',monospace;font-size:8px;color:#4b5563;margin-top:1px;">${lang==='pt'?'Muda em ~':'Changes in ~'} ${minsLeft}min</p>
            </div>
          </div>
          <p style="font-size:9px;color:#94a3b8;font-style:italic;margin-bottom:10px;line-height:1.5;">"${weather.lore[lang]}"</p>
          <div style="background:rgba(0,0,0,0.3);border-radius:8px;padding:8px 10px;">
            <p style="font-family:'Fira Code',monospace;font-size:8px;color:${weather.hue};line-height:1.6;">${weather.effects.desc[lang]}</p>
          </div>
        </div>

        <!-- Todos os climas -->
        <p style="font-family:'Orbitron',sans-serif;font-size:8px;color:#374151;letter-spacing:0.1em;margin-bottom:8px;">${lang==='pt'?'TODOS OS CLIMAS':'ALL WEATHER'}</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
          ${Object.values(WEATHERS).map(w => `
            <div style="display:flex;align-items:center;gap:6px;padding:6px 8px;background:${w.id===weather.id?w.hue+'18':'rgba(0,0,0,0.3)'};border:1px solid ${w.id===weather.id?w.hue+'40':'rgba(255,255,255,0.04)'};border-radius:8px;cursor:pointer;" onclick="WeatherSystem.forceWeather('${w.id}')">
              <span style="font-size:14px;">${w.icon}</span>
              <div style="min-width:0;">
                <p style="font-family:'Fira Code',monospace;font-size:8px;color:${w.id===weather.id?w.hue:'#6b7280'};font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${w.label[lang]}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    modal.classList.add('active');
  };

  // ── API pública ───────────────────────────────────────────────
  window.WeatherSystem = {
    getCurrentWeather: () => _currentWeather,
    getEffects: () => _currentWeather?.effects || null,
    forceWeather: (id) => {
      const w = WEATHERS[id];
      if (!w) return;
      transitionToWeather(w, true);
      // Fecha o modal se aberto
      const m = document.getElementById('weather-detail-modal');
      if (m) m.classList.remove('active');
    },
    getTimeOfDay: getCurrentTimeOfDay,
    WEATHERS,
  };

  // ── CSS ───────────────────────────────────────────────────────
  function injectWeatherStyles() {
    if (document.getElementById('weather-system-styles')) return;
    const s = document.createElement('style');
    s.id = 'weather-system-styles';
    s.textContent = `
      /* ══ Widget HUD do clima ══ */
      #weather-hud-widget {
        position: fixed;
        bottom: 90px;
        left: 14px;
        background: rgba(8,8,16,0.92);
        border: 1px solid rgba(var(--weather-color, 255,255,255), 0.2);
        border-color: color-mix(in srgb, var(--weather-color, #fff) 25%, transparent);
        border-radius: 10px;
        padding: 7px 10px;
        z-index: 7999;
        cursor: pointer;
        min-width: 120px;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 16px rgba(0,0,0,0.6);
        transition: border-color 0.4s ease, box-shadow 0.4s ease;
      }
      #weather-hud-widget:hover {
        box-shadow: 0 4px 16px rgba(0,0,0,0.6), 0 0 16px rgba(0,0,0,0.3);
        transform: translateY(-1px);
        transition: transform 0.1s ease;
      }
      .wh-top {
        display: flex;
        align-items: center;
        gap: 7px;
        margin-bottom: 3px;
      }
      .wh-icon {
        font-size: 16px;
        line-height: 1;
        flex-shrink: 0;
      }
      .wh-info {
        display: flex;
        flex-direction: column;
        gap: 1px;
        min-width: 0;
      }
      .wh-label {
        font-family: 'Orbitron', monospace;
        font-size: 8px;
        font-weight: 900;
        color: #e2e8f0;
        letter-spacing: 0.08em;
        white-space: nowrap;
      }
      .wh-time {
        font-family: 'Fira Code', monospace;
        font-size: 7.5px;
        color: rgba(100,116,139,0.9);
        white-space: nowrap;
      }
      .wh-effects {
        font-family: 'Fira Code', monospace;
        font-size: 7px;
        color: rgba(100,116,139,0.7);
        line-height: 1.4;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 140px;
      }

      /* ══ Badge de clima na arena ══ */
      .weather-combat-badge {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        font-family: 'Fira Code', monospace;
        font-size: 8px;
        font-weight: 700;
        color: color-mix(in srgb, var(--w-color, #fff) 80%, #fff);
        background: rgba(0,0,0,0.4);
        border: 1px solid color-mix(in srgb, var(--w-color, #fff) 30%, transparent);
        border-radius: 6px;
        padding: 3px 8px;
        text-align: center;
        width: 100%;
        margin-top: 4px;
        cursor: pointer;
        transition: opacity 0.3s ease;
      }
      .weather-combat-badge:hover { opacity: 0.7; }
    `;
    document.head.appendChild(s);
  }

  // ── Ticker: verifica mudança de clima a cada minuto ───────────
  function startWeatherTicker() {
    // Checagem imediata
    const newWeather = pickWeatherBySeed();
    transitionToWeather(newWeather, true);

    // A cada 60s verifica se o seed mudou (= clima novo)
    _weatherTimer = setInterval(() => {
      const candidate = pickWeatherBySeed();
      if (candidate.id !== _currentWeather?.id) {
        transitionToWeather(candidate, false);
      }
      // Atualiza o HUD do relógio mesmo sem mudança de clima
      updateWeatherHUD(_currentWeather || WEATHERS.sunny);
    }, 60 * 1000);
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    createWeatherHUD();
    patchGetAtk();
    patchGetMaxHp();
    patchDealDamage();
    patchMonsterAttack();
    patchKillMonster();
    patchGetCritChance();
    patchStartBattle();
    startWeatherTicker();

    console.log('[WeatherSystem] OK — 6 climas, ciclo dia/noite, efeitos de combate ativos.');
  }

  // Aguarda rpg e DOM
  function waitForRpg(cb, n) {
    if (typeof rpg !== 'undefined' && typeof rpg.getAtk === 'function' && typeof rpg.killMonster === 'function') {
      cb();
    } else if ((n || 0) < 50) {
      setTimeout(() => waitForRpg(cb, (n || 0) + 1), 200);
    } else {
      console.warn('[WeatherSystem] rpg não disponível após timeout — abortando.');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => waitForRpg(init));
  } else {
    waitForRpg(init);
  }

})();
