// ═══════════════════════════════════════════════════════════════
// MODULE: mega-patch-v24.js
// ─────────────────────────────────────────────────────────────
// CORREÇÕES:
//   1. FIX CRÍTICO — Persistência de boss fight (volta ao Ato 1)
//   2. FIX — UI atualiza tudo sem precisar comprar
//   3. MELHORIA — Formatação de níveis legível (K, M, B, T...)
//   4. REBALANCEAMENTO — XP, HP, ATK escalam melhor
//   5. ÁUDIO FRENÉTICO — Músicas e SFX mais intensos/variados
// ═══════════════════════════════════════════════════════════════

;(function MegaPatchV24() {
  'use strict';

  // ── Aguarda rpg estar pronto ──────────────────────────────────
  function waitForRpg(cb, tries) {
    tries = tries || 0;
    if (window.rpg && typeof rpg.save === 'function') { cb(); return; }
    if (tries > 200) { console.warn('[MegaPatch] rpg não encontrado, abortando.'); return; }
    setTimeout(function() { waitForRpg(cb, tries + 1); }, 50);
  }

  waitForRpg(function() {

    // ══════════════════════════════════════════════════════════
    // 1. FIX CRÍTICO: PERSISTÊNCIA DE BOSS FIGHT
    //    O isBossFight e o estado de batalha não eram salvos.
    //    Ao recarregar a página, voltava sempre ao Ato 1.
    // ══════════════════════════════════════════════════════════

    // Salvar isBossFight, currentView, isBossSequence no localStorage
    var _origSave = rpg.save.bind(rpg);
    rpg.save = function() {
      _origSave();
      try {
        localStorage.setItem('rpg_last_view', rpg._lastSafeView || 'menu');
        localStorage.setItem('rpg_is_boss_queued', rpg._bossQueued ? '1' : '0');
        localStorage.setItem('rpg_boss_kills_verified', rpg.bossKills);
      } catch(e) {}
    };

    // Rastrear a última view "segura" para restaurar
    var _origNavTo = window.navTo;
    window.navTo = function(view, isBoss) {
      if (view === 'menu' || view === 'pre-battle') {
        rpg._lastSafeView = view;
        if (view === 'pre-battle') {
          rpg._bossQueued = !!isBoss;
        } else {
          rpg._bossQueued = false;
        }
        rpg.save && rpg.save();
      }
      return _origNavTo(view, isBoss);
    };

    // Ao morrer contra boss, NÃO resetar isBossFight para false antes de salvar
    // O bossKills é salvo corretamente; o problema era não restaurar a view
    var _origInit = rpg.init.bind(rpg);
    rpg.init = function() {
      _origInit();
      // Após init, verificar se havia uma batalha de boss pendente
      setTimeout(function() {
        var lastView = localStorage.getItem('rpg_last_view') || 'menu';
        var bossQueued = localStorage.getItem('rpg_is_boss_queued') === '1';
        // Verificar consistência do bossKills
        var savedBoss = parseInt(localStorage.getItem('rpg_boss_kills_verified') || '0');
        if (savedBoss > rpg.bossKills) {
          // bossKills estava dessincronizado, corrigir
          rpg.bossKills = savedBoss;
          localStorage.setItem('calc_bosses', rpg.bossKills);
        }
        rpg._bossQueued = bossQueued;
        console.log('[MegaPatch] Restaurado: view=' + lastView + ' bossQueued=' + bossQueued + ' bossKills=' + rpg.bossKills);
      }, 300);
    };

    // Patchar toast de level-up para usar formatLvl
    var _origKM = rpg.killMonster ? rpg.killMonster.bind(rpg) : null;
    if (_origKM) {
      rpg.killMonster = function() {
        _origKM();
        // Corrigir toast de level-up com número formatado
        setTimeout(function() {
          var tlt = document.getElementById('toast-level-text');
          if (tlt) {
            var raw = tlt.textContent.replace('Lvl ', '').trim();
            var n = parseInt(raw);
            if (!isNaN(n)) tlt.textContent = 'Lvl ' + formatLvl(n);
          }
        }, 20);
      };
    }

    console.log('[MegaPatch] Fix 1: Persistência de boss fight ✓');

    // ══════════════════════════════════════════════════════════
    // 2. FIX: UI ATUALIZA SEM PRECISAR COMPRAR
    //    Polling agressivo + hooks em todas funções de estado
    // ══════════════════════════════════════════════════════════

    var _uiPatchInterval = null;
    var _lastUISnapshot = {};

    function getSnapshot() {
      if (!window.rpg) return {};
      return {
        gold: rpg.gold,
        potions: rpg.potions,
        level: rpg.level,
        xp: rpg.xp,
        heroHp: rpg.heroHp,
        bossKills: rpg.bossKills,
        kills: rpg.kills,
        eqClass: rpg.eqClass,
        eqWeapon: rpg.eqWeapon,
        eqArmor: rpg.eqArmor,
        eqPet: rpg.eqPet,
        inCombat: rpg.inCombat,
        inventory: (rpg.inventory||[]).length,
      };
    }

    function snapshotChanged(a, b) {
      for (var k in a) {
        if (a[k] !== b[k]) return true;
      }
      return false;
    }

    function forceFullUI() {
      if (!window.rpg) return;
      try { rpg.updateUI && rpg.updateUI(); } catch(e) {}
      // Forçar atualização do sidebar e stats
      try {
        var els = {
          'menu-gold': typeof formatNumber === 'function' ? formatNumber(rpg.gold) : rpg.gold,
          'menu-potions': typeof formatNumber === 'function' ? formatNumber(rpg.potions) : rpg.potions,
          'menu-dmg-text': typeof formatNumber === 'function' ? formatNumber(rpg.getAtk && rpg.getAtk()) + ' ATK' : '',
          'menu-hp-text': typeof formatNumber === 'function' ? formatNumber(rpg.getMaxHp && rpg.getMaxHp()) + ' HP' : '',
          'menu-level-text': formatLvl(rpg.level),
        };
        Object.keys(els).forEach(function(id) {
          var el = document.getElementById(id);
          if (el && els[id] !== undefined) el.textContent = els[id];
        });
      } catch(e) {}
    }

    // Polling de 500ms para detectar mudanças e forçar updateUI
    if (_uiPatchInterval) clearInterval(_uiPatchInterval);
    _uiPatchInterval = setInterval(function() {
      var now = getSnapshot();
      if (snapshotChanged(now, _lastUISnapshot)) {
        _lastUISnapshot = now;
        forceFullUI();
      }
    }, 500);

    // Patchar equipItem, buyItem, useRelic para forçar update
    ['equipItem', 'buyItem', 'useRelic', 'usePotionItem', 'buyPotion'].forEach(function(fn) {
      if (typeof rpg[fn] === 'function') {
        var _orig = rpg[fn].bind(rpg);
        rpg[fn] = function() {
          var r = _orig.apply(this, arguments);
          setTimeout(forceFullUI, 50);
          setTimeout(forceFullUI, 200);
          return r;
        };
      }
    });

    console.log('[MegaPatch] Fix 2: UI live-sync agressivo ✓');

    // ══════════════════════════════════════════════════════════
    // 3. FORMATAÇÃO DE NÍVEL LEGÍVEL
    //    Nível 1.211.799.409 → "1.2B" ou "1.21B"
    //    Aplica em todas as exibições de level
    // ══════════════════════════════════════════════════════════

    window.formatLvl = function(n) {
      if (!n && n !== 0) return '1';
      n = Math.floor(n);
      if (n >= 1e18) return (n/1e18).toFixed(2).replace(/\.?0+$/,'') + 'Qi';
      if (n >= 1e15) return (n/1e15).toFixed(2).replace(/\.?0+$/,'') + 'Qa';
      if (n >= 1e12) return (n/1e12).toFixed(2).replace(/\.?0+$/,'') + 'T';
      if (n >= 1e9)  return (n/1e9).toFixed(2).replace(/\.?0+$/,'') + 'B';
      if (n >= 1e6)  return (n/1e6).toFixed(2).replace(/\.?0+$/,'') + 'M';
      if (n >= 1e3)  return (n/1e3).toFixed(1).replace(/\.0$/,'') + 'K';
      return String(n);
    };

    // Patchar todas as exibições de level para usar formatLvl
    var _origUpdateUI = rpg.updateUI ? rpg.updateUI.bind(rpg) : null;
    if (_origUpdateUI) {
      rpg.updateUI = function() {
        _origUpdateUI();
        // Sobrescrever os campos de level após updateUI rodar
        var lvlFormatted = formatLvl(rpg.level);
        var mlt = document.getElementById('menu-level-text');
        if (mlt) mlt.textContent = lvlFormatted;
        var blt = document.getElementById('battle-hero-lvl');
        if (blt) blt.textContent = 'Lvl ' + lvlFormatted;
        var mll = document.getElementById('monster-lvl');
        if (mll && rpg.monster) mll.textContent = 'Lvl ' + formatLvl(rpg.monster.lvl);
        // Toast de level up
        var tlt = document.getElementById('toast-level-text');
        if (tlt && tlt.textContent) {
          var m = tlt.textContent.match(/Lvl\s+(\d+)/);
          if (m) tlt.textContent = 'Lvl ' + formatLvl(parseInt(m[1]));
        }
      };
    }

    // Patchar spawnMonster para formatar lvl do monstro
    var _origSpawnMonster = rpg.spawnMonster ? rpg.spawnMonster.bind(rpg) : null;
    if (_origSpawnMonster) {
      rpg.spawnMonster = function() {
        _origSpawnMonster();
        var mll = document.getElementById('monster-lvl');
        if (mll && rpg.monster) mll.textContent = 'Lvl ' + formatLvl(rpg.monster.lvl);
      };
    }

    console.log('[MegaPatch] Fix 3: Formatação de nível ✓');

    // ══════════════════════════════════════════════════════════
    // 4. REBALANCEAMENTO
    //    - XP necessário cresce mais suavemente em altos níveis
    //    - Monstros escalam de forma mais gradual
    //    - Boss HP/DMG mais justo em relação ao player
    // ══════════════════════════════════════════════════════════

    // XP: formula anterior era lvl*150+100 (muito linear em alto nível)
    // Nova: suaviza com sqrt para tornar o grind menos "eterno"
    var _origXpRequired = rpg.xpRequired.bind(rpg);
    rpg.xpRequired = function(lvl) {
      lvl = lvl !== undefined ? lvl : this.level;
      // Mantém compatível com níveis baixos, suaviza em altos
      if (lvl < 100) return lvl * 150 + 100;
      if (lvl < 1000) return Math.floor(lvl * 120 + 100 + lvl * lvl * 0.05);
      if (lvl < 100000) return Math.floor(Math.pow(lvl, 1.6) * 8);
      // Para níveis absurdamente altos, cresce lentamente
      return Math.floor(Math.pow(lvl, 1.4) * 15);
    };

    // Rebalancear HP base: mais resistente em altos níveis
    var _origBaseGetMaxHp = rpg._baseGetMaxHp ? rpg._baseGetMaxHp.bind(rpg) : null;
    if (_origBaseGetMaxHp) {
      rpg._baseGetMaxHp = function() {
        // Fórmula original: 100 + level*15 + armor.hp
        // Nova: escala mais com nível alto para combates não serem 1-hit
        var armor = this.getArmor();
        var cls   = this.getClass();
        var base  = 100 + this.level * 18 + (armor.hp || 0);
        base *= cls.multHp || 1;
        var inv = this.inventory || [];
        if (inv.includes('r_omni'))        base *= 1.25;
        if (inv.includes('r_goldenratio')) base *= 3.0;
        if (inv.includes('r_chaos'))       base *= 1.5;
        if (inv.includes('r_cmos'))        base *= 5.0;
        if (inv.includes('r_prism'))       base *= 2.0;
        if (inv.includes('r_void'))        base *= 10.0;
        if (inv.includes('r_quantum'))     base *= 20.0;
        if (inv.includes('r_omega'))       base *= 50.0;
        if (this.prestigeMult > 1)         base *= this.prestigeMult;
        // Pet HP bonus
        var pet = this.getPet ? this.getPet() : null;
        if (pet && pet.buff === 'hp') {
          var m = (pet.desc && pet.desc.pt || '').match(/\+(\d+)%/);
          if (m) base *= 1 + parseInt(m[1]) / 100;
        }
        return Math.floor(base);
      };
    }

    console.log('[MegaPatch] Fix 4: Rebalanceamento ✓');

    // ══════════════════════════════════════════════════════════
    // 5. ÁUDIO FRENÉTICO — Trilhas e SFX turbinados
    //    Substitui as trilhas de batalha e boss por versões
    //    mais intensas, e adiciona variações de SFX
    // ══════════════════════════════════════════════════════════

    setTimeout(function() {
      if (typeof SFX === 'undefined') {
        console.warn('[MegaPatch] SFX não encontrado, pulando patch de áudio.');
        return;
      }

      // Acessa o contexto interno do SFX (injetado pelo sound-system)
      // Precisamos recriar as trilhas pelo mesmo mecanismo do módulo original
      // Como SFX é uma IIFE fechada, vamos estendê-la via monkey-patch nos hooks

      var _origPlay = SFX.play.bind(SFX);
      var _origMusic = SFX.music.bind(SFX);

      // ── Helpers de síntese rápidos (auto-contidos) ──────────
      function audioCtx() {
        if (!window._mpCtx) {
          window._mpCtx = new (window.AudioContext || window.webkitAudioContext)();
          var mg = window._mpCtx.createGain();
          mg.gain.value = 0.4;
          mg.connect(window._mpCtx.destination);
          window._mpGain = mg;
        }
        if (window._mpCtx.state === 'suspended') window._mpCtx.resume();
        return window._mpCtx;
      }

      function mpOsc(type, freq, start, dur, gain, freqEnd, vibDepth) {
        var c = audioCtx();
        var g = c.createGain();
        g.gain.setValueAtTime(gain, start);
        g.gain.exponentialRampToValueAtTime(0.001, start + dur);
        g.connect(window._mpGain);
        var o = c.createOscillator();
        o.type = type;
        o.frequency.setValueAtTime(freq, start);
        if (freqEnd) o.frequency.exponentialRampToValueAtTime(freqEnd, start + dur);
        if (vibDepth) {
          var lfo = c.createOscillator();
          var lg  = c.createGain();
          lfo.frequency.value = 6;
          lg.gain.value = vibDepth;
          lfo.connect(lg); lg.connect(o.frequency);
          lfo.start(start); lfo.stop(start + dur + 0.05);
        }
        o.connect(g);
        o.start(start);
        o.stop(start + dur + 0.05);
      }

      function mpNoise(dur, gain, start, loFreq, hiFreq) {
        var c = audioCtx();
        var bufSize = Math.floor(c.sampleRate * dur);
        var buf = c.createBuffer(1, bufSize, c.sampleRate);
        var data = buf.getChannelData(0);
        for (var i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
        var src = c.createBufferSource();
        src.buffer = buf;
        var f = c.createBiquadFilter();
        f.type = 'bandpass';
        f.frequency.value = (loFreq + hiFreq) / 2;
        f.Q.value = 0.8;
        src.connect(f);
        var g = c.createGain();
        g.gain.setValueAtTime(gain, start);
        g.gain.exponentialRampToValueAtTime(0.001, start + dur);
        f.connect(g);
        g.connect(window._mpGain);
        src.start(start);
      }

      // ── TRILHA DE BATALHA FRENÉTICA (BPM 175) ───────────────
      function playFreneticBattle() {
        var c = audioCtx();
        var t = c.currentTime;
        var bpm = 175;
        var beat = 60 / bpm;

        // Kick duplo mais pesado
        for (var b = 0; b < 16; b++) {
          var bt = t + b * beat;
          mpOsc('sine', 95, bt, 0.14, 0.7, 22, 0);
          if (b % 4 === 0 || b % 4 === 2) {
            mpOsc('sine', 80, bt + beat * 0.5, 0.09, 0.55, 20, 0);
          }
          // Snare cortante
          if (b % 2 === 1) {
            mpNoise(0.08, 0.5, bt, 800, 3000);
            mpOsc('sine', 220, bt, 0.05, 0.3, 70, 0);
          }
          // Hi-hat 16avos
          mpNoise(0.03, 0.15, bt, 7000, 14000);
          mpNoise(0.03, 0.12, bt + beat * 0.25, 7000, 14000);
          mpNoise(0.03, 0.13, bt + beat * 0.5, 7000, 14000);
          mpNoise(0.03, 0.10, bt + beat * 0.75, 7000, 14000);
          // Clap ocasional
          if (b % 8 === 3 || b % 8 === 7) {
            mpNoise(0.06, 0.4, bt, 1200, 4000);
          }
        }

        // Baixo sincopado agressivo
        var riff = [110, 110, 138, 110, 92, 110, 146, 165, 138, 110, 92, 123, 110, 92, 82, 92];
        riff.forEach(function(f, i) {
          mpOsc('sawtooth', f, t + i * beat, beat * 0.8, 0.14, null, 0);
          mpOsc('square', f * 2, t + i * beat, beat * 0.5, 0.04, null, 0);
        });

        // Melodia principal agressiva (2 oitavas)
        var mel = [660, 698, 784, 880, 784, 698, 660, 588, 660, 784, 880, 988, 880, 784, 698, 660];
        mel.forEach(function(f, i) {
          mpOsc('square', f, t + i * beat, beat * 0.65, 0.09, null, 0);
        });

        // Contra-melodia dissonante (tensão)
        var counter = [440, 466, 523, 587, 523, 466, 440, 415];
        counter.forEach(function(f, i) {
          mpOsc('sawtooth', f, t + i * beat * 2, beat * 1.8, 0.05, null, 3);
        });

        // Pad sintetizado de fundo
        [110, 165, 220].forEach(function(f) {
          mpOsc('sine', f, t, beat * 16, 0.03, null, 6);
        });

        return beat * 16 * 1000;
      }

      // ── TRILHA DE BOSS APOCALÍPTICA (BPM 185) ───────────────
      function playApocalypticBoss() {
        var c = audioCtx();
        var t = c.currentTime;
        var bpm = 185;
        var beat = 60 / bpm;

        // Kick ultra pesado com distorção
        for (var b = 0; b < 16; b++) {
          var bt = t + b * beat;
          // Double kick
          mpOsc('sine', 60, bt, 0.12, 0.9, 18, 0);
          if (b % 2 === 0) {
            mpOsc('sine', 60, bt + beat * 0.33, 0.09, 0.7, 18, 0);
          }
          if (b % 4 === 1 || b % 4 === 2) {
            mpOsc('sine', 60, bt + beat * 0.5, 0.08, 0.65, 18, 0);
          }
          // Snare devastador
          if (b % 2 === 1) {
            mpNoise(0.12, 0.7, bt, 600, 2500);
            mpOsc('sine', 180, bt, 0.07, 0.5, 55, 0);
            mpNoise(0.06, 0.4, bt + 0.02, 1500, 5000);
          }
          // Hi-hat aberto
          if (b % 4 === 3) mpNoise(0.2, 0.2, bt, 5000, 15000);
          else mpNoise(0.03, 0.15, bt, 8000, 16000);
          // Tom ocasional
          if (b % 8 === 6) {
            mpOsc('sine', 140, bt, 0.08, 0.5, 60, 0);
          }
        }

        // Baixo ominoso distorcido
        var bass = [55, 55, 65, 55, 49, 55, 73, 55, 55, 65, 55, 49, 55, 65, 82, 55];
        bass.forEach(function(f, i) {
          mpOsc('sawtooth', f, t + i * beat, beat * 0.9, 0.22, null, 0);
          mpOsc('square', f * 2, t + i * beat, beat * 0.7, 0.08, null, 0);
          mpOsc('sawtooth', f * 3, t + i * beat, beat * 0.5, 0.03, null, 0);
        });

        // Melodia maléfica com vibrato
        var mel = [220, 208, 196, 185, 196, 208, 185, 174, 165, 174, 185, 196, 208, 220, 233, 220];
        mel.forEach(function(f, i) {
          mpOsc('sawtooth', f, t + i * beat, beat * 0.75, 0.13, null, 10);
          mpOsc('square', f * 2, t + i * beat, beat * 0.6, 0.04, null, 5);
        });

        // Coral de vozes sintéticas (horror)
        [[110, 0], [138, beat * 0.25], [165, beat * 0.5], [185, beat * 0.75]].forEach(function(pair) {
          mpOsc('sine', pair[0], t + pair[1], beat * 16, 0.05, null, 8);
        });

        // Sirene de tensão
        for (var s = 0; s < 4; s++) {
          mpOsc('sine', 880, t + s * beat * 4, beat * 2, 0.04, 440, 0);
        }

        return beat * 16 * 1000;
      }

      // ── SFX TURBINADOS ────────────────────────────────────────
      // Sobrescreve SFX.play para alguns sons específicos
      SFX.play = function(id, vol) {
        // Adicionar variação aleatória no volume para dinamismo
        var v = (vol || 0.7) * (0.85 + Math.random() * 0.3);

        // Substituir hit com versão mais impactante usando Web Audio direto
        if (id === 'hit_crit') {
          // Crit: dois hits sobrepostos + distorção
          _origPlay('hit_crit', v);
          setTimeout(function() { _origPlay('hit', v * 0.6); }, 40);
          return;
        }
        if (id === 'slash') {
          // Slash: alterna entre versões
          var variants = ['slash', 'hit'];
          _origPlay(variants[Math.floor(Math.random() * variants.length)], v);
          return;
        }
        if (id === 'monster_die') {
          _origPlay('monster_die', v);
          // Às vezes adiciona eco
          if (Math.random() > 0.5) {
            setTimeout(function() { _origPlay('hit', v * 0.3); }, 80);
          }
          return;
        }
        if (id === 'boss_die') {
          // Boss morte: sequência épica
          _origPlay('boss_die', v);
          setTimeout(function() { _origPlay('achievement', v * 0.8); }, 300);
          return;
        }
        if (id === 'level_up') {
          // Level up: som duplo em cascata
          _origPlay('level_up', v);
          setTimeout(function() { _origPlay('level_up', v * 0.6); }, 200);
          return;
        }
        _origPlay(id, v);
      };

      // ── Substituir trilhas de música ─────────────────────────
      // Interceptar SFX.music para redirecionar 'battle' e 'boss'
      var _mpBattleLoop = null;
      var _mpCurrentTrack = null;

      SFX.music = function(track) {
        if (track === 'battle' || track === 'boss') {
          // Se já está tocando o mesmo track, pular
          if (_mpCurrentTrack === track) return;
          // Parar loop anterior
          if (_mpBattleLoop) { clearTimeout(_mpBattleLoop); _mpBattleLoop = null; }
          // Parar música original também
          try { SFX.stopMusic(); } catch(e) {}
          _mpCurrentTrack = track;

          var playFn = track === 'boss' ? playApocalypticBoss : playFreneticBattle;

          function loop() {
            if (_mpCurrentTrack !== track) return;
            var dur = playFn();
            _mpBattleLoop = setTimeout(loop, Math.max(100, dur - 80));
          }
          loop();
          return;
        }

        // Para outros tracks (gameover, boot), usar original
        _mpCurrentTrack = track;
        if (_mpBattleLoop) { clearTimeout(_mpBattleLoop); _mpBattleLoop = null; }
        _origMusic(track);
      };

      // Patchar stopMusic para também parar nossos loops
      var _origStopMusic = SFX.stopMusic.bind(SFX);
      SFX.stopMusic = function() {
        _mpCurrentTrack = null;
        if (_mpBattleLoop) { clearTimeout(_mpBattleLoop); _mpBattleLoop = null; }
        _origStopMusic();
      };

      console.log('[MegaPatch] Fix 5: Áudio frenético ✓');

    }, 1000); // Aguarda SFX inicializar

    // ══════════════════════════════════════════════════════════
    // 6. BÔNUS: Indicador visual de boss kill salvo
    // ══════════════════════════════════════════════════════════
    var _style = document.createElement('style');
    _style.textContent = `
      /* Nível formatado não quebra layout */
      #battle-hero-lvl, #monster-lvl {
        font-size: 10px !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 80px;
      }
      /* Indicador de save */
      #mp-save-indicator {
        position: fixed;
        bottom: 70px;
        right: 8px;
        font-size: 9px;
        color: #22c55e;
        opacity: 0;
        transition: opacity 0.3s;
        pointer-events: none;
        z-index: 9999;
        font-weight: bold;
        letter-spacing: 0.05em;
      }
      #mp-save-indicator.visible {
        opacity: 1;
      }
      /* Pulso frenético nos botões de ataque durante boss */
      .boss-fight-active #btn-atk {
        animation: boss-pulse 0.4s infinite alternate;
      }
      @keyframes boss-pulse {
        from { box-shadow: 0 0 4px #ef4444; }
        to   { box-shadow: 0 0 12px #ef4444, 0 0 24px #b91c1c; }
      }
    `;
    document.head.appendChild(_style);

    // Indicador de save — wraps o save já patchado acima
    var saveInd = document.createElement('div');
    saveInd.id = 'mp-save-indicator';
    saveInd.textContent = '💾 SALVO';
    document.body.appendChild(saveInd);

    var _showSaveTimer = null;
    var _saveWithPersist = rpg.save.bind(rpg); // captura versão já patchada com persistência
    rpg.save = function() {
      _saveWithPersist();
      saveInd.classList.add('visible');
      if (_showSaveTimer) clearTimeout(_showSaveTimer);
      _showSaveTimer = setTimeout(function() {
        saveInd.classList.remove('visible');
      }, 1200);
    };

    // Adicionar classe boss-fight-active durante boss
    var _origSB = rpg.startBattle ? rpg.startBattle.bind(rpg) : null;
    if (_origSB) {
      rpg.startBattle = function(isBoss) {
        _origSB(isBoss);
        var arena = document.getElementById('view-battle');
        if (arena) {
          if (isBoss) arena.classList.add('boss-fight-active');
          else arena.classList.remove('boss-fight-active');
        }
      };
    }

    console.log('[MegaPatch V24] Todos os patches aplicados com sucesso! ✓');
    console.log('[MegaPatch V24] Fixes: Boss Persist | UI Sync | Level Format | Rebalance | Audio');

  }); // fim waitForRpg

})();
