// ═══════════════════════════════════════════════════════════════
// MODULE: quest-tracker.js  — Tracker de Missões (HUD Lateral)
// • Mini-painel fixo com as missões diárias ativas
// • Mostra progresso em tempo real durante o combate
// • Botão toggle para mostrar/esconder
// • Notificação quando missão completa
// ═══════════════════════════════════════════════════════════════
(function QuestTrackerModule() {
  'use strict';

  let trackerVisible = false;
  let updateInterval = null;

  // ── 1. Cria o painel do tracker ─────────────────────────────
  function createTracker() {
    if (document.getElementById('quest-tracker-panel')) return;

    const panel = document.createElement('div');
    panel.id = 'quest-tracker-panel';
    panel.innerHTML = `
      <div id="quest-tracker-header">
        <span style="font-family:'Orbitron',sans-serif;font-size:8px;letter-spacing:0.1em;font-weight:900;color:#00e5ff;">📋 MISSÕES</span>
        <button id="quest-tracker-close" onclick="window.toggleQuestTracker()">✕</button>
      </div>
      <div id="quest-tracker-body"></div>
    `;
    document.body.appendChild(panel);

    // Botão toggle flutuante
    const toggle = document.createElement('button');
    toggle.id = 'quest-tracker-toggle';
    toggle.onclick = window.toggleQuestTracker;
    toggle.innerHTML = '📋';
    toggle.title = 'Missões Ativas';
    document.body.appendChild(toggle);

    injectTrackerStyles();
    renderTracker();
    startTrackerUpdates();
  }

  // ── 2. Toggle visibilidade ───────────────────────────────────
  window.toggleQuestTracker = function() {
    const panel = document.getElementById('quest-tracker-panel');
    if (!panel) return;
    trackerVisible = !trackerVisible;
    panel.classList.toggle('visible', trackerVisible);
  };

  // ── 3. Renderiza as missões ──────────────────────────────────
  function renderTracker() {
    const body = document.getElementById('quest-tracker-body');
    if (!body || typeof rpg === 'undefined') return;

    const missions = getActiveMissions();

    if (missions.length === 0) {
      body.innerHTML = `<p style="color:rgba(150,150,170,0.7);font-size:9px;text-align:center;padding:8px;">Nenhuma missão ativa</p>`;
      return;
    }

    body.innerHTML = missions.map(m => {
      const pct = Math.min((m.current / m.target) * 100, 100);
      const done = m.current >= m.target;
      return `
        <div class="qt-mission ${done ? 'qt-done' : ''}">
          <div class="qt-name">${done ? '✅' : '▶'} ${m.label}</div>
          <div class="qt-bar-track">
            <div class="qt-bar" style="width:${pct}%;${done ? 'background:#34d399;' : ''}"></div>
          </div>
          <div class="qt-progress">${m.current}/${m.target}</div>
        </div>
      `;
    }).join('');
  }

  // ── 4. Coleta missões ativas do rpg ─────────────────────────
  function getActiveMissions() {
    if (typeof rpg === 'undefined') return [];

    const missions = [];

    // Missões diárias
    if (rpg.dailyMissions && Array.isArray(rpg.dailyMissions)) {
      rpg.dailyMissions.forEach((m, i) => {
        if (rpg.dailyCompleted && rpg.dailyCompleted.includes(i)) return;
        const lang = rpg.lang || 'pt';
        missions.push({
          label:   m.label ? (m.label[lang] || m.label) : 'Missão ' + (i + 1),
          current: m.current || rpg[m.stat] || 0,
          target:  m.target  || 1,
        });
      });
    }

    // Missões de NPC (se existirem)
    if (rpg.npcQuests && Array.isArray(rpg.npcQuests)) {
      rpg.npcQuests.forEach(q => {
        if (q.done || (rpg.npcQuestsDone || []).includes(q.id)) return;
        const lang = rpg.lang || 'pt';
        missions.push({
          label:   q.name ? (q.name[lang] || q.name) : q.id,
          current: q.progress || 0,
          target:  q.target   || 1,
        });
      });
    }

    // Fallback: mostra stats gerais como "missões em andamento"
    if (missions.length === 0) {
      missions.push({
        label:   'Monstros abatidos',
        current: rpg.kills || 0,
        target:  Math.max(10, Math.ceil((rpg.kills || 0) / 10) * 10 + 10),
      });
      if ((rpg.bossKills || 0) < (rpg.actBosses || []).length) {
        missions.push({
          label:   'Guardiões derrotados',
          current: rpg.bossKills || 0,
          target:  (rpg.actBosses || []).length,
        });
      }
    }

    return missions.slice(0, 4); // max 4
  }

  // ── 5. Atualização em tempo real ─────────────────────────────
  function startTrackerUpdates() {
    if (updateInterval) clearInterval(updateInterval);
    updateInterval = setInterval(() => {
      if (trackerVisible) renderTracker();
    }, 2000);
  }

  // ── 6. Hook no killMonster para notificar missão completa ─────
  function hookKillMonster() {
    const _orig = rpg.killMonster;
    if (!_orig) return;
    rpg.killMonster = function() {
      const missionsBefore = getActiveMissions().map(m => m.current >= m.target);
      const result = _orig.apply(this, arguments);
      // Verifica se alguma missão foi completada
      setTimeout(() => {
        const missionsAfter = getActiveMissions().map(m => m.current >= m.target);
        missionsAfter.forEach((done, i) => {
          if (done && !missionsBefore[i]) {
            const missions = getActiveMissions();
            if (missions[i]) {
              if (typeof showToast === 'function')
                showToast('✅ Missão completa: ' + missions[i].label, 4000);
            }
          }
        });
        if (trackerVisible) renderTracker();
      }, 100);
      return result;
    };
  }

  // ── 7. Estilos do tracker ─────────────────────────────────────
  function injectTrackerStyles() {
    if (document.getElementById('quest-tracker-styles')) return;
    const s = document.createElement('style');
    s.id = 'quest-tracker-styles';
    s.textContent = `
      #quest-tracker-panel {
        position: fixed;
        bottom: 80px;
        right: 12px;
        width: 180px;
        background: rgba(8,8,16,0.96);
        border: 1px solid rgba(0,229,255,0.2);
        border-radius: 12px;
        padding: 10px;
        z-index: 8000;
        box-shadow: 0 8px 32px rgba(0,0,0,0.8), 0 0 20px rgba(0,229,255,0.06);
        backdrop-filter: blur(12px);
        transform: translateX(200px);
        opacity: 0;
        transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease;
        pointer-events: none;
      }
      #quest-tracker-panel.visible {
        transform: translateX(0);
        opacity: 1;
        pointer-events: all;
      }
      #quest-tracker-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
        padding-bottom: 6px;
        border-bottom: 1px solid rgba(0,229,255,0.1);
      }
      #quest-tracker-close {
        background: none;
        border: none;
        color: rgba(150,150,170,0.7);
        cursor: pointer;
        font-size: 10px;
        padding: 2px 4px;
        border-radius: 4px;
        transition: color 0.15s;
      }
      #quest-tracker-close:hover { color: #fff; }

      .qt-mission {
        margin-bottom: 8px;
        padding: 6px 0;
        border-bottom: 1px solid rgba(255,255,255,0.04);
      }
      .qt-mission:last-child { border-bottom: none; margin-bottom: 0; }
      .qt-mission.qt-done .qt-name { color: rgba(52,211,153,0.9); }

      .qt-name {
        font-size: 8.5px;
        color: rgba(210,210,230,0.9);
        font-weight: 700;
        margin-bottom: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: 'Rajdhani', sans-serif;
      }
      .qt-bar-track {
        width: 100%;
        height: 3px;
        background: rgba(0,0,0,0.6);
        border-radius: 99px;
        overflow: hidden;
        margin-bottom: 2px;
      }
      .qt-bar {
        height: 100%;
        background: linear-gradient(90deg, #7c3aed, #00e5ff);
        border-radius: 99px;
        transition: width 0.4s ease;
      }
      .qt-progress {
        font-size: 7.5px;
        color: rgba(150,150,170,0.7);
        font-family: 'Fira Code', monospace;
        text-align: right;
      }

      #quest-tracker-toggle {
        position: fixed;
        bottom: 45px;
        right: 14px;
        width: 36px;
        height: 36px;
        background: rgba(8,8,16,0.92);
        border: 1px solid rgba(0,229,255,0.25);
        border-radius: 10px;
        font-size: 16px;
        cursor: pointer;
        z-index: 8001;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.6);
        transition: all 0.15s;
        padding: 0;
        line-height: 1;
      }
      #quest-tracker-toggle:hover {
        border-color: rgba(0,229,255,0.5);
        box-shadow: 0 4px 12px rgba(0,0,0,0.6), 0 0 12px rgba(0,229,255,0.15);
        transform: scale(1.05);
      }
    `;
    document.head.appendChild(s);
  }

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    createTracker();
    hookKillMonster();
    console.log('[QuestTrackerModule] OK');
  }

  function waitForRpg(cb, n) {
    if (typeof rpg !== 'undefined' && rpg.updateUI) cb();
    else if ((n || 0) < 30) setTimeout(() => waitForRpg(cb, (n || 0) + 1), 200);
  }
  waitForRpg(init);
})();
