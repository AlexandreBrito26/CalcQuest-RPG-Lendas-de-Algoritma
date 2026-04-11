// ═══════════════════════════════════════════════════════════════
// fix-final.js — CORREÇÃO DEFINITIVA: NG+ e Classes
// Carregado DEPOIS de todos os outros módulos.
// Não depende de ng-plus-v3.js nem de v25-megafix.js.
// Substitui completamente openNgPlus() e openClassPanel().
// ═══════════════════════════════════════════════════════════════
(function FixFinal() {
  'use strict';

  // ─────────────────────────────────────────────────────────────
  // CSS GLOBAL — garante que todos os modais aparecem
  // ─────────────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.id = 'fix-final-css';
  style.textContent = `
    /* Modal do NG+ — controlo por ID para não conflitar com outros modais */
    #ngplus-modal {
      display: none !important;
      position: fixed !important;
      inset: 0 !important;
      align-items: center !important;
      justify-content: center !important;
      z-index: 10001 !important;
      background: rgba(0,0,0,0.9);
      backdrop-filter: blur(8px);
    }
    #ngplus-modal.active {
      display: flex !important;
      pointer-events: auto !important;
    }
    #ngplus-modal .modal-content {
      transform: none !important;
      opacity: 1 !important;
    }

    /* Modal de Classes */
    #fix-class-modal {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 10000;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,0.88);
      backdrop-filter: blur(8px);
    }
    #fix-class-modal.open {
      display: flex !important;
    }
  `;
  document.head.appendChild(style);

  // ─────────────────────────────────────────────────────────────
  // UTILS
  // ─────────────────────────────────────────────────────────────
  function getRpg() {
    return (typeof rpg !== 'undefined' && rpg && rpg.classes) ? rpg : null;
  }

  function waitRpg(cb, n) {
    n = n || 0;
    const r = getRpg();
    if (r) { cb(r); return; }
    if (n < 60) setTimeout(() => waitRpg(cb, n + 1), 200);
    else console.warn('[FixFinal] RPG não encontrado após 12s');
  }

  function fmt(n) {
    if (!n && n !== 0) return '0';
    if (n >= 1e18) return (n/1e18).toFixed(1)+'Qi';
    if (n >= 1e15) return (n/1e15).toFixed(1)+'Qa';
    if (n >= 1e12) return (n/1e12).toFixed(1)+'T';
    if (n >= 1e9)  return (n/1e9).toFixed(1)+'B';
    if (n >= 1e6)  return (n/1e6).toFixed(1)+'M';
    if (n >= 1e3)  return (n/1e3).toFixed(1)+'K';
    return String(n);
  }

  function openModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.add('active');
  }

  function closeModalById(id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove('active');
  }

  // ─────────────────────────────────────────────────────────────
  // NG+ — VERSÃO DEFINITIVA
  // ─────────────────────────────────────────────────────────────
  function renderNgPlus(r) {
    const el = document.getElementById('ngplus-body');
    if (!el) return;

    const ng      = r.ngPlusActive || 0;
    const bosses  = r.bossKills || 0;
    const total   = (r.actBosses || []).length || 19;
    const can     = bosses >= total;
    const pct     = Math.min(100, Math.round((bosses / Math.max(total,1)) * 100));

    const ENEMY_MULT  = r.NG_ENEMY_MULT  || [1,3,6,10,15];
    const REWARD_MULT = r.NG_REWARD_MULT || [1,5,10,20,40];

    const CYCLES = [
      { label:'NORMAL',  color:'#94a3b8', title:'🌱 Início'           },
      { label:'NG+1',    color:'#a855f7', title:'🔮 Renascido'         },
      { label:'NG+2',    color:'#f97316', title:'🔥 Forjado no Caos'   },
      { label:'NG+3',    color:'#ef4444', title:'💀 Além do Código'    },
      { label:'NG+4',    color:'#ffd60a', title:'👑 O Inevitável'      },
    ];

    const curr     = CYCLES[Math.min(ng, 4)];
    const nextIdx  = Math.min(ng + 1, 4);
    const next     = CYCLES[nextIdx];
    const nextEM   = ENEMY_MULT[nextIdx]  || (15 + (ng-3)*5);
    const nextRM   = REWARD_MULT[nextIdx] || (40 + (ng-3)*15);
    const currEM   = ENEMY_MULT[Math.min(ng,4)] || 1;
    const currRM   = REWARD_MULT[Math.min(ng,4)] || 1;

    el.innerHTML = `
      <!-- Ciclo Atual -->
      <div style="text-align:center;padding:14px;border-radius:14px;margin-bottom:10px;
        background:rgba(0,0,0,0.5);border:1px solid ${curr.color}30;">
        <div style="font-size:28px;font-weight:900;color:${curr.color};
          font-family:'Orbitron',sans-serif;text-shadow:0 0 16px ${curr.color}88;">
          ${curr.label}
        </div>
        <div style="font-size:9px;color:${curr.color};font-family:'Orbitron',sans-serif;
          letter-spacing:0.14em;margin-top:2px;">${curr.title}</div>
        ${ng > 0 ? `
        <div style="display:flex;justify-content:center;gap:20px;margin-top:8px;font-size:11px;">
          <span style="color:#9ca3af;">Inimigos <strong style="color:#f97316;">${currEM}×</strong></span>
          <span style="color:#9ca3af;">Rewards <strong style="color:#34d399;">${currRM}×</strong></span>
        </div>` : ''}
      </div>

      <!-- Progresso de Bosses -->
      <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.07);
        border-radius:12px;padding:12px;margin-bottom:10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <span style="font-size:8px;font-family:'Orbitron',sans-serif;color:#52525b;
            letter-spacing:0.12em;text-transform:uppercase;">⚔ Guardiões Derrotados</span>
          <span style="font-size:14px;font-weight:900;font-family:'Fira Code',monospace;
            color:${can ? '#34d399' : '#a1a1aa'};">${bosses}<span style="color:#52525b;">/${total}</span></span>
        </div>
        <div style="height:9px;background:rgba(0,0,0,0.6);border-radius:99px;overflow:hidden;
          border:1px solid rgba(255,255,255,0.05);margin-bottom:6px;">
          <div style="height:100%;width:${pct}%;
            background:${can
              ? 'linear-gradient(90deg,#059669,#34d399)'
              : 'linear-gradient(90deg,#7c3aed,#a855f7)'};
            border-radius:99px;transition:width 0.6s;"></div>
        </div>
        <div style="font-size:8.5px;text-align:center;font-weight:700;font-family:'Fira Code',monospace;
          color:${can ? '#34d399' : '#f87171'};">
          ${can
            ? '✅ Todos os Guardiões derrotados — NG+ disponível!'
            : `🔒 Faltam ${total - bosses} guardiões (${pct}%)`}
        </div>
      </div>

      <!-- Próximo Ciclo -->
      <div style="background:rgba(0,0,0,0.35);border:1px solid rgba(255,255,255,0.06);
        border-radius:12px;padding:12px;margin-bottom:10px;">
        <div style="font-size:8px;font-family:'Orbitron',sans-serif;color:#52525b;
          letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px;">
          ⚡ Próximo: ${next.label} — ${next.title}
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">
          <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(249,115,22,0.2);
            border-radius:8px;padding:8px;text-align:center;">
            <div style="font-size:8px;color:#52525b;margin-bottom:3px;font-family:'Fira Code',monospace;">Inimigos</div>
            <div style="font-size:14px;font-weight:900;color:#f97316;font-family:'Orbitron',sans-serif;">${nextEM}×</div>
          </div>
          <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(52,211,153,0.2);
            border-radius:8px;padding:8px;text-align:center;">
            <div style="font-size:8px;color:#52525b;margin-bottom:3px;font-family:'Fira Code',monospace;">Recompensas</div>
            <div style="font-size:14px;font-weight:900;color:#34d399;font-family:'Orbitron',sans-serif;">${nextRM}×</div>
          </div>
        </div>
        <div style="font-size:11px;font-family:'Rajdhani',sans-serif;color:rgba(200,200,220,0.8);line-height:1.5;">
          🔒 <strong style="color:#6ee7b7;">Mantido:</strong> Talentos · Runas · Grimório · Conquistas · Honra<br>
          🔄 <strong style="color:#fca5a5;">Resetado:</strong> Nível · XP · Ouro · Bosses · Itens
        </div>
      </div>

      <!-- Botão / Bloqueado -->
      ${can ? `
        <button id="fix-ng-start-btn"
          style="width:100%;padding:14px;font-family:'Orbitron',sans-serif;font-size:11px;
            font-weight:900;letter-spacing:0.1em;text-transform:uppercase;border-radius:12px;
            cursor:pointer;border:2px solid ${next.color}70;color:${next.color};
            background:linear-gradient(135deg,${next.color}20,${next.color}08);
            box-shadow:0 0 20px ${next.color}44;transition:all 0.2s;">
          🌟 INICIAR ${next.label}
        </button>
      ` : `
        <div style="text-align:center;padding:14px;border-radius:12px;
          background:rgba(0,0,0,0.35);border:1px solid rgba(255,255,255,0.05);">
          <div style="font-size:9px;color:#52525b;font-family:'Orbitron',monospace;letter-spacing:0.08em;">
            🔒 DERROTA TODOS OS GUARDIÕES PRIMEIRO
          </div>
          <div style="font-size:8px;color:#52525b;margin-top:4px;font-family:'Fira Code',monospace;">
            Progresso: ${bosses} / ${total} (${pct}%)
          </div>
        </div>
      `}
    `;

    // Bind botão de iniciar
    const btn = document.getElementById('fix-ng-start-btn');
    if (btn) {
      btn.addEventListener('click', function() {
        const r2 = getRpg();
        if (!r2) return;
        if (r2.bossKills < (r2.actBosses||[]).length) {
          if (typeof showToast === 'function') showToast('⚔ Derrota todos os guardiões primeiro!', 3000);
          return;
        }
        const ok = confirm(
          '🌟 Iniciar ' + next.label + '?\n\n' +
          '✅ Preservado: Talentos, Runas, Grimório, Conquistas, Honra\n' +
          '🔄 Resetado: Nível, XP, Ouro, Bosses, Itens\n\n' +
          'O jogo vai recarregar.'
        );
        if (!ok) return;
        try {
          r2.startNewGamePlus();
        } catch(e) {
          console.error('[FixFinal] startNewGamePlus error:', e);
          if (typeof showToast === 'function') showToast('Erro ao iniciar NG+. Tenta de novo.', 3000);
        }
      });

      btn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
      });
      btn.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    }
  }

  // openNgPlus gerido pelo ng-plus-v4.js — stub mantido para compatibilidade
  function openNgPlusFinal() {
    if (typeof window.openNgPlus === 'function' && !window.openNgPlus._isFixFinal) {
      window.openNgPlus();
    } else {
      const modal = document.getElementById('ngplus-modal');
      if (modal) modal.classList.add('active');
    }
  }
  openNgPlusFinal._isFixFinal = true;

  // ─────────────────────────────────────────────────────────────
  // CLASSES — MODAL INDEPENDENTE
  // ─────────────────────────────────────────────────────────────
  function buildClassCard(c, equipped, lang) {
    try {
      const isActive = c.id === equipped;
      const name = (c.name && (c.name[lang] || c.name.pt || c.name.en)) || c.id || '???';
      const desc = (c.desc && (c.desc[lang] || c.desc.pt || c.desc.en)) || '';
      const color = isActive ? '#34d399' : '#94a3b8';
      const border = isActive ? 'rgba(52,211,153,0.4)' : 'rgba(255,255,255,0.07)';
      const bg = isActive ? 'rgba(52,211,153,0.08)' : 'rgba(0,0,0,0.4)';
      const glow = isActive ? 'box-shadow:0 0 14px rgba(52,211,153,0.25);' : '';

      const stats = [];
      if (c.multHp  && c.multHp  !== 1) stats.push(`❤ ${c.multHp}×HP`);
      if (c.multAtk && c.multAtk !== 1) stats.push(`⚔ ${c.multAtk}×ATK`);
      if (c.addCrit  > 0) stats.push(`✦ +${Math.round(c.addCrit*100)}%Crit`);
      if (c.addDodge > 0) stats.push(`👁 +${Math.round(c.addDodge*100)}%Esq`);

      const reqText = c.reqBosses > 0
        ? `<div style="font-size:7.5px;color:#f87171;margin-top:4px;font-family:'Fira Code',monospace;">Req: ${c.reqBosses} bosses</div>`
        : '';

      const actionBtn = isActive
        ? `<div style="margin-top:8px;padding:4px 0;background:rgba(52,211,153,0.15);border:1px solid rgba(52,211,153,0.35);border-radius:6px;font-size:7.5px;color:#34d399;font-family:'Orbitron',monospace;font-weight:900;letter-spacing:0.08em;text-align:center;">✓ EQUIPADA</div>`
        : `<button onclick="window._fixEquipClass('${c.id}')" style="margin-top:8px;width:100%;padding:5px;background:rgba(148,163,184,0.08);border:1px solid rgba(148,163,184,0.25);border-radius:6px;font-size:7.5px;color:#94a3b8;font-family:'Orbitron',monospace;font-weight:900;letter-spacing:0.06em;cursor:pointer;" onmouseover="this.style.background='rgba(148,163,184,0.18)'" onmouseout="this.style.background='rgba(148,163,184,0.08)'">EQUIPAR</button>`;

      return `
        <div style="background:${bg};border:1px solid ${border};border-radius:12px;padding:10px;${glow}">
          <div style="font-family:'Orbitron',sans-serif;font-size:9px;font-weight:900;
            color:${color};margin-bottom:4px;letter-spacing:0.06em;">${name}</div>
          <div style="font-family:'Rajdhani',sans-serif;font-size:10px;color:rgba(180,180,200,0.85);
            line-height:1.4;margin-bottom:4px;">${desc}</div>
          ${stats.length ? `<div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:4px;">
            ${stats.map(s => `<span style="font-size:7px;padding:1px 5px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.08);border-radius:4px;color:#a1a1aa;font-family:'Fira Code',monospace;">${s}</span>`).join('')}
          </div>` : ''}
          ${reqText}
          ${actionBtn}
        </div>
      `;
    } catch(e) {
      return '';
    }
  }

  function openClassPanelFinal() {
    const r = getRpg();
    if (!r) {
      // RPG ainda carregando — tenta de novo
      setTimeout(openClassPanelFinal, 500);
      return;
    }

    const lang = r.lang || 'pt';
    const equipped = r.eqClass || 'warrior';
    const classes = r.classes || {};
    const classArr = Object.values(classes).filter(c => c && c.id);

    // Cria modal se não existir
    let modal = document.getElementById('fix-class-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'fix-class-modal';
      document.body.appendChild(modal);
      modal.addEventListener('click', function(e) {
        if (e.target === modal) modal.classList.remove('open');
      });
    }

    const currentClass = classes[equipped];
    const currentName = currentClass && currentClass.name
      ? (currentClass.name[lang] || currentClass.name.pt || equipped)
      : equipped;

    const cards = classArr.map(c => buildClassCard(c, equipped, lang)).join('');

    modal.innerHTML = `
      <div style="width:min(95vw,440px);max-height:88vh;display:flex;flex-direction:column;
        background:rgba(8,8,16,0.98);border:1px solid rgba(255,255,255,0.09);
        border-radius:20px;overflow:hidden;box-shadow:0 24px 64px rgba(0,0,0,0.9);">

        <!-- Header -->
        <div style="display:flex;align-items:center;justify-content:space-between;
          padding:16px 18px 12px;border-bottom:1px solid rgba(255,255,255,0.06);flex-shrink:0;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:22px;">⚔️</span>
            <div>
              <div style="font-family:'Orbitron',sans-serif;font-size:14px;font-weight:900;
                color:#fff;letter-spacing:0.1em;">CLASSES</div>
              <div style="font-family:'Fira Code',monospace;font-size:8px;color:#52525b;">
                Atual: <span style="color:#34d399;">${currentName}</span>
                · ${classArr.length} disponíveis
              </div>
            </div>
          </div>
          <button onclick="document.getElementById('fix-class-modal').classList.remove('open')"
            style="width:30px;height:30px;border-radius:8px;background:rgba(255,255,255,0.06);
              border:1px solid rgba(255,255,255,0.1);color:#a1a1aa;cursor:pointer;
              font-size:18px;display:flex;align-items:center;justify-content:center;">×</button>
        </div>

        <!-- Grid de classes -->
        <div style="overflow-y:auto;flex:1;padding:14px 16px 16px;scrollbar-width:none;">
          <style>#fix-class-modal div::-webkit-scrollbar{display:none}</style>
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;">
            ${cards || '<div style="color:#52525b;font-size:11px;text-align:center;padding:20px;">Nenhuma classe encontrada</div>'}
          </div>

          <!-- Sub/Master classes se existirem -->
          ${buildAdvancedSection(r, lang)}
        </div>
      </div>
    `;

    modal.classList.add('open');
  }

  function buildAdvancedSection(r, lang) {
    try {
      const sub = r.equippedSubclass;
      const master = r.equippedMasterclass;
      const subDefs = r.SUBCLASS_DEFS ? Object.values(r.SUBCLASS_DEFS).flat() : [];
      const masterDefs = r.MASTERCLASS_DEFS || [];
      const unlockedSubs = r.unlockedSubclasses || [];
      const unlockedMasters = r.unlockedMasterclasses || [];

      const availSubs = subDefs.filter(d => d && d.id && unlockedSubs.includes(d.id));
      const availMasters = masterDefs.filter(d => d && d.id && unlockedMasters.includes(d.id));

      if (!availSubs.length && !availMasters.length) return '';

      let html = `<div style="margin-top:16px;">`;

      if (availSubs.length) {
        html += `
          <div style="font-family:'Orbitron',sans-serif;font-size:8px;font-weight:900;
            color:#34d399;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px;
            display:flex;align-items:center;gap:6px;">
            🌿 SUB-CLASSES
            <div style="flex:1;height:1px;background:linear-gradient(90deg,rgba(52,211,153,0.4),transparent);"></div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:12px;">
            ${availSubs.map(c => buildAdvCard(c, sub, '#34d399', 'sub', lang)).join('')}
          </div>`;
      }

      if (availMasters.length) {
        html += `
          <div style="font-family:'Orbitron',sans-serif;font-size:8px;font-weight:900;
            color:#a855f7;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px;
            display:flex;align-items:center;gap:6px;">
            💎 MASTERCLASSES
            <div style="flex:1;height:1px;background:linear-gradient(90deg,rgba(168,85,247,0.4),transparent);"></div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;">
            ${availMasters.map(c => buildAdvCard(c, master, '#a855f7', 'master', lang)).join('')}
          </div>`;
      }

      return html + '</div>';
    } catch(e) {
      return '';
    }
  }

  function buildAdvCard(c, equippedId, color, tier, lang) {
    try {
      const isActive = c.id === equippedId;
      const name = (c.name && (c.name[lang] || c.name.pt || c.name.en)) || c.id || '???';
      const desc = (c.desc && (c.desc[lang] || c.desc.pt || c.desc.en)) || '';
      const fnName = tier === 'sub' ? `window._fixEquipSub('${c.id}')` : `window._fixEquipMaster('${c.id}')`;

      return `
        <div style="background:${isActive ? color+'10' : 'rgba(0,0,0,0.4)'};
          border:1px solid ${isActive ? color+'44' : 'rgba(255,255,255,0.06)'};
          border-radius:10px;padding:10px;">
          <div style="font-family:'Orbitron',sans-serif;font-size:8.5px;font-weight:900;
            color:${isActive ? color : '#e4e4e7'};margin-bottom:4px;">${name}</div>
          <div style="font-size:9.5px;font-family:'Rajdhani',sans-serif;
            color:rgba(180,180,200,0.8);line-height:1.4;margin-bottom:6px;">${desc}</div>
          ${isActive
            ? `<div style="padding:3px 0;background:${color}18;border:1px solid ${color}44;border-radius:5px;font-size:7px;color:${color};font-family:'Orbitron',monospace;font-weight:900;text-align:center;">✓ EQUIPADA</div>`
            : `<button onclick="${fnName}" style="width:100%;padding:4px;background:${color}10;border:1px solid ${color}33;border-radius:5px;font-size:7px;color:${color};font-family:'Orbitron',monospace;font-weight:900;cursor:pointer;">EQUIPAR</button>`
          }
        </div>
      `;
    } catch(e) { return ''; }
  }

  // Funções de equip expostas globalmente
  window._fixEquipClass = function(id) {
    const r = getRpg();
    if (!r) return;
    try {
      r.changeClass(id);
      setTimeout(openClassPanelFinal, 300);
    } catch(e) { console.error('[FixFinal] changeClass:', e); }
  };

  window._fixEquipSub = function(id) {
    const r = getRpg();
    if (!r) return;
    try {
      const defs = Object.values(r.SUBCLASS_DEFS || {}).flat();
      const sc = defs.find(d => d.id === id);
      if (!sc) return;
      r.equippedSubclass = id;
      localStorage.setItem('rpg_eq_subclass', id);
      if (sc.multHp)  r.permAllBonus = (r.permAllBonus||0) + (sc.multHp-1);
      if (sc.multAtk) r.permAtkBonus = (r.permAtkBonus||0) + (sc.multAtk-1);
      if (sc.addCrit) r.permCritBonus = (r.permCritBonus||0) + sc.addCrit;
      r.save(); r.updateUI();
      const name = (sc.name && (sc.name[r.lang] || sc.name.pt)) || id;
      if (typeof showToast === 'function') showToast('🌿 Sub-Classe equipada: ' + name + '!', 3000);
      setTimeout(openClassPanelFinal, 300);
    } catch(e) { console.error('[FixFinal] equipSub:', e); }
  };

  window._fixEquipMaster = function(id) {
    const r = getRpg();
    if (!r) return;
    try {
      const mc = (r.MASTERCLASS_DEFS||[]).find(d => d.id === id);
      if (!mc) return;
      r.equippedMasterclass = id;
      localStorage.setItem('rpg_eq_masterclass', id);
      if (mc.multHp)  r.permAllBonus = (r.permAllBonus||0) + (mc.multHp-1)*0.5;
      if (mc.multAtk) r.permAtkBonus = (r.permAtkBonus||0) + (mc.multAtk-1)*0.5;
      if (mc.addCrit) r.permCritBonus = (r.permCritBonus||0) + mc.addCrit*0.5;
      r.save(); r.updateUI();
      const name = (mc.name && (mc.name[r.lang] || mc.name.pt)) || id;
      if (typeof showToast === 'function') showToast('💎 MasterClass equipada: ' + name + '!', 4000);
      setTimeout(openClassPanelFinal, 300);
    } catch(e) { console.error('[FixFinal] equipMaster:', e); }
  };

  // ─────────────────────────────────────────────────────────────
  // REGISTRO GLOBAL — substitui TODAS as versões anteriores
  // ─────────────────────────────────────────────────────────────
  function register() {
    // openNgPlus é gerido exclusivamente pelo ng-plus-v4.js (carregado depois)
    // Aqui só registamos openClassPanel
    window.openClassPanel = openClassPanelFinal;

    document.querySelectorAll('[onclick*="openClassPanel"]').forEach(btn => {
      btn.onclick = openClassPanelFinal;
    });

    console.log('[FixFinal] ✅ openClassPanel registado com sucesso');
  }

  // ─────────────────────────────────────────────────────────────
  // INIT — espera DOM pronto e re-registra após todos os módulos
  // ─────────────────────────────────────────────────────────────
  function init() {
    register();
    // Re-registra depois de outros módulos que possam sobrescrever
    setTimeout(register, 500);
    setTimeout(register, 1500);
    setTimeout(register, 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
