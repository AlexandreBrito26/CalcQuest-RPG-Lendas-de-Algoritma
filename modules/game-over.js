// ═══════════════════════════════════════════════════════════════
// MODULE: game-over.js  —  TELA DE GAME OVER MELHORADA
// ─────────────────────────────────────────────────────────────
// • Animação fade + glitch ao morrer (estética terminal)
// • Stats da sessão: dano dealt, kills, gold ganho, duração
// • Frase de lore aleatória + sugestão de build diferente
// • Botão de retry com custo reduzido em poções
// • Compatível com boot-screen.js — reutiliza scanlines
// • Patch em rpg.gameOver / rpg.heroDied para interceptar
// ═══════════════════════════════════════════════════════════════
(function GameOverModule() {
  'use strict';

  // ── Frases de lore de morte ───────────────────────────────────
  const DEATH_LORE = [
    'O código corrompeu-se. Mas o loop continua.',
    'A Matriz absorveu a tua essência. Por enquanto.',
    'Cada derrota é um commit. O próximo push será diferente.',
    'O Lorde do Caos festejou. Mas brevemente.',
    'A Lógica regista a tua queda. E a tua ressurreição.',
    'Até os guardiões mais fortes reiniciam.',
    'O sistema falhou. O herói não.',
    'Erro fatal detectado. A reimplantar consciência...',
    'A tua assinatura ficou gravada no bestiário do inimigo.',
    'Morrer é só um checkpoint com estética diferente.',
  ];

  // ── Sugestões de build por classe ────────────────────────────
  const BUILD_TIPS = {
    warrior:  ['Experimenta a Runa de Reflecção — devolver dano é subestimado.', 'Maça + Armadura de Espinhos pode virar o combate.', 'O Talento "Contra-Ataque" muda tudo contra bosses.'],
    mage:     ['Tenta o Grimório de Gelo — slow + burst é muito forte.', 'Runa de Mana infinita com Cajado Arcano? Experimenta.', 'Magia + Pet Elemental é combo top-tier actualmente.'],
    rogue:    ['Veneno + Crítico em cadeia destrói bosses facilmente.', 'Experimenta Fuga + Relíquia de Sombra para survivability.', 'A Classe Secreta "Phantom" abre com 50 kills consecutivas.'],
    paladin:  ['Cura + Aura Sagrada permite durar indefinidamente.', 'Shield de Luz + Contra-Ataque = tanque perfeito.', 'Experimenta misturar Runa de Fogo com escudo — surpreende.'],
    ranger:   ['Arco Sombrio + Pet Lobo é o DPS mais alto do jogo.', 'Flecha Tripla com Crítico aumentado? Experimenta.', 'Runa de Vento + boost de esquiva — quase intocável.'],
    default:  ['Experimenta uma classe diferente desta vez.', 'Investe em Runas antes de avançar para o próximo acto.', 'O Bestiário revela fraquezas dos inimigos — usa-o.'],
  };

  // ── Sessão de combate (rastreada internamente) ────────────────
  const session = {
    startTime:   null,
    dmgDealt:    0,
    dmgTaken:    0,
    kills:       0,
    goldEarned:  0,
    spellsCast:  0,
    maxCombo:    0,
    monsterName: '???',
  };

  // ── Inicia tracking da sessão ─────────────────────────────────
  function startSession() {
    session.startTime  = Date.now();
    session.dmgDealt   = 0;
    session.dmgTaken   = 0;
    session.kills      = 0;
    session.goldEarned = 0;
    session.spellsCast = 0;
    session.maxCombo   = 0;
  }

  // ── Patch em rpg.startBattle para resetar sessão ─────────────
  function patchStartBattle() {
    const _orig = rpg.startBattle;
    if (!_orig) return;
    rpg.startBattle = function(monster) {
      if (monster) session.monsterName = monster.name || '???';
      startSession();
      return _orig.apply(this, arguments);
    };
  }

  // ── Patch em rpg.attack / applyDamage para tracking ──────────
  function patchDamageTracking() {
    // Track dano dado
    const _origAtk = rpg.attack;
    if (_origAtk) {
      rpg.attack = function() {
        const prevMonHp = (rpg.monster && rpg.monster.hp) || 0;
        const result = _origAtk.apply(this, arguments);
        const afterMonHp = (rpg.monster && rpg.monster.hp) || 0;
        const dealt = Math.max(0, prevMonHp - afterMonHp);
        session.dmgDealt += dealt;
        if ((this.combo || 0) > session.maxCombo) session.maxCombo = this.combo || 0;
        return result;
      };
    }

    // Track gold
    const _origKill = rpg.killMonster;
    if (_origKill) {
      rpg.killMonster = function() {
        session.kills++;
        const prevGold = this.gold || 0;
        const result = _origKill.apply(this, arguments);
        const earned = Math.max(0, (this.gold || 0) - prevGold);
        session.goldEarned += earned;
        return result;
      };
    }
  }

  // ── Patch em rpg.heroDied / rpg.gameOver ─────────────────────
  function patchHeroDeath() {
    // Tenta herodie primeiro, depois gameOver
    const targets = ['herodie', 'heroDied', 'gameOver', 'onDeath', 'playerDied'];
    targets.forEach(fnName => {
      if (typeof rpg[fnName] === 'function') {
        const _orig = rpg[fnName];
        rpg[fnName] = function() {
          // Captura nome do monstro killer
          if (rpg.monster) session.monsterName = rpg.monster.name || session.monsterName;
          showGameOver();
          return _orig.apply(this, arguments);
        };
      }
    });

    // Fallback: observa se heroHp chega a 0
    let deathWatchActive = false;
    setInterval(() => {
      if (!rpg.inCombat || deathWatchActive) return;
      if ((rpg.heroHp || 1) <= 0) {
        deathWatchActive = true;
        if (rpg.monster) session.monsterName = rpg.monster.name || session.monsterName;
        setTimeout(() => {
          showGameOver();
          deathWatchActive = false;
        }, 200);
      }
    }, 150);
  }

  // ── Formata número grande ─────────────────────────────────────
  function fmtNum(n) {
    if (n >= 1e9)  return (n / 1e9).toFixed(1)  + 'B';
    if (n >= 1e6)  return (n / 1e6).toFixed(1)  + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return String(Math.floor(n));
  }

  // ── Formata duração ───────────────────────────────────────────
  function fmtDuration(ms) {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    if (h > 0)  return `${h}h ${m % 60}m`;
    if (m > 0)  return `${m}m ${s % 60}s`;
    return `${s}s`;
  }

  // ── Selecciona frase e tip aleatórios ─────────────────────────
  function getDeathLore() {
    return DEATH_LORE[Math.floor(Math.random() * DEATH_LORE.length)];
  }

  function getBuildTip() {
    const cls = (rpg.eqClass || 'default').toLowerCase();
    const tips = BUILD_TIPS[cls] || BUILD_TIPS.default;
    return tips[Math.floor(Math.random() * tips.length)];
  }

  // ── Cria e exibe a tela de game over ─────────────────────────
  function showGameOver() {
    // Previne duplicação
    if (document.getElementById('gameover-overlay')) return;

    const duration   = session.startTime ? Date.now() - session.startTime : 0;
    const lore       = getDeathLore();
    const buildTip   = getBuildTip();
    const heroName   = rpg.heroName || 'Herói';
    const heroLvl    = rpg.level    || 1;
    const killerName = session.monsterName;
    const hasPotions = (rpg.potions || 0) >= 1;

    const overlay = document.createElement('div');
    overlay.id = 'gameover-overlay';
    overlay.innerHTML = `
      <div id="go-scanlines"></div>
      <div id="go-glitch-bar"></div>

      <div id="go-content">

        <!-- Header da morte -->
        <div id="go-header">
          <div id="go-icon-wrap">
            <div id="go-skull">💀</div>
            <div id="go-icon-ring"></div>
          </div>
          <div id="go-title-block">
            <div id="go-title">GAME OVER</div>
            <div id="go-subtitle">
              <span id="go-hero-name">${heroName}</span>
              <span id="go-hero-sep">·</span>
              <span id="go-hero-lvl">Nível ${heroLvl}</span>
            </div>
          </div>
        </div>

        <!-- Causa da morte -->
        <div id="go-cause">
          <span id="go-cause-label">ELIMINADO POR</span>
          <span id="go-cause-killer">${killerName}</span>
        </div>

        <!-- Stats da sessão -->
        <div id="go-stats-grid">
          <div class="go-stat">
            <div class="go-stat-val">${fmtNum(session.dmgDealt)}</div>
            <div class="go-stat-key">DMG DADO</div>
          </div>
          <div class="go-stat">
            <div class="go-stat-val">${session.kills}</div>
            <div class="go-stat-key">ABATIDOS</div>
          </div>
          <div class="go-stat">
            <div class="go-stat-val" style="color:#ffd60a;">${fmtNum(session.goldEarned)}</div>
            <div class="go-stat-key">GOLD GANHO</div>
          </div>
          <div class="go-stat">
            <div class="go-stat-val" style="color:#94a3b8;">${duration > 0 ? fmtDuration(duration) : '—'}</div>
            <div class="go-stat-key">DURAÇÃO</div>
          </div>
          ${session.maxCombo > 1 ? `
          <div class="go-stat go-stat-wide">
            <div class="go-stat-val" style="color:#a855f7;">x${session.maxCombo}</div>
            <div class="go-stat-key">COMBO MÁX</div>
          </div>` : ''}
        </div>

        <!-- Lore / Quote -->
        <div id="go-lore-block">
          <div id="go-lore-quote">"${lore}"</div>
        </div>

        <!-- Build tip -->
        <div id="go-tip-block">
          <span id="go-tip-icon">💡</span>
          <span id="go-tip-text">${buildTip}</span>
        </div>

        <!-- Botões de acção -->
        <div id="go-actions">
          ${hasPotions ? `
          <button id="go-btn-revive" onclick="window._gameOverRevive()">
            <span id="go-btn-revive-icon">⚗️</span>
            <span>Reviver</span>
            <span id="go-revive-cost">-1 poção</span>
          </button>` : ''}

          <button id="go-btn-retry" onclick="window._gameOverRetry()">
            <span>↺ Tentar de Novo</span>
          </button>

          <button id="go-btn-menu" onclick="window._gameOverMenu()">
            <span>⌂ Menu</span>
          </button>
        </div>

        <!-- Rodapé terminal -->
        <div id="go-terminal-footer">
          <span id="go-footer-cursor">█</span>
          <span id="go-footer-text">sistema a aguardar input...</span>
        </div>

      </div>
    `;

    document.body.appendChild(overlay);
    injectGameOverStyles();

    // Anima entrada com glitch
    requestAnimationFrame(() => {
      overlay.classList.add('go-visible');
      startGlitchEffect();
      typeFooterText();
    });
  }

  // ── Efeito glitch no título ───────────────────────────────────
  function startGlitchEffect() {
    const title = document.getElementById('go-title');
    if (!title) return;

    const original = 'GAME OVER';
    const glitchChars = '░▒▓█▄▀■□▪▫';

    let glitchCount = 0;
    const maxGlitches = 6;

    function doGlitch() {
      if (glitchCount >= maxGlitches) {
        title.textContent = original;
        return;
      }
      glitchCount++;

      // Substitui caracteres aleatórios
      let glitched = '';
      for (let i = 0; i < original.length; i++) {
        if (original[i] !== ' ' && Math.random() < 0.3) {
          glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        } else {
          glitched += original[i];
        }
      }
      title.textContent = glitched;

      const nextDelay = glitchCount < 3 ? 60 : 120 + Math.random() * 200;
      setTimeout(() => {
        title.textContent = original;
        setTimeout(doGlitch, 80 + Math.random() * 150);
      }, 40);
    }

    setTimeout(doGlitch, 300);

    // Glitch periódico suave após entrada
    setTimeout(() => {
      setInterval(() => {
        if (!document.getElementById('gameover-overlay')) return;
        if (Math.random() > 0.3) return;
        const orig = title.textContent;
        let g = '';
        for (let i = 0; i < orig.length; i++) {
          g += (orig[i] !== ' ' && Math.random() < 0.15)
            ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
            : orig[i];
        }
        title.textContent = g;
        setTimeout(() => { if (title) title.textContent = 'GAME OVER'; }, 80);
      }, 2500);
    }, 1500);
  }

  // ── Digita texto no footer ────────────────────────────────────
  function typeFooterText() {
    const el = document.getElementById('go-footer-text');
    if (!el) return;
    const text = 'sistema a aguardar input...';
    el.textContent = '';
    let i = 0;
    const t = setInterval(() => {
      if (!el.isConnected) { clearInterval(t); return; }
      el.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(t);
    }, 55);
  }

  // ── Acções dos botões ─────────────────────────────────────────
  window._gameOverRevive = function() {
    if ((rpg.potions || 0) < 1) {
      if (typeof showToast === 'function') showToast('❌ Sem poções!', 2000);
      return;
    }
    rpg.potions = Math.max(0, (rpg.potions || 1) - 1);
    rpg.heroHp  = Math.floor(rpg.getMaxHp ? rpg.getMaxHp() * 0.5 : 100);
    if (rpg.save) rpg.save();
    closeGameOver();
    if (typeof showToast === 'function') showToast('⚗️ Reanimado com meia vida!', 3000);
    if (rpg.updateUI) rpg.updateUI();
  };

  window._gameOverRetry = function() {
    closeGameOver();
    // Reinicia com HP cheio no menu
    rpg.heroHp = rpg.getMaxHp ? rpg.getMaxHp() : 100;
    if (rpg.inCombat) rpg.inCombat = false;
    if (rpg.save) rpg.save();
    if (rpg.updateUI) rpg.updateUI();
    if (typeof navTo === 'function') navTo('menu');
    setTimeout(() => {
      if (typeof showToast === 'function') showToast('🔄 Pronto para o próximo round!', 2500);
    }, 400);
  };

  window._gameOverMenu = function() {
    closeGameOver();
    rpg.heroHp  = rpg.getMaxHp ? rpg.getMaxHp() : 100;
    rpg.inCombat = false;
    if (rpg.save) rpg.save();
    if (typeof navTo === 'function') navTo('menu');
  };

  function closeGameOver() {
    const overlay = document.getElementById('gameover-overlay');
    if (!overlay) return;
    overlay.classList.remove('go-visible');
    overlay.classList.add('go-hiding');
    setTimeout(() => overlay.remove(), 500);
  }

  // ── CSS ───────────────────────────────────────────────────────
  function injectGameOverStyles() {
    if (document.getElementById('gameover-styles')) return;
    const s = document.createElement('style');
    s.id = 'gameover-styles';
    s.textContent = `
      /* ══ OVERLAY ══ */
      #gameover-overlay {
        position: fixed;
        inset: 0;
        background: #000;
        z-index: 99998;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        opacity: 0;
        transition: opacity 0.4s ease;
      }
      #gameover-overlay.go-visible {
        opacity: 1;
      }
      #gameover-overlay.go-hiding {
        opacity: 0;
        transform: scale(1.04);
        transition: opacity 0.45s ease, transform 0.45s ease;
      }

      /* ══ SCANLINES (reutiliza estilo do boot-screen) ══ */
      #go-scanlines {
        position: absolute;
        inset: 0;
        background: repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0,0,0,0.15) 2px,
          rgba(0,0,0,0.15) 4px
        );
        pointer-events: none;
        z-index: 1;
      }

      /* ══ BARRA DE GLITCH horizontal ══ */
      #go-glitch-bar {
        position: absolute;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #ef4444, #ffd60a, transparent);
        opacity: 0;
        z-index: 2;
        animation: glitchBarScan 4s ease infinite;
      }
      @keyframes glitchBarScan {
        0%   { top: -2px; opacity: 0; }
        5%   { opacity: 0.8; }
        95%  { opacity: 0.6; }
        100% { top: 100%; opacity: 0; }
      }

      /* ══ CONTEÚDO ══ */
      #go-content {
        position: relative;
        z-index: 3;
        width: min(380px, 94vw);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;
        animation: goContentIn 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s both;
      }
      @keyframes goContentIn {
        from { transform: translateY(24px) scale(0.97); opacity: 0; }
        to   { transform: translateY(0) scale(1); opacity: 1; }
      }

      /* ══ HEADER ══ */
      #go-header {
        display: flex;
        align-items: center;
        gap: 14px;
        width: 100%;
      }

      #go-icon-wrap {
        position: relative;
        flex-shrink: 0;
        width: 52px;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      #go-skull {
        font-size: 30px;
        line-height: 1;
        position: relative;
        z-index: 1;
        animation: skullPulse 2s ease-in-out infinite;
        filter: drop-shadow(0 0 12px rgba(239,68,68,0.6));
      }
      @keyframes skullPulse {
        0%, 100% { filter: drop-shadow(0 0 10px rgba(239,68,68,0.5)); }
        50%      { filter: drop-shadow(0 0 22px rgba(239,68,68,0.9)); }
      }
      #go-icon-ring {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        border: 2px solid rgba(239,68,68,0.35);
        animation: ringPulse 2s ease-in-out infinite;
      }
      @keyframes ringPulse {
        0%, 100% { transform: scale(1);   opacity: 0.5; }
        50%      { transform: scale(1.15); opacity: 1; }
      }

      #go-title-block {
        flex: 1;
        min-width: 0;
      }
      #go-title {
        font-family: 'Orbitron', sans-serif;
        font-size: 26px;
        font-weight: 900;
        color: #ef4444;
        letter-spacing: 0.12em;
        line-height: 1;
        text-shadow:
          0 0 20px rgba(239,68,68,0.8),
          0 0 40px rgba(239,68,68,0.4),
          2px 2px 0 rgba(0,0,0,0.9);
        animation: titleFlicker 6s infinite;
      }
      @keyframes titleFlicker {
        0%, 92%, 96%, 100% { opacity: 1; }
        93%                 { opacity: 0.85; }
        94%                 { opacity: 1; }
        95%                 { opacity: 0.7; }
      }

      #go-subtitle {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 4px;
      }
      #go-hero-name {
        font-family: 'Orbitron', sans-serif;
        font-size: 10px;
        font-weight: 800;
        color: #00e5ff;
        letter-spacing: 0.08em;
        text-shadow: 0 0 8px rgba(0,229,255,0.5);
      }
      #go-hero-sep {
        color: rgba(100,100,120,0.6);
        font-size: 10px;
      }
      #go-hero-lvl {
        font-family: 'Fira Code', monospace;
        font-size: 9px;
        color: rgba(148,163,184,0.8);
        font-weight: 700;
      }

      /* ══ CAUSA DA MORTE ══ */
      #go-cause {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 7px 14px;
        background: rgba(239,68,68,0.06);
        border: 1px solid rgba(239,68,68,0.2);
        border-radius: 8px;
      }
      #go-cause-label {
        font-family: 'Fira Code', monospace;
        font-size: 8px;
        font-weight: 700;
        color: rgba(148,163,184,0.6);
        letter-spacing: 0.12em;
      }
      #go-cause-killer {
        font-family: 'Orbitron', sans-serif;
        font-size: 9px;
        font-weight: 900;
        color: #ef4444;
        letter-spacing: 0.08em;
        text-shadow: 0 0 8px rgba(239,68,68,0.5);
        max-width: 140px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      /* ══ STATS ══ */
      #go-stats-grid {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .go-stat {
        flex: 1;
        min-width: 68px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        padding: 9px 6px;
        background: rgba(0,0,0,0.5);
        border: 1px solid rgba(255,255,255,0.05);
        border-radius: 10px;
        backdrop-filter: blur(4px);
        animation: statIn 0.35s ease both;
      }
      .go-stat:nth-child(1) { animation-delay: 0.15s; }
      .go-stat:nth-child(2) { animation-delay: 0.22s; }
      .go-stat:nth-child(3) { animation-delay: 0.29s; }
      .go-stat:nth-child(4) { animation-delay: 0.36s; }
      .go-stat:nth-child(5) { animation-delay: 0.43s; }
      @keyframes statIn {
        from { transform: translateY(10px); opacity: 0; }
        to   { transform: translateY(0); opacity: 1; }
      }
      .go-stat-wide {
        flex-basis: 100%;
      }
      .go-stat-val {
        font-family: 'Orbitron', sans-serif;
        font-size: 16px;
        font-weight: 900;
        color: #e2e8f0;
        line-height: 1;
        letter-spacing: 0.04em;
      }
      .go-stat-key {
        font-family: 'Fira Code', monospace;
        font-size: 7px;
        font-weight: 700;
        color: rgba(100,100,120,0.8);
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      /* ══ LORE ══ */
      #go-lore-block {
        width: 100%;
        padding: 10px 14px;
        background: rgba(168,85,247,0.05);
        border-left: 2px solid rgba(168,85,247,0.4);
        border-radius: 0 8px 8px 0;
        animation: loreIn 0.4s ease 0.5s both;
      }
      @keyframes loreIn {
        from { opacity: 0; transform: translateX(-10px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      #go-lore-quote {
        font-family: 'Fira Code', monospace;
        font-size: 9px;
        color: rgba(168,85,247,0.9);
        font-style: italic;
        line-height: 1.6;
        letter-spacing: 0.02em;
      }

      /* ══ BUILD TIP ══ */
      #go-tip-block {
        width: 100%;
        display: flex;
        align-items: flex-start;
        gap: 8px;
        padding: 9px 12px;
        background: rgba(0,229,255,0.04);
        border: 1px solid rgba(0,229,255,0.12);
        border-radius: 8px;
        animation: tipIn 0.4s ease 0.65s both;
      }
      @keyframes tipIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      #go-tip-icon {
        font-size: 12px;
        flex-shrink: 0;
        line-height: 1.4;
      }
      #go-tip-text {
        font-family: 'Rajdhani', sans-serif;
        font-size: 10px;
        font-weight: 600;
        color: rgba(148,163,184,0.8);
        line-height: 1.5;
      }

      /* ══ ACÇÕES ══ */
      #go-actions {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 7px;
        animation: actionsIn 0.4s ease 0.8s both;
      }
      @keyframes actionsIn {
        from { opacity: 0; transform: translateY(10px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      #go-btn-revive {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px;
        background: linear-gradient(135deg, rgba(52,211,153,0.12), rgba(5,150,105,0.08));
        border: 1px solid rgba(52,211,153,0.35);
        border-radius: 12px;
        color: #34d399;
        font-family: 'Orbitron', sans-serif;
        font-size: 10px;
        font-weight: 900;
        letter-spacing: 0.12em;
        cursor: pointer;
        transition: all 0.15s;
        text-transform: uppercase;
        position: relative;
        overflow: hidden;
      }
      #go-btn-revive::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(52,211,153,0.1), transparent);
        opacity: 0;
        transition: opacity 0.15s;
      }
      #go-btn-revive:hover::before { opacity: 1; }
      #go-btn-revive:hover {
        border-color: rgba(52,211,153,0.6);
        box-shadow: 0 0 20px rgba(52,211,153,0.2);
        transform: translateY(-1px);
      }
      #go-btn-revive:active { transform: translateY(2px); }

      #go-revive-cost {
        font-family: 'Fira Code', monospace;
        font-size: 8px;
        color: rgba(52,211,153,0.6);
        font-weight: 700;
        border: 1px solid rgba(52,211,153,0.25);
        padding: 2px 6px;
        border-radius: 4px;
      }

      #go-btn-retry {
        width: 100%;
        padding: 11px;
        background: rgba(0,229,255,0.07);
        border: 1px solid rgba(0,229,255,0.25);
        border-radius: 12px;
        color: #00e5ff;
        font-family: 'Orbitron', sans-serif;
        font-size: 9.5px;
        font-weight: 800;
        letter-spacing: 0.1em;
        cursor: pointer;
        transition: all 0.15s;
        text-transform: uppercase;
      }
      #go-btn-retry:hover {
        background: rgba(0,229,255,0.12);
        border-color: rgba(0,229,255,0.45);
        box-shadow: 0 0 16px rgba(0,229,255,0.15);
        transform: translateY(-1px);
      }
      #go-btn-retry:active { transform: translateY(2px); }

      #go-btn-menu {
        width: 100%;
        padding: 9px;
        background: rgba(0,0,0,0.4);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 10px;
        color: rgba(148,163,184,0.6);
        font-family: 'Orbitron', sans-serif;
        font-size: 8.5px;
        font-weight: 700;
        letter-spacing: 0.1em;
        cursor: pointer;
        transition: all 0.15s;
        text-transform: uppercase;
      }
      #go-btn-menu:hover {
        background: rgba(0,0,0,0.6);
        border-color: rgba(255,255,255,0.12);
        color: rgba(200,200,220,0.8);
      }

      /* ══ FOOTER TERMINAL ══ */
      #go-terminal-footer {
        display: flex;
        align-items: center;
        gap: 6px;
        opacity: 0.45;
      }
      #go-footer-cursor {
        font-family: 'Fira Code', monospace;
        font-size: 9px;
        color: #ef4444;
        animation: cursorBlink 0.9s step-end infinite;
      }
      @keyframes cursorBlink {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0; }
      }
      #go-footer-text {
        font-family: 'Fira Code', monospace;
        font-size: 8px;
        color: rgba(148,163,184,0.6);
        letter-spacing: 0.08em;
      }
    `;
    document.head.appendChild(s);
  }

  // ── Expõe função para testes manuais ─────────────────────────
  window._testGameOver = function() {
    session.dmgDealt   = 142800;
    session.kills      = 7;
    session.goldEarned = 2340;
    session.maxCombo   = 5;
    session.startTime  = Date.now() - 4 * 60 * 1000;
    session.monsterName = 'Guardião de Cristal';
    showGameOver();
  };

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    startSession();
    patchStartBattle();
    patchDamageTracking();
    patchHeroDeath();
    console.log('[GameOverModule] OK — tela de morte melhorada activa');
  }

  function waitForRpg(cb, n) {
    if (typeof rpg !== 'undefined' && rpg.updateUI) cb();
    else if ((n || 0) < 40) setTimeout(() => waitForRpg(cb, (n || 0) + 1), 200);
  }

  waitForRpg(init);
})();
