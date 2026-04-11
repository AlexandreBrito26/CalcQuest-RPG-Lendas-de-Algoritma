// ═══════════════════════════════════════════════════════════════════════════
// MODULE: v25-megafix.js  —  PATCH COMPLETO V25
// ─────────────────────────────────────────────────────────────────────────
// CORRIGE:
//   1. NG+ — força abertura correta do modal
//   2. HUD de batalha — texto colado / overflow
//   3. Menu principal — remove "ALDEIA: EM RUÍNAS" do topbar mobile
//   4. Sistema de Classes — modal completo com 20 classes + subclasses
//      masterclasses, ultraclasses e godclasses com UI nova
//   5. Botão Classes no menu Taverna
//   6. Limpeza do menu principal (remove poluição visual)
// ═══════════════════════════════════════════════════════════════════════════
(function V25MegaFix() {
  'use strict';

  // ─────────────────────────────────────────────────────────────────────────
  // 0. UTILS
  // ─────────────────────────────────────────────────────────────────────────
  function waitFor(fn, cb, tries) {
    tries = tries || 0;
    if (fn()) { cb(); return; }
    if (tries < 80) setTimeout(() => waitFor(fn, cb, tries + 1), 150);
  }
  function ready(cb) {
    if (document.readyState === 'loading')
      document.addEventListener('DOMContentLoaded', cb);
    else cb();
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 1. REMOVER "ALDEIA: EM RUÍNAS" DO TOPBAR MOBILE
  // ─────────────────────────────────────────────────────────────────────────
  function fixVillageTopbar() {
    // Remove ou limpa o label laranja poluente
    const label = document.getElementById('mob-location-label');
    if (label) {
      label.style.display = 'none';
    }
    // Oculta o indicador de estado da aldeia no menu
    const indicator = document.getElementById('village-state-indicator');
    if (indicator) indicator.style.display = 'none';

    // Observa criações futuras desse elemento
    const obs = new MutationObserver(() => {
      const l2 = document.getElementById('mob-location-label');
      if (l2) l2.style.display = 'none';
      const ind2 = document.getElementById('village-state-indicator');
      if (ind2) ind2.style.display = 'none';
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 2. FIX HUD DE BATALHA — TEXTO COLADO / OVERFLOW
  // ─────────────────────────────────────────────────────────────────────────
  function injectHUDFix() {
    if (document.getElementById('v25-hud-fix')) return;
    const s = document.createElement('style');
    s.id = 'v25-hud-fix';
    s.textContent = `
      /* ── COMBAT HUD FIX v25 ── */
      #game-container .flex.justify-between.items-center.mb-3,
      #game-container > .flex.items-center.gap-2 {
        gap: 6px !important;
        padding: 0 0 6px !important;
      }

      /* Nomes — sem overflow */
      #battle-hero-name, #monster-name {
        font-size: 9px !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        max-width: 100px !important;
        display: block !important;
        line-height: 1.2 !important;
      }
      #monster-name { text-align: right !important; }

      /* HP texts */
      #hero-hp-text, #monster-hp-text {
        font-size: 8px !important;
        white-space: nowrap !important;
        line-height: 1.2 !important;
      }
      #monster-hp-text { text-align: right !important; }

      /* Lados do HUD */
      #game-container [id*="hero"] ~ div,
      #game-container [id*="monster"] ~ div {
        min-width: 0 !important;
      }

      /* Badge dificuldade */
      #battle-diff-badge {
        font-size: 7px !important;
        padding: 1px 4px !important;
        white-space: nowrap !important;
      }

      /* Botões de ação da batalha — grid limpo */
      #btn-atk, #btn-mag, #btn-def, #btn-heal {
        font-size: 9px !important;
        padding: 10px 4px !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        gap: 4px !important;
      }
      #btn-atk span, #btn-mag span, #btn-def span, #btn-heal span {
        font-size: 8px !important;
        letter-spacing: 0.04em !important;
      }

      /* Log de combate — sem texto colado */
      #battle-log, #combat-log, .battle-log {
        font-size: 9px !important;
        line-height: 1.5 !important;
        padding: 6px 8px !important;
        gap: 2px !important;
      }
      #battle-log p, #combat-log p, .battle-log p,
      #battle-log div, #combat-log div {
        margin-bottom: 2px !important;
        padding: 1px 0 !important;
      }

      /* Arena container — sem overflow */
      #arena-container {
        overflow: hidden !important;
        position: relative !important;
      }

      /* Topbar de batalha */
      #game-container > div:first-child {
        align-items: center !important;
      }

      /* Experiência label */
      #battle-xp-section, [id*="experiencia"], [id*="xp-section"] {
        font-size: 9px !important;
      }

      /* Mob-topbar — ocultar aviso de localização no menu */
      #mob-location-label { display: none !important; }
      #village-state-indicator { display: none !important; }
    `;
    document.head.appendChild(s);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 3. FIX NG+ — GARANTIR QUE O BOTÃO ABRE O MODAL
  // ─────────────────────────────────────────────────────────────────────────
  function fixNgPlus() {
    // ng-plus-v4.js e fix-final.js gerem o CSS do modal — removido daqui para evitar conflitos
    // Garante que botões inline usam a função mais recente
    setTimeout(() => {
      document.querySelectorAll('[onclick*="openNgPlus"]').forEach(btn => {
        btn.onclick = () => window.openNgPlus();
      });
    }, 1500);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 4. SISTEMA COMPLETO DE CLASSES — MODAL COM 5 TIERS
  // ─────────────────────────────────────────────────────────────────────────

  // Tier colors & labels
  const TIER_CONFIG = {
    base:        { label: 'CLASSES BASE',       color: '#94a3b8', glow: 'rgba(148,163,184,0.3)', icon: '⚔️' },
    sub:         { label: 'SUB-CLASSES',        color: '#34d399', glow: 'rgba(52,211,153,0.3)',  icon: '🌿' },
    master:      { label: 'MASTERCLASSES',      color: '#a855f7', glow: 'rgba(168,85,247,0.3)',  icon: '💎' },
    ultra:       { label: 'ULTRACLASSES',       color: '#f97316', glow: 'rgba(249,115,22,0.35)', icon: '🔥' },
    god:         { label: 'GOD CLASSES',        color: '#ffd60a', glow: 'rgba(255,214,10,0.45)', icon: '⚡' },
  };

  // Ultraclasses — novo tier entre Master e God
  const ULTRACLASS_DEFS = [
    { id:'uc_eternal_blade',  name:{pt:'Lâmina Eterna',   en:'Eternal Blade'  }, icon:'swords',   color:'text-orange-400',
      desc:{pt:'+300% ATK, Ataques duplos a cada 5 golpes', en:'+300% ATK, Double attacks every 5 hits'},
      req:{level:120, bosses:8, masterclass:true}, multHp:2.0, multAtk:4.0, addCrit:0.50, addDodge:0.25 },
    { id:'uc_void_emperor',   name:{pt:'Imperador do Vazio', en:'Void Emperor'}, icon:'crown',     color:'text-violet-400',
      desc:{pt:'+400% HP/ATK, Imune a status negativos', en:'+400% HP/ATK, Immune to negative status'},
      req:{level:120, bosses:8, masterclass:true}, multHp:5.0, multAtk:5.0, addCrit:0.45, addDodge:0.45 },
    { id:'uc_shadow_king',    name:{pt:'Rei Sombra',      en:'Shadow King'    }, icon:'moon',      color:'text-indigo-400',
      desc:{pt:'+350% Esq/Crit, Ataques drenam 30% HP', en:'+350% Dodge/Crit, Attacks drain 30% HP'},
      req:{level:120, bosses:8, masterclass:true}, multHp:1.5, multAtk:3.5, addCrit:0.75, addDodge:0.75 },
    { id:'uc_storm_herald',   name:{pt:'Arauto da Tempestade', en:'Storm Herald'}, icon:'zap',    color:'text-cyan-400',
      desc:{pt:'+300% ATK, 40% chance de ataque em cadeia', en:'+300% ATK, 40% chain attack chance'},
      req:{level:120, bosses:8, masterclass:true}, multHp:2.5, multAtk:4.0, addCrit:0.60, addDodge:0.30 },
    { id:'uc_divine_wrath',   name:{pt:'Ira Divina',     en:'Divine Wrath'   }, icon:'flame',     color:'text-amber-400',
      desc:{pt:'+500% ATK Sagrado, ignora todas resistências', en:'+500% Holy ATK, ignores all resistances'},
      req:{level:120, bosses:8, masterclass:true}, multHp:3.0, multAtk:6.0, addCrit:0.55, addDodge:0.20 },
    { id:'uc_time_lord',      name:{pt:'Senhor do Tempo', en:'Time Lord'     }, icon:'clock',     color:'text-teal-400',
      desc:{pt:'Todos CDs -80%, +400% ATK', en:'All CDs -80%, +400% ATK'},
      req:{level:120, bosses:8, masterclass:true}, multHp:2.0, multAtk:5.0, addCrit:0.65, addDodge:0.40 },
  ];

  function getUltraclasses() {
    return ULTRACLASS_DEFS;
  }

  function getEquippedTier(r) {
    return {
      base:   r.eqClass || null,
      sub:    r.equippedSubclass || null,
      master: r.equippedMasterclass || null,
      ultra:  r.equippedUltraclass || localStorage.getItem('rpg_eq_ultraclass') || null,
      god:    r.equippedGodclass || null,
    };
  }

  function getUnlockedForTier(r, tier) {
    if (tier === 'base')   return Object.keys(r.classes || {});
    if (tier === 'sub')    return r.unlockedSubclasses || [];
    if (tier === 'master') return r.unlockedMasterclasses || [];
    if (tier === 'ultra')  return JSON.parse(localStorage.getItem('rpg_ultraclasses') || '[]');
    if (tier === 'god')    return r.unlockedGodclasses || [];
    return [];
  }

  // Checar se ultraclasses estão disponíveis
  function checkUltraclasses(r) {
    const unlocked = JSON.parse(localStorage.getItem('rpg_ultraclasses') || '[]');
    const bossesDefeated = (r.defeatedBosses || []).length;
    const hasMasterclass = !!r.equippedMasterclass;

    ULTRACLASS_DEFS.forEach(uc => {
      if (!unlocked.includes(uc.id)) {
        if (r.level >= uc.req.level && bossesDefeated >= uc.req.bosses && hasMasterclass) {
          unlocked.push(uc.id);
          localStorage.setItem('rpg_ultraclasses', JSON.stringify(unlocked));
          if (typeof showToast === 'function') {
            showToast('🔥 ULTRACLASS Desbloqueada: ' + (uc.name.pt) + '!', 6000);
          }
        }
      }
    });
  }

  // Modal de classes — UI completa com 5 tiers
  function openClassPanel() {
    const r = window.rpg;
    if (!r || typeof r.classes === 'undefined') {
      // RPG ainda inicializando — tenta novamente em 500ms
      if (typeof showToast === 'function') showToast('⏳ Carregando...', 1500);
      setTimeout(openClassPanel, 600);
      return;
    }

    try {
      // Checar novas classes
      if (typeof r.checkAdvancedClasses === 'function') r.checkAdvancedClasses();
      checkUltraclasses(r);
    } catch(e) { console.warn('[V25] checkClasses:', e); }

    let modal = document.getElementById('v25-class-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'v25-class-modal';
      modal.className = 'modal-overlay';
      // Sem display inline — o CSS .active cuida disso
      modal.style.cssText = `
        position:fixed;inset:0;z-index:9999;
        align-items:center;justify-content:center;
        background:rgba(0,0,0,0.85);backdrop-filter:blur(6px);
      `;
      document.body.appendChild(modal);
      modal.addEventListener('click', e => {
        if (e.target === modal) modal.classList.remove('active');
      });
    }

    const equipped = getEquippedTier(r);
    const lang = r.lang || 'pt';

    function renderTierSection(tier, defs, getLabel, isBase) {
      try {
      const tc = TIER_CONFIG[tier];
      const unlockedIds = getUnlockedForTier(r, tier);
      const equippedId = equipped[tier];
      const rawDefs = isBase ? Object.values(defs || {}) : (Array.isArray(defs) ? defs : []);
      const filteredDefs = isBase
        ? rawDefs.filter(d => d && d.id)
        : rawDefs.filter(d => d && d.id && unlockedIds.includes(d.id));
      const lockedDefs = isBase
        ? []
        : rawDefs.filter(d => d && d.id && !unlockedIds.includes(d.id));

      const allDefs = [...filteredDefs, ...lockedDefs.slice(0, 3)];

      if (!isBase && allDefs.length === 0) return '';

      const cards = allDefs.map(c => {
        try {
        const isLocked = !isBase && !unlockedIds.includes(c.id);
        const isActive = c.id === equippedId || (isBase && c.id === equipped.base);
        const name = (c.name && (c.name[lang] || c.name.pt || c.name.en)) || c.id || '???';
        const desc = (c.desc && (c.desc[lang] || c.desc.pt || c.desc.en)) || '';
        const icon = c.icon || 'star';
        const reqText = isLocked && c.req
          ? `Req: Lv${c.req.level || '?'} · ${c.req.bosses || 0} bosses${c.req.masterclass ? ' · MasterClass' : ''}`
          : '';

        let btnHtml = '';
        if (isActive) {
          btnHtml = `<div style="margin-top:6px;padding:4px 8px;background:rgba(52,211,153,0.15);border:1px solid rgba(52,211,153,0.4);border-radius:6px;font-size:8px;color:#34d399;font-family:'Orbitron',monospace;font-weight:900;letter-spacing:0.08em;text-align:center;">✓ EQUIPADA</div>`;
        } else if (isLocked) {
          btnHtml = `<div style="margin-top:6px;padding:4px 8px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.06);border-radius:6px;font-size:7.5px;color:#52525b;font-family:'Fira Code',monospace;text-align:center;">${reqText}</div>`;
        } else {
          const onclickFn = isBase
            ? `window._v25EquipBase('${c.id}')`
            : tier === 'sub'     ? `window._v25EquipSub('${c.id}')`
            : tier === 'master'  ? `window._v25EquipMaster('${c.id}')`
            : tier === 'ultra'   ? `window._v25EquipUltra('${c.id}')`
            : `window._v25EquipGod('${c.id}')`;
          btnHtml = `<button onclick="${onclickFn}" style="margin-top:6px;width:100%;padding:5px 8px;background:linear-gradient(135deg,${tc.color}22,${tc.color}0a);border:1px solid ${tc.color}55;border-radius:6px;font-size:8px;color:${tc.color};font-family:'Orbitron',monospace;font-weight:900;letter-spacing:0.08em;cursor:pointer;transition:all 0.15s;" onmouseover="this.style.background='${tc.color}30'" onmouseout="this.style.background='linear-gradient(135deg,${tc.color}22,${tc.color}0a)'">EQUIPAR</button>`;
        }

        const multInfo = (c.multAtk || c.multHp)
          ? `<div style="display:flex;gap:6px;margin-top:4px;"><span style="font-size:7.5px;color:#f97316;">⚔ ${c.multAtk ? (c.multAtk + 'x') : '—'}</span><span style="font-size:7.5px;color:#34d399;">❤ ${c.multHp ? (c.multHp + 'x') : '—'}</span>${c.addCrit ? `<span style="font-size:7.5px;color:#ffd60a;">✦ +${Math.round(c.addCrit*100)}%</span>` : ''}</div>`
          : '';

        return `
          <div style="background:${isActive ? tc.color+'18' : 'rgba(0,0,0,0.45)'};border:1px solid ${isActive ? tc.color+'55' : 'rgba(255,255,255,0.07)'};border-radius:12px;padding:10px;${isLocked ? 'opacity:0.5;' : ''}${isActive ? `box-shadow:0 0 12px ${tc.glow};` : ''}">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
              <div style="width:28px;height:28px;border-radius:8px;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${isLocked ? '#44445a' : tc.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><use href="#icon-${icon}"/></svg>
              </div>
              <div style="flex:1;min-width:0;">
                <div style="font-family:'Orbitron',sans-serif;font-size:8.5px;font-weight:900;color:${isLocked ? '#44445a' : isActive ? tc.color : '#e4e4e7'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${name}</div>
                ${multInfo}
              </div>
            </div>
            <div style="font-family:'Rajdhani',sans-serif;font-size:9.5px;color:rgba(180,180,200,0.8);line-height:1.4;">${desc}</div>
            ${btnHtml}
          </div>
        `;
        } catch(cardErr) { console.warn('[V25] card error:', cardErr); return ''; }
      }).join('');

      return `
        <div style="margin-bottom:14px;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">
            <span style="font-size:14px;">${tc.icon}</span>
            <span style="font-family:'Orbitron',sans-serif;font-size:8px;font-weight:900;color:${tc.color};letter-spacing:0.12em;text-shadow:0 0 10px ${tc.glow};">${tc.label}</span>
            <div style="flex:1;height:1px;background:linear-gradient(90deg,${tc.color}44,transparent);"></div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;">
            ${cards}
          </div>
        </div>
      `;
      } catch(sectionErr) { console.error('[V25] section error:', sectionErr); return ''; }
    }

    const html = `
      <div style="width:min(94vw,440px);max-height:88vh;display:flex;flex-direction:column;background:rgba(8,8,16,0.97);border:1px solid rgba(255,255,255,0.08);border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,0.8);overflow:hidden;">
        <!-- Header -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 18px 12px;border-bottom:1px solid rgba(255,255,255,0.06);flex-shrink:0;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:20px;">⚔️</span>
            <div>
              <div style="font-family:'Orbitron',sans-serif;font-size:14px;font-weight:900;color:#fff;letter-spacing:0.1em;">CLASSES</div>
              <div style="font-family:'Fira Code',monospace;font-size:8px;color:#52525b;">Atual: <span style="color:#34d399;">${(r.classes[r.eqClass] && r.classes[r.eqClass].name[lang]) || r.eqClass}</span></div>
            </div>
          </div>
          <button onclick="document.getElementById('v25-class-modal').classList.remove('active')" style="width:30px;height:30px;border-radius:8px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#a1a1aa;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;">×</button>
        </div>

        <!-- Tabs -->
        <div id="v25-class-tabs" style="display:flex;gap:4px;padding:10px 16px 0;flex-shrink:0;">
          ${['base','sub','master','ultra','god'].map((tier,i) => {
            const tc = TIER_CONFIG[tier];
            return `<button onclick="v25ShowClassTab('${tier}')" id="v25-tab-${tier}" style="flex:1;padding:5px 2px;border-radius:8px 8px 0 0;font-family:'Orbitron',sans-serif;font-size:7px;font-weight:900;letter-spacing:0.06em;border:1px solid ${tc.color}44;border-bottom:none;color:${i===0 ? tc.color : '#52525b'};background:${i===0 ? tc.color+'18' : 'transparent'};cursor:pointer;transition:all 0.15s;">${tc.icon} ${tc.label.split(' ')[0]}</button>`;
          }).join('')}
        </div>

        <!-- Content -->
        <div id="v25-class-content" style="flex:1;overflow-y:auto;padding:14px 16px 16px;scrollbar-width:none;">
          <div id="v25-tab-content-base" style="display:block;">
            ${renderTierSection('base', r.classes, null, true)}
          </div>
          <div id="v25-tab-content-sub" style="display:none;">
            ${renderTierSection('sub', Object.values(r.SUBCLASS_DEFS || {}).flat(), null, false)}
          </div>
          <div id="v25-tab-content-master" style="display:none;">
            ${renderTierSection('master', r.MASTERCLASS_DEFS || [], null, false)}
          </div>
          <div id="v25-tab-content-ultra" style="display:none;">
            ${renderTierSection('ultra', ULTRACLASS_DEFS, null, false)}
          </div>
          <div id="v25-tab-content-god" style="display:none;">
            ${renderTierSection('god', r.GODCLASS_DEFS || [], null, false)}
          </div>
        </div>
      </div>
    `;

    try {
      modal.innerHTML = html;
    } catch(e) {
      console.error('[V25] Erro ao renderizar modal de Classes:', e);
      return;
    }
    modal.classList.add('active');
  }

  // Tab switcher para o modal de classes
  window.v25ShowClassTab = function(tier) {
    ['base','sub','master','ultra','god'].forEach(t => {
      const content = document.getElementById('v25-tab-content-' + t);
      const tab = document.getElementById('v25-tab-' + t);
      if (!content || !tab) return;
      const tc = TIER_CONFIG[t];
      if (t === tier) {
        content.style.display = 'block';
        tab.style.color = tc.color;
        tab.style.background = tc.color + '18';
        tab.style.borderColor = tc.color + '44';
      } else {
        content.style.display = 'none';
        tab.style.color = '#52525b';
        tab.style.background = 'transparent';
      }
    });
  };

  // Equip functions
  window._v25EquipBase = function(id) {
    const r = window.rpg;
    if (!r) return;
    r.changeClass(id);
    // Reabrir modal atualizado
    setTimeout(openClassPanel, 300);
  };

  window._v25EquipSub = function(id) {
    const r = window.rpg;
    if (!r) return;
    const defs = Object.values(r.SUBCLASS_DEFS || {}).flat();
    const sc = defs.find(d => d.id === id);
    if (!sc) return;
    r.equippedSubclass = id;
    localStorage.setItem('rpg_eq_subclass', id);
    if (sc.multHp) r.permAllBonus = (r.permAllBonus || 0) + (sc.multHp - 1);
    if (sc.multAtk) r.permAtkBonus = (r.permAtkBonus || 0) + (sc.multAtk - 1);
    if (sc.addCrit) r.permCritBonus = (r.permCritBonus || 0) + sc.addCrit;
    r.save(); r.updateUI();
    if (typeof showToast === 'function') showToast('⚔️ Sub-Classe equipada: ' + (sc.name[r.lang] || sc.name.pt) + '!', 4000);
    setTimeout(openClassPanel, 300);
  };

  window._v25EquipMaster = function(id) {
    const r = window.rpg;
    if (!r) return;
    const mc = (r.MASTERCLASS_DEFS || []).find(d => d.id === id);
    if (!mc) return;
    r.equippedMasterclass = id;
    localStorage.setItem('rpg_eq_masterclass', id);
    if (mc.multHp) r.permAllBonus = (r.permAllBonus || 0) + (mc.multHp - 1) * 0.5;
    if (mc.multAtk) r.permAtkBonus = (r.permAtkBonus || 0) + (mc.multAtk - 1) * 0.5;
    if (mc.addCrit) r.permCritBonus = (r.permCritBonus || 0) + mc.addCrit * 0.5;
    r.save(); r.updateUI();
    if (typeof showToast === 'function') showToast('💎 MasterClass equipada: ' + (mc.name[r.lang] || mc.name.pt) + '!', 5000);
    setTimeout(openClassPanel, 300);
  };

  window._v25EquipUltra = function(id) {
    const r = window.rpg;
    if (!r) return;
    const uc = ULTRACLASS_DEFS.find(d => d.id === id);
    if (!uc) return;
    r.equippedUltraclass = id;
    localStorage.setItem('rpg_eq_ultraclass', id);
    if (uc.multAtk) r.permAtkBonus = (r.permAtkBonus || 0) + (uc.multAtk - 1) * 0.4;
    if (uc.multHp) r.permAllBonus = (r.permAllBonus || 0) + (uc.multHp - 1) * 0.4;
    if (uc.addCrit) r.permCritBonus = (r.permCritBonus || 0) + uc.addCrit * 0.4;
    r.save(); r.updateUI();
    if (typeof showToast === 'function') showToast('🔥 ULTRACLASS equipada: ' + (uc.name.pt) + '!', 5000);
    setTimeout(openClassPanel, 300);
  };

  window._v25EquipGod = function(id) {
    const r = window.rpg;
    if (!r) return;
    const gc = (r.GODCLASS_DEFS || []).find(d => d.id === id);
    if (!gc) return;
    r.equippedGodclass = id;
    localStorage.setItem('rpg_eq_godclass', id);
    if (gc.multAtk) r.permAtkBonus = (r.permAtkBonus || 0) + (gc.multAtk - 1) * 0.3;
    if (gc.multHp) r.permAllBonus = (r.permAllBonus || 0) + (gc.multHp - 1) * 0.3;
    if (gc.addCrit) r.permCritBonus = (r.permCritBonus || 0) + gc.addCrit * 0.3;
    r.save(); r.updateUI();
    if (typeof showToast === 'function') showToast('⚡ GOD CLASS equipada: ' + (gc.name[r.lang] || gc.name.pt) + '!', 6000);
    setTimeout(openClassPanel, 300);
  };

  // Expor globalmente
  window.openClassPanel = openClassPanel;

  // ─────────────────────────────────────────────────────────────────────────
  // 5. INJETAR BOTÃO "CLASSES" NO MENU TAVERNA
  // ─────────────────────────────────────────────────────────────────────────
  function injectClassButton() {
    const tavAcc = document.getElementById('acc-taverna');
    if (!tavAcc || document.getElementById('v25-class-btn')) return;

    const btn = document.createElement('button');
    btn.id = 'v25-class-btn';
    btn.className = 'sub-pill';
    btn.style.cssText = 'border-color:rgba(249,115,22,0.4);color:#fb923c;';
    btn.innerHTML = '<i data-lucide="user-cog" class="w-3 h-3"></i><span>Classes</span>';
    btn.onclick = openClassPanel;
    tavAcc.appendChild(btn);
    try { lucide.createIcons(); } catch(e) {}
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 6. LIMPAR POLUIÇÃO DO MENU PRINCIPAL
  // ─────────────────────────────────────────────────────────────────────────
  function cleanMenuPollution() {
    // Ocultar topbar mobile poluída (mantém apenas o relógio)
    const mobTopbar = document.getElementById('mob-topbar');
    if (mobTopbar) {
      const clock = document.getElementById('mob-clock');
      if (clock) {
        // Mostrar só o relógio, não o label da aldeia
        mobTopbar.innerHTML = '';
        mobTopbar.appendChild(clock);
        mobTopbar.style.justifyContent = 'flex-end';
      }
    }

    // Injetar CSS de limpeza
    if (!document.getElementById('v25-clean-css')) {
      const s = document.createElement('style');
      s.id = 'v25-clean-css';
      s.textContent = `
        /* Remover label vermelho "ALDEIA" do topbar */
        #mob-location-label { display: none !important; }
        #village-state-indicator { display: none !important; }

        /* Limpar living-village-bar */
        .living-village-bar { display: none !important; }
        #village-status-bar  { display: none !important; }

        /* NG+ modal gerido por fix-final.js + ng-plus-v4.js */

        /* Botão de classes no menu */
        #v25-class-btn { animation: none !important; }

        /* Modal de classes v25 */
        #v25-class-modal { display: none !important; }
        #v25-class-modal.active {
          display: flex !important;
          position: fixed !important;
          inset: 0 !important;
          z-index: 9999 !important;
          align-items: center !important;
          justify-content: center !important;
        }
        #v25-class-content::-webkit-scrollbar { display: none; }

        /* HUD — corrigir textos colados na batalha */
        #battle-log > *,
        .combat-log > * {
          padding: 2px 0 !important;
          border-bottom: 1px solid rgba(255,255,255,0.03) !important;
        }
      `;
      document.head.appendChild(s);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 7. INIT
  // ─────────────────────────────────────────────────────────────────────────
  function init() {
    injectHUDFix();
    cleanMenuPollution();
    fixVillageTopbar();
    fixNgPlus();

    // Aguarda o DOM e rpg para injetar botão de classes
    waitFor(
      () => document.getElementById('acc-taverna') && typeof window.rpg !== 'undefined',
      () => {
        injectClassButton();
        // Atualiza botão de NG+ no menu
        document.querySelectorAll('[onclick*="openNgPlus"]').forEach(btn => {
          btn.onclick = () => window.openNgPlus();
        });
      }
    );

    // Re-injetar botão se o accordion for toggled
    document.addEventListener('click', e => {
      if (e.target.closest && e.target.closest('[onclick*="toggleAcc"]')) {
        setTimeout(injectClassButton, 200);
      }
    });

    console.log('[V25MegaFix] ✅ Todos os patches aplicados');
  }

  ready(init);

})();
