// ═══════════════════════════════════════════════════════════════
// MODULE: sound-system.js  —  SISTEMA DE SOM COMPLETO
// ─────────────────────────────────────────────────────────────
// Síntese 100% via Web Audio API — zero arquivos externos.
// Sons gerados proceduralmente: combate, boss, menu, boot, game over,
// level-up, cura, parry, morte, skill, etc.
//
// API pública:
//   SFX.play('hit')          — toca um efeito sonoro
//   SFX.music('battle')      — inicia trilha de fundo em loop
//   SFX.stopMusic()          — para a trilha atual
//   SFX.setVolume(0.0–1.0)   — volume master
//   SFX.toggle()             — liga/desliga tudo
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── Contexto de audio (criado na primeira interação do usuário) ──
  let ctx = null;
  let masterGain = null;
  let _volume = 0.45;
  let _enabled = true;
  let _musicNode = null;       // nó da trilha atual
  let _musicLoopId = null;     // setTimeout do loop
  let _currentTrack = null;

  function getCtx() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = ctx.createGain();
      masterGain.gain.value = _volume;
      masterGain.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  // ── Utilitários de síntese ──────────────────────────────────

  function osc(type, freq, startTime, duration, gainVal, dest, options = {}) {
    const c = getCtx();
    const g = c.createGain();
    g.gain.setValueAtTime(gainVal, startTime);
    if (options.attack) {
      g.gain.setValueAtTime(0, startTime);
      g.gain.linearRampToValueAtTime(gainVal, startTime + options.attack);
    }
    if (options.decay) {
      g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    } else {
      g.gain.setValueAtTime(gainVal, startTime + duration * 0.8);
      g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    }
    g.connect(dest || masterGain);

    const o = c.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, startTime);
    if (options.freqEnd) o.frequency.exponentialRampToValueAtTime(options.freqEnd, startTime + duration);
    if (options.vibrato) {
      const lfo = c.createOscillator();
      const lfoG = c.createGain();
      lfo.frequency.value = options.vibrato.rate || 5;
      lfoG.gain.value = options.vibrato.depth || 8;
      lfo.connect(lfoG); lfoG.connect(o.frequency);
      lfo.start(startTime); lfo.stop(startTime + duration);
    }
    o.connect(g);
    o.start(startTime);
    o.stop(startTime + duration + 0.05);
    return { osc: o, gain: g };
  }

  function noise(duration, gainVal, startTime, dest, options = {}) {
    const c = getCtx();
    const bufSize = Math.floor(c.sampleRate * duration);
    const buffer = c.createBuffer(1, bufSize, c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;

    const source = c.createBufferSource();
    source.buffer = buffer;

    const g = c.createGain();
    g.gain.setValueAtTime(gainVal, startTime);
    g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    let chain = source;
    if (options.filter) {
      const f = c.createBiquadFilter();
      f.type = options.filter.type || 'bandpass';
      f.frequency.value = options.filter.freq || 1000;
      f.Q.value = options.filter.Q || 1;
      source.connect(f); f.connect(g);
    } else {
      source.connect(g);
    }
    g.connect(dest || masterGain);
    source.start(startTime);
    return source;
  }

  function reverb(wetLevel) {
    const c = getCtx();
    const convolver = c.createConvolver();
    const len = c.sampleRate * 1.5;
    const buf = c.createBuffer(2, len, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2);
    }
    convolver.buffer = buf;
    const wet = c.createGain(); wet.gain.value = wetLevel;
    const dry = c.createGain(); dry.gain.value = 1 - wetLevel;
    convolver.connect(wet); wet.connect(masterGain);
    return { convolver, wet, dry };
  }

  // ── Definição de efeitos sonoros ──────────────────────────

  const SFX_DEFS = {

    // ── Combate ──
    hit: (t) => {
      osc('sawtooth', 180, t, 0.08, 0.35, null, { freqEnd: 80, decay: true });
      noise(0.06, 0.2, t, null, { filter: { type: 'highpass', freq: 2000, Q: 0.5 } });
    },

    hit_crit: (t) => {
      osc('square', 260, t, 0.05, 0.4, null, { freqEnd: 520, decay: true });
      osc('sawtooth', 130, t + 0.02, 0.12, 0.5, null, { freqEnd: 60, decay: true });
      noise(0.1, 0.3, t, null, { filter: { type: 'bandpass', freq: 3000, Q: 2 } });
    },

    hit_magic: (t) => {
      osc('sine', 440, t, 0.05, 0.3, null, { freqEnd: 880, decay: true });
      osc('triangle', 660, t + 0.03, 0.18, 0.25, null, { freqEnd: 220, decay: true, vibrato: { rate: 8, depth: 15 } });
      noise(0.08, 0.1, t, null, { filter: { type: 'bandpass', freq: 5000, Q: 3 } });
    },

    slash: (t) => {
      noise(0.15, 0.4, t, null, { filter: { type: 'bandpass', freq: 800, Q: 0.8 } });
      osc('sawtooth', 200, t, 0.1, 0.2, null, { freqEnd: 50, decay: true });
    },

    block: (t) => {
      osc('square', 120, t, 0.12, 0.5, null, { freqEnd: 80, decay: true });
      noise(0.08, 0.35, t, null, { filter: { type: 'lowpass', freq: 600, Q: 1 } });
    },

    parry: (t) => {
      // Metallic clang + ascending sparkle
      osc('square', 300, t, 0.04, 0.6, null, { freqEnd: 600, decay: true });
      osc('sine', 880, t + 0.03, 0.2, 0.4, null, { freqEnd: 1320, decay: true });
      osc('sine', 1320, t + 0.06, 0.15, 0.3, null, { freqEnd: 1760, decay: true });
      noise(0.05, 0.2, t, null, { filter: { type: 'highpass', freq: 4000, Q: 2 } });
    },

    dodge: (t) => {
      noise(0.12, 0.2, t, null, { filter: { type: 'bandpass', freq: 400, Q: 0.5 } });
      osc('sine', 350, t, 0.08, 0.15, null, { freqEnd: 700, decay: true });
    },

    heal: (t) => {
      [523, 659, 784, 1047].forEach((f, i) => {
        osc('sine', f, t + i * 0.07, 0.35, 0.22 - i * 0.02, null, { attack: 0.02, decay: true, vibrato: { rate: 6, depth: 5 } });
      });
    },

    skill_atk: (t) => {
      osc('sawtooth', 110, t, 0.06, 0.5, null, { freqEnd: 220, decay: true });
      osc('square', 220, t + 0.02, 0.12, 0.35, null, { freqEnd: 55, decay: true });
      noise(0.1, 0.3, t, null, { filter: { type: 'bandpass', freq: 1200, Q: 1 } });
    },

    skill_mag: (t) => {
      [330, 440, 550, 660, 880].forEach((f, i) => {
        osc('sine', f, t + i * 0.04, 0.3, 0.28 - i * 0.03, null, { attack: 0.01, decay: true });
      });
      noise(0.2, 0.15, t, null, { filter: { type: 'bandpass', freq: 8000, Q: 4 } });
    },

    skill_def: (t) => {
      osc('square', 80, t, 0.2, 0.6, null, { freqEnd: 60, decay: true });
      osc('sine', 160, t, 0.15, 0.3, null, { freqEnd: 80, decay: true });
      noise(0.1, 0.2, t, null, { filter: { type: 'lowpass', freq: 300, Q: 1 } });
    },

    ultimate: (t) => {
      // Buildup + explosion
      osc('sawtooth', 55, t, 0.4, 0.7, null, { freqEnd: 220, decay: true });
      osc('square', 110, t + 0.1, 0.35, 0.6, null, { freqEnd: 440, decay: true });
      osc('sine', 220, t + 0.2, 0.3, 0.5, null, { freqEnd: 880, decay: true });
      noise(0.4, 0.6, t + 0.2, null, { filter: { type: 'lowpass', freq: 1500, Q: 0.5 } });
      noise(0.3, 0.4, t + 0.25, null, { filter: { type: 'highpass', freq: 3000, Q: 1 } });
    },

    // ── Monstro ──
    monster_hit: (t) => {
      osc('sawtooth', 90, t, 0.1, 0.4, null, { freqEnd: 45, decay: true });
      noise(0.08, 0.25, t, null, { filter: { type: 'lowpass', freq: 400, Q: 0.8 } });
    },

    monster_die: (t) => {
      osc('sawtooth', 160, t, 0.06, 0.5, null, { freqEnd: 40, decay: true });
      osc('square', 80, t + 0.05, 0.2, 0.4, null, { freqEnd: 20, decay: true });
      noise(0.25, 0.5, t, null, { filter: { type: 'lowpass', freq: 800, Q: 1 } });
    },

    // ── Boss ──
    boss_appear: (t) => {
      // Dramatic low rumble + ascending horns
      noise(0.8, 0.7, t, null, { filter: { type: 'lowpass', freq: 200, Q: 2 } });
      [55, 82, 110].forEach((f, i) => {
        osc('sawtooth', f, t + i * 0.15, 0.9 - i * 0.1, 0.4 - i * 0.05, null, { attack: 0.08, decay: true });
      });
      [220, 277, 330].forEach((f, i) => {
        osc('square', f, t + 0.5 + i * 0.1, 0.6, 0.25, null, { attack: 0.05, decay: true, vibrato: { rate: 3, depth: 6 } });
      });
      osc('sine', 55, t, 1.2, 0.8, null, { freqEnd: 28, decay: true });
    },

    boss_hit: (t) => {
      osc('sawtooth', 55, t, 0.15, 0.7, null, { freqEnd: 28, decay: true });
      osc('square', 110, t + 0.02, 0.12, 0.5, null, { freqEnd: 55, decay: true });
      noise(0.12, 0.5, t, null, { filter: { type: 'bandpass', freq: 300, Q: 0.8 } });
    },

    boss_attack: (t) => {
      noise(0.3, 0.7, t, null, { filter: { type: 'lowpass', freq: 500, Q: 1 } });
      osc('sawtooth', 70, t, 0.25, 0.65, null, { freqEnd: 30, decay: true });
      osc('square', 140, t + 0.05, 0.2, 0.5, null, { freqEnd: 35, decay: true });
    },

    boss_die: (t) => {
      // Epic death: descending fanfare + explosion
      noise(1.0, 0.8, t, null, { filter: { type: 'lowpass', freq: 1000, Q: 0.5 } });
      [440, 392, 330, 294, 220, 165, 110, 55].forEach((f, i) => {
        osc('sawtooth', f, t + i * 0.1, 0.5, 0.5 - i * 0.03, null, { decay: true });
      });
      osc('sine', 880, t, 0.2, 0.3, null, { freqEnd: 110, decay: true });
      noise(0.5, 0.5, t + 0.4, null, { filter: { type: 'bandpass', freq: 4000, Q: 3 } });
    },

    boss_roar: (t) => {
      noise(0.6, 0.8, t, null, { filter: { type: 'bandpass', freq: 120, Q: 0.4 } });
      osc('sawtooth', 40, t, 0.5, 0.7, null, { freqEnd: 80, decay: true, vibrato: { rate: 2, depth: 20 } });
      osc('sawtooth', 60, t + 0.1, 0.4, 0.5, null, { freqEnd: 30, decay: true });
    },

    // ── Progressão ──
    level_up: (t) => {
      const scale = [523, 659, 784, 1047, 1319, 1568];
      scale.forEach((f, i) => {
        osc('sine', f, t + i * 0.08, 0.5, 0.3 - i * 0.02, null, { attack: 0.01, decay: true });
        osc('triangle', f * 1.5, t + i * 0.08, 0.3, 0.15, null, { attack: 0.01, decay: true });
      });
    },

    prestige: (t) => {
      // Heavenly ascending arpeggio
      const notes = [261, 329, 392, 523, 659, 784, 1047, 1319, 1568, 2093];
      notes.forEach((f, i) => {
        osc('sine', f, t + i * 0.06, 0.4, 0.35, null, { attack: 0.01, decay: true, vibrato: { rate: 6, depth: 8 } });
        osc('triangle', f * 2, t + i * 0.06, 0.25, 0.2, null, { decay: true });
      });
      noise(0.5, 0.2, t + 0.3, null, { filter: { type: 'highpass', freq: 5000, Q: 4 } });
    },

    gold_pickup: (t) => {
      [880, 1100, 1320].forEach((f, i) => {
        osc('sine', f, t + i * 0.05, 0.18, 0.25, null, { attack: 0.01, decay: true });
      });
    },

    item_get: (t) => {
      [523, 784, 1047].forEach((f, i) => {
        osc('triangle', f, t + i * 0.07, 0.3, 0.3, null, { attack: 0.02, decay: true });
      });
    },

    item_legendary: (t) => {
      [392, 523, 659, 784, 1047, 784, 659, 523, 392].forEach((f, i) => {
        osc('sine', f, t + i * 0.05, 0.3, 0.35, null, { attack: 0.01, decay: true, vibrato: { rate: 5, depth: 6 } });
      });
      noise(0.3, 0.2, t + 0.1, null, { filter: { type: 'highpass', freq: 6000, Q: 5 } });
    },

    // ── Menu / UI ──
    menu_select: (t) => {
      osc('sine', 660, t, 0.07, 0.15, null, { decay: true });
      osc('sine', 880, t + 0.04, 0.06, 0.1, null, { decay: true });
    },

    menu_back: (t) => {
      osc('sine', 440, t, 0.07, 0.12, null, { decay: true });
      osc('sine', 330, t + 0.04, 0.06, 0.08, null, { decay: true });
    },

    menu_hover: (t) => {
      osc('sine', 880, t, 0.04, 0.08, null, { decay: true });
    },

    achievement: (t) => {
      [523, 659, 784, 1047, 1047].forEach((f, i) => {
        osc('sine', f, t + i * 0.09, 0.45, 0.3 - i * 0.02, null, { attack: 0.01, decay: true });
      });
      noise(0.15, 0.15, t + 0.2, null, { filter: { type: 'highpass', freq: 7000, Q: 5 } });
    },

    // ── Boot / Game Over ──
    boot: (t) => {
      // Sistema iniciando: glitch + tune
      noise(0.05, 0.3, t, null, { filter: { type: 'bandpass', freq: 2000, Q: 3 } });
      noise(0.05, 0.3, t + 0.07, null, { filter: { type: 'bandpass', freq: 4000, Q: 3 } });
      noise(0.05, 0.2, t + 0.14, null, { filter: { type: 'bandpass', freq: 1000, Q: 3 } });
      [330, 415, 494, 659].forEach((f, i) => {
        osc('square', f, t + 0.3 + i * 0.1, 0.2, 0.25, null, { attack: 0.01, decay: true });
      });
      osc('sine', 880, t + 0.75, 0.4, 0.3, null, { attack: 0.05, decay: true, vibrato: { rate: 4, depth: 10 } });
    },

    game_over: (t) => {
      // Descending doom sequence
      [440, 392, 349, 311, 277, 247, 220, 196].forEach((f, i) => {
        osc('sawtooth', f, t + i * 0.18, 0.6, 0.4, null, { attack: 0.05, decay: true, vibrato: { rate: 3, depth: 4 } });
        osc('square', f * 0.5, t + i * 0.18, 0.4, 0.2, null, { decay: true });
      });
      noise(1.2, 0.15, t, null, { filter: { type: 'lowpass', freq: 300, Q: 0.5 } });
    },

    hero_death: (t) => {
      osc('sawtooth', 220, t, 0.08, 0.5, null, { freqEnd: 55, decay: true });
      osc('sine', 440, t, 0.1, 0.3, null, { freqEnd: 110, decay: true });
      noise(0.5, 0.4, t, null, { filter: { type: 'lowpass', freq: 600, Q: 1 } });
      osc('sine', 55, t + 0.1, 1.0, 0.6, null, { freqEnd: 28, decay: true });
    },

    // ── Especiais ──
    wave_start: (t) => {
      noise(0.3, 0.5, t, null, { filter: { type: 'bandpass', freq: 200, Q: 0.5 } });
      [110, 138, 165, 220].forEach((f, i) => {
        osc('square', f, t + i * 0.08, 0.4, 0.4, null, { attack: 0.02, decay: true });
      });
    },

    dungeon_complete: (t) => {
      const fanfare = [523, 523, 659, 523, 784, 740, 784];
      fanfare.forEach((f, i) => {
        osc('square', f, t + i * 0.12, 0.35, 0.4, null, { attack: 0.01, decay: true });
        osc('sine', f * 2, t + i * 0.12, 0.2, 0.15, null, { attack: 0.01, decay: true });
      });
    },

    ng_plus: (t) => {
      // Portal/dimensional sound
      noise(0.5, 0.4, t, null, { filter: { type: 'bandpass', freq: 600, Q: 2 } });
      [55, 110, 220, 440, 880, 1760].forEach((f, i) => {
        osc('sine', f, t + i * 0.05, 0.3 + i * 0.05, 0.3, null, { decay: true, vibrato: { rate: 8, depth: 20 } });
      });
      noise(0.4, 0.3, t + 0.4, null, { filter: { type: 'highpass', freq: 3000, Q: 3 } });
    },

    save: (t) => {
      osc('sine', 523, t, 0.06, 0.18, null, { decay: true });
      osc('sine', 659, t + 0.05, 0.06, 0.15, null, { decay: true });
    },
  };

  // ── Trilhas de fundo (loops procedurais) ────────────────────

  const MUSIC_TRACKS = {

    menu: () => {
      // Atmospheric fantasy — arpeggios lentos + pad
      const c = getCtx();
      const t = c.currentTime;
      const bpm = 72;
      const beat = 60 / bpm;

      const chords = [
        [261, 329, 392, 523],   // C major
        [220, 277, 330, 440],   // A minor
        [196, 247, 294, 392],   // G major
        [174, 220, 261, 349],   // F major
      ];

      let time = t + 0.1;
      chords.forEach(chord => {
        // Pad
        chord.forEach(f => {
          osc('sine', f, time, beat * 3.9, 0.06, null, { attack: 0.3, decay: true, vibrato: { rate: 4, depth: 3 } });
          osc('triangle', f * 2, time, beat * 3.8, 0.03, null, { attack: 0.4, decay: true });
        });
        // Arpeggio
        chord.forEach((f, i) => {
          osc('triangle', f * 2, time + i * beat * 0.5, beat * 0.45, 0.08, null, { attack: 0.02, decay: true });
        });
        time += beat * 4;
      });

      return beat * 4 * chords.length * 1000;
    },

    battle: () => {
      const c = getCtx();
      const t = c.currentTime;
      const bpm = 145;
      const beat = 60 / bpm;

      // Percussão
      for (let b = 0; b < 8; b++) {
        const bt = t + b * beat;
        // Kick
        osc('sine', 80, bt, 0.12, 0.5, null, { freqEnd: 28, decay: true });
        // Snare
        if (b % 2 === 1) {
          noise(0.09, 0.35, bt, null, { filter: { type: 'highpass', freq: 1500, Q: 0.8 } });
          osc('sine', 180, bt, 0.06, 0.3, null, { freqEnd: 60, decay: true });
        }
        // Hi-hat
        noise(0.04, 0.12, bt, null, { filter: { type: 'highpass', freq: 8000, Q: 2 } });
        noise(0.04, 0.1, bt + beat * 0.5, null, { filter: { type: 'highpass', freq: 8000, Q: 2 } });
      }

      // Riff de baixo
      const riff = [110, 110, 138, 110, 92, 110, 138, 165];
      riff.forEach((f, i) => {
        osc('sawtooth', f, t + i * beat, beat * 0.85, 0.12, null, { attack: 0.01, decay: true });
      });

      // Melodia
      const mel = [330, 349, 392, 440, 392, 349, 330, 294];
      mel.forEach((f, i) => {
        osc('square', f, t + i * beat, beat * 0.7, 0.07, null, { attack: 0.01, decay: true });
      });

      return beat * 8 * 1000;
    },

    boss: () => {
      const c = getCtx();
      const t = c.currentTime;
      const bpm = 160;
      const beat = 60 / bpm;

      // Heavy percussion
      for (let b = 0; b < 8; b++) {
        const bt = t + b * beat;
        // Double kick pattern
        osc('sine', 60, bt, 0.1, 0.7, null, { freqEnd: 22, decay: true });
        if (b % 4 === 1 || b % 4 === 2) {
          osc('sine', 60, bt + beat * 0.5, 0.08, 0.6, null, { freqEnd: 22, decay: true });
        }
        // Snare
        if (b % 2 === 1) {
          noise(0.1, 0.5, bt, null, { filter: { type: 'bandpass', freq: 1000, Q: 0.7 } });
          osc('sine', 150, bt, 0.07, 0.4, null, { freqEnd: 50, decay: true });
        }
        // Open hi-hat
        if (b % 4 === 3) noise(0.18, 0.18, bt, null, { filter: { type: 'highpass', freq: 6000, Q: 1.5 } });
        else noise(0.04, 0.12, bt, null, { filter: { type: 'highpass', freq: 9000, Q: 3 } });
      }

      // Ominous bass
      const bass = [55, 55, 65, 55, 49, 55, 65, 73];
      bass.forEach((f, i) => {
        osc('sawtooth', f, t + i * beat, beat * 0.9, 0.18, null, { attack: 0.01, decay: true });
        osc('square', f * 2, t + i * beat, beat * 0.8, 0.06, null, { attack: 0.01, decay: true });
      });

      // Dark melody
      const mel = [220, 208, 196, 185, 196, 208, 185, 174];
      mel.forEach((f, i) => {
        osc('sawtooth', f, t + i * beat, beat * 0.75, 0.1, null, { attack: 0.02, decay: true, vibrato: { rate: 5, depth: 8 } });
      });

      // Choir-like pad
      [110, 138, 165].forEach(f => {
        osc('sine', f, t, beat * 8, 0.04, null, { attack: 1.0, decay: true, vibrato: { rate: 3, depth: 4 } });
      });

      return beat * 8 * 1000;
    },

    gameover: () => {
      const c = getCtx();
      const t = c.currentTime;
      const beat = 0.7;

      // Slow mournful melody
      const mel = [220, 208, 196, 174, 165, 174, 196, 220];
      mel.forEach((f, i) => {
        osc('sine', f, t + i * beat, beat * 0.9, 0.12, null, { attack: 0.15, decay: true, vibrato: { rate: 3, depth: 5 } });
        osc('triangle', f * 0.5, t + i * beat, beat * 0.85, 0.06, null, { attack: 0.2, decay: true });
      });

      // Low drone
      osc('sine', 55, t, beat * 8, 0.07, null, { attack: 0.5, decay: true });
      noise(beat * 8, 0.04, t, null, { filter: { type: 'lowpass', freq: 150, Q: 0.5 } });

      return beat * 8 * 1000;
    },

    boot: () => {
      const c = getCtx();
      const t = c.currentTime;

      // Glitchy intro sequence
      [0, 0.08, 0.16, 0.28].forEach(dt => {
        noise(0.05, 0.2, t + dt, null, { filter: { type: 'bandpass', freq: 800 + dt * 5000, Q: 4 } });
      });

      // Boot melody
      const notes = [262, 294, 330, 349, 392, 440, 494, 523];
      notes.forEach((f, i) => {
        osc('square', f, t + 0.5 + i * 0.1, 0.18, 0.2, null, { attack: 0.01, decay: true });
      });

      osc('sine', 523, t + 1.4, 0.5, 0.25, null, { attack: 0.05, decay: true, vibrato: { rate: 5, depth: 8 } });

      return 2500;
    },
  };

  // ── Gerenciador principal ────────────────────────────────────

  const SFX = {
    play(name, vol = 1.0) {
      if (!_enabled) return;
      try {
        const fn = SFX_DEFS[name];
        if (!fn) return;
        const c = getCtx();
        // Salvar gain atual e aplicar vol relativo
        const prev = masterGain.gain.value;
        masterGain.gain.setValueAtTime(prev * vol, c.currentTime);
        fn(c.currentTime);
        masterGain.gain.setValueAtTime(prev, c.currentTime + 0.05);
      } catch (e) { /* silently fail */ }
    },

    music(track) {
      if (!_enabled) return;
      if (_currentTrack === track) return;
      this.stopMusic();
      _currentTrack = track;
      const fn = MUSIC_TRACKS[track];
      if (!fn) return;

      const loop = () => {
        if (!_enabled || _currentTrack !== track) return;
        try {
          const duration = fn();
          _musicLoopId = setTimeout(loop, Math.max(100, duration - 50));
        } catch (e) {}
      };
      loop();
    },

    stopMusic() {
      if (_musicLoopId) { clearTimeout(_musicLoopId); _musicLoopId = null; }
      _currentTrack = null;
    },

    setVolume(v) {
      _volume = Math.max(0, Math.min(1, v));
      if (masterGain) masterGain.gain.setValueAtTime(_volume, getCtx().currentTime);
    },

    toggle() {
      _enabled = !_enabled;
      if (!_enabled) this.stopMusic();
      return _enabled;
    },

    isEnabled() { return _enabled; },
  };

  window.SFX = SFX;

  // ── Hooks no jogo ────────────────────────────────────────────

  function hookGame() {
    if (typeof rpg === 'undefined') {
      setTimeout(hookGame, 500);
      return;
    }

    // ── Combate ──
    const _origDeal = rpg.dealDamageToMonster.bind(rpg);
    rpg.dealDamageToMonster = function(baseDmg, atkType, isUltimate) {
      if (isUltimate)         SFX.play('ultimate', 0.9);
      else if (atkType === 'mag') SFX.play('hit_magic', 0.8);
      else                    SFX.play('slash', 0.7);
      return _origDeal(baseDmg, atkType, isUltimate);
    };

    const _origShowDmg = rpg.showDamage.bind(rpg);
    rpg.showDamage = function(text, type) {
      if (type === 'crit')          SFX.play('hit_crit', 0.85);
      else if (type === 'dmg-parry') SFX.play('parry', 0.9);
      else if (type === 'dodge' || type === 'monster-dodge') SFX.play('dodge', 0.6);
      else if (type === 'heal')     SFX.play('heal', 0.7);
      else if (type === 'hero')     SFX.play('monster_hit', 0.6);
      else if (type === 'monster')  SFX.play('hit', 0.65);
      else if (type === 'monster-block') SFX.play('block', 0.7);
      return _origShowDmg(text, type);
    };

    const _origKill = rpg.killMonster.bind(rpg);
    rpg.killMonster = function() {
      if (this.isBossFight) SFX.play('boss_die', 0.95);
      else                  SFX.play('monster_die', 0.75);
      return _origKill();
    };

    const _origSpawn = rpg.spawnMonster.bind(rpg);
    rpg.spawnMonster = function() {
      const result = _origSpawn();
      if (this.isBossFight) {
        SFX.play('boss_appear', 1.0);
        setTimeout(() => SFX.music('boss'), 400);
      } else {
        if (_currentTrack !== 'battle') SFX.music('battle');
      }
      return result;
    };

    const _origMonsterAtk = rpg.executeMonsterAttack.bind(rpg);
    rpg.executeMonsterAttack = function() {
      if (this.isBossFight) SFX.play('boss_attack', 0.8);
      return _origMonsterAtk();
    };

    const _origDie = rpg.die.bind(rpg);
    rpg.die = function() {
      SFX.stopMusic();
      SFX.play('hero_death', 1.0);
      setTimeout(() => {
        SFX.play('game_over', 0.9);
        SFX.music('gameover');
      }, 800);
      return _origDie();
    };

    // ── Skills ──
    const _origSkill = rpg.useSkill.bind(rpg);
    rpg.useSkill = function(id) {
      const soundMap = { atk: 'skill_atk', mag: 'skill_mag', def: 'skill_def', heal: 'heal' };
      if (soundMap[id]) SFX.play(soundMap[id], 0.75);
      return _origSkill(id);
    };

    // ── Level up ──
    const _origLevelUp = rpg.levelUp || null;
    if (_origLevelUp) {
      rpg.levelUp = function() {
        SFX.play('level_up', 0.9);
        return _origLevelUp.apply(this, arguments);
      };
    }

    // Detectar level-up via showToast (fallback)
    const _origToast = window.showToast;
    if (_origToast) {
      window.showToast = function(msg, dur) {
        const m = typeof msg === 'string' ? msg : '';
        if (m.includes('Level') && m.includes('UP') || m.includes('Nível'))
          SFX.play('level_up', 0.9);
        else if (m.includes('Prestígio') || m.includes('Prestige'))
          SFX.play('prestige', 1.0);
        else if (m.includes('Conquista') || m.includes('Achievement'))
          SFX.play('achievement', 0.9);
        else if (m.includes('Dungeon') && (m.includes('Completa') || m.includes('Complete')))
          SFX.play('dungeon_complete', 0.95);
        else if (m.includes('NG+') || m.includes('New Game+'))
          SFX.play('ng_plus', 1.0);
        else if (m.includes('💰') || m.includes('ouro') || m.includes('gold'))
          SFX.play('gold_pickup', 0.5);
        else if (m.includes('Onda') || m.includes('Wave'))
          SFX.play('wave_start', 0.8);
        return _origToast(msg, dur);
      };
    }

    // ── Save ──
    const _origSave = rpg.save?.bind(rpg);
    if (_origSave) {
      rpg.save = function() {
        SFX.play('save', 0.4);
        return _origSave();
      };
    }

    // ── Navegação ──
    const _origNav = window.navTo;
    window.navTo = function(view, isBoss) {
      if (view === 'menu') {
        setTimeout(() => {
          if (_currentTrack !== 'menu') SFX.music('menu');
        }, 300);
      } else if (view === 'battle') {
        // Music handled by spawnMonster hook
      }
      return _origNav(view, isBoss);
    };

    // Sons de UI nos botões principais
    document.addEventListener('click', function(e) {
      const btn = e.target.closest('button, [onclick]');
      if (!btn) return;
      const text = btn.textContent || '';
      if (btn.id === 'btn-atk' || btn.id === 'btn-mag' || btn.id === 'btn-def' || btn.id === 'btn-heal') return; // handled by useSkill
      SFX.play('menu_select', 0.3);
    }, { passive: true });

    console.log('[SoundSystem] Hooks instalados ✓');
  }

  // ── Som de boot ──
  function playBoot() {
    if (!_enabled) return;
    try {
      SFX.play('boot', 0.8);
      setTimeout(() => SFX.music('menu'), 1200);
    } catch (e) {}
  }

  // ── Botão de controle de volume (injeta na UI) ──
  function injectVolumeButton() {
    if (document.getElementById('sfx-toggle-btn')) return;

    const btn = document.createElement('button');
    btn.id = 'sfx-toggle-btn';
    btn.title = 'Som ligado/desligado';
    btn.innerHTML = '🔊';
    btn.style.cssText = `
      position: fixed; bottom: 72px; right: 12px; z-index: 9999;
      width: 36px; height: 36px; border-radius: 50%;
      background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.15);
      color: white; font-size: 16px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s; backdrop-filter: blur(4px);
    `;

    // Volume slider
    const slider = document.createElement('input');
    slider.type = 'range'; slider.min = 0; slider.max = 100; slider.value = Math.round(_volume * 100);
    slider.title = 'Volume';
    slider.style.cssText = `
      position: fixed; bottom: 112px; right: 6px; z-index: 9998;
      width: 48px; writing-mode: vertical-lr; direction: rtl;
      appearance: slider-vertical; -webkit-appearance: slider-vertical;
      opacity: 0; transition: opacity 0.2s; pointer-events: none;
      accent-color: #c9a84c;
    `;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const enabled = SFX.toggle();
      btn.innerHTML = enabled ? '🔊' : '🔇';
      btn.style.opacity = enabled ? '1' : '0.5';
      slider.style.pointerEvents = enabled ? 'auto' : 'none';
      if (enabled) SFX.music('menu');
    });

    btn.addEventListener('mouseenter', () => { slider.style.opacity = '0.9'; slider.style.pointerEvents = _enabled ? 'auto' : 'none'; });
    btn.addEventListener('mouseleave', () => { setTimeout(() => { slider.style.opacity = '0'; }, 600); });

    slider.addEventListener('input', () => {
      SFX.setVolume(slider.value / 100);
    });

    document.body.appendChild(slider);
    document.body.appendChild(btn);
  }

  // ── Inicialização ──────────────────────────────────────────

  // Aguarda interação do usuário para criar AudioContext (política do browser)
  function init() {
    document.removeEventListener('click', init);
    document.removeEventListener('keydown', init);
    document.removeEventListener('touchstart', init);
    try {
      getCtx();
      playBoot();
      hookGame();
      injectVolumeButton();
    } catch (e) {
      console.warn('[SoundSystem] init error:', e);
    }
  }

  document.addEventListener('click', init, { once: true });
  document.addEventListener('keydown', init, { once: true });
  document.addEventListener('touchstart', init, { once: true, passive: true });

  // Tenta inicializar logo se o contexto já estiver disponível
  setTimeout(() => {
    if (!ctx) {
      try { getCtx(); hookGame(); injectVolumeButton(); } catch(e) {}
    }
  }, 2000);

})();
