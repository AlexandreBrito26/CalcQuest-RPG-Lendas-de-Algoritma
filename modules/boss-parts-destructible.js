// ═══════════════════════════════════════════════════════════════
// MODULE: boss-parts-destructible.js
// ─────────────────────────────────────────────────────────────
// Completa o sistema boss-parts-ui que já existe no game.js:
//   • Lógica de dano por parte (hook em dealDamageToMonster)
//   • Animação de destruição por parte
//   • Drops únicos por parte destruída
//   • Efeitos visuais enhanced (shake, flash, partículas)
//   • Patch em spawnMonster para inicializar partes
//   • Indicador de alvo atual no HUD
// ═══════════════════════════════════════════════════════════════
;(function BossPartsModule() {
  'use strict';

  // ── Drops por parte ──────────────────────────────────────────
  const PART_DROPS = {
    head:   { name: 'Fragmento de Consciência', icon: '🧠', goldBonus: 500,  xpBonus: 1000, relic: 'Olho do Boss' },
    weapon: { name: 'Aço Amaldiçoado',          icon: '⚔️', goldBonus: 300,  xpBonus: 600,  atkBonus: 0.15 },
    body:   { name: 'Núcleo de Escudo',          icon: '🛡️', goldBonus: 400,  xpBonus: 800,  defBonus: 0.20 },
  };

  // ── CSS de animações ─────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('boss-parts-styles')) return;
    const s = document.createElement('style');
    s.id = 'boss-parts-styles';
    s.textContent = `
      #boss-parts-ui { transition: all 0.3s ease; }

      .bp-btn {
        transition: all 0.2s ease;
        position: relative;
        overflow: hidden;
      }
      .bp-btn.bp-targeted {
        border-color: #f59e0b !important;
        background: rgba(245,158,11,0.15) !important;
        box-shadow: 0 0 12px rgba(245,158,11,0.4), inset 0 0 8px rgba(245,158,11,0.1);
      }
      .bp-btn.bp-destroyed {
        border-color: rgba(239,68,68,0.3) !important;
        background: rgba(239,68,68,0.05) !important;
        opacity: 0.4 !important;
        cursor: not-allowed !important;
      }
      .bp-btn:not(.bp-destroyed):not(.bp-targeted):hover {
        border-color: rgba(255,255,255,0.25) !important;
        background: rgba(255,255,255,0.05) !important;
      }

      @keyframes bpDestroy {
        0%   { transform: scale(1);    filter: brightness(1); }
        20%  { transform: scale(1.15); filter: brightness(3) saturate(0); }
        40%  { transform: scale(0.9);  filter: brightness(2) hue-rotate(30deg); }
        60%  { transform: scale(1.05); filter: brightness(1.5); }
        100% { transform: scale(1);    filter: brightness(1); }
      }
      .bp-destroy-anim { animation: bpDestroy 0.6s ease forwards; }

      @keyframes bpHit {
        0%   { transform: translateX(0); }
        25%  { transform: translateX(-3px); }
        75%  { transform: translateX(3px); }
        100% { transform: translateX(0); }
      }
      .bp-hit-anim { animation: bpHit 0.15s ease; }

      @keyframes bpDmgPop {
        0%   { opacity:1; transform:translateY(0) scale(1); }
        100% { opacity:0; transform:translateY(-24px) scale(0.8); }
      }
      .bp-dmg-pop {
        position: absolute;
        top: 0; left: 50%; transform: translateX(-50%);
        font-family: 'Orbitron', monospace;
        font-size: 9px; font-weight: 900;
        color: #f59e0b;
        pointer-events: none;
        animation: bpDmgPop 0.8s ease forwards;
        white-space: nowrap; z-index: 10;
      }

      .bp-hp-bar {
        height: 3px;
        border-radius: 99px;
        transition: width 0.3s ease;
      }
      .bp-targeted .bp-hp-bar { background: linear-gradient(90deg, #f59e0b, #fcd34d) !important; box-shadow: 0 0 6px rgba(245,158,11,0.6); }
      .bp-hp-bar-track { height: 3px; background: rgba(0,0,0,0.6); border-radius: 99px; overflow: hidden; margin-top: 3px; }

      .bp-part-destroyed-overlay {
        position: absolute; inset: 0;
        display: flex; align-items: center; justify-content: center;
        background: rgba(0,0,0,0.7);
        font-family: 'Orbitron', monospace;
        font-size: 7px; font-weight: 900;
        color: #ef4444; letter-spacing: 0.1em;
        z-index: 5;
      }

      #boss-parts-target-label {
        text-align: center;
        font-family: 'Fira Code', monospace;
        font-size: 7px; color: #52525b;
        letter-spacing: 0.08em;
        margin-top: 3px;
        text-transform: uppercase;
      }
    `;
    document.head.appendChild(s);
  }

  // ── Render do boss-parts-ui (substitui a versão do game.js) ──
  function renderBossPartsUI() {
    const el = document.getElementById('boss-parts-ui');
    if (!el) return;

    if (!rpg.BOSS_PARTS_ACTIVE || !rpg.isBossFight) {
      el.innerHTML = '';
      return;
    }

    const parts = rpg.BOSS_PARTS;
    const partOrder = ['head', 'weapon', 'body'];

    el.innerHTML = `
      <div style="display:flex;gap:6px;justify-content:center;margin-bottom:3px;">
        ${partOrder.map(partId => {
          const part   = parts[partId];
          const hp     = rpg.bossPartHP[partId] || 0;
          const maxHp  = Math.floor((rpg.monster?.maxHp || 1) * part.maxHpPct);
          const pct    = Math.max(0, Math.floor((hp / maxHp) * 100));
          const dead   = hp <= 0;
          const target = rpg.targetedPart === partId;
          return `
            <button
              id="bp-btn-${partId}"
              onclick="rpg.setTargetPart('${partId}')"
              class="bp-btn ${dead ? 'bp-destroyed' : target ? 'bp-targeted' : ''}"
              style="
                flex:1; padding:6px 4px; border-radius:10px; border:1px solid;
                border-color:${dead ? 'rgba(239,68,68,0.2)' : target ? '#f59e0b' : 'rgba(255,255,255,0.08)'};
                background:${dead ? 'rgba(0,0,0,0.2)' : target ? 'rgba(245,158,11,0.12)' : 'rgba(0,0,0,0.4)'};
                text-align:center; cursor:${dead ? 'not-allowed' : 'pointer'};
                position:relative; overflow:hidden;
              "
              ${dead ? 'disabled' : ''}
            >
              ${dead ? `<div class="bp-part-destroyed-overlay">DESTRUÍDO</div>` : ''}
              <div style="font-size:16px;line-height:1;margin-bottom:2px;">${part.icon}</div>
              <div style="font-family:'Orbitron',monospace;font-size:6px;font-weight:900;letter-spacing:0.1em;color:${dead ? '#ef4444' : target ? '#f59e0b' : '#9ca3af'};text-transform:uppercase;">${part.label[rpg.lang || 'pt']}</div>
              <div class="bp-hp-bar-track">
                <div class="bp-hp-bar" style="width:${pct}%;background:${dead ? '#ef4444' : target ? '#f59e0b' : '#6b7280'};"></div>
              </div>
              <div style="font-family:'Fira Code',monospace;font-size:7px;color:${dead ? '#ef4444' : '#52525b'};margin-top:2px;">
                ${dead ? 'x' : pct + '%'}
              </div>
            </button>
          `;
        }).join('')}
      </div>
      <div id="boss-parts-target-label">
        ${rpg.targetedPart
          ? `⚔ Alvo: ${parts[rpg.targetedPart]?.icon} ${parts[rpg.targetedPart]?.label[rpg.lang || 'pt']}`
          : '— Sem alvo selecionado —'
        }
      </div>
    `;
  }

  // ── Animação de hit numa parte ────────────────────────────────
  function animatePartHit(partId, dmg) {
    const btn = document.getElementById(`bp-btn-${partId}`);
    if (!btn) return;

    btn.classList.add('bp-hit-anim');
    btn.addEventListener('animationend', () => btn.classList.remove('bp-hit-anim'), { once: true });

    // Popup de dano
    const pop = document.createElement('div');
    pop.className = 'bp-dmg-pop';
    pop.textContent = '-' + formatNum(dmg);
    btn.appendChild(pop);
    pop.addEventListener('animationend', () => pop.remove(), { once: true });
  }

  // ── Animação de destruição ────────────────────────────────────
  function animatePartDestroy(partId) {
    const btn = document.getElementById(`bp-btn-${partId}`);
    if (!btn) return;
    btn.classList.add('bp-destroy-anim');
    btn.addEventListener('animationend', () => btn.classList.remove('bp-destroy-anim'), { once: true });

    // Screen flash vermelho
    const flash = document.getElementById('flash-overlay');
    if (flash) {
      flash.style.background = 'rgba(239,68,68,0.3)';
      setTimeout(() => { flash.style.background = ''; }, 300);
    }
  }

  // ── Aplicar drop de parte ─────────────────────────────────────
  function applyPartDrop(partId) {
    const drop = PART_DROPS[partId];
    if (!drop) return;

    // Gold bonus
    if (drop.goldBonus) {
      rpg.gold = (rpg.gold || 0) + drop.goldBonus;
    }
    // XP bonus
    if (drop.xpBonus) {
      rpg.xp = (rpg.xp || 0) + drop.xpBonus;
    }
    // Stat bonuses (temporários para a batalha)
    if (drop.atkBonus) {
      rpg._partAtkBonus = (rpg._partAtkBonus || 0) + drop.atkBonus;
    }
    if (drop.defBonus) {
      rpg._partDefBonus = (rpg._partDefBonus || 0) + drop.defBonus;
    }

    // Registar drop no histórico
    if (!rpg._partDropsThisBattle) rpg._partDropsThisBattle = [];
    rpg._partDropsThisBattle.push(drop);

    // Toast de drop
    showPartDropToast(drop);
  }

  function showPartDropToast(drop) {
    let toast = document.getElementById('bp-drop-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'bp-drop-toast';
      toast.style.cssText = `
        position:fixed; top:120px; left:50%; transform:translateX(-50%) translateY(-10px);
        z-index:9500; background:rgba(8,8,18,0.97);
        border:1px solid rgba(245,158,11,0.5); border-radius:12px;
        padding:10px 16px; font-family:'Orbitron',monospace; font-size:8px;
        font-weight:900; letter-spacing:0.1em; color:#fcd34d; text-align:center;
        box-shadow:0 0 20px rgba(245,158,11,0.3); opacity:0;
        transition:all 0.3s ease; pointer-events:none; white-space:nowrap;
      `;
      document.body.appendChild(toast);
    }
    toast.innerHTML = `${drop.icon} DROP: ${drop.name.toUpperCase()}<br><span style="font-size:7px;color:#f59e0b;font-weight:400;">+${drop.goldBonus}💰 +${drop.xpBonus}XP</span>`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(-10px)';
    }, 3500);
  }

  // ── formatNum helper ──────────────────────────────────────────
  function formatNum(n) {
    if (typeof formatNumber === 'function') return formatNumber(n);
    if (n >= 1e6) return (n/1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n/1e3).toFixed(1) + 'K';
    return String(n);
  }

  // ── Patch: dealDamageToMonster → aplica dano às partes ────────
  function patchDealDamage() {
    if (!rpg.dealDamageToMonster) return;
    const _orig = rpg.dealDamageToMonster.bind(rpg);
    rpg.dealDamageToMonster = function(baseDmg, atkType, isUltimate) {
      // Dano nas partes (20% do dano total vai para a parte selecionada)
      if (this.BOSS_PARTS_ACTIVE && this.targetedPart && this.isBossFight) {
        const partDmg = Math.floor(baseDmg * 0.3);
        if (partDmg > 0 && this.bossPartHP[this.targetedPart] > 0) {
          animatePartHit(this.targetedPart, partDmg);
          this.damageBossPart && this.damageBossPart(partDmg);
          renderBossPartsUI();
        }
      }
      return _orig(baseDmg, atkType, isUltimate);
    };
  }

  // ── Patch: damageBossPart → adiciona drop e animação de destroy
  function patchDamageBossPart() {
    if (!rpg.damageBossPart) return;
    const _orig = rpg.damageBossPart.bind(rpg);
    rpg.damageBossPart = function(dmg) {
      const partId   = this.targetedPart;
      const hpBefore = this.bossPartHP[partId] || 0;
      _orig(dmg);
      const hpAfter  = this.bossPartHP[partId] || 0;

      // Parte acabou de ser destruída?
      if (hpBefore > 0 && hpAfter <= 0) {
        animatePartDestroy(partId);
        applyPartDrop(partId);
      }
      renderBossPartsUI();
    };
  }

  // ── Patch: initBossParts → usa o render melhorado ─────────────
  function patchInitBossParts() {
    if (!rpg.initBossParts) return;
    const _orig = rpg.initBossParts.bind(rpg);
    rpg.initBossParts = function() {
      _orig();
      this._partAtkBonus  = 0;
      this._partDefBonus  = 0;
      this._partDropsThisBattle = [];
      renderBossPartsUI();
    };
  }

  // ── Patch: renderBossPartsUI → usa a versão melhorada ─────────
  function patchRenderBossPartsUI() {
    rpg.renderBossPartsUI = renderBossPartsUI;
  }

  // ── Patch: setTargetPart → usa render melhorado ───────────────
  function patchSetTargetPart() {
    if (!rpg.setTargetPart) return;
    const _orig = rpg.setTargetPart.bind(rpg);
    rpg.setTargetPart = function(partId) {
      if (this.bossPartHP[partId] <= 0) {
        if (typeof showToast === 'function') showToast('💥 Esta parte já foi destruída!', 2000);
        return;
      }
      this.targetedPart = partId;
      renderBossPartsUI();
    };
  }

  // ── Patch: endBattle → limpa estado de partes ─────────────────
  function patchEndBattle() {
    const _orig = rpg.endBattle?.bind(rpg);
    if (!_orig) return;
    rpg.endBattle = function() {
      this._partAtkBonus = 0;
      this._partDefBonus = 0;
      this._partDropsThisBattle = [];
      _orig();
    };
  }

  // ── Patch: getAtk → aplica bónus de partes ────────────────────
  function patchGetAtk() {
    const _orig = rpg.getAtk?.bind(rpg);
    if (!_orig) return;
    rpg.getAtk = function() {
      const base = _orig();
      const bonus = this._partAtkBonus || 0;
      return bonus > 0 ? Math.floor(base * (1 + bonus)) : base;
    };
  }

  // ── Sumário de drops ao terminar boss ─────────────────────────
  function showDropSummary() {
    const drops = rpg._partDropsThisBattle;
    if (!drops || !drops.length) return;

    let sum = document.getElementById('bp-summary-toast');
    if (!sum) {
      sum = document.createElement('div');
      sum.id = 'bp-summary-toast';
      sum.style.cssText = `
        position:fixed; top:80px; right:16px; z-index:9400;
        background:rgba(8,8,18,0.97); border:1px solid rgba(245,158,11,0.3);
        border-radius:14px; padding:12px 14px; max-width:220px;
        font-family:'Orbitron',monospace; opacity:0;
        transition:opacity 0.4s ease; pointer-events:none;
      `;
      document.body.appendChild(sum);
    }

    const totalGold = drops.reduce((a, d) => a + (d.goldBonus || 0), 0);
    const totalXp   = drops.reduce((a, d) => a + (d.xpBonus   || 0), 0);

    sum.innerHTML = `
      <div style="font-size:8px;font-weight:900;color:#f59e0b;letter-spacing:0.15em;margin-bottom:6px;">✦ PARTES DO BOSS DESTRUÍDAS</div>
      ${drops.map(d => `<div style="font-family:'Rajdhani',sans-serif;font-size:11px;color:#d4d4d8;margin-bottom:2px;">${d.icon} ${d.name}</div>`).join('')}
      <div style="font-family:'Fira Code',monospace;font-size:8px;color:#34d399;margin-top:6px;">+${formatNum(totalGold)}💰 +${formatNum(totalXp)}XP bónus</div>
    `;
    sum.style.opacity = '1';
    setTimeout(() => { sum.style.opacity = '0'; }, 6000);
  }

  // ── Hook em killMonster para mostrar sumário ──────────────────
  function hookKillMonster() {
    const _orig = rpg.killMonster?.bind(rpg);
    if (!_orig) return;
    rpg.killMonster = function() {
      if (this.isBossFight) {
        setTimeout(showDropSummary, 800);
      }
      return _orig();
    };
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    injectStyles();
    patchDealDamage();
    patchDamageBossPart();
    patchInitBossParts();
    patchRenderBossPartsUI();
    patchSetTargetPart();
    patchEndBattle();
    patchGetAtk();
    hookKillMonster();

    // Expõe API pública
    window._bossPartsDestructible = {
      PART_DROPS,
      renderUI: renderBossPartsUI,
      animateHit: animatePartHit,
      animateDestroy: animatePartDestroy,
    };

    console.log('[BossPartsDestructible] ✅ Carregado — 3 partes com drops e animações');
  }

  function waitForRpg(cb, n) {
    if (window.rpg?.dealDamageToMonster && window.rpg?.initBossParts) cb();
    else if ((n || 0) < 40) setTimeout(() => waitForRpg(cb, (n || 0) + 1), 200);
    else { console.warn('[BossPartsDestructible] timeout esperando rpg'); cb(); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => waitForRpg(init));
  } else {
    waitForRpg(init);
  }

})();
