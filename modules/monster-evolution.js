/**
 * monster-evolution.js — CalcQuest: Lendas de Algoritma
 * ──────────────────────────────────────────────────────
 * Evolução de Monstros: inimigos evoluem em formas mais
 * perigosas conforme o herói os mata repetidamente.
 * Integra com rpg.bestiary e rpg.killMonster.
 */
;(function () {
  'use strict';

  // ── LINHAS EVOLUTIVAS ──────────────────────────────────────────────────────
  // Cada linha: { base, stages: [{name, icon, sprite, statMult, drops, lore}] }
  // statMult aplica-se sobre os stats base do monstro original
  const EVOLUTION_LINES = [
    {
      base: 'slime',
      stages: [
        { name: 'Slime',     icon: '🟢', minKills: 0,  statMult: 1.0,  drops: [],                lore: 'A criatura mais comum de Algoritma.' },
        { name: 'Slime Rei', icon: '👑', minKills: 50, statMult: 1.8,  drops: ['Coroa de Gosma'], lore: 'Após incontáveis derrotas, emergiu como líder do bando.' },
        { name: 'Slime Deus',icon: '🌌', minKills: 150,statMult: 4.0,  drops: ['Núcleo Divino'],  lore: 'Transcendeu a forma física. Dizem que contém um universo interior.' },
      ]
    },
    {
      base: 'goblin',
      stages: [
        { name: 'Goblin',        icon: '👺', minKills: 0,  statMult: 1.0,  drops: [],                    lore: 'Ágil e traiçoeiro.' },
        { name: 'Goblin Arqueiro',icon: '🏹', minKills: 30, statMult: 1.6,  drops: ['Arco Enferrujado'],   lore: 'Aprendeu a distância é vida.' },
        { name: 'Goblin Lorde',  icon: '⚔️', minKills: 100,statMult: 3.2,  drops: ['Espada do Lorde'],    lore: 'Lidera uma horda. Cada cicatriz é uma batalha perdida contra ti.' },
      ]
    },
    {
      base: 'skeleton',
      stages: [
        { name: 'Esqueleto',      icon: '💀', minKills: 0,  statMult: 1.0,  drops: [],                    lore: 'Um guerreiro sem memória.' },
        { name: 'Esqueleto Élite',icon: '🗡️', minKills: 40, statMult: 2.0,  drops: ['Osso Reforçado'],    lore: 'Acumulou magia residual. Seus golpes partem pedra.' },
        { name: 'Rei Esqueleto',  icon: '👁️', minKills: 120,statMult: 5.0,  drops: ['Coroa Maldita'],     lore: 'Renasceu com consciência plena. Odeia-te especificamente.' },
      ]
    },
    {
      base: 'wolf',
      stages: [
        { name: 'Lobo',         icon: '🐺', minKills: 0,  statMult: 1.0,  drops: [],                lore: 'Caçador das florestas de Algoritma.' },
        { name: 'Lobo Sombrio', icon: '🌑', minKills: 35, statMult: 1.9,  drops: ['Presa das Trevas'], lore: 'Tocado pelo Vazio. Corre mais rápido que a luz.' },
        { name: 'Fenrir',       icon: '⚡', minKills: 110,statMult: 4.5,  drops: ['Garra de Fenrir'],  lore: 'A lenda torna-se real. O lobo que devora estrelas.' },
      ]
    },
    {
      base: 'golem',
      stages: [
        { name: 'Golem de Pedra', icon: '🪨', minKills: 0,  statMult: 1.0,  drops: [],                  lore: 'Construído pelos primeiros programadores.' },
        { name: 'Golem de Ferro', icon: '⚙️', minKills: 45, statMult: 2.2,  drops: ['Fragmento de Ferro'], lore: 'Absorveu o metal dos inimigos derrotados.' },
        { name: 'Golem Quântico', icon: '🔮', minKills: 130,statMult: 6.0,  drops: ['Núcleo Quântico'],  lore: 'Existe em múltiplos estados simultaneamente. Impossível de prever.' },
      ]
    },
    {
      base: 'dragon',
      stages: [
        { name: 'Dragonete',    icon: '🐉', minKills: 0,  statMult: 1.0,  drops: [],                  lore: 'Um dragão jovem, ainda aprendendo a voar.' },
        { name: 'Dragão',       icon: '🔥', minKills: 60, statMult: 2.8,  drops: ['Escama de Dragão'], lore: 'Atingiu a maturidade. O fogo destrói código.' },
        { name: 'Dragão Ancião',icon: '🌋', minKills: 200,statMult: 7.0,  drops: ['Coração de Dragão'],'lore': 'Viveu mais que civilizações. Cada batalha tua é apenas um instante para ele.' },
      ]
    },
  ];

  // ── ESTADO ─────────────────────────────────────────────────────────────────
  // kills por tipo de monstro (persistido em rpg._evoKills)
  function getEvoKills() {
    if (window.rpg) {
      if (!rpg._evoKills) rpg._evoKills = {};
      return rpg._evoKills;
    }
    return {};
  }

  // ── RESOLVER ESTÁGIO ATUAL ─────────────────────────────────────────────────
  function resolveStage(baseId) {
    const kills = getEvoKills()[baseId] || 0;
    const line = EVOLUTION_LINES.find(l => l.base === baseId);
    if (!line) return null;
    let stage = line.stages[0];
    for (const s of line.stages) {
      if (kills >= s.minKills) stage = s;
    }
    return { ...stage, kills, line };
  }

  // ── APLICAR EVOLUÇÃO AO MONSTRO ATUAL ─────────────────────────────────────
  function applyEvolution() {
    try {
      if (!window.rpg || !rpg.currentMonster) return;
      const m = rpg.currentMonster;
      const baseId = (m._evoBase || m.id || '').toLowerCase().replace(/\s+/g, '');
      if (!baseId) return;

      // Guarda o id base uma vez
      if (!m._evoBase) m._evoBase = baseId;

      const stage = resolveStage(baseId);
      if (!stage || stage.name === m.name) return; // já está correto

      // Aplica o estágio
      const prevName = m.name;
      m.name = stage.name;
      m._evoStage = stage;

      // Aplica multiplicador de stats (só uma vez por estágio)
      if (m._evoAppliedMult !== stage.statMult) {
        const base = m._baseMult || 1;
        const factor = stage.statMult / (m._evoAppliedMult || 1);
        m.maxHp  = Math.round((m.maxHp  || 100) * factor);
        m.hp     = m.maxHp;
        m.atk    = Math.round((m.atk    || 10)  * factor);
        m.def    = Math.round((m.def    || 5)   * factor);
        m._evoAppliedMult = stage.statMult;
      }

      // Atualiza nome na UI
      const nameEl = document.getElementById('monster-name');
      if (nameEl) nameEl.textContent = stage.icon + ' ' + stage.name;

      // Notificação de evolução
      if (prevName && prevName !== stage.name) {
        showEvoToast(prevName, stage);
      }
    } catch(e) {}
  }

  // ── TOAST DE EVOLUÇÃO ──────────────────────────────────────────────────────
  function showEvoToast(from, stage) {
    let toast = document.getElementById('evo-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'evo-toast';
      toast.style.cssText = `
        position:fixed; top:70px; left:50%; transform:translateX(-50%) translateY(-20px);
        z-index:9000; background:linear-gradient(135deg,#1a0030,#3b0a6e);
        border:1px solid rgba(168,85,247,0.6); border-radius:12px;
        padding:10px 18px; font-family:'Orbitron',monospace; font-size:9px;
        font-weight:900; letter-spacing:0.12em; color:#e879f9;
        box-shadow:0 0 30px rgba(168,85,247,0.4); text-align:center;
        opacity:0; transition:all 0.3s ease; pointer-events:none; white-space:nowrap;
      `;
      document.body.appendChild(toast);
    }
    toast.innerHTML = `⚡ EVOLUÇÃO! ${stage.icon} ${stage.name.toUpperCase()}`;
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(-20px)';
    }, 3000);
  }

  // ── HOOK EM killMonster ────────────────────────────────────────────────────
  function hookKillMonster() {
    if (!window.rpg || !rpg.killMonster) return;
    const orig = rpg.killMonster.bind(rpg);
    rpg.killMonster = function(...args) {
      // Incrementa contador antes de matar
      try {
        const m = rpg.currentMonster;
        if (m) {
          const baseId = (m._evoBase || m.id || '').toLowerCase().replace(/\s+/g, '');
          if (baseId) {
            const evo = getEvoKills();
            evo[baseId] = (evo[baseId] || 0) + 1;

            // Verifica se evoluiu
            const line = EVOLUTION_LINES.find(l => l.base === baseId);
            if (line) {
              const kills = evo[baseId];
              for (const s of line.stages) {
                if (kills === s.minKills && s.minKills > 0) {
                  // Próximo spawn será evoluído — toast de preview
                  showEvoToast('', s);
                  break;
                }
              }
            }

            // Adiciona drop especial da linha evolutiva
            const stage = resolveStage(baseId);
            if (stage?.drops?.length && Math.random() < 0.15) {
              const drop = stage.drops[Math.floor(Math.random() * stage.drops.length)];
              if (!rpg._evoDrops) rpg._evoDrops = [];
              rpg._evoDrops.push({ name: drop, from: stage.name });
              showDropToast(drop, stage.icon);
            }
          }
        }
      } catch(e) {}
      return orig(...args);
    };
  }

  // ── HOOK EM spawnMonster ───────────────────────────────────────────────────
  function hookSpawnMonster() {
    if (!window.rpg || !rpg.spawnMonster) return;
    const orig = rpg.spawnMonster.bind(rpg);
    rpg.spawnMonster = function(...args) {
      const r = orig(...args);
      setTimeout(applyEvolution, 100);
      return r;
    };
  }

  // ── TOAST DE DROP ──────────────────────────────────────────────────────────
  function showDropToast(name, icon) {
    let toast = document.getElementById('evo-drop-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'evo-drop-toast';
      toast.style.cssText = `
        position:fixed; bottom:100px; right:16px; z-index:9000;
        background:rgba(8,8,18,0.96); border:1px solid rgba(168,85,247,0.5);
        border-radius:10px; padding:8px 14px; font-family:'Rajdhani',sans-serif;
        font-size:12px; font-weight:700; color:#e879f9;
        box-shadow:0 4px 20px rgba(0,0,0,0.8); opacity:0;
        transition:opacity 0.3s ease; pointer-events:none;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = `${icon} Drop raro: ${name}`;
    toast.style.opacity = '1';
    setTimeout(() => { toast.style.opacity = '0'; }, 3000);
  }

  // ── SEÇÃO NO BESTIÁRIO ─────────────────────────────────────────────────────
  // Injeta tab de Evolução no modal de bestiary se existir
  function injectEvoBestiaryTab() {
    const body = document.getElementById('lore-body') || document.getElementById('npc-body');
    // Expõe função global para render de evolução no bestiário
    window.renderEvoLog = function(container) {
      if (!container) return;
      const evo = getEvoKills();
      const html = EVOLUTION_LINES.map(line => {
        const kills = evo[line.base] || 0;
        const currentStage = resolveStage(line.base);
        const nextStage = line.stages.find(s => s.minKills > kills);
        return `
          <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(168,85,247,0.15);border-radius:12px;padding:12px;margin-bottom:8px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
              <div style="font-family:'Orbitron',monospace;font-size:10px;font-weight:900;color:#e879f9;letter-spacing:0.1em;">
                ${currentStage.icon} ${currentStage.name.toUpperCase()}
              </div>
              <div style="font-family:'Fira Code',monospace;font-size:8px;color:#52525b;">
                ${kills} kills
              </div>
            </div>
            <div style="display:flex;gap:6px;align-items:center;margin-bottom:8px;flex-wrap:wrap;">
              ${line.stages.map((s, i) => `
                <div style="display:flex;align-items:center;gap:3px;">
                  <span style="font-size:14px;${kills >= s.minKills ? '' : 'filter:grayscale(1);opacity:0.3;'}">${s.icon}</span>
                  <span style="font-family:'Fira Code',monospace;font-size:8px;color:${kills >= s.minKills ? '#a855f7' : '#52525b'};">${s.name}</span>
                  ${i < line.stages.length-1 ? '<span style="color:#52525b;font-size:10px;">→</span>' : ''}
                </div>
              `).join('')}
            </div>
            ${nextStage ? `
              <div style="margin-bottom:4px;">
                <div style="height:3px;background:rgba(255,255,255,0.06);border-radius:99px;overflow:hidden;">
                  <div style="height:100%;width:${Math.min(100,Math.round((kills/nextStage.minKills)*100))}%;background:linear-gradient(90deg,#a855f7,#e879f9);border-radius:99px;transition:width 0.3s;"></div>
                </div>
                <div style="font-family:'Fira Code',monospace;font-size:8px;color:#52525b;text-align:right;margin-top:2px;">
                  ${kills}/${nextStage.minKills} para ${nextStage.icon} ${nextStage.name}
                </div>
              </div>
            ` : `<div style="font-family:'Fira Code',monospace;font-size:8px;color:#34d399;">✓ Forma máxima atingida</div>`}
            <div style="font-family:'Fira Code',monospace;font-size:9px;color:#52525b;font-style:italic;margin-top:4px;">"${currentStage.lore}"</div>
          </div>
        `;
      }).join('');
      container.innerHTML = `
        <div style="font-family:'Orbitron',monospace;font-size:9px;font-weight:900;color:#a855f7;letter-spacing:0.15em;margin-bottom:10px;text-transform:uppercase;">
          🧬 Linhas Evolutivas — Cultivar Inimigos
        </div>
        ${html}
      `;
    };
  }

  // ── MODAL DEDICADO ─────────────────────────────────────────────────────────
  function createEvoModal() {
    if (document.getElementById('evo-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'evo-modal';
    modal.className = 'modal-overlay fixed inset-0 flex items-center justify-center';
    modal.innerHTML = `
      <div class="modal-content glass-panel bg-zinc-900/90 w-11/12 max-w-md rounded-2xl p-6 shadow-2xl">
        <div class="flex justify-between items-center mb-3 border-b border-zinc-800 pb-3">
          <h2 class="text-xl font-black text-white flex items-center gap-2 uppercase tracking-widest">
            🧬 <span>Evolução de Monstros</span>
          </h2>
          <button onclick="closeModal('evo-modal')" class="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition text-zinc-400">✕</button>
        </div>
        <p class="text-[10px] text-purple-400 font-bold uppercase tracking-widest mb-4 text-center">
          Mata monstros do mesmo tipo para evoluí-los • Drops exclusivos por estágio
        </p>
        <div id="evo-modal-body" class="max-h-[65vh] overflow-y-auto pr-1 pb-2 hide-scrollbar"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  window.openEvoLog = function() {
    createEvoModal();
    const body = document.getElementById('evo-modal-body');
    if (body && window.renderEvoLog) renderEvoLog(body);
    if (window.openModal) openModal('evo-modal');
    else {
      const m = document.getElementById('evo-modal');
      if (m) m.classList.add('active');
    }
  };

  // ── BOTÃO NO BESTIÁRIO ─────────────────────────────────────────────────────
  function addEvoButtonToBestiary() {
    // Procura o accordion do bestiário/lore para adicionar botão de evolução
    const bestiaryBtn = document.querySelector('[onclick*="openBestiary"], [onclick*="openLore"]');
    if (!bestiaryBtn) return;

    // Adiciona botão de Evolução no painel de bestiário ao abrir
    const origOpenBestiary = window.openBestiary;
    window.openBestiary = function(...args) {
      if (origOpenBestiary) origOpenBestiary(...args);
      // Injeta botão de evo na parte superior do modal de lore se ainda não existir
      setTimeout(() => {
        const loreBody = document.getElementById('lore-body');
        if (loreBody && !document.getElementById('evo-btn-in-lore')) {
          const btn = document.createElement('button');
          btn.id = 'evo-btn-in-lore';
          btn.onclick = openEvoLog;
          btn.style.cssText = `
            display:flex; align-items:center; gap:6px; width:100%;
            background:rgba(168,85,247,0.1); border:1px solid rgba(168,85,247,0.3);
            border-radius:10px; padding:10px 14px; margin-bottom:10px; cursor:pointer;
            font-family:'Orbitron',monospace; font-size:9px; font-weight:900;
            color:#a855f7; letter-spacing:0.1em; text-transform:uppercase;
          `;
          btn.innerHTML = '🧬 Ver Linhas Evolutivas';
          loreBody.insertBefore(btn, loreBody.firstChild);
        }
      }, 200);
    };
  }

  // ── INIT ───────────────────────────────────────────────────────────────────
  function init() {
    hookKillMonster();
    hookSpawnMonster();
    injectEvoBestiaryTab();
    createEvoModal();
    addEvoButtonToBestiary();

    // Expõe API pública
    window._monsterEvolution = {
      LINES: EVOLUTION_LINES,
      getKills: getEvoKills,
      resolveStage,
      applyEvolution,
    };

    console.log('[MonsterEvolution] ✅ Carregado — ' + EVOLUTION_LINES.length + ' linhas evolutivas');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 1500));
  } else {
    setTimeout(init, 1500);
  }

})();
