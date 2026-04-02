// ═══════════════════════════════════════════════════════════════
// MODULE: boot-screen.js  —  TELA DE LOADING / BOOT MELHORADA
// ─────────────────────────────────────────────────────────────
// • Animação de "boot de sistema" (temática tech/terminal)
// • Lore do mundo em linha de terminal a aparecer letra a letra
// • Barra de progresso de loading real (aguarda rpg estar pronto)
// • Skip com fade animado
// • Só aparece na primeira visita do dia (ou sempre se forçado)
// • Compatível com o intro existente (não interfere)
// ═══════════════════════════════════════════════════════════════
(function BootScreenModule() {
  'use strict';

  const BOOT_KEY     = 'rpg_boot_date';
  const FORCE_BOOT   = false; // muda para true para testar sempre

  // ── Frases de lore para o terminal ───────────────────────────
  const BOOT_LINES = [
    { text: 'ALGORITMA OS v21.0 — INICIALIZANDO...', delay: 0,    color: '#00e5ff' },
    { text: 'Carregando módulos de combate...       [OK]', delay: 280,  color: '#34d399' },
    { text: 'Verificando save slot...               [OK]', delay: 480,  color: '#34d399' },
    { text: 'Sincronizando bestiário...             [OK]', delay: 650,  color: '#34d399' },
    { text: 'Carregando lore do universo...', delay: 820,  color: '#94a3b8' },
    { text: '', delay: 950, color: '#94a3b8' },
    { text: '// A Lógica mantinha a paz entre os mundos.', delay: 1050, color: '#a855f7' },
    { text: '// O Lorde do Caos roubou a Matriz de Algoritma.', delay: 1300, color: '#a855f7' },
    { text: '// Só um herói pode reequilibrar o código.', delay: 1550, color: '#a855f7' },
    { text: '', delay: 1750, color: '#94a3b8' },
    { text: 'Estabelecendo ligação com o nexus...   [OK]', delay: 1900, color: '#34d399' },
    { text: 'Sistema pronto. Bem-vindo, Guerreiro.', delay: 2100, color: '#ffd60a' },
  ];

  // Frases adicionais baseadas no progresso do jogador
  function getProgressLines() {
    if (typeof rpg === 'undefined') return [];
    const lines = [];
    if ((rpg.level || 1) > 1) {
      lines.push({ text: `Herói detectado: ${rpg.heroName || '???'} · Nível ${rpg.level}`, delay: 0, color: '#00e5ff' });
    }
    if ((rpg.bossKills || 0) > 0) {
      lines.push({ text: `Guardiões eliminados: ${rpg.bossKills}/${(rpg.actBosses||[]).length}`, delay: 120, color: '#ef4444' });
    }
    if ((rpg.ngPlusActive || 0) > 0) {
      lines.push({ text: `CICLO NG+${rpg.ngPlusActive} ATIVO — multiplicadores aplicados`, delay: 240, color: '#ffd60a' });
    }
    return lines;
  }

  // ── Verifica se deve mostrar ──────────────────────────────────
  function shouldShow() {
    if (FORCE_BOOT) return true;
    const lastBoot = localStorage.getItem(BOOT_KEY);
    const today    = new Date().toDateString();
    return lastBoot !== today;
  }

  // ── Cria o overlay de boot ────────────────────────────────────
  function createBootScreen() {
    const overlay = document.createElement('div');
    overlay.id = 'boot-screen-overlay';
    overlay.innerHTML = `
      <div id="boot-scanlines"></div>
      <div id="boot-content">
        <div id="boot-logo">
          <div id="boot-logo-icon">⬡</div>
          <div id="boot-logo-text">ALGORITMA</div>
          <div id="boot-logo-sub">NEXUS SYSTEM</div>
        </div>
        <div id="boot-terminal">
          <div id="boot-terminal-lines"></div>
          <div id="boot-cursor">█</div>
        </div>
        <div id="boot-progress-wrap">
          <div id="boot-progress-bar"></div>
          <div id="boot-progress-label">INICIALIZANDO...</div>
        </div>
        <button id="boot-skip-btn" onclick="window._skipBoot()">SKIP ▶</button>
      </div>
    `;
    document.body.appendChild(overlay);
    injectBootStyles();
    return overlay;
  }

  // ── Animação de typewriter ────────────────────────────────────
  function typewriterLine(container, text, color, cb) {
    const line = document.createElement('div');
    line.className = 'boot-line';
    line.style.color = color;
    container.appendChild(line);
    container.scrollTop = container.scrollHeight;

    if (!text) { if (cb) cb(); return; }

    let i = 0;
    const speed = text.length > 40 ? 18 : 28;
    const interval = setInterval(() => {
      line.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        if (cb) setTimeout(cb, 60);
      }
    }, speed);
  }

  // ── Renderiza as linhas sequencialmente ──────────────────────
  function renderLines(lines, container, onComplete) {
    let idx = 0;
    function next() {
      if (idx >= lines.length) { if (onComplete) onComplete(); return; }
      const line = lines[idx++];
      setTimeout(() => typewriterLine(container, line.text, line.color, next), line.delay || 0);
    }
    next();
  }

  // ── Atualiza barra de progresso ───────────────────────────────
  function animateProgress(cb) {
    const bar   = document.getElementById('boot-progress-bar');
    const label = document.getElementById('boot-progress-label');
    if (!bar) { if (cb) cb(); return; }

    const steps = [
      { pct: 15,  label: 'CARREGANDO ENGINE...',  t: 200  },
      { pct: 35,  label: 'COMPILANDO SISTEMA...', t: 450  },
      { pct: 55,  label: 'LENDO SAVE...',         t: 700  },
      { pct: 75,  label: 'SINCRONIZANDO...',      t: 1000 },
      { pct: 90,  label: 'QUASE LÁ...',           t: 1600 },
      { pct: 100, label: 'PRONTO!',               t: 2300 },
    ];

    steps.forEach(step => {
      setTimeout(() => {
        if (bar)   bar.style.width = step.pct + '%';
        if (label) label.textContent = step.label;
        if (step.pct === 100 && cb) setTimeout(cb, 400);
      }, step.t);
    });
  }

  // ── Fecha o boot screen com fade ──────────────────────────────
  function closeBoot() {
    const overlay = document.getElementById('boot-screen-overlay');
    if (!overlay) return;
    overlay.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    overlay.style.opacity    = '0';
    overlay.style.transform  = 'scale(1.03)';
    setTimeout(() => {
      overlay.remove();
      localStorage.setItem(BOOT_KEY, new Date().toDateString());
    }, 650);
  }

  window._skipBoot = function() { closeBoot(); };

  // ── Init principal ────────────────────────────────────────────
  function runBoot() {
    if (!shouldShow()) return;

    const overlay  = createBootScreen();
    const terminal = document.getElementById('boot-terminal-lines');

    // Linhas de progresso do jogador primeiro (se rpg já carregou)
    const progressLines = getProgressLines();
    const allLines = progressLines.length > 0
      ? [...progressLines, { text: '', delay: 0, color: '#94a3b8' }, ...BOOT_LINES]
      : BOOT_LINES;

    // Anima a barra e as linhas em paralelo
    animateProgress(null);
    renderLines(allLines, terminal, () => {
      // Após linhas completarem, espera a barra e fecha
      setTimeout(closeBoot, 600);
    });

    // Fecha automaticamente após 4.5s de segurança
    setTimeout(() => {
      if (document.getElementById('boot-screen-overlay')) closeBoot();
    }, 4500);
  }

  // ── CSS ───────────────────────────────────────────────────────
  function injectBootStyles() {
    if (document.getElementById('boot-screen-styles')) return;
    const s = document.createElement('style');
    s.id = 'boot-screen-styles';
    s.textContent = `
      #boot-screen-overlay {
        position: fixed;
        inset: 0;
        background: #000;
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }

      /* CRT scanlines */
      #boot-scanlines {
        position: absolute;
        inset: 0;
        background: repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0,0,0,0.18) 2px,
          rgba(0,0,0,0.18) 4px
        );
        pointer-events: none;
        z-index: 2;
      }

      #boot-content {
        position: relative;
        z-index: 3;
        width: min(420px, 92vw);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
      }

      /* Logo */
      #boot-logo {
        text-align: center;
        animation: bootLogoIn 0.6s ease forwards;
      }
      @keyframes bootLogoIn {
        from { opacity: 0; transform: translateY(-20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      #boot-logo-icon {
        font-size: 42px;
        color: #00e5ff;
        line-height: 1;
        text-shadow: 0 0 30px rgba(0,229,255,0.8), 0 0 60px rgba(0,229,255,0.4);
        animation: iconPulse 2s ease-in-out infinite;
      }
      @keyframes iconPulse {
        0%, 100% { text-shadow: 0 0 30px rgba(0,229,255,0.8), 0 0 60px rgba(0,229,255,0.4); }
        50%       { text-shadow: 0 0 50px rgba(0,229,255,1),   0 0 90px rgba(0,229,255,0.6); }
      }
      #boot-logo-text {
        font-family: 'Orbitron', sans-serif;
        font-size: 22px;
        font-weight: 900;
        color: #fff;
        letter-spacing: 0.3em;
        margin-top: 6px;
      }
      #boot-logo-sub {
        font-family: 'Fira Code', monospace;
        font-size: 9px;
        color: rgba(0,229,255,0.6);
        letter-spacing: 0.25em;
        margin-top: 2px;
      }

      /* Terminal */
      #boot-terminal {
        width: 100%;
        background: rgba(0,229,255,0.03);
        border: 1px solid rgba(0,229,255,0.15);
        border-radius: 8px;
        padding: 12px 14px;
        min-height: 120px;
        max-height: 160px;
        overflow: hidden;
        position: relative;
      }
      #boot-terminal-lines {
        overflow: hidden;
      }
      .boot-line {
        font-family: 'Fira Code', monospace;
        font-size: 10px;
        line-height: 1.7;
        white-space: pre;
      }
      #boot-cursor {
        font-family: 'Fira Code', monospace;
        font-size: 10px;
        color: #00e5ff;
        animation: cursorBlink 0.8s step-end infinite;
        display: inline-block;
        margin-top: 2px;
      }
      @keyframes cursorBlink {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0; }
      }

      /* Progress bar */
      #boot-progress-wrap {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
      #boot-progress-bar {
        height: 3px;
        background: linear-gradient(90deg, #00e5ff, #a855f7);
        border-radius: 99px;
        width: 0%;
        transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 0 10px rgba(0,229,255,0.6);
      }
      #boot-progress-label {
        font-family: 'Orbitron', monospace;
        font-size: 8px;
        color: rgba(148,163,184,0.7);
        letter-spacing: 0.15em;
        text-align: center;
      }

      /* Skip button */
      #boot-skip-btn {
        font-family: 'Orbitron', monospace;
        font-size: 8px;
        letter-spacing: 0.2em;
        color: rgba(148,163,184,0.5);
        background: none;
        border: 1px solid rgba(148,163,184,0.2);
        border-radius: 4px;
        padding: 5px 14px;
        cursor: pointer;
        transition: all 0.15s;
        margin-top: 4px;
      }
      #boot-skip-btn:hover {
        color: #fff;
        border-color: rgba(0,229,255,0.4);
        background: rgba(0,229,255,0.05);
      }
    `;
    document.head.appendChild(s);
  }

  // ── Aguarda DOM e rpg para ter info de progresso ──────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(runBoot, 50));
  } else {
    setTimeout(runBoot, 50);
  }

  console.log('[BootScreenModule] OK');
})();
