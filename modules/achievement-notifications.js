// ═══════════════════════════════════════════════════════════════
// MODULE: achievement-notifications.js  —  NOTIFICAÇÕES DE CONQUISTA
// ─────────────────────────────────────────────────────────────
// • Popup no canto com ícone + nome + recompensa
// • Slide-in/out animation
// • Fila de notificações (não se sobrepõem)
// • Som sintetizado via Web Audio API (sem assets externos)
// • Patch no checkAchievements() do rpg — 100% compatível
// • Também notifica: level up de marco, boss kill, NG+
// ═══════════════════════════════════════════════════════════════
(function AchievementNotificationsModule() {
  'use strict';

  // ── Fila de notificações ──────────────────────────────────────
  const queue   = [];
  let showing   = false;
  let audioCtx  = null;

  // ── Tipos de notificação ──────────────────────────────────────
  const NOTIF_TYPES = {
    achievement: { border:'#ffd60a', bg:'rgba(255,214,10,0.08)', icon_color:'#ffd60a', label:'CONQUISTA'  },
    boss:        { border:'#ef4444', bg:'rgba(239,68,68,0.08)',  icon_color:'#ef4444', label:'GUARDIÃO'   },
    levelup:     { border:'#00e5ff', bg:'rgba(0,229,255,0.08)',  icon_color:'#00e5ff', label:'NÍVEL'      },
    ngplus:      { border:'#a855f7', bg:'rgba(168,85,247,0.08)', icon_color:'#a855f7', label:'NG+'        },
    relic:       { border:'#fb923c', bg:'rgba(251,146,60,0.08)', icon_color:'#fb923c', label:'RELÍQUIA'   },
    journal:     { border:'#34d399', bg:'rgba(52,211,153,0.08)', icon_color:'#34d399', label:'DIÁRIO'     },
  };

  // ── Marcos de level up que disparam notificação ───────────────
  const LEVEL_MILESTONES = new Set([10,25,50,100,150,200,250,500,750,1000,1500,2000,2500,3000]);

  // ── Web Audio: sons sintetizados ──────────────────────────────
  function getAudioCtx() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
    }
    return audioCtx;
  }

  function playSound(type) {
    const ctx = getAudioCtx();
    if (!ctx) return;
    if (localStorage.getItem('rpg_sound_off') === '1') return;

    try {
      const gainNode = ctx.createGain();
      gainNode.connect(ctx.destination);
      gainNode.gain.setValueAtTime(0, ctx.currentTime);

      if (type === 'achievement') {
        // Fanfarra curta: 3 notas ascendentes
        [[523, 0, 0.12], [659, 0.12, 0.12], [784, 0.24, 0.2]].forEach(([freq, start, dur]) => {
          const osc = ctx.createOscillator();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
          osc.connect(gainNode);
          gainNode.gain.setValueAtTime(0.18, ctx.currentTime + start);
          gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
          osc.start(ctx.currentTime + start);
          osc.stop(ctx.currentTime + start + dur + 0.05);
        });
      } else if (type === 'boss') {
        // Tom grave dramático
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.4);
        osc.connect(gainNode);
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.55);
      } else if (type === 'levelup') {
        // Sweep ascendente
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.25);
        osc.connect(gainNode);
        gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.35);
      } else {
        // Ping genérico
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(660, ctx.currentTime);
        osc.connect(gainNode);
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch(e) {}
  }

  // ── Enfileira notificação ─────────────────────────────────────
  function enqueue(item) {
    queue.push(item);
    if (!showing) processQueue();
  }

  // ── Processa a fila ───────────────────────────────────────────
  function processQueue() {
    if (queue.length === 0) { showing = false; return; }
    showing = true;
    const item = queue.shift();
    showNotification(item, () => {
      setTimeout(processQueue, 200);
    });
  }

  // ── Cria e mostra uma notificação ─────────────────────────────
  function showNotification(item, onDone) {
    const cfg    = NOTIF_TYPES[item.type] || NOTIF_TYPES.achievement;
    const notif  = document.createElement('div');
    notif.className = 'ach-notif';
    notif.style.cssText = `
      border-color: ${cfg.border};
      background: ${cfg.bg};
    `;
    notif.innerHTML = `
      <div class="ach-notif-glow" style="background:${cfg.border};"></div>
      <div class="ach-notif-inner">
        <div class="ach-notif-icon-wrap" style="border-color:${cfg.border}30;background:${cfg.border}10;">
          <i data-lucide="${item.icon || 'star'}" style="width:18px;height:18px;color:${cfg.icon_color};"></i>
        </div>
        <div class="ach-notif-text">
          <div class="ach-notif-label" style="color:${cfg.border};">${cfg.label}</div>
          <div class="ach-notif-title">${item.title}</div>
          ${item.reward ? `<div class="ach-notif-reward">${item.reward}</div>` : ''}
        </div>
      </div>
    `;

    const container = getContainer();
    container.appendChild(notif);

    // Render icons
    try { lucide.createIcons({ el: notif }); } catch(e) {}

    // Slide-in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        notif.classList.add('ach-notif-visible');
      });
    });

    // Som
    playSound(item.soundType || item.type);

    // Auto-close
    const duration = item.duration || 4000;
    setTimeout(() => {
      notif.classList.remove('ach-notif-visible');
      notif.classList.add('ach-notif-out');
      setTimeout(() => {
        notif.remove();
        if (onDone) onDone();
      }, 450);
    }, duration);
  }

  // ── Container de notificações ─────────────────────────────────
  function getContainer() {
    let c = document.getElementById('ach-notif-container');
    if (!c) {
      c = document.createElement('div');
      c.id = 'ach-notif-container';
      document.body.appendChild(c);
    }
    return c;
  }

  // ── CSS ───────────────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('ach-notif-styles')) return;
    const s = document.createElement('style');
    s.id = 'ach-notif-styles';
    s.textContent = `
      #ach-notif-container {
        position: fixed;
        bottom: 90px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        gap: 8px;
        z-index: 9990;
        pointer-events: none;
        width: min(320px, 90vw);
      }

      .ach-notif {
        position: relative;
        border: 1px solid;
        border-radius: 12px;
        padding: 10px 12px;
        backdrop-filter: blur(12px);
        overflow: hidden;
        transform: translateY(30px) scale(0.92);
        opacity: 0;
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                    opacity 0.3s ease;
        pointer-events: all;
        box-shadow: 0 8px 32px rgba(0,0,0,0.6);
      }
      .ach-notif-visible {
        transform: translateY(0) scale(1);
        opacity: 1;
      }
      .ach-notif-out {
        transform: translateY(-20px) scale(0.95) !important;
        opacity: 0 !important;
        transition: transform 0.35s ease, opacity 0.3s ease !important;
      }

      /* Linha de cor lateral */
      .ach-notif-glow {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        border-radius: 12px 0 0 12px;
        opacity: 0.9;
      }

      .ach-notif-inner {
        display: flex;
        align-items: center;
        gap: 10px;
        padding-left: 6px;
      }

      .ach-notif-icon-wrap {
        width: 38px;
        height: 38px;
        border-radius: 10px;
        border: 1px solid;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .ach-notif-text {
        flex: 1;
        min-width: 0;
      }

      .ach-notif-label {
        font-family: 'Orbitron', sans-serif;
        font-size: 7px;
        font-weight: 900;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        line-height: 1;
        margin-bottom: 2px;
      }

      .ach-notif-title {
        font-family: 'Rajdhani', 'Orbitron', sans-serif;
        font-size: 13px;
        font-weight: 700;
        color: #fff;
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .ach-notif-reward {
        font-family: 'Fira Code', monospace;
        font-size: 9px;
        color: rgba(200,200,220,0.75);
        margin-top: 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* Shimmer ao aparecer */
      @keyframes achShimmer {
        0%   { transform: translateX(-100%) skewX(-20deg); }
        100% { transform: translateX(300%)  skewX(-20deg); }
      }
      .ach-notif-visible::after {
        content: '';
        position: absolute;
        top: 0; bottom: 0;
        width: 40%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
        animation: achShimmer 0.7s ease 0.1s forwards;
        pointer-events: none;
      }
    `;
    document.head.appendChild(s);
  }

  // ── API pública ───────────────────────────────────────────────
  window.showAchievementNotif = function(opts) {
    enqueue({
      type:      opts.type      || 'achievement',
      icon:      opts.icon      || 'star',
      title:     opts.title     || 'Conquista',
      reward:    opts.reward    || '',
      duration:  opts.duration  || 4000,
      soundType: opts.soundType || opts.type || 'achievement',
    });
  };

  // ── Patch: checkAchievements ──────────────────────────────────
  function patchCheckAchievements() {
    const _orig = rpg.checkAchievements;
    if (!_orig) return;

    rpg.checkAchievements = function() {
      const before = [...(this.achievementsClaimed || [])];
      _orig.apply(this, arguments);
      const after  = this.achievementsClaimed || [];

      after.filter(id => !before.includes(id)).forEach(id => {
        const ach = (this.ACHIEVEMENTS || []).find(a => a.id === id);
        if (!ach) return;
        const lang = this.lang || 'pt';
        enqueue({
          type:     'achievement',
          icon:     ach.icon || 'star',
          title:    ach.name[lang] || ach.name.pt,
          reward:   ach.reward ? (ach.reward[lang] || ach.reward.pt) : '',
          duration: 4500,
        });
      });
    };
  }

  // ── Patch: killMonster — boss kill ────────────────────────────
  function patchBossKill() {
    const _orig = rpg.killMonster;
    if (!_orig) return;

    rpg.killMonster = function() {
      const wasBoss     = this.isBossFight;
      const bossIdx     = this.bossKills;
      const oldLevel    = this.level;
      const result      = _orig.apply(this, arguments);

      // Boss kill notif
      if (wasBoss) {
        const boss = (this.actBosses || [])[bossIdx];
        const lang = this.lang || 'pt';
        setTimeout(() => {
          enqueue({
            type:    'boss',
            icon:    boss ? (boss.icon || 'skull') : 'crown',
            title:   boss ? (boss.name[lang] || boss.name.pt) : 'Guardião',
            reward:  '👑 Guardião Derrotado!',
            duration: 5000,
          });
        }, 800);
      }

      // Level up marco
      const newLevel = this.level;
      if (newLevel > oldLevel) {
        for (let lvl = oldLevel + 1; lvl <= newLevel; lvl++) {
          if (LEVEL_MILESTONES.has(lvl)) {
            setTimeout(() => {
              enqueue({
                type:    'levelup',
                icon:    'zap',
                title:   'Nível ' + lvl + ' atingido!',
                reward:  getLevelMilestoneReward(lvl),
                duration: 4000,
              });
            }, 1200);
            break;
          }
        }
      }

      return result;
    };
  }

  function getLevelMilestoneReward(lvl) {
    if (lvl >= 1000) return '✦ Transcendente — poder sem limites';
    if (lvl >= 500)  return '⚡ Lenda Viva — perto do fim';
    if (lvl >= 250)  return '🔥 Guerreiro Avançado';
    if (lvl >= 100)  return '⚔ Centurião desbloqueado';
    if (lvl >= 50)   return '🛡 Veterano do campo de batalha';
    return '🌱 O caminho continua...';
  }

  // ── Patch: NG+ ────────────────────────────────────────────────
  function patchNgPlus() {
    const _origFn = window._ngPlusV2Confirm || window._ngPlusConfirm;
    if (!_origFn) return;
    const fnName = window._ngPlusV2Confirm ? '_ngPlusV2Confirm' : '_ngPlusConfirm';
    const _orig  = window[fnName];
    window[fnName] = function() {
      const ngBefore = rpg.ngPlusActive || 0;
      _orig.apply(this, arguments);
      setTimeout(() => {
        const ngAfter = parseInt(localStorage.getItem('rpg_ng_plus') || '0');
        if (ngAfter > ngBefore) {
          enqueue({
            type:    'ngplus',
            icon:    'refresh-cw',
            title:   'NG+' + ngAfter + ' Iniciado!',
            reward:  'Inimigos mais fortes. Rewards maiores.',
            duration: 5000,
          });
        }
      }, 500);
    };
  }

  // ── Patch: diário ─────────────────────────────────────────────
  function patchJournal() {
    const _orig = rpg.checkJournalEntries;
    if (!_orig) return;
    rpg.checkJournalEntries = function() {
      const before = (this.heroJournal || []).length;
      _orig.apply(this, arguments);
      const after  = (this.heroJournal || []).length;
      if (after > before) {
        setTimeout(() => {
          enqueue({
            type:    'journal',
            icon:    'book-open',
            title:   'Nova entrada no Diário',
            reward:  '"' + ((this.heroJournal[0] && this.heroJournal[0].text) ? (this.heroJournal[0].text[this.lang || 'pt'] || '').slice(0, 45) + '...' : '') + '"',
            duration: 4000,
          });
        }, 800);
      }
    };
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    injectStyles();
    patchCheckAchievements();
    patchBossKill();
    patchJournal();
    setTimeout(patchNgPlus, 500); // NG+ pode carregar depois

    console.log('[AchievementNotificationsModule] OK — fila, sons Web Audio, patches aplicados');
  }

  function waitForRpg(cb, n) {
    if (typeof rpg !== 'undefined' && rpg.checkAchievements && rpg.killMonster) cb();
    else if ((n || 0) < 40) setTimeout(() => waitForRpg(cb, (n || 0) + 1), 200);
  }

  waitForRpg(init);
})();
